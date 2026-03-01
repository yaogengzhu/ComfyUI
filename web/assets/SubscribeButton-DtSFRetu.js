import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { Bt as normalizeClass, F as createTextVNode, Ht as normalizeStyle, R as defineComponent, Rt as unref, Ut as toDisplayString, Y as onBeforeUnmount, _t as withCtx, et as openBlock, k as createBlock, kt as ref, pt as watch } from "./vendor-vue-core-tg-oZu4l.js";
import { t as isCloud } from "./types-DT3N7am7.js";
import { t as useTelemetry } from "./telemetry-zZf2dHJ2.js";
import { t as cn } from "./src-CaI548es.js";
import { t as Button_default } from "./Button-DQNHabQW.js";
import { Yr as useBillingContext, Zr as useSubscription } from "./dialogService-B--1tJQn.js";
var SubscribeButton_default = /* @__PURE__ */ defineComponent({
	__name: "SubscribeButton",
	props: {
		label: {},
		size: { default: "lg" },
		variant: { default: "default" },
		fluid: {
			type: Boolean,
			default: true
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	emits: ["subscribed"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const { isActiveSubscription, showSubscriptionDialog } = useBillingContext();
		const { subscriptionTier } = useSubscription();
		const isAwaitingStripeSubscription = ref(false);
		watch([isAwaitingStripeSubscription, isActiveSubscription], ([awaiting, isActive]) => {
			if (isCloud && awaiting && isActive) {
				emit("subscribed");
				isAwaitingStripeSubscription.value = false;
			}
		});
		const handleSubscribe = () => {
			if (isCloud) useTelemetry()?.trackSubscription("subscribe_clicked", { current_tier: subscriptionTier.value?.toLowerCase() });
			isAwaitingStripeSubscription.value = true;
			showSubscriptionDialog();
		};
		onBeforeUnmount(() => {
			isAwaitingStripeSubscription.value = false;
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(Button_default, {
				size: __props.size,
				disabled: __props.disabled,
				variant: "primary",
				style: normalizeStyle(__props.variant === "gradient" ? {
					background: "var(--color-subscription-button-gradient)",
					color: "var(--color-white)"
				} : void 0),
				class: normalizeClass(unref(cn)("font-bold", __props.fluid && "w-full")),
				onClick: handleSubscribe
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(__props.label || _ctx.$t("subscription.required.subscribe")), 1)]),
				_: 1
			}, 8, [
				"size",
				"disabled",
				"style",
				"class"
			]);
		};
	}
});
export { SubscribeButton_default as t };

//# sourceMappingURL=SubscribeButton-DtSFRetu.js.map