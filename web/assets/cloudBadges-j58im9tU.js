import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-kyY2H95P.js";
import "./vendor-firebase-DnyyBhvM.js";
import { D as computed } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-C6-gqLl2.js";
import { i as remoteConfig } from "./useFeatureFlags-DckF7njG.js";
import "./vendor-reka-ui--l_O1Shn.js";
import "./api-DO80yGLB.js";
import "./vendor-markdown-DFo_IkzS.js";
import "./colorUtil-CPODED-Q.js";
import "./i18n-CrjEfjCc.js";
import "./Button-DQNHabQW.js";
import { jn as useExtensionService } from "./dialogService-CX-W6rM1.js";
import "./extensionStore-D4phRtC7.js";
import "./userStore-By-hILYF.js";
import "./useErrorHandling-CY3ZcjJs.js";
import "./useExternalLink-DGE106nN.js";
import "./vendor-tiptap-BnYkbQDM.js";
import "./markdownRendererUtil-COLKL0Bq.js";
import "./Popover-DEsU7dja.js";
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

//# sourceMappingURL=cloudBadges-j58im9tU.js.map