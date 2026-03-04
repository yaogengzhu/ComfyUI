import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-CN8WO3jr.js";
import "./vendor-firebase-DN8BxCYa.js";
import { F as createTextVNode, I as createVNode, O as createBaseVNode, R as defineComponent, Rt as unref, Ut as toDisplayString, _t as withCtx, et as openBlock, j as createElementBlock } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-BlwZz5NW.js";
import "./useFeatureFlags-BuKVU3gG.js";
import "./vendor-reka-ui-C_KZ-Z9x.js";
import "./api-p6hGo6pS.js";
import "./vendor-markdown-DF7_n7Ki.js";
import "./colorUtil-0jM4jJ4_.js";
import "./i18n-B95gNu60.js";
import "./userStore-CVXXciNs.js";
import "./huizhiAuthService-D-kJyr3e.js";
import { Qr as useBillingContext, gi as useDialogStore } from "./teamWorkspaceStore-CrgYR715.js";
import { t as Button_default } from "./Button-BXdh2GzZ.js";
import "./extensionStore-DiDsM3E0.js";
import "./useErrorHandling-B7U_HHbw.js";
import "./useExternalLink-DXOke9aD.js";
import "./vendor-tiptap-C9679tdI.js";
import "./markdownRendererUtil-rU1hBHFB.js";
import "./Popover-Bju946nz.js";
var _hoisted_1 = { class: "flex w-full max-w-[512px] flex-col rounded-2xl border border-border-default bg-base-background" };
var _hoisted_2 = { class: "flex h-12 items-center justify-between border-b border-border-default px-4" };
var _hoisted_3 = { class: "m-0 text-sm font-normal text-base-foreground" };
var _hoisted_4 = ["aria-label"];
var _hoisted_5 = { class: "flex flex-col gap-4 px-4 py-4" };
var _hoisted_6 = { class: "m-0 text-sm text-muted-foreground" };
var _hoisted_7 = { class: "flex items-center justify-end gap-4 px-4 py-4" };
var InviteMemberUpsellDialogContent_default = /* @__PURE__ */ defineComponent({
	__name: "InviteMemberUpsellDialogContent",
	setup(__props) {
		const dialogStore = useDialogStore();
		const { isActiveSubscription, showSubscriptionDialog } = useBillingContext();
		function onDismiss() {
			dialogStore.closeDialog({ key: "invite-member-upsell" });
		}
		function onUpgrade() {
			dialogStore.closeDialog({ key: "invite-member-upsell" });
			showSubscriptionDialog();
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("div", _hoisted_2, [createBaseVNode("h2", _hoisted_3, toDisplayString(unref(isActiveSubscription) ? _ctx.$t("workspacePanel.inviteUpsellDialog.titleSingleSeat") : _ctx.$t("workspacePanel.inviteUpsellDialog.titleNotSubscribed")), 1), createBaseVNode("button", {
					class: "cursor-pointer rounded border-none bg-transparent p-0 text-muted-foreground transition-colors hover:text-base-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary-foreground",
					"aria-label": _ctx.$t("g.close"),
					onClick: onDismiss
				}, [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "pi pi-times size-4" }, null, -1)])], 8, _hoisted_4)]),
				createBaseVNode("div", _hoisted_5, [createBaseVNode("p", _hoisted_6, toDisplayString(unref(isActiveSubscription) ? _ctx.$t("workspacePanel.inviteUpsellDialog.messageSingleSeat") : _ctx.$t("workspacePanel.inviteUpsellDialog.messageNotSubscribed")), 1)]),
				createBaseVNode("div", _hoisted_7, [createVNode(Button_default, {
					variant: "muted-textonly",
					onClick: onDismiss
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.cancel")), 1)]),
					_: 1
				}), createVNode(Button_default, {
					variant: "primary",
					size: "lg",
					onClick: onUpgrade
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(isActiveSubscription) ? _ctx.$t("workspacePanel.inviteUpsellDialog.upgradeToCreator") : _ctx.$t("workspacePanel.inviteUpsellDialog.viewPlans")), 1)]),
					_: 1
				})])
			]);
		};
	}
});
export { InviteMemberUpsellDialogContent_default as default };

//# sourceMappingURL=InviteMemberUpsellDialogContent-Xa6lTttZ.js.map