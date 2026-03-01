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
const AUTH_SERVICE_URL = 'http://localhost:3001'

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

  // 停止所有定时器
  stopDeviceCheckPolling()
  if (tokenRefreshTimer) {
    clearTimeout(tokenRefreshTimer)
    tokenRefreshTimer = null
  }

  // 清除所有 Token
  Object.values(HUIZHI_STORAGE_KEYS).forEach((key) =>
    localStorage.removeItem(key)
  )
  localStorage.removeItem('comfy_user')
  localStorage.removeItem('comfy_refresh_token')
  localStorage.removeItem('huizhi_user_info')

  // 清除 Cookie
  document.cookie =
    'comfy_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'

  // 设置退出标志
  sessionStorage.setItem('comfy_logout_in_progress', 'true')
  if (message) {
    sessionStorage.setItem('login_message', message)
  }

  // 跳转到登录页
  window.location.href = '/login'
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
      if (result.data && result.data.comfyOrgToken) {
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

        // 重新设置下一次刷新
        setupTokenRefresh()
      }
    } else if (response.status === 401) {
      // Huizhi token 过期，需要重新登录
      console.warn('[HuizhiAuth] Session expired, redirecting to login')
      handleHuizhiLogout(false)
    }
  } catch (err) {
    console.error('[HuizhiAuth] Failed to refresh token:', err)
    // 5 分钟后重试
    if (tokenRefreshTimer) clearTimeout(tokenRefreshTimer)
    tokenRefreshTimer = setTimeout(refreshComfyOrgToken, 5 * 60 * 1000)
  }
}

