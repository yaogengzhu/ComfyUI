import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-CN8WO3jr.js";
import "./vendor-firebase-DN8BxCYa.js";
import { pt as watch } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-BlwZz5NW.js";
import "./useFeatureFlags-kJeWJWfN.js";
import "./vendor-reka-ui-C_KZ-Z9x.js";
import "./api-nREgj_HO.js";
import "./vendor-markdown-DF7_n7Ki.js";
import "./colorUtil-0jM4jJ4_.js";
import "./i18n-B95gNu60.js";
import "./userStore-BgTMUZFo.js";
import "./huizhiAuthService-DRNED4sE.js";
import { Pn as useExtensionService, Qr as useBillingContext, ni as useCurrentUser } from "./teamWorkspaceStore-BPR4vJb-.js";
import "./Button-BXdh2GzZ.js";
import "./extensionStore-DTHbvcUb.js";
import "./useErrorHandling-Bo8s6znR.js";
import "./useExternalLink-DXOke9aD.js";
import "./vendor-tiptap-C9679tdI.js";
import "./markdownRendererUtil-rU1hBHFB.js";
import "./Popover-Bju946nz.js";
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

//# sourceMappingURL=cloudSubscription-BpeuYtun.js.map