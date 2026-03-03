import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { Nt as toRaw, kt as ref, pt as watch } from "./vendor-vue-core-tg-oZu4l.js";
import { It as useToastStore, r as api } from "./api-DArsZFwY.js";
import { o as t } from "./i18n-syd3PJfQ.js";
import { n as Load3d, r as Load3dUtils, t as useLoad3dService } from "./load3dService-C-wGXqm_.js";
const useLoad3dViewer = (node) => {
	const backgroundColor = ref("");
	const showGrid = ref(true);
	const cameraType = ref("perspective");
	const fov = ref(75);
	const lightIntensity = ref(1);
	const backgroundImage = ref("");
	const hasBackgroundImage = ref(false);
	const backgroundRenderMode = ref("tiled");
	const upDirection = ref("original");
	const materialMode = ref("original");
	const needApplyChanges = ref(true);
	const isPreview = ref(false);
	const isStandaloneMode = ref(false);
	const isSplatModel = ref(false);
	const isPlyModel = ref(false);
	const animations = ref([]);
	const playing = ref(false);
	const selectedSpeed = ref(1);
	const selectedAnimation = ref(0);
	const animationProgress = ref(0);
	const animationDuration = ref(0);
	let load3d = null;
	let sourceLoad3d = null;
	const initialState = ref({
		backgroundColor: "#282828",
		showGrid: true,
		cameraType: "perspective",
		fov: 75,
		lightIntensity: 1,
		cameraState: null,
		backgroundImage: "",
		backgroundRenderMode: "tiled",
		upDirection: "original",
		materialMode: "original"
	});
	watch(backgroundColor, (newColor) => {
		if (!load3d) return;
		try {
			load3d.setBackgroundColor(newColor);
		} catch (error) {
			console.error("Error updating background color:", error);
			useToastStore().addAlert(t("toastMessages.failedToUpdateBackgroundColor", { color: newColor }));
		}
	});
	watch(showGrid, (newValue) => {
		if (!load3d) return;
		try {
			load3d.toggleGrid(newValue);
		} catch (error) {
			console.error("Error toggling grid:", error);
			useToastStore().addAlert(t("toastMessages.failedToToggleGrid", { show: newValue ? "on" : "off" }));
		}
	});
	watch(cameraType, (newCameraType) => {
		if (!load3d) return;
		try {
			load3d.toggleCamera(newCameraType);
		} catch (error) {
			console.error("Error toggling camera:", error);
			useToastStore().addAlert(t("toastMessages.failedToToggleCamera", { camera: newCameraType }));
		}
	});
	watch(fov, (newFov) => {
		if (!load3d) return;
		try {
			load3d.setFOV(Number(newFov));
		} catch (error) {
			console.error("Error updating FOV:", error);
			useToastStore().addAlert(t("toastMessages.failedToUpdateFOV", { fov: newFov }));
		}
	});
	watch(lightIntensity, (newValue) => {
		if (!load3d) return;
		try {
			load3d.setLightIntensity(Number(newValue));
		} catch (error) {
			console.error("Error updating light intensity:", error);
			useToastStore().addAlert(t("toastMessages.failedToUpdateLightIntensity", { intensity: newValue }));
		}
	});
	watch(backgroundImage, async (newValue) => {
		if (!load3d) return;
		try {
			await load3d.setBackgroundImage(newValue);
			hasBackgroundImage.value = !!newValue;
		} catch (error) {
			console.error("Error updating background image:", error);
			useToastStore().addAlert(t("toastMessages.failedToUpdateBackgroundImage"));
		}
	});
	watch(backgroundRenderMode, (newValue) => {
		if (!load3d) return;
		try {
			load3d.setBackgroundRenderMode(newValue);
		} catch (error) {
			console.error("Error updating background render mode:", error);
			useToastStore().addAlert(t("toastMessages.failedToUpdateBackgroundRenderMode", { mode: newValue }));
		}
	});
	watch(upDirection, (newValue) => {
		if (!load3d) return;
		try {
			load3d.setUpDirection(newValue);
		} catch (error) {
			console.error("Error updating up direction:", error);
			useToastStore().addAlert(t("toastMessages.failedToUpdateUpDirection", { direction: newValue }));
		}
	});
	watch(materialMode, (newValue) => {
		if (!load3d) return;
		try {
			load3d.setMaterialMode(newValue);
		} catch (error) {
			console.error("Error updating material mode:", error);
			useToastStore().addAlert(t("toastMessages.failedToUpdateMaterialMode", { mode: newValue }));
		}
	});
	watch(playing, (newValue) => {
		if (load3d) load3d.toggleAnimation(newValue);
	});
	watch(selectedSpeed, (newValue) => {
		if (load3d && newValue) load3d.setAnimationSpeed(newValue);
	});
	watch(selectedAnimation, (newValue) => {
		if (load3d && newValue !== void 0) load3d.updateSelectedAnimation(newValue);
	});
	const handleSeek = (progress) => {
		if (load3d && animationDuration.value > 0) {
			const time = progress / 100 * animationDuration.value;
			load3d.setAnimationTime(time);
		}
	};
	const setupAnimationEvents = () => {
		if (!load3d) return;
		load3d.addEventListener("animationListChange", (newValue) => {
			animations.value = newValue;
		});
		load3d.addEventListener("animationProgressChange", (data) => {
			animationProgress.value = data.progress;
			animationDuration.value = data.duration;
		});
		if (load3d.hasAnimations()) {
			animations.value = load3d.animationManager.animationClips.map((clip, index) => ({
				name: clip.name || `Animation ${index + 1}`,
				index
			}));
			animationDuration.value = load3d.getAnimationDuration();
		}
	};
	const initializeViewer = async (containerRef, source) => {
		if (!containerRef || !node) return;
		sourceLoad3d = source;
		try {
			const width = node.widgets?.find((w) => w.name === "width");
			const height = node.widgets?.find((w) => w.name === "height");
			const hasTargetDimensions = !!(width && height);
			load3d = new Load3d(containerRef, {
				width: width ? toRaw(width).value : void 0,
				height: height ? toRaw(height).value : void 0,
				getDimensions: hasTargetDimensions ? () => ({
					width: width.value,
					height: height.value
				}) : void 0,
				isViewerMode: hasTargetDimensions
			});
			await useLoad3dService().copyLoad3dState(source, load3d);
			const sourceCameraState = source.getCameraState();
			const sceneConfig = node.properties["Scene Config"];
			const modelConfig = node.properties["Model Config"];
			const cameraConfig = node.properties["Camera Config"];
			const lightConfig = node.properties["Light Config"];
			isPreview.value = node.type === "Preview3D";
			if (sceneConfig) {
				backgroundColor.value = sceneConfig.backgroundColor || source.sceneManager.currentBackgroundColor;
				showGrid.value = sceneConfig.showGrid ?? source.sceneManager.gridHelper.visible;
				backgroundRenderMode.value = sceneConfig.backgroundRenderMode || source.sceneManager.backgroundRenderMode || "tiled";
				if (source.sceneManager.getCurrentBackgroundInfo().type === "image" && sceneConfig.backgroundImage) {
					backgroundImage.value = sceneConfig.backgroundImage;
					hasBackgroundImage.value = true;
				} else {
					backgroundImage.value = "";
					hasBackgroundImage.value = false;
				}
			}
			if (cameraConfig) {
				cameraType.value = cameraConfig.cameraType || source.getCurrentCameraType();
				fov.value = cameraConfig.fov || source.cameraManager.perspectiveCamera.fov;
			}
			if (lightConfig) lightIntensity.value = lightConfig.intensity || 1;
			else lightIntensity.value = 1;
			if (modelConfig) {
				upDirection.value = modelConfig.upDirection || source.modelManager.currentUpDirection;
				materialMode.value = modelConfig.materialMode || source.modelManager.materialMode;
			}
			isSplatModel.value = source.isSplatModel();
			isPlyModel.value = source.isPlyModel();
			initialState.value = {
				backgroundColor: backgroundColor.value,
				showGrid: showGrid.value,
				cameraType: cameraType.value,
				fov: fov.value,
				lightIntensity: lightIntensity.value,
				cameraState: sourceCameraState,
				backgroundImage: backgroundImage.value,
				backgroundRenderMode: backgroundRenderMode.value,
				upDirection: upDirection.value,
				materialMode: materialMode.value
			};
			setupAnimationEvents();
		} catch (error) {
			console.error("Error initializing Load3d viewer:", error);
			useToastStore().addAlert(t("toastMessages.failedToInitializeLoad3dViewer"));
		}
	};
	const initializeStandaloneViewer = async (containerRef, modelUrl) => {
		if (!containerRef) return;
		try {
			isStandaloneMode.value = true;
			load3d = new Load3d(containerRef, {
				width: 800,
				height: 600,
				isViewerMode: true
			});
			await load3d.loadModel(modelUrl);
			backgroundColor.value = "#282828";
			showGrid.value = true;
			cameraType.value = "perspective";
			fov.value = 75;
			lightIntensity.value = 1;
			backgroundRenderMode.value = "tiled";
			upDirection.value = "original";
			materialMode.value = "original";
			isSplatModel.value = load3d.isSplatModel();
			isPlyModel.value = load3d.isPlyModel();
			isPreview.value = true;
			setupAnimationEvents();
		} catch (error) {
			console.error("Error initializing standalone 3D viewer:", error);
			useToastStore().addAlert("Failed to load 3D model");
		}
	};
	const exportModel = async (format) => {
		if (!load3d) return;
		try {
			await load3d.exportModel(format);
		} catch (error) {
			console.error("Error exporting model:", error);
			useToastStore().addAlert(t("toastMessages.failedToExportModel", { format: format.toUpperCase() }));
		}
	};
	const handleResize = () => {
		load3d?.handleResize();
	};
	const handleMouseEnter = () => {
		load3d?.updateStatusMouseOnViewer(true);
	};
	const handleMouseLeave = () => {
		load3d?.updateStatusMouseOnViewer(false);
	};
	const restoreInitialState = () => {
		if (!node) return;
		const nodeValue = node;
		needApplyChanges.value = false;
		if (nodeValue.properties) {
			nodeValue.properties["Scene Config"] = {
				showGrid: initialState.value.showGrid,
				backgroundColor: initialState.value.backgroundColor,
				backgroundImage: initialState.value.backgroundImage,
				backgroundRenderMode: initialState.value.backgroundRenderMode
			};
			nodeValue.properties["Camera Config"] = {
				cameraType: initialState.value.cameraType,
				fov: initialState.value.fov
			};
			nodeValue.properties["Light Config"] = { intensity: initialState.value.lightIntensity };
			nodeValue.properties["Model Config"] = {
				upDirection: initialState.value.upDirection,
				materialMode: initialState.value.materialMode
			};
			const currentCameraConfig = nodeValue.properties["Camera Config"];
			nodeValue.properties["Camera Config"] = {
				...currentCameraConfig,
				state: initialState.value.cameraState
			};
		}
	};
	const applyChanges = async () => {
		if (!node || !sourceLoad3d || !load3d) return false;
		const viewerCameraState = load3d.getCameraState();
		const nodeValue = node;
		if (nodeValue.properties) {
			nodeValue.properties["Scene Config"] = {
				showGrid: showGrid.value,
				backgroundColor: backgroundColor.value,
				backgroundImage: backgroundImage.value,
				backgroundRenderMode: backgroundRenderMode.value
			};
			nodeValue.properties["Camera Config"] = {
				cameraType: cameraType.value,
				fov: fov.value,
				state: viewerCameraState
			};
			nodeValue.properties["Light Config"] = { intensity: lightIntensity.value };
			nodeValue.properties["Model Config"] = {
				upDirection: upDirection.value,
				materialMode: materialMode.value
			};
		}
		await useLoad3dService().copyLoad3dState(load3d, sourceLoad3d);
		await sourceLoad3d.setBackgroundImage(backgroundImage.value);
		sourceLoad3d.setBackgroundRenderMode(backgroundRenderMode.value);
		sourceLoad3d.forceRender();
		if (nodeValue.graph) nodeValue.graph.setDirtyCanvas(true, true);
		return true;
	};
	const refreshViewport = () => {
		useLoad3dService().handleViewportRefresh(load3d);
	};
	const handleBackgroundImageUpdate = async (file) => {
		if (!file) {
			backgroundImage.value = "";
			hasBackgroundImage.value = false;
			return;
		}
		if (!node) return;
		try {
			const resourceFolder = node.properties["Resource Folder"] || "";
			const subfolder = resourceFolder.trim() ? `3d/${resourceFolder.trim()}` : "3d";
			const uploadPath = await Load3dUtils.uploadFile(file, subfolder);
			if (uploadPath) {
				backgroundImage.value = uploadPath;
				hasBackgroundImage.value = true;
			}
		} catch (error) {
			console.error("Error uploading background image:", error);
			useToastStore().addAlert(t("toastMessages.failedToUploadBackgroundImage"));
		}
	};
	const handleModelDrop = async (file) => {
		if (!load3d) {
			useToastStore().addAlert(t("toastMessages.no3dScene"));
			return;
		}
		if (!node) return;
		try {
			const resourceFolder = node.properties["Resource Folder"] || "";
			const subfolder = resourceFolder.trim() ? `3d/${resourceFolder.trim()}` : "3d";
			const uploadedPath = await Load3dUtils.uploadFile(file, subfolder);
			if (!uploadedPath) {
				useToastStore().addAlert(t("toastMessages.fileUploadFailed"));
				return;
			}
			const modelUrl = api.apiURL(Load3dUtils.getResourceURL(...Load3dUtils.splitFilePath(uploadedPath), "input"));
			await load3d.loadModel(modelUrl);
			const modelWidget = node.widgets?.find((w) => w.name === "model_file");
			if (modelWidget) {
				const options = modelWidget.options;
				if (options?.values && !options.values.includes(uploadedPath)) options.values.push(uploadedPath);
				modelWidget.value = uploadedPath;
			}
		} catch (error) {
			console.error("Model drop failed:", error);
			useToastStore().addAlert(t("toastMessages.failedToLoadModel"));
		}
	};
	const cleanup = () => {
		load3d?.remove();
		load3d = null;
		sourceLoad3d = null;
	};
	return {
		backgroundColor,
		showGrid,
		cameraType,
		fov,
		lightIntensity,
		backgroundImage,
		hasBackgroundImage,
		backgroundRenderMode,
		upDirection,
		materialMode,
		needApplyChanges,
		isPreview,
		isStandaloneMode,
		isSplatModel,
		isPlyModel,
		animations,
		playing,
		selectedSpeed,
		selectedAnimation,
		animationProgress,
		animationDuration,
		initializeViewer,
		initializeStandaloneViewer,
		exportModel,
		handleResize,
		handleMouseEnter,
		handleMouseLeave,
		restoreInitialState,
		applyChanges,
		refreshViewport,
		handleBackgroundImageUpdate,
		handleModelDrop,
		handleSeek,
		cleanup,
		hasSkeleton: false,
		intensity: lightIntensity,
		showSkeleton: false
	};
};
export { useLoad3dViewer as t };

//# sourceMappingURL=useLoad3dViewer-MVcdvKOr.js.map