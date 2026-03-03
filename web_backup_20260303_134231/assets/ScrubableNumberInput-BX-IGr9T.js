import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { A as createCommentVNode, Bt as normalizeClass, D as computed, G as mergeModels, K as mergeProps, O as createBaseVNode, R as defineComponent, Rt as unref, _t as withCtx, b as withModifiers, et as openBlock, ft as useTemplateRef, j as createElementBlock, k as createBlock, kt as ref, rt as renderSlot, ut as useModel, y as withKeys } from "./vendor-vue-core-tg-oZu4l.js";
import { ht as onClickOutside } from "./vendor-reka-ui-jxMUDvZT.js";
import { n as useI18n } from "./vendor-i18n-86kE_LSO.js";
import { t as cn } from "./src-DZOanDgF.js";
import { t as Button_default } from "./Button-D8fmNaXY.js";
var _hoisted_1 = { class: "relative min-w-[4ch] flex-1 py-1.5 my-0.25" };
var _hoisted_2 = ["value", "disabled"];
var ScrubableNumberInput_default = /* @__PURE__ */ defineComponent({
	__name: "ScrubableNumberInput",
	props: /* @__PURE__ */ mergeModels({
		min: {},
		max: {},
		step: { default: 1 },
		disabled: {
			type: Boolean,
			default: false
		},
		hideButtons: {
			type: Boolean,
			default: false
		},
		displayValue: {},
		parseValue: { type: Function },
		inputAttrs: {}
	}, {
		"modelValue": { default: 0 },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const { t } = useI18n();
		const modelValue = useModel(__props, "modelValue");
		const container = useTemplateRef("container");
		const inputField = useTemplateRef("inputField");
		const textEdit = ref(false);
		onClickOutside(container, () => {
			if (textEdit.value) textEdit.value = false;
		});
		function clamp(value) {
			const lo = __props.min ?? -Infinity;
			const hi = __props.max ?? Infinity;
			return Math.min(hi, Math.max(lo, value));
		}
		const canDecrement = computed(() => modelValue.value > (__props.min ?? -Infinity) && !__props.disabled);
		const canIncrement = computed(() => modelValue.value < (__props.max ?? Infinity) && !__props.disabled);
		const dragging = ref(false);
		const dragDelta = ref(0);
		const hasDragged = ref(false);
		function handleBlur(e) {
			const target = e.target;
			const raw = target.value.trim();
			const parsed = __props.parseValue ? __props.parseValue(raw) : raw === "" ? void 0 : Number(raw);
			if (parsed != null && !isNaN(parsed)) modelValue.value = clamp(parsed);
			else target.value = __props.displayValue ?? String(modelValue.value);
			textEdit.value = false;
		}
		function handlePointerDown(e) {
			if (e.button !== 0) return;
			if (__props.disabled) return;
			e.target.setPointerCapture(e.pointerId);
			dragging.value = true;
			dragDelta.value = 0;
			hasDragged.value = false;
		}
		function handlePointerMove(e) {
			if (!dragging.value) return;
			dragDelta.value += e.movementX;
			const steps = dragDelta.value / 10 | 0;
			if (steps === 0) return;
			hasDragged.value = true;
			const unclipped = modelValue.value + steps * __props.step;
			dragDelta.value %= 10;
			modelValue.value = clamp(unclipped);
		}
		function handlePointerUp() {
			if (!dragging.value) return;
			if (!hasDragged.value) {
				textEdit.value = true;
				inputField.value?.focus();
				inputField.value?.select();
			}
			resetDrag();
		}
		function resetDrag() {
			dragging.value = false;
			dragDelta.value = 0;
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "container",
				ref: container,
				class: "flex h-7 rounded-lg bg-component-node-widget-background text-xs text-component-node-foreground"
			}, [
				renderSlot(_ctx.$slots, "background"),
				!__props.hideButtons ? (openBlock(), createBlock(Button_default, {
					key: 0,
					"aria-label": unref(t)("g.decrement"),
					"data-testid": "decrement",
					class: "h-full w-8 rounded-r-none hover:bg-base-foreground/20 disabled:opacity-30",
					variant: "muted-textonly",
					disabled: !canDecrement.value,
					tabindex: "-1",
					onClick: _cache[0] || (_cache[0] = ($event) => modelValue.value = clamp(modelValue.value - __props.step))
				}, {
					default: withCtx(() => [..._cache[3] || (_cache[3] = [createBaseVNode("i", { class: "pi pi-minus" }, null, -1)])]),
					_: 1
				}, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
				createBaseVNode("div", _hoisted_1, [createBaseVNode("input", mergeProps({
					ref_key: "inputField",
					ref: inputField
				}, __props.inputAttrs, {
					value: __props.displayValue ?? modelValue.value,
					disabled: __props.disabled,
					class: unref(cn)("bg-transparent border-0 focus:outline-0 p-1 truncate text-sm absolute inset-0"),
					inputmode: "decimal",
					autocomplete: "off",
					autocorrect: "off",
					spellcheck: "false",
					onBlur: handleBlur,
					onKeyup: withKeys(handleBlur, ["enter"]),
					onDragstart: _cache[1] || (_cache[1] = withModifiers(() => {}, ["prevent"]))
				}), null, 16, _hoisted_2), createBaseVNode("div", {
					class: normalizeClass(unref(cn)("absolute inset-0 z-10 cursor-ew-resize", textEdit.value && "pointer-events-none hidden")),
					onPointerdown: handlePointerDown,
					onPointermove: handlePointerMove,
					onPointerup: handlePointerUp,
					onPointercancel: resetDrag
				}, null, 34)]),
				renderSlot(_ctx.$slots, "default"),
				!__props.hideButtons ? (openBlock(), createBlock(Button_default, {
					key: 1,
					"aria-label": unref(t)("g.increment"),
					"data-testid": "increment",
					class: "h-full w-8 rounded-l-none hover:bg-base-foreground/20 disabled:opacity-30",
					variant: "muted-textonly",
					disabled: !canIncrement.value,
					tabindex: "-1",
					onClick: _cache[2] || (_cache[2] = ($event) => modelValue.value = clamp(modelValue.value + __props.step))
				}, {
					default: withCtx(() => [..._cache[4] || (_cache[4] = [createBaseVNode("i", { class: "pi pi-plus" }, null, -1)])]),
					_: 1
				}, 8, ["aria-label", "disabled"])) : createCommentVNode("", true)
			], 512);
		};
	}
});
export { ScrubableNumberInput_default as t };

//# sourceMappingURL=ScrubableNumberInput-BX-IGr9T.js.map