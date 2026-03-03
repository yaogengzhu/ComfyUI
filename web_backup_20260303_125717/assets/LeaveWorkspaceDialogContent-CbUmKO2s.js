import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { dt as useToast } from "./vendor-primevue-BMWHeZll.js";
import "./vendor-firebase-DN8BxCYa.js";
import { F as createTextVNode, I as createVNode, O as createBaseVNode, R as defineComponent, Ut as toDisplayString, _t as withCtx, et as openBlock, j as createElementBlock, kt as ref } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-Cb4peHqA.js";
import "./useFeatureFlags-S1sG8YIk.js";
import "./vendor-reka-ui-jxMUDvZT.js";
import "./api-C6dyasG5.js";
import "./vendor-markdown-BPt2PdDp.js";
import "./colorUtil-CQE2D_f9.js";
import { n as useI18n } from "./vendor-i18n-86kE_LSO.js";
import "./i18n-Dy4mrtIR.js";
import { t as Button_default } from "./Button-D4w5_e9I.js";
import { Di as useDialogStore, ii as useTeamWorkspaceStore } from "./dialogService-B_z161HY.js";
import "./extensionStore-CZdQWzqz.js";
import "./userStore-BvkQCZf0.js";
import "./useErrorHandling-CX7OTxv3.js";
import "./useExternalLink-BDqUsXhK.js";
import "./vendor-tiptap-DTO2QA4Q.js";
import "./markdownRendererUtil-CrR6m0CH.js";
import "./Popover-oAJ3EQ_X.js";
var _hoisted_1 = { class: "flex w-full max-w-[360px] flex-col rounded-2xl border border-border-default bg-base-background" };
var _hoisted_2 = { class: "flex h-12 items-center justify-between border-b border-border-default px-4" };
var _hoisted_3 = { class: "m-0 text-sm font-normal text-base-foreground" };
var _hoisted_4 = ["aria-label"];
var _hoisted_5 = { class: "px-4 py-4" };
var _hoisted_6 = { class: "m-0 text-sm text-muted-foreground" };
var _hoisted_7 = { class: "flex items-center justify-end gap-4 px-4 py-4" };
var LeaveWorkspaceDialogContent_default = /* @__PURE__ */ defineComponent({
	__name: "LeaveWorkspaceDialogContent",
	setup(__props) {
		const { t } = useI18n();
		const toast = useToast();
		const dialogStore = useDialogStore();
		const workspaceStore = useTeamWorkspaceStore();
		const loading = ref(false);
		function onCancel() {
			dialogStore.closeDialog({ key: "leave-workspace" });
		}
		async function onLeave() {
			loading.value = true;
			try {
				await workspaceStore.leaveWorkspace();
				dialogStore.closeDialog({ key: "leave-workspace" });
				window.location.reload();
			} catch (error) {
				console.error("[LeaveWorkspaceDialog] Failed to leave workspace:", error);
				toast.add({
					severity: "error",
					summary: t("workspacePanel.toast.failedToLeaveWorkspace"),
					detail: error instanceof Error ? error.message : t("g.unknownError"),
					life: 5e3
				});
			} finally {
				loading.value = false;
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("div", _hoisted_2, [createBaseVNode("h2", _hoisted_3, toDisplayString(_ctx.$t("workspacePanel.leaveDialog.title")), 1), createBaseVNode("button", {
					class: "cursor-pointer rounded border-none bg-transparent p-0 text-muted-foreground transition-colors hover:text-base-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary-foreground",
					"aria-label": _ctx.$t("g.close"),
					onClick: onCancel
				}, [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "pi pi-times size-4" }, null, -1)])], 8, _hoisted_4)]),
				createBaseVNode("div", _hoisted_5, [createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("workspacePanel.leaveDialog.message")), 1)]),
				createBaseVNode("div", _hoisted_7, [createVNode(Button_default, {
					variant: "muted-textonly",
					onClick: onCancel
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.cancel")), 1)]),
					_: 1
				}), createVNode(Button_default, {
					variant: "destructive",
					size: "lg",
					loading: loading.value,
					onClick: onLeave
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.leaveDialog.leave")), 1)]),
					_: 1
				}, 8, ["loading"])])
			]);
		};
	}
});
export { LeaveWorkspaceDialogContent_default as default };

//# sourceMappingURL=LeaveWorkspaceDialogContent-CbUmKO2s.js.map