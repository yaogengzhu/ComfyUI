import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-DxYsW_Ng.js";
import "./vendor-firebase-DnyyBhvM.js";
import { pt as watch } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-C6-gqLl2.js";
import "./useFeatureFlags-D8PCe3j0.js";
import "./vendor-reka-ui--l_O1Shn.js";
import "./api-C6l3jfo9.js";
import "./vendor-markdown-DFo_IkzS.js";
import "./colorUtil-CPODED-Q.js";
import "./i18n-Dw0liyWq.js";
import "./Button-DQNHabQW.js";
import { Qr as useCurrentUser, Yr as useBillingContext, jn as useExtensionService } from "./dialogService-CwDBFHIT.js";
import "./extensionStore-BygwWgzY.js";
import "./userStore-nuah1-5i.js";
import "./useErrorHandling-XEUYiWQB.js";
import "./useExternalLink-BC_To13P.js";
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

//# sourceMappingURL=cloudSubscription-CP6LOkLf.js.map