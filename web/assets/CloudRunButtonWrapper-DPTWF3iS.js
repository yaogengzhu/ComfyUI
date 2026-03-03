import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-BEjAYGWm.js";
import "./vendor-firebase-DN8BxCYa.js";
import { D as computed, R as defineComponent, Rt as unref, et as openBlock, k as createBlock, ot as resolveDynamicComponent } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-qJz1Z78N.js";
import "./useFeatureFlags-B3RwD6hI.js";
import "./vendor-reka-ui-C26MN8JS.js";
import "./api-D2HJ3Cuk.js";
import "./vendor-markdown-DF7_n7Ki.js";
import "./colorUtil-CyOZxXkW.js";
import "./i18n-Ce5inB5_.js";
import "./userStore-CgWi1Hiu.js";
import "./huizhiAuthService-Mxdj0XpZ.js";
import { Qr as useBillingContext } from "./teamWorkspaceStore-B1oHaZID.js";
import "./Button-AKQyxeyD.js";
import "./extensionStore-DbCclKhl.js";
import "./useErrorHandling-C6LadziV.js";
import "./useExternalLink-RgafkIwT.js";
import "./vendor-tiptap-C9679tdI.js";
import "./markdownRendererUtil-rU1hBHFB.js";
import "./Popover-DMhMBlU6.js";
import { t as ComfyQueueButton_default } from "./ComfyQueueButton-B_QOYihO.js";
import { t as SubscribeToRun_default } from "./SubscribeToRun-DziZygnm.js";
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

//# sourceMappingURL=CloudRunButtonWrapper-DPTWF3iS.js.map