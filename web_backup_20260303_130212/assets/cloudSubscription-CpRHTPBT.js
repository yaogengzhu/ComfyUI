import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-CNPGb1TW.js";
import "./vendor-firebase-DN8BxCYa.js";
import { pt as watch } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-qJz1Z78N.js";
import "./useFeatureFlags-BlMvC2mV.js";
import "./vendor-reka-ui-jxMUDvZT.js";
import "./api-DArsZFwY.js";
import "./vendor-markdown-BPt2PdDp.js";
import "./colorUtil-BKg8i9Q6.js";
import "./i18n-syd3PJfQ.js";
import "./Button-D8fmNaXY.js";
import { Qr as useCurrentUser, Yr as useBillingContext, jn as useExtensionService } from "./dialogService-BUdss0z2.js";
import "./extensionStore-C8F8CzIg.js";
import "./userStore-D93A7Tj9.js";
import "./useErrorHandling-4WJW_EDk.js";
import "./huizhiAuthService-xKOJ1ACT.js";
import "./useExternalLink-tAAZu4wg.js";
import "./vendor-tiptap-C9679tdI.js";
import "./markdownRendererUtil-Q53IsTUL.js";
import "./Popover-bsCD7nil.js";
useExtensionService().registerExtension({
	name: "Comfy.Cloud.Subscription",
	setup: async () => {
		const { isLoggedIn } = useCurrentUser();
		const { requireActiveSubscription } = useBillingContext();
		const checkSubscriptionStatus = () => {
			if (!isLoggedIn.value) return;
			requireActiveSubscription();
		};
		watch(() => isLoggedIn.value, checkSubscriptionStatus, { immediate: true });
	}
});

//# sourceMappingURL=cloudSubscription-CpRHTPBT.js.map