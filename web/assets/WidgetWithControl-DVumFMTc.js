const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./ValueControlPopover-C9iz8nvX.js","./rolldown-runtime-DLICfi3-.js","./vendor-primevue-BEjAYGWm.js","./vendor-vue-core-tg-oZu4l.js","./vendor-other-qJz1Z78N.js","./vendor-firebase-DN8BxCYa.js","./vendor-three-C69yBO64.js","./vendor-tiptap-C9679tdI.js","./vendor-reka-ui-C26MN8JS.js","./vendor-markdown-DF7_n7Ki.js","./extensionStore-DbCclKhl.js","./api-D2HJ3Cuk.js","./vendor-axios-C5af7X-l.js","./vendor-yjs-BX4XEX0j.js","./vendor-zod-CWPLeK_6.js","./i18n-Ce5inB5_.js","./vendor-i18n-D6iZeZ7U.js","./widget-DTr1rh-S.js","./types-YYe-ycsK.js","./colorUtil-CyOZxXkW.js","./teamWorkspaceStore-B1oHaZID.js","./_plugin-vue_export-helper-CoBaw5e7.js","./vendor-vueuse-CnrwrmRD.js","./src-CqWvSCI8.js","./Popover-DMhMBlU6.js","./Button-AKQyxeyD.js","./SelectValue-DlMdq0Ym.js","./useErrorHandling-C6LadziV.js","./useExternalLink-RgafkIwT.js","./envUtil-BB56f-md.js","./useFeatureFlags-B3RwD6hI.js","./VideoPlayOverlay-Cgac-4a_.js","./telemetry-BkGuQ88V.js","./huizhiAuthService-Mxdj0XpZ.js","./userStore-CgWi1Hiu.js","./widgetTypes-0MCr4N7Z.js","./markdownRendererUtil-rU1hBHFB.js","./vendor-other-DODGPXtn.css","./teamWorkspaceStore-BQOo2Utv.css"])))=>i.map(i=>d[i]);
import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { ct as __vitePreload } from "./vendor-primevue-BEjAYGWm.js";
import { Bt as normalizeClass, D as computed, G as mergeModels, I as createVNode, K as mergeProps, L as defineAsyncComponent, O as createBaseVNode, R as defineComponent, Rt as unref, _t as withCtx, et as openBlock, j as createElementBlock, k as createBlock, kt as ref, ot as resolveDynamicComponent, pt as watch, ut as useModel } from "./vendor-vue-core-tg-oZu4l.js";
import { t as Button_default } from "./Button-AKQyxeyD.js";
import { t as Popover_default } from "./Popover-DMhMBlU6.js";
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
		const ValueControlPopover = defineAsyncComponent(() => __vitePreload(() => import("./ValueControlPopover-C9iz8nvX.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38]), import.meta.url));
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

//# sourceMappingURL=WidgetWithControl-DVumFMTc.js.map