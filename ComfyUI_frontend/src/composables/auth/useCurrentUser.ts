import { whenever } from '@vueuse/core'
import { computed, watch } from 'vue'

import { useApiKeyAuthStore } from '@/stores/apiKeyAuthStore'
import { useCommandStore } from '@/stores/commandStore'
import { useFirebaseAuthStore } from '@/stores/firebaseAuthStore'
import { handleHuizhiLogout } from '@/services/huizhiAuthService'
import type { AuthUserInfo } from '@/types/authTypes'

export const useCurrentUser = () => {
  const authStore = useFirebaseAuthStore()
  const commandStore = useCommandStore()
  const apiKeyStore = useApiKeyAuthStore()

  const firebaseUser = computed(() => authStore.currentUser)
  const isApiKeyLogin = computed(() => apiKeyStore.isAuthenticated)
  const isLoggedIn = computed(
    () =>
      !!isApiKeyLogin.value ||
      firebaseUser.value !== null ||
      authStore.isAuthenticated
  )

  const resolvedUserInfo = computed<AuthUserInfo | null>(() => {
    if (isApiKeyLogin.value && apiKeyStore.currentUser) {
      return { id: apiKeyStore.currentUser.id }
    }

    if (firebaseUser.value) {
      return { id: firebaseUser.value.uid }
    }

    // External token fallback (绘智登录)
    if (authStore.isAuthenticated && authStore.userId) {
      return { id: authStore.userId }
    }

    return null
  })

  const onUserResolved = (callback: (user: AuthUserInfo) => void) =>
    whenever(resolvedUserInfo, callback, { immediate: true })

  const onTokenRefreshed = (callback: () => void) =>
    whenever(() => authStore.tokenRefreshTrigger, callback)

  const onUserLogout = (callback: () => void) => {
    watch(resolvedUserInfo, (user, prevUser) => {
      if (prevUser && !user) callback()
    })
  }

  const userDisplayName = computed(() => {
    if (isApiKeyLogin.value) {
      return apiKeyStore.currentUser?.name
    }
    if (firebaseUser.value?.displayName) {
      return firebaseUser.value.displayName
    }
    // External token fallback
    return authStore.userEmail ?? undefined
  })

  const userEmail = computed(() => {
    if (isApiKeyLogin.value) {
      return apiKeyStore.currentUser?.email
    }
    if (firebaseUser.value?.email) {
      return firebaseUser.value.email
    }
    // External token fallback
    return authStore.userEmail
  })

  const providerName = computed(() => {
    if (isApiKeyLogin.value) {
      return 'Comfy API Key'
    }

    const providerId = firebaseUser.value?.providerData[0]?.providerId
    if (providerId?.includes('google')) {
      return 'Google'
    }
    if (providerId?.includes('github')) {
      return 'GitHub'
    }
    return providerId
  })

  const providerIcon = computed(() => {
    if (isApiKeyLogin.value) {
      return 'pi pi-key'
    }

    const providerId = firebaseUser.value?.providerData[0]?.providerId
    if (providerId?.includes('google')) {
      return 'pi pi-google'
    }
    if (providerId?.includes('github')) {
      return 'pi pi-github'
    }
    return 'pi pi-user'
  })

  const isEmailProvider = computed(() => {
    if (isApiKeyLogin.value) {
      return false
    }

    const providerId = firebaseUser.value?.providerData[0]?.providerId
    return providerId === 'password'
  })

  const userPhotoUrl = computed(() => {
    if (isApiKeyLogin.value) return null
    return firebaseUser.value?.photoURL
  })

  const handleSignOut = async () => {
    await handleHuizhiLogout(false)
  }

  const handleSignIn = async () => {
    await commandStore.execute('Comfy.User.OpenSignInDialog')
  }

  return {
    loading: authStore.loading,
    isLoggedIn,
    isApiKeyLogin,
    isEmailProvider,
    userDisplayName,
    userEmail,
    userPhotoUrl,
    providerName,
    providerIcon,
    resolvedUserInfo,
    handleSignOut,
    handleSignIn,
    onUserResolved,
    onTokenRefreshed,
    onUserLogout
  }
}
