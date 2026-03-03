import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { i as script, n as h } from "./vendor-primevue-BMWHeZll.js";
import "./vendor-firebase-DN8BxCYa.js";
import { F as createTextVNode, I as createVNode, R as defineComponent, Rt as unref, Ut as toDisplayString, _t as withCtx, et as openBlock, k as createBlock, kt as ref } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-Cb4peHqA.js";
import "./useFeatureFlags-S1sG8YIk.js";
import "./vendor-reka-ui-jxMUDvZT.js";
import "./api-C6dyasG5.js";
import "./vendor-markdown-BPt2PdDp.js";
import "./colorUtil-CQE2D_f9.js";
import "./i18n-Dy4mrtIR.js";
import { t as Button_default } from "./Button-D4w5_e9I.js";
import { Jr as useFirebaseAuthActions } from "./dialogService-B_z161HY.js";
import "./extensionStore-CZdQWzqz.js";
import "./userStore-BvkQCZf0.js";
import "./useErrorHandling-CX7OTxv3.js";
import "./useExternalLink-BDqUsXhK.js";
import "./vendor-tiptap-DTO2QA4Q.js";
import "./markdownRendererUtil-CrR6m0CH.js";
import "./Popover-oAJ3EQ_X.js";
import { i as updatePasswordSchema } from "./signInSchema-1hdMqUS1.js";
import { t as PasswordFields_default } from "./PasswordFields-rKEtluaL.js";
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

//# sourceMappingURL=UpdatePasswordContent-DhfHzat7.js.map