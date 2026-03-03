import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-CNPGb1TW.js";
import "./vendor-firebase-DN8BxCYa.js";
import { A as createCommentVNode, Bt as normalizeClass, F as createTextVNode, I as createVNode, O as createBaseVNode, R as defineComponent, S as Fragment, Ut as toDisplayString, _t as withCtx, et as openBlock, j as createElementBlock, kt as ref, nt as renderList, o as useRouter } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-qJz1Z78N.js";
import "./useFeatureFlags-DpouF8An.js";
import "./vendor-reka-ui-jxMUDvZT.js";
import "./api-DbPc6hdO.js";
import "./vendor-markdown-BPt2PdDp.js";
import "./colorUtil-BKg8i9Q6.js";
import "./i18n-syd3PJfQ.js";
import { t as Button_default } from "./Button-D8fmNaXY.js";
import { Jr as useFirebaseAuthActions } from "./dialogService-jMbkA1JN.js";
import "./extensionStore-BiUCqCK1.js";
import "./userStore-xAnKQzRd.js";
import "./useErrorHandling-BsEGEjB8.js";
import "./huizhiAuthService-DTHsM6kC.js";
import "./useExternalLink-tAAZu4wg.js";
import "./vendor-tiptap-C9679tdI.js";
import "./markdownRendererUtil-Q53IsTUL.js";
import "./Popover-bsCD7nil.js";
var _hoisted_1 = { class: "flex h-full items-center justify-center p-6" };
var _hoisted_2 = { class: "max-w-[100vw] text-center lg:w-[500px]" };
var _hoisted_3 = { class: "mb-3 text-xl text-text-primary" };
var _hoisted_4 = { class: "mb-5 text-muted" };
var _hoisted_5 = { class: "mb-4 rounded bg-secondary-background px-3 py-2 text-left" };
var _hoisted_6 = { class: "mb-2 text-sm font-semibold text-text-primary" };
var _hoisted_7 = { class: "space-y-1.5 text-sm text-muted" };
var _hoisted_8 = {
	key: 0,
	class: "mb-4 text-left"
};
var _hoisted_9 = {
	key: 0,
	class: "mt-2 rounded border-muted-background border p-4 font-mono text-xs text-muted-foreground break-all"
};
var _hoisted_10 = { class: "mb-5 text-center text-sm text-gray-600" };
var _hoisted_11 = {
	href: "https://support.comfy.org",
	class: "cursor-pointer text-blue-400 no-underline",
	target: "_blank",
	rel: "noopener noreferrer"
};
var _hoisted_12 = { class: "flex flex-col gap-3" };
var CloudAuthTimeoutView_default = /* @__PURE__ */ defineComponent({
	__name: "CloudAuthTimeoutView",
	props: { errorMessage: {} },
	setup(__props) {
		const router = useRouter();
		const { logout } = useFirebaseAuthActions();
		const showTechnicalDetails = ref(false);
		const handleRestart = async () => {
			await logout();
			await router.replace({ name: "cloud-login" });
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [
				createBaseVNode("h2", _hoisted_3, toDisplayString(_ctx.$t("cloudOnboarding.authTimeout.title")), 1),
				createBaseVNode("p", _hoisted_4, toDisplayString(_ctx.$t("cloudOnboarding.authTimeout.message")), 1),
				createBaseVNode("div", _hoisted_5, [createBaseVNode("h3", _hoisted_6, toDisplayString(_ctx.$t("cloudOnboarding.authTimeout.troubleshooting")), 1), createBaseVNode("ul", _hoisted_7, [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.$tm("cloudOnboarding.authTimeout.causes"), (cause, index) => {
					return openBlock(), createElementBlock("li", {
						key: index,
						class: "flex gap-2"
					}, [_cache[1] || (_cache[1] = createBaseVNode("span", null, "•", -1)), createBaseVNode("span", null, toDisplayString(cause), 1)]);
				}), 128))])]),
				__props.errorMessage ? (openBlock(), createElementBlock("div", _hoisted_8, [createBaseVNode("button", {
					class: "flex w-full items-center justify-between rounded bg-secondary-background px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-secondary-background-hover border-0",
					onClick: _cache[0] || (_cache[0] = ($event) => showTechnicalDetails.value = !showTechnicalDetails.value)
				}, [createBaseVNode("span", null, toDisplayString(_ctx.$t("cloudOnboarding.authTimeout.technicalDetails")), 1), createBaseVNode("i", { class: normalizeClass(["pi", showTechnicalDetails.value ? "pi-chevron-up" : "pi-chevron-down"]) }, null, 2)]), showTechnicalDetails.value ? (openBlock(), createElementBlock("div", _hoisted_9, toDisplayString(__props.errorMessage), 1)) : createCommentVNode("", true)])) : createCommentVNode("", true),
				createBaseVNode("p", _hoisted_10, [
					createTextVNode(toDisplayString(_ctx.$t("cloudOnboarding.authTimeout.helpText")) + " ", 1),
					createBaseVNode("a", _hoisted_11, toDisplayString(_ctx.$t("cloudOnboarding.authTimeout.supportLink")), 1),
					_cache[2] || (_cache[2] = createTextVNode(". ", -1))
				]),
				createBaseVNode("div", _hoisted_12, [createVNode(Button_default, {
					class: "w-full",
					onClick: handleRestart
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("cloudOnboarding.authTimeout.restart")), 1)]),
					_: 1
				})])
			])]);
		};
	}
});
export { CloudAuthTimeoutView_default as default };

//# sourceMappingURL=CloudAuthTimeoutView-Blk_poHa.js.map