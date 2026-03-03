import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { D as computed, R as defineComponent, et as openBlock, k as createBlock } from "./vendor-vue-core-tg-oZu4l.js";
import { t as TopbarBadge_default } from "./TopbarBadge-Cw5Y1nqL.js";
var CloudBadge_default = /* @__PURE__ */ defineComponent({
	__name: "CloudBadge",
	props: {
		displayMode: { default: "full" },
		reverseOrder: {
			type: Boolean,
			default: false
		},
		noPadding: {
			type: Boolean,
			default: false
		},
		backgroundColor: { default: "var(--comfy-menu-bg)" }
	},
	setup(__props) {
		const cloudBadge = computed(() => ({
			icon: "icon-[lucide--cloud]",
			text: "Comfy Cloud"
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(TopbarBadge_default, {
				badge: cloudBadge.value,
				"display-mode": __props.displayMode,
				"reverse-order": __props.reverseOrder,
				"no-padding": __props.noPadding,
				"background-color": __props.backgroundColor
			}, null, 8, [
				"badge",
				"display-mode",
				"reverse-order",
				"no-padding",
				"background-color"
			]);
		};
	}
});
export { CloudBadge_default as t };

//# sourceMappingURL=CloudBadge-DvjJ_nN3.js.map