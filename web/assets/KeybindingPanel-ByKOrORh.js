import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { A as script$1, G as script$3, P as script$2, c as script, ct as script$5, ft as useToast, gt as FilterMatchMode, ot as script$4 } from "./vendor-primevue-kyY2H95P.js";
import "./vendor-firebase-DnyyBhvM.js";
import { A as createCommentVNode, Bt as normalizeClass, D as computed, F as createTextVNode, I as createVNode, O as createBaseVNode, R as defineComponent, Rt as unref, S as Fragment, Ut as toDisplayString, _t as withCtx, at as resolveDirective, b as withModifiers, et as openBlock, j as createElementBlock, k as createBlock, kt as ref, mt as watchEffect, nt as renderList, vt as withDirectives } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-C6-gqLl2.js";
import "./useFeatureFlags-B9hGtXPF.js";
import "./vendor-reka-ui--l_O1Shn.js";
import "./api-BIg8a8Ge.js";
import "./vendor-markdown-DFo_IkzS.js";
import "./colorUtil-CPODED-Q.js";
import { n as useI18n } from "./vendor-i18n-czJbbAfl.js";
import "./i18n-CrjEfjCc.js";
import { t as Button_default } from "./Button-DQNHabQW.js";
import { $r as useCommandStore, Fn as KeyComboImpl, Pn as KeybindingImpl, Si as SearchBox_default, ei as useKeybindingStore } from "./dialogService-C9L3yyTu.js";
import { b as normalizeI18nKey } from "./extensionStore-C4FANNnW.js";
import "./userStore-H2R_W1gd.js";
import "./useErrorHandling-CnTPvfCR.js";
import "./useExternalLink-DGE106nN.js";
import "./vendor-tiptap-BnYkbQDM.js";
import "./markdownRendererUtil-COLKL0Bq.js";
import "./Popover-DEsU7dja.js";
import { t as useKeybindingService } from "./keybindingService-tlRHPI3J.js";
var _hoisted_1$1 = {
	key: 0,
	class: "px-2"
};
var KeyComboDisplay_default = /* @__PURE__ */ defineComponent({
	__name: "KeyComboDisplay",
	props: {
		keyCombo: {},
		isModified: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const keySequences = computed(() => __props.keyCombo.getKeySequences());
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(keySequences.value, (sequence, index) => {
				return openBlock(), createElementBlock(Fragment, { key: index }, [createVNode(unref(script), { severity: __props.isModified ? "info" : "secondary" }, {
					default: withCtx(() => [createTextVNode(toDisplayString(sequence), 1)]),
					_: 2
				}, 1032, ["severity"]), index < keySequences.value.length - 1 ? (openBlock(), createElementBlock("span", _hoisted_1$1, "+")) : createCommentVNode("", true)], 64);
			}), 128))]);
		};
	}
});
var _hoisted_1 = { class: "keybinding-panel flex flex-col gap-2" };
var _hoisted_2 = { class: "actions flex flex-row" };
var _hoisted_3 = ["title"];
var _hoisted_4 = { key: 1 };
var _hoisted_5 = { class: "overflow-hidden text-ellipsis" };
var KeybindingPanel_default = /* @__PURE__ */ defineComponent({
	__name: "KeybindingPanel",
	setup(__props) {
		const filters = ref({ global: {
			value: "",
			matchMode: FilterMatchMode.CONTAINS
		} });
		const keybindingStore = useKeybindingStore();
		const keybindingService = useKeybindingService();
		const commandStore = useCommandStore();
		const { t } = useI18n();
		const commandsData = computed(() => {
			return Object.values(commandStore.commands).map((command) => ({
				id: command.id,
				label: t(`commands.${normalizeI18nKey(command.id)}.label`, command.label ?? ""),
				keybinding: keybindingStore.getKeybindingByCommandId(command.id),
				source: command.source
			}));
		});
		const selectedCommandData = ref(null);
		const editDialogVisible = ref(false);
		const newBindingKeyCombo = ref(null);
		const currentEditingCommand = ref(null);
		const keybindingInput = ref(null);
		const existingKeybindingOnCombo = computed(() => {
			if (!currentEditingCommand.value) return null;
			if (currentEditingCommand.value.keybinding?.combo?.equals(newBindingKeyCombo.value)) return null;
			if (!newBindingKeyCombo.value) return null;
			return keybindingStore.getKeybinding(newBindingKeyCombo.value);
		});
		function editKeybinding(commandData) {
			currentEditingCommand.value = commandData;
			newBindingKeyCombo.value = commandData.keybinding ? commandData.keybinding.combo : null;
			editDialogVisible.value = true;
		}
		watchEffect(() => {
			if (editDialogVisible.value) setTimeout(() => {
				keybindingInput.value?.$el?.focus();
			}, 300);
		});
		async function removeKeybinding(commandData) {
			if (commandData.keybinding) {
				keybindingStore.unsetKeybinding(commandData.keybinding);
				await keybindingService.persistUserKeybindings();
			}
		}
		async function captureKeybinding(event) {
			if (!event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) switch (event.key) {
				case "Escape":
					cancelEdit();
					return;
				case "Enter":
					await saveKeybinding();
					return;
			}
			newBindingKeyCombo.value = KeyComboImpl.fromEvent(event);
		}
		function cancelEdit() {
			editDialogVisible.value = false;
			currentEditingCommand.value = null;
			newBindingKeyCombo.value = null;
		}
		async function saveKeybinding() {
			const commandId = currentEditingCommand.value?.id;
			const combo = newBindingKeyCombo.value;
			cancelEdit();
			if (!combo || commandId == void 0) return;
			if (keybindingStore.updateKeybindingOnCommand(new KeybindingImpl({
				commandId,
				combo
			}))) await keybindingService.persistUserKeybindings();
		}
		async function resetKeybinding(commandData) {
			if (keybindingStore.resetKeybindingForCommand(commandData.id)) await keybindingService.persistUserKeybindings();
			else console.warn(`No changes made when resetting keybinding for command: ${commandData.id}`);
		}
		const toast = useToast();
		async function resetAllKeybindings() {
			keybindingStore.resetAllKeybindings();
			await keybindingService.persistUserKeybindings();
			toast.add({
				severity: "info",
				summary: "Info",
				detail: "All keybindings reset",
				life: 3e3
			});
		}
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createVNode(SearchBox_default, {
					modelValue: filters.value["global"].value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filters.value["global"].value = $event),
					placeholder: _ctx.$t("g.searchPlaceholder", { subject: _ctx.$t("g.keybindings") })
				}, null, 8, ["modelValue", "placeholder"]),
				createVNode(unref(script$1), {
					selection: selectedCommandData.value,
					"onUpdate:selection": _cache[1] || (_cache[1] = ($event) => selectedCommandData.value = $event),
					value: commandsData.value,
					"global-filter-fields": ["id", "label"],
					filters: filters.value,
					"selection-mode": "single",
					"striped-rows": "",
					pt: { header: "px-0" },
					onRowDblclick: _cache[2] || (_cache[2] = ($event) => editKeybinding($event.data))
				}, {
					default: withCtx(() => [
						createVNode(unref(script$2), {
							field: "actions",
							header: "",
							pt: { bodyCell: "p-1 min-h-8" }
						}, {
							body: withCtx((slotProps) => [createBaseVNode("div", _hoisted_2, [
								createVNode(Button_default, {
									variant: "textonly",
									size: "icon",
									"aria-label": _ctx.$t("g.edit"),
									onClick: ($event) => editKeybinding(slotProps.data)
								}, {
									default: withCtx(() => [..._cache[4] || (_cache[4] = [createBaseVNode("i", { class: "pi pi-pencil" }, null, -1)])]),
									_: 1
								}, 8, ["aria-label", "onClick"]),
								createVNode(Button_default, {
									variant: "textonly",
									size: "icon",
									"aria-label": _ctx.$t("g.reset"),
									disabled: !unref(keybindingStore).isCommandKeybindingModified(slotProps.data.id),
									onClick: ($event) => resetKeybinding(slotProps.data)
								}, {
									default: withCtx(() => [..._cache[5] || (_cache[5] = [createBaseVNode("i", { class: "pi pi-replay" }, null, -1)])]),
									_: 1
								}, 8, [
									"aria-label",
									"disabled",
									"onClick"
								]),
								createVNode(Button_default, {
									variant: "textonly",
									size: "icon",
									"aria-label": _ctx.$t("g.delete"),
									disabled: !slotProps.data.keybinding,
									onClick: ($event) => removeKeybinding(slotProps.data)
								}, {
									default: withCtx(() => [..._cache[6] || (_cache[6] = [createBaseVNode("i", { class: "pi pi-trash" }, null, -1)])]),
									_: 1
								}, 8, [
									"aria-label",
									"disabled",
									"onClick"
								])
							])]),
							_: 1
						}),
						createVNode(unref(script$2), {
							field: "id",
							header: _ctx.$t("g.command"),
							sortable: "",
							class: "max-w-64 2xl:max-w-full",
							pt: { bodyCell: "p-1 min-h-8" }
						}, {
							body: withCtx((slotProps) => [createBaseVNode("div", {
								class: "truncate",
								title: slotProps.data.id
							}, toDisplayString(slotProps.data.label), 9, _hoisted_3)]),
							_: 1
						}, 8, ["header"]),
						createVNode(unref(script$2), {
							field: "keybinding",
							header: _ctx.$t("g.keybinding"),
							pt: { bodyCell: "p-1 min-h-8" }
						}, {
							body: withCtx((slotProps) => [slotProps.data.keybinding ? (openBlock(), createBlock(KeyComboDisplay_default, {
								key: 0,
								"key-combo": slotProps.data.keybinding.combo,
								"is-modified": unref(keybindingStore).isCommandKeybindingModified(slotProps.data.id)
							}, null, 8, ["key-combo", "is-modified"])) : (openBlock(), createElementBlock("span", _hoisted_4, "-"))]),
							_: 1
						}, 8, ["header"]),
						createVNode(unref(script$2), {
							field: "source",
							header: _ctx.$t("g.source"),
							pt: { bodyCell: "p-1 min-h-8" }
						}, {
							body: withCtx((slotProps) => [createBaseVNode("span", _hoisted_5, toDisplayString(slotProps.data.source || "-"), 1)]),
							_: 1
						}, 8, ["header"])
					]),
					_: 1
				}, 8, [
					"selection",
					"value",
					"filters"
				]),
				createVNode(unref(script$3), {
					visible: editDialogVisible.value,
					"onUpdate:visible": _cache[3] || (_cache[3] = ($event) => editDialogVisible.value = $event),
					class: "min-w-96",
					modal: "",
					header: currentEditingCommand.value?.label,
					onHide: cancelEdit
				}, {
					footer: withCtx(() => [createVNode(Button_default, {
						variant: existingKeybindingOnCombo.value ? "destructive" : "primary",
						autofocus: "",
						onClick: saveKeybinding
					}, {
						default: withCtx(() => [createBaseVNode("i", { class: normalizeClass(existingKeybindingOnCombo.value ? "pi pi-pencil" : "pi pi-check") }, null, 2), createTextVNode(" " + toDisplayString(existingKeybindingOnCombo.value ? _ctx.$t("g.overwrite") : _ctx.$t("g.save")), 1)]),
						_: 1
					}, 8, ["variant"])]),
					default: withCtx(() => [createBaseVNode("div", null, [createVNode(unref(script$4), {
						ref_key: "keybindingInput",
						ref: keybindingInput,
						class: "mb-2 text-center",
						"model-value": newBindingKeyCombo.value?.toString() ?? "",
						placeholder: _ctx.$t("g.pressKeysForNewBinding"),
						autocomplete: "off",
						fluid: "",
						onKeydown: withModifiers(captureKeybinding, ["stop", "prevent"])
					}, null, 8, ["model-value", "placeholder"]), existingKeybindingOnCombo.value ? (openBlock(), createBlock(unref(script$5), {
						key: 0,
						severity: "warn"
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.keybindingAlreadyExists")) + " ", 1), createVNode(unref(script), {
							severity: "secondary",
							value: existingKeybindingOnCombo.value.commandId
						}, null, 8, ["value"])]),
						_: 1
					})) : createCommentVNode("", true)])]),
					_: 1
				}, 8, ["visible", "header"]),
				withDirectives((openBlock(), createBlock(Button_default, {
					class: "mt-4 w-full",
					variant: "destructive-textonly",
					onClick: resetAllKeybindings
				}, {
					default: withCtx(() => [_cache[7] || (_cache[7] = createBaseVNode("i", { class: "pi pi-replay" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("g.resetAll")), 1)]),
					_: 1
				})), [[_directive_tooltip, _ctx.$t("g.resetAllKeybindingsTooltip")]])
			]);
		};
	}
});
export { KeybindingPanel_default as default };

//# sourceMappingURL=KeybindingPanel-ByKOrORh.js.map