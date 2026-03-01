import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { A as createCommentVNode, Bt as normalizeClass, D as computed, O as createBaseVNode, R as defineComponent, Rt as unref, S as Fragment, et as openBlock, j as createElementBlock } from "./vendor-vue-core-tg-oZu4l.js";
import { t as cn } from "./src-CaI548es.js";
var _hoisted_1 = { class: "pointer-events-none absolute inset-0 flex items-center justify-center" };
var VideoPlayOverlay_default = /* @__PURE__ */ defineComponent({
	__name: "VideoPlayOverlay",
	props: {
		visible: {
			type: Boolean,
			default: true
		},
		size: { default: "md" },
		overlayClass: { default: "bg-black/15" }
	},
	setup(__props) {
		const iconSizeClass = computed(() => __props.size === "sm" ? "size-3" : "size-6");
		return (_ctx, _cache) => {
			return __props.visible ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("div", { class: normalizeClass(unref(cn)("pointer-events-none absolute inset-0", __props.overlayClass)) }, null, 2), createBaseVNode("div", _hoisted_1, [createBaseVNode("i", {
				"aria-hidden": "true",
				class: normalizeClass(unref(cn)("icon-[lucide--play] text-white", iconSizeClass.value))
			}, null, 2)])], 64)) : createCommentVNode("", true);
		};
	}
});
export { VideoPlayOverlay_default as t };

//# sourceMappingURL=VideoPlayOverlay-B8XMbqrh.js.map