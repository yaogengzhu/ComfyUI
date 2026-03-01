import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-kyY2H95P.js";
import "./vendor-firebase-DnyyBhvM.js";
import { D as computed, R as defineComponent, Rt as unref, et as openBlock, k as createBlock, ot as resolveDynamicComponent } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-C6-gqLl2.js";
import "./useFeatureFlags-B9hGtXPF.js";
import "./vendor-reka-ui--l_O1Shn.js";
import "./api-BIg8a8Ge.js";
import "./vendor-markdown-DFo_IkzS.js";
import "./colorUtil-CPODED-Q.js";
import "./i18n-CrjEfjCc.js";
import "./Button-DQNHabQW.js";
import { Yr as useBillingContext } from "./dialogService-C9L3yyTu.js";
import "./extensionStore-C4FANNnW.js";
import "./userStore-H2R_W1gd.js";
import "./useErrorHandling-CnTPvfCR.js";
import "./useExternalLink-DGE106nN.js";
import "./vendor-tiptap-BnYkbQDM.js";
import "./markdownRendererUtil-COLKL0Bq.js";
import "./Popover-DEsU7dja.js";
import { t as ComfyQueueButton_default } from "./ComfyQueueButton-BZT4uXma.js";
import { t as SubscribeToRun_default } from "./SubscribeToRun-3DiRzXcf.js";
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

//# sourceMappingURL=CloudRunButtonWrapper-CX6Doa5k.js.map