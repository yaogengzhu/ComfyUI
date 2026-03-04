const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./CloudLayoutView-Cg36Gp5d.js","./_plugin-vue_export-helper-CoBaw5e7.js","./rolldown-runtime-DLICfi3-.js","./vendor-primevue-CN8WO3jr.js","./vendor-vue-core-tg-oZu4l.js","./teamWorkspaceStore-BPR4vJb-.js","./vendor-other-BlwZz5NW.js","./vendor-firebase-DN8BxCYa.js","./vendor-three-C69yBO64.js","./vendor-tiptap-C9679tdI.js","./vendor-reka-ui-C_KZ-Z9x.js","./vendor-i18n-D6iZeZ7U.js","./vendor-vueuse-CnrwrmRD.js","./vendor-axios-C5af7X-l.js","./vendor-zod-CWPLeK_6.js","./extensionStore-DTHbvcUb.js","./vendor-markdown-DF7_n7Ki.js","./api-nREgj_HO.js","./vendor-yjs-BX4XEX0j.js","./i18n-B95gNu60.js","./widget-DTr1rh-S.js","./types-YYe-ycsK.js","./colorUtil-0jM4jJ4_.js","./src-CfBwFEGf.js","./Popover-Bju946nz.js","./Button-BXdh2GzZ.js","./SelectValue-CqVeSVLN.js","./useErrorHandling-Bo8s6znR.js","./useExternalLink-DXOke9aD.js","./envUtil-BB56f-md.js","./useFeatureFlags-kJeWJWfN.js","./VideoPlayOverlay-DXZwnuVe.js","./telemetry-BkGuQ88V.js","./huizhiAuthService-DRNED4sE.js","./userStore-BgTMUZFo.js","./widgetTypes-0MCr4N7Z.js","./markdownRendererUtil-rU1hBHFB.js","./GlobalToast-k3wIH0B-.js","./BaseViewTemplate-oc-WcTCm.js","./vendor-other-DODGPXtn.css","./teamWorkspaceStore-BQOo2Utv.css","./CloudLayoutView-DROL9oAr.css","./CloudLoginView-CF4Iv8oG.js","./previousFullPath-B5SyBMGv.js","./signInSchema-CaxQhwd2.js","./CloudLoginView-By-Nke7R.css","./useCurrentUser-DtTM6oQm.js","./CloudSignupView-CxHsWl6Q.js","./PasswordFields-Crx8qdt0.js","./SignUpForm-D3SdoINS.js","./CloudSignupView-TQc0QMN1.css","./CloudForgotPasswordView-DTNzNoqm.js","./CloudForgotPasswordView-CE-vP8cz.css","./CloudSurveyView-BFSDKehb.js","./auth-BySFAN_E.js","./vendor-sentry-B5Diy-yi.js","./CloudSurveyView-CJ05EnUH.css","./UserCheckView-BPvZ5Zkl.js","./CloudSorryContactSupportView-DiDz1ArL.js","./CloudSorryContactSupportView-Cg1Fm-bz.css","./CloudAuthTimeoutView-COFZPWaW.js","./CloudSubscriptionRedirectView-h_M8TdjL.js","./huizhi-logo-CEz6JG1a.js","./subscriptionCheckoutUtil-C0fuOAl2.js"])))=>i.map(i=>d[i]);
import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { at as __vitePreload } from "./vendor-primevue-CN8WO3jr.js";
const cloudOnboardingRoutes = [{
	path: "/cloud",
	component: () => __vitePreload(() => import("./CloudLayoutView-Cg36Gp5d.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]), import.meta.url),
	children: [
		{
			path: "login",
			name: "cloud-login",
			component: () => __vitePreload(() => import("./CloudLoginView-CF4Iv8oG.js"), __vite__mapDeps([42,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,43,44,39,40,45]), import.meta.url),
			beforeEnter: async (to, _from, next) => {
				if (!to.query.switchAccount) {
					const { useCurrentUser } = await __vitePreload(async () => {
						const { useCurrentUser } = await import("./useCurrentUser-DtTM6oQm.js");
						return { useCurrentUser };
					}, __vite__mapDeps([46,3,2,4,5,1,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,39,40]), import.meta.url);
					const { isLoggedIn } = useCurrentUser();
					if (isLoggedIn.value) return next({ name: "cloud-user-check" });
				}
				next();
			}
		},
		{
			path: "signup",
			name: "cloud-signup",
			component: () => __vitePreload(() => import("./CloudSignupView-CxHsWl6Q.js"), __vite__mapDeps([47,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,48,49,44,43,39,40,50]), import.meta.url)
		},
		{
			path: "forgot-password",
			name: "cloud-forgot-password",
			component: () => __vitePreload(() => import("./CloudForgotPasswordView-DTNzNoqm.js"), __vite__mapDeps([51,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,39,40,52]), import.meta.url)
		},
		{
			path: "survey",
			name: "cloud-survey",
			component: () => __vitePreload(() => import("./CloudSurveyView-BFSDKehb.js"), __vite__mapDeps([53,1,2,3,4,6,7,8,9,10,11,16,25,23,30,17,13,18,14,19,20,21,22,54,55,32,39,56]), import.meta.url),
			meta: { requiresAuth: true }
		},
		{
			path: "user-check",
			name: "cloud-user-check",
			component: () => __vitePreload(() => import("./UserCheckView-BPvZ5Zkl.js"), __vite__mapDeps([57,2,3,4,6,7,8,9,10,16,25,23,27,17,13,18,14,19,11,20,21,22,30,54,55,39]), import.meta.url),
			meta: { requiresAuth: true }
		},
		{
			path: "sorry-contact-support",
			name: "cloud-sorry-contact-support",
			component: () => __vitePreload(() => import("./CloudSorryContactSupportView-DiDz1ArL.js"), __vite__mapDeps([58,1,2,11,4,59]), import.meta.url)
		},
		{
			path: "auth-timeout",
			name: "cloud-auth-timeout",
			component: () => __vitePreload(() => import("./CloudAuthTimeoutView-COFZPWaW.js"), __vite__mapDeps([60,2,3,4,5,1,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,39,40]), import.meta.url),
			props: true
		},
		{
			path: "subscribe",
			name: "cloud-subscribe",
			component: () => __vitePreload(() => import("./CloudSubscriptionRedirectView-h_M8TdjL.js"), __vite__mapDeps([61,2,3,4,5,1,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,62,63,39,40]), import.meta.url),
			meta: { requiresAuth: true }
		}
	]
}];
export { cloudOnboardingRoutes };

//# sourceMappingURL=onboardingCloudRoutes-CUH9aEF_.js.map