import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-BMWHeZll.js";
import "./vendor-firebase-DN8BxCYa.js";
import { q as nextTick } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-Cb4peHqA.js";
import "./useFeatureFlags-S1sG8YIk.js";
import "./vendor-reka-ui-jxMUDvZT.js";
import "./api-C6dyasG5.js";
import "./vendor-markdown-BPt2PdDp.js";
import "./colorUtil-CQE2D_f9.js";
import "./i18n-Dy4mrtIR.js";
import "./Button-D4w5_e9I.js";
import { ir as addWidget, jn as useExtensionService, nr as ComponentWidgetImpl } from "./dialogService-B_z161HY.js";
import "./extensionStore-CZdQWzqz.js";
import "./userStore-BvkQCZf0.js";
import "./useErrorHandling-CX7OTxv3.js";
import "./useExternalLink-BDqUsXhK.js";
import "./vendor-tiptap-DTO2QA4Q.js";
import "./markdownRendererUtil-CrR6m0CH.js";
import "./Popover-oAJ3EQ_X.js";
import "./vendor-three-ueviNA60.js";
import "./Load3DControls--CpMogbQ.js";
import "./constants-CobilG8q.js";
import "./Load3dViewerContent-DiVdMu5p.js";
import { t as Load3D_default } from "./Load3D-DwpdLRqA.js";
import "./AnimationControls-C5xbxf66.js";
import { r as Load3dUtils, t as useLoad3dService } from "./load3dService-ioyt-r_v.js";
import "./useLoad3dViewer-CH8qWrRg.js";
import { n as useLoad3d } from "./useLoad3d-DR7KRstH.js";
import { n as createExportMenuItems, t as Load3DConfiguration } from "./Load3DConfiguration-DVVMrcbC.js";
var inputSpec = {
	name: "image",
	type: "Preview3D",
	isPreview: true
};
useExtensionService().registerExtension({
	name: "Comfy.SaveGLB",
	async beforeRegisterNodeDef(_nodeType, nodeData) {
		if ("SaveGLB" === nodeData.name) nodeData.input.required.image = ["PREVIEW_3D"];
	},
	getCustomWidgets() {
		return { PREVIEW_3D(node) {
			const widget = new ComponentWidgetImpl({
				node,
				name: inputSpec.name,
				component: Load3D_default,
				inputSpec,
				options: {}
			});
			widget.type = "load3D";
			addWidget(node, widget);
			return { widget };
		} };
	},
	getNodeMenuItems(node) {
		if (node.constructor.comfyClass !== "SaveGLB") return [];
		const load3d = useLoad3dService().getLoad3d(node);
		if (!load3d) return [];
		if (load3d.isSplatModel()) return [];
		return createExportMenuItems(load3d);
	},
	async nodeCreated(node) {
		if (node.constructor.comfyClass !== "SaveGLB") return;
		const [oldWidth, oldHeight] = node.size;
		node.setSize([Math.max(oldWidth, 400), Math.max(oldHeight, 550)]);
		await nextTick();
		const onExecuted = node.onExecuted;
		node.onExecuted = function(output) {
			onExecuted?.call(this, output);
			const fileInfo = output["3d"]?.[0];
			if (!fileInfo) return;
			useLoad3d(node).waitForLoad3d((load3d) => {
				const modelWidget = node.widgets?.find((w) => w.name === "image");
				if (load3d && modelWidget) {
					const filePath = (fileInfo.subfolder ?? "") + "/" + (fileInfo.filename ?? "");
					modelWidget.value = filePath;
					const config = new Load3DConfiguration(load3d, node.properties);
					const loadFolder = fileInfo.type;
					const onModelLoaded = () => {
						load3d.removeEventListener("modelLoadingEnd", onModelLoaded);
						Load3dUtils.generateThumbnailIfNeeded(load3d, filePath, loadFolder);
					};
					load3d.addEventListener("modelLoadingEnd", onModelLoaded);
					config.configureForSaveMesh(loadFolder, filePath);
				}
			});
		};
	}
});

//# sourceMappingURL=saveMesh-BgfOSMME.js.map