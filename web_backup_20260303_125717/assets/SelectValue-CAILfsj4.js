import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { B as guardReactiveProps, Bt as normalizeClass, D as computed, I as createVNode, K as mergeProps, M as createPropsRestProxy, O as createBaseVNode, R as defineComponent, Rt as unref, Vt as normalizeProps, _t as withCtx, et as openBlock, k as createBlock, rt as renderSlot } from "./vendor-vue-core-tg-oZu4l.js";
import { A as SelectContent_default$1, C as SelectScrollUpButton_default$1, D as SelectItemIndicator_default, E as SelectItemText_default, O as SelectItem_default$1, S as SelectTrigger_default$1, T as SelectPortal_default, b as SelectViewport_default, j as SelectRoot_default, k as SelectIcon_default, ut as useForwardPropsEmits, w as SelectScrollDownButton_default$1, x as SelectValue_default$1 } from "./vendor-reka-ui-jxMUDvZT.js";
import { t as cn } from "./src-KH-2QSde.js";
var Select_default = /* @__PURE__ */ defineComponent({
	__name: "Select",
	props: {
		open: { type: Boolean },
		defaultOpen: { type: Boolean },
		defaultValue: {},
		modelValue: {},
		by: { type: [String, Function] },
		dir: {},
		multiple: { type: Boolean },
		autocomplete: {},
		disabled: { type: Boolean },
		name: {},
		required: { type: Boolean }
	},
	emits: ["update:modelValue", "update:open"],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(SelectRoot_default), normalizeProps(guardReactiveProps(unref(forwarded))), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
var SelectScrollDownButton_default = /* @__PURE__ */ defineComponent({
	__name: "SelectScrollDownButton",
	props: {
		asChild: { type: Boolean },
		as: {},
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] }
	},
	setup(__props) {
		const restProps = createPropsRestProxy(__props, ["class"]);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(SelectScrollDownButton_default$1), mergeProps(restProps, { class: unref(cn)("flex cursor-default items-center justify-center py-1 text-muted-foreground", __props.class) }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [_cache[0] || (_cache[0] = createBaseVNode("i", { class: "icon-[lucide--chevron-down]" }, null, -1))])]),
				_: 3
			}, 16, ["class"]);
		};
	}
});
var SelectScrollUpButton_default = /* @__PURE__ */ defineComponent({
	__name: "SelectScrollUpButton",
	props: {
		asChild: { type: Boolean },
		as: {},
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] }
	},
	setup(__props) {
		const restProps = createPropsRestProxy(__props, ["class"]);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(SelectScrollUpButton_default$1), mergeProps(restProps, { class: unref(cn)("flex cursor-default items-center justify-center py-1 text-muted-foreground", __props.class) }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [_cache[0] || (_cache[0] = createBaseVNode("i", { class: "icon-[lucide--chevron-up]" }, null, -1))])]),
				_: 3
			}, 16, ["class"]);
		};
	}
});
var SelectContent_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SelectContent",
	props: {
		forceMount: { type: Boolean },
		position: { default: "popper" },
		bodyLock: { type: Boolean },
		side: {},
		sideOffset: {},
		sideFlip: { type: Boolean },
		align: {},
		alignOffset: {},
		alignFlip: { type: Boolean },
		avoidCollisions: { type: Boolean },
		collisionBoundary: {},
		collisionPadding: {},
		arrowPadding: {},
		hideShiftedArrow: { type: Boolean },
		sticky: {},
		hideWhenDetached: { type: Boolean },
		positionStrategy: {},
		updatePositionStrategy: {},
		disableUpdateOnLayoutShift: { type: Boolean },
		prioritizePosition: { type: Boolean },
		reference: {},
		asChild: { type: Boolean },
		as: {},
		disableOutsidePointerEvents: { type: Boolean },
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		disablePortal: {
			type: Boolean,
			default: false
		}
	},
	emits: [
		"closeAutoFocus",
		"escapeKeyDown",
		"pointerDownOutside"
	],
	setup(__props, { emit: __emit }) {
		const restProps = createPropsRestProxy(__props, [
			"position",
			"disablePortal",
			"class"
		]);
		const emits = __emit;
		const forwarded = useForwardPropsEmits(computed(() => ({
			position: __props.position,
			...restProps
		})), emits);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(SelectPortal_default), { disabled: __props.disablePortal }, {
				default: withCtx(() => [createVNode(unref(SelectContent_default$1), mergeProps({
					...unref(forwarded),
					..._ctx.$attrs
				}, { class: unref(cn)("relative z-3000 max-h-96 min-w-32 overflow-hidden", "mt-2 rounded-lg p-2", "bg-base-background text-base-foreground", "border border-solid border-border-default", "shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", __props.position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", __props.class) }), {
					default: withCtx(() => [
						createVNode(SelectScrollUpButton_default),
						createVNode(unref(SelectViewport_default), { class: normalizeClass(unref(cn)("scrollbar-custom flex flex-col gap-0", __props.position === "popper" && "h-(--reka-select-trigger-height) w-full min-w-(--reka-select-trigger-width)")) }, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
							_: 3
						}, 8, ["class"]),
						createVNode(SelectScrollDownButton_default)
					]),
					_: 3
				}, 16, ["class"])]),
				_: 3
			}, 8, ["disabled"]);
		};
	}
});
var SelectItem_default = /* @__PURE__ */ defineComponent({
	__name: "SelectItem",
	props: {
		value: {},
		disabled: { type: Boolean },
		textValue: {},
		asChild: { type: Boolean },
		as: {},
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] }
	},
	setup(__props) {
		const restProps = createPropsRestProxy(__props, ["class"]);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(SelectItem_default$1), mergeProps(restProps, { class: unref(cn)("relative flex w-full cursor-pointer select-none items-center justify-between", "gap-3 rounded px-2 py-3 text-sm outline-none", "hover:bg-secondary-background-hover", "focus:bg-secondary-background-hover", "data-[state=checked]:bg-secondary-background-selected", "data-[state=checked]:hover:bg-secondary-background-selected", "data-[disabled]:pointer-events-none data-[disabled]:opacity-50", __props.class) }), {
				default: withCtx(() => [createVNode(unref(SelectItemText_default), { class: "truncate" }, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}), createVNode(unref(SelectItemIndicator_default), { class: "flex shrink-0 items-center justify-center" }, {
					default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("i", {
						class: "icon-[lucide--check] text-base-foreground",
						"aria-hidden": "true"
					}, null, -1)])]),
					_: 1
				})]),
				_: 3
			}, 16, ["class"]);
		};
	}
});
var SelectTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "SelectTrigger",
	props: {
		disabled: { type: Boolean },
		reference: {},
		asChild: { type: Boolean },
		as: {},
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] }
	},
	setup(__props) {
		const restProps = createPropsRestProxy(__props, ["class"]);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(SelectTrigger_default$1), mergeProps(restProps, { class: unref(cn)("flex h-10 w-full cursor-pointer select-none items-center justify-between", "rounded-lg px-4 py-2 text-sm", "bg-secondary-background text-base-foreground", "border-[2.5px] border-solid border-transparent", "transition-all duration-200 ease-in-out", "focus:border-node-component-border focus:outline-none", "data-[placeholder]:text-muted-foreground", "disabled:cursor-not-allowed disabled:opacity-60", "[&>span]:truncate", __props.class) }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default"), createVNode(unref(SelectIcon_default), { "as-child": "" }, {
					default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "icon-[lucide--chevron-down] shrink-0 text-muted-foreground" }, null, -1)])]),
					_: 1
				})]),
				_: 3
			}, 16, ["class"]);
		};
	}
});
var SelectValue_default = /* @__PURE__ */ defineComponent({
	__name: "SelectValue",
	props: {
		placeholder: {},
		asChild: { type: Boolean },
		as: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(SelectValue_default$1), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
export { Select_default as a, SelectContent_default as i, SelectTrigger_default as n, SelectItem_default as r, SelectValue_default as t };

//# sourceMappingURL=SelectValue-CAILfsj4.js.map