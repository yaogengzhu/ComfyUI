import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { k as script } from "./vendor-primevue-CN8WO3jr.js";
import { Bt as normalizeClass, D as computed, G as mergeModels, Ht as normalizeStyle, I as createVNode, It as toValue, K as mergeProps, O as createBaseVNode, R as defineComponent, Rt as unref, _t as withCtx, at as resolveDirective, b as withModifiers, et as openBlock, k as createBlock, kt as ref, ot as resolveDynamicComponent, rt as renderSlot, ut as useModel, vt as withDirectives, y as withKeys } from "./vendor-vue-core-tg-oZu4l.js";
import { g as SliderThumb_default, h as SliderTrack_default, v as SliderRoot_default } from "./vendor-reka-ui-C_KZ-Z9x.js";
import { n as useI18n } from "./vendor-i18n-D6iZeZ7U.js";
import { t as evaluateInput } from "./widget-DTr1rh-S.js";
import { t as cn } from "./src-CfBwFEGf.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-CoBaw5e7.js";
import { t as ScrubableNumberInput_default } from "./ScrubableNumberInput-DsgeUeEk.js";
import { t as Slider_default } from "./Slider-B1H68qo2.js";
import { a as STANDARD_EXCLUDED_PROPS, o as filterWidgetProps, r as INPUT_EXCLUDED_PROPS } from "./widgetPropFilter-DN03zIgB.js";
import { t as WidgetInputBaseClass } from "./layout-XTNtfYJ6.js";
import { t as WidgetLayoutField_default } from "./WidgetLayoutField-B0BnOyYW.js";
import { t as WidgetWithControl_default } from "./WidgetWithControl-MYquOmY6.js";
function stopsToGradient(stops) {
	if (!stops.length) return "transparent";
	return `linear-gradient(to right, ${stops.map(({ offset, color: [r, g, b] }) => `rgb(${r},${g},${b}) ${offset * 100}%`).join(", ")})`;
}
function interpolateStops(stops, t) {
	if (!stops.length) return "transparent";
	const clamped = Math.max(0, Math.min(1, t));
	if (clamped <= stops[0].offset) {
		const [r, g, b] = stops[0].color;
		return `rgb(${r},${g},${b})`;
	}
	for (let i = 0; i < stops.length - 1; i++) {
		const { offset: o1, color: [r1, g1, b1] } = stops[i];
		const { offset: o2, color: [r2, g2, b2] } = stops[i + 1];
		if (clamped >= o1 && clamped <= o2) {
			const f = o2 === o1 ? 0 : (clamped - o1) / (o2 - o1);
			return `rgb(${Math.round(r1 + (r2 - r1) * f)},${Math.round(g1 + (g2 - g1) * f)},${Math.round(b1 + (b2 - b1) * f)})`;
		}
	}
	const [r, g, b] = stops[stops.length - 1].color;
	return `rgb(${r},${g},${b})`;
}
var GradientSlider_default = /* @__PURE__ */ defineComponent({
	__name: "GradientSlider",
	props: /* @__PURE__ */ mergeModels({
		stops: {},
		min: { default: 0 },
		max: { default: 100 },
		step: { default: 1 },
		disabled: {
			type: Boolean,
			default: false
		},
		ariaLabel: {}
	}, {
		"modelValue": { required: true },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		const sliderValue = computed({
			get: () => [modelValue.value],
			set: (v) => {
				if (v.length) modelValue.value = v[0];
			}
		});
		const gradient = computed(() => stopsToGradient(__props.stops));
		const thumbColor = computed(() => {
			const t = __props.max === __props.min ? 0 : (modelValue.value - __props.min) / (__props.max - __props.min);
			return interpolateStops(__props.stops, t);
		});
		const pressed = ref(false);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(SliderRoot_default), {
				modelValue: sliderValue.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => sliderValue.value = $event),
				min: __props.min,
				max: __props.max,
				step: __props.step,
				disabled: __props.disabled,
				class: normalizeClass(unref(cn)("relative flex w-full touch-none items-center select-none", "data-[disabled]:opacity-50")),
				style: { "--reka-slider-thumb-transform": "translate(-50%, -50%)" },
				onSlideStart: _cache[1] || (_cache[1] = ($event) => pressed.value = true),
				onSlideMove: _cache[2] || (_cache[2] = ($event) => pressed.value = true),
				onSlideEnd: _cache[3] || (_cache[3] = ($event) => pressed.value = false)
			}, {
				default: withCtx(() => [createVNode(unref(SliderTrack_default), {
					class: normalizeClass(unref(cn)("relative h-2.5 w-full grow cursor-pointer overflow-visible rounded-full", "before:absolute before:-inset-2 before:block before:bg-transparent")),
					style: normalizeStyle({ background: gradient.value })
				}, {
					default: withCtx(() => [createVNode(unref(SliderThumb_default), {
						class: normalizeClass(unref(cn)("block size-4 shrink-0 cursor-grab rounded-full shadow-md ring-1 ring-black/25 top-1/2", "transition-[color,box-shadow,background-color]", "before:absolute before:-inset-1.5 before:block before:rounded-full before:bg-transparent", "hover:ring-2 hover:ring-black/40 focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:outline-hidden", "disabled:pointer-events-none disabled:opacity-50", { "cursor-grabbing": pressed.value })),
						style: normalizeStyle({ backgroundColor: thumbColor.value }),
						"aria-label": __props.ariaLabel
					}, null, 8, [
						"class",
						"style",
						"aria-label"
					])]),
					_: 1
				}, 8, ["class", "style"])]),
				_: 1
			}, 8, [
				"modelValue",
				"min",
				"max",
				"step",
				"disabled",
				"class"
			]);
		};
	}
});
function useNumberStepCalculation(options, precisionArg, returnUndefinedForDefault = false) {
	return computed(() => {
		const precision = toValue(precisionArg);
		if (options?.step2 !== void 0) return Number(options.step2);
		const step = options?.step;
		if (step !== void 0 && step > 10) return Number(step) / 10;
		if (precision === void 0) return returnUndefinedForDefault ? void 0 : 0;
		if (precision === 0) return 1;
		const calculatedStep = 1 / Math.pow(10, precision);
		return returnUndefinedForDefault ? calculatedStep : Number(calculatedStep.toFixed(precision));
	});
}
var sharedButtonClasses = cn("inline-flex items-center justify-center border-0 bg-transparent text-inherit transition-colors duration-150 ease-in-out ", "hover:bg-node-component-surface-hovered active:bg-node-component-surface-selected", "disabled:bg-node-component-disabled disabled:text-node-icon-disabled disabled:cursor-not-allowed");
function useNumberWidgetButtonPt(options) {
	const { roundedLeft = false, roundedRight = false } = options ?? {};
	const increment = cn(sharedButtonClasses, roundedRight && "rounded-r-lg");
	const decrement = cn(sharedButtonClasses, roundedLeft && "rounded-l-lg");
	return {
		incrementButton: { class: increment },
		decrementButton: { class: decrement }
	};
}
var WidgetInputNumberGradientSlider_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetInputNumberGradientSlider",
	props: /* @__PURE__ */ mergeModels({ widget: {} }, {
		"modelValue": { default: 0 },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const DEFAULT_GRADIENT_STOPS = [{
			offset: 0,
			color: [
				0,
				0,
				0
			]
		}, {
			offset: 1,
			color: [
				255,
				255,
				255
			]
		}];
		const modelValue = useModel(__props, "modelValue");
		const timesEmptied = ref(0);
		const handleNumberInputUpdate = (newValue) => {
			if (newValue !== void 0) {
				modelValue.value = newValue;
				return;
			}
			timesEmptied.value += 1;
		};
		const gradientStops = computed(() => {
			const stops = __props.widget.options?.gradient_stops;
			if (stops && stops.length >= 2) return stops;
			return DEFAULT_GRADIENT_STOPS;
		});
		const filteredProps = computed(() => filterWidgetProps(__props.widget.options, STANDARD_EXCLUDED_PROPS));
		const precision = computed(() => {
			const p = __props.widget.options?.precision;
			return typeof p === "number" && p >= 0 ? p : void 0;
		});
		const stepValue = useNumberStepCalculation(__props.widget.options, precision, true);
		const numberPt = useNumberWidgetButtonPt({
			roundedLeft: true,
			roundedRight: true
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(WidgetLayoutField_default, { widget: __props.widget }, {
				default: withCtx(() => [createBaseVNode("div", { class: normalizeClass(unref(cn)(unref(WidgetInputBaseClass), "flex items-center gap-2 pl-3 pr-2")) }, [createVNode(GradientSlider_default, {
					modelValue: modelValue.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event),
					stops: gradientStops.value,
					min: __props.widget.options?.min ?? 0,
					max: __props.widget.options?.max ?? 100,
					step: unref(stepValue),
					disabled: __props.widget.options?.disabled,
					"aria-label": __props.widget.name,
					class: "flex-1 min-w-0"
				}, null, 8, [
					"modelValue",
					"stops",
					"min",
					"max",
					"step",
					"disabled",
					"aria-label"
				]), (openBlock(), createBlock(unref(script), mergeProps({
					key: timesEmptied.value,
					"model-value": modelValue.value
				}, filteredProps.value, {
					step: unref(stepValue),
					"min-fraction-digits": precision.value,
					"max-fraction-digits": precision.value,
					"aria-label": __props.widget.name,
					size: "small",
					"pt:pc-input-text:root": "min-w-[4ch] bg-transparent border-none text-center truncate",
					class: "w-16 shrink-0",
					pt: unref(numberPt),
					"onUpdate:modelValue": handleNumberInputUpdate
				}), null, 16, [
					"model-value",
					"step",
					"min-fraction-digits",
					"max-fraction-digits",
					"aria-label",
					"pt"
				]))], 2)]),
				_: 1
			}, 8, ["widget"]);
		};
	}
});
var _hoisted_1 = { class: "absolute size-full rounded-lg pointer-events-none overflow-clip" };
var WidgetInputNumberInput_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetInputNumberInput",
	props: /* @__PURE__ */ mergeModels({
		widget: {},
		rootClass: {}
	}, {
		"modelValue": { default: 0 },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const { locale } = useI18n();
		const props = __props;
		function formatNumber(value, options) {
			return new Intl.NumberFormat(locale.value, options).format(value);
		}
		const decimalSeparator = computed(() => formatNumber(1.1).replace(/\p{Number}/gu, ""));
		const groupSeparator = computed(() => formatNumber(11111).replace(/\p{Number}/gu, ""));
		function unformatValue(value) {
			return value.replaceAll(groupSeparator.value, "").replaceAll(decimalSeparator.value, ".");
		}
		const modelValue = useModel(__props, "modelValue");
		const formattedValue = computed(() => {
			const value = modelValue.value;
			if (value === "" || !isFinite(value)) return `${value}`;
			const options = { useGrouping: useGrouping.value };
			if (precision.value !== void 0) {
				options.minimumFractionDigits = precision.value;
				options.maximumFractionDigits = precision.value;
			}
			return formatNumber(value, options);
		});
		function parseWidgetValue(raw) {
			return evaluateInput(unformatValue(raw));
		}
		const filteredProps = computed(() => {
			return filterWidgetProps(props.widget.options, INPUT_EXCLUDED_PROPS);
		});
		const isDisabled = computed(() => props.widget.options?.disabled ?? false);
		const precision = computed(() => {
			const p = props.widget.options?.precision;
			return typeof p === "number" && p >= 0 ? p : void 0;
		});
		const stepValue = computed(() => {
			if (props.widget.options?.step2 !== void 0) return Number(props.widget.options.step2);
			const step = props.widget.options?.step;
			if (step !== void 0 && step > 10) return Number(step) / 10;
			if (precision.value !== void 0) {
				if (precision.value === 0) return 1;
				return Number((1 / Math.pow(10, precision.value)).toFixed(precision.value));
			}
			return 0;
		});
		const useGrouping = computed(() => {
			return props.widget.options?.useGrouping === true;
		});
		const buttonsDisabled = computed(() => {
			const currentValue = modelValue.value ?? 0;
			return !Number.isFinite(currentValue) || Math.abs(currentValue) > Number.MAX_SAFE_INTEGER;
		});
		function updateValueBy(delta) {
			const max = filteredProps.value.max ?? Number.MAX_VALUE;
			const min = filteredProps.value.min ?? -Number.MAX_VALUE;
			modelValue.value = Math.min(max, Math.max(min, modelValue.value + delta));
		}
		const buttonTooltip = computed(() => {
			if (buttonsDisabled.value) return "Increment/decrement disabled: value exceeds JavaScript precision limit (±2^53)";
			return null;
		});
		const sliderWidth = computed(() => {
			const { max, min, step } = filteredProps.value;
			if (min === void 0 || max === void 0 || step === void 0 || (max - min) / step >= 100) return 0;
			return ((modelValue.value - min) / (max - min) * 100).toFixed(0);
		});
		const inputAriaAttrs = computed(() => ({
			"aria-valuenow": modelValue.value,
			"aria-valuemin": filteredProps.value.min,
			"aria-valuemax": filteredProps.value.max,
			role: "spinbutton",
			tabindex: 0
		}));
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createBlock(WidgetLayoutField_default, {
				widget: __props.widget,
				"root-class": props.rootClass
			}, {
				default: withCtx(() => [withDirectives((openBlock(), createBlock(ScrubableNumberInput_default, {
					modelValue: modelValue.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event),
					"aria-label": __props.widget.name,
					min: filteredProps.value.min,
					max: filteredProps.value.max,
					step: stepValue.value,
					"display-value": formattedValue.value,
					disabled: isDisabled.value,
					"hide-buttons": buttonsDisabled.value,
					"parse-value": parseWidgetValue,
					"input-attrs": inputAriaAttrs.value,
					class: normalizeClass(unref(cn)(unref(WidgetInputBaseClass), "grow text-xs flex h-7 relative")),
					onKeydown: [
						_cache[1] || (_cache[1] = withKeys(withModifiers(($event) => updateValueBy(stepValue.value), ["prevent"]), ["up"])),
						_cache[2] || (_cache[2] = withKeys(withModifiers(($event) => updateValueBy(-stepValue.value), ["prevent"]), ["down"])),
						_cache[3] || (_cache[3] = withKeys(withModifiers(($event) => updateValueBy(10 * stepValue.value), ["prevent"]), ["page-up"])),
						_cache[4] || (_cache[4] = withKeys(withModifiers(($event) => updateValueBy(-10 * stepValue.value), ["prevent"]), ["page-down"]))
					]
				}, {
					background: withCtx(() => [createBaseVNode("div", _hoisted_1, [createBaseVNode("div", {
						class: "bg-primary-background/15 size-full",
						style: normalizeStyle({ width: `${sliderWidth.value}%` })
					}, null, 4)])]),
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"modelValue",
					"aria-label",
					"min",
					"max",
					"step",
					"display-value",
					"disabled",
					"hide-buttons",
					"input-attrs",
					"class"
				])), [[_directive_tooltip, buttonTooltip.value]])]),
				_: 3
			}, 8, ["widget", "root-class"]);
		};
	}
});
var WidgetInputNumberSlider_default = /* @__PURE__ */ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "WidgetInputNumberSlider",
	props: /* @__PURE__ */ mergeModels({ widget: {} }, {
		"modelValue": { default: 0 },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		const timesEmptied = ref(0);
		const updateLocalValue = (newValue) => {
			if (newValue?.length) modelValue.value = newValue[0];
		};
		const handleNumberInputUpdate = (newValue) => {
			if (newValue !== void 0) {
				updateLocalValue([newValue]);
				return;
			}
			timesEmptied.value += 1;
		};
		const filteredProps = computed(() => filterWidgetProps(__props.widget.options, STANDARD_EXCLUDED_PROPS));
		const p = __props.widget.options?.precision;
		const precision = typeof p === "number" && p >= 0 ? p : void 0;
		const stepValue = useNumberStepCalculation(__props.widget.options, precision, true);
		const sliderNumberPt = useNumberWidgetButtonPt({
			roundedLeft: true,
			roundedRight: true
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(WidgetLayoutField_default, { widget: __props.widget }, {
				default: withCtx(() => [createBaseVNode("div", { class: normalizeClass(unref(cn)(unref(WidgetInputBaseClass), "flex items-center gap-2 pl-3 pr-2")) }, [createVNode(Slider_default, mergeProps({ "model-value": [modelValue.value] }, filteredProps.value, {
					class: "flex-grow text-xs",
					step: unref(stepValue),
					"aria-label": __props.widget.name,
					"onUpdate:modelValue": updateLocalValue
				}), null, 16, [
					"model-value",
					"step",
					"aria-label"
				]), (openBlock(), createBlock(unref(script), mergeProps({
					key: timesEmptied.value,
					"model-value": modelValue.value
				}, filteredProps.value, {
					step: unref(stepValue),
					"min-fraction-digits": unref(precision),
					"max-fraction-digits": unref(precision),
					"aria-label": __props.widget.name,
					size: "small",
					"pt:pc-input-text:root": "min-w-[4ch] bg-transparent border-none text-center truncate",
					class: "w-16",
					pt: unref(sliderNumberPt),
					"onUpdate:modelValue": handleNumberInputUpdate
				}), null, 16, [
					"model-value",
					"step",
					"min-fraction-digits",
					"max-fraction-digits",
					"aria-label",
					"pt"
				]))], 2)]),
				_: 1
			}, 8, ["widget"]);
		};
	}
}), [["__scopeId", "data-v-989ee2f9"]]);
var WidgetInputNumber_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetInputNumber",
	props: /* @__PURE__ */ mergeModels({ widget: {} }, {
		"modelValue": { default: 0 },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const props = __props;
		const modelValue = useModel(__props, "modelValue");
		const controlWidget = computed(() => props.widget.controlWidget ? props.widget : null);
		const widgetComponent = computed(() => {
			switch (props.widget.type) {
				case "gradientslider": return WidgetInputNumberGradientSlider_default;
				case "slider": return WidgetInputNumberSlider_default;
				default: return WidgetInputNumberInput_default;
			}
		});
		return (_ctx, _cache) => {
			return controlWidget.value ? (openBlock(), createBlock(WidgetWithControl_default, {
				key: 0,
				modelValue: modelValue.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event),
				widget: controlWidget.value,
				component: widgetComponent.value
			}, null, 8, [
				"modelValue",
				"widget",
				"component"
			])) : (openBlock(), createBlock(resolveDynamicComponent(widgetComponent.value), mergeProps({
				key: 1,
				modelValue: modelValue.value,
				"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => modelValue.value = $event),
				widget: __props.widget
			}, _ctx.$attrs), null, 16, ["modelValue", "widget"]));
		};
	}
});
export { WidgetInputNumber_default as t };

//# sourceMappingURL=WidgetInputNumber-CJpy3Lkw.js.map