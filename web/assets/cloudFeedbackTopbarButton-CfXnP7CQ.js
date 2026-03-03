import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-CNPGb1TW.js";
import "./vendor-firebase-DN8BxCYa.js";
import "./vendor-other-qJz1Z78N.js";
import "./useFeatureFlags-DpouF8An.js";
import "./vendor-reka-ui-jxMUDvZT.js";
import "./api-DbPc6hdO.js";
import "./vendor-markdown-BPt2PdDp.js";
import "./colorUtil-BKg8i9Q6.js";
import { o as t } from "./i18n-syd3PJfQ.js";
import "./Button-D8fmNaXY.js";
import { jn as useExtensionService } from "./dialogService-jMbkA1JN.js";
import "./extensionStore-BiUCqCK1.js";
import "./userStore-xAnKQzRd.js";
import "./useErrorHandling-BsEGEjB8.js";
import "./huizhiAuthService-DTHsM6kC.js";
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

//# sourceMappingURL=cloudFeedbackTopbarButton-CfXnP7CQ.js.map