import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { ct as useToast } from "./vendor-primevue-CN8WO3jr.js";
import "./vendor-firebase-DN8BxCYa.js";
import { D as computed, F as createTextVNode, I as createVNode, O as createBaseVNode, R as defineComponent, Ut as toDisplayString, _ as vModelText, _t as withCtx, et as openBlock, j as createElementBlock, kt as ref, vt as withDirectives, y as withKeys } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-BlwZz5NW.js";
import "./useFeatureFlags-BuKVU3gG.js";
import "./vendor-reka-ui-C_KZ-Z9x.js";
import "./api-p6hGo6pS.js";
import "./vendor-markdown-DF7_n7Ki.js";
import "./colorUtil-0jM4jJ4_.js";
import { n as useI18n } from "./vendor-i18n-D6iZeZ7U.js";
import "./i18n-B95gNu60.js";
import "./userStore-CVXXciNs.js";
import "./huizhiAuthService-D-kJyr3e.js";
import { gi as useDialogStore, t as useTeamWorkspaceStore } from "./teamWorkspaceStore-CrgYR715.js";
import { t as Button_default } from "./Button-BXdh2GzZ.js";
import "./extensionStore-DiDsM3E0.js";
import "./useErrorHandling-B7U_HHbw.js";
import "./useExternalLink-DXOke9aD.js";
import "./vendor-tiptap-C9679tdI.js";
import "./markdownRendererUtil-rU1hBHFB.js";
import "./Popover-Bju946nz.js";
var _hoisted_1 = { class: "flex w-full min-w-[400px] flex-col rounded-2xl border border-border-default bg-base-background" };
var _hoisted_2 = { class: "flex h-12 items-center justify-between border-b border-border-default px-4" };
var _hoisted_3 = { class: "m-0 text-sm font-normal text-base-foreground" };
var _hoisted_4 = ["aria-label"];
var _hoisted_5 = { class: "flex flex-col gap-4 px-4 py-4" };
var _hoisted_6 = { class: "flex flex-col gap-2" };
var _hoisted_7 = { class: "text-sm text-base-foreground" };
var _hoisted_8 = { class: "flex items-center justify-end gap-4 px-4 py-4" };
var EditWorkspaceDialogContent_default = /* @__PURE__ */ defineComponent({
	__name: "EditWorkspaceDialogContent",
	setup(__props) {
		const { t } = useI18n();
		const toast = useToast();
		const dialogStore = useDialogStore();
		const workspaceStore = useTeamWorkspaceStore();
		const loading = ref(false);
		const newWorkspaceName = ref(workspaceStore.workspaceName);
		const isValidName = computed(() => {
			const name = newWorkspaceName.value.trim();
			return name.length >= 1 && name.length <= 50 && /^[a-zA-Z0-9][a-zA-Z0-9\s\-_'.,()&+]*$/.test(name);
		});
		function onCancel() {
			dialogStore.closeDialog({ key: "edit-workspace" });
		}
		async function onSave() {
			if (!isValidName.value) return;
			loading.value = true;
			try {
				await workspaceStore.updateWorkspaceName(newWorkspaceName.value.trim());
				dialogStore.closeDialog({ key: "edit-workspace" });
				toast.add({
					severity: "success",
					summary: t("workspacePanel.toast.workspaceUpdated.title"),
					detail: t("workspacePanel.toast.workspaceUpdated.message"),
					life: 5e3
				});
			} catch (error) {
				console.error("[EditWorkspaceDialog] Failed to update workspace:", error);
				toast.add({
					severity: "error",
					summary: t("workspacePanel.toast.failedToUpdateWorkspace"),
					detail: error instanceof Error ? error.message : t("g.unknownError"),
					life: 5e3
				});
			} finally {
				loading.value = false;
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("div", _hoisted_2, [createBaseVNode("h2", _hoisted_3, toDisplayString(_ctx.$t("workspacePanel.editWorkspaceDialog.title")), 1), createBaseVNode("button", {
					class: "cursor-pointer rounded border-none bg-transparent p-0 text-muted-foreground transition-colors hover:text-base-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary-foreground",
					"aria-label": _ctx.$t("g.close"),
					onClick: onCancel
				}, [..._cache[2] || (_cache[2] = [createBaseVNode("i", { class: "pi pi-times size-4" }, null, -1)])], 8, _hoisted_4)]),
				createBaseVNode("div", _hoisted_5, [createBaseVNode("div", _hoisted_6, [createBaseVNode("label", _hoisted_7, toDisplayString(_ctx.$t("workspacePanel.editWorkspaceDialog.nameLabel")), 1), withDirectives(createBaseVNode("input", {
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => newWorkspaceName.value = $event),
					type: "text",
					class: "w-full rounded-lg border border-border-default bg-transparent px-3 py-2 text-sm text-base-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-secondary-foreground",
					onKeydown: _cache[1] || (_cache[1] = withKeys(($event) => isValidName.value && onSave(), ["enter"]))
				}, null, 544), [[vModelText, newWorkspaceName.value]])])]),
				createBaseVNode("div", _hoisted_8, [createVNode(Button_default, {
					variant: "muted-textonly",
					onClick: onCancel
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.cancel")), 1)]),
					_: 1
				}), createVNode(Button_default, {
					variant: "primary",
					size: "lg",
					loading: loading.value,
					disabled: !isValidName.value,
					onClick: onSave
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.editWorkspaceDialog.save")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])])
			]);
		};
	}
});
export { EditWorkspaceDialogContent_default as default };

//# sourceMappingURL=EditWorkspaceDialogContent-B4-5F532.js.map