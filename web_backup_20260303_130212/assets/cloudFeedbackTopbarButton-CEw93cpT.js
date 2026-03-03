import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-CNPGb1TW.js";
import "./vendor-firebase-DN8BxCYa.js";
import "./vendor-other-qJz1Z78N.js";
import "./useFeatureFlags-BlMvC2mV.js";
import "./vendor-reka-ui-jxMUDvZT.js";
import "./api-DArsZFwY.js";
import "./vendor-markdown-BPt2PdDp.js";
import "./colorUtil-BKg8i9Q6.js";
import { o as t } from "./i18n-syd3PJfQ.js";
import "./Button-D8fmNaXY.js";
import { jn as useExtensionService } from "./dialogService-BUdss0z2.js";
import "./extensionStore-C8F8CzIg.js";
import "./userStore-D93A7Tj9.js";
import "./useErrorHandling-4WJW_EDk.js";
import "./huizhiAuthService-xKOJ1ACT.js";
import "./useExternalLink-tAAZu4wg.js";
import "./vendor-tiptap-C9679tdI.js";
import "./markdownRendererUtil-Q53IsTUL.js";
import "./Popover-bsCD7nil.js";
import { r as getDistribution, t as ZENDESK_FIELDS } from "./config-DHdaoc6Y.js";
var ZENDESK_BASE_URL = "https://support.comfy.org/hc/en-us/requests/new";
var ZENDESK_FEEDBACK_FORM_ID = "43066738713236";
var distribution = getDistribution();
var feedbackUrl = `${ZENDESK_BASE_URL}?${new URLSearchParams({
	ticket_form_id: ZENDESK_FEEDBACK_FORM_ID,
	[ZENDESK_FIELDS.DISTRIBUTION]: distribution
}).toString()}`;
var buttons = [{
	icon: "icon-[lucide--message-circle-question-mark]",
	label: t("actionbar.feedback"),
	tooltip: t("actionbar.feedbackTooltip"),
	onClick: () => {
		window.open(feedbackUrl, "_blank", "noopener,noreferrer");
	}
}];
useExtensionService().registerExtension({
	name: "Comfy.Cloud.FeedbackButton",
	actionBarButtons: buttons
});

//# sourceMappingURL=cloudFeedbackTopbarButton-CEw93cpT.js.map