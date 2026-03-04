import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { F as script } from "./vendor-primevue-CN8WO3jr.js";
import { D as computed, Ht as normalizeStyle, R as defineComponent, Rt as unref, Ut as toDisplayString, et as openBlock, j as createElementBlock, k as createBlock, kt as ref } from "./vendor-vue-core-tg-oZu4l.js";
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
var WorkspaceProfilePic_default = /* @__PURE__ */ defineComponent({
	__name: "WorkspaceProfilePic",
	props: { workspaceName: {} },
	setup(__props) {
		const letter = computed(() => __props.workspaceName?.charAt(0)?.toUpperCase() ?? "?");
		const gradient = computed(() => {
			const seed = letter.value.charCodeAt(0);
			function mulberry32(a) {
				return function() {
					let t = a += 1831565813;
					t = Math.imul(t ^ t >>> 15, t | 1);
					t ^= t + Math.imul(t ^ t >>> 7, t | 61);
					return ((t ^ t >>> 14) >>> 0) / 4294967296;
				};
			}
			const rand = mulberry32(seed);
			const hue1 = Math.floor(rand() * 360);
			const hue2 = (hue1 + 40 + Math.floor(rand() * 80)) % 360;
			const sat = 65 + Math.floor(rand() * 20);
			const light = 55 + Math.floor(rand() * 15);
			return `linear-gradient(135deg, hsl(${hue1}, ${sat}%, ${light}%), hsl(${hue2}, ${sat}%, ${light}%))`;
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: "flex size-8 items-center justify-center rounded-md text-base font-semibold text-white",
				style: normalizeStyle({
					background: gradient.value,
					textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)"
				})
			}, toDisplayString(letter.value), 5);
		};
	}
});
export { UserAvatar_default as n, WorkspaceProfilePic_default as t };

//# sourceMappingURL=WorkspaceProfilePic-BMWsAqma.js.map