// ============= 绘智退出登录 (完整流程，阻止 WebSocket 重连) =============
export function handleHuizhiLogout(confirmLogout = true): void {
  if (confirmLogout && !confirm('确定要退出登录吗？')) {
    return
  }

  console.log('[HuizhiAuth] ========== Starting logout process ==========')

  // ============ 第0步: 立即隐藏页面，防止显示 Reconnecting ============
  try {
    document.body.style.opacity = '0'
    document.body.style.pointerEvents = 'none'
    // 添加遮罩层
    const overlay = document.createElement('div')
    overlay.id = 'huizhi-logout-overlay'
    overlay.style.cssText =
      'position:fixed;top:0;left:0;right:0;bottom:0;background:#1a1a1a;z-index:999999;display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;'
    overlay.innerHTML = '<div>正在退出登录...</div>'
    document.body.appendChild(overlay)
  } catch (e) {
    /* ignore */
  }

  // ============ 第1步: 立即设置全局退出标志 ============
  // 这些标志会被 api.ts 中的 WebSocket 重连逻辑检查
  ;(window as any).__HUIZHI_LOGOUT_IN_PROGRESS__ = true
  sessionStorage.setItem('comfy_logout_in_progress', 'true')

  // 在 window 上也标记，防止任何异步代码检查
  try {
    Object.defineProperty(window, '__LOGOUT_ACTIVE__', {
      value: true,
      writable: false,
      configurable: false
    })
  } catch (e) {
    /* ignore if already defined */
  }

  console.log('[HuizhiAuth] Step 1: Logout flags set')

  // ============ 第2步: 停止设备检查轮询 ============
  stopDeviceCheckPolling()
  console.log('[HuizhiAuth] Step 2: Device check polling stopped')

  // ============ 第3步: 清除所有定时器 ============
  if (tokenRefreshTimer) {
    clearTimeout(tokenRefreshTimer)
    tokenRefreshTimer = null
  }

  // 暴力清除所有 setTimeout 和 setInterval
  const highestTimeoutId = setTimeout(() => {}, 0) as unknown as number
  const highestIntervalId = setInterval(() => {}, 10000) as unknown as number
  clearInterval(highestIntervalId)

  console.log(
    '[HuizhiAuth] Step 3: Clearing timers up to ID',
    Math.max(highestTimeoutId, highestIntervalId)
  )

  for (
    let i = 0;
    i <= Math.max(highestTimeoutId, highestIntervalId) + 100;
    i++
  ) {
    try {
      clearTimeout(i)
    } catch (e) {
      /* ignore */
    }
    try {
      clearInterval(i)
    } catch (e) {
      /* ignore */
    }
  }

  console.log('[HuizhiAuth] Step 3: All timers cleared')

  // ============ 第4步: 关闭 WebSocket 连接 ============
  const closeWebSocket = (socket: WebSocket | null, name: string) => {
    if (!socket) return
    try {
      // 先移除所有事件监听器
      socket.onopen = null
      socket.onclose = null
      socket.onerror = null
      socket.onmessage = null

      // 如果 socket 还在连接中，强制关闭
      if (
        socket.readyState === WebSocket.CONNECTING ||
        socket.readyState === WebSocket.OPEN
      ) {
        socket.close(1000, 'User logout')
      }
      console.log('[HuizhiAuth] WebSocket closed:', name)
    } catch (e) {
      console.warn('[HuizhiAuth] Error closing WebSocket:', name, e)
    }
  }

  // 关闭 ComfyUI API 的 WebSocket
  if ((window as any).app?.api?.socket) {
    closeWebSocket((window as any).app.api.socket, 'app.api.socket')
    ;(window as any).app.api.socket = null
  }

  // 尝试查找并关闭其他可能的 WebSocket
  if ((window as any).api?.socket) {
    closeWebSocket((window as any).api.socket, 'api.socket')
    ;(window as any).api.socket = null
  }

  console.log('[HuizhiAuth] Step 4: WebSocket connections closed')

  // ============ 第5步: 覆盖 WebSocket 构造函数阻止重连 ============
  ;(window as any).WebSocket = function (url: string) {
    console.log('[HuizhiAuth] WebSocket connection BLOCKED:', url)
    // 返回一个假的 WebSocket 对象
    return {
      url: url,
      readyState: 3, // CLOSED
      bufferedAmount: 0,
      extensions: '',
      protocol: '',
      binaryType: 'blob',
      onopen: null,
      onclose: null,
      onerror: null,
      onmessage: null,
      send: function () {
        console.log('[HuizhiAuth] Fake WS send blocked')
      },
      close: function () {
        console.log('[HuizhiAuth] Fake WS close called')
      },
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () {
        return false
      }
    }
  }
  ;(window as any).WebSocket.CONNECTING = 0
  ;(window as any).WebSocket.OPEN = 1
  ;(window as any).WebSocket.CLOSING = 2
  ;(window as any).WebSocket.CLOSED = 3

  console.log('[HuizhiAuth] Step 5: WebSocket constructor replaced')

  // ============ 第6步: 清除本地存储 ============
  // 清除绘智相关
  Object.values(HUIZHI_STORAGE_KEYS).forEach((key) => {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      /* ignore */
    }
  })

  // 清除其他可能的存储
  const keysToRemove = [
    'comfy_user',
    'comfy_refresh_token',
    'huizhi_user_info',
    'comfy_token',
    'clientId'
  ]
  keysToRemove.forEach((key) => {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      /* ignore */
    }
  })

  // 清除 Firebase 相关
  const allKeys: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key) allKeys.push(key)
  }
  allKeys.forEach((key) => {
    if (
      key &&
      (key.includes('firebase') ||
        key.includes('comfy') ||
        key.includes('huizhi'))
    ) {
      try {
        localStorage.removeItem(key)
      } catch (e) {
        /* ignore */
      }
    }
  })

  // 清除 sessionStorage
  try {
    // 保留 logout 标志，其他都清除
    sessionStorage.clear()
    sessionStorage.setItem('comfy_logout_in_progress', 'true')
  } catch (e) {
    /* ignore */
  }

  // 清除 IndexedDB (Firebase 存储)
  try {
    indexedDB.deleteDatabase('firebaseLocalStorageDb')
  } catch (e) {
    /* ignore */
  }

  console.log('[HuizhiAuth] Step 6: Local storage cleared')

  // ============ 第7步: 清除 Cookie ============
  const clearCookies = () => {
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      const name = cookie.split('=')[0].trim()
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
      document.cookie = `${name}=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 GMT`
    }
  }
  clearCookies()

  console.log('[HuizhiAuth] Step 7: Cookies cleared')

  console.log('[HuizhiAuth] ========== Redirecting to login page ==========')

  // ============ 第8步: 强制跳转（不要调 window.stop()，会取消导航） ============
  window.location.replace('/login?logout=1')
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
