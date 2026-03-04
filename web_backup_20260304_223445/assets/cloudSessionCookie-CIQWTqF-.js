import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-BEjAYGWm.js";
import "./vendor-firebase-DN8BxCYa.js";
import "./vendor-other-qJz1Z78N.js";
import { t as isCloud } from "./types-YYe-ycsK.js";
import { n as useFeatureFlags } from "./useFeatureFlags-B3RwD6hI.js";
import "./vendor-reka-ui-C26MN8JS.js";
import { r as api } from "./api-D2HJ3Cuk.js";
import "./vendor-markdown-DF7_n7Ki.js";
import "./colorUtil-CyOZxXkW.js";
import "./i18n-Ce5inB5_.js";
import "./userStore-CgWi1Hiu.js";
import "./huizhiAuthService-Mxdj0XpZ.js";
import { Pn as useExtensionService, r as useFirebaseAuthStore } from "./teamWorkspaceStore-B1oHaZID.js";
import "./Button-AKQyxeyD.js";
import "./extensionStore-DbCclKhl.js";
import "./useErrorHandling-C6LadziV.js";
import "./useExternalLink-RgafkIwT.js";
import "./vendor-tiptap-C9679tdI.js";
import "./markdownRendererUtil-rU1hBHFB.js";
import "./Popover-DMhMBlU6.js";
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

//# sourceMappingURL=cloudSessionCookie-CIQWTqF-.js.map