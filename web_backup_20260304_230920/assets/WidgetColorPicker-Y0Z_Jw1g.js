import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { M as script } from "./vendor-primevue-CN8WO3jr.js";
import { Bt as normalizeClass, D as computed, I as createVNode, K as mergeProps, O as createBaseVNode, R as defineComponent, Rt as unref, Ut as toDisplayString, _t as withCtx, et as openBlock, k as createBlock, kt as ref, pt as watch } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-BlwZz5NW.js";
import { o as toHexFromFormat, r as isColorFormat } from "./colorUtil-0jM4jJ4_.js";
import { t as cn } from "./src-CfBwFEGf.js";
import { i as PANEL_EXCLUDED_PROPS, o as filterWidgetProps } from "./widgetPropFilter-DN03zIgB.js";
import { t as WidgetInputBaseClass } from "./layout-XTNtfYJ6.js";
import { t as WidgetLayoutField_default } from "./WidgetLayoutField-B0BnOyYW.js";
var _hoisted_1 = {
	class: "text-xs truncate min-w-[4ch]",
	"data-testid": "widget-color-text"
};
var WidgetColorPicker_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetColorPicker",
	props: {
		widget: {},
		modelValue: {}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const format = computed(() => {
			const optionFormat = props.widget.options?.format;
			return isColorFormat(optionFormat) ? optionFormat : "hex";
		});
		const localValue = ref(toHexFromFormat(props.modelValue || "#000000", isColorFormat(props.widget.options?.format) ? props.widget.options.format : "hex"));
		watch(() => props.modelValue, (newVal) => {
			localValue.value = toHexFromFormat(newVal || "#000000", format.value);
		});
		function onPickerUpdate(val) {
			localValue.value = val;
			emit("update:modelValue", toHexFromFormat(val, format.value));
		}
		const COLOR_PICKER_EXCLUDED_PROPS = [...PANEL_EXCLUDED_PROPS];
		const filteredProps = computed(() => filterWidgetProps(props.widget.options, COLOR_PICKER_EXCLUDED_PROPS));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(WidgetLayoutField_default, { widget: __props.widget }, {
				default: withCtx(() => [createBaseVNode("label", { class: normalizeClass(unref(cn)(unref(WidgetInputBaseClass), "flex items-center gap-2 w-full px-4 py-2")) }, [createVNode(unref(script), mergeProps({
					modelValue: localValue.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => localValue.value = $event)
				}, filteredProps.value, {
					class: "h-4 w-8 overflow-hidden !rounded-full border-none",
					"aria-label": __props.widget.name,
					pt: { preview: "!w-full !h-full !border-none" },
					"onUpdate:modelValue": onPickerUpdate
				}), null, 16, ["modelValue", "aria-label"]), createBaseVNode("span", _hoisted_1, toDisplayString(unref(toHexFromFormat)(localValue.value, format.value)), 1)], 2)]),
				_: 1
			}, 8, ["widget"]);
		};
	}
});
export { WidgetColorPicker_default as default };

//# sourceMappingURL=WidgetColorPicker-Y0Z_Jw1g.js.map