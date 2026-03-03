import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { st as script } from "./vendor-primevue-CNPGb1TW.js";
import "./vendor-firebase-DN8BxCYa.js";
import { A as createCommentVNode, F as createTextVNode, I as createVNode, O as createBaseVNode, R as defineComponent, Rt as unref, S as Fragment, Ut as toDisplayString, Z as onMounted, _t as withCtx, a as useRoute, et as openBlock, j as createElementBlock, k as createBlock, kt as ref, o as useRouter } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-qJz1Z78N.js";
import { t as isCloud } from "./types-YYe-ycsK.js";
import "./useFeatureFlags-DpouF8An.js";
import "./vendor-reka-ui-jxMUDvZT.js";
import { It as useToastStore } from "./api-DbPc6hdO.js";
import "./vendor-markdown-BPt2PdDp.js";
import "./colorUtil-BKg8i9Q6.js";
import { n as useI18n } from "./vendor-i18n-86kE_LSO.js";
import "./i18n-syd3PJfQ.js";
import { t as useTelemetry } from "./telemetry-CLrjuJLU.js";
import { t as Button_default } from "./Button-D8fmNaXY.js";
import { F as isInChina, Jr as useFirebaseAuthActions } from "./dialogService-jMbkA1JN.js";
import "./extensionStore-BiUCqCK1.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-ralzwvFM.js";
import "./userStore-xAnKQzRd.js";
import "./useErrorHandling-BsEGEjB8.js";
import "./huizhiAuthService-DTHsM6kC.js";
import "./useExternalLink-tAAZu4wg.js";
import "./vendor-tiptap-C9679tdI.js";
import "./markdownRendererUtil-Q53IsTUL.js";
import "./Popover-bsCD7nil.js";
import "./signInSchema-ClkGmo8X.js";
import "./PasswordFields-CeTzyH1w.js";
import { t as SignUpForm_default } from "./SignUpForm-DkuKmE05.js";
import { n as useFreeTierOnboarding, t as getSafePreviousFullPath } from "./previousFullPath-Af1tzn0q.js";
var _hoisted_1 = { class: "flex h-full items-center justify-center p-8" };
var _hoisted_2 = { class: "max-w-screen p-2 lg:w-96" };
var _hoisted_3 = { class: "mb-8 flex flex-col gap-4" };
var _hoisted_4 = { class: "my-0 text-xl leading-normal font-medium" };
var _hoisted_5 = { class: "my-0 text-base" };
var _hoisted_6 = { class: "text-muted" };
var _hoisted_7 = {
	key: 0,
	class: "mb-4 text-sm text-muted-foreground"
};
var _hoisted_8 = { class: "flex flex-col gap-4" };
var _hoisted_9 = { class: "relative" };
var _hoisted_10 = {
	key: 0,
	class: "absolute -top-2.5 -right-2.5 rounded-full bg-yellow-400 px-2 py-0.5 text-[10px] font-bold whitespace-nowrap text-gray-900"
};
var _hoisted_11 = { class: "mt-6 text-center" };
var _hoisted_12 = { class: "mt-4 text-center" };
var _hoisted_13 = { class: "mt-5 text-sm text-gray-600" };
var _hoisted_14 = {
	href: "https://www.comfy.org/terms-of-service",
	target: "_blank",
	class: "cursor-pointer text-blue-400 no-underline"
};
var _hoisted_15 = {
	href: "https://www.comfy.org/privacy-policy",
	target: "_blank",
	class: "cursor-pointer text-blue-400 no-underline"
};
var _hoisted_16 = { class: "mt-2 text-sm text-gray-600" };
var _hoisted_17 = {
	href: "https://support.comfy.org",
	class: "cursor-pointer text-blue-400 no-underline",
	target: "_blank",
	rel: "noopener noreferrer"
};
var CloudSignupView_default = /* @__PURE__ */ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "CloudSignupView",
	setup(__props) {
		const { t } = useI18n();
		const router = useRouter();
		const route = useRoute();
		const authActions = useFirebaseAuthActions();
		const isSecureContext = globalThis.isSecureContext;
		const authError = ref("");
		const userIsInChina = ref(false);
		const toastStore = useToastStore();
		const telemetry = useTelemetry();
		const { showEmailForm, freeTierCredits, isFreeTierEnabled, switchToEmailForm, switchToSocialLogin } = useFreeTierOnboarding();
		const navigateToLogin = async () => {
			await router.push({
				name: "cloud-login",
				query: route.query
			});
		};
		const onSuccess = async () => {
			toastStore.add({
				severity: "success",
				summary: "Sign up Completed",
				life: 2e3
			});
			const previousFullPath = getSafePreviousFullPath(route.query);
			if (previousFullPath) {
				await router.replace(previousFullPath);
				return;
			}
			await router.push({
				path: "/",
				query: route.query
			});
		};
		const signInWithGoogle = async () => {
			authError.value = "";
			if (await authActions.signInWithGoogle()) await onSuccess();
		};
		const signInWithGithub = async () => {
			authError.value = "";
			if (await authActions.signInWithGithub()) await onSuccess();
		};
		const signUpWithEmail = async (values) => {
			authError.value = "";
			if (await authActions.signUpWithEmail(values.email, values.password)) await onSuccess();
		};
		onMounted(async () => {
			if (isCloud) telemetry?.trackSignupOpened();
			userIsInChina.value = await isInChina();
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [
				createBaseVNode("div", _hoisted_3, [createBaseVNode("h1", _hoisted_4, toDisplayString(unref(t)("auth.signup.title")), 1), createBaseVNode("p", _hoisted_5, [createBaseVNode("span", _hoisted_6, toDisplayString(unref(t)("auth.signup.alreadyHaveAccount")), 1), createBaseVNode("span", {
					class: "ml-1 cursor-pointer text-blue-500",
					onClick: navigateToLogin
				}, toDisplayString(unref(t)("auth.signup.signIn")), 1)])]),
				!unref(isSecureContext) ? (openBlock(), createBlock(unref(script), {
					key: 0,
					severity: "warn",
					class: "mb-4"
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.login.insecureContextWarning")), 1)]),
					_: 1
				})) : createCommentVNode("", true),
				!unref(showEmailForm) ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
					unref(isFreeTierEnabled) ? (openBlock(), createElementBlock("p", _hoisted_7, toDisplayString(unref(freeTierCredits) ? unref(t)("auth.login.freeTierDescription", { credits: unref(freeTierCredits) }) : unref(t)("auth.login.freeTierDescriptionGeneric")), 1)) : createCommentVNode("", true),
					createBaseVNode("div", _hoisted_8, [createBaseVNode("div", _hoisted_9, [createVNode(Button_default, {
						type: "button",
						class: "h-10 w-full",
						onClick: signInWithGoogle
					}, {
						default: withCtx(() => [_cache[0] || (_cache[0] = createBaseVNode("i", { class: "pi pi-google mr-2" }, null, -1)), createTextVNode(" " + toDisplayString(unref(t)("auth.signup.signUpWithGoogle")), 1)]),
						_: 1
					}), unref(isFreeTierEnabled) ? (openBlock(), createElementBlock("span", _hoisted_10, toDisplayString(unref(t)("auth.login.freeTierBadge")), 1)) : createCommentVNode("", true)]), createVNode(Button_default, {
						type: "button",
						class: "h-10 bg-[#2d2e32]",
						variant: "secondary",
						onClick: signInWithGithub
					}, {
						default: withCtx(() => [_cache[1] || (_cache[1] = createBaseVNode("i", { class: "pi pi-github mr-2" }, null, -1)), createTextVNode(" " + toDisplayString(unref(t)("auth.signup.signUpWithGithub")), 1)]),
						_: 1
					})]),
					createBaseVNode("div", _hoisted_11, [createVNode(Button_default, {
						variant: "muted-textonly",
						class: "text-sm underline",
						onClick: unref(switchToEmailForm)
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.login.useEmailInstead")), 1)]),
						_: 1
					}, 8, ["onClick"])])
				], 64)) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
					unref(isFreeTierEnabled) ? (openBlock(), createBlock(unref(script), {
						key: 0,
						severity: "warn",
						class: "mb-4"
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.signup.emailNotEligibleForFreeTier")), 1)]),
						_: 1
					})) : createCommentVNode("", true),
					userIsInChina.value ? (openBlock(), createBlock(unref(script), {
						key: 1,
						severity: "warn",
						class: "mb-4"
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.signup.regionRestrictionChina")), 1)]),
						_: 1
					})) : (openBlock(), createBlock(SignUpForm_default, {
						key: 2,
						"auth-error": authError.value,
						onSubmit: signUpWithEmail
					}, null, 8, ["auth-error"])),
					createBaseVNode("div", _hoisted_12, [createVNode(Button_default, {
						variant: "muted-textonly",
						class: "text-sm underline",
						onClick: unref(switchToSocialLogin)
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.login.backToSocialLogin")), 1)]),
						_: 1
					}, 8, ["onClick"])])
				], 64)),
				createBaseVNode("p", _hoisted_13, [
					createTextVNode(toDisplayString(unref(t)("auth.login.termsText")) + " ", 1),
					createBaseVNode("a", _hoisted_14, toDisplayString(unref(t)("auth.login.termsLink")), 1),
					createTextVNode(" " + toDisplayString(unref(t)("auth.login.andText")) + " ", 1),
					createBaseVNode("a", _hoisted_15, toDisplayString(unref(t)("auth.login.privacyLink")), 1),
					_cache[2] || (_cache[2] = createTextVNode(". ", -1))
				]),
				createBaseVNode("p", _hoisted_16, [
					createTextVNode(toDisplayString(unref(t)("cloudWaitlist_questionsText")) + " ", 1),
					createBaseVNode("a", _hoisted_17, toDisplayString(unref(t)("cloudWaitlist_contactLink")), 1),
					_cache[3] || (_cache[3] = createTextVNode(". ", -1))
				])
			])]);
		};
	}
}), [["__scopeId", "data-v-e27dda05"]]);
export { CloudSignupView_default as default };

//# sourceMappingURL=CloudSignupView-FtRRu9K5.js.map