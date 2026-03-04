import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { D as computed, O as createBaseVNode, R as defineComponent, Ut as toDisplayString, et as openBlock, j as createElementBlock, kt as ref } from "./vendor-vue-core-tg-oZu4l.js";
var _hoisted_1 = { class: "relative size-full overflow-hidden rounded" };
var _hoisted_2 = ["src", "alt"];
var _hoisted_3 = {
	key: 1,
	class: "flex size-full flex-col items-center justify-center gap-2 bg-modal-card-placeholder-background transition-transform duration-300 group-hover:scale-105 group-data-[selected=true]:scale-105"
};
var _hoisted_4 = { class: "text-sm text-base-foreground" };
var Media3DTop_default = /* @__PURE__ */ defineComponent({
	__name: "Media3DTop",
	props: { asset: {} },
	setup(__props) {
		const thumbnailError = ref(false);
		const thumbnailSrc = computed(() => {
			if (!__props.asset?.src) return "";
			return __props.asset.src.replace(/([?&]filename=)([^&]*)/, "$1$2.png");
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [!thumbnailError.value ? (openBlock(), createElementBlock("img", {
				key: 0,
				src: thumbnailSrc.value,
				alt: __props.asset?.name,
				class: "size-full object-contain transition-transform duration-300 group-hover:scale-105 group-data-[selected=true]:scale-105",
				onError: _cache[0] || (_cache[0] = ($event) => thumbnailError.value = true)
			}, null, 40, _hoisted_2)) : (openBlock(), createElementBlock("div", _hoisted_3, [_cache[1] || (_cache[1] = createBaseVNode("i", { class: "icon-[lucide--box] text-3xl text-muted-foreground" }, null, -1)), createBaseVNode("span", _hoisted_4, toDisplayString(_ctx.$t("assetBrowser.media.threeDModelPlaceholder")), 1)]))]);
		};
	}
});
export { Media3DTop_default as default };

//# sourceMappingURL=Media3DTop-DUcYiC7_.js.map