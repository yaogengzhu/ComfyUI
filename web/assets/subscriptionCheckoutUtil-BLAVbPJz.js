import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { l as storeToRefs } from "./vendor-vue-core-tg-oZu4l.js";
import { t as isCloud } from "./types-DT3N7am7.js";
import { o as t } from "./i18n-CrjEfjCc.js";
import { t as useTelemetry } from "./telemetry-zZf2dHJ2.js";
import { ii as useFirebaseAuthStore, oi as getComfyApiBaseUrl, ri as FirebaseAuthStoreError } from "./dialogService-C9L3yyTu.js";
var getCheckoutTier = (tierKey, billingCycle) => billingCycle === "yearly" ? `${tierKey}-yearly` : tierKey;
var getCheckoutAttributionForCloud = async () => {
	return {};
};
async function performSubscriptionCheckout(tierKey, currentBillingCycle, openInNewTab = true) {
	if (!isCloud) return;
	const firebaseAuthStore = useFirebaseAuthStore();
	const { userId } = storeToRefs(firebaseAuthStore);
	const telemetry = useTelemetry();
	const authHeader = await firebaseAuthStore.getAuthHeader();
	if (!authHeader) throw new FirebaseAuthStoreError(t("toastMessages.userNotAuthenticated"));
	const checkoutTier = getCheckoutTier(tierKey, currentBillingCycle);
	let checkoutAttribution = {};
	try {
		checkoutAttribution = await getCheckoutAttributionForCloud();
	} catch (error) {
		console.warn("[SubscriptionCheckout] Failed to collect checkout attribution", error);
	}
	const checkoutPayload = { ...checkoutAttribution };
	const response = await fetch(`${getComfyApiBaseUrl()}/customers/cloud-subscription-checkout/${checkoutTier}`, {
		method: "POST",
		headers: {
			...authHeader,
			"Content-Type": "application/json"
		},
		body: JSON.stringify(checkoutPayload)
	});
	if (!response.ok) {
		let errorMessage = "Failed to initiate checkout";
		try {
			errorMessage = (await response.json()).message || errorMessage;
		} catch {
			try {
				errorMessage = await response.text() || `HTTP ${response.status} ${response.statusText}`;
			} catch {
				errorMessage = `HTTP ${response.status} ${response.statusText}`;
			}
		}
		throw new FirebaseAuthStoreError(t("toastMessages.failedToInitiateSubscription", { error: errorMessage }));
	}
	const data = await response.json();
	if (data.checkout_url) {
		if (userId.value) telemetry?.trackBeginCheckout({
			user_id: userId.value,
			tier: tierKey,
			cycle: currentBillingCycle,
			checkout_type: "new",
			...checkoutAttribution
		});
		if (openInNewTab) window.open(data.checkout_url, "_blank");
		else globalThis.location.href = data.checkout_url;
	}
}
export { performSubscriptionCheckout as t };

//# sourceMappingURL=subscriptionCheckoutUtil-BLAVbPJz.js.map