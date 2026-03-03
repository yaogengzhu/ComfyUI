import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-CNPGb1TW.js";
import "./vendor-firebase-DN8BxCYa.js";
import { q as nextTick } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-qJz1Z78N.js";
import "./useFeatureFlags-BlMvC2mV.js";
import "./vendor-reka-ui-jxMUDvZT.js";
import "./api-DArsZFwY.js";
import "./vendor-markdown-BPt2PdDp.js";
import "./colorUtil-BKg8i9Q6.js";
import "./i18n-syd3PJfQ.js";
import "./Button-D8fmNaXY.js";
import { ir as addWidget, jn as useExtensionService, nr as ComponentWidgetImpl } from "./dialogService-BUdss0z2.js";
import "./extensionStore-C8F8CzIg.js";
import "./userStore-D93A7Tj9.js";
import "./useErrorHandling-4WJW_EDk.js";
import "./huizhiAuthService-xKOJ1ACT.js";
import "./useExternalLink-tAAZu4wg.js";
import "./vendor-tiptap-C9679tdI.js";
import "./markdownRendererUtil-Q53IsTUL.js";
import "./Popover-bsCD7nil.js";
import "./vendor-three-C69yBO64.js";
import "./Load3DControls-DdfYYrr9.js";
import "./constants-ogISyp4e.js";
import "./Load3dViewerContent-BSaWzRzf.js";
import { t as Load3D_default } from "./Load3D-B4RJvKFz.js";
import "./AnimationControls-DDCMXKh4.js";
import { r as Load3dUtils, t as useLoad3dService } from "./load3dService-C-wGXqm_.js";
import "./useLoad3dViewer-MVcdvKOr.js";
import { n as useLoad3d } from "./useLoad3d-DwBXbctt.js";
import { n as createExportMenuItems, t as Load3DConfiguration } from "./Load3DConfiguration-D_LF19nA.js";
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

//# sourceMappingURL=saveMesh-DbKxgJkn.js.map