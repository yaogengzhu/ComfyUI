import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { D as computed, It as toValue, Z as onMounted, kt as ref } from "./vendor-vue-core-tg-oZu4l.js";
import { t as isCloud } from "./types-YYe-ycsK.js";
import { n as useI18n } from "./vendor-i18n-86kE_LSO.js";
import { t as useTelemetry } from "./telemetry-CLrjuJLU.js";
import { Jr as useFirebaseAuthActions, Yr as useBillingContext, Z as formatCreditsFromCents, bi as getTierCredits, ni as useCommandStore, t as useDialogService, xi as getTierFeatures } from "./dialogService-Cvolq8px.js";
function useSubscriptionActions() {
	const dialogService = useDialogService();
	const authActions = useFirebaseAuthActions();
	const commandStore = useCommandStore();
	const telemetry = useTelemetry();
	const { fetchStatus } = useBillingContext();
	const isLoadingSupport = ref(false);
	onMounted(() => {
		handleRefresh();
	});
	const handleAddApiCredits = () => {
		dialogService.showTopUpCreditsDialog();
	};
	const handleMessageSupport = async () => {
		try {
			isLoadingSupport.value = true;
			if (isCloud) telemetry?.trackHelpResourceClicked({
				resource_type: "help_feedback",
				is_external: true,
				source: "subscription"
			});
			await commandStore.execute("Comfy.ContactSupport");
		} catch (error) {
			console.error("[useSubscriptionActions] Error contacting support:", error);
		} finally {
			isLoadingSupport.value = false;
		}
	};
	const handleRefresh = async () => {
		try {
			await Promise.all([authActions.fetchBalance(), fetchStatus()]);
		} catch (error) {
			console.error("[useSubscriptionActions] Error refreshing data:", error);
		}
	};
	const handleLearnMoreClick = () => {
		window.open("https://docs.comfy.org/get_started/cloud", "_blank");
	};
	return {
		isLoadingSupport,
		handleAddApiCredits,
		handleMessageSupport,
		handleRefresh,
		handleLearnMoreClick
	};
}
function formatBalance(maybeCents, locale) {
	return formatCreditsFromCents({
		cents: maybeCents ?? 0,
		locale,
		numberOptions: {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}
	});
}
function useSubscriptionCredits() {
	const billingContext = useBillingContext();
	const { locale } = useI18n();
	return {
		totalCredits: computed(() => {
			return formatBalance(toValue(billingContext.balance)?.amountMicros, locale.value);
		}),
		monthlyBonusCredits: computed(() => {
			return formatBalance(toValue(billingContext.balance)?.cloudCreditBalanceMicros, locale.value);
		}),
		prepaidCredits: computed(() => {
			return formatBalance(toValue(billingContext.balance)?.prepaidBalanceMicros, locale.value);
		}),
		isLoadingBalance: computed(() => toValue(billingContext.isLoading))
	};
}
function getCommonTierBenefits(key, t, n) {
	const benefits = [];
	const isFree = key === "free";
	if (isFree) {
		const credits = getTierCredits(key);
		if (credits !== null) benefits.push({
			key: "monthlyCredits",
			type: "metric",
			value: n(credits),
			label: t("subscription.monthlyCreditsLabel")
		});
	}
	benefits.push({
		key: "maxDuration",
		type: "metric",
		value: t(`subscription.maxDuration.${key}`),
		label: t("subscription.maxDurationLabel")
	});
	benefits.push({
		key: "gpu",
		type: "feature",
		label: t("subscription.gpuLabel")
	});
	if (!isFree) benefits.push({
		key: "addCredits",
		type: "feature",
		label: t("subscription.addCreditsLabel")
	});
	if (getTierFeatures(key).customLoRAs) benefits.push({
		key: "customLoRAs",
		type: "feature",
		label: t("subscription.customLoRAsLabel")
	});
	return benefits;
}
export { useSubscriptionCredits as n, useSubscriptionActions as r, getCommonTierBenefits as t };

//# sourceMappingURL=tierBenefits-r_URuKn8.js.map