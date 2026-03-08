<template>
  <div>
    <!--
    UnloadWindowConfirmDialog: This component does not render
    anything visible. It is used to confirm the user wants to
    close the window, and if they do, it will call the
    beforeunload event.
    -->
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'

import { useSettingStore } from '@/platform/settings/settingStore'
import { useWorkflowStore } from '@/platform/workflow/management/stores/workflowStore'
import { isDesktop } from '@/platform/distribution/types'

const settingStore = useSettingStore()
const workflowStore = useWorkflowStore()

const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  // 桌面版不拦截窗口关闭，避免 Electron 无法正常退出
  const willBlock =
    !isDesktop &&
    !!settingStore.get('Comfy.Window.UnloadConfirmation') &&
    workflowStore.modifiedWorkflows.length > 0
  // 始终在可能拦截时打日志，便于排查“点击无法关闭”
  if (willBlock || import.meta.env.DEV || (typeof window !== 'undefined' && (window as any).__HUIZHI_DEBUG_UNLOAD__)) {
    console.log('[绘智/Unload] beforeunload', {
      isDesktop,
      unloadConfirmation: settingStore.get('Comfy.Window.UnloadConfirmation'),
      modifiedCount: workflowStore.modifiedWorkflows.length,
      willBlock
    })
  }
  if (willBlock) {
    event.preventDefault()
    return true
  }
  return undefined
}

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})
</script>
