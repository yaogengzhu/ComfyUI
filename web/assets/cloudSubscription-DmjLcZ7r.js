import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-kyY2H95P.js";
import "./vendor-firebase-DnyyBhvM.js";
import { pt as watch } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-C6-gqLl2.js";
import "./useFeatureFlags-B9hGtXPF.js";
import "./vendor-reka-ui--l_O1Shn.js";
import "./api-BIg8a8Ge.js";
import "./vendor-markdown-DFo_IkzS.js";
import "./colorUtil-CPODED-Q.js";
import "./i18n-CrjEfjCc.js";
import "./Button-DQNHabQW.js";
import { Qr as useCurrentUser, Yr as useBillingContext, jn as useExtensionService } from "./dialogService-C9L3yyTu.js";
import "./extensionStore-C4FANNnW.js";
import "./userStore-H2R_W1gd.js";
import "./useErrorHandling-CnTPvfCR.js";
import "./useExternalLink-DGE106nN.js";
import "./vendor-tiptap-BnYkbQDM.js";
import "./markdownRendererUtil-COLKL0Bq.js";
import "./Popover-DEsU7dja.js";
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

//# sourceMappingURL=cloudSubscription-DmjLcZ7r.js.map