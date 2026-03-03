import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { t as isCloud } from "./types-YYe-ycsK.js";
const ZENDESK_FIELDS = {
	DISTRIBUTION: "tf_42243568391700",
	ANONYMOUS_EMAIL: "tf_anonymous_requester_email",
	EMAIL: "tf_40029135130388",
	USER_ID: "tf_42515251051412"
};
function getDistribution() {
	if (isCloud) return "ccloud";
	return "oss";
}
var SUPPORT_BASE_URL = "https://support.comfy.org/hc/en-us/requests/new";
function buildSupportUrl(params) {
	const searchParams = new URLSearchParams({ [ZENDESK_FIELDS.DISTRIBUTION]: getDistribution() });
	if (params?.userEmail) {
		searchParams.append(ZENDESK_FIELDS.ANONYMOUS_EMAIL, params.userEmail);
		searchParams.append(ZENDESK_FIELDS.EMAIL, params.userEmail);
	}
	if (params?.userId) searchParams.append(ZENDESK_FIELDS.USER_ID, params.userId);
	return `${SUPPORT_BASE_URL}?${searchParams.toString()}`;
}
export { buildSupportUrl as n, getDistribution as r, ZENDESK_FIELDS as t };

//# sourceMappingURL=config-si7vt_Ns.js.map