const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./ValueControlPopover-BPqQ2WdR.js","./rolldown-runtime-DLICfi3-.js","./vendor-primevue-CN8WO3jr.js","./vendor-vue-core-tg-oZu4l.js","./teamWorkspaceStore-BPR4vJb-.js","./_plugin-vue_export-helper-CoBaw5e7.js","./vendor-other-BlwZz5NW.js","./vendor-firebase-DN8BxCYa.js","./vendor-three-C69yBO64.js","./vendor-tiptap-C9679tdI.js","./vendor-reka-ui-C_KZ-Z9x.js","./vendor-i18n-D6iZeZ7U.js","./vendor-vueuse-CnrwrmRD.js","./vendor-axios-C5af7X-l.js","./vendor-zod-CWPLeK_6.js","./extensionStore-DTHbvcUb.js","./vendor-markdown-DF7_n7Ki.js","./api-nREgj_HO.js","./vendor-yjs-BX4XEX0j.js","./i18n-B95gNu60.js","./widget-DTr1rh-S.js","./types-YYe-ycsK.js","./colorUtil-0jM4jJ4_.js","./src-CfBwFEGf.js","./Popover-Bju946nz.js","./Button-BXdh2GzZ.js","./SelectValue-CqVeSVLN.js","./useErrorHandling-Bo8s6znR.js","./useExternalLink-DXOke9aD.js","./envUtil-BB56f-md.js","./useFeatureFlags-kJeWJWfN.js","./VideoPlayOverlay-DXZwnuVe.js","./telemetry-BkGuQ88V.js","./huizhiAuthService-DRNED4sE.js","./userStore-BgTMUZFo.js","./widgetTypes-0MCr4N7Z.js","./markdownRendererUtil-rU1hBHFB.js","./vendor-other-DODGPXtn.css","./teamWorkspaceStore-BQOo2Utv.css"])))=>i.map(i=>d[i]);
import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { at as __vitePreload } from "./vendor-primevue-CN8WO3jr.js";
import { Bt as normalizeClass, D as computed, G as mergeModels, I as createVNode, K as mergeProps, L as defineAsyncComponent, O as createBaseVNode, R as defineComponent, Rt as unref, _t as withCtx, et as openBlock, j as createElementBlock, k as createBlock, kt as ref, ot as resolveDynamicComponent, pt as watch, ut as useModel } from "./vendor-vue-core-tg-oZu4l.js";
import { t as Button_default } from "./Button-BXdh2GzZ.js";
import { t as Popover_default } from "./Popover-Bju946nz.js";
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
		const ValueControlPopover = defineAsyncComponent(() => __vitePreload(() => import("./ValueControlPopover-BPqQ2WdR.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38]), import.meta.url));
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

//# sourceMappingURL=WidgetWithControl-EUqDIu0F.js.map