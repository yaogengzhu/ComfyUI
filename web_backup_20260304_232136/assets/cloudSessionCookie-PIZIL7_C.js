import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-CN8WO3jr.js";
import "./vendor-firebase-DN8BxCYa.js";
import "./vendor-other-BlwZz5NW.js";
import { t as isCloud } from "./types-YYe-ycsK.js";
import { n as useFeatureFlags } from "./useFeatureFlags-BuKVU3gG.js";
import "./vendor-reka-ui-C_KZ-Z9x.js";
import { r as api } from "./api-p6hGo6pS.js";
import "./vendor-markdown-DF7_n7Ki.js";
import "./colorUtil-0jM4jJ4_.js";
import "./i18n-B95gNu60.js";
import "./userStore-CVXXciNs.js";
import "./huizhiAuthService-D-kJyr3e.js";
import { Pn as useExtensionService, r as useFirebaseAuthStore } from "./teamWorkspaceStore-CrgYR715.js";
import "./Button-BXdh2GzZ.js";
import "./extensionStore-DiDsM3E0.js";
import "./useErrorHandling-B7U_HHbw.js";
import "./useExternalLink-DXOke9aD.js";
import "./vendor-tiptap-C9679tdI.js";
import "./markdownRendererUtil-rU1hBHFB.js";
import "./Popover-Bju946nz.js";
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

//# sourceMappingURL=cloudSessionCookie-PIZIL7_C.js.map