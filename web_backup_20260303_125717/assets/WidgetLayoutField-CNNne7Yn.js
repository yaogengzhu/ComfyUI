import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { A as createCommentVNode, Bt as normalizeClass, F as createTextVNode, O as createBaseVNode, R as defineComponent, Rt as unref, S as Fragment, Ut as toDisplayString, b as withModifiers, et as openBlock, j as createElementBlock, rt as renderSlot } from "./vendor-vue-core-tg-oZu4l.js";
import { t as cn } from "./src-KH-2QSde.js";
import { r as useHideLayoutField } from "./widgetTypes-D8SDkOs1.js";
var _hoisted_1 = {
	key: 0,
	class: "truncate content-center-safe"
};
var _hoisted_2 = { class: "relative min-w-0 flex-1" };
var WidgetLayoutField_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetLayoutField",
	props: {
		widget: {},
		rootClass: {}
	},
	setup(__props) {
		const hideLayoutField = useHideLayoutField();
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(cn)("grid grid-cols-subgrid min-w-0 justify-between gap-1 text-node-component-slot-text", __props.rootClass)) }, [!unref(hideLayoutField) ? (openBlock(), createElementBlock("div", _hoisted_1, [__props.widget.name ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(__props.widget.label || __props.widget.name), 1)], 64)) : createCommentVNode("", true)])) : createCommentVNode("", true), createBaseVNode("div", _hoisted_2, [createBaseVNode("div", {
				class: normalizeClass(unref(cn)("cursor-default min-w-0 rounded-lg focus-within:ring focus-within:ring-component-node-widget-background-highlighted transition-all", __props.widget.borderStyle)),
				onPointerdown: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"])),
				onPointermove: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"])),
				onPointerup: _cache[2] || (_cache[2] = withModifiers(() => {}, ["stop"]))
			}, [renderSlot(_ctx.$slots, "default")], 34)])], 2);
		};
	}
});
export { WidgetLayoutField_default as t };

//# sourceMappingURL=WidgetLayoutField-CNNne7Yn.js.map