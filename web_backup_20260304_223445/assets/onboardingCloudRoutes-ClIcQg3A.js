const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./CloudLayoutView-C3IkzNc4.js","./_plugin-vue_export-helper-CoBaw5e7.js","./rolldown-runtime-DLICfi3-.js","./vendor-primevue-BEjAYGWm.js","./vendor-vue-core-tg-oZu4l.js","./vendor-other-qJz1Z78N.js","./vendor-firebase-DN8BxCYa.js","./vendor-three-C69yBO64.js","./vendor-tiptap-C9679tdI.js","./vendor-reka-ui-C26MN8JS.js","./vendor-i18n-D6iZeZ7U.js","./vendor-markdown-DF7_n7Ki.js","./extensionStore-DbCclKhl.js","./api-D2HJ3Cuk.js","./vendor-axios-C5af7X-l.js","./vendor-yjs-BX4XEX0j.js","./vendor-zod-CWPLeK_6.js","./i18n-Ce5inB5_.js","./widget-DTr1rh-S.js","./types-YYe-ycsK.js","./colorUtil-CyOZxXkW.js","./teamWorkspaceStore-B1oHaZID.js","./vendor-vueuse-CnrwrmRD.js","./src-CqWvSCI8.js","./Popover-DMhMBlU6.js","./Button-AKQyxeyD.js","./SelectValue-DlMdq0Ym.js","./useErrorHandling-C6LadziV.js","./useExternalLink-RgafkIwT.js","./envUtil-BB56f-md.js","./useFeatureFlags-B3RwD6hI.js","./VideoPlayOverlay-Cgac-4a_.js","./telemetry-BkGuQ88V.js","./huizhiAuthService-Mxdj0XpZ.js","./userStore-CgWi1Hiu.js","./widgetTypes-0MCr4N7Z.js","./markdownRendererUtil-rU1hBHFB.js","./GlobalToast-CDwj1wHf.js","./BaseViewTemplate-DJvoZtpb.js","./vendor-other-DODGPXtn.css","./teamWorkspaceStore-BQOo2Utv.css","./CloudLayoutView-DROL9oAr.css","./CloudLoginView-BOMGYYFi.js","./previousFullPath-B3bpqlOZ.js","./signInSchema-DXSwEHAr.js","./CloudLoginView-By-Nke7R.css","./useCurrentUser-7X6PylrF.js","./CloudSignupView-DgQMvMuU.js","./PasswordFields-KGS71qUv.js","./SignUpForm-Bv_friav.js","./CloudSignupView-TQc0QMN1.css","./CloudForgotPasswordView-Dp0ssoMm.js","./CloudForgotPasswordView-CE-vP8cz.css","./CloudSurveyView-W9xYI2u0.js","./auth-DVjlq7UB.js","./vendor-sentry-BHZ24crG.js","./CloudSurveyView-CJ05EnUH.css","./UserCheckView-D2LHBEKh.js","./CloudSorryContactSupportView-jKe7H9sp.js","./CloudSorryContactSupportView-Cg1Fm-bz.css","./CloudAuthTimeoutView-B2hA1vDH.js","./CloudSubscriptionRedirectView-BVNRCT-2.js","./subscriptionCheckoutUtil-DO9tdLeH.js","./huizhi-logo-CEz6JG1a.js"])))=>i.map(i=>d[i]);
import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { ct as __vitePreload } from "./vendor-primevue-BEjAYGWm.js";
const cloudOnboardingRoutes = [{
	path: "/cloud",
	component: () => __vitePreload(() => import("./CloudLayoutView-C3IkzNc4.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]), import.meta.url),
	children: [
		{
			path: "login",
			name: "cloud-login",
			component: () => __vitePreload(() => import("./CloudLoginView-BOMGYYFi.js"), __vite__mapDeps([42,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,43,44,39,40,45]), import.meta.url),
			beforeEnter: async (to, _from, next) => {
				if (!to.query.switchAccount) {
					const { useCurrentUser } = await __vitePreload(async () => {
						const { useCurrentUser } = await import("./useCurrentUser-7X6PylrF.js");
						return { useCurrentUser };
					}, __vite__mapDeps([46,3,2,4,5,6,7,8,9,11,12,13,14,15,16,17,10,18,19,20,21,1,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,39,40]), import.meta.url);
					const { isLoggedIn } = useCurrentUser();
					if (isLoggedIn.value) return next({ name: "cloud-user-check" });
				}
				next();
			}
		},
		{
			path: "signup",
			name: "cloud-signup",
			component: () => __vitePreload(() => import("./CloudSignupView-DgQMvMuU.js"), __vite__mapDeps([47,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,48,49,44,43,39,40,50]), import.meta.url)
		},
		{
			path: "forgot-password",
			name: "cloud-forgot-password",
			component: () => __vitePreload(() => import("./CloudForgotPasswordView-Dp0ssoMm.js"), __vite__mapDeps([51,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,39,40,52]), import.meta.url)
		},
		{
			path: "survey",
			name: "cloud-survey",
			component: () => __vitePreload(() => import("./CloudSurveyView-W9xYI2u0.js"), __vite__mapDeps([53,1,2,3,4,5,6,7,8,9,10,11,25,23,30,13,14,15,16,17,18,19,20,54,55,32,39,56]), import.meta.url),
			meta: { requiresAuth: true }
		},
		{
			path: "user-check",
			name: "cloud-user-check",
			component: () => __vitePreload(() => import("./UserCheckView-D2LHBEKh.js"), __vite__mapDeps([57,2,3,4,5,6,7,8,9,11,25,23,27,13,14,15,16,17,10,18,19,20,30,54,55,39]), import.meta.url),
			meta: { requiresAuth: true }
		},
		{
			path: "sorry-contact-support",
			name: "cloud-sorry-contact-support",
			component: () => __vitePreload(() => import("./CloudSorryContactSupportView-jKe7H9sp.js"), __vite__mapDeps([58,1,2,10,4,59]), import.meta.url)
		},
		{
			path: "auth-timeout",
			name: "cloud-auth-timeout",
			component: () => __vitePreload(() => import("./CloudAuthTimeoutView-B2hA1vDH.js"), __vite__mapDeps([60,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,10,18,19,20,21,1,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,39,40]), import.meta.url),
			props: true
		},
		{
			path: "subscribe",
			name: "cloud-subscribe",
			component: () => __vitePreload(() => import("./CloudSubscriptionRedirectView-BVNRCT-2.js"), __vite__mapDeps([61,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,1,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,62,63,39,40]), import.meta.url),
			meta: { requiresAuth: true }
		}
	]
}];
export { cloudOnboardingRoutes };

//# sourceMappingURL=onboardingCloudRoutes-ClIcQg3A.js.map