import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { j as script } from "./vendor-primevue-BMWHeZll.js";
import "./vendor-firebase-DN8BxCYa.js";
import { A as createCommentVNode, Bt as normalizeClass, D as computed, F as createTextVNode, I as createVNode, O as createBaseVNode, R as defineComponent, Rt as unref, S as Fragment, Ut as toDisplayString, _t as withCtx, et as openBlock, j as createElementBlock, nt as renderList, ut as useModel } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-Cb4peHqA.js";
import "./useFeatureFlags-79NOcfrn.js";
import "./vendor-reka-ui-jxMUDvZT.js";
import "./api-jlQue090.js";
import "./vendor-markdown-BPt2PdDp.js";
import "./colorUtil-CQE2D_f9.js";
import "./i18n-Dy4mrtIR.js";
import { t as Button_default } from "./Button-D4w5_e9I.js";
import { i as useSettingStore } from "./dialogService-Cvolq8px.js";
import "./extensionStore-BhlCwLvC.js";
import "./userStore-CpSN5kjY.js";
import "./useErrorHandling--1B8-At_.js";
import "./useExternalLink-BDqUsXhK.js";
import "./vendor-tiptap-DTO2QA4Q.js";
import "./markdownRendererUtil-CrR6m0CH.js";
import "./Popover-oAJ3EQ_X.js";
var _hoisted_1 = { class: "w-113 max-w-md p-4 space-y-4" };
var _hoisted_2 = { class: "text-sm text-muted-foreground leading-tight" };
var _hoisted_3 = { class: "text-base-foreground font-medium" };
var _hoisted_4 = { class: "space-y-2" };
var _hoisted_5 = { class: "flex items-center gap-2 flex-1 min-w-0 text-wrap" };
var _hoisted_6 = { class: "flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 bg-secondary-background border border-border-subtle" };
var _hoisted_7 = {
	key: 1,
	class: "text-xs font-normal text-base-foreground"
};
var _hoisted_8 = { class: "flex flex-col gap-0.5 min-w-0 flex-1" };
var _hoisted_9 = { class: "text-sm font-normal text-base-foreground leading-tight" };
var _hoisted_10 = { class: "text-sm font-normal text-muted-foreground leading-tight" };
var ValueControlPopover_default = /* @__PURE__ */ defineComponent({
	__name: "ValueControlPopover",
	props: {
		"modelValue": {},
		"modelModifiers": {}
	},
	emits: ["update:modelValue"],
	setup(__props) {
		const settingStore = useSettingStore();
		const controlOptions = [
			{
				mode: "fixed",
				icon: "icon-[lucide--pencil-off]",
				title: "fixed",
				description: "fixedDesc"
			},
			{
				mode: "increment",
				text: "+1",
				title: "increment",
				description: "incrementDesc"
			},
			{
				mode: "decrement",
				text: "-1",
				title: "decrement",
				description: "decrementDesc"
			},
			{
				mode: "randomize",
				icon: "icon-[lucide--shuffle]",
				title: "randomize",
				description: "randomizeDesc"
			}
		];
		const widgetControlMode = computed(() => settingStore.get("Comfy.WidgetControlMode"));
		const controlMode = useModel(__props, "modelValue");
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [
				createTextVNode(toDisplayString(_ctx.$t("widgets.valueControl.header.prefix")) + " ", 1),
				createBaseVNode("span", _hoisted_3, toDisplayString(widgetControlMode.value === "before" ? _ctx.$t("widgets.valueControl.header.before") : _ctx.$t("widgets.valueControl.header.after")), 1),
				createTextVNode(" " + toDisplayString(_ctx.$t("widgets.valueControl.header.postfix")), 1)
			]), createBaseVNode("div", _hoisted_4, [(openBlock(), createElementBlock(Fragment, null, renderList(controlOptions, (option) => {
				return createVNode(Button_default, {
					key: option.mode,
					as: "label",
					variant: "textonly",
					size: "lg",
					class: "flex w-full h-[unset] text-left items-center justify-between py-2 gap-7",
					for: option.mode
				}, {
					default: withCtx(() => [createBaseVNode("div", _hoisted_5, [createBaseVNode("div", _hoisted_6, [option.icon ? (openBlock(), createElementBlock("i", {
						key: 0,
						class: normalizeClass([option.icon, "text-base text-base-foreground"])
					}, null, 2)) : createCommentVNode("", true), option.text ? (openBlock(), createElementBlock("span", _hoisted_7, toDisplayString(option.text), 1)) : createCommentVNode("", true)]), createBaseVNode("div", _hoisted_8, [createBaseVNode("div", _hoisted_9, [createBaseVNode("span", null, toDisplayString(_ctx.$t(`widgets.valueControl.${option.title}`)), 1)]), createBaseVNode("div", _hoisted_10, toDisplayString(_ctx.$t(`widgets.valueControl.${option.description}`)), 1)])]), createVNode(unref(script), {
						modelValue: controlMode.value,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => controlMode.value = $event),
						class: "shrink",
						"input-id": option.mode,
						value: option.mode
					}, null, 8, [
						"modelValue",
						"input-id",
						"value"
					])]),
					_: 2
				}, 1032, ["for"]);
			}), 64))])]);
		};
	}
});
export { ValueControlPopover_default as default };

//# sourceMappingURL=ValueControlPopover-CMkXeScT.js.map