const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./CloudLayoutView-BnflSPBB.js","./_plugin-vue_export-helper-DnHSq4Qt.js","./rolldown-runtime-DLICfi3-.js","./vendor-primevue-kyY2H95P.js","./vendor-vue-core-tg-oZu4l.js","./vendor-other-C6-gqLl2.js","./vendor-firebase-DnyyBhvM.js","./vendor-three-LBLOE6BD.js","./vendor-tiptap-BnYkbQDM.js","./vendor-reka-ui--l_O1Shn.js","./vendor-i18n-czJbbAfl.js","./vendor-markdown-DFo_IkzS.js","./extensionStore-C4FANNnW.js","./api-BIg8a8Ge.js","./vendor-axios-fUWS71Q_.js","./vendor-yjs-Bf1Aknzs.js","./vendor-zod-BzHOZx2o.js","./i18n-CrjEfjCc.js","./widget-NeEr3XWN.js","./types-DT3N7am7.js","./colorUtil-CPODED-Q.js","./dialogService-C9L3yyTu.js","./vendor-vueuse-Co_HrDSJ.js","./src-CaI548es.js","./Popover-DEsU7dja.js","./Button-DQNHabQW.js","./SelectValue-BLXW8uNP.js","./useErrorHandling-CnTPvfCR.js","./useExternalLink-DGE106nN.js","./envUtil-Clzmwvt4.js","./useFeatureFlags-B9hGtXPF.js","./VideoPlayOverlay-B8XMbqrh.js","./telemetry-zZf2dHJ2.js","./userStore-H2R_W1gd.js","./widgetTypes-D8YBR9vN.js","./markdownRendererUtil-COLKL0Bq.js","./GlobalToast-DdenTzOg.js","./BaseViewTemplate-DPFjcIUQ.js","./vendor-other-DODGPXtn.css","./dialogService-BQOo2Utv.css","./CloudLayoutView-DROL9oAr.css","./CloudLoginView-D4cWHYF0.js","./previousFullPath-CkwBuRou.js","./signInSchema-B7KIIUmK.js","./CloudLoginView-By-Nke7R.css","./useCurrentUser-TqnTLt3n.js","./CloudSignupView-y8HPuSIu.js","./PasswordFields-CJ2jM9Br.js","./SignUpForm-BN-82DEr.js","./CloudSignupView-TQc0QMN1.css","./CloudForgotPasswordView-B5lbZlJk.js","./CloudForgotPasswordView-CE-vP8cz.css","./CloudSurveyView-D0prXId1.js","./auth-Bqfon6CV.js","./vendor-sentry-BHZ24crG.js","./CloudSurveyView-CJ05EnUH.css","./UserCheckView-Dxld1pW_.js","./CloudSorryContactSupportView-B8RqBCXT.js","./CloudSorryContactSupportView-Cg1Fm-bz.css","./CloudAuthTimeoutView-7jqlpACD.js","./CloudSubscriptionRedirectView-Bs6bs-XC.js","./subscriptionCheckoutUtil-BLAVbPJz.js","./comfy-logo-single-D9MrYETV.js"])))=>i.map(i=>d[i]);
import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { lt as __vitePreload } from "./vendor-primevue-kyY2H95P.js";
const cloudOnboardingRoutes = [{
	path: "/cloud",
	component: () => __vitePreload(() => import("./CloudLayoutView-BnflSPBB.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]), import.meta.url),
	children: [
		{
			path: "login",
			name: "cloud-login",
			component: () => __vitePreload(() => import("./CloudLoginView-D4cWHYF0.js"), __vite__mapDeps([41,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,42,43,38,39,44]), import.meta.url),
			beforeEnter: async (to, _from, next) => {
				if (!to.query.switchAccount) {
					const { useCurrentUser } = await __vitePreload(async () => {
						const { useCurrentUser } = await import("./useCurrentUser-TqnTLt3n.js");
						return { useCurrentUser };
					}, __vite__mapDeps([45,3,2,4,5,6,7,8,9,11,12,13,14,15,16,17,10,18,19,20,21,1,22,23,24,25,26,27,28,29,30,31,32,33,34,35,38,39]), import.meta.url);
					const { isLoggedIn } = useCurrentUser();
					if (isLoggedIn.value) return next({ name: "cloud-user-check" });
				}
				next();
			}
		},
		{
			path: "signup",
			name: "cloud-signup",
			component: () => __vitePreload(() => import("./CloudSignupView-y8HPuSIu.js"), __vite__mapDeps([46,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,47,48,43,42,38,39,49]), import.meta.url)
		},
		{
			path: "forgot-password",
			name: "cloud-forgot-password",
			component: () => __vitePreload(() => import("./CloudForgotPasswordView-B5lbZlJk.js"), __vite__mapDeps([50,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,38,39,51]), import.meta.url)
		},
		{
			path: "survey",
			name: "cloud-survey",
			component: () => __vitePreload(() => import("./CloudSurveyView-D0prXId1.js"), __vite__mapDeps([52,1,2,3,4,5,6,7,8,9,10,11,25,23,30,13,14,15,16,17,18,19,20,53,54,32,38,55]), import.meta.url),
			meta: { requiresAuth: true }
		},
		{
			path: "user-check",
			name: "cloud-user-check",
			component: () => __vitePreload(() => import("./UserCheckView-Dxld1pW_.js"), __vite__mapDeps([56,2,3,4,5,6,7,8,9,11,25,23,27,13,14,15,16,17,10,18,19,20,30,53,54,38]), import.meta.url),
			meta: { requiresAuth: true }
		},
		{
			path: "sorry-contact-support",
			name: "cloud-sorry-contact-support",
			component: () => __vitePreload(() => import("./CloudSorryContactSupportView-B8RqBCXT.js"), __vite__mapDeps([57,1,2,10,4,58]), import.meta.url)
		},
		{
			path: "auth-timeout",
			name: "cloud-auth-timeout",
			component: () => __vitePreload(() => import("./CloudAuthTimeoutView-7jqlpACD.js"), __vite__mapDeps([59,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,10,18,19,20,21,1,22,23,24,25,26,27,28,29,30,31,32,33,34,35,38,39]), import.meta.url),
			props: true
		},
		{
			path: "subscribe",
			name: "cloud-subscribe",
			component: () => __vitePreload(() => import("./CloudSubscriptionRedirectView-Bs6bs-XC.js"), __vite__mapDeps([60,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,1,22,23,24,25,26,27,28,29,30,31,32,33,34,35,61,62,38,39]), import.meta.url),
			meta: { requiresAuth: true }
		}
	]
}];
export { cloudOnboardingRoutes };

//# sourceMappingURL=onboardingCloudRoutes-Dx1Prhe8.js.map