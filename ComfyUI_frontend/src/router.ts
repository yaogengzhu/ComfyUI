import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'

import { isCloud } from '@/platform/distribution/types'
import { useTelemetry } from '@/platform/telemetry'
import { useUserStore } from '@/stores/userStore'
import { isHuizhiLoggedIn } from '@/services/huizhiAuthService'
import LayoutDefault from '@/views/layouts/LayoutDefault.vue'

import { installPreservedQueryTracker } from '@/platform/navigation/preservedQueryTracker'
import { PRESERVED_QUERY_NAMESPACES } from '@/platform/navigation/preservedQueryNamespaces'

const cloudOnboardingRoutes = isCloud
  ? (await import('./platform/cloud/onboarding/onboardingCloudRoutes'))
      .cloudOnboardingRoutes
  : []

const isFileProtocol = window.location.protocol === 'file:'

/**
 * Determine base path for the router.
 * - 本地 / Electron: 始终使用根路径
 * - Cloud: 使用 Vite 的 BASE_URL（云端部署用，不影响本地）
 * - 反向代理路径：用 window.location.pathname 兼容 http://mysite.com/ComfyUI/
 */
function getBasePath(): string {
  // 当前项目只做本地 / 桌面部署，统一使用根路径
  // 保留 isCloud 判断是为了兼容可能的云端构建
  if (isCloud) return import.meta.env?.BASE_URL || '/'
  return window.location.pathname
}

const basePath = getBasePath()

function trackPageView(): void {
  if (!isCloud || typeof window === 'undefined') return

  useTelemetry()?.trackPageView(document.title, {
    path: window.location.href
  })
}

const router = createRouter({
  history: isFileProtocol
    ? createWebHashHistory()
    : // Base path must be specified to ensure correct relative paths
      // Example: For URL 'http://localhost:7801/ComfyBackendDirect',
      // we need this base path or assets will incorrectly resolve from 'http://localhost:7801/'
      createWebHistory(basePath),
  routes: [
    ...(isCloud ? cloudOnboardingRoutes : []),
    {
      path: '/',
      component: LayoutDefault,
      children: [
        {
          path: '',
          name: 'GraphView',
          component: () => import('@/views/GraphView.vue'),
          beforeEnter: async (_to, _from, next) => {
            // Then check user store
            const userStore = useUserStore()
            await userStore.initialize()
            if (userStore.needsLogin) {
              next('/user-select')
            } else {
              next()
            }
          }
        },
        {
          path: 'user-select',
          name: 'UserSelectView',
          component: () => import('@/views/UserSelectView.vue')
        }
      ]
    }
  ],

  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

installPreservedQueryTracker(router, [
  {
    namespace: PRESERVED_QUERY_NAMESPACES.TEMPLATE,
    keys: ['template', 'source', 'mode']
  },
  {
    namespace: PRESERVED_QUERY_NAMESPACES.INVITE,
    keys: ['invite']
  }
])

router.afterEach(() => {
  trackPageView()
})

// ========== 绘智登录路由守卫（统一逻辑：本地 / 桌面 / 云端都走这一套） ==========
// 公开路径（不需要登录）
const PUBLIC_PATHS = new Set(['/login', '/register'])

router.beforeEach(async (to, _from, next) => {
  // 如果是公开路径，直接放行
  if (PUBLIC_PATHS.has(to.path)) {
    return next()
  }

  // 检查绘智登录状态（基于本地 huizhi_token）
  const isLoggedIn = isHuizhiLoggedIn()

  // 如果未登录，重定向到登录页
  if (!isLoggedIn) {
    console.log('[Router] Not logged in, redirecting to /login')
    // 保存原始路径，登录后可以跳转回来
    const query =
      to.path !== '/'
        ? { redirect: encodeURIComponent(to.fullPath) }
        : {}
    return next({
      path: '/login',
      query
    })
  }

  // 已登录，继续导航
  return next()
})

export default router
