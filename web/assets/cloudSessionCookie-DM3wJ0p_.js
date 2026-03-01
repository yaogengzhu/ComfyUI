import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import "./vendor-primevue-kyY2H95P.js";
import "./vendor-firebase-DnyyBhvM.js";
import "./vendor-other-C6-gqLl2.js";
import { t as isCloud } from "./types-DT3N7am7.js";
import { n as useFeatureFlags } from "./useFeatureFlags-DKDRstHr.js";
import "./vendor-reka-ui--l_O1Shn.js";
import { r as api } from "./api-CPHpjbv0.js";
import "./vendor-markdown-DFo_IkzS.js";
import "./colorUtil-CPODED-Q.js";
import "./i18n-CrjEfjCc.js";
import "./Button-DQNHabQW.js";
import { ii as useFirebaseAuthStore, jn as useExtensionService } from "./dialogService-ClPphYfX.js";
import "./extensionStore-Be5EotP2.js";
import "./userStore-CdVz-9rN.js";
import "./useErrorHandling-CFX2Xlcx.js";
import "./useExternalLink-DGE106nN.js";
import "./vendor-tiptap-BnYkbQDM.js";
import "./markdownRendererUtil-COLKL0Bq.js";
import "./Popover-DEsU7dja.js";
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

//# sourceMappingURL=cloudSessionCookie-DM3wJ0p_.js.map