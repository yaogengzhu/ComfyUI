import { FirebaseError } from 'firebase/app'
import {
  AuthErrorCodes,
  GithubAuthProvider,
  GoogleAuthProvider,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  onAuthStateChanged,
  onIdTokenChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword
} from 'firebase/auth'
import type { Auth, User, UserCredential } from 'firebase/auth'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useFirebaseAuth } from 'vuefire'

import { getComfyApiBaseUrl } from '@/config/comfyApi'
import { t } from '@/i18n'
import { WORKSPACE_STORAGE_KEYS } from '@/platform/workspace/workspaceConstants'
import { isCloud } from '@/platform/distribution/types'
import { useTelemetry } from '@/platform/telemetry'
import { useDialogService } from '@/services/dialogService'
import { useApiKeyAuthStore } from '@/stores/apiKeyAuthStore'
import type { AuthHeader } from '@/types/authTypes'
import type { operations } from '@/types/comfyRegistryTypes'
import { useFeatureFlags } from '@/composables/useFeatureFlags'

// ============= 绘智 AI 认证集成 =============
// 导入绘智认证服务
import {
  HUIZHI_STORAGE_KEYS,
  isHuizhiLoggedIn,
  getHuizhiUserInfo,
  initHuizhiAuthService,
  stopDeviceCheckPolling
} from '@/services/huizhiAuthService'

/**
 * 获取绘智服务提供的 ComfyOrg Token
 */
function getHuizhiComfyOrgToken(): string | null {
  return localStorage.getItem(HUIZHI_STORAGE_KEYS.COMFY_ORG_TOKEN)
}

/**
 * 创建模拟的 Firebase User 对象
 * 用于满足 UI 组件的类型需求
 */
function createMockFirebaseUser(userInfo: { email: string; username: string; uid?: string }): Partial<User> {
  return {
    uid: userInfo.uid || 'huizhi-user',
    email: userInfo.email,
    displayName: userInfo.username,
    emailVerified: true,
    isAnonymous: false,
    providerId: 'huizhi',
    // 模拟 getIdToken 方法，返回绘智的 ComfyOrg Token
    getIdToken: async () => getHuizhiComfyOrgToken() || '',
    // 其他必要的属性
    metadata: {
      creationTime: new Date().toISOString(),
      lastSignInTime: new Date().toISOString()
    } as any,
    providerData: [],
    refreshToken: '',
    tenantId: null,
    photoURL: null,
    phoneNumber: null,
    delete: async () => {},
    getIdTokenResult: async () => ({} as any),
    reload: async () => {},
    toJSON: () => ({})
  }
}
// ============= 绘智 AI 认证集成结束 =============

type CreditPurchaseResponse =
  operations['InitiateCreditPurchase']['responses']['201']['content']['application/json']
type CreditPurchasePayload =
  operations['InitiateCreditPurchase']['requestBody']['content']['application/json']
type CreateCustomerResponse =
  operations['createCustomer']['responses']['201']['content']['application/json']
type GetCustomerBalanceResponse =
  operations['GetCustomerBalance']['responses']['200']['content']['application/json']
type AccessBillingPortalResponse =
  operations['AccessBillingPortal']['responses']['200']['content']['application/json']
type AccessBillingPortalReqBody =
  operations['AccessBillingPortal']['requestBody']
export type BillingPortalTargetTier = NonNullable<
  NonNullable<
    NonNullable<AccessBillingPortalReqBody>['content']
  >['application/json']
>['target_tier']

export class FirebaseAuthStoreError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'FirebaseAuthStoreError'
  }
}

