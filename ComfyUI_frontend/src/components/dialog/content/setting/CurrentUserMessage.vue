<!-- A message that displays the current user -->
<template>
  <Message
    v-if="userStore.isMultiUserServer"
    severity="info"
    icon="pi pi-user"
    pt:text="w-full"
    data-testid="current-user-indicator"
  >
    <div class="flex items-center justify-between">
      <div class="tabular-nums">
        {{ $t('g.currentUser') }}: {{ userStore.currentUser?.username }}
      </div>
      <Button
        class="text-inherit"
        variant="textonly"
        size="icon"
        :aria-label="$t('menuLabels.Sign Out')"
        @click="logout"
      >
        <i class="pi pi-sign-out" />
      </Button>
    </div>
  </Message>
</template>

<script setup lang="ts">
import Message from 'primevue/message'

import Button from '@/components/ui/button/Button.vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const logout = async () => {
  // 统一使用绘智退出登录逻辑，确保清空所有登录态并重定向到 /login
  const { handleHuizhiLogout } = await import('@/services/huizhiAuthService')
  await handleHuizhiLogout(false)
}
</script>
