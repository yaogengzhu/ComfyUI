<!-- A popover that shows current user information and actions -->
<template>
  <div
    class="current-user-popover w-80 -m-3 p-2 rounded-lg border border-border-default bg-base-background shadow-[1px_1px_8px_0_rgba(0,0,0,0.4)]"
  >
    <!-- User Info Section -->
    <div class="flex flex-col items-center px-0 py-3 mb-4">
      <UserAvatar
        class="mb-1"
        :photo-url="userPhotoUrl"
        :pt:icon:class="{
          'text-2xl!': !userPhotoUrl
        }"
        size="large"
      />

      <!-- User Details -->
      <h3 class="my-0 mb-1 truncate text-base font-bold text-base-foreground">
        {{ userDisplayName || $t('g.user') }}
      </h3>
      <p v-if="userEmail" class="my-0 truncate text-sm text-muted">
        {{ userEmail }}
      </p>
    </div>

    <div
      class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-secondary-background-hover"
      data-testid="logout-menu-item"
      @click="handleLogout"
    >
      <i class="icon-[lucide--log-out] text-muted-foreground text-sm" />
      <span class="text-sm text-base-foreground flex-1">{{
        $t('auth.signOut.signOut')
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Divider from 'primevue/divider'

import UserAvatar from '@/components/common/UserAvatar.vue'
import { useCurrentUser } from '@/composables/auth/useCurrentUser'
import { isHuizhiLoggedIn, handleHuizhiLogout } from '@/services/huizhiAuthService'

const emit = defineEmits<{
  close: []
}>()

const { userDisplayName, userEmail, userPhotoUrl, handleSignOut } =
  useCurrentUser()

const handleLogout = async () => {
  // 绘智用户使用专用的退出逻辑
  if (isHuizhiLoggedIn()) {
    handleHuizhiLogout()
    return
  }
  await handleSignOut()
  emit('close')
}
</script>
