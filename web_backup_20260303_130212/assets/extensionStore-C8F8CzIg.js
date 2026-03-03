import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { D as computed, c as defineStore, kt as ref, wt as markRaw } from "./vendor-vue-core-tg-oZu4l.js";
import { n as isDesktop, t as isCloud } from "./types-YYe-ycsK.js";
import { _t as useAsyncState } from "./vendor-reka-ui-jxMUDvZT.js";
import { r as api } from "./api-DArsZFwY.js";
import { r as purify } from "./vendor-markdown-BPt2PdDp.js";
function appendJsonExt(path) {
	if (!path.toLowerCase().endsWith(".json")) path += ".json";
	return path;
}
function highlightQuery(text, query, sanitize = true) {
	if (!query) return text;
	if (sanitize) text = purify.sanitize(text);
	const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const regex = new RegExp(`(${escapedQuery})`, "gi");
	return text.replace(regex, "<span class=\"highlight\">$1</span>");
}
function formatNumberWithSuffix(num, { precision = 1, roundToInt = false } = {}) {
	const suffixes = [
		"",
		"k",
		"m",
		"b",
		"t"
	];
	const absNum = Math.abs(num);
	if (absNum < 1e3) return roundToInt ? Math.round(num).toString() : num.toFixed(precision);
	const exp = Math.min(Math.floor(Math.log10(absNum) / 3), suffixes.length - 1);
	return `${(num / Math.pow(1e3, exp)).toFixed(precision)}${suffixes[exp]}`;
}
function formatSize(value) {
	if (value === null || value === void 0) return "-";
	const bytes = value;
	if (bytes === 0) return "0 B";
	const k = 1024;
	const sizes = [
		"B",
		"KB",
		"MB",
		"GB"
	];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
function formatCommitHash(value) {
	if (/^[a-f0-9]{40}$/i.test(value)) return value.slice(0, 7);
	return value;
}
function getFilenameDetails(fullFilename) {
	if (fullFilename.includes(".")) return {
		filename: fullFilename.split(".").slice(0, -1).join("."),
		suffix: fullFilename.split(".").pop() ?? null
	};
	else return {
		filename: fullFilename,
		suffix: null
	};
}
function getPathDetails(path) {
	const directory = path.split("/").slice(0, -1).join("/");
	const fullFilename = path.split("/").pop() ?? path;
	return {
		directory,
		fullFilename,
		...getFilenameDetails(fullFilename)
	};
}
function normalizeI18nKey(key) {
	return typeof key === "string" ? key.replace(/\./g, "_") : "";
}
function processDynamicPrompt(input) {
	function stripComments(str) {
		return str.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");
	}
	let i = 0;
	let result = "";
	input = stripComments(input);
	const handleEscape = () => {
		return "\\" + input[i++];
	};
	function parseChoiceBlock() {
		const options = [];
		let choice = "";
		let depth = 0;
		while (i < input.length) {
			const char = input[i++];
			if (char === "\\") {
				choice += handleEscape();
				continue;
			} else if (char === "{") depth++;
			else if (char === "}") {
				if (!depth) break;
				depth--;
			} else if (char === "|") {
				if (!depth) {
					options.push(choice);
					choice = "";
					continue;
				}
			}
			choice += char;
		}
		options.push(choice);
		const chosenOption = options[Math.floor(Math.random() * options.length)];
		return processDynamicPrompt(chosenOption);
	}
	while (i < input.length) {
		const char = input[i++];
		if (char === "\\") result += handleEscape();
		else if (char === "{") result += parseChoiceBlock();
		else result += char;
	}
	return result.replace(/\\([{}|])/g, "$1");
}
function isValidUrl(url) {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
}
function parseFilePath(filepath) {
	if (!filepath?.trim()) return {
		filename: "",
		subfolder: ""
	};
	const normalizedPath = filepath.replace(/[\\/]+/g, "/").replace(/^\//, "").replace(/\/$/, "");
	const lastSlashIndex = normalizedPath.lastIndexOf("/");
	if (lastSlashIndex === -1) return {
		filename: normalizedPath,
		subfolder: ""
	};
	return {
		filename: normalizedPath.slice(lastSlashIndex + 1),
		subfolder: normalizedPath.slice(0, lastSlashIndex)
	};
}
var parts = {
	d: (d) => d.getDate(),
	M: (d) => d.getMonth() + 1,
	h: (d) => d.getHours(),
	m: (d) => d.getMinutes(),
	s: (d) => d.getSeconds()
};
var format = Object.keys(parts).map((k) => k + k + "?").join("|") + "|yyy?y?";
function formatDate(text, date) {
	return text.replace(new RegExp(format, "g"), (text) => {
		if (text === "yy") return (date.getFullYear() + "").substring(2);
		if (text === "yyyy") return date.getFullYear().toString();
		if (text[0] in parts) return (parts[text[0]](date) + "").padStart(text.length, "0");
		return text;
	});
}
const paramsToCacheKey = (params) => {
	if (typeof params === "string") return params;
	if (typeof params === "object" && params !== null) return Object.keys(params).sort((a, b) => a.localeCompare(b)).map((key) => `${key}:${params[key]}`).join("&");
	return String(params);
};
const generateUUID = () => {
	if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = Math.random() * 16 | 0;
		return (c === "x" ? r : r & 3 | 8).toString(16);
	});
};
function formatMetronomeCurrency(amount, currency) {
	if (currency === "usd") return (amount / 100).toFixed(2);
	return amount.toString();
}
function usdToMicros(usd) {
	return Math.round(usd * 1e6);
}
function linkifyHtml(text) {
	if (!text) return "";
	return text.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%?=~_|])|(\bwww\.[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%?=~_|])/gi, (_match, p1, _p2, p3) => {
		const url = p1 || p3;
		return `<a href="${p3 ? `http://${url}` : url}" target="_blank" rel="noopener noreferrer" class="text-primary-400 hover:underline">${url}</a>`;
	});
}
function nl2br(text) {
	if (!text) return "";
	return text.replace(/\n/g, "<br />");
}
function formatVersionAnchor(version) {
	return `v${version.replace(/\./g, "-")}`;
}
function stringToLocale(locale) {
	return [
		"en",
		"es",
		"fr",
		"ja",
		"ko",
		"ru",
		"zh"
	].includes(locale) ? locale : "en";
}
function formatDuration(milliseconds) {
	if (!milliseconds || milliseconds < 0) return "0s";
	const totalSeconds = Math.floor(milliseconds / 1e3);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor(totalSeconds % 3600 / 60);
	const remainingSeconds = Math.floor(totalSeconds % 60);
	const parts = [];
	if (hours > 0) parts.push(`${hours}h`);
	if (minutes > 0) parts.push(`${minutes}m`);
	if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`);
	return parts.join(" ");
}
var IMAGE_EXTENSIONS = [
	"png",
	"jpg",
	"jpeg",
	"gif",
	"webp",
	"bmp",
	"avif",
	"tif",
	"tiff"
];
var VIDEO_EXTENSIONS = [
	"mp4",
	"webm",
	"mov",
	"avi"
];
var AUDIO_EXTENSIONS = [
	"mp3",
	"wav",
	"ogg",
	"flac"
];
var THREE_D_EXTENSIONS = [
	"obj",
	"fbx",
	"gltf",
	"glb",
	"usdz"
];
var TEXT_EXTENSIONS = [
	"txt",
	"md",
	"markdown",
	"json",
	"csv",
	"yaml",
	"yml",
	"xml",
	"log"
];
function truncateFilename(filename, maxLength = 20) {
	if (!filename || filename.length <= maxLength) return filename;
	const lastDotIndex = filename.lastIndexOf(".");
	const nameWithoutExt = lastDotIndex > -1 ? filename.substring(0, lastDotIndex) : filename;
	const extension = lastDotIndex > -1 ? filename.substring(lastDotIndex) : "";
	if (nameWithoutExt.length <= maxLength) return filename;
	const halfLength = Math.floor((maxLength - 3) / 2);
	return `${nameWithoutExt.substring(0, halfLength)}...${nameWithoutExt.substring(nameWithoutExt.length - halfLength)}${extension}`;
}
function getMediaTypeFromFilename(filename) {
	if (!filename) return "other";
	const ext = filename.split(".").pop()?.toLowerCase();
	if (!ext) return "other";
	if (IMAGE_EXTENSIONS.includes(ext)) return "image";
	if (VIDEO_EXTENSIONS.includes(ext)) return "video";
	if (AUDIO_EXTENSIONS.includes(ext)) return "audio";
	if (THREE_D_EXTENSIONS.includes(ext)) return "3D";
	if (TEXT_EXTENSIONS.includes(ext)) return "text";
	return "other";
}
function isPreviewableMediaType(mediaType) {
	return mediaType === "image" || mediaType === "video" || mediaType === "audio" || mediaType === "3D";
}
const useSystemStatsStore = defineStore("systemStats", () => {
	const fetchSystemStatsData = async () => {
		try {
			return await api.getSystemStats();
		} catch (err) {
			console.error("Error fetching system stats:", err);
			throw err;
		}
	};
	const { state: systemStats, isLoading, error, isReady: isInitialized, execute: refetchSystemStats } = useAsyncState(fetchSystemStatsData, null, { immediate: true });
	function getFormFactor() {
		if (isCloud) return "cloud";
		if (!systemStats.value?.system?.os) return "other";
		const os = systemStats.value.system.os.toLowerCase();
		if (isDesktop) {
			if (os.includes("windows")) return "desktop-windows";
			if (os.includes("darwin") || os.includes("mac")) return "desktop-mac";
		} else {
			if (os.includes("windows")) return "git-windows";
			if (os.includes("darwin") || os.includes("mac")) return "git-mac";
			if (os.includes("linux")) return "git-linux";
		}
		return "other";
	}
	return {
		systemStats,
		isLoading,
		error,
		isInitialized,
		refetchSystemStats,
		getFormFactor
	};
});
var ALWAYS_ENABLED_EXTENSIONS = [];
var ALWAYS_DISABLED_EXTENSIONS = [
	"pysssss.Locking",
	"pysssss.SnapToGrid",
	"pysssss.FaviconStatus",
	"KJNodes.browserstatus"
];
const useExtensionStore = defineStore("extension", () => {
	const extensionByName = ref({});
	const extensions = computed(() => Object.values(extensionByName.value));
	const disabledExtensionNames = ref(/* @__PURE__ */ new Set());
	const inactiveDisabledExtensionNames = computed(() => {
		return Array.from(disabledExtensionNames.value).filter((name) => !(name in extensionByName.value));
	});
	const isExtensionInstalled = (name) => name in extensionByName.value;
	const isExtensionEnabled = (name) => !disabledExtensionNames.value.has(name);
	const enabledExtensions = computed(() => {
		return extensions.value.filter((ext) => isExtensionEnabled(ext.name));
	});
	function isExtensionReadOnly(name) {
		return ALWAYS_DISABLED_EXTENSIONS.includes(name) || ALWAYS_ENABLED_EXTENSIONS.includes(name);
	}
	function registerExtension(extension) {
		if (!extension.name) throw new Error("Extensions must have a 'name' property.");
		if (extensionByName.value[extension.name]) throw new Error(`Extension named '${extension.name}' already registered.`);
		if (disabledExtensionNames.value.has(extension.name)) console.warn(`Extension ${extension.name} is disabled.`);
		extensionByName.value[extension.name] = markRaw(extension);
	}
	function loadDisabledExtensionNames(names) {
		disabledExtensionNames.value = new Set(names);
		for (const name of ALWAYS_DISABLED_EXTENSIONS) disabledExtensionNames.value.add(name);
		for (const name of ALWAYS_ENABLED_EXTENSIONS) disabledExtensionNames.value.delete(name);
	}
	const coreExtensionNames = ref([]);
	function captureCoreExtensions() {
		coreExtensionNames.value = extensions.value.map((ext) => ext.name);
	}
	function isCoreExtension(name) {
		return coreExtensionNames.value.includes(name);
	}
	return {
		extensions,
		enabledExtensions,
		inactiveDisabledExtensionNames,
		isExtensionInstalled,
		isExtensionEnabled,
		isExtensionReadOnly,
		registerExtension,
		loadDisabledExtensionNames,
		captureCoreExtensions,
		isCoreExtension,
		hasThirdPartyExtensions: computed(() => {
			return extensions.value.some((ext) => !isCoreExtension(ext.name));
		})
	};
});
export { processDynamicPrompt as C, usdToMicros as E, parseFilePath as S, truncateFilename as T, isValidUrl as _, formatDate as a, normalizeI18nKey as b, formatNumberWithSuffix as c, generateUUID as d, getFilenameDetails as f, isPreviewableMediaType as g, highlightQuery as h, formatCommitHash as i, formatSize as l, getPathDetails as m, useSystemStatsStore as n, formatDuration as o, getMediaTypeFromFilename as p, appendJsonExt as r, formatMetronomeCurrency as s, useExtensionStore as t, formatVersionAnchor as u, linkifyHtml as v, stringToLocale as w, paramsToCacheKey as x, nl2br as y };

//# sourceMappingURL=extensionStore-C8F8CzIg.js.map