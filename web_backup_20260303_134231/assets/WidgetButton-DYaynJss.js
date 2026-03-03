import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { A as createCommentVNode, Bt as normalizeClass, D as computed, F as createTextVNode, I as createVNode, K as mergeProps, R as defineComponent, Ut as toDisplayString, _t as withCtx, et as openBlock, j as createElementBlock } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-qJz1Z78N.js";
import "./vendor-reka-ui-jxMUDvZT.js";
import { t as Button_default } from "./Button-D8fmNaXY.js";
import { o as filterWidgetProps, t as BADGE_EXCLUDED_PROPS } from "./widgetPropFilter-DVXr684F.js";
var _hoisted_1 = { class: "flex flex-col gap-1" };
var WidgetButton_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetButton",
	props: { widget: {} },
	setup(__props) {
		const props = __props;
		const BUTTON_EXCLUDED_PROPS = [...BADGE_EXCLUDED_PROPS, "iconClass"];
		const filteredProps = computed(() => filterWidgetProps(props.widget.options, BUTTON_EXCLUDED_PROPS));
		const handleClick = () => {
			if (props.widget.callback) props.widget.callback();
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createVNode(Button_default, mergeProps({
				class: "text-base-foreground w-full border-0 bg-component-node-widget-background p-2",
				"aria-label": __props.widget.label,
				size: "sm",
				variant: "textonly"
			}, filteredProps.value, { onClick: handleClick }), {
				default: withCtx(() => [createTextVNode(toDisplayString(__props.widget.label ?? __props.widget.name) + " ", 1), __props.widget.options?.iconClass ? (openBlock(), createElementBlock("i", {
					key: 0,
					class: normalizeClass(__props.widget.options.iconClass)
				}, null, 2)) : createCommentVNode("", true)]),
				_: 1
			}, 16, ["aria-label"])]);
		};
	}
});
export { WidgetButton_default as default };

//# sourceMappingURL=WidgetButton-DYaynJss.js.map