import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { a as remoteConfigState, i as remoteConfig } from "./useFeatureFlags-kJeWJWfN.js";
import { r as api } from "./api-nREgj_HO.js";
async function refreshRemoteConfig(options = {}) {
	const { useAuth = true } = options;
	try {
		const response = useAuth ? await api.fetchApi("/features", { cache: "no-store" }) : await fetch("/api/features", { cache: "no-store" });
		if (response.ok) {
			const config = await response.json();
			window.__CONFIG__ = config;
			remoteConfig.value = config;
			remoteConfigState.value = useAuth ? "authenticated" : "anonymous";
			return;
		}
		console.warn("Failed to load remote config:", response.statusText);
		if (response.status === 401 || response.status === 403) {
			window.__CONFIG__ = {};
			remoteConfig.value = {};
			remoteConfigState.value = "error";
		}
	} catch (error) {
		console.error("Failed to fetch remote config:", error);
		window.__CONFIG__ = {};
		remoteConfig.value = {};
		remoteConfigState.value = "error";
	}
}
export { refreshRemoteConfig as t };

//# sourceMappingURL=refreshRemoteConfig-DiKJIobc.js.map