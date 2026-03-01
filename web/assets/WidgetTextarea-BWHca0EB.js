import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { A as createCommentVNode, Bt as normalizeClass, D as computed, G as mergeModels, I as createVNode, K as mergeProps, M as createPropsRestProxy, R as defineComponent, Rt as unref, Ut as toDisplayString, _ as vModelText, b as withModifiers, et as openBlock, j as createElementBlock, lt as useId, ut as useModel, vt as withDirectives } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-C6-gqLl2.js";
import { t as cn } from "./src-CaI548es.js";
import { r as useHideLayoutField } from "./widgetTypes-D8YBR9vN.js";
import { o as filterWidgetProps, r as INPUT_EXCLUDED_PROPS } from "./widgetPropFilter-DN03zIgB.js";
import { t as WidgetInputBaseClass } from "./layout-C-JjwVIp.js";
var Textarea_default = /* @__PURE__ */ defineComponent({
	__name: "Textarea",
	props: /* @__PURE__ */ mergeModels({ class: { type: [
		Boolean,
		null,
		String,
		Object,
		Array
	] } }, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const restAttrs = createPropsRestProxy(__props, ["class"]);
		const modelValue = useModel(__props, "modelValue");
		return (_ctx, _cache) => {
			return withDirectives((openBlock(), createElementBlock("textarea", mergeProps(restAttrs, {
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event),
				class: unref(cn)("flex min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", __props.class)
			}), null, 16)), [[vModelText, modelValue.value]]);
		};
	}
});
var _hoisted_1 = ["for"];
var WidgetTextarea_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetTextarea",
	props: /* @__PURE__ */ mergeModels({
		widget: {},
		placeholder: { default: "" }
	}, {
		"modelValue": { default: "" },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		const hideLayoutField = useHideLayoutField();
		const filteredProps = computed(() => filterWidgetProps(__props.widget.options, INPUT_EXCLUDED_PROPS));
		const displayName = computed(() => __props.widget.label || __props.widget.name);
		const id = useId();
		const isReadOnly = computed(() => __props.widget.options?.read_only ?? __props.widget.options?.disabled ?? false);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(cn)("relative rounded-lg focus-within:ring focus-within:ring-component-node-widget-background-highlighted transition-all", __props.widget.borderStyle)) }, [!unref(hideLayoutField) ? (openBlock(), createElementBlock("label", {
				key: 0,
				for: unref(id),
				class: "pointer-events-none absolute left-3 top-1.5 z-10 text-xxs text-muted-foreground"
			}, toDisplayString(displayName.value), 9, _hoisted_1)) : createCommentVNode("", true), createVNode(Textarea_default, mergeProps(filteredProps.value, {
				id: unref(id),
				modelValue: modelValue.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event),
				class: unref(cn)(unref(WidgetInputBaseClass), "size-full text-xs resize-none", !unref(hideLayoutField) && "pt-5"),
				placeholder: __props.placeholder,
				readonly: isReadOnly.value,
				"data-capture-wheel": "true",
				onPointerdownCapture: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"])),
				onPointermoveCapture: _cache[2] || (_cache[2] = withModifiers(() => {}, ["stop"])),
				onPointerupCapture: _cache[3] || (_cache[3] = withModifiers(() => {}, ["stop"])),
				onContextmenuCapture: _cache[4] || (_cache[4] = withModifiers(() => {}, ["stop"]))
			}), null, 16, [
				"id",
				"modelValue",
				"class",
				"placeholder",
				"readonly"
			])], 2);
		};
	}
});
export { WidgetTextarea_default as default };

//# sourceMappingURL=WidgetTextarea-BWHca0EB.js.map