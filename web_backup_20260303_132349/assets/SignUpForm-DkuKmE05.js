import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { X as script$3, at as script$2, i as script, n as h, r as script$1 } from "./vendor-primevue-CNPGb1TW.js";
import { A as createCommentVNode, D as computed, F as createTextVNode, I as createVNode, O as createBaseVNode, R as defineComponent, Rt as unref, Ut as toDisplayString, _t as withCtx, et as openBlock, j as createElementBlock, k as createBlock } from "./vendor-vue-core-tg-oZu4l.js";
import { nn as useThrottleFn } from "./vendor-reka-ui-jxMUDvZT.js";
import { n as useI18n } from "./vendor-i18n-86kE_LSO.js";
import { t as Button_default } from "./Button-D8fmNaXY.js";
import { ii as useFirebaseAuthStore } from "./dialogService-jMbkA1JN.js";
import { r as signUpSchema } from "./signInSchema-ClkGmo8X.js";
import { t as PasswordFields_default } from "./PasswordFields-CeTzyH1w.js";
var _hoisted_1 = {
	class: "mb-2 text-base font-medium opacity-80",
	for: "comfy-org-sign-up-email"
};
var _hoisted_2 = {
	key: 0,
	class: "text-red-500"
};
var SignUpForm_default = /* @__PURE__ */ defineComponent({
	__name: "SignUpForm",
	emits: ["submit"],
	setup(__props, { emit: __emit }) {
		const { t } = useI18n();
		const authStore = useFirebaseAuthStore();
		const loading = computed(() => authStore.loading);
		const emit = __emit;
		const onSubmit = useThrottleFn((event) => {
			if (event.valid) emit("submit", event.values);
		}, 1500);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(script), {
				class: "flex flex-col gap-6",
				resolver: unref(h)(unref(signUpSchema)),
				onSubmit: unref(onSubmit)
			}, {
				default: withCtx(($form) => [
					createVNode(unref(script$1), {
						name: "email",
						class: "flex flex-col gap-2"
					}, {
						default: withCtx(($field) => [
							createBaseVNode("label", _hoisted_1, toDisplayString(unref(t)("auth.signup.emailLabel")), 1),
							createVNode(unref(script$2), {
								"pt:root:id": "comfy-org-sign-up-email",
								"pt:root:autocomplete": "email",
								class: "h-10",
								type: "text",
								placeholder: unref(t)("auth.signup.emailPlaceholder"),
								invalid: $field.invalid
							}, null, 8, ["placeholder", "invalid"]),
							$field.error ? (openBlock(), createElementBlock("small", _hoisted_2, toDisplayString($field.error.message), 1)) : createCommentVNode("", true)
						]),
						_: 1
					}),
					createVNode(PasswordFields_default),
					loading.value ? (openBlock(), createBlock(unref(script$3), {
						key: 0,
						class: "mx-auto h-8 w-8"
					})) : (openBlock(), createBlock(Button_default, {
						key: 1,
						type: "submit",
						class: "mt-4 h-10 font-medium",
						disabled: !$form.valid
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.signup.signUpButton")), 1)]),
						_: 1
					}, 8, ["disabled"]))
				]),
				_: 1
			}, 8, ["resolver", "onSubmit"]);
		};
	}
});
export { SignUpForm_default as t };

//# sourceMappingURL=SignUpForm-DkuKmE05.js.map