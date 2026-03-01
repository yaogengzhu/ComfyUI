import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { i as script, n as h } from "./vendor-primevue-DxYsW_Ng.js";
import "./vendor-firebase-DnyyBhvM.js";
import { F as createTextVNode, I as createVNode, R as defineComponent, Rt as unref, Ut as toDisplayString, _t as withCtx, et as openBlock, k as createBlock, kt as ref } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-C6-gqLl2.js";
import "./useFeatureFlags-zRZ31t3R.js";
import "./vendor-reka-ui--l_O1Shn.js";
import "./api-CMXR2lsk.js";
import "./vendor-markdown-DFo_IkzS.js";
import "./colorUtil-CPODED-Q.js";
import "./i18n-Dw0liyWq.js";
import { t as Button_default } from "./Button-DQNHabQW.js";
import { Jr as useFirebaseAuthActions } from "./dialogService-DvfIRFpk.js";
import "./extensionStore-nDYLAB47.js";
import "./userStore-BQarOzRi.js";
import "./useErrorHandling-IV4b8Ws-.js";
import "./useExternalLink-BC_To13P.js";
import "./vendor-tiptap-BnYkbQDM.js";
import "./markdownRendererUtil-COLKL0Bq.js";
import "./Popover-DEsU7dja.js";
import { i as updatePasswordSchema } from "./signInSchema-DE5pMEDm.js";
import { t as PasswordFields_default } from "./PasswordFields-BYbHbHXj.js";
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

//# sourceMappingURL=UpdatePasswordContent-DP8X8RgF.js.map