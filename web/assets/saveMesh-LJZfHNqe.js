import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-DxYsW_Ng.js";
import "./vendor-firebase-DnyyBhvM.js";
import { q as nextTick } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-C6-gqLl2.js";
import "./useFeatureFlags-D8PCe3j0.js";
import "./vendor-reka-ui--l_O1Shn.js";
import "./api-C6l3jfo9.js";
import "./vendor-markdown-DFo_IkzS.js";
import "./colorUtil-CPODED-Q.js";
import "./i18n-Dw0liyWq.js";
import "./Button-DQNHabQW.js";
import { ir as addWidget, jn as useExtensionService, nr as ComponentWidgetImpl } from "./dialogService-CwDBFHIT.js";
import "./extensionStore-BygwWgzY.js";
import "./userStore-nuah1-5i.js";
import "./useErrorHandling-XEUYiWQB.js";
import "./useExternalLink-BC_To13P.js";
import "./vendor-tiptap-BnYkbQDM.js";
import "./markdownRendererUtil-COLKL0Bq.js";
import "./Popover-DEsU7dja.js";
import "./vendor-three-LBLOE6BD.js";
import "./Load3DControls-7k1BC76P.js";
import "./constants-htt0vt7m.js";
import "./Load3dViewerContent-aB-DjBxJ.js";
import { t as Load3D_default } from "./Load3D-DAzYyDqg.js";
import "./AnimationControls-CGc2lEY7.js";
import { r as Load3dUtils, t as useLoad3dService } from "./load3dService-DReOEBuP.js";
import "./useLoad3dViewer-B-0-a2bz.js";
import { n as useLoad3d } from "./useLoad3d-D6LEI6KH.js";
import { n as createExportMenuItems, t as Load3DConfiguration } from "./Load3DConfiguration-BZMYLpeC.js";
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

//# sourceMappingURL=saveMesh-LJZfHNqe.js.map