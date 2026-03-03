import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { M as script, b as script$1 } from "./vendor-primevue-CNPGb1TW.js";
import { A as createCommentVNode, Bt as normalizeClass, Ct as isRef, D as computed, F as createTextVNode, I as createVNode, O as createBaseVNode, R as defineComponent, Rt as unref, Ut as toDisplayString, _t as withCtx, at as resolveDirective, et as openBlock, j as createElementBlock, k as createBlock, l as storeToRefs, vt as withDirectives } from "./vendor-vue-core-tg-oZu4l.js";
import { t as isCloud } from "./types-YYe-ycsK.js";
import { n as useI18n } from "./vendor-i18n-86kE_LSO.js";
import { t as useTelemetry } from "./telemetry-CLrjuJLU.js";
import { t as Button_default } from "./Button-D8fmNaXY.js";
import { $r as useCommandStore, R as useNodeDefStore, U as useWorkspaceStore, i as useSettingStore, in as useQueueSettingsStore, nn as isInstantRunningMode, o as app, tn as isInstantMode } from "./dialogService-jMbkA1JN.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-ralzwvFM.js";
import { t as graphHasMissingNodes } from "./graphHasMissingNodes-BukgcYEI.js";
var _hoisted_1$1 = ["aria-label"];
var minQueueCount = 1;
var BatchCountEdit_default = /* @__PURE__ */ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "BatchCountEdit",
	setup(__props) {
		const { batchCount } = storeToRefs(useQueueSettingsStore());
		const settingStore = useSettingStore();
		const maxQueueCount = computed(() => settingStore.get("Comfy.QueueButton.BatchCountLimit"));
		const handleClick = (increment) => {
			let newCount;
			if (increment) {
				const originalCount = batchCount.value - 1;
				newCount = Math.min(originalCount * 2, maxQueueCount.value);
			} else {
				const originalCount = batchCount.value + 1;
				newCount = Math.floor(originalCount / 2);
			}
			batchCount.value = newCount;
		};
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return withDirectives((openBlock(), createElementBlock("div", {
				class: "batch-count",
				"aria-label": _ctx.$t("menu.batchCount")
			}, [createVNode(unref(script), {
				modelValue: unref(batchCount),
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(batchCount) ? batchCount.value = $event : null),
				class: "w-14",
				min: minQueueCount,
				max: maxQueueCount.value,
				fluid: "",
				"show-buttons": "",
				pt: {
					incrementButton: {
						class: "w-6",
						onmousedown: () => {
							handleClick(true);
						}
					},
					decrementButton: {
						class: "w-6",
						onmousedown: () => {
							handleClick(false);
						}
					}
				}
			}, null, 8, [
				"modelValue",
				"max",
				"pt"
			])], 8, _hoisted_1$1)), [[
				_directive_tooltip,
				{
					value: _ctx.$t("menu.batchCount"),
					showDelay: 600
				},
				void 0,
				{ bottom: true }
			]]);
		};
	}
}), [["__scopeId", "data-v-19217ad4"]]);
var _hoisted_1 = { class: "queue-button-group flex" };
var ComfyQueueButton_default = /* @__PURE__ */ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "ComfyQueueButton",
	setup(__props) {
		const workspaceStore = useWorkspaceStore();
		const { mode: queueMode, batchCount } = storeToRefs(useQueueSettingsStore());
		const nodeDefStore = useNodeDefStore();
		const hasMissingNodes = computed(() => graphHasMissingNodes(app.rootGraph, nodeDefStore.nodeDefsByName));
		const { t } = useI18n();
		const selectedQueueMode = computed(() => isInstantMode(queueMode.value) ? "instant-idle" : queueMode.value);
		const queueModeMenuItemLookup = computed(() => {
			const items = {
				disabled: {
					key: "disabled",
					label: t("menu.run"),
					tooltip: t("menu.disabledTooltip"),
					command: () => {
						queueMode.value = "disabled";
					}
				},
				change: {
					key: "change",
					label: `${t("menu.run")} (${t("menu.onChange")})`,
					tooltip: t("menu.onChangeTooltip"),
					command: () => {
						useTelemetry()?.trackUiButtonClicked({ button_id: "queue_mode_option_run_on_change_selected" });
						queueMode.value = "change";
					}
				}
			};
			if (!isCloud) items["instant-idle"] = {
				key: "instant-idle",
				label: `${t("menu.run")} (${t("menu.instant")})`,
				tooltip: t("menu.instantTooltip"),
				command: () => {
					useTelemetry()?.trackUiButtonClicked({ button_id: "queue_mode_option_run_instant_selected" });
					queueMode.value = "instant-idle";
				}
			};
			return items;
		});
		const activeQueueModeMenuItem = computed(() => {
			return queueModeMenuItemLookup.value[selectedQueueMode.value] || queueModeMenuItemLookup.value.disabled;
		});
		const queueModeMenuItems = computed(() => Object.values(queueModeMenuItemLookup.value));
		const isStopInstantAction = computed(() => isInstantRunningMode(queueMode.value));
		const queueButtonLabel = computed(() => isStopInstantAction.value ? t("menu.stopRunInstant") : String(activeQueueModeMenuItem.value?.label ?? ""));
		const queueButtonSeverity = computed(() => isStopInstantAction.value ? "danger" : "primary");
		const iconClass = computed(() => {
			if (isStopInstantAction.value) return "icon-[lucide--square]";
			if (hasMissingNodes.value) return "icon-[lucide--triangle-alert]";
			if (workspaceStore.shiftDown) return "icon-[lucide--list-start]";
			if (queueMode.value === "disabled") return "icon-[lucide--play]";
			if (isInstantMode(queueMode.value)) return "icon-[lucide--fast-forward]";
			if (queueMode.value === "change") return "icon-[lucide--step-forward]";
			return "icon-[lucide--play]";
		});
		const queueButtonTooltip = computed(() => {
			if (isStopInstantAction.value) return t("menu.stopRunInstantTooltip");
			if (hasMissingNodes.value) return t("menu.runWorkflowDisabled");
			if (workspaceStore.shiftDown) return t("menu.runWorkflowFront");
			return t("menu.runWorkflow");
		});
		const commandStore = useCommandStore();
		const queuePrompt = async (e) => {
			if (isStopInstantAction.value) {
				queueMode.value = "instant-idle";
				return;
			}
			const commandId = "shiftKey" in e && e.shiftKey ? "Comfy.QueuePromptFront" : "Comfy.QueuePrompt";
			if (isInstantMode(queueMode.value)) queueMode.value = "instant-running";
			if (batchCount.value > 1) useTelemetry()?.trackUiButtonClicked({ button_id: "queue_run_multiple_batches_submitted" });
			await commandStore.execute(commandId, { metadata: {
				subscribe_to_run: false,
				trigger_source: "button"
			} });
		};
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", _hoisted_1, [withDirectives((openBlock(), createBlock(unref(script$1), {
				class: "comfyui-queue-button",
				label: queueButtonLabel.value,
				severity: queueButtonSeverity.value,
				size: "small",
				model: queueModeMenuItems.value,
				"data-testid": "queue-button",
				onClick: queuePrompt
			}, {
				icon: withCtx(() => [createBaseVNode("i", { class: normalizeClass(iconClass.value) }, null, 2)]),
				item: withCtx(({ item }) => [withDirectives((openBlock(), createBlock(Button_default, {
					variant: item.key === selectedQueueMode.value ? "primary" : "secondary",
					size: "sm",
					class: "w-full justify-start"
				}, {
					default: withCtx(() => [item.icon ? (openBlock(), createElementBlock("i", {
						key: 0,
						class: normalizeClass(item.icon)
					}, null, 2)) : createCommentVNode("", true), createTextVNode(" " + toDisplayString(String(item.label ?? "")), 1)]),
					_: 2
				}, 1032, ["variant"])), [[_directive_tooltip, {
					value: item.tooltip,
					showDelay: 600
				}]])]),
				_: 1
			}, 8, [
				"label",
				"severity",
				"model"
			])), [[
				_directive_tooltip,
				{
					value: queueButtonTooltip.value,
					showDelay: 600
				},
				void 0,
				{ bottom: true }
			]]), createVNode(BatchCountEdit_default)]);
		};
	}
}), [["__scopeId", "data-v-93190861"]]);
export { ComfyQueueButton_default as t };

//# sourceMappingURL=ComfyQueueButton-DVja78Vj.js.map