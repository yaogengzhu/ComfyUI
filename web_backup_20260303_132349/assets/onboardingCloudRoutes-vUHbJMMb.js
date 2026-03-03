const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./CloudLayoutView-AMhbM25B.js","./_plugin-vue_export-helper-ralzwvFM.js","./rolldown-runtime-DLICfi3-.js","./vendor-primevue-CNPGb1TW.js","./vendor-vue-core-tg-oZu4l.js","./vendor-other-qJz1Z78N.js","./vendor-firebase-DN8BxCYa.js","./vendor-three-C69yBO64.js","./vendor-tiptap-C9679tdI.js","./vendor-reka-ui-jxMUDvZT.js","./vendor-i18n-86kE_LSO.js","./vendor-markdown-BPt2PdDp.js","./extensionStore-BiUCqCK1.js","./api-DbPc6hdO.js","./vendor-axios-CDLnCfA3.js","./vendor-yjs-DPYlthRk.js","./vendor-zod-DxNhSbfF.js","./i18n-syd3PJfQ.js","./widget-q92NCcJ5.js","./types-YYe-ycsK.js","./colorUtil-BKg8i9Q6.js","./dialogService-jMbkA1JN.js","./vendor-vueuse-CnrwrmRD.js","./src-DZOanDgF.js","./Popover-bsCD7nil.js","./Button-D8fmNaXY.js","./SelectValue-D40khzVl.js","./useErrorHandling-BsEGEjB8.js","./useExternalLink-tAAZu4wg.js","./envUtil-BB56f-md.js","./useFeatureFlags-DpouF8An.js","./VideoPlayOverlay-Cf_EC56H.js","./telemetry-CLrjuJLU.js","./huizhiAuthService-DTHsM6kC.js","./userStore-xAnKQzRd.js","./widgetTypes-D8SDkOs1.js","./markdownRendererUtil-Q53IsTUL.js","./GlobalToast-Dg1mvSo5.js","./BaseViewTemplate-DU8Z4OmN.js","./vendor-other-DODGPXtn.css","./dialogService-BQOo2Utv.css","./CloudLayoutView-DROL9oAr.css","./CloudLoginView-BzhclhLV.js","./previousFullPath-Af1tzn0q.js","./signInSchema-ClkGmo8X.js","./CloudLoginView-By-Nke7R.css","./useCurrentUser-Cj9_hO92.js","./CloudSignupView-FtRRu9K5.js","./PasswordFields-CeTzyH1w.js","./SignUpForm-DkuKmE05.js","./CloudSignupView-TQc0QMN1.css","./CloudForgotPasswordView-CapK2gd0.js","./CloudForgotPasswordView-CE-vP8cz.css","./CloudSurveyView-CueUnsmU.js","./auth-B0UZpDGq.js","./vendor-sentry-BHZ24crG.js","./CloudSurveyView-CJ05EnUH.css","./UserCheckView-CrFghnKs.js","./CloudSorryContactSupportView-CQQk4nW0.js","./CloudSorryContactSupportView-Cg1Fm-bz.css","./CloudAuthTimeoutView-Blk_poHa.js","./CloudSubscriptionRedirectView-C1DQc7DU.js","./subscriptionCheckoutUtil-CoSOezho.js","./huizhi-logo-CEz6JG1a.js"])))=>i.map(i=>d[i]);
import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { ct as __vitePreload } from "./vendor-primevue-CNPGb1TW.js";
const cloudOnboardingRoutes = [{
	path: "/cloud",
	component: () => __vitePreload(() => import("./CloudLayoutView-AMhbM25B.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]), import.meta.url),
	children: [
		{
			path: "login",
			name: "cloud-login",
			component: () => __vitePreload(() => import("./CloudLoginView-BzhclhLV.js"), __vite__mapDeps([42,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,43,44,39,40,45]), import.meta.url),
			beforeEnter: async (to, _from, next) => {
				if (!to.query.switchAccount) {
					const { useCurrentUser } = await __vitePreload(async () => {
						const { useCurrentUser } = await import("./useCurrentUser-Cj9_hO92.js");
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
			component: () => __vitePreload(() => import("./CloudSignupView-FtRRu9K5.js"), __vite__mapDeps([47,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,48,49,44,43,39,40,50]), import.meta.url)
		},
		{
			path: "forgot-password",
			name: "cloud-forgot-password",
			component: () => __vitePreload(() => import("./CloudForgotPasswordView-CapK2gd0.js"), __vite__mapDeps([51,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,39,40,52]), import.meta.url)
		},
		{
			path: "survey",
			name: "cloud-survey",
			component: () => __vitePreload(() => import("./CloudSurveyView-CueUnsmU.js"), __vite__mapDeps([53,1,2,3,4,5,6,7,8,9,10,11,25,23,30,13,14,15,16,17,18,19,20,54,55,32,39,56]), import.meta.url),
			meta: { requiresAuth: true }
		},
		{
			path: "user-check",
			name: "cloud-user-check",
			component: () => __vitePreload(() => import("./UserCheckView-CrFghnKs.js"), __vite__mapDeps([57,2,3,4,5,6,7,8,9,11,25,23,27,13,14,15,16,17,10,18,19,20,30,54,55,39]), import.meta.url),
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
			component: () => __vitePreload(() => import("./CloudAuthTimeoutView-Blk_poHa.js"), __vite__mapDeps([60,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,10,18,19,20,21,1,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,39,40]), import.meta.url),
			props: true
		},
		{
			path: "subscribe",
			name: "cloud-subscribe",
			component: () => __vitePreload(() => import("./CloudSubscriptionRedirectView-C1DQc7DU.js"), __vite__mapDeps([61,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,1,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,62,63,39,40]), import.meta.url),
			meta: { requiresAuth: true }
		}
	]
}];
export { cloudOnboardingRoutes };

//# sourceMappingURL=onboardingCloudRoutes-vUHbJMMb.js.map