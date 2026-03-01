import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { $ as script$1, C as script } from "./vendor-primevue-kyY2H95P.js";
import "./vendor-firebase-DnyyBhvM.js";
import { A as createCommentVNode, Bt as normalizeClass, D as computed, F as createTextVNode, I as createVNode, O as createBaseVNode, R as defineComponent, Rt as unref, S as Fragment, Ut as toDisplayString, Y as onBeforeUnmount, _t as withCtx, et as openBlock, j as createElementBlock, kt as ref, l as storeToRefs, nt as renderList, pt as watch, v as vShow, vt as withDirectives } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-C6-gqLl2.js";
import { t as isCloud } from "./types-DT3N7am7.js";
import "./useFeatureFlags-DKDRstHr.js";
import "./vendor-reka-ui--l_O1Shn.js";
import "./api-CPHpjbv0.js";
import "./vendor-markdown-DFo_IkzS.js";
import "./colorUtil-CPODED-Q.js";
import { n as useI18n } from "./vendor-i18n-czJbbAfl.js";
import "./i18n-CrjEfjCc.js";
import { t as useTelemetry } from "./telemetry-zZf2dHJ2.js";
import { t as cn } from "./src-CaI548es.js";
import { t as Button_default } from "./Button-DQNHabQW.js";
import { $r as useCommandStore, Jr as useFirebaseAuthActions, Yr as useBillingContext, Zr as useSubscription, gi as TIER_TO_KEY, hi as TIER_PRICING, ii as useFirebaseAuthStore } from "./dialogService-ClPphYfX.js";
import "./extensionStore-Be5EotP2.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DnHSq4Qt.js";
import "./userStore-CdVz-9rN.js";
import { t as useErrorHandling } from "./useErrorHandling-CFX2Xlcx.js";
import "./useExternalLink-DGE106nN.js";
import "./vendor-tiptap-BnYkbQDM.js";
import "./markdownRendererUtil-COLKL0Bq.js";
import "./Popover-DEsU7dja.js";
import { t as performSubscriptionCheckout } from "./subscriptionCheckoutUtil-D0Lj1fVL.js";
import { n as cloud_subscription_default, t as SubscriptionBenefits_default } from "./SubscriptionBenefits-CHU-jmYl.js";
import { t as CloudBadge_default } from "./CloudBadge-CELw0uxs.js";
import { t as SubscribeButton_default } from "./SubscribeButton-BSPeGCFi.js";
var PLAN_RANK = [
	"yearly-pro",
	"yearly-creator",
	"yearly-standard",
	"monthly-pro",
	"monthly-creator",
	"monthly-standard"
].reduce((acc, plan, index) => acc.set(plan, index), /* @__PURE__ */ new Map());
var toRankedPlanKey = (tierKey, billingCycle) => {
	if (tierKey === "founder" || tierKey === "free") return null;
	return `${billingCycle}-${tierKey}`;
};
const getPlanRank = ({ tierKey, billingCycle }) => {
	const planKey = toRankedPlanKey(tierKey, billingCycle);
	if (!planKey) return Number.POSITIVE_INFINITY;
	return PLAN_RANK.get(planKey) ?? Number.POSITIVE_INFINITY;
};
const isPlanDowngrade = ({ current, target }) => {
	const currentRank = getPlanRank(current);
	return getPlanRank(target) > currentRank;
};
var _hoisted_1$1 = { class: "flex flex-col gap-8" };
var _hoisted_2$1 = { class: "flex justify-center" };
var _hoisted_3$1 = { class: "flex items-center gap-2" };
var _hoisted_4$1 = {
	key: 0,
	class: "bg-primary-background text-white text-[11px] px-1 py-0.5 rounded-full flex items-center font-bold"
};
var _hoisted_5$1 = { class: "flex flex-col xl:flex-row items-stretch gap-6" };
var _hoisted_6$1 = { class: "p-8 pb-0 flex flex-col gap-8" };
var _hoisted_7$1 = { class: "flex flex-row items-center gap-2 justify-between" };
var _hoisted_8$1 = { class: "font-inter text-base font-bold leading-normal text-base-foreground" };
var _hoisted_9$1 = {
	key: 0,
	class: "rounded-full bg-base-foreground px-1.5 text-[11px] font-bold uppercase text-base-background h-5 tracking-tight flex items-center"
};
var _hoisted_10$1 = { class: "flex flex-col" };
var _hoisted_11$1 = { class: "flex flex-col gap-2" };
var _hoisted_12$1 = { class: "flex flex-row items-baseline gap-2" };
var _hoisted_13$1 = { class: "font-inter text-[32px] font-semibold leading-normal text-base-foreground" };
var _hoisted_14$1 = { class: "font-inter text-xl leading-normal text-base-foreground" };
var _hoisted_15$1 = { class: "flex items-center gap-2" };
var _hoisted_16$1 = { class: "text-sm text-muted-foreground" };
var _hoisted_17$1 = { class: "flex flex-col gap-4 pb-0 flex-1" };
var _hoisted_18 = { class: "flex flex-row items-center justify-between" };
var _hoisted_19 = { class: "font-inter text-sm font-normal leading-normal text-foreground" };
var _hoisted_20 = { class: "flex flex-row items-center gap-1" };
var _hoisted_21 = { class: "font-inter text-sm font-bold leading-normal text-base-foreground" };
var _hoisted_22 = { class: "flex flex-row items-center justify-between" };
var _hoisted_23 = { class: "text-sm font-normal text-foreground" };
var _hoisted_24 = { class: "font-inter text-sm font-bold leading-normal text-base-foreground" };
var _hoisted_25 = { class: "flex flex-row items-center justify-between" };
var _hoisted_26 = { class: "text-sm font-normal text-foreground" };
var _hoisted_27 = { class: "flex flex-row items-center justify-between" };
var _hoisted_28 = { class: "text-sm font-normal text-foreground" };
var _hoisted_29 = { class: "flex flex-row items-center justify-between" };
var _hoisted_30 = { class: "text-sm font-normal text-foreground" };
var _hoisted_31 = {
	key: 0,
	class: "pi pi-check text-xs text-success-foreground"
};
var _hoisted_32 = {
	key: 1,
	class: "pi pi-times text-xs text-foreground"
};
var _hoisted_33 = { class: "flex flex-col gap-2" };
var _hoisted_34 = { class: "flex flex-row items-start justify-between" };
var _hoisted_35 = { class: "flex flex-col gap-2" };
var _hoisted_36 = { class: "text-sm font-normal text-foreground leading-relaxed" };
var _hoisted_37 = { class: "flex flex-row items-center gap-2 group pt-2" };
var _hoisted_38 = { class: "font-inter text-sm font-bold leading-normal text-base-foreground" };
var _hoisted_39 = { class: "flex flex-col p-8" };
var _hoisted_40 = { class: "flex flex-col gap-2" };
var _hoisted_41 = { class: "text-sm text-base-foreground leading-normal" };
var _hoisted_42 = {
	href: "https://cloud.comfy.org/?template=video_wan2_2_14B_i2v",
	target: "_blank",
	rel: "noopener noreferrer",
	class: "text-sm text-azure-600 hover:text-azure-400 no-underline flex gap-1"
};
var _hoisted_43 = { class: "underline" };
var PricingTable_default = /* @__PURE__ */ defineComponent({
	__name: "PricingTable",
	setup(__props) {
		const getCheckoutTier = (tierKey, billingCycle) => billingCycle === "yearly" ? `${tierKey}-yearly` : tierKey;
		const getCheckoutAttributionForCloud = async () => {
			return {};
		};
		const { t, n } = useI18n();
		const billingCycleOptions = [{
			label: t("subscription.yearly"),
			value: "yearly"
		}, {
			label: t("subscription.monthly"),
			value: "monthly"
		}];
		const tiers = [
			{
				id: "STANDARD",
				key: "standard",
				name: t("subscription.tiers.standard.name"),
				pricing: TIER_PRICING.standard,
				maxDuration: t("subscription.maxDuration.standard"),
				customLoRAs: false,
				isPopular: false
			},
			{
				id: "CREATOR",
				key: "creator",
				name: t("subscription.tiers.creator.name"),
				pricing: TIER_PRICING.creator,
				maxDuration: t("subscription.maxDuration.creator"),
				customLoRAs: true,
				isPopular: true
			},
			{
				id: "PRO",
				key: "pro",
				name: t("subscription.tiers.pro.name"),
				pricing: TIER_PRICING.pro,
				maxDuration: t("subscription.maxDuration.pro"),
				customLoRAs: true,
				isPopular: false
			}
		];
		const { isActiveSubscription, isFreeTier, subscriptionTier, isYearlySubscription } = useSubscription();
		const telemetry = useTelemetry();
		const { userId } = storeToRefs(useFirebaseAuthStore());
		const { accessBillingPortal, reportError } = useFirebaseAuthActions();
		const { wrapWithErrorHandlingAsync } = useErrorHandling();
		const isLoading = ref(false);
		const loadingTier = ref(null);
		const popover = ref();
		const currentBillingCycle = ref("yearly");
		const hasPaidSubscription = computed(() => isActiveSubscription.value && !isFreeTier.value);
		const currentTierKey = computed(() => subscriptionTier.value ? TIER_TO_KEY[subscriptionTier.value] : null);
		const currentPlanDescriptor = computed(() => {
			if (!currentTierKey.value) return null;
			return {
				tierKey: currentTierKey.value,
				billingCycle: isYearlySubscription.value ? "yearly" : "monthly"
			};
		});
		const isCurrentPlan = (tierKey) => {
			if (!currentTierKey.value) return false;
			const selectedIsYearly = currentBillingCycle.value === "yearly";
			return currentTierKey.value === tierKey && isYearlySubscription.value === selectedIsYearly;
		};
		const togglePopover = (event) => {
			popover.value.toggle(event);
		};
		const getButtonLabel = (tier) => {
			if (isCurrentPlan(tier.key)) return t("subscription.currentPlan");
			const planName = currentBillingCycle.value === "yearly" ? t("subscription.tierNameYearly", { name: tier.name }) : tier.name;
			return hasPaidSubscription.value ? t("subscription.changeTo", { plan: planName }) : t("subscription.subscribeTo", { plan: planName });
		};
		const getButtonSeverity = (tier) => {
			if (isCurrentPlan(tier.key)) return "secondary";
			if (tier.key === "creator") return "primary";
			return "secondary";
		};
		const getButtonTextClass = (tier) => tier.key === "creator" ? "font-inter text-sm font-bold leading-normal text-base-background" : "font-inter text-sm font-bold leading-normal text-primary-foreground";
		const getPrice = (tier) => tier.pricing[currentBillingCycle.value];
		const getAnnualTotal = (tier) => tier.pricing.yearly * 12;
		const getCreditsDisplay = (tier) => tier.pricing.credits * (currentBillingCycle.value === "yearly" ? 12 : 1);
		const handleSubscribe = wrapWithErrorHandlingAsync(async (tierKey) => {
			if (!isCloud || isLoading.value || isCurrentPlan(tierKey)) return;
			isLoading.value = true;
			loadingTier.value = tierKey;
			try {
				if (hasPaidSubscription.value) {
					const checkoutAttribution = await getCheckoutAttributionForCloud();
					if (userId.value) telemetry?.trackBeginCheckout({
						user_id: userId.value,
						tier: tierKey,
						cycle: currentBillingCycle.value,
						checkout_type: "change",
						...checkoutAttribution,
						...currentTierKey.value ? { previous_tier: currentTierKey.value } : {}
					});
					const checkoutTier = getCheckoutTier(tierKey, currentBillingCycle.value);
					const targetPlan = {
						tierKey,
						billingCycle: currentBillingCycle.value
					};
					if (currentPlanDescriptor.value && isPlanDowngrade({
						current: currentPlanDescriptor.value,
						target: targetPlan
					})) await accessBillingPortal();
					else await accessBillingPortal(checkoutTier);
				} else await performSubscriptionCheckout(tierKey, currentBillingCycle.value, true);
			} finally {
				isLoading.value = false;
				loadingTier.value = null;
			}
		}, reportError);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$1, [
				createBaseVNode("div", _hoisted_2$1, [createVNode(unref(script), {
					modelValue: currentBillingCycle.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => currentBillingCycle.value = $event),
					options: billingCycleOptions,
					"option-label": "label",
					"option-value": "value",
					"allow-empty": false,
					unstyled: "",
					pt: {
						root: { class: "flex gap-1 bg-secondary-background rounded-lg p-1.5" },
						pcToggleButton: {
							root: ({ context }) => ({ class: ["w-36  h-8 rounded-md transition-colors cursor-pointer border-none outline-none ring-0 text-sm font-medium flex items-center justify-center", context.active ? "bg-base-foreground text-base-background" : "bg-transparent text-muted-foreground hover:bg-secondary-background-hover"] }),
							label: { class: "flex items-center gap-2 " }
						}
					}
				}, {
					option: withCtx(({ option }) => [createBaseVNode("div", _hoisted_3$1, [createBaseVNode("span", null, toDisplayString(option.label), 1), option.value === "yearly" ? (openBlock(), createElementBlock("div", _hoisted_4$1, " -20% ")) : createCommentVNode("", true)])]),
					_: 1
				}, 8, ["modelValue", "pt"])]),
				createBaseVNode("div", _hoisted_5$1, [(openBlock(), createElementBlock(Fragment, null, renderList(tiers, (tier) => {
					return createBaseVNode("div", {
						key: tier.id,
						class: normalizeClass(unref(cn)("flex-1 flex flex-col rounded-2xl border border-border-default bg-base-background shadow-[0_0_12px_rgba(0,0,0,0.1)]", tier.isPopular ? "border-muted-foreground" : ""))
					}, [createBaseVNode("div", _hoisted_6$1, [
						createBaseVNode("div", _hoisted_7$1, [createBaseVNode("span", _hoisted_8$1, toDisplayString(tier.name), 1), tier.isPopular ? (openBlock(), createElementBlock("div", _hoisted_9$1, toDisplayString(unref(t)("subscription.mostPopular")), 1)) : createCommentVNode("", true)]),
						createBaseVNode("div", _hoisted_10$1, [createBaseVNode("div", _hoisted_11$1, [createBaseVNode("div", _hoisted_12$1, [createBaseVNode("span", _hoisted_13$1, [withDirectives(createBaseVNode("span", { class: "line-through text-2xl text-muted-foreground" }, " $" + toDisplayString(tier.pricing.monthly), 513), [[vShow, currentBillingCycle.value === "yearly"]]), createTextVNode(" $" + toDisplayString(getPrice(tier)), 1)]), createBaseVNode("span", _hoisted_14$1, toDisplayString(unref(t)("subscription.usdPerMonth")), 1)]), createBaseVNode("div", _hoisted_15$1, [createBaseVNode("span", _hoisted_16$1, toDisplayString(currentBillingCycle.value === "yearly" ? unref(t)("subscription.billedYearly", { total: `$${getAnnualTotal(tier)}` }) : unref(t)("subscription.billedMonthly")), 1)])])]),
						createBaseVNode("div", _hoisted_17$1, [
							createBaseVNode("div", _hoisted_18, [createBaseVNode("span", _hoisted_19, toDisplayString(currentBillingCycle.value === "yearly" ? unref(t)("subscription.yearlyCreditsLabel") : unref(t)("subscription.monthlyCreditsLabel")), 1), createBaseVNode("div", _hoisted_20, [_cache[1] || (_cache[1] = createBaseVNode("i", { class: "icon-[lucide--component] text-amber-400 text-sm" }, null, -1)), createBaseVNode("span", _hoisted_21, toDisplayString(unref(n)(getCreditsDisplay(tier))), 1)])]),
							createBaseVNode("div", _hoisted_22, [createBaseVNode("span", _hoisted_23, toDisplayString(unref(t)("subscription.maxDurationLabel")), 1), createBaseVNode("span", _hoisted_24, toDisplayString(tier.maxDuration), 1)]),
							createBaseVNode("div", _hoisted_25, [createBaseVNode("span", _hoisted_26, toDisplayString(unref(t)("subscription.gpuLabel")), 1), _cache[2] || (_cache[2] = createBaseVNode("i", { class: "pi pi-check text-xs text-success-foreground" }, null, -1))]),
							createBaseVNode("div", _hoisted_27, [createBaseVNode("span", _hoisted_28, toDisplayString(unref(t)("subscription.addCreditsLabel")), 1), _cache[3] || (_cache[3] = createBaseVNode("i", { class: "pi pi-check text-xs text-success-foreground" }, null, -1))]),
							createBaseVNode("div", _hoisted_29, [createBaseVNode("span", _hoisted_30, toDisplayString(unref(t)("subscription.customLoRAsLabel")), 1), tier.customLoRAs ? (openBlock(), createElementBlock("i", _hoisted_31)) : (openBlock(), createElementBlock("i", _hoisted_32))]),
							createBaseVNode("div", _hoisted_33, [createBaseVNode("div", _hoisted_34, [createBaseVNode("div", _hoisted_35, [createBaseVNode("span", _hoisted_36, toDisplayString(unref(t)("subscription.videoEstimateLabel")), 1), createBaseVNode("div", _hoisted_37, [_cache[4] || (_cache[4] = createBaseVNode("i", { class: "pi pi-question-circle text-xs text-muted-foreground group-hover:text-base-foreground" }, null, -1)), createBaseVNode("span", {
								class: "text-sm font-normal text-muted-foreground cursor-pointer group-hover:text-base-foreground",
								onClick: togglePopover
							}, toDisplayString(unref(t)("subscription.videoEstimateHelp")), 1)])]), createBaseVNode("span", _hoisted_38, " ~" + toDisplayString(unref(n)(tier.pricing.videoEstimate)), 1)])])
						])
					]), createBaseVNode("div", _hoisted_39, [createVNode(Button_default, {
						variant: getButtonSeverity(tier),
						disabled: isLoading.value || isCurrentPlan(tier.key),
						loading: loadingTier.value === tier.key,
						class: normalizeClass(unref(cn)("h-10 w-full", getButtonTextClass(tier), tier.key === "creator" ? "bg-base-foreground border-transparent hover:bg-inverted-background-hover" : "bg-secondary-background border-transparent hover:bg-secondary-background-hover focus:bg-secondary-background-selected")),
						onClick: () => unref(handleSubscribe)(tier.key)
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(getButtonLabel(tier)), 1)]),
						_: 2
					}, 1032, [
						"variant",
						"disabled",
						"loading",
						"class",
						"onClick"
					])])], 2);
				}), 64))]),
				createVNode(unref(script$1), {
					ref_key: "popover",
					ref: popover,
					"append-to": "body",
					"auto-z-index": true,
					"base-z-index": 1e3,
					dismissable: true,
					"close-on-escape": true,
					unstyled: "",
					pt: { root: { class: "rounded-lg border border-interface-stroke bg-interface-panel-surface shadow-lg p-4 max-w-xs" } }
				}, {
					default: withCtx(() => [createBaseVNode("div", _hoisted_40, [createBaseVNode("p", _hoisted_41, toDisplayString(unref(t)("subscription.videoEstimateExplanation")), 1), createBaseVNode("a", _hoisted_42, [createBaseVNode("span", _hoisted_43, toDisplayString(unref(t)("subscription.videoEstimateTryTemplate")), 1), _cache[5] || (_cache[5] = createBaseVNode("span", {
						class: "no-underline",
						innerHTML: "→"
					}, null, -1))])])]),
					_: 1
				}, 512)
			]);
		};
	}
});
var _hoisted_1 = {
	key: 0,
	class: "relative flex flex-col p-4 pt-8 md:p-16 !overflow-y-auto h-full gap-8"
};
var _hoisted_2 = { class: "text-center" };
var _hoisted_3 = { class: "text-xl lg:text-2xl text-muted-foreground m-0" };
var _hoisted_4 = { class: "flex flex-col items-center gap-2" };
var _hoisted_5 = { class: "text-sm text-text-secondary m-0" };
var _hoisted_6 = { class: "flex items-center gap-1.5" };
var _hoisted_7 = { class: "text-sm text-text-secondary" };
var _hoisted_8 = {
	key: 1,
	class: "legacy-dialog relative grid h-full grid-cols-5"
};
var _hoisted_9 = { class: "col-span-3 flex flex-col justify-between p-8" };
var _hoisted_10 = { class: "flex flex-col gap-6" };
var _hoisted_11 = { class: "inline-flex items-center gap-2" };
var _hoisted_12 = { class: "text-sm text-text-primary" };
var _hoisted_13 = {
	key: 0,
	class: "m-0 text-sm text-text-secondary"
};
var _hoisted_14 = { class: "flex items-baseline gap-2" };
var _hoisted_15 = { class: "text-4xl font-bold" };
var _hoisted_16 = { class: "text-xl" };
var _hoisted_17 = { class: "flex flex-col pt-8" };
var POLL_INTERVAL_MS = 3e3;
var MAX_POLL_ATTEMPTS = 3;
var SubscriptionRequiredDialogContent_default = /* @__PURE__ */ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "SubscriptionRequiredDialogContent",
	props: {
		onClose: { type: Function },
		reason: {}
	},
	emits: ["close"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const { fetchStatus, isActiveSubscription } = useBillingContext();
		const isSubscriptionEnabled = () => Boolean(isCloud && window.__CONFIG__?.subscription_required);
		const formattedMonthlyPrice = new Intl.NumberFormat(navigator.language || "en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(20);
		const commandStore = useCommandStore();
		const telemetry = useTelemetry();
		const showCustomPricingTable = computed(() => isSubscriptionEnabled());
		let pollInterval = null;
		let pollAttempts = 0;
		const stopPolling = () => {
			if (pollInterval) {
				clearInterval(pollInterval);
				pollInterval = null;
			}
		};
		const startPolling = () => {
			stopPolling();
			pollAttempts = 0;
			const poll = async () => {
				try {
					await fetchStatus();
					pollAttempts++;
					if (pollAttempts >= MAX_POLL_ATTEMPTS) stopPolling();
				} catch (error) {
					console.error("[SubscriptionDialog] Failed to poll subscription status", error);
					stopPolling();
				}
			};
			poll();
			pollInterval = window.setInterval(() => {
				poll();
			}, POLL_INTERVAL_MS);
		};
		const handleWindowFocus = () => {
			if (showCustomPricingTable.value) startPolling();
		};
		watch(showCustomPricingTable, (enabled) => {
			if (enabled) window.addEventListener("focus", handleWindowFocus);
			else {
				window.removeEventListener("focus", handleWindowFocus);
				stopPolling();
			}
		}, { immediate: true });
		watch(() => isActiveSubscription.value, (isActive) => {
			if (isActive && showCustomPricingTable.value) emit("close", true);
		});
		const handleSubscribed = () => {
			emit("close", true);
		};
		const handleClose = () => {
			stopPolling();
			__props.onClose();
		};
		const handleContactUs = async () => {
			telemetry?.trackHelpResourceClicked({
				resource_type: "help_feedback",
				is_external: true,
				source: "subscription"
			});
			await commandStore.execute("Comfy.ContactSupport");
		};
		const handleViewEnterprise = () => {
			telemetry?.trackHelpResourceClicked({
				resource_type: "docs",
				is_external: true,
				source: "subscription"
			});
			window.open("https://www.comfy.org/cloud/enterprise", "_blank");
		};
		onBeforeUnmount(() => {
			stopPolling();
			window.removeEventListener("focus", handleWindowFocus);
		});
		return (_ctx, _cache) => {
			return showCustomPricingTable.value ? (openBlock(), createElementBlock("div", _hoisted_1, [
				createVNode(Button_default, {
					size: "icon",
					variant: "muted-textonly",
					class: "rounded-full shrink-0 text-text-secondary hover:bg-white/10 absolute right-2.5 top-2.5",
					"aria-label": _ctx.$t("g.close"),
					onClick: handleClose
				}, {
					default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "pi pi-times text-xl" }, null, -1)])]),
					_: 1
				}, 8, ["aria-label"]),
				createBaseVNode("div", _hoisted_2, [createBaseVNode("h2", _hoisted_3, toDisplayString(_ctx.$t("subscription.description")), 1)]),
				createVNode(PricingTable_default, { class: "flex-1" }),
				createBaseVNode("div", _hoisted_4, [createBaseVNode("p", _hoisted_5, toDisplayString(_ctx.$t("subscription.haveQuestions")), 1), createBaseVNode("div", _hoisted_6, [
					createVNode(Button_default, {
						variant: "muted-textonly",
						class: "h-6 p-1 text-sm text-text-secondary hover:text-base-foreground",
						onClick: handleContactUs
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.contactUs")) + " ", 1), _cache[1] || (_cache[1] = createBaseVNode("i", { class: "pi pi-comments" }, null, -1))]),
						_: 1
					}),
					createBaseVNode("span", _hoisted_7, toDisplayString(_ctx.$t("g.or")), 1),
					createVNode(Button_default, {
						variant: "muted-textonly",
						class: "h-6 p-1 text-sm text-text-secondary hover:text-base-foreground",
						onClick: handleViewEnterprise
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.viewEnterprise")) + " ", 1), _cache[2] || (_cache[2] = createBaseVNode("i", { class: "pi pi-external-link" }, null, -1))]),
						_: 1
					})
				])])
			])) : (openBlock(), createElementBlock("div", _hoisted_8, [
				createVNode(Button_default, {
					size: "icon",
					variant: "muted-textonly",
					class: "rounded-full absolute top-2.5 right-2.5 z-10 h-8 w-8 p-0 text-white hover:bg-white/20",
					"aria-label": _ctx.$t("g.close"),
					onClick: handleClose
				}, {
					default: withCtx(() => [..._cache[3] || (_cache[3] = [createBaseVNode("i", { class: "pi pi-times" }, null, -1)])]),
					_: 1
				}, 8, ["aria-label"]),
				_cache[4] || (_cache[4] = createBaseVNode("div", { class: "relative col-span-2 flex items-center justify-center overflow-hidden rounded-sm" }, [createBaseVNode("video", {
					autoplay: "",
					loop: "",
					muted: "",
					playsinline: "",
					class: "h-full min-w-[125%] object-cover p-0",
					style: { "margin-left": "-20%" }
				}, [createBaseVNode("source", {
					src: "" + new URL("images/cloud-subscription.webm", import.meta.url).href,
					type: "video/webm"
				})])], -1)),
				createBaseVNode("div", _hoisted_9, [createBaseVNode("div", null, [createBaseVNode("div", _hoisted_10, [
					createBaseVNode("div", _hoisted_11, [createBaseVNode("div", _hoisted_12, toDisplayString(__props.reason === "out_of_credits" ? _ctx.$t("credits.topUp.insufficientTitle") : _ctx.$t("subscription.required.title")), 1), createVNode(CloudBadge_default, {
						"reverse-order": "",
						"no-padding": "",
						"background-color": "var(--p-dialog-background)",
						"use-subscription": ""
					})]),
					__props.reason === "out_of_credits" ? (openBlock(), createElementBlock("p", _hoisted_13, toDisplayString(_ctx.$t("credits.topUp.insufficientMessage")), 1)) : createCommentVNode("", true),
					createBaseVNode("div", _hoisted_14, [createBaseVNode("span", _hoisted_15, toDisplayString(unref(formattedMonthlyPrice)), 1), createBaseVNode("span", _hoisted_16, toDisplayString(_ctx.$t("subscription.perMonth")), 1)])
				]), createVNode(SubscriptionBenefits_default, { class: "mt-6 text-muted" })]), createBaseVNode("div", _hoisted_17, [createVNode(SubscribeButton_default, {
					class: "py-2 px-4 rounded-lg",
					pt: {
						root: { style: "background: var(--color-accent-blue, #0B8CE9);" },
						label: { class: "font-inter font-[700] text-sm" }
					},
					onSubscribed: handleSubscribed
				})])])
			]));
		};
	}
}), [["__scopeId", "data-v-cfdf818d"]]);
export { SubscriptionRequiredDialogContent_default as default };

//# sourceMappingURL=SubscriptionRequiredDialogContent-oewctG-N.js.map