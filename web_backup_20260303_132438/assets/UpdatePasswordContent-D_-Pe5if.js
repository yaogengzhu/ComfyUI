import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { i as script, n as h } from "./vendor-primevue-CNPGb1TW.js";
import "./vendor-firebase-DN8BxCYa.js";
import { F as createTextVNode, I as createVNode, R as defineComponent, Rt as unref, Ut as toDisplayString, _t as withCtx, et as openBlock, k as createBlock, kt as ref } from "./vendor-vue-core-tg-oZu4l.js";
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
import { i as updatePasswordSchema } from "./signInSchema-ClkGmo8X.js";
import { t as PasswordFields_default } from "./PasswordFields-CeTzyH1w.js";
var UpdatePasswordContent_default = /* @__PURE__ */ defineComponent({
	__name: "UpdatePasswordContent",
	props: { onSuccess: { type: Function } },
	setup(__props) {
		const authActions = useFirebaseAuthActions();
		const loading = ref(false);
		const onSubmit = async (event) => {
			if (event.valid) {
				loading.value = true;
				try {
					await authActions.updatePassword(event.values.password);
					__props.onSuccess();
				} finally {
					loading.value = false;
				}
			}
		};
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(script), {
				class: "flex w-96 flex-col gap-6",
				resolver: unref(h)(unref(updatePasswordSchema)),
				onSubmit
			}, {
				default: withCtx(() => [createVNode(PasswordFields_default), createVNode(Button_default, {
					type: "submit",
					class: "mt-4 h-10 font-medium",
					loading: loading.value
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("userSettings.updatePassword")), 1)]),
					_: 1
				}, 8, ["loading"])]),
				_: 1
			}, 8, ["resolver"]);
		};
	}
});
export { UpdatePasswordContent_default as default };

//# sourceMappingURL=UpdatePasswordContent-D_-Pe5if.js.map