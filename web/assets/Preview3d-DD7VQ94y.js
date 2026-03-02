import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-BMWHeZll.js";
import "./vendor-firebase-DN8BxCYa.js";
import { A as createCommentVNode, I as createVNode, O as createBaseVNode, R as defineComponent, et as openBlock, ft as useTemplateRef, j as createElementBlock, k as createBlock, kt as ref, pt as watch } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-Cb4peHqA.js";
import "./useFeatureFlags-S1sG8YIk.js";
import "./vendor-reka-ui-jxMUDvZT.js";
import "./api-C6dyasG5.js";
import "./vendor-markdown-BPt2PdDp.js";
import "./colorUtil-CQE2D_f9.js";
import "./i18n-Dy4mrtIR.js";
import "./Button-D4w5_e9I.js";
import "./dialogService-B_z161HY.js";
import "./extensionStore-CZdQWzqz.js";
import "./userStore-BvkQCZf0.js";
import "./useErrorHandling-CX7OTxv3.js";
import "./useExternalLink-BDqUsXhK.js";
import "./vendor-tiptap-DTO2QA4Q.js";
import "./markdownRendererUtil-CrR6m0CH.js";
import "./Popover-oAJ3EQ_X.js";
import "./vendor-three-ueviNA60.js";
import { t as Load3DControls_default } from "./Load3DControls--CpMogbQ.js";
import { t as AnimationControls_default } from "./AnimationControls-C5xbxf66.js";
import "./load3dService-ioyt-r_v.js";
import { t as useLoad3dViewer } from "./useLoad3dViewer-CH8qWrRg.js";
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

//# sourceMappingURL=Preview3d-DD7VQ94y.js.map