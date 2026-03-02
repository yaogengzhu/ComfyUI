import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-BMWHeZll.js";
import "./vendor-firebase-DN8BxCYa.js";
import "./vendor-other-Cb4peHqA.js";
import "./useFeatureFlags-CQzrYTw1.js";
import { an as watchDebounced } from "./vendor-reka-ui-jxMUDvZT.js";
import "./api-CrHaA16j.js";
import "./vendor-markdown-BPt2PdDp.js";
import "./colorUtil-CQE2D_f9.js";
import "./i18n-Dy4mrtIR.js";
import "./Button-D4w5_e9I.js";
import { Qr as useCurrentUser, Yr as useBillingContext, jn as useExtensionService } from "./dialogService-Cm1QZvWM.js";
import "./extensionStore-jct1qmkK.js";
import "./userStore-B8DDUPuE.js";
import "./useErrorHandling-D8IRIzSw.js";
import "./useExternalLink-BDqUsXhK.js";
import "./vendor-tiptap-DTO2QA4Q.js";
import "./markdownRendererUtil-CrR6m0CH.js";
import "./Popover-oAJ3EQ_X.js";
import { t as refreshRemoteConfig } from "./refreshRemoteConfig-Bqk5GAtH.js";
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

//# sourceMappingURL=cloudRemoteConfig-BGNcAZdz.js.map