import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { U as script, c as script$3, d as script$2, l as script$1 } from "./vendor-primevue-DxYsW_Ng.js";
import { A as createCommentVNode, Bt as normalizeClass, D as computed, F as createTextVNode, I as createVNode, O as createBaseVNode, R as defineComponent, Rt as unref, S as Fragment, Ut as toDisplayString, _t as withCtx, c as defineStore, et as openBlock, j as createElementBlock, k as createBlock, nt as renderList } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-C6-gqLl2.js";
import { n as isDesktop, t as isCloud } from "./types-DT3N7am7.js";
import "./vendor-reka-ui--l_O1Shn.js";
import "./api-_meS9Tf3.js";
import "./vendor-markdown-DFo_IkzS.js";
import "./colorUtil-CPODED-Q.js";
import "./i18n-Dw0liyWq.js";
import { t as cn } from "./src-CaI548es.js";
import { i as formatCommitHash, l as formatSize, n as useSystemStatsStore, t as useExtensionStore } from "./extensionStore-BafvIS1l.js";
import { t as electronAPI } from "./envUtil-Clzmwvt4.js";
import { t as useExternalLink } from "./useExternalLink-BC_To13P.js";
var _hoisted_1$2 = { class: "grid grid-cols-2 gap-2" };
var _hoisted_2$2 = { class: "font-medium" };
var DeviceInfo_default = /* @__PURE__ */ defineComponent({
	__name: "DeviceInfo",
	props: { device: {} },
	setup(__props) {
		const props = __props;
		const deviceColumns = [
			{
				field: "name",
				header: "Name"
			},
			{
				field: "type",
				header: "Type"
			},
			{
				field: "vram_total",
				header: "VRAM Total"
			},
			{
				field: "vram_free",
				header: "VRAM Free"
			},
			{
				field: "torch_vram_total",
				header: "Torch VRAM Total"
			},
			{
				field: "torch_vram_free",
				header: "Torch VRAM Free"
			}
		];
		const formatValue = (value, field) => {
			if ([
				"vram_total",
				"vram_free",
				"torch_vram_total",
				"torch_vram_free"
			].includes(field)) {
				const num = Number(value);
				if (Number.isFinite(num)) return formatSize(num);
				return value;
			}
			return value;
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$2, [(openBlock(), createElementBlock(Fragment, null, renderList(deviceColumns, (col) => {
				return openBlock(), createElementBlock(Fragment, { key: col.field }, [createBaseVNode("div", _hoisted_2$2, toDisplayString(col.header), 1), createBaseVNode("div", null, toDisplayString(formatValue(props.device[col.field], col.field)), 1)], 64);
			}), 64))]);
		};
	}
});
var _hoisted_1$1 = { class: "system-stats" };
var _hoisted_2$1 = { class: "mb-6" };
var _hoisted_3$1 = { class: "mb-4 text-2xl font-semibold" };
var _hoisted_4$1 = { class: "grid grid-cols-2 gap-2" };
var _hoisted_5 = { class: "mb-4 text-2xl font-semibold" };
var SystemStatsPanel_default = /* @__PURE__ */ defineComponent({
	__name: "SystemStatsPanel",
	props: { stats: {} },
	setup(__props) {
		const props = __props;
		const systemInfo = computed(() => ({
			...props.stats.system,
			argv: props.stats.system.argv.join(" ")
		}));
		const hasDevices = computed(() => props.stats.devices.length > 0);
		const localColumns = [
			{
				field: "os",
				header: "OS"
			},
			{
				field: "python_version",
				header: "Python Version"
			},
			{
				field: "embedded_python",
				header: "Embedded Python"
			},
			{
				field: "pytorch_version",
				header: "Pytorch Version"
			},
			{
				field: "argv",
				header: "Arguments"
			},
			{
				field: "ram_total",
				header: "RAM Total",
				formatNumber: formatSize
			},
			{
				field: "ram_free",
				header: "RAM Free",
				formatNumber: formatSize
			},
			{
				field: "installed_templates_version",
				header: "Templates Version"
			}
		];
		const cloudColumns = [
			{
				field: "cloud_version",
				header: "Cloud Version"
			},
			{
				field: "comfyui_version",
				header: "ComfyUI Version",
				format: formatCommitHash
			},
			{
				field: "comfyui_frontend_version",
				header: "Frontend Version",
				format: formatCommitHash
			},
			{
				field: "workflow_templates_version",
				header: "Templates Version"
			}
		];
		const systemColumns = computed(() => isCloud ? cloudColumns : localColumns);
		function isOutdated(column) {
			if (column.field !== "installed_templates_version") return false;
			const installed = props.stats.system.installed_templates_version;
			const required = props.stats.system.required_templates_version;
			return !!installed && !!required && installed !== required;
		}
		const getDisplayValue = (column) => {
			const value = systemInfo.value[column.field];
			if (column.formatNumber && typeof value === "number") return column.formatNumber(value);
			if (column.format && typeof value === "string") return column.format(value);
			return value;
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$1, [createBaseVNode("div", _hoisted_2$1, [createBaseVNode("h2", _hoisted_3$1, toDisplayString(_ctx.$t("g.systemInfo")), 1), createBaseVNode("div", _hoisted_4$1, [(openBlock(true), createElementBlock(Fragment, null, renderList(systemColumns.value, (col) => {
				return openBlock(), createElementBlock(Fragment, { key: col.field }, [createBaseVNode("div", { class: normalizeClass(unref(cn)("font-medium", isOutdated(col) && "text-danger-100")) }, toDisplayString(col.header), 3), createBaseVNode("div", { class: normalizeClass(unref(cn)(isOutdated(col) && "text-danger-100")) }, toDisplayString(getDisplayValue(col)), 3)], 64);
			}), 128))])]), hasDevices.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(unref(script)), createBaseVNode("div", null, [createBaseVNode("h2", _hoisted_5, toDisplayString(_ctx.$t("g.devices")), 1), props.stats.devices.length > 1 ? (openBlock(), createBlock(unref(script$1), { key: 0 }, {
				default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(props.stats.devices, (device) => {
					return openBlock(), createBlock(unref(script$2), {
						key: device.index,
						header: device.name,
						value: device.index
					}, {
						default: withCtx(() => [createVNode(DeviceInfo_default, { device }, null, 8, ["device"])]),
						_: 2
					}, 1032, ["header", "value"]);
				}), 128))]),
				_: 1
			})) : (openBlock(), createBlock(DeviceInfo_default, {
				key: 1,
				device: props.stats.devices[0]
			}, null, 8, ["device"]))])], 64)) : createCommentVNode("", true)]);
		};
	}
});
const useAboutPanelStore = defineStore("aboutPanel", () => {
	const frontendVersion = "1.41.8";
	const extensionStore = useExtensionStore();
	const systemStatsStore = useSystemStatsStore();
	const { staticUrls } = useExternalLink();
	const coreVersion = computed(() => systemStatsStore?.systemStats?.system?.comfyui_version ?? "");
	const templatesVersion = computed(() => systemStatsStore?.systemStats?.system?.installed_templates_version ?? "");
	const requiredTemplatesVersion = computed(() => systemStatsStore?.systemStats?.system?.required_templates_version ?? "");
	const isTemplatesOutdated = computed(() => templatesVersion.value !== "" && requiredTemplatesVersion.value !== "" && templatesVersion.value !== requiredTemplatesVersion.value);
	const coreBadges = computed(() => [
		{
			label: `ComfyUI ${isDesktop ? "v" + electronAPI().getComfyUIVersion() : formatCommitHash(coreVersion.value)}`,
			url: isCloud ? staticUrls.comfyOrg : staticUrls.github,
			icon: isCloud ? "pi pi-cloud" : "pi pi-github"
		},
		{
			label: `ComfyUI_frontend v${frontendVersion}`,
			url: staticUrls.githubFrontend,
			icon: "pi pi-github"
		},
		...templatesVersion.value ? [{
			label: `Templates v${templatesVersion.value}`,
			url: "https://pypi.org/project/comfyui-workflow-templates/",
			icon: "pi pi-book",
			...isTemplatesOutdated.value ? { severity: "danger" } : {}
		}] : [],
		{
			label: "Discord",
			url: staticUrls.discord,
			icon: "pi pi-discord"
		},
		{
			label: "ComfyOrg",
			url: staticUrls.comfyOrg,
			icon: "pi pi-globe"
		}
	]);
	return { badges: computed(() => [...coreBadges.value, ...extensionStore.extensions.flatMap((e) => e.aboutPageBadges ?? [])]) };
});
var _hoisted_1 = {
	class: "about-container flex flex-col gap-2",
	"data-testid": "about-panel"
};
var _hoisted_2 = { class: "mb-2 text-2xl font-bold" };
var _hoisted_3 = { class: "space-y-2" };
var _hoisted_4 = ["href", "title"];
var AboutPanel_default = /* @__PURE__ */ defineComponent({
	__name: "AboutPanel",
	setup(__props) {
		const systemStatsStore = useSystemStatsStore();
		const aboutPanelStore = useAboutPanelStore();
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("h2", _hoisted_2, toDisplayString(_ctx.$t("g.about")), 1),
				createBaseVNode("div", _hoisted_3, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(aboutPanelStore).badges, (badge) => {
					return openBlock(), createElementBlock("a", {
						key: badge.url,
						href: badge.url,
						target: "_blank",
						rel: "noopener noreferrer",
						class: "about-badge inline-flex items-center no-underline",
						title: badge.url
					}, [createVNode(unref(script$3), {
						class: "mr-2",
						severity: badge.severity
					}, {
						icon: withCtx(() => [createBaseVNode("i", { class: normalizeClass([badge.icon, "mr-2 text-xl"]) }, null, 2)]),
						default: withCtx(() => [createTextVNode(" " + toDisplayString(badge.label), 1)]),
						_: 2
					}, 1032, ["severity"])], 8, _hoisted_4);
				}), 128))]),
				createVNode(unref(script)),
				unref(systemStatsStore).systemStats ? (openBlock(), createBlock(SystemStatsPanel_default, {
					key: 0,
					stats: unref(systemStatsStore).systemStats
				}, null, 8, ["stats"])) : createCommentVNode("", true)
			]);
		};
	}
});
export { AboutPanel_default as default };

//# sourceMappingURL=AboutPanel-BYBaqRkR.js.map