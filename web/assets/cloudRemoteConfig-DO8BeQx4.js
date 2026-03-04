import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-CN8WO3jr.js";
import "./vendor-firebase-DN8BxCYa.js";
import "./vendor-other-BlwZz5NW.js";
import "./useFeatureFlags-kJeWJWfN.js";
import { an as watchDebounced } from "./vendor-reka-ui-C_KZ-Z9x.js";
import "./api-nREgj_HO.js";
import "./vendor-markdown-DF7_n7Ki.js";
import "./colorUtil-0jM4jJ4_.js";
import "./i18n-B95gNu60.js";
import "./userStore-BgTMUZFo.js";
import "./huizhiAuthService-DRNED4sE.js";
import { t as refreshRemoteConfig } from "./refreshRemoteConfig-DiKJIobc.js";
import { Pn as useExtensionService, Qr as useBillingContext, ni as useCurrentUser } from "./teamWorkspaceStore-BPR4vJb-.js";
import "./Button-BXdh2GzZ.js";
import "./extensionStore-DTHbvcUb.js";
import "./useErrorHandling-Bo8s6znR.js";
import "./useExternalLink-DXOke9aD.js";
import "./vendor-tiptap-C9679tdI.js";
import "./markdownRendererUtil-rU1hBHFB.js";
import "./Popover-Bju946nz.js";
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

//# sourceMappingURL=cloudRemoteConfig-DO8BeQx4.js.map