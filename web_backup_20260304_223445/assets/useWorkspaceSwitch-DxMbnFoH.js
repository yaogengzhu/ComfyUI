import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { l as storeToRefs } from "./vendor-vue-core-tg-oZu4l.js";
import { n as useI18n } from "./vendor-i18n-D6iZeZ7U.js";
import { i as useDialogService, t as useTeamWorkspaceStore, yi as useWorkflowStore } from "./teamWorkspaceStore-B1oHaZID.js";
function useWorkspaceSwitch() {
	const { t } = useI18n();
	const workspaceStore = useTeamWorkspaceStore();
	const { activeWorkspace } = storeToRefs(workspaceStore);
	const workflowStore = useWorkflowStore();
	const dialogService = useDialogService();
	function hasUnsavedChanges() {
		return workflowStore.modifiedWorkflows.length > 0;
	}
	async function switchWithConfirmation(workspaceId) {
		if (activeWorkspace.value?.id === workspaceId) return true;
		if (hasUnsavedChanges()) {
			if (!await dialogService.confirm({
				title: t("workspace.unsavedChanges.title"),
				message: t("workspace.unsavedChanges.message"),
				type: "dirtyClose"
			})) return false;
		}
		try {
			await workspaceStore.switchWorkspace(workspaceId);
			return true;
		} catch {
			return false;
		}
	}
	return {
		hasUnsavedChanges,
		switchWithConfirmation
	};
}
export { useWorkspaceSwitch as t };

//# sourceMappingURL=useWorkspaceSwitch-DxMbnFoH.js.map