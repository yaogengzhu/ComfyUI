import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { O as createBaseVNode, R as defineComponent, Ut as toDisplayString, b as withModifiers, et as openBlock, j as createElementBlock } from "./vendor-vue-core-tg-oZu4l.js";
var _hoisted_1 = { class: "relative size-full overflow-hidden rounded" };
var _hoisted_2 = { class: "flex size-full flex-col items-center justify-center gap-2 bg-modal-card-placeholder-background transition-transform duration-300 group-hover:scale-105 group-data-[selected=true]:scale-105" };
var _hoisted_3 = { class: "text-base-foreground" };
var _hoisted_4 = ["src"];
var MediaAudioTop_default = /* @__PURE__ */ defineComponent({
	__name: "MediaAudioTop",
	props: { asset: {} },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [_cache[1] || (_cache[1] = createBaseVNode("i", { class: "icon-[lucide--music] text-3xl text-base-foreground" }, null, -1)), createBaseVNode("span", _hoisted_3, toDisplayString(_ctx.$t("assetBrowser.media.audioPlaceholder")), 1)]), createBaseVNode("audio", {
				controls: "",
				class: "absolute bottom-0 left-0 w-full p-2",
				src: __props.asset.src,
				onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"]))
			}, null, 8, _hoisted_4)]);
		};
	}
});
export { MediaAudioTop_default as default };

//# sourceMappingURL=MediaAudioTop-afOf95jx.js.map