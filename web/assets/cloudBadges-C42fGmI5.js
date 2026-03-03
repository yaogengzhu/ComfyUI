import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-BEjAYGWm.js";
import "./vendor-firebase-DN8BxCYa.js";
import { D as computed } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-qJz1Z78N.js";
import { i as remoteConfig } from "./useFeatureFlags-B3RwD6hI.js";
import "./vendor-reka-ui-C26MN8JS.js";
import "./api-D2HJ3Cuk.js";
import "./vendor-markdown-DF7_n7Ki.js";
import "./colorUtil-CyOZxXkW.js";
import "./i18n-Ce5inB5_.js";
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
var badges = computed(() => {
	const result = [];
	const alert = remoteConfig.value.server_health_alert;
	if (alert) result.push({
		text: alert.message,
		label: alert.badge,
		variant: alert.severity ?? "error",
		tooltip: alert.tooltip
	});
	result.push({
		icon: "icon-[lucide--cloud]",
		text: "Comfy Cloud"
	});
	return result;
});
useExtensionService().registerExtension({
	name: "Comfy.Cloud.Badges",
	get topbarBadges() {
		return badges.value;
	}
});

//# sourceMappingURL=cloudBadges-C42fGmI5.js.map