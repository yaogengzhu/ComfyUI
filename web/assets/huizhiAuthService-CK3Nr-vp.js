const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./i18n-DzPFDwJR.js","./vendor-primevue-BMWHeZll.js","./rolldown-runtime-DLICfi3-.js","./vendor-vue-core-tg-oZu4l.js","./i18n-Dy4mrtIR.js","./vendor-i18n-86kE_LSO.js","./index.esm-DjeWgtep.js","./vendor-firebase-DN8BxCYa.js"])))=>i.map(i=>d[i]);
import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { ct as __vitePreload } from "./vendor-primevue-BMWHeZll.js";
import { c as defineStore, kt as ref, l as storeToRefs } from "./vendor-vue-core-tg-oZu4l.js";
import { t as isCloud } from "./types-YYe-ycsK.js";
import { $t as until, _t as useAsyncState } from "./vendor-reka-ui-jxMUDvZT.js";
import { r as api } from "./api-CrHaA16j.js";
import { Di as useWorkflowStore, i as useSettingStore, ii as useFirebaseAuthStore } from "./dialogService-Cm1QZvWM.js";
import { t as useUserStore } from "./userStore-B8DDUPuE.js";
const useBootstrapStore = defineStore("bootstrap", () => {
	const settingStore = useSettingStore();
	const workflowStore = useWorkflowStore();
	const { isReady: isI18nReady, error: i18nError, execute: loadI18n } = useAsyncState(async () => {
		const { mergeCustomNodesI18n } = await __vitePreload(async () => {
			const { mergeCustomNodesI18n } = await import("./i18n-DzPFDwJR.js");
			return { mergeCustomNodesI18n };
		}, __vite__mapDeps([0,1,2,3,4,5]), import.meta.url);
		mergeCustomNodesI18n(await api.getCustomNodesI18n());
	}, void 0, { immediate: false });
	let storesLoaded = false;
	function loadAuthenticatedStores() {
		if (storesLoaded) return;
		storesLoaded = true;
		settingStore.load();
		workflowStore.loadWorkflows();
	}
	async function startStoreBootstrap() {
		const userStore = useUserStore();
		await userStore.initialize();
		if (isCloud) {
			const { isInitialized } = storeToRefs(useFirebaseAuthStore());
			await until(isInitialized).toBe(true);
		}
		const { needsLogin } = storeToRefs(userStore);
		await until(needsLogin).toBe(false);
		loadI18n();
		loadAuthenticatedStores();
	}
	return {
		isI18nReady,
		i18nError,
		startStoreBootstrap
	};
});
var AUTH_SERVICE_URL = "http://localhost:3001";
const HUIZHI_STORAGE_KEYS = {
	TOKEN: "huizhi_token",
	COMFY_ORG_TOKEN: "comfy_org_token",
	COMFY_ORG_EXPIRY: "comfy_org_token_expiry",
	USER_INFO: "huizhi_user",
	DEVICE_ID: "huizhi_device_id",
	SESSION_ID: "huizhi_session_id"
};
var TOKEN_REFRESH_THRESHOLD = 300 * 1e3;
var DEVICE_CHECK_INTERVAL = 300 * 1e3;
var tokenRefreshTimer = null;
var deviceCheckTimer = null;
var isLoggingOut = ref(false);
function getDeviceId() {
	let deviceId = localStorage.getItem(HUIZHI_STORAGE_KEYS.DEVICE_ID);
	if (deviceId) return deviceId;
	const str = [
		navigator.userAgent,
		navigator.language,
		screen.width + "x" + screen.height,
		screen.colorDepth.toString(),
		(/* @__PURE__ */ new Date()).getTimezoneOffset().toString(),
		(navigator.hardwareConcurrency || "unknown").toString(),
		navigator.platform
	].join("|");
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash;
	}
	deviceId = "device_" + Math.abs(hash).toString(36) + "_" + Date.now().toString(36);
	localStorage.setItem(HUIZHI_STORAGE_KEYS.DEVICE_ID, deviceId);
	return deviceId;
}
function isHuizhiLoggedIn() {
	const huizhiToken = localStorage.getItem(HUIZHI_STORAGE_KEYS.TOKEN);
	if (huizhiToken && huizhiToken !== "null" && huizhiToken !== "undefined") return true;
	return false;
}
function getHuizhiUserInfo() {
	try {
		const userInfoStr = localStorage.getItem(HUIZHI_STORAGE_KEYS.USER_INFO) || localStorage.getItem("comfy_user");
		if (userInfoStr) return JSON.parse(userInfoStr);
	} catch (e) {
		console.warn("[HuizhiAuth] Failed to parse user info:", e);
	}
	return null;
}
async function checkDeviceValidity() {
	if (isLoggingOut.value) return;
	const huizhiToken = localStorage.getItem(HUIZHI_STORAGE_KEYS.TOKEN);
	const deviceId = getDeviceId();
	if (!huizhiToken || !deviceId) {
		console.warn("[HuizhiAuth] Missing token or device ID for device check");
		return;
	}
	try {
		const response = await fetch(`${AUTH_SERVICE_URL}/api/auth/check-device?device_id=${encodeURIComponent(deviceId)}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${huizhiToken}`,
				"X-Device-ID": deviceId
			}
		});
		const result = await response.json();
		if (!response.ok || !result.valid) {
			console.warn("[HuizhiAuth] Device check failed:", result.reason, result.message);
			if (result.reason === "device_mismatch") showKickedOutNotification();
			else if (result.reason === "invalid_token" || result.reason === "session_expired") handleForceLogout("会话已过期，请重新登录");
		}
	} catch (err) {
		console.error("[HuizhiAuth] Device check error:", err);
	}
}
function startDeviceCheckPolling() {
	if (deviceCheckTimer) clearInterval(deviceCheckTimer);
	if (!isHuizhiLoggedIn()) return;
	checkDeviceValidity();
	deviceCheckTimer = setInterval(checkDeviceValidity, DEVICE_CHECK_INTERVAL);
	"" + DEVICE_CHECK_INTERVAL / 1e3;
}
function stopDeviceCheckPolling() {
	if (deviceCheckTimer) {
		clearInterval(deviceCheckTimer);
		deviceCheckTimer = null;
	}
}
function showKickedOutNotification() {
	if (isLoggingOut.value) return;
	isLoggingOut.value = true;
	stopDeviceCheckPolling();
	const overlay = document.createElement("div");
	overlay.id = "kicked-out-overlay";
	overlay.innerHTML = `
    <style>
      #kicked-out-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999999;
        backdrop-filter: blur(10px);
      }
      
      .kicked-out-dialog {
        background: #1e1e2e;
        border-radius: 16px;
        padding: 32px 40px;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        animation: slideIn 0.3s ease-out;
      }
      
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .kicked-out-dialog .icon {
        font-size: 48px;
        margin-bottom: 16px;
      }
      
      .kicked-out-dialog h2 {
        color: #fff;
        font-size: 20px;
        margin: 0 0 12px 0;
        font-weight: 600;
      }
      
      .kicked-out-dialog p {
        color: #a0a0b0;
        font-size: 14px;
        margin: 0 0 24px 0;
        line-height: 1.6;
      }
      
      .kicked-out-dialog button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 12px 32px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .kicked-out-dialog button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      }
      
      .kicked-out-dialog .countdown {
        color: #888;
        font-size: 12px;
        margin-top: 16px;
      }
    </style>
    <div class="kicked-out-dialog">
      <div class="icon">⚠️</div>
      <h2>账号已在其他设备登录</h2>
      <p>您的账号已在另一台设备上登录，当前会话已失效。<br>如非本人操作，请及时修改密码。</p>
      <button onclick="window.location.href='/login'">重新登录</button>
      <div class="countdown">将在 <span id="countdown-seconds">5</span> 秒后自动跳转到登录页...</div>
    </div>
  `;
	document.body.appendChild(overlay);
	let countdown = 5;
	const countdownEl = document.getElementById("countdown-seconds");
	const countdownTimer = setInterval(() => {
		countdown--;
		if (countdownEl) countdownEl.textContent = countdown.toString();
		if (countdown <= 0) {
			clearInterval(countdownTimer);
			handleForceLogout();
		}
	}, 1e3);
}
function handleForceLogout(message) {
	if (isLoggingOut.value && !document.getElementById("kicked-out-overlay")) return;
	isLoggingOut.value = true;
	stopDeviceCheckPolling();
	if (tokenRefreshTimer) {
		clearTimeout(tokenRefreshTimer);
		tokenRefreshTimer = null;
	}
	Object.values(HUIZHI_STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
	localStorage.removeItem("comfy_user");
	localStorage.removeItem("comfy_refresh_token");
	localStorage.removeItem("huizhi_user_info");
	document.cookie = "comfy_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	sessionStorage.setItem("comfy_logout_in_progress", "true");
	if (message) sessionStorage.setItem("login_message", message);
	window.location.href = "/login";
}
function setupTokenRefresh() {
	const expiryStr = localStorage.getItem(HUIZHI_STORAGE_KEYS.COMFY_ORG_EXPIRY);
	const comfyOrgToken = localStorage.getItem(HUIZHI_STORAGE_KEYS.COMFY_ORG_TOKEN);
	if (!comfyOrgToken || comfyOrgToken === "null" || comfyOrgToken === "undefined" || !expiryStr || expiryStr === "0") {
		refreshComfyOrgToken();
		return;
	}
	const timeUntilRefresh = parseInt(expiryStr, 10) - Date.now() - TOKEN_REFRESH_THRESHOLD;
	if (timeUntilRefresh <= 0) refreshComfyOrgToken();
	else {
		if (tokenRefreshTimer) clearTimeout(tokenRefreshTimer);
		tokenRefreshTimer = setTimeout(refreshComfyOrgToken, timeUntilRefresh);
		Math.round(timeUntilRefresh / 1e3 / 60);
	}
}
async function refreshComfyOrgToken() {
	const huizhiToken = localStorage.getItem(HUIZHI_STORAGE_KEYS.TOKEN);
	if (!huizhiToken) {
		console.warn("[HuizhiAuth] No huizhi token for refresh");
		return;
	}
	try {
		const response = await fetch(`${AUTH_SERVICE_URL}/api/auth/refresh-comfy-token`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${huizhiToken}`,
				"Content-Type": "application/json"
			}
		});
		if (response.ok) {
			const result = await response.json();
			if (result.data?.comfyOrgToken) {
				localStorage.setItem(HUIZHI_STORAGE_KEYS.COMFY_ORG_TOKEN, result.data.comfyOrgToken);
				const newExpiry = Date.now() + (result.data.expiresIn || 3600) * 1e3;
				localStorage.setItem(HUIZHI_STORAGE_KEYS.COMFY_ORG_EXPIRY, newExpiry.toString());
				if (result.data.comfyCredentials) try {
					const { getAuth, signInWithEmailAndPassword } = await __vitePreload(async () => {
						const { getAuth, signInWithEmailAndPassword } = await import("./index.esm-DjeWgtep.js");
						return {
							getAuth,
							signInWithEmailAndPassword
						};
					}, __vite__mapDeps([6,7,2]), import.meta.url);
					const auth = getAuth();
					if (!auth.currentUser) await signInWithEmailAndPassword(auth, result.data.comfyCredentials.email, result.data.comfyCredentials.password);
				} catch (firebaseErr) {
					console.warn("[HuizhiAuth] Firebase re-auth failed (non-critical):", firebaseErr);
				}
				setupTokenRefresh();
			}
		} else if (response.status === 401) {
			console.warn("[HuizhiAuth] Session expired, redirecting to login");
			handleHuizhiLogout(false);
		}
	} catch (err) {
		console.error("[HuizhiAuth] Failed to refresh token:", err);
		if (tokenRefreshTimer) clearTimeout(tokenRefreshTimer);
		tokenRefreshTimer = setTimeout(refreshComfyOrgToken, 300 * 1e3);
	}
}
async function handleHuizhiLogout(confirmLogout = true) {
	if (confirmLogout && !confirm("确定要退出登录吗？")) return;
	window.__HUIZHI_LOGOUT_IN_PROGRESS__ = true;
	stopDeviceCheckPolling();
	if (tokenRefreshTimer) {
		clearTimeout(tokenRefreshTimer);
		tokenRefreshTimer = null;
	}
	try {
		const apiInstance = window.app?.api;
		if (apiInstance) {
			const socket = apiInstance.socket;
			if (socket && (socket.readyState === 0 || socket.readyState === 1)) socket.close(1e3, "User logout");
			apiInstance.socket = null;
		}
	} catch (e) {}
	try {
		const { getAuth, signOut } = await __vitePreload(async () => {
			const { getAuth, signOut } = await import("./index.esm-DjeWgtep.js");
			return {
				getAuth,
				signOut
			};
		}, __vite__mapDeps([6,7,2]), import.meta.url);
		await signOut(getAuth());
	} catch (e) {
		console.warn("[HuizhiAuth] Firebase signOut failed (non-critical):", e);
	}
	Object.values(HUIZHI_STORAGE_KEYS).forEach((key) => {
		try {
			localStorage.removeItem(key);
		} catch (e) {}
	});
	[
		"comfy_user",
		"comfy_refresh_token",
		"huizhi_user_info",
		"comfy_token",
		"clientId"
	].forEach((key) => {
		try {
			localStorage.removeItem(key);
		} catch (e) {}
	});
	const allKeys = [];
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		if (key) allKeys.push(key);
	}
	allKeys.forEach((key) => {
		if (key && (key.includes("firebase") || key.includes("comfy") || key.includes("huizhi"))) try {
			localStorage.removeItem(key);
		} catch (e) {}
	});
	document.cookie.split(";").forEach((cookie) => {
		const name = cookie.split("=")[0].trim();
		document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
	});
	try {
		indexedDB.deleteDatabase("firebaseLocalStorageDb");
	} catch (e) {}
	window.location.href = "/login?logout=1";
}
function initHuizhiAuthService() {
	if (!isHuizhiLoggedIn()) return;
	getHuizhiUserInfo()?.username;
	setupTokenRefresh();
	startDeviceCheckPolling();
}
export { useBootstrapStore as i, initHuizhiAuthService as n, isHuizhiLoggedIn as r, handleHuizhiLogout as t };

//# sourceMappingURL=huizhiAuthService-CK3Nr-vp.js.map