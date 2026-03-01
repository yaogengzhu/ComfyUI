import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-kyY2H95P.js";
import "./vendor-firebase-DnyyBhvM.js";
import "./vendor-other-C6-gqLl2.js";
import "./useFeatureFlags-DckF7njG.js";
import "./vendor-reka-ui--l_O1Shn.js";
import "./api-DO80yGLB.js";
import "./vendor-markdown-DFo_IkzS.js";
import "./colorUtil-CPODED-Q.js";
import { o as t } from "./i18n-CrjEfjCc.js";
import "./Button-DQNHabQW.js";
import { jn as useExtensionService } from "./dialogService-CX-W6rM1.js";
import "./extensionStore-D4phRtC7.js";
import "./userStore-By-hILYF.js";
import "./useErrorHandling-CY3ZcjJs.js";
import "./useExternalLink-DGE106nN.js";
import "./vendor-tiptap-BnYkbQDM.js";
import "./markdownRendererUtil-COLKL0Bq.js";
import "./Popover-DEsU7dja.js";
import { r as getDistribution, t as ZENDESK_FIELDS } from "./config-CGn5JFmU.js";
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

//# sourceMappingURL=cloudFeedbackTopbarButton-BP7M33lf.js.map