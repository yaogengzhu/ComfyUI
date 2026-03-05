/**
 * 绘智 AI 认证服务
 * 功能：
 * 1. 设备指纹生成
 * 2. 单点登录检查（设备有效性轮询）
 * 3. Token 自动刷新
 * 4. 退出登录处理（阻止 WebSocket 重连）
 */

import { ref } from 'vue'

// ============= 配置 =============
const AUTH_SERVICE_URL = 'http://43.138.44.254:3001'

export const HUIZHI_STORAGE_KEYS = {
  TOKEN: 'huizhi_token',
  COMFY_ORG_TOKEN: 'comfy_org_token',
  COMFY_ORG_EXPIRY: 'comfy_org_token_expiry',
  USER_INFO: 'huizhi_user',
  // 设备信息
  DEVICE_ID: 'huizhi_device_id',
  SESSION_ID: 'huizhi_session_id'
}

// Token 刷新阈值 (提前 5 分钟刷新)
const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000

// 设备检查间隔 (5 分钟检查一次)
const DEVICE_CHECK_INTERVAL = 5 * 60 * 1000

// ============= 状态 =============
let tokenRefreshTimer: ReturnType<typeof setTimeout> | null = null
let deviceCheckTimer: ReturnType<typeof setInterval> | null = null
const isLoggingOut = ref(false)

// ============= 设备指纹 =============
export function getDeviceId(): string {
  let deviceId = localStorage.getItem(HUIZHI_STORAGE_KEYS.DEVICE_ID)
  if (deviceId) {
    return deviceId
  }

  // 如果没有设备 ID，生成一个新的
  const components = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    screen.colorDepth.toString(),
    new Date().getTimezoneOffset().toString(),
    (navigator.hardwareConcurrency || 'unknown').toString(),
    navigator.platform
  ]

  const str = components.join('|')
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }

  deviceId =
    'device_' + Math.abs(hash).toString(36) + '_' + Date.now().toString(36)
  localStorage.setItem(HUIZHI_STORAGE_KEYS.DEVICE_ID, deviceId)

  return deviceId
}

// ============= 检查是否通过绘智服务登录 =============
export function isHuizhiLoggedIn(): boolean {
  const huizhiToken = localStorage.getItem(HUIZHI_STORAGE_KEYS.TOKEN)
  // 只要有绘智 token 就算登录了（comfyOrgToken 可能为 null/无效，会通过认证服务代理处理）
  if (huizhiToken && huizhiToken !== 'null' && huizhiToken !== 'undefined') {
    return true
  }
  return false
}

// ============= 获取绘智用户信息 =============
export function getHuizhiUserInfo(): {
  email: string
  username: string
  uid?: string
  role?: string
} | null {
  try {
    const userInfoStr =
      localStorage.getItem(HUIZHI_STORAGE_KEYS.USER_INFO) ||
      localStorage.getItem('comfy_user')
    if (userInfoStr) {
      return JSON.parse(userInfoStr)
    }
  } catch (e) {
    console.warn('[HuizhiAuth] Failed to parse user info:', e)
  }
  return null
}

// ============= 设备有效性检查 (单点登录轮询) =============
interface DeviceCheckResult {
  valid: boolean
  reason?: string
  message?: string
}

async function checkDeviceValidity(): Promise<void> {
  if (isLoggingOut.value) return

  const huizhiToken = localStorage.getItem(HUIZHI_STORAGE_KEYS.TOKEN)
  const deviceId = getDeviceId()

  if (!huizhiToken || !deviceId) {
    console.warn('[HuizhiAuth] Missing token or device ID for device check')
    return
  }

  try {
    const response = await fetch(
      `${AUTH_SERVICE_URL}/api/auth/check-device?device_id=${encodeURIComponent(deviceId)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${huizhiToken}`,
          'X-Device-ID': deviceId
        }
      }
    )

    const result: DeviceCheckResult = await response.json()

    if (!response.ok || !result.valid) {
      // 设备被踢出或会话无效
      console.warn(
        '[HuizhiAuth] Device check failed:',
        result.reason,
        result.message
      )

      if (result.reason === 'device_mismatch') {
        // 其他设备登录，显示提示后退出
        showKickedOutNotification()
      } else if (
        result.reason === 'invalid_token' ||
        result.reason === 'session_expired'
      ) {
        // Token 无效或会话过期，静默跳转到登录页
        handleForceLogout('会话已过期，请重新登录')
      }
    } else {
      // 设备有效，继续轮询
      console.debug('[HuizhiAuth] Device check passed')
    }
  } catch (err) {
    console.error('[HuizhiAuth] Device check error:', err)
    // 网络错误时不做处理，下次轮询重试
  }
}

