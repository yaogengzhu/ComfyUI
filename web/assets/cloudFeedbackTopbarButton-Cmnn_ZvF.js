import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-BMWHeZll.js";
import "./vendor-firebase-DN8BxCYa.js";
import "./vendor-other-Cb4peHqA.js";
import "./useFeatureFlags-CQzrYTw1.js";
import "./vendor-reka-ui-jxMUDvZT.js";
import "./api-CrHaA16j.js";
import "./vendor-markdown-BPt2PdDp.js";
import "./colorUtil-CQE2D_f9.js";
import { o as t } from "./i18n-Dy4mrtIR.js";
import "./Button-D4w5_e9I.js";
import { jn as useExtensionService } from "./dialogService-Cm1QZvWM.js";
import "./extensionStore-jct1qmkK.js";
import "./userStore-B8DDUPuE.js";
import "./useErrorHandling-D8IRIzSw.js";
import "./useExternalLink-BDqUsXhK.js";
import "./vendor-tiptap-DTO2QA4Q.js";
import "./markdownRendererUtil-CrR6m0CH.js";
import "./Popover-oAJ3EQ_X.js";
import { r as getDistribution, t as ZENDESK_FIELDS } from "./config-si7vt_Ns.js";
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

//# sourceMappingURL=cloudFeedbackTopbarButton-Cmnn_ZvF.js.map