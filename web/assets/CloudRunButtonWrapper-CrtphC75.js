import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-BMWHeZll.js";
import "./vendor-firebase-DN8BxCYa.js";
import { D as computed, R as defineComponent, Rt as unref, et as openBlock, k as createBlock, ot as resolveDynamicComponent } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-Cb4peHqA.js";
import "./useFeatureFlags-CQzrYTw1.js";
import "./vendor-reka-ui-jxMUDvZT.js";
import "./api-CrHaA16j.js";
import "./vendor-markdown-BPt2PdDp.js";
import "./colorUtil-CQE2D_f9.js";
import "./i18n-Dy4mrtIR.js";
import "./Button-D4w5_e9I.js";
import { Yr as useBillingContext } from "./dialogService-Cm1QZvWM.js";
import "./extensionStore-jct1qmkK.js";
import "./userStore-B8DDUPuE.js";
import "./useErrorHandling-D8IRIzSw.js";
import "./useExternalLink-BDqUsXhK.js";
import "./vendor-tiptap-DTO2QA4Q.js";
import "./markdownRendererUtil-CrR6m0CH.js";
import "./Popover-oAJ3EQ_X.js";
import { t as ComfyQueueButton_default } from "./ComfyQueueButton-Akskq-CS.js";
import { t as SubscribeToRun_default } from "./SubscribeToRun-B7C9OMZf.js";
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

//# sourceMappingURL=CloudRunButtonWrapper-CrtphC75.js.map