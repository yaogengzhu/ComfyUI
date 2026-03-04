import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { Y as script } from "./vendor-primevue-BEjAYGWm.js";
import { Bt as normalizeClass, D as computed, F as createTextVNode, G as mergeModels, I as createVNode, K as mergeProps, M as createPropsRestProxy, Pt as toRef, R as defineComponent, Rt as unref, U as inject, Ut as toDisplayString, _t as withCtx, et as openBlock, j as createElementBlock, k as createBlock, kt as ref, rt as renderSlot, tt as provide, ut as useModel } from "./vendor-vue-core-tg-oZu4l.js";
import { D as cva } from "./vendor-other-qJz1Z78N.js";
import { a as ToggleGroupRoot_default, dt as useForwardProps, i as ToggleGroupItem_default$1, ut as useForwardPropsEmits } from "./vendor-reka-ui-C26MN8JS.js";
import { n as useI18n } from "./vendor-i18n-D6iZeZ7U.js";
import { t as cn } from "./src-CqWvSCI8.js";
import { r as useHideLayoutField } from "./widgetTypes-0MCr4N7Z.js";
import { a as STANDARD_EXCLUDED_PROPS, o as filterWidgetProps } from "./widgetPropFilter-3RmcXtGi.js";
import { t as WidgetInputBaseClass } from "./layout-DwV6zUl5.js";
import { t as WidgetLayoutField_default } from "./WidgetLayoutField-C8_pjSsJ.js";
const toggleGroupVariantKey = Symbol("toggleGroupVariant");
const toggleGroupVariants = cva({
	base: "flex items-center justify-center gap-1",
	variants: { variant: {
		default: "bg-transparent",
		outline: "bg-transparent"
	} },
	defaultVariants: { variant: "default" }
});
const toggleGroupItemVariants = cva({
	base: [
		"inline-flex items-center justify-center rounded",
		"border-none cursor-pointer appearance-none",
		"text-center font-normal",
		"transition-all duration-150 ease-in-out",
		"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
		"disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
		"data-[state=on]:bg-interface-menu-component-surface-selected data-[state=on]:text-text-primary"
	],
	variants: {
		variant: {
			default: "bg-transparent hover:bg-interface-menu-component-surface-selected/50 text-text-secondary",
			outline: "border border-border-default bg-transparent hover:bg-secondary-background text-text-secondary"
		},
		size: {
			default: "h-7 px-3 text-sm",
			sm: "h-6 px-5 py-[5px] text-xs",
			lg: "h-9 px-4 text-sm"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var ToggleGroup_default = /* @__PURE__ */ defineComponent({
	__name: "ToggleGroup",
	props: {
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		variant: { default: "default" },
		rovingFocus: { type: Boolean },
		disabled: { type: Boolean },
		orientation: {},
		dir: {},
		loop: { type: Boolean },
		asChild: { type: Boolean },
		as: {},
		name: {},
		required: { type: Boolean },
		type: {},
		modelValue: {},
		defaultValue: {}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(createPropsRestProxy(__props, ["class", "variant"]), __emit);
		provide(toggleGroupVariantKey, toRef(() => __props.variant));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ToggleGroupRoot_default), mergeProps(unref(forwarded), { class: unref(cn)(unref(toggleGroupVariants)({ variant: __props.variant }), __props.class) }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["class"]);
		};
	}
});
var ToggleGroupItem_default = /* @__PURE__ */ defineComponent({
	__name: "ToggleGroupItem",
	props: {
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		variant: {},
		size: { default: "default" },
		value: {},
		disabled: { type: Boolean },
		asChild: { type: Boolean },
		as: {}
	},
	setup(__props) {
		const restProps = createPropsRestProxy(__props, [
			"class",
			"variant",
			"size"
		]);
		const contextVariant = inject(toggleGroupVariantKey, ref("default"));
		const forwardedProps = useForwardProps(restProps);
		const resolvedVariant = computed(() => __props.variant ?? contextVariant.value ?? "default");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ToggleGroupItem_default$1), mergeProps(unref(forwardedProps), { class: unref(cn)(unref(toggleGroupItemVariants)({
				variant: resolvedVariant.value,
				size: __props.size
			}), "flex-1 min-w-0 truncate", __props.class) }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["class"]);
		};
	}
});
var WidgetToggleSwitch_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetToggleSwitch",
	props: /* @__PURE__ */ mergeModels({ widget: {} }, {
		"modelValue": { type: Boolean },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		const hideLayoutField = useHideLayoutField();
		const { t } = useI18n();
		const filteredProps = computed(() => filterWidgetProps(__props.widget.options, STANDARD_EXCLUDED_PROPS));
		const hasLabels = computed(() => {
			return __props.widget.options?.on != null || __props.widget.options?.off != null;
		});
		function handleOptionChange(value) {
			if (value) modelValue.value = value === "on";
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(WidgetLayoutField_default, { widget: __props.widget }, {
				default: withCtx(() => [hasLabels.value ? (openBlock(), createBlock(unref(ToggleGroup_default), {
					key: 0,
					type: "single",
					"model-value": modelValue.value ? "on" : "off",
					disabled: Boolean(__props.widget.options?.read_only),
					class: normalizeClass(unref(cn)(unref(WidgetInputBaseClass), "w-full min-w-0 p-1 flex items-center justify-center gap-1")),
					"onUpdate:modelValue": _cache[0] || (_cache[0] = (v) => handleOptionChange(v))
				}, {
					default: withCtx(() => [createVNode(unref(ToggleGroupItem_default), {
						value: "off",
						size: "sm"
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(__props.widget.options?.off ?? unref(t)("widgets.boolean.false")), 1)]),
						_: 1
					}), createVNode(unref(ToggleGroupItem_default), {
						value: "on",
						size: "sm"
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(__props.widget.options?.on ?? unref(t)("widgets.boolean.true")), 1)]),
						_: 1
					})]),
					_: 1
				}, 8, [
					"model-value",
					"disabled",
					"class"
				])) : (openBlock(), createElementBlock("div", {
					key: 1,
					class: normalizeClass(unref(cn)("flex w-fit items-center gap-2", unref(hideLayoutField) || "ml-auto"))
				}, [createVNode(unref(script), mergeProps({
					modelValue: modelValue.value,
					"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => modelValue.value = $event)
				}, filteredProps.value, { "aria-label": __props.widget.name }), null, 16, ["modelValue", "aria-label"])], 2))]),
				_: 1
			}, 8, ["widget"]);
		};
	}
});
export { WidgetToggleSwitch_default as default };

//# sourceMappingURL=WidgetToggleSwitch-D_z_jRGs.js.map