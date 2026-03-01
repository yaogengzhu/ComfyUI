import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { l as storeToRefs } from "./vendor-vue-core-tg-oZu4l.js";
import { n as useI18n } from "./vendor-i18n-czJbbAfl.js";
import { Di as useWorkflowStore, t as useDialogService, ti as useTeamWorkspaceStore } from "./dialogService-CX-W6rM1.js";
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

//# sourceMappingURL=useWorkspaceSwitch-BjWDdiET.js.map