// ============= 启动设备检查轮询 =============
export function startDeviceCheckPolling(): void {
  // 清除旧的定时器
  if (deviceCheckTimer) {
    clearInterval(deviceCheckTimer)
  }

  // 只有绘智用户才需要轮询
  if (!isHuizhiLoggedIn()) {
    console.log('[HuizhiAuth] Not a Huizhi user, skipping device check polling')
    return
  }

  // 立即检查一次
  checkDeviceValidity()

  // 设置轮询
  deviceCheckTimer = setInterval(checkDeviceValidity, DEVICE_CHECK_INTERVAL)
  console.log(
    '[HuizhiAuth] Device check polling started (interval: ' +
      DEVICE_CHECK_INTERVAL / 1000 +
      's)'
  )
}

// ============= 停止设备检查轮询 =============
export function stopDeviceCheckPolling(): void {
  if (deviceCheckTimer) {
    clearInterval(deviceCheckTimer)
    deviceCheckTimer = null
  }
}

// ============= 显示被踢出通知 =============
function showKickedOutNotification(): void {
  if (isLoggingOut.value) return
  isLoggingOut.value = true

  // 停止轮询
  stopDeviceCheckPolling()

  // 创建全屏遮罩和通知
  const overlay = document.createElement('div')
  overlay.id = 'kicked-out-overlay'
  overlay.innerHTML = `
    <style>
      #kicked-out-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999999;
        backdrop-filter: blur(10px);
      }
      
      .kicked-out-dialog {
        background: #1e1e2e;
        border-radius: 16px;
        padding: 32px 40px;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        animation: slideIn 0.3s ease-out;
      }
      
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .kicked-out-dialog .icon {
        font-size: 48px;
        margin-bottom: 16px;
      }
      
      .kicked-out-dialog h2 {
        color: #fff;
        font-size: 20px;
        margin: 0 0 12px 0;
        font-weight: 600;
      }
      
      .kicked-out-dialog p {
        color: #a0a0b0;
        font-size: 14px;
        margin: 0 0 24px 0;
        line-height: 1.6;
      }
      
      .kicked-out-dialog button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 12px 32px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .kicked-out-dialog button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      }
      
      .kicked-out-dialog .countdown {
        color: #888;
        font-size: 12px;
        margin-top: 16px;
      }
    </style>
    <div class="kicked-out-dialog">
      <div class="icon">⚠️</div>
      <h2>账号已在其他设备登录</h2>
      <p>您的账号已在另一台设备上登录，当前会话已失效。<br>如非本人操作，请及时修改密码。</p>
      <button onclick="window.location.href='/login'">重新登录</button>
      <div class="countdown">将在 <span id="countdown-seconds">5</span> 秒后自动跳转到登录页...</div>
    </div>
  `

  document.body.appendChild(overlay)

  // 倒计时自动跳转
  let countdown = 5
  const countdownEl = document.getElementById('countdown-seconds')
  const countdownTimer = setInterval(() => {
    countdown--
    if (countdownEl) countdownEl.textContent = countdown.toString()
    if (countdown <= 0) {
      clearInterval(countdownTimer)
      handleForceLogout()
    }
  }, 1000)
}

