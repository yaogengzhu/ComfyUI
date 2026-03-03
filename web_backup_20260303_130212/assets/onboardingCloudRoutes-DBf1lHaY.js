const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./CloudLayoutView-B3C0NIJZ.js","./_plugin-vue_export-helper-ralzwvFM.js","./rolldown-runtime-DLICfi3-.js","./vendor-primevue-CNPGb1TW.js","./vendor-vue-core-tg-oZu4l.js","./vendor-other-qJz1Z78N.js","./vendor-firebase-DN8BxCYa.js","./vendor-three-C69yBO64.js","./vendor-tiptap-C9679tdI.js","./vendor-reka-ui-jxMUDvZT.js","./vendor-i18n-86kE_LSO.js","./vendor-markdown-BPt2PdDp.js","./extensionStore-C8F8CzIg.js","./api-DArsZFwY.js","./vendor-axios-CDLnCfA3.js","./vendor-yjs-DPYlthRk.js","./vendor-zod-DxNhSbfF.js","./i18n-syd3PJfQ.js","./widget-q92NCcJ5.js","./types-YYe-ycsK.js","./colorUtil-BKg8i9Q6.js","./dialogService-BUdss0z2.js","./vendor-vueuse-CnrwrmRD.js","./src-DZOanDgF.js","./Popover-bsCD7nil.js","./Button-D8fmNaXY.js","./SelectValue-D40khzVl.js","./useErrorHandling-4WJW_EDk.js","./useExternalLink-tAAZu4wg.js","./envUtil-BB56f-md.js","./useFeatureFlags-BlMvC2mV.js","./VideoPlayOverlay-Cf_EC56H.js","./telemetry-CLrjuJLU.js","./huizhiAuthService-xKOJ1ACT.js","./userStore-D93A7Tj9.js","./widgetTypes-D8SDkOs1.js","./markdownRendererUtil-Q53IsTUL.js","./GlobalToast-DtAJTAkJ.js","./BaseViewTemplate-DU8Z4OmN.js","./vendor-other-DODGPXtn.css","./dialogService-BQOo2Utv.css","./CloudLayoutView-DROL9oAr.css","./CloudLoginView-DW2Hc9y3.js","./previousFullPath-CjH3UX7l.js","./signInSchema-ClkGmo8X.js","./CloudLoginView-By-Nke7R.css","./useCurrentUser-BmCKmVoo.js","./CloudSignupView-A7PNH31n.js","./PasswordFields-CeTzyH1w.js","./SignUpForm-CVyNZWT2.js","./CloudSignupView-TQc0QMN1.css","./CloudForgotPasswordView-BPmLFE9n.js","./CloudForgotPasswordView-CE-vP8cz.css","./CloudSurveyView-uALLtbap.js","./auth-CZMn64Nn.js","./vendor-sentry-BHZ24crG.js","./CloudSurveyView-CJ05EnUH.css","./UserCheckView-Dj7opNf2.js","./CloudSorryContactSupportView-CQQk4nW0.js","./CloudSorryContactSupportView-Cg1Fm-bz.css","./CloudAuthTimeoutView-CV4iVWv0.js","./CloudSubscriptionRedirectView-Df6hd_3Y.js","./subscriptionCheckoutUtil-CMii0sDD.js","./huizhi-logo-CEz6JG1a.js"])))=>i.map(i=>d[i]);
import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { ct as __vitePreload } from "./vendor-primevue-CNPGb1TW.js";
const cloudOnboardingRoutes = [{
	path: "/cloud",
	component: () => __vitePreload(() => import("./CloudLayoutView-B3C0NIJZ.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]), import.meta.url),
	children: [
		{
			path: "login",
			name: "cloud-login",
			component: () => __vitePreload(() => import("./CloudLoginView-DW2Hc9y3.js"), __vite__mapDeps([42,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,43,44,39,40,45]), import.meta.url),
			beforeEnter: async (to, _from, next) => {
				if (!to.query.switchAccount) {
					const { useCurrentUser } = await __vitePreload(async () => {
						const { useCurrentUser } = await import("./useCurrentUser-BmCKmVoo.js");
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
			component: () => __vitePreload(() => import("./CloudSignupView-A7PNH31n.js"), __vite__mapDeps([47,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,48,49,44,43,39,40,50]), import.meta.url)
		},
		{
			path: "forgot-password",
			name: "cloud-forgot-password",
			component: () => __vitePreload(() => import("./CloudForgotPasswordView-BPmLFE9n.js"), __vite__mapDeps([51,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,39,40,52]), import.meta.url)
		},
		{
			path: "survey",
			name: "cloud-survey",
			component: () => __vitePreload(() => import("./CloudSurveyView-uALLtbap.js"), __vite__mapDeps([53,1,2,3,4,5,6,7,8,9,10,11,25,23,30,13,14,15,16,17,18,19,20,54,55,32,39,56]), import.meta.url),
			meta: { requiresAuth: true }
		},
		{
			path: "user-check",
			name: "cloud-user-check",
			component: () => __vitePreload(() => import("./UserCheckView-Dj7opNf2.js"), __vite__mapDeps([57,2,3,4,5,6,7,8,9,11,25,23,27,13,14,15,16,17,10,18,19,20,30,54,55,39]), import.meta.url),
			meta: { requiresAuth: true }
		},
		{
			path: "sorry-contact-support",
			name: "cloud-sorry-contact-support",
			component: () => __vitePreload(() => import("./CloudSorryContactSupportView-CQQk4nW0.js"), __vite__mapDeps([58,1,2,10,4,59]), import.meta.url)
		},
		{
			path: "auth-timeout",
			name: "cloud-auth-timeout",
			component: () => __vitePreload(() => import("./CloudAuthTimeoutView-CV4iVWv0.js"), __vite__mapDeps([60,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,10,18,19,20,21,1,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,39,40]), import.meta.url),
			props: true
		},
		{
			path: "subscribe",
			name: "cloud-subscribe",
			component: () => __vitePreload(() => import("./CloudSubscriptionRedirectView-Df6hd_3Y.js"), __vite__mapDeps([61,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,1,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,62,63,39,40]), import.meta.url),
			meta: { requiresAuth: true }
		}
	]
}];
export { cloudOnboardingRoutes };

//# sourceMappingURL=onboardingCloudRoutes-DBf1lHaY.js.map