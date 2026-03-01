import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { D as computed, I as createVNode, O as createBaseVNode, R as defineComponent, Ut as toDisplayString, et as openBlock, j as createElementBlock, ut as useModel } from "./vendor-vue-core-tg-oZu4l.js";
import { t as ScrubableNumberInput_default } from "./ScrubableNumberInput-BKDh4cny.js";
var _hoisted_1 = { class: "grid grid-cols-[auto_1fr] gap-x-2 gap-y-1" };
var _hoisted_2 = { class: "content-center text-xs text-node-component-slot-text" };
var _hoisted_3 = { class: "content-center text-xs text-node-component-slot-text" };
var _hoisted_4 = { class: "content-center text-xs text-node-component-slot-text" };
var _hoisted_5 = { class: "content-center text-xs text-node-component-slot-text" };
var WidgetBoundingBox_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetBoundingBox",
	props: {
		"modelValue": { default: () => ({
			x: 0,
			y: 0,
			width: 512,
			height: 512
		}) },
		"modelModifiers": {}
	},
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		const x = computed({
			get: () => modelValue.value.x,
			set: (x) => {
				modelValue.value = {
					...modelValue.value,
					x
				};
			}
		});
		const y = computed({
			get: () => modelValue.value.y,
			set: (y) => {
				modelValue.value = {
					...modelValue.value,
					y
				};
			}
		});
		const width = computed({
			get: () => modelValue.value.width,
			set: (width) => {
				modelValue.value = {
					...modelValue.value,
					width
				};
			}
		});
		const height = computed({
			get: () => modelValue.value.height,
			set: (height) => {
				modelValue.value = {
					...modelValue.value,
					height
				};
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("label", _hoisted_2, toDisplayString(_ctx.$t("boundingBox.x")), 1),
				createVNode(ScrubableNumberInput_default, {
					modelValue: x.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => x.value = $event),
					min: 0,
					step: 1
				}, null, 8, ["modelValue"]),
				createBaseVNode("label", _hoisted_3, toDisplayString(_ctx.$t("boundingBox.y")), 1),
				createVNode(ScrubableNumberInput_default, {
					modelValue: y.value,
					"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => y.value = $event),
					min: 0,
					step: 1
				}, null, 8, ["modelValue"]),
				createBaseVNode("label", _hoisted_4, toDisplayString(_ctx.$t("boundingBox.width")), 1),
				createVNode(ScrubableNumberInput_default, {
					modelValue: width.value,
					"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => width.value = $event),
					min: 1,
					step: 1
				}, null, 8, ["modelValue"]),
				createBaseVNode("label", _hoisted_5, toDisplayString(_ctx.$t("boundingBox.height")), 1),
				createVNode(ScrubableNumberInput_default, {
					modelValue: height.value,
					"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => height.value = $event),
					min: 1,
					step: 1
				}, null, 8, ["modelValue"])
			]);
		};
	}
});
export { WidgetBoundingBox_default as t };

//# sourceMappingURL=WidgetBoundingBox-vKaqoQAi.js.map