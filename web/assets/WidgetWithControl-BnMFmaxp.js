const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./ValueControlPopover-CMkXeScT.js","./rolldown-runtime-DLICfi3-.js","./vendor-primevue-BMWHeZll.js","./vendor-vue-core-tg-oZu4l.js","./vendor-other-Cb4peHqA.js","./vendor-firebase-DN8BxCYa.js","./vendor-three-ueviNA60.js","./vendor-tiptap-DTO2QA4Q.js","./vendor-reka-ui-jxMUDvZT.js","./vendor-markdown-BPt2PdDp.js","./extensionStore-BhlCwLvC.js","./api-jlQue090.js","./vendor-axios-CDLnCfA3.js","./vendor-yjs-DPYlthRk.js","./vendor-zod-DxNhSbfF.js","./i18n-Dy4mrtIR.js","./vendor-i18n-86kE_LSO.js","./widget-q92NCcJ5.js","./types-YYe-ycsK.js","./colorUtil-CQE2D_f9.js","./dialogService-Cvolq8px.js","./_plugin-vue_export-helper-ralzwvFM.js","./vendor-vueuse-By9Ts4Tf.js","./src-KH-2QSde.js","./Popover-oAJ3EQ_X.js","./Button-D4w5_e9I.js","./SelectValue-CAILfsj4.js","./useErrorHandling--1B8-At_.js","./useExternalLink-BDqUsXhK.js","./envUtil-BuwjzvDd.js","./useFeatureFlags-79NOcfrn.js","./VideoPlayOverlay-SbkDj79Z.js","./telemetry-CLrjuJLU.js","./userStore-CpSN5kjY.js","./widgetTypes-D8SDkOs1.js","./markdownRendererUtil-CrR6m0CH.js","./vendor-other-DODGPXtn.css","./dialogService-BQOo2Utv.css"])))=>i.map(i=>d[i]);
import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { ct as __vitePreload } from "./vendor-primevue-BMWHeZll.js";
import { Bt as normalizeClass, D as computed, G as mergeModels, I as createVNode, K as mergeProps, L as defineAsyncComponent, O as createBaseVNode, R as defineComponent, Rt as unref, _t as withCtx, et as openBlock, j as createElementBlock, k as createBlock, kt as ref, ot as resolveDynamicComponent, pt as watch, ut as useModel } from "./vendor-vue-core-tg-oZu4l.js";
import { t as Button_default } from "./Button-D4w5_e9I.js";
import { t as Popover_default } from "./Popover-oAJ3EQ_X.js";
var _hoisted_1 = { class: "relative grid grid-cols-subgrid" };
var WidgetWithControl_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetWithControl",
	props: /* @__PURE__ */ mergeModels({
		widget: {},
		component: {}
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const ValueControlPopover = defineAsyncComponent(() => __vitePreload(() => import("./ValueControlPopover-CMkXeScT.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37]), import.meta.url));
		const props = __props;
		const modelValue = useModel(__props, "modelValue");
		const controlModel = ref(props.widget.controlWidget.value);
		const controlButtonIcon = computed(() => {
			switch (controlModel.value) {
				case "increment": return "pi pi-plus";
				case "decrement": return "pi pi-minus";
				case "fixed": return "icon-[lucide--pencil-off]";
				default: return "icon-[lucide--shuffle]";
			}
		});
		watch(controlModel, props.widget.controlWidget.update);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [(openBlock(), createBlock(resolveDynamicComponent(__props.component), mergeProps(_ctx.$attrs, {
				modelValue: modelValue.value,
				"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => modelValue.value = $event),
				widget: __props.widget
			}), {
				default: withCtx(() => [createVNode(Popover_default, null, {
					button: withCtx(() => [createVNode(Button_default, {
						variant: "textonly",
						size: "sm",
						class: "h-4 w-7 p-0 self-center rounded-xl bg-primary-background/30 hover:bg-primary-background-hover/30"
					}, {
						default: withCtx(() => [createBaseVNode("i", { class: normalizeClass(`${controlButtonIcon.value} text-primary-background text-xs w-full`) }, null, 2)]),
						_: 1
					})]),
					default: withCtx(() => [createVNode(unref(ValueControlPopover), {
						modelValue: controlModel.value,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => controlModel.value = $event)
					}, null, 8, ["modelValue"])]),
					_: 1
				})]),
				_: 1
			}, 16, ["modelValue", "widget"]))]);
		};
	}
});
export { WidgetWithControl_default as t };

//# sourceMappingURL=WidgetWithControl-BnMFmaxp.js.map