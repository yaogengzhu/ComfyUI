import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { D as computed } from "./vendor-vue-core-tg-oZu4l.js";
import { Gt as createSharedComposable } from "./vendor-reka-ui-jxMUDvZT.js";
import { ti as useTeamWorkspaceStore } from "./dialogService-BUdss0z2.js";
function getPermissions(type, role) {
	if (type === "personal") return {
		canViewOtherMembers: false,
		canViewPendingInvites: false,
		canInviteMembers: false,
		canManageInvites: false,
		canRemoveMembers: false,
		canLeaveWorkspace: false,
		canAccessWorkspaceMenu: false,
		canManageSubscription: true,
		canTopUp: true
	};
	if (role === "owner") return {
		canViewOtherMembers: true,
		canViewPendingInvites: true,
		canInviteMembers: true,
		canManageInvites: true,
		canRemoveMembers: true,
		canLeaveWorkspace: true,
		canAccessWorkspaceMenu: true,
		canManageSubscription: true,
		canTopUp: true
	};
	return {
		canViewOtherMembers: true,
		canViewPendingInvites: false,
		canInviteMembers: false,
		canManageInvites: false,
		canRemoveMembers: false,
		canLeaveWorkspace: true,
		canAccessWorkspaceMenu: true,
		canManageSubscription: false,
		canTopUp: false
	};
}
function getUIConfig(type, role) {
	if (type === "personal") return {
		showMembersList: false,
		showPendingTab: false,
		showSearch: false,
		showDateColumn: false,
		showRoleBadge: false,
		membersGridCols: "grid-cols-1",
		pendingGridCols: "grid-cols-[50%_20%_20%_10%]",
		headerGridCols: "grid-cols-1",
		showEditWorkspaceMenuItem: false,
		workspaceMenuAction: null,
		workspaceMenuDisabledTooltip: null
	};
	if (role === "owner") return {
		showMembersList: true,
		showPendingTab: true,
		showSearch: true,
		showDateColumn: true,
		showRoleBadge: true,
		membersGridCols: "grid-cols-[50%_40%_10%]",
		pendingGridCols: "grid-cols-[50%_20%_20%_10%]",
		headerGridCols: "grid-cols-[50%_40%_10%]",
		showEditWorkspaceMenuItem: true,
		workspaceMenuAction: "delete",
		workspaceMenuDisabledTooltip: "workspacePanel.menu.deleteWorkspaceDisabledTooltip"
	};
	return {
		showMembersList: true,
		showPendingTab: false,
		showSearch: true,
		showDateColumn: true,
		showRoleBadge: true,
		membersGridCols: "grid-cols-[1fr_auto]",
		pendingGridCols: "grid-cols-[50%_20%_20%_10%]",
		headerGridCols: "grid-cols-[1fr_auto]",
		showEditWorkspaceMenuItem: false,
		workspaceMenuAction: "leave",
		workspaceMenuDisabledTooltip: null
	};
}
function useWorkspaceUIInternal() {
	const store = useTeamWorkspaceStore();
	const workspaceType = computed(() => store.activeWorkspace?.type ?? "personal");
	const workspaceRole = computed(() => store.activeWorkspace?.role ?? "owner");
	return {
		permissions: computed(() => getPermissions(workspaceType.value, workspaceRole.value)),
		uiConfig: computed(() => getUIConfig(workspaceType.value, workspaceRole.value)),
		workspaceType,
		workspaceRole
	};
}
const useWorkspaceUI = createSharedComposable(useWorkspaceUIInternal);
export { useWorkspaceUI as t };

//# sourceMappingURL=useWorkspaceUI-BOQHyT-_.js.map