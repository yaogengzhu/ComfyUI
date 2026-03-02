import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-DxYsW_Ng.js";
import "./vendor-firebase-DnyyBhvM.js";
import { D as computed, R as defineComponent, Rt as unref, et as openBlock, k as createBlock, ot as resolveDynamicComponent } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-C6-gqLl2.js";
import "./useFeatureFlags-D7S0T-hX.js";
import "./vendor-reka-ui--l_O1Shn.js";
import "./api-_meS9Tf3.js";
import "./vendor-markdown-DFo_IkzS.js";
import "./colorUtil-CPODED-Q.js";
import "./i18n-Dw0liyWq.js";
import "./Button-DQNHabQW.js";
import { Yr as useBillingContext } from "./dialogService-izllT8P8.js";
import "./extensionStore-BafvIS1l.js";
import "./userStore-xXj7g9EA.js";
import "./useErrorHandling-DdKwDbhp.js";
import "./useExternalLink-BC_To13P.js";
import "./vendor-tiptap-BnYkbQDM.js";
import "./markdownRendererUtil-COLKL0Bq.js";
import "./Popover-DEsU7dja.js";
import { t as ComfyQueueButton_default } from "./ComfyQueueButton-cZb4p3v5.js";
import { t as SubscribeToRun_default } from "./SubscribeToRun-BmvqmxKa.js";
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

//# sourceMappingURL=CloudRunButtonWrapper-D3f2MvdY.js.map