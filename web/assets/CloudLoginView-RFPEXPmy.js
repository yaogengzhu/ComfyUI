import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { X as script$4, at as script$1, i as script, n as h, st as script$3, w as script$2 } from "./vendor-primevue-BMWHeZll.js";
import "./vendor-firebase-DN8BxCYa.js";
import { A as createCommentVNode, Bt as normalizeClass, D as computed, F as createTextVNode, I as createVNode, O as createBaseVNode, R as defineComponent, Rt as unref, S as Fragment, Ut as toDisplayString, _t as withCtx, a as useRoute, et as openBlock, it as resolveComponent, j as createElementBlock, k as createBlock, kt as ref, o as useRouter } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-Cb4peHqA.js";
import "./useFeatureFlags-CQzrYTw1.js";
import "./vendor-reka-ui-jxMUDvZT.js";
import { It as useToastStore } from "./api-CrHaA16j.js";
import "./vendor-markdown-BPt2PdDp.js";
import "./colorUtil-CQE2D_f9.js";
import { n as useI18n } from "./vendor-i18n-86kE_LSO.js";
import "./i18n-Dy4mrtIR.js";
import { t as Button_default } from "./Button-D4w5_e9I.js";
import { Jr as useFirebaseAuthActions, ii as useFirebaseAuthStore } from "./dialogService-Cm1QZvWM.js";
import "./extensionStore-jct1qmkK.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-ralzwvFM.js";
import "./userStore-B8DDUPuE.js";
import "./useErrorHandling-D8IRIzSw.js";
import "./useExternalLink-BDqUsXhK.js";
import "./vendor-tiptap-DTO2QA4Q.js";
import "./markdownRendererUtil-CrR6m0CH.js";
import "./Popover-oAJ3EQ_X.js";
import { n as signInSchema } from "./signInSchema-1hdMqUS1.js";
import { n as useFreeTierOnboarding, t as getSafePreviousFullPath } from "./previousFullPath-B7364-5O.js";
var _hoisted_1$1 = { class: "flex flex-col gap-2" };
var _hoisted_2$1 = {
	key: 0,
	class: "text-red-500"
};
var _hoisted_3$1 = { class: "flex flex-col gap-2" };
var _hoisted_4$1 = { class: "mb-2 flex items-center justify-between" };
var _hoisted_5$1 = {
	class: "text-base font-medium opacity-80",
	for: "cloud-sign-in-password"
};
var _hoisted_6$1 = {
	key: 0,
	class: "text-red-500"
};
var emailInputId = "cloud-sign-in-email";
var CloudSignInForm_default = /* @__PURE__ */ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "CloudSignInForm",
	props: { authError: {} },
	emits: ["submit"],
	setup(__props, { emit: __emit }) {
		const authStore = useFirebaseAuthStore();
		const loading = computed(() => authStore.loading);
		const { t } = useI18n();
		const emit = __emit;
		const onSubmit = (event) => {
			if (event.valid) emit("submit", event.values);
		};
		return (_ctx, _cache) => {
			const _component_router_link = resolveComponent("router-link");
			return openBlock(), createBlock(unref(script), {
				class: "flex flex-col gap-6",
				resolver: unref(h)(unref(signInSchema)),
				onSubmit
			}, {
				default: withCtx(($form) => [
					createBaseVNode("div", _hoisted_1$1, [
						createBaseVNode("label", {
							class: "mb-2 text-base font-medium opacity-80",
							for: emailInputId
						}, toDisplayString(unref(t)("auth.login.emailLabel")), 1),
						createVNode(unref(script$1), {
							id: emailInputId,
							autocomplete: "email",
							class: "h-10",
							name: "email",
							type: "text",
							placeholder: unref(t)("auth.login.emailPlaceholder"),
							invalid: $form.email?.invalid
						}, null, 8, ["placeholder", "invalid"]),
						$form.email?.invalid ? (openBlock(), createElementBlock("small", _hoisted_2$1, toDisplayString($form.email.error.message), 1)) : createCommentVNode("", true)
					]),
					createBaseVNode("div", _hoisted_3$1, [
						createBaseVNode("div", _hoisted_4$1, [createBaseVNode("label", _hoisted_5$1, toDisplayString(unref(t)("auth.login.passwordLabel")), 1)]),
						createVNode(unref(script$2), {
							"input-id": "cloud-sign-in-password",
							"pt:pc-input-text:root:autocomplete": "current-password",
							name: "password",
							feedback: false,
							"toggle-mask": "",
							placeholder: unref(t)("auth.login.passwordPlaceholder"),
							class: normalizeClass([{ "p-invalid": $form.password?.invalid }, "h-10"]),
							fluid: ""
						}, null, 8, ["placeholder", "class"]),
						$form.password?.invalid ? (openBlock(), createElementBlock("small", _hoisted_6$1, toDisplayString($form.password.error.message), 1)) : createCommentVNode("", true),
						createVNode(_component_router_link, {
							to: { name: "cloud-forgot-password" },
							class: "text-sm font-medium text-muted no-underline"
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.login.forgotPassword")), 1)]),
							_: 1
						})
					]),
					__props.authError ? (openBlock(), createBlock(unref(script$3), {
						key: 0,
						severity: "error"
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(__props.authError), 1)]),
						_: 1
					})) : createCommentVNode("", true),
					loading.value ? (openBlock(), createBlock(unref(script$4), {
						key: 1,
						class: "h-8 w-8"
					})) : (openBlock(), createBlock(Button_default, {
						key: 2,
						type: "submit",
						class: "mt-4 h-10 font-medium text-white",
						disabled: !$form.valid
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.login.loginButton")), 1)]),
						_: 1
					}, 8, ["disabled"]))
				]),
				_: 1
			}, 8, ["resolver"]);
		};
	}
}), [["__scopeId", "data-v-52efce83"]]);
var _hoisted_1 = { class: "flex h-full items-center justify-center p-8" };
var _hoisted_2 = { class: "max-w-screen p-2 lg:w-96" };
var _hoisted_3 = { class: "mb-8 flex flex-col gap-4" };
var _hoisted_4 = { class: "my-0 text-xl leading-normal font-medium" };
var _hoisted_5 = {
	key: 1,
	class: "my-0 text-base text-muted"
};
var _hoisted_6 = { class: "flex flex-col gap-4" };
var _hoisted_7 = { class: "mt-6 text-center" };
var _hoisted_8 = { class: "mt-4 text-center" };
var _hoisted_9 = { class: "mt-5 text-sm text-gray-600" };
var _hoisted_10 = {
	href: "https://www.comfy.org/terms-of-service",
	target: "_blank",
	class: "cursor-pointer text-blue-400 no-underline"
};
var _hoisted_11 = {
	href: "https://www.comfy.org/privacy-policy",
	target: "_blank",
	class: "cursor-pointer text-blue-400 no-underline"
};
var CloudLoginView_default = /* @__PURE__ */ defineComponent({
	__name: "CloudLoginView",
	setup(__props) {
		const { t } = useI18n();
		const router = useRouter();
		const route = useRoute();
		const authActions = useFirebaseAuthActions();
		const isSecureContext = globalThis.isSecureContext;
		const authError = ref("");
		const toastStore = useToastStore();
		const showEmailForm = ref(false);
		const { isFreeTierEnabled, freeTierCredits } = useFreeTierOnboarding();
		function switchToEmailForm() {
			showEmailForm.value = true;
		}
		function switchToSocialLogin() {
			showEmailForm.value = false;
		}
		const navigateToSignup = async () => {
			await router.push({
				name: "cloud-signup",
				query: route.query
			});
		};
		const onSuccess = async () => {
			toastStore.add({
				severity: "success",
				summary: "Login Completed",
				life: 2e3
			});
			const previousFullPath = getSafePreviousFullPath(route.query);
			if (previousFullPath) {
				await router.replace(previousFullPath);
				return;
			}
			await router.push({ name: "cloud-user-check" });
		};
		const signInWithGoogle = async () => {
			authError.value = "";
			if (await authActions.signInWithGoogle()) await onSuccess();
		};
		const signInWithGithub = async () => {
			authError.value = "";
			if (await authActions.signInWithGithub()) await onSuccess();
		};
		const signInWithEmail = async (values) => {
			authError.value = "";
			if (await authActions.signInWithEmail(values.email, values.password)) await onSuccess();
		};
		return (_ctx, _cache) => {
			const _component_i18n_t = resolveComponent("i18n-t");
			return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [
				createBaseVNode("div", _hoisted_3, [createBaseVNode("h1", _hoisted_4, toDisplayString(unref(t)("auth.login.title")), 1), unref(isFreeTierEnabled) ? (openBlock(), createBlock(_component_i18n_t, {
					key: 0,
					keypath: "auth.login.signUpFreeTierPromo",
					tag: "p",
					class: "my-0 text-base text-muted",
					plural: unref(freeTierCredits) ?? void 0
				}, {
					signUp: withCtx(() => [createBaseVNode("span", {
						class: "cursor-pointer text-blue-500",
						onClick: navigateToSignup
					}, toDisplayString(unref(t)("auth.login.signUp")), 1)]),
					credits: withCtx(() => [createTextVNode(toDisplayString(unref(freeTierCredits)), 1)]),
					_: 1
				}, 8, ["plural"])) : (openBlock(), createElementBlock("p", _hoisted_5, [createTextVNode(toDisplayString(unref(t)("auth.login.newUser")) + " ", 1), createBaseVNode("span", {
					class: "cursor-pointer text-blue-500",
					onClick: navigateToSignup
				}, toDisplayString(unref(t)("auth.login.signUp")), 1)]))]),
				!unref(isSecureContext) ? (openBlock(), createBlock(unref(script$3), {
					key: 0,
					severity: "warn",
					class: "mb-4"
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.login.insecureContextWarning")), 1)]),
					_: 1
				})) : createCommentVNode("", true),
				!showEmailForm.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [createBaseVNode("div", _hoisted_6, [createVNode(Button_default, {
					type: "button",
					class: "h-10 w-full",
					onClick: signInWithGoogle
				}, {
					default: withCtx(() => [_cache[0] || (_cache[0] = createBaseVNode("i", { class: "pi pi-google mr-2" }, null, -1)), createTextVNode(" " + toDisplayString(unref(t)("auth.login.loginWithGoogle")), 1)]),
					_: 1
				}), createVNode(Button_default, {
					type: "button",
					class: "h-10 bg-[#2d2e32]",
					variant: "secondary",
					onClick: signInWithGithub
				}, {
					default: withCtx(() => [_cache[1] || (_cache[1] = createBaseVNode("i", { class: "pi pi-github mr-2" }, null, -1)), createTextVNode(" " + toDisplayString(unref(t)("auth.login.loginWithGithub")), 1)]),
					_: 1
				})]), createBaseVNode("div", _hoisted_7, [createVNode(Button_default, {
					variant: "muted-textonly",
					class: "text-sm underline",
					onClick: switchToEmailForm
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.login.useEmailInstead")), 1)]),
					_: 1
				})])], 64)) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [createVNode(CloudSignInForm_default, {
					"auth-error": authError.value,
					onSubmit: signInWithEmail
				}, null, 8, ["auth-error"]), createBaseVNode("div", _hoisted_8, [createVNode(Button_default, {
					variant: "muted-textonly",
					class: "text-sm underline",
					onClick: switchToSocialLogin
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.login.backToSocialLogin")), 1)]),
					_: 1
				})])], 64)),
				createBaseVNode("p", _hoisted_9, [
					createTextVNode(toDisplayString(unref(t)("auth.login.termsText")) + " ", 1),
					createBaseVNode("a", _hoisted_10, toDisplayString(unref(t)("auth.login.termsLink")), 1),
					createTextVNode(" " + toDisplayString(unref(t)("auth.login.andText")) + " ", 1),
					createBaseVNode("a", _hoisted_11, toDisplayString(unref(t)("auth.login.privacyLink")), 1),
					_cache[2] || (_cache[2] = createTextVNode(". ", -1))
				])
			])]);
		};
	}
});
export { CloudLoginView_default as default };

//# sourceMappingURL=CloudLoginView-RFPEXPmy.js.map