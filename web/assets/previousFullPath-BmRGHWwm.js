import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { D as computed, kt as ref } from "./vendor-vue-core-tg-oZu4l.js";
import { i as remoteConfig } from "./useFeatureFlags-DKDRstHr.js";
import { _i as getTierCredits } from "./dialogService-ClPphYfX.js";
function useFreeTierOnboarding() {
	const showEmailForm = ref(false);
	const freeTierCredits = computed(() => getTierCredits("free"));
	const isFreeTierEnabled = computed(() => remoteConfig.value.new_free_tier_subscriptions ?? false);
	function switchToEmailForm() {
		showEmailForm.value = true;
	}
	function switchToSocialLogin() {
		showEmailForm.value = false;
	}
	return {
		showEmailForm,
		freeTierCredits,
		isFreeTierEnabled,
		switchToEmailForm,
		switchToSocialLogin
	};
}
var decodeQueryParam = (value) => {
	try {
		return decodeURIComponent(value);
	} catch {
		return null;
	}
};
var isSafeInternalRedirectPath = (path) => {
	return path.startsWith("/") && !path.startsWith("//");
};
const getSafePreviousFullPath = (query) => {
	const raw = query.previousFullPath;
	const value = Array.isArray(raw) ? raw[0] : raw;
	if (!value) return null;
	const decoded = decodeQueryParam(value);
	if (!decoded) return null;
	return isSafeInternalRedirectPath(decoded) ? decoded : null;
};
export { useFreeTierOnboarding as n, getSafePreviousFullPath as t };

//# sourceMappingURL=previousFullPath-BmRGHWwm.js.map