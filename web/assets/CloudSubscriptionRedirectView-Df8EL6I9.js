import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { G as script$1, X as script } from "./vendor-primevue-BMWHeZll.js";
import "./vendor-firebase-DN8BxCYa.js";
import { A as createCommentVNode, D as computed, O as createBaseVNode, R as defineComponent, Rt as unref, Ut as toDisplayString, Z as onMounted, a as useRoute, et as openBlock, j as createElementBlock, k as createBlock, kt as ref, o as useRouter } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-Cb4peHqA.js";
import "./useFeatureFlags-CQzrYTw1.js";
import { $t as until } from "./vendor-reka-ui-jxMUDvZT.js";
import "./api-CrHaA16j.js";
import "./vendor-markdown-BPt2PdDp.js";
import "./colorUtil-CQE2D_f9.js";
import { n as useI18n } from "./vendor-i18n-86kE_LSO.js";
import "./i18n-Dy4mrtIR.js";
import "./Button-D4w5_e9I.js";
import { Jr as useFirebaseAuthActions, Yr as useBillingContext } from "./dialogService-Cm1QZvWM.js";
import "./extensionStore-jct1qmkK.js";
import "./userStore-B8DDUPuE.js";
import { t as useErrorHandling } from "./useErrorHandling-D8IRIzSw.js";
import "./useExternalLink-BDqUsXhK.js";
import "./vendor-tiptap-DTO2QA4Q.js";
import "./markdownRendererUtil-CrR6m0CH.js";
import "./Popover-oAJ3EQ_X.js";
import { t as huizhi_logo_default } from "./huizhi-logo-inomcmvU.js";
import { t as performSubscriptionCheckout } from "./subscriptionCheckoutUtil-CORuNO3m.js";
var _hoisted_1 = { class: "flex h-full w-full items-center justify-center bg-comfy-menu-secondary-bg" };
var _hoisted_2 = { class: "flex flex-col items-center gap-4" };
var _hoisted_3 = {
	key: 0,
	class: "font-inter text-base font-normal leading-normal text-base-foreground"
};
var CloudSubscriptionRedirectView_default = /* @__PURE__ */ defineComponent({
	__name: "CloudSubscriptionRedirectView",
	setup(__props) {
		const { t } = useI18n();
		const route = useRoute();
		const router = useRouter();
		const { reportError, accessBillingPortal } = useFirebaseAuthActions();
		const { wrapWithErrorHandlingAsync } = useErrorHandling();
		const { isActiveSubscription, isInitialized } = useBillingContext();
		const selectedTierKey = ref(null);
		const tierDisplayName = computed(() => {
			if (!selectedTierKey.value) return "";
			return {
				free: t("subscription.tiers.free.name"),
				standard: t("subscription.tiers.standard.name"),
				creator: t("subscription.tiers.creator.name"),
				pro: t("subscription.tiers.pro.name"),
				founder: t("subscription.tiers.founder.name")
			}[selectedTierKey.value];
		});
		const runRedirect = wrapWithErrorHandlingAsync(async () => {
			const rawType = route.query.tier;
			const rawCycle = route.query.cycle;
			let tierKeyParam = null;
			let cycleParam = "monthly";
			if (typeof rawType === "string") tierKeyParam = rawType;
			else if (Array.isArray(rawType) && rawType[0]) tierKeyParam = rawType[0];
			if (typeof rawCycle === "string") cycleParam = rawCycle;
			else if (Array.isArray(rawCycle) && rawCycle[0]) cycleParam = rawCycle[0];
			if (!tierKeyParam) {
				await router.push("/");
				return;
			}
			if (![
				"standard",
				"creator",
				"pro",
				"founder"
			].includes(tierKeyParam)) {
				await router.push("/");
				return;
			}
			const tierKey = tierKeyParam;
			selectedTierKey.value = tierKey;
			if (!cycleParam || !["monthly", "yearly"].includes(cycleParam)) cycleParam = "monthly";
			if (!isInitialized.value) await until(isInitialized).toBe(true);
			if (isActiveSubscription.value) await accessBillingPortal(void 0, false);
			else await performSubscriptionCheckout(tierKey, cycleParam, false);
		}, reportError);
		onMounted(() => {
			runRedirect();
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [
				_cache[0] || (_cache[0] = createBaseVNode("img", {
					src: "" + new URL("images/huizhi-logo.png", import.meta.url).href,
					alt: "绘智 AI Logo",
					class: "h-16 w-16"
				}, null, -1)),
				selectedTierKey.value ? (openBlock(), createElementBlock("p", _hoisted_3, toDisplayString(unref(t)("subscription.subscribeTo", { plan: tierDisplayName.value })), 1)) : createCommentVNode("", true),
				selectedTierKey.value ? (openBlock(), createBlock(unref(script), {
					key: 1,
					class: "h-8 w-8",
					"stroke-width": "4"
				})) : createCommentVNode("", true),
				selectedTierKey.value ? (openBlock(), createBlock(unref(script$1), {
					key: 2,
					as: "a",
					href: "/",
					link: "",
					label: unref(t)("cloudOnboarding.skipToCloudApp")
				}, null, 8, ["label"])) : createCommentVNode("", true)
			])]);
		};
	}
});
export { CloudSubscriptionRedirectView_default as default };

//# sourceMappingURL=CloudSubscriptionRedirectView-Df8EL6I9.js.map