import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-DxYsW_Ng.js";
import "./vendor-firebase-DnyyBhvM.js";
import "./vendor-other-C6-gqLl2.js";
import "./useFeatureFlags-D7S0T-hX.js";
import { an as watchDebounced } from "./vendor-reka-ui--l_O1Shn.js";
import "./api-_meS9Tf3.js";
import "./vendor-markdown-DFo_IkzS.js";
import "./colorUtil-CPODED-Q.js";
import "./i18n-Dw0liyWq.js";
import "./Button-DQNHabQW.js";
import { Qr as useCurrentUser, Yr as useBillingContext, jn as useExtensionService } from "./dialogService-izllT8P8.js";
import "./extensionStore-BafvIS1l.js";
import "./userStore-xXj7g9EA.js";
import "./useErrorHandling-DdKwDbhp.js";
import "./useExternalLink-BC_To13P.js";
import "./vendor-tiptap-BnYkbQDM.js";
import "./markdownRendererUtil-COLKL0Bq.js";
import "./Popover-DEsU7dja.js";
import { t as refreshRemoteConfig } from "./refreshRemoteConfig-Dv6TBnSm.js";
useExtensionService().registerExtension({
	name: "Comfy.Cloud.RemoteConfig",
	setup: async () => {
		const { isLoggedIn } = useCurrentUser();
		const { isActiveSubscription } = useBillingContext();
		watchDebounced([isLoggedIn, isActiveSubscription], () => {
			if (!isLoggedIn.value) return;
			refreshRemoteConfig();
		}, {
			debounce: 256,
			immediate: true
		});
		setInterval(() => void refreshRemoteConfig(), 6e5);
	}
});

//# sourceMappingURL=cloudRemoteConfig-DNyh0H-p.js.map