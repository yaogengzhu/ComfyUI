import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { Q as script$1, tt as script } from "./vendor-primevue-DxYsW_Ng.js";
import "./vendor-firebase-DnyyBhvM.js";
import { A as createCommentVNode, Bt as normalizeClass, D as computed, F as createTextVNode, G as mergeModels, I as createVNode, It as toValue, K as mergeProps, O as createBaseVNode, Pt as toRef, R as defineComponent, Rt as unref, S as Fragment, U as inject, Ut as toDisplayString, _t as withCtx, at as resolveDirective, et as openBlock, ft as useTemplateRef, j as createElementBlock, k as createBlock, kt as ref, nt as renderList, pt as watch, rt as renderSlot, tt as provide, ut as useModel, vt as withDirectives } from "./vendor-vue-core-tg-oZu4l.js";
import { U as capitalize } from "./vendor-other-C6-gqLl2.js";
import { t as isCloud } from "./types-DT3N7am7.js";
import "./useFeatureFlags-D-_6c-wx.js";
import "./vendor-reka-ui--l_O1Shn.js";
import { It as useToastStore, r as api } from "./api-CZwqvkO0.js";
import "./vendor-markdown-DFo_IkzS.js";
import "./colorUtil-CPODED-Q.js";
import { n as useI18n } from "./vendor-i18n-czJbbAfl.js";
import { o as t } from "./i18n-Dw0liyWq.js";
import { t as cn } from "./src-CaI548es.js";
import { t as Button_default } from "./Button-DQNHabQW.js";
import { $t as useAssetsStore, Qt as filterItemByOwnership, Xt as sortAssets, Yt as useModelUpload, Zt as filterItemByBaseModels, _n as assetService, an as useQueueStore, bn as isComboInputSpec, dn as getAssetBaseModels, fn as getAssetDisplayName, jr as VirtualGrid_default, pn as getAssetFilename, un as useAssetFilterOptions, vn as useModelToNodeStore } from "./dialogService-B--1tJQn.js";
import "./extensionStore-CMMHyUyK.js";
import "./userStore-C5TzflO8.js";
import "./useErrorHandling-BtJEMIU5.js";
import "./useExternalLink-BC_To13P.js";
import "./vendor-tiptap-BnYkbQDM.js";
import "./markdownRendererUtil-COLKL0Bq.js";
import "./Popover-DEsU7dja.js";
import { n as SUPPORTED_EXTENSIONS_ACCEPT } from "./constants-htt0vt7m.js";
import { i as PANEL_EXCLUDED_PROPS, o as filterWidgetProps } from "./widgetPropFilter-DN03zIgB.js";
import { t as WidgetInputBaseClass } from "./layout-C-JjwVIp.js";
import { t as WidgetLayoutField_default } from "./WidgetLayoutField-B454XIJw.js";
import { t as WidgetWithControl_default } from "./WidgetWithControl-_FSe28hZ.js";
import { t as FormSearchInput_default } from "./FormSearchInput-X-HxDGsN.js";
var _sfc_main = {
	name: "SelectPlus",
	extends: script,
	emits: ["hide"],
	methods: { onOverlayLeave() {
		this.unbindOutsideClickListener();
		this.unbindScrollListener();
		this.unbindResizeListener();
		this.$emit("hide");
		this.overlay = null;
	} }
};
function useTransformCompatOverlayProps(overrides = {}) {
	return computed(() => ({
		appendTo: "self",
		...overrides
	}));
}
var _hoisted_1$5 = { class: "absolute top-5 right-8 h-4 w-7 -translate-y-4/5 flex" };
var WidgetSelectDefault_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetSelectDefault",
	props: /* @__PURE__ */ mergeModels({ widget: {} }, {
		"modelValue": { default(props) {
			const values = props.widget.options?.values;
			return (Array.isArray(values) ? values[0] : void 0) ?? "";
		} },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const props = __props;
		const modelValue = useModel(__props, "modelValue");
		const transformCompatProps = useTransformCompatOverlayProps();
		const selectOptions = computed(() => {
			const options = props.widget.options;
			if (options?.values && Array.isArray(options.values)) return options.values;
			return [];
		});
		const invalid = computed(() => !!modelValue.value && !selectOptions.value.includes(modelValue.value));
		const combinedProps = computed(() => ({
			...filterWidgetProps(props.widget.options, PANEL_EXCLUDED_PROPS),
			...transformCompatProps.value,
			...invalid.value ? { placeholder: `${modelValue.value}` } : {}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(WidgetLayoutField_default, { widget: __props.widget }, {
				default: withCtx(() => [createVNode(_sfc_main, mergeProps({
					modelValue: modelValue.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event),
					invalid: invalid.value,
					filter: selectOptions.value.length > 4,
					"auto-filter-focus": "",
					options: selectOptions.value
				}, combinedProps.value, {
					class: unref(cn)(unref(WidgetInputBaseClass), "w-full text-xs"),
					"aria-label": __props.widget.name,
					size: "small",
					pt: {
						option: "text-xs",
						dropdown: "w-8",
						label: unref(cn)("truncate min-w-[4ch]", _ctx.$slots.default && "mr-5"),
						overlay: "w-fit min-w-full"
					},
					"data-capture-wheel": "true"
				}), {
					dropdownicon: withCtx(() => [..._cache[1] || (_cache[1] = [createBaseVNode("i", { class: "icon-[lucide--chevron-down] size-4 text-component-node-foreground-secondary" }, null, -1)])]),
					_: 1
				}, 16, [
					"modelValue",
					"invalid",
					"filter",
					"options",
					"class",
					"aria-label",
					"pt"
				]), createBaseVNode("div", _hoisted_1$5, [renderSlot(_ctx.$slots, "default")])]),
				_: 3
			}, 8, ["widget"]);
		};
	}
});
var _hoisted_1$4 = { class: "min-w-0 flex-1 px-1 py-2 text-left truncate" };
var _hoisted_2$4 = { key: 0 };
var _hoisted_3$3 = { key: 1 };
var _hoisted_4$2 = [
	"multiple",
	"disabled",
	"accept"
];
var FormDropdownInput_default = /* @__PURE__ */ defineComponent({
	__name: "FormDropdownInput",
	props: {
		isOpen: {
			type: Boolean,
			default: false
		},
		placeholder: { default: "Select..." },
		items: {},
		displayItems: {},
		selected: {},
		maxSelectable: {},
		uploadable: { type: Boolean },
		disabled: { type: Boolean },
		accept: {}
	},
	emits: ["select-click", "file-change"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const selectedItems = computed(() => {
			return (__props.displayItems ?? __props.items).filter((item) => __props.selected.has(item.id));
		});
		const theButtonStyle = computed(() => cn("border-0 bg-component-node-widget-background outline-none text-text-secondary", __props.disabled ? "cursor-not-allowed" : "hover:bg-component-node-widget-background-hovered cursor-pointer", selectedItems.value.length > 0 && "text-text-primary"));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(cn)(unref(WidgetInputBaseClass), "flex text-base leading-none", { "opacity-50 cursor-not-allowed outline-zinc-300/10": __props.disabled })) }, [createBaseVNode("button", {
				class: normalizeClass(unref(cn)(theButtonStyle.value, "flex justify-between items-center flex-1 min-w-0 h-8", {
					"rounded-l-lg": __props.uploadable,
					"rounded-lg": !__props.uploadable
				})),
				onClick: _cache[0] || (_cache[0] = ($event) => emit("select-click", $event))
			}, [createBaseVNode("span", _hoisted_1$4, [!selectedItems.value.length ? (openBlock(), createElementBlock("span", _hoisted_2$4, toDisplayString(__props.placeholder), 1)) : (openBlock(), createElementBlock("span", _hoisted_3$3, toDisplayString(selectedItems.value.map((item) => item.label ?? item.name).join(", ")), 1))]), createBaseVNode("i", { class: normalizeClass(["icon-[lucide--chevron-down]", unref(cn)("mr-2 size-4 transition-transform duration-200 flex-shrink-0 text-component-node-foreground-secondary", __props.isOpen && "rotate-180")]) }, null, 2)], 2), __props.uploadable ? (openBlock(), createElementBlock("label", {
				key: 0,
				class: normalizeClass(unref(cn)(theButtonStyle.value, "relative", "size-8 flex justify-center items-center border-l rounded-r-lg border-zinc-300/10"))
			}, [_cache[2] || (_cache[2] = createBaseVNode("i", { class: "icon-[lucide--folder-search] size-4" }, null, -1)), createBaseVNode("input", {
				type: "file",
				class: "absolute inset-0 -z-1 opacity-0",
				multiple: __props.maxSelectable > 1,
				disabled: __props.disabled,
				accept: __props.accept,
				onChange: _cache[1] || (_cache[1] = ($event) => emit("file-change", $event))
			}, null, 40, _hoisted_4$2)], 2)) : createCommentVNode("", true)], 2);
		};
	}
});
var _hoisted_1$3 = { class: "text-secondary flex gap-2 px-4" };
var _hoisted_2$3 = {
	key: 0,
	class: "absolute top-[-2px] left-[-2px] size-2 rounded-full bg-component-node-widget-background-highlighted"
};
var _hoisted_3$2 = {
	key: 0,
	class: "icon-[lucide--check] size-4"
};
var _hoisted_4$1 = {
	key: 0,
	class: "absolute top-[-2px] left-[-2px] size-2 rounded-full bg-component-node-widget-background-highlighted"
};
var _hoisted_5$1 = {
	key: 0,
	class: "icon-[lucide--check] size-4"
};
var _hoisted_6 = {
	key: 0,
	class: "absolute top-[-2px] left-[-2px] size-2 rounded-full bg-component-node-widget-background-highlighted"
};
var _hoisted_7 = {
	key: 0,
	class: "icon-[lucide--check] size-4"
};
var layoutSwitchItemStyle = "size-6 flex justify-center items-center rounded-sm cursor-pointer transition-all duration-150 hover:scale-108 hover:text-base-foreground active:scale-95";
var FormDropdownMenuActions_default = /* @__PURE__ */ defineComponent({
	__name: "FormDropdownMenuActions",
	props: /* @__PURE__ */ mergeModels({
		searcher: { type: Function },
		sortOptions: {},
		updateKey: {},
		showOwnershipFilter: { type: Boolean },
		ownershipOptions: {},
		showBaseModelFilter: { type: Boolean },
		baseModelOptions: {}
	}, {
		"layoutMode": {},
		"layoutModeModifiers": {},
		"searchQuery": {},
		"searchQueryModifiers": {},
		"sortSelected": {},
		"sortSelectedModifiers": {},
		"ownershipSelected": { default: "all" },
		"ownershipSelectedModifiers": {},
		"baseModelSelected": { default: /* @__PURE__ */ new Set() },
		"baseModelSelectedModifiers": {}
	}),
	emits: [
		"update:layoutMode",
		"update:searchQuery",
		"update:sortSelected",
		"update:ownershipSelected",
		"update:baseModelSelected"
	],
	setup(__props) {
		const { t } = useI18n();
		const layoutMode = useModel(__props, "layoutMode");
		const searchQuery = useModel(__props, "searchQuery");
		const sortSelected = useModel(__props, "sortSelected");
		const ownershipSelected = useModel(__props, "ownershipSelected");
		const baseModelSelected = useModel(__props, "baseModelSelected");
		const actionButtonStyle = cn("h-8 bg-zinc-500/20 rounded-lg outline outline-1 outline-offset-[-1px] outline-node-component-border transition-all duration-150");
		const sortPopoverRef = useTemplateRef("sortPopoverRef");
		const sortTriggerRef = useTemplateRef("sortTriggerRef");
		const isSortPopoverOpen = ref(false);
		function toggleSortPopover(event) {
			if (!sortPopoverRef.value || !sortTriggerRef.value) return;
			isSortPopoverOpen.value = !isSortPopoverOpen.value;
			sortPopoverRef.value.toggle(event, sortTriggerRef.value.$el);
		}
		function closeSortPopover() {
			isSortPopoverOpen.value = false;
			sortPopoverRef.value?.hide();
		}
		function handleSortSelected(item) {
			sortSelected.value = item.id;
			closeSortPopover();
		}
		const ownershipPopoverRef = useTemplateRef("ownershipPopoverRef");
		const ownershipTriggerRef = useTemplateRef("ownershipTriggerRef");
		const isOwnershipPopoverOpen = ref(false);
		function toggleOwnershipPopover(event) {
			if (!ownershipPopoverRef.value || !ownershipTriggerRef.value) return;
			isOwnershipPopoverOpen.value = !isOwnershipPopoverOpen.value;
			ownershipPopoverRef.value.toggle(event, ownershipTriggerRef.value.$el);
		}
		function closeOwnershipPopover() {
			isOwnershipPopoverOpen.value = false;
			ownershipPopoverRef.value?.hide();
		}
		function handleOwnershipSelected(item) {
			ownershipSelected.value = item.value;
			closeOwnershipPopover();
		}
		const baseModelPopoverRef = useTemplateRef("baseModelPopoverRef");
		const baseModelTriggerRef = useTemplateRef("baseModelTriggerRef");
		const isBaseModelPopoverOpen = ref(false);
		function toggleBaseModelPopover(event) {
			if (!baseModelPopoverRef.value || !baseModelTriggerRef.value) return;
			isBaseModelPopoverOpen.value = !isBaseModelPopoverOpen.value;
			baseModelPopoverRef.value.toggle(event, baseModelTriggerRef.value.$el);
		}
		function toggleBaseModelSelection(item) {
			const current = new Set(baseModelSelected.value);
			baseModelSelected.value = current.has(item.value) ? new Set([...current].filter((v) => v !== item.value)) : new Set([...current, item.value]);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$3, [
				createVNode(FormSearchInput_default, {
					modelValue: searchQuery.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchQuery.value = $event),
					searcher: __props.searcher,
					"update-key": __props.updateKey,
					class: normalizeClass(unref(cn)(unref(actionButtonStyle), "hover:outline-component-node-widget-background-highlighted/80", "focus-within:outline-component-node-widget-background-highlighted/80 focus-within:ring-0"))
				}, null, 8, [
					"modelValue",
					"searcher",
					"update-key",
					"class"
				]),
				createVNode(Button_default, {
					ref_key: "sortTriggerRef",
					ref: sortTriggerRef,
					variant: "textonly",
					size: "icon",
					class: normalizeClass(unref(cn)(unref(actionButtonStyle), "relative w-8 hover:outline-component-node-widget-background-highlighted active:scale-95")),
					onClick: toggleSortPopover
				}, {
					default: withCtx(() => [sortSelected.value !== "default" ? (openBlock(), createElementBlock("div", _hoisted_2$3)) : createCommentVNode("", true), _cache[7] || (_cache[7] = createBaseVNode("i", { class: "icon-[lucide--arrow-up-down] size-4" }, null, -1))]),
					_: 1
				}, 8, ["class"]),
				createVNode(unref(script$1), {
					ref_key: "sortPopoverRef",
					ref: sortPopoverRef,
					dismissable: true,
					"close-on-escape": true,
					unstyled: "",
					pt: {
						root: { class: "absolute z-50" },
						content: { class: ["bg-transparent border-none p-0 pt-2 rounded-lg shadow-lg"] }
					},
					onHide: _cache[1] || (_cache[1] = ($event) => isSortPopoverOpen.value = false)
				}, {
					default: withCtx(() => [createBaseVNode("div", { class: normalizeClass(unref(cn)("flex flex-col gap-2 p-2 min-w-32", "bg-component-node-background", "rounded-lg outline outline-offset-[-1px] outline-component-node-border")) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.sortOptions, (item) => {
						return openBlock(), createBlock(Button_default, {
							key: item.name,
							variant: "textonly",
							size: "unset",
							class: normalizeClass(unref(cn)("flex justify-between items-center h-6 text-left")),
							onClick: ($event) => handleSortSelected(item)
						}, {
							default: withCtx(() => [createBaseVNode("span", null, toDisplayString(item.name), 1), sortSelected.value === item.id ? (openBlock(), createElementBlock("i", _hoisted_3$2)) : createCommentVNode("", true)]),
							_: 2
						}, 1032, ["class", "onClick"]);
					}), 128))], 2)]),
					_: 1
				}, 512),
				__props.showOwnershipFilter && __props.ownershipOptions?.length ? (openBlock(), createBlock(Button_default, {
					key: 0,
					ref_key: "ownershipTriggerRef",
					ref: ownershipTriggerRef,
					"aria-label": unref(t)("assetBrowser.ownership"),
					title: unref(t)("assetBrowser.ownership"),
					variant: "textonly",
					size: "icon",
					class: normalizeClass(unref(cn)(unref(actionButtonStyle), "relative w-8 hover:outline-component-node-widget-background-highlighted active:scale-95")),
					onClick: toggleOwnershipPopover
				}, {
					default: withCtx(() => [ownershipSelected.value !== "all" ? (openBlock(), createElementBlock("div", _hoisted_4$1)) : createCommentVNode("", true), _cache[8] || (_cache[8] = createBaseVNode("i", { class: "icon-[lucide--user] size-4" }, null, -1))]),
					_: 1
				}, 8, [
					"aria-label",
					"title",
					"class"
				])) : createCommentVNode("", true),
				createVNode(unref(script$1), {
					ref_key: "ownershipPopoverRef",
					ref: ownershipPopoverRef,
					dismissable: true,
					"close-on-escape": true,
					unstyled: "",
					pt: {
						root: { class: "absolute z-50" },
						content: { class: ["bg-transparent border-none p-0 pt-2 rounded-lg shadow-lg"] }
					},
					onHide: _cache[2] || (_cache[2] = ($event) => isOwnershipPopoverOpen.value = false)
				}, {
					default: withCtx(() => [createBaseVNode("div", { class: normalizeClass(unref(cn)("flex flex-col gap-2 p-2 min-w-32", "bg-component-node-background", "rounded-lg outline outline-offset-[-1px] outline-component-node-border")) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.ownershipOptions, (item) => {
						return openBlock(), createBlock(Button_default, {
							key: item.value,
							variant: "textonly",
							size: "unset",
							class: normalizeClass(unref(cn)("flex justify-between items-center h-6 text-left")),
							onClick: ($event) => handleOwnershipSelected(item)
						}, {
							default: withCtx(() => [createBaseVNode("span", null, toDisplayString(item.name), 1), ownershipSelected.value === item.value ? (openBlock(), createElementBlock("i", _hoisted_5$1)) : createCommentVNode("", true)]),
							_: 2
						}, 1032, ["class", "onClick"]);
					}), 128))], 2)]),
					_: 1
				}, 512),
				__props.showBaseModelFilter && __props.baseModelOptions?.length ? (openBlock(), createBlock(Button_default, {
					key: 1,
					ref_key: "baseModelTriggerRef",
					ref: baseModelTriggerRef,
					"aria-label": unref(t)("assetBrowser.baseModel"),
					title: unref(t)("assetBrowser.baseModel"),
					variant: "textonly",
					size: "icon",
					class: normalizeClass(unref(cn)(unref(actionButtonStyle), "relative w-8 hover:outline-component-node-widget-background-highlighted active:scale-95")),
					onClick: toggleBaseModelPopover
				}, {
					default: withCtx(() => [baseModelSelected.value.size > 0 ? (openBlock(), createElementBlock("div", _hoisted_6)) : createCommentVNode("", true), _cache[9] || (_cache[9] = createBaseVNode("i", { class: "icon-[comfy--ai-model] size-4" }, null, -1))]),
					_: 1
				}, 8, [
					"aria-label",
					"title",
					"class"
				])) : createCommentVNode("", true),
				createVNode(unref(script$1), {
					ref_key: "baseModelPopoverRef",
					ref: baseModelPopoverRef,
					dismissable: true,
					"close-on-escape": true,
					unstyled: "",
					pt: {
						root: { class: "absolute z-50" },
						content: { class: ["bg-transparent border-none p-0 pt-2 rounded-lg shadow-lg"] }
					},
					onHide: _cache[4] || (_cache[4] = ($event) => isBaseModelPopoverOpen.value = false)
				}, {
					default: withCtx(() => [createBaseVNode("div", { class: normalizeClass(unref(cn)("flex flex-col gap-2 p-2 min-w-32", "bg-component-node-background", "rounded-lg outline outline-offset-[-1px] outline-component-node-border")) }, [
						(openBlock(true), createElementBlock(Fragment, null, renderList(__props.baseModelOptions, (item) => {
							return openBlock(), createBlock(Button_default, {
								key: item.value,
								variant: "textonly",
								size: "unset",
								class: normalizeClass(unref(cn)("flex justify-between items-center h-6 text-left")),
								onClick: ($event) => toggleBaseModelSelection(item)
							}, {
								default: withCtx(() => [createBaseVNode("span", null, toDisplayString(item.name), 1), baseModelSelected.value.has(item.value) ? (openBlock(), createElementBlock("i", _hoisted_7)) : createCommentVNode("", true)]),
								_: 2
							}, 1032, ["class", "onClick"]);
						}), 128)),
						_cache[10] || (_cache[10] = createBaseVNode("span", { class: "h-0 w-full border-b border-border-default" }, null, -1)),
						createVNode(Button_default, {
							variant: "textonly",
							size: "unset",
							class: normalizeClass(unref(cn)("flex justify-between items-center h-6 text-left")),
							onClick: _cache[3] || (_cache[3] = ($event) => baseModelSelected.value = /* @__PURE__ */ new Set())
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("g.clearFilters")), 1)]),
							_: 1
						}, 8, ["class"])
					], 2)]),
					_: 1
				}, 512),
				createBaseVNode("div", { class: normalizeClass(unref(cn)(unref(actionButtonStyle), "flex justify-center items-center p-1 gap-1 hover:outline-component-node-widget-background-highlighted")) }, [createVNode(Button_default, {
					variant: "textonly",
					size: "unset",
					class: normalizeClass(unref(cn)(layoutSwitchItemStyle, layoutMode.value === "list" && "bg-neutral-500/50 text-base-foreground")),
					onClick: _cache[5] || (_cache[5] = ($event) => layoutMode.value = "list")
				}, {
					default: withCtx(() => [..._cache[11] || (_cache[11] = [createBaseVNode("i", { class: "icon-[lucide--list] size-4" }, null, -1)])]),
					_: 1
				}, 8, ["class"]), createVNode(Button_default, {
					variant: "textonly",
					size: "unset",
					class: normalizeClass(unref(cn)(layoutSwitchItemStyle, layoutMode.value === "grid" && "bg-neutral-500/50 text-base-foreground")),
					onClick: _cache[6] || (_cache[6] = ($event) => layoutMode.value = "grid")
				}, {
					default: withCtx(() => [..._cache[12] || (_cache[12] = [createBaseVNode("i", { class: "icon-[lucide--layout-grid] size-4" }, null, -1)])]),
					_: 1
				}, 8, ["class"])], 2)
			]);
		};
	}
});
var _hoisted_1$2 = { class: "text-secondary mb-4 flex gap-1 px-4 justify-start" };
var _hoisted_2$2 = ["disabled", "onClick"];
var FormDropdownMenuFilter_default = /* @__PURE__ */ defineComponent({
	__name: "FormDropdownMenuFilter",
	props: /* @__PURE__ */ mergeModels({ filterOptions: {} }, {
		"filterSelected": {},
		"filterSelectedModifiers": {}
	}),
	emits: ["update:filterSelected"],
	setup(__props) {
		const filterSelected = useModel(__props, "filterSelected");
		const { isUploadButtonEnabled, showUploadDialog } = useModelUpload();
		const singleFilterOption = computed(() => __props.filterOptions.length === 1);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$2, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.filterOptions, (option) => {
				return openBlock(), createElementBlock("button", {
					key: option.value,
					type: "button",
					disabled: singleFilterOption.value,
					class: normalizeClass(unref(cn)("px-4 py-2 rounded-md inline-flex justify-center items-center select-none appearance-none border-0 text-base-foreground", !singleFilterOption.value && "transition-all duration-150 hover:text-base-foreground hover:bg-interface-menu-component-surface-hovered cursor-pointer active:scale-95", !singleFilterOption.value && filterSelected.value === option.value ? "!bg-interface-menu-component-surface-selected text-base-foreground" : "bg-transparent")),
					onClick: ($event) => filterSelected.value = option.value
				}, toDisplayString(option.name), 11, _hoisted_2$2);
			}), 128)), unref(isUploadButtonEnabled) && singleFilterOption.value ? (openBlock(), createBlock(Button_default, {
				key: 0,
				class: "ml-auto",
				size: "md",
				variant: "textonly",
				onClick: unref(showUploadDialog)
			}, {
				default: withCtx(() => [_cache[0] || (_cache[0] = createBaseVNode("i", { class: "icon-[lucide--folder-input]" }, null, -1)), createBaseVNode("span", null, toDisplayString(_ctx.$t("g.import")), 1)]),
				_: 1
			}, 8, ["onClick"])) : createCommentVNode("", true)]);
		};
	}
});
const AssetKindKey = Symbol("assetKind");
var _hoisted_1$1 = {
	key: 0,
	class: "absolute top-1 left-1 size-4 rounded-full border-1 border-base-foreground bg-primary-background"
};
var _hoisted_2$1 = ["src"];
var _hoisted_3$1 = ["src", "alt"];
var _hoisted_4 = {
	key: 3,
	class: "size-full bg-gradient-to-tr from-blue-400 via-teal-500 to-green-400"
};
var _hoisted_5 = {
	key: 0,
	class: "text-secondary block text-xs"
};
var FormDropdownMenuItem_default = /* @__PURE__ */ defineComponent({
	__name: "FormDropdownMenuItem",
	props: {
		index: {},
		selected: { type: Boolean },
		previewUrl: {},
		name: {},
		label: {},
		layout: {}
	},
	emits: ["click", "mediaLoad"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const actualDimensions = ref(null);
		const assetKind = inject(AssetKindKey);
		const isVideo = computed(() => assetKind?.value === "video");
		function handleClick() {
			emit("click", props.index);
		}
		function handleImageLoad(event) {
			emit("mediaLoad", event);
			if (!event.target || !(event.target instanceof HTMLImageElement)) return;
			const img = event.target;
			if (img.naturalWidth && img.naturalHeight) actualDimensions.value = `${img.naturalWidth} x ${img.naturalHeight}`;
		}
		function handleVideoLoad(event) {
			emit("mediaLoad", event);
			if (!event.target || !(event.target instanceof HTMLVideoElement)) return;
			const video = event.target;
			if (video.videoWidth && video.videoHeight) actualDimensions.value = `${video.videoWidth} x ${video.videoHeight}`;
		}
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(unref(cn)("flex gap-1 select-none group/item cursor-pointer bg-component-node-widget-background", "transition-[transform,box-shadow,background-color] duration-150", {
					"flex-col text-center": __props.layout === "grid",
					"flex-row text-left max-h-16 rounded-lg hover:scale-102 active:scale-98": __props.layout === "list",
					"flex-row text-left hover:bg-component-node-widget-background-hovered rounded-lg": __props.layout === "list-small",
					"ring-2 ring-component-node-widget-background-highlighted": __props.layout === "list" && __props.selected
				})),
				onClick: handleClick
			}, [__props.layout !== "list-small" ? (openBlock(), createElementBlock("div", {
				key: 0,
				class: normalizeClass(unref(cn)("relative", "w-full aspect-square overflow-hidden outline-1 outline-offset-[-1px] outline-interface-stroke", "transition-[transform,box-shadow] duration-150", {
					"min-w-16 max-w-16 rounded-l-lg": __props.layout === "list",
					"rounded-sm group-hover/item:scale-108 group-active/item:scale-95": __props.layout === "grid",
					"ring-2 ring-component-node-widget-background-highlighted": __props.layout === "grid" && __props.selected
				}))
			}, [__props.selected ? (openBlock(), createElementBlock("div", _hoisted_1$1, [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "icon-[lucide--check] size-3 translate-y-[-0.5px] text-base-foreground bold" }, null, -1)])])) : createCommentVNode("", true), __props.previewUrl && isVideo.value ? (openBlock(), createElementBlock("video", {
				key: 1,
				src: __props.previewUrl,
				class: "size-full object-cover",
				preload: "metadata",
				muted: "",
				onLoadeddata: handleVideoLoad
			}, null, 40, _hoisted_2$1)) : __props.previewUrl ? (openBlock(), createElementBlock("img", {
				key: 2,
				src: __props.previewUrl,
				alt: __props.name,
				draggable: "false",
				class: "size-full object-cover",
				onLoad: handleImageLoad
			}, null, 40, _hoisted_3$1)) : (openBlock(), createElementBlock("div", _hoisted_4))], 2)) : createCommentVNode("", true), createBaseVNode("div", { class: normalizeClass(unref(cn)("flex gap-1", {
				"flex-col": __props.layout === "grid",
				"flex-col px-4 py-1 w-full justify-center min-w-0": __props.layout === "list",
				"flex-row p-2 items-center justify-between w-full": __props.layout === "list-small"
			})) }, [withDirectives((openBlock(), createElementBlock("span", { class: normalizeClass(unref(cn)("block text-xs line-clamp-2 break-words overflow-hidden", "transition-colors duration-150", !!__props.selected && "text-base-foreground")) }, [createTextVNode(toDisplayString(__props.label ?? __props.name), 1)], 2)), [[_directive_tooltip, __props.layout === "grid" ? __props.label ?? __props.name : void 0]]), actualDimensions.value ? (openBlock(), createElementBlock("span", _hoisted_5, toDisplayString(actualDimensions.value), 1)) : createCommentVNode("", true)], 2)], 2);
		};
	}
});
var _hoisted_1 = { class: "flex h-[640px] w-103 flex-col rounded-lg bg-component-node-background pt-4 outline outline-offset-[-1px] outline-node-component-border" };
var _hoisted_2 = {
	key: 1,
	class: "flex h-50 items-center justify-center"
};
var _hoisted_3 = ["title", "aria-label"];
var FormDropdownMenu_default = /* @__PURE__ */ defineComponent({
	__name: "FormDropdownMenu",
	props: /* @__PURE__ */ mergeModels({
		items: {},
		isSelected: { type: Function },
		filterOptions: {},
		sortOptions: {},
		searcher: { type: Function },
		updateKey: {},
		showOwnershipFilter: { type: Boolean },
		ownershipOptions: {},
		showBaseModelFilter: { type: Boolean },
		baseModelOptions: {}
	}, {
		"filterSelected": {},
		"filterSelectedModifiers": {},
		"layoutMode": {},
		"layoutModeModifiers": {},
		"sortSelected": {},
		"sortSelectedModifiers": {},
		"searchQuery": {},
		"searchQueryModifiers": {},
		"ownershipSelected": {},
		"ownershipSelectedModifiers": {},
		"baseModelSelected": {},
		"baseModelSelectedModifiers": {}
	}),
	emits: /* @__PURE__ */ mergeModels(["item-click"], [
		"update:filterSelected",
		"update:layoutMode",
		"update:sortSelected",
		"update:searchQuery",
		"update:ownershipSelected",
		"update:baseModelSelected"
	]),
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const filterSelected = useModel(__props, "filterSelected");
		const layoutMode = useModel(__props, "layoutMode");
		const sortSelected = useModel(__props, "sortSelected");
		const searchQuery = useModel(__props, "searchQuery");
		const ownershipSelected = useModel(__props, "ownershipSelected");
		const baseModelSelected = useModel(__props, "baseModelSelected");
		const LAYOUT_CONFIGS = {
			grid: {
				maxColumns: 4,
				itemHeight: 120,
				itemWidth: 89,
				gap: "1rem 0.5rem"
			},
			list: {
				maxColumns: 1,
				itemHeight: 64,
				itemWidth: 380,
				gap: "0.5rem"
			},
			"list-small": {
				maxColumns: 1,
				itemHeight: 40,
				itemWidth: 380,
				gap: "0.25rem"
			}
		};
		const layoutConfig = computed(() => LAYOUT_CONFIGS[layoutMode.value ?? "grid"]);
		const gridStyle = computed(() => ({
			display: "grid",
			gap: layoutConfig.value.gap,
			padding: "1rem",
			width: "100%"
		}));
		const virtualItems = computed(() => __props.items.map((item) => ({
			...item,
			key: String(item.id)
		})));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				__props.filterOptions.length > 0 ? (openBlock(), createBlock(FormDropdownMenuFilter_default, {
					key: 0,
					"filter-selected": filterSelected.value,
					"onUpdate:filterSelected": _cache[0] || (_cache[0] = ($event) => filterSelected.value = $event),
					"filter-options": __props.filterOptions
				}, null, 8, ["filter-selected", "filter-options"])) : createCommentVNode("", true),
				createVNode(FormDropdownMenuActions_default, {
					"layout-mode": layoutMode.value,
					"onUpdate:layoutMode": _cache[1] || (_cache[1] = ($event) => layoutMode.value = $event),
					"sort-selected": sortSelected.value,
					"onUpdate:sortSelected": _cache[2] || (_cache[2] = ($event) => sortSelected.value = $event),
					"search-query": searchQuery.value,
					"onUpdate:searchQuery": _cache[3] || (_cache[3] = ($event) => searchQuery.value = $event),
					"ownership-selected": ownershipSelected.value,
					"onUpdate:ownershipSelected": _cache[4] || (_cache[4] = ($event) => ownershipSelected.value = $event),
					"base-model-selected": baseModelSelected.value,
					"onUpdate:baseModelSelected": _cache[5] || (_cache[5] = ($event) => baseModelSelected.value = $event),
					"sort-options": __props.sortOptions,
					searcher: __props.searcher,
					"update-key": __props.updateKey,
					"show-ownership-filter": __props.showOwnershipFilter,
					"ownership-options": __props.ownershipOptions,
					"show-base-model-filter": __props.showBaseModelFilter,
					"base-model-options": __props.baseModelOptions
				}, null, 8, [
					"layout-mode",
					"sort-selected",
					"search-query",
					"ownership-selected",
					"base-model-selected",
					"sort-options",
					"searcher",
					"update-key",
					"show-ownership-filter",
					"ownership-options",
					"show-base-model-filter",
					"base-model-options"
				]),
				__props.items.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_2, [createBaseVNode("i", {
					title: _ctx.$t("g.noItems"),
					"aria-label": _ctx.$t("g.noItems"),
					class: "icon-[lucide--circle-off] size-30 text-muted-foreground/20"
				}, null, 8, _hoisted_3)])) : (openBlock(), createBlock(VirtualGrid_default, {
					key: layoutMode.value,
					items: virtualItems.value,
					"grid-style": gridStyle.value,
					"max-columns": layoutConfig.value.maxColumns,
					"default-item-height": layoutConfig.value.itemHeight,
					"default-item-width": layoutConfig.value.itemWidth,
					"buffer-rows": 2,
					class: "mt-2 min-h-0 flex-1"
				}, {
					item: withCtx(({ item, index }) => [createVNode(FormDropdownMenuItem_default, {
						index,
						selected: __props.isSelected(item, index),
						"preview-url": item.preview_url ?? "",
						name: item.name,
						label: item.label,
						layout: layoutMode.value,
						onClick: ($event) => emit("item-click", item, index)
					}, null, 8, [
						"index",
						"selected",
						"preview-url",
						"name",
						"label",
						"layout",
						"onClick"
					])]),
					_: 1
				}, 8, [
					"items",
					"grid-style",
					"max-columns",
					"default-item-height",
					"default-item-width"
				]))
			]);
		};
	}
});
async function defaultSearcher(query, items) {
	if (query.trim() === "") return items;
	const words = query.trim().toLowerCase().split(" ");
	return items.filter((item) => {
		const name = item.name.toLowerCase();
		return words.every((word) => name.includes(word));
	});
}
function createSortOption(id, name) {
	return {
		id,
		name,
		sorter: ({ items }) => sortAssets(items, id)
	};
}
function getDefaultSortOptions() {
	return [createSortOption("default", t("assetBrowser.sortDefault")), createSortOption("name-asc", t("assetBrowser.sortAZ"))];
}
var FormDropdown_default = /* @__PURE__ */ defineComponent({
	__name: "FormDropdown",
	props: /* @__PURE__ */ mergeModels({
		items: {},
		displayItems: {},
		placeholder: {},
		multiple: {
			type: [Boolean, Number],
			default: false
		},
		uploadable: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		accept: {},
		filterOptions: { default: () => [] },
		sortOptions: { default: () => getDefaultSortOptions() },
		showOwnershipFilter: { type: Boolean },
		ownershipOptions: {},
		showBaseModelFilter: { type: Boolean },
		baseModelOptions: {},
		isSelected: {
			type: Function,
			default: (selected, item, _index) => selected.has(item.id)
		},
		searcher: {
			type: Function,
			default: defaultSearcher
		}
	}, {
		"selected": { default: () => /* @__PURE__ */ new Set() },
		"selectedModifiers": {},
		"filterSelected": { default: "" },
		"filterSelectedModifiers": {},
		"sortSelected": { default: "default" },
		"sortSelectedModifiers": {},
		"layoutMode": { default: "grid" },
		"layoutModeModifiers": {},
		"files": { default: () => [] },
		"filesModifiers": {},
		"searchQuery": { default: "" },
		"searchQueryModifiers": {},
		"ownershipSelected": { default: "all" },
		"ownershipSelectedModifiers": {},
		"baseModelSelected": { default: () => /* @__PURE__ */ new Set() },
		"baseModelSelectedModifiers": {}
	}),
	emits: [
		"update:selected",
		"update:filterSelected",
		"update:sortSelected",
		"update:layoutMode",
		"update:files",
		"update:searchQuery",
		"update:ownershipSelected",
		"update:baseModelSelected"
	],
	setup(__props) {
		const { t } = useI18n();
		const placeholderText = computed(() => __props.placeholder ?? t("widgets.uploadSelect.placeholder"));
		const selected = useModel(__props, "selected");
		const filterSelected = useModel(__props, "filterSelected");
		const sortSelected = useModel(__props, "sortSelected");
		const layoutMode = useModel(__props, "layoutMode");
		const files = useModel(__props, "files");
		const searchQuery = useModel(__props, "searchQuery");
		const ownershipSelected = useModel(__props, "ownershipSelected");
		const baseModelSelected = useModel(__props, "baseModelSelected");
		const toastStore = useToastStore();
		const popoverRef = ref();
		const triggerRef = useTemplateRef("triggerRef");
		const isOpen = ref(false);
		const maxSelectable = computed(() => {
			if (__props.multiple === true) return Infinity;
			if (typeof __props.multiple === "number") return __props.multiple;
			return 1;
		});
		const itemsKey = computed(() => __props.items.map((item) => item.id).join("|"));
		const filteredItems = ref([]);
		const defaultSorter = computed(() => {
			return __props.sortOptions.find((option) => option.id === "default")?.sorter || (({ items: i }) => i.slice());
		});
		const selectedSorter = computed(() => {
			if (sortSelected.value === "default") return defaultSorter.value;
			return __props.sortOptions.find((option) => option.id === sortSelected.value)?.sorter || defaultSorter.value;
		});
		const sortedItems = computed(() => {
			return selectedSorter.value({ items: filteredItems.value }) || [];
		});
		function internalIsSelected(item, index) {
			return __props.isSelected(selected.value, item, index);
		}
		const toggleDropdown = (event) => {
			if (__props.disabled) return;
			if (popoverRef.value && triggerRef.value) {
				popoverRef.value.toggle(event, triggerRef.value);
				isOpen.value = !isOpen.value;
			}
		};
		const closeDropdown = () => {
			if (popoverRef.value) {
				popoverRef.value.hide();
				isOpen.value = false;
			}
		};
		function handleFileChange(event) {
			if (__props.disabled) return;
			const target = event.target;
			if (!(target instanceof HTMLInputElement)) return;
			if (target.files) files.value = Array.from(target.files);
			target.value = "";
		}
		function handleSelection(item, index) {
			if (__props.disabled) return;
			const sel = selected.value;
			if (internalIsSelected(item, index)) sel.delete(item.id);
			else if (sel.size < maxSelectable.value) sel.add(item.id);
			else if (maxSelectable.value === 1) {
				sel.clear();
				sel.add(item.id);
			} else {
				toastStore.addAlert(t("widgets.uploadSelect.maxSelectionReached"));
				return;
			}
			selected.value = new Set(sel);
			if (maxSelectable.value === 1) closeDropdown();
		}
		async function customSearcher(query, onCleanup) {
			let isCleanup = false;
			let cleanupFn;
			onCleanup(() => {
				isCleanup = true;
				cleanupFn?.();
			});
			await __props.searcher(query, __props.items, (cb) => cleanupFn = cb).then((results) => {
				if (!isCleanup) filteredItems.value = results;
			});
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "triggerRef",
				ref: triggerRef
			}, [createVNode(FormDropdownInput_default, {
				files: files.value,
				"is-open": isOpen.value,
				placeholder: placeholderText.value,
				items: __props.items,
				"display-items": __props.displayItems,
				"max-selectable": maxSelectable.value,
				selected: selected.value,
				uploadable: __props.uploadable,
				disabled: __props.disabled,
				accept: __props.accept,
				onSelectClick: toggleDropdown,
				onFileChange: handleFileChange
			}, null, 8, [
				"files",
				"is-open",
				"placeholder",
				"items",
				"display-items",
				"max-selectable",
				"selected",
				"uploadable",
				"disabled",
				"accept"
			]), createVNode(unref(script$1), {
				ref_key: "popoverRef",
				ref: popoverRef,
				dismissable: true,
				"close-on-escape": true,
				unstyled: "",
				pt: {
					root: { class: "absolute z-50" },
					content: { class: ["bg-transparent border-none p-0 pt-2 rounded-lg shadow-lg"] }
				},
				onHide: _cache[6] || (_cache[6] = ($event) => isOpen.value = false)
			}, {
				default: withCtx(() => [createVNode(FormDropdownMenu_default, {
					"filter-selected": filterSelected.value,
					"onUpdate:filterSelected": _cache[0] || (_cache[0] = ($event) => filterSelected.value = $event),
					"layout-mode": layoutMode.value,
					"onUpdate:layoutMode": _cache[1] || (_cache[1] = ($event) => layoutMode.value = $event),
					"sort-selected": sortSelected.value,
					"onUpdate:sortSelected": _cache[2] || (_cache[2] = ($event) => sortSelected.value = $event),
					"search-query": searchQuery.value,
					"onUpdate:searchQuery": _cache[3] || (_cache[3] = ($event) => searchQuery.value = $event),
					"ownership-selected": ownershipSelected.value,
					"onUpdate:ownershipSelected": _cache[4] || (_cache[4] = ($event) => ownershipSelected.value = $event),
					"base-model-selected": baseModelSelected.value,
					"onUpdate:baseModelSelected": _cache[5] || (_cache[5] = ($event) => baseModelSelected.value = $event),
					"filter-options": __props.filterOptions,
					"sort-options": __props.sortOptions,
					"show-ownership-filter": __props.showOwnershipFilter,
					"ownership-options": __props.ownershipOptions,
					"show-base-model-filter": __props.showBaseModelFilter,
					"base-model-options": __props.baseModelOptions,
					disabled: __props.disabled,
					searcher: customSearcher,
					items: sortedItems.value,
					"is-selected": internalIsSelected,
					"max-selectable": maxSelectable.value,
					"update-key": itemsKey.value,
					onClose: closeDropdown,
					onItemClick: handleSelection
				}, null, 8, [
					"filter-selected",
					"layout-mode",
					"sort-selected",
					"search-query",
					"ownership-selected",
					"base-model-selected",
					"filter-options",
					"sort-options",
					"show-ownership-filter",
					"ownership-options",
					"show-base-model-filter",
					"base-model-options",
					"disabled",
					"items",
					"max-selectable",
					"update-key"
				])]),
				_: 1
			}, 512)], 512);
		};
	}
});
function useAssetWidgetData(nodeType) {
	if (isCloud) {
		const assetsStore = useAssetsStore();
		const modelToNodeStore = useModelToNodeStore();
		const category = computed(() => {
			const resolvedType = toValue(nodeType);
			return resolvedType ? modelToNodeStore.getCategoryForNodeType(resolvedType) : void 0;
		});
		const assets = computed(() => {
			const resolvedType = toValue(nodeType);
			return resolvedType ? assetsStore.getAssets(resolvedType) ?? [] : [];
		});
		const isLoading = computed(() => {
			const resolvedType = toValue(nodeType);
			return resolvedType ? assetsStore.isModelLoading(resolvedType) : false;
		});
		const error = computed(() => {
			const resolvedType = toValue(nodeType);
			return resolvedType ? assetsStore.getError(resolvedType) ?? null : null;
		});
		watch(() => toValue(nodeType), async (currentNodeType) => {
			if (!currentNodeType) return;
			const isLoading = assetsStore.isModelLoading(currentNodeType);
			const hasBeenInitialized = assetsStore.hasAssetKey(currentNodeType);
			if (!isLoading && !hasBeenInitialized) await assetsStore.updateModelsForNodeType(currentNodeType);
		}, { immediate: true });
		return {
			category,
			assets,
			isLoading,
			error
		};
	}
	return {
		category: computed(() => void 0),
		assets: computed(() => []),
		isLoading: computed(() => false),
		error: computed(() => null)
	};
}
var WidgetSelectDropdown_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetSelectDropdown",
	props: /* @__PURE__ */ mergeModels({
		widget: {},
		nodeType: {},
		assetKind: {},
		allowUpload: { type: Boolean },
		uploadFolder: {},
		uploadSubfolder: {},
		isAssetMode: { type: Boolean },
		defaultLayoutMode: {}
	}, {
		"modelValue": { default(props) {
			const values = props.widget.options?.values;
			return (Array.isArray(values) ? values[0] : void 0) ?? "";
		} },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const props = __props;
		provide(AssetKindKey, computed(() => props.assetKind));
		const modelValue = useModel(__props, "modelValue");
		const { t } = useI18n();
		const toastStore = useToastStore();
		const queueStore = useQueueStore();
		const transformCompatProps = useTransformCompatOverlayProps();
		const combinedProps = computed(() => ({
			...filterWidgetProps(props.widget.options, PANEL_EXCLUDED_PROPS),
			...transformCompatProps.value
		}));
		const getAssetData = () => {
			const nodeType = props.widget.options?.nodeType ?? props.nodeType;
			if (props.isAssetMode && nodeType) return useAssetWidgetData(toRef(nodeType));
			return null;
		};
		const assetData = getAssetData();
		const filterSelected = ref("all");
		const filterOptions = computed(() => {
			if (props.isAssetMode) return [{
				name: capitalize(assetData?.category.value ?? "All"),
				value: "all"
			}];
			return [
				{
					name: "All",
					value: "all"
				},
				{
					name: "Inputs",
					value: "inputs"
				},
				{
					name: "Outputs",
					value: "outputs"
				}
			];
		});
		const ownershipSelected = ref("all");
		const showOwnershipFilter = computed(() => props.isAssetMode);
		const { ownershipOptions, availableBaseModels } = useAssetFilterOptions(() => assetData?.assets.value ?? []);
		const baseModelSelected = ref(/* @__PURE__ */ new Set());
		const showBaseModelFilter = computed(() => props.isAssetMode);
		const baseModelOptions = computed(() => {
			if (!props.isAssetMode || !assetData) return [];
			return availableBaseModels.value;
		});
		const selectedSet = ref(/* @__PURE__ */ new Set());
		function getDisplayLabel(value) {
			const getOptionLabel = props.widget.options?.getOptionLabel;
			if (!getOptionLabel) return value;
			try {
				return getOptionLabel(value) || value;
			} catch (e) {
				console.error("Failed to map value:", e);
				return value;
			}
		}
		const inputItems = computed(() => {
			const values = props.widget.options?.values || [];
			if (!Array.isArray(values)) return [];
			return values.map((value, index) => ({
				id: `input-${index}`,
				preview_url: getMediaUrl(String(value), "input"),
				name: String(value),
				label: getDisplayLabel(String(value))
			}));
		});
		const outputItems = computed(() => {
			if (![
				"image",
				"video",
				"mesh"
			].includes(props.assetKind ?? "")) return [];
			const outputs = /* @__PURE__ */ new Set();
			queueStore.historyTasks.forEach((task) => {
				task.flatOutputs.forEach((output) => {
					const isTargetType = props.assetKind === "image" && output.mediaType === "images" || props.assetKind === "video" && output.mediaType === "video" || props.assetKind === "mesh" && output.is3D;
					if (output.type === "output" && isTargetType) {
						const annotatedPath = `${output.subfolder ? `${output.subfolder}/${output.filename}` : output.filename} [output]`;
						outputs.add(annotatedPath);
					}
				});
			});
			return Array.from(outputs).map((output) => ({
				id: `output-${output}`,
				preview_url: getMediaUrl(output.replace(" [output]", ""), "output"),
				name: output,
				label: getDisplayLabel(output)
			}));
		});
		const missingValueItem = computed(() => {
			const currentValue = modelValue.value;
			if (!currentValue) return void 0;
			if (props.isAssetMode && assetData) {
				if (assetData.assets.value.some((asset) => getAssetFilename(asset) === currentValue)) return void 0;
				return {
					id: `missing-${currentValue}`,
					preview_url: "",
					name: currentValue,
					label: getDisplayLabel(currentValue)
				};
			}
			const existsInInputs = inputItems.value.some((item) => item.name === currentValue);
			const existsInOutputs = outputItems.value.some((item) => item.name === currentValue);
			if (existsInInputs || existsInOutputs) return void 0;
			const isOutput = currentValue.endsWith(" [output]");
			const strippedValue = isOutput ? currentValue.replace(" [output]", "") : currentValue;
			return {
				id: `missing-${currentValue}`,
				preview_url: getMediaUrl(strippedValue, isOutput ? "output" : "input"),
				name: currentValue,
				label: getDisplayLabel(currentValue)
			};
		});
		const assetItems = computed(() => {
			if (!props.isAssetMode || !assetData) return [];
			return assetData.assets.value.map((asset) => ({
				id: asset.id,
				name: getAssetFilename(asset),
				label: getAssetDisplayName(asset),
				preview_url: asset.preview_url,
				is_immutable: asset.is_immutable,
				base_models: getAssetBaseModels(asset)
			}));
		});
		const ownershipFilteredAssetItems = computed(() => filterItemByOwnership(assetItems.value, ownershipSelected.value));
		const baseModelFilteredAssetItems = computed(() => filterItemByBaseModels(ownershipFilteredAssetItems.value, baseModelSelected.value));
		const allItems = computed(() => {
			if (props.isAssetMode && assetData) return baseModelFilteredAssetItems.value;
			return [
				...missingValueItem.value ? [missingValueItem.value] : [],
				...inputItems.value,
				...outputItems.value
			];
		});
		const dropdownItems = computed(() => {
			if (props.isAssetMode) return allItems.value;
			switch (filterSelected.value) {
				case "inputs": return inputItems.value;
				case "outputs": return outputItems.value;
				default: return allItems.value;
			}
		});
		const displayItems = computed(() => {
			if (props.isAssetMode && assetData && missingValueItem.value) return [missingValueItem.value, ...baseModelFilteredAssetItems.value];
			return dropdownItems.value;
		});
		const mediaPlaceholder = computed(() => {
			const options = props.widget.options;
			if (options?.placeholder) return options.placeholder;
			switch (props.assetKind) {
				case "image": return t("widgets.uploadSelect.placeholderImage");
				case "video": return t("widgets.uploadSelect.placeholderVideo");
				case "audio": return t("widgets.uploadSelect.placeholderAudio");
				case "mesh": return t("widgets.uploadSelect.placeholderMesh");
				case "model": return t("widgets.uploadSelect.placeholderModel");
				case "unknown": return t("widgets.uploadSelect.placeholderUnknown");
			}
			return t("widgets.uploadSelect.placeholder");
		});
		const uploadable = computed(() => {
			if (props.isAssetMode) return false;
			return props.allowUpload === true;
		});
		const acceptTypes = computed(() => {
			switch (props.assetKind) {
				case "image": return "image/*";
				case "video": return "video/*";
				case "audio": return "audio/*";
				case "mesh": return SUPPORTED_EXTENSIONS_ACCEPT;
				default: return;
			}
		});
		const layoutMode = ref(props.defaultLayoutMode ?? "grid");
		watch([modelValue, displayItems], ([currentValue]) => {
			if (currentValue === void 0) {
				selectedSet.value.clear();
				return;
			}
			const item = displayItems.value.find((item) => item.name === currentValue);
			if (!item) {
				selectedSet.value.clear();
				return;
			}
			selectedSet.value.clear();
			selectedSet.value.add(item.id);
		}, { immediate: true });
		function updateSelectedItems(selectedItems) {
			let id = void 0;
			if (selectedItems.size > 0) id = selectedItems.values().next().value;
			if (id == null) {
				modelValue.value = void 0;
				return;
			}
			const name = dropdownItems.value.find((item) => item.id === id)?.name;
			if (!name) {
				modelValue.value = void 0;
				return;
			}
			modelValue.value = name;
		}
		const uploadFile = async (file, isPasted = false, formFields = {}) => {
			const body = new FormData();
			body.append("image", file);
			if (isPasted) body.append("subfolder", "pasted");
			else if (props.uploadSubfolder) body.append("subfolder", props.uploadSubfolder);
			if (formFields.type) body.append("type", formFields.type);
			const resp = await api.fetchApi("/upload/image", {
				method: "POST",
				body
			});
			if (resp.status !== 200) {
				toastStore.addAlert(resp.status + " - " + resp.statusText);
				return null;
			}
			const data = await resp.json();
			if (formFields.type === "input" || !formFields.type && !isPasted) await useAssetsStore().updateInputs();
			return data.subfolder ? `${data.subfolder}/${data.name}` : data.name;
		};
		const uploadFiles = async (files) => {
			const folder = props.uploadFolder ?? "input";
			const uploadPromises = files.map((file) => uploadFile(file, false, { type: folder }));
			return (await Promise.all(uploadPromises)).filter((path) => path !== null);
		};
		async function handleFilesUpdate(files) {
			if (!files || files.length === 0) return;
			try {
				const uploadedPaths = await uploadFiles(files);
				if (uploadedPaths.length === 0) {
					toastStore.addAlert("File upload failed");
					return;
				}
				const values = props.widget.options?.values;
				if (Array.isArray(values)) uploadedPaths.forEach((path) => {
					if (!values.includes(path)) values.push(path);
				});
				modelValue.value = uploadedPaths[0];
				if (props.widget.callback) props.widget.callback(uploadedPaths[0]);
			} catch (error) {
				console.error("Upload error:", error);
				toastStore.addAlert(`Upload failed: ${error}`);
			}
		}
		function getMediaUrl(filename, type = "input") {
			if (!["image", "video"].includes(props.assetKind ?? "")) return "";
			return `/api/view?filename=${encodeURIComponent(filename)}&type=${type}`;
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(WidgetLayoutField_default, { widget: __props.widget }, {
				default: withCtx(() => [createVNode(FormDropdown_default, mergeProps({
					selected: selectedSet.value,
					"onUpdate:selected": _cache[0] || (_cache[0] = ($event) => selectedSet.value = $event),
					"filter-selected": filterSelected.value,
					"onUpdate:filterSelected": _cache[1] || (_cache[1] = ($event) => filterSelected.value = $event),
					"layout-mode": layoutMode.value,
					"onUpdate:layoutMode": _cache[2] || (_cache[2] = ($event) => layoutMode.value = $event),
					"ownership-selected": ownershipSelected.value,
					"onUpdate:ownershipSelected": _cache[3] || (_cache[3] = ($event) => ownershipSelected.value = $event),
					"base-model-selected": baseModelSelected.value,
					"onUpdate:baseModelSelected": _cache[4] || (_cache[4] = ($event) => baseModelSelected.value = $event),
					items: dropdownItems.value,
					"display-items": displayItems.value,
					placeholder: mediaPlaceholder.value,
					multiple: false,
					uploadable: uploadable.value,
					accept: acceptTypes.value,
					"filter-options": filterOptions.value,
					"show-ownership-filter": showOwnershipFilter.value,
					"ownership-options": unref(ownershipOptions),
					"show-base-model-filter": showBaseModelFilter.value,
					"base-model-options": baseModelOptions.value
				}, combinedProps.value, {
					class: "w-full",
					"onUpdate:selected": updateSelectedItems,
					"onUpdate:files": handleFilesUpdate
				}), null, 16, [
					"selected",
					"filter-selected",
					"layout-mode",
					"ownership-selected",
					"base-model-selected",
					"items",
					"display-items",
					"placeholder",
					"uploadable",
					"accept",
					"filter-options",
					"show-ownership-filter",
					"ownership-options",
					"show-base-model-filter",
					"base-model-options"
				])]),
				_: 1
			}, 8, ["widget"]);
		};
	}
});
var WidgetSelect_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetSelect",
	props: /* @__PURE__ */ mergeModels({
		widget: {},
		nodeType: {}
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const props = __props;
		const modelValue = useModel(__props, "modelValue");
		const comboSpec = computed(() => {
			if (props.widget.spec && isComboInputSpec(props.widget.spec)) return props.widget.spec;
		});
		const specDescriptor = computed(() => {
			const spec = comboSpec.value;
			if (!spec) return {
				kind: "unknown",
				allowUpload: false,
				folder: void 0,
				subfolder: void 0
			};
			const { image_upload, animated_image_upload, video_upload, image_folder, audio_upload, mesh_upload, upload_subfolder } = spec;
			let kind = "unknown";
			if (video_upload) kind = "video";
			else if (image_upload || animated_image_upload) kind = "image";
			else if (audio_upload) kind = "audio";
			else if (mesh_upload) kind = "mesh";
			return {
				kind,
				allowUpload: image_upload === true || animated_image_upload === true || video_upload === true || audio_upload === true || mesh_upload === true,
				folder: mesh_upload ? "input" : image_folder,
				subfolder: upload_subfolder
			};
		});
		const isAssetMode = computed(() => assetService.shouldUseAssetBrowser(props.nodeType, props.widget.name) || assetService.isAssetAPIEnabled() && props.widget.type === "asset");
		const assetKind = computed(() => specDescriptor.value.kind);
		const isDropdownUIWidget = computed(() => isAssetMode.value || assetKind.value !== "unknown");
		const allowUpload = computed(() => specDescriptor.value.allowUpload);
		const uploadFolder = computed(() => {
			return specDescriptor.value.folder ?? "input";
		});
		const uploadSubfolder = computed(() => specDescriptor.value.subfolder);
		const defaultLayoutMode = computed(() => {
			return isAssetMode.value ? "list" : "grid";
		});
		return (_ctx, _cache) => {
			return isDropdownUIWidget.value ? (openBlock(), createBlock(WidgetSelectDropdown_default, {
				key: 0,
				modelValue: modelValue.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event),
				widget: __props.widget,
				"node-type": __props.widget.nodeType ?? __props.nodeType,
				"asset-kind": assetKind.value,
				"allow-upload": allowUpload.value,
				"upload-folder": uploadFolder.value,
				"upload-subfolder": uploadSubfolder.value,
				"is-asset-mode": isAssetMode.value,
				"default-layout-mode": defaultLayoutMode.value
			}, null, 8, [
				"modelValue",
				"widget",
				"node-type",
				"asset-kind",
				"allow-upload",
				"upload-folder",
				"upload-subfolder",
				"is-asset-mode",
				"default-layout-mode"
			])) : __props.widget.controlWidget ? (openBlock(), createBlock(WidgetWithControl_default, {
				key: 1,
				modelValue: modelValue.value,
				"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => modelValue.value = $event),
				component: WidgetSelectDefault_default,
				widget: __props.widget
			}, null, 8, ["modelValue", "widget"])) : (openBlock(), createBlock(WidgetSelectDefault_default, {
				key: 2,
				modelValue: modelValue.value,
				"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => modelValue.value = $event),
				widget: __props.widget
			}, null, 8, ["modelValue", "widget"]));
		};
	}
});
export { WidgetSelect_default as default };

//# sourceMappingURL=WidgetSelect-tb1m091n.js.map