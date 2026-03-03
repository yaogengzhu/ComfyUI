const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./i18n-ikYH1TOE.js","./vendor-primevue-CNPGb1TW.js","./rolldown-runtime-DLICfi3-.js","./vendor-vue-core-tg-oZu4l.js","./i18n-syd3PJfQ.js","./vendor-i18n-86kE_LSO.js"])))=>i.map(i=>d[i]);
import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { ct as __vitePreload } from "./vendor-primevue-CNPGb1TW.js";
import { c as defineStore, l as storeToRefs } from "./vendor-vue-core-tg-oZu4l.js";
import { t as isCloud } from "./types-YYe-ycsK.js";
import { $t as until, _t as useAsyncState } from "./vendor-reka-ui-jxMUDvZT.js";
import { r as api } from "./api-DbPc6hdO.js";
import { Di as useWorkflowStore, i as useSettingStore, ii as useFirebaseAuthStore } from "./dialogService-jMbkA1JN.js";
import { t as useUserStore } from "./userStore-xAnKQzRd.js";
const useBootstrapStore = defineStore("bootstrap", () => {
	const settingStore = useSettingStore();
	const workflowStore = useWorkflowStore();
	const { isReady: isI18nReady, error: i18nError, execute: loadI18n } = useAsyncState(async () => {
		const { mergeCustomNodesI18n } = await __vitePreload(async () => {
			const { mergeCustomNodesI18n } = await import("./i18n-ikYH1TOE.js");
			return { mergeCustomNodesI18n };
		}, __vite__mapDeps([0,1,2,3,4,5]), import.meta.url);
		mergeCustomNodesI18n(await api.getCustomNodesI18n());
	}, void 0, { immediate: false });
	let storesLoaded = false;
	function loadAuthenticatedStores() {
		if (storesLoaded) return;
		storesLoaded = true;
		settingStore.load();
		workflowStore.loadWorkflows();
	}
	async function startStoreBootstrap() {
		const userStore = useUserStore();
		await userStore.initialize();
		if (isCloud) {
			const { isInitialized } = storeToRefs(useFirebaseAuthStore());
			await until(isInitialized).toBe(true);
		}
		const { needsLogin } = storeToRefs(userStore);
		await until(needsLogin).toBe(false);
		loadI18n();
		loadAuthenticatedStores();
	}
	return {
		isI18nReady,
		i18nError,
		startStoreBootstrap
	};
});
export { useBootstrapStore as t };

//# sourceMappingURL=bootstrapStore-B34Dzy98.js.map