// ============= 强制退出登录 =============
function handleForceLogout(message?: string): void {
  if (isLoggingOut.value && !document.getElementById('kicked-out-overlay')) {
    return
  }
  isLoggingOut.value = true

  console.log('[HuizhiAuth] ========== Force logout ==========')

  // 设置退出标志，阻止 WS 重连
  ;(window as any).__HUIZHI_LOGOUT_IN_PROGRESS__ = true

  // 停止所有定时器
  stopDeviceCheckPolling()
  if (tokenRefreshTimer) {
    clearTimeout(tokenRefreshTimer)
    tokenRefreshTimer = null
  }

  // 关闭 WebSocket
  try {
    const apiInstance = (window as any).app?.api
    if (apiInstance) {
      const socket = apiInstance.socket
      if (socket && (socket.readyState === 0 || socket.readyState === 1)) {
        socket.close(1000, 'Force logout')
      }
      apiInstance.socket = null
    }
  } catch (e) { /* ignore */ }

  // 清除所有 Token 和 localStorage
  Object.values(HUIZHI_STORAGE_KEYS).forEach((key) =>
    localStorage.removeItem(key)
  )
  const keysToRemove = [
    'comfy_user', 'comfy_refresh_token', 'huizhi_user_info',
    'comfy_token', 'clientId'
  ]
  keysToRemove.forEach((key) => {
    try { localStorage.removeItem(key) } catch (e) { /* ignore */ }
  })

  // 清除 Firebase 相关 localStorage
  const allKeys: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key) allKeys.push(key)
  }
  allKeys.forEach((key) => {
    if (key && (key.includes('firebase') || key.includes('comfy') || key.includes('huizhi'))) {
      try { localStorage.removeItem(key) } catch (e) { /* ignore */ }
    }
  })

  // 清除所有认证 Cookie
  const cookiesToClear = ['comfy_token', 'huizhi_token', 'comfy_org_token']
  cookiesToClear.forEach((cookieName) => {
    document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
    document.cookie = `${cookieName}=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  })

  // 清除 sessionStorage（但保留消息）
  try {
    const loginMessage = message || sessionStorage.getItem('login_message')
    sessionStorage.clear()
    if (loginMessage) {
      sessionStorage.setItem('login_message', loginMessage)
    }
    sessionStorage.setItem('comfy_logout_in_progress', 'true')
  } catch (e) { /* ignore */ }

  // 清除 IndexedDB
  try { indexedDB.deleteDatabase('firebaseLocalStorageDb') } catch (e) { /* ignore */ }

  console.log('[HuizhiAuth] Force logout: Storage cleared, redirecting to /login...')

  // 构建登录页 URL（如果有消息，通过 URL 参数传递）
  let loginUrl = '/login'
  if (message) {
    // 如果消息包含"踢下线"相关，使用 kicked 参数
    if (message.includes('其他设备') || message.includes('踢') || message.includes('下线')) {
      loginUrl = '/login?kicked=1'
    } else {
      loginUrl = '/login?logout=1'
    }
  }

  // 无论什么情况，都重定向到登录页
  setTimeout(() => {
    window.location.href = loginUrl
  }, 0)
}

// ============= Token 刷新 =============
export function setupTokenRefresh(): void {
  const expiryStr = localStorage.getItem(HUIZHI_STORAGE_KEYS.COMFY_ORG_EXPIRY)
  const comfyOrgToken = localStorage.getItem(HUIZHI_STORAGE_KEYS.COMFY_ORG_TOKEN)
  
  // 如果没有有效的 comfyOrgToken 或过期时间，立即刷新
  if (!comfyOrgToken || comfyOrgToken === 'null' || comfyOrgToken === 'undefined' || !expiryStr || expiryStr === '0') {
    console.log('[HuizhiAuth] ComfyOrg token missing or invalid, refreshing immediately')
    refreshComfyOrgToken()
    return
  }

  const expiry = parseInt(expiryStr, 10)
  const now = Date.now()
  const timeUntilRefresh = expiry - now - TOKEN_REFRESH_THRESHOLD

  if (timeUntilRefresh <= 0) {
    // Token 快过期或已过期，立即刷新
    refreshComfyOrgToken()
  } else {
    // 设置定时刷新
    if (tokenRefreshTimer) clearTimeout(tokenRefreshTimer)
    tokenRefreshTimer = setTimeout(refreshComfyOrgToken, timeUntilRefresh)
    console.log(
      '[HuizhiAuth] Token refresh scheduled in',
      Math.round(timeUntilRefresh / 1000 / 60),
      'minutes'
    )
  }
}

async function refreshComfyOrgToken(): Promise<void> {
  const huizhiToken = localStorage.getItem(HUIZHI_STORAGE_KEYS.TOKEN)
  if (!huizhiToken) {
    console.warn('[HuizhiAuth] No huizhi token for refresh')
    return
  }

  try {
    const response = await fetch(
      `${AUTH_SERVICE_URL}/api/auth/refresh-comfy-token`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${huizhiToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.ok) {
      const result = await response.json()
      if (result.data?.comfyOrgToken) {
        localStorage.setItem(
          HUIZHI_STORAGE_KEYS.COMFY_ORG_TOKEN,
          result.data.comfyOrgToken
        )
        const newExpiry = Date.now() + (result.data.expiresIn || 3600) * 1000
        localStorage.setItem(
          HUIZHI_STORAGE_KEYS.COMFY_ORG_EXPIRY,
          newExpiry.toString()
        )
        console.log('[HuizhiAuth] ComfyOrg token refreshed successfully')

        // 用 comfyCredentials 刷新 Firebase 登录状态
        if (result.data.comfyCredentials) {
          try {
            const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth')
            const auth = getAuth()
            if (!auth.currentUser) {
              console.log('[HuizhiAuth] Firebase currentUser is null, re-authenticating...')
              await signInWithEmailAndPassword(
                auth,
                result.data.comfyCredentials.email,
                result.data.comfyCredentials.password
              )
              console.log('[HuizhiAuth] Firebase re-auth SUCCESS')
            }
          } catch (firebaseErr) {
            console.warn('[HuizhiAuth] Firebase re-auth failed (non-critical):', firebaseErr)
          }
        }

        setupTokenRefresh()
      }
    } else if (response.status === 401) {
      console.warn('[HuizhiAuth] Session expired, redirecting to login')
      handleHuizhiLogout(false)
    }
  } catch (err) {
    console.error('[HuizhiAuth] Failed to refresh token:', err)
    if (tokenRefreshTimer) clearTimeout(tokenRefreshTimer)
    tokenRefreshTimer = setTimeout(refreshComfyOrgToken, 5 * 60 * 1000)
  }
}

// ============= 绘智退出登录 =============
// 先做同步清理并立即重定向，避免等待 Firebase/后端导致界面卡死；异步清理在后台执行不阻塞
export async function handleHuizhiLogout(confirmLogout = true): Promise<void> {
  if (confirmLogout && !confirm('确定要退出登录吗？')) {
    return
  }

  console.log('[HuizhiAuth] ========== Starting logout ==========')

  // 先保存 token，供后台登出请求使用（清除存储后无法再读）
  const tokenForBackend =
    localStorage.getItem(HUIZHI_STORAGE_KEYS.TOKEN) ||
    localStorage.getItem('comfy_token')

  // 设置退出标志，阻止 WS 重连
  ;(window as any).__HUIZHI_LOGOUT_IN_PROGRESS__ = true
  isLoggingOut.value = true

  // 停止定时器
  stopDeviceCheckPolling()
  if (tokenRefreshTimer) {
    clearTimeout(tokenRefreshTimer)
    tokenRefreshTimer = null
  }

  // 关闭 WebSocket 并将 api.socket 置 null 防止重连
  try {
    const apiInstance = (window as any).app?.api
    if (apiInstance) {
      const socket = apiInstance.socket
      if (socket && (socket.readyState === 0 || socket.readyState === 1)) {
        socket.close(1000, 'User logout')
      }
      apiInstance.socket = null
    }
  } catch (e) { /* ignore */ }

  // ========== 同步清理存储（不 await 任何网络/异步，避免卡死）==========
  Object.values(HUIZHI_STORAGE_KEYS).forEach((key) => {
    try { localStorage.removeItem(key) } catch (e) { /* ignore */ }
  })
  const keysToRemove = [
    'comfy_user', 'comfy_refresh_token', 'huizhi_user_info',
    'comfy_token', 'clientId'
  ]
  keysToRemove.forEach((key) => {
    try { localStorage.removeItem(key) } catch (e) { /* ignore */ }
  })
  const allKeys: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (k) allKeys.push(k)
  }
  allKeys.forEach((key) => {
    if (key && (key.includes('firebase') || key.includes('comfy') || key.includes('huizhi'))) {
      try { localStorage.removeItem(key) } catch (e) { /* ignore */ }
    }
  })

  const cookiesToClear = ['comfy_token', 'huizhi_token', 'comfy_org_token']
  cookiesToClear.forEach((cookieName) => {
    document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
    document.cookie = `${cookieName}=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  })
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim()
    if (name) {
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
    }
  })

  try { sessionStorage.clear() } catch (e) { /* ignore */ }
  try { indexedDB.deleteDatabase('firebaseLocalStorageDb') } catch (e) { /* ignore */ }

  const loginUrl = `${window.location.origin}/login?logout=1&ts=${Date.now()}`

  // ========== 立即重定向，不等待任何异步（避免卡死）==========
  console.log('[HuizhiAuth] Storage cleared, redirecting to /login...')
  setTimeout(() => {
    window.location.replace(loginUrl)
    setTimeout(() => {
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = loginUrl
      }
    }, 80)
  }, 0)

  // ========== 后台异步清理（不阻塞，不 await）==========
  if (tokenForBackend) {
    fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenForBackend}`,
        'Content-Type': 'application/json'
      }
    }).catch(() => { /* ignore */ })
  }
  import('@/stores/firebaseAuthStore').then(({ useFirebaseAuthStore }) => {
    const authStore = useFirebaseAuthStore()
    if (authStore?.logout) authStore.logout().catch(() => {})
  }).catch(() => {})
  if ('caches' in window) {
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))).catch(() => {})
  }
}

// ============= 初始化绘智认证服务 =============
export function initHuizhiAuthService(): void {
  if (!isHuizhiLoggedIn()) {
    console.log('[HuizhiAuth] Not logged in via Huizhi service')
    return
  }

  const userInfo = getHuizhiUserInfo()
  console.log('[HuizhiAuth] Initializing for user:', userInfo?.username)

  // 设置 Token 自动刷新
  setupTokenRefresh()

  // 启动设备检查轮询 (单点登录检测)
  startDeviceCheckPolling()
}

// ============= 导出 =============
export default {
  HUIZHI_STORAGE_KEYS,
  getDeviceId,
  isHuizhiLoggedIn,
  getHuizhiUserInfo,
  startDeviceCheckPolling,
  stopDeviceCheckPolling,
  setupTokenRefresh,
  handleHuizhiLogout,
  initHuizhiAuthService
}
