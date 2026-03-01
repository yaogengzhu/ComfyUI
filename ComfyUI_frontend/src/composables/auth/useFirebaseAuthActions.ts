import { FirebaseError } from 'firebase/app'
import { AuthErrorCodes } from 'firebase/auth'
import { ref } from 'vue'

import { useBillingContext } from '@/composables/billing/useBillingContext'
import { useErrorHandling } from '@/composables/useErrorHandling'
import type { ErrorRecoveryStrategy } from '@/composables/useErrorHandling'
import { t } from '@/i18n'
import { useTelemetry } from '@/platform/telemetry'
import { useToastStore } from '@/platform/updates/common/toastStore'
import { useDialogService } from '@/services/dialogService'
import { useFirebaseAuthStore } from '@/stores/firebaseAuthStore'
import type { BillingPortalTargetTier } from '@/stores/firebaseAuthStore'
import { usdToMicros } from '@/utils/formatUtil'

// ============= 绘智 AI 认证集成 =============
const HUIZHI_STORAGE_KEYS = {
  TOKEN: 'huizhi_token',
  COMFY_ORG_TOKEN: 'comfy_org_token',
  USER_INFO: 'huizhi_user_info'
}
// ============= 绘智 AI 认证集成结束 =============

/**
 * Service for Firebase Auth actions.
 * All actions are wrapped with error handling.
 * @returns {Object} - Object containing all Firebase Auth actions
 */
export const useFirebaseAuthActions = () => {
  const authStore = useFirebaseAuthStore()
  const toastStore = useToastStore()
  const { wrapWithErrorHandlingAsync, toastErrorHandler } = useErrorHandling()

  const accessError = ref(false)

  const reportError = (error: unknown) => {
    // Ref: https://firebase.google.com/docs/auth/admin/errors
    if (
      error instanceof FirebaseError &&
      [
        'auth/unauthorized-domain',
        'auth/invalid-dynamic-link-domain',
        'auth/unauthorized-continue-uri'
      ].includes(error.code)
    ) {
      accessError.value = true
      toastStore.add({
        severity: 'error',
        summary: t('g.error'),
        detail: t('toastMessages.unauthorizedDomain', {
          domain: window.location.hostname,
          email: 'support@comfy.org'
        })
      })
    } else {
      toastErrorHandler(error)
    }
  }

  const logout = wrapWithErrorHandlingAsync(async () => {
    // ============= 绘智平台：直接退出，清除所有登录态 =============
    // 清除所有绘智相关的 Token
    localStorage.removeItem(HUIZHI_STORAGE_KEYS.TOKEN)
    localStorage.removeItem(HUIZHI_STORAGE_KEYS.COMFY_ORG_TOKEN)
    localStorage.removeItem(HUIZHI_STORAGE_KEYS.USER_INFO)
    
    // 设置一个标志，告诉 WebSocket 不要重连
    sessionStorage.setItem('comfy_logout_in_progress', 'true')
    
    // 调用 authStore 清除 Firebase 登录态
    try {
      await authStore.logout()
    } catch (e) {
      // 忽略退出过程中的错误
      console.warn('[Huizhi] Logout error (ignored):', e)
    }
    
    // 停止页面上所有正在进行的请求和活动
    window.stop()
    
    // 使用 setTimeout 确保在下一个事件循环中跳转，给 window.stop() 时间生效
    setTimeout(() => {
      window.location.href = '/login'
    }, 50)
    
    // 返回一个永不 resolve 的 Promise，阻止后续代码执行
    return new Promise(() => {})
    // ==============================================================
  }, reportError)

  const sendPasswordReset = wrapWithErrorHandlingAsync(
    async (email: string) => {
      await authStore.sendPasswordReset(email)
      toastStore.add({
        severity: 'success',
        summary: t('auth.login.passwordResetSent'),
        detail: t('auth.login.passwordResetSentDetail'),
        life: 5000
      })
    },
    reportError
  )

  const purchaseCredits = wrapWithErrorHandlingAsync(async (amount: number) => {
    const { isActiveSubscription } = useBillingContext()
    if (!isActiveSubscription.value) return

    const response = await authStore.initiateCreditPurchase({
      amount_micros: usdToMicros(amount),
      currency: 'usd'
    })

    if (!response.checkout_url) {
      throw new Error(
        t('toastMessages.failedToPurchaseCredits', {
          error: 'No checkout URL returned'
        })
      )
    }

    useTelemetry()?.startTopupTracking()
    window.open(response.checkout_url, '_blank')
  }, reportError)

  const accessBillingPortal = wrapWithErrorHandlingAsync<
    [targetTier?: BillingPortalTargetTier, openInNewTab?: boolean],
    void
  >(async (targetTier, openInNewTab = true) => {
    const response = await authStore.accessBillingPortal(targetTier)
    if (!response.billing_portal_url) {
      throw new Error(
        t('toastMessages.failedToAccessBillingPortal', {
          error: 'No billing portal URL returned'
        })
      )
    }
    if (openInNewTab) {
      window.open(response.billing_portal_url, '_blank')
    } else {
      globalThis.location.href = response.billing_portal_url
    }
  }, reportError)

  const fetchBalance = wrapWithErrorHandlingAsync(async () => {
    const result = await authStore.fetchBalance()
    // Top-up completion tracking happens in UsageLogsTable when events are fetched
    return result
  }, reportError)

  const signInWithGoogle = wrapWithErrorHandlingAsync(async () => {
    return await authStore.loginWithGoogle()
  }, reportError)

  const signInWithGithub = wrapWithErrorHandlingAsync(async () => {
    return await authStore.loginWithGithub()
  }, reportError)

  const signInWithEmail = wrapWithErrorHandlingAsync(
    async (email: string, password: string) => {
      return await authStore.login(email, password)
    },
    reportError
  )

  const signUpWithEmail = wrapWithErrorHandlingAsync(
    async (email: string, password: string) => {
      return await authStore.register(email, password)
    },
    reportError
  )

  /**
   * Recovery strategy for Firebase auth/requires-recent-login errors.
   * Prompts user to reauthenticate and retries the operation after successful login.
   */
  const createReauthenticationRecovery = <
    TArgs extends unknown[],
    TReturn
  >(): ErrorRecoveryStrategy<TArgs, TReturn> => {
    const dialogService = useDialogService()

    return {
      shouldHandle: (error: unknown) =>
        error instanceof FirebaseError &&
        error.code === AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN,

      recover: async (
        _error: unknown,
        retry: (...args: TArgs) => Promise<TReturn> | TReturn,
        args: TArgs
      ) => {
        const confirmed = await dialogService.confirm({
          title: t('auth.reauthRequired.title'),
          message: t('auth.reauthRequired.message'),
          type: 'default'
        })

        if (!confirmed) {
          return
        }

        await authStore.logout()

        const signedIn = await dialogService.showSignInDialog()

        if (signedIn) {
          await retry(...args)
        }
      }
    }
  }

  const updatePassword = wrapWithErrorHandlingAsync(
    async (newPassword: string) => {
      await authStore.updatePassword(newPassword)
      toastStore.add({
        severity: 'success',
        summary: t('auth.passwordUpdate.success'),
        detail: t('auth.passwordUpdate.successDetail'),
        life: 5000
      })
    },
    reportError,
    undefined,
    [createReauthenticationRecovery<[string], void>()]
  )

  return {
    logout,
    sendPasswordReset,
    purchaseCredits,
    accessBillingPortal,
    fetchBalance,
    signInWithGoogle,
    signInWithGithub,
    signInWithEmail,
    signUpWithEmail,
    updatePassword,
    accessError,
    reportError
  }
}
