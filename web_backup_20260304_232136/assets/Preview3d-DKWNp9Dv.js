import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-CN8WO3jr.js";
import "./vendor-firebase-DN8BxCYa.js";
import { A as createCommentVNode, I as createVNode, O as createBaseVNode, R as defineComponent, et as openBlock, ft as useTemplateRef, j as createElementBlock, k as createBlock, kt as ref, pt as watch } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-BlwZz5NW.js";
import "./useFeatureFlags-BuKVU3gG.js";
import "./vendor-reka-ui-C_KZ-Z9x.js";
import "./api-p6hGo6pS.js";
import "./vendor-markdown-DF7_n7Ki.js";
import "./colorUtil-0jM4jJ4_.js";
import "./i18n-B95gNu60.js";
import "./userStore-CVXXciNs.js";
import "./huizhiAuthService-D-kJyr3e.js";
import "./teamWorkspaceStore-CrgYR715.js";
import "./Button-BXdh2GzZ.js";
import "./extensionStore-DiDsM3E0.js";
import "./useErrorHandling-B7U_HHbw.js";
import "./useExternalLink-DXOke9aD.js";
import "./vendor-tiptap-C9679tdI.js";
import "./markdownRendererUtil-rU1hBHFB.js";
import "./Popover-Bju946nz.js";
import "./vendor-three-C69yBO64.js";
import { t as Load3DControls_default } from "./Load3DControls-D9jD07-u.js";
import { t as AnimationControls_default } from "./AnimationControls-BY0og-vz.js";
import "./load3dService-DEPvRAak.js";
import { t as useLoad3dViewer } from "./useLoad3dViewer-CU3_z-EJ.js";
var _hoisted_1 = { class: "pointer-events-none absolute top-0 left-0 size-full" };
var Preview3d_default = /* @__PURE__ */ defineComponent({
	__name: "Preview3d",
	props: { modelUrl: {} },
	setup(__props) {
		const containerRef = useTemplateRef("containerRef");
		const viewer = ref(useLoad3dViewer());
		watch([containerRef, () => __props.modelUrl], async () => {
			if (!containerRef.value || !__props.modelUrl) return;
			await viewer.value.initializeStandaloneViewer(containerRef.value, __props.modelUrl);
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "containerRef",
				ref: containerRef,
				class: "relative w-full h-full",
				onMouseenter: _cache[10] || (_cache[10] = (...args) => viewer.value.handleMouseEnter && viewer.value.handleMouseEnter(...args)),
				onMouseleave: _cache[11] || (_cache[11] = (...args) => viewer.value.handleMouseLeave && viewer.value.handleMouseLeave(...args)),
				onResize: _cache[12] || (_cache[12] = (...args) => viewer.value.handleResize && viewer.value.handleResize(...args))
			}, [createBaseVNode("div", _hoisted_1, [createVNode(Load3DControls_default, {
				"scene-config": viewer.value,
				"onUpdate:sceneConfig": _cache[0] || (_cache[0] = ($event) => viewer.value = $event),
				"model-config": viewer.value,
				"onUpdate:modelConfig": _cache[1] || (_cache[1] = ($event) => viewer.value = $event),
				"camera-config": viewer.value,
				"onUpdate:cameraConfig": _cache[2] || (_cache[2] = ($event) => viewer.value = $event),
				"light-config": viewer.value,
				"onUpdate:lightConfig": _cache[3] || (_cache[3] = ($event) => viewer.value = $event),
				"is-splat-model": viewer.value.isSplatModel,
				"is-ply-model": viewer.value.isPlyModel,
				"has-skeleton": viewer.value.hasSkeleton,
				onUpdateBackgroundImage: viewer.value.handleBackgroundImageUpdate,
				onExportModel: viewer.value.exportModel
			}, null, 8, [
				"scene-config",
				"model-config",
				"camera-config",
				"light-config",
				"is-splat-model",
				"is-ply-model",
				"has-skeleton",
				"onUpdateBackgroundImage",
				"onExportModel"
			]), viewer.value.animations && viewer.value.animations.length > 0 ? (openBlock(), createBlock(AnimationControls_default, {
				key: 0,
				animations: viewer.value.animations,
				"onUpdate:animations": _cache[4] || (_cache[4] = ($event) => viewer.value.animations = $event),
				playing: viewer.value.playing,
				"onUpdate:playing": _cache[5] || (_cache[5] = ($event) => viewer.value.playing = $event),
				"selected-speed": viewer.value.selectedSpeed,
				"onUpdate:selectedSpeed": _cache[6] || (_cache[6] = ($event) => viewer.value.selectedSpeed = $event),
				"selected-animation": viewer.value.selectedAnimation,
				"onUpdate:selectedAnimation": _cache[7] || (_cache[7] = ($event) => viewer.value.selectedAnimation = $event),
				"animation-progress": viewer.value.animationProgress,
				"onUpdate:animationProgress": _cache[8] || (_cache[8] = ($event) => viewer.value.animationProgress = $event),
				"animation-duration": viewer.value.animationDuration,
				"onUpdate:animationDuration": _cache[9] || (_cache[9] = ($event) => viewer.value.animationDuration = $event),
				onSeek: viewer.value.handleSeek
			}, null, 8, [
				"animations",
				"playing",
				"selected-speed",
				"selected-animation",
				"animation-progress",
				"animation-duration",
				"onSeek"
			])) : createCommentVNode("", true)])], 544);
		};
	}
});
export { Preview3d_default as default };

//# sourceMappingURL=Preview3d-DKWNp9Dv.js.map