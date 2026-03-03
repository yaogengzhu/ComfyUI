import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { A as createCommentVNode, Bt as normalizeClass, R as defineComponent, Rt as unref, _t as withCtx, et as openBlock, j as createElementBlock, k as createBlock, rt as renderSlot } from "./vendor-vue-core-tg-oZu4l.js";
import { D as cva } from "./vendor-other-qJz1Z78N.js";
import { lt as Primitive } from "./vendor-reka-ui-jxMUDvZT.js";
import { t as cn } from "./src-DZOanDgF.js";
const buttonVariants = cva({
	base: "relative inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap appearance-none border-none rounded-md text-sm font-medium font-inter transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	variants: {
		variant: {
			secondary: "bg-secondary-background text-secondary-foreground hover:bg-secondary-background-hover",
			primary: "bg-primary-background text-base-foreground hover:bg-primary-background-hover",
			inverted: "bg-base-foreground text-base-background hover:bg-base-foreground/80",
			destructive: "bg-destructive-background text-base-foreground hover:bg-destructive-background-hover",
			textonly: "text-base-foreground bg-transparent hover:bg-secondary-background-hover",
			"muted-textonly": "text-muted-foreground bg-transparent hover:bg-secondary-background-hover",
			"destructive-textonly": "text-destructive-background bg-transparent hover:bg-destructive-background/10",
			"overlay-white": "bg-white text-gray-600 hover:bg-white/90"
		},
		size: {
			sm: "h-6 rounded-sm px-2 py-1 text-xs",
			md: "h-8 rounded-lg p-2 text-xs",
			lg: "h-10 rounded-lg px-4 py-2 text-sm",
			icon: "size-8",
			"icon-sm": "size-5 p-0",
			unset: ""
		}
	},
	defaultVariants: {
		variant: "secondary",
		size: "md"
	}
});
var _hoisted_1 = {
	key: 0,
	class: "pi pi-spin pi-spinner"
};
var Button_default = /* @__PURE__ */ defineComponent({
	__name: "Button",
	props: {
		variant: {},
		size: {},
		class: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: ""
		},
		loading: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		asChild: { type: Boolean },
		as: { default: "button" }
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: __props.as,
				"as-child": __props.asChild,
				disabled: __props.disabled || __props.loading,
				class: normalizeClass(unref(cn)(unref(buttonVariants)({
					variant: __props.variant,
					size: __props.size
				}), __props.class))
			}, {
				default: withCtx(() => [__props.loading ? (openBlock(), createElementBlock("i", _hoisted_1)) : createCommentVNode("", true), !__props.loading ? renderSlot(_ctx.$slots, "default", { key: 1 }) : createCommentVNode("", true)]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"disabled",
				"class"
			]);
		};
	}
});
export { Button_default as t };

//# sourceMappingURL=Button-D8fmNaXY.js.map