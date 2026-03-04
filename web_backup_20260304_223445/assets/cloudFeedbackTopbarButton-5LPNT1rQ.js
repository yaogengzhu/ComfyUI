import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-BEjAYGWm.js";
import "./vendor-firebase-DN8BxCYa.js";
import "./vendor-other-qJz1Z78N.js";
import "./useFeatureFlags-B3RwD6hI.js";
import "./vendor-reka-ui-C26MN8JS.js";
import "./api-D2HJ3Cuk.js";
import "./vendor-markdown-DF7_n7Ki.js";
import "./colorUtil-CyOZxXkW.js";
import { o as t } from "./i18n-Ce5inB5_.js";
import "./userStore-CgWi1Hiu.js";
import "./huizhiAuthService-Mxdj0XpZ.js";
import { Pn as useExtensionService } from "./teamWorkspaceStore-B1oHaZID.js";
import "./Button-AKQyxeyD.js";
import "./extensionStore-DbCclKhl.js";
import "./useErrorHandling-C6LadziV.js";
import "./useExternalLink-RgafkIwT.js";
import "./vendor-tiptap-C9679tdI.js";
import "./markdownRendererUtil-rU1hBHFB.js";
import "./Popover-DMhMBlU6.js";
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

//# sourceMappingURL=cloudFeedbackTopbarButton-5LPNT1rQ.js.map