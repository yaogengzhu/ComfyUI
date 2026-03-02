const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./CloudLayoutView-BQpCbaap.js","./_plugin-vue_export-helper-ralzwvFM.js","./rolldown-runtime-DLICfi3-.js","./vendor-primevue-BMWHeZll.js","./vendor-vue-core-tg-oZu4l.js","./vendor-other-Cb4peHqA.js","./vendor-firebase-DN8BxCYa.js","./vendor-three-ueviNA60.js","./vendor-tiptap-DTO2QA4Q.js","./vendor-reka-ui-jxMUDvZT.js","./vendor-i18n-86kE_LSO.js","./vendor-markdown-BPt2PdDp.js","./extensionStore-jct1qmkK.js","./api-CrHaA16j.js","./vendor-axios-CDLnCfA3.js","./vendor-yjs-DPYlthRk.js","./vendor-zod-DxNhSbfF.js","./i18n-Dy4mrtIR.js","./widget-q92NCcJ5.js","./types-YYe-ycsK.js","./colorUtil-CQE2D_f9.js","./dialogService-Cm1QZvWM.js","./vendor-vueuse-By9Ts4Tf.js","./src-KH-2QSde.js","./Popover-oAJ3EQ_X.js","./Button-D4w5_e9I.js","./SelectValue-CAILfsj4.js","./useErrorHandling-D8IRIzSw.js","./useExternalLink-BDqUsXhK.js","./envUtil-BuwjzvDd.js","./useFeatureFlags-CQzrYTw1.js","./VideoPlayOverlay-SbkDj79Z.js","./telemetry-CLrjuJLU.js","./userStore-B8DDUPuE.js","./widgetTypes-D8SDkOs1.js","./markdownRendererUtil-CrR6m0CH.js","./GlobalToast-CfS4EitO.js","./BaseViewTemplate-CK0teBDh.js","./vendor-other-DODGPXtn.css","./dialogService-BQOo2Utv.css","./CloudLayoutView-DROL9oAr.css","./CloudLoginView-RFPEXPmy.js","./previousFullPath-B7364-5O.js","./signInSchema-1hdMqUS1.js","./CloudLoginView-By-Nke7R.css","./useCurrentUser-DXnsvFWo.js","./CloudSignupView-Dsdlh8We.js","./PasswordFields-rKEtluaL.js","./SignUpForm-CPTZYz3b.js","./CloudSignupView-TQc0QMN1.css","./CloudForgotPasswordView-B94ORWUh.js","./CloudForgotPasswordView-CE-vP8cz.css","./CloudSurveyView-CbBfl5dA.js","./auth-DYnnCvzX.js","./vendor-sentry-BHZ24crG.js","./CloudSurveyView-CJ05EnUH.css","./UserCheckView-cs4GJHyl.js","./CloudSorryContactSupportView-C-qRlcuN.js","./CloudSorryContactSupportView-Cg1Fm-bz.css","./CloudAuthTimeoutView-C1IygCJN.js","./CloudSubscriptionRedirectView-Df8EL6I9.js","./subscriptionCheckoutUtil-CORuNO3m.js","./huizhi-logo-inomcmvU.js"])))=>i.map(i=>d[i]);
import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { ct as __vitePreload } from "./vendor-primevue-BMWHeZll.js";
const cloudOnboardingRoutes = [{
	path: "/cloud",
	component: () => __vitePreload(() => import("./CloudLayoutView-BQpCbaap.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]), import.meta.url),
	children: [
		{
			path: "login",
			name: "cloud-login",
			component: () => __vitePreload(() => import("./CloudLoginView-RFPEXPmy.js"), __vite__mapDeps([41,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,42,43,38,39,44]), import.meta.url),
			beforeEnter: async (to, _from, next) => {
				if (!to.query.switchAccount) {
					const { useCurrentUser } = await __vitePreload(async () => {
						const { useCurrentUser } = await import("./useCurrentUser-DXnsvFWo.js");
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
			component: () => __vitePreload(() => import("./CloudSignupView-Dsdlh8We.js"), __vite__mapDeps([46,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,47,48,43,42,38,39,49]), import.meta.url)
		},
		{
			path: "forgot-password",
			name: "cloud-forgot-password",
			component: () => __vitePreload(() => import("./CloudForgotPasswordView-B94ORWUh.js"), __vite__mapDeps([50,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,38,39,51]), import.meta.url)
		},
		{
			path: "survey",
			name: "cloud-survey",
			component: () => __vitePreload(() => import("./CloudSurveyView-CbBfl5dA.js"), __vite__mapDeps([52,1,2,3,4,5,6,7,8,9,10,11,25,23,30,13,14,15,16,17,18,19,20,53,54,32,38,55]), import.meta.url),
			meta: { requiresAuth: true }
		},
		{
			path: "user-check",
			name: "cloud-user-check",
			component: () => __vitePreload(() => import("./UserCheckView-cs4GJHyl.js"), __vite__mapDeps([56,2,3,4,5,6,7,8,9,11,25,23,27,13,14,15,16,17,10,18,19,20,30,53,54,38]), import.meta.url),
			meta: { requiresAuth: true }
		},
		{
			path: "sorry-contact-support",
			name: "cloud-sorry-contact-support",
			component: () => __vitePreload(() => import("./CloudSorryContactSupportView-C-qRlcuN.js"), __vite__mapDeps([57,1,2,10,4,58]), import.meta.url)
		},
		{
			path: "auth-timeout",
			name: "cloud-auth-timeout",
			component: () => __vitePreload(() => import("./CloudAuthTimeoutView-C1IygCJN.js"), __vite__mapDeps([59,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,10,18,19,20,21,1,22,23,24,25,26,27,28,29,30,31,32,33,34,35,38,39]), import.meta.url),
			props: true
		},
		{
			path: "subscribe",
			name: "cloud-subscribe",
			component: () => __vitePreload(() => import("./CloudSubscriptionRedirectView-Df8EL6I9.js"), __vite__mapDeps([60,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,1,22,23,24,25,26,27,28,29,30,31,32,33,34,35,61,62,38,39]), import.meta.url),
			meta: { requiresAuth: true }
		}
	]
}];
export { cloudOnboardingRoutes };

//# sourceMappingURL=onboardingCloudRoutes-C4DLlxc8.js.map