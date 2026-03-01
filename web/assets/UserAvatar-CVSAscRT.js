import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { z as script } from "./vendor-primevue-kyY2H95P.js";
import { D as computed, R as defineComponent, Rt as unref, et as openBlock, k as createBlock, kt as ref } from "./vendor-vue-core-tg-oZu4l.js";
var UserAvatar_default = /* @__PURE__ */ defineComponent({
	__name: "UserAvatar",
	props: {
		photoUrl: {},
		ariaLabel: {}
	},
	setup(__props) {
		const imageError = ref(false);
		const handleImageError = () => {
			imageError.value = true;
		};
		const hasAvatar = computed(() => __props.photoUrl && !imageError.value);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(script), {
				class: "bg-interface-panel-selected-surface",
				image: __props.photoUrl ?? void 0,
				icon: hasAvatar.value ? void 0 : "icon-[lucide--user]",
				"pt:icon:class": { "size-4": !hasAvatar.value },
				shape: "circle",
				"aria-label": __props.ariaLabel ?? _ctx.$t("auth.login.userAvatar"),
				onError: handleImageError
			}, null, 8, [
				"image",
				"icon",
				"pt:icon:class",
				"aria-label"
			]);
		};
	}
});
export { UserAvatar_default as t };

//# sourceMappingURL=UserAvatar-CVSAscRT.js.map