const SUPPORTED_EXTENSIONS = new Set([
	".gltf",
	".glb",
	".obj",
	".fbx",
	".stl",
	".spz",
	".splat",
	".ply",
	".ksplat"
]);
const SUPPORTED_EXTENSIONS_ACCEPT = [...SUPPORTED_EXTENSIONS].join(",");
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.constants = window.comfyAPI.constants || {};
window.comfyAPI.constants.SUPPORTED_EXTENSIONS = SUPPORTED_EXTENSIONS;
window.comfyAPI.constants.SUPPORTED_EXTENSIONS_ACCEPT = SUPPORTED_EXTENSIONS_ACCEPT;
export { SUPPORTED_EXTENSIONS_ACCEPT as n, SUPPORTED_EXTENSIONS as t };

//# sourceMappingURL=constants-htt0vt7m.js.map