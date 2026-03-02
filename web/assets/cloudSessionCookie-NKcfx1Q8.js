import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-BMWHeZll.js";
import "./vendor-firebase-DN8BxCYa.js";
import "./vendor-other-Cb4peHqA.js";
import { t as isCloud } from "./types-YYe-ycsK.js";
import { n as useFeatureFlags } from "./useFeatureFlags-79NOcfrn.js";
import "./vendor-reka-ui-jxMUDvZT.js";
import { r as api } from "./api-jlQue090.js";
import "./vendor-markdown-BPt2PdDp.js";
import "./colorUtil-CQE2D_f9.js";
import "./i18n-Dy4mrtIR.js";
import "./Button-D4w5_e9I.js";
import { jn as useExtensionService, si as useFirebaseAuthStore } from "./dialogService-Cvolq8px.js";
import "./extensionStore-BhlCwLvC.js";
import "./userStore-CpSN5kjY.js";
import "./useErrorHandling--1B8-At_.js";
import "./useExternalLink-BDqUsXhK.js";
import "./vendor-tiptap-DTO2QA4Q.js";
import "./markdownRendererUtil-CrR6m0CH.js";
import "./Popover-oAJ3EQ_X.js";
const useSessionCookie = () => {
	const createSession = async () => {
		if (!isCloud) return;
		const { flags } = useFeatureFlags();
		try {
			const authStore = useFirebaseAuthStore();
			let authHeader;
			if (flags.teamWorkspacesEnabled) {
				const firebaseToken = await authStore.getIdToken();
				if (!firebaseToken) {
					console.warn("Failed to create session cookie:", "No Firebase token available for session creation");
					return;
				}
				authHeader = { Authorization: `Bearer ${firebaseToken}` };
			} else {
				const header = await authStore.getAuthHeader();
				if (!header) {
					console.warn("Failed to create session cookie:", "No auth header available for session creation");
					return;
				}
				authHeader = header;
			}
			const response = await fetch(api.apiURL("/auth/session"), {
				method: "POST",
				credentials: "include",
				headers: {
					...authHeader,
					"Content-Type": "application/json"
				}
			});
			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				console.warn("Failed to create session cookie:", errorData.message || response.statusText);
			}
		} catch (error) {
			console.warn("Failed to create session cookie:", error);
		}
	};
	const deleteSession = async () => {
		if (!isCloud) return;
		try {
			const response = await fetch(api.apiURL("/auth/session"), {
				method: "DELETE",
				credentials: "include"
			});
			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				console.warn("Failed to delete session cookie:", errorData.message || response.statusText);
			}
		} catch (error) {
			console.warn("Failed to delete session cookie:", error);
		}
	};
	return {
		createSession,
		deleteSession
	};
};
useExtensionService().registerExtension({
	name: "Comfy.Cloud.SessionCookie",
	onAuthUserResolved: async () => {
		const { createSession } = useSessionCookie();
		await createSession();
	},
	onAuthTokenRefreshed: async () => {
		const { createSession } = useSessionCookie();
		await createSession();
	},
	onAuthUserLogout: async () => {
		const { deleteSession } = useSessionCookie();
		await deleteSession();
	}
});

//# sourceMappingURL=cloudSessionCookie-NKcfx1Q8.js.map