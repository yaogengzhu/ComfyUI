import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-kyY2H95P.js";
import "./vendor-firebase-DnyyBhvM.js";
import "./vendor-other-C6-gqLl2.js";
import "./useFeatureFlags-B9hGtXPF.js";
import { an as watchDebounced } from "./vendor-reka-ui--l_O1Shn.js";
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
import { t as refreshRemoteConfig } from "./refreshRemoteConfig-nAwvBYTk.js";
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

//# sourceMappingURL=cloudRemoteConfig-D0SNUIBt.js.map