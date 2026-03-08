<template>
  <SidebarIcon
    icon="pi pi-sign-out"
    :tooltip="tooltip"
    :label="$t('sideToolbar.logout')"
    @click="logout"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useUserStore } from '@/stores/userStore'

import SidebarIcon from './SidebarIcon.vue'

const { t } = useI18n()
const userStore = useUserStore()

const tooltip = computed(
  () => `${t('sideToolbar.logout')} (${userStore.currentUser?.username})`
)
const logout = async () => {
  // 统一使用绘智退出登录逻辑，确保清空所有登录态并重定向到 /login
  // 清空所有的本地存储
  localStorage.clear()
  // 返回到 /login 页面
  window.location.href = '/login'
  const { handleHuizhiLogout } = await import('@/services/huizhiAuthService')
  await handleHuizhiLogout(false)
}
</script>
