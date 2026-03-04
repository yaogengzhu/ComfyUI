import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { D as computed, F as createTextVNode, O as createBaseVNode, R as defineComponent, Ut as toDisplayString, _t as withCtx, at as resolveDirective, et as openBlock, k as createBlock, vt as withDirectives } from "./vendor-vue-core-tg-oZu4l.js";
import { t as isCloud } from "./types-YYe-ycsK.js";
import { t as useTelemetry } from "./telemetry-BkGuQ88V.js";
import { pt as breakpointsTailwind, vt as useBreakpoints } from "./vendor-reka-ui-C26MN8JS.js";
import { n as useI18n } from "./vendor-i18n-D6iZeZ7U.js";
import { Qr as useBillingContext } from "./teamWorkspaceStore-B1oHaZID.js";
import { t as Button_default } from "./Button-AKQyxeyD.js";
var SubscribeToRun_default = /* @__PURE__ */ defineComponent({
	__name: "SubscribeToRun",
	setup(__props) {
		const { t } = useI18n();
		const isMdOrLarger = useBreakpoints(breakpointsTailwind).greaterOrEqual("md");
		const buttonLabel = computed(() => isMdOrLarger.value ? t("subscription.subscribeToRunFull") : t("subscription.subscribeToRun"));
		const { showSubscriptionDialog } = useBillingContext();
		const handleSubscribeToRun = () => {
			if (isCloud) useTelemetry()?.trackRunButton({ subscribe_to_run: true });
			showSubscriptionDialog();
		};
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return withDirectives((openBlock(), createBlock(Button_default, {
				class: "subscribe-to-run-button whitespace-nowrap",
				variant: "primary",
				size: "sm",
				style: {
					background: "var(--color-subscription-button-gradient)",
					color: "var(--color-white)",
					borderColor: "transparent"
				},
				"data-testid": "subscribe-to-run-button",
				onClick: handleSubscribeToRun
			}, {
				default: withCtx(() => [_cache[0] || (_cache[0] = createBaseVNode("i", { class: "pi pi-lock" }, null, -1)), createTextVNode(" " + toDisplayString(buttonLabel.value), 1)]),
				_: 1
			})), [[
				_directive_tooltip,
				{
					value: _ctx.$t("subscription.subscribeToRunFull"),
					showDelay: 600
				},
				void 0,
				{ bottom: true }
			]]);
		};
	}
});
export { SubscribeToRun_default as t };

//# sourceMappingURL=SubscribeToRun-DziZygnm.js.map