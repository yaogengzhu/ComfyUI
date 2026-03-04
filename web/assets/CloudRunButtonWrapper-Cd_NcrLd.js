import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-CN8WO3jr.js";
import "./vendor-firebase-DN8BxCYa.js";
import { D as computed, R as defineComponent, Rt as unref, et as openBlock, k as createBlock, ot as resolveDynamicComponent } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-BlwZz5NW.js";
import "./useFeatureFlags-kJeWJWfN.js";
import "./vendor-reka-ui-C_KZ-Z9x.js";
import "./api-nREgj_HO.js";
import "./vendor-markdown-DF7_n7Ki.js";
import "./colorUtil-0jM4jJ4_.js";
import "./i18n-B95gNu60.js";
import "./userStore-BgTMUZFo.js";
import "./huizhiAuthService-DRNED4sE.js";
import { Qr as useBillingContext } from "./teamWorkspaceStore-BPR4vJb-.js";
import "./Button-BXdh2GzZ.js";
import "./extensionStore-DTHbvcUb.js";
import "./useErrorHandling-Bo8s6znR.js";
import "./useExternalLink-DXOke9aD.js";
import "./vendor-tiptap-C9679tdI.js";
import "./markdownRendererUtil-rU1hBHFB.js";
import "./Popover-Bju946nz.js";
import { t as ComfyQueueButton_default } from "./ComfyQueueButton-C0GVvskp.js";
import { t as SubscribeToRun_default } from "./SubscribeToRun--s7-t36L.js";
var CloudRunButtonWrapper_default = /* @__PURE__ */ defineComponent({
	__name: "CloudRunButtonWrapper",
	setup(__props) {
		const { isActiveSubscription } = useBillingContext();
		const currentButton = computed(() => isActiveSubscription.value ? ComfyQueueButton_default : SubscribeToRun_default);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(currentButton.value), { key: unref(isActiveSubscription) ? "queue" : "subscribe" });
		};
	}
});
export { CloudRunButtonWrapper_default as default };

//# sourceMappingURL=CloudRunButtonWrapper-Cd_NcrLd.js.map