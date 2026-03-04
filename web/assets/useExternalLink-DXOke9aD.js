import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { D as computed } from "./vendor-vue-core-tg-oZu4l.js";
import { n as isDesktop } from "./types-YYe-ycsK.js";
import { n as i18n } from "./i18n-B95gNu60.js";
import { t as electronAPI } from "./envUtil-BB56f-md.js";
function useExternalLink() {
	const locale = computed(() => String(i18n.global.locale.value));
	const isChinese = computed(() => {
		return locale.value === "zh" || locale.value === "zh-TW";
	});
	const platform = computed(() => {
		if (!isDesktop) return null;
		return electronAPI().getPlatform() === "darwin" ? "macos" : "windows";
	});
	const buildDocsUrl = (path, options = {}) => {
		const { includeLocale = false, platform: includePlatform = false } = options;
		let url = "https://docs.comfy.org";
		if (includeLocale && isChinese.value) url += "/zh-CN";
		const normalizedPath = path.startsWith("/") ? path : `/${path}`;
		url += normalizedPath;
		if (includePlatform && platform.value) {
			url = url.endsWith("/") ? url : `${url}/`;
			url += platform.value;
		}
		return url;
	};
	return {
		buildDocsUrl,
		staticUrls: {
			discord: "https://www.comfy.org/discord",
			github: "https://github.com/comfyanonymous/ComfyUI",
			githubIssues: "https://github.com/comfyanonymous/ComfyUI/issues",
			githubFrontend: "https://github.com/Comfy-Org/ComfyUI_frontend",
			githubElectron: "https://github.com/Comfy-Org/electron",
			forum: "https://forum.comfy.org/",
			comfyOrg: "https://www.comfy.org/"
		},
		docsPaths: { partnerNodesPricing: "/tutorials/partner-nodes/pricing" }
	};
}
export { useExternalLink as t };

//# sourceMappingURL=useExternalLink-DXOke9aD.js.map