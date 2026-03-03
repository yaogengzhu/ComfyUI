const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./onboardingCloudRoutes-ClIcQg3A.js","./rolldown-runtime-DLICfi3-.js","./vendor-primevue-BEjAYGWm.js","./vendor-vue-core-tg-oZu4l.js","./GraphView-CDp2LQwl.js","./_plugin-vue_export-helper-CoBaw5e7.js","./vendor-other-qJz1Z78N.js","./vendor-firebase-DN8BxCYa.js","./vendor-three-C69yBO64.js","./vendor-tiptap-C9679tdI.js","./vendor-reka-ui-C26MN8JS.js","./vendor-i18n-D6iZeZ7U.js","./vendor-vueuse-CnrwrmRD.js","./vendor-markdown-DF7_n7Ki.js","./vendor-zod-CWPLeK_6.js","./extensionStore-DbCclKhl.js","./api-D2HJ3Cuk.js","./vendor-axios-C5af7X-l.js","./vendor-yjs-BX4XEX0j.js","./i18n-Ce5inB5_.js","./widget-DTr1rh-S.js","./types-YYe-ycsK.js","./colorUtil-CyOZxXkW.js","./teamWorkspaceStore-B1oHaZID.js","./src-CqWvSCI8.js","./Popover-DMhMBlU6.js","./Button-AKQyxeyD.js","./SelectValue-DlMdq0Ym.js","./useErrorHandling-C6LadziV.js","./useExternalLink-RgafkIwT.js","./envUtil-BB56f-md.js","./useFeatureFlags-B3RwD6hI.js","./VideoPlayOverlay-Cgac-4a_.js","./telemetry-BkGuQ88V.js","./huizhiAuthService-Mxdj0XpZ.js","./userStore-CgWi1Hiu.js","./widgetTypes-0MCr4N7Z.js","./markdownRendererUtil-rU1hBHFB.js","./ScrubableNumberInput-Xg2n1rV8.js","./UserAvatar-Bn93vUi1.js","./WidgetInputNumber-DEpeZeGu.js","./Slider-0hBI6GZj.js","./WidgetWithControl-DVumFMTc.js","./WidgetLayoutField-C8_pjSsJ.js","./layout-DwV6zUl5.js","./widgetPropFilter-3RmcXtGi.js","./GlobalToast-CDwj1wHf.js","./TopbarBadge-BTwcLPtd.js","./SubscribeToRun-DziZygnm.js","./keybindingService-CBYpdy4B.js","./config-DHdaoc6Y.js","./releaseStore-Dm8npbwL.js","./WorkspaceProfilePic-DGV1jokh.js","./useWorkspaceSwitch-DxMbnFoH.js","./FormSearchInput-B3Em6ZO3.js","./changeTracker-Bcva1PBE.js","./bootstrapStore-VJu3vm3X.js","./serverConfigStore-BLw3xDjy.js","./graphHasMissingNodes-Qn-eOSK2.js","./huizhi-logo-CEz6JG1a.js","./vendor-other-DODGPXtn.css","./teamWorkspaceStore-BQOo2Utv.css","./WidgetInputNumber-DIzPLv5y.css","./GraphView-BUQHi8WH.css","./UserSelectView-BXIF1S6I.js","./BaseViewTemplate-DJvoZtpb.js"])))=>i.map(i=>d[i]);
import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { W as script$1, _t as ke, ct as __vitePreload, ft as ConfirmationService, gt as index, lt as Tooltip, mt as PrimeVue, st as script, ut as ToastService } from "./vendor-primevue-BEjAYGWm.js";
import { t as init } from "./vendor-sentry-BHZ24crG.js";
import { B as initializeApp } from "./vendor-firebase-DN8BxCYa.js";
import { A as createCommentVNode, D as computed, I as createVNode, K as mergeProps, N as createSlots, O as createBaseVNode, R as defineComponent, Rt as unref, S as Fragment, Ut as toDisplayString, Z as onMounted, _t as withCtx, et as openBlock, i as createWebHistory, it as resolveComponent, j as createElementBlock, k as createBlock, kt as ref, l as storeToRefs, n as createRouter, nt as renderList, ot as resolveDynamicComponent, p as createApp, r as createWebHashHistory, rt as renderSlot, s as createPinia } from "./vendor-vue-core-tg-oZu4l.js";
import { q as merge, vt as VueFire, yt as VueFireAuth } from "./vendor-other-qJz1Z78N.js";
import { n as isDesktop, t as isCloud } from "./types-YYe-ycsK.js";
import { i as remoteConfig, n as useFeatureFlags } from "./useFeatureFlags-B3RwD6hI.js";
import { t as useTelemetry } from "./telemetry-BkGuQ88V.js";
import { $t as until, Ot as useFavicon, qt as promiseTimeout } from "./vendor-reka-ui-C26MN8JS.js";
import "./api-D2HJ3Cuk.js";
import "./vendor-markdown-DF7_n7Ki.js";
import "./colorUtil-CyOZxXkW.js";
import { n as i18n } from "./i18n-Ce5inB5_.js";
import { t as useUserStore } from "./userStore-CgWi1Hiu.js";
import { a as initHuizhiAuthService, o as isHuizhiLoggedIn } from "./huizhiAuthService-Mxdj0XpZ.js";
import { t as refreshRemoteConfig } from "./refreshRemoteConfig-EsvELWUb.js";
import { Dr as useConflictDetection, Fi as hydratePreservedQuery, K as useWorkspaceStore, Mi as PRESERVED_QUERY_NAMESPACES, Ni as capturePreservedQuery, Or as config_default, gi as useDialogStore, l as app$1, r as useFirebaseAuthStore, t as useTeamWorkspaceStore } from "./teamWorkspaceStore-B1oHaZID.js";
import "./Button-AKQyxeyD.js";
import "./extensionStore-DbCclKhl.js";
import "./useErrorHandling-C6LadziV.js";
import { t as electronAPI } from "./envUtil-BB56f-md.js";
import "./useExternalLink-RgafkIwT.js";
import "./vendor-tiptap-C9679tdI.js";
import "./markdownRendererUtil-rU1hBHFB.js";
import "./Popover-DMhMBlU6.js";
import { t as useBootstrapStore } from "./bootstrapStore-VJu3vm3X.js";
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
var BUILD_TIME_CONFIG = {
	apiKey: "AIzaSyC2-fomLqgCjb7ELwta1I9cEarPK8ziTGs",
	authDomain: "dreamboothy.firebaseapp.com",
	databaseURL: "https://dreamboothy-default-rtdb.firebaseio.com",
	projectId: "dreamboothy",
	storageBucket: "dreamboothy.appspot.com",
	messagingSenderId: "357148958219",
	appId: "1:357148958219:web:f5917f72e5f36a2015310e",
	measurementId: "G-3ZBD3MBTG4"
};
function getFirebaseConfig() {
	if (!isCloud) return BUILD_TIME_CONFIG;
	return remoteConfig.value.firebase_config ?? BUILD_TIME_CONFIG;
}
var _hoisted_1$2 = {
	key: 1,
	class: "fixed inset-0 z-[1100] flex items-center justify-center bg-[var(--p-mask-background)]"
};
var FIREBASE_INIT_TIMEOUT_MS = 16e3;
var CONFIG_REFRESH_TIMEOUT_MS = 1e4;
var WorkspaceAuthGate_default = /* @__PURE__ */ defineComponent({
	__name: "WorkspaceAuthGate",
	setup(__props) {
		const isReady = ref(!isCloud);
		async function initialize() {
			if (!isCloud) return;
			const { isInitialized, currentUser } = storeToRefs(useFirebaseAuthStore());
			try {
				if (!isInitialized.value) await until(isInitialized).toBe(true, { timeout: FIREBASE_INIT_TIMEOUT_MS });
				if (!currentUser.value) {
					isReady.value = true;
					return;
				}
				try {
					await Promise.race([refreshRemoteConfig({ useAuth: true }), promiseTimeout(CONFIG_REFRESH_TIMEOUT_MS).then(() => {
						throw new Error("Config refresh timeout");
					})]);
				} catch (error) {
					console.warn("[WorkspaceAuthGate] Failed to refresh remote config:", error);
				}
				const { flags } = useFeatureFlags();
				if (!flags.teamWorkspacesEnabled) {
					isReady.value = true;
					return;
				}
				await initializeWorkspaceMode();
			} catch (error) {
				console.error("[WorkspaceAuthGate] Initialization failed:", error);
			} finally {
				isReady.value = true;
			}
		}
		async function initializeWorkspaceMode() {
			try {
				const workspaceStore = useTeamWorkspaceStore();
				if (workspaceStore.initState === "uninitialized") await workspaceStore.initialize();
			} catch (error) {
				console.warn("[WorkspaceAuthGate] Failed to initialize workspace store:", error);
			}
		}
		onMounted(() => {
			initialize();
		});
		return (_ctx, _cache) => {
			return isReady.value ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createElementBlock("div", _hoisted_1$2, [createVNode(unref(script))]));
		};
	}
});
var _hoisted_1$1 = { class: "relative h-full w-full overflow-hidden" };
var LayoutDefault_default = /* @__PURE__ */ defineComponent({
	__name: "LayoutDefault",
	setup(__props) {
		useFavicon("/assets/favicon.ico");
		return (_ctx, _cache) => {
			const _component_router_view = resolveComponent("router-view");
			return openBlock(), createBlock(WorkspaceAuthGate_default, null, {
				default: withCtx(() => [createBaseVNode("main", _hoisted_1$1, [createVNode(_component_router_view)])]),
				_: 1
			});
		};
	}
});
const installPreservedQueryTracker = (router, definitions) => {
	const trackedDefinitions = definitions.map((definition) => ({ ...definition }));
	router.beforeEach((to, _from, next) => {
		const queryKeys = new Set(Object.keys(to.query));
		trackedDefinitions.forEach(({ namespace, keys }) => {
			hydratePreservedQuery(namespace);
			if (keys.some((key) => queryKeys.has(key))) capturePreservedQuery(namespace, to.query, keys);
		});
		next();
	});
};
var cloudOnboardingRoutes = isCloud ? (await __vitePreload(async () => {
	const { cloudOnboardingRoutes } = await import("./onboardingCloudRoutes-ClIcQg3A.js");
	return { cloudOnboardingRoutes };
}, __vite__mapDeps([0,1,2,3]), import.meta.url)).cloudOnboardingRoutes : [];
var isFileProtocol = window.location.protocol === "file:";
function getBasePath() {
	if (isCloud) return "./";
	return window.location.pathname;
}
var basePath = getBasePath();
function trackPageView() {
	if (!isCloud || typeof window === "undefined") return;
	useTelemetry()?.trackPageView(document.title, { path: window.location.href });
}
var router = createRouter({
	history: isFileProtocol ? createWebHashHistory() : createWebHistory(basePath),
	routes: [...isCloud ? cloudOnboardingRoutes : [], {
		path: "/",
		component: LayoutDefault_default,
		children: [{
			path: "",
			name: "GraphView",
			component: () => __vitePreload(() => import("./GraphView-CDp2LQwl.js"), __vite__mapDeps([4,5,1,2,3,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63]), import.meta.url),
			beforeEnter: async (_to, _from, next) => {
				const userStore = useUserStore();
				await userStore.initialize();
				if (userStore.needsLogin) next("/user-select");
				else next();
			}
		}, {
			path: "user-select",
			name: "UserSelectView",
			component: () => __vitePreload(() => import("./UserSelectView-BXIF1S6I.js"), __vite__mapDeps([64,1,2,3,6,7,8,9,10,13,26,24,16,17,18,14,19,11,20,21,22,35,65,30,60]), import.meta.url)
		}]
	}],
	scrollBehavior(_to, _from, savedPosition) {
		if (savedPosition) return savedPosition;
		else return { top: 0 };
	}
});
installPreservedQueryTracker(router, [{
	namespace: PRESERVED_QUERY_NAMESPACES.TEMPLATE,
	keys: [
		"template",
		"source",
		"mode"
	]
}, {
	namespace: PRESERVED_QUERY_NAMESPACES.INVITE,
	keys: ["invite"]
}]);
router.afterEach(() => {
	trackPageView();
});
var PUBLIC_PATHS = new Set(["/login", "/register"]);
router.beforeEach(async (to, _from, next) => {
	if (PUBLIC_PATHS.has(to.path)) return next();
	if (!isHuizhiLoggedIn()) return next({
		path: "/login",
		query: to.path !== "/" ? { redirect: encodeURIComponent(to.fullPath) } : {}
	});
	return next();
});
var _hoisted_1 = { key: 0 };
var _hoisted_2 = ["id"];
var GlobalDialog_default = /* @__PURE__ */ defineComponent({
	__name: "GlobalDialog",
	setup(__props) {
		const { flags } = useFeatureFlags();
		const teamWorkspacesEnabled = computed(() => isCloud && flags.teamWorkspacesEnabled);
		const dialogStore = useDialogStore();
		function getDialogPt(item) {
			const isWorkspaceSettingsDialog = item.key === "global-settings" && teamWorkspacesEnabled.value;
			const basePt = item.dialogComponentProps.pt || {};
			if (isWorkspaceSettingsDialog) return merge(basePt, { mask: { class: "p-8" } });
			return basePt;
		}
		return (_ctx, _cache) => {
			return openBlock(true), createElementBlock(Fragment, null, renderList(unref(dialogStore).dialogStack, (item) => {
				return openBlock(), createBlock(unref(script$1), mergeProps({
					key: item.key,
					visible: item.visible,
					"onUpdate:visible": ($event) => item.visible = $event,
					class: "global-dialog"
				}, { ref_for: true }, item.dialogComponentProps, {
					pt: getDialogPt(item),
					"aria-labelledby": item.key
				}), createSlots({
					header: withCtx(() => [!item.dialogComponentProps?.headless ? (openBlock(), createElementBlock("div", _hoisted_1, [item.headerComponent ? (openBlock(), createBlock(resolveDynamicComponent(item.headerComponent), mergeProps({
						key: 0,
						ref_for: true
					}, item.headerProps, { id: item.key }), null, 16, ["id"])) : (openBlock(), createElementBlock("h3", {
						key: 1,
						id: item.key
					}, toDisplayString(item.title || " "), 9, _hoisted_2))])) : createCommentVNode("", true)]),
					default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(item.component), mergeProps({ ref_for: true }, item.contentProps, { maximized: item.dialogComponentProps.maximized }), null, 16, ["maximized"]))]),
					_: 2
				}, [item.footerComponent ? {
					name: "footer",
					fn: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(item.footerComponent), mergeProps({ ref_for: true }, item.footerProps), null, 16))]),
					key: "0"
				} : void 0]), 1040, [
					"visible",
					"onUpdate:visible",
					"pt",
					"aria-labelledby"
				]);
			}), 128);
		};
	}
});
var App_default = /* @__PURE__ */ defineComponent({
	__name: "App",
	setup(__props) {
		const workspaceStore = useWorkspaceStore();
		app$1.extensionManager = useWorkspaceStore();
		const conflictDetection = useConflictDetection();
		const isLoading = computed(() => workspaceStore.spinner);
		const showContextMenu = (event) => {
			const { target } = event;
			switch (true) {
				case target instanceof HTMLTextAreaElement:
				case target instanceof HTMLInputElement && target.type === "text":
					electronAPI()?.showContextMenu({ type: "text" });
					return;
			}
		};
		onMounted(() => {
			window["__COMFYUI_FRONTEND_VERSION__"] = config_default.app_version;
			initHuizhiAuthService();
			if (isDesktop) document.addEventListener("contextmenu", showContextMenu);
			window.addEventListener("vite:preloadError", (event) => {
				event.preventDefault();
				console.error("[vite:preloadError]", event.payload);
			});
			conflictDetection.initializeConflictDetection();
		});
		return (_ctx, _cache) => {
			const _component_router_view = resolveComponent("router-view");
			return openBlock(), createElementBlock(Fragment, null, [
				createVNode(_component_router_view),
				isLoading.value ? (openBlock(), createBlock(unref(script), {
					key: 0,
					class: "absolute inset-0 flex h-[unset] items-center justify-center"
				})) : createCommentVNode("", true),
				createVNode(GlobalDialog_default)
			], 64);
		};
	}
});
var ComfyUIPreset = ke(index, { semantic: { primary: index["primitive"].blue } });
var firebaseApp = initializeApp(getFirebaseConfig());
var app = createApp(App_default);
var pinia = createPinia();
init({
	app,
	dsn: "",
	enabled: false,
	release: void 0,
	normalizeDepth: 8,
	tracesSampleRate: 0,
	replaysSessionSampleRate: 0,
	replaysOnErrorSampleRate: 0,
	integrations: [],
	autoSessionTracking: false,
	defaultIntegrations: false
});
app.directive("tooltip", Tooltip);
app.use(router).use(PrimeVue, { theme: {
	preset: ComfyUIPreset,
	options: {
		prefix: "p",
		cssLayer: {
			name: "primevue",
			order: "theme, base, primevue"
		},
		darkModeSelector: ".dark-theme, :root:has(.dark-theme)"
	}
} }).use(ConfirmationService).use(ToastService).use(pinia).use(i18n).use(VueFire, {
	firebaseApp,
	modules: [VueFireAuth()]
});
useBootstrapStore(pinia).startStoreBootstrap();
app.mount("#vue-app");

//# sourceMappingURL=index-U43jc10G.js.map