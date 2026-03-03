import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-CNPGb1TW.js";
import "./vendor-firebase-DN8BxCYa.js";
import { F as createTextVNode, I as createVNode, O as createBaseVNode, R as defineComponent, Rt as unref, S as Fragment, Ut as toDisplayString, _t as withCtx, et as openBlock, j as createElementBlock, rt as renderSlot, t as RouterView } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-qJz1Z78N.js";
import "./useFeatureFlags-BlMvC2mV.js";
import "./vendor-reka-ui-jxMUDvZT.js";
import "./api-DArsZFwY.js";
import "./vendor-markdown-BPt2PdDp.js";
import "./colorUtil-BKg8i9Q6.js";
import { n as useI18n } from "./vendor-i18n-86kE_LSO.js";
import "./i18n-syd3PJfQ.js";
import { t as Button_default } from "./Button-D8fmNaXY.js";
import "./dialogService-BUdss0z2.js";
import "./extensionStore-C8F8CzIg.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-ralzwvFM.js";
import "./userStore-D93A7Tj9.js";
import "./useErrorHandling-4WJW_EDk.js";
import "./huizhiAuthService-xKOJ1ACT.js";
import "./useExternalLink-tAAZu4wg.js";
import "./vendor-tiptap-C9679tdI.js";
import "./markdownRendererUtil-Q53IsTUL.js";
import "./Popover-bsCD7nil.js";
import { t as GlobalToast_default } from "./GlobalToast-DtAJTAkJ.js";
import { t as BaseViewTemplate_default } from "./BaseViewTemplate-DU8Z4OmN.js";
var thumbnail_default = "" + new URL("thumbnail-imMA3y7Z.png", import.meta.url).href;
var video_default = "" + new URL("video-BvOHf4P9.mp4", import.meta.url).href;
var comfy_cloud_logo_default = "" + new URL("images/comfy-cloud-logo.svg", import.meta.url).href;
var _sfc_main = {};
var _hoisted_1$2 = { class: "mx-auto flex h-[7%] max-h-[70px] w-5/6 items-end" };
var _hoisted_2$2 = ["alt"];
function _sfc_render(_ctx, _cache) {
	return openBlock(), createElementBlock("div", _hoisted_1$2, [createBaseVNode("img", {
		src: comfy_cloud_logo_default,
		alt: _ctx.$t("subscription.comfyCloudLogo"),
		class: "h-3/4 max-h-10 w-auto"
	}, null, 8, _hoisted_2$2)]);
}
var CloudLogo_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["render", _sfc_render]]);
var _hoisted_1$1 = { class: "mx-auto flex h-[5%] max-h-[60px] w-5/6 items-start gap-2.5" };
var _hoisted_2$1 = {
	href: "https://www.comfy.org/terms-of-service",
	target: "_blank",
	class: "cursor-pointer text-sm text-gray-600 no-underline"
};
var _hoisted_3$1 = {
	href: "https://www.comfy.org/privacy-policy",
	target: "_blank",
	class: "cursor-pointer text-sm text-gray-600 no-underline"
};
var _hoisted_4$1 = {
	href: "https://support.comfy.org",
	class: "cursor-pointer text-sm text-gray-600 no-underline",
	target: "_blank",
	rel: "noopener noreferrer"
};
var CloudTemplateFooter_default = /* @__PURE__ */ defineComponent({
	__name: "CloudTemplateFooter",
	setup(__props) {
		const { t } = useI18n();
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("footer", _hoisted_1$1, [
				createBaseVNode("a", _hoisted_2$1, toDisplayString(unref(t)("auth.login.termsLink")), 1),
				createBaseVNode("a", _hoisted_3$1, toDisplayString(unref(t)("auth.login.privacyLink")), 1),
				createBaseVNode("a", _hoisted_4$1, toDisplayString(unref(t)("cloudFooter_needHelp")), 1)
			]);
		};
	}
});
var _hoisted_1 = { class: "flex" };
var _hoisted_2 = { class: "relative hidden flex-1 overflow-hidden bg-black lg:block" };
var _hoisted_3 = ["poster"];
var _hoisted_4 = ["src"];
var _hoisted_5 = { class: "absolute inset-0 flex items-center justify-center text-center text-white" };
var _hoisted_6 = { class: "font-abcrom hero-title font-black uppercase italic" };
var _hoisted_7 = { class: "m-2 text-center text-xl text-white" };
var _hoisted_8 = { class: "m-0 text-center text-xl text-white" };
var _hoisted_9 = { class: "absolute inset-0 flex flex-col justify-end px-14 pb-[64px]" };
var _hoisted_10 = { class: "flex items-center justify-end" };
var _hoisted_11 = { class: "flex items-center gap-3" };
var _hoisted_12 = { class: "text-md text-white" };
var CloudTemplate_default = /* @__PURE__ */ defineComponent({
	__name: "CloudTemplate",
	setup(__props) {
		const { t } = useI18n();
		const handleDownloadClick = () => {
			window.open("https://www.comfy.org/download", "_blank");
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createVNode(BaseViewTemplate_default, {
				dark: "",
				class: "flex-1"
			}, {
				header: withCtx(() => [createVNode(CloudLogo_default)]),
				footer: withCtx(() => [createVNode(CloudTemplateFooter_default)]),
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}), createBaseVNode("div", _hoisted_2, [
				createBaseVNode("video", {
					class: "absolute inset-0 h-full w-full object-cover",
					autoplay: "",
					muted: "",
					loop: "",
					playsinline: "",
					poster: unref(thumbnail_default)
				}, [createBaseVNode("source", {
					src: unref(video_default),
					type: "video/mp4"
				}, null, 8, _hoisted_4)], 8, _hoisted_3),
				_cache[0] || (_cache[0] = createBaseVNode("div", { class: "absolute inset-0 h-full w-full bg-black/30" }, null, -1)),
				createBaseVNode("div", _hoisted_5, [createBaseVNode("div", null, [
					createBaseVNode("h1", _hoisted_6, toDisplayString(unref(t)("cloudStart_title")), 1),
					createBaseVNode("p", _hoisted_7, toDisplayString(unref(t)("cloudStart_desc")), 1),
					createBaseVNode("p", _hoisted_8, toDisplayString(unref(t)("cloudStart_explain")), 1)
				])]),
				createBaseVNode("div", _hoisted_9, [createBaseVNode("div", _hoisted_10, [createBaseVNode("div", _hoisted_11, [createBaseVNode("p", _hoisted_12, toDisplayString(unref(t)("cloudStart_wantToRun")), 1), createVNode(Button_default, {
					type: "button",
					class: "h-10 bg-black font-bold text-white",
					variant: "secondary",
					onClick: handleDownloadClick
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("cloudStart_download")), 1)]),
					_: 1
				})])])])
			])]);
		};
	}
});
var CloudLayoutView_default = /* @__PURE__ */ defineComponent({
	__name: "CloudLayoutView",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(CloudTemplate_default, null, {
				default: withCtx(() => [createVNode(unref(RouterView))]),
				_: 1
			}), createVNode(GlobalToast_default)], 64);
		};
	}
});
export { CloudLayoutView_default as default };

//# sourceMappingURL=CloudLayoutView-B3C0NIJZ.js.map