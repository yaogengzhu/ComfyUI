import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { i as script, n as h } from "./vendor-primevue-BEjAYGWm.js";
import "./vendor-firebase-DN8BxCYa.js";
import { F as createTextVNode, I as createVNode, R as defineComponent, Rt as unref, Ut as toDisplayString, _t as withCtx, et as openBlock, k as createBlock, kt as ref } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-qJz1Z78N.js";
import "./useFeatureFlags-B3RwD6hI.js";
import "./vendor-reka-ui-C26MN8JS.js";
import "./api-D2HJ3Cuk.js";
import "./vendor-markdown-DF7_n7Ki.js";
import "./colorUtil-CyOZxXkW.js";
import "./i18n-Ce5inB5_.js";
import "./userStore-CgWi1Hiu.js";
import "./huizhiAuthService-Mxdj0XpZ.js";
import { Zr as useFirebaseAuthActions } from "./teamWorkspaceStore-B1oHaZID.js";
import { t as Button_default } from "./Button-AKQyxeyD.js";
import "./extensionStore-DbCclKhl.js";
import "./useErrorHandling-C6LadziV.js";
import "./useExternalLink-RgafkIwT.js";
import "./vendor-tiptap-C9679tdI.js";
import "./markdownRendererUtil-rU1hBHFB.js";
import "./Popover-DMhMBlU6.js";
import { i as updatePasswordSchema } from "./signInSchema-DXSwEHAr.js";
import { t as PasswordFields_default } from "./PasswordFields-KGS71qUv.js";
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

//# sourceMappingURL=UpdatePasswordContent-DoQmEykC.js.map