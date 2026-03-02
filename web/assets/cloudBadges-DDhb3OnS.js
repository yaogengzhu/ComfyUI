import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-DxYsW_Ng.js";
import "./vendor-firebase-DnyyBhvM.js";
import { D as computed } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-C6-gqLl2.js";
import { i as remoteConfig } from "./useFeatureFlags-Dnd7jUcL.js";
import "./vendor-reka-ui--l_O1Shn.js";
import "./api-DOdPpzBQ.js";
import "./vendor-markdown-DFo_IkzS.js";
import "./colorUtil-CPODED-Q.js";
import "./i18n-Dw0liyWq.js";
import "./Button-DQNHabQW.js";
import { jn as useExtensionService } from "./dialogService-Cvv-0VJU.js";
import "./extensionStore-Bdf5va2b.js";
import "./userStore-DwJpPtEY.js";
import "./useErrorHandling-DpzK5H7m.js";
import "./useExternalLink-BC_To13P.js";
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

//# sourceMappingURL=cloudBadges-DDhb3OnS.js.map