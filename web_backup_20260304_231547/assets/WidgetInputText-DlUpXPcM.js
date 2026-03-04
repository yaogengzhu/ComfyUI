import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { tt as script } from "./vendor-primevue-CN8WO3jr.js";
import { D as computed, G as mergeModels, I as createVNode, K as mergeProps, R as defineComponent, Rt as unref, _t as withCtx, et as openBlock, k as createBlock, ut as useModel } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-BlwZz5NW.js";
import { t as cn } from "./src-CfBwFEGf.js";
import { o as filterWidgetProps, r as INPUT_EXCLUDED_PROPS } from "./widgetPropFilter-DN03zIgB.js";
import { t as WidgetInputBaseClass } from "./layout-XTNtfYJ6.js";
import { t as WidgetLayoutField_default } from "./WidgetLayoutField-B0BnOyYW.js";
var WidgetInputText_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetInputText",
	props: /* @__PURE__ */ mergeModels({ widget: {} }, {
		"modelValue": { default: "" },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const props = __props;
		const modelValue = useModel(__props, "modelValue");
		const filteredProps = computed(() => filterWidgetProps(props.widget.options, INPUT_EXCLUDED_PROPS));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(WidgetLayoutField_default, { widget: __props.widget }, {
				default: withCtx(() => [createVNode(unref(script), mergeProps({
					modelValue: modelValue.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event)
				}, filteredProps.value, {
					class: unref(cn)(unref(WidgetInputBaseClass), "w-full text-xs py-2 px-4"),
					"aria-label": __props.widget.name,
					size: "small",
					pt: { root: "truncate min-w-[4ch]" }
				}), null, 16, [
					"modelValue",
					"class",
					"aria-label"
				])]),
				_: 1
			}, 8, ["widget"]);
		};
	}
});
export { WidgetInputText_default as default };

//# sourceMappingURL=WidgetInputText-DlUpXPcM.js.map