import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { dt as useToast } from "./vendor-primevue-DxYsW_Ng.js";
import "./vendor-firebase-DnyyBhvM.js";
import { D as computed, F as createTextVNode, I as createVNode, O as createBaseVNode, R as defineComponent, Ut as toDisplayString, _t as withCtx, et as openBlock, j as createElementBlock, kt as ref } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-C6-gqLl2.js";
import "./useFeatureFlags-D7S0T-hX.js";
import "./vendor-reka-ui--l_O1Shn.js";
import "./api-_meS9Tf3.js";
import "./vendor-markdown-DFo_IkzS.js";
import "./colorUtil-CPODED-Q.js";
import { n as useI18n } from "./vendor-i18n-czJbbAfl.js";
import "./i18n-Dw0liyWq.js";
import { t as Button_default } from "./Button-DQNHabQW.js";
import { Yr as useBillingContext, wi as useDialogStore } from "./dialogService-izllT8P8.js";
import "./extensionStore-BafvIS1l.js";
import "./userStore-xXj7g9EA.js";
import "./useErrorHandling-DdKwDbhp.js";
import "./useExternalLink-BC_To13P.js";
import "./vendor-tiptap-BnYkbQDM.js";
import "./markdownRendererUtil-COLKL0Bq.js";
import "./Popover-DEsU7dja.js";
var _hoisted_1 = { class: "flex w-full max-w-[400px] flex-col rounded-2xl border border-border-default bg-base-background" };
var _hoisted_2 = { class: "flex h-12 items-center justify-between border-b border-border-default px-4" };
var _hoisted_3 = { class: "m-0 text-sm font-normal text-base-foreground" };
var _hoisted_4 = ["aria-label", "disabled"];
var _hoisted_5 = { class: "flex flex-col gap-4 px-4 py-4" };
var _hoisted_6 = { class: "m-0 text-sm text-muted-foreground" };
var _hoisted_7 = { class: "flex items-center justify-end gap-4 px-4 py-4" };
var CancelSubscriptionDialogContent_default = /* @__PURE__ */ defineComponent({
	__name: "CancelSubscriptionDialogContent",
	props: { cancelAt: {} },
	setup(__props) {
		const props = __props;
		const { t } = useI18n();
		const dialogStore = useDialogStore();
		const toast = useToast();
		const { cancelSubscription, fetchStatus, subscription } = useBillingContext();
		const isLoading = ref(false);
		const formattedEndDate = computed(() => {
			const dateStr = props.cancelAt ?? subscription.value?.endDate;
			if (!dateStr) return t("subscription.cancelDialog.endOfBillingPeriod");
			return new Date(dateStr).toLocaleDateString("en-US", {
				month: "long",
				day: "numeric",
				year: "numeric"
			});
		});
		const description = computed(() => t("subscription.cancelDialog.description", { date: formattedEndDate.value }));
		function onClose() {
			if (isLoading.value) return;
			dialogStore.closeDialog({ key: "cancel-subscription" });
		}
		async function onConfirmCancel() {
			isLoading.value = true;
			try {
				await cancelSubscription();
				await fetchStatus();
				dialogStore.closeDialog({ key: "cancel-subscription" });
				toast.add({
					severity: "success",
					summary: t("subscription.cancelSuccess"),
					life: 5e3
				});
			} catch (error) {
				toast.add({
					severity: "error",
					summary: t("subscription.cancelDialog.failed"),
					detail: error instanceof Error ? error.message : t("g.unknownError"),
					life: 5e3
				});
			} finally {
				isLoading.value = false;
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("div", _hoisted_2, [createBaseVNode("h2", _hoisted_3, toDisplayString(_ctx.$t("subscription.cancelDialog.title")), 1), createBaseVNode("button", {
					class: "cursor-pointer rounded border-none bg-transparent p-0 text-muted-foreground transition-colors hover:text-base-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary-foreground",
					"aria-label": _ctx.$t("g.close"),
					disabled: isLoading.value,
					onClick: onClose
				}, [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "pi pi-times size-4" }, null, -1)])], 8, _hoisted_4)]),
				createBaseVNode("div", _hoisted_5, [createBaseVNode("p", _hoisted_6, toDisplayString(description.value), 1)]),
				createBaseVNode("div", _hoisted_7, [createVNode(Button_default, {
					variant: "muted-textonly",
					disabled: isLoading.value,
					onClick: onClose
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.cancelDialog.keepSubscription")), 1)]),
					_: 1
				}, 8, ["disabled"]), createVNode(Button_default, {
					variant: "destructive",
					size: "lg",
					loading: isLoading.value,
					onClick: onConfirmCancel
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.cancelDialog.confirmCancel")), 1)]),
					_: 1
				}, 8, ["loading"])])
			]);
		};
	}
});
export { CancelSubscriptionDialogContent_default as default };

//# sourceMappingURL=CancelSubscriptionDialogContent-wsKS_Ehw.js.map