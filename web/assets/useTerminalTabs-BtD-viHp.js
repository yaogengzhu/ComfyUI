import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { X as script } from "./vendor-primevue-DxYsW_Ng.js";
import "./vendor-firebase-DnyyBhvM.js";
import { A as createCommentVNode, Bt as normalizeClass, D as computed, I as createVNode, O as createBaseVNode, Q as onUnmounted, R as defineComponent, Rt as unref, Ut as toDisplayString, Z as onMounted, _t as withCtx, at as resolveDirective, et as openBlock, j as createElementBlock, k as createBlock, kt as ref, l as storeToRefs, v as vShow, vt as withDirectives, wt as markRaw } from "./vendor-vue-core-tg-oZu4l.js";
import { Z as debounce } from "./vendor-other-C6-gqLl2.js";
import { n as isDesktop } from "./types-DT3N7am7.js";
import "./useFeatureFlags-D7S0T-hX.js";
import { $t as until, Dt as useEventListener, Tt as useElementHover } from "./vendor-reka-ui--l_O1Shn.js";
import { r as api } from "./api-_meS9Tf3.js";
import "./vendor-markdown-DFo_IkzS.js";
import "./colorUtil-CPODED-Q.js";
import { n as useI18n } from "./vendor-i18n-czJbbAfl.js";
import "./i18n-Dw0liyWq.js";
import { t as cn } from "./src-CaI548es.js";
import { t as Button_default } from "./Button-DQNHabQW.js";
import { zn as useExecutionStore } from "./dialogService-izllT8P8.js";
import "./extensionStore-BafvIS1l.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DnHSq4Qt.js";
import "./userStore-xXj7g9EA.js";
import "./useErrorHandling-DdKwDbhp.js";
import { t as electronAPI } from "./envUtil-Clzmwvt4.js";
import "./useExternalLink-BC_To13P.js";
import "./vendor-tiptap-BnYkbQDM.js";
import "./markdownRendererUtil-COLKL0Bq.js";
import "./Popover-DEsU7dja.js";
import { n as require_addon_fit, t as require_xterm } from "./vendor-xterm-MKpa1ZAW.js";
var import_addon_fit = require_addon_fit();
var import_xterm = require_xterm();
function useTerminal(element) {
	const fitAddon = new import_addon_fit.FitAddon();
	const terminal = markRaw(new import_xterm.Terminal({
		convertEol: true,
		theme: isDesktop ? { background: "#171717" } : void 0
	}));
	terminal.loadAddon(fitAddon);
	terminal.attachCustomKeyEventHandler((event) => {
		if (event.type === "keydown" && (event.ctrlKey || event.metaKey) && (event.key === "c" && terminal.hasSelection() || event.key === "v")) return false;
		return true;
	});
	onMounted(async () => {
		if (element.value) terminal.open(element.value);
	});
	onUnmounted(() => {
		terminal.dispose();
	});
	return {
		terminal,
		useAutoSize({ root, autoRows = true, autoCols = true, minCols = Number.NEGATIVE_INFINITY, minRows = Number.NEGATIVE_INFINITY, onResize }) {
			const ensureValidRows = (rows) => {
				if (rows == null || isNaN(rows)) return (root.value?.clientHeight ?? 80) / 20;
				return rows;
			};
			const ensureValidCols = (cols) => {
				if (cols == null || isNaN(cols)) return (root.value?.clientWidth ?? 80) / 8;
				return cols;
			};
			const resize = () => {
				const dims = fitAddon.proposeDimensions();
				terminal.resize(Math.max(autoCols ? ensureValidCols(dims?.cols) : terminal.cols, minCols), Math.max(autoRows ? ensureValidRows(dims?.rows) : terminal.rows, minRows));
				onResize?.();
			};
			const resizeObserver = new ResizeObserver(debounce(resize, 25));
			onMounted(async () => {
				if (root.value) {
					resizeObserver.observe(root.value);
					resize();
				}
			});
			onUnmounted(() => {
				resizeObserver.disconnect();
			});
			return { resize };
		}
	};
}
var _hoisted_1$1 = { class: "p-terminal h-full w-full rounded-none p-2" };
var BaseTerminal_default = /* @__PURE__ */ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "BaseTerminal",
	emits: ["created", "unmounted"],
	setup(__props, { emit: __emit }) {
		const { t } = useI18n();
		const emit = __emit;
		const terminalEl = ref();
		const rootEl = ref();
		const hasSelection = ref(false);
		const isHovered = useElementHover(rootEl);
		const terminalData = useTerminal(terminalEl);
		emit("created", terminalData, ref(rootEl));
		const { terminal } = terminalData;
		let selectionDisposable;
		const tooltipText = computed(() => {
			return hasSelection.value ? t("serverStart.copySelectionTooltip") : t("serverStart.copyAllTooltip");
		});
		const handleCopy = async () => {
			const existingSelection = terminal.getSelection();
			const shouldSelectAll = !existingSelection;
			if (shouldSelectAll) terminal.selectAll();
			const selectedText = shouldSelectAll ? terminal.getSelection() : existingSelection;
			if (selectedText) {
				await navigator.clipboard.writeText(selectedText);
				if (shouldSelectAll) terminal.clearSelection();
			}
		};
		const showContextMenu = (event) => {
			event.preventDefault();
			electronAPI()?.showContextMenu({ type: "text" });
		};
		if (isDesktop) useEventListener(terminalEl, "contextmenu", showContextMenu);
		onMounted(() => {
			selectionDisposable = terminal.onSelectionChange(() => {
				hasSelection.value = terminal.hasSelection();
			});
		});
		onUnmounted(() => {
			selectionDisposable?.dispose();
			emit("unmounted");
		});
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", {
				ref_key: "rootEl",
				ref: rootEl,
				class: "relative h-full w-full overflow-hidden bg-neutral-900"
			}, [createBaseVNode("div", _hoisted_1$1, [createBaseVNode("div", {
				ref_key: "terminalEl",
				ref: terminalEl,
				class: "terminal-host h-full"
			}, null, 512)]), withDirectives((openBlock(), createBlock(Button_default, {
				variant: "secondary",
				size: "sm",
				class: normalizeClass(unref(cn)("absolute top-2 right-8 transition-opacity", { "opacity-0 pointer-events-none select-none": !unref(isHovered) })),
				"aria-label": tooltipText.value,
				onClick: handleCopy
			}, {
				default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "pi pi-copy" }, null, -1)])]),
				_: 1
			}, 8, ["class", "aria-label"])), [[
				_directive_tooltip,
				{
					value: tooltipText.value,
					showDelay: 300
				},
				void 0,
				{ left: true }
			]])], 512);
		};
	}
}), [["__scopeId", "data-v-161720c0"]]);
var _hoisted_1 = { class: "h-full w-full bg-transparent" };
var _hoisted_2 = {
	key: 0,
	class: "p-4 text-center"
};
var LogsTerminal_default = /* @__PURE__ */ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "LogsTerminal",
	setup(__props) {
		const errorMessage = ref("");
		const loading = ref(true);
		const terminalCreated = ({ terminal, useAutoSize }, root) => {
			useAutoSize({
				root,
				autoRows: true,
				autoCols: true,
				minCols: 80
			});
			const update = (entries) => {
				terminal.write(entries.map((e) => e.m).join(""));
			};
			const logReceived = (e) => {
				update(e.detail.entries);
			};
			const loadLogEntries = async () => {
				update((await api.getRawLogs()).entries);
			};
			const watchLogs = async () => {
				const { clientId } = storeToRefs(useExecutionStore());
				if (!clientId.value) await until(clientId).not.toBeNull();
				await api.subscribeLogs(true);
				api.addEventListener("logs", logReceived);
			};
			onMounted(async () => {
				try {
					await loadLogEntries();
				} catch (err) {
					console.error("Error loading logs", err);
					errorMessage.value = "Unable to load logs, please ensure you have updated your ComfyUI backend.";
					return;
				}
				await watchLogs();
				loading.value = false;
			});
			onUnmounted(async () => {
				if (api.clientId) await api.subscribeLogs(false);
				api.removeEventListener("logs", logReceived);
			});
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [errorMessage.value ? (openBlock(), createElementBlock("p", _hoisted_2, toDisplayString(errorMessage.value), 1)) : loading.value ? (openBlock(), createBlock(unref(script), {
				key: 1,
				class: "relative inset-0 z-10 flex h-full items-center justify-center"
			})) : createCommentVNode("", true), withDirectives(createVNode(BaseTerminal_default, { onCreated: terminalCreated }, null, 512), [[vShow, !loading.value]])]);
		};
	}
}), [["__scopeId", "data-v-c03d3536"]]);
var CommandTerminal_default = /* @__PURE__ */ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "CommandTerminal",
	setup(__props) {
		const terminalCreated = ({ terminal, useAutoSize }, root) => {
			const terminalApi = electronAPI().Terminal;
			let offData;
			let offOutput;
			useAutoSize({
				root,
				autoRows: true,
				autoCols: true,
				onResize: async () => {
					if (!terminal.element?.offsetParent) return;
					await terminalApi.resize(terminal.cols, terminal.rows);
				}
			});
			onMounted(async () => {
				offData = terminal.onData(async (message) => {
					await terminalApi.write(message);
				});
				offOutput = terminalApi.onOutput((message) => {
					terminal.write(message);
				});
				const restore = await terminalApi.restore();
				setTimeout(() => {
					if (restore.buffer.length) {
						terminal.resize(restore.size.cols, restore.size.rows);
						terminal.write(restore.buffer.join(""));
					}
				}, 500);
			});
			onUnmounted(() => {
				offData?.dispose();
				offOutput?.();
			});
		};
		return (_ctx, _cache) => {
			return openBlock(), createBlock(BaseTerminal_default, { onCreated: terminalCreated });
		};
	}
}), [["__scopeId", "data-v-49782f06"]]);
function useLogsTerminalTab() {
	return {
		id: "logs-terminal",
		title: "Logs",
		titleKey: "g.logs",
		component: markRaw(LogsTerminal_default),
		type: "vue"
	};
}
function useCommandTerminalTab() {
	return {
		id: "command-terminal",
		title: "Terminal",
		titleKey: "g.terminal",
		component: markRaw(CommandTerminal_default),
		type: "vue"
	};
}
export { useCommandTerminalTab, useLogsTerminalTab };

//# sourceMappingURL=useTerminalTabs-BtD-viHp.js.map