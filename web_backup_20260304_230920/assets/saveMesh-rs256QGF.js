import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-CN8WO3jr.js";
import "./vendor-firebase-DN8BxCYa.js";
import { q as nextTick } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-BlwZz5NW.js";
import "./useFeatureFlags-BuKVU3gG.js";
import "./vendor-reka-ui-C_KZ-Z9x.js";
import "./api-p6hGo6pS.js";
import "./vendor-markdown-DF7_n7Ki.js";
import "./colorUtil-0jM4jJ4_.js";
import "./i18n-B95gNu60.js";
import "./userStore-CVXXciNs.js";
import "./huizhiAuthService-D-kJyr3e.js";
import { Pn as useExtensionService, ar as ComponentWidgetImpl, sr as addWidget } from "./teamWorkspaceStore-CrgYR715.js";
import "./Button-BXdh2GzZ.js";
import "./extensionStore-DiDsM3E0.js";
import "./useErrorHandling-B7U_HHbw.js";
import "./useExternalLink-DXOke9aD.js";
import "./vendor-tiptap-C9679tdI.js";
import "./markdownRendererUtil-rU1hBHFB.js";
import "./Popover-Bju946nz.js";
import "./vendor-three-C69yBO64.js";
import "./Load3DControls-D9jD07-u.js";
import "./constants-CobilG8q.js";
import "./Load3dViewerContent-Hu3ZpySF.js";
import { t as Load3D_default } from "./Load3D-BwGdovkU.js";
import "./AnimationControls-BY0og-vz.js";
import { r as Load3dUtils, t as useLoad3dService } from "./load3dService-DEPvRAak.js";
import "./useLoad3dViewer-CU3_z-EJ.js";
import { n as useLoad3d } from "./useLoad3d-Aan9lARs.js";
import { n as createExportMenuItems, t as Load3DConfiguration } from "./Load3DConfiguration-UzGNRdkC.js";
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

//# sourceMappingURL=saveMesh-rs256QGF.js.map