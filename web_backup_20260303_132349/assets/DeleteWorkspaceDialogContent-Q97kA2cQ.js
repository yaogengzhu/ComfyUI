import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { dt as useToast } from "./vendor-primevue-CNPGb1TW.js";
import "./vendor-firebase-DN8BxCYa.js";
import { F as createTextVNode, I as createVNode, O as createBaseVNode, R as defineComponent, Ut as toDisplayString, _t as withCtx, et as openBlock, j as createElementBlock, kt as ref } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-qJz1Z78N.js";
import "./useFeatureFlags-DpouF8An.js";
import "./vendor-reka-ui-jxMUDvZT.js";
import "./api-DbPc6hdO.js";
import "./vendor-markdown-BPt2PdDp.js";
import "./colorUtil-BKg8i9Q6.js";
import { n as useI18n } from "./vendor-i18n-86kE_LSO.js";
import "./i18n-syd3PJfQ.js";
import { t as Button_default } from "./Button-D8fmNaXY.js";
import { ti as useTeamWorkspaceStore, wi as useDialogStore } from "./dialogService-jMbkA1JN.js";
import "./extensionStore-BiUCqCK1.js";
import "./userStore-xAnKQzRd.js";
import "./useErrorHandling-BsEGEjB8.js";
import "./huizhiAuthService-DTHsM6kC.js";
import "./useExternalLink-tAAZu4wg.js";
import "./vendor-tiptap-C9679tdI.js";
import "./markdownRendererUtil-Q53IsTUL.js";
import "./Popover-bsCD7nil.js";
var _hoisted_1 = { class: "flex w-full max-w-[360px] flex-col rounded-2xl border border-border-default bg-base-background" };
var _hoisted_2 = { class: "flex h-12 items-center justify-between border-b border-border-default px-4" };
var _hoisted_3 = { class: "m-0 text-sm font-normal text-base-foreground" };
var _hoisted_4 = ["aria-label"];
var _hoisted_5 = { class: "px-4 py-4" };
var _hoisted_6 = { class: "m-0 text-sm text-muted-foreground" };
var _hoisted_7 = { class: "flex items-center justify-end gap-4 px-4 py-4" };
var DeleteWorkspaceDialogContent_default = /* @__PURE__ */ defineComponent({
	__name: "DeleteWorkspaceDialogContent",
	props: {
		workspaceId: {},
		workspaceName: {}
	},
	setup(__props) {
		const { t } = useI18n();
		const toast = useToast();
		const dialogStore = useDialogStore();
		const workspaceStore = useTeamWorkspaceStore();
		const loading = ref(false);
		function onCancel() {
			dialogStore.closeDialog({ key: "delete-workspace" });
		}
		async function onDelete() {
			loading.value = true;
			try {
				await workspaceStore.deleteWorkspace(__props.workspaceId);
				dialogStore.closeDialog({ key: "delete-workspace" });
				window.location.reload();
			} catch (error) {
				console.error("[DeleteWorkspaceDialog] Failed to delete workspace:", error);
				toast.add({
					severity: "error",
					summary: t("workspacePanel.toast.failedToDeleteWorkspace"),
					detail: error instanceof Error ? error.message : t("g.unknownError"),
					life: 5e3
				});
			} finally {
				loading.value = false;
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("div", _hoisted_2, [createBaseVNode("h2", _hoisted_3, toDisplayString(_ctx.$t("workspacePanel.deleteDialog.title")), 1), createBaseVNode("button", {
					class: "cursor-pointer rounded border-none bg-transparent p-0 text-muted-foreground transition-colors hover:text-base-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary-foreground",
					"aria-label": _ctx.$t("g.close"),
					onClick: onCancel
				}, [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "pi pi-times size-4" }, null, -1)])], 8, _hoisted_4)]),
				createBaseVNode("div", _hoisted_5, [createBaseVNode("p", _hoisted_6, toDisplayString(__props.workspaceName ? _ctx.$t("workspacePanel.deleteDialog.messageWithName", { name: __props.workspaceName }) : _ctx.$t("workspacePanel.deleteDialog.message")), 1)]),
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
					onClick: onDelete
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.delete")), 1)]),
					_: 1
				}, 8, ["loading"])])
			]);
		};
	}
});
export { DeleteWorkspaceDialogContent_default as default };

//# sourceMappingURL=DeleteWorkspaceDialogContent-Q97kA2cQ.js.map