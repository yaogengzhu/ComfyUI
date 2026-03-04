import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { ct as useToast } from "./vendor-primevue-CN8WO3jr.js";
import "./vendor-firebase-DN8BxCYa.js";
import { F as createTextVNode, I as createVNode, O as createBaseVNode, R as defineComponent, Ut as toDisplayString, _t as withCtx, et as openBlock, j as createElementBlock, kt as ref } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-BlwZz5NW.js";
import "./useFeatureFlags-kJeWJWfN.js";
import "./vendor-reka-ui-C_KZ-Z9x.js";
import "./api-nREgj_HO.js";
import "./vendor-markdown-DF7_n7Ki.js";
import "./colorUtil-0jM4jJ4_.js";
import { n as useI18n } from "./vendor-i18n-D6iZeZ7U.js";
import "./i18n-B95gNu60.js";
import "./userStore-BgTMUZFo.js";
import "./huizhiAuthService-DRNED4sE.js";
import { gi as useDialogStore, t as useTeamWorkspaceStore } from "./teamWorkspaceStore-BPR4vJb-.js";
import { t as Button_default } from "./Button-BXdh2GzZ.js";
import "./extensionStore-DTHbvcUb.js";
import "./useErrorHandling-Bo8s6znR.js";
import "./useExternalLink-DXOke9aD.js";
import "./vendor-tiptap-C9679tdI.js";
import "./markdownRendererUtil-rU1hBHFB.js";
import "./Popover-Bju946nz.js";
var _hoisted_1 = { class: "flex w-full max-w-[360px] flex-col rounded-2xl border border-border-default bg-base-background" };
var _hoisted_2 = { class: "flex h-12 items-center justify-between border-b border-border-default px-4" };
var _hoisted_3 = { class: "m-0 text-sm font-normal text-base-foreground" };
var _hoisted_4 = ["aria-label"];
var _hoisted_5 = { class: "px-4 py-4" };
var _hoisted_6 = { class: "m-0 text-sm text-muted-foreground" };
var _hoisted_7 = { class: "flex items-center justify-end gap-4 px-4 py-4" };
var RevokeInviteDialogContent_default = /* @__PURE__ */ defineComponent({
	__name: "RevokeInviteDialogContent",
	props: { inviteId: {} },
	setup(__props) {
		const dialogStore = useDialogStore();
		const workspaceStore = useTeamWorkspaceStore();
		const toast = useToast();
		const { t } = useI18n();
		const loading = ref(false);
		function onCancel() {
			dialogStore.closeDialog({ key: "revoke-invite" });
		}
		async function onRevoke() {
			loading.value = true;
			try {
				await workspaceStore.revokeInvite(__props.inviteId);
				dialogStore.closeDialog({ key: "revoke-invite" });
			} catch (error) {
				toast.add({
					severity: "error",
					summary: t("g.error"),
					detail: error instanceof Error ? error.message : void 0,
					life: 3e3
				});
			} finally {
				loading.value = false;
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("div", _hoisted_2, [createBaseVNode("h2", _hoisted_3, toDisplayString(_ctx.$t("workspacePanel.revokeInviteDialog.title")), 1), createBaseVNode("button", {
					class: "cursor-pointer rounded border-none bg-transparent p-0 text-muted-foreground transition-colors hover:text-base-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary-foreground",
					"aria-label": _ctx.$t("g.close"),
					onClick: onCancel
				}, [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "pi pi-times size-4" }, null, -1)])], 8, _hoisted_4)]),
				createBaseVNode("div", _hoisted_5, [createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("workspacePanel.revokeInviteDialog.message")), 1)]),
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
					onClick: onRevoke
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.revokeInviteDialog.revoke")), 1)]),
					_: 1
				}, 8, ["loading"])])
			]);
		};
	}
});
export { RevokeInviteDialogContent_default as default };

//# sourceMappingURL=RevokeInviteDialogContent-BKUTAX9v.js.map