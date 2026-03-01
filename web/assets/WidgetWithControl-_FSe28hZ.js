const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./ValueControlPopover-ROdn1GrN.js","./rolldown-runtime-DLICfi3-.js","./vendor-primevue-DxYsW_Ng.js","./vendor-vue-core-tg-oZu4l.js","./vendor-other-C6-gqLl2.js","./vendor-firebase-DnyyBhvM.js","./vendor-three-LBLOE6BD.js","./vendor-tiptap-BnYkbQDM.js","./vendor-reka-ui--l_O1Shn.js","./vendor-markdown-DFo_IkzS.js","./extensionStore-CMMHyUyK.js","./api-CZwqvkO0.js","./vendor-axios-fUWS71Q_.js","./vendor-yjs-Bf1Aknzs.js","./vendor-zod-BzHOZx2o.js","./i18n-Dw0liyWq.js","./vendor-i18n-czJbbAfl.js","./widget-NeEr3XWN.js","./types-DT3N7am7.js","./colorUtil-CPODED-Q.js","./dialogService-B--1tJQn.js","./_plugin-vue_export-helper-DnHSq4Qt.js","./vendor-vueuse-Co_HrDSJ.js","./src-CaI548es.js","./Popover-DEsU7dja.js","./Button-DQNHabQW.js","./SelectValue-BLXW8uNP.js","./useErrorHandling-BtJEMIU5.js","./useExternalLink-BC_To13P.js","./envUtil-Clzmwvt4.js","./useFeatureFlags-D-_6c-wx.js","./VideoPlayOverlay-B8XMbqrh.js","./telemetry-zZf2dHJ2.js","./userStore-C5TzflO8.js","./widgetTypes-D8YBR9vN.js","./markdownRendererUtil-COLKL0Bq.js","./vendor-other-DODGPXtn.css","./dialogService-BQOo2Utv.css"])))=>i.map(i=>d[i]);
import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { ct as __vitePreload } from "./vendor-primevue-DxYsW_Ng.js";
import { Bt as normalizeClass, D as computed, G as mergeModels, I as createVNode, K as mergeProps, L as defineAsyncComponent, O as createBaseVNode, R as defineComponent, Rt as unref, _t as withCtx, et as openBlock, j as createElementBlock, k as createBlock, kt as ref, ot as resolveDynamicComponent, pt as watch, ut as useModel } from "./vendor-vue-core-tg-oZu4l.js";
import { t as Button_default } from "./Button-DQNHabQW.js";
import { t as Popover_default } from "./Popover-DEsU7dja.js";
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
		const ValueControlPopover = defineAsyncComponent(() => __vitePreload(() => import("./ValueControlPopover-ROdn1GrN.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37]), import.meta.url));
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

//# sourceMappingURL=WidgetWithControl-_FSe28hZ.js.map