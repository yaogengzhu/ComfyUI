import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { Bt as normalizeClass, O as createBaseVNode, R as defineComponent, Rt as unref, Z as onMounted, et as openBlock, j as createElementBlock, kt as ref, q as nextTick, rt as renderSlot, v as vShow, vt as withDirectives } from "./vendor-vue-core-tg-oZu4l.js";
import { n as isDesktop } from "./types-YYe-ycsK.js";
import { n as isNativeWindow, t as electronAPI } from "./envUtil-BB56f-md.js";
var _hoisted_1 = { class: "flex w-full grow items-center justify-center overflow-auto" };
var BaseViewTemplate_default = /* @__PURE__ */ defineComponent({
	__name: "BaseViewTemplate",
	props: { dark: {
		type: Boolean,
		default: false
	} },
	setup(__props) {
		const darkTheme = {
			color: "rgba(0, 0, 0, 0)",
			symbolColor: "#d4d4d4"
		};
		const lightTheme = {
			color: "rgba(0, 0, 0, 0)",
			symbolColor: "#171717"
		};
		const topMenuRef = ref(null);
		onMounted(async () => {
			if (isDesktop) {
				await nextTick();
				electronAPI().changeTheme({
					...__props.dark ? darkTheme : lightTheme,
					height: topMenuRef.value?.getBoundingClientRect().height ?? 0
				});
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(["flex h-svh w-screen flex-col font-sans", [__props.dark ? "dark-theme bg-neutral-900 text-neutral-300" : "bg-neutral-300 text-neutral-900"]]) }, [withDirectives(createBaseVNode("div", {
				ref_key: "topMenuRef",
				ref: topMenuRef,
				class: "app-drag h-(--comfy-topbar-height) w-full"
			}, null, 512), [[vShow, unref(isNativeWindow)()]]), createBaseVNode("div", _hoisted_1, [renderSlot(_ctx.$slots, "default")])], 2);
		};
	}
});
export { BaseViewTemplate_default as t };

//# sourceMappingURL=BaseViewTemplate-oc-WcTCm.js.map