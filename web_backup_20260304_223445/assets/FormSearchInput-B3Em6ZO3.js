import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { A as createCommentVNode, Bt as normalizeClass, G as mergeModels, It as toValue, O as createBaseVNode, Pt as toRef, R as defineComponent, Rt as unref, _ as vModelText, et as openBlock, j as createElementBlock, kt as ref, pt as watch, ut as useModel, vt as withDirectives } from "./vendor-vue-core-tg-oZu4l.js";
import { Xt as refDebounced } from "./vendor-reka-ui-C26MN8JS.js";
import { t as cn } from "./src-CqWvSCI8.js";
var _hoisted_1 = ["placeholder", "autofocus"];
var _hoisted_2 = ["aria-label"];
var FormSearchInput_default = /* @__PURE__ */ defineComponent({
	__name: "FormSearchInput",
	props: /* @__PURE__ */ mergeModels({
		searcher: {
			type: Function,
			default: async () => {}
		},
		updateKey: {},
		autofocus: {
			type: Boolean,
			default: false
		},
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] }
	}, {
		"modelValue": { default: "" },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const searchQuery = useModel(__props, "modelValue");
		const isQuerying = ref(false);
		const debouncedSearchQuery = refDebounced(searchQuery, 250, { maxWait: 1e3 });
		watch(searchQuery, (value) => {
			isQuerying.value = value !== debouncedSearchQuery.value;
		});
		watch([debouncedSearchQuery, toRef(() => toValue(__props.updateKey))], (_, __, onCleanup) => {
			let isCleanup = false;
			let cleanupFn;
			onCleanup(() => {
				isCleanup = true;
				cleanupFn?.();
			});
			__props.searcher(debouncedSearchQuery.value, (cb) => cleanupFn = cb).catch((error) => {
				console.error("[SidePanelSearch] searcher failed", error);
			}).finally(() => {
				if (!isCleanup) isQuerying.value = false;
			});
		}, { immediate: true });
		function handleFocus(event) {
			const target = event.target;
			if (target instanceof HTMLInputElement) target.select();
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("label", { class: normalizeClass(unref(cn)("group", "bg-component-node-widget-background rounded-lg transition-all duration-150", "flex-1 flex items-center", "text-base-foreground border-0", "focus-within:ring focus-within:ring-component-node-widget-background-highlighted/80", __props.class)) }, [
				createBaseVNode("i", { class: normalizeClass(unref(cn)("size-4 ml-2 shrink-0 transition-colors duration-150", isQuerying.value ? "icon-[lucide--loader-circle] animate-spin" : "icon-[lucide--search]", searchQuery.value?.trim() !== "" ? "text-base-foreground" : "text-muted-foreground group-hover:text-base-foreground group-focus-within:text-base-foreground")) }, null, 2),
				withDirectives(createBaseVNode("input", {
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchQuery.value = $event),
					type: "text",
					class: "bg-transparent border-0 outline-0 ring-0 h-5 w-full my-1.5 mx-2 min-w-0",
					placeholder: _ctx.$t("g.searchPlaceholder", { subject: "" }),
					autofocus: __props.autofocus,
					onFocus: handleFocus
				}, null, 40, _hoisted_1), [[vModelText, searchQuery.value]]),
				searchQuery.value.trim().length > 0 ? (openBlock(), createElementBlock("button", {
					key: 0,
					class: "text-muted-foreground hover:text-base-foreground bg-transparent shrink-0 border-0 outline-0 ring-0 p-0 m-0 pr-3 pl-1 flex items-center justify-center transition-all duration-150 hover:scale-108",
					"aria-label": _ctx.$t("g.clear"),
					onClick: _cache[1] || (_cache[1] = ($event) => searchQuery.value = "")
				}, [createBaseVNode("i", { class: normalizeClass(unref(cn)("icon-[lucide--delete] size-4 cursor-pointer")) }, null, 2)], 8, _hoisted_2)) : createCommentVNode("", true)
			], 2);
		};
	}
});
export { FormSearchInput_default as t };

//# sourceMappingURL=FormSearchInput-B3Em6ZO3.js.map