export const useFirebaseAuthStore = defineStore('firebaseAuth', () => {
  const { flags } = useFeatureFlags()

  // State
  const loading = ref(false)
  const currentUser = ref<User | null>(null)
  const isInitialized = ref(false)
  const customerCreated = ref(false)
  const isFetchingBalance = ref(false)

  // ============= 绘智 AI 认证状态 =============
  const huizhiLoggedIn = ref(isHuizhiLoggedIn())
  const huizhiUserInfo = ref(getHuizhiUserInfo())
  // ============================================

  // Balance state
  const balance = ref<GetCustomerBalanceResponse | null>(null)
  const lastBalanceUpdateTime = ref<Date | null>(null)

  // Token refresh trigger - increments when token is refreshed
  const tokenRefreshTrigger = ref(0)
  /**
   * The user ID for which the initial ID token has been observed.
   * When a token changes for the same user, that is a refresh.
   */
  const lastTokenUserId = ref<string | null>(null)

  const buildApiUrl = (path: string) => `${getComfyApiBaseUrl()}${path}`

  // Providers
  const googleProvider = new GoogleAuthProvider()
  googleProvider.addScope('email')
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  })
  const githubProvider = new GithubAuthProvider()
  githubProvider.addScope('user:email')
  githubProvider.setCustomParameters({
    prompt: 'select_account'
  })

  // ============= 修改 Getters - 优先检查绘智登录状态 =============
  const isAuthenticated = computed(() => {
    // 优先检查绘智登录状态
    if (huizhiLoggedIn.value) {
      return true
    }
    return !!currentUser.value
  })
  
  const userEmail = computed(() => {
    // 优先返回绘智用户邮箱
    if (huizhiLoggedIn.value && huizhiUserInfo.value) {
      return huizhiUserInfo.value.email
    }
    return currentUser.value?.email
  })
  
  const userId = computed(() => {
    // 优先返回绘智用户 ID
    if (huizhiLoggedIn.value && huizhiUserInfo.value) {
      return huizhiUserInfo.value.uid
    }
    return currentUser.value?.uid
  })
  // ============================================================

  // Get auth from VueFire and listen for auth state changes
  // From useFirebaseAuth docs:
  // Retrieves the Firebase Auth instance. Returns `null` on the server.
  // When using this function on the client in TypeScript, you can force the type with `useFirebaseAuth()!`.
  const auth = useFirebaseAuth()!
  // Set persistence to localStorage (works in both browser and Electron)
  void setPersistence(auth, browserLocalPersistence)

  // ============= 初始化时检查绘智登录状态 =============
  // 如果绘智已登录，设置模拟用户
  if (huizhiLoggedIn.value && huizhiUserInfo.value) {
    console.log('[Huizhi] User already logged in via Huizhi service:', huizhiUserInfo.value.email)
    currentUser.value = createMockFirebaseUser(huizhiUserInfo.value) as User
    isInitialized.value = true
    
    // 初始化绘智认证服务 (包括设备检查轮询和 Token 自动刷新)
    initHuizhiAuthService()
  }

  // 监听 localStorage 变化，实时更新绘智登录状态
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (event) => {
      if (event.key === HUIZHI_STORAGE_KEYS.TOKEN || event.key === HUIZHI_STORAGE_KEYS.COMFY_ORG_TOKEN) {
        huizhiLoggedIn.value = isHuizhiLoggedIn()
        huizhiUserInfo.value = getHuizhiUserInfo()
        
        if (huizhiLoggedIn.value && huizhiUserInfo.value) {
          console.log('[Huizhi] User logged in via Huizhi service')
          currentUser.value = createMockFirebaseUser(huizhiUserInfo.value) as User
        }
      }
    })
  }
  // ====================================================

  onAuthStateChanged(auth, (user) => {
    // 如果绘智已登录，不要覆盖用户状态
    if (huizhiLoggedIn.value) {
      isInitialized.value = true
      return
    }
    
    currentUser.value = user
    isInitialized.value = true
    if (user === null) {
      lastTokenUserId.value = null

      // Clear workspace sessionStorage on logout to prevent stale tokens
      try {
        sessionStorage.removeItem(WORKSPACE_STORAGE_KEYS.CURRENT_WORKSPACE)
        sessionStorage.removeItem(WORKSPACE_STORAGE_KEYS.TOKEN)
        sessionStorage.removeItem(WORKSPACE_STORAGE_KEYS.EXPIRES_AT)
      } catch {
        // Ignore sessionStorage errors (e.g., in private browsing mode)
      }
    }

    // Reset balance when auth state changes
    balance.value = null
    lastBalanceUpdateTime.value = null
  })

  // Listen for token refresh events
  onIdTokenChanged(auth, (user) => {
    // 如果绘智已登录，跳过 Firebase token 变化监听
    if (huizhiLoggedIn.value) {
      return
    }
    
    if (user && isCloud) {
      // Skip initial token change
      if (lastTokenUserId.value !== user.uid) {
        lastTokenUserId.value = user.uid
        return
      }
      tokenRefreshTrigger.value++
    }
  })

  const getIdToken = async (): Promise<string | undefined> => {
    // ============= 优先返回绘智的 ComfyOrg Token =============
    if (huizhiLoggedIn.value) {
      const huizhiToken = getHuizhiComfyOrgToken()
      if (huizhiToken) {
        console.log('[Huizhi] Returning ComfyOrg token from Huizhi service')
        return huizhiToken
      }
    }
    // ========================================================
    
    if (!currentUser.value) return
    try {
      return await currentUser.value.getIdToken()
    } catch (error: unknown) {
      if (
        error instanceof FirebaseError &&
        error.code === AuthErrorCodes.NETWORK_REQUEST_FAILED
      ) {
        console.warn(
          'Could not authenticate with Firebase. Features requiring authentication might not work.'
        )
        return
      }

      useDialogService().showErrorDialog(error, {
        title: t('errorDialog.defaultTitle'),
        reportType: 'authenticationError'
      })
      console.error(error)
    }
  }

  /**
   * Retrieves the appropriate authentication header for API requests.
   * Checks for authentication in the following order:
   * 1. Workspace token (if team_workspaces_enabled and user has active workspace context)
   * 2. Firebase authentication token (if user is logged in)
   * 3. API key (if stored in the browser's credential manager)
   *
   * @returns {Promise<AuthHeader | null>}
   *   - A LoggedInAuthHeader with Bearer token (workspace or Firebase)
   *   - An ApiKeyAuthHeader with X-API-KEY if API key exists
   *   - null if no authentication method is available
   */
  const getAuthHeader = async (): Promise<AuthHeader | null> => {
    if (flags.teamWorkspacesEnabled) {
      const workspaceToken = sessionStorage.getItem(
        WORKSPACE_STORAGE_KEYS.TOKEN
      )
      const expiresAt = sessionStorage.getItem(
        WORKSPACE_STORAGE_KEYS.EXPIRES_AT
      )

      if (workspaceToken && expiresAt) {
        const expiryTime = parseInt(expiresAt, 10)
        if (Date.now() < expiryTime) {
          return {
            Authorization: `Bearer ${workspaceToken}`
          }
        }
      }
    }

    const token = await getIdToken()
    if (token) {
      return {
        Authorization: `Bearer ${token}`
      }
    }

    return useApiKeyAuthStore().getAuthHeader()
  }

  /**
   * Returns Firebase auth header for user-scoped endpoints (e.g., /customers/*).
   * Use this for endpoints that need user identity, not workspace context.
   */
  const getFirebaseAuthHeader = async (): Promise<AuthHeader | null> => {
    const token = await getIdToken()
    return token ? { Authorization: `Bearer ${token}` } : null
  }

  /**
   * Returns the raw auth token (not wrapped in a header object).
   * Priority: Huizhi token > workspace token > Firebase token.
   * Use this for WebSocket connections and backend node auth.
   */
  const getAuthToken = async (): Promise<string | undefined> => {
    // ============= 优先返回绘智的 ComfyOrg Token =============
    if (huizhiLoggedIn.value) {
      const huizhiToken = getHuizhiComfyOrgToken()
      if (huizhiToken) {
        console.log('[Huizhi] Returning ComfyOrg token for API nodes')
        return huizhiToken
      }
    }
    // ========================================================
    
    if (flags.teamWorkspacesEnabled) {
      const workspaceToken = sessionStorage.getItem(
        WORKSPACE_STORAGE_KEYS.TOKEN
      )
      const expiresAt = sessionStorage.getItem(
        WORKSPACE_STORAGE_KEYS.EXPIRES_AT
      )

      if (workspaceToken && expiresAt) {
        const expiryTime = parseInt(expiresAt, 10)
        if (Date.now() < expiryTime) {
          return workspaceToken
        }
      }
    }

    return await getIdToken()
  }

  const fetchBalance = async (): Promise<GetCustomerBalanceResponse | null> => {
    // 绘智用户如果有 ComfyOrg Token，也可以获取余额
    isFetchingBalance.value = true
    try {
      const authHeader = await getAuthHeader()
      if (!authHeader) {
        throw new FirebaseAuthStoreError(
          t('toastMessages.userNotAuthenticated')
        )
      }

      const response = await fetch(buildApiUrl('/customers/balance'), {
        headers: {
          ...authHeader,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        if (response.status === 404) {
          // Customer not found is expected for new users
          return null
        }
        const errorData = await response.json()
        throw new FirebaseAuthStoreError(
          t('toastMessages.failedToFetchBalance', {
            error: errorData.message
          })
        )
      }

      const balanceData = await response.json()
      // Update the last balance update time
      lastBalanceUpdateTime.value = new Date()
      balance.value = balanceData
      return balanceData
    } finally {
      isFetchingBalance.value = false
    }
  }

  const createCustomer = async (): Promise<CreateCustomerResponse> => {
    // 绘智用户如果有 ComfyOrg Token，也可以创建客户
    const authHeader = await getAuthHeader()
    if (!authHeader) {
      throw new FirebaseAuthStoreError(t('toastMessages.userNotAuthenticated'))
    }

    console.log('[Auth] Creating customer with header:', JSON.stringify(authHeader).substring(0, 100) + '...')
    
    const createCustomerRes = await fetch(buildApiUrl('/customers'), {
      method: 'POST',
      headers: {
        ...authHeader,
        'Content-Type': 'application/json'
      }
    })
    
    console.log('[Auth] Create customer response status:', createCustomerRes.status, createCustomerRes.statusText)
    
    if (!createCustomerRes.ok) {
      // 获取详细错误信息
      let errorDetail = createCustomerRes.statusText
      try {
        const errorJson = await createCustomerRes.json()
        console.error('[Auth] Create customer error:', errorJson)
        errorDetail = errorJson.message || errorJson.error || JSON.stringify(errorJson)
      } catch (e) {
        console.error('[Auth] Failed to parse error response')
      }
      
      throw new FirebaseAuthStoreError(
        t('toastMessages.failedToCreateCustomer', {
          error: errorDetail
        })
      )
    }

    const createCustomerResJson: CreateCustomerResponse =
      await createCustomerRes.json()
    console.log('[Auth] Create customer success:', createCustomerResJson)
    
    if (!createCustomerResJson?.id) {
      throw new FirebaseAuthStoreError(
        t('toastMessages.failedToCreateCustomer', {
          error: 'No customer ID returned'
        })
      )
    }

    return createCustomerResJson
  }

  const executeAuthAction = async <T>(
    action: (auth: Auth) => Promise<T>,
    options: {
      createCustomer?: boolean
    } = {}
  ): Promise<T> => {
    loading.value = true

    try {
      const result = await action(auth)

      // Create customer if needed
      if (options?.createCustomer) {
        const token = await getIdToken()
        if (!token) {
          throw new Error('Cannot create customer: User not authenticated')
        }
        await createCustomer()
      }

      return result
    } finally {
      loading.value = false
    }
  }

  const login = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    const result = await executeAuthAction(
      (authInstance) =>
        signInWithEmailAndPassword(authInstance, email, password),
      { createCustomer: true }
    )

    if (isCloud) {
      useTelemetry()?.trackAuth({
        method: 'email',
        is_new_user: false,
        user_id: result.user.uid
      })
    }

    return result
  }

  const register = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    const result = await executeAuthAction(
      (authInstance) =>
        createUserWithEmailAndPassword(authInstance, email, password),
      { createCustomer: true }
    )

    if (isCloud) {
      useTelemetry()?.trackAuth({
        method: 'email',
        is_new_user: true,
        user_id: result.user.uid
      })
    }

    return result
  }

  const loginWithGoogle = async (): Promise<UserCredential> => {
    const result = await executeAuthAction(
      (authInstance) => signInWithPopup(authInstance, googleProvider),
      { createCustomer: true }
    )

    if (isCloud) {
      const additionalUserInfo = getAdditionalUserInfo(result)
      const isNewUser = additionalUserInfo?.isNewUser ?? false
      useTelemetry()?.trackAuth({
        method: 'google',
        is_new_user: isNewUser,
        user_id: result.user.uid
      })
    }

    return result
  }

  const loginWithGithub = async (): Promise<UserCredential> => {
    const result = await executeAuthAction(
      (authInstance) => signInWithPopup(authInstance, githubProvider),
      { createCustomer: true }
    )

    if (isCloud) {
      const additionalUserInfo = getAdditionalUserInfo(result)
      const isNewUser = additionalUserInfo?.isNewUser ?? false
      useTelemetry()?.trackAuth({
        method: 'github',
        is_new_user: isNewUser,
        user_id: result.user.uid
      })
    }

    return result
  }

  const logout = async (): Promise<void> => {
    // ============= 清除绘智登录状态 =============
    if (huizhiLoggedIn.value) {
      console.log('[Huizhi] Logging out from Huizhi service')
      
      // 停止设备检查轮询
      stopDeviceCheckPolling()
      
      // 清除本地存储
      localStorage.removeItem(HUIZHI_STORAGE_KEYS.TOKEN)
      localStorage.removeItem(HUIZHI_STORAGE_KEYS.COMFY_ORG_TOKEN)
      localStorage.removeItem(HUIZHI_STORAGE_KEYS.COMFY_ORG_EXPIRY)
      localStorage.removeItem(HUIZHI_STORAGE_KEYS.USER_INFO)
      localStorage.removeItem(HUIZHI_STORAGE_KEYS.DEVICE_ID)
      localStorage.removeItem(HUIZHI_STORAGE_KEYS.SESSION_ID)
      localStorage.removeItem('huizhi_user_info')
      localStorage.removeItem('comfy_user')
      
      huizhiLoggedIn.value = false
      huizhiUserInfo.value = null
      currentUser.value = null
      balance.value = null
      lastBalanceUpdateTime.value = null
      return
    }
    // ============================================
    
    return executeAuthAction((authInstance) => signOut(authInstance))
  }

  const sendPasswordReset = async (email: string): Promise<void> =>
    executeAuthAction((authInstance) =>
      sendPasswordResetEmail(authInstance, email)
    )

  /** Update password for current user */
  const _updatePassword = async (newPassword: string): Promise<void> => {
    if (!currentUser.value) {
      throw new FirebaseAuthStoreError(t('toastMessages.userNotAuthenticated'))
    }
    await updatePassword(currentUser.value, newPassword)
  }

  const addCredits = async (
    requestBodyContent: CreditPurchasePayload
  ): Promise<CreditPurchaseResponse> => {
    // 绘智用户如果有 ComfyOrg Token，也可以购买积分
    const authHeader = await getAuthHeader()
    if (!authHeader) {
      throw new FirebaseAuthStoreError(t('toastMessages.userNotAuthenticated'))
    }

    // Ensure customer was created during login/registration
    if (!customerCreated.value) {
      await createCustomer()
      customerCreated.value = true
    }

    const response = await fetch(buildApiUrl('/customers/credit'), {
      method: 'POST',
      headers: {
        ...authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBodyContent)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new FirebaseAuthStoreError(
        t('toastMessages.failedToInitiateCreditPurchase', {
          error: errorData.message
        })
      )
    }

    return response.json()
  }

  const initiateCreditPurchase = async (
    requestBodyContent: CreditPurchasePayload
  ): Promise<CreditPurchaseResponse> =>
    executeAuthAction((_) => addCredits(requestBodyContent))

  const accessBillingPortal = async (
    targetTier?: BillingPortalTargetTier
  ): Promise<AccessBillingPortalResponse> => {
    // 绘智用户如果有 ComfyOrg Token，也可以访问账单门户
    const authHeader = await getAuthHeader()
    if (!authHeader) {
      throw new FirebaseAuthStoreError(t('toastMessages.userNotAuthenticated'))
    }

    const response = await fetch(buildApiUrl('/customers/billing'), {
      method: 'POST',
      headers: {
        ...authHeader,
        'Content-Type': 'application/json'
      },
      ...(targetTier && {
        body: JSON.stringify({ target_tier: targetTier })
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new FirebaseAuthStoreError(
        t('toastMessages.failedToAccessBillingPortal', {
          error: errorData.message
        })
      )
    }

    return response.json()
  }

  return {
    // State
    loading,
    currentUser,
    isInitialized,
    balance,
    lastBalanceUpdateTime,
    isFetchingBalance,
    tokenRefreshTrigger,

    // ============= 绘智 AI 状态 =============
    huizhiLoggedIn,
    huizhiUserInfo,
    // ========================================

    // Getters
    isAuthenticated,
    userEmail,
    userId,

    // Actions
    login,
    register,
    logout,
    createCustomer,
    getIdToken,
    loginWithGoogle,
    loginWithGithub,
    initiateCreditPurchase,
    fetchBalance,
    accessBillingPortal,
    sendPasswordReset,
    updatePassword: _updatePassword,
    getAuthHeader,
    getFirebaseAuthHeader,
    getAuthToken
  }
})
