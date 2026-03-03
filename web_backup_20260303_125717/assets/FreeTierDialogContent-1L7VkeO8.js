import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-BMWHeZll.js";
import "./vendor-firebase-DN8BxCYa.js";
import { A as createCommentVNode, D as computed, F as createTextVNode, I as createVNode, O as createBaseVNode, R as defineComponent, Rt as unref, S as Fragment, Ut as toDisplayString, _t as withCtx, et as openBlock, j as createElementBlock } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-Cb4peHqA.js";
import "./useFeatureFlags-S1sG8YIk.js";
import "./vendor-reka-ui-jxMUDvZT.js";
import "./api-C6dyasG5.js";
import "./vendor-markdown-BPt2PdDp.js";
import "./colorUtil-CQE2D_f9.js";
import "./i18n-Dy4mrtIR.js";
import { t as Button_default } from "./Button-D4w5_e9I.js";
import { Zr as useSubscription, bi as getTierCredits } from "./dialogService-B_z161HY.js";
import "./extensionStore-CZdQWzqz.js";
import "./userStore-BvkQCZf0.js";
import "./useErrorHandling-CX7OTxv3.js";
import "./useExternalLink-BDqUsXhK.js";
import "./vendor-tiptap-DTO2QA4Q.js";
import "./markdownRendererUtil-CrR6m0CH.js";
import "./Popover-oAJ3EQ_X.js";
import { n as cloud_subscription_default, t as SubscriptionBenefits_default } from "./SubscriptionBenefits-CJzs-0-D.js";
var _hoisted_1 = { class: "relative grid h-full grid-cols-5" };
var _hoisted_2 = { class: "col-span-3 flex flex-col justify-between p-8" };
var _hoisted_3 = { class: "flex flex-col gap-6" };
var _hoisted_4 = { class: "text-sm text-text-primary" };
var _hoisted_5 = {
	key: 0,
	class: "m-0 text-sm text-text-secondary"
};
var _hoisted_6 = {
	key: 1,
	class: "m-0 text-sm text-text-secondary"
};
var _hoisted_7 = {
	key: 2,
	class: "m-0 text-sm text-text-secondary"
};
var _hoisted_8 = { class: "flex flex-col pt-8" };
var FreeTierDialogContent_default = /* @__PURE__ */ defineComponent({
	__name: "FreeTierDialogContent",
	props: { reason: {} },
	emits: ["close", "upgrade"],
	setup(__props) {
		const { formattedRenewalDate } = useSubscription();
		const freeTierCredits = computed(() => getTierCredits("free"));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createVNode(Button_default, {
					size: "icon",
					variant: "muted-textonly",
					class: "rounded-full absolute top-2.5 right-2.5 z-10 h-8 w-8 p-0 text-white hover:bg-white/20",
					"aria-label": _ctx.$t("g.close"),
					onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close", false))
				}, {
					default: withCtx(() => [..._cache[2] || (_cache[2] = [createBaseVNode("i", { class: "pi pi-times" }, null, -1)])]),
					_: 1
				}, 8, ["aria-label"]),
				_cache[3] || (_cache[3] = createBaseVNode("div", { class: "relative col-span-2 flex items-center justify-center overflow-hidden rounded-sm" }, [createBaseVNode("video", {
					autoplay: "",
					loop: "",
					muted: "",
					playsinline: "",
					class: "h-full min-w-[125%] object-cover p-0",
					style: { "margin-left": "-20%" }
				}, [createBaseVNode("source", {
					src: "" + new URL("images/cloud-subscription.webm", import.meta.url).href,
					type: "video/webm"
				})])], -1)),
				createBaseVNode("div", _hoisted_2, [createBaseVNode("div", null, [createBaseVNode("div", _hoisted_3, [
					createBaseVNode("div", _hoisted_4, [__props.reason === "out_of_credits" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(_ctx.$t("subscription.freeTier.outOfCredits.title")), 1)], 64)) : __props.reason === "top_up_blocked" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(_ctx.$t("subscription.freeTier.topUpBlocked.title")), 1)], 64)) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [createTextVNode(toDisplayString(_ctx.$t("subscription.freeTier.title")), 1)], 64))]),
					__props.reason === "out_of_credits" ? (openBlock(), createElementBlock("p", _hoisted_5, toDisplayString(_ctx.$t("subscription.freeTier.outOfCredits.subtitle")), 1)) : createCommentVNode("", true),
					!__props.reason || __props.reason === "subscription_required" ? (openBlock(), createElementBlock("p", _hoisted_6, toDisplayString(freeTierCredits.value ? _ctx.$t("subscription.freeTier.description", { credits: freeTierCredits.value.toLocaleString() }) : _ctx.$t("subscription.freeTier.descriptionGeneric")), 1)) : createCommentVNode("", true),
					(!__props.reason || __props.reason === "subscription_required") && unref(formattedRenewalDate) ? (openBlock(), createElementBlock("p", _hoisted_7, toDisplayString(_ctx.$t("subscription.freeTier.nextRefresh", { date: unref(formattedRenewalDate) })), 1)) : createCommentVNode("", true)
				]), createVNode(SubscriptionBenefits_default, {
					"is-free-tier": "",
					class: "mt-6 text-muted"
				})]), createBaseVNode("div", _hoisted_8, [createVNode(Button_default, {
					class: "w-full rounded-lg bg-[var(--color-accent-blue,#0B8CE9)] px-4 py-2 font-inter text-sm font-bold text-white hover:bg-[var(--color-accent-blue,#0B8CE9)]/90",
					onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("upgrade"))
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(__props.reason === "out_of_credits" || __props.reason === "top_up_blocked" ? _ctx.$t("subscription.freeTier.upgradeCta") : _ctx.$t("subscription.freeTier.subscribeCta")), 1)]),
					_: 1
				})])])
			]);
		};
	}
});
export { FreeTierDialogContent_default as default };

//# sourceMappingURL=FreeTierDialogContent-1L7VkeO8.js.map