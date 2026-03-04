import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { i as script, n as h } from "./vendor-primevue-CN8WO3jr.js";
import "./vendor-firebase-DN8BxCYa.js";
import { F as createTextVNode, I as createVNode, R as defineComponent, Rt as unref, Ut as toDisplayString, _t as withCtx, et as openBlock, k as createBlock, kt as ref } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-BlwZz5NW.js";
import "./useFeatureFlags-BuKVU3gG.js";
import "./vendor-reka-ui-C_KZ-Z9x.js";
import "./api-p6hGo6pS.js";
import "./vendor-markdown-DF7_n7Ki.js";
import "./colorUtil-0jM4jJ4_.js";
import "./i18n-B95gNu60.js";
import "./userStore-CVXXciNs.js";
import "./huizhiAuthService-D-kJyr3e.js";
import { Zr as useFirebaseAuthActions } from "./teamWorkspaceStore-CrgYR715.js";
import { t as Button_default } from "./Button-BXdh2GzZ.js";
import "./extensionStore-DiDsM3E0.js";
import "./useErrorHandling-B7U_HHbw.js";
import "./useExternalLink-DXOke9aD.js";
import "./vendor-tiptap-C9679tdI.js";
import "./markdownRendererUtil-rU1hBHFB.js";
import "./Popover-Bju946nz.js";
import { i as updatePasswordSchema } from "./signInSchema-CaxQhwd2.js";
import { t as PasswordFields_default } from "./PasswordFields-Crx8qdt0.js";
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

//# sourceMappingURL=UpdatePasswordContent-vN_KrgNI.js.map