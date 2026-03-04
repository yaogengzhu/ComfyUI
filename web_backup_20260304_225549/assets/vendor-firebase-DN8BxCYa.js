import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
/**
* @license
* Copyright 2025 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var getDefaultsFromPostinstall = () => void 0;
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var CONSTANTS = {
	NODE_CLIENT: false,
	NODE_ADMIN: false,
	SDK_VERSION: "${JSCORE_VERSION}"
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var assert = function(assertion, message) {
	if (!assertion) throw assertionError(message);
};
var assertionError = function(message) {
	return /* @__PURE__ */ new Error("Firebase Database (" + CONSTANTS.SDK_VERSION + ") INTERNAL ASSERT FAILED: " + message);
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var stringToByteArray$1 = function(str) {
	const out = [];
	let p = 0;
	for (let i = 0; i < str.length; i++) {
		let c = str.charCodeAt(i);
		if (c < 128) out[p++] = c;
		else if (c < 2048) {
			out[p++] = c >> 6 | 192;
			out[p++] = c & 63 | 128;
		} else if ((c & 64512) === 55296 && i + 1 < str.length && (str.charCodeAt(i + 1) & 64512) === 56320) {
			c = 65536 + ((c & 1023) << 10) + (str.charCodeAt(++i) & 1023);
			out[p++] = c >> 18 | 240;
			out[p++] = c >> 12 & 63 | 128;
			out[p++] = c >> 6 & 63 | 128;
			out[p++] = c & 63 | 128;
		} else {
			out[p++] = c >> 12 | 224;
			out[p++] = c >> 6 & 63 | 128;
			out[p++] = c & 63 | 128;
		}
	}
	return out;
};
var byteArrayToString = function(bytes) {
	const out = [];
	let pos = 0;
	let c = 0;
	while (pos < bytes.length) {
		const c1 = bytes[pos++];
		if (c1 < 128) out[c++] = String.fromCharCode(c1);
		else if (c1 > 191 && c1 < 224) {
			const c2 = bytes[pos++];
			out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
		} else if (c1 > 239 && c1 < 365) {
			const c2 = bytes[pos++];
			const c3 = bytes[pos++];
			const c4 = bytes[pos++];
			const u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 65536;
			out[c++] = String.fromCharCode(55296 + (u >> 10));
			out[c++] = String.fromCharCode(56320 + (u & 1023));
		} else {
			const c2 = bytes[pos++];
			const c3 = bytes[pos++];
			out[c++] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
		}
	}
	return out.join("");
};
var base64 = {
	byteToCharMap_: null,
	charToByteMap_: null,
	byteToCharMapWebSafe_: null,
	charToByteMapWebSafe_: null,
	ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
	get ENCODED_VALS() {
		return this.ENCODED_VALS_BASE + "+/=";
	},
	get ENCODED_VALS_WEBSAFE() {
		return this.ENCODED_VALS_BASE + "-_.";
	},
	HAS_NATIVE_SUPPORT: typeof atob === "function",
	encodeByteArray(input, webSafe) {
		if (!Array.isArray(input)) throw Error("encodeByteArray takes an array as a parameter");
		this.init_();
		const byteToCharMap = webSafe ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
		const output = [];
		for (let i = 0; i < input.length; i += 3) {
			const byte1 = input[i];
			const haveByte2 = i + 1 < input.length;
			const byte2 = haveByte2 ? input[i + 1] : 0;
			const haveByte3 = i + 2 < input.length;
			const byte3 = haveByte3 ? input[i + 2] : 0;
			const outByte1 = byte1 >> 2;
			const outByte2 = (byte1 & 3) << 4 | byte2 >> 4;
			let outByte3 = (byte2 & 15) << 2 | byte3 >> 6;
			let outByte4 = byte3 & 63;
			if (!haveByte3) {
				outByte4 = 64;
				if (!haveByte2) outByte3 = 64;
			}
			output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
		}
		return output.join("");
	},
	encodeString(input, webSafe) {
		if (this.HAS_NATIVE_SUPPORT && !webSafe) return btoa(input);
		return this.encodeByteArray(stringToByteArray$1(input), webSafe);
	},
	decodeString(input, webSafe) {
		if (this.HAS_NATIVE_SUPPORT && !webSafe) return atob(input);
		return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
	},
	decodeStringToByteArray(input, webSafe) {
		this.init_();
		const charToByteMap = webSafe ? this.charToByteMapWebSafe_ : this.charToByteMap_;
		const output = [];
		for (let i = 0; i < input.length;) {
			const byte1 = charToByteMap[input.charAt(i++)];
			const byte2 = i < input.length ? charToByteMap[input.charAt(i)] : 0;
			++i;
			const byte3 = i < input.length ? charToByteMap[input.charAt(i)] : 64;
			++i;
			const byte4 = i < input.length ? charToByteMap[input.charAt(i)] : 64;
			++i;
			if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) throw new DecodeBase64StringError();
			const outByte1 = byte1 << 2 | byte2 >> 4;
			output.push(outByte1);
			if (byte3 !== 64) {
				const outByte2 = byte2 << 4 & 240 | byte3 >> 2;
				output.push(outByte2);
				if (byte4 !== 64) {
					const outByte3 = byte3 << 6 & 192 | byte4;
					output.push(outByte3);
				}
			}
		}
		return output;
	},
	init_() {
		if (!this.byteToCharMap_) {
			this.byteToCharMap_ = {};
			this.charToByteMap_ = {};
			this.byteToCharMapWebSafe_ = {};
			this.charToByteMapWebSafe_ = {};
			for (let i = 0; i < this.ENCODED_VALS.length; i++) {
				this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
				this.charToByteMap_[this.byteToCharMap_[i]] = i;
				this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
				this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i;
				if (i >= this.ENCODED_VALS_BASE.length) {
					this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
					this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
				}
			}
		}
	}
};
var DecodeBase64StringError = class extends Error {
	constructor() {
		super(...arguments);
		this.name = "DecodeBase64StringError";
	}
};
var base64Encode = function(str) {
	const utf8Bytes = stringToByteArray$1(str);
	return base64.encodeByteArray(utf8Bytes, true);
};
var base64urlEncodeWithoutPadding = function(str) {
	return base64Encode(str).replace(/\./g, "");
};
var base64Decode = function(str) {
	try {
		return base64.decodeString(str, true);
	} catch (e) {
		console.error("base64Decode failed: ", e);
	}
	return null;
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function deepCopy(value) {
	return deepExtend(void 0, value);
}
function deepExtend(target, source) {
	if (!(source instanceof Object)) return source;
	switch (source.constructor) {
		case Date:
			const dateValue = source;
			return new Date(dateValue.getTime());
		case Object:
			if (target === void 0) target = {};
			break;
		case Array:
			target = [];
			break;
		default: return source;
	}
	for (const prop in source) {
		if (!source.hasOwnProperty(prop) || !isValidKey$1(prop)) continue;
		target[prop] = deepExtend(target[prop], source[prop]);
	}
	return target;
}
function isValidKey$1(key) {
	return key !== "__proto__";
}
__name(isValidKey$1, "isValidKey");
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function getGlobal() {
	if (typeof self !== "undefined") return self;
	if (typeof window !== "undefined") return window;
	if (typeof global !== "undefined") return global;
	throw new Error("Unable to locate global object.");
}
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var getDefaultsFromGlobal = () => getGlobal().__FIREBASE_DEFAULTS__;
var getDefaultsFromEnvVariable = () => {
	if (typeof process === "undefined" || false) return;
	const defaultsJsonString = {}.__FIREBASE_DEFAULTS__;
	if (defaultsJsonString) return JSON.parse(defaultsJsonString);
};
var getDefaultsFromCookie = () => {
	if (typeof document === "undefined") return;
	let match;
	try {
		match = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
	} catch (e) {
		return;
	}
	const decoded = match && base64Decode(match[1]);
	return decoded && JSON.parse(decoded);
};
var getDefaults = () => {
	try {
		return getDefaultsFromPostinstall() || getDefaultsFromGlobal() || getDefaultsFromEnvVariable() || getDefaultsFromCookie();
	} catch (e) {
		`${e}`;
		return;
	}
};
var getDefaultEmulatorHost = (productName) => {
	var _a;
	var _b;
	return (_b = (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a.emulatorHosts) === null || _b === void 0 ? void 0 : _b[productName];
};
var getDefaultAppConfig = () => {
	var _a;
	return (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a.config;
};
var getExperimentalSetting = (name) => {
	var _a;
	return (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a[`_${name}`];
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Deferred = class {
	constructor() {
		this.reject = () => {};
		this.resolve = () => {};
		this.promise = new Promise((resolve, reject) => {
			this.resolve = resolve;
			this.reject = reject;
		});
	}
	wrapCallback(callback) {
		return (error, value) => {
			if (error) this.reject(error);
			else this.resolve(value);
			if (typeof callback === "function") {
				this.promise.catch(() => {});
				if (callback.length === 1) callback(error);
				else callback(error, value);
			}
		};
	}
};
/**
* @license
* Copyright 2025 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function isCloudWorkstation(url) {
	try {
		return (url.startsWith("http://") || url.startsWith("https://") ? new URL(url).hostname : url).endsWith(".cloudworkstations.dev");
	} catch (_a) {
		return false;
	}
}
async function pingServer(endpoint) {
	return (await fetch(endpoint, { credentials: "include" })).ok;
}
var emulatorStatus = {};
function getEmulatorSummary() {
	const summary = {
		prod: [],
		emulator: []
	};
	for (const key of Object.keys(emulatorStatus)) if (emulatorStatus[key]) summary.emulator.push(key);
	else summary.prod.push(key);
	return summary;
}
function getOrCreateEl(id) {
	let parentDiv = document.getElementById(id);
	let created = false;
	if (!parentDiv) {
		parentDiv = document.createElement("div");
		parentDiv.setAttribute("id", id);
		created = true;
	}
	return {
		created,
		element: parentDiv
	};
}
var previouslyDismissed = false;
function updateEmulatorBanner(name, isRunningEmulator) {
	if (typeof window === "undefined" || typeof document === "undefined" || !isCloudWorkstation(window.location.host) || emulatorStatus[name] === isRunningEmulator || emulatorStatus[name] || previouslyDismissed) return;
	emulatorStatus[name] = isRunningEmulator;
	function prefixedId(id) {
		return `__firebase__banner__${id}`;
	}
	const bannerId = "__firebase__banner";
	const showError = getEmulatorSummary().prod.length > 0;
	function tearDown() {
		const element = document.getElementById(bannerId);
		if (element) element.remove();
	}
	function setupBannerStyles(bannerEl) {
		bannerEl.style.display = "flex";
		bannerEl.style.background = "#7faaf0";
		bannerEl.style.position = "fixed";
		bannerEl.style.bottom = "5px";
		bannerEl.style.left = "5px";
		bannerEl.style.padding = ".5em";
		bannerEl.style.borderRadius = "5px";
		bannerEl.style.alignItems = "center";
	}
	function setupIconStyles(prependIcon, iconId) {
		prependIcon.setAttribute("width", "24");
		prependIcon.setAttribute("id", iconId);
		prependIcon.setAttribute("height", "24");
		prependIcon.setAttribute("viewBox", "0 0 24 24");
		prependIcon.setAttribute("fill", "none");
		prependIcon.style.marginLeft = "-6px";
	}
	function setupCloseBtn() {
		const closeBtn = document.createElement("span");
		closeBtn.style.cursor = "pointer";
		closeBtn.style.marginLeft = "16px";
		closeBtn.style.fontSize = "24px";
		closeBtn.innerHTML = " &times;";
		closeBtn.onclick = () => {
			previouslyDismissed = true;
			tearDown();
		};
		return closeBtn;
	}
	function setupLinkStyles(learnMoreLink, learnMoreId) {
		learnMoreLink.setAttribute("id", learnMoreId);
		learnMoreLink.innerText = "Learn more";
		learnMoreLink.href = "https://firebase.google.com/docs/studio/preview-apps#preview-backend";
		learnMoreLink.setAttribute("target", "__blank");
		learnMoreLink.style.paddingLeft = "5px";
		learnMoreLink.style.textDecoration = "underline";
	}
	function setupDom() {
		const banner = getOrCreateEl(bannerId);
		const firebaseTextId = prefixedId("text");
		const firebaseText = document.getElementById(firebaseTextId) || document.createElement("span");
		const learnMoreId = prefixedId("learnmore");
		const learnMoreLink = document.getElementById(learnMoreId) || document.createElement("a");
		const prependIconId = prefixedId("preprendIcon");
		const prependIcon = document.getElementById(prependIconId) || document.createElementNS("http://www.w3.org/2000/svg", "svg");
		if (banner.created) {
			const bannerEl = banner.element;
			setupBannerStyles(bannerEl);
			setupLinkStyles(learnMoreLink, learnMoreId);
			const closeBtn = setupCloseBtn();
			setupIconStyles(prependIcon, prependIconId);
			bannerEl.append(prependIcon, firebaseText, learnMoreLink, closeBtn);
			document.body.appendChild(bannerEl);
		}
		if (showError) {
			firebaseText.innerText = `Preview backend disconnected.`;
			prependIcon.innerHTML = `<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`;
		} else {
			prependIcon.innerHTML = `<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`;
			firebaseText.innerText = "Preview backend running in this workspace.";
		}
		firebaseText.setAttribute("id", firebaseTextId);
	}
	if (document.readyState === "loading") window.addEventListener("DOMContentLoaded", setupDom);
	else setupDom();
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function getUA() {
	if (typeof navigator !== "undefined" && typeof navigator["userAgent"] === "string") return navigator["userAgent"];
	else return "";
}
function isMobileCordova() {
	return typeof window !== "undefined" && !!(window["cordova"] || window["phonegap"] || window["PhoneGap"]) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA());
}
function isNode() {
	var _a;
	const forceEnvironment = (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a.forceEnvironment;
	if (forceEnvironment === "node") return true;
	else if (forceEnvironment === "browser") return false;
	try {
		return Object.prototype.toString.call(global.process) === "[object process]";
	} catch (e) {
		return false;
	}
}
function isCloudflareWorker() {
	return typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers";
}
function isBrowserExtension() {
	const runtime = typeof chrome === "object" ? chrome.runtime : typeof browser === "object" ? browser.runtime : void 0;
	return typeof runtime === "object" && runtime.id !== void 0;
}
function isReactNative() {
	return typeof navigator === "object" && navigator["product"] === "ReactNative";
}
function isIE() {
	const ua = getUA();
	return ua.indexOf("MSIE ") >= 0 || ua.indexOf("Trident/") >= 0;
}
function isNodeSdk() {
	return CONSTANTS.NODE_CLIENT === true || CONSTANTS.NODE_ADMIN === true;
}
function isSafari() {
	return !isNode() && !!navigator.userAgent && navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
}
function isIndexedDBAvailable() {
	try {
		return typeof indexedDB === "object";
	} catch (e) {
		return false;
	}
}
function validateIndexedDBOpenable() {
	return new Promise((resolve, reject) => {
		try {
			let preExist = true;
			const DB_CHECK_NAME = "validate-browser-context-for-indexeddb-analytics-module";
			const request = self.indexedDB.open(DB_CHECK_NAME);
			request.onsuccess = () => {
				request.result.close();
				if (!preExist) self.indexedDB.deleteDatabase(DB_CHECK_NAME);
				resolve(true);
			};
			request.onupgradeneeded = () => {
				preExist = false;
			};
			request.onerror = () => {
				var _a;
				reject(((_a = request.error) === null || _a === void 0 ? void 0 : _a.message) || "");
			};
		} catch (error) {
			reject(error);
		}
	});
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var ERROR_NAME = "FirebaseError";
var FirebaseError = class FirebaseError extends Error {
	constructor(code, message, customData) {
		super(message);
		this.code = code;
		this.customData = customData;
		this.name = ERROR_NAME;
		Object.setPrototypeOf(this, FirebaseError.prototype);
		if (Error.captureStackTrace) Error.captureStackTrace(this, ErrorFactory.prototype.create);
	}
};
var ErrorFactory = class {
	constructor(service, serviceName, errors) {
		this.service = service;
		this.serviceName = serviceName;
		this.errors = errors;
	}
	create(code, ...data) {
		const customData = data[0] || {};
		const fullCode = `${this.service}/${code}`;
		const template = this.errors[code];
		const message = template ? replaceTemplate(template, customData) : "Error";
		return new FirebaseError(fullCode, `${this.serviceName}: ${message} (${fullCode}).`, customData);
	}
};
function replaceTemplate(template, data) {
	return template.replace(PATTERN, (_, key) => {
		const value = data[key];
		return value != null ? String(value) : `<${key}?>`;
	});
}
var PATTERN = /\{\$([^}]+)}/g;
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function jsonEval(str) {
	return JSON.parse(str);
}
function stringify(data) {
	return JSON.stringify(data);
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var decode = function(token) {
	let header = {};
	let claims = {};
	let data = {};
	let signature = "";
	try {
		const parts = token.split(".");
		header = jsonEval(base64Decode(parts[0]) || "");
		claims = jsonEval(base64Decode(parts[1]) || "");
		signature = parts[2];
		data = claims["d"] || {};
		delete claims["d"];
	} catch (e) {}
	return {
		header,
		claims,
		data,
		signature
	};
};
var isValidFormat = function(token) {
	const claims = decode(token).claims;
	return !!claims && typeof claims === "object" && claims.hasOwnProperty("iat");
};
var isAdmin = function(token) {
	const claims = decode(token).claims;
	return typeof claims === "object" && claims["admin"] === true;
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function contains(obj, key) {
	return Object.prototype.hasOwnProperty.call(obj, key);
}
function safeGet(obj, key) {
	if (Object.prototype.hasOwnProperty.call(obj, key)) return obj[key];
	else return;
}
function isEmpty$1(obj) {
	for (const key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
	return true;
}
__name(isEmpty$1, "isEmpty");
function map(obj, fn, contextObj) {
	const res = {};
	for (const key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) res[key] = fn.call(contextObj, obj[key], key, obj);
	return res;
}
function deepEqual(a, b) {
	if (a === b) return true;
	const aKeys = Object.keys(a);
	const bKeys = Object.keys(b);
	for (const k of aKeys) {
		if (!bKeys.includes(k)) return false;
		const aProp = a[k];
		const bProp = b[k];
		if (isObject(aProp) && isObject(bProp)) {
			if (!deepEqual(aProp, bProp)) return false;
		} else if (aProp !== bProp) return false;
	}
	for (const k of bKeys) if (!aKeys.includes(k)) return false;
	return true;
}
function isObject(thing) {
	return thing !== null && typeof thing === "object";
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function querystring(querystringParams) {
	const params = [];
	for (const [key, value] of Object.entries(querystringParams)) if (Array.isArray(value)) value.forEach((arrayVal) => {
		params.push(encodeURIComponent(key) + "=" + encodeURIComponent(arrayVal));
	});
	else params.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
	return params.length ? "&" + params.join("&") : "";
}
function querystringDecode(querystring) {
	const obj = {};
	querystring.replace(/^\?/, "").split("&").forEach((token) => {
		if (token) {
			const [key, value] = token.split("=");
			obj[decodeURIComponent(key)] = decodeURIComponent(value);
		}
	});
	return obj;
}
function extractQuerystring(url) {
	const queryStart = url.indexOf("?");
	if (!queryStart) return "";
	const fragmentStart = url.indexOf("#", queryStart);
	return url.substring(queryStart, fragmentStart > 0 ? fragmentStart : void 0);
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Sha1 = class {
	constructor() {
		this.chain_ = [];
		this.buf_ = [];
		this.W_ = [];
		this.pad_ = [];
		this.inbuf_ = 0;
		this.total_ = 0;
		this.blockSize = 512 / 8;
		this.pad_[0] = 128;
		for (let i = 1; i < this.blockSize; ++i) this.pad_[i] = 0;
		this.reset();
	}
	reset() {
		this.chain_[0] = 1732584193;
		this.chain_[1] = 4023233417;
		this.chain_[2] = 2562383102;
		this.chain_[3] = 271733878;
		this.chain_[4] = 3285377520;
		this.inbuf_ = 0;
		this.total_ = 0;
	}
	compress_(buf, offset) {
		if (!offset) offset = 0;
		const W = this.W_;
		if (typeof buf === "string") for (let i = 0; i < 16; i++) {
			W[i] = buf.charCodeAt(offset) << 24 | buf.charCodeAt(offset + 1) << 16 | buf.charCodeAt(offset + 2) << 8 | buf.charCodeAt(offset + 3);
			offset += 4;
		}
		else for (let i = 0; i < 16; i++) {
			W[i] = buf[offset] << 24 | buf[offset + 1] << 16 | buf[offset + 2] << 8 | buf[offset + 3];
			offset += 4;
		}
		for (let i = 16; i < 80; i++) {
			const t = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
			W[i] = (t << 1 | t >>> 31) & 4294967295;
		}
		let a = this.chain_[0];
		let b = this.chain_[1];
		let c = this.chain_[2];
		let d = this.chain_[3];
		let e = this.chain_[4];
		let f;
		let k;
		for (let i = 0; i < 80; i++) {
			if (i < 40) if (i < 20) {
				f = d ^ b & (c ^ d);
				k = 1518500249;
			} else {
				f = b ^ c ^ d;
				k = 1859775393;
			}
			else if (i < 60) {
				f = b & c | d & (b | c);
				k = 2400959708;
			} else {
				f = b ^ c ^ d;
				k = 3395469782;
			}
			const t = (a << 5 | a >>> 27) + f + e + k + W[i] & 4294967295;
			e = d;
			d = c;
			c = (b << 30 | b >>> 2) & 4294967295;
			b = a;
			a = t;
		}
		this.chain_[0] = this.chain_[0] + a & 4294967295;
		this.chain_[1] = this.chain_[1] + b & 4294967295;
		this.chain_[2] = this.chain_[2] + c & 4294967295;
		this.chain_[3] = this.chain_[3] + d & 4294967295;
		this.chain_[4] = this.chain_[4] + e & 4294967295;
	}
	update(bytes, length) {
		if (bytes == null) return;
		if (length === void 0) length = bytes.length;
		const lengthMinusBlock = length - this.blockSize;
		let n = 0;
		const buf = this.buf_;
		let inbuf = this.inbuf_;
		while (n < length) {
			if (inbuf === 0) while (n <= lengthMinusBlock) {
				this.compress_(bytes, n);
				n += this.blockSize;
			}
			if (typeof bytes === "string") while (n < length) {
				buf[inbuf] = bytes.charCodeAt(n);
				++inbuf;
				++n;
				if (inbuf === this.blockSize) {
					this.compress_(buf);
					inbuf = 0;
					break;
				}
			}
			else while (n < length) {
				buf[inbuf] = bytes[n];
				++inbuf;
				++n;
				if (inbuf === this.blockSize) {
					this.compress_(buf);
					inbuf = 0;
					break;
				}
			}
		}
		this.inbuf_ = inbuf;
		this.total_ += length;
	}
	digest() {
		const digest = [];
		let totalBits = this.total_ * 8;
		if (this.inbuf_ < 56) this.update(this.pad_, 56 - this.inbuf_);
		else this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
		for (let i = this.blockSize - 1; i >= 56; i--) {
			this.buf_[i] = totalBits & 255;
			totalBits /= 256;
		}
		this.compress_(this.buf_);
		let n = 0;
		for (let i = 0; i < 5; i++) for (let j = 24; j >= 0; j -= 8) {
			digest[n] = this.chain_[i] >> j & 255;
			++n;
		}
		return digest;
	}
};
function createSubscribe(executor, onNoObservers) {
	const proxy = new ObserverProxy(executor, onNoObservers);
	return proxy.subscribe.bind(proxy);
}
var ObserverProxy = class {
	constructor(executor, onNoObservers) {
		this.observers = [];
		this.unsubscribes = [];
		this.observerCount = 0;
		this.task = Promise.resolve();
		this.finalized = false;
		this.onNoObservers = onNoObservers;
		this.task.then(() => {
			executor(this);
		}).catch((e) => {
			this.error(e);
		});
	}
	next(value) {
		this.forEachObserver((observer) => {
			observer.next(value);
		});
	}
	error(error) {
		this.forEachObserver((observer) => {
			observer.error(error);
		});
		this.close(error);
	}
	complete() {
		this.forEachObserver((observer) => {
			observer.complete();
		});
		this.close();
	}
	subscribe(nextOrObserver, error, complete) {
		let observer;
		if (nextOrObserver === void 0 && error === void 0 && complete === void 0) throw new Error("Missing Observer.");
		if (implementsAnyMethods(nextOrObserver, [
			"next",
			"error",
			"complete"
		])) observer = nextOrObserver;
		else observer = {
			next: nextOrObserver,
			error,
			complete
		};
		if (observer.next === void 0) observer.next = noop;
		if (observer.error === void 0) observer.error = noop;
		if (observer.complete === void 0) observer.complete = noop;
		const unsub = this.unsubscribeOne.bind(this, this.observers.length);
		if (this.finalized) this.task.then(() => {
			try {
				if (this.finalError) observer.error(this.finalError);
				else observer.complete();
			} catch (e) {}
		});
		this.observers.push(observer);
		return unsub;
	}
	unsubscribeOne(i) {
		if (this.observers === void 0 || this.observers[i] === void 0) return;
		delete this.observers[i];
		this.observerCount -= 1;
		if (this.observerCount === 0 && this.onNoObservers !== void 0) this.onNoObservers(this);
	}
	forEachObserver(fn) {
		if (this.finalized) return;
		for (let i = 0; i < this.observers.length; i++) this.sendOne(i, fn);
	}
	sendOne(i, fn) {
		this.task.then(() => {
			if (this.observers !== void 0 && this.observers[i] !== void 0) try {
				fn(this.observers[i]);
			} catch (e) {
				if (typeof console !== "undefined" && console.error) console.error(e);
			}
		});
	}
	close(err) {
		if (this.finalized) return;
		this.finalized = true;
		if (err !== void 0) this.finalError = err;
		this.task.then(() => {
			this.observers = void 0;
			this.onNoObservers = void 0;
		});
	}
};
function implementsAnyMethods(obj, methods) {
	if (typeof obj !== "object" || obj === null) return false;
	for (const method of methods) if (method in obj && typeof obj[method] === "function") return true;
	return false;
}
function noop() {}
function errorPrefix(fnName, argName) {
	return `${fnName} failed: ${argName} argument `;
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var stringToByteArray = function(str) {
	const out = [];
	let p = 0;
	for (let i = 0; i < str.length; i++) {
		let c = str.charCodeAt(i);
		if (c >= 55296 && c <= 56319) {
			const high = c - 55296;
			i++;
			assert(i < str.length, "Surrogate pair missing trail surrogate.");
			const low = str.charCodeAt(i) - 56320;
			c = 65536 + (high << 10) + low;
		}
		if (c < 128) out[p++] = c;
		else if (c < 2048) {
			out[p++] = c >> 6 | 192;
			out[p++] = c & 63 | 128;
		} else if (c < 65536) {
			out[p++] = c >> 12 | 224;
			out[p++] = c >> 6 & 63 | 128;
			out[p++] = c & 63 | 128;
		} else {
			out[p++] = c >> 18 | 240;
			out[p++] = c >> 12 & 63 | 128;
			out[p++] = c >> 6 & 63 | 128;
			out[p++] = c & 63 | 128;
		}
	}
	return out;
};
var stringLength = function(str) {
	let p = 0;
	for (let i = 0; i < str.length; i++) {
		const c = str.charCodeAt(i);
		if (c < 128) p++;
		else if (c < 2048) p += 2;
		else if (c >= 55296 && c <= 56319) {
			p += 4;
			i++;
		} else p += 3;
	}
	return p;
};
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function getModularInstance(service) {
	if (service && service._delegate) return service._delegate;
	else return service;
}
var Component = class {
	constructor(name, instanceFactory, type) {
		this.name = name;
		this.instanceFactory = instanceFactory;
		this.type = type;
		this.multipleInstances = false;
		this.serviceProps = {};
		this.instantiationMode = "LAZY";
		this.onInstanceCreated = null;
	}
	setInstantiationMode(mode) {
		this.instantiationMode = mode;
		return this;
	}
	setMultipleInstances(multipleInstances) {
		this.multipleInstances = multipleInstances;
		return this;
	}
	setServiceProps(props) {
		this.serviceProps = props;
		return this;
	}
	setInstanceCreatedCallback(callback) {
		this.onInstanceCreated = callback;
		return this;
	}
};
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var DEFAULT_ENTRY_NAME$1 = "[DEFAULT]";
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Provider = class {
	constructor(name, container) {
		this.name = name;
		this.container = container;
		this.component = null;
		this.instances = /* @__PURE__ */ new Map();
		this.instancesDeferred = /* @__PURE__ */ new Map();
		this.instancesOptions = /* @__PURE__ */ new Map();
		this.onInitCallbacks = /* @__PURE__ */ new Map();
	}
	get(identifier) {
		const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
		if (!this.instancesDeferred.has(normalizedIdentifier)) {
			const deferred = new Deferred();
			this.instancesDeferred.set(normalizedIdentifier, deferred);
			if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) try {
				const instance = this.getOrInitializeService({ instanceIdentifier: normalizedIdentifier });
				if (instance) deferred.resolve(instance);
			} catch (e) {}
		}
		return this.instancesDeferred.get(normalizedIdentifier).promise;
	}
	getImmediate(options) {
		var _a;
		const normalizedIdentifier = this.normalizeInstanceIdentifier(options === null || options === void 0 ? void 0 : options.identifier);
		const optional = (_a = options === null || options === void 0 ? void 0 : options.optional) !== null && _a !== void 0 ? _a : false;
		if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) try {
			return this.getOrInitializeService({ instanceIdentifier: normalizedIdentifier });
		} catch (e) {
			if (optional) return null;
			else throw e;
		}
		else if (optional) return null;
		else throw Error(`Service ${this.name} is not available`);
	}
	getComponent() {
		return this.component;
	}
	setComponent(component) {
		if (component.name !== this.name) throw Error(`Mismatching Component ${component.name} for Provider ${this.name}.`);
		if (this.component) throw Error(`Component for ${this.name} has already been provided`);
		this.component = component;
		if (!this.shouldAutoInitialize()) return;
		if (isComponentEager(component)) try {
			this.getOrInitializeService({ instanceIdentifier: DEFAULT_ENTRY_NAME$1 });
		} catch (e) {}
		for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
			const normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
			try {
				const instance = this.getOrInitializeService({ instanceIdentifier: normalizedIdentifier });
				instanceDeferred.resolve(instance);
			} catch (e) {}
		}
	}
	clearInstance(identifier = DEFAULT_ENTRY_NAME$1) {
		this.instancesDeferred.delete(identifier);
		this.instancesOptions.delete(identifier);
		this.instances.delete(identifier);
	}
	async delete() {
		const services = Array.from(this.instances.values());
		await Promise.all([...services.filter((service) => "INTERNAL" in service).map((service) => service.INTERNAL.delete()), ...services.filter((service) => "_delete" in service).map((service) => service._delete())]);
	}
	isComponentSet() {
		return this.component != null;
	}
	isInitialized(identifier = DEFAULT_ENTRY_NAME$1) {
		return this.instances.has(identifier);
	}
	getOptions(identifier = DEFAULT_ENTRY_NAME$1) {
		return this.instancesOptions.get(identifier) || {};
	}
	initialize(opts = {}) {
		const { options = {} } = opts;
		const normalizedIdentifier = this.normalizeInstanceIdentifier(opts.instanceIdentifier);
		if (this.isInitialized(normalizedIdentifier)) throw Error(`${this.name}(${normalizedIdentifier}) has already been initialized`);
		if (!this.isComponentSet()) throw Error(`Component ${this.name} has not been registered yet`);
		const instance = this.getOrInitializeService({
			instanceIdentifier: normalizedIdentifier,
			options
		});
		for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) if (normalizedIdentifier === this.normalizeInstanceIdentifier(instanceIdentifier)) instanceDeferred.resolve(instance);
		return instance;
	}
	onInit(callback, identifier) {
		var _a;
		const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
		const existingCallbacks = (_a = this.onInitCallbacks.get(normalizedIdentifier)) !== null && _a !== void 0 ? _a : /* @__PURE__ */ new Set();
		existingCallbacks.add(callback);
		this.onInitCallbacks.set(normalizedIdentifier, existingCallbacks);
		const existingInstance = this.instances.get(normalizedIdentifier);
		if (existingInstance) callback(existingInstance, normalizedIdentifier);
		return () => {
			existingCallbacks.delete(callback);
		};
	}
	invokeOnInitCallbacks(instance, identifier) {
		const callbacks = this.onInitCallbacks.get(identifier);
		if (!callbacks) return;
		for (const callback of callbacks) try {
			callback(instance, identifier);
		} catch (_a) {}
	}
	getOrInitializeService({ instanceIdentifier, options = {} }) {
		let instance = this.instances.get(instanceIdentifier);
		if (!instance && this.component) {
			instance = this.component.instanceFactory(this.container, {
				instanceIdentifier: normalizeIdentifierForFactory(instanceIdentifier),
				options
			});
			this.instances.set(instanceIdentifier, instance);
			this.instancesOptions.set(instanceIdentifier, options);
			this.invokeOnInitCallbacks(instance, instanceIdentifier);
			if (this.component.onInstanceCreated) try {
				this.component.onInstanceCreated(this.container, instanceIdentifier, instance);
			} catch (_a) {}
		}
		return instance || null;
	}
	normalizeInstanceIdentifier(identifier = DEFAULT_ENTRY_NAME$1) {
		if (this.component) return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME$1;
		else return identifier;
	}
	shouldAutoInitialize() {
		return !!this.component && this.component.instantiationMode !== "EXPLICIT";
	}
};
function normalizeIdentifierForFactory(identifier) {
	return identifier === DEFAULT_ENTRY_NAME$1 ? void 0 : identifier;
}
function isComponentEager(component) {
	return component.instantiationMode === "EAGER";
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var ComponentContainer = class {
	constructor(name) {
		this.name = name;
		this.providers = /* @__PURE__ */ new Map();
	}
	addComponent(component) {
		const provider = this.getProvider(component.name);
		if (provider.isComponentSet()) throw new Error(`Component ${component.name} has already been registered with ${this.name}`);
		provider.setComponent(component);
	}
	addOrOverwriteComponent(component) {
		if (this.getProvider(component.name).isComponentSet()) this.providers.delete(component.name);
		this.addComponent(component);
	}
	getProvider(name) {
		if (this.providers.has(name)) return this.providers.get(name);
		const provider = new Provider(name, this);
		this.providers.set(name, provider);
		return provider;
	}
	getProviders() {
		return Array.from(this.providers.values());
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var instances = [];
var LogLevel;
(function(LogLevel) {
	LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
	LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
	LogLevel[LogLevel["INFO"] = 2] = "INFO";
	LogLevel[LogLevel["WARN"] = 3] = "WARN";
	LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
	LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
})(LogLevel || (LogLevel = {}));
var levelStringToEnum = {
	"debug": LogLevel.DEBUG,
	"verbose": LogLevel.VERBOSE,
	"info": LogLevel.INFO,
	"warn": LogLevel.WARN,
	"error": LogLevel.ERROR,
	"silent": LogLevel.SILENT
};
var defaultLogLevel = LogLevel.INFO;
var ConsoleMethod = {
	[LogLevel.DEBUG]: "log",
	[LogLevel.VERBOSE]: "log",
	[LogLevel.INFO]: "info",
	[LogLevel.WARN]: "warn",
	[LogLevel.ERROR]: "error"
};
var defaultLogHandler = (instance, logType, ...args) => {
	if (logType < instance.logLevel) return;
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const method = ConsoleMethod[logType];
	if (method) console[method](`[${now}]  ${instance.name}:`, ...args);
	else throw new Error(`Attempted to log a message with an invalid logType (value: ${logType})`);
};
var Logger = class {
	constructor(name) {
		this.name = name;
		this._logLevel = defaultLogLevel;
		this._logHandler = defaultLogHandler;
		this._userLogHandler = null;
		instances.push(this);
	}
	get logLevel() {
		return this._logLevel;
	}
	set logLevel(val) {
		if (!(val in LogLevel)) throw new TypeError(`Invalid value "${val}" assigned to \`logLevel\``);
		this._logLevel = val;
	}
	setLogLevel(val) {
		this._logLevel = typeof val === "string" ? levelStringToEnum[val] : val;
	}
	get logHandler() {
		return this._logHandler;
	}
	set logHandler(val) {
		if (typeof val !== "function") throw new TypeError("Value assigned to `logHandler` must be a function");
		this._logHandler = val;
	}
	get userLogHandler() {
		return this._userLogHandler;
	}
	set userLogHandler(val) {
		this._userLogHandler = val;
	}
	debug(...args) {
		this._userLogHandler && this._userLogHandler(this, LogLevel.DEBUG, ...args);
		this._logHandler(this, LogLevel.DEBUG, ...args);
	}
	log(...args) {
		this._userLogHandler && this._userLogHandler(this, LogLevel.VERBOSE, ...args);
		this._logHandler(this, LogLevel.VERBOSE, ...args);
	}
	info(...args) {
		this._userLogHandler && this._userLogHandler(this, LogLevel.INFO, ...args);
		this._logHandler(this, LogLevel.INFO, ...args);
	}
	warn(...args) {
		this._userLogHandler && this._userLogHandler(this, LogLevel.WARN, ...args);
		this._logHandler(this, LogLevel.WARN, ...args);
	}
	error(...args) {
		this._userLogHandler && this._userLogHandler(this, LogLevel.ERROR, ...args);
		this._logHandler(this, LogLevel.ERROR, ...args);
	}
};
var instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);
var idbProxyableTypes;
var cursorAdvanceMethods;
function getIdbProxyableTypes() {
	return idbProxyableTypes || (idbProxyableTypes = [
		IDBDatabase,
		IDBObjectStore,
		IDBIndex,
		IDBCursor,
		IDBTransaction
	]);
}
function getCursorAdvanceMethods() {
	return cursorAdvanceMethods || (cursorAdvanceMethods = [
		IDBCursor.prototype.advance,
		IDBCursor.prototype.continue,
		IDBCursor.prototype.continuePrimaryKey
	]);
}
var cursorRequestMap = /* @__PURE__ */ new WeakMap();
var transactionDoneMap = /* @__PURE__ */ new WeakMap();
var transactionStoreNamesMap = /* @__PURE__ */ new WeakMap();
var transformCache = /* @__PURE__ */ new WeakMap();
var reverseTransformCache = /* @__PURE__ */ new WeakMap();
function promisifyRequest(request) {
	const promise = new Promise((resolve, reject) => {
		const unlisten = () => {
			request.removeEventListener("success", success);
			request.removeEventListener("error", error);
		};
		const success = () => {
			resolve(wrap(request.result));
			unlisten();
		};
		const error = () => {
			reject(request.error);
			unlisten();
		};
		request.addEventListener("success", success);
		request.addEventListener("error", error);
	});
	promise.then((value) => {
		if (value instanceof IDBCursor) cursorRequestMap.set(value, request);
	}).catch(() => {});
	reverseTransformCache.set(promise, request);
	return promise;
}
function cacheDonePromiseForTransaction(tx) {
	if (transactionDoneMap.has(tx)) return;
	const done = new Promise((resolve, reject) => {
		const unlisten = () => {
			tx.removeEventListener("complete", complete);
			tx.removeEventListener("error", error);
			tx.removeEventListener("abort", error);
		};
		const complete = () => {
			resolve();
			unlisten();
		};
		const error = () => {
			reject(tx.error || new DOMException("AbortError", "AbortError"));
			unlisten();
		};
		tx.addEventListener("complete", complete);
		tx.addEventListener("error", error);
		tx.addEventListener("abort", error);
	});
	transactionDoneMap.set(tx, done);
}
var idbProxyTraps = {
	get(target, prop, receiver) {
		if (target instanceof IDBTransaction) {
			if (prop === "done") return transactionDoneMap.get(target);
			if (prop === "objectStoreNames") return target.objectStoreNames || transactionStoreNamesMap.get(target);
			if (prop === "store") return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
		}
		return wrap(target[prop]);
	},
	set(target, prop, value) {
		target[prop] = value;
		return true;
	},
	has(target, prop) {
		if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) return true;
		return prop in target;
	}
};
function replaceTraps(callback) {
	idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
	if (func === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype)) return function(storeNames, ...args) {
		const tx = func.call(unwrap(this), storeNames, ...args);
		transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
		return wrap(tx);
	};
	if (getCursorAdvanceMethods().includes(func)) return function(...args) {
		func.apply(unwrap(this), args);
		return wrap(cursorRequestMap.get(this));
	};
	return function(...args) {
		return wrap(func.apply(unwrap(this), args));
	};
}
function transformCachableValue(value) {
	if (typeof value === "function") return wrapFunction(value);
	if (value instanceof IDBTransaction) cacheDonePromiseForTransaction(value);
	if (instanceOfAny(value, getIdbProxyableTypes())) return new Proxy(value, idbProxyTraps);
	return value;
}
function wrap(value) {
	if (value instanceof IDBRequest) return promisifyRequest(value);
	if (transformCache.has(value)) return transformCache.get(value);
	const newValue = transformCachableValue(value);
	if (newValue !== value) {
		transformCache.set(value, newValue);
		reverseTransformCache.set(newValue, value);
	}
	return newValue;
}
var unwrap = (value) => reverseTransformCache.get(value);
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
	const request = indexedDB.open(name, version);
	const openPromise = wrap(request);
	if (upgrade) request.addEventListener("upgradeneeded", (event) => {
		upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
	});
	if (blocked) request.addEventListener("blocked", (event) => blocked(event.oldVersion, event.newVersion, event));
	openPromise.then((db) => {
		if (terminated) db.addEventListener("close", () => terminated());
		if (blocking) db.addEventListener("versionchange", (event) => blocking(event.oldVersion, event.newVersion, event));
	}).catch(() => {});
	return openPromise;
}
var readMethods = [
	"get",
	"getKey",
	"getAll",
	"getAllKeys",
	"count"
];
var writeMethods = [
	"put",
	"add",
	"delete",
	"clear"
];
var cachedMethods = /* @__PURE__ */ new Map();
function getMethod(target, prop) {
	if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) return;
	if (cachedMethods.get(prop)) return cachedMethods.get(prop);
	const targetFuncName = prop.replace(/FromIndex$/, "");
	const useIndex = prop !== targetFuncName;
	const isWrite = writeMethods.includes(targetFuncName);
	if (!(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) return;
	const method = async function(storeName, ...args) {
		const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
		let target = tx.store;
		if (useIndex) target = target.index(args.shift());
		return (await Promise.all([target[targetFuncName](...args), isWrite && tx.done]))[0];
	};
	cachedMethods.set(prop, method);
	return method;
}
replaceTraps((oldTraps) => ({
	...oldTraps,
	get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
	has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var PlatformLoggerServiceImpl = class {
	constructor(container) {
		this.container = container;
	}
	getPlatformInfoString() {
		return this.container.getProviders().map((provider) => {
			if (isVersionServiceProvider(provider)) {
				const service = provider.getImmediate();
				return `${service.library}/${service.version}`;
			} else return null;
		}).filter((logString) => logString).join(" ");
	}
};
function isVersionServiceProvider(provider) {
	const component = provider.getComponent();
	return (component === null || component === void 0 ? void 0 : component.type) === "VERSION";
}
var name$q = "@firebase/app";
var version$1$1 = "0.13.2";
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var logger$2 = new Logger("@firebase/app");
var name$p = "@firebase/app-compat";
var name$o = "@firebase/analytics-compat";
var name$n = "@firebase/analytics";
var name$m = "@firebase/app-check-compat";
var name$l = "@firebase/app-check";
var name$k = "@firebase/auth";
var name$j = "@firebase/auth-compat";
var name$i = "@firebase/database";
var name$h = "@firebase/data-connect";
var name$g = "@firebase/database-compat";
var name$f = "@firebase/functions";
var name$e = "@firebase/functions-compat";
var name$d = "@firebase/installations";
var name$c = "@firebase/installations-compat";
var name$b = "@firebase/messaging";
var name$a = "@firebase/messaging-compat";
var name$9 = "@firebase/performance";
var name$8 = "@firebase/performance-compat";
var name$7 = "@firebase/remote-config";
var name$6 = "@firebase/remote-config-compat";
var name$5 = "@firebase/storage";
var name$4 = "@firebase/storage-compat";
var name$3$1 = "@firebase/firestore";
var name$2$1 = "@firebase/ai";
var name$1$1 = "@firebase/firestore-compat";
var name$10 = "firebase";
var version$4 = "11.10.0";
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var DEFAULT_ENTRY_NAME = "[DEFAULT]";
var PLATFORM_LOG_STRING = {
	[name$q]: "fire-core",
	[name$p]: "fire-core-compat",
	[name$n]: "fire-analytics",
	[name$o]: "fire-analytics-compat",
	[name$l]: "fire-app-check",
	[name$m]: "fire-app-check-compat",
	[name$k]: "fire-auth",
	[name$j]: "fire-auth-compat",
	[name$i]: "fire-rtdb",
	[name$h]: "fire-data-connect",
	[name$g]: "fire-rtdb-compat",
	[name$f]: "fire-fn",
	[name$e]: "fire-fn-compat",
	[name$d]: "fire-iid",
	[name$c]: "fire-iid-compat",
	[name$b]: "fire-fcm",
	[name$a]: "fire-fcm-compat",
	[name$9]: "fire-perf",
	[name$8]: "fire-perf-compat",
	[name$7]: "fire-rc",
	[name$6]: "fire-rc-compat",
	[name$5]: "fire-gcs",
	[name$4]: "fire-gcs-compat",
	[name$3$1]: "fire-fst",
	[name$1$1]: "fire-fst-compat",
	[name$2$1]: "fire-vertex",
	"fire-js": "fire-js",
	[name$10]: "fire-js-all"
};
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var _apps = /* @__PURE__ */ new Map();
var _serverApps = /* @__PURE__ */ new Map();
var _components = /* @__PURE__ */ new Map();
function _addComponent(app, component) {
	try {
		app.container.addComponent(component);
	} catch (e) {
		logger$2.debug(`Component ${component.name} failed to register with FirebaseApp ${app.name}`, e);
	}
}
function _registerComponent(component) {
	const componentName = component.name;
	if (_components.has(componentName)) {
		logger$2.debug(`There were multiple attempts to register component ${componentName}.`);
		return false;
	}
	_components.set(componentName, component);
	for (const app of _apps.values()) _addComponent(app, component);
	for (const serverApp of _serverApps.values()) _addComponent(serverApp, component);
	return true;
}
function _getProvider(app, name) {
	const heartbeatController = app.container.getProvider("heartbeat").getImmediate({ optional: true });
	if (heartbeatController) heartbeatController.triggerHeartbeat();
	return app.container.getProvider(name);
}
function _isFirebaseServerApp(obj) {
	if (obj === null || obj === void 0) return false;
	return obj.settings !== void 0;
}
var ERROR_FACTORY$1 = new ErrorFactory("app", "Firebase", {
	["no-app"]: "No Firebase App '{$appName}' has been created - call initializeApp() first",
	["bad-app-name"]: "Illegal App name: '{$appName}'",
	["duplicate-app"]: "Firebase App named '{$appName}' already exists with different options or config",
	["app-deleted"]: "Firebase App named '{$appName}' already deleted",
	["server-app-deleted"]: "Firebase Server App has been deleted",
	["no-options"]: "Need to provide options, when not being deployed to hosting via source.",
	["invalid-app-argument"]: "firebase.{$appName}() takes either no argument or a Firebase App instance.",
	["invalid-log-argument"]: "First argument to `onLog` must be null or a function.",
	["idb-open"]: "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
	["idb-get"]: "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
	["idb-set"]: "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
	["idb-delete"]: "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
	["finalization-registry-not-supported"]: "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
	["invalid-server-app-environment"]: "FirebaseServerApp is not for use in browser environments."
});
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var FirebaseAppImpl = class {
	constructor(options, config, container) {
		this._isDeleted = false;
		this._options = Object.assign({}, options);
		this._config = Object.assign({}, config);
		this._name = config.name;
		this._automaticDataCollectionEnabled = config.automaticDataCollectionEnabled;
		this._container = container;
		this.container.addComponent(new Component("app", () => this, "PUBLIC"));
	}
	get automaticDataCollectionEnabled() {
		this.checkDestroyed();
		return this._automaticDataCollectionEnabled;
	}
	set automaticDataCollectionEnabled(val) {
		this.checkDestroyed();
		this._automaticDataCollectionEnabled = val;
	}
	get name() {
		this.checkDestroyed();
		return this._name;
	}
	get options() {
		this.checkDestroyed();
		return this._options;
	}
	get config() {
		this.checkDestroyed();
		return this._config;
	}
	get container() {
		return this._container;
	}
	get isDeleted() {
		return this._isDeleted;
	}
	set isDeleted(val) {
		this._isDeleted = val;
	}
	checkDestroyed() {
		if (this.isDeleted) throw ERROR_FACTORY$1.create("app-deleted", { appName: this._name });
	}
};
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var SDK_VERSION$1 = version$4;
function initializeApp(_options, rawConfig = {}) {
	let options = _options;
	if (typeof rawConfig !== "object") rawConfig = { name: rawConfig };
	const config = Object.assign({
		name: DEFAULT_ENTRY_NAME,
		automaticDataCollectionEnabled: true
	}, rawConfig);
	const name = config.name;
	if (typeof name !== "string" || !name) throw ERROR_FACTORY$1.create("bad-app-name", { appName: String(name) });
	options || (options = getDefaultAppConfig());
	if (!options) throw ERROR_FACTORY$1.create("no-options");
	const existingApp = _apps.get(name);
	if (existingApp) if (deepEqual(options, existingApp.options) && deepEqual(config, existingApp.config)) return existingApp;
	else throw ERROR_FACTORY$1.create("duplicate-app", { appName: name });
	const container = new ComponentContainer(name);
	for (const component of _components.values()) container.addComponent(component);
	const newApp = new FirebaseAppImpl(options, config, container);
	_apps.set(name, newApp);
	return newApp;
}
function getApp(name = DEFAULT_ENTRY_NAME) {
	const app = _apps.get(name);
	if (!app && name === "[DEFAULT]" && getDefaultAppConfig()) return initializeApp();
	if (!app) throw ERROR_FACTORY$1.create("no-app", { appName: name });
	return app;
}
function registerVersion(libraryKeyOrName, version, variant) {
	var _a;
	let library = (_a = PLATFORM_LOG_STRING[libraryKeyOrName]) !== null && _a !== void 0 ? _a : libraryKeyOrName;
	if (variant) library += `-${variant}`;
	const libraryMismatch = library.match(/\s|\//);
	const versionMismatch = version.match(/\s|\//);
	if (libraryMismatch || versionMismatch) {
		const warning = [`Unable to register library "${library}" with version "${version}":`];
		if (libraryMismatch) warning.push(`library name "${library}" contains illegal characters (whitespace or "/")`);
		if (libraryMismatch && versionMismatch) warning.push("and");
		if (versionMismatch) warning.push(`version name "${version}" contains illegal characters (whitespace or "/")`);
		logger$2.warn(warning.join(" "));
		return;
	}
	_registerComponent(new Component(`${library}-version`, () => ({
		library,
		version
	}), "VERSION"));
}
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var DB_NAME$2 = "firebase-heartbeat-database";
var DB_VERSION$2 = 1;
var STORE_NAME$1 = "firebase-heartbeat-store";
var dbPromise$1 = null;
function getDbPromise() {
	if (!dbPromise$1) dbPromise$1 = openDB(DB_NAME$2, DB_VERSION$2, { upgrade: (db, oldVersion) => {
		switch (oldVersion) {
			case 0: try {
				db.createObjectStore(STORE_NAME$1);
			} catch (e) {
				console.warn(e);
			}
		}
	} }).catch((e) => {
		throw ERROR_FACTORY$1.create("idb-open", { originalErrorMessage: e.message });
	});
	return dbPromise$1;
}
async function readHeartbeatsFromIndexedDB(app) {
	try {
		const tx = (await getDbPromise()).transaction(STORE_NAME$1);
		const result = await tx.objectStore(STORE_NAME$1).get(computeKey$1(app));
		await tx.done;
		return result;
	} catch (e) {
		if (e instanceof FirebaseError) logger$2.warn(e.message);
		else {
			const idbGetError = ERROR_FACTORY$1.create("idb-get", { originalErrorMessage: e === null || e === void 0 ? void 0 : e.message });
			logger$2.warn(idbGetError.message);
		}
	}
}
async function writeHeartbeatsToIndexedDB(app, heartbeatObject) {
	try {
		const tx = (await getDbPromise()).transaction(STORE_NAME$1, "readwrite");
		await tx.objectStore(STORE_NAME$1).put(heartbeatObject, computeKey$1(app));
		await tx.done;
	} catch (e) {
		if (e instanceof FirebaseError) logger$2.warn(e.message);
		else {
			const idbGetError = ERROR_FACTORY$1.create("idb-set", { originalErrorMessage: e === null || e === void 0 ? void 0 : e.message });
			logger$2.warn(idbGetError.message);
		}
	}
}
function computeKey$1(app) {
	return `${app.name}!${app.options.appId}`;
}
__name(computeKey$1, "computeKey");
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var MAX_HEADER_BYTES = 1024;
var MAX_NUM_STORED_HEARTBEATS = 30;
var HeartbeatServiceImpl = class {
	constructor(container) {
		this.container = container;
		this._heartbeatsCache = null;
		this._storage = new HeartbeatStorageImpl(this.container.getProvider("app").getImmediate());
		this._heartbeatsCachePromise = this._storage.read().then((result) => {
			this._heartbeatsCache = result;
			return result;
		});
	}
	async triggerHeartbeat() {
		var _a;
		var _b;
		try {
			const agent = this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString();
			const date = getUTCDateString();
			if (((_a = this._heartbeatsCache) === null || _a === void 0 ? void 0 : _a.heartbeats) == null) {
				this._heartbeatsCache = await this._heartbeatsCachePromise;
				if (((_b = this._heartbeatsCache) === null || _b === void 0 ? void 0 : _b.heartbeats) == null) return;
			}
			if (this._heartbeatsCache.lastSentHeartbeatDate === date || this._heartbeatsCache.heartbeats.some((singleDateHeartbeat) => singleDateHeartbeat.date === date)) return;
			else {
				this._heartbeatsCache.heartbeats.push({
					date,
					agent
				});
				if (this._heartbeatsCache.heartbeats.length > MAX_NUM_STORED_HEARTBEATS) {
					const earliestHeartbeatIdx = getEarliestHeartbeatIdx(this._heartbeatsCache.heartbeats);
					this._heartbeatsCache.heartbeats.splice(earliestHeartbeatIdx, 1);
				}
			}
			return this._storage.overwrite(this._heartbeatsCache);
		} catch (e) {
			logger$2.warn(e);
		}
	}
	async getHeartbeatsHeader() {
		var _a;
		try {
			if (this._heartbeatsCache === null) await this._heartbeatsCachePromise;
			if (((_a = this._heartbeatsCache) === null || _a === void 0 ? void 0 : _a.heartbeats) == null || this._heartbeatsCache.heartbeats.length === 0) return "";
			const date = getUTCDateString();
			const { heartbeatsToSend, unsentEntries } = extractHeartbeatsForHeader(this._heartbeatsCache.heartbeats);
			const headerString = base64urlEncodeWithoutPadding(JSON.stringify({
				version: 2,
				heartbeats: heartbeatsToSend
			}));
			this._heartbeatsCache.lastSentHeartbeatDate = date;
			if (unsentEntries.length > 0) {
				this._heartbeatsCache.heartbeats = unsentEntries;
				await this._storage.overwrite(this._heartbeatsCache);
			} else {
				this._heartbeatsCache.heartbeats = [];
				this._storage.overwrite(this._heartbeatsCache);
			}
			return headerString;
		} catch (e) {
			logger$2.warn(e);
			return "";
		}
	}
};
function getUTCDateString() {
	return (/* @__PURE__ */ new Date()).toISOString().substring(0, 10);
}
function extractHeartbeatsForHeader(heartbeatsCache, maxSize = MAX_HEADER_BYTES) {
	const heartbeatsToSend = [];
	let unsentEntries = heartbeatsCache.slice();
	for (const singleDateHeartbeat of heartbeatsCache) {
		const heartbeatEntry = heartbeatsToSend.find((hb) => hb.agent === singleDateHeartbeat.agent);
		if (!heartbeatEntry) {
			heartbeatsToSend.push({
				agent: singleDateHeartbeat.agent,
				dates: [singleDateHeartbeat.date]
			});
			if (countBytes(heartbeatsToSend) > maxSize) {
				heartbeatsToSend.pop();
				break;
			}
		} else {
			heartbeatEntry.dates.push(singleDateHeartbeat.date);
			if (countBytes(heartbeatsToSend) > maxSize) {
				heartbeatEntry.dates.pop();
				break;
			}
		}
		unsentEntries = unsentEntries.slice(1);
	}
	return {
		heartbeatsToSend,
		unsentEntries
	};
}
var HeartbeatStorageImpl = class {
	constructor(app) {
		this.app = app;
		this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
	}
	async runIndexedDBEnvironmentCheck() {
		if (!isIndexedDBAvailable()) return false;
		else return validateIndexedDBOpenable().then(() => true).catch(() => false);
	}
	async read() {
		if (!await this._canUseIndexedDBPromise) return { heartbeats: [] };
		else {
			const idbHeartbeatObject = await readHeartbeatsFromIndexedDB(this.app);
			if (idbHeartbeatObject === null || idbHeartbeatObject === void 0 ? void 0 : idbHeartbeatObject.heartbeats) return idbHeartbeatObject;
			else return { heartbeats: [] };
		}
	}
	async overwrite(heartbeatsObject) {
		var _a;
		if (!await this._canUseIndexedDBPromise) return;
		else {
			const existingHeartbeatsObject = await this.read();
			return writeHeartbeatsToIndexedDB(this.app, {
				lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
				heartbeats: heartbeatsObject.heartbeats
			});
		}
	}
	async add(heartbeatsObject) {
		var _a;
		if (!await this._canUseIndexedDBPromise) return;
		else {
			const existingHeartbeatsObject = await this.read();
			return writeHeartbeatsToIndexedDB(this.app, {
				lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
				heartbeats: [...existingHeartbeatsObject.heartbeats, ...heartbeatsObject.heartbeats]
			});
		}
	}
};
function countBytes(heartbeatsCache) {
	return base64urlEncodeWithoutPadding(JSON.stringify({
		version: 2,
		heartbeats: heartbeatsCache
	})).length;
}
function getEarliestHeartbeatIdx(heartbeats) {
	if (heartbeats.length === 0) return -1;
	let earliestHeartbeatIdx = 0;
	let earliestHeartbeatDate = heartbeats[0].date;
	for (let i = 1; i < heartbeats.length; i++) if (heartbeats[i].date < earliestHeartbeatDate) {
		earliestHeartbeatDate = heartbeats[i].date;
		earliestHeartbeatIdx = i;
	}
	return earliestHeartbeatIdx;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function registerCoreComponents(variant) {
	_registerComponent(new Component("platform-logger", (container) => new PlatformLoggerServiceImpl(container), "PRIVATE"));
	_registerComponent(new Component("heartbeat", (container) => new HeartbeatServiceImpl(container), "PRIVATE"));
	registerVersion(name$q, version$1$1, variant);
	registerVersion(name$q, version$1$1, "esm2017");
	registerVersion("fire-js", "");
}
registerCoreComponents("");
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
registerVersion("firebase", "11.10.0", "app");
function __rest(s, e) {
	var t = {};
	for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	if (s != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
	}
	return t;
}
function _prodErrorMap() {
	return { ["dependent-sdk-initialized-before-auth"]: "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK." };
}
var prodErrorMap = _prodErrorMap;
var _DEFAULT_AUTH_ERROR_FACTORY = new ErrorFactory("auth", "Firebase", _prodErrorMap());
var AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY = {
	ADMIN_ONLY_OPERATION: "auth/admin-restricted-operation",
	ARGUMENT_ERROR: "auth/argument-error",
	APP_NOT_AUTHORIZED: "auth/app-not-authorized",
	APP_NOT_INSTALLED: "auth/app-not-installed",
	CAPTCHA_CHECK_FAILED: "auth/captcha-check-failed",
	CODE_EXPIRED: "auth/code-expired",
	CORDOVA_NOT_READY: "auth/cordova-not-ready",
	CORS_UNSUPPORTED: "auth/cors-unsupported",
	CREDENTIAL_ALREADY_IN_USE: "auth/credential-already-in-use",
	CREDENTIAL_MISMATCH: "auth/custom-token-mismatch",
	CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "auth/requires-recent-login",
	DEPENDENT_SDK_INIT_BEFORE_AUTH: "auth/dependent-sdk-initialized-before-auth",
	DYNAMIC_LINK_NOT_ACTIVATED: "auth/dynamic-link-not-activated",
	EMAIL_CHANGE_NEEDS_VERIFICATION: "auth/email-change-needs-verification",
	EMAIL_EXISTS: "auth/email-already-in-use",
	EMULATOR_CONFIG_FAILED: "auth/emulator-config-failed",
	EXPIRED_OOB_CODE: "auth/expired-action-code",
	EXPIRED_POPUP_REQUEST: "auth/cancelled-popup-request",
	INTERNAL_ERROR: "auth/internal-error",
	INVALID_API_KEY: "auth/invalid-api-key",
	INVALID_APP_CREDENTIAL: "auth/invalid-app-credential",
	INVALID_APP_ID: "auth/invalid-app-id",
	INVALID_AUTH: "auth/invalid-user-token",
	INVALID_AUTH_EVENT: "auth/invalid-auth-event",
	INVALID_CERT_HASH: "auth/invalid-cert-hash",
	INVALID_CODE: "auth/invalid-verification-code",
	INVALID_CONTINUE_URI: "auth/invalid-continue-uri",
	INVALID_CORDOVA_CONFIGURATION: "auth/invalid-cordova-configuration",
	INVALID_CUSTOM_TOKEN: "auth/invalid-custom-token",
	INVALID_DYNAMIC_LINK_DOMAIN: "auth/invalid-dynamic-link-domain",
	INVALID_EMAIL: "auth/invalid-email",
	INVALID_EMULATOR_SCHEME: "auth/invalid-emulator-scheme",
	INVALID_IDP_RESPONSE: "auth/invalid-credential",
	INVALID_LOGIN_CREDENTIALS: "auth/invalid-credential",
	INVALID_MESSAGE_PAYLOAD: "auth/invalid-message-payload",
	INVALID_MFA_SESSION: "auth/invalid-multi-factor-session",
	INVALID_OAUTH_CLIENT_ID: "auth/invalid-oauth-client-id",
	INVALID_OAUTH_PROVIDER: "auth/invalid-oauth-provider",
	INVALID_OOB_CODE: "auth/invalid-action-code",
	INVALID_ORIGIN: "auth/unauthorized-domain",
	INVALID_PASSWORD: "auth/wrong-password",
	INVALID_PERSISTENCE: "auth/invalid-persistence-type",
	INVALID_PHONE_NUMBER: "auth/invalid-phone-number",
	INVALID_PROVIDER_ID: "auth/invalid-provider-id",
	INVALID_RECIPIENT_EMAIL: "auth/invalid-recipient-email",
	INVALID_SENDER: "auth/invalid-sender",
	INVALID_SESSION_INFO: "auth/invalid-verification-id",
	INVALID_TENANT_ID: "auth/invalid-tenant-id",
	MFA_INFO_NOT_FOUND: "auth/multi-factor-info-not-found",
	MFA_REQUIRED: "auth/multi-factor-auth-required",
	MISSING_ANDROID_PACKAGE_NAME: "auth/missing-android-pkg-name",
	MISSING_APP_CREDENTIAL: "auth/missing-app-credential",
	MISSING_AUTH_DOMAIN: "auth/auth-domain-config-required",
	MISSING_CODE: "auth/missing-verification-code",
	MISSING_CONTINUE_URI: "auth/missing-continue-uri",
	MISSING_IFRAME_START: "auth/missing-iframe-start",
	MISSING_IOS_BUNDLE_ID: "auth/missing-ios-bundle-id",
	MISSING_OR_INVALID_NONCE: "auth/missing-or-invalid-nonce",
	MISSING_MFA_INFO: "auth/missing-multi-factor-info",
	MISSING_MFA_SESSION: "auth/missing-multi-factor-session",
	MISSING_PHONE_NUMBER: "auth/missing-phone-number",
	MISSING_SESSION_INFO: "auth/missing-verification-id",
	MODULE_DESTROYED: "auth/app-deleted",
	NEED_CONFIRMATION: "auth/account-exists-with-different-credential",
	NETWORK_REQUEST_FAILED: "auth/network-request-failed",
	NULL_USER: "auth/null-user",
	NO_AUTH_EVENT: "auth/no-auth-event",
	NO_SUCH_PROVIDER: "auth/no-such-provider",
	OPERATION_NOT_ALLOWED: "auth/operation-not-allowed",
	OPERATION_NOT_SUPPORTED: "auth/operation-not-supported-in-this-environment",
	POPUP_BLOCKED: "auth/popup-blocked",
	POPUP_CLOSED_BY_USER: "auth/popup-closed-by-user",
	PROVIDER_ALREADY_LINKED: "auth/provider-already-linked",
	QUOTA_EXCEEDED: "auth/quota-exceeded",
	REDIRECT_CANCELLED_BY_USER: "auth/redirect-cancelled-by-user",
	REDIRECT_OPERATION_PENDING: "auth/redirect-operation-pending",
	REJECTED_CREDENTIAL: "auth/rejected-credential",
	SECOND_FACTOR_ALREADY_ENROLLED: "auth/second-factor-already-in-use",
	SECOND_FACTOR_LIMIT_EXCEEDED: "auth/maximum-second-factor-count-exceeded",
	TENANT_ID_MISMATCH: "auth/tenant-id-mismatch",
	TIMEOUT: "auth/timeout",
	TOKEN_EXPIRED: "auth/user-token-expired",
	TOO_MANY_ATTEMPTS_TRY_LATER: "auth/too-many-requests",
	UNAUTHORIZED_DOMAIN: "auth/unauthorized-continue-uri",
	UNSUPPORTED_FIRST_FACTOR: "auth/unsupported-first-factor",
	UNSUPPORTED_PERSISTENCE: "auth/unsupported-persistence-type",
	UNSUPPORTED_TENANT_OPERATION: "auth/unsupported-tenant-operation",
	UNVERIFIED_EMAIL: "auth/unverified-email",
	USER_CANCELLED: "auth/user-cancelled",
	USER_DELETED: "auth/user-not-found",
	USER_DISABLED: "auth/user-disabled",
	USER_MISMATCH: "auth/user-mismatch",
	USER_SIGNED_OUT: "auth/user-signed-out",
	WEAK_PASSWORD: "auth/weak-password",
	WEB_STORAGE_UNSUPPORTED: "auth/web-storage-unsupported",
	ALREADY_INITIALIZED: "auth/already-initialized",
	RECAPTCHA_NOT_ENABLED: "auth/recaptcha-not-enabled",
	MISSING_RECAPTCHA_TOKEN: "auth/missing-recaptcha-token",
	INVALID_RECAPTCHA_TOKEN: "auth/invalid-recaptcha-token",
	INVALID_RECAPTCHA_ACTION: "auth/invalid-recaptcha-action",
	MISSING_CLIENT_TYPE: "auth/missing-client-type",
	MISSING_RECAPTCHA_VERSION: "auth/missing-recaptcha-version",
	INVALID_RECAPTCHA_VERSION: "auth/invalid-recaptcha-version",
	INVALID_REQ_TYPE: "auth/invalid-req-type",
	INVALID_HOSTING_LINK_DOMAIN: "auth/invalid-hosting-link-domain"
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var logClient$1 = new Logger("@firebase/auth");
function _logWarn(msg, ...args) {
	if (logClient$1.logLevel <= LogLevel.WARN) logClient$1.warn(`Auth (${SDK_VERSION$1}): ${msg}`, ...args);
}
function _logError(msg, ...args) {
	if (logClient$1.logLevel <= LogLevel.ERROR) logClient$1.error(`Auth (${SDK_VERSION$1}): ${msg}`, ...args);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _fail(authOrCode, ...rest) {
	throw createErrorInternal(authOrCode, ...rest);
}
function _createError(authOrCode, ...rest) {
	return createErrorInternal(authOrCode, ...rest);
}
function _errorWithCustomMessage(auth, code, message) {
	return new ErrorFactory("auth", "Firebase", Object.assign(Object.assign({}, prodErrorMap()), { [code]: message })).create(code, { appName: auth.name });
}
function _serverAppCurrentUserOperationNotSupportedError(auth) {
	return _errorWithCustomMessage(auth, "operation-not-supported-in-this-environment", "Operations that alter the current user are not supported in conjunction with FirebaseServerApp");
}
function _assertInstanceOf(auth, object, instance) {
	const constructorInstance = instance;
	if (!(object instanceof constructorInstance)) {
		if (constructorInstance.name !== object.constructor.name) _fail(auth, "argument-error");
		throw _errorWithCustomMessage(auth, "argument-error", `Type of ${object.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`);
	}
}
function createErrorInternal(authOrCode, ...rest) {
	if (typeof authOrCode !== "string") {
		const code = rest[0];
		const fullParams = [...rest.slice(1)];
		if (fullParams[0]) fullParams[0].appName = authOrCode.name;
		return authOrCode._errorFactory.create(code, ...fullParams);
	}
	return _DEFAULT_AUTH_ERROR_FACTORY.create(authOrCode, ...rest);
}
function _assert(assertion, authOrCode, ...rest) {
	if (!assertion) throw createErrorInternal(authOrCode, ...rest);
}
function debugFail(failure) {
	const message = `INTERNAL ASSERTION FAILED: ` + failure;
	_logError(message);
	throw new Error(message);
}
function debugAssert(assertion, message) {
	if (!assertion) debugFail(message);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _getCurrentUrl() {
	var _a;
	return typeof self !== "undefined" && ((_a = self.location) === null || _a === void 0 ? void 0 : _a.href) || "";
}
function _isHttpOrHttps() {
	return _getCurrentScheme() === "http:" || _getCurrentScheme() === "https:";
}
function _getCurrentScheme() {
	var _a;
	return typeof self !== "undefined" && ((_a = self.location) === null || _a === void 0 ? void 0 : _a.protocol) || null;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _isOnline() {
	if (typeof navigator !== "undefined" && navigator && "onLine" in navigator && typeof navigator.onLine === "boolean" && (_isHttpOrHttps() || isBrowserExtension() || "connection" in navigator)) return navigator.onLine;
	return true;
}
function _getUserLanguage() {
	if (typeof navigator === "undefined") return null;
	const navigatorLanguage = navigator;
	return navigatorLanguage.languages && navigatorLanguage.languages[0] || navigatorLanguage.language || null;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Delay = class {
	constructor(shortDelay, longDelay) {
		this.shortDelay = shortDelay;
		this.longDelay = longDelay;
		debugAssert(longDelay > shortDelay, "Short delay should be less than long delay!");
		this.isMobile = isMobileCordova() || isReactNative();
	}
	get() {
		if (!_isOnline()) return Math.min(5e3, this.shortDelay);
		return this.isMobile ? this.longDelay : this.shortDelay;
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _emulatorUrl(config, path) {
	debugAssert(config.emulator, "Emulator should always be set here");
	const { url } = config.emulator;
	if (!path) return url;
	return `${url}${path.startsWith("/") ? path.slice(1) : path}`;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var FetchProvider = class {
	static initialize(fetchImpl, headersImpl, responseImpl) {
		this.fetchImpl = fetchImpl;
		if (headersImpl) this.headersImpl = headersImpl;
		if (responseImpl) this.responseImpl = responseImpl;
	}
	static fetch() {
		if (this.fetchImpl) return this.fetchImpl;
		if (typeof self !== "undefined" && "fetch" in self) return self.fetch;
		if (typeof globalThis !== "undefined" && globalThis.fetch) return globalThis.fetch;
		if (typeof fetch !== "undefined") return fetch;
		debugFail("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
	}
	static headers() {
		if (this.headersImpl) return this.headersImpl;
		if (typeof self !== "undefined" && "Headers" in self) return self.Headers;
		if (typeof globalThis !== "undefined" && globalThis.Headers) return globalThis.Headers;
		if (typeof Headers !== "undefined") return Headers;
		debugFail("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
	}
	static response() {
		if (this.responseImpl) return this.responseImpl;
		if (typeof self !== "undefined" && "Response" in self) return self.Response;
		if (typeof globalThis !== "undefined" && globalThis.Response) return globalThis.Response;
		if (typeof Response !== "undefined") return Response;
		debugFail("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var SERVER_ERROR_MAP = {
	["CREDENTIAL_MISMATCH"]: "custom-token-mismatch",
	["MISSING_CUSTOM_TOKEN"]: "internal-error",
	["INVALID_IDENTIFIER"]: "invalid-email",
	["MISSING_CONTINUE_URI"]: "internal-error",
	["INVALID_PASSWORD"]: "wrong-password",
	["MISSING_PASSWORD"]: "missing-password",
	["INVALID_LOGIN_CREDENTIALS"]: "invalid-credential",
	["EMAIL_EXISTS"]: "email-already-in-use",
	["PASSWORD_LOGIN_DISABLED"]: "operation-not-allowed",
	["INVALID_IDP_RESPONSE"]: "invalid-credential",
	["INVALID_PENDING_TOKEN"]: "invalid-credential",
	["FEDERATED_USER_ID_ALREADY_LINKED"]: "credential-already-in-use",
	["MISSING_REQ_TYPE"]: "internal-error",
	["EMAIL_NOT_FOUND"]: "user-not-found",
	["RESET_PASSWORD_EXCEED_LIMIT"]: "too-many-requests",
	["EXPIRED_OOB_CODE"]: "expired-action-code",
	["INVALID_OOB_CODE"]: "invalid-action-code",
	["MISSING_OOB_CODE"]: "internal-error",
	["CREDENTIAL_TOO_OLD_LOGIN_AGAIN"]: "requires-recent-login",
	["INVALID_ID_TOKEN"]: "invalid-user-token",
	["TOKEN_EXPIRED"]: "user-token-expired",
	["USER_NOT_FOUND"]: "user-token-expired",
	["TOO_MANY_ATTEMPTS_TRY_LATER"]: "too-many-requests",
	["PASSWORD_DOES_NOT_MEET_REQUIREMENTS"]: "password-does-not-meet-requirements",
	["INVALID_CODE"]: "invalid-verification-code",
	["INVALID_SESSION_INFO"]: "invalid-verification-id",
	["INVALID_TEMPORARY_PROOF"]: "invalid-credential",
	["MISSING_SESSION_INFO"]: "missing-verification-id",
	["SESSION_EXPIRED"]: "code-expired",
	["MISSING_ANDROID_PACKAGE_NAME"]: "missing-android-pkg-name",
	["UNAUTHORIZED_DOMAIN"]: "unauthorized-continue-uri",
	["INVALID_OAUTH_CLIENT_ID"]: "invalid-oauth-client-id",
	["ADMIN_ONLY_OPERATION"]: "admin-restricted-operation",
	["INVALID_MFA_PENDING_CREDENTIAL"]: "invalid-multi-factor-session",
	["MFA_ENROLLMENT_NOT_FOUND"]: "multi-factor-info-not-found",
	["MISSING_MFA_ENROLLMENT_ID"]: "missing-multi-factor-info",
	["MISSING_MFA_PENDING_CREDENTIAL"]: "missing-multi-factor-session",
	["SECOND_FACTOR_EXISTS"]: "second-factor-already-in-use",
	["SECOND_FACTOR_LIMIT_EXCEEDED"]: "maximum-second-factor-count-exceeded",
	["BLOCKING_FUNCTION_ERROR_RESPONSE"]: "internal-error",
	["RECAPTCHA_NOT_ENABLED"]: "recaptcha-not-enabled",
	["MISSING_RECAPTCHA_TOKEN"]: "missing-recaptcha-token",
	["INVALID_RECAPTCHA_TOKEN"]: "invalid-recaptcha-token",
	["INVALID_RECAPTCHA_ACTION"]: "invalid-recaptcha-action",
	["MISSING_CLIENT_TYPE"]: "missing-client-type",
	["MISSING_RECAPTCHA_VERSION"]: "missing-recaptcha-version",
	["INVALID_RECAPTCHA_VERSION"]: "invalid-recaptcha-version",
	["INVALID_REQ_TYPE"]: "invalid-req-type"
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var CookieAuthProxiedEndpoints = [
	"/v1/accounts:signInWithCustomToken",
	"/v1/accounts:signInWithEmailLink",
	"/v1/accounts:signInWithIdp",
	"/v1/accounts:signInWithPassword",
	"/v1/accounts:signInWithPhoneNumber",
	"/v1/token"
];
var DEFAULT_API_TIMEOUT_MS = new Delay(3e4, 6e4);
function _addTidIfNecessary(auth, request) {
	if (auth.tenantId && !request.tenantId) return Object.assign(Object.assign({}, request), { tenantId: auth.tenantId });
	return request;
}
async function _performApiRequest(auth, method, path, request, customErrorMap = {}) {
	return _performFetchWithErrorHandling(auth, customErrorMap, async () => {
		let body = {};
		let params = {};
		if (request) if (method === "GET") params = request;
		else body = { body: JSON.stringify(request) };
		const query = querystring(Object.assign({ key: auth.config.apiKey }, params)).slice(1);
		const headers = await auth._getAdditionalHeaders();
		headers["Content-Type"] = "application/json";
		if (auth.languageCode) headers["X-Firebase-Locale"] = auth.languageCode;
		const fetchArgs = Object.assign({
			method,
			headers
		}, body);
		if (!isCloudflareWorker()) fetchArgs.referrerPolicy = "no-referrer";
		if (auth.emulatorConfig && isCloudWorkstation(auth.emulatorConfig.host)) fetchArgs.credentials = "include";
		return FetchProvider.fetch()(await _getFinalTarget(auth, auth.config.apiHost, path, query), fetchArgs);
	});
}
async function _performFetchWithErrorHandling(auth, customErrorMap, fetchFn) {
	auth._canInitEmulator = false;
	const errorMap = Object.assign(Object.assign({}, SERVER_ERROR_MAP), customErrorMap);
	try {
		const networkTimeout = new NetworkTimeout(auth);
		const response = await Promise.race([fetchFn(), networkTimeout.promise]);
		networkTimeout.clearNetworkTimeout();
		const json = await response.json();
		if ("needConfirmation" in json) throw _makeTaggedError(auth, "account-exists-with-different-credential", json);
		if (response.ok && !("errorMessage" in json)) return json;
		else {
			const [serverErrorCode, serverErrorMessage] = (response.ok ? json.errorMessage : json.error.message).split(" : ");
			if (serverErrorCode === "FEDERATED_USER_ID_ALREADY_LINKED") throw _makeTaggedError(auth, "credential-already-in-use", json);
			else if (serverErrorCode === "EMAIL_EXISTS") throw _makeTaggedError(auth, "email-already-in-use", json);
			else if (serverErrorCode === "USER_DISABLED") throw _makeTaggedError(auth, "user-disabled", json);
			const authError = errorMap[serverErrorCode] || serverErrorCode.toLowerCase().replace(/[_\s]+/g, "-");
			if (serverErrorMessage) throw _errorWithCustomMessage(auth, authError, serverErrorMessage);
			else _fail(auth, authError);
		}
	} catch (e) {
		if (e instanceof FirebaseError) throw e;
		_fail(auth, "network-request-failed", { "message": String(e) });
	}
}
async function _performSignInRequest(auth, method, path, request, customErrorMap = {}) {
	const serverResponse = await _performApiRequest(auth, method, path, request, customErrorMap);
	if ("mfaPendingCredential" in serverResponse) _fail(auth, "multi-factor-auth-required", { _serverResponse: serverResponse });
	return serverResponse;
}
async function _getFinalTarget(auth, host, path, query) {
	const base = `${host}${path}?${query}`;
	const authInternal = auth;
	const finalTarget = authInternal.config.emulator ? _emulatorUrl(auth.config, base) : `${auth.config.apiScheme}://${base}`;
	if (CookieAuthProxiedEndpoints.includes(path)) {
		await authInternal._persistenceManagerAvailable;
		if (authInternal._getPersistenceType() === "COOKIE") return authInternal._getPersistence()._getFinalTarget(finalTarget).toString();
	}
	return finalTarget;
}
function _parseEnforcementState(enforcementStateStr) {
	switch (enforcementStateStr) {
		case "ENFORCE": return "ENFORCE";
		case "AUDIT": return "AUDIT";
		case "OFF": return "OFF";
		default: return "ENFORCEMENT_STATE_UNSPECIFIED";
	}
}
var NetworkTimeout = class {
	clearNetworkTimeout() {
		clearTimeout(this.timer);
	}
	constructor(auth) {
		this.auth = auth;
		this.timer = null;
		this.promise = new Promise((_, reject) => {
			this.timer = setTimeout(() => {
				return reject(_createError(this.auth, "network-request-failed"));
			}, DEFAULT_API_TIMEOUT_MS.get());
		});
	}
};
function _makeTaggedError(auth, code, response) {
	const errorParams = { appName: auth.name };
	if (response.email) errorParams.email = response.email;
	if (response.phoneNumber) errorParams.phoneNumber = response.phoneNumber;
	const error = _createError(auth, code, errorParams);
	error.customData._tokenResponse = response;
	return error;
}
function isEnterprise(grecaptcha) {
	return grecaptcha !== void 0 && grecaptcha.enterprise !== void 0;
}
var RecaptchaConfig = class {
	constructor(response) {
		this.siteKey = "";
		this.recaptchaEnforcementState = [];
		if (response.recaptchaKey === void 0) throw new Error("recaptchaKey undefined");
		this.siteKey = response.recaptchaKey.split("/")[3];
		this.recaptchaEnforcementState = response.recaptchaEnforcementState;
	}
	getProviderEnforcementState(providerStr) {
		if (!this.recaptchaEnforcementState || this.recaptchaEnforcementState.length === 0) return null;
		for (const recaptchaEnforcementState of this.recaptchaEnforcementState) if (recaptchaEnforcementState.provider && recaptchaEnforcementState.provider === providerStr) return _parseEnforcementState(recaptchaEnforcementState.enforcementState);
		return null;
	}
	isProviderEnabled(providerStr) {
		return this.getProviderEnforcementState(providerStr) === "ENFORCE" || this.getProviderEnforcementState(providerStr) === "AUDIT";
	}
	isAnyProviderEnabled() {
		return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER") || this.isProviderEnabled("PHONE_PROVIDER");
	}
};
async function getRecaptchaConfig(auth, request) {
	return _performApiRequest(auth, "GET", "/v2/recaptchaConfig", _addTidIfNecessary(auth, request));
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function deleteAccount(auth, request) {
	return _performApiRequest(auth, "POST", "/v1/accounts:delete", request);
}
async function getAccountInfo(auth, request) {
	return _performApiRequest(auth, "POST", "/v1/accounts:lookup", request);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function utcTimestampToDateString(utcTimestamp) {
	if (!utcTimestamp) return;
	try {
		const date = new Date(Number(utcTimestamp));
		if (!isNaN(date.getTime())) return date.toUTCString();
	} catch (e) {}
}
async function getIdTokenResult(user, forceRefresh = false) {
	const userInternal = getModularInstance(user);
	const token = await userInternal.getIdToken(forceRefresh);
	const claims = _parseToken(token);
	_assert(claims && claims.exp && claims.auth_time && claims.iat, userInternal.auth, "internal-error");
	const firebase = typeof claims.firebase === "object" ? claims.firebase : void 0;
	const signInProvider = firebase === null || firebase === void 0 ? void 0 : firebase["sign_in_provider"];
	return {
		claims,
		token,
		authTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.auth_time)),
		issuedAtTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.iat)),
		expirationTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.exp)),
		signInProvider: signInProvider || null,
		signInSecondFactor: (firebase === null || firebase === void 0 ? void 0 : firebase["sign_in_second_factor"]) || null
	};
}
function secondsStringToMilliseconds(seconds) {
	return Number(seconds) * 1e3;
}
function _parseToken(token) {
	const [algorithm, payload, signature] = token.split(".");
	if (algorithm === void 0 || payload === void 0 || signature === void 0) {
		_logError("JWT malformed, contained fewer than 3 sections");
		return null;
	}
	try {
		const decoded = base64Decode(payload);
		if (!decoded) {
			_logError("Failed to decode base64 JWT payload");
			return null;
		}
		return JSON.parse(decoded);
	} catch (e) {
		_logError("Caught error parsing JWT payload as JSON", e === null || e === void 0 ? void 0 : e.toString());
		return null;
	}
}
function _tokenExpiresIn(token) {
	const parsedToken = _parseToken(token);
	_assert(parsedToken, "internal-error");
	_assert(typeof parsedToken.exp !== "undefined", "internal-error");
	_assert(typeof parsedToken.iat !== "undefined", "internal-error");
	return Number(parsedToken.exp) - Number(parsedToken.iat);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function _logoutIfInvalidated(user, promise, bypassAuthState = false) {
	if (bypassAuthState) return promise;
	try {
		return await promise;
	} catch (e) {
		if (e instanceof FirebaseError && isUserInvalidated(e)) {
			if (user.auth.currentUser === user) await user.auth.signOut();
		}
		throw e;
	}
}
function isUserInvalidated({ code }) {
	return code === `auth/user-disabled` || code === `auth/user-token-expired`;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var ProactiveRefresh = class {
	constructor(user) {
		this.user = user;
		this.isRunning = false;
		this.timerId = null;
		this.errorBackoff = 3e4;
	}
	_start() {
		if (this.isRunning) return;
		this.isRunning = true;
		this.schedule();
	}
	_stop() {
		if (!this.isRunning) return;
		this.isRunning = false;
		if (this.timerId !== null) clearTimeout(this.timerId);
	}
	getInterval(wasError) {
		var _a;
		if (wasError) {
			const interval = this.errorBackoff;
			this.errorBackoff = Math.min(this.errorBackoff * 2, 96e4);
			return interval;
		} else {
			this.errorBackoff = 3e4;
			const interval = ((_a = this.user.stsTokenManager.expirationTime) !== null && _a !== void 0 ? _a : 0) - Date.now() - 3e5;
			return Math.max(0, interval);
		}
	}
	schedule(wasError = false) {
		if (!this.isRunning) return;
		const interval = this.getInterval(wasError);
		this.timerId = setTimeout(async () => {
			await this.iteration();
		}, interval);
	}
	async iteration() {
		try {
			await this.user.getIdToken(true);
		} catch (e) {
			if ((e === null || e === void 0 ? void 0 : e.code) === `auth/network-request-failed`) this.schedule(true);
			return;
		}
		this.schedule();
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var UserMetadata = class {
	constructor(createdAt, lastLoginAt) {
		this.createdAt = createdAt;
		this.lastLoginAt = lastLoginAt;
		this._initializeTime();
	}
	_initializeTime() {
		this.lastSignInTime = utcTimestampToDateString(this.lastLoginAt);
		this.creationTime = utcTimestampToDateString(this.createdAt);
	}
	_copy(metadata) {
		this.createdAt = metadata.createdAt;
		this.lastLoginAt = metadata.lastLoginAt;
		this._initializeTime();
	}
	toJSON() {
		return {
			createdAt: this.createdAt,
			lastLoginAt: this.lastLoginAt
		};
	}
};
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function _reloadWithoutSaving(user) {
	var _a;
	const auth = user.auth;
	const response = await _logoutIfInvalidated(user, getAccountInfo(auth, { idToken: await user.getIdToken() }));
	_assert(response === null || response === void 0 ? void 0 : response.users.length, auth, "internal-error");
	const coreAccount = response.users[0];
	user._notifyReloadListener(coreAccount);
	const newProviderData = ((_a = coreAccount.providerUserInfo) === null || _a === void 0 ? void 0 : _a.length) ? extractProviderData(coreAccount.providerUserInfo) : [];
	const providerData = mergeProviderData(user.providerData, newProviderData);
	const oldIsAnonymous = user.isAnonymous;
	const newIsAnonymous = !(user.email && coreAccount.passwordHash) && !(providerData === null || providerData === void 0 ? void 0 : providerData.length);
	const isAnonymous = !oldIsAnonymous ? false : newIsAnonymous;
	const updates = {
		uid: coreAccount.localId,
		displayName: coreAccount.displayName || null,
		photoURL: coreAccount.photoUrl || null,
		email: coreAccount.email || null,
		emailVerified: coreAccount.emailVerified || false,
		phoneNumber: coreAccount.phoneNumber || null,
		tenantId: coreAccount.tenantId || null,
		providerData,
		metadata: new UserMetadata(coreAccount.createdAt, coreAccount.lastLoginAt),
		isAnonymous
	};
	Object.assign(user, updates);
}
async function reload(user) {
	const userInternal = getModularInstance(user);
	await _reloadWithoutSaving(userInternal);
	await userInternal.auth._persistUserIfCurrent(userInternal);
	userInternal.auth._notifyListenersIfCurrent(userInternal);
}
function mergeProviderData(original, newData) {
	return [...original.filter((o) => !newData.some((n) => n.providerId === o.providerId)), ...newData];
}
function extractProviderData(providers) {
	return providers.map((_a) => {
		var { providerId } = _a;
		var provider = __rest(_a, ["providerId"]);
		return {
			providerId,
			uid: provider.rawId || "",
			displayName: provider.displayName || null,
			email: provider.email || null,
			phoneNumber: provider.phoneNumber || null,
			photoURL: provider.photoUrl || null
		};
	});
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function requestStsToken(auth, refreshToken) {
	const response = await _performFetchWithErrorHandling(auth, {}, async () => {
		const body = querystring({
			"grant_type": "refresh_token",
			"refresh_token": refreshToken
		}).slice(1);
		const { tokenApiHost, apiKey } = auth.config;
		const url = await _getFinalTarget(auth, tokenApiHost, "/v1/token", `key=${apiKey}`);
		const headers = await auth._getAdditionalHeaders();
		headers["Content-Type"] = "application/x-www-form-urlencoded";
		const options = {
			method: "POST",
			headers,
			body
		};
		if (auth.emulatorConfig && isCloudWorkstation(auth.emulatorConfig.host)) options.credentials = "include";
		return FetchProvider.fetch()(url, options);
	});
	return {
		accessToken: response.access_token,
		expiresIn: response.expires_in,
		refreshToken: response.refresh_token
	};
}
async function revokeToken(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts:revokeToken", _addTidIfNecessary(auth, request));
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var StsTokenManager = class StsTokenManager {
	constructor() {
		this.refreshToken = null;
		this.accessToken = null;
		this.expirationTime = null;
	}
	get isExpired() {
		return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
	}
	updateFromServerResponse(response) {
		_assert(response.idToken, "internal-error");
		_assert(typeof response.idToken !== "undefined", "internal-error");
		_assert(typeof response.refreshToken !== "undefined", "internal-error");
		const expiresIn = "expiresIn" in response && typeof response.expiresIn !== "undefined" ? Number(response.expiresIn) : _tokenExpiresIn(response.idToken);
		this.updateTokensAndExpiration(response.idToken, response.refreshToken, expiresIn);
	}
	updateFromIdToken(idToken) {
		_assert(idToken.length !== 0, "internal-error");
		const expiresIn = _tokenExpiresIn(idToken);
		this.updateTokensAndExpiration(idToken, null, expiresIn);
	}
	async getToken(auth, forceRefresh = false) {
		if (!forceRefresh && this.accessToken && !this.isExpired) return this.accessToken;
		_assert(this.refreshToken, auth, "user-token-expired");
		if (this.refreshToken) {
			await this.refresh(auth, this.refreshToken);
			return this.accessToken;
		}
		return null;
	}
	clearRefreshToken() {
		this.refreshToken = null;
	}
	async refresh(auth, oldToken) {
		const { accessToken, refreshToken, expiresIn } = await requestStsToken(auth, oldToken);
		this.updateTokensAndExpiration(accessToken, refreshToken, Number(expiresIn));
	}
	updateTokensAndExpiration(accessToken, refreshToken, expiresInSec) {
		this.refreshToken = refreshToken || null;
		this.accessToken = accessToken || null;
		this.expirationTime = Date.now() + expiresInSec * 1e3;
	}
	static fromJSON(appName, object) {
		const { refreshToken, accessToken, expirationTime } = object;
		const manager = new StsTokenManager();
		if (refreshToken) {
			_assert(typeof refreshToken === "string", "internal-error", { appName });
			manager.refreshToken = refreshToken;
		}
		if (accessToken) {
			_assert(typeof accessToken === "string", "internal-error", { appName });
			manager.accessToken = accessToken;
		}
		if (expirationTime) {
			_assert(typeof expirationTime === "number", "internal-error", { appName });
			manager.expirationTime = expirationTime;
		}
		return manager;
	}
	toJSON() {
		return {
			refreshToken: this.refreshToken,
			accessToken: this.accessToken,
			expirationTime: this.expirationTime
		};
	}
	_assign(stsTokenManager) {
		this.accessToken = stsTokenManager.accessToken;
		this.refreshToken = stsTokenManager.refreshToken;
		this.expirationTime = stsTokenManager.expirationTime;
	}
	_clone() {
		return Object.assign(new StsTokenManager(), this.toJSON());
	}
	_performRefresh() {
		return debugFail("not implemented");
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function assertStringOrUndefined(assertion, appName) {
	_assert(typeof assertion === "string" || typeof assertion === "undefined", "internal-error", { appName });
}
var UserImpl = class UserImpl {
	constructor(_a) {
		var { uid, auth, stsTokenManager } = _a;
		var opt = __rest(_a, [
			"uid",
			"auth",
			"stsTokenManager"
		]);
		this.providerId = "firebase";
		this.proactiveRefresh = new ProactiveRefresh(this);
		this.reloadUserInfo = null;
		this.reloadListener = null;
		this.uid = uid;
		this.auth = auth;
		this.stsTokenManager = stsTokenManager;
		this.accessToken = stsTokenManager.accessToken;
		this.displayName = opt.displayName || null;
		this.email = opt.email || null;
		this.emailVerified = opt.emailVerified || false;
		this.phoneNumber = opt.phoneNumber || null;
		this.photoURL = opt.photoURL || null;
		this.isAnonymous = opt.isAnonymous || false;
		this.tenantId = opt.tenantId || null;
		this.providerData = opt.providerData ? [...opt.providerData] : [];
		this.metadata = new UserMetadata(opt.createdAt || void 0, opt.lastLoginAt || void 0);
	}
	async getIdToken(forceRefresh) {
		const accessToken = await _logoutIfInvalidated(this, this.stsTokenManager.getToken(this.auth, forceRefresh));
		_assert(accessToken, this.auth, "internal-error");
		if (this.accessToken !== accessToken) {
			this.accessToken = accessToken;
			await this.auth._persistUserIfCurrent(this);
			this.auth._notifyListenersIfCurrent(this);
		}
		return accessToken;
	}
	getIdTokenResult(forceRefresh) {
		return getIdTokenResult(this, forceRefresh);
	}
	reload() {
		return reload(this);
	}
	_assign(user) {
		if (this === user) return;
		_assert(this.uid === user.uid, this.auth, "internal-error");
		this.displayName = user.displayName;
		this.photoURL = user.photoURL;
		this.email = user.email;
		this.emailVerified = user.emailVerified;
		this.phoneNumber = user.phoneNumber;
		this.isAnonymous = user.isAnonymous;
		this.tenantId = user.tenantId;
		this.providerData = user.providerData.map((userInfo) => Object.assign({}, userInfo));
		this.metadata._copy(user.metadata);
		this.stsTokenManager._assign(user.stsTokenManager);
	}
	_clone(auth) {
		const newUser = new UserImpl(Object.assign(Object.assign({}, this), {
			auth,
			stsTokenManager: this.stsTokenManager._clone()
		}));
		newUser.metadata._copy(this.metadata);
		return newUser;
	}
	_onReload(callback) {
		_assert(!this.reloadListener, this.auth, "internal-error");
		this.reloadListener = callback;
		if (this.reloadUserInfo) {
			this._notifyReloadListener(this.reloadUserInfo);
			this.reloadUserInfo = null;
		}
	}
	_notifyReloadListener(userInfo) {
		if (this.reloadListener) this.reloadListener(userInfo);
		else this.reloadUserInfo = userInfo;
	}
	_startProactiveRefresh() {
		this.proactiveRefresh._start();
	}
	_stopProactiveRefresh() {
		this.proactiveRefresh._stop();
	}
	async _updateTokensIfNecessary(response, reload = false) {
		let tokensRefreshed = false;
		if (response.idToken && response.idToken !== this.stsTokenManager.accessToken) {
			this.stsTokenManager.updateFromServerResponse(response);
			tokensRefreshed = true;
		}
		if (reload) await _reloadWithoutSaving(this);
		await this.auth._persistUserIfCurrent(this);
		if (tokensRefreshed) this.auth._notifyListenersIfCurrent(this);
	}
	async delete() {
		if (_isFirebaseServerApp(this.auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(this.auth));
		const idToken = await this.getIdToken();
		await _logoutIfInvalidated(this, deleteAccount(this.auth, { idToken }));
		this.stsTokenManager.clearRefreshToken();
		return this.auth.signOut();
	}
	toJSON() {
		return Object.assign(Object.assign({
			uid: this.uid,
			email: this.email || void 0,
			emailVerified: this.emailVerified,
			displayName: this.displayName || void 0,
			isAnonymous: this.isAnonymous,
			photoURL: this.photoURL || void 0,
			phoneNumber: this.phoneNumber || void 0,
			tenantId: this.tenantId || void 0,
			providerData: this.providerData.map((userInfo) => Object.assign({}, userInfo)),
			stsTokenManager: this.stsTokenManager.toJSON(),
			_redirectEventId: this._redirectEventId
		}, this.metadata.toJSON()), {
			apiKey: this.auth.config.apiKey,
			appName: this.auth.name
		});
	}
	get refreshToken() {
		return this.stsTokenManager.refreshToken || "";
	}
	static _fromJSON(auth, object) {
		var _a;
		var _b;
		var _c;
		var _d;
		var _e;
		var _f;
		var _g;
		var _h;
		const displayName = (_a = object.displayName) !== null && _a !== void 0 ? _a : void 0;
		const email = (_b = object.email) !== null && _b !== void 0 ? _b : void 0;
		const phoneNumber = (_c = object.phoneNumber) !== null && _c !== void 0 ? _c : void 0;
		const photoURL = (_d = object.photoURL) !== null && _d !== void 0 ? _d : void 0;
		const tenantId = (_e = object.tenantId) !== null && _e !== void 0 ? _e : void 0;
		const _redirectEventId = (_f = object._redirectEventId) !== null && _f !== void 0 ? _f : void 0;
		const createdAt = (_g = object.createdAt) !== null && _g !== void 0 ? _g : void 0;
		const lastLoginAt = (_h = object.lastLoginAt) !== null && _h !== void 0 ? _h : void 0;
		const { uid, emailVerified, isAnonymous, providerData, stsTokenManager: plainObjectTokenManager } = object;
		_assert(uid && plainObjectTokenManager, auth, "internal-error");
		const stsTokenManager = StsTokenManager.fromJSON(this.name, plainObjectTokenManager);
		_assert(typeof uid === "string", auth, "internal-error");
		assertStringOrUndefined(displayName, auth.name);
		assertStringOrUndefined(email, auth.name);
		_assert(typeof emailVerified === "boolean", auth, "internal-error");
		_assert(typeof isAnonymous === "boolean", auth, "internal-error");
		assertStringOrUndefined(phoneNumber, auth.name);
		assertStringOrUndefined(photoURL, auth.name);
		assertStringOrUndefined(tenantId, auth.name);
		assertStringOrUndefined(_redirectEventId, auth.name);
		assertStringOrUndefined(createdAt, auth.name);
		assertStringOrUndefined(lastLoginAt, auth.name);
		const user = new UserImpl({
			uid,
			auth,
			email,
			emailVerified,
			displayName,
			isAnonymous,
			photoURL,
			phoneNumber,
			tenantId,
			stsTokenManager,
			createdAt,
			lastLoginAt
		});
		if (providerData && Array.isArray(providerData)) user.providerData = providerData.map((userInfo) => Object.assign({}, userInfo));
		if (_redirectEventId) user._redirectEventId = _redirectEventId;
		return user;
	}
	static async _fromIdTokenResponse(auth, idTokenResponse, isAnonymous = false) {
		const stsTokenManager = new StsTokenManager();
		stsTokenManager.updateFromServerResponse(idTokenResponse);
		const user = new UserImpl({
			uid: idTokenResponse.localId,
			auth,
			stsTokenManager,
			isAnonymous
		});
		await _reloadWithoutSaving(user);
		return user;
	}
	static async _fromGetAccountInfoResponse(auth, response, idToken) {
		const coreAccount = response.users[0];
		_assert(coreAccount.localId !== void 0, "internal-error");
		const providerData = coreAccount.providerUserInfo !== void 0 ? extractProviderData(coreAccount.providerUserInfo) : [];
		const isAnonymous = !(coreAccount.email && coreAccount.passwordHash) && !(providerData === null || providerData === void 0 ? void 0 : providerData.length);
		const stsTokenManager = new StsTokenManager();
		stsTokenManager.updateFromIdToken(idToken);
		const user = new UserImpl({
			uid: coreAccount.localId,
			auth,
			stsTokenManager,
			isAnonymous
		});
		const updates = {
			uid: coreAccount.localId,
			displayName: coreAccount.displayName || null,
			photoURL: coreAccount.photoUrl || null,
			email: coreAccount.email || null,
			emailVerified: coreAccount.emailVerified || false,
			phoneNumber: coreAccount.phoneNumber || null,
			tenantId: coreAccount.tenantId || null,
			providerData,
			metadata: new UserMetadata(coreAccount.createdAt, coreAccount.lastLoginAt),
			isAnonymous: !(coreAccount.email && coreAccount.passwordHash) && !(providerData === null || providerData === void 0 ? void 0 : providerData.length)
		};
		Object.assign(user, updates);
		return user;
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var instanceCache = /* @__PURE__ */ new Map();
function _getInstance(cls) {
	debugAssert(cls instanceof Function, "Expected a class definition");
	let instance = instanceCache.get(cls);
	if (instance) {
		debugAssert(instance instanceof cls, "Instance stored in cache mismatched with class");
		return instance;
	}
	instance = new cls();
	instanceCache.set(cls, instance);
	return instance;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var InMemoryPersistence = class {
	constructor() {
		this.type = "NONE";
		this.storage = {};
	}
	async _isAvailable() {
		return true;
	}
	async _set(key, value) {
		this.storage[key] = value;
	}
	async _get(key) {
		const value = this.storage[key];
		return value === void 0 ? null : value;
	}
	async _remove(key) {
		delete this.storage[key];
	}
	_addListener(_key, _listener) {}
	_removeListener(_key, _listener) {}
};
InMemoryPersistence.type = "NONE";
var inMemoryPersistence = InMemoryPersistence;
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _persistenceKeyName(key, apiKey, appName) {
	return `firebase:${key}:${apiKey}:${appName}`;
}
var PersistenceUserManager = class PersistenceUserManager {
	constructor(persistence, auth, userKey) {
		this.persistence = persistence;
		this.auth = auth;
		this.userKey = userKey;
		const { config, name } = this.auth;
		this.fullUserKey = _persistenceKeyName(this.userKey, config.apiKey, name);
		this.fullPersistenceKey = _persistenceKeyName("persistence", config.apiKey, name);
		this.boundEventHandler = auth._onStorageEvent.bind(auth);
		this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
	}
	setCurrentUser(user) {
		return this.persistence._set(this.fullUserKey, user.toJSON());
	}
	async getCurrentUser() {
		const blob = await this.persistence._get(this.fullUserKey);
		if (!blob) return null;
		if (typeof blob === "string") {
			const response = await getAccountInfo(this.auth, { idToken: blob }).catch(() => void 0);
			if (!response) return null;
			return UserImpl._fromGetAccountInfoResponse(this.auth, response, blob);
		}
		return UserImpl._fromJSON(this.auth, blob);
	}
	removeCurrentUser() {
		return this.persistence._remove(this.fullUserKey);
	}
	savePersistenceForRedirect() {
		return this.persistence._set(this.fullPersistenceKey, this.persistence.type);
	}
	async setPersistence(newPersistence) {
		if (this.persistence === newPersistence) return;
		const currentUser = await this.getCurrentUser();
		await this.removeCurrentUser();
		this.persistence = newPersistence;
		if (currentUser) return this.setCurrentUser(currentUser);
	}
	delete() {
		this.persistence._removeListener(this.fullUserKey, this.boundEventHandler);
	}
	static async create(auth, persistenceHierarchy, userKey = "authUser") {
		if (!persistenceHierarchy.length) return new PersistenceUserManager(_getInstance(inMemoryPersistence), auth, userKey);
		const availablePersistences = (await Promise.all(persistenceHierarchy.map(async (persistence) => {
			if (await persistence._isAvailable()) return persistence;
		}))).filter((persistence) => persistence);
		let selectedPersistence = availablePersistences[0] || _getInstance(inMemoryPersistence);
		const key = _persistenceKeyName(userKey, auth.config.apiKey, auth.name);
		let userToMigrate = null;
		for (const persistence of persistenceHierarchy) try {
			const blob = await persistence._get(key);
			if (blob) {
				let user;
				if (typeof blob === "string") {
					const response = await getAccountInfo(auth, { idToken: blob }).catch(() => void 0);
					if (!response) break;
					user = await UserImpl._fromGetAccountInfoResponse(auth, response, blob);
				} else user = UserImpl._fromJSON(auth, blob);
				if (persistence !== selectedPersistence) userToMigrate = user;
				selectedPersistence = persistence;
				break;
			}
		} catch (_a) {}
		const migrationHierarchy = availablePersistences.filter((p) => p._shouldAllowMigration);
		if (!selectedPersistence._shouldAllowMigration || !migrationHierarchy.length) return new PersistenceUserManager(selectedPersistence, auth, userKey);
		selectedPersistence = migrationHierarchy[0];
		if (userToMigrate) await selectedPersistence._set(key, userToMigrate.toJSON());
		await Promise.all(persistenceHierarchy.map(async (persistence) => {
			if (persistence !== selectedPersistence) try {
				await persistence._remove(key);
			} catch (_a) {}
		}));
		return new PersistenceUserManager(selectedPersistence, auth, userKey);
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _getBrowserName(userAgent) {
	const ua = userAgent.toLowerCase();
	if (ua.includes("opera/") || ua.includes("opr/") || ua.includes("opios/")) return "Opera";
	else if (_isIEMobile(ua)) return "IEMobile";
	else if (ua.includes("msie") || ua.includes("trident/")) return "IE";
	else if (ua.includes("edge/")) return "Edge";
	else if (_isFirefox(ua)) return "Firefox";
	else if (ua.includes("silk/")) return "Silk";
	else if (_isBlackBerry(ua)) return "Blackberry";
	else if (_isWebOS(ua)) return "Webos";
	else if (_isSafari(ua)) return "Safari";
	else if ((ua.includes("chrome/") || _isChromeIOS(ua)) && !ua.includes("edge/")) return "Chrome";
	else if (_isAndroid(ua)) return "Android";
	else {
		const matches = userAgent.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);
		if ((matches === null || matches === void 0 ? void 0 : matches.length) === 2) return matches[1];
	}
	return "Other";
}
function _isFirefox(ua = getUA()) {
	return /firefox\//i.test(ua);
}
function _isSafari(userAgent = getUA()) {
	const ua = userAgent.toLowerCase();
	return ua.includes("safari/") && !ua.includes("chrome/") && !ua.includes("crios/") && !ua.includes("android");
}
function _isChromeIOS(ua = getUA()) {
	return /crios\//i.test(ua);
}
function _isIEMobile(ua = getUA()) {
	return /iemobile/i.test(ua);
}
function _isAndroid(ua = getUA()) {
	return /android/i.test(ua);
}
function _isBlackBerry(ua = getUA()) {
	return /blackberry/i.test(ua);
}
function _isWebOS(ua = getUA()) {
	return /webos/i.test(ua);
}
function _isIOS(ua = getUA()) {
	return /iphone|ipad|ipod/i.test(ua) || /macintosh/i.test(ua) && /mobile/i.test(ua);
}
function _isIOSStandalone(ua = getUA()) {
	var _a;
	return _isIOS(ua) && !!((_a = window.navigator) === null || _a === void 0 ? void 0 : _a.standalone);
}
function _isIE10() {
	return isIE() && document.documentMode === 10;
}
function _isMobileBrowser(ua = getUA()) {
	return _isIOS(ua) || _isAndroid(ua) || _isWebOS(ua) || _isBlackBerry(ua) || /windows phone/i.test(ua) || _isIEMobile(ua);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _getClientVersion(clientPlatform, frameworks = []) {
	let reportedPlatform;
	switch (clientPlatform) {
		case "Browser":
			reportedPlatform = _getBrowserName(getUA());
			break;
		case "Worker":
			reportedPlatform = `${_getBrowserName(getUA())}-${clientPlatform}`;
			break;
		default: reportedPlatform = clientPlatform;
	}
	const reportedFrameworks = frameworks.length ? frameworks.join(",") : "FirebaseCore-web";
	return `${reportedPlatform}/JsCore/${SDK_VERSION$1}/${reportedFrameworks}`;
}
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var AuthMiddlewareQueue = class {
	constructor(auth) {
		this.auth = auth;
		this.queue = [];
	}
	pushCallback(callback, onAbort) {
		const wrappedCallback = (user) => new Promise((resolve, reject) => {
			try {
				resolve(callback(user));
			} catch (e) {
				reject(e);
			}
		});
		wrappedCallback.onAbort = onAbort;
		this.queue.push(wrappedCallback);
		const index = this.queue.length - 1;
		return () => {
			this.queue[index] = () => Promise.resolve();
		};
	}
	async runMiddleware(nextUser) {
		if (this.auth.currentUser === nextUser) return;
		const onAbortStack = [];
		try {
			for (const beforeStateCallback of this.queue) {
				await beforeStateCallback(nextUser);
				if (beforeStateCallback.onAbort) onAbortStack.push(beforeStateCallback.onAbort);
			}
		} catch (e) {
			onAbortStack.reverse();
			for (const onAbort of onAbortStack) try {
				onAbort();
			} catch (_) {}
			throw this.auth._errorFactory.create("login-blocked", { originalMessage: e === null || e === void 0 ? void 0 : e.message });
		}
	}
};
/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function _getPasswordPolicy(auth, request = {}) {
	return _performApiRequest(auth, "GET", "/v2/passwordPolicy", _addTidIfNecessary(auth, request));
}
/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var MINIMUM_MIN_PASSWORD_LENGTH = 6;
var PasswordPolicyImpl = class {
	constructor(response) {
		var _a;
		var _b;
		var _c;
		var _d;
		const responseOptions = response.customStrengthOptions;
		this.customStrengthOptions = {};
		this.customStrengthOptions.minPasswordLength = (_a = responseOptions.minPasswordLength) !== null && _a !== void 0 ? _a : MINIMUM_MIN_PASSWORD_LENGTH;
		if (responseOptions.maxPasswordLength) this.customStrengthOptions.maxPasswordLength = responseOptions.maxPasswordLength;
		if (responseOptions.containsLowercaseCharacter !== void 0) this.customStrengthOptions.containsLowercaseLetter = responseOptions.containsLowercaseCharacter;
		if (responseOptions.containsUppercaseCharacter !== void 0) this.customStrengthOptions.containsUppercaseLetter = responseOptions.containsUppercaseCharacter;
		if (responseOptions.containsNumericCharacter !== void 0) this.customStrengthOptions.containsNumericCharacter = responseOptions.containsNumericCharacter;
		if (responseOptions.containsNonAlphanumericCharacter !== void 0) this.customStrengthOptions.containsNonAlphanumericCharacter = responseOptions.containsNonAlphanumericCharacter;
		this.enforcementState = response.enforcementState;
		if (this.enforcementState === "ENFORCEMENT_STATE_UNSPECIFIED") this.enforcementState = "OFF";
		this.allowedNonAlphanumericCharacters = (_c = (_b = response.allowedNonAlphanumericCharacters) === null || _b === void 0 ? void 0 : _b.join("")) !== null && _c !== void 0 ? _c : "";
		this.forceUpgradeOnSignin = (_d = response.forceUpgradeOnSignin) !== null && _d !== void 0 ? _d : false;
		this.schemaVersion = response.schemaVersion;
	}
	validatePassword(password) {
		var _a;
		var _b;
		var _c;
		var _d;
		var _e;
		var _f;
		const status = {
			isValid: true,
			passwordPolicy: this
		};
		this.validatePasswordLengthOptions(password, status);
		this.validatePasswordCharacterOptions(password, status);
		status.isValid && (status.isValid = (_a = status.meetsMinPasswordLength) !== null && _a !== void 0 ? _a : true);
		status.isValid && (status.isValid = (_b = status.meetsMaxPasswordLength) !== null && _b !== void 0 ? _b : true);
		status.isValid && (status.isValid = (_c = status.containsLowercaseLetter) !== null && _c !== void 0 ? _c : true);
		status.isValid && (status.isValid = (_d = status.containsUppercaseLetter) !== null && _d !== void 0 ? _d : true);
		status.isValid && (status.isValid = (_e = status.containsNumericCharacter) !== null && _e !== void 0 ? _e : true);
		status.isValid && (status.isValid = (_f = status.containsNonAlphanumericCharacter) !== null && _f !== void 0 ? _f : true);
		return status;
	}
	validatePasswordLengthOptions(password, status) {
		const minPasswordLength = this.customStrengthOptions.minPasswordLength;
		const maxPasswordLength = this.customStrengthOptions.maxPasswordLength;
		if (minPasswordLength) status.meetsMinPasswordLength = password.length >= minPasswordLength;
		if (maxPasswordLength) status.meetsMaxPasswordLength = password.length <= maxPasswordLength;
	}
	validatePasswordCharacterOptions(password, status) {
		this.updatePasswordCharacterOptionsStatuses(status, false, false, false, false);
		let passwordChar;
		for (let i = 0; i < password.length; i++) {
			passwordChar = password.charAt(i);
			this.updatePasswordCharacterOptionsStatuses(status, passwordChar >= "a" && passwordChar <= "z", passwordChar >= "A" && passwordChar <= "Z", passwordChar >= "0" && passwordChar <= "9", this.allowedNonAlphanumericCharacters.includes(passwordChar));
		}
	}
	updatePasswordCharacterOptionsStatuses(status, containsLowercaseCharacter, containsUppercaseCharacter, containsNumericCharacter, containsNonAlphanumericCharacter) {
		if (this.customStrengthOptions.containsLowercaseLetter) status.containsLowercaseLetter || (status.containsLowercaseLetter = containsLowercaseCharacter);
		if (this.customStrengthOptions.containsUppercaseLetter) status.containsUppercaseLetter || (status.containsUppercaseLetter = containsUppercaseCharacter);
		if (this.customStrengthOptions.containsNumericCharacter) status.containsNumericCharacter || (status.containsNumericCharacter = containsNumericCharacter);
		if (this.customStrengthOptions.containsNonAlphanumericCharacter) status.containsNonAlphanumericCharacter || (status.containsNonAlphanumericCharacter = containsNonAlphanumericCharacter);
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var AuthImpl = class {
	constructor(app, heartbeatServiceProvider, appCheckServiceProvider, config) {
		this.app = app;
		this.heartbeatServiceProvider = heartbeatServiceProvider;
		this.appCheckServiceProvider = appCheckServiceProvider;
		this.config = config;
		this.currentUser = null;
		this.emulatorConfig = null;
		this.operations = Promise.resolve();
		this.authStateSubscription = new Subscription(this);
		this.idTokenSubscription = new Subscription(this);
		this.beforeStateQueue = new AuthMiddlewareQueue(this);
		this.redirectUser = null;
		this.isProactiveRefreshEnabled = false;
		this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION = 1;
		this._canInitEmulator = true;
		this._isInitialized = false;
		this._deleted = false;
		this._initializationPromise = null;
		this._popupRedirectResolver = null;
		this._errorFactory = _DEFAULT_AUTH_ERROR_FACTORY;
		this._agentRecaptchaConfig = null;
		this._tenantRecaptchaConfigs = {};
		this._projectPasswordPolicy = null;
		this._tenantPasswordPolicies = {};
		this._resolvePersistenceManagerAvailable = void 0;
		this.lastNotifiedUid = void 0;
		this.languageCode = null;
		this.tenantId = null;
		this.settings = { appVerificationDisabledForTesting: false };
		this.frameworks = [];
		this.name = app.name;
		this.clientVersion = config.sdkClientVersion;
		this._persistenceManagerAvailable = new Promise((resolve) => this._resolvePersistenceManagerAvailable = resolve);
	}
	_initializeWithPersistence(persistenceHierarchy, popupRedirectResolver) {
		if (popupRedirectResolver) this._popupRedirectResolver = _getInstance(popupRedirectResolver);
		this._initializationPromise = this.queue(async () => {
			var _a;
			var _b;
			var _c;
			if (this._deleted) return;
			this.persistenceManager = await PersistenceUserManager.create(this, persistenceHierarchy);
			(_a = this._resolvePersistenceManagerAvailable) === null || _a === void 0 || _a.call(this);
			if (this._deleted) return;
			if ((_b = this._popupRedirectResolver) === null || _b === void 0 ? void 0 : _b._shouldInitProactively) try {
				await this._popupRedirectResolver._initialize(this);
			} catch (e) {}
			await this.initializeCurrentUser(popupRedirectResolver);
			this.lastNotifiedUid = ((_c = this.currentUser) === null || _c === void 0 ? void 0 : _c.uid) || null;
			if (this._deleted) return;
			this._isInitialized = true;
		});
		return this._initializationPromise;
	}
	async _onStorageEvent() {
		if (this._deleted) return;
		const user = await this.assertedPersistence.getCurrentUser();
		if (!this.currentUser && !user) return;
		if (this.currentUser && user && this.currentUser.uid === user.uid) {
			this._currentUser._assign(user);
			await this.currentUser.getIdToken();
			return;
		}
		await this._updateCurrentUser(user, true);
	}
	async initializeCurrentUserFromIdToken(idToken) {
		try {
			const response = await getAccountInfo(this, { idToken });
			const user = await UserImpl._fromGetAccountInfoResponse(this, response, idToken);
			await this.directlySetCurrentUser(user);
		} catch (err) {
			console.warn("FirebaseServerApp could not login user with provided authIdToken: ", err);
			await this.directlySetCurrentUser(null);
		}
	}
	async initializeCurrentUser(popupRedirectResolver) {
		var _a;
		if (_isFirebaseServerApp(this.app)) {
			const idToken = this.app.settings.authIdToken;
			if (idToken) return new Promise((resolve) => {
				setTimeout(() => this.initializeCurrentUserFromIdToken(idToken).then(resolve, resolve));
			});
			else return this.directlySetCurrentUser(null);
		}
		const previouslyStoredUser = await this.assertedPersistence.getCurrentUser();
		let futureCurrentUser = previouslyStoredUser;
		let needsTocheckMiddleware = false;
		if (popupRedirectResolver && this.config.authDomain) {
			await this.getOrInitRedirectPersistenceManager();
			const redirectUserEventId = (_a = this.redirectUser) === null || _a === void 0 ? void 0 : _a._redirectEventId;
			const storedUserEventId = futureCurrentUser === null || futureCurrentUser === void 0 ? void 0 : futureCurrentUser._redirectEventId;
			const result = await this.tryRedirectSignIn(popupRedirectResolver);
			if ((!redirectUserEventId || redirectUserEventId === storedUserEventId) && (result === null || result === void 0 ? void 0 : result.user)) {
				futureCurrentUser = result.user;
				needsTocheckMiddleware = true;
			}
		}
		if (!futureCurrentUser) return this.directlySetCurrentUser(null);
		if (!futureCurrentUser._redirectEventId) {
			if (needsTocheckMiddleware) try {
				await this.beforeStateQueue.runMiddleware(futureCurrentUser);
			} catch (e) {
				futureCurrentUser = previouslyStoredUser;
				this._popupRedirectResolver._overrideRedirectResult(this, () => Promise.reject(e));
			}
			if (futureCurrentUser) return this.reloadAndSetCurrentUserOrClear(futureCurrentUser);
			else return this.directlySetCurrentUser(null);
		}
		_assert(this._popupRedirectResolver, this, "argument-error");
		await this.getOrInitRedirectPersistenceManager();
		if (this.redirectUser && this.redirectUser._redirectEventId === futureCurrentUser._redirectEventId) return this.directlySetCurrentUser(futureCurrentUser);
		return this.reloadAndSetCurrentUserOrClear(futureCurrentUser);
	}
	async tryRedirectSignIn(redirectResolver) {
		let result = null;
		try {
			result = await this._popupRedirectResolver._completeRedirectFn(this, redirectResolver, true);
		} catch (e) {
			await this._setRedirectUser(null);
		}
		return result;
	}
	async reloadAndSetCurrentUserOrClear(user) {
		try {
			await _reloadWithoutSaving(user);
		} catch (e) {
			if ((e === null || e === void 0 ? void 0 : e.code) !== `auth/network-request-failed`) return this.directlySetCurrentUser(null);
		}
		return this.directlySetCurrentUser(user);
	}
	useDeviceLanguage() {
		this.languageCode = _getUserLanguage();
	}
	async _delete() {
		this._deleted = true;
	}
	async updateCurrentUser(userExtern) {
		if (_isFirebaseServerApp(this.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(this));
		const user = userExtern ? getModularInstance(userExtern) : null;
		if (user) _assert(user.auth.config.apiKey === this.config.apiKey, this, "invalid-user-token");
		return this._updateCurrentUser(user && user._clone(this));
	}
	async _updateCurrentUser(user, skipBeforeStateCallbacks = false) {
		if (this._deleted) return;
		if (user) _assert(this.tenantId === user.tenantId, this, "tenant-id-mismatch");
		if (!skipBeforeStateCallbacks) await this.beforeStateQueue.runMiddleware(user);
		return this.queue(async () => {
			await this.directlySetCurrentUser(user);
			this.notifyAuthListeners();
		});
	}
	async signOut() {
		if (_isFirebaseServerApp(this.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(this));
		await this.beforeStateQueue.runMiddleware(null);
		if (this.redirectPersistenceManager || this._popupRedirectResolver) await this._setRedirectUser(null);
		return this._updateCurrentUser(null, true);
	}
	setPersistence(persistence) {
		if (_isFirebaseServerApp(this.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(this));
		return this.queue(async () => {
			await this.assertedPersistence.setPersistence(_getInstance(persistence));
		});
	}
	_getRecaptchaConfig() {
		if (this.tenantId == null) return this._agentRecaptchaConfig;
		else return this._tenantRecaptchaConfigs[this.tenantId];
	}
	async validatePassword(password) {
		if (!this._getPasswordPolicyInternal()) await this._updatePasswordPolicy();
		const passwordPolicy = this._getPasswordPolicyInternal();
		if (passwordPolicy.schemaVersion !== this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION) return Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version", {}));
		return passwordPolicy.validatePassword(password);
	}
	_getPasswordPolicyInternal() {
		if (this.tenantId === null) return this._projectPasswordPolicy;
		else return this._tenantPasswordPolicies[this.tenantId];
	}
	async _updatePasswordPolicy() {
		const passwordPolicy = new PasswordPolicyImpl(await _getPasswordPolicy(this));
		if (this.tenantId === null) this._projectPasswordPolicy = passwordPolicy;
		else this._tenantPasswordPolicies[this.tenantId] = passwordPolicy;
	}
	_getPersistenceType() {
		return this.assertedPersistence.persistence.type;
	}
	_getPersistence() {
		return this.assertedPersistence.persistence;
	}
	_updateErrorMap(errorMap) {
		this._errorFactory = new ErrorFactory("auth", "Firebase", errorMap());
	}
	onAuthStateChanged(nextOrObserver, error, completed) {
		return this.registerStateListener(this.authStateSubscription, nextOrObserver, error, completed);
	}
	beforeAuthStateChanged(callback, onAbort) {
		return this.beforeStateQueue.pushCallback(callback, onAbort);
	}
	onIdTokenChanged(nextOrObserver, error, completed) {
		return this.registerStateListener(this.idTokenSubscription, nextOrObserver, error, completed);
	}
	authStateReady() {
		return new Promise((resolve, reject) => {
			if (this.currentUser) resolve();
			else {
				const unsubscribe = this.onAuthStateChanged(() => {
					unsubscribe();
					resolve();
				}, reject);
			}
		});
	}
	async revokeAccessToken(token) {
		if (this.currentUser) {
			const request = {
				providerId: "apple.com",
				tokenType: "ACCESS_TOKEN",
				token,
				idToken: await this.currentUser.getIdToken()
			};
			if (this.tenantId != null) request.tenantId = this.tenantId;
			await revokeToken(this, request);
		}
	}
	toJSON() {
		var _a;
		return {
			apiKey: this.config.apiKey,
			authDomain: this.config.authDomain,
			appName: this.name,
			currentUser: (_a = this._currentUser) === null || _a === void 0 ? void 0 : _a.toJSON()
		};
	}
	async _setRedirectUser(user, popupRedirectResolver) {
		const redirectManager = await this.getOrInitRedirectPersistenceManager(popupRedirectResolver);
		return user === null ? redirectManager.removeCurrentUser() : redirectManager.setCurrentUser(user);
	}
	async getOrInitRedirectPersistenceManager(popupRedirectResolver) {
		if (!this.redirectPersistenceManager) {
			const resolver = popupRedirectResolver && _getInstance(popupRedirectResolver) || this._popupRedirectResolver;
			_assert(resolver, this, "argument-error");
			this.redirectPersistenceManager = await PersistenceUserManager.create(this, [_getInstance(resolver._redirectPersistence)], "redirectUser");
			this.redirectUser = await this.redirectPersistenceManager.getCurrentUser();
		}
		return this.redirectPersistenceManager;
	}
	async _redirectUserForId(id) {
		var _a;
		var _b;
		if (this._isInitialized) await this.queue(async () => {});
		if (((_a = this._currentUser) === null || _a === void 0 ? void 0 : _a._redirectEventId) === id) return this._currentUser;
		if (((_b = this.redirectUser) === null || _b === void 0 ? void 0 : _b._redirectEventId) === id) return this.redirectUser;
		return null;
	}
	async _persistUserIfCurrent(user) {
		if (user === this.currentUser) return this.queue(async () => this.directlySetCurrentUser(user));
	}
	_notifyListenersIfCurrent(user) {
		if (user === this.currentUser) this.notifyAuthListeners();
	}
	_key() {
		return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
	}
	_startProactiveRefresh() {
		this.isProactiveRefreshEnabled = true;
		if (this.currentUser) this._currentUser._startProactiveRefresh();
	}
	_stopProactiveRefresh() {
		this.isProactiveRefreshEnabled = false;
		if (this.currentUser) this._currentUser._stopProactiveRefresh();
	}
	get _currentUser() {
		return this.currentUser;
	}
	notifyAuthListeners() {
		var _a;
		var _b;
		if (!this._isInitialized) return;
		this.idTokenSubscription.next(this.currentUser);
		const currentUid = (_b = (_a = this.currentUser) === null || _a === void 0 ? void 0 : _a.uid) !== null && _b !== void 0 ? _b : null;
		if (this.lastNotifiedUid !== currentUid) {
			this.lastNotifiedUid = currentUid;
			this.authStateSubscription.next(this.currentUser);
		}
	}
	registerStateListener(subscription, nextOrObserver, error, completed) {
		if (this._deleted) return () => {};
		const cb = typeof nextOrObserver === "function" ? nextOrObserver : nextOrObserver.next.bind(nextOrObserver);
		let isUnsubscribed = false;
		const promise = this._isInitialized ? Promise.resolve() : this._initializationPromise;
		_assert(promise, this, "internal-error");
		promise.then(() => {
			if (isUnsubscribed) return;
			cb(this.currentUser);
		});
		if (typeof nextOrObserver === "function") {
			const unsubscribe = subscription.addObserver(nextOrObserver, error, completed);
			return () => {
				isUnsubscribed = true;
				unsubscribe();
			};
		} else {
			const unsubscribe = subscription.addObserver(nextOrObserver);
			return () => {
				isUnsubscribed = true;
				unsubscribe();
			};
		}
	}
	async directlySetCurrentUser(user) {
		if (this.currentUser && this.currentUser !== user) this._currentUser._stopProactiveRefresh();
		if (user && this.isProactiveRefreshEnabled) user._startProactiveRefresh();
		this.currentUser = user;
		if (user) await this.assertedPersistence.setCurrentUser(user);
		else await this.assertedPersistence.removeCurrentUser();
	}
	queue(action) {
		this.operations = this.operations.then(action, action);
		return this.operations;
	}
	get assertedPersistence() {
		_assert(this.persistenceManager, this, "internal-error");
		return this.persistenceManager;
	}
	_logFramework(framework) {
		if (!framework || this.frameworks.includes(framework)) return;
		this.frameworks.push(framework);
		this.frameworks.sort();
		this.clientVersion = _getClientVersion(this.config.clientPlatform, this._getFrameworks());
	}
	_getFrameworks() {
		return this.frameworks;
	}
	async _getAdditionalHeaders() {
		var _a;
		const headers = { ["X-Client-Version"]: this.clientVersion };
		if (this.app.options.appId) headers["X-Firebase-gmpid"] = this.app.options.appId;
		const heartbeatsHeader = await ((_a = this.heartbeatServiceProvider.getImmediate({ optional: true })) === null || _a === void 0 ? void 0 : _a.getHeartbeatsHeader());
		if (heartbeatsHeader) headers["X-Firebase-Client"] = heartbeatsHeader;
		const appCheckToken = await this._getAppCheckToken();
		if (appCheckToken) headers["X-Firebase-AppCheck"] = appCheckToken;
		return headers;
	}
	async _getAppCheckToken() {
		var _a;
		if (_isFirebaseServerApp(this.app) && this.app.settings.appCheckToken) return this.app.settings.appCheckToken;
		const appCheckTokenResult = await ((_a = this.appCheckServiceProvider.getImmediate({ optional: true })) === null || _a === void 0 ? void 0 : _a.getToken());
		if (appCheckTokenResult === null || appCheckTokenResult === void 0 ? void 0 : appCheckTokenResult.error) _logWarn(`Error while retrieving App Check token: ${appCheckTokenResult.error}`);
		return appCheckTokenResult === null || appCheckTokenResult === void 0 ? void 0 : appCheckTokenResult.token;
	}
};
function _castAuth(auth) {
	return getModularInstance(auth);
}
var Subscription = class {
	constructor(auth) {
		this.auth = auth;
		this.observer = null;
		this.addObserver = createSubscribe((observer) => this.observer = observer);
	}
	get next() {
		_assert(this.observer, this.auth, "internal-error");
		return this.observer.next.bind(this.observer);
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var externalJSProvider = {
	async loadJS() {
		throw new Error("Unable to load external scripts");
	},
	recaptchaV2Script: "",
	recaptchaEnterpriseScript: "",
	gapiScript: ""
};
function _setExternalJSProvider(p) {
	externalJSProvider = p;
}
function _loadJS(url) {
	return externalJSProvider.loadJS(url);
}
function _recaptchaEnterpriseScriptUrl() {
	return externalJSProvider.recaptchaEnterpriseScript;
}
function _gapiScriptUrl() {
	return externalJSProvider.gapiScript;
}
function _generateCallbackName(prefix) {
	return `__${prefix}${Math.floor(Math.random() * 1e6)}`;
}
var MockGreCAPTCHATopLevel = class {
	constructor() {
		this.enterprise = new MockGreCAPTCHA();
	}
	ready(callback) {
		callback();
	}
	execute(_siteKey, _options) {
		return Promise.resolve("token");
	}
	render(_container, _parameters) {
		return "";
	}
};
var MockGreCAPTCHA = class {
	ready(callback) {
		callback();
	}
	execute(_siteKey, _options) {
		return Promise.resolve("token");
	}
	render(_container, _parameters) {
		return "";
	}
};
var RECAPTCHA_ENTERPRISE_VERIFIER_TYPE = "recaptcha-enterprise";
var FAKE_TOKEN = "NO_RECAPTCHA";
var RecaptchaEnterpriseVerifier = class {
	constructor(authExtern) {
		this.type = RECAPTCHA_ENTERPRISE_VERIFIER_TYPE;
		this.auth = _castAuth(authExtern);
	}
	async verify(action = "verify", forceRefresh = false) {
		async function retrieveSiteKey(auth) {
			if (!forceRefresh) {
				if (auth.tenantId == null && auth._agentRecaptchaConfig != null) return auth._agentRecaptchaConfig.siteKey;
				if (auth.tenantId != null && auth._tenantRecaptchaConfigs[auth.tenantId] !== void 0) return auth._tenantRecaptchaConfigs[auth.tenantId].siteKey;
			}
			return new Promise(async (resolve, reject) => {
				getRecaptchaConfig(auth, {
					clientType: "CLIENT_TYPE_WEB",
					version: "RECAPTCHA_ENTERPRISE"
				}).then((response) => {
					if (response.recaptchaKey === void 0) reject(/* @__PURE__ */ new Error("recaptcha Enterprise site key undefined"));
					else {
						const config = new RecaptchaConfig(response);
						if (auth.tenantId == null) auth._agentRecaptchaConfig = config;
						else auth._tenantRecaptchaConfigs[auth.tenantId] = config;
						return resolve(config.siteKey);
					}
				}).catch((error) => {
					reject(error);
				});
			});
		}
		function retrieveRecaptchaToken(siteKey, resolve, reject) {
			const grecaptcha = window.grecaptcha;
			if (isEnterprise(grecaptcha)) grecaptcha.enterprise.ready(() => {
				grecaptcha.enterprise.execute(siteKey, { action }).then((token) => {
					resolve(token);
				}).catch(() => {
					resolve(FAKE_TOKEN);
				});
			});
			else reject(Error("No reCAPTCHA enterprise script loaded."));
		}
		if (this.auth.settings.appVerificationDisabledForTesting) return new MockGreCAPTCHATopLevel().execute("siteKey", { action: "verify" });
		return new Promise((resolve, reject) => {
			retrieveSiteKey(this.auth).then((siteKey) => {
				if (!forceRefresh && isEnterprise(window.grecaptcha)) retrieveRecaptchaToken(siteKey, resolve, reject);
				else {
					if (typeof window === "undefined") {
						reject(/* @__PURE__ */ new Error("RecaptchaVerifier is only supported in browser"));
						return;
					}
					let url = _recaptchaEnterpriseScriptUrl();
					if (url.length !== 0) url += siteKey;
					_loadJS(url).then(() => {
						retrieveRecaptchaToken(siteKey, resolve, reject);
					}).catch((error) => {
						reject(error);
					});
				}
			}).catch((error) => {
				reject(error);
			});
		});
	}
};
async function injectRecaptchaFields(auth, request, action, isCaptchaResp = false, isFakeToken = false) {
	const verifier = new RecaptchaEnterpriseVerifier(auth);
	let captchaResponse;
	if (isFakeToken) captchaResponse = FAKE_TOKEN;
	else try {
		captchaResponse = await verifier.verify(action);
	} catch (error) {
		captchaResponse = await verifier.verify(action, true);
	}
	const newRequest = Object.assign({}, request);
	if (action === "mfaSmsEnrollment" || action === "mfaSmsSignIn") {
		if ("phoneEnrollmentInfo" in newRequest) {
			const phoneNumber = newRequest.phoneEnrollmentInfo.phoneNumber;
			const recaptchaToken = newRequest.phoneEnrollmentInfo.recaptchaToken;
			Object.assign(newRequest, { "phoneEnrollmentInfo": {
				phoneNumber,
				recaptchaToken,
				captchaResponse,
				"clientType": "CLIENT_TYPE_WEB",
				"recaptchaVersion": "RECAPTCHA_ENTERPRISE"
			} });
		} else if ("phoneSignInInfo" in newRequest) {
			const recaptchaToken = newRequest.phoneSignInInfo.recaptchaToken;
			Object.assign(newRequest, { "phoneSignInInfo": {
				recaptchaToken,
				captchaResponse,
				"clientType": "CLIENT_TYPE_WEB",
				"recaptchaVersion": "RECAPTCHA_ENTERPRISE"
			} });
		}
		return newRequest;
	}
	if (!isCaptchaResp) Object.assign(newRequest, { captchaResponse });
	else Object.assign(newRequest, { "captchaResp": captchaResponse });
	Object.assign(newRequest, { "clientType": "CLIENT_TYPE_WEB" });
	Object.assign(newRequest, { "recaptchaVersion": "RECAPTCHA_ENTERPRISE" });
	return newRequest;
}
async function handleRecaptchaFlow(authInstance, request, actionName, actionMethod, recaptchaAuthProvider) {
	var _a;
	var _b;
	if (recaptchaAuthProvider === "EMAIL_PASSWORD_PROVIDER") if ((_a = authInstance._getRecaptchaConfig()) === null || _a === void 0 ? void 0 : _a.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")) return actionMethod(authInstance, await injectRecaptchaFields(authInstance, request, actionName, actionName === "getOobCode"));
	else return actionMethod(authInstance, request).catch(async (error) => {
		if (error.code === `auth/missing-recaptcha-token`) {
			`${actionName}`;
			return actionMethod(authInstance, await injectRecaptchaFields(authInstance, request, actionName, actionName === "getOobCode"));
		} else return Promise.reject(error);
	});
	else if (recaptchaAuthProvider === "PHONE_PROVIDER") if ((_b = authInstance._getRecaptchaConfig()) === null || _b === void 0 ? void 0 : _b.isProviderEnabled("PHONE_PROVIDER")) return actionMethod(authInstance, await injectRecaptchaFields(authInstance, request, actionName)).catch(async (error) => {
		var _a;
		if (((_a = authInstance._getRecaptchaConfig()) === null || _a === void 0 ? void 0 : _a.getProviderEnforcementState("PHONE_PROVIDER")) === "AUDIT") {
			if (error.code === `auth/missing-recaptcha-token` || error.code === `auth/invalid-app-credential`) {
				`${actionName}`;
				return actionMethod(authInstance, await injectRecaptchaFields(authInstance, request, actionName, false, true));
			}
		}
		return Promise.reject(error);
	});
	else return actionMethod(authInstance, await injectRecaptchaFields(authInstance, request, actionName, false, true));
	else return Promise.reject(recaptchaAuthProvider + " provider is not supported.");
}
async function _initializeRecaptchaConfig(auth) {
	const authInternal = _castAuth(auth);
	const config = new RecaptchaConfig(await getRecaptchaConfig(authInternal, {
		clientType: "CLIENT_TYPE_WEB",
		version: "RECAPTCHA_ENTERPRISE"
	}));
	if (authInternal.tenantId == null) authInternal._agentRecaptchaConfig = config;
	else authInternal._tenantRecaptchaConfigs[authInternal.tenantId] = config;
	if (config.isAnyProviderEnabled()) new RecaptchaEnterpriseVerifier(authInternal).verify();
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function initializeAuth(app, deps) {
	const provider = _getProvider(app, "auth");
	if (provider.isInitialized()) {
		const auth = provider.getImmediate();
		if (deepEqual(provider.getOptions(), deps !== null && deps !== void 0 ? deps : {})) return auth;
		else _fail(auth, "already-initialized");
	}
	return provider.initialize({ options: deps });
}
function _initializeAuthInstance(auth, deps) {
	const persistence = (deps === null || deps === void 0 ? void 0 : deps.persistence) || [];
	const hierarchy = (Array.isArray(persistence) ? persistence : [persistence]).map(_getInstance);
	if (deps === null || deps === void 0 ? void 0 : deps.errorMap) auth._updateErrorMap(deps.errorMap);
	auth._initializeWithPersistence(hierarchy, deps === null || deps === void 0 ? void 0 : deps.popupRedirectResolver);
}
function connectAuthEmulator(auth, url, options) {
	const authInternal = _castAuth(auth);
	_assert(/^https?:\/\//.test(url), authInternal, "invalid-emulator-scheme");
	const disableWarnings = !!(options === null || options === void 0 ? void 0 : options.disableWarnings);
	const protocol = extractProtocol(url);
	const { host, port } = extractHostAndPort(url);
	const portStr = port === null ? "" : `:${port}`;
	const emulator = { url: `${protocol}//${host}${portStr}/` };
	const emulatorConfig = Object.freeze({
		host,
		port,
		protocol: protocol.replace(":", ""),
		options: Object.freeze({ disableWarnings })
	});
	if (!authInternal._canInitEmulator) {
		_assert(authInternal.config.emulator && authInternal.emulatorConfig, authInternal, "emulator-config-failed");
		_assert(deepEqual(emulator, authInternal.config.emulator) && deepEqual(emulatorConfig, authInternal.emulatorConfig), authInternal, "emulator-config-failed");
		return;
	}
	authInternal.config.emulator = emulator;
	authInternal.emulatorConfig = emulatorConfig;
	authInternal.settings.appVerificationDisabledForTesting = true;
	if (isCloudWorkstation(host)) {
		pingServer(`${protocol}//${host}${portStr}`);
		updateEmulatorBanner("Auth", true);
	} else if (!disableWarnings) emitEmulatorWarning();
}
function extractProtocol(url) {
	const protocolEnd = url.indexOf(":");
	return protocolEnd < 0 ? "" : url.substr(0, protocolEnd + 1);
}
function extractHostAndPort(url) {
	const protocol = extractProtocol(url);
	const authority = /(\/\/)?([^?#/]+)/.exec(url.substr(protocol.length));
	if (!authority) return {
		host: "",
		port: null
	};
	const hostAndPort = authority[2].split("@").pop() || "";
	const bracketedIPv6 = /^(\[[^\]]+\])(:|$)/.exec(hostAndPort);
	if (bracketedIPv6) {
		const host = bracketedIPv6[1];
		return {
			host,
			port: parsePort(hostAndPort.substr(host.length + 1))
		};
	} else {
		const [host, port] = hostAndPort.split(":");
		return {
			host,
			port: parsePort(port)
		};
	}
}
function parsePort(portStr) {
	if (!portStr) return null;
	const port = Number(portStr);
	if (isNaN(port)) return null;
	return port;
}
function emitEmulatorWarning() {
	function attachBanner() {
		const el = document.createElement("p");
		const sty = el.style;
		el.innerText = "Running in emulator mode. Do not use with production credentials.";
		sty.position = "fixed";
		sty.width = "100%";
		sty.backgroundColor = "#ffffff";
		sty.border = ".1em solid #000000";
		sty.color = "#b50000";
		sty.bottom = "0px";
		sty.left = "0px";
		sty.margin = "0px";
		sty.zIndex = "10000";
		sty.textAlign = "center";
		el.classList.add("firebase-emulator-warning");
		document.body.appendChild(el);
	}
	if (typeof console !== "undefined" && typeof console.info === "function") {}
	if (typeof window !== "undefined" && typeof document !== "undefined") if (document.readyState === "loading") window.addEventListener("DOMContentLoaded", attachBanner);
	else attachBanner();
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var AuthCredential = class {
	constructor(providerId, signInMethod) {
		this.providerId = providerId;
		this.signInMethod = signInMethod;
	}
	toJSON() {
		return debugFail("not implemented");
	}
	_getIdTokenResponse(_auth) {
		return debugFail("not implemented");
	}
	_linkToIdToken(_auth, _idToken) {
		return debugFail("not implemented");
	}
	_getReauthenticationResolver(_auth) {
		return debugFail("not implemented");
	}
};
async function updateEmailPassword(auth, request) {
	return _performApiRequest(auth, "POST", "/v1/accounts:update", request);
}
async function linkEmailPassword(auth, request) {
	return _performApiRequest(auth, "POST", "/v1/accounts:signUp", request);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function signInWithPassword(auth, request) {
	return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithPassword", _addTidIfNecessary(auth, request));
}
async function sendOobCode(auth, request) {
	return _performApiRequest(auth, "POST", "/v1/accounts:sendOobCode", _addTidIfNecessary(auth, request));
}
async function sendPasswordResetEmail$1(auth, request) {
	return sendOobCode(auth, request);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function signInWithEmailLink$1(auth, request) {
	return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithEmailLink", _addTidIfNecessary(auth, request));
}
async function signInWithEmailLinkForLinking(auth, request) {
	return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithEmailLink", _addTidIfNecessary(auth, request));
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var EmailAuthCredential = class EmailAuthCredential extends AuthCredential {
	constructor(_email, _password, signInMethod, _tenantId = null) {
		super("password", signInMethod);
		this._email = _email;
		this._password = _password;
		this._tenantId = _tenantId;
	}
	static _fromEmailAndPassword(email, password) {
		return new EmailAuthCredential(email, password, "password");
	}
	static _fromEmailAndCode(email, oobCode, tenantId = null) {
		return new EmailAuthCredential(email, oobCode, "emailLink", tenantId);
	}
	toJSON() {
		return {
			email: this._email,
			password: this._password,
			signInMethod: this.signInMethod,
			tenantId: this._tenantId
		};
	}
	static fromJSON(json) {
		const obj = typeof json === "string" ? JSON.parse(json) : json;
		if ((obj === null || obj === void 0 ? void 0 : obj.email) && (obj === null || obj === void 0 ? void 0 : obj.password)) {
			if (obj.signInMethod === "password") return this._fromEmailAndPassword(obj.email, obj.password);
			else if (obj.signInMethod === "emailLink") return this._fromEmailAndCode(obj.email, obj.password, obj.tenantId);
		}
		return null;
	}
	async _getIdTokenResponse(auth) {
		switch (this.signInMethod) {
			case "password": return handleRecaptchaFlow(auth, {
				returnSecureToken: true,
				email: this._email,
				password: this._password,
				clientType: "CLIENT_TYPE_WEB"
			}, "signInWithPassword", signInWithPassword, "EMAIL_PASSWORD_PROVIDER");
			case "emailLink": return signInWithEmailLink$1(auth, {
				email: this._email,
				oobCode: this._password
			});
			default: _fail(auth, "internal-error");
		}
	}
	async _linkToIdToken(auth, idToken) {
		switch (this.signInMethod) {
			case "password": return handleRecaptchaFlow(auth, {
				idToken,
				returnSecureToken: true,
				email: this._email,
				password: this._password,
				clientType: "CLIENT_TYPE_WEB"
			}, "signUpPassword", linkEmailPassword, "EMAIL_PASSWORD_PROVIDER");
			case "emailLink": return signInWithEmailLinkForLinking(auth, {
				idToken,
				email: this._email,
				oobCode: this._password
			});
			default: _fail(auth, "internal-error");
		}
	}
	_getReauthenticationResolver(auth) {
		return this._getIdTokenResponse(auth);
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function signInWithIdp(auth, request) {
	return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithIdp", _addTidIfNecessary(auth, request));
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var IDP_REQUEST_URI$1 = "http://localhost";
var OAuthCredential = class OAuthCredential extends AuthCredential {
	constructor() {
		super(...arguments);
		this.pendingToken = null;
	}
	static _fromParams(params) {
		const cred = new OAuthCredential(params.providerId, params.signInMethod);
		if (params.idToken || params.accessToken) {
			if (params.idToken) cred.idToken = params.idToken;
			if (params.accessToken) cred.accessToken = params.accessToken;
			if (params.nonce && !params.pendingToken) cred.nonce = params.nonce;
			if (params.pendingToken) cred.pendingToken = params.pendingToken;
		} else if (params.oauthToken && params.oauthTokenSecret) {
			cred.accessToken = params.oauthToken;
			cred.secret = params.oauthTokenSecret;
		} else _fail("argument-error");
		return cred;
	}
	toJSON() {
		return {
			idToken: this.idToken,
			accessToken: this.accessToken,
			secret: this.secret,
			nonce: this.nonce,
			pendingToken: this.pendingToken,
			providerId: this.providerId,
			signInMethod: this.signInMethod
		};
	}
	static fromJSON(json) {
		const obj = typeof json === "string" ? JSON.parse(json) : json;
		const { providerId, signInMethod } = obj;
		const rest = __rest(obj, ["providerId", "signInMethod"]);
		if (!providerId || !signInMethod) return null;
		const cred = new OAuthCredential(providerId, signInMethod);
		cred.idToken = rest.idToken || void 0;
		cred.accessToken = rest.accessToken || void 0;
		cred.secret = rest.secret;
		cred.nonce = rest.nonce;
		cred.pendingToken = rest.pendingToken || null;
		return cred;
	}
	_getIdTokenResponse(auth) {
		return signInWithIdp(auth, this.buildRequest());
	}
	_linkToIdToken(auth, idToken) {
		const request = this.buildRequest();
		request.idToken = idToken;
		return signInWithIdp(auth, request);
	}
	_getReauthenticationResolver(auth) {
		const request = this.buildRequest();
		request.autoCreate = false;
		return signInWithIdp(auth, request);
	}
	buildRequest() {
		const request = {
			requestUri: IDP_REQUEST_URI$1,
			returnSecureToken: true
		};
		if (this.pendingToken) request.pendingToken = this.pendingToken;
		else {
			const postBody = {};
			if (this.idToken) postBody["id_token"] = this.idToken;
			if (this.accessToken) postBody["access_token"] = this.accessToken;
			if (this.secret) postBody["oauth_token_secret"] = this.secret;
			postBody["providerId"] = this.providerId;
			if (this.nonce && !this.pendingToken) postBody["nonce"] = this.nonce;
			request.postBody = querystring(postBody);
		}
		return request;
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function sendPhoneVerificationCode(auth, request) {
	return _performApiRequest(auth, "POST", "/v1/accounts:sendVerificationCode", _addTidIfNecessary(auth, request));
}
async function signInWithPhoneNumber$1(auth, request) {
	return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithPhoneNumber", _addTidIfNecessary(auth, request));
}
async function linkWithPhoneNumber$1(auth, request) {
	const response = await _performSignInRequest(auth, "POST", "/v1/accounts:signInWithPhoneNumber", _addTidIfNecessary(auth, request));
	if (response.temporaryProof) throw _makeTaggedError(auth, "account-exists-with-different-credential", response);
	return response;
}
var VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_ = { ["USER_NOT_FOUND"]: "user-not-found" };
async function verifyPhoneNumberForExisting(auth, request) {
	return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithPhoneNumber", _addTidIfNecessary(auth, Object.assign(Object.assign({}, request), { operation: "REAUTH" })), VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var PhoneAuthCredential = class PhoneAuthCredential extends AuthCredential {
	constructor(params) {
		super("phone", "phone");
		this.params = params;
	}
	static _fromVerification(verificationId, verificationCode) {
		return new PhoneAuthCredential({
			verificationId,
			verificationCode
		});
	}
	static _fromTokenResponse(phoneNumber, temporaryProof) {
		return new PhoneAuthCredential({
			phoneNumber,
			temporaryProof
		});
	}
	_getIdTokenResponse(auth) {
		return signInWithPhoneNumber$1(auth, this._makeVerificationRequest());
	}
	_linkToIdToken(auth, idToken) {
		return linkWithPhoneNumber$1(auth, Object.assign({ idToken }, this._makeVerificationRequest()));
	}
	_getReauthenticationResolver(auth) {
		return verifyPhoneNumberForExisting(auth, this._makeVerificationRequest());
	}
	_makeVerificationRequest() {
		const { temporaryProof, phoneNumber, verificationId, verificationCode } = this.params;
		if (temporaryProof && phoneNumber) return {
			temporaryProof,
			phoneNumber
		};
		return {
			sessionInfo: verificationId,
			code: verificationCode
		};
	}
	toJSON() {
		const obj = { providerId: this.providerId };
		if (this.params.phoneNumber) obj.phoneNumber = this.params.phoneNumber;
		if (this.params.temporaryProof) obj.temporaryProof = this.params.temporaryProof;
		if (this.params.verificationCode) obj.verificationCode = this.params.verificationCode;
		if (this.params.verificationId) obj.verificationId = this.params.verificationId;
		return obj;
	}
	static fromJSON(json) {
		if (typeof json === "string") json = JSON.parse(json);
		const { verificationId, verificationCode, phoneNumber, temporaryProof } = json;
		if (!verificationCode && !verificationId && !phoneNumber && !temporaryProof) return null;
		return new PhoneAuthCredential({
			verificationId,
			verificationCode,
			phoneNumber,
			temporaryProof
		});
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function parseMode(mode) {
	switch (mode) {
		case "recoverEmail": return "RECOVER_EMAIL";
		case "resetPassword": return "PASSWORD_RESET";
		case "signIn": return "EMAIL_SIGNIN";
		case "verifyEmail": return "VERIFY_EMAIL";
		case "verifyAndChangeEmail": return "VERIFY_AND_CHANGE_EMAIL";
		case "revertSecondFactorAddition": return "REVERT_SECOND_FACTOR_ADDITION";
		default: return null;
	}
}
function parseDeepLink(url) {
	const link = querystringDecode(extractQuerystring(url))["link"];
	const doubleDeepLink = link ? querystringDecode(extractQuerystring(link))["deep_link_id"] : null;
	const iOSDeepLink = querystringDecode(extractQuerystring(url))["deep_link_id"];
	return (iOSDeepLink ? querystringDecode(extractQuerystring(iOSDeepLink))["link"] : null) || iOSDeepLink || doubleDeepLink || link || url;
}
var ActionCodeURL = class ActionCodeURL {
	constructor(actionLink) {
		var _a;
		var _b;
		var _c;
		var _d;
		var _e;
		var _f;
		const searchParams = querystringDecode(extractQuerystring(actionLink));
		const apiKey = (_a = searchParams["apiKey"]) !== null && _a !== void 0 ? _a : null;
		const code = (_b = searchParams["oobCode"]) !== null && _b !== void 0 ? _b : null;
		const operation = parseMode((_c = searchParams["mode"]) !== null && _c !== void 0 ? _c : null);
		_assert(apiKey && code && operation, "argument-error");
		this.apiKey = apiKey;
		this.operation = operation;
		this.code = code;
		this.continueUrl = (_d = searchParams["continueUrl"]) !== null && _d !== void 0 ? _d : null;
		this.languageCode = (_e = searchParams["lang"]) !== null && _e !== void 0 ? _e : null;
		this.tenantId = (_f = searchParams["tenantId"]) !== null && _f !== void 0 ? _f : null;
	}
	static parseLink(link) {
		const actionLink = parseDeepLink(link);
		try {
			return new ActionCodeURL(actionLink);
		} catch (_a) {
			return null;
		}
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var EmailAuthProvider = class EmailAuthProvider {
	constructor() {
		this.providerId = EmailAuthProvider.PROVIDER_ID;
	}
	static credential(email, password) {
		return EmailAuthCredential._fromEmailAndPassword(email, password);
	}
	static credentialWithLink(email, emailLink) {
		const actionCodeUrl = ActionCodeURL.parseLink(emailLink);
		_assert(actionCodeUrl, "argument-error");
		return EmailAuthCredential._fromEmailAndCode(email, actionCodeUrl.code, actionCodeUrl.tenantId);
	}
};
EmailAuthProvider.PROVIDER_ID = "password";
EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD = "password";
EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD = "emailLink";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var FederatedAuthProvider = class {
	constructor(providerId) {
		this.providerId = providerId;
		this.defaultLanguageCode = null;
		this.customParameters = {};
	}
	setDefaultLanguage(languageCode) {
		this.defaultLanguageCode = languageCode;
	}
	setCustomParameters(customOAuthParameters) {
		this.customParameters = customOAuthParameters;
		return this;
	}
	getCustomParameters() {
		return this.customParameters;
	}
};
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var BaseOAuthProvider = class extends FederatedAuthProvider {
	constructor() {
		super(...arguments);
		this.scopes = [];
	}
	addScope(scope) {
		if (!this.scopes.includes(scope)) this.scopes.push(scope);
		return this;
	}
	getScopes() {
		return [...this.scopes];
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var FacebookAuthProvider = class FacebookAuthProvider extends BaseOAuthProvider {
	constructor() {
		super("facebook.com");
	}
	static credential(accessToken) {
		return OAuthCredential._fromParams({
			providerId: FacebookAuthProvider.PROVIDER_ID,
			signInMethod: FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD,
			accessToken
		});
	}
	static credentialFromResult(userCredential) {
		return FacebookAuthProvider.credentialFromTaggedObject(userCredential);
	}
	static credentialFromError(error) {
		return FacebookAuthProvider.credentialFromTaggedObject(error.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
		if (!tokenResponse || !("oauthAccessToken" in tokenResponse)) return null;
		if (!tokenResponse.oauthAccessToken) return null;
		try {
			return FacebookAuthProvider.credential(tokenResponse.oauthAccessToken);
		} catch (_a) {
			return null;
		}
	}
};
FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD = "facebook.com";
FacebookAuthProvider.PROVIDER_ID = "facebook.com";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var GoogleAuthProvider = class GoogleAuthProvider extends BaseOAuthProvider {
	constructor() {
		super("google.com");
		this.addScope("profile");
	}
	static credential(idToken, accessToken) {
		return OAuthCredential._fromParams({
			providerId: GoogleAuthProvider.PROVIDER_ID,
			signInMethod: GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
			idToken,
			accessToken
		});
	}
	static credentialFromResult(userCredential) {
		return GoogleAuthProvider.credentialFromTaggedObject(userCredential);
	}
	static credentialFromError(error) {
		return GoogleAuthProvider.credentialFromTaggedObject(error.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
		if (!tokenResponse) return null;
		const { oauthIdToken, oauthAccessToken } = tokenResponse;
		if (!oauthIdToken && !oauthAccessToken) return null;
		try {
			return GoogleAuthProvider.credential(oauthIdToken, oauthAccessToken);
		} catch (_a) {
			return null;
		}
	}
};
GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD = "google.com";
GoogleAuthProvider.PROVIDER_ID = "google.com";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var GithubAuthProvider = class GithubAuthProvider extends BaseOAuthProvider {
	constructor() {
		super("github.com");
	}
	static credential(accessToken) {
		return OAuthCredential._fromParams({
			providerId: GithubAuthProvider.PROVIDER_ID,
			signInMethod: GithubAuthProvider.GITHUB_SIGN_IN_METHOD,
			accessToken
		});
	}
	static credentialFromResult(userCredential) {
		return GithubAuthProvider.credentialFromTaggedObject(userCredential);
	}
	static credentialFromError(error) {
		return GithubAuthProvider.credentialFromTaggedObject(error.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
		if (!tokenResponse || !("oauthAccessToken" in tokenResponse)) return null;
		if (!tokenResponse.oauthAccessToken) return null;
		try {
			return GithubAuthProvider.credential(tokenResponse.oauthAccessToken);
		} catch (_a) {
			return null;
		}
	}
};
GithubAuthProvider.GITHUB_SIGN_IN_METHOD = "github.com";
GithubAuthProvider.PROVIDER_ID = "github.com";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var TwitterAuthProvider = class TwitterAuthProvider extends BaseOAuthProvider {
	constructor() {
		super("twitter.com");
	}
	static credential(token, secret) {
		return OAuthCredential._fromParams({
			providerId: TwitterAuthProvider.PROVIDER_ID,
			signInMethod: TwitterAuthProvider.TWITTER_SIGN_IN_METHOD,
			oauthToken: token,
			oauthTokenSecret: secret
		});
	}
	static credentialFromResult(userCredential) {
		return TwitterAuthProvider.credentialFromTaggedObject(userCredential);
	}
	static credentialFromError(error) {
		return TwitterAuthProvider.credentialFromTaggedObject(error.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
		if (!tokenResponse) return null;
		const { oauthAccessToken, oauthTokenSecret } = tokenResponse;
		if (!oauthAccessToken || !oauthTokenSecret) return null;
		try {
			return TwitterAuthProvider.credential(oauthAccessToken, oauthTokenSecret);
		} catch (_a) {
			return null;
		}
	}
};
TwitterAuthProvider.TWITTER_SIGN_IN_METHOD = "twitter.com";
TwitterAuthProvider.PROVIDER_ID = "twitter.com";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function signUp(auth, request) {
	return _performSignInRequest(auth, "POST", "/v1/accounts:signUp", _addTidIfNecessary(auth, request));
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var UserCredentialImpl = class UserCredentialImpl {
	constructor(params) {
		this.user = params.user;
		this.providerId = params.providerId;
		this._tokenResponse = params._tokenResponse;
		this.operationType = params.operationType;
	}
	static async _fromIdTokenResponse(auth, operationType, idTokenResponse, isAnonymous = false) {
		return new UserCredentialImpl({
			user: await UserImpl._fromIdTokenResponse(auth, idTokenResponse, isAnonymous),
			providerId: providerIdForResponse(idTokenResponse),
			_tokenResponse: idTokenResponse,
			operationType
		});
	}
	static async _forOperation(user, operationType, response) {
		await user._updateTokensIfNecessary(response, true);
		return new UserCredentialImpl({
			user,
			providerId: providerIdForResponse(response),
			_tokenResponse: response,
			operationType
		});
	}
};
function providerIdForResponse(response) {
	if (response.providerId) return response.providerId;
	if ("phoneNumber" in response) return "phone";
	return null;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var MultiFactorError = class MultiFactorError extends FirebaseError {
	constructor(auth, error, operationType, user) {
		var _a;
		super(error.code, error.message);
		this.operationType = operationType;
		this.user = user;
		Object.setPrototypeOf(this, MultiFactorError.prototype);
		this.customData = {
			appName: auth.name,
			tenantId: (_a = auth.tenantId) !== null && _a !== void 0 ? _a : void 0,
			_serverResponse: error.customData._serverResponse,
			operationType
		};
	}
	static _fromErrorAndOperation(auth, error, operationType, user) {
		return new MultiFactorError(auth, error, operationType, user);
	}
};
function _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential, user) {
	return (operationType === "reauthenticate" ? credential._getReauthenticationResolver(auth) : credential._getIdTokenResponse(auth)).catch((error) => {
		if (error.code === `auth/multi-factor-auth-required`) throw MultiFactorError._fromErrorAndOperation(auth, error, operationType, user);
		throw error;
	});
}
async function _link$1(user, credential, bypassAuthState = false) {
	const response = await _logoutIfInvalidated(user, credential._linkToIdToken(user.auth, await user.getIdToken()), bypassAuthState);
	return UserCredentialImpl._forOperation(user, "link", response);
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function _reauthenticate(user, credential, bypassAuthState = false) {
	const { auth } = user;
	if (_isFirebaseServerApp(auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth));
	const operationType = "reauthenticate";
	try {
		const response = await _logoutIfInvalidated(user, _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential, user), bypassAuthState);
		_assert(response.idToken, auth, "internal-error");
		const parsed = _parseToken(response.idToken);
		_assert(parsed, auth, "internal-error");
		const { sub: localId } = parsed;
		_assert(user.uid === localId, auth, "user-mismatch");
		return UserCredentialImpl._forOperation(user, operationType, response);
	} catch (e) {
		if ((e === null || e === void 0 ? void 0 : e.code) === `auth/user-not-found`) _fail(auth, "user-mismatch");
		throw e;
	}
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function _signInWithCredential(auth, credential, bypassAuthState = false) {
	if (_isFirebaseServerApp(auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth));
	const operationType = "signIn";
	const response = await _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential);
	const userCredential = await UserCredentialImpl._fromIdTokenResponse(auth, operationType, response);
	if (!bypassAuthState) await auth._updateCurrentUser(userCredential.user);
	return userCredential;
}
async function signInWithCredential(auth, credential) {
	return _signInWithCredential(_castAuth(auth), credential);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _setActionCodeSettingsOnRequest(auth, request, actionCodeSettings) {
	var _a;
	_assert(((_a = actionCodeSettings.url) === null || _a === void 0 ? void 0 : _a.length) > 0, auth, "invalid-continue-uri");
	_assert(typeof actionCodeSettings.dynamicLinkDomain === "undefined" || actionCodeSettings.dynamicLinkDomain.length > 0, auth, "invalid-dynamic-link-domain");
	_assert(typeof actionCodeSettings.linkDomain === "undefined" || actionCodeSettings.linkDomain.length > 0, auth, "invalid-hosting-link-domain");
	request.continueUrl = actionCodeSettings.url;
	request.dynamicLinkDomain = actionCodeSettings.dynamicLinkDomain;
	request.linkDomain = actionCodeSettings.linkDomain;
	request.canHandleCodeInApp = actionCodeSettings.handleCodeInApp;
	if (actionCodeSettings.iOS) {
		_assert(actionCodeSettings.iOS.bundleId.length > 0, auth, "missing-ios-bundle-id");
		request.iOSBundleId = actionCodeSettings.iOS.bundleId;
	}
	if (actionCodeSettings.android) {
		_assert(actionCodeSettings.android.packageName.length > 0, auth, "missing-android-pkg-name");
		request.androidInstallApp = actionCodeSettings.android.installApp;
		request.androidMinimumVersionCode = actionCodeSettings.android.minimumVersion;
		request.androidPackageName = actionCodeSettings.android.packageName;
	}
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function recachePasswordPolicy(auth) {
	const authInternal = _castAuth(auth);
	if (authInternal._getPasswordPolicyInternal()) await authInternal._updatePasswordPolicy();
}
async function sendPasswordResetEmail(auth, email, actionCodeSettings) {
	const authInternal = _castAuth(auth);
	const request = {
		requestType: "PASSWORD_RESET",
		email,
		clientType: "CLIENT_TYPE_WEB"
	};
	if (actionCodeSettings) _setActionCodeSettingsOnRequest(authInternal, request, actionCodeSettings);
	await handleRecaptchaFlow(authInternal, request, "getOobCode", sendPasswordResetEmail$1, "EMAIL_PASSWORD_PROVIDER");
}
async function createUserWithEmailAndPassword(auth, email, password) {
	if (_isFirebaseServerApp(auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth));
	const authInternal = _castAuth(auth);
	const response = await handleRecaptchaFlow(authInternal, {
		returnSecureToken: true,
		email,
		password,
		clientType: "CLIENT_TYPE_WEB"
	}, "signUpPassword", signUp, "EMAIL_PASSWORD_PROVIDER").catch((error) => {
		if (error.code === `auth/password-does-not-meet-requirements`) recachePasswordPolicy(auth);
		throw error;
	});
	const userCredential = await UserCredentialImpl._fromIdTokenResponse(authInternal, "signIn", response);
	await authInternal._updateCurrentUser(userCredential.user);
	return userCredential;
}
function signInWithEmailAndPassword(auth, email, password) {
	if (_isFirebaseServerApp(auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth));
	return signInWithCredential(getModularInstance(auth), EmailAuthProvider.credential(email, password)).catch(async (error) => {
		if (error.code === `auth/password-does-not-meet-requirements`) recachePasswordPolicy(auth);
		throw error;
	});
}
function updatePassword(user, newPassword) {
	return updateEmailOrPassword(getModularInstance(user), null, newPassword);
}
async function updateEmailOrPassword(user, email, password) {
	const { auth } = user;
	const request = {
		idToken: await user.getIdToken(),
		returnSecureToken: true
	};
	if (email) request.email = email;
	if (password) request.password = password;
	const response = await _logoutIfInvalidated(user, updateEmailPassword(auth, request));
	await user._updateTokensIfNecessary(response, true);
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _fromIdTokenResponse(idTokenResponse) {
	var _a;
	var _b;
	if (!idTokenResponse) return null;
	const { providerId } = idTokenResponse;
	const profile = idTokenResponse.rawUserInfo ? JSON.parse(idTokenResponse.rawUserInfo) : {};
	const isNewUser = idTokenResponse.isNewUser || idTokenResponse.kind === "identitytoolkit#SignupNewUserResponse";
	if (!providerId && (idTokenResponse === null || idTokenResponse === void 0 ? void 0 : idTokenResponse.idToken)) {
		const signInProvider = (_b = (_a = _parseToken(idTokenResponse.idToken)) === null || _a === void 0 ? void 0 : _a.firebase) === null || _b === void 0 ? void 0 : _b["sign_in_provider"];
		if (signInProvider) return new GenericAdditionalUserInfo(isNewUser, signInProvider !== "anonymous" && signInProvider !== "custom" ? signInProvider : null);
	}
	if (!providerId) return null;
	switch (providerId) {
		case "facebook.com": return new FacebookAdditionalUserInfo(isNewUser, profile);
		case "github.com": return new GithubAdditionalUserInfo(isNewUser, profile);
		case "google.com": return new GoogleAdditionalUserInfo(isNewUser, profile);
		case "twitter.com": return new TwitterAdditionalUserInfo(isNewUser, profile, idTokenResponse.screenName || null);
		case "custom":
		case "anonymous": return new GenericAdditionalUserInfo(isNewUser, null);
		default: return new GenericAdditionalUserInfo(isNewUser, providerId, profile);
	}
}
var GenericAdditionalUserInfo = class {
	constructor(isNewUser, providerId, profile = {}) {
		this.isNewUser = isNewUser;
		this.providerId = providerId;
		this.profile = profile;
	}
};
var FederatedAdditionalUserInfoWithUsername = class extends GenericAdditionalUserInfo {
	constructor(isNewUser, providerId, profile, username) {
		super(isNewUser, providerId, profile);
		this.username = username;
	}
};
var FacebookAdditionalUserInfo = class extends GenericAdditionalUserInfo {
	constructor(isNewUser, profile) {
		super(isNewUser, "facebook.com", profile);
	}
};
var GithubAdditionalUserInfo = class extends FederatedAdditionalUserInfoWithUsername {
	constructor(isNewUser, profile) {
		super(isNewUser, "github.com", profile, typeof (profile === null || profile === void 0 ? void 0 : profile.login) === "string" ? profile === null || profile === void 0 ? void 0 : profile.login : null);
	}
};
var GoogleAdditionalUserInfo = class extends GenericAdditionalUserInfo {
	constructor(isNewUser, profile) {
		super(isNewUser, "google.com", profile);
	}
};
var TwitterAdditionalUserInfo = class extends FederatedAdditionalUserInfoWithUsername {
	constructor(isNewUser, profile, screenName) {
		super(isNewUser, "twitter.com", profile, screenName);
	}
};
function getAdditionalUserInfo(userCredential) {
	const { user, _tokenResponse } = userCredential;
	if (user.isAnonymous && !_tokenResponse) return {
		providerId: null,
		isNewUser: false,
		profile: null
	};
	return _fromIdTokenResponse(_tokenResponse);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function setPersistence(auth, persistence) {
	return getModularInstance(auth).setPersistence(persistence);
}
function onIdTokenChanged(auth, nextOrObserver, error, completed) {
	return getModularInstance(auth).onIdTokenChanged(nextOrObserver, error, completed);
}
function beforeAuthStateChanged(auth, callback, onAbort) {
	return getModularInstance(auth).beforeAuthStateChanged(callback, onAbort);
}
function onAuthStateChanged(auth, nextOrObserver, error, completed) {
	return getModularInstance(auth).onAuthStateChanged(nextOrObserver, error, completed);
}
function signOut(auth) {
	return getModularInstance(auth).signOut();
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function startEnrollPhoneMfa(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts/mfaEnrollment:start", _addTidIfNecessary(auth, request));
}
function finalizeEnrollPhoneMfa(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts/mfaEnrollment:finalize", _addTidIfNecessary(auth, request));
}
function startEnrollTotpMfa(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts/mfaEnrollment:start", _addTidIfNecessary(auth, request));
}
function finalizeEnrollTotpMfa(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts/mfaEnrollment:finalize", _addTidIfNecessary(auth, request));
}
var STORAGE_AVAILABLE_KEY = "__sak";
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var BrowserPersistenceClass = class {
	constructor(storageRetriever, type) {
		this.storageRetriever = storageRetriever;
		this.type = type;
	}
	_isAvailable() {
		try {
			if (!this.storage) return Promise.resolve(false);
			this.storage.setItem(STORAGE_AVAILABLE_KEY, "1");
			this.storage.removeItem(STORAGE_AVAILABLE_KEY);
			return Promise.resolve(true);
		} catch (_a) {
			return Promise.resolve(false);
		}
	}
	_set(key, value) {
		this.storage.setItem(key, JSON.stringify(value));
		return Promise.resolve();
	}
	_get(key) {
		const json = this.storage.getItem(key);
		return Promise.resolve(json ? JSON.parse(json) : null);
	}
	_remove(key) {
		this.storage.removeItem(key);
		return Promise.resolve();
	}
	get storage() {
		return this.storageRetriever();
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var _POLLING_INTERVAL_MS$1 = 1e3;
var IE10_LOCAL_STORAGE_SYNC_DELAY = 10;
var BrowserLocalPersistence = class extends BrowserPersistenceClass {
	constructor() {
		super(() => window.localStorage, "LOCAL");
		this.boundEventHandler = (event, poll) => this.onStorageEvent(event, poll);
		this.listeners = {};
		this.localCache = {};
		this.pollTimer = null;
		this.fallbackToPolling = _isMobileBrowser();
		this._shouldAllowMigration = true;
	}
	forAllChangedKeys(cb) {
		for (const key of Object.keys(this.listeners)) {
			const newValue = this.storage.getItem(key);
			const oldValue = this.localCache[key];
			if (newValue !== oldValue) cb(key, oldValue, newValue);
		}
	}
	onStorageEvent(event, poll = false) {
		if (!event.key) {
			this.forAllChangedKeys((key, _oldValue, newValue) => {
				this.notifyListeners(key, newValue);
			});
			return;
		}
		const key = event.key;
		if (poll) this.detachListener();
		else this.stopPolling();
		const triggerListeners = () => {
			const storedValue = this.storage.getItem(key);
			if (!poll && this.localCache[key] === storedValue) return;
			this.notifyListeners(key, storedValue);
		};
		const storedValue = this.storage.getItem(key);
		if (_isIE10() && storedValue !== event.newValue && event.newValue !== event.oldValue) setTimeout(triggerListeners, IE10_LOCAL_STORAGE_SYNC_DELAY);
		else triggerListeners();
	}
	notifyListeners(key, value) {
		this.localCache[key] = value;
		const listeners = this.listeners[key];
		if (listeners) for (const listener of Array.from(listeners)) listener(value ? JSON.parse(value) : value);
	}
	startPolling() {
		this.stopPolling();
		this.pollTimer = setInterval(() => {
			this.forAllChangedKeys((key, oldValue, newValue) => {
				this.onStorageEvent(new StorageEvent("storage", {
					key,
					oldValue,
					newValue
				}), true);
			});
		}, _POLLING_INTERVAL_MS$1);
	}
	stopPolling() {
		if (this.pollTimer) {
			clearInterval(this.pollTimer);
			this.pollTimer = null;
		}
	}
	attachListener() {
		window.addEventListener("storage", this.boundEventHandler);
	}
	detachListener() {
		window.removeEventListener("storage", this.boundEventHandler);
	}
	_addListener(key, listener) {
		if (Object.keys(this.listeners).length === 0) if (this.fallbackToPolling) this.startPolling();
		else this.attachListener();
		if (!this.listeners[key]) {
			this.listeners[key] = /* @__PURE__ */ new Set();
			this.localCache[key] = this.storage.getItem(key);
		}
		this.listeners[key].add(listener);
	}
	_removeListener(key, listener) {
		if (this.listeners[key]) {
			this.listeners[key].delete(listener);
			if (this.listeners[key].size === 0) delete this.listeners[key];
		}
		if (Object.keys(this.listeners).length === 0) {
			this.detachListener();
			this.stopPolling();
		}
	}
	async _set(key, value) {
		await super._set(key, value);
		this.localCache[key] = JSON.stringify(value);
	}
	async _get(key) {
		const value = await super._get(key);
		this.localCache[key] = JSON.stringify(value);
		return value;
	}
	async _remove(key) {
		await super._remove(key);
		delete this.localCache[key];
	}
};
BrowserLocalPersistence.type = "LOCAL";
var browserLocalPersistence = BrowserLocalPersistence;
/**
* @license
* Copyright 2025 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var POLLING_INTERVAL_MS = 1e3;
function getDocumentCookie(name) {
	var _a;
	var _b;
	const escapedName = name.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
	const matcher = RegExp(`${escapedName}=([^;]+)`);
	return (_b = (_a = document.cookie.match(matcher)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : null;
}
function getCookieName(key) {
	return `${window.location.protocol === "http:" ? "__dev_" : "__HOST-"}FIREBASE_${key.split(":")[3]}`;
}
var CookiePersistence = class {
	constructor() {
		this.type = "COOKIE";
		this.listenerUnsubscribes = /* @__PURE__ */ new Map();
	}
	_getFinalTarget(originalUrl) {
		const url = new URL(`${window.location.origin}/__cookies__`);
		url.searchParams.set("finalTarget", originalUrl);
		return url;
	}
	async _isAvailable() {
		var _a;
		if (typeof isSecureContext === "boolean" && !isSecureContext) return false;
		if (typeof navigator === "undefined" || typeof document === "undefined") return false;
		return (_a = navigator.cookieEnabled) !== null && _a !== void 0 ? _a : true;
	}
	async _set(_key, _value) {}
	async _get(key) {
		if (!this._isAvailable()) return null;
		const name = getCookieName(key);
		if (window.cookieStore) {
			const cookie = await window.cookieStore.get(name);
			return cookie === null || cookie === void 0 ? void 0 : cookie.value;
		}
		return getDocumentCookie(name);
	}
	async _remove(key) {
		if (!this._isAvailable()) return;
		if (!await this._get(key)) return;
		const name = getCookieName(key);
		document.cookie = `${name}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`;
		await fetch(`/__cookies__`, { method: "DELETE" }).catch(() => void 0);
	}
	_addListener(key, listener) {
		if (!this._isAvailable()) return;
		const name = getCookieName(key);
		if (window.cookieStore) {
			const cb = ((event) => {
				const changedCookie = event.changed.find((change) => change.name === name);
				if (changedCookie) listener(changedCookie.value);
				if (event.deleted.find((change) => change.name === name)) listener(null);
			});
			const unsubscribe = () => window.cookieStore.removeEventListener("change", cb);
			this.listenerUnsubscribes.set(listener, unsubscribe);
			return window.cookieStore.addEventListener("change", cb);
		}
		let lastValue = getDocumentCookie(name);
		const interval = setInterval(() => {
			const currentValue = getDocumentCookie(name);
			if (currentValue !== lastValue) {
				listener(currentValue);
				lastValue = currentValue;
			}
		}, POLLING_INTERVAL_MS);
		const unsubscribe = () => clearInterval(interval);
		this.listenerUnsubscribes.set(listener, unsubscribe);
	}
	_removeListener(_key, listener) {
		const unsubscribe = this.listenerUnsubscribes.get(listener);
		if (!unsubscribe) return;
		unsubscribe();
		this.listenerUnsubscribes.delete(listener);
	}
};
CookiePersistence.type = "COOKIE";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var BrowserSessionPersistence = class extends BrowserPersistenceClass {
	constructor() {
		super(() => window.sessionStorage, "SESSION");
	}
	_addListener(_key, _listener) {}
	_removeListener(_key, _listener) {}
};
BrowserSessionPersistence.type = "SESSION";
var browserSessionPersistence = BrowserSessionPersistence;
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _allSettled(promises) {
	return Promise.all(promises.map(async (promise) => {
		try {
			return {
				fulfilled: true,
				value: await promise
			};
		} catch (reason) {
			return {
				fulfilled: false,
				reason
			};
		}
	}));
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Receiver = class Receiver {
	constructor(eventTarget) {
		this.eventTarget = eventTarget;
		this.handlersMap = {};
		this.boundEventHandler = this.handleEvent.bind(this);
	}
	static _getInstance(eventTarget) {
		const existingInstance = this.receivers.find((receiver) => receiver.isListeningto(eventTarget));
		if (existingInstance) return existingInstance;
		const newInstance = new Receiver(eventTarget);
		this.receivers.push(newInstance);
		return newInstance;
	}
	isListeningto(eventTarget) {
		return this.eventTarget === eventTarget;
	}
	async handleEvent(event) {
		const messageEvent = event;
		const { eventId, eventType, data } = messageEvent.data;
		const handlers = this.handlersMap[eventType];
		if (!(handlers === null || handlers === void 0 ? void 0 : handlers.size)) return;
		messageEvent.ports[0].postMessage({
			status: "ack",
			eventId,
			eventType
		});
		const response = await _allSettled(Array.from(handlers).map(async (handler) => handler(messageEvent.origin, data)));
		messageEvent.ports[0].postMessage({
			status: "done",
			eventId,
			eventType,
			response
		});
	}
	_subscribe(eventType, eventHandler) {
		if (Object.keys(this.handlersMap).length === 0) this.eventTarget.addEventListener("message", this.boundEventHandler);
		if (!this.handlersMap[eventType]) this.handlersMap[eventType] = /* @__PURE__ */ new Set();
		this.handlersMap[eventType].add(eventHandler);
	}
	_unsubscribe(eventType, eventHandler) {
		if (this.handlersMap[eventType] && eventHandler) this.handlersMap[eventType].delete(eventHandler);
		if (!eventHandler || this.handlersMap[eventType].size === 0) delete this.handlersMap[eventType];
		if (Object.keys(this.handlersMap).length === 0) this.eventTarget.removeEventListener("message", this.boundEventHandler);
	}
};
Receiver.receivers = [];
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _generateEventId(prefix = "", digits = 10) {
	let random = "";
	for (let i = 0; i < digits; i++) random += Math.floor(Math.random() * 10);
	return prefix + random;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Sender = class {
	constructor(target) {
		this.target = target;
		this.handlers = /* @__PURE__ */ new Set();
	}
	removeMessageHandler(handler) {
		if (handler.messageChannel) {
			handler.messageChannel.port1.removeEventListener("message", handler.onMessage);
			handler.messageChannel.port1.close();
		}
		this.handlers.delete(handler);
	}
	async _send(eventType, data, timeout = 50) {
		const messageChannel = typeof MessageChannel !== "undefined" ? new MessageChannel() : null;
		if (!messageChannel) throw new Error("connection_unavailable");
		let completionTimer;
		let handler;
		return new Promise((resolve, reject) => {
			const eventId = _generateEventId("", 20);
			messageChannel.port1.start();
			const ackTimer = setTimeout(() => {
				reject(/* @__PURE__ */ new Error("unsupported_event"));
			}, timeout);
			handler = {
				messageChannel,
				onMessage(event) {
					const messageEvent = event;
					if (messageEvent.data.eventId !== eventId) return;
					switch (messageEvent.data.status) {
						case "ack":
							clearTimeout(ackTimer);
							completionTimer = setTimeout(() => {
								reject(/* @__PURE__ */ new Error("timeout"));
							}, 3e3);
							break;
						case "done":
							clearTimeout(completionTimer);
							resolve(messageEvent.data.response);
							break;
						default:
							clearTimeout(ackTimer);
							clearTimeout(completionTimer);
							reject(/* @__PURE__ */ new Error("invalid_response"));
							break;
					}
				}
			};
			this.handlers.add(handler);
			messageChannel.port1.addEventListener("message", handler.onMessage);
			this.target.postMessage({
				eventType,
				eventId,
				data
			}, [messageChannel.port2]);
		}).finally(() => {
			if (handler) this.removeMessageHandler(handler);
		});
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _window() {
	return window;
}
function _setWindowLocation(url) {
	_window().location.href = url;
}
/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _isWorker() {
	return typeof _window()["WorkerGlobalScope"] !== "undefined" && typeof _window()["importScripts"] === "function";
}
async function _getActiveServiceWorker() {
	if (!(navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker)) return null;
	try {
		return (await navigator.serviceWorker.ready).active;
	} catch (_a) {
		return null;
	}
}
function _getServiceWorkerController() {
	var _a;
	return ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker) === null || _a === void 0 ? void 0 : _a.controller) || null;
}
function _getWorkerGlobalScope() {
	return _isWorker() ? self : null;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var DB_NAME$1 = "firebaseLocalStorageDb";
var DB_VERSION$1 = 1;
var DB_OBJECTSTORE_NAME = "firebaseLocalStorage";
var DB_DATA_KEYPATH = "fbase_key";
var DBPromise = class {
	constructor(request) {
		this.request = request;
	}
	toPromise() {
		return new Promise((resolve, reject) => {
			this.request.addEventListener("success", () => {
				resolve(this.request.result);
			});
			this.request.addEventListener("error", () => {
				reject(this.request.error);
			});
		});
	}
};
function getObjectStore(db, isReadWrite) {
	return db.transaction([DB_OBJECTSTORE_NAME], isReadWrite ? "readwrite" : "readonly").objectStore(DB_OBJECTSTORE_NAME);
}
function _deleteDatabase() {
	return new DBPromise(indexedDB.deleteDatabase(DB_NAME$1)).toPromise();
}
function _openDatabase() {
	const request = indexedDB.open(DB_NAME$1, DB_VERSION$1);
	return new Promise((resolve, reject) => {
		request.addEventListener("error", () => {
			reject(request.error);
		});
		request.addEventListener("upgradeneeded", () => {
			const db = request.result;
			try {
				db.createObjectStore(DB_OBJECTSTORE_NAME, { keyPath: DB_DATA_KEYPATH });
			} catch (e) {
				reject(e);
			}
		});
		request.addEventListener("success", async () => {
			const db = request.result;
			if (!db.objectStoreNames.contains(DB_OBJECTSTORE_NAME)) {
				db.close();
				await _deleteDatabase();
				resolve(await _openDatabase());
			} else resolve(db);
		});
	});
}
async function _putObject(db, key, value) {
	return new DBPromise(getObjectStore(db, true).put({
		[DB_DATA_KEYPATH]: key,
		value
	})).toPromise();
}
async function getObject(db, key) {
	const data = await new DBPromise(getObjectStore(db, false).get(key)).toPromise();
	return data === void 0 ? null : data.value;
}
function _deleteObject(db, key) {
	return new DBPromise(getObjectStore(db, true).delete(key)).toPromise();
}
var _POLLING_INTERVAL_MS = 800;
var _TRANSACTION_RETRY_COUNT = 3;
var IndexedDBLocalPersistence = class {
	constructor() {
		this.type = "LOCAL";
		this._shouldAllowMigration = true;
		this.listeners = {};
		this.localCache = {};
		this.pollTimer = null;
		this.pendingWrites = 0;
		this.receiver = null;
		this.sender = null;
		this.serviceWorkerReceiverAvailable = false;
		this.activeServiceWorker = null;
		this._workerInitializationPromise = this.initializeServiceWorkerMessaging().then(() => {}, () => {});
	}
	async _openDb() {
		if (this.db) return this.db;
		this.db = await _openDatabase();
		return this.db;
	}
	async _withRetries(op) {
		let numAttempts = 0;
		while (true) try {
			return await op(await this._openDb());
		} catch (e) {
			if (numAttempts++ > _TRANSACTION_RETRY_COUNT) throw e;
			if (this.db) {
				this.db.close();
				this.db = void 0;
			}
		}
	}
	async initializeServiceWorkerMessaging() {
		return _isWorker() ? this.initializeReceiver() : this.initializeSender();
	}
	async initializeReceiver() {
		this.receiver = Receiver._getInstance(_getWorkerGlobalScope());
		this.receiver._subscribe("keyChanged", async (_origin, data) => {
			return { keyProcessed: (await this._poll()).includes(data.key) };
		});
		this.receiver._subscribe("ping", async (_origin, _data) => {
			return ["keyChanged"];
		});
	}
	async initializeSender() {
		var _a;
		var _b;
		this.activeServiceWorker = await _getActiveServiceWorker();
		if (!this.activeServiceWorker) return;
		this.sender = new Sender(this.activeServiceWorker);
		const results = await this.sender._send("ping", {}, 800);
		if (!results) return;
		if (((_a = results[0]) === null || _a === void 0 ? void 0 : _a.fulfilled) && ((_b = results[0]) === null || _b === void 0 ? void 0 : _b.value.includes("keyChanged"))) this.serviceWorkerReceiverAvailable = true;
	}
	async notifyServiceWorker(key) {
		if (!this.sender || !this.activeServiceWorker || _getServiceWorkerController() !== this.activeServiceWorker) return;
		try {
			await this.sender._send("keyChanged", { key }, this.serviceWorkerReceiverAvailable ? 800 : 50);
		} catch (_a) {}
	}
	async _isAvailable() {
		try {
			if (!indexedDB) return false;
			const db = await _openDatabase();
			await _putObject(db, STORAGE_AVAILABLE_KEY, "1");
			await _deleteObject(db, STORAGE_AVAILABLE_KEY);
			return true;
		} catch (_a) {}
		return false;
	}
	async _withPendingWrite(write) {
		this.pendingWrites++;
		try {
			await write();
		} finally {
			this.pendingWrites--;
		}
	}
	async _set(key, value) {
		return this._withPendingWrite(async () => {
			await this._withRetries((db) => _putObject(db, key, value));
			this.localCache[key] = value;
			return this.notifyServiceWorker(key);
		});
	}
	async _get(key) {
		const obj = await this._withRetries((db) => getObject(db, key));
		this.localCache[key] = obj;
		return obj;
	}
	async _remove(key) {
		return this._withPendingWrite(async () => {
			await this._withRetries((db) => _deleteObject(db, key));
			delete this.localCache[key];
			return this.notifyServiceWorker(key);
		});
	}
	async _poll() {
		const result = await this._withRetries((db) => {
			return new DBPromise(getObjectStore(db, false).getAll()).toPromise();
		});
		if (!result) return [];
		if (this.pendingWrites !== 0) return [];
		const keys = [];
		const keysInResult = /* @__PURE__ */ new Set();
		if (result.length !== 0) for (const { fbase_key: key, value } of result) {
			keysInResult.add(key);
			if (JSON.stringify(this.localCache[key]) !== JSON.stringify(value)) {
				this.notifyListeners(key, value);
				keys.push(key);
			}
		}
		for (const localKey of Object.keys(this.localCache)) if (this.localCache[localKey] && !keysInResult.has(localKey)) {
			this.notifyListeners(localKey, null);
			keys.push(localKey);
		}
		return keys;
	}
	notifyListeners(key, newValue) {
		this.localCache[key] = newValue;
		const listeners = this.listeners[key];
		if (listeners) for (const listener of Array.from(listeners)) listener(newValue);
	}
	startPolling() {
		this.stopPolling();
		this.pollTimer = setInterval(async () => this._poll(), _POLLING_INTERVAL_MS);
	}
	stopPolling() {
		if (this.pollTimer) {
			clearInterval(this.pollTimer);
			this.pollTimer = null;
		}
	}
	_addListener(key, listener) {
		if (Object.keys(this.listeners).length === 0) this.startPolling();
		if (!this.listeners[key]) {
			this.listeners[key] = /* @__PURE__ */ new Set();
			this._get(key);
		}
		this.listeners[key].add(listener);
	}
	_removeListener(key, listener) {
		if (this.listeners[key]) {
			this.listeners[key].delete(listener);
			if (this.listeners[key].size === 0) delete this.listeners[key];
		}
		if (Object.keys(this.listeners).length === 0) this.stopPolling();
	}
};
IndexedDBLocalPersistence.type = "LOCAL";
var indexedDBLocalPersistence = IndexedDBLocalPersistence;
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function startSignInPhoneMfa(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts/mfaSignIn:start", _addTidIfNecessary(auth, request));
}
function finalizeSignInPhoneMfa(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts/mfaSignIn:finalize", _addTidIfNecessary(auth, request));
}
function finalizeSignInTotpMfa(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts/mfaSignIn:finalize", _addTidIfNecessary(auth, request));
}
_generateCallbackName("rcb");
new Delay(3e4, 6e4);
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var RECAPTCHA_VERIFIER_TYPE = "recaptcha";
async function _verifyPhoneNumber(auth, options, verifier) {
	var _a;
	if (!auth._getRecaptchaConfig()) try {
		await _initializeRecaptchaConfig(auth);
	} catch (error) {}
	try {
		let phoneInfoOptions;
		if (typeof options === "string") phoneInfoOptions = { phoneNumber: options };
		else phoneInfoOptions = options;
		if ("session" in phoneInfoOptions) {
			const session = phoneInfoOptions.session;
			if ("phoneNumber" in phoneInfoOptions) {
				_assert(session.type === "enroll", auth, "internal-error");
				const startPhoneMfaEnrollmentRequest = {
					idToken: session.credential,
					phoneEnrollmentInfo: {
						phoneNumber: phoneInfoOptions.phoneNumber,
						clientType: "CLIENT_TYPE_WEB"
					}
				};
				const startEnrollPhoneMfaActionCallback = async (authInstance, request) => {
					if (request.phoneEnrollmentInfo.captchaResponse === FAKE_TOKEN) {
						_assert((verifier === null || verifier === void 0 ? void 0 : verifier.type) === RECAPTCHA_VERIFIER_TYPE, authInstance, "argument-error");
						return startEnrollPhoneMfa(authInstance, await injectRecaptchaV2Token(authInstance, request, verifier));
					}
					return startEnrollPhoneMfa(authInstance, request);
				};
				return (await handleRecaptchaFlow(auth, startPhoneMfaEnrollmentRequest, "mfaSmsEnrollment", startEnrollPhoneMfaActionCallback, "PHONE_PROVIDER").catch((error) => {
					return Promise.reject(error);
				})).phoneSessionInfo.sessionInfo;
			} else {
				_assert(session.type === "signin", auth, "internal-error");
				const mfaEnrollmentId = ((_a = phoneInfoOptions.multiFactorHint) === null || _a === void 0 ? void 0 : _a.uid) || phoneInfoOptions.multiFactorUid;
				_assert(mfaEnrollmentId, auth, "missing-multi-factor-info");
				const startPhoneMfaSignInRequest = {
					mfaPendingCredential: session.credential,
					mfaEnrollmentId,
					phoneSignInInfo: { clientType: "CLIENT_TYPE_WEB" }
				};
				const startSignInPhoneMfaActionCallback = async (authInstance, request) => {
					if (request.phoneSignInInfo.captchaResponse === FAKE_TOKEN) {
						_assert((verifier === null || verifier === void 0 ? void 0 : verifier.type) === RECAPTCHA_VERIFIER_TYPE, authInstance, "argument-error");
						return startSignInPhoneMfa(authInstance, await injectRecaptchaV2Token(authInstance, request, verifier));
					}
					return startSignInPhoneMfa(authInstance, request);
				};
				return (await handleRecaptchaFlow(auth, startPhoneMfaSignInRequest, "mfaSmsSignIn", startSignInPhoneMfaActionCallback, "PHONE_PROVIDER").catch((error) => {
					return Promise.reject(error);
				})).phoneResponseInfo.sessionInfo;
			}
		} else {
			const sendPhoneVerificationCodeRequest = {
				phoneNumber: phoneInfoOptions.phoneNumber,
				clientType: "CLIENT_TYPE_WEB"
			};
			const sendPhoneVerificationCodeActionCallback = async (authInstance, request) => {
				if (request.captchaResponse === FAKE_TOKEN) {
					_assert((verifier === null || verifier === void 0 ? void 0 : verifier.type) === RECAPTCHA_VERIFIER_TYPE, authInstance, "argument-error");
					return sendPhoneVerificationCode(authInstance, await injectRecaptchaV2Token(authInstance, request, verifier));
				}
				return sendPhoneVerificationCode(authInstance, request);
			};
			return (await handleRecaptchaFlow(auth, sendPhoneVerificationCodeRequest, "sendVerificationCode", sendPhoneVerificationCodeActionCallback, "PHONE_PROVIDER").catch((error) => {
				return Promise.reject(error);
			})).sessionInfo;
		}
	} finally {
		verifier === null || verifier === void 0 || verifier._reset();
	}
}
async function injectRecaptchaV2Token(auth, request, recaptchaV2Verifier) {
	_assert(recaptchaV2Verifier.type === RECAPTCHA_VERIFIER_TYPE, auth, "argument-error");
	const recaptchaV2Token = await recaptchaV2Verifier.verify();
	_assert(typeof recaptchaV2Token === "string", auth, "argument-error");
	const newRequest = Object.assign({}, request);
	if ("phoneEnrollmentInfo" in newRequest) {
		const phoneNumber = newRequest.phoneEnrollmentInfo.phoneNumber;
		const captchaResponse = newRequest.phoneEnrollmentInfo.captchaResponse;
		const clientType = newRequest.phoneEnrollmentInfo.clientType;
		const recaptchaVersion = newRequest.phoneEnrollmentInfo.recaptchaVersion;
		Object.assign(newRequest, { "phoneEnrollmentInfo": {
			phoneNumber,
			recaptchaToken: recaptchaV2Token,
			captchaResponse,
			clientType,
			recaptchaVersion
		} });
		return newRequest;
	} else if ("phoneSignInInfo" in newRequest) {
		const captchaResponse = newRequest.phoneSignInInfo.captchaResponse;
		const clientType = newRequest.phoneSignInInfo.clientType;
		const recaptchaVersion = newRequest.phoneSignInInfo.recaptchaVersion;
		Object.assign(newRequest, { "phoneSignInInfo": {
			recaptchaToken: recaptchaV2Token,
			captchaResponse,
			clientType,
			recaptchaVersion
		} });
		return newRequest;
	} else {
		Object.assign(newRequest, { "recaptchaToken": recaptchaV2Token });
		return newRequest;
	}
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var PhoneAuthProvider = class PhoneAuthProvider {
	constructor(auth) {
		this.providerId = PhoneAuthProvider.PROVIDER_ID;
		this.auth = _castAuth(auth);
	}
	verifyPhoneNumber(phoneOptions, applicationVerifier) {
		return _verifyPhoneNumber(this.auth, phoneOptions, getModularInstance(applicationVerifier));
	}
	static credential(verificationId, verificationCode) {
		return PhoneAuthCredential._fromVerification(verificationId, verificationCode);
	}
	static credentialFromResult(userCredential) {
		const credential = userCredential;
		return PhoneAuthProvider.credentialFromTaggedObject(credential);
	}
	static credentialFromError(error) {
		return PhoneAuthProvider.credentialFromTaggedObject(error.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
		if (!tokenResponse) return null;
		const { phoneNumber, temporaryProof } = tokenResponse;
		if (phoneNumber && temporaryProof) return PhoneAuthCredential._fromTokenResponse(phoneNumber, temporaryProof);
		return null;
	}
};
PhoneAuthProvider.PROVIDER_ID = "phone";
PhoneAuthProvider.PHONE_SIGN_IN_METHOD = "phone";
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _withDefaultResolver(auth, resolverOverride) {
	if (resolverOverride) return _getInstance(resolverOverride);
	_assert(auth._popupRedirectResolver, auth, "argument-error");
	return auth._popupRedirectResolver;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var IdpCredential = class extends AuthCredential {
	constructor(params) {
		super("custom", "custom");
		this.params = params;
	}
	_getIdTokenResponse(auth) {
		return signInWithIdp(auth, this._buildIdpRequest());
	}
	_linkToIdToken(auth, idToken) {
		return signInWithIdp(auth, this._buildIdpRequest(idToken));
	}
	_getReauthenticationResolver(auth) {
		return signInWithIdp(auth, this._buildIdpRequest());
	}
	_buildIdpRequest(idToken) {
		const request = {
			requestUri: this.params.requestUri,
			sessionId: this.params.sessionId,
			postBody: this.params.postBody,
			tenantId: this.params.tenantId,
			pendingToken: this.params.pendingToken,
			returnSecureToken: true,
			returnIdpCredential: true
		};
		if (idToken) request.idToken = idToken;
		return request;
	}
};
function _signIn(params) {
	return _signInWithCredential(params.auth, new IdpCredential(params), params.bypassAuthState);
}
function _reauth(params) {
	const { auth, user } = params;
	_assert(user, auth, "internal-error");
	return _reauthenticate(user, new IdpCredential(params), params.bypassAuthState);
}
async function _link(params) {
	const { auth, user } = params;
	_assert(user, auth, "internal-error");
	return _link$1(user, new IdpCredential(params), params.bypassAuthState);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var AbstractPopupRedirectOperation = class {
	constructor(auth, filter, resolver, user, bypassAuthState = false) {
		this.auth = auth;
		this.resolver = resolver;
		this.user = user;
		this.bypassAuthState = bypassAuthState;
		this.pendingPromise = null;
		this.eventManager = null;
		this.filter = Array.isArray(filter) ? filter : [filter];
	}
	execute() {
		return new Promise(async (resolve, reject) => {
			this.pendingPromise = {
				resolve,
				reject
			};
			try {
				this.eventManager = await this.resolver._initialize(this.auth);
				await this.onExecution();
				this.eventManager.registerConsumer(this);
			} catch (e) {
				this.reject(e);
			}
		});
	}
	async onAuthEvent(event) {
		const { urlResponse, sessionId, postBody, tenantId, error, type } = event;
		if (error) {
			this.reject(error);
			return;
		}
		const params = {
			auth: this.auth,
			requestUri: urlResponse,
			sessionId,
			tenantId: tenantId || void 0,
			postBody: postBody || void 0,
			user: this.user,
			bypassAuthState: this.bypassAuthState
		};
		try {
			this.resolve(await this.getIdpTask(type)(params));
		} catch (e) {
			this.reject(e);
		}
	}
	onError(error) {
		this.reject(error);
	}
	getIdpTask(type) {
		switch (type) {
			case "signInViaPopup":
			case "signInViaRedirect": return _signIn;
			case "linkViaPopup":
			case "linkViaRedirect": return _link;
			case "reauthViaPopup":
			case "reauthViaRedirect": return _reauth;
			default: _fail(this.auth, "internal-error");
		}
	}
	resolve(cred) {
		debugAssert(this.pendingPromise, "Pending promise was never set");
		this.pendingPromise.resolve(cred);
		this.unregisterAndCleanUp();
	}
	reject(error) {
		debugAssert(this.pendingPromise, "Pending promise was never set");
		this.pendingPromise.reject(error);
		this.unregisterAndCleanUp();
	}
	unregisterAndCleanUp() {
		if (this.eventManager) this.eventManager.unregisterConsumer(this);
		this.pendingPromise = null;
		this.cleanUp();
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var _POLL_WINDOW_CLOSE_TIMEOUT = new Delay(2e3, 1e4);
async function signInWithPopup(auth, provider, resolver) {
	if (_isFirebaseServerApp(auth.app)) return Promise.reject(_createError(auth, "operation-not-supported-in-this-environment"));
	const authInternal = _castAuth(auth);
	_assertInstanceOf(auth, provider, FederatedAuthProvider);
	return new PopupOperation(authInternal, "signInViaPopup", provider, _withDefaultResolver(authInternal, resolver)).executeNotNull();
}
var PopupOperation = class PopupOperation extends AbstractPopupRedirectOperation {
	constructor(auth, filter, provider, resolver, user) {
		super(auth, filter, resolver, user);
		this.provider = provider;
		this.authWindow = null;
		this.pollId = null;
		if (PopupOperation.currentPopupAction) PopupOperation.currentPopupAction.cancel();
		PopupOperation.currentPopupAction = this;
	}
	async executeNotNull() {
		const result = await this.execute();
		_assert(result, this.auth, "internal-error");
		return result;
	}
	async onExecution() {
		debugAssert(this.filter.length === 1, "Popup operations only handle one event");
		const eventId = _generateEventId();
		this.authWindow = await this.resolver._openPopup(this.auth, this.provider, this.filter[0], eventId);
		this.authWindow.associatedEvent = eventId;
		this.resolver._originValidation(this.auth).catch((e) => {
			this.reject(e);
		});
		this.resolver._isIframeWebStorageSupported(this.auth, (isSupported) => {
			if (!isSupported) this.reject(_createError(this.auth, "web-storage-unsupported"));
		});
		this.pollUserCancellation();
	}
	get eventId() {
		var _a;
		return ((_a = this.authWindow) === null || _a === void 0 ? void 0 : _a.associatedEvent) || null;
	}
	cancel() {
		this.reject(_createError(this.auth, "cancelled-popup-request"));
	}
	cleanUp() {
		if (this.authWindow) this.authWindow.close();
		if (this.pollId) window.clearTimeout(this.pollId);
		this.authWindow = null;
		this.pollId = null;
		PopupOperation.currentPopupAction = null;
	}
	pollUserCancellation() {
		const poll = () => {
			var _a;
			var _b;
			if ((_b = (_a = this.authWindow) === null || _a === void 0 ? void 0 : _a.window) === null || _b === void 0 ? void 0 : _b.closed) {
				this.pollId = window.setTimeout(() => {
					this.pollId = null;
					this.reject(_createError(this.auth, "popup-closed-by-user"));
				}, 8e3);
				return;
			}
			this.pollId = window.setTimeout(poll, _POLL_WINDOW_CLOSE_TIMEOUT.get());
		};
		poll();
	}
};
PopupOperation.currentPopupAction = null;
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var PENDING_REDIRECT_KEY = "pendingRedirect";
var redirectOutcomeMap = /* @__PURE__ */ new Map();
var RedirectAction = class extends AbstractPopupRedirectOperation {
	constructor(auth, resolver, bypassAuthState = false) {
		super(auth, [
			"signInViaRedirect",
			"linkViaRedirect",
			"reauthViaRedirect",
			"unknown"
		], resolver, void 0, bypassAuthState);
		this.eventId = null;
	}
	async execute() {
		let readyOutcome = redirectOutcomeMap.get(this.auth._key());
		if (!readyOutcome) {
			try {
				const result = await _getAndClearPendingRedirectStatus(this.resolver, this.auth) ? await super.execute() : null;
				readyOutcome = () => Promise.resolve(result);
			} catch (e) {
				readyOutcome = () => Promise.reject(e);
			}
			redirectOutcomeMap.set(this.auth._key(), readyOutcome);
		}
		if (!this.bypassAuthState) redirectOutcomeMap.set(this.auth._key(), () => Promise.resolve(null));
		return readyOutcome();
	}
	async onAuthEvent(event) {
		if (event.type === "signInViaRedirect") return super.onAuthEvent(event);
		else if (event.type === "unknown") {
			this.resolve(null);
			return;
		}
		if (event.eventId) {
			const user = await this.auth._redirectUserForId(event.eventId);
			if (user) {
				this.user = user;
				return super.onAuthEvent(event);
			} else this.resolve(null);
		}
	}
	async onExecution() {}
	cleanUp() {}
};
async function _getAndClearPendingRedirectStatus(resolver, auth) {
	const key = pendingRedirectKey(auth);
	const persistence = resolverPersistence(resolver);
	if (!await persistence._isAvailable()) return false;
	const hasPendingRedirect = await persistence._get(key) === "true";
	await persistence._remove(key);
	return hasPendingRedirect;
}
function _overrideRedirectResult(auth, result) {
	redirectOutcomeMap.set(auth._key(), result);
}
function resolverPersistence(resolver) {
	return _getInstance(resolver._redirectPersistence);
}
function pendingRedirectKey(auth) {
	return _persistenceKeyName(PENDING_REDIRECT_KEY, auth.config.apiKey, auth.name);
}
async function _getRedirectResult(auth, resolverExtern, bypassAuthState = false) {
	if (_isFirebaseServerApp(auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth));
	const authInternal = _castAuth(auth);
	const result = await new RedirectAction(authInternal, _withDefaultResolver(authInternal, resolverExtern), bypassAuthState).execute();
	if (result && !bypassAuthState) {
		delete result.user._redirectEventId;
		await authInternal._persistUserIfCurrent(result.user);
		await authInternal._setRedirectUser(null, resolverExtern);
	}
	return result;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var EVENT_DUPLICATION_CACHE_DURATION_MS = 600 * 1e3;
var AuthEventManager = class {
	constructor(auth) {
		this.auth = auth;
		this.cachedEventUids = /* @__PURE__ */ new Set();
		this.consumers = /* @__PURE__ */ new Set();
		this.queuedRedirectEvent = null;
		this.hasHandledPotentialRedirect = false;
		this.lastProcessedEventTime = Date.now();
	}
	registerConsumer(authEventConsumer) {
		this.consumers.add(authEventConsumer);
		if (this.queuedRedirectEvent && this.isEventForConsumer(this.queuedRedirectEvent, authEventConsumer)) {
			this.sendToConsumer(this.queuedRedirectEvent, authEventConsumer);
			this.saveEventToCache(this.queuedRedirectEvent);
			this.queuedRedirectEvent = null;
		}
	}
	unregisterConsumer(authEventConsumer) {
		this.consumers.delete(authEventConsumer);
	}
	onEvent(event) {
		if (this.hasEventBeenHandled(event)) return false;
		let handled = false;
		this.consumers.forEach((consumer) => {
			if (this.isEventForConsumer(event, consumer)) {
				handled = true;
				this.sendToConsumer(event, consumer);
				this.saveEventToCache(event);
			}
		});
		if (this.hasHandledPotentialRedirect || !isRedirectEvent(event)) return handled;
		this.hasHandledPotentialRedirect = true;
		if (!handled) {
			this.queuedRedirectEvent = event;
			handled = true;
		}
		return handled;
	}
	sendToConsumer(event, consumer) {
		var _a;
		if (event.error && !isNullRedirectEvent(event)) {
			const code = ((_a = event.error.code) === null || _a === void 0 ? void 0 : _a.split("auth/")[1]) || "internal-error";
			consumer.onError(_createError(this.auth, code));
		} else consumer.onAuthEvent(event);
	}
	isEventForConsumer(event, consumer) {
		const eventIdMatches = consumer.eventId === null || !!event.eventId && event.eventId === consumer.eventId;
		return consumer.filter.includes(event.type) && eventIdMatches;
	}
	hasEventBeenHandled(event) {
		if (Date.now() - this.lastProcessedEventTime >= EVENT_DUPLICATION_CACHE_DURATION_MS) this.cachedEventUids.clear();
		return this.cachedEventUids.has(eventUid(event));
	}
	saveEventToCache(event) {
		this.cachedEventUids.add(eventUid(event));
		this.lastProcessedEventTime = Date.now();
	}
};
function eventUid(e) {
	return [
		e.type,
		e.eventId,
		e.sessionId,
		e.tenantId
	].filter((v) => v).join("-");
}
function isNullRedirectEvent({ type, error }) {
	return type === "unknown" && (error === null || error === void 0 ? void 0 : error.code) === `auth/no-auth-event`;
}
function isRedirectEvent(event) {
	switch (event.type) {
		case "signInViaRedirect":
		case "linkViaRedirect":
		case "reauthViaRedirect": return true;
		case "unknown": return isNullRedirectEvent(event);
		default: return false;
	}
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function _getProjectConfig(auth, request = {}) {
	return _performApiRequest(auth, "GET", "/v1/projects", request);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var IP_ADDRESS_REGEX = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
var HTTP_REGEX = /^https?/;
async function _validateOrigin(auth) {
	if (auth.config.emulator) return;
	const { authorizedDomains } = await _getProjectConfig(auth);
	for (const domain of authorizedDomains) try {
		if (matchDomain(domain)) return;
	} catch (_a) {}
	_fail(auth, "unauthorized-domain");
}
function matchDomain(expected) {
	const currentUrl = _getCurrentUrl();
	const { protocol, hostname } = new URL(currentUrl);
	if (expected.startsWith("chrome-extension://")) {
		const ceUrl = new URL(expected);
		if (ceUrl.hostname === "" && hostname === "") return protocol === "chrome-extension:" && expected.replace("chrome-extension://", "") === currentUrl.replace("chrome-extension://", "");
		return protocol === "chrome-extension:" && ceUrl.hostname === hostname;
	}
	if (!HTTP_REGEX.test(protocol)) return false;
	if (IP_ADDRESS_REGEX.test(expected)) return hostname === expected;
	const escapedDomainPattern = expected.replace(/\./g, "\\.");
	return new RegExp("^(.+\\." + escapedDomainPattern + "|" + escapedDomainPattern + ")$", "i").test(hostname);
}
/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var NETWORK_TIMEOUT = new Delay(3e4, 6e4);
function resetUnloadedGapiModules() {
	const beacon = _window().___jsl;
	if (beacon === null || beacon === void 0 ? void 0 : beacon.H) for (const hint of Object.keys(beacon.H)) {
		beacon.H[hint].r = beacon.H[hint].r || [];
		beacon.H[hint].L = beacon.H[hint].L || [];
		beacon.H[hint].r = [...beacon.H[hint].L];
		if (beacon.CP) for (let i = 0; i < beacon.CP.length; i++) beacon.CP[i] = null;
	}
}
function loadGapi(auth) {
	return new Promise((resolve, reject) => {
		var _a;
		var _b;
		var _c;
		function loadGapiIframe() {
			resetUnloadedGapiModules();
			gapi.load("gapi.iframes", {
				callback: () => {
					resolve(gapi.iframes.getContext());
				},
				ontimeout: () => {
					resetUnloadedGapiModules();
					reject(_createError(auth, "network-request-failed"));
				},
				timeout: NETWORK_TIMEOUT.get()
			});
		}
		if ((_b = (_a = _window().gapi) === null || _a === void 0 ? void 0 : _a.iframes) === null || _b === void 0 ? void 0 : _b.Iframe) resolve(gapi.iframes.getContext());
		else if (!!((_c = _window().gapi) === null || _c === void 0 ? void 0 : _c.load)) loadGapiIframe();
		else {
			const cbName = _generateCallbackName("iframefcb");
			_window()[cbName] = () => {
				if (!!gapi.load) loadGapiIframe();
				else reject(_createError(auth, "network-request-failed"));
			};
			return _loadJS(`${_gapiScriptUrl()}?onload=${cbName}`).catch((e) => reject(e));
		}
	}).catch((error) => {
		cachedGApiLoader = null;
		throw error;
	});
}
var cachedGApiLoader = null;
function _loadGapi(auth) {
	cachedGApiLoader = cachedGApiLoader || loadGapi(auth);
	return cachedGApiLoader;
}
/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var PING_TIMEOUT = new Delay(5e3, 15e3);
var IFRAME_PATH = "__/auth/iframe";
var EMULATED_IFRAME_PATH = "emulator/auth/iframe";
var IFRAME_ATTRIBUTES = {
	style: {
		position: "absolute",
		top: "-100px",
		width: "1px",
		height: "1px"
	},
	"aria-hidden": "true",
	tabindex: "-1"
};
var EID_FROM_APIHOST = new Map([
	["identitytoolkit.googleapis.com", "p"],
	["staging-identitytoolkit.sandbox.googleapis.com", "s"],
	["test-identitytoolkit.sandbox.googleapis.com", "t"]
]);
function getIframeUrl(auth) {
	const config = auth.config;
	_assert(config.authDomain, auth, "auth-domain-config-required");
	const url = config.emulator ? _emulatorUrl(config, EMULATED_IFRAME_PATH) : `https://${auth.config.authDomain}/${IFRAME_PATH}`;
	const params = {
		apiKey: config.apiKey,
		appName: auth.name,
		v: SDK_VERSION$1
	};
	const eid = EID_FROM_APIHOST.get(auth.config.apiHost);
	if (eid) params.eid = eid;
	const frameworks = auth._getFrameworks();
	if (frameworks.length) params.fw = frameworks.join(",");
	return `${url}?${querystring(params).slice(1)}`;
}
async function _openIframe(auth) {
	const context = await _loadGapi(auth);
	const gapi = _window().gapi;
	_assert(gapi, auth, "internal-error");
	return context.open({
		where: document.body,
		url: getIframeUrl(auth),
		messageHandlersFilter: gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
		attributes: IFRAME_ATTRIBUTES,
		dontclear: true
	}, (iframe) => new Promise(async (resolve, reject) => {
		await iframe.restyle({ setHideOnLeave: false });
		const networkError = _createError(auth, "network-request-failed");
		const networkErrorTimer = _window().setTimeout(() => {
			reject(networkError);
		}, PING_TIMEOUT.get());
		function clearTimerAndResolve() {
			_window().clearTimeout(networkErrorTimer);
			resolve(iframe);
		}
		iframe.ping(clearTimerAndResolve).then(clearTimerAndResolve, () => {
			reject(networkError);
		});
	}));
}
/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var BASE_POPUP_OPTIONS = {
	location: "yes",
	resizable: "yes",
	statusbar: "yes",
	toolbar: "no"
};
var DEFAULT_WIDTH = 500;
var DEFAULT_HEIGHT = 600;
var TARGET_BLANK = "_blank";
var FIREFOX_EMPTY_URL = "http://localhost";
var AuthPopup = class {
	constructor(window) {
		this.window = window;
		this.associatedEvent = null;
	}
	close() {
		if (this.window) try {
			this.window.close();
		} catch (e) {}
	}
};
function _open(auth, url, name, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT) {
	const top = Math.max((window.screen.availHeight - height) / 2, 0).toString();
	const left = Math.max((window.screen.availWidth - width) / 2, 0).toString();
	let target = "";
	const options = Object.assign(Object.assign({}, BASE_POPUP_OPTIONS), {
		width: width.toString(),
		height: height.toString(),
		top,
		left
	});
	const ua = getUA().toLowerCase();
	if (name) target = _isChromeIOS(ua) ? TARGET_BLANK : name;
	if (_isFirefox(ua)) {
		url = url || FIREFOX_EMPTY_URL;
		options.scrollbars = "yes";
	}
	const optionsString = Object.entries(options).reduce((accum, [key, value]) => `${accum}${key}=${value},`, "");
	if (_isIOSStandalone(ua) && target !== "_self") {
		openAsNewWindowIOS(url || "", target);
		return new AuthPopup(null);
	}
	const newWin = window.open(url || "", target, optionsString);
	_assert(newWin, auth, "popup-blocked");
	try {
		newWin.focus();
	} catch (e) {}
	return new AuthPopup(newWin);
}
function openAsNewWindowIOS(url, target) {
	const el = document.createElement("a");
	el.href = url;
	el.target = target;
	const click = document.createEvent("MouseEvent");
	click.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 1, null);
	el.dispatchEvent(click);
}
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var WIDGET_PATH = "__/auth/handler";
var EMULATOR_WIDGET_PATH = "emulator/auth/handler";
var FIREBASE_APP_CHECK_FRAGMENT_ID = encodeURIComponent("fac");
async function _getRedirectUrl(auth, provider, authType, redirectUrl, eventId, additionalParams) {
	_assert(auth.config.authDomain, auth, "auth-domain-config-required");
	_assert(auth.config.apiKey, auth, "invalid-api-key");
	const params = {
		apiKey: auth.config.apiKey,
		appName: auth.name,
		authType,
		redirectUrl,
		v: SDK_VERSION$1,
		eventId
	};
	if (provider instanceof FederatedAuthProvider) {
		provider.setDefaultLanguage(auth.languageCode);
		params.providerId = provider.providerId || "";
		if (!isEmpty$1(provider.getCustomParameters())) params.customParameters = JSON.stringify(provider.getCustomParameters());
		for (const [key, value] of Object.entries(additionalParams || {})) params[key] = value;
	}
	if (provider instanceof BaseOAuthProvider) {
		const scopes = provider.getScopes().filter((scope) => scope !== "");
		if (scopes.length > 0) params.scopes = scopes.join(",");
	}
	if (auth.tenantId) params.tid = auth.tenantId;
	const paramsDict = params;
	for (const key of Object.keys(paramsDict)) if (paramsDict[key] === void 0) delete paramsDict[key];
	const appCheckToken = await auth._getAppCheckToken();
	const appCheckTokenFragment = appCheckToken ? `#${FIREBASE_APP_CHECK_FRAGMENT_ID}=${encodeURIComponent(appCheckToken)}` : "";
	return `${getHandlerBase(auth)}?${querystring(paramsDict).slice(1)}${appCheckTokenFragment}`;
}
function getHandlerBase({ config }) {
	if (!config.emulator) return `https://${config.authDomain}/${WIDGET_PATH}`;
	return _emulatorUrl(config, EMULATOR_WIDGET_PATH);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var WEB_STORAGE_SUPPORT_KEY = "webStorageSupport";
var BrowserPopupRedirectResolver = class {
	constructor() {
		this.eventManagers = {};
		this.iframes = {};
		this.originValidationPromises = {};
		this._redirectPersistence = browserSessionPersistence;
		this._completeRedirectFn = _getRedirectResult;
		this._overrideRedirectResult = _overrideRedirectResult;
	}
	async _openPopup(auth, provider, authType, eventId) {
		var _a;
		debugAssert((_a = this.eventManagers[auth._key()]) === null || _a === void 0 ? void 0 : _a.manager, "_initialize() not called before _openPopup()");
		return _open(auth, await _getRedirectUrl(auth, provider, authType, _getCurrentUrl(), eventId), _generateEventId());
	}
	async _openRedirect(auth, provider, authType, eventId) {
		await this._originValidation(auth);
		_setWindowLocation(await _getRedirectUrl(auth, provider, authType, _getCurrentUrl(), eventId));
		return new Promise(() => {});
	}
	_initialize(auth) {
		const key = auth._key();
		if (this.eventManagers[key]) {
			const { manager, promise } = this.eventManagers[key];
			if (manager) return Promise.resolve(manager);
			else {
				debugAssert(promise, "If manager is not set, promise should be");
				return promise;
			}
		}
		const promise = this.initAndGetManager(auth);
		this.eventManagers[key] = { promise };
		promise.catch(() => {
			delete this.eventManagers[key];
		});
		return promise;
	}
	async initAndGetManager(auth) {
		const iframe = await _openIframe(auth);
		const manager = new AuthEventManager(auth);
		iframe.register("authEvent", (iframeEvent) => {
			_assert(iframeEvent === null || iframeEvent === void 0 ? void 0 : iframeEvent.authEvent, auth, "invalid-auth-event");
			return { status: manager.onEvent(iframeEvent.authEvent) ? "ACK" : "ERROR" };
		}, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);
		this.eventManagers[auth._key()] = { manager };
		this.iframes[auth._key()] = iframe;
		return manager;
	}
	_isIframeWebStorageSupported(auth, cb) {
		this.iframes[auth._key()].send(WEB_STORAGE_SUPPORT_KEY, { type: WEB_STORAGE_SUPPORT_KEY }, (result) => {
			var _a;
			const isSupported = (_a = result === null || result === void 0 ? void 0 : result[0]) === null || _a === void 0 ? void 0 : _a[WEB_STORAGE_SUPPORT_KEY];
			if (isSupported !== void 0) cb(!!isSupported);
			_fail(auth, "internal-error");
		}, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);
	}
	_originValidation(auth) {
		const key = auth._key();
		if (!this.originValidationPromises[key]) this.originValidationPromises[key] = _validateOrigin(auth);
		return this.originValidationPromises[key];
	}
	get _shouldInitProactively() {
		return _isMobileBrowser() || _isSafari() || _isIOS();
	}
};
var browserPopupRedirectResolver = BrowserPopupRedirectResolver;
var MultiFactorAssertionImpl = class {
	constructor(factorId) {
		this.factorId = factorId;
	}
	_process(auth, session, displayName) {
		switch (session.type) {
			case "enroll": return this._finalizeEnroll(auth, session.credential, displayName);
			case "signin": return this._finalizeSignIn(auth, session.credential);
			default: return debugFail("unexpected MultiFactorSessionType");
		}
	}
};
var PhoneMultiFactorAssertionImpl = class PhoneMultiFactorAssertionImpl extends MultiFactorAssertionImpl {
	constructor(credential) {
		super("phone");
		this.credential = credential;
	}
	static _fromCredential(credential) {
		return new PhoneMultiFactorAssertionImpl(credential);
	}
	_finalizeEnroll(auth, idToken, displayName) {
		return finalizeEnrollPhoneMfa(auth, {
			idToken,
			displayName,
			phoneVerificationInfo: this.credential._makeVerificationRequest()
		});
	}
	_finalizeSignIn(auth, mfaPendingCredential) {
		return finalizeSignInPhoneMfa(auth, {
			mfaPendingCredential,
			phoneVerificationInfo: this.credential._makeVerificationRequest()
		});
	}
};
var PhoneMultiFactorGenerator = class {
	constructor() {}
	static assertion(credential) {
		return PhoneMultiFactorAssertionImpl._fromCredential(credential);
	}
};
PhoneMultiFactorGenerator.FACTOR_ID = "phone";
var TotpMultiFactorGenerator = class {
	static assertionForEnrollment(secret, oneTimePassword) {
		return TotpMultiFactorAssertionImpl._fromSecret(secret, oneTimePassword);
	}
	static assertionForSignIn(enrollmentId, oneTimePassword) {
		return TotpMultiFactorAssertionImpl._fromEnrollmentId(enrollmentId, oneTimePassword);
	}
	static async generateSecret(session) {
		var _a;
		const mfaSession = session;
		_assert(typeof ((_a = mfaSession.user) === null || _a === void 0 ? void 0 : _a.auth) !== "undefined", "internal-error");
		const response = await startEnrollTotpMfa(mfaSession.user.auth, {
			idToken: mfaSession.credential,
			totpEnrollmentInfo: {}
		});
		return TotpSecret._fromStartTotpMfaEnrollmentResponse(response, mfaSession.user.auth);
	}
};
TotpMultiFactorGenerator.FACTOR_ID = "totp";
var TotpMultiFactorAssertionImpl = class TotpMultiFactorAssertionImpl extends MultiFactorAssertionImpl {
	constructor(otp, enrollmentId, secret) {
		super("totp");
		this.otp = otp;
		this.enrollmentId = enrollmentId;
		this.secret = secret;
	}
	static _fromSecret(secret, otp) {
		return new TotpMultiFactorAssertionImpl(otp, void 0, secret);
	}
	static _fromEnrollmentId(enrollmentId, otp) {
		return new TotpMultiFactorAssertionImpl(otp, enrollmentId);
	}
	async _finalizeEnroll(auth, idToken, displayName) {
		_assert(typeof this.secret !== "undefined", auth, "argument-error");
		return finalizeEnrollTotpMfa(auth, {
			idToken,
			displayName,
			totpVerificationInfo: this.secret._makeTotpVerificationInfo(this.otp)
		});
	}
	async _finalizeSignIn(auth, mfaPendingCredential) {
		_assert(this.enrollmentId !== void 0 && this.otp !== void 0, auth, "argument-error");
		const totpVerificationInfo = { verificationCode: this.otp };
		return finalizeSignInTotpMfa(auth, {
			mfaPendingCredential,
			mfaEnrollmentId: this.enrollmentId,
			totpVerificationInfo
		});
	}
};
var TotpSecret = class TotpSecret {
	constructor(secretKey, hashingAlgorithm, codeLength, codeIntervalSeconds, enrollmentCompletionDeadline, sessionInfo, auth) {
		this.sessionInfo = sessionInfo;
		this.auth = auth;
		this.secretKey = secretKey;
		this.hashingAlgorithm = hashingAlgorithm;
		this.codeLength = codeLength;
		this.codeIntervalSeconds = codeIntervalSeconds;
		this.enrollmentCompletionDeadline = enrollmentCompletionDeadline;
	}
	static _fromStartTotpMfaEnrollmentResponse(response, auth) {
		return new TotpSecret(response.totpSessionInfo.sharedSecretKey, response.totpSessionInfo.hashingAlgorithm, response.totpSessionInfo.verificationCodeLength, response.totpSessionInfo.periodSec, new Date(response.totpSessionInfo.finalizeEnrollmentTime).toUTCString(), response.totpSessionInfo.sessionInfo, auth);
	}
	_makeTotpVerificationInfo(otp) {
		return {
			sessionInfo: this.sessionInfo,
			verificationCode: otp
		};
	}
	generateQrCodeUrl(accountName, issuer) {
		var _a;
		let useDefaults = false;
		if (_isEmptyString(accountName) || _isEmptyString(issuer)) useDefaults = true;
		if (useDefaults) {
			if (_isEmptyString(accountName)) accountName = ((_a = this.auth.currentUser) === null || _a === void 0 ? void 0 : _a.email) || "unknownuser";
			if (_isEmptyString(issuer)) issuer = this.auth.name;
		}
		return `otpauth://totp/${issuer}:${accountName}?secret=${this.secretKey}&issuer=${issuer}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`;
	}
};
function _isEmptyString(input) {
	return typeof input === "undefined" || (input === null || input === void 0 ? void 0 : input.length) === 0;
}
var name$3 = "@firebase/auth";
var version$3 = "1.10.8";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var AuthInterop = class {
	constructor(auth) {
		this.auth = auth;
		this.internalListeners = /* @__PURE__ */ new Map();
	}
	getUid() {
		var _a;
		this.assertAuthConfigured();
		return ((_a = this.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid) || null;
	}
	async getToken(forceRefresh) {
		this.assertAuthConfigured();
		await this.auth._initializationPromise;
		if (!this.auth.currentUser) return null;
		return { accessToken: await this.auth.currentUser.getIdToken(forceRefresh) };
	}
	addAuthTokenListener(listener) {
		this.assertAuthConfigured();
		if (this.internalListeners.has(listener)) return;
		const unsubscribe = this.auth.onIdTokenChanged((user) => {
			listener((user === null || user === void 0 ? void 0 : user.stsTokenManager.accessToken) || null);
		});
		this.internalListeners.set(listener, unsubscribe);
		this.updateProactiveRefresh();
	}
	removeAuthTokenListener(listener) {
		this.assertAuthConfigured();
		const unsubscribe = this.internalListeners.get(listener);
		if (!unsubscribe) return;
		this.internalListeners.delete(listener);
		unsubscribe();
		this.updateProactiveRefresh();
	}
	assertAuthConfigured() {
		_assert(this.auth._initializationPromise, "dependent-sdk-initialized-before-auth");
	}
	updateProactiveRefresh() {
		if (this.internalListeners.size > 0) this.auth._startProactiveRefresh();
		else this.auth._stopProactiveRefresh();
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function getVersionForPlatform(clientPlatform) {
	switch (clientPlatform) {
		case "Node": return "node";
		case "ReactNative": return "rn";
		case "Worker": return "webworker";
		case "Cordova": return "cordova";
		case "WebExtension": return "web-extension";
		default: return;
	}
}
function registerAuth(clientPlatform) {
	_registerComponent(new Component("auth", (container, { options: deps }) => {
		const app = container.getProvider("app").getImmediate();
		const heartbeatServiceProvider = container.getProvider("heartbeat");
		const appCheckServiceProvider = container.getProvider("app-check-internal");
		const { apiKey, authDomain } = app.options;
		_assert(apiKey && !apiKey.includes(":"), "invalid-api-key", { appName: app.name });
		const authInstance = new AuthImpl(app, heartbeatServiceProvider, appCheckServiceProvider, {
			apiKey,
			authDomain,
			clientPlatform,
			apiHost: "identitytoolkit.googleapis.com",
			tokenApiHost: "securetoken.googleapis.com",
			apiScheme: "https",
			sdkClientVersion: _getClientVersion(clientPlatform)
		});
		_initializeAuthInstance(authInstance, deps);
		return authInstance;
	}, "PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((container, _instanceIdentifier, _instance) => {
		container.getProvider("auth-internal").initialize();
	}));
	_registerComponent(new Component("auth-internal", (container) => {
		return ((auth) => new AuthInterop(auth))(_castAuth(container.getProvider("auth").getImmediate()));
	}, "PRIVATE").setInstantiationMode("EXPLICIT"));
	registerVersion(name$3, version$3, getVersionForPlatform(clientPlatform));
	registerVersion(name$3, version$3, "esm2017");
}
var authIdTokenMaxAge = getExperimentalSetting("authIdTokenMaxAge") || 300;
var lastPostedIdToken = null;
var mintCookieFactory = (url) => async (user) => {
	const idTokenResult = user && await user.getIdTokenResult();
	const idTokenAge = idTokenResult && ((/* @__PURE__ */ new Date()).getTime() - Date.parse(idTokenResult.issuedAtTime)) / 1e3;
	if (idTokenAge && idTokenAge > authIdTokenMaxAge) return;
	const idToken = idTokenResult === null || idTokenResult === void 0 ? void 0 : idTokenResult.token;
	if (lastPostedIdToken === idToken) return;
	lastPostedIdToken = idToken;
	await fetch(url, {
		method: idToken ? "POST" : "DELETE",
		headers: idToken ? { "Authorization": `Bearer ${idToken}` } : {}
	});
};
function getAuth(app = getApp()) {
	const provider = _getProvider(app, "auth");
	if (provider.isInitialized()) return provider.getImmediate();
	const auth = initializeAuth(app, {
		popupRedirectResolver: browserPopupRedirectResolver,
		persistence: [
			indexedDBLocalPersistence,
			browserLocalPersistence,
			browserSessionPersistence
		]
	});
	const authTokenSyncPath = getExperimentalSetting("authTokenSyncURL");
	if (authTokenSyncPath && typeof isSecureContext === "boolean" && isSecureContext) {
		const authTokenSyncUrl = new URL(authTokenSyncPath, location.origin);
		if (location.origin === authTokenSyncUrl.origin) {
			const mintCookie = mintCookieFactory(authTokenSyncUrl.toString());
			beforeAuthStateChanged(auth, mintCookie, () => mintCookie(auth.currentUser));
			onIdTokenChanged(auth, (user) => mintCookie(user));
		}
	}
	const authEmulatorHost = getDefaultEmulatorHost("auth");
	if (authEmulatorHost) connectAuthEmulator(auth, `http://${authEmulatorHost}`);
	return auth;
}
function getScriptParentElement() {
	var _a;
	var _b;
	return (_b = (_a = document.getElementsByTagName("head")) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : document;
}
_setExternalJSProvider({
	loadJS(url) {
		return new Promise((resolve, reject) => {
			const el = document.createElement("script");
			el.setAttribute("src", url);
			el.onload = resolve;
			el.onerror = (e) => {
				const error = _createError("internal-error");
				error.customData = e;
				reject(error);
			};
			el.type = "text/javascript";
			el.charset = "UTF-8";
			getScriptParentElement().appendChild(el);
		});
	},
	gapiScript: "https://apis.google.com/js/api.js",
	recaptchaV2Script: "https://www.google.com/recaptcha/api.js",
	recaptchaEnterpriseScript: "https://www.google.com/recaptcha/enterprise.js?render="
});
registerAuth("Browser");
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var APP_CHECK_STATES = /* @__PURE__ */ new Map();
var DEFAULT_STATE = {
	activated: false,
	tokenObservers: []
};
var DEBUG_STATE = {
	initialized: false,
	enabled: false
};
function getStateReference(app) {
	return APP_CHECK_STATES.get(app) || Object.assign({}, DEFAULT_STATE);
}
function getDebugState() {
	return DEBUG_STATE;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var BASE_ENDPOINT = "https://content-firebaseappcheck.googleapis.com/v1";
var EXCHANGE_DEBUG_TOKEN_METHOD = "exchangeDebugToken";
var TOKEN_REFRESH_TIME = {
	OFFSET_DURATION: 300 * 1e3,
	RETRIAL_MIN_WAIT: 30 * 1e3,
	RETRIAL_MAX_WAIT: 960 * 1e3
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Refresher = class {
	constructor(operation, retryPolicy, getWaitDuration, lowerBound, upperBound) {
		this.operation = operation;
		this.retryPolicy = retryPolicy;
		this.getWaitDuration = getWaitDuration;
		this.lowerBound = lowerBound;
		this.upperBound = upperBound;
		this.pending = null;
		this.nextErrorWaitInterval = lowerBound;
		if (lowerBound > upperBound) throw new Error("Proactive refresh lower bound greater than upper bound!");
	}
	start() {
		this.nextErrorWaitInterval = this.lowerBound;
		this.process(true).catch(() => {});
	}
	stop() {
		if (this.pending) {
			this.pending.reject("cancelled");
			this.pending = null;
		}
	}
	isRunning() {
		return !!this.pending;
	}
	async process(hasSucceeded) {
		this.stop();
		try {
			this.pending = new Deferred();
			this.pending.promise.catch((_e) => {});
			await sleep(this.getNextRun(hasSucceeded));
			this.pending.resolve();
			await this.pending.promise;
			this.pending = new Deferred();
			this.pending.promise.catch((_e) => {});
			await this.operation();
			this.pending.resolve();
			await this.pending.promise;
			this.process(true).catch(() => {});
		} catch (error) {
			if (this.retryPolicy(error)) this.process(false).catch(() => {});
			else this.stop();
		}
	}
	getNextRun(hasSucceeded) {
		if (hasSucceeded) {
			this.nextErrorWaitInterval = this.lowerBound;
			return this.getWaitDuration();
		} else {
			const currentErrorWaitInterval = this.nextErrorWaitInterval;
			this.nextErrorWaitInterval *= 2;
			if (this.nextErrorWaitInterval > this.upperBound) this.nextErrorWaitInterval = this.upperBound;
			return currentErrorWaitInterval;
		}
	}
};
function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
var ERROR_FACTORY = new ErrorFactory("appCheck", "AppCheck", {
	["already-initialized"]: "You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.",
	["use-before-activation"]: "App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.",
	["fetch-network-error"]: "Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.",
	["fetch-parse-error"]: "Fetch client could not parse response. Original error: {$originalErrorMessage}.",
	["fetch-status-error"]: "Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.",
	["storage-open"]: "Error thrown when opening storage. Original error: {$originalErrorMessage}.",
	["storage-get"]: "Error thrown when reading from storage. Original error: {$originalErrorMessage}.",
	["storage-set"]: "Error thrown when writing to storage. Original error: {$originalErrorMessage}.",
	["recaptcha-error"]: "ReCAPTCHA error.",
	["initial-throttle"]: `{$httpStatus} error. Attempts allowed again after {$time}`,
	["throttled"]: `Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}`
});
function ensureActivated(app) {
	if (!getStateReference(app).activated) throw ERROR_FACTORY.create("use-before-activation", { appName: app.name });
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function exchangeToken({ url, body }, heartbeatServiceProvider) {
	const headers = { "Content-Type": "application/json" };
	const heartbeatService = heartbeatServiceProvider.getImmediate({ optional: true });
	if (heartbeatService) {
		const heartbeatsHeader = await heartbeatService.getHeartbeatsHeader();
		if (heartbeatsHeader) headers["X-Firebase-Client"] = heartbeatsHeader;
	}
	const options = {
		method: "POST",
		body: JSON.stringify(body),
		headers
	};
	let response;
	try {
		response = await fetch(url, options);
	} catch (originalError) {
		throw ERROR_FACTORY.create("fetch-network-error", { originalErrorMessage: originalError === null || originalError === void 0 ? void 0 : originalError.message });
	}
	if (response.status !== 200) throw ERROR_FACTORY.create("fetch-status-error", { httpStatus: response.status });
	let responseBody;
	try {
		responseBody = await response.json();
	} catch (originalError) {
		throw ERROR_FACTORY.create("fetch-parse-error", { originalErrorMessage: originalError === null || originalError === void 0 ? void 0 : originalError.message });
	}
	const match = responseBody.ttl.match(/^([\d.]+)(s)$/);
	if (!match || !match[2] || isNaN(Number(match[1]))) throw ERROR_FACTORY.create("fetch-parse-error", { originalErrorMessage: `ttl field (timeToLive) is not in standard Protobuf Duration format: ${responseBody.ttl}` });
	const timeToLiveAsNumber = Number(match[1]) * 1e3;
	const now = Date.now();
	return {
		token: responseBody.token,
		expireTimeMillis: now + timeToLiveAsNumber,
		issuedAtTimeMillis: now
	};
}
function getExchangeDebugTokenRequest(app, debugToken) {
	const { projectId, appId, apiKey } = app.options;
	return {
		url: `${BASE_ENDPOINT}/projects/${projectId}/apps/${appId}:${EXCHANGE_DEBUG_TOKEN_METHOD}?key=${apiKey}`,
		body: { debug_token: debugToken }
	};
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var DB_NAME = "firebase-app-check-database";
var DB_VERSION = 1;
var STORE_NAME = "firebase-app-check-store";
var dbPromise = null;
function getDBPromise() {
	if (dbPromise) return dbPromise;
	dbPromise = new Promise((resolve, reject) => {
		try {
			const request = indexedDB.open(DB_NAME, DB_VERSION);
			request.onsuccess = (event) => {
				resolve(event.target.result);
			};
			request.onerror = (event) => {
				var _a;
				reject(ERROR_FACTORY.create("storage-open", { originalErrorMessage: (_a = event.target.error) === null || _a === void 0 ? void 0 : _a.message }));
			};
			request.onupgradeneeded = (event) => {
				const db = event.target.result;
				switch (event.oldVersion) {
					case 0: db.createObjectStore(STORE_NAME, { keyPath: "compositeKey" });
				}
			};
		} catch (e) {
			reject(ERROR_FACTORY.create("storage-open", { originalErrorMessage: e === null || e === void 0 ? void 0 : e.message }));
		}
	});
	return dbPromise;
}
function writeTokenToIndexedDB(app, token) {
	return write(computeKey(app), token);
}
async function write(key, value) {
	const transaction = (await getDBPromise()).transaction(STORE_NAME, "readwrite");
	const request = transaction.objectStore(STORE_NAME).put({
		compositeKey: key,
		value
	});
	return new Promise((resolve, reject) => {
		request.onsuccess = (_event) => {
			resolve();
		};
		transaction.onerror = (event) => {
			var _a;
			reject(ERROR_FACTORY.create("storage-set", { originalErrorMessage: (_a = event.target.error) === null || _a === void 0 ? void 0 : _a.message }));
		};
	});
}
function computeKey(app) {
	return `${app.options.appId}-${app.name}`;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var logger$1 = new Logger("@firebase/app-check");
function writeTokenToStorage(app, token) {
	if (isIndexedDBAvailable()) return writeTokenToIndexedDB(app, token).catch((e) => {
		logger$1.warn(`Failed to write token to IndexedDB. Error: ${e}`);
	});
	return Promise.resolve();
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function isDebugMode() {
	return getDebugState().enabled;
}
async function getDebugToken() {
	const state = getDebugState();
	if (state.enabled && state.token) return state.token.promise;
	else throw Error(`
            Can't get debug token in production mode.
        `);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var defaultTokenErrorData = { error: "UNKNOWN_ERROR" };
function formatDummyToken(tokenErrorData) {
	return base64.encodeString(JSON.stringify(tokenErrorData), false);
}
async function getToken$2(appCheck, forceRefresh = false, shouldLogErrors = false) {
	const app = appCheck.app;
	ensureActivated(app);
	const state = getStateReference(app);
	let token = state.token;
	let error = void 0;
	if (token && !isValid(token)) {
		state.token = void 0;
		token = void 0;
	}
	if (!token) {
		const cachedToken = await state.cachedTokenPromise;
		if (cachedToken) if (isValid(cachedToken)) token = cachedToken;
		else await writeTokenToStorage(app, void 0);
	}
	if (!forceRefresh && token && isValid(token)) return { token: token.token };
	let shouldCallListeners = false;
	if (isDebugMode()) try {
		if (!state.exchangeTokenPromise) {
			state.exchangeTokenPromise = exchangeToken(getExchangeDebugTokenRequest(app, await getDebugToken()), appCheck.heartbeatServiceProvider).finally(() => {
				state.exchangeTokenPromise = void 0;
			});
			shouldCallListeners = true;
		}
		const tokenFromDebugExchange = await state.exchangeTokenPromise;
		await writeTokenToStorage(app, tokenFromDebugExchange);
		state.token = tokenFromDebugExchange;
		return { token: tokenFromDebugExchange.token };
	} catch (e) {
		if (e.code === `appCheck/throttled` || e.code === `appCheck/initial-throttle`) logger$1.warn(e.message);
		else if (shouldLogErrors) logger$1.error(e);
		return makeDummyTokenResult(e);
	}
	try {
		if (!state.exchangeTokenPromise) {
			state.exchangeTokenPromise = state.provider.getToken().finally(() => {
				state.exchangeTokenPromise = void 0;
			});
			shouldCallListeners = true;
		}
		token = await getStateReference(app).exchangeTokenPromise;
	} catch (e) {
		if (e.code === `appCheck/throttled` || e.code === `appCheck/initial-throttle`) logger$1.warn(e.message);
		else if (shouldLogErrors) logger$1.error(e);
		error = e;
	}
	let interopTokenResult;
	if (!token) interopTokenResult = makeDummyTokenResult(error);
	else if (error) if (isValid(token)) interopTokenResult = {
		token: token.token,
		internalError: error
	};
	else interopTokenResult = makeDummyTokenResult(error);
	else {
		interopTokenResult = { token: token.token };
		state.token = token;
		await writeTokenToStorage(app, token);
	}
	if (shouldCallListeners) notifyTokenListeners(app, interopTokenResult);
	return interopTokenResult;
}
async function getLimitedUseToken$1(appCheck) {
	const app = appCheck.app;
	ensureActivated(app);
	const { provider } = getStateReference(app);
	if (isDebugMode()) {
		const { token } = await exchangeToken(getExchangeDebugTokenRequest(app, await getDebugToken()), appCheck.heartbeatServiceProvider);
		return { token };
	} else {
		const { token } = await provider.getToken();
		return { token };
	}
}
function addTokenListener(appCheck, type, listener, onError) {
	const { app } = appCheck;
	const state = getStateReference(app);
	const tokenObserver = {
		next: listener,
		error: onError,
		type
	};
	state.tokenObservers = [...state.tokenObservers, tokenObserver];
	if (state.token && isValid(state.token)) {
		const validToken = state.token;
		Promise.resolve().then(() => {
			listener({ token: validToken.token });
			initTokenRefresher(appCheck);
		}).catch(() => {});
	}
	state.cachedTokenPromise.then(() => initTokenRefresher(appCheck));
}
function removeTokenListener(app, listener) {
	const state = getStateReference(app);
	const newObservers = state.tokenObservers.filter((tokenObserver) => tokenObserver.next !== listener);
	if (newObservers.length === 0 && state.tokenRefresher && state.tokenRefresher.isRunning()) state.tokenRefresher.stop();
	state.tokenObservers = newObservers;
}
function initTokenRefresher(appCheck) {
	const { app } = appCheck;
	const state = getStateReference(app);
	let refresher = state.tokenRefresher;
	if (!refresher) {
		refresher = createTokenRefresher(appCheck);
		state.tokenRefresher = refresher;
	}
	if (!refresher.isRunning() && state.isTokenAutoRefreshEnabled) refresher.start();
}
function createTokenRefresher(appCheck) {
	const { app } = appCheck;
	return new Refresher(async () => {
		const state = getStateReference(app);
		let result;
		if (!state.token) result = await getToken$2(appCheck);
		else result = await getToken$2(appCheck, true);
		if (result.error) throw result.error;
		if (result.internalError) throw result.internalError;
	}, () => {
		return true;
	}, () => {
		const state = getStateReference(app);
		if (state.token) {
			let nextRefreshTimeMillis = state.token.issuedAtTimeMillis + (state.token.expireTimeMillis - state.token.issuedAtTimeMillis) * .5 + 300 * 1e3;
			const latestAllowableRefresh = state.token.expireTimeMillis - 300 * 1e3;
			nextRefreshTimeMillis = Math.min(nextRefreshTimeMillis, latestAllowableRefresh);
			return Math.max(0, nextRefreshTimeMillis - Date.now());
		} else return 0;
	}, TOKEN_REFRESH_TIME.RETRIAL_MIN_WAIT, TOKEN_REFRESH_TIME.RETRIAL_MAX_WAIT);
}
function notifyTokenListeners(app, token) {
	const observers = getStateReference(app).tokenObservers;
	for (const observer of observers) try {
		if (observer.type === "EXTERNAL" && token.error != null) observer.error(token.error);
		else observer.next(token);
	} catch (e) {}
}
function isValid(token) {
	return token.expireTimeMillis - Date.now() > 0;
}
function makeDummyTokenResult(error) {
	return {
		token: formatDummyToken(defaultTokenErrorData),
		error
	};
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var AppCheckService = class {
	constructor(app, heartbeatServiceProvider) {
		this.app = app;
		this.heartbeatServiceProvider = heartbeatServiceProvider;
	}
	_delete() {
		const { tokenObservers } = getStateReference(this.app);
		for (const tokenObserver of tokenObservers) removeTokenListener(this.app, tokenObserver.next);
		return Promise.resolve();
	}
};
function factory$1(app, heartbeatServiceProvider) {
	return new AppCheckService(app, heartbeatServiceProvider);
}
__name(factory$1, "factory");
function internalFactory(appCheck) {
	return {
		getToken: (forceRefresh) => getToken$2(appCheck, forceRefresh),
		getLimitedUseToken: () => getLimitedUseToken$1(appCheck),
		addTokenListener: (listener) => addTokenListener(appCheck, "INTERNAL", listener),
		removeTokenListener: (listener) => removeTokenListener(appCheck.app, listener)
	};
}
var name$2 = "@firebase/app-check";
var version$2 = "0.10.1";
var APP_CHECK_NAME = "app-check";
var APP_CHECK_NAME_INTERNAL = "app-check-internal";
function registerAppCheck() {
	_registerComponent(new Component(APP_CHECK_NAME, (container) => {
		return factory$1(container.getProvider("app").getImmediate(), container.getProvider("heartbeat"));
	}, "PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((container, _identifier, _appcheckService) => {
		container.getProvider(APP_CHECK_NAME_INTERNAL).initialize();
	}));
	_registerComponent(new Component(APP_CHECK_NAME_INTERNAL, (container) => {
		return internalFactory(container.getProvider("app-check").getImmediate());
	}, "PUBLIC").setInstantiationMode("EXPLICIT"));
	registerVersion(name$2, version$2);
}
registerAppCheck();
var name$1 = "@firebase/database";
var version$1 = "1.0.20";
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var SDK_VERSION = "";
function setSDKVersion(version) {
	SDK_VERSION = version;
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var DOMStorageWrapper = class {
	constructor(domStorage_) {
		this.domStorage_ = domStorage_;
		this.prefix_ = "firebase:";
	}
	set(key, value) {
		if (value == null) this.domStorage_.removeItem(this.prefixedName_(key));
		else this.domStorage_.setItem(this.prefixedName_(key), stringify(value));
	}
	get(key) {
		const storedVal = this.domStorage_.getItem(this.prefixedName_(key));
		if (storedVal == null) return null;
		else return jsonEval(storedVal);
	}
	remove(key) {
		this.domStorage_.removeItem(this.prefixedName_(key));
	}
	prefixedName_(name) {
		return this.prefix_ + name;
	}
	toString() {
		return this.domStorage_.toString();
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var MemoryStorage = class {
	constructor() {
		this.cache_ = {};
		this.isInMemoryStorage = true;
	}
	set(key, value) {
		if (value == null) delete this.cache_[key];
		else this.cache_[key] = value;
	}
	get(key) {
		if (contains(this.cache_, key)) return this.cache_[key];
		return null;
	}
	remove(key) {
		delete this.cache_[key];
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var createStoragefor = function(domStorageName) {
	try {
		if (typeof window !== "undefined" && typeof window[domStorageName] !== "undefined") {
			const domStorage = window[domStorageName];
			domStorage.setItem("firebase:sentinel", "cache");
			domStorage.removeItem("firebase:sentinel");
			return new DOMStorageWrapper(domStorage);
		}
	} catch (e) {}
	return new MemoryStorage();
};
var PersistentStorage = createStoragefor("localStorage");
var SessionStorage = createStoragefor("sessionStorage");
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var logClient = new Logger("@firebase/database");
var LUIDGenerator = (function() {
	let id = 1;
	return function() {
		return id++;
	};
})();
var sha1 = function(str) {
	const utf8Bytes = stringToByteArray(str);
	const sha1 = new Sha1();
	sha1.update(utf8Bytes);
	const sha1Bytes = sha1.digest();
	return base64.encodeByteArray(sha1Bytes);
};
var buildLogMessage_ = function(...varArgs) {
	let message = "";
	for (let i = 0; i < varArgs.length; i++) {
		const arg = varArgs[i];
		if (Array.isArray(arg) || arg && typeof arg === "object" && typeof arg.length === "number") message += buildLogMessage_.apply(null, arg);
		else if (typeof arg === "object") message += stringify(arg);
		else message += arg;
		message += " ";
	}
	return message;
};
var logger = null;
var firstLog_ = true;
var enableLogging$1 = function(logger_, persistent) {
	assert(!persistent || logger_ === true || logger_ === false, "Can't turn on custom loggers persistently.");
	if (logger_ === true) {
		logClient.logLevel = LogLevel.VERBOSE;
		logger = logClient.log.bind(logClient);
		if (persistent) SessionStorage.set("logging_enabled", true);
	} else if (typeof logger_ === "function") logger = logger_;
	else {
		logger = null;
		SessionStorage.remove("logging_enabled");
	}
};
var log = function(...varArgs) {
	if (firstLog_ === true) {
		firstLog_ = false;
		if (logger === null && SessionStorage.get("logging_enabled") === true) enableLogging$1(true);
	}
	if (logger) {
		const message = buildLogMessage_.apply(null, varArgs);
		logger(message);
	}
};
var logWrapper = function(prefix) {
	return function(...varArgs) {
		log(prefix, ...varArgs);
	};
};
var error = function(...varArgs) {
	const message = "FIREBASE INTERNAL ERROR: " + buildLogMessage_(...varArgs);
	logClient.error(message);
};
var fatal = function(...varArgs) {
	const message = `FIREBASE FATAL ERROR: ${buildLogMessage_(...varArgs)}`;
	logClient.error(message);
	throw new Error(message);
};
var warn = function(...varArgs) {
	const message = "FIREBASE WARNING: " + buildLogMessage_(...varArgs);
	logClient.warn(message);
};
var warnIfPageIsSecure = function() {
	if (typeof window !== "undefined" && window.location && window.location.protocol && window.location.protocol.indexOf("https:") !== -1) warn("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
};
var isInvalidJSONNumber = function(data) {
	return typeof data === "number" && (data !== data || data === Number.POSITIVE_INFINITY || data === Number.NEGATIVE_INFINITY);
};
var executeWhenDOMReady = function(fn) {
	if (isNodeSdk() || document.readyState === "complete") fn();
	else {
		let called = false;
		const wrappedFn = function() {
			if (!document.body) {
				setTimeout(wrappedFn, Math.floor(10));
				return;
			}
			if (!called) {
				called = true;
				fn();
			}
		};
		if (document.addEventListener) {
			document.addEventListener("DOMContentLoaded", wrappedFn, false);
			window.addEventListener("load", wrappedFn, false);
		} else if (document.attachEvent) {
			document.attachEvent("onreadystatechange", () => {
				if (document.readyState === "complete") wrappedFn();
			});
			window.attachEvent("onload", wrappedFn);
		}
	}
};
var MIN_NAME = "[MIN_NAME]";
var MAX_NAME = "[MAX_NAME]";
var nameCompare = function(a, b) {
	if (a === b) return 0;
	else if (a === MIN_NAME || b === MAX_NAME) return -1;
	else if (b === MIN_NAME || a === MAX_NAME) return 1;
	else {
		const aAsInt = tryParseInt(a);
		const bAsInt = tryParseInt(b);
		if (aAsInt !== null) if (bAsInt !== null) return aAsInt - bAsInt === 0 ? a.length - b.length : aAsInt - bAsInt;
		else return -1;
		else if (bAsInt !== null) return 1;
		else return a < b ? -1 : 1;
	}
};
var stringCompare = function(a, b) {
	if (a === b) return 0;
	else if (a < b) return -1;
	else return 1;
};
var requireKey = function(key, obj) {
	if (obj && key in obj) return obj[key];
	else throw new Error("Missing required key (" + key + ") in object: " + stringify(obj));
};
var ObjectToUniqueKey = function(obj) {
	if (typeof obj !== "object" || obj === null) return stringify(obj);
	const keys = [];
	for (const k in obj) keys.push(k);
	keys.sort();
	let key = "{";
	for (let i = 0; i < keys.length; i++) {
		if (i !== 0) key += ",";
		key += stringify(keys[i]);
		key += ":";
		key += ObjectToUniqueKey(obj[keys[i]]);
	}
	key += "}";
	return key;
};
var splitStringBySize = function(str, segsize) {
	const len = str.length;
	if (len <= segsize) return [str];
	const dataSegs = [];
	for (let c = 0; c < len; c += segsize) if (c + segsize > len) dataSegs.push(str.substring(c, len));
	else dataSegs.push(str.substring(c, c + segsize));
	return dataSegs;
};
function each(obj, fn) {
	for (const key in obj) if (obj.hasOwnProperty(key)) fn(key, obj[key]);
}
var doubleToIEEE754String = function(v) {
	assert(!isInvalidJSONNumber(v), "Invalid JSON number");
	const ebits = 11;
	const fbits = 52;
	const bias = (1 << ebits - 1) - 1;
	let s;
	let e;
	let f;
	let ln;
	let i;
	if (v === 0) {
		e = 0;
		f = 0;
		s = 1 / v === -Infinity ? 1 : 0;
	} else {
		s = v < 0;
		v = Math.abs(v);
		if (v >= Math.pow(2, 1 - bias)) {
			ln = Math.min(Math.floor(Math.log(v) / Math.LN2), bias);
			e = ln + bias;
			f = Math.round(v * Math.pow(2, fbits - ln) - Math.pow(2, fbits));
		} else {
			e = 0;
			f = Math.round(v / Math.pow(2, 1 - bias - fbits));
		}
	}
	const bits = [];
	for (i = fbits; i; i -= 1) {
		bits.push(f % 2 ? 1 : 0);
		f = Math.floor(f / 2);
	}
	for (i = ebits; i; i -= 1) {
		bits.push(e % 2 ? 1 : 0);
		e = Math.floor(e / 2);
	}
	bits.push(s ? 1 : 0);
	bits.reverse();
	const str = bits.join("");
	let hexByteString = "";
	for (i = 0; i < 64; i += 8) {
		let hexByte = parseInt(str.substr(i, 8), 2).toString(16);
		if (hexByte.length === 1) hexByte = "0" + hexByte;
		hexByteString = hexByteString + hexByte;
	}
	return hexByteString.toLowerCase();
};
var isChromeExtensionContentScript = function() {
	return !!(typeof window === "object" && window["chrome"] && window["chrome"]["extension"] && !/^chrome/.test(window.location.href));
};
var isWindowsStoreApp = function() {
	return typeof Windows === "object" && typeof Windows.UI === "object";
};
var INTEGER_REGEXP_ = /* @__PURE__ */ new RegExp("^-?(0*)\\d{1,10}$");
var INTEGER_32_MIN = -2147483648;
var INTEGER_32_MAX = 2147483647;
var tryParseInt = function(str) {
	if (INTEGER_REGEXP_.test(str)) {
		const intVal = Number(str);
		if (intVal >= INTEGER_32_MIN && intVal <= INTEGER_32_MAX) return intVal;
	}
	return null;
};
var exceptionGuard = function(fn) {
	try {
		fn();
	} catch (e) {
		setTimeout(() => {
			warn("Exception was thrown by user callback.", e.stack || "");
			throw e;
		}, Math.floor(0));
	}
};
var beingCrawled = function() {
	return (typeof window === "object" && window["navigator"] && window["navigator"]["userAgent"] || "").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i) >= 0;
};
var setTimeoutNonBlocking = function(fn, time) {
	const timeout = setTimeout(fn, time);
	if (typeof timeout === "number" && typeof Deno !== "undefined" && Deno["unrefTimer"]) Deno.unrefTimer(timeout);
	else if (typeof timeout === "object" && timeout["unref"]) timeout["unref"]();
	return timeout;
};
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var AppCheckTokenProvider = class {
	constructor(app, appCheckProvider) {
		this.appCheckProvider = appCheckProvider;
		this.appName = app.name;
		if (_isFirebaseServerApp(app) && app.settings.appCheckToken) this.serverAppAppCheckToken = app.settings.appCheckToken;
		this.appCheck = appCheckProvider === null || appCheckProvider === void 0 ? void 0 : appCheckProvider.getImmediate({ optional: true });
		if (!this.appCheck) appCheckProvider === null || appCheckProvider === void 0 || appCheckProvider.get().then((appCheck) => this.appCheck = appCheck);
	}
	getToken(forceRefresh) {
		if (this.serverAppAppCheckToken) {
			if (forceRefresh) throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");
			return Promise.resolve({ token: this.serverAppAppCheckToken });
		}
		if (!this.appCheck) return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (this.appCheck) this.getToken(forceRefresh).then(resolve, reject);
				else resolve(null);
			}, 0);
		});
		return this.appCheck.getToken(forceRefresh);
	}
	addTokenChangeListener(listener) {
		var _a;
		(_a = this.appCheckProvider) === null || _a === void 0 || _a.get().then((appCheck) => appCheck.addTokenListener(listener));
	}
	notifyForInvalidToken() {
		warn(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`);
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var FirebaseAuthTokenProvider = class {
	constructor(appName_, firebaseOptions_, authProvider_) {
		this.appName_ = appName_;
		this.firebaseOptions_ = firebaseOptions_;
		this.authProvider_ = authProvider_;
		this.auth_ = null;
		this.auth_ = authProvider_.getImmediate({ optional: true });
		if (!this.auth_) authProvider_.onInit((auth) => this.auth_ = auth);
	}
	getToken(forceRefresh) {
		if (!this.auth_) return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (this.auth_) this.getToken(forceRefresh).then(resolve, reject);
				else resolve(null);
			}, 0);
		});
		return this.auth_.getToken(forceRefresh).catch((error) => {
			if (error && error.code === "auth/token-not-initialized") {
				log("Got auth/token-not-initialized error.  Treating as null token.");
				return null;
			} else return Promise.reject(error);
		});
	}
	addTokenChangeListener(listener) {
		if (this.auth_) this.auth_.addAuthTokenListener(listener);
		else this.authProvider_.get().then((auth) => auth.addAuthTokenListener(listener));
	}
	removeTokenChangeListener(listener) {
		this.authProvider_.get().then((auth) => auth.removeAuthTokenListener(listener));
	}
	notifyForInvalidToken() {
		let errorMessage = "Provided authentication credentials for the app named \"" + this.appName_ + "\" are invalid. This usually indicates your app was not initialized correctly. ";
		if ("credential" in this.firebaseOptions_) errorMessage += "Make sure the \"credential\" property provided to initializeApp() is authorized to access the specified \"databaseURL\" and is from the correct project.";
		else if ("serviceAccount" in this.firebaseOptions_) errorMessage += "Make sure the \"serviceAccount\" property provided to initializeApp() is authorized to access the specified \"databaseURL\" and is from the correct project.";
		else errorMessage += "Make sure the \"apiKey\" and \"databaseURL\" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.";
		warn(errorMessage);
	}
};
var EmulatorTokenProvider = class {
	constructor(accessToken) {
		this.accessToken = accessToken;
	}
	getToken(forceRefresh) {
		return Promise.resolve({ accessToken: this.accessToken });
	}
	addTokenChangeListener(listener) {
		listener(this.accessToken);
	}
	removeTokenChangeListener(listener) {}
	notifyForInvalidToken() {}
};
EmulatorTokenProvider.OWNER = "owner";
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var PROTOCOL_VERSION = "5";
var VERSION_PARAM = "v";
var TRANSPORT_SESSION_PARAM = "s";
var REFERER_PARAM = "r";
var FORGE_REF = "f";
var FORGE_DOMAIN_RE = /(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/;
var LAST_SESSION_PARAM = "ls";
var APPLICATION_ID_PARAM = "p";
var APP_CHECK_TOKEN_PARAM = "ac";
var WEBSOCKET = "websocket";
var LONG_POLLING = "long_polling";
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var RepoInfo = class {
	constructor(host, secure, namespace, webSocketOnly, nodeAdmin = false, persistenceKey = "", includeNamespaceInQueryParams = false, isUsingEmulator = false, emulatorOptions = null) {
		this.secure = secure;
		this.namespace = namespace;
		this.webSocketOnly = webSocketOnly;
		this.nodeAdmin = nodeAdmin;
		this.persistenceKey = persistenceKey;
		this.includeNamespaceInQueryParams = includeNamespaceInQueryParams;
		this.isUsingEmulator = isUsingEmulator;
		this.emulatorOptions = emulatorOptions;
		this._host = host.toLowerCase();
		this._domain = this._host.substr(this._host.indexOf(".") + 1);
		this.internalHost = PersistentStorage.get("host:" + host) || this._host;
	}
	isCacheableHost() {
		return this.internalHost.substr(0, 2) === "s-";
	}
	isCustomHost() {
		return this._domain !== "firebaseio.com" && this._domain !== "firebaseio-demo.com";
	}
	get host() {
		return this._host;
	}
	set host(newHost) {
		if (newHost !== this.internalHost) {
			this.internalHost = newHost;
			if (this.isCacheableHost()) PersistentStorage.set("host:" + this._host, this.internalHost);
		}
	}
	toString() {
		let str = this.toURLString();
		if (this.persistenceKey) str += "<" + this.persistenceKey + ">";
		return str;
	}
	toURLString() {
		const protocol = this.secure ? "https://" : "http://";
		const query = this.includeNamespaceInQueryParams ? `?ns=${this.namespace}` : "";
		return `${protocol}${this.host}/${query}`;
	}
};
function repoInfoNeedsQueryParam(repoInfo) {
	return repoInfo.host !== repoInfo.internalHost || repoInfo.isCustomHost() || repoInfo.includeNamespaceInQueryParams;
}
function repoInfoConnectionURL(repoInfo, type, params) {
	assert(typeof type === "string", "typeof type must == string");
	assert(typeof params === "object", "typeof params must == object");
	let connURL;
	if (type === WEBSOCKET) connURL = (repoInfo.secure ? "wss://" : "ws://") + repoInfo.internalHost + "/.ws?";
	else if (type === LONG_POLLING) connURL = (repoInfo.secure ? "https://" : "http://") + repoInfo.internalHost + "/.lp?";
	else throw new Error("Unknown connection type: " + type);
	if (repoInfoNeedsQueryParam(repoInfo)) params["ns"] = repoInfo.namespace;
	const pairs = [];
	each(params, (key, value) => {
		pairs.push(key + "=" + value);
	});
	return connURL + pairs.join("&");
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var StatsCollection = class {
	constructor() {
		this.counters_ = {};
	}
	incrementCounter(name, amount = 1) {
		if (!contains(this.counters_, name)) this.counters_[name] = 0;
		this.counters_[name] += amount;
	}
	get() {
		return deepCopy(this.counters_);
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var collections = {};
var reporters = {};
function statsManagerGetCollection(repoInfo) {
	const hashString = repoInfo.toString();
	if (!collections[hashString]) collections[hashString] = new StatsCollection();
	return collections[hashString];
}
function statsManagerGetOrCreateReporter(repoInfo, creatorFunction) {
	const hashString = repoInfo.toString();
	if (!reporters[hashString]) reporters[hashString] = creatorFunction();
	return reporters[hashString];
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var PacketReceiver = class {
	constructor(onMessage_) {
		this.onMessage_ = onMessage_;
		this.pendingResponses = [];
		this.currentResponseNum = 0;
		this.closeAfterResponse = -1;
		this.onClose = null;
	}
	closeAfter(responseNum, callback) {
		this.closeAfterResponse = responseNum;
		this.onClose = callback;
		if (this.closeAfterResponse < this.currentResponseNum) {
			this.onClose();
			this.onClose = null;
		}
	}
	handleResponse(requestNum, data) {
		this.pendingResponses[requestNum] = data;
		while (this.pendingResponses[this.currentResponseNum]) {
			const toProcess = this.pendingResponses[this.currentResponseNum];
			delete this.pendingResponses[this.currentResponseNum];
			for (let i = 0; i < toProcess.length; ++i) if (toProcess[i]) exceptionGuard(() => {
				this.onMessage_(toProcess[i]);
			});
			if (this.currentResponseNum === this.closeAfterResponse) {
				if (this.onClose) {
					this.onClose();
					this.onClose = null;
				}
				break;
			}
			this.currentResponseNum++;
		}
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var FIREBASE_LONGPOLL_START_PARAM = "start";
var FIREBASE_LONGPOLL_CLOSE_COMMAND = "close";
var FIREBASE_LONGPOLL_COMMAND_CB_NAME = "pLPCommand";
var FIREBASE_LONGPOLL_DATA_CB_NAME = "pRTLPCB";
var FIREBASE_LONGPOLL_ID_PARAM = "id";
var FIREBASE_LONGPOLL_PW_PARAM = "pw";
var FIREBASE_LONGPOLL_SERIAL_PARAM = "ser";
var FIREBASE_LONGPOLL_CALLBACK_ID_PARAM = "cb";
var FIREBASE_LONGPOLL_DISCONN_FRAME_REQUEST_PARAM = "dframe";
var MAX_URL_DATA_SIZE = 1870;
var SEG_HEADER_SIZE = 30;
var MAX_PAYLOAD_SIZE = MAX_URL_DATA_SIZE - SEG_HEADER_SIZE;
var KEEPALIVE_REQUEST_INTERVAL = 25e3;
var LP_CONNECT_TIMEOUT = 3e4;
var BrowserPollConnection = class BrowserPollConnection {
	constructor(connId, repoInfo, applicationId, appCheckToken, authToken, transportSessionId, lastSessionId) {
		this.connId = connId;
		this.repoInfo = repoInfo;
		this.applicationId = applicationId;
		this.appCheckToken = appCheckToken;
		this.authToken = authToken;
		this.transportSessionId = transportSessionId;
		this.lastSessionId = lastSessionId;
		this.bytesSent = 0;
		this.bytesReceived = 0;
		this.everConnected_ = false;
		this.log_ = logWrapper(connId);
		this.stats_ = statsManagerGetCollection(repoInfo);
		this.urlFn = (params) => {
			if (this.appCheckToken) params[APP_CHECK_TOKEN_PARAM] = this.appCheckToken;
			return repoInfoConnectionURL(repoInfo, LONG_POLLING, params);
		};
	}
	open(onMessage, onDisconnect) {
		this.curSegmentNum = 0;
		this.onDisconnect_ = onDisconnect;
		this.myPacketOrderer = new PacketReceiver(onMessage);
		this.isClosed_ = false;
		this.connectTimeoutTimer_ = setTimeout(() => {
			this.log_("Timed out trying to connect.");
			this.onClosed_();
			this.connectTimeoutTimer_ = null;
		}, Math.floor(LP_CONNECT_TIMEOUT));
		executeWhenDOMReady(() => {
			if (this.isClosed_) return;
			this.scriptTagHolder = new FirebaseIFrameScriptHolder((...args) => {
				const [command, arg1, arg2, arg3, arg4] = args;
				this.incrementIncomingBytes_(args);
				if (!this.scriptTagHolder) return;
				if (this.connectTimeoutTimer_) {
					clearTimeout(this.connectTimeoutTimer_);
					this.connectTimeoutTimer_ = null;
				}
				this.everConnected_ = true;
				if (command === FIREBASE_LONGPOLL_START_PARAM) {
					this.id = arg1;
					this.password = arg2;
				} else if (command === FIREBASE_LONGPOLL_CLOSE_COMMAND) if (arg1) {
					this.scriptTagHolder.sendNewPolls = false;
					this.myPacketOrderer.closeAfter(arg1, () => {
						this.onClosed_();
					});
				} else this.onClosed_();
				else throw new Error("Unrecognized command received: " + command);
			}, (...args) => {
				const [pN, data] = args;
				this.incrementIncomingBytes_(args);
				this.myPacketOrderer.handleResponse(pN, data);
			}, () => {
				this.onClosed_();
			}, this.urlFn);
			const urlParams = {};
			urlParams[FIREBASE_LONGPOLL_START_PARAM] = "t";
			urlParams[FIREBASE_LONGPOLL_SERIAL_PARAM] = Math.floor(Math.random() * 1e8);
			if (this.scriptTagHolder.uniqueCallbackIdentifier) urlParams[FIREBASE_LONGPOLL_CALLBACK_ID_PARAM] = this.scriptTagHolder.uniqueCallbackIdentifier;
			urlParams[VERSION_PARAM] = PROTOCOL_VERSION;
			if (this.transportSessionId) urlParams[TRANSPORT_SESSION_PARAM] = this.transportSessionId;
			if (this.lastSessionId) urlParams[LAST_SESSION_PARAM] = this.lastSessionId;
			if (this.applicationId) urlParams[APPLICATION_ID_PARAM] = this.applicationId;
			if (this.appCheckToken) urlParams[APP_CHECK_TOKEN_PARAM] = this.appCheckToken;
			if (typeof location !== "undefined" && location.hostname && FORGE_DOMAIN_RE.test(location.hostname)) urlParams[REFERER_PARAM] = FORGE_REF;
			const connectURL = this.urlFn(urlParams);
			this.log_("Connecting via long-poll to " + connectURL);
			this.scriptTagHolder.addTag(connectURL, () => {});
		});
	}
	start() {
		this.scriptTagHolder.startLongPoll(this.id, this.password);
		this.addDisconnectPingFrame(this.id, this.password);
	}
	static forceAllow() {
		BrowserPollConnection.forceAllow_ = true;
	}
	static forceDisallow() {
		BrowserPollConnection.forceDisallow_ = true;
	}
	static isAvailable() {
		if (isNodeSdk()) return false;
		else if (BrowserPollConnection.forceAllow_) return true;
		else return !BrowserPollConnection.forceDisallow_ && typeof document !== "undefined" && document.createElement != null && !isChromeExtensionContentScript() && !isWindowsStoreApp();
	}
	markConnectionHealthy() {}
	shutdown_() {
		this.isClosed_ = true;
		if (this.scriptTagHolder) {
			this.scriptTagHolder.close();
			this.scriptTagHolder = null;
		}
		if (this.myDisconnFrame) {
			document.body.removeChild(this.myDisconnFrame);
			this.myDisconnFrame = null;
		}
		if (this.connectTimeoutTimer_) {
			clearTimeout(this.connectTimeoutTimer_);
			this.connectTimeoutTimer_ = null;
		}
	}
	onClosed_() {
		if (!this.isClosed_) {
			this.log_("Longpoll is closing itself");
			this.shutdown_();
			if (this.onDisconnect_) {
				this.onDisconnect_(this.everConnected_);
				this.onDisconnect_ = null;
			}
		}
	}
	close() {
		if (!this.isClosed_) {
			this.log_("Longpoll is being closed.");
			this.shutdown_();
		}
	}
	send(data) {
		const dataStr = stringify(data);
		this.bytesSent += dataStr.length;
		this.stats_.incrementCounter("bytes_sent", dataStr.length);
		const dataSegs = splitStringBySize(base64Encode(dataStr), MAX_PAYLOAD_SIZE);
		for (let i = 0; i < dataSegs.length; i++) {
			this.scriptTagHolder.enqueueSegment(this.curSegmentNum, dataSegs.length, dataSegs[i]);
			this.curSegmentNum++;
		}
	}
	addDisconnectPingFrame(id, pw) {
		if (isNodeSdk()) return;
		this.myDisconnFrame = document.createElement("iframe");
		const urlParams = {};
		urlParams[FIREBASE_LONGPOLL_DISCONN_FRAME_REQUEST_PARAM] = "t";
		urlParams[FIREBASE_LONGPOLL_ID_PARAM] = id;
		urlParams[FIREBASE_LONGPOLL_PW_PARAM] = pw;
		this.myDisconnFrame.src = this.urlFn(urlParams);
		this.myDisconnFrame.style.display = "none";
		document.body.appendChild(this.myDisconnFrame);
	}
	incrementIncomingBytes_(args) {
		const bytesReceived = stringify(args).length;
		this.bytesReceived += bytesReceived;
		this.stats_.incrementCounter("bytes_received", bytesReceived);
	}
};
var FirebaseIFrameScriptHolder = class FirebaseIFrameScriptHolder {
	constructor(commandCB, onMessageCB, onDisconnect, urlFn) {
		this.onDisconnect = onDisconnect;
		this.urlFn = urlFn;
		this.outstandingRequests = /* @__PURE__ */ new Set();
		this.pendingSegs = [];
		this.currentSerial = Math.floor(Math.random() * 1e8);
		this.sendNewPolls = true;
		if (!isNodeSdk()) {
			this.uniqueCallbackIdentifier = LUIDGenerator();
			window[FIREBASE_LONGPOLL_COMMAND_CB_NAME + this.uniqueCallbackIdentifier] = commandCB;
			window[FIREBASE_LONGPOLL_DATA_CB_NAME + this.uniqueCallbackIdentifier] = onMessageCB;
			this.myIFrame = FirebaseIFrameScriptHolder.createIFrame_();
			let script = "";
			if (this.myIFrame.src && this.myIFrame.src.substr(0, 11) === "javascript:") script = "<script>document.domain=\"" + document.domain + "\";<\/script>";
			const iframeContents = "<html><body>" + script + "</body></html>";
			try {
				this.myIFrame.doc.open();
				this.myIFrame.doc.write(iframeContents);
				this.myIFrame.doc.close();
			} catch (e) {
				log("frame writing exception");
				if (e.stack) log(e.stack);
				log(e);
			}
		} else {
			this.commandCB = commandCB;
			this.onMessageCB = onMessageCB;
		}
	}
	static createIFrame_() {
		const iframe = document.createElement("iframe");
		iframe.style.display = "none";
		if (document.body) {
			document.body.appendChild(iframe);
			try {
				if (!iframe.contentWindow.document) log("No IE domain setting required");
			} catch (e) {
				iframe.src = "javascript:void((function(){document.open();document.domain='" + document.domain + "';document.close();})())";
			}
		} else throw "Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
		if (iframe.contentDocument) iframe.doc = iframe.contentDocument;
		else if (iframe.contentWindow) iframe.doc = iframe.contentWindow.document;
		else if (iframe.document) iframe.doc = iframe.document;
		return iframe;
	}
	close() {
		this.alive = false;
		if (this.myIFrame) {
			this.myIFrame.doc.body.textContent = "";
			setTimeout(() => {
				if (this.myIFrame !== null) {
					document.body.removeChild(this.myIFrame);
					this.myIFrame = null;
				}
			}, Math.floor(0));
		}
		const onDisconnect = this.onDisconnect;
		if (onDisconnect) {
			this.onDisconnect = null;
			onDisconnect();
		}
	}
	startLongPoll(id, pw) {
		this.myID = id;
		this.myPW = pw;
		this.alive = true;
		while (this.newRequest_());
	}
	newRequest_() {
		if (this.alive && this.sendNewPolls && this.outstandingRequests.size < (this.pendingSegs.length > 0 ? 2 : 1)) {
			this.currentSerial++;
			const urlParams = {};
			urlParams[FIREBASE_LONGPOLL_ID_PARAM] = this.myID;
			urlParams[FIREBASE_LONGPOLL_PW_PARAM] = this.myPW;
			urlParams[FIREBASE_LONGPOLL_SERIAL_PARAM] = this.currentSerial;
			let theURL = this.urlFn(urlParams);
			let curDataString = "";
			let i = 0;
			while (this.pendingSegs.length > 0) if (this.pendingSegs[0].d.length + SEG_HEADER_SIZE + curDataString.length <= MAX_URL_DATA_SIZE) {
				const theSeg = this.pendingSegs.shift();
				curDataString = curDataString + "&seg" + i + "=" + theSeg.seg + "&ts" + i + "=" + theSeg.ts + "&d" + i + "=" + theSeg.d;
				i++;
			} else break;
			theURL = theURL + curDataString;
			this.addLongPollTag_(theURL, this.currentSerial);
			return true;
		} else return false;
	}
	enqueueSegment(segnum, totalsegs, data) {
		this.pendingSegs.push({
			seg: segnum,
			ts: totalsegs,
			d: data
		});
		if (this.alive) this.newRequest_();
	}
	addLongPollTag_(url, serial) {
		this.outstandingRequests.add(serial);
		const doNewRequest = () => {
			this.outstandingRequests.delete(serial);
			this.newRequest_();
		};
		const keepaliveTimeout = setTimeout(doNewRequest, Math.floor(KEEPALIVE_REQUEST_INTERVAL));
		const readyStateCB = () => {
			clearTimeout(keepaliveTimeout);
			doNewRequest();
		};
		this.addTag(url, readyStateCB);
	}
	addTag(url, loadCB) {
		if (isNodeSdk()) this.doNodeLongPoll(url, loadCB);
		else setTimeout(() => {
			try {
				if (!this.sendNewPolls) return;
				const newScript = this.myIFrame.doc.createElement("script");
				newScript.type = "text/javascript";
				newScript.async = true;
				newScript.src = url;
				newScript.onload = newScript.onreadystatechange = function() {
					const rstate = newScript.readyState;
					if (!rstate || rstate === "loaded" || rstate === "complete") {
						newScript.onload = newScript.onreadystatechange = null;
						if (newScript.parentNode) newScript.parentNode.removeChild(newScript);
						loadCB();
					}
				};
				newScript.onerror = () => {
					log("Long-poll script failed to load: " + url);
					this.sendNewPolls = false;
					this.close();
				};
				this.myIFrame.doc.body.appendChild(newScript);
			} catch (e) {}
		}, Math.floor(1));
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var WEBSOCKET_MAX_FRAME_SIZE = 16384;
var WEBSOCKET_KEEPALIVE_INTERVAL = 45e3;
var WebSocketImpl = null;
if (typeof MozWebSocket !== "undefined") WebSocketImpl = MozWebSocket;
else if (typeof WebSocket !== "undefined") WebSocketImpl = WebSocket;
var WebSocketConnection = class WebSocketConnection {
	constructor(connId, repoInfo, applicationId, appCheckToken, authToken, transportSessionId, lastSessionId) {
		this.connId = connId;
		this.applicationId = applicationId;
		this.appCheckToken = appCheckToken;
		this.authToken = authToken;
		this.keepaliveTimer = null;
		this.frames = null;
		this.totalFrames = 0;
		this.bytesSent = 0;
		this.bytesReceived = 0;
		this.log_ = logWrapper(this.connId);
		this.stats_ = statsManagerGetCollection(repoInfo);
		this.connURL = WebSocketConnection.connectionURL_(repoInfo, transportSessionId, lastSessionId, appCheckToken, applicationId);
		this.nodeAdmin = repoInfo.nodeAdmin;
	}
	static connectionURL_(repoInfo, transportSessionId, lastSessionId, appCheckToken, applicationId) {
		const urlParams = {};
		urlParams[VERSION_PARAM] = PROTOCOL_VERSION;
		if (!isNodeSdk() && typeof location !== "undefined" && location.hostname && FORGE_DOMAIN_RE.test(location.hostname)) urlParams[REFERER_PARAM] = FORGE_REF;
		if (transportSessionId) urlParams[TRANSPORT_SESSION_PARAM] = transportSessionId;
		if (lastSessionId) urlParams[LAST_SESSION_PARAM] = lastSessionId;
		if (appCheckToken) urlParams[APP_CHECK_TOKEN_PARAM] = appCheckToken;
		if (applicationId) urlParams[APPLICATION_ID_PARAM] = applicationId;
		return repoInfoConnectionURL(repoInfo, WEBSOCKET, urlParams);
	}
	open(onMessage, onDisconnect) {
		this.onDisconnect = onDisconnect;
		this.onMessage = onMessage;
		this.log_("Websocket connecting to " + this.connURL);
		this.everConnected_ = false;
		PersistentStorage.set("previous_websocket_failure", true);
		try {
			let options;
			if (isNodeSdk()) {
				const device = this.nodeAdmin ? "AdminNode" : "Node";
				options = { headers: {
					"User-Agent": `Firebase/${PROTOCOL_VERSION}/${SDK_VERSION}/${process.platform}/${device}`,
					"X-Firebase-GMPID": this.applicationId || ""
				} };
				if (this.authToken) options.headers["Authorization"] = `Bearer ${this.authToken}`;
				if (this.appCheckToken) options.headers["X-Firebase-AppCheck"] = this.appCheckToken;
				const env = {};
				const proxy = this.connURL.indexOf("wss://") === 0 ? env["HTTPS_PROXY"] || env["https_proxy"] : env["HTTP_PROXY"] || env["http_proxy"];
				if (proxy) options["proxy"] = { origin: proxy };
			}
			this.mySock = new WebSocketImpl(this.connURL, [], options);
		} catch (e) {
			this.log_("Error instantiating WebSocket.");
			const error = e.message || e.data;
			if (error) this.log_(error);
			this.onClosed_();
			return;
		}
		this.mySock.onopen = () => {
			this.log_("Websocket connected.");
			this.everConnected_ = true;
		};
		this.mySock.onclose = () => {
			this.log_("Websocket connection was disconnected.");
			this.mySock = null;
			this.onClosed_();
		};
		this.mySock.onmessage = (m) => {
			this.handleIncomingFrame(m);
		};
		this.mySock.onerror = (e) => {
			this.log_("WebSocket error.  Closing connection.");
			const error = e.message || e.data;
			if (error) this.log_(error);
			this.onClosed_();
		};
	}
	start() {}
	static forceDisallow() {
		WebSocketConnection.forceDisallow_ = true;
	}
	static isAvailable() {
		let isOldAndroid = false;
		if (typeof navigator !== "undefined" && navigator.userAgent) {
			const oldAndroidMatch = navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);
			if (oldAndroidMatch && oldAndroidMatch.length > 1) {
				if (parseFloat(oldAndroidMatch[1]) < 4.4) isOldAndroid = true;
			}
		}
		return !isOldAndroid && WebSocketImpl !== null && !WebSocketConnection.forceDisallow_;
	}
	static previouslyFailed() {
		return PersistentStorage.isInMemoryStorage || PersistentStorage.get("previous_websocket_failure") === true;
	}
	markConnectionHealthy() {
		PersistentStorage.remove("previous_websocket_failure");
	}
	appendFrame_(data) {
		this.frames.push(data);
		if (this.frames.length === this.totalFrames) {
			const fullMess = this.frames.join("");
			this.frames = null;
			const jsonMess = jsonEval(fullMess);
			this.onMessage(jsonMess);
		}
	}
	handleNewFrameCount_(frameCount) {
		this.totalFrames = frameCount;
		this.frames = [];
	}
	extractFrameCount_(data) {
		assert(this.frames === null, "We already have a frame buffer");
		if (data.length <= 6) {
			const frameCount = Number(data);
			if (!isNaN(frameCount)) {
				this.handleNewFrameCount_(frameCount);
				return null;
			}
		}
		this.handleNewFrameCount_(1);
		return data;
	}
	handleIncomingFrame(mess) {
		if (this.mySock === null) return;
		const data = mess["data"];
		this.bytesReceived += data.length;
		this.stats_.incrementCounter("bytes_received", data.length);
		this.resetKeepAlive();
		if (this.frames !== null) this.appendFrame_(data);
		else {
			const remainingData = this.extractFrameCount_(data);
			if (remainingData !== null) this.appendFrame_(remainingData);
		}
	}
	send(data) {
		this.resetKeepAlive();
		const dataStr = stringify(data);
		this.bytesSent += dataStr.length;
		this.stats_.incrementCounter("bytes_sent", dataStr.length);
		const dataSegs = splitStringBySize(dataStr, WEBSOCKET_MAX_FRAME_SIZE);
		if (dataSegs.length > 1) this.sendString_(String(dataSegs.length));
		for (let i = 0; i < dataSegs.length; i++) this.sendString_(dataSegs[i]);
	}
	shutdown_() {
		this.isClosed_ = true;
		if (this.keepaliveTimer) {
			clearInterval(this.keepaliveTimer);
			this.keepaliveTimer = null;
		}
		if (this.mySock) {
			this.mySock.close();
			this.mySock = null;
		}
	}
	onClosed_() {
		if (!this.isClosed_) {
			this.log_("WebSocket is closing itself");
			this.shutdown_();
			if (this.onDisconnect) {
				this.onDisconnect(this.everConnected_);
				this.onDisconnect = null;
			}
		}
	}
	close() {
		if (!this.isClosed_) {
			this.log_("WebSocket is being closed");
			this.shutdown_();
		}
	}
	resetKeepAlive() {
		clearInterval(this.keepaliveTimer);
		this.keepaliveTimer = setInterval(() => {
			if (this.mySock) this.sendString_("0");
			this.resetKeepAlive();
		}, Math.floor(WEBSOCKET_KEEPALIVE_INTERVAL));
	}
	sendString_(str) {
		try {
			this.mySock.send(str);
		} catch (e) {
			this.log_("Exception thrown from WebSocket.send():", e.message || e.data, "Closing connection.");
			setTimeout(this.onClosed_.bind(this), 0);
		}
	}
};
WebSocketConnection.responsesRequiredToBeHealthy = 2;
WebSocketConnection.healthyTimeout = 3e4;
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var TransportManager = class TransportManager {
	static get ALL_TRANSPORTS() {
		return [BrowserPollConnection, WebSocketConnection];
	}
	static get IS_TRANSPORT_INITIALIZED() {
		return this.globalTransportInitialized_;
	}
	constructor(repoInfo) {
		this.initTransports_(repoInfo);
	}
	initTransports_(repoInfo) {
		const isWebSocketsAvailable = WebSocketConnection && WebSocketConnection["isAvailable"]();
		let isSkipPollConnection = isWebSocketsAvailable && !WebSocketConnection.previouslyFailed();
		if (repoInfo.webSocketOnly) {
			if (!isWebSocketsAvailable) warn("wss:// URL used, but browser isn't known to support websockets.  Trying anyway.");
			isSkipPollConnection = true;
		}
		if (isSkipPollConnection) this.transports_ = [WebSocketConnection];
		else {
			const transports = this.transports_ = [];
			for (const transport of TransportManager.ALL_TRANSPORTS) if (transport && transport["isAvailable"]()) transports.push(transport);
			TransportManager.globalTransportInitialized_ = true;
		}
	}
	initialTransport() {
		if (this.transports_.length > 0) return this.transports_[0];
		else throw new Error("No transports available");
	}
	upgradeTransport() {
		if (this.transports_.length > 1) return this.transports_[1];
		else return null;
	}
};
TransportManager.globalTransportInitialized_ = false;
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var UPGRADE_TIMEOUT = 6e4;
var DELAY_BEFORE_SENDING_EXTRA_REQUESTS = 5e3;
var BYTES_SENT_HEALTHY_OVERRIDE = 10 * 1024;
var BYTES_RECEIVED_HEALTHY_OVERRIDE = 100 * 1024;
var MESSAGE_TYPE = "t";
var MESSAGE_DATA = "d";
var CONTROL_SHUTDOWN = "s";
var CONTROL_RESET = "r";
var CONTROL_ERROR = "e";
var CONTROL_PONG = "o";
var SWITCH_ACK = "a";
var END_TRANSMISSION = "n";
var PING = "p";
var SERVER_HELLO = "h";
var Connection = class {
	constructor(id, repoInfo_, applicationId_, appCheckToken_, authToken_, onMessage_, onReady_, onDisconnect_, onKill_, lastSessionId) {
		this.id = id;
		this.repoInfo_ = repoInfo_;
		this.applicationId_ = applicationId_;
		this.appCheckToken_ = appCheckToken_;
		this.authToken_ = authToken_;
		this.onMessage_ = onMessage_;
		this.onReady_ = onReady_;
		this.onDisconnect_ = onDisconnect_;
		this.onKill_ = onKill_;
		this.lastSessionId = lastSessionId;
		this.connectionCount = 0;
		this.pendingDataMessages = [];
		this.state_ = 0;
		this.log_ = logWrapper("c:" + this.id + ":");
		this.transportManager_ = new TransportManager(repoInfo_);
		this.log_("Connection created");
		this.start_();
	}
	start_() {
		const conn = this.transportManager_.initialTransport();
		this.conn_ = new conn(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, null, this.lastSessionId);
		this.primaryResponsesRequired_ = conn["responsesRequiredToBeHealthy"] || 0;
		const onMessageReceived = this.connReceiver_(this.conn_);
		const onConnectionLost = this.disconnReceiver_(this.conn_);
		this.tx_ = this.conn_;
		this.rx_ = this.conn_;
		this.secondaryConn_ = null;
		this.isHealthy_ = false;
		setTimeout(() => {
			this.conn_ && this.conn_.open(onMessageReceived, onConnectionLost);
		}, Math.floor(0));
		const healthyTimeoutMS = conn["healthyTimeout"] || 0;
		if (healthyTimeoutMS > 0) this.healthyTimeout_ = setTimeoutNonBlocking(() => {
			this.healthyTimeout_ = null;
			if (!this.isHealthy_) if (this.conn_ && this.conn_.bytesReceived > BYTES_RECEIVED_HEALTHY_OVERRIDE) {
				this.log_("Connection exceeded healthy timeout but has received " + this.conn_.bytesReceived + " bytes.  Marking connection healthy.");
				this.isHealthy_ = true;
				this.conn_.markConnectionHealthy();
			} else if (this.conn_ && this.conn_.bytesSent > BYTES_SENT_HEALTHY_OVERRIDE) this.log_("Connection exceeded healthy timeout but has sent " + this.conn_.bytesSent + " bytes.  Leaving connection alive.");
			else {
				this.log_("Closing unhealthy connection after timeout.");
				this.close();
			}
		}, Math.floor(healthyTimeoutMS));
	}
	nextTransportId_() {
		return "c:" + this.id + ":" + this.connectionCount++;
	}
	disconnReceiver_(conn) {
		return (everConnected) => {
			if (conn === this.conn_) this.onConnectionLost_(everConnected);
			else if (conn === this.secondaryConn_) {
				this.log_("Secondary connection lost.");
				this.onSecondaryConnectionLost_();
			} else this.log_("closing an old connection");
		};
	}
	connReceiver_(conn) {
		return (message) => {
			if (this.state_ !== 2) if (conn === this.rx_) this.onPrimaryMessageReceived_(message);
			else if (conn === this.secondaryConn_) this.onSecondaryMessageReceived_(message);
			else this.log_("message on old connection");
		};
	}
	sendRequest(dataMsg) {
		const msg = {
			t: "d",
			d: dataMsg
		};
		this.sendData_(msg);
	}
	tryCleanupConnection() {
		if (this.tx_ === this.secondaryConn_ && this.rx_ === this.secondaryConn_) {
			this.log_("cleaning up and promoting a connection: " + this.secondaryConn_.connId);
			this.conn_ = this.secondaryConn_;
			this.secondaryConn_ = null;
		}
	}
	onSecondaryControl_(controlData) {
		if (MESSAGE_TYPE in controlData) {
			const cmd = controlData[MESSAGE_TYPE];
			if (cmd === SWITCH_ACK) this.upgradeIfSecondaryHealthy_();
			else if (cmd === CONTROL_RESET) {
				this.log_("Got a reset on secondary, closing it");
				this.secondaryConn_.close();
				if (this.tx_ === this.secondaryConn_ || this.rx_ === this.secondaryConn_) this.close();
			} else if (cmd === CONTROL_PONG) {
				this.log_("got pong on secondary.");
				this.secondaryResponsesRequired_--;
				this.upgradeIfSecondaryHealthy_();
			}
		}
	}
	onSecondaryMessageReceived_(parsedData) {
		const layer = requireKey("t", parsedData);
		const data = requireKey("d", parsedData);
		if (layer === "c") this.onSecondaryControl_(data);
		else if (layer === "d") this.pendingDataMessages.push(data);
		else throw new Error("Unknown protocol layer: " + layer);
	}
	upgradeIfSecondaryHealthy_() {
		if (this.secondaryResponsesRequired_ <= 0) {
			this.log_("Secondary connection is healthy.");
			this.isHealthy_ = true;
			this.secondaryConn_.markConnectionHealthy();
			this.proceedWithUpgrade_();
		} else {
			this.log_("sending ping on secondary.");
			this.secondaryConn_.send({
				t: "c",
				d: {
					t: PING,
					d: {}
				}
			});
		}
	}
	proceedWithUpgrade_() {
		this.secondaryConn_.start();
		this.log_("sending client ack on secondary");
		this.secondaryConn_.send({
			t: "c",
			d: {
				t: SWITCH_ACK,
				d: {}
			}
		});
		this.log_("Ending transmission on primary");
		this.conn_.send({
			t: "c",
			d: {
				t: END_TRANSMISSION,
				d: {}
			}
		});
		this.tx_ = this.secondaryConn_;
		this.tryCleanupConnection();
	}
	onPrimaryMessageReceived_(parsedData) {
		const layer = requireKey("t", parsedData);
		const data = requireKey("d", parsedData);
		if (layer === "c") this.onControl_(data);
		else if (layer === "d") this.onDataMessage_(data);
	}
	onDataMessage_(message) {
		this.onPrimaryResponse_();
		this.onMessage_(message);
	}
	onPrimaryResponse_() {
		if (!this.isHealthy_) {
			this.primaryResponsesRequired_--;
			if (this.primaryResponsesRequired_ <= 0) {
				this.log_("Primary connection is healthy.");
				this.isHealthy_ = true;
				this.conn_.markConnectionHealthy();
			}
		}
	}
	onControl_(controlData) {
		const cmd = requireKey(MESSAGE_TYPE, controlData);
		if (MESSAGE_DATA in controlData) {
			const payload = controlData[MESSAGE_DATA];
			if (cmd === SERVER_HELLO) {
				const handshakePayload = Object.assign({}, payload);
				if (this.repoInfo_.isUsingEmulator) handshakePayload.h = this.repoInfo_.host;
				this.onHandshake_(handshakePayload);
			} else if (cmd === END_TRANSMISSION) {
				this.log_("recvd end transmission on primary");
				this.rx_ = this.secondaryConn_;
				for (let i = 0; i < this.pendingDataMessages.length; ++i) this.onDataMessage_(this.pendingDataMessages[i]);
				this.pendingDataMessages = [];
				this.tryCleanupConnection();
			} else if (cmd === CONTROL_SHUTDOWN) this.onConnectionShutdown_(payload);
			else if (cmd === CONTROL_RESET) this.onReset_(payload);
			else if (cmd === CONTROL_ERROR) error("Server Error: " + payload);
			else if (cmd === CONTROL_PONG) {
				this.log_("got pong on primary.");
				this.onPrimaryResponse_();
				this.sendPingOnPrimaryIfNecessary_();
			} else error("Unknown control packet command: " + cmd);
		}
	}
	onHandshake_(handshake) {
		const timestamp = handshake.ts;
		const version = handshake.v;
		const host = handshake.h;
		this.sessionId = handshake.s;
		this.repoInfo_.host = host;
		if (this.state_ === 0) {
			this.conn_.start();
			this.onConnectionEstablished_(this.conn_, timestamp);
			if (PROTOCOL_VERSION !== version) warn("Protocol version mismatch detected");
			this.tryStartUpgrade_();
		}
	}
	tryStartUpgrade_() {
		const conn = this.transportManager_.upgradeTransport();
		if (conn) this.startUpgrade_(conn);
	}
	startUpgrade_(conn) {
		this.secondaryConn_ = new conn(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, this.sessionId);
		this.secondaryResponsesRequired_ = conn["responsesRequiredToBeHealthy"] || 0;
		const onMessage = this.connReceiver_(this.secondaryConn_);
		const onDisconnect = this.disconnReceiver_(this.secondaryConn_);
		this.secondaryConn_.open(onMessage, onDisconnect);
		setTimeoutNonBlocking(() => {
			if (this.secondaryConn_) {
				this.log_("Timed out trying to upgrade.");
				this.secondaryConn_.close();
			}
		}, Math.floor(UPGRADE_TIMEOUT));
	}
	onReset_(host) {
		this.log_("Reset packet received.  New host: " + host);
		this.repoInfo_.host = host;
		if (this.state_ === 1) this.close();
		else {
			this.closeConnections_();
			this.start_();
		}
	}
	onConnectionEstablished_(conn, timestamp) {
		this.log_("Realtime connection established.");
		this.conn_ = conn;
		this.state_ = 1;
		if (this.onReady_) {
			this.onReady_(timestamp, this.sessionId);
			this.onReady_ = null;
		}
		if (this.primaryResponsesRequired_ === 0) {
			this.log_("Primary connection is healthy.");
			this.isHealthy_ = true;
		} else setTimeoutNonBlocking(() => {
			this.sendPingOnPrimaryIfNecessary_();
		}, Math.floor(DELAY_BEFORE_SENDING_EXTRA_REQUESTS));
	}
	sendPingOnPrimaryIfNecessary_() {
		if (!this.isHealthy_ && this.state_ === 1) {
			this.log_("sending ping on primary.");
			this.sendData_({
				t: "c",
				d: {
					t: PING,
					d: {}
				}
			});
		}
	}
	onSecondaryConnectionLost_() {
		const conn = this.secondaryConn_;
		this.secondaryConn_ = null;
		if (this.tx_ === conn || this.rx_ === conn) this.close();
	}
	onConnectionLost_(everConnected) {
		this.conn_ = null;
		if (!everConnected && this.state_ === 0) {
			this.log_("Realtime connection failed.");
			if (this.repoInfo_.isCacheableHost()) {
				PersistentStorage.remove("host:" + this.repoInfo_.host);
				this.repoInfo_.internalHost = this.repoInfo_.host;
			}
		} else if (this.state_ === 1) this.log_("Realtime connection lost.");
		this.close();
	}
	onConnectionShutdown_(reason) {
		this.log_("Connection shutdown command received. Shutting down...");
		if (this.onKill_) {
			this.onKill_(reason);
			this.onKill_ = null;
		}
		this.onDisconnect_ = null;
		this.close();
	}
	sendData_(data) {
		if (this.state_ !== 1) throw "Connection is not connected";
		else this.tx_.send(data);
	}
	close() {
		if (this.state_ !== 2) {
			this.log_("Closing realtime connection.");
			this.state_ = 2;
			this.closeConnections_();
			if (this.onDisconnect_) {
				this.onDisconnect_();
				this.onDisconnect_ = null;
			}
		}
	}
	closeConnections_() {
		this.log_("Shutting down all connections");
		if (this.conn_) {
			this.conn_.close();
			this.conn_ = null;
		}
		if (this.secondaryConn_) {
			this.secondaryConn_.close();
			this.secondaryConn_ = null;
		}
		if (this.healthyTimeout_) {
			clearTimeout(this.healthyTimeout_);
			this.healthyTimeout_ = null;
		}
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var ServerActions = class {
	put(pathString, data, onComplete, hash) {}
	merge(pathString, data, onComplete, hash) {}
	refreshAuthToken(token) {}
	refreshAppCheckToken(token) {}
	onDisconnectPut(pathString, data, onComplete) {}
	onDisconnectMerge(pathString, data, onComplete) {}
	onDisconnectCancel(pathString, onComplete) {}
	reportStats(stats) {}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var EventEmitter = class {
	constructor(allowedEvents_) {
		this.allowedEvents_ = allowedEvents_;
		this.listeners_ = {};
		assert(Array.isArray(allowedEvents_) && allowedEvents_.length > 0, "Requires a non-empty array");
	}
	trigger(eventType, ...varArgs) {
		if (Array.isArray(this.listeners_[eventType])) {
			const listeners = [...this.listeners_[eventType]];
			for (let i = 0; i < listeners.length; i++) listeners[i].callback.apply(listeners[i].context, varArgs);
		}
	}
	on(eventType, callback, context) {
		this.validateEventType_(eventType);
		this.listeners_[eventType] = this.listeners_[eventType] || [];
		this.listeners_[eventType].push({
			callback,
			context
		});
		const eventData = this.getInitialEvent(eventType);
		if (eventData) callback.apply(context, eventData);
	}
	off(eventType, callback, context) {
		this.validateEventType_(eventType);
		const listeners = this.listeners_[eventType] || [];
		for (let i = 0; i < listeners.length; i++) if (listeners[i].callback === callback && (!context || context === listeners[i].context)) {
			listeners.splice(i, 1);
			return;
		}
	}
	validateEventType_(eventType) {
		assert(this.allowedEvents_.find((et) => {
			return et === eventType;
		}), "Unknown event: " + eventType);
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var OnlineMonitor = class OnlineMonitor extends EventEmitter {
	static getInstance() {
		return new OnlineMonitor();
	}
	constructor() {
		super(["online"]);
		this.online_ = true;
		if (typeof window !== "undefined" && typeof window.addEventListener !== "undefined" && !isMobileCordova()) {
			window.addEventListener("online", () => {
				if (!this.online_) {
					this.online_ = true;
					this.trigger("online", true);
				}
			}, false);
			window.addEventListener("offline", () => {
				if (this.online_) {
					this.online_ = false;
					this.trigger("online", false);
				}
			}, false);
		}
	}
	getInitialEvent(eventType) {
		assert(eventType === "online", "Unknown event type: " + eventType);
		return [this.online_];
	}
	currentlyOnline() {
		return this.online_;
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var MAX_PATH_DEPTH = 32;
var MAX_PATH_LENGTH_BYTES = 768;
var Path = class {
	constructor(pathOrString, pieceNum) {
		if (pieceNum === void 0) {
			this.pieces_ = pathOrString.split("/");
			let copyTo = 0;
			for (let i = 0; i < this.pieces_.length; i++) if (this.pieces_[i].length > 0) {
				this.pieces_[copyTo] = this.pieces_[i];
				copyTo++;
			}
			this.pieces_.length = copyTo;
			this.pieceNum_ = 0;
		} else {
			this.pieces_ = pathOrString;
			this.pieceNum_ = pieceNum;
		}
	}
	toString() {
		let pathString = "";
		for (let i = this.pieceNum_; i < this.pieces_.length; i++) if (this.pieces_[i] !== "") pathString += "/" + this.pieces_[i];
		return pathString || "/";
	}
};
function newEmptyPath() {
	return new Path("");
}
function pathGetFront(path) {
	if (path.pieceNum_ >= path.pieces_.length) return null;
	return path.pieces_[path.pieceNum_];
}
function pathGetLength(path) {
	return path.pieces_.length - path.pieceNum_;
}
function pathPopFront(path) {
	let pieceNum = path.pieceNum_;
	if (pieceNum < path.pieces_.length) pieceNum++;
	return new Path(path.pieces_, pieceNum);
}
function pathGetBack(path) {
	if (path.pieceNum_ < path.pieces_.length) return path.pieces_[path.pieces_.length - 1];
	return null;
}
function pathToUrlEncodedString(path) {
	let pathString = "";
	for (let i = path.pieceNum_; i < path.pieces_.length; i++) if (path.pieces_[i] !== "") pathString += "/" + encodeURIComponent(String(path.pieces_[i]));
	return pathString || "/";
}
function pathSlice(path, begin = 0) {
	return path.pieces_.slice(path.pieceNum_ + begin);
}
function pathParent(path) {
	if (path.pieceNum_ >= path.pieces_.length) return null;
	const pieces = [];
	for (let i = path.pieceNum_; i < path.pieces_.length - 1; i++) pieces.push(path.pieces_[i]);
	return new Path(pieces, 0);
}
function pathChild(path, childPathObj) {
	const pieces = [];
	for (let i = path.pieceNum_; i < path.pieces_.length; i++) pieces.push(path.pieces_[i]);
	if (childPathObj instanceof Path) for (let i = childPathObj.pieceNum_; i < childPathObj.pieces_.length; i++) pieces.push(childPathObj.pieces_[i]);
	else {
		const childPieces = childPathObj.split("/");
		for (let i = 0; i < childPieces.length; i++) if (childPieces[i].length > 0) pieces.push(childPieces[i]);
	}
	return new Path(pieces, 0);
}
function pathIsEmpty(path) {
	return path.pieceNum_ >= path.pieces_.length;
}
function newRelativePath(outerPath, innerPath) {
	const outer = pathGetFront(outerPath);
	const inner = pathGetFront(innerPath);
	if (outer === null) return innerPath;
	else if (outer === inner) return newRelativePath(pathPopFront(outerPath), pathPopFront(innerPath));
	else throw new Error("INTERNAL ERROR: innerPath (" + innerPath + ") is not within outerPath (" + outerPath + ")");
}
function pathEquals(path, other) {
	if (pathGetLength(path) !== pathGetLength(other)) return false;
	for (let i = path.pieceNum_, j = other.pieceNum_; i <= path.pieces_.length; i++, j++) if (path.pieces_[i] !== other.pieces_[j]) return false;
	return true;
}
function pathContains(path, other) {
	let i = path.pieceNum_;
	let j = other.pieceNum_;
	if (pathGetLength(path) > pathGetLength(other)) return false;
	while (i < path.pieces_.length) {
		if (path.pieces_[i] !== other.pieces_[j]) return false;
		++i;
		++j;
	}
	return true;
}
var ValidationPath = class {
	constructor(path, errorPrefix_) {
		this.errorPrefix_ = errorPrefix_;
		this.parts_ = pathSlice(path, 0);
		this.byteLength_ = Math.max(1, this.parts_.length);
		for (let i = 0; i < this.parts_.length; i++) this.byteLength_ += stringLength(this.parts_[i]);
		validationPathCheckValid(this);
	}
};
function validationPathPush(validationPath, child) {
	if (validationPath.parts_.length > 0) validationPath.byteLength_ += 1;
	validationPath.parts_.push(child);
	validationPath.byteLength_ += stringLength(child);
	validationPathCheckValid(validationPath);
}
function validationPathPop(validationPath) {
	const last = validationPath.parts_.pop();
	validationPath.byteLength_ -= stringLength(last);
	if (validationPath.parts_.length > 0) validationPath.byteLength_ -= 1;
}
function validationPathCheckValid(validationPath) {
	if (validationPath.byteLength_ > MAX_PATH_LENGTH_BYTES) throw new Error(validationPath.errorPrefix_ + "has a key path longer than 768 bytes (" + validationPath.byteLength_ + ").");
	if (validationPath.parts_.length > MAX_PATH_DEPTH) throw new Error(validationPath.errorPrefix_ + "path specified exceeds the maximum depth that can be written (32) or object contains a cycle " + validationPathToErrorString(validationPath));
}
function validationPathToErrorString(validationPath) {
	if (validationPath.parts_.length === 0) return "";
	return "in property '" + validationPath.parts_.join(".") + "'";
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var VisibilityMonitor = class VisibilityMonitor extends EventEmitter {
	static getInstance() {
		return new VisibilityMonitor();
	}
	constructor() {
		super(["visible"]);
		let hidden;
		let visibilityChange;
		if (typeof document !== "undefined" && typeof document.addEventListener !== "undefined") {
			if (typeof document["hidden"] !== "undefined") {
				visibilityChange = "visibilitychange";
				hidden = "hidden";
			} else if (typeof document["mozHidden"] !== "undefined") {
				visibilityChange = "mozvisibilitychange";
				hidden = "mozHidden";
			} else if (typeof document["msHidden"] !== "undefined") {
				visibilityChange = "msvisibilitychange";
				hidden = "msHidden";
			} else if (typeof document["webkitHidden"] !== "undefined") {
				visibilityChange = "webkitvisibilitychange";
				hidden = "webkitHidden";
			}
		}
		this.visible_ = true;
		if (visibilityChange) document.addEventListener(visibilityChange, () => {
			const visible = !document[hidden];
			if (visible !== this.visible_) {
				this.visible_ = visible;
				this.trigger("visible", visible);
			}
		}, false);
	}
	getInitialEvent(eventType) {
		assert(eventType === "visible", "Unknown event type: " + eventType);
		return [this.visible_];
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var RECONNECT_MIN_DELAY = 1e3;
var RECONNECT_MAX_DELAY_DEFAULT = 300 * 1e3;
var RECONNECT_MAX_DELAY_FOR_ADMINS = 30 * 1e3;
var RECONNECT_DELAY_MULTIPLIER = 1.3;
var RECONNECT_DELAY_RESET_TIMEOUT = 3e4;
var SERVER_KILL_INTERRUPT_REASON = "server_kill";
var INVALID_TOKEN_THRESHOLD = 3;
var PersistentConnection = class PersistentConnection extends ServerActions {
	constructor(repoInfo_, applicationId_, onDataUpdate_, onConnectStatus_, onServerInfoUpdate_, authTokenProvider_, appCheckTokenProvider_, authOverride_) {
		super();
		this.repoInfo_ = repoInfo_;
		this.applicationId_ = applicationId_;
		this.onDataUpdate_ = onDataUpdate_;
		this.onConnectStatus_ = onConnectStatus_;
		this.onServerInfoUpdate_ = onServerInfoUpdate_;
		this.authTokenProvider_ = authTokenProvider_;
		this.appCheckTokenProvider_ = appCheckTokenProvider_;
		this.authOverride_ = authOverride_;
		this.id = PersistentConnection.nextPersistentConnectionId_++;
		this.log_ = logWrapper("p:" + this.id + ":");
		this.interruptReasons_ = {};
		this.listens = /* @__PURE__ */ new Map();
		this.outstandingPuts_ = [];
		this.outstandingGets_ = [];
		this.outstandingPutCount_ = 0;
		this.outstandingGetCount_ = 0;
		this.onDisconnectRequestQueue_ = [];
		this.connected_ = false;
		this.reconnectDelay_ = RECONNECT_MIN_DELAY;
		this.maxReconnectDelay_ = RECONNECT_MAX_DELAY_DEFAULT;
		this.securityDebugCallback_ = null;
		this.lastSessionId = null;
		this.establishConnectionTimer_ = null;
		this.visible_ = false;
		this.requestCBHash_ = {};
		this.requestNumber_ = 0;
		this.realtime_ = null;
		this.authToken_ = null;
		this.appCheckToken_ = null;
		this.forceTokenRefresh_ = false;
		this.invalidAuthTokenCount_ = 0;
		this.invalidAppCheckTokenCount_ = 0;
		this.firstConnection_ = true;
		this.lastConnectionAttemptTime_ = null;
		this.lastConnectionEstablishedTime_ = null;
		if (authOverride_ && !isNodeSdk()) throw new Error("Auth override specified in options, but not supported on non Node.js platforms");
		VisibilityMonitor.getInstance().on("visible", this.onVisible_, this);
		if (repoInfo_.host.indexOf("fblocal") === -1) OnlineMonitor.getInstance().on("online", this.onOnline_, this);
	}
	sendRequest(action, body, onResponse) {
		const curReqNum = ++this.requestNumber_;
		const msg = {
			r: curReqNum,
			a: action,
			b: body
		};
		this.log_(stringify(msg));
		assert(this.connected_, "sendRequest call when we're not connected not allowed.");
		this.realtime_.sendRequest(msg);
		if (onResponse) this.requestCBHash_[curReqNum] = onResponse;
	}
	get(query) {
		this.initConnection_();
		const deferred = new Deferred();
		const outstandingGet = {
			action: "g",
			request: {
				p: query._path.toString(),
				q: query._queryObject
			},
			onComplete: (message) => {
				const payload = message["d"];
				if (message["s"] === "ok") deferred.resolve(payload);
				else deferred.reject(payload);
			}
		};
		this.outstandingGets_.push(outstandingGet);
		this.outstandingGetCount_++;
		const index = this.outstandingGets_.length - 1;
		if (this.connected_) this.sendGet_(index);
		return deferred.promise;
	}
	listen(query, currentHashFn, tag, onComplete) {
		this.initConnection_();
		const queryId = query._queryIdentifier;
		const pathString = query._path.toString();
		this.log_("Listen called for " + pathString + " " + queryId);
		if (!this.listens.has(pathString)) this.listens.set(pathString, /* @__PURE__ */ new Map());
		assert(query._queryParams.isDefault() || !query._queryParams.loadsAllData(), "listen() called for non-default but complete query");
		assert(!this.listens.get(pathString).has(queryId), `listen() called twice for same path/queryId.`);
		const listenSpec = {
			onComplete,
			hashFn: currentHashFn,
			query,
			tag
		};
		this.listens.get(pathString).set(queryId, listenSpec);
		if (this.connected_) this.sendListen_(listenSpec);
	}
	sendGet_(index) {
		const get = this.outstandingGets_[index];
		this.sendRequest("g", get.request, (message) => {
			delete this.outstandingGets_[index];
			this.outstandingGetCount_--;
			if (this.outstandingGetCount_ === 0) this.outstandingGets_ = [];
			if (get.onComplete) get.onComplete(message);
		});
	}
	sendListen_(listenSpec) {
		const query = listenSpec.query;
		const pathString = query._path.toString();
		const queryId = query._queryIdentifier;
		this.log_("Listen on " + pathString + " for " + queryId);
		const req = { p: pathString };
		const action = "q";
		if (listenSpec.tag) {
			req["q"] = query._queryObject;
			req["t"] = listenSpec.tag;
		}
		req["h"] = listenSpec.hashFn();
		this.sendRequest(action, req, (message) => {
			const payload = message["d"];
			const status = message["s"];
			PersistentConnection.warnOnListenWarnings_(payload, query);
			if ((this.listens.get(pathString) && this.listens.get(pathString).get(queryId)) === listenSpec) {
				this.log_("listen response", message);
				if (status !== "ok") this.removeListen_(pathString, queryId);
				if (listenSpec.onComplete) listenSpec.onComplete(status, payload);
			}
		});
	}
	static warnOnListenWarnings_(payload, query) {
		if (payload && typeof payload === "object" && contains(payload, "w")) {
			const warnings = safeGet(payload, "w");
			if (Array.isArray(warnings) && ~warnings.indexOf("no_index")) warn(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${"\".indexOn\": \"" + query._queryParams.getIndex().toString() + "\""} at ${query._path.toString()} to your security rules for better performance.`);
		}
	}
	refreshAuthToken(token) {
		this.authToken_ = token;
		this.log_("Auth token refreshed");
		if (this.authToken_) this.tryAuth();
		else if (this.connected_) this.sendRequest("unauth", {}, () => {});
		this.reduceReconnectDelayIfAdminCredential_(token);
	}
	reduceReconnectDelayIfAdminCredential_(credential) {
		if (credential && credential.length === 40 || isAdmin(credential)) {
			this.log_("Admin auth credential detected.  Reducing max reconnect time.");
			this.maxReconnectDelay_ = RECONNECT_MAX_DELAY_FOR_ADMINS;
		}
	}
	refreshAppCheckToken(token) {
		this.appCheckToken_ = token;
		this.log_("App check token refreshed");
		if (this.appCheckToken_) this.tryAppCheck();
		else if (this.connected_) this.sendRequest("unappeck", {}, () => {});
	}
	tryAuth() {
		if (this.connected_ && this.authToken_) {
			const token = this.authToken_;
			const authMethod = isValidFormat(token) ? "auth" : "gauth";
			const requestData = { cred: token };
			if (this.authOverride_ === null) requestData["noauth"] = true;
			else if (typeof this.authOverride_ === "object") requestData["authvar"] = this.authOverride_;
			this.sendRequest(authMethod, requestData, (res) => {
				const status = res["s"];
				const data = res["d"] || "error";
				if (this.authToken_ === token) if (status === "ok") this.invalidAuthTokenCount_ = 0;
				else this.onAuthRevoked_(status, data);
			});
		}
	}
	tryAppCheck() {
		if (this.connected_ && this.appCheckToken_) this.sendRequest("appcheck", { "token": this.appCheckToken_ }, (res) => {
			const status = res["s"];
			const data = res["d"] || "error";
			if (status === "ok") this.invalidAppCheckTokenCount_ = 0;
			else this.onAppCheckRevoked_(status, data);
		});
	}
	unlisten(query, tag) {
		const pathString = query._path.toString();
		const queryId = query._queryIdentifier;
		this.log_("Unlisten called for " + pathString + " " + queryId);
		assert(query._queryParams.isDefault() || !query._queryParams.loadsAllData(), "unlisten() called for non-default but complete query");
		if (this.removeListen_(pathString, queryId) && this.connected_) this.sendUnlisten_(pathString, queryId, query._queryObject, tag);
	}
	sendUnlisten_(pathString, queryId, queryObj, tag) {
		this.log_("Unlisten on " + pathString + " for " + queryId);
		const req = { p: pathString };
		const action = "n";
		if (tag) {
			req["q"] = queryObj;
			req["t"] = tag;
		}
		this.sendRequest(action, req);
	}
	onDisconnectPut(pathString, data, onComplete) {
		this.initConnection_();
		if (this.connected_) this.sendOnDisconnect_("o", pathString, data, onComplete);
		else this.onDisconnectRequestQueue_.push({
			pathString,
			action: "o",
			data,
			onComplete
		});
	}
	onDisconnectMerge(pathString, data, onComplete) {
		this.initConnection_();
		if (this.connected_) this.sendOnDisconnect_("om", pathString, data, onComplete);
		else this.onDisconnectRequestQueue_.push({
			pathString,
			action: "om",
			data,
			onComplete
		});
	}
	onDisconnectCancel(pathString, onComplete) {
		this.initConnection_();
		if (this.connected_) this.sendOnDisconnect_("oc", pathString, null, onComplete);
		else this.onDisconnectRequestQueue_.push({
			pathString,
			action: "oc",
			data: null,
			onComplete
		});
	}
	sendOnDisconnect_(action, pathString, data, onComplete) {
		const request = {
			p: pathString,
			d: data
		};
		this.log_("onDisconnect " + action, request);
		this.sendRequest(action, request, (response) => {
			if (onComplete) setTimeout(() => {
				onComplete(response["s"], response["d"]);
			}, Math.floor(0));
		});
	}
	put(pathString, data, onComplete, hash) {
		this.putInternal("p", pathString, data, onComplete, hash);
	}
	merge(pathString, data, onComplete, hash) {
		this.putInternal("m", pathString, data, onComplete, hash);
	}
	putInternal(action, pathString, data, onComplete, hash) {
		this.initConnection_();
		const request = {
			p: pathString,
			d: data
		};
		if (hash !== void 0) request["h"] = hash;
		this.outstandingPuts_.push({
			action,
			request,
			onComplete
		});
		this.outstandingPutCount_++;
		const index = this.outstandingPuts_.length - 1;
		if (this.connected_) this.sendPut_(index);
		else this.log_("Buffering put: " + pathString);
	}
	sendPut_(index) {
		const action = this.outstandingPuts_[index].action;
		const request = this.outstandingPuts_[index].request;
		const onComplete = this.outstandingPuts_[index].onComplete;
		this.outstandingPuts_[index].queued = this.connected_;
		this.sendRequest(action, request, (message) => {
			this.log_(action + " response", message);
			delete this.outstandingPuts_[index];
			this.outstandingPutCount_--;
			if (this.outstandingPutCount_ === 0) this.outstandingPuts_ = [];
			if (onComplete) onComplete(message["s"], message["d"]);
		});
	}
	reportStats(stats) {
		if (this.connected_) {
			const request = { c: stats };
			this.log_("reportStats", request);
			this.sendRequest("s", request, (result) => {
				if (result["s"] !== "ok") {
					const errorReason = result["d"];
					this.log_("reportStats", "Error sending stats: " + errorReason);
				}
			});
		}
	}
	onDataMessage_(message) {
		if ("r" in message) {
			this.log_("from server: " + stringify(message));
			const reqNum = message["r"];
			const onResponse = this.requestCBHash_[reqNum];
			if (onResponse) {
				delete this.requestCBHash_[reqNum];
				onResponse(message["b"]);
			}
		} else if ("error" in message) throw "A server-side error has occurred: " + message["error"];
		else if ("a" in message) this.onDataPush_(message["a"], message["b"]);
	}
	onDataPush_(action, body) {
		this.log_("handleServerMessage", action, body);
		if (action === "d") this.onDataUpdate_(body["p"], body["d"], false, body["t"]);
		else if (action === "m") this.onDataUpdate_(body["p"], body["d"], true, body["t"]);
		else if (action === "c") this.onListenRevoked_(body["p"], body["q"]);
		else if (action === "ac") this.onAuthRevoked_(body["s"], body["d"]);
		else if (action === "apc") this.onAppCheckRevoked_(body["s"], body["d"]);
		else if (action === "sd") this.onSecurityDebugPacket_(body);
		else error("Unrecognized action received from server: " + stringify(action) + "\nAre you using the latest client?");
	}
	onReady_(timestamp, sessionId) {
		this.log_("connection ready");
		this.connected_ = true;
		this.lastConnectionEstablishedTime_ = (/* @__PURE__ */ new Date()).getTime();
		this.handleTimestamp_(timestamp);
		this.lastSessionId = sessionId;
		if (this.firstConnection_) this.sendConnectStats_();
		this.restoreState_();
		this.firstConnection_ = false;
		this.onConnectStatus_(true);
	}
	scheduleConnect_(timeout) {
		assert(!this.realtime_, "Scheduling a connect when we're already connected/ing?");
		if (this.establishConnectionTimer_) clearTimeout(this.establishConnectionTimer_);
		this.establishConnectionTimer_ = setTimeout(() => {
			this.establishConnectionTimer_ = null;
			this.establishConnection_();
		}, Math.floor(timeout));
	}
	initConnection_() {
		if (!this.realtime_ && this.firstConnection_) this.scheduleConnect_(0);
	}
	onVisible_(visible) {
		if (visible && !this.visible_ && this.reconnectDelay_ === this.maxReconnectDelay_) {
			this.log_("Window became visible.  Reducing delay.");
			this.reconnectDelay_ = RECONNECT_MIN_DELAY;
			if (!this.realtime_) this.scheduleConnect_(0);
		}
		this.visible_ = visible;
	}
	onOnline_(online) {
		if (online) {
			this.log_("Browser went online.");
			this.reconnectDelay_ = RECONNECT_MIN_DELAY;
			if (!this.realtime_) this.scheduleConnect_(0);
		} else {
			this.log_("Browser went offline.  Killing connection.");
			if (this.realtime_) this.realtime_.close();
		}
	}
	onRealtimeDisconnect_() {
		this.log_("data client disconnected");
		this.connected_ = false;
		this.realtime_ = null;
		this.cancelSentTransactions_();
		this.requestCBHash_ = {};
		if (this.shouldReconnect_()) {
			if (!this.visible_) {
				this.log_("Window isn't visible.  Delaying reconnect.");
				this.reconnectDelay_ = this.maxReconnectDelay_;
				this.lastConnectionAttemptTime_ = (/* @__PURE__ */ new Date()).getTime();
			} else if (this.lastConnectionEstablishedTime_) {
				if ((/* @__PURE__ */ new Date()).getTime() - this.lastConnectionEstablishedTime_ > RECONNECT_DELAY_RESET_TIMEOUT) this.reconnectDelay_ = RECONNECT_MIN_DELAY;
				this.lastConnectionEstablishedTime_ = null;
			}
			const timeSinceLastConnectAttempt = Math.max(0, (/* @__PURE__ */ new Date()).getTime() - this.lastConnectionAttemptTime_);
			let reconnectDelay = Math.max(0, this.reconnectDelay_ - timeSinceLastConnectAttempt);
			reconnectDelay = Math.random() * reconnectDelay;
			this.log_("Trying to reconnect in " + reconnectDelay + "ms");
			this.scheduleConnect_(reconnectDelay);
			this.reconnectDelay_ = Math.min(this.maxReconnectDelay_, this.reconnectDelay_ * RECONNECT_DELAY_MULTIPLIER);
		}
		this.onConnectStatus_(false);
	}
	async establishConnection_() {
		if (this.shouldReconnect_()) {
			this.log_("Making a connection attempt");
			this.lastConnectionAttemptTime_ = (/* @__PURE__ */ new Date()).getTime();
			this.lastConnectionEstablishedTime_ = null;
			const onDataMessage = this.onDataMessage_.bind(this);
			const onReady = this.onReady_.bind(this);
			const onDisconnect = this.onRealtimeDisconnect_.bind(this);
			const connId = this.id + ":" + PersistentConnection.nextConnectionId_++;
			const lastSessionId = this.lastSessionId;
			let canceled = false;
			let connection = null;
			const closeFn = function() {
				if (connection) connection.close();
				else {
					canceled = true;
					onDisconnect();
				}
			};
			const sendRequestFn = function(msg) {
				assert(connection, "sendRequest call when we're not connected not allowed.");
				connection.sendRequest(msg);
			};
			this.realtime_ = {
				close: closeFn,
				sendRequest: sendRequestFn
			};
			const forceRefresh = this.forceTokenRefresh_;
			this.forceTokenRefresh_ = false;
			try {
				const [authToken, appCheckToken] = await Promise.all([this.authTokenProvider_.getToken(forceRefresh), this.appCheckTokenProvider_.getToken(forceRefresh)]);
				if (!canceled) {
					log("getToken() completed. Creating connection.");
					this.authToken_ = authToken && authToken.accessToken;
					this.appCheckToken_ = appCheckToken && appCheckToken.token;
					connection = new Connection(connId, this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, onDataMessage, onReady, onDisconnect, (reason) => {
						warn(reason + " (" + this.repoInfo_.toString() + ")");
						this.interrupt(SERVER_KILL_INTERRUPT_REASON);
					}, lastSessionId);
				} else log("getToken() completed but was canceled");
			} catch (error) {
				this.log_("Failed to get token: " + error);
				if (!canceled) {
					if (this.repoInfo_.nodeAdmin) warn(error);
					closeFn();
				}
			}
		}
	}
	interrupt(reason) {
		log("Interrupting connection for reason: " + reason);
		this.interruptReasons_[reason] = true;
		if (this.realtime_) this.realtime_.close();
		else {
			if (this.establishConnectionTimer_) {
				clearTimeout(this.establishConnectionTimer_);
				this.establishConnectionTimer_ = null;
			}
			if (this.connected_) this.onRealtimeDisconnect_();
		}
	}
	resume(reason) {
		log("Resuming connection for reason: " + reason);
		delete this.interruptReasons_[reason];
		if (isEmpty$1(this.interruptReasons_)) {
			this.reconnectDelay_ = RECONNECT_MIN_DELAY;
			if (!this.realtime_) this.scheduleConnect_(0);
		}
	}
	handleTimestamp_(timestamp) {
		const delta = timestamp - (/* @__PURE__ */ new Date()).getTime();
		this.onServerInfoUpdate_({ serverTimeOffset: delta });
	}
	cancelSentTransactions_() {
		for (let i = 0; i < this.outstandingPuts_.length; i++) {
			const put = this.outstandingPuts_[i];
			if (put && "h" in put.request && put.queued) {
				if (put.onComplete) put.onComplete("disconnect");
				delete this.outstandingPuts_[i];
				this.outstandingPutCount_--;
			}
		}
		if (this.outstandingPutCount_ === 0) this.outstandingPuts_ = [];
	}
	onListenRevoked_(pathString, query) {
		let queryId;
		if (!query) queryId = "default";
		else queryId = query.map((q) => ObjectToUniqueKey(q)).join("$");
		const listen = this.removeListen_(pathString, queryId);
		if (listen && listen.onComplete) listen.onComplete("permission_denied");
	}
	removeListen_(pathString, queryId) {
		const normalizedPathString = new Path(pathString).toString();
		let listen;
		if (this.listens.has(normalizedPathString)) {
			const map = this.listens.get(normalizedPathString);
			listen = map.get(queryId);
			map.delete(queryId);
			if (map.size === 0) this.listens.delete(normalizedPathString);
		} else listen = void 0;
		return listen;
	}
	onAuthRevoked_(statusCode, explanation) {
		log("Auth token revoked: " + statusCode + "/" + explanation);
		this.authToken_ = null;
		this.forceTokenRefresh_ = true;
		this.realtime_.close();
		if (statusCode === "invalid_token" || statusCode === "permission_denied") {
			this.invalidAuthTokenCount_++;
			if (this.invalidAuthTokenCount_ >= INVALID_TOKEN_THRESHOLD) {
				this.reconnectDelay_ = RECONNECT_MAX_DELAY_FOR_ADMINS;
				this.authTokenProvider_.notifyForInvalidToken();
			}
		}
	}
	onAppCheckRevoked_(statusCode, explanation) {
		log("App check token revoked: " + statusCode + "/" + explanation);
		this.appCheckToken_ = null;
		this.forceTokenRefresh_ = true;
		if (statusCode === "invalid_token" || statusCode === "permission_denied") {
			this.invalidAppCheckTokenCount_++;
			if (this.invalidAppCheckTokenCount_ >= INVALID_TOKEN_THRESHOLD) this.appCheckTokenProvider_.notifyForInvalidToken();
		}
	}
	onSecurityDebugPacket_(body) {
		if (this.securityDebugCallback_) this.securityDebugCallback_(body);
		else if ("msg" in body) "" + body["msg"].replace("\n", "\nFIREBASE: ");
	}
	restoreState_() {
		this.tryAuth();
		this.tryAppCheck();
		for (const queries of this.listens.values()) for (const listenSpec of queries.values()) this.sendListen_(listenSpec);
		for (let i = 0; i < this.outstandingPuts_.length; i++) if (this.outstandingPuts_[i]) this.sendPut_(i);
		while (this.onDisconnectRequestQueue_.length) {
			const request = this.onDisconnectRequestQueue_.shift();
			this.sendOnDisconnect_(request.action, request.pathString, request.data, request.onComplete);
		}
		for (let i = 0; i < this.outstandingGets_.length; i++) if (this.outstandingGets_[i]) this.sendGet_(i);
	}
	sendConnectStats_() {
		const stats = {};
		let clientName = "js";
		if (isNodeSdk()) if (this.repoInfo_.nodeAdmin) clientName = "admin_node";
		else clientName = "node";
		stats["sdk." + clientName + "." + SDK_VERSION.replace(/\./g, "-")] = 1;
		if (isMobileCordova()) stats["framework.cordova"] = 1;
		else if (isReactNative()) stats["framework.reactnative"] = 1;
		this.reportStats(stats);
	}
	shouldReconnect_() {
		const online = OnlineMonitor.getInstance().currentlyOnline();
		return isEmpty$1(this.interruptReasons_) && online;
	}
};
PersistentConnection.nextPersistentConnectionId_ = 0;
PersistentConnection.nextConnectionId_ = 0;
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var NamedNode = class NamedNode {
	constructor(name, node) {
		this.name = name;
		this.node = node;
	}
	static Wrap(name, node) {
		return new NamedNode(name, node);
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Index = class {
	getCompare() {
		return this.compare.bind(this);
	}
	indexedValueChanged(oldNode, newNode) {
		const oldWrapped = new NamedNode(MIN_NAME, oldNode);
		const newWrapped = new NamedNode(MIN_NAME, newNode);
		return this.compare(oldWrapped, newWrapped) !== 0;
	}
	minPost() {
		return NamedNode.MIN;
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var __EMPTY_NODE;
var KeyIndex = class extends Index {
	static get __EMPTY_NODE() {
		return __EMPTY_NODE;
	}
	static set __EMPTY_NODE(val) {
		__EMPTY_NODE = val;
	}
	compare(a, b) {
		return nameCompare(a.name, b.name);
	}
	isDefinedOn(node) {
		throw assertionError("KeyIndex.isDefinedOn not expected to be called.");
	}
	indexedValueChanged(oldNode, newNode) {
		return false;
	}
	minPost() {
		return NamedNode.MIN;
	}
	maxPost() {
		return new NamedNode(MAX_NAME, __EMPTY_NODE);
	}
	makePost(indexValue, name) {
		assert(typeof indexValue === "string", "KeyIndex indexValue must always be a string.");
		return new NamedNode(indexValue, __EMPTY_NODE);
	}
	toString() {
		return ".key";
	}
};
var KEY_INDEX = new KeyIndex();
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var SortedMapIterator$1 = class {
	static {
		__name(this, "SortedMapIterator");
	}
	constructor(node, startKey, comparator, isReverse_, resultGenerator_ = null) {
		this.isReverse_ = isReverse_;
		this.resultGenerator_ = resultGenerator_;
		this.nodeStack_ = [];
		let cmp = 1;
		while (!node.isEmpty()) {
			node = node;
			cmp = startKey ? comparator(node.key, startKey) : 1;
			if (isReverse_) cmp *= -1;
			if (cmp < 0) if (this.isReverse_) node = node.left;
			else node = node.right;
			else if (cmp === 0) {
				this.nodeStack_.push(node);
				break;
			} else {
				this.nodeStack_.push(node);
				if (this.isReverse_) node = node.right;
				else node = node.left;
			}
		}
	}
	getNext() {
		if (this.nodeStack_.length === 0) return null;
		let node = this.nodeStack_.pop();
		let result;
		if (this.resultGenerator_) result = this.resultGenerator_(node.key, node.value);
		else result = {
			key: node.key,
			value: node.value
		};
		if (this.isReverse_) {
			node = node.left;
			while (!node.isEmpty()) {
				this.nodeStack_.push(node);
				node = node.right;
			}
		} else {
			node = node.right;
			while (!node.isEmpty()) {
				this.nodeStack_.push(node);
				node = node.left;
			}
		}
		return result;
	}
	hasNext() {
		return this.nodeStack_.length > 0;
	}
	peek() {
		if (this.nodeStack_.length === 0) return null;
		const node = this.nodeStack_[this.nodeStack_.length - 1];
		if (this.resultGenerator_) return this.resultGenerator_(node.key, node.value);
		else return {
			key: node.key,
			value: node.value
		};
	}
};
var LLRBNode$1 = class LLRBNode$1 {
	static {
		__name(this, "LLRBNode");
	}
	constructor(key, value, color, left, right) {
		this.key = key;
		this.value = value;
		this.color = color != null ? color : LLRBNode$1.RED;
		this.left = left != null ? left : SortedMap$1.EMPTY_NODE;
		this.right = right != null ? right : SortedMap$1.EMPTY_NODE;
	}
	copy(key, value, color, left, right) {
		return new LLRBNode$1(key != null ? key : this.key, value != null ? value : this.value, color != null ? color : this.color, left != null ? left : this.left, right != null ? right : this.right);
	}
	count() {
		return this.left.count() + 1 + this.right.count();
	}
	isEmpty() {
		return false;
	}
	inorderTraversal(action) {
		return this.left.inorderTraversal(action) || !!action(this.key, this.value) || this.right.inorderTraversal(action);
	}
	reverseTraversal(action) {
		return this.right.reverseTraversal(action) || action(this.key, this.value) || this.left.reverseTraversal(action);
	}
	min_() {
		if (this.left.isEmpty()) return this;
		else return this.left.min_();
	}
	minKey() {
		return this.min_().key;
	}
	maxKey() {
		if (this.right.isEmpty()) return this.key;
		else return this.right.maxKey();
	}
	insert(key, value, comparator) {
		let n = this;
		const cmp = comparator(key, n.key);
		if (cmp < 0) n = n.copy(null, null, null, n.left.insert(key, value, comparator), null);
		else if (cmp === 0) n = n.copy(null, value, null, null, null);
		else n = n.copy(null, null, null, null, n.right.insert(key, value, comparator));
		return n.fixUp_();
	}
	removeMin_() {
		if (this.left.isEmpty()) return SortedMap$1.EMPTY_NODE;
		let n = this;
		if (!n.left.isRed_() && !n.left.left.isRed_()) n = n.moveRedLeft_();
		n = n.copy(null, null, null, n.left.removeMin_(), null);
		return n.fixUp_();
	}
	remove(key, comparator) {
		let n;
		let smallest;
		n = this;
		if (comparator(key, n.key) < 0) {
			if (!n.left.isEmpty() && !n.left.isRed_() && !n.left.left.isRed_()) n = n.moveRedLeft_();
			n = n.copy(null, null, null, n.left.remove(key, comparator), null);
		} else {
			if (n.left.isRed_()) n = n.rotateRight_();
			if (!n.right.isEmpty() && !n.right.isRed_() && !n.right.left.isRed_()) n = n.moveRedRight_();
			if (comparator(key, n.key) === 0) if (n.right.isEmpty()) return SortedMap$1.EMPTY_NODE;
			else {
				smallest = n.right.min_();
				n = n.copy(smallest.key, smallest.value, null, null, n.right.removeMin_());
			}
			n = n.copy(null, null, null, null, n.right.remove(key, comparator));
		}
		return n.fixUp_();
	}
	isRed_() {
		return this.color;
	}
	fixUp_() {
		let n = this;
		if (n.right.isRed_() && !n.left.isRed_()) n = n.rotateLeft_();
		if (n.left.isRed_() && n.left.left.isRed_()) n = n.rotateRight_();
		if (n.left.isRed_() && n.right.isRed_()) n = n.colorFlip_();
		return n;
	}
	moveRedLeft_() {
		let n = this.colorFlip_();
		if (n.right.left.isRed_()) {
			n = n.copy(null, null, null, null, n.right.rotateRight_());
			n = n.rotateLeft_();
			n = n.colorFlip_();
		}
		return n;
	}
	moveRedRight_() {
		let n = this.colorFlip_();
		if (n.left.left.isRed_()) {
			n = n.rotateRight_();
			n = n.colorFlip_();
		}
		return n;
	}
	rotateLeft_() {
		const nl = this.copy(null, null, LLRBNode$1.RED, null, this.right.left);
		return this.right.copy(null, null, this.color, nl, null);
	}
	rotateRight_() {
		const nr = this.copy(null, null, LLRBNode$1.RED, this.left.right, null);
		return this.left.copy(null, null, this.color, null, nr);
	}
	colorFlip_() {
		const left = this.left.copy(null, null, !this.left.color, null, null);
		const right = this.right.copy(null, null, !this.right.color, null, null);
		return this.copy(null, null, !this.color, left, right);
	}
	checkMaxDepth_() {
		const blackDepth = this.check_();
		return Math.pow(2, blackDepth) <= this.count() + 1;
	}
	check_() {
		if (this.isRed_() && this.left.isRed_()) throw new Error("Red node has red child(" + this.key + "," + this.value + ")");
		if (this.right.isRed_()) throw new Error("Right child of (" + this.key + "," + this.value + ") is red");
		const blackDepth = this.left.check_();
		if (blackDepth !== this.right.check_()) throw new Error("Black depths differ");
		else return blackDepth + (this.isRed_() ? 0 : 1);
	}
};
LLRBNode$1.RED = true;
LLRBNode$1.BLACK = false;
var LLRBEmptyNode = class {
	copy(key, value, color, left, right) {
		return this;
	}
	insert(key, value, comparator) {
		return new LLRBNode$1(key, value, null);
	}
	remove(key, comparator) {
		return this;
	}
	count() {
		return 0;
	}
	isEmpty() {
		return true;
	}
	inorderTraversal(action) {
		return false;
	}
	reverseTraversal(action) {
		return false;
	}
	minKey() {
		return null;
	}
	maxKey() {
		return null;
	}
	check_() {
		return 0;
	}
	isRed_() {
		return false;
	}
};
var SortedMap$1 = class SortedMap$1 {
	static {
		__name(this, "SortedMap");
	}
	constructor(comparator_, root_ = SortedMap$1.EMPTY_NODE) {
		this.comparator_ = comparator_;
		this.root_ = root_;
	}
	insert(key, value) {
		return new SortedMap$1(this.comparator_, this.root_.insert(key, value, this.comparator_).copy(null, null, LLRBNode$1.BLACK, null, null));
	}
	remove(key) {
		return new SortedMap$1(this.comparator_, this.root_.remove(key, this.comparator_).copy(null, null, LLRBNode$1.BLACK, null, null));
	}
	get(key) {
		let cmp;
		let node = this.root_;
		while (!node.isEmpty()) {
			cmp = this.comparator_(key, node.key);
			if (cmp === 0) return node.value;
			else if (cmp < 0) node = node.left;
			else if (cmp > 0) node = node.right;
		}
		return null;
	}
	getPredecessorKey(key) {
		let cmp;
		let node = this.root_;
		let rightParent = null;
		while (!node.isEmpty()) {
			cmp = this.comparator_(key, node.key);
			if (cmp === 0) if (!node.left.isEmpty()) {
				node = node.left;
				while (!node.right.isEmpty()) node = node.right;
				return node.key;
			} else if (rightParent) return rightParent.key;
			else return null;
			else if (cmp < 0) node = node.left;
			else if (cmp > 0) {
				rightParent = node;
				node = node.right;
			}
		}
		throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?");
	}
	isEmpty() {
		return this.root_.isEmpty();
	}
	count() {
		return this.root_.count();
	}
	minKey() {
		return this.root_.minKey();
	}
	maxKey() {
		return this.root_.maxKey();
	}
	inorderTraversal(action) {
		return this.root_.inorderTraversal(action);
	}
	reverseTraversal(action) {
		return this.root_.reverseTraversal(action);
	}
	getIterator(resultGenerator) {
		return new SortedMapIterator$1(this.root_, null, this.comparator_, false, resultGenerator);
	}
	getIteratorFrom(key, resultGenerator) {
		return new SortedMapIterator$1(this.root_, key, this.comparator_, false, resultGenerator);
	}
	getReverseIteratorFrom(key, resultGenerator) {
		return new SortedMapIterator$1(this.root_, key, this.comparator_, true, resultGenerator);
	}
	getReverseIterator(resultGenerator) {
		return new SortedMapIterator$1(this.root_, null, this.comparator_, true, resultGenerator);
	}
};
SortedMap$1.EMPTY_NODE = new LLRBEmptyNode();
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function NAME_ONLY_COMPARATOR(left, right) {
	return nameCompare(left.name, right.name);
}
function NAME_COMPARATOR(left, right) {
	return nameCompare(left, right);
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var MAX_NODE$2;
function setMaxNode$1(val) {
	MAX_NODE$2 = val;
}
var priorityHashText = function(priority) {
	if (typeof priority === "number") return "number:" + doubleToIEEE754String(priority);
	else return "string:" + priority;
};
var validatePriorityNode = function(priorityNode) {
	if (priorityNode.isLeafNode()) {
		const val = priorityNode.val();
		assert(typeof val === "string" || typeof val === "number" || typeof val === "object" && contains(val, ".sv"), "Priority must be a string or number.");
	} else assert(priorityNode === MAX_NODE$2 || priorityNode.isEmpty(), "priority of unexpected type.");
	assert(priorityNode === MAX_NODE$2 || priorityNode.getPriority().isEmpty(), "Priority nodes can't have a priority of their own.");
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var __childrenNodeConstructor;
var LeafNode = class LeafNode {
	static set __childrenNodeConstructor(val) {
		__childrenNodeConstructor = val;
	}
	static get __childrenNodeConstructor() {
		return __childrenNodeConstructor;
	}
	constructor(value_, priorityNode_ = LeafNode.__childrenNodeConstructor.EMPTY_NODE) {
		this.value_ = value_;
		this.priorityNode_ = priorityNode_;
		this.lazyHash_ = null;
		assert(this.value_ !== void 0 && this.value_ !== null, "LeafNode shouldn't be created with null/undefined value.");
		validatePriorityNode(this.priorityNode_);
	}
	isLeafNode() {
		return true;
	}
	getPriority() {
		return this.priorityNode_;
	}
	updatePriority(newPriorityNode) {
		return new LeafNode(this.value_, newPriorityNode);
	}
	getImmediateChild(childName) {
		if (childName === ".priority") return this.priorityNode_;
		else return LeafNode.__childrenNodeConstructor.EMPTY_NODE;
	}
	getChild(path) {
		if (pathIsEmpty(path)) return this;
		else if (pathGetFront(path) === ".priority") return this.priorityNode_;
		else return LeafNode.__childrenNodeConstructor.EMPTY_NODE;
	}
	hasChild() {
		return false;
	}
	getPredecessorChildName(childName, childNode) {
		return null;
	}
	updateImmediateChild(childName, newChildNode) {
		if (childName === ".priority") return this.updatePriority(newChildNode);
		else if (newChildNode.isEmpty() && childName !== ".priority") return this;
		else return LeafNode.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(childName, newChildNode).updatePriority(this.priorityNode_);
	}
	updateChild(path, newChildNode) {
		const front = pathGetFront(path);
		if (front === null) return newChildNode;
		else if (newChildNode.isEmpty() && front !== ".priority") return this;
		else {
			assert(front !== ".priority" || pathGetLength(path) === 1, ".priority must be the last token in a path");
			return this.updateImmediateChild(front, LeafNode.__childrenNodeConstructor.EMPTY_NODE.updateChild(pathPopFront(path), newChildNode));
		}
	}
	isEmpty() {
		return false;
	}
	numChildren() {
		return 0;
	}
	forEachChild(index, action) {
		return false;
	}
	val(exportFormat) {
		if (exportFormat && !this.getPriority().isEmpty()) return {
			".value": this.getValue(),
			".priority": this.getPriority().val()
		};
		else return this.getValue();
	}
	hash() {
		if (this.lazyHash_ === null) {
			let toHash = "";
			if (!this.priorityNode_.isEmpty()) toHash += "priority:" + priorityHashText(this.priorityNode_.val()) + ":";
			const type = typeof this.value_;
			toHash += type + ":";
			if (type === "number") toHash += doubleToIEEE754String(this.value_);
			else toHash += this.value_;
			this.lazyHash_ = sha1(toHash);
		}
		return this.lazyHash_;
	}
	getValue() {
		return this.value_;
	}
	compareTo(other) {
		if (other === LeafNode.__childrenNodeConstructor.EMPTY_NODE) return 1;
		else if (other instanceof LeafNode.__childrenNodeConstructor) return -1;
		else {
			assert(other.isLeafNode(), "Unknown node type");
			return this.compareToLeafNode_(other);
		}
	}
	compareToLeafNode_(otherLeaf) {
		const otherLeafType = typeof otherLeaf.value_;
		const thisLeafType = typeof this.value_;
		const otherIndex = LeafNode.VALUE_TYPE_ORDER.indexOf(otherLeafType);
		const thisIndex = LeafNode.VALUE_TYPE_ORDER.indexOf(thisLeafType);
		assert(otherIndex >= 0, "Unknown leaf type: " + otherLeafType);
		assert(thisIndex >= 0, "Unknown leaf type: " + thisLeafType);
		if (otherIndex === thisIndex) if (thisLeafType === "object") return 0;
		else if (this.value_ < otherLeaf.value_) return -1;
		else if (this.value_ === otherLeaf.value_) return 0;
		else return 1;
		else return thisIndex - otherIndex;
	}
	withIndex() {
		return this;
	}
	isIndexed() {
		return true;
	}
	equals(other) {
		if (other === this) return true;
		else if (other.isLeafNode()) {
			const otherLeaf = other;
			return this.value_ === otherLeaf.value_ && this.priorityNode_.equals(otherLeaf.priorityNode_);
		} else return false;
	}
};
LeafNode.VALUE_TYPE_ORDER = [
	"object",
	"boolean",
	"number",
	"string"
];
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var nodeFromJSON$1;
var MAX_NODE$1;
function setNodeFromJSON(val) {
	nodeFromJSON$1 = val;
}
function setMaxNode(val) {
	MAX_NODE$1 = val;
}
var PriorityIndex = class extends Index {
	compare(a, b) {
		const aPriority = a.node.getPriority();
		const bPriority = b.node.getPriority();
		const indexCmp = aPriority.compareTo(bPriority);
		if (indexCmp === 0) return nameCompare(a.name, b.name);
		else return indexCmp;
	}
	isDefinedOn(node) {
		return !node.getPriority().isEmpty();
	}
	indexedValueChanged(oldNode, newNode) {
		return !oldNode.getPriority().equals(newNode.getPriority());
	}
	minPost() {
		return NamedNode.MIN;
	}
	maxPost() {
		return new NamedNode(MAX_NAME, new LeafNode("[PRIORITY-POST]", MAX_NODE$1));
	}
	makePost(indexValue, name) {
		return new NamedNode(name, new LeafNode("[PRIORITY-POST]", nodeFromJSON$1(indexValue)));
	}
	toString() {
		return ".priority";
	}
};
var PRIORITY_INDEX = new PriorityIndex();
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var LOG_2 = Math.log(2);
var Base12Num = class {
	constructor(length) {
		const logBase2 = (num) => parseInt(Math.log(num) / LOG_2, 10);
		const bitMask = (bits) => parseInt(Array(bits + 1).join("1"), 2);
		this.count = logBase2(length + 1);
		this.current_ = this.count - 1;
		const mask = bitMask(this.count);
		this.bits_ = length + 1 & mask;
	}
	nextBitIsOne() {
		const result = !(this.bits_ & 1 << this.current_);
		this.current_--;
		return result;
	}
};
var buildChildSet = function(childList, cmp, keyFn, mapSortFn) {
	childList.sort(cmp);
	const buildBalancedTree = function(low, high) {
		const length = high - low;
		let namedNode;
		let key;
		if (length === 0) return null;
		else if (length === 1) {
			namedNode = childList[low];
			key = keyFn ? keyFn(namedNode) : namedNode;
			return new LLRBNode$1(key, namedNode.node, LLRBNode$1.BLACK, null, null);
		} else {
			const middle = parseInt(length / 2, 10) + low;
			const left = buildBalancedTree(low, middle);
			const right = buildBalancedTree(middle + 1, high);
			namedNode = childList[middle];
			key = keyFn ? keyFn(namedNode) : namedNode;
			return new LLRBNode$1(key, namedNode.node, LLRBNode$1.BLACK, left, right);
		}
	};
	const buildFrom12Array = function(base12) {
		let node = null;
		let root = null;
		let index = childList.length;
		const buildPennant = function(chunkSize, color) {
			const low = index - chunkSize;
			const high = index;
			index -= chunkSize;
			const childTree = buildBalancedTree(low + 1, high);
			const namedNode = childList[low];
			attachPennant(new LLRBNode$1(keyFn ? keyFn(namedNode) : namedNode, namedNode.node, color, null, childTree));
		};
		const attachPennant = function(pennant) {
			if (node) {
				node.left = pennant;
				node = pennant;
			} else {
				root = pennant;
				node = pennant;
			}
		};
		for (let i = 0; i < base12.count; ++i) {
			const isOne = base12.nextBitIsOne();
			const chunkSize = Math.pow(2, base12.count - (i + 1));
			if (isOne) buildPennant(chunkSize, LLRBNode$1.BLACK);
			else {
				buildPennant(chunkSize, LLRBNode$1.BLACK);
				buildPennant(chunkSize, LLRBNode$1.RED);
			}
		}
		return root;
	};
	const root = buildFrom12Array(new Base12Num(childList.length));
	return new SortedMap$1(mapSortFn || cmp, root);
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var _defaultIndexMap;
var fallbackObject = {};
var IndexMap = class IndexMap {
	static get Default() {
		assert(fallbackObject && PRIORITY_INDEX, "ChildrenNode.ts has not been loaded");
		_defaultIndexMap = _defaultIndexMap || new IndexMap({ ".priority": fallbackObject }, { ".priority": PRIORITY_INDEX });
		return _defaultIndexMap;
	}
	constructor(indexes_, indexSet_) {
		this.indexes_ = indexes_;
		this.indexSet_ = indexSet_;
	}
	get(indexKey) {
		const sortedMap = safeGet(this.indexes_, indexKey);
		if (!sortedMap) throw new Error("No index defined for " + indexKey);
		if (sortedMap instanceof SortedMap$1) return sortedMap;
		else return null;
	}
	hasIndex(indexDefinition) {
		return contains(this.indexSet_, indexDefinition.toString());
	}
	addIndex(indexDefinition, existingChildren) {
		assert(indexDefinition !== KEY_INDEX, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
		const childList = [];
		let sawIndexedValue = false;
		const iter = existingChildren.getIterator(NamedNode.Wrap);
		let next = iter.getNext();
		while (next) {
			sawIndexedValue = sawIndexedValue || indexDefinition.isDefinedOn(next.node);
			childList.push(next);
			next = iter.getNext();
		}
		let newIndex;
		if (sawIndexedValue) newIndex = buildChildSet(childList, indexDefinition.getCompare());
		else newIndex = fallbackObject;
		const indexName = indexDefinition.toString();
		const newIndexSet = Object.assign({}, this.indexSet_);
		newIndexSet[indexName] = indexDefinition;
		const newIndexes = Object.assign({}, this.indexes_);
		newIndexes[indexName] = newIndex;
		return new IndexMap(newIndexes, newIndexSet);
	}
	addToIndexes(namedNode, existingChildren) {
		return new IndexMap(map(this.indexes_, (indexedChildren, indexName) => {
			const index = safeGet(this.indexSet_, indexName);
			assert(index, "Missing index implementation for " + indexName);
			if (indexedChildren === fallbackObject) if (index.isDefinedOn(namedNode.node)) {
				const childList = [];
				const iter = existingChildren.getIterator(NamedNode.Wrap);
				let next = iter.getNext();
				while (next) {
					if (next.name !== namedNode.name) childList.push(next);
					next = iter.getNext();
				}
				childList.push(namedNode);
				return buildChildSet(childList, index.getCompare());
			} else return fallbackObject;
			else {
				const existingSnap = existingChildren.get(namedNode.name);
				let newChildren = indexedChildren;
				if (existingSnap) newChildren = newChildren.remove(new NamedNode(namedNode.name, existingSnap));
				return newChildren.insert(namedNode, namedNode.node);
			}
		}), this.indexSet_);
	}
	removeFromIndexes(namedNode, existingChildren) {
		return new IndexMap(map(this.indexes_, (indexedChildren) => {
			if (indexedChildren === fallbackObject) return indexedChildren;
			else {
				const existingSnap = existingChildren.get(namedNode.name);
				if (existingSnap) return indexedChildren.remove(new NamedNode(namedNode.name, existingSnap));
				else return indexedChildren;
			}
		}), this.indexSet_);
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var EMPTY_NODE;
var ChildrenNode = class ChildrenNode {
	static get EMPTY_NODE() {
		return EMPTY_NODE || (EMPTY_NODE = new ChildrenNode(new SortedMap$1(NAME_COMPARATOR), null, IndexMap.Default));
	}
	constructor(children_, priorityNode_, indexMap_) {
		this.children_ = children_;
		this.priorityNode_ = priorityNode_;
		this.indexMap_ = indexMap_;
		this.lazyHash_ = null;
		if (this.priorityNode_) validatePriorityNode(this.priorityNode_);
		if (this.children_.isEmpty()) assert(!this.priorityNode_ || this.priorityNode_.isEmpty(), "An empty node cannot have a priority");
	}
	isLeafNode() {
		return false;
	}
	getPriority() {
		return this.priorityNode_ || EMPTY_NODE;
	}
	updatePriority(newPriorityNode) {
		if (this.children_.isEmpty()) return this;
		else return new ChildrenNode(this.children_, newPriorityNode, this.indexMap_);
	}
	getImmediateChild(childName) {
		if (childName === ".priority") return this.getPriority();
		else {
			const child = this.children_.get(childName);
			return child === null ? EMPTY_NODE : child;
		}
	}
	getChild(path) {
		const front = pathGetFront(path);
		if (front === null) return this;
		return this.getImmediateChild(front).getChild(pathPopFront(path));
	}
	hasChild(childName) {
		return this.children_.get(childName) !== null;
	}
	updateImmediateChild(childName, newChildNode) {
		assert(newChildNode, "We should always be passing snapshot nodes");
		if (childName === ".priority") return this.updatePriority(newChildNode);
		else {
			const namedNode = new NamedNode(childName, newChildNode);
			let newChildren;
			let newIndexMap;
			if (newChildNode.isEmpty()) {
				newChildren = this.children_.remove(childName);
				newIndexMap = this.indexMap_.removeFromIndexes(namedNode, this.children_);
			} else {
				newChildren = this.children_.insert(childName, newChildNode);
				newIndexMap = this.indexMap_.addToIndexes(namedNode, this.children_);
			}
			const newPriority = newChildren.isEmpty() ? EMPTY_NODE : this.priorityNode_;
			return new ChildrenNode(newChildren, newPriority, newIndexMap);
		}
	}
	updateChild(path, newChildNode) {
		const front = pathGetFront(path);
		if (front === null) return newChildNode;
		else {
			assert(pathGetFront(path) !== ".priority" || pathGetLength(path) === 1, ".priority must be the last token in a path");
			const newImmediateChild = this.getImmediateChild(front).updateChild(pathPopFront(path), newChildNode);
			return this.updateImmediateChild(front, newImmediateChild);
		}
	}
	isEmpty() {
		return this.children_.isEmpty();
	}
	numChildren() {
		return this.children_.count();
	}
	val(exportFormat) {
		if (this.isEmpty()) return null;
		const obj = {};
		let numKeys = 0;
		let maxKey = 0;
		let allIntegerKeys = true;
		this.forEachChild(PRIORITY_INDEX, (key, childNode) => {
			obj[key] = childNode.val(exportFormat);
			numKeys++;
			if (allIntegerKeys && ChildrenNode.INTEGER_REGEXP_.test(key)) maxKey = Math.max(maxKey, Number(key));
			else allIntegerKeys = false;
		});
		if (!exportFormat && allIntegerKeys && maxKey < 2 * numKeys) {
			const array = [];
			for (const key in obj) array[key] = obj[key];
			return array;
		} else {
			if (exportFormat && !this.getPriority().isEmpty()) obj[".priority"] = this.getPriority().val();
			return obj;
		}
	}
	hash() {
		if (this.lazyHash_ === null) {
			let toHash = "";
			if (!this.getPriority().isEmpty()) toHash += "priority:" + priorityHashText(this.getPriority().val()) + ":";
			this.forEachChild(PRIORITY_INDEX, (key, childNode) => {
				const childHash = childNode.hash();
				if (childHash !== "") toHash += ":" + key + ":" + childHash;
			});
			this.lazyHash_ = toHash === "" ? "" : sha1(toHash);
		}
		return this.lazyHash_;
	}
	getPredecessorChildName(childName, childNode, index) {
		const idx = this.resolveIndex_(index);
		if (idx) {
			const predecessor = idx.getPredecessorKey(new NamedNode(childName, childNode));
			return predecessor ? predecessor.name : null;
		} else return this.children_.getPredecessorKey(childName);
	}
	getFirstChildName(indexDefinition) {
		const idx = this.resolveIndex_(indexDefinition);
		if (idx) {
			const minKey = idx.minKey();
			return minKey && minKey.name;
		} else return this.children_.minKey();
	}
	getFirstChild(indexDefinition) {
		const minKey = this.getFirstChildName(indexDefinition);
		if (minKey) return new NamedNode(minKey, this.children_.get(minKey));
		else return null;
	}
	getLastChildName(indexDefinition) {
		const idx = this.resolveIndex_(indexDefinition);
		if (idx) {
			const maxKey = idx.maxKey();
			return maxKey && maxKey.name;
		} else return this.children_.maxKey();
	}
	getLastChild(indexDefinition) {
		const maxKey = this.getLastChildName(indexDefinition);
		if (maxKey) return new NamedNode(maxKey, this.children_.get(maxKey));
		else return null;
	}
	forEachChild(index, action) {
		const idx = this.resolveIndex_(index);
		if (idx) return idx.inorderTraversal((wrappedNode) => {
			return action(wrappedNode.name, wrappedNode.node);
		});
		else return this.children_.inorderTraversal(action);
	}
	getIterator(indexDefinition) {
		return this.getIteratorFrom(indexDefinition.minPost(), indexDefinition);
	}
	getIteratorFrom(startPost, indexDefinition) {
		const idx = this.resolveIndex_(indexDefinition);
		if (idx) return idx.getIteratorFrom(startPost, (key) => key);
		else {
			const iterator = this.children_.getIteratorFrom(startPost.name, NamedNode.Wrap);
			let next = iterator.peek();
			while (next != null && indexDefinition.compare(next, startPost) < 0) {
				iterator.getNext();
				next = iterator.peek();
			}
			return iterator;
		}
	}
	getReverseIterator(indexDefinition) {
		return this.getReverseIteratorFrom(indexDefinition.maxPost(), indexDefinition);
	}
	getReverseIteratorFrom(endPost, indexDefinition) {
		const idx = this.resolveIndex_(indexDefinition);
		if (idx) return idx.getReverseIteratorFrom(endPost, (key) => {
			return key;
		});
		else {
			const iterator = this.children_.getReverseIteratorFrom(endPost.name, NamedNode.Wrap);
			let next = iterator.peek();
			while (next != null && indexDefinition.compare(next, endPost) > 0) {
				iterator.getNext();
				next = iterator.peek();
			}
			return iterator;
		}
	}
	compareTo(other) {
		if (this.isEmpty()) if (other.isEmpty()) return 0;
		else return -1;
		else if (other.isLeafNode() || other.isEmpty()) return 1;
		else if (other === MAX_NODE) return -1;
		else return 0;
	}
	withIndex(indexDefinition) {
		if (indexDefinition === KEY_INDEX || this.indexMap_.hasIndex(indexDefinition)) return this;
		else {
			const newIndexMap = this.indexMap_.addIndex(indexDefinition, this.children_);
			return new ChildrenNode(this.children_, this.priorityNode_, newIndexMap);
		}
	}
	isIndexed(index) {
		return index === KEY_INDEX || this.indexMap_.hasIndex(index);
	}
	equals(other) {
		if (other === this) return true;
		else if (other.isLeafNode()) return false;
		else {
			const otherChildrenNode = other;
			if (!this.getPriority().equals(otherChildrenNode.getPriority())) return false;
			else if (this.children_.count() === otherChildrenNode.children_.count()) {
				const thisIter = this.getIterator(PRIORITY_INDEX);
				const otherIter = otherChildrenNode.getIterator(PRIORITY_INDEX);
				let thisCurrent = thisIter.getNext();
				let otherCurrent = otherIter.getNext();
				while (thisCurrent && otherCurrent) {
					if (thisCurrent.name !== otherCurrent.name || !thisCurrent.node.equals(otherCurrent.node)) return false;
					thisCurrent = thisIter.getNext();
					otherCurrent = otherIter.getNext();
				}
				return thisCurrent === null && otherCurrent === null;
			} else return false;
		}
	}
	resolveIndex_(indexDefinition) {
		if (indexDefinition === KEY_INDEX) return null;
		else return this.indexMap_.get(indexDefinition.toString());
	}
};
ChildrenNode.INTEGER_REGEXP_ = /^(0|[1-9]\d*)$/;
var MaxNode = class extends ChildrenNode {
	constructor() {
		super(new SortedMap$1(NAME_COMPARATOR), ChildrenNode.EMPTY_NODE, IndexMap.Default);
	}
	compareTo(other) {
		if (other === this) return 0;
		else return 1;
	}
	equals(other) {
		return other === this;
	}
	getPriority() {
		return this;
	}
	getImmediateChild(childName) {
		return ChildrenNode.EMPTY_NODE;
	}
	isEmpty() {
		return false;
	}
};
var MAX_NODE = new MaxNode();
Object.defineProperties(NamedNode, {
	MIN: { value: new NamedNode(MIN_NAME, ChildrenNode.EMPTY_NODE) },
	MAX: { value: new NamedNode(MAX_NAME, MAX_NODE) }
});
KeyIndex.__EMPTY_NODE = ChildrenNode.EMPTY_NODE;
LeafNode.__childrenNodeConstructor = ChildrenNode;
setMaxNode$1(MAX_NODE);
setMaxNode(MAX_NODE);
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var USE_HINZE = true;
function nodeFromJSON(json, priority = null) {
	if (json === null) return ChildrenNode.EMPTY_NODE;
	if (typeof json === "object" && ".priority" in json) priority = json[".priority"];
	assert(priority === null || typeof priority === "string" || typeof priority === "number" || typeof priority === "object" && ".sv" in priority, "Invalid priority type found: " + typeof priority);
	if (typeof json === "object" && ".value" in json && json[".value"] !== null) json = json[".value"];
	if (typeof json !== "object" || ".sv" in json) return new LeafNode(json, nodeFromJSON(priority));
	if (!(json instanceof Array) && USE_HINZE) {
		const children = [];
		let childrenHavePriority = false;
		each(json, (key, child) => {
			if (key.substring(0, 1) !== ".") {
				const childNode = nodeFromJSON(child);
				if (!childNode.isEmpty()) {
					childrenHavePriority = childrenHavePriority || !childNode.getPriority().isEmpty();
					children.push(new NamedNode(key, childNode));
				}
			}
		});
		if (children.length === 0) return ChildrenNode.EMPTY_NODE;
		const childSet = buildChildSet(children, NAME_ONLY_COMPARATOR, (namedNode) => namedNode.name, NAME_COMPARATOR);
		if (childrenHavePriority) {
			const sortedChildSet = buildChildSet(children, PRIORITY_INDEX.getCompare());
			return new ChildrenNode(childSet, nodeFromJSON(priority), new IndexMap({ ".priority": sortedChildSet }, { ".priority": PRIORITY_INDEX }));
		} else return new ChildrenNode(childSet, nodeFromJSON(priority), IndexMap.Default);
	} else {
		let node = ChildrenNode.EMPTY_NODE;
		each(json, (key, childData) => {
			if (contains(json, key)) {
				if (key.substring(0, 1) !== ".") {
					const childNode = nodeFromJSON(childData);
					if (childNode.isLeafNode() || !childNode.isEmpty()) node = node.updateImmediateChild(key, childNode);
				}
			}
		});
		return node.updatePriority(nodeFromJSON(priority));
	}
}
setNodeFromJSON(nodeFromJSON);
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var PathIndex = class extends Index {
	constructor(indexPath_) {
		super();
		this.indexPath_ = indexPath_;
		assert(!pathIsEmpty(indexPath_) && pathGetFront(indexPath_) !== ".priority", "Can't create PathIndex with empty path or .priority key");
	}
	extractChild(snap) {
		return snap.getChild(this.indexPath_);
	}
	isDefinedOn(node) {
		return !node.getChild(this.indexPath_).isEmpty();
	}
	compare(a, b) {
		const aChild = this.extractChild(a.node);
		const bChild = this.extractChild(b.node);
		const indexCmp = aChild.compareTo(bChild);
		if (indexCmp === 0) return nameCompare(a.name, b.name);
		else return indexCmp;
	}
	makePost(indexValue, name) {
		const valueNode = nodeFromJSON(indexValue);
		return new NamedNode(name, ChildrenNode.EMPTY_NODE.updateChild(this.indexPath_, valueNode));
	}
	maxPost() {
		return new NamedNode(MAX_NAME, ChildrenNode.EMPTY_NODE.updateChild(this.indexPath_, MAX_NODE));
	}
	toString() {
		return pathSlice(this.indexPath_, 0).join("/");
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var ValueIndex = class extends Index {
	compare(a, b) {
		const indexCmp = a.node.compareTo(b.node);
		if (indexCmp === 0) return nameCompare(a.name, b.name);
		else return indexCmp;
	}
	isDefinedOn(node) {
		return true;
	}
	indexedValueChanged(oldNode, newNode) {
		return !oldNode.equals(newNode);
	}
	minPost() {
		return NamedNode.MIN;
	}
	maxPost() {
		return NamedNode.MAX;
	}
	makePost(indexValue, name) {
		return new NamedNode(name, nodeFromJSON(indexValue));
	}
	toString() {
		return ".value";
	}
};
var VALUE_INDEX = new ValueIndex();
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function changeValue(snapshotNode) {
	return {
		type: "value",
		snapshotNode
	};
}
function changeChildAdded(childName, snapshotNode) {
	return {
		type: "child_added",
		snapshotNode,
		childName
	};
}
function changeChildRemoved(childName, snapshotNode) {
	return {
		type: "child_removed",
		snapshotNode,
		childName
	};
}
function changeChildChanged(childName, snapshotNode, oldSnap) {
	return {
		type: "child_changed",
		snapshotNode,
		childName,
		oldSnap
	};
}
function changeChildMoved(childName, snapshotNode) {
	return {
		type: "child_moved",
		snapshotNode,
		childName
	};
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var QueryParams = class QueryParams {
	constructor() {
		this.limitSet_ = false;
		this.startSet_ = false;
		this.startNameSet_ = false;
		this.startAfterSet_ = false;
		this.endSet_ = false;
		this.endNameSet_ = false;
		this.endBeforeSet_ = false;
		this.limit_ = 0;
		this.viewFrom_ = "";
		this.indexStartValue_ = null;
		this.indexStartName_ = "";
		this.indexEndValue_ = null;
		this.indexEndName_ = "";
		this.index_ = PRIORITY_INDEX;
	}
	hasStart() {
		return this.startSet_;
	}
	isViewFromLeft() {
		if (this.viewFrom_ === "") return this.startSet_;
		else return this.viewFrom_ === "l";
	}
	getIndexStartValue() {
		assert(this.startSet_, "Only valid if start has been set");
		return this.indexStartValue_;
	}
	getIndexStartName() {
		assert(this.startSet_, "Only valid if start has been set");
		if (this.startNameSet_) return this.indexStartName_;
		else return MIN_NAME;
	}
	hasEnd() {
		return this.endSet_;
	}
	getIndexEndValue() {
		assert(this.endSet_, "Only valid if end has been set");
		return this.indexEndValue_;
	}
	getIndexEndName() {
		assert(this.endSet_, "Only valid if end has been set");
		if (this.endNameSet_) return this.indexEndName_;
		else return MAX_NAME;
	}
	hasLimit() {
		return this.limitSet_;
	}
	hasAnchoredLimit() {
		return this.limitSet_ && this.viewFrom_ !== "";
	}
	getLimit() {
		assert(this.limitSet_, "Only valid if limit has been set");
		return this.limit_;
	}
	getIndex() {
		return this.index_;
	}
	loadsAllData() {
		return !(this.startSet_ || this.endSet_ || this.limitSet_);
	}
	isDefault() {
		return this.loadsAllData() && this.index_ === PRIORITY_INDEX;
	}
	copy() {
		const copy = new QueryParams();
		copy.limitSet_ = this.limitSet_;
		copy.limit_ = this.limit_;
		copy.startSet_ = this.startSet_;
		copy.startAfterSet_ = this.startAfterSet_;
		copy.indexStartValue_ = this.indexStartValue_;
		copy.startNameSet_ = this.startNameSet_;
		copy.indexStartName_ = this.indexStartName_;
		copy.endSet_ = this.endSet_;
		copy.endBeforeSet_ = this.endBeforeSet_;
		copy.indexEndValue_ = this.indexEndValue_;
		copy.endNameSet_ = this.endNameSet_;
		copy.indexEndName_ = this.indexEndName_;
		copy.index_ = this.index_;
		copy.viewFrom_ = this.viewFrom_;
		return copy;
	}
};
function queryParamsToRestQueryStringParameters(queryParams) {
	const qs = {};
	if (queryParams.isDefault()) return qs;
	let orderBy;
	if (queryParams.index_ === PRIORITY_INDEX) orderBy = "$priority";
	else if (queryParams.index_ === VALUE_INDEX) orderBy = "$value";
	else if (queryParams.index_ === KEY_INDEX) orderBy = "$key";
	else {
		assert(queryParams.index_ instanceof PathIndex, "Unrecognized index type!");
		orderBy = queryParams.index_.toString();
	}
	qs["orderBy"] = stringify(orderBy);
	if (queryParams.startSet_) {
		const startParam = queryParams.startAfterSet_ ? "startAfter" : "startAt";
		qs[startParam] = stringify(queryParams.indexStartValue_);
		if (queryParams.startNameSet_) qs[startParam] += "," + stringify(queryParams.indexStartName_);
	}
	if (queryParams.endSet_) {
		const endParam = queryParams.endBeforeSet_ ? "endBefore" : "endAt";
		qs[endParam] = stringify(queryParams.indexEndValue_);
		if (queryParams.endNameSet_) qs[endParam] += "," + stringify(queryParams.indexEndName_);
	}
	if (queryParams.limitSet_) if (queryParams.isViewFromLeft()) qs["limitToFirst"] = queryParams.limit_;
	else qs["limitToLast"] = queryParams.limit_;
	return qs;
}
function queryParamsGetQueryObject(queryParams) {
	const obj = {};
	if (queryParams.startSet_) {
		obj["sp"] = queryParams.indexStartValue_;
		if (queryParams.startNameSet_) obj["sn"] = queryParams.indexStartName_;
		obj["sin"] = !queryParams.startAfterSet_;
	}
	if (queryParams.endSet_) {
		obj["ep"] = queryParams.indexEndValue_;
		if (queryParams.endNameSet_) obj["en"] = queryParams.indexEndName_;
		obj["ein"] = !queryParams.endBeforeSet_;
	}
	if (queryParams.limitSet_) {
		obj["l"] = queryParams.limit_;
		let viewFrom = queryParams.viewFrom_;
		if (viewFrom === "") if (queryParams.isViewFromLeft()) viewFrom = "l";
		else viewFrom = "r";
		obj["vf"] = viewFrom;
	}
	if (queryParams.index_ !== PRIORITY_INDEX) obj["i"] = queryParams.index_.toString();
	return obj;
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var ReadonlyRestClient = class ReadonlyRestClient extends ServerActions {
	reportStats(stats) {
		throw new Error("Method not implemented.");
	}
	static getListenId_(query, tag) {
		if (tag !== void 0) return "tag$" + tag;
		else {
			assert(query._queryParams.isDefault(), "should have a tag if it's not a default query.");
			return query._path.toString();
		}
	}
	constructor(repoInfo_, onDataUpdate_, authTokenProvider_, appCheckTokenProvider_) {
		super();
		this.repoInfo_ = repoInfo_;
		this.onDataUpdate_ = onDataUpdate_;
		this.authTokenProvider_ = authTokenProvider_;
		this.appCheckTokenProvider_ = appCheckTokenProvider_;
		this.log_ = logWrapper("p:rest:");
		this.listens_ = {};
	}
	listen(query, currentHashFn, tag, onComplete) {
		const pathString = query._path.toString();
		this.log_("Listen called for " + pathString + " " + query._queryIdentifier);
		const listenId = ReadonlyRestClient.getListenId_(query, tag);
		const thisListen = {};
		this.listens_[listenId] = thisListen;
		const queryStringParameters = queryParamsToRestQueryStringParameters(query._queryParams);
		this.restRequest_(pathString + ".json", queryStringParameters, (error, result) => {
			let data = result;
			if (error === 404) {
				data = null;
				error = null;
			}
			if (error === null) this.onDataUpdate_(pathString, data, false, tag);
			if (safeGet(this.listens_, listenId) === thisListen) {
				let status;
				if (!error) status = "ok";
				else if (error === 401) status = "permission_denied";
				else status = "rest_error:" + error;
				onComplete(status, null);
			}
		});
	}
	unlisten(query, tag) {
		const listenId = ReadonlyRestClient.getListenId_(query, tag);
		delete this.listens_[listenId];
	}
	get(query) {
		const queryStringParameters = queryParamsToRestQueryStringParameters(query._queryParams);
		const pathString = query._path.toString();
		const deferred = new Deferred();
		this.restRequest_(pathString + ".json", queryStringParameters, (error, result) => {
			let data = result;
			if (error === 404) {
				data = null;
				error = null;
			}
			if (error === null) {
				this.onDataUpdate_(pathString, data, false, null);
				deferred.resolve(data);
			} else deferred.reject(new Error(data));
		});
		return deferred.promise;
	}
	refreshAuthToken(token) {}
	restRequest_(pathString, queryStringParameters = {}, callback) {
		queryStringParameters["format"] = "export";
		return Promise.all([this.authTokenProvider_.getToken(false), this.appCheckTokenProvider_.getToken(false)]).then(([authToken, appCheckToken]) => {
			if (authToken && authToken.accessToken) queryStringParameters["auth"] = authToken.accessToken;
			if (appCheckToken && appCheckToken.token) queryStringParameters["ac"] = appCheckToken.token;
			const url = (this.repoInfo_.secure ? "https://" : "http://") + this.repoInfo_.host + pathString + "?ns=" + this.repoInfo_.namespace + querystring(queryStringParameters);
			this.log_("Sending REST request for " + url);
			const xhr = new XMLHttpRequest();
			xhr.onreadystatechange = () => {
				if (callback && xhr.readyState === 4) {
					this.log_("REST Response for " + url + " received. status:", xhr.status, "response:", xhr.responseText);
					let res = null;
					if (xhr.status >= 200 && xhr.status < 300) {
						try {
							res = jsonEval(xhr.responseText);
						} catch (e) {
							warn("Failed to parse JSON response for " + url + ": " + xhr.responseText);
						}
						callback(null, res);
					} else {
						if (xhr.status !== 401 && xhr.status !== 404) warn("Got unsuccessful REST response for " + url + " Status: " + xhr.status);
						callback(xhr.status);
					}
					callback = null;
				}
			};
			xhr.open("GET", url, true);
			xhr.send();
		});
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var SnapshotHolder = class {
	constructor() {
		this.rootNode_ = ChildrenNode.EMPTY_NODE;
	}
	getNode(path) {
		return this.rootNode_.getChild(path);
	}
	updateSnapshot(path, newSnapshotNode) {
		this.rootNode_ = this.rootNode_.updateChild(path, newSnapshotNode);
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function newSparseSnapshotTree() {
	return {
		value: null,
		children: /* @__PURE__ */ new Map()
	};
}
function sparseSnapshotTreeRemember(sparseSnapshotTree, path, data) {
	if (pathIsEmpty(path)) {
		sparseSnapshotTree.value = data;
		sparseSnapshotTree.children.clear();
	} else if (sparseSnapshotTree.value !== null) sparseSnapshotTree.value = sparseSnapshotTree.value.updateChild(path, data);
	else {
		const childKey = pathGetFront(path);
		if (!sparseSnapshotTree.children.has(childKey)) sparseSnapshotTree.children.set(childKey, newSparseSnapshotTree());
		const child = sparseSnapshotTree.children.get(childKey);
		path = pathPopFront(path);
		sparseSnapshotTreeRemember(child, path, data);
	}
}
function sparseSnapshotTreeForEachTree(sparseSnapshotTree, prefixPath, func) {
	if (sparseSnapshotTree.value !== null) func(prefixPath, sparseSnapshotTree.value);
	else sparseSnapshotTreeForEachChild(sparseSnapshotTree, (key, tree) => {
		sparseSnapshotTreeForEachTree(tree, new Path(prefixPath.toString() + "/" + key), func);
	});
}
function sparseSnapshotTreeForEachChild(sparseSnapshotTree, func) {
	sparseSnapshotTree.children.forEach((tree, key) => {
		func(key, tree);
	});
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var StatsListener = class {
	constructor(collection_) {
		this.collection_ = collection_;
		this.last_ = null;
	}
	get() {
		const newStats = this.collection_.get();
		const delta = Object.assign({}, newStats);
		if (this.last_) each(this.last_, (stat, value) => {
			delta[stat] = delta[stat] - value;
		});
		this.last_ = newStats;
		return delta;
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var FIRST_STATS_MIN_TIME = 10 * 1e3;
var FIRST_STATS_MAX_TIME = 30 * 1e3;
var REPORT_STATS_INTERVAL = 300 * 1e3;
var StatsReporter = class {
	constructor(collection, server_) {
		this.server_ = server_;
		this.statsToReport_ = {};
		this.statsListener_ = new StatsListener(collection);
		const timeout = FIRST_STATS_MIN_TIME + (FIRST_STATS_MAX_TIME - FIRST_STATS_MIN_TIME) * Math.random();
		setTimeoutNonBlocking(this.reportStats_.bind(this), Math.floor(timeout));
	}
	reportStats_() {
		const stats = this.statsListener_.get();
		const reportedStats = {};
		let haveStatsToReport = false;
		each(stats, (stat, value) => {
			if (value > 0 && contains(this.statsToReport_, stat)) {
				reportedStats[stat] = value;
				haveStatsToReport = true;
			}
		});
		if (haveStatsToReport) this.server_.reportStats(reportedStats);
		setTimeoutNonBlocking(this.reportStats_.bind(this), Math.floor(Math.random() * 2 * REPORT_STATS_INTERVAL));
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var OperationType;
(function(OperationType) {
	OperationType[OperationType["OVERWRITE"] = 0] = "OVERWRITE";
	OperationType[OperationType["MERGE"] = 1] = "MERGE";
	OperationType[OperationType["ACK_USER_WRITE"] = 2] = "ACK_USER_WRITE";
	OperationType[OperationType["LISTEN_COMPLETE"] = 3] = "LISTEN_COMPLETE";
})(OperationType || (OperationType = {}));
function newOperationSourceUser() {
	return {
		fromUser: true,
		fromServer: false,
		queryId: null,
		tagged: false
	};
}
function newOperationSourceServer() {
	return {
		fromUser: false,
		fromServer: true,
		queryId: null,
		tagged: false
	};
}
function newOperationSourceServerTaggedQuery(queryId) {
	return {
		fromUser: false,
		fromServer: true,
		queryId,
		tagged: true
	};
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var AckUserWrite = class AckUserWrite {
	constructor(path, affectedTree, revert) {
		this.path = path;
		this.affectedTree = affectedTree;
		this.revert = revert;
		this.type = OperationType.ACK_USER_WRITE;
		this.source = newOperationSourceUser();
	}
	operationForChild(childName) {
		if (!pathIsEmpty(this.path)) {
			assert(pathGetFront(this.path) === childName, "operationForChild called for unrelated child.");
			return new AckUserWrite(pathPopFront(this.path), this.affectedTree, this.revert);
		} else if (this.affectedTree.value != null) {
			assert(this.affectedTree.children.isEmpty(), "affectedTree should not have overlapping affected paths.");
			return this;
		} else {
			const childTree = this.affectedTree.subtree(new Path(childName));
			return new AckUserWrite(newEmptyPath(), childTree, this.revert);
		}
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Overwrite = class Overwrite {
	constructor(source, path, snap) {
		this.source = source;
		this.path = path;
		this.snap = snap;
		this.type = OperationType.OVERWRITE;
	}
	operationForChild(childName) {
		if (pathIsEmpty(this.path)) return new Overwrite(this.source, newEmptyPath(), this.snap.getImmediateChild(childName));
		else return new Overwrite(this.source, pathPopFront(this.path), this.snap);
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Merge = class Merge {
	constructor(source, path, children) {
		this.source = source;
		this.path = path;
		this.children = children;
		this.type = OperationType.MERGE;
	}
	operationForChild(childName) {
		if (pathIsEmpty(this.path)) {
			const childTree = this.children.subtree(new Path(childName));
			if (childTree.isEmpty()) return null;
			else if (childTree.value) return new Overwrite(this.source, newEmptyPath(), childTree.value);
			else return new Merge(this.source, newEmptyPath(), childTree);
		} else {
			assert(pathGetFront(this.path) === childName, "Can't get a merge for a child not on the path of the operation");
			return new Merge(this.source, pathPopFront(this.path), this.children);
		}
	}
	toString() {
		return "Operation(" + this.path + ": " + this.source.toString() + " merge: " + this.children.toString() + ")";
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var CacheNode = class {
	constructor(node_, fullyInitialized_, filtered_) {
		this.node_ = node_;
		this.fullyInitialized_ = fullyInitialized_;
		this.filtered_ = filtered_;
	}
	isFullyInitialized() {
		return this.fullyInitialized_;
	}
	isFiltered() {
		return this.filtered_;
	}
	isCompleteForPath(path) {
		if (pathIsEmpty(path)) return this.isFullyInitialized() && !this.filtered_;
		const childKey = pathGetFront(path);
		return this.isCompleteForChild(childKey);
	}
	isCompleteForChild(key) {
		return this.isFullyInitialized() && !this.filtered_ || this.node_.hasChild(key);
	}
	getNode() {
		return this.node_;
	}
};
function eventGeneratorGenerateEventsForChanges(eventGenerator, changes, eventCache, eventRegistrations) {
	const events = [];
	const moves = [];
	changes.forEach((change) => {
		if (change.type === "child_changed" && eventGenerator.index_.indexedValueChanged(change.oldSnap, change.snapshotNode)) moves.push(changeChildMoved(change.childName, change.snapshotNode));
	});
	eventGeneratorGenerateEventsForType(eventGenerator, events, "child_removed", changes, eventRegistrations, eventCache);
	eventGeneratorGenerateEventsForType(eventGenerator, events, "child_added", changes, eventRegistrations, eventCache);
	eventGeneratorGenerateEventsForType(eventGenerator, events, "child_moved", moves, eventRegistrations, eventCache);
	eventGeneratorGenerateEventsForType(eventGenerator, events, "child_changed", changes, eventRegistrations, eventCache);
	eventGeneratorGenerateEventsForType(eventGenerator, events, "value", changes, eventRegistrations, eventCache);
	return events;
}
function eventGeneratorGenerateEventsForType(eventGenerator, events, eventType, changes, registrations, eventCache) {
	const filteredChanges = changes.filter((change) => change.type === eventType);
	filteredChanges.sort((a, b) => eventGeneratorCompareChanges(eventGenerator, a, b));
	filteredChanges.forEach((change) => {
		const materializedChange = eventGeneratorMaterializeSingleChange(eventGenerator, change, eventCache);
		registrations.forEach((registration) => {
			if (registration.respondsTo(change.type)) events.push(registration.createEvent(materializedChange, eventGenerator.query_));
		});
	});
}
function eventGeneratorMaterializeSingleChange(eventGenerator, change, eventCache) {
	if (change.type === "value" || change.type === "child_removed") return change;
	else {
		change.prevName = eventCache.getPredecessorChildName(change.childName, change.snapshotNode, eventGenerator.index_);
		return change;
	}
}
function eventGeneratorCompareChanges(eventGenerator, a, b) {
	if (a.childName == null || b.childName == null) throw assertionError("Should only compare child_ events.");
	const aWrapped = new NamedNode(a.childName, a.snapshotNode);
	const bWrapped = new NamedNode(b.childName, b.snapshotNode);
	return eventGenerator.index_.compare(aWrapped, bWrapped);
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function newViewCache(eventCache, serverCache) {
	return {
		eventCache,
		serverCache
	};
}
function viewCacheUpdateEventSnap(viewCache, eventSnap, complete, filtered) {
	return newViewCache(new CacheNode(eventSnap, complete, filtered), viewCache.serverCache);
}
function viewCacheUpdateServerSnap(viewCache, serverSnap, complete, filtered) {
	return newViewCache(viewCache.eventCache, new CacheNode(serverSnap, complete, filtered));
}
function viewCacheGetCompleteEventSnap(viewCache) {
	return viewCache.eventCache.isFullyInitialized() ? viewCache.eventCache.getNode() : null;
}
function viewCacheGetCompleteServerSnap(viewCache) {
	return viewCache.serverCache.isFullyInitialized() ? viewCache.serverCache.getNode() : null;
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var emptyChildrenSingleton;
var EmptyChildren = () => {
	if (!emptyChildrenSingleton) emptyChildrenSingleton = new SortedMap$1(stringCompare);
	return emptyChildrenSingleton;
};
var ImmutableTree = class ImmutableTree {
	static fromObject(obj) {
		let tree = new ImmutableTree(null);
		each(obj, (childPath, childSnap) => {
			tree = tree.set(new Path(childPath), childSnap);
		});
		return tree;
	}
	constructor(value, children = EmptyChildren()) {
		this.value = value;
		this.children = children;
	}
	isEmpty() {
		return this.value === null && this.children.isEmpty();
	}
	findRootMostMatchingPathAndValue(relativePath, predicate) {
		if (this.value != null && predicate(this.value)) return {
			path: newEmptyPath(),
			value: this.value
		};
		else if (pathIsEmpty(relativePath)) return null;
		else {
			const front = pathGetFront(relativePath);
			const child = this.children.get(front);
			if (child !== null) {
				const childExistingPathAndValue = child.findRootMostMatchingPathAndValue(pathPopFront(relativePath), predicate);
				if (childExistingPathAndValue != null) return {
					path: pathChild(new Path(front), childExistingPathAndValue.path),
					value: childExistingPathAndValue.value
				};
				else return null;
			} else return null;
		}
	}
	findRootMostValueAndPath(relativePath) {
		return this.findRootMostMatchingPathAndValue(relativePath, () => true);
	}
	subtree(relativePath) {
		if (pathIsEmpty(relativePath)) return this;
		else {
			const front = pathGetFront(relativePath);
			const childTree = this.children.get(front);
			if (childTree !== null) return childTree.subtree(pathPopFront(relativePath));
			else return new ImmutableTree(null);
		}
	}
	set(relativePath, toSet) {
		if (pathIsEmpty(relativePath)) return new ImmutableTree(toSet, this.children);
		else {
			const front = pathGetFront(relativePath);
			const newChild = (this.children.get(front) || new ImmutableTree(null)).set(pathPopFront(relativePath), toSet);
			const newChildren = this.children.insert(front, newChild);
			return new ImmutableTree(this.value, newChildren);
		}
	}
	remove(relativePath) {
		if (pathIsEmpty(relativePath)) if (this.children.isEmpty()) return new ImmutableTree(null);
		else return new ImmutableTree(null, this.children);
		else {
			const front = pathGetFront(relativePath);
			const child = this.children.get(front);
			if (child) {
				const newChild = child.remove(pathPopFront(relativePath));
				let newChildren;
				if (newChild.isEmpty()) newChildren = this.children.remove(front);
				else newChildren = this.children.insert(front, newChild);
				if (this.value === null && newChildren.isEmpty()) return new ImmutableTree(null);
				else return new ImmutableTree(this.value, newChildren);
			} else return this;
		}
	}
	get(relativePath) {
		if (pathIsEmpty(relativePath)) return this.value;
		else {
			const front = pathGetFront(relativePath);
			const child = this.children.get(front);
			if (child) return child.get(pathPopFront(relativePath));
			else return null;
		}
	}
	setTree(relativePath, newTree) {
		if (pathIsEmpty(relativePath)) return newTree;
		else {
			const front = pathGetFront(relativePath);
			const newChild = (this.children.get(front) || new ImmutableTree(null)).setTree(pathPopFront(relativePath), newTree);
			let newChildren;
			if (newChild.isEmpty()) newChildren = this.children.remove(front);
			else newChildren = this.children.insert(front, newChild);
			return new ImmutableTree(this.value, newChildren);
		}
	}
	fold(fn) {
		return this.fold_(newEmptyPath(), fn);
	}
	fold_(pathSoFar, fn) {
		const accum = {};
		this.children.inorderTraversal((childKey, childTree) => {
			accum[childKey] = childTree.fold_(pathChild(pathSoFar, childKey), fn);
		});
		return fn(pathSoFar, this.value, accum);
	}
	findOnPath(path, f) {
		return this.findOnPath_(path, newEmptyPath(), f);
	}
	findOnPath_(pathToFollow, pathSoFar, f) {
		const result = this.value ? f(pathSoFar, this.value) : false;
		if (result) return result;
		else if (pathIsEmpty(pathToFollow)) return null;
		else {
			const front = pathGetFront(pathToFollow);
			const nextChild = this.children.get(front);
			if (nextChild) return nextChild.findOnPath_(pathPopFront(pathToFollow), pathChild(pathSoFar, front), f);
			else return null;
		}
	}
	foreachOnPath(path, f) {
		return this.foreachOnPath_(path, newEmptyPath(), f);
	}
	foreachOnPath_(pathToFollow, currentRelativePath, f) {
		if (pathIsEmpty(pathToFollow)) return this;
		else {
			if (this.value) f(currentRelativePath, this.value);
			const front = pathGetFront(pathToFollow);
			const nextChild = this.children.get(front);
			if (nextChild) return nextChild.foreachOnPath_(pathPopFront(pathToFollow), pathChild(currentRelativePath, front), f);
			else return new ImmutableTree(null);
		}
	}
	foreach(f) {
		this.foreach_(newEmptyPath(), f);
	}
	foreach_(currentRelativePath, f) {
		this.children.inorderTraversal((childName, childTree) => {
			childTree.foreach_(pathChild(currentRelativePath, childName), f);
		});
		if (this.value) f(currentRelativePath, this.value);
	}
	foreachChild(f) {
		this.children.inorderTraversal((childName, childTree) => {
			if (childTree.value) f(childName, childTree.value);
		});
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var CompoundWrite = class CompoundWrite {
	constructor(writeTree_) {
		this.writeTree_ = writeTree_;
	}
	static empty() {
		return new CompoundWrite(new ImmutableTree(null));
	}
};
function compoundWriteAddWrite(compoundWrite, path, node) {
	if (pathIsEmpty(path)) return new CompoundWrite(new ImmutableTree(node));
	else {
		const rootmost = compoundWrite.writeTree_.findRootMostValueAndPath(path);
		if (rootmost != null) {
			const rootMostPath = rootmost.path;
			let value = rootmost.value;
			const relativePath = newRelativePath(rootMostPath, path);
			value = value.updateChild(relativePath, node);
			return new CompoundWrite(compoundWrite.writeTree_.set(rootMostPath, value));
		} else {
			const subtree = new ImmutableTree(node);
			return new CompoundWrite(compoundWrite.writeTree_.setTree(path, subtree));
		}
	}
}
function compoundWriteAddWrites(compoundWrite, path, updates) {
	let newWrite = compoundWrite;
	each(updates, (childKey, node) => {
		newWrite = compoundWriteAddWrite(newWrite, pathChild(path, childKey), node);
	});
	return newWrite;
}
function compoundWriteRemoveWrite(compoundWrite, path) {
	if (pathIsEmpty(path)) return CompoundWrite.empty();
	else return new CompoundWrite(compoundWrite.writeTree_.setTree(path, new ImmutableTree(null)));
}
function compoundWriteHasCompleteWrite(compoundWrite, path) {
	return compoundWriteGetCompleteNode(compoundWrite, path) != null;
}
function compoundWriteGetCompleteNode(compoundWrite, path) {
	const rootmost = compoundWrite.writeTree_.findRootMostValueAndPath(path);
	if (rootmost != null) return compoundWrite.writeTree_.get(rootmost.path).getChild(newRelativePath(rootmost.path, path));
	else return null;
}
function compoundWriteGetCompleteChildren(compoundWrite) {
	const children = [];
	const node = compoundWrite.writeTree_.value;
	if (node != null) {
		if (!node.isLeafNode()) node.forEachChild(PRIORITY_INDEX, (childName, childNode) => {
			children.push(new NamedNode(childName, childNode));
		});
	} else compoundWrite.writeTree_.children.inorderTraversal((childName, childTree) => {
		if (childTree.value != null) children.push(new NamedNode(childName, childTree.value));
	});
	return children;
}
function compoundWriteChildCompoundWrite(compoundWrite, path) {
	if (pathIsEmpty(path)) return compoundWrite;
	else {
		const shadowingNode = compoundWriteGetCompleteNode(compoundWrite, path);
		if (shadowingNode != null) return new CompoundWrite(new ImmutableTree(shadowingNode));
		else return new CompoundWrite(compoundWrite.writeTree_.subtree(path));
	}
}
function compoundWriteIsEmpty(compoundWrite) {
	return compoundWrite.writeTree_.isEmpty();
}
function compoundWriteApply(compoundWrite, node) {
	return applySubtreeWrite(newEmptyPath(), compoundWrite.writeTree_, node);
}
function applySubtreeWrite(relativePath, writeTree, node) {
	if (writeTree.value != null) return node.updateChild(relativePath, writeTree.value);
	else {
		let priorityWrite = null;
		writeTree.children.inorderTraversal((childKey, childTree) => {
			if (childKey === ".priority") {
				assert(childTree.value !== null, "Priority writes must always be leaf nodes");
				priorityWrite = childTree.value;
			} else node = applySubtreeWrite(pathChild(relativePath, childKey), childTree, node);
		});
		if (!node.getChild(relativePath).isEmpty() && priorityWrite !== null) node = node.updateChild(pathChild(relativePath, ".priority"), priorityWrite);
		return node;
	}
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function writeTreeChildWrites(writeTree, path) {
	return newWriteTreeRef(path, writeTree);
}
function writeTreeAddOverwrite(writeTree, path, snap, writeId, visible) {
	assert(writeId > writeTree.lastWriteId, "Stacking an older write on top of newer ones");
	if (visible === void 0) visible = true;
	writeTree.allWrites.push({
		path,
		snap,
		writeId,
		visible
	});
	if (visible) writeTree.visibleWrites = compoundWriteAddWrite(writeTree.visibleWrites, path, snap);
	writeTree.lastWriteId = writeId;
}
function writeTreeGetWrite(writeTree, writeId) {
	for (let i = 0; i < writeTree.allWrites.length; i++) {
		const record = writeTree.allWrites[i];
		if (record.writeId === writeId) return record;
	}
	return null;
}
function writeTreeRemoveWrite(writeTree, writeId) {
	const idx = writeTree.allWrites.findIndex((s) => {
		return s.writeId === writeId;
	});
	assert(idx >= 0, "removeWrite called with nonexistent writeId.");
	const writeToRemove = writeTree.allWrites[idx];
	writeTree.allWrites.splice(idx, 1);
	let removedWriteWasVisible = writeToRemove.visible;
	let removedWriteOverlapsWithOtherWrites = false;
	let i = writeTree.allWrites.length - 1;
	while (removedWriteWasVisible && i >= 0) {
		const currentWrite = writeTree.allWrites[i];
		if (currentWrite.visible) {
			if (i >= idx && writeTreeRecordContainsPath_(currentWrite, writeToRemove.path)) removedWriteWasVisible = false;
			else if (pathContains(writeToRemove.path, currentWrite.path)) removedWriteOverlapsWithOtherWrites = true;
		}
		i--;
	}
	if (!removedWriteWasVisible) return false;
	else if (removedWriteOverlapsWithOtherWrites) {
		writeTreeResetTree_(writeTree);
		return true;
	} else {
		if (writeToRemove.snap) writeTree.visibleWrites = compoundWriteRemoveWrite(writeTree.visibleWrites, writeToRemove.path);
		else {
			const children = writeToRemove.children;
			each(children, (childName) => {
				writeTree.visibleWrites = compoundWriteRemoveWrite(writeTree.visibleWrites, pathChild(writeToRemove.path, childName));
			});
		}
		return true;
	}
}
function writeTreeRecordContainsPath_(writeRecord, path) {
	if (writeRecord.snap) return pathContains(writeRecord.path, path);
	else {
		for (const childName in writeRecord.children) if (writeRecord.children.hasOwnProperty(childName) && pathContains(pathChild(writeRecord.path, childName), path)) return true;
		return false;
	}
}
function writeTreeResetTree_(writeTree) {
	writeTree.visibleWrites = writeTreeLayerTree_(writeTree.allWrites, writeTreeDefaultFilter_, newEmptyPath());
	if (writeTree.allWrites.length > 0) writeTree.lastWriteId = writeTree.allWrites[writeTree.allWrites.length - 1].writeId;
	else writeTree.lastWriteId = -1;
}
function writeTreeDefaultFilter_(write) {
	return write.visible;
}
function writeTreeLayerTree_(writes, filter, treeRoot) {
	let compoundWrite = CompoundWrite.empty();
	for (let i = 0; i < writes.length; ++i) {
		const write = writes[i];
		if (filter(write)) {
			const writePath = write.path;
			let relativePath;
			if (write.snap) {
				if (pathContains(treeRoot, writePath)) {
					relativePath = newRelativePath(treeRoot, writePath);
					compoundWrite = compoundWriteAddWrite(compoundWrite, relativePath, write.snap);
				} else if (pathContains(writePath, treeRoot)) {
					relativePath = newRelativePath(writePath, treeRoot);
					compoundWrite = compoundWriteAddWrite(compoundWrite, newEmptyPath(), write.snap.getChild(relativePath));
				}
			} else if (write.children) {
				if (pathContains(treeRoot, writePath)) {
					relativePath = newRelativePath(treeRoot, writePath);
					compoundWrite = compoundWriteAddWrites(compoundWrite, relativePath, write.children);
				} else if (pathContains(writePath, treeRoot)) {
					relativePath = newRelativePath(writePath, treeRoot);
					if (pathIsEmpty(relativePath)) compoundWrite = compoundWriteAddWrites(compoundWrite, newEmptyPath(), write.children);
					else {
						const child = safeGet(write.children, pathGetFront(relativePath));
						if (child) {
							const deepNode = child.getChild(pathPopFront(relativePath));
							compoundWrite = compoundWriteAddWrite(compoundWrite, newEmptyPath(), deepNode);
						}
					}
				}
			} else throw assertionError("WriteRecord should have .snap or .children");
		}
	}
	return compoundWrite;
}
function writeTreeCalcCompleteEventCache(writeTree, treePath, completeServerCache, writeIdsToExclude, includeHiddenWrites) {
	if (!writeIdsToExclude && !includeHiddenWrites) {
		const shadowingNode = compoundWriteGetCompleteNode(writeTree.visibleWrites, treePath);
		if (shadowingNode != null) return shadowingNode;
		else {
			const subMerge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
			if (compoundWriteIsEmpty(subMerge)) return completeServerCache;
			else if (completeServerCache == null && !compoundWriteHasCompleteWrite(subMerge, newEmptyPath())) return null;
			else return compoundWriteApply(subMerge, completeServerCache || ChildrenNode.EMPTY_NODE);
		}
	} else {
		const merge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
		if (!includeHiddenWrites && compoundWriteIsEmpty(merge)) return completeServerCache;
		else if (!includeHiddenWrites && completeServerCache == null && !compoundWriteHasCompleteWrite(merge, newEmptyPath())) return null;
		else {
			const filter = function(write) {
				return (write.visible || includeHiddenWrites) && (!writeIdsToExclude || !~writeIdsToExclude.indexOf(write.writeId)) && (pathContains(write.path, treePath) || pathContains(treePath, write.path));
			};
			return compoundWriteApply(writeTreeLayerTree_(writeTree.allWrites, filter, treePath), completeServerCache || ChildrenNode.EMPTY_NODE);
		}
	}
}
function writeTreeCalcCompleteEventChildren(writeTree, treePath, completeServerChildren) {
	let completeChildren = ChildrenNode.EMPTY_NODE;
	const topLevelSet = compoundWriteGetCompleteNode(writeTree.visibleWrites, treePath);
	if (topLevelSet) {
		if (!topLevelSet.isLeafNode()) topLevelSet.forEachChild(PRIORITY_INDEX, (childName, childSnap) => {
			completeChildren = completeChildren.updateImmediateChild(childName, childSnap);
		});
		return completeChildren;
	} else if (completeServerChildren) {
		const merge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
		completeServerChildren.forEachChild(PRIORITY_INDEX, (childName, childNode) => {
			const node = compoundWriteApply(compoundWriteChildCompoundWrite(merge, new Path(childName)), childNode);
			completeChildren = completeChildren.updateImmediateChild(childName, node);
		});
		compoundWriteGetCompleteChildren(merge).forEach((namedNode) => {
			completeChildren = completeChildren.updateImmediateChild(namedNode.name, namedNode.node);
		});
		return completeChildren;
	} else {
		compoundWriteGetCompleteChildren(compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath)).forEach((namedNode) => {
			completeChildren = completeChildren.updateImmediateChild(namedNode.name, namedNode.node);
		});
		return completeChildren;
	}
}
function writeTreeCalcEventCacheAfterServerOverwrite(writeTree, treePath, childPath, existingEventSnap, existingServerSnap) {
	assert(existingEventSnap || existingServerSnap, "Either existingEventSnap or existingServerSnap must exist");
	const path = pathChild(treePath, childPath);
	if (compoundWriteHasCompleteWrite(writeTree.visibleWrites, path)) return null;
	else {
		const childMerge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, path);
		if (compoundWriteIsEmpty(childMerge)) return existingServerSnap.getChild(childPath);
		else return compoundWriteApply(childMerge, existingServerSnap.getChild(childPath));
	}
}
function writeTreeCalcCompleteChild(writeTree, treePath, childKey, existingServerSnap) {
	const path = pathChild(treePath, childKey);
	const shadowingNode = compoundWriteGetCompleteNode(writeTree.visibleWrites, path);
	if (shadowingNode != null) return shadowingNode;
	else if (existingServerSnap.isCompleteForChild(childKey)) return compoundWriteApply(compoundWriteChildCompoundWrite(writeTree.visibleWrites, path), existingServerSnap.getNode().getImmediateChild(childKey));
	else return null;
}
function writeTreeShadowingWrite(writeTree, path) {
	return compoundWriteGetCompleteNode(writeTree.visibleWrites, path);
}
function writeTreeCalcIndexedSlice(writeTree, treePath, completeServerData, startPost, count, reverse, index) {
	let toIterate;
	const merge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
	const shadowingNode = compoundWriteGetCompleteNode(merge, newEmptyPath());
	if (shadowingNode != null) toIterate = shadowingNode;
	else if (completeServerData != null) toIterate = compoundWriteApply(merge, completeServerData);
	else return [];
	toIterate = toIterate.withIndex(index);
	if (!toIterate.isEmpty() && !toIterate.isLeafNode()) {
		const nodes = [];
		const cmp = index.getCompare();
		const iter = reverse ? toIterate.getReverseIteratorFrom(startPost, index) : toIterate.getIteratorFrom(startPost, index);
		let next = iter.getNext();
		while (next && nodes.length < count) {
			if (cmp(next, startPost) !== 0) nodes.push(next);
			next = iter.getNext();
		}
		return nodes;
	} else return [];
}
function newWriteTree() {
	return {
		visibleWrites: CompoundWrite.empty(),
		allWrites: [],
		lastWriteId: -1
	};
}
function writeTreeRefCalcCompleteEventCache(writeTreeRef, completeServerCache, writeIdsToExclude, includeHiddenWrites) {
	return writeTreeCalcCompleteEventCache(writeTreeRef.writeTree, writeTreeRef.treePath, completeServerCache, writeIdsToExclude, includeHiddenWrites);
}
function writeTreeRefCalcCompleteEventChildren(writeTreeRef, completeServerChildren) {
	return writeTreeCalcCompleteEventChildren(writeTreeRef.writeTree, writeTreeRef.treePath, completeServerChildren);
}
function writeTreeRefCalcEventCacheAfterServerOverwrite(writeTreeRef, path, existingEventSnap, existingServerSnap) {
	return writeTreeCalcEventCacheAfterServerOverwrite(writeTreeRef.writeTree, writeTreeRef.treePath, path, existingEventSnap, existingServerSnap);
}
function writeTreeRefShadowingWrite(writeTreeRef, path) {
	return writeTreeShadowingWrite(writeTreeRef.writeTree, pathChild(writeTreeRef.treePath, path));
}
function writeTreeRefCalcIndexedSlice(writeTreeRef, completeServerData, startPost, count, reverse, index) {
	return writeTreeCalcIndexedSlice(writeTreeRef.writeTree, writeTreeRef.treePath, completeServerData, startPost, count, reverse, index);
}
function writeTreeRefCalcCompleteChild(writeTreeRef, childKey, existingServerCache) {
	return writeTreeCalcCompleteChild(writeTreeRef.writeTree, writeTreeRef.treePath, childKey, existingServerCache);
}
function writeTreeRefChild(writeTreeRef, childName) {
	return newWriteTreeRef(pathChild(writeTreeRef.treePath, childName), writeTreeRef.writeTree);
}
function newWriteTreeRef(path, writeTree) {
	return {
		treePath: path,
		writeTree
	};
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var ChildChangeAccumulator = class {
	constructor() {
		this.changeMap = /* @__PURE__ */ new Map();
	}
	trackChildChange(change) {
		const type = change.type;
		const childKey = change.childName;
		assert(type === "child_added" || type === "child_changed" || type === "child_removed", "Only child changes supported for tracking");
		assert(childKey !== ".priority", "Only non-priority child changes can be tracked.");
		const oldChange = this.changeMap.get(childKey);
		if (oldChange) {
			const oldType = oldChange.type;
			if (type === "child_added" && oldType === "child_removed") this.changeMap.set(childKey, changeChildChanged(childKey, change.snapshotNode, oldChange.snapshotNode));
			else if (type === "child_removed" && oldType === "child_added") this.changeMap.delete(childKey);
			else if (type === "child_removed" && oldType === "child_changed") this.changeMap.set(childKey, changeChildRemoved(childKey, oldChange.oldSnap));
			else if (type === "child_changed" && oldType === "child_added") this.changeMap.set(childKey, changeChildAdded(childKey, change.snapshotNode));
			else if (type === "child_changed" && oldType === "child_changed") this.changeMap.set(childKey, changeChildChanged(childKey, change.snapshotNode, oldChange.oldSnap));
			else throw assertionError("Illegal combination of changes: " + change + " occurred after " + oldChange);
		} else this.changeMap.set(childKey, change);
	}
	getChanges() {
		return Array.from(this.changeMap.values());
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var NoCompleteChildSource_ = class {
	getCompleteChild(childKey) {
		return null;
	}
	getChildAfterChild(index, child, reverse) {
		return null;
	}
};
var NO_COMPLETE_CHILD_SOURCE = new NoCompleteChildSource_();
var WriteTreeCompleteChildSource = class {
	constructor(writes_, viewCache_, optCompleteServerCache_ = null) {
		this.writes_ = writes_;
		this.viewCache_ = viewCache_;
		this.optCompleteServerCache_ = optCompleteServerCache_;
	}
	getCompleteChild(childKey) {
		const node = this.viewCache_.eventCache;
		if (node.isCompleteForChild(childKey)) return node.getNode().getImmediateChild(childKey);
		else {
			const serverNode = this.optCompleteServerCache_ != null ? new CacheNode(this.optCompleteServerCache_, true, false) : this.viewCache_.serverCache;
			return writeTreeRefCalcCompleteChild(this.writes_, childKey, serverNode);
		}
	}
	getChildAfterChild(index, child, reverse) {
		const completeServerData = this.optCompleteServerCache_ != null ? this.optCompleteServerCache_ : viewCacheGetCompleteServerSnap(this.viewCache_);
		const nodes = writeTreeRefCalcIndexedSlice(this.writes_, completeServerData, child, 1, reverse, index);
		if (nodes.length === 0) return null;
		else return nodes[0];
	}
};
function viewProcessorAssertIndexed(viewProcessor, viewCache) {
	assert(viewCache.eventCache.getNode().isIndexed(viewProcessor.filter.getIndex()), "Event snap not indexed");
	assert(viewCache.serverCache.getNode().isIndexed(viewProcessor.filter.getIndex()), "Server snap not indexed");
}
function viewProcessorApplyOperation(viewProcessor, oldViewCache, operation, writesCache, completeCache) {
	const accumulator = new ChildChangeAccumulator();
	let newViewCache;
	let filterServerNode;
	if (operation.type === OperationType.OVERWRITE) {
		const overwrite = operation;
		if (overwrite.source.fromUser) newViewCache = viewProcessorApplyUserOverwrite(viewProcessor, oldViewCache, overwrite.path, overwrite.snap, writesCache, completeCache, accumulator);
		else {
			assert(overwrite.source.fromServer, "Unknown source.");
			filterServerNode = overwrite.source.tagged || oldViewCache.serverCache.isFiltered() && !pathIsEmpty(overwrite.path);
			newViewCache = viewProcessorApplyServerOverwrite(viewProcessor, oldViewCache, overwrite.path, overwrite.snap, writesCache, completeCache, filterServerNode, accumulator);
		}
	} else if (operation.type === OperationType.MERGE) {
		const merge = operation;
		if (merge.source.fromUser) newViewCache = viewProcessorApplyUserMerge(viewProcessor, oldViewCache, merge.path, merge.children, writesCache, completeCache, accumulator);
		else {
			assert(merge.source.fromServer, "Unknown source.");
			filterServerNode = merge.source.tagged || oldViewCache.serverCache.isFiltered();
			newViewCache = viewProcessorApplyServerMerge(viewProcessor, oldViewCache, merge.path, merge.children, writesCache, completeCache, filterServerNode, accumulator);
		}
	} else if (operation.type === OperationType.ACK_USER_WRITE) {
		const ackUserWrite = operation;
		if (!ackUserWrite.revert) newViewCache = viewProcessorAckUserWrite(viewProcessor, oldViewCache, ackUserWrite.path, ackUserWrite.affectedTree, writesCache, completeCache, accumulator);
		else newViewCache = viewProcessorRevertUserWrite(viewProcessor, oldViewCache, ackUserWrite.path, writesCache, completeCache, accumulator);
	} else if (operation.type === OperationType.LISTEN_COMPLETE) newViewCache = viewProcessorListenComplete(viewProcessor, oldViewCache, operation.path, writesCache, accumulator);
	else throw assertionError("Unknown operation type: " + operation.type);
	const changes = accumulator.getChanges();
	viewProcessorMaybeAddValueEvent(oldViewCache, newViewCache, changes);
	return {
		viewCache: newViewCache,
		changes
	};
}
function viewProcessorMaybeAddValueEvent(oldViewCache, newViewCache, accumulator) {
	const eventSnap = newViewCache.eventCache;
	if (eventSnap.isFullyInitialized()) {
		const isLeafOrEmpty = eventSnap.getNode().isLeafNode() || eventSnap.getNode().isEmpty();
		const oldCompleteSnap = viewCacheGetCompleteEventSnap(oldViewCache);
		if (accumulator.length > 0 || !oldViewCache.eventCache.isFullyInitialized() || isLeafOrEmpty && !eventSnap.getNode().equals(oldCompleteSnap) || !eventSnap.getNode().getPriority().equals(oldCompleteSnap.getPriority())) accumulator.push(changeValue(viewCacheGetCompleteEventSnap(newViewCache)));
	}
}
function viewProcessorGenerateEventCacheAfterServerEvent(viewProcessor, viewCache, changePath, writesCache, source, accumulator) {
	const oldEventSnap = viewCache.eventCache;
	if (writeTreeRefShadowingWrite(writesCache, changePath) != null) return viewCache;
	else {
		let newEventCache;
		let serverNode;
		if (pathIsEmpty(changePath)) {
			assert(viewCache.serverCache.isFullyInitialized(), "If change path is empty, we must have complete server data");
			if (viewCache.serverCache.isFiltered()) {
				const serverCache = viewCacheGetCompleteServerSnap(viewCache);
				const completeEventChildren = writeTreeRefCalcCompleteEventChildren(writesCache, serverCache instanceof ChildrenNode ? serverCache : ChildrenNode.EMPTY_NODE);
				newEventCache = viewProcessor.filter.updateFullNode(viewCache.eventCache.getNode(), completeEventChildren, accumulator);
			} else {
				const completeNode = writeTreeRefCalcCompleteEventCache(writesCache, viewCacheGetCompleteServerSnap(viewCache));
				newEventCache = viewProcessor.filter.updateFullNode(viewCache.eventCache.getNode(), completeNode, accumulator);
			}
		} else {
			const childKey = pathGetFront(changePath);
			if (childKey === ".priority") {
				assert(pathGetLength(changePath) === 1, "Can't have a priority with additional path components");
				const oldEventNode = oldEventSnap.getNode();
				serverNode = viewCache.serverCache.getNode();
				const updatedPriority = writeTreeRefCalcEventCacheAfterServerOverwrite(writesCache, changePath, oldEventNode, serverNode);
				if (updatedPriority != null) newEventCache = viewProcessor.filter.updatePriority(oldEventNode, updatedPriority);
				else newEventCache = oldEventSnap.getNode();
			} else {
				const childChangePath = pathPopFront(changePath);
				let newEventChild;
				if (oldEventSnap.isCompleteForChild(childKey)) {
					serverNode = viewCache.serverCache.getNode();
					const eventChildUpdate = writeTreeRefCalcEventCacheAfterServerOverwrite(writesCache, changePath, oldEventSnap.getNode(), serverNode);
					if (eventChildUpdate != null) newEventChild = oldEventSnap.getNode().getImmediateChild(childKey).updateChild(childChangePath, eventChildUpdate);
					else newEventChild = oldEventSnap.getNode().getImmediateChild(childKey);
				} else newEventChild = writeTreeRefCalcCompleteChild(writesCache, childKey, viewCache.serverCache);
				if (newEventChild != null) newEventCache = viewProcessor.filter.updateChild(oldEventSnap.getNode(), childKey, newEventChild, childChangePath, source, accumulator);
				else newEventCache = oldEventSnap.getNode();
			}
		}
		return viewCacheUpdateEventSnap(viewCache, newEventCache, oldEventSnap.isFullyInitialized() || pathIsEmpty(changePath), viewProcessor.filter.filtersNodes());
	}
}
function viewProcessorApplyServerOverwrite(viewProcessor, oldViewCache, changePath, changedSnap, writesCache, completeCache, filterServerNode, accumulator) {
	const oldServerSnap = oldViewCache.serverCache;
	let newServerCache;
	const serverFilter = filterServerNode ? viewProcessor.filter : viewProcessor.filter.getIndexedFilter();
	if (pathIsEmpty(changePath)) newServerCache = serverFilter.updateFullNode(oldServerSnap.getNode(), changedSnap, null);
	else if (serverFilter.filtersNodes() && !oldServerSnap.isFiltered()) {
		const newServerNode = oldServerSnap.getNode().updateChild(changePath, changedSnap);
		newServerCache = serverFilter.updateFullNode(oldServerSnap.getNode(), newServerNode, null);
	} else {
		const childKey = pathGetFront(changePath);
		if (!oldServerSnap.isCompleteForPath(changePath) && pathGetLength(changePath) > 1) return oldViewCache;
		const childChangePath = pathPopFront(changePath);
		const newChildNode = oldServerSnap.getNode().getImmediateChild(childKey).updateChild(childChangePath, changedSnap);
		if (childKey === ".priority") newServerCache = serverFilter.updatePriority(oldServerSnap.getNode(), newChildNode);
		else newServerCache = serverFilter.updateChild(oldServerSnap.getNode(), childKey, newChildNode, childChangePath, NO_COMPLETE_CHILD_SOURCE, null);
	}
	const newViewCache = viewCacheUpdateServerSnap(oldViewCache, newServerCache, oldServerSnap.isFullyInitialized() || pathIsEmpty(changePath), serverFilter.filtersNodes());
	return viewProcessorGenerateEventCacheAfterServerEvent(viewProcessor, newViewCache, changePath, writesCache, new WriteTreeCompleteChildSource(writesCache, newViewCache, completeCache), accumulator);
}
function viewProcessorApplyUserOverwrite(viewProcessor, oldViewCache, changePath, changedSnap, writesCache, completeCache, accumulator) {
	const oldEventSnap = oldViewCache.eventCache;
	let newViewCache;
	let newEventCache;
	const source = new WriteTreeCompleteChildSource(writesCache, oldViewCache, completeCache);
	if (pathIsEmpty(changePath)) {
		newEventCache = viewProcessor.filter.updateFullNode(oldViewCache.eventCache.getNode(), changedSnap, accumulator);
		newViewCache = viewCacheUpdateEventSnap(oldViewCache, newEventCache, true, viewProcessor.filter.filtersNodes());
	} else {
		const childKey = pathGetFront(changePath);
		if (childKey === ".priority") {
			newEventCache = viewProcessor.filter.updatePriority(oldViewCache.eventCache.getNode(), changedSnap);
			newViewCache = viewCacheUpdateEventSnap(oldViewCache, newEventCache, oldEventSnap.isFullyInitialized(), oldEventSnap.isFiltered());
		} else {
			const childChangePath = pathPopFront(changePath);
			const oldChild = oldEventSnap.getNode().getImmediateChild(childKey);
			let newChild;
			if (pathIsEmpty(childChangePath)) newChild = changedSnap;
			else {
				const childNode = source.getCompleteChild(childKey);
				if (childNode != null) if (pathGetBack(childChangePath) === ".priority" && childNode.getChild(pathParent(childChangePath)).isEmpty()) newChild = childNode;
				else newChild = childNode.updateChild(childChangePath, changedSnap);
				else newChild = ChildrenNode.EMPTY_NODE;
			}
			if (!oldChild.equals(newChild)) newViewCache = viewCacheUpdateEventSnap(oldViewCache, viewProcessor.filter.updateChild(oldEventSnap.getNode(), childKey, newChild, childChangePath, source, accumulator), oldEventSnap.isFullyInitialized(), viewProcessor.filter.filtersNodes());
			else newViewCache = oldViewCache;
		}
	}
	return newViewCache;
}
function viewProcessorCacheHasChild(viewCache, childKey) {
	return viewCache.eventCache.isCompleteForChild(childKey);
}
function viewProcessorApplyUserMerge(viewProcessor, viewCache, path, changedChildren, writesCache, serverCache, accumulator) {
	let curViewCache = viewCache;
	changedChildren.foreach((relativePath, childNode) => {
		const writePath = pathChild(path, relativePath);
		if (viewProcessorCacheHasChild(viewCache, pathGetFront(writePath))) curViewCache = viewProcessorApplyUserOverwrite(viewProcessor, curViewCache, writePath, childNode, writesCache, serverCache, accumulator);
	});
	changedChildren.foreach((relativePath, childNode) => {
		const writePath = pathChild(path, relativePath);
		if (!viewProcessorCacheHasChild(viewCache, pathGetFront(writePath))) curViewCache = viewProcessorApplyUserOverwrite(viewProcessor, curViewCache, writePath, childNode, writesCache, serverCache, accumulator);
	});
	return curViewCache;
}
function viewProcessorApplyMerge(viewProcessor, node, merge) {
	merge.foreach((relativePath, childNode) => {
		node = node.updateChild(relativePath, childNode);
	});
	return node;
}
function viewProcessorApplyServerMerge(viewProcessor, viewCache, path, changedChildren, writesCache, serverCache, filterServerNode, accumulator) {
	if (viewCache.serverCache.getNode().isEmpty() && !viewCache.serverCache.isFullyInitialized()) return viewCache;
	let curViewCache = viewCache;
	let viewMergeTree;
	if (pathIsEmpty(path)) viewMergeTree = changedChildren;
	else viewMergeTree = new ImmutableTree(null).setTree(path, changedChildren);
	const serverNode = viewCache.serverCache.getNode();
	viewMergeTree.children.inorderTraversal((childKey, childTree) => {
		if (serverNode.hasChild(childKey)) {
			const newChild = viewProcessorApplyMerge(viewProcessor, viewCache.serverCache.getNode().getImmediateChild(childKey), childTree);
			curViewCache = viewProcessorApplyServerOverwrite(viewProcessor, curViewCache, new Path(childKey), newChild, writesCache, serverCache, filterServerNode, accumulator);
		}
	});
	viewMergeTree.children.inorderTraversal((childKey, childMergeTree) => {
		const isUnknownDeepMerge = !viewCache.serverCache.isCompleteForChild(childKey) && childMergeTree.value === null;
		if (!serverNode.hasChild(childKey) && !isUnknownDeepMerge) {
			const newChild = viewProcessorApplyMerge(viewProcessor, viewCache.serverCache.getNode().getImmediateChild(childKey), childMergeTree);
			curViewCache = viewProcessorApplyServerOverwrite(viewProcessor, curViewCache, new Path(childKey), newChild, writesCache, serverCache, filterServerNode, accumulator);
		}
	});
	return curViewCache;
}
function viewProcessorAckUserWrite(viewProcessor, viewCache, ackPath, affectedTree, writesCache, completeCache, accumulator) {
	if (writeTreeRefShadowingWrite(writesCache, ackPath) != null) return viewCache;
	const filterServerNode = viewCache.serverCache.isFiltered();
	const serverCache = viewCache.serverCache;
	if (affectedTree.value != null) if (pathIsEmpty(ackPath) && serverCache.isFullyInitialized() || serverCache.isCompleteForPath(ackPath)) return viewProcessorApplyServerOverwrite(viewProcessor, viewCache, ackPath, serverCache.getNode().getChild(ackPath), writesCache, completeCache, filterServerNode, accumulator);
	else if (pathIsEmpty(ackPath)) {
		let changedChildren = new ImmutableTree(null);
		serverCache.getNode().forEachChild(KEY_INDEX, (name, node) => {
			changedChildren = changedChildren.set(new Path(name), node);
		});
		return viewProcessorApplyServerMerge(viewProcessor, viewCache, ackPath, changedChildren, writesCache, completeCache, filterServerNode, accumulator);
	} else return viewCache;
	else {
		let changedChildren = new ImmutableTree(null);
		affectedTree.foreach((mergePath, value) => {
			const serverCachePath = pathChild(ackPath, mergePath);
			if (serverCache.isCompleteForPath(serverCachePath)) changedChildren = changedChildren.set(mergePath, serverCache.getNode().getChild(serverCachePath));
		});
		return viewProcessorApplyServerMerge(viewProcessor, viewCache, ackPath, changedChildren, writesCache, completeCache, filterServerNode, accumulator);
	}
}
function viewProcessorListenComplete(viewProcessor, viewCache, path, writesCache, accumulator) {
	const oldServerNode = viewCache.serverCache;
	return viewProcessorGenerateEventCacheAfterServerEvent(viewProcessor, viewCacheUpdateServerSnap(viewCache, oldServerNode.getNode(), oldServerNode.isFullyInitialized() || pathIsEmpty(path), oldServerNode.isFiltered()), path, writesCache, NO_COMPLETE_CHILD_SOURCE, accumulator);
}
function viewProcessorRevertUserWrite(viewProcessor, viewCache, path, writesCache, completeServerCache, accumulator) {
	let complete;
	if (writeTreeRefShadowingWrite(writesCache, path) != null) return viewCache;
	else {
		const source = new WriteTreeCompleteChildSource(writesCache, viewCache, completeServerCache);
		const oldEventCache = viewCache.eventCache.getNode();
		let newEventCache;
		if (pathIsEmpty(path) || pathGetFront(path) === ".priority") {
			let newNode;
			if (viewCache.serverCache.isFullyInitialized()) newNode = writeTreeRefCalcCompleteEventCache(writesCache, viewCacheGetCompleteServerSnap(viewCache));
			else {
				const serverChildren = viewCache.serverCache.getNode();
				assert(serverChildren instanceof ChildrenNode, "serverChildren would be complete if leaf node");
				newNode = writeTreeRefCalcCompleteEventChildren(writesCache, serverChildren);
			}
			newNode = newNode;
			newEventCache = viewProcessor.filter.updateFullNode(oldEventCache, newNode, accumulator);
		} else {
			const childKey = pathGetFront(path);
			let newChild = writeTreeRefCalcCompleteChild(writesCache, childKey, viewCache.serverCache);
			if (newChild == null && viewCache.serverCache.isCompleteForChild(childKey)) newChild = oldEventCache.getImmediateChild(childKey);
			if (newChild != null) newEventCache = viewProcessor.filter.updateChild(oldEventCache, childKey, newChild, pathPopFront(path), source, accumulator);
			else if (viewCache.eventCache.getNode().hasChild(childKey)) newEventCache = viewProcessor.filter.updateChild(oldEventCache, childKey, ChildrenNode.EMPTY_NODE, pathPopFront(path), source, accumulator);
			else newEventCache = oldEventCache;
			if (newEventCache.isEmpty() && viewCache.serverCache.isFullyInitialized()) {
				complete = writeTreeRefCalcCompleteEventCache(writesCache, viewCacheGetCompleteServerSnap(viewCache));
				if (complete.isLeafNode()) newEventCache = viewProcessor.filter.updateFullNode(newEventCache, complete, accumulator);
			}
		}
		complete = viewCache.serverCache.isFullyInitialized() || writeTreeRefShadowingWrite(writesCache, newEmptyPath()) != null;
		return viewCacheUpdateEventSnap(viewCache, newEventCache, complete, viewProcessor.filter.filtersNodes());
	}
}
function viewGetCompleteServerCache(view, path) {
	const cache = viewCacheGetCompleteServerSnap(view.viewCache_);
	if (cache) {
		if (view.query._queryParams.loadsAllData() || !pathIsEmpty(path) && !cache.getImmediateChild(pathGetFront(path)).isEmpty()) return cache.getChild(path);
	}
	return null;
}
function viewApplyOperation(view, operation, writesCache, completeServerCache) {
	if (operation.type === OperationType.MERGE && operation.source.queryId !== null) {
		assert(viewCacheGetCompleteServerSnap(view.viewCache_), "We should always have a full cache before handling merges");
		assert(viewCacheGetCompleteEventSnap(view.viewCache_), "Missing event cache, even though we have a server cache");
	}
	const oldViewCache = view.viewCache_;
	const result = viewProcessorApplyOperation(view.processor_, oldViewCache, operation, writesCache, completeServerCache);
	viewProcessorAssertIndexed(view.processor_, result.viewCache);
	assert(result.viewCache.serverCache.isFullyInitialized() || !oldViewCache.serverCache.isFullyInitialized(), "Once a server snap is complete, it should never go back");
	view.viewCache_ = result.viewCache;
	return viewGenerateEventsForChanges_(view, result.changes, result.viewCache.eventCache.getNode(), null);
}
function viewGenerateEventsForChanges_(view, changes, eventCache, eventRegistration) {
	const registrations = eventRegistration ? [eventRegistration] : view.eventRegistrations_;
	return eventGeneratorGenerateEventsForChanges(view.eventGenerator_, changes, eventCache, registrations);
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var referenceConstructor$1;
function syncPointSetReferenceConstructor(val) {
	assert(!referenceConstructor$1, "__referenceConstructor has already been defined");
	referenceConstructor$1 = val;
}
function syncPointApplyOperation(syncPoint, operation, writesCache, optCompleteServerCache) {
	const queryId = operation.source.queryId;
	if (queryId !== null) {
		const view = syncPoint.views.get(queryId);
		assert(view != null, "SyncTree gave us an op for an invalid query.");
		return viewApplyOperation(view, operation, writesCache, optCompleteServerCache);
	} else {
		let events = [];
		for (const view of syncPoint.views.values()) events = events.concat(viewApplyOperation(view, operation, writesCache, optCompleteServerCache));
		return events;
	}
}
function syncPointGetCompleteServerCache(syncPoint, path) {
	let serverCache = null;
	for (const view of syncPoint.views.values()) serverCache = serverCache || viewGetCompleteServerCache(view, path);
	return serverCache;
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var referenceConstructor;
function syncTreeSetReferenceConstructor(val) {
	assert(!referenceConstructor, "__referenceConstructor has already been defined");
	referenceConstructor = val;
}
var SyncTree = class {
	constructor(listenProvider_) {
		this.listenProvider_ = listenProvider_;
		this.syncPointTree_ = new ImmutableTree(null);
		this.pendingWriteTree_ = newWriteTree();
		this.tagToQueryMap = /* @__PURE__ */ new Map();
		this.queryToTagMap = /* @__PURE__ */ new Map();
	}
};
function syncTreeApplyUserOverwrite(syncTree, path, newData, writeId, visible) {
	writeTreeAddOverwrite(syncTree.pendingWriteTree_, path, newData, writeId, visible);
	if (!visible) return [];
	else return syncTreeApplyOperationToSyncPoints_(syncTree, new Overwrite(newOperationSourceUser(), path, newData));
}
function syncTreeAckUserWrite(syncTree, writeId, revert = false) {
	const write = writeTreeGetWrite(syncTree.pendingWriteTree_, writeId);
	if (!writeTreeRemoveWrite(syncTree.pendingWriteTree_, writeId)) return [];
	else {
		let affectedTree = new ImmutableTree(null);
		if (write.snap != null) affectedTree = affectedTree.set(newEmptyPath(), true);
		else each(write.children, (pathString) => {
			affectedTree = affectedTree.set(new Path(pathString), true);
		});
		return syncTreeApplyOperationToSyncPoints_(syncTree, new AckUserWrite(write.path, affectedTree, revert));
	}
}
function syncTreeApplyServerOverwrite(syncTree, path, newData) {
	return syncTreeApplyOperationToSyncPoints_(syncTree, new Overwrite(newOperationSourceServer(), path, newData));
}
function syncTreeApplyServerMerge(syncTree, path, changedChildren) {
	const changeTree = ImmutableTree.fromObject(changedChildren);
	return syncTreeApplyOperationToSyncPoints_(syncTree, new Merge(newOperationSourceServer(), path, changeTree));
}
function syncTreeApplyTaggedQueryOverwrite(syncTree, path, snap, tag) {
	const queryKey = syncTreeQueryKeyForTag_(syncTree, tag);
	if (queryKey != null) {
		const r = syncTreeParseQueryKey_(queryKey);
		const queryPath = r.path;
		const queryId = r.queryId;
		const relativePath = newRelativePath(queryPath, path);
		return syncTreeApplyTaggedOperation_(syncTree, queryPath, new Overwrite(newOperationSourceServerTaggedQuery(queryId), relativePath, snap));
	} else return [];
}
function syncTreeApplyTaggedQueryMerge(syncTree, path, changedChildren, tag) {
	const queryKey = syncTreeQueryKeyForTag_(syncTree, tag);
	if (queryKey) {
		const r = syncTreeParseQueryKey_(queryKey);
		const queryPath = r.path;
		const queryId = r.queryId;
		const relativePath = newRelativePath(queryPath, path);
		const changeTree = ImmutableTree.fromObject(changedChildren);
		return syncTreeApplyTaggedOperation_(syncTree, queryPath, new Merge(newOperationSourceServerTaggedQuery(queryId), relativePath, changeTree));
	} else return [];
}
function syncTreeCalcCompleteEventCache(syncTree, path, writeIdsToExclude) {
	const includeHiddenSets = true;
	const writeTree = syncTree.pendingWriteTree_;
	return writeTreeCalcCompleteEventCache(writeTree, path, syncTree.syncPointTree_.findOnPath(path, (pathSoFar, syncPoint) => {
		const serverCache = syncPointGetCompleteServerCache(syncPoint, newRelativePath(pathSoFar, path));
		if (serverCache) return serverCache;
	}), writeIdsToExclude, includeHiddenSets);
}
function syncTreeApplyOperationToSyncPoints_(syncTree, operation) {
	return syncTreeApplyOperationHelper_(operation, syncTree.syncPointTree_, null, writeTreeChildWrites(syncTree.pendingWriteTree_, newEmptyPath()));
}
function syncTreeApplyOperationHelper_(operation, syncPointTree, serverCache, writesCache) {
	if (pathIsEmpty(operation.path)) return syncTreeApplyOperationDescendantsHelper_(operation, syncPointTree, serverCache, writesCache);
	else {
		const syncPoint = syncPointTree.get(newEmptyPath());
		if (serverCache == null && syncPoint != null) serverCache = syncPointGetCompleteServerCache(syncPoint, newEmptyPath());
		let events = [];
		const childName = pathGetFront(operation.path);
		const childOperation = operation.operationForChild(childName);
		const childTree = syncPointTree.children.get(childName);
		if (childTree && childOperation) {
			const childServerCache = serverCache ? serverCache.getImmediateChild(childName) : null;
			const childWritesCache = writeTreeRefChild(writesCache, childName);
			events = events.concat(syncTreeApplyOperationHelper_(childOperation, childTree, childServerCache, childWritesCache));
		}
		if (syncPoint) events = events.concat(syncPointApplyOperation(syncPoint, operation, writesCache, serverCache));
		return events;
	}
}
function syncTreeApplyOperationDescendantsHelper_(operation, syncPointTree, serverCache, writesCache) {
	const syncPoint = syncPointTree.get(newEmptyPath());
	if (serverCache == null && syncPoint != null) serverCache = syncPointGetCompleteServerCache(syncPoint, newEmptyPath());
	let events = [];
	syncPointTree.children.inorderTraversal((childName, childTree) => {
		const childServerCache = serverCache ? serverCache.getImmediateChild(childName) : null;
		const childWritesCache = writeTreeRefChild(writesCache, childName);
		const childOperation = operation.operationForChild(childName);
		if (childOperation) events = events.concat(syncTreeApplyOperationDescendantsHelper_(childOperation, childTree, childServerCache, childWritesCache));
	});
	if (syncPoint) events = events.concat(syncPointApplyOperation(syncPoint, operation, writesCache, serverCache));
	return events;
}
function syncTreeQueryKeyForTag_(syncTree, tag) {
	return syncTree.tagToQueryMap.get(tag);
}
function syncTreeParseQueryKey_(queryKey) {
	const splitIndex = queryKey.indexOf("$");
	assert(splitIndex !== -1 && splitIndex < queryKey.length - 1, "Bad queryKey.");
	return {
		queryId: queryKey.substr(splitIndex + 1),
		path: new Path(queryKey.substr(0, splitIndex))
	};
}
function syncTreeApplyTaggedOperation_(syncTree, queryPath, operation) {
	const syncPoint = syncTree.syncPointTree_.get(queryPath);
	assert(syncPoint, "Missing sync point for query tag that we're tracking");
	return syncPointApplyOperation(syncPoint, operation, writeTreeChildWrites(syncTree.pendingWriteTree_, queryPath), null);
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var ExistingValueProvider = class ExistingValueProvider {
	constructor(node_) {
		this.node_ = node_;
	}
	getImmediateChild(childName) {
		return new ExistingValueProvider(this.node_.getImmediateChild(childName));
	}
	node() {
		return this.node_;
	}
};
var DeferredValueProvider = class DeferredValueProvider {
	constructor(syncTree, path) {
		this.syncTree_ = syncTree;
		this.path_ = path;
	}
	getImmediateChild(childName) {
		const childPath = pathChild(this.path_, childName);
		return new DeferredValueProvider(this.syncTree_, childPath);
	}
	node() {
		return syncTreeCalcCompleteEventCache(this.syncTree_, this.path_);
	}
};
var generateWithValues = function(values) {
	values = values || {};
	values["timestamp"] = values["timestamp"] || (/* @__PURE__ */ new Date()).getTime();
	return values;
};
var resolveDeferredLeafValue = function(value, existingVal, serverValues) {
	if (!value || typeof value !== "object") return value;
	assert(".sv" in value, "Unexpected leaf node or priority contents");
	if (typeof value[".sv"] === "string") return resolveScalarDeferredValue(value[".sv"], existingVal, serverValues);
	else if (typeof value[".sv"] === "object") return resolveComplexDeferredValue(value[".sv"], existingVal);
	else assert(false, "Unexpected server value: " + JSON.stringify(value, null, 2));
};
var resolveScalarDeferredValue = function(op, existing, serverValues) {
	switch (op) {
		case "timestamp": return serverValues["timestamp"];
		default: assert(false, "Unexpected server value: " + op);
	}
};
var resolveComplexDeferredValue = function(op, existing, unused) {
	if (!op.hasOwnProperty("increment")) assert(false, "Unexpected server value: " + JSON.stringify(op, null, 2));
	const delta = op["increment"];
	if (typeof delta !== "number") assert(false, "Unexpected increment value: " + delta);
	const existingNode = existing.node();
	assert(existingNode !== null && typeof existingNode !== "undefined", "Expected ChildrenNode.EMPTY_NODE for nulls");
	if (!existingNode.isLeafNode()) return delta;
	const existingVal = existingNode.getValue();
	if (typeof existingVal !== "number") return delta;
	return existingVal + delta;
};
var resolveDeferredValueTree = function(path, node, syncTree, serverValues) {
	return resolveDeferredValue(node, new DeferredValueProvider(syncTree, path), serverValues);
};
var resolveDeferredValueSnapshot = function(node, existing, serverValues) {
	return resolveDeferredValue(node, new ExistingValueProvider(existing), serverValues);
};
function resolveDeferredValue(node, existingVal, serverValues) {
	const priority = resolveDeferredLeafValue(node.getPriority().val(), existingVal.getImmediateChild(".priority"), serverValues);
	let newNode;
	if (node.isLeafNode()) {
		const leafNode = node;
		const value = resolveDeferredLeafValue(leafNode.getValue(), existingVal, serverValues);
		if (value !== leafNode.getValue() || priority !== leafNode.getPriority().val()) return new LeafNode(value, nodeFromJSON(priority));
		else return node;
	} else {
		const childrenNode = node;
		newNode = childrenNode;
		if (priority !== childrenNode.getPriority().val()) newNode = newNode.updatePriority(new LeafNode(priority));
		childrenNode.forEachChild(PRIORITY_INDEX, (childName, childNode) => {
			const newChildNode = resolveDeferredValue(childNode, existingVal.getImmediateChild(childName), serverValues);
			if (newChildNode !== childNode) newNode = newNode.updateImmediateChild(childName, newChildNode);
		});
		return newNode;
	}
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Tree = class {
	constructor(name = "", parent = null, node = {
		children: {},
		childCount: 0
	}) {
		this.name = name;
		this.parent = parent;
		this.node = node;
	}
};
function treeSubTree(tree, pathObj) {
	let path = pathObj instanceof Path ? pathObj : new Path(pathObj);
	let child = tree;
	let next = pathGetFront(path);
	while (next !== null) {
		const childNode = safeGet(child.node.children, next) || {
			children: {},
			childCount: 0
		};
		child = new Tree(next, child, childNode);
		path = pathPopFront(path);
		next = pathGetFront(path);
	}
	return child;
}
function treeGetValue(tree) {
	return tree.node.value;
}
function treeSetValue(tree, value) {
	tree.node.value = value;
	treeUpdateParents(tree);
}
function treeHasChildren(tree) {
	return tree.node.childCount > 0;
}
function treeIsEmpty(tree) {
	return treeGetValue(tree) === void 0 && !treeHasChildren(tree);
}
function treeForEachChild(tree, action) {
	each(tree.node.children, (child, childTree) => {
		action(new Tree(child, tree, childTree));
	});
}
function treeForEachDescendant(tree, action, includeSelf, childrenFirst) {
	if (includeSelf && !childrenFirst) action(tree);
	treeForEachChild(tree, (child) => {
		treeForEachDescendant(child, action, true, childrenFirst);
	});
	if (includeSelf && childrenFirst) action(tree);
}
function treeForEachAncestor(tree, action, includeSelf) {
	let node = includeSelf ? tree : tree.parent;
	while (node !== null) {
		if (action(node)) return true;
		node = node.parent;
	}
	return false;
}
function treeGetPath(tree) {
	return new Path(tree.parent === null ? tree.name : treeGetPath(tree.parent) + "/" + tree.name);
}
function treeUpdateParents(tree) {
	if (tree.parent !== null) treeUpdateChild(tree.parent, tree.name, tree);
}
function treeUpdateChild(tree, childName, child) {
	const childEmpty = treeIsEmpty(child);
	const childExists = contains(tree.node.children, childName);
	if (childEmpty && childExists) {
		delete tree.node.children[childName];
		tree.node.childCount--;
		treeUpdateParents(tree);
	} else if (!childEmpty && !childExists) {
		tree.node.children[childName] = child.node;
		tree.node.childCount++;
		treeUpdateParents(tree);
	}
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var INVALID_KEY_REGEX_ = /[\[\].#$\/\u0000-\u001F\u007F]/;
var INVALID_PATH_REGEX_ = /[\[\].#$\u0000-\u001F\u007F]/;
var MAX_LEAF_SIZE_ = 10 * 1024 * 1024;
var isValidKey = function(key) {
	return typeof key === "string" && key.length !== 0 && !INVALID_KEY_REGEX_.test(key);
};
var isValidPathString = function(pathString) {
	return typeof pathString === "string" && pathString.length !== 0 && !INVALID_PATH_REGEX_.test(pathString);
};
var isValidRootPathString = function(pathString) {
	if (pathString) pathString = pathString.replace(/^\/*\.info(\/|$)/, "/");
	return isValidPathString(pathString);
};
var validateFirebaseData = function(errorPrefix, data, path_) {
	const path = path_ instanceof Path ? new ValidationPath(path_, errorPrefix) : path_;
	if (data === void 0) throw new Error(errorPrefix + "contains undefined " + validationPathToErrorString(path));
	if (typeof data === "function") throw new Error(errorPrefix + "contains a function " + validationPathToErrorString(path) + " with contents = " + data.toString());
	if (isInvalidJSONNumber(data)) throw new Error(errorPrefix + "contains " + data.toString() + " " + validationPathToErrorString(path));
	if (typeof data === "string" && data.length > MAX_LEAF_SIZE_ / 3 && stringLength(data) > MAX_LEAF_SIZE_) throw new Error(errorPrefix + "contains a string greater than 10485760 utf8 bytes " + validationPathToErrorString(path) + " ('" + data.substring(0, 50) + "...')");
	if (data && typeof data === "object") {
		let hasDotValue = false;
		let hasActualChild = false;
		each(data, (key, value) => {
			if (key === ".value") hasDotValue = true;
			else if (key !== ".priority" && key !== ".sv") {
				hasActualChild = true;
				if (!isValidKey(key)) throw new Error(errorPrefix + " contains an invalid key (" + key + ") " + validationPathToErrorString(path) + ".  Keys must be non-empty strings and can't contain \".\", \"#\", \"$\", \"/\", \"[\", or \"]\"");
			}
			validationPathPush(path, key);
			validateFirebaseData(errorPrefix, value, path);
			validationPathPop(path);
		});
		if (hasDotValue && hasActualChild) throw new Error(errorPrefix + " contains \".value\" child " + validationPathToErrorString(path) + " in addition to actual children.");
	}
};
var validateUrl = function(fnName, parsedUrl) {
	const pathString = parsedUrl.path.toString();
	if (!(typeof parsedUrl.repoInfo.host === "string") || parsedUrl.repoInfo.host.length === 0 || !isValidKey(parsedUrl.repoInfo.namespace) && parsedUrl.repoInfo.host.split(":")[0] !== "localhost" || pathString.length !== 0 && !isValidRootPathString(pathString)) throw new Error(errorPrefix(fnName, "url") + "must be a valid firebase URL and the path can't contain \".\", \"#\", \"$\", \"[\", or \"]\".");
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var EventQueue = class {
	constructor() {
		this.eventLists_ = [];
		this.recursionDepth_ = 0;
	}
};
function eventQueueQueueEvents(eventQueue, eventDataList) {
	let currList = null;
	for (let i = 0; i < eventDataList.length; i++) {
		const data = eventDataList[i];
		const path = data.getPath();
		if (currList !== null && !pathEquals(path, currList.path)) {
			eventQueue.eventLists_.push(currList);
			currList = null;
		}
		if (currList === null) currList = {
			events: [],
			path
		};
		currList.events.push(data);
	}
	if (currList) eventQueue.eventLists_.push(currList);
}
function eventQueueRaiseEventsForChangedPath(eventQueue, changedPath, eventDataList) {
	eventQueueQueueEvents(eventQueue, eventDataList);
	eventQueueRaiseQueuedEventsMatchingPredicate(eventQueue, (eventPath) => pathContains(eventPath, changedPath) || pathContains(changedPath, eventPath));
}
function eventQueueRaiseQueuedEventsMatchingPredicate(eventQueue, predicate) {
	eventQueue.recursionDepth_++;
	let sentAll = true;
	for (let i = 0; i < eventQueue.eventLists_.length; i++) {
		const eventList = eventQueue.eventLists_[i];
		if (eventList) {
			const eventPath = eventList.path;
			if (predicate(eventPath)) {
				eventListRaise(eventQueue.eventLists_[i]);
				eventQueue.eventLists_[i] = null;
			} else sentAll = false;
		}
	}
	if (sentAll) eventQueue.eventLists_ = [];
	eventQueue.recursionDepth_--;
}
function eventListRaise(eventList) {
	for (let i = 0; i < eventList.events.length; i++) {
		const eventData = eventList.events[i];
		if (eventData !== null) {
			eventList.events[i] = null;
			const eventFn = eventData.getEventRunner();
			if (logger) log("event: " + eventData.toString());
			exceptionGuard(eventFn);
		}
	}
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var INTERRUPT_REASON = "repo_interrupt";
var MAX_TRANSACTION_RETRIES = 25;
var Repo = class {
	constructor(repoInfo_, forceRestClient_, authTokenProvider_, appCheckProvider_) {
		this.repoInfo_ = repoInfo_;
		this.forceRestClient_ = forceRestClient_;
		this.authTokenProvider_ = authTokenProvider_;
		this.appCheckProvider_ = appCheckProvider_;
		this.dataUpdateCount = 0;
		this.statsListener_ = null;
		this.eventQueue_ = new EventQueue();
		this.nextWriteId_ = 1;
		this.interceptServerDataCallback_ = null;
		this.onDisconnect_ = newSparseSnapshotTree();
		this.transactionQueueTree_ = new Tree();
		this.persistentConnection_ = null;
		this.key = this.repoInfo_.toURLString();
	}
	toString() {
		return (this.repoInfo_.secure ? "https://" : "http://") + this.repoInfo_.host;
	}
};
function repoStart(repo, appId, authOverride) {
	repo.stats_ = statsManagerGetCollection(repo.repoInfo_);
	if (repo.forceRestClient_ || beingCrawled()) {
		repo.server_ = new ReadonlyRestClient(repo.repoInfo_, (pathString, data, isMerge, tag) => {
			repoOnDataUpdate(repo, pathString, data, isMerge, tag);
		}, repo.authTokenProvider_, repo.appCheckProvider_);
		setTimeout(() => repoOnConnectStatus(repo, true), 0);
	} else {
		if (typeof authOverride !== "undefined" && authOverride !== null) {
			if (typeof authOverride !== "object") throw new Error("Only objects are supported for option databaseAuthVariableOverride");
			try {
				stringify(authOverride);
			} catch (e) {
				throw new Error("Invalid authOverride provided: " + e);
			}
		}
		repo.persistentConnection_ = new PersistentConnection(repo.repoInfo_, appId, (pathString, data, isMerge, tag) => {
			repoOnDataUpdate(repo, pathString, data, isMerge, tag);
		}, (connectStatus) => {
			repoOnConnectStatus(repo, connectStatus);
		}, (updates) => {
			repoOnServerInfoUpdate(repo, updates);
		}, repo.authTokenProvider_, repo.appCheckProvider_, authOverride);
		repo.server_ = repo.persistentConnection_;
	}
	repo.authTokenProvider_.addTokenChangeListener((token) => {
		repo.server_.refreshAuthToken(token);
	});
	repo.appCheckProvider_.addTokenChangeListener((result) => {
		repo.server_.refreshAppCheckToken(result.token);
	});
	repo.statsReporter_ = statsManagerGetOrCreateReporter(repo.repoInfo_, () => new StatsReporter(repo.stats_, repo.server_));
	repo.infoData_ = new SnapshotHolder();
	repo.infoSyncTree_ = new SyncTree({
		startListening: (query, tag, currentHashFn, onComplete) => {
			let infoEvents = [];
			const node = repo.infoData_.getNode(query._path);
			if (!node.isEmpty()) {
				infoEvents = syncTreeApplyServerOverwrite(repo.infoSyncTree_, query._path, node);
				setTimeout(() => {
					onComplete("ok");
				}, 0);
			}
			return infoEvents;
		},
		stopListening: () => {}
	});
	repoUpdateInfo(repo, "connected", false);
	repo.serverSyncTree_ = new SyncTree({
		startListening: (query, tag, currentHashFn, onComplete) => {
			repo.server_.listen(query, currentHashFn, tag, (status, data) => {
				const events = onComplete(status, data);
				eventQueueRaiseEventsForChangedPath(repo.eventQueue_, query._path, events);
			});
			return [];
		},
		stopListening: (query, tag) => {
			repo.server_.unlisten(query, tag);
		}
	});
}
function repoServerTime(repo) {
	const offset = repo.infoData_.getNode(new Path(".info/serverTimeOffset")).val() || 0;
	return (/* @__PURE__ */ new Date()).getTime() + offset;
}
function repoGenerateServerValues(repo) {
	return generateWithValues({ timestamp: repoServerTime(repo) });
}
function repoOnDataUpdate(repo, pathString, data, isMerge, tag) {
	repo.dataUpdateCount++;
	const path = new Path(pathString);
	data = repo.interceptServerDataCallback_ ? repo.interceptServerDataCallback_(pathString, data) : data;
	let events = [];
	if (tag) if (isMerge) {
		const taggedChildren = map(data, (raw) => nodeFromJSON(raw));
		events = syncTreeApplyTaggedQueryMerge(repo.serverSyncTree_, path, taggedChildren, tag);
	} else {
		const taggedSnap = nodeFromJSON(data);
		events = syncTreeApplyTaggedQueryOverwrite(repo.serverSyncTree_, path, taggedSnap, tag);
	}
	else if (isMerge) {
		const changedChildren = map(data, (raw) => nodeFromJSON(raw));
		events = syncTreeApplyServerMerge(repo.serverSyncTree_, path, changedChildren);
	} else {
		const snap = nodeFromJSON(data);
		events = syncTreeApplyServerOverwrite(repo.serverSyncTree_, path, snap);
	}
	let affectedPath = path;
	if (events.length > 0) affectedPath = repoRerunTransactions(repo, path);
	eventQueueRaiseEventsForChangedPath(repo.eventQueue_, affectedPath, events);
}
function repoOnConnectStatus(repo, connectStatus) {
	repoUpdateInfo(repo, "connected", connectStatus);
	if (connectStatus === false) repoRunOnDisconnectEvents(repo);
}
function repoOnServerInfoUpdate(repo, updates) {
	each(updates, (key, value) => {
		repoUpdateInfo(repo, key, value);
	});
}
function repoUpdateInfo(repo, pathString, value) {
	const path = new Path("/.info/" + pathString);
	const newNode = nodeFromJSON(value);
	repo.infoData_.updateSnapshot(path, newNode);
	const events = syncTreeApplyServerOverwrite(repo.infoSyncTree_, path, newNode);
	eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, events);
}
function repoGetNextWriteId(repo) {
	return repo.nextWriteId_++;
}
function repoRunOnDisconnectEvents(repo) {
	repoLog(repo, "onDisconnectEvents");
	const serverValues = repoGenerateServerValues(repo);
	const resolvedOnDisconnectTree = newSparseSnapshotTree();
	sparseSnapshotTreeForEachTree(repo.onDisconnect_, newEmptyPath(), (path, node) => {
		sparseSnapshotTreeRemember(resolvedOnDisconnectTree, path, resolveDeferredValueTree(path, node, repo.serverSyncTree_, serverValues));
	});
	let events = [];
	sparseSnapshotTreeForEachTree(resolvedOnDisconnectTree, newEmptyPath(), (path, snap) => {
		events = events.concat(syncTreeApplyServerOverwrite(repo.serverSyncTree_, path, snap));
		repoRerunTransactions(repo, repoAbortTransactions(repo, path));
	});
	repo.onDisconnect_ = newSparseSnapshotTree();
	eventQueueRaiseEventsForChangedPath(repo.eventQueue_, newEmptyPath(), events);
}
function repoInterrupt(repo) {
	if (repo.persistentConnection_) repo.persistentConnection_.interrupt(INTERRUPT_REASON);
}
function repoLog(repo, ...varArgs) {
	let prefix = "";
	if (repo.persistentConnection_) prefix = repo.persistentConnection_.id + ":";
	log(prefix, ...varArgs);
}
function repoGetLatestState(repo, path, excludeSets) {
	return syncTreeCalcCompleteEventCache(repo.serverSyncTree_, path, excludeSets) || ChildrenNode.EMPTY_NODE;
}
function repoSendReadyTransactions(repo, node = repo.transactionQueueTree_) {
	if (!node) repoPruneCompletedTransactionsBelowNode(repo, node);
	if (treeGetValue(node)) {
		const queue = repoBuildTransactionQueue(repo, node);
		assert(queue.length > 0, "Sending zero length transaction queue");
		if (queue.every((transaction) => transaction.status === 0)) repoSendTransactionQueue(repo, treeGetPath(node), queue);
	} else if (treeHasChildren(node)) treeForEachChild(node, (childNode) => {
		repoSendReadyTransactions(repo, childNode);
	});
}
function repoSendTransactionQueue(repo, path, queue) {
	const latestState = repoGetLatestState(repo, path, queue.map((txn) => {
		return txn.currentWriteId;
	}));
	let snapToSend = latestState;
	const latestHash = latestState.hash();
	for (let i = 0; i < queue.length; i++) {
		const txn = queue[i];
		assert(txn.status === 0, "tryToSendTransactionQueue_: items in queue should all be run.");
		txn.status = 1;
		txn.retryCount++;
		const relativePath = newRelativePath(path, txn.path);
		snapToSend = snapToSend.updateChild(relativePath, txn.currentOutputSnapshotRaw);
	}
	const dataToSend = snapToSend.val(true);
	const pathToSend = path;
	repo.server_.put(pathToSend.toString(), dataToSend, (status) => {
		repoLog(repo, "transaction put response", {
			path: pathToSend.toString(),
			status
		});
		let events = [];
		if (status === "ok") {
			const callbacks = [];
			for (let i = 0; i < queue.length; i++) {
				queue[i].status = 2;
				events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, queue[i].currentWriteId));
				if (queue[i].onComplete) callbacks.push(() => queue[i].onComplete(null, true, queue[i].currentOutputSnapshotResolved));
				queue[i].unwatcher();
			}
			repoPruneCompletedTransactionsBelowNode(repo, treeSubTree(repo.transactionQueueTree_, path));
			repoSendReadyTransactions(repo, repo.transactionQueueTree_);
			eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, events);
			for (let i = 0; i < callbacks.length; i++) exceptionGuard(callbacks[i]);
		} else {
			if (status === "datastale") for (let i = 0; i < queue.length; i++) if (queue[i].status === 3) queue[i].status = 4;
			else queue[i].status = 0;
			else {
				warn("transaction at " + pathToSend.toString() + " failed: " + status);
				for (let i = 0; i < queue.length; i++) {
					queue[i].status = 4;
					queue[i].abortReason = status;
				}
			}
			repoRerunTransactions(repo, path);
		}
	}, latestHash);
}
function repoRerunTransactions(repo, changedPath) {
	const rootMostTransactionNode = repoGetAncestorTransactionNode(repo, changedPath);
	const path = treeGetPath(rootMostTransactionNode);
	repoRerunTransactionQueue(repo, repoBuildTransactionQueue(repo, rootMostTransactionNode), path);
	return path;
}
function repoRerunTransactionQueue(repo, queue, path) {
	if (queue.length === 0) return;
	const callbacks = [];
	let events = [];
	const setsToIgnore = queue.filter((q) => {
		return q.status === 0;
	}).map((q) => {
		return q.currentWriteId;
	});
	for (let i = 0; i < queue.length; i++) {
		const transaction = queue[i];
		const relativePath = newRelativePath(path, transaction.path);
		let abortTransaction = false;
		let abortReason;
		assert(relativePath !== null, "rerunTransactionsUnderNode_: relativePath should not be null.");
		if (transaction.status === 4) {
			abortTransaction = true;
			abortReason = transaction.abortReason;
			events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, transaction.currentWriteId, true));
		} else if (transaction.status === 0) if (transaction.retryCount >= MAX_TRANSACTION_RETRIES) {
			abortTransaction = true;
			abortReason = "maxretry";
			events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, transaction.currentWriteId, true));
		} else {
			const currentNode = repoGetLatestState(repo, transaction.path, setsToIgnore);
			transaction.currentInputSnapshot = currentNode;
			const newData = queue[i].update(currentNode.val());
			if (newData !== void 0) {
				validateFirebaseData("transaction failed: Data returned ", newData, transaction.path);
				let newDataNode = nodeFromJSON(newData);
				if (!(typeof newData === "object" && newData != null && contains(newData, ".priority"))) newDataNode = newDataNode.updatePriority(currentNode.getPriority());
				const oldWriteId = transaction.currentWriteId;
				const serverValues = repoGenerateServerValues(repo);
				const newNodeResolved = resolveDeferredValueSnapshot(newDataNode, currentNode, serverValues);
				transaction.currentOutputSnapshotRaw = newDataNode;
				transaction.currentOutputSnapshotResolved = newNodeResolved;
				transaction.currentWriteId = repoGetNextWriteId(repo);
				setsToIgnore.splice(setsToIgnore.indexOf(oldWriteId), 1);
				events = events.concat(syncTreeApplyUserOverwrite(repo.serverSyncTree_, transaction.path, newNodeResolved, transaction.currentWriteId, transaction.applyLocally));
				events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, oldWriteId, true));
			} else {
				abortTransaction = true;
				abortReason = "nodata";
				events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, transaction.currentWriteId, true));
			}
		}
		eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, events);
		events = [];
		if (abortTransaction) {
			queue[i].status = 2;
			(function(unwatcher) {
				setTimeout(unwatcher, Math.floor(0));
			})(queue[i].unwatcher);
			if (queue[i].onComplete) if (abortReason === "nodata") callbacks.push(() => queue[i].onComplete(null, false, queue[i].currentInputSnapshot));
			else callbacks.push(() => queue[i].onComplete(new Error(abortReason), false, null));
		}
	}
	repoPruneCompletedTransactionsBelowNode(repo, repo.transactionQueueTree_);
	for (let i = 0; i < callbacks.length; i++) exceptionGuard(callbacks[i]);
	repoSendReadyTransactions(repo, repo.transactionQueueTree_);
}
function repoGetAncestorTransactionNode(repo, path) {
	let front;
	let transactionNode = repo.transactionQueueTree_;
	front = pathGetFront(path);
	while (front !== null && treeGetValue(transactionNode) === void 0) {
		transactionNode = treeSubTree(transactionNode, front);
		path = pathPopFront(path);
		front = pathGetFront(path);
	}
	return transactionNode;
}
function repoBuildTransactionQueue(repo, transactionNode) {
	const transactionQueue = [];
	repoAggregateTransactionQueuesForNode(repo, transactionNode, transactionQueue);
	transactionQueue.sort((a, b) => a.order - b.order);
	return transactionQueue;
}
function repoAggregateTransactionQueuesForNode(repo, node, queue) {
	const nodeQueue = treeGetValue(node);
	if (nodeQueue) for (let i = 0; i < nodeQueue.length; i++) queue.push(nodeQueue[i]);
	treeForEachChild(node, (child) => {
		repoAggregateTransactionQueuesForNode(repo, child, queue);
	});
}
function repoPruneCompletedTransactionsBelowNode(repo, node) {
	const queue = treeGetValue(node);
	if (queue) {
		let to = 0;
		for (let from = 0; from < queue.length; from++) if (queue[from].status !== 2) {
			queue[to] = queue[from];
			to++;
		}
		queue.length = to;
		treeSetValue(node, queue.length > 0 ? queue : void 0);
	}
	treeForEachChild(node, (childNode) => {
		repoPruneCompletedTransactionsBelowNode(repo, childNode);
	});
}
function repoAbortTransactions(repo, path) {
	const affectedPath = treeGetPath(repoGetAncestorTransactionNode(repo, path));
	const transactionNode = treeSubTree(repo.transactionQueueTree_, path);
	treeForEachAncestor(transactionNode, (node) => {
		repoAbortTransactionsOnNode(repo, node);
	});
	repoAbortTransactionsOnNode(repo, transactionNode);
	treeForEachDescendant(transactionNode, (node) => {
		repoAbortTransactionsOnNode(repo, node);
	});
	return affectedPath;
}
function repoAbortTransactionsOnNode(repo, node) {
	const queue = treeGetValue(node);
	if (queue) {
		const callbacks = [];
		let events = [];
		let lastSent = -1;
		for (let i = 0; i < queue.length; i++) if (queue[i].status === 3);
		else if (queue[i].status === 1) {
			assert(lastSent === i - 1, "All SENT items should be at beginning of queue.");
			lastSent = i;
			queue[i].status = 3;
			queue[i].abortReason = "set";
		} else {
			assert(queue[i].status === 0, "Unexpected transaction status in abort");
			queue[i].unwatcher();
			events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, queue[i].currentWriteId, true));
			if (queue[i].onComplete) callbacks.push(queue[i].onComplete.bind(null, /* @__PURE__ */ new Error("set"), false, null));
		}
		if (lastSent === -1) treeSetValue(node, void 0);
		else queue.length = lastSent + 1;
		eventQueueRaiseEventsForChangedPath(repo.eventQueue_, treeGetPath(node), events);
		for (let i = 0; i < callbacks.length; i++) exceptionGuard(callbacks[i]);
	}
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function decodePath(pathString) {
	let pathStringDecoded = "";
	const pieces = pathString.split("/");
	for (let i = 0; i < pieces.length; i++) if (pieces[i].length > 0) {
		let piece = pieces[i];
		try {
			piece = decodeURIComponent(piece.replace(/\+/g, " "));
		} catch (e) {}
		pathStringDecoded += "/" + piece;
	}
	return pathStringDecoded;
}
function decodeQuery(queryString) {
	const results = {};
	if (queryString.charAt(0) === "?") queryString = queryString.substring(1);
	for (const segment of queryString.split("&")) {
		if (segment.length === 0) continue;
		const kv = segment.split("=");
		if (kv.length === 2) results[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
		else warn(`Invalid query segment '${segment}' in query '${queryString}'`);
	}
	return results;
}
var parseRepoInfo = function(dataURL, nodeAdmin) {
	const parsedUrl = parseDatabaseURL(dataURL);
	const namespace = parsedUrl.namespace;
	if (parsedUrl.domain === "firebase.com") fatal(parsedUrl.host + " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");
	if ((!namespace || namespace === "undefined") && parsedUrl.domain !== "localhost") fatal("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");
	if (!parsedUrl.secure) warnIfPageIsSecure();
	const webSocketOnly = parsedUrl.scheme === "ws" || parsedUrl.scheme === "wss";
	return {
		repoInfo: new RepoInfo(parsedUrl.host, parsedUrl.secure, namespace, webSocketOnly, nodeAdmin, "", namespace !== parsedUrl.subdomain),
		path: new Path(parsedUrl.pathString)
	};
};
var parseDatabaseURL = function(dataURL) {
	let host = "";
	let domain = "";
	let subdomain = "";
	let pathString = "";
	let namespace = "";
	let secure = true;
	let scheme = "https";
	let port = 443;
	if (typeof dataURL === "string") {
		let colonInd = dataURL.indexOf("//");
		if (colonInd >= 0) {
			scheme = dataURL.substring(0, colonInd - 1);
			dataURL = dataURL.substring(colonInd + 2);
		}
		let slashInd = dataURL.indexOf("/");
		if (slashInd === -1) slashInd = dataURL.length;
		let questionMarkInd = dataURL.indexOf("?");
		if (questionMarkInd === -1) questionMarkInd = dataURL.length;
		host = dataURL.substring(0, Math.min(slashInd, questionMarkInd));
		if (slashInd < questionMarkInd) pathString = decodePath(dataURL.substring(slashInd, questionMarkInd));
		const queryParams = decodeQuery(dataURL.substring(Math.min(dataURL.length, questionMarkInd)));
		colonInd = host.indexOf(":");
		if (colonInd >= 0) {
			secure = scheme === "https" || scheme === "wss";
			port = parseInt(host.substring(colonInd + 1), 10);
		} else colonInd = host.length;
		const hostWithoutPort = host.slice(0, colonInd);
		if (hostWithoutPort.toLowerCase() === "localhost") domain = "localhost";
		else if (hostWithoutPort.split(".").length <= 2) domain = hostWithoutPort;
		else {
			const dotInd = host.indexOf(".");
			subdomain = host.substring(0, dotInd).toLowerCase();
			domain = host.substring(dotInd + 1);
			namespace = subdomain;
		}
		if ("ns" in queryParams) namespace = queryParams["ns"];
	}
	return {
		host,
		port,
		domain,
		subdomain,
		secure,
		scheme,
		pathString,
		namespace
	};
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var PUSH_CHARS = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
(function() {
	let lastPushTime = 0;
	const lastRandChars = [];
	return function(now) {
		const duplicateTime = now === lastPushTime;
		lastPushTime = now;
		let i;
		const timeStampChars = new Array(8);
		for (i = 7; i >= 0; i--) {
			timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
			now = Math.floor(now / 64);
		}
		assert(now === 0, "Cannot push at time == 0");
		let id = timeStampChars.join("");
		if (!duplicateTime) for (i = 0; i < 12; i++) lastRandChars[i] = Math.floor(Math.random() * 64);
		else {
			for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) lastRandChars[i] = 0;
			lastRandChars[i]++;
		}
		for (i = 0; i < 12; i++) id += PUSH_CHARS.charAt(lastRandChars[i]);
		assert(id.length === 20, "nextPushId: Length should be 20.");
		return id;
	};
})();
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var QueryImpl = class QueryImpl {
	constructor(_repo, _path, _queryParams, _orderByCalled) {
		this._repo = _repo;
		this._path = _path;
		this._queryParams = _queryParams;
		this._orderByCalled = _orderByCalled;
	}
	get key() {
		if (pathIsEmpty(this._path)) return null;
		else return pathGetBack(this._path);
	}
	get ref() {
		return new ReferenceImpl(this._repo, this._path);
	}
	get _queryIdentifier() {
		const id = ObjectToUniqueKey(queryParamsGetQueryObject(this._queryParams));
		return id === "{}" ? "default" : id;
	}
	get _queryObject() {
		return queryParamsGetQueryObject(this._queryParams);
	}
	isEqual(other) {
		other = getModularInstance(other);
		if (!(other instanceof QueryImpl)) return false;
		const sameRepo = this._repo === other._repo;
		const samePath = pathEquals(this._path, other._path);
		const sameQueryIdentifier = this._queryIdentifier === other._queryIdentifier;
		return sameRepo && samePath && sameQueryIdentifier;
	}
	toJSON() {
		return this.toString();
	}
	toString() {
		return this._repo.toString() + pathToUrlEncodedString(this._path);
	}
};
var ReferenceImpl = class ReferenceImpl extends QueryImpl {
	constructor(repo, path) {
		super(repo, path, new QueryParams(), false);
	}
	get parent() {
		const parentPath = pathParent(this._path);
		return parentPath === null ? null : new ReferenceImpl(this._repo, parentPath);
	}
	get root() {
		let ref = this;
		while (ref.parent !== null) ref = ref.parent;
		return ref;
	}
};
syncPointSetReferenceConstructor(ReferenceImpl);
syncTreeSetReferenceConstructor(ReferenceImpl);
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var FIREBASE_DATABASE_EMULATOR_HOST_VAR = "FIREBASE_DATABASE_EMULATOR_HOST";
var repos = {};
var useRestClient = false;
function repoManagerDatabaseFromApp(app, authProvider, appCheckProvider, url, nodeAdmin) {
	let dbUrl = url || app.options.databaseURL;
	if (dbUrl === void 0) {
		if (!app.options.projectId) fatal("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp().");
		log("Using default host for project ", app.options.projectId);
		dbUrl = `${app.options.projectId}-default-rtdb.firebaseio.com`;
	}
	let parsedUrl = parseRepoInfo(dbUrl, nodeAdmin);
	let repoInfo = parsedUrl.repoInfo;
	let isEmulator;
	let dbEmulatorHost = void 0;
	if (typeof process !== "undefined" && {}) dbEmulatorHost = {}[FIREBASE_DATABASE_EMULATOR_HOST_VAR];
	if (dbEmulatorHost) {
		isEmulator = true;
		dbUrl = `http://${dbEmulatorHost}?ns=${repoInfo.namespace}`;
		parsedUrl = parseRepoInfo(dbUrl, nodeAdmin);
		repoInfo = parsedUrl.repoInfo;
	} else isEmulator = !parsedUrl.repoInfo.secure;
	const authTokenProvider = nodeAdmin && isEmulator ? new EmulatorTokenProvider(EmulatorTokenProvider.OWNER) : new FirebaseAuthTokenProvider(app.name, app.options, authProvider);
	validateUrl("Invalid Firebase Database URL", parsedUrl);
	if (!pathIsEmpty(parsedUrl.path)) fatal("Database URL must point to the root of a Firebase Database (not including a child path).");
	return new Database(repoManagerCreateRepo(repoInfo, app, authTokenProvider, new AppCheckTokenProvider(app, appCheckProvider)), app);
}
function repoManagerDeleteRepo(repo, appName) {
	const appRepos = repos[appName];
	if (!appRepos || appRepos[repo.key] !== repo) fatal(`Database ${appName}(${repo.repoInfo_}) has already been deleted.`);
	repoInterrupt(repo);
	delete appRepos[repo.key];
}
function repoManagerCreateRepo(repoInfo, app, authTokenProvider, appCheckProvider) {
	let appRepos = repos[app.name];
	if (!appRepos) {
		appRepos = {};
		repos[app.name] = appRepos;
	}
	let repo = appRepos[repoInfo.toURLString()];
	if (repo) fatal("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call.");
	repo = new Repo(repoInfo, useRestClient, authTokenProvider, appCheckProvider);
	appRepos[repoInfo.toURLString()] = repo;
	return repo;
}
var Database = class {
	constructor(_repoInternal, app) {
		this._repoInternal = _repoInternal;
		this.app = app;
		this["type"] = "database";
		this._instanceStarted = false;
	}
	get _repo() {
		if (!this._instanceStarted) {
			repoStart(this._repoInternal, this.app.options.appId, this.app.options["databaseAuthVariableOverride"]);
			this._instanceStarted = true;
		}
		return this._repoInternal;
	}
	get _root() {
		if (!this._rootInternal) this._rootInternal = new ReferenceImpl(this._repo, newEmptyPath());
		return this._rootInternal;
	}
	_delete() {
		if (this._rootInternal !== null) {
			repoManagerDeleteRepo(this._repo, this.app.name);
			this._repoInternal = null;
			this._rootInternal = null;
		}
		return Promise.resolve();
	}
	_checkNotDeleted(apiName) {
		if (this._rootInternal === null) fatal("Cannot call " + apiName + " on a deleted database.");
	}
};
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function registerDatabase(variant) {
	setSDKVersion(SDK_VERSION$1);
	_registerComponent(new Component("database", (container, { instanceIdentifier: url }) => {
		return repoManagerDatabaseFromApp(container.getProvider("app").getImmediate(), container.getProvider("auth-internal"), container.getProvider("app-check-internal"), url);
	}, "PUBLIC").setMultipleInstances(true));
	registerVersion(name$1, version$1, variant);
	registerVersion(name$1, version$1, "esm2017");
}
PersistentConnection.prototype.simpleListen = function(pathString, onComplete) {
	this.sendRequest("q", { p: pathString }, onComplete);
};
PersistentConnection.prototype.echo = function(data, onEcho) {
	this.sendRequest("echo", { d: data }, onEcho);
};
registerDatabase();
var commonjsGlobal$1 = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var bloom_blob_es2018 = {};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/
var Integer;
(function() {
	var h;
	function k(f, a) {
		function c() {}
		c.prototype = a.prototype;
		f.D = a.prototype;
		f.prototype = new c();
		f.prototype.constructor = f;
		f.C = function(d, e, g) {
			for (var b = Array(arguments.length - 2), r = 2; r < arguments.length; r++) b[r - 2] = arguments[r];
			return a.prototype[e].apply(d, b);
		};
	}
	function l() {
		this.blockSize = -1;
	}
	function m() {
		this.blockSize = -1;
		this.blockSize = 64;
		this.g = Array(4);
		this.B = Array(this.blockSize);
		this.o = this.h = 0;
		this.s();
	}
	k(m, l);
	m.prototype.s = function() {
		this.g[0] = 1732584193;
		this.g[1] = 4023233417;
		this.g[2] = 2562383102;
		this.g[3] = 271733878;
		this.o = this.h = 0;
	};
	function n(f, a, c) {
		c || (c = 0);
		var d = Array(16);
		if ("string" === typeof a) for (var e = 0; 16 > e; ++e) d[e] = a.charCodeAt(c++) | a.charCodeAt(c++) << 8 | a.charCodeAt(c++) << 16 | a.charCodeAt(c++) << 24;
		else for (e = 0; 16 > e; ++e) d[e] = a[c++] | a[c++] << 8 | a[c++] << 16 | a[c++] << 24;
		a = f.g[0];
		c = f.g[1];
		e = f.g[2];
		var g = f.g[3];
		var b = a + (g ^ c & (e ^ g)) + d[0] + 3614090360 & 4294967295;
		a = c + (b << 7 & 4294967295 | b >>> 25);
		b = g + (e ^ a & (c ^ e)) + d[1] + 3905402710 & 4294967295;
		g = a + (b << 12 & 4294967295 | b >>> 20);
		b = e + (c ^ g & (a ^ c)) + d[2] + 606105819 & 4294967295;
		e = g + (b << 17 & 4294967295 | b >>> 15);
		b = c + (a ^ e & (g ^ a)) + d[3] + 3250441966 & 4294967295;
		c = e + (b << 22 & 4294967295 | b >>> 10);
		b = a + (g ^ c & (e ^ g)) + d[4] + 4118548399 & 4294967295;
		a = c + (b << 7 & 4294967295 | b >>> 25);
		b = g + (e ^ a & (c ^ e)) + d[5] + 1200080426 & 4294967295;
		g = a + (b << 12 & 4294967295 | b >>> 20);
		b = e + (c ^ g & (a ^ c)) + d[6] + 2821735955 & 4294967295;
		e = g + (b << 17 & 4294967295 | b >>> 15);
		b = c + (a ^ e & (g ^ a)) + d[7] + 4249261313 & 4294967295;
		c = e + (b << 22 & 4294967295 | b >>> 10);
		b = a + (g ^ c & (e ^ g)) + d[8] + 1770035416 & 4294967295;
		a = c + (b << 7 & 4294967295 | b >>> 25);
		b = g + (e ^ a & (c ^ e)) + d[9] + 2336552879 & 4294967295;
		g = a + (b << 12 & 4294967295 | b >>> 20);
		b = e + (c ^ g & (a ^ c)) + d[10] + 4294925233 & 4294967295;
		e = g + (b << 17 & 4294967295 | b >>> 15);
		b = c + (a ^ e & (g ^ a)) + d[11] + 2304563134 & 4294967295;
		c = e + (b << 22 & 4294967295 | b >>> 10);
		b = a + (g ^ c & (e ^ g)) + d[12] + 1804603682 & 4294967295;
		a = c + (b << 7 & 4294967295 | b >>> 25);
		b = g + (e ^ a & (c ^ e)) + d[13] + 4254626195 & 4294967295;
		g = a + (b << 12 & 4294967295 | b >>> 20);
		b = e + (c ^ g & (a ^ c)) + d[14] + 2792965006 & 4294967295;
		e = g + (b << 17 & 4294967295 | b >>> 15);
		b = c + (a ^ e & (g ^ a)) + d[15] + 1236535329 & 4294967295;
		c = e + (b << 22 & 4294967295 | b >>> 10);
		b = a + (e ^ g & (c ^ e)) + d[1] + 4129170786 & 4294967295;
		a = c + (b << 5 & 4294967295 | b >>> 27);
		b = g + (c ^ e & (a ^ c)) + d[6] + 3225465664 & 4294967295;
		g = a + (b << 9 & 4294967295 | b >>> 23);
		b = e + (a ^ c & (g ^ a)) + d[11] + 643717713 & 4294967295;
		e = g + (b << 14 & 4294967295 | b >>> 18);
		b = c + (g ^ a & (e ^ g)) + d[0] + 3921069994 & 4294967295;
		c = e + (b << 20 & 4294967295 | b >>> 12);
		b = a + (e ^ g & (c ^ e)) + d[5] + 3593408605 & 4294967295;
		a = c + (b << 5 & 4294967295 | b >>> 27);
		b = g + (c ^ e & (a ^ c)) + d[10] + 38016083 & 4294967295;
		g = a + (b << 9 & 4294967295 | b >>> 23);
		b = e + (a ^ c & (g ^ a)) + d[15] + 3634488961 & 4294967295;
		e = g + (b << 14 & 4294967295 | b >>> 18);
		b = c + (g ^ a & (e ^ g)) + d[4] + 3889429448 & 4294967295;
		c = e + (b << 20 & 4294967295 | b >>> 12);
		b = a + (e ^ g & (c ^ e)) + d[9] + 568446438 & 4294967295;
		a = c + (b << 5 & 4294967295 | b >>> 27);
		b = g + (c ^ e & (a ^ c)) + d[14] + 3275163606 & 4294967295;
		g = a + (b << 9 & 4294967295 | b >>> 23);
		b = e + (a ^ c & (g ^ a)) + d[3] + 4107603335 & 4294967295;
		e = g + (b << 14 & 4294967295 | b >>> 18);
		b = c + (g ^ a & (e ^ g)) + d[8] + 1163531501 & 4294967295;
		c = e + (b << 20 & 4294967295 | b >>> 12);
		b = a + (e ^ g & (c ^ e)) + d[13] + 2850285829 & 4294967295;
		a = c + (b << 5 & 4294967295 | b >>> 27);
		b = g + (c ^ e & (a ^ c)) + d[2] + 4243563512 & 4294967295;
		g = a + (b << 9 & 4294967295 | b >>> 23);
		b = e + (a ^ c & (g ^ a)) + d[7] + 1735328473 & 4294967295;
		e = g + (b << 14 & 4294967295 | b >>> 18);
		b = c + (g ^ a & (e ^ g)) + d[12] + 2368359562 & 4294967295;
		c = e + (b << 20 & 4294967295 | b >>> 12);
		b = a + (c ^ e ^ g) + d[5] + 4294588738 & 4294967295;
		a = c + (b << 4 & 4294967295 | b >>> 28);
		b = g + (a ^ c ^ e) + d[8] + 2272392833 & 4294967295;
		g = a + (b << 11 & 4294967295 | b >>> 21);
		b = e + (g ^ a ^ c) + d[11] + 1839030562 & 4294967295;
		e = g + (b << 16 & 4294967295 | b >>> 16);
		b = c + (e ^ g ^ a) + d[14] + 4259657740 & 4294967295;
		c = e + (b << 23 & 4294967295 | b >>> 9);
		b = a + (c ^ e ^ g) + d[1] + 2763975236 & 4294967295;
		a = c + (b << 4 & 4294967295 | b >>> 28);
		b = g + (a ^ c ^ e) + d[4] + 1272893353 & 4294967295;
		g = a + (b << 11 & 4294967295 | b >>> 21);
		b = e + (g ^ a ^ c) + d[7] + 4139469664 & 4294967295;
		e = g + (b << 16 & 4294967295 | b >>> 16);
		b = c + (e ^ g ^ a) + d[10] + 3200236656 & 4294967295;
		c = e + (b << 23 & 4294967295 | b >>> 9);
		b = a + (c ^ e ^ g) + d[13] + 681279174 & 4294967295;
		a = c + (b << 4 & 4294967295 | b >>> 28);
		b = g + (a ^ c ^ e) + d[0] + 3936430074 & 4294967295;
		g = a + (b << 11 & 4294967295 | b >>> 21);
		b = e + (g ^ a ^ c) + d[3] + 3572445317 & 4294967295;
		e = g + (b << 16 & 4294967295 | b >>> 16);
		b = c + (e ^ g ^ a) + d[6] + 76029189 & 4294967295;
		c = e + (b << 23 & 4294967295 | b >>> 9);
		b = a + (c ^ e ^ g) + d[9] + 3654602809 & 4294967295;
		a = c + (b << 4 & 4294967295 | b >>> 28);
		b = g + (a ^ c ^ e) + d[12] + 3873151461 & 4294967295;
		g = a + (b << 11 & 4294967295 | b >>> 21);
		b = e + (g ^ a ^ c) + d[15] + 530742520 & 4294967295;
		e = g + (b << 16 & 4294967295 | b >>> 16);
		b = c + (e ^ g ^ a) + d[2] + 3299628645 & 4294967295;
		c = e + (b << 23 & 4294967295 | b >>> 9);
		b = a + (e ^ (c | ~g)) + d[0] + 4096336452 & 4294967295;
		a = c + (b << 6 & 4294967295 | b >>> 26);
		b = g + (c ^ (a | ~e)) + d[7] + 1126891415 & 4294967295;
		g = a + (b << 10 & 4294967295 | b >>> 22);
		b = e + (a ^ (g | ~c)) + d[14] + 2878612391 & 4294967295;
		e = g + (b << 15 & 4294967295 | b >>> 17);
		b = c + (g ^ (e | ~a)) + d[5] + 4237533241 & 4294967295;
		c = e + (b << 21 & 4294967295 | b >>> 11);
		b = a + (e ^ (c | ~g)) + d[12] + 1700485571 & 4294967295;
		a = c + (b << 6 & 4294967295 | b >>> 26);
		b = g + (c ^ (a | ~e)) + d[3] + 2399980690 & 4294967295;
		g = a + (b << 10 & 4294967295 | b >>> 22);
		b = e + (a ^ (g | ~c)) + d[10] + 4293915773 & 4294967295;
		e = g + (b << 15 & 4294967295 | b >>> 17);
		b = c + (g ^ (e | ~a)) + d[1] + 2240044497 & 4294967295;
		c = e + (b << 21 & 4294967295 | b >>> 11);
		b = a + (e ^ (c | ~g)) + d[8] + 1873313359 & 4294967295;
		a = c + (b << 6 & 4294967295 | b >>> 26);
		b = g + (c ^ (a | ~e)) + d[15] + 4264355552 & 4294967295;
		g = a + (b << 10 & 4294967295 | b >>> 22);
		b = e + (a ^ (g | ~c)) + d[6] + 2734768916 & 4294967295;
		e = g + (b << 15 & 4294967295 | b >>> 17);
		b = c + (g ^ (e | ~a)) + d[13] + 1309151649 & 4294967295;
		c = e + (b << 21 & 4294967295 | b >>> 11);
		b = a + (e ^ (c | ~g)) + d[4] + 4149444226 & 4294967295;
		a = c + (b << 6 & 4294967295 | b >>> 26);
		b = g + (c ^ (a | ~e)) + d[11] + 3174756917 & 4294967295;
		g = a + (b << 10 & 4294967295 | b >>> 22);
		b = e + (a ^ (g | ~c)) + d[2] + 718787259 & 4294967295;
		e = g + (b << 15 & 4294967295 | b >>> 17);
		b = c + (g ^ (e | ~a)) + d[9] + 3951481745 & 4294967295;
		f.g[0] = f.g[0] + a & 4294967295;
		f.g[1] = f.g[1] + (e + (b << 21 & 4294967295 | b >>> 11)) & 4294967295;
		f.g[2] = f.g[2] + e & 4294967295;
		f.g[3] = f.g[3] + g & 4294967295;
	}
	m.prototype.u = function(f, a) {
		void 0 === a && (a = f.length);
		for (var c = a - this.blockSize, d = this.B, e = this.h, g = 0; g < a;) {
			if (0 == e) for (; g <= c;) n(this, f, g), g += this.blockSize;
			if ("string" === typeof f) {
				for (; g < a;) if (d[e++] = f.charCodeAt(g++), e == this.blockSize) {
					n(this, d);
					e = 0;
					break;
				}
			} else for (; g < a;) if (d[e++] = f[g++], e == this.blockSize) {
				n(this, d);
				e = 0;
				break;
			}
		}
		this.h = e;
		this.o += a;
	};
	m.prototype.v = function() {
		var f = Array((56 > this.h ? this.blockSize : 2 * this.blockSize) - this.h);
		f[0] = 128;
		for (var a = 1; a < f.length - 8; ++a) f[a] = 0;
		var c = 8 * this.o;
		for (a = f.length - 8; a < f.length; ++a) f[a] = c & 255, c /= 256;
		this.u(f);
		f = Array(16);
		for (a = c = 0; 4 > a; ++a) for (var d = 0; 32 > d; d += 8) f[c++] = this.g[a] >>> d & 255;
		return f;
	};
	function p(f, a) {
		var c = q;
		return Object.prototype.hasOwnProperty.call(c, f) ? c[f] : c[f] = a(f);
	}
	function t(f, a) {
		this.h = a;
		for (var c = [], d = !0, e = f.length - 1; 0 <= e; e--) {
			var g = f[e] | 0;
			d && g == a || (c[e] = g, d = !1);
		}
		this.g = c;
	}
	var q = {};
	function u(f) {
		return -128 <= f && 128 > f ? p(f, function(a) {
			return new t([a | 0], 0 > a ? -1 : 0);
		}) : new t([f | 0], 0 > f ? -1 : 0);
	}
	function v(f) {
		if (isNaN(f) || !isFinite(f)) return w;
		if (0 > f) return x(v(-f));
		for (var a = [], c = 1, d = 0; f >= c; d++) a[d] = f / c | 0, c *= 4294967296;
		return new t(a, 0);
	}
	function y(f, a) {
		if (0 == f.length) throw Error("number format error: empty string");
		a = a || 10;
		if (2 > a || 36 < a) throw Error("radix out of range: " + a);
		if ("-" == f.charAt(0)) return x(y(f.substring(1), a));
		if (0 <= f.indexOf("-")) throw Error("number format error: interior \"-\" character");
		for (var c = v(Math.pow(a, 8)), d = w, e = 0; e < f.length; e += 8) {
			var g = Math.min(8, f.length - e);
			var b = parseInt(f.substring(e, e + g), a);
			8 > g ? (g = v(Math.pow(a, g)), d = d.j(g).add(v(b))) : (d = d.j(c), d = d.add(v(b)));
		}
		return d;
	}
	var w = u(0);
	var z = u(1);
	var A = u(16777216);
	h = t.prototype;
	h.m = function() {
		if (B(this)) return -x(this).m();
		for (var f = 0, a = 1, c = 0; c < this.g.length; c++) {
			var d = this.i(c);
			f += (0 <= d ? d : 4294967296 + d) * a;
			a *= 4294967296;
		}
		return f;
	};
	h.toString = function(f) {
		f = f || 10;
		if (2 > f || 36 < f) throw Error("radix out of range: " + f);
		if (C(this)) return "0";
		if (B(this)) return "-" + x(this).toString(f);
		for (var a = v(Math.pow(f, 6)), c = this, d = "";;) {
			var e = D(c, a).g;
			c = F(c, e.j(a));
			var g = ((0 < c.g.length ? c.g[0] : c.h) >>> 0).toString(f);
			c = e;
			if (C(c)) return g + d;
			for (; 6 > g.length;) g = "0" + g;
			d = g + d;
		}
	};
	h.i = function(f) {
		return 0 > f ? 0 : f < this.g.length ? this.g[f] : this.h;
	};
	function C(f) {
		if (0 != f.h) return !1;
		for (var a = 0; a < f.g.length; a++) if (0 != f.g[a]) return !1;
		return !0;
	}
	function B(f) {
		return -1 == f.h;
	}
	h.l = function(f) {
		f = F(this, f);
		return B(f) ? -1 : C(f) ? 0 : 1;
	};
	function x(f) {
		for (var a = f.g.length, c = [], d = 0; d < a; d++) c[d] = ~f.g[d];
		return new t(c, ~f.h).add(z);
	}
	h.abs = function() {
		return B(this) ? x(this) : this;
	};
	h.add = function(f) {
		for (var a = Math.max(this.g.length, f.g.length), c = [], d = 0, e = 0; e <= a; e++) {
			var g = d + (this.i(e) & 65535) + (f.i(e) & 65535);
			var b = (g >>> 16) + (this.i(e) >>> 16) + (f.i(e) >>> 16);
			d = b >>> 16;
			g &= 65535;
			b &= 65535;
			c[e] = b << 16 | g;
		}
		return new t(c, c[c.length - 1] & -2147483648 ? -1 : 0);
	};
	function F(f, a) {
		return f.add(x(a));
	}
	h.j = function(f) {
		if (C(this) || C(f)) return w;
		if (B(this)) return B(f) ? x(this).j(x(f)) : x(x(this).j(f));
		if (B(f)) return x(this.j(x(f)));
		if (0 > this.l(A) && 0 > f.l(A)) return v(this.m() * f.m());
		for (var a = this.g.length + f.g.length, c = [], d = 0; d < 2 * a; d++) c[d] = 0;
		for (d = 0; d < this.g.length; d++) for (var e = 0; e < f.g.length; e++) {
			var g = this.i(d) >>> 16;
			var b = this.i(d) & 65535;
			var r = f.i(e) >>> 16;
			var E = f.i(e) & 65535;
			c[2 * d + 2 * e] += b * E;
			G(c, 2 * d + 2 * e);
			c[2 * d + 2 * e + 1] += g * E;
			G(c, 2 * d + 2 * e + 1);
			c[2 * d + 2 * e + 1] += b * r;
			G(c, 2 * d + 2 * e + 1);
			c[2 * d + 2 * e + 2] += g * r;
			G(c, 2 * d + 2 * e + 2);
		}
		for (d = 0; d < a; d++) c[d] = c[2 * d + 1] << 16 | c[2 * d];
		for (d = a; d < 2 * a; d++) c[d] = 0;
		return new t(c, 0);
	};
	function G(f, a) {
		for (; (f[a] & 65535) != f[a];) f[a + 1] += f[a] >>> 16, f[a] &= 65535, a++;
	}
	function H(f, a) {
		this.g = f;
		this.h = a;
	}
	function D(f, a) {
		if (C(a)) throw Error("division by zero");
		if (C(f)) return new H(w, w);
		if (B(f)) return a = D(x(f), a), new H(x(a.g), x(a.h));
		if (B(a)) return a = D(f, x(a)), new H(x(a.g), a.h);
		if (30 < f.g.length) {
			if (B(f) || B(a)) throw Error("slowDivide_ only works with positive integers.");
			for (var c = z, d = a; 0 >= d.l(f);) c = I(c), d = I(d);
			var e = J(c, 1);
			var g = J(d, 1);
			d = J(d, 2);
			for (c = J(c, 2); !C(d);) {
				var b = g.add(d);
				0 >= b.l(f) && (e = e.add(c), g = b);
				d = J(d, 1);
				c = J(c, 1);
			}
			a = F(f, e.j(a));
			return new H(e, a);
		}
		for (e = w; 0 <= f.l(a);) {
			c = Math.max(1, Math.floor(f.m() / a.m()));
			d = Math.ceil(Math.log(c) / Math.LN2);
			d = 48 >= d ? 1 : Math.pow(2, d - 48);
			g = v(c);
			for (b = g.j(a); B(b) || 0 < b.l(f);) c -= d, g = v(c), b = g.j(a);
			C(g) && (g = z);
			e = e.add(g);
			f = F(f, b);
		}
		return new H(e, f);
	}
	h.A = function(f) {
		return D(this, f).h;
	};
	h.and = function(f) {
		for (var a = Math.max(this.g.length, f.g.length), c = [], d = 0; d < a; d++) c[d] = this.i(d) & f.i(d);
		return new t(c, this.h & f.h);
	};
	h.or = function(f) {
		for (var a = Math.max(this.g.length, f.g.length), c = [], d = 0; d < a; d++) c[d] = this.i(d) | f.i(d);
		return new t(c, this.h | f.h);
	};
	h.xor = function(f) {
		for (var a = Math.max(this.g.length, f.g.length), c = [], d = 0; d < a; d++) c[d] = this.i(d) ^ f.i(d);
		return new t(c, this.h ^ f.h);
	};
	function I(f) {
		for (var a = f.g.length + 1, c = [], d = 0; d < a; d++) c[d] = f.i(d) << 1 | f.i(d - 1) >>> 31;
		return new t(c, f.h);
	}
	function J(f, a) {
		var c = a >> 5;
		a %= 32;
		for (var d = f.g.length - c, e = [], g = 0; g < d; g++) e[g] = 0 < a ? f.i(g + c) >>> a | f.i(g + c + 1) << 32 - a : f.i(g + c);
		return new t(e, f.h);
	}
	m.prototype.digest = m.prototype.v;
	m.prototype.reset = m.prototype.s;
	m.prototype.update = m.prototype.u;
	bloom_blob_es2018.Md5 = m;
	t.prototype.add = t.prototype.add;
	t.prototype.multiply = t.prototype.j;
	t.prototype.modulo = t.prototype.A;
	t.prototype.compare = t.prototype.l;
	t.prototype.toNumber = t.prototype.m;
	t.prototype.toString = t.prototype.toString;
	t.prototype.getBits = t.prototype.i;
	t.fromNumber = v;
	t.fromString = y;
	Integer = bloom_blob_es2018.Integer = t;
}).apply(typeof commonjsGlobal$1 !== "undefined" ? commonjsGlobal$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var webchannel_blob_es2018 = {};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/
var XhrIo;
var WebChannel;
var EventType;
var ErrorCode$1;
var Stat;
var Event;
var getStatEventTarget;
var createWebChannelTransport;
(function() {
	var h;
	var aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
		if (a == Array.prototype || a == Object.prototype) return a;
		a[b] = c.value;
		return a;
	};
	function ba(a) {
		a = [
			"object" == typeof globalThis && globalThis,
			a,
			"object" == typeof window && window,
			"object" == typeof self && self,
			"object" == typeof commonjsGlobal && commonjsGlobal
		];
		for (var b = 0; b < a.length; ++b) {
			var c = a[b];
			if (c && c.Math == Math) return c;
		}
		throw Error("Cannot find global object");
	}
	var ca = ba(this);
	function da(a, b) {
		if (b) a: {
			var c = ca;
			a = a.split(".");
			for (var d = 0; d < a.length - 1; d++) {
				var e = a[d];
				if (!(e in c)) break a;
				c = c[e];
			}
			a = a[a.length - 1];
			d = c[a];
			b = b(d);
			b != d && null != b && aa(c, a, {
				configurable: !0,
				writable: !0,
				value: b
			});
		}
	}
	function ea(a, b) {
		a instanceof String && (a += "");
		var c = 0;
		var d = !1;
		var e = { next: function() {
			if (!d && c < a.length) {
				var f = c++;
				return {
					value: b(f, a[f]),
					done: !1
				};
			}
			d = !0;
			return {
				done: !0,
				value: void 0
			};
		} };
		e[Symbol.iterator] = function() {
			return e;
		};
		return e;
	}
	da("Array.prototype.values", function(a) {
		return a ? a : function() {
			return ea(this, function(b, c) {
				return c;
			});
		};
	});
	var fa = fa || {};
	var k = this || self;
	function ha(a) {
		var b = typeof a;
		b = "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null";
		return "array" == b || "object" == b && "number" == typeof a.length;
	}
	function n(a) {
		var b = typeof a;
		return "object" == b && null != a || "function" == b;
	}
	function ia(a, b, c) {
		return a.call.apply(a.bind, arguments);
	}
	function ja(a, b, c) {
		if (!a) throw Error();
		if (2 < arguments.length) {
			var d = Array.prototype.slice.call(arguments, 2);
			return function() {
				var e = Array.prototype.slice.call(arguments);
				Array.prototype.unshift.apply(e, d);
				return a.apply(b, e);
			};
		}
		return function() {
			return a.apply(b, arguments);
		};
	}
	function p(a, b, c) {
		p = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ia : ja;
		return p.apply(null, arguments);
	}
	function ka(a, b) {
		var c = Array.prototype.slice.call(arguments, 1);
		return function() {
			var d = c.slice();
			d.push.apply(d, arguments);
			return a.apply(this, d);
		};
	}
	function r(a, b) {
		function c() {}
		c.prototype = b.prototype;
		a.aa = b.prototype;
		a.prototype = new c();
		a.prototype.constructor = a;
		a.Qb = function(d, e, f) {
			for (var g = Array(arguments.length - 2), m = 2; m < arguments.length; m++) g[m - 2] = arguments[m];
			return b.prototype[e].apply(d, g);
		};
	}
	function la(a) {
		const b = a.length;
		if (0 < b) {
			const c = Array(b);
			for (let d = 0; d < b; d++) c[d] = a[d];
			return c;
		}
		return [];
	}
	function ma(a, b) {
		for (let c = 1; c < arguments.length; c++) {
			const d = arguments[c];
			if (ha(d)) {
				const e = a.length || 0;
				const f = d.length || 0;
				a.length = e + f;
				for (let g = 0; g < f; g++) a[e + g] = d[g];
			} else a.push(d);
		}
	}
	class na {
		constructor(a, b) {
			this.i = a;
			this.j = b;
			this.h = 0;
			this.g = null;
		}
		get() {
			let a;
			0 < this.h ? (this.h--, a = this.g, this.g = a.next, a.next = null) : a = this.i();
			return a;
		}
	}
	function t(a) {
		return /^[\s\xa0]*$/.test(a);
	}
	function u() {
		var a = k.navigator;
		return a && (a = a.userAgent) ? a : "";
	}
	function oa(a) {
		oa[" "](a);
		return a;
	}
	oa[" "] = function() {};
	var pa = -1 != u().indexOf("Gecko") && !(-1 != u().toLowerCase().indexOf("webkit") && -1 == u().indexOf("Edge")) && !(-1 != u().indexOf("Trident") || -1 != u().indexOf("MSIE")) && -1 == u().indexOf("Edge");
	function qa(a, b, c) {
		for (const d in a) b.call(c, a[d], d, a);
	}
	function ra(a, b) {
		for (const c in a) b.call(void 0, a[c], c, a);
	}
	function sa(a) {
		const b = {};
		for (const c in a) b[c] = a[c];
		return b;
	}
	const ta = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
	function ua(a, b) {
		let c;
		let d;
		for (let e = 1; e < arguments.length; e++) {
			d = arguments[e];
			for (c in d) a[c] = d[c];
			for (let f = 0; f < ta.length; f++) c = ta[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
		}
	}
	function va(a) {
		var b = 1;
		a = a.split(":");
		const c = [];
		for (; 0 < b && a.length;) c.push(a.shift()), b--;
		a.length && c.push(a.join(":"));
		return c;
	}
	function wa(a) {
		k.setTimeout(() => {
			throw a;
		}, 0);
	}
	function xa() {
		var a = za;
		let b = null;
		a.g && (b = a.g, a.g = a.g.next, a.g || (a.h = null), b.next = null);
		return b;
	}
	class Aa {
		constructor() {
			this.h = this.g = null;
		}
		add(a, b) {
			const c = Ba.get();
			c.set(a, b);
			this.h ? this.h.next = c : this.g = c;
			this.h = c;
		}
	}
	var Ba = new na(() => new Ca(), (a) => a.reset());
	class Ca {
		constructor() {
			this.next = this.g = this.h = null;
		}
		set(a, b) {
			this.h = a;
			this.g = b;
			this.next = null;
		}
		reset() {
			this.next = this.g = this.h = null;
		}
	}
	let x;
	let y = !1;
	let za = new Aa();
	let Ea = () => {
		const a = k.Promise.resolve(void 0);
		x = () => {
			a.then(Da);
		};
	};
	var Da = () => {
		for (var a; a = xa();) {
			try {
				a.h.call(a.g);
			} catch (c) {
				wa(c);
			}
			var b = Ba;
			b.j(a);
			100 > b.h && (b.h++, a.next = b.g, b.g = a);
		}
		y = !1;
	};
	function z() {
		this.s = this.s;
		this.C = this.C;
	}
	z.prototype.s = !1;
	z.prototype.ma = function() {
		this.s || (this.s = !0, this.N());
	};
	z.prototype.N = function() {
		if (this.C) for (; this.C.length;) this.C.shift()();
	};
	function A(a, b) {
		this.type = a;
		this.g = this.target = b;
		this.defaultPrevented = !1;
	}
	A.prototype.h = function() {
		this.defaultPrevented = !0;
	};
	var Fa = function() {
		if (!k.addEventListener || !Object.defineProperty) return !1;
		var a = !1;
		var b = Object.defineProperty({}, "passive", { get: function() {
			a = !0;
		} });
		try {
			const c = () => {};
			k.addEventListener("test", c, b);
			k.removeEventListener("test", c, b);
		} catch (c) {}
		return a;
	}();
	function C(a, b) {
		A.call(this, a ? a.type : "");
		this.relatedTarget = this.g = this.target = null;
		this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
		this.key = "";
		this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
		this.state = null;
		this.pointerId = 0;
		this.pointerType = "";
		this.i = null;
		if (a) {
			var c = this.type = a.type;
			var d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
			this.target = a.target || a.srcElement;
			this.g = b;
			if (b = a.relatedTarget) {
				if (pa) {
					a: {
						try {
							oa(b.nodeName);
							var e = !0;
							break a;
						} catch (f) {}
						e = !1;
					}
					e || (b = null);
				}
			} else "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
			this.relatedTarget = b;
			d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
			this.button = a.button;
			this.key = a.key || "";
			this.ctrlKey = a.ctrlKey;
			this.altKey = a.altKey;
			this.shiftKey = a.shiftKey;
			this.metaKey = a.metaKey;
			this.pointerId = a.pointerId || 0;
			this.pointerType = "string" === typeof a.pointerType ? a.pointerType : Ga[a.pointerType] || "";
			this.state = a.state;
			this.i = a;
			a.defaultPrevented && C.aa.h.call(this);
		}
	}
	r(C, A);
	var Ga = {
		2: "touch",
		3: "pen",
		4: "mouse"
	};
	C.prototype.h = function() {
		C.aa.h.call(this);
		var a = this.i;
		a.preventDefault ? a.preventDefault() : a.returnValue = !1;
	};
	var D = "closure_listenable_" + (1e6 * Math.random() | 0);
	var Ha = 0;
	function Ia(a, b, c, d, e) {
		this.listener = a;
		this.proxy = null;
		this.src = b;
		this.type = c;
		this.capture = !!d;
		this.ha = e;
		this.key = ++Ha;
		this.da = this.fa = !1;
	}
	function Ja(a) {
		a.da = !0;
		a.listener = null;
		a.proxy = null;
		a.src = null;
		a.ha = null;
	}
	function Ka(a) {
		this.src = a;
		this.g = {};
		this.h = 0;
	}
	Ka.prototype.add = function(a, b, c, d, e) {
		var f = a.toString();
		a = this.g[f];
		a || (a = this.g[f] = [], this.h++);
		var g = La(a, b, d, e);
		-1 < g ? (b = a[g], c || (b.fa = !1)) : (b = new Ia(b, this.src, f, !!d, e), b.fa = c, a.push(b));
		return b;
	};
	function Ma(a, b) {
		var c = b.type;
		if (c in a.g) {
			var d = a.g[c];
			var e = Array.prototype.indexOf.call(d, b, void 0);
			var f;
			(f = 0 <= e) && Array.prototype.splice.call(d, e, 1);
			f && (Ja(b), 0 == a.g[c].length && (delete a.g[c], a.h--));
		}
	}
	function La(a, b, c, d) {
		for (var e = 0; e < a.length; ++e) {
			var f = a[e];
			if (!f.da && f.listener == b && f.capture == !!c && f.ha == d) return e;
		}
		return -1;
	}
	var Na = "closure_lm_" + (1e6 * Math.random() | 0);
	var Oa = {};
	function Qa(a, b, c, d, e) {
		if (d && d.once) return Ra(a, b, c, d, e);
		if (Array.isArray(b)) {
			for (var f = 0; f < b.length; f++) Qa(a, b[f], c, d, e);
			return null;
		}
		c = Sa(c);
		return a && a[D] ? a.K(b, c, n(d) ? !!d.capture : !!d, e) : Ta(a, b, c, !1, d, e);
	}
	function Ta(a, b, c, d, e, f) {
		if (!b) throw Error("Invalid event type");
		var g = n(e) ? !!e.capture : !!e;
		var m = Ua(a);
		m || (a[Na] = m = new Ka(a));
		c = m.add(b, c, d, g, f);
		if (c.proxy) return c;
		d = Va();
		c.proxy = d;
		d.src = a;
		d.listener = c;
		if (a.addEventListener) Fa || (e = g), void 0 === e && (e = !1), a.addEventListener(b.toString(), d, e);
		else if (a.attachEvent) a.attachEvent(Wa(b.toString()), d);
		else if (a.addListener && a.removeListener) a.addListener(d);
		else throw Error("addEventListener and attachEvent are unavailable.");
		return c;
	}
	function Va() {
		function a(c) {
			return b.call(a.src, a.listener, c);
		}
		const b = Xa;
		return a;
	}
	function Ra(a, b, c, d, e) {
		if (Array.isArray(b)) {
			for (var f = 0; f < b.length; f++) Ra(a, b[f], c, d, e);
			return null;
		}
		c = Sa(c);
		return a && a[D] ? a.L(b, c, n(d) ? !!d.capture : !!d, e) : Ta(a, b, c, !0, d, e);
	}
	function Ya(a, b, c, d, e) {
		if (Array.isArray(b)) for (var f = 0; f < b.length; f++) Ya(a, b[f], c, d, e);
		else (d = n(d) ? !!d.capture : !!d, c = Sa(c), a && a[D]) ? (a = a.i, b = String(b).toString(), b in a.g && (f = a.g[b], c = La(f, c, d, e), -1 < c && (Ja(f[c]), Array.prototype.splice.call(f, c, 1), 0 == f.length && (delete a.g[b], a.h--)))) : a && (a = Ua(a)) && (b = a.g[b.toString()], a = -1, b && (a = La(b, c, d, e)), (c = -1 < a ? b[a] : null) && Za(c));
	}
	function Za(a) {
		if ("number" !== typeof a && a && !a.da) {
			var b = a.src;
			if (b && b[D]) Ma(b.i, a);
			else {
				var c = a.type;
				var d = a.proxy;
				b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(Wa(c), d) : b.addListener && b.removeListener && b.removeListener(d);
				(c = Ua(b)) ? (Ma(c, a), 0 == c.h && (c.src = null, b[Na] = null)) : Ja(a);
			}
		}
	}
	function Wa(a) {
		return a in Oa ? Oa[a] : Oa[a] = "on" + a;
	}
	function Xa(a, b) {
		if (a.da) a = !0;
		else {
			b = new C(b, this);
			var c = a.listener;
			var d = a.ha || a.src;
			a.fa && Za(a);
			a = c.call(d, b);
		}
		return a;
	}
	function Ua(a) {
		a = a[Na];
		return a instanceof Ka ? a : null;
	}
	var $a = "__closure_events_fn_" + (1e9 * Math.random() >>> 0);
	function Sa(a) {
		if ("function" === typeof a) return a;
		a[$a] || (a[$a] = function(b) {
			return a.handleEvent(b);
		});
		return a[$a];
	}
	function E() {
		z.call(this);
		this.i = new Ka(this);
		this.M = this;
		this.F = null;
	}
	r(E, z);
	E.prototype[D] = !0;
	E.prototype.removeEventListener = function(a, b, c, d) {
		Ya(this, a, b, c, d);
	};
	function F(a, b) {
		var c;
		var d = a.F;
		if (d) for (c = []; d; d = d.F) c.push(d);
		a = a.M;
		d = b.type || b;
		if ("string" === typeof b) b = new A(b, a);
		else if (b instanceof A) b.target = b.target || a;
		else {
			var e = b;
			b = new A(d, a);
			ua(b, e);
		}
		e = !0;
		if (c) for (var f = c.length - 1; 0 <= f; f--) {
			var g = b.g = c[f];
			e = ab(g, d, !0, b) && e;
		}
		g = b.g = a;
		e = ab(g, d, !0, b) && e;
		e = ab(g, d, !1, b) && e;
		if (c) for (f = 0; f < c.length; f++) g = b.g = c[f], e = ab(g, d, !1, b) && e;
	}
	E.prototype.N = function() {
		E.aa.N.call(this);
		if (this.i) {
			var a = this.i;
			var c;
			for (c in a.g) {
				for (var d = a.g[c], e = 0; e < d.length; e++) Ja(d[e]);
				delete a.g[c];
				a.h--;
			}
		}
		this.F = null;
	};
	E.prototype.K = function(a, b, c, d) {
		return this.i.add(String(a), b, !1, c, d);
	};
	E.prototype.L = function(a, b, c, d) {
		return this.i.add(String(a), b, !0, c, d);
	};
	function ab(a, b, c, d) {
		b = a.i.g[String(b)];
		if (!b) return !0;
		b = b.concat();
		for (var e = !0, f = 0; f < b.length; ++f) {
			var g = b[f];
			if (g && !g.da && g.capture == c) {
				var m = g.listener;
				var q = g.ha || g.src;
				g.fa && Ma(a.i, g);
				e = !1 !== m.call(q, d) && e;
			}
		}
		return e && !d.defaultPrevented;
	}
	function bb(a, b, c) {
		if ("function" === typeof a) c && (a = p(a, c));
		else if (a && "function" == typeof a.handleEvent) a = p(a.handleEvent, a);
		else throw Error("Invalid listener argument");
		return 2147483647 < Number(b) ? -1 : k.setTimeout(a, b || 0);
	}
	function cb(a) {
		a.g = bb(() => {
			a.g = null;
			a.i && (a.i = !1, cb(a));
		}, a.l);
		const b = a.h;
		a.h = null;
		a.m.apply(null, b);
	}
	class eb extends z {
		constructor(a, b) {
			super();
			this.m = a;
			this.l = b;
			this.h = null;
			this.i = !1;
			this.g = null;
		}
		j(a) {
			this.h = arguments;
			this.g ? this.i = !0 : cb(this);
		}
		N() {
			super.N();
			this.g && (k.clearTimeout(this.g), this.g = null, this.i = !1, this.h = null);
		}
	}
	function G(a) {
		z.call(this);
		this.h = a;
		this.g = {};
	}
	r(G, z);
	var fb = [];
	function gb(a) {
		qa(a.g, function(b, c) {
			this.g.hasOwnProperty(c) && Za(b);
		}, a);
		a.g = {};
	}
	G.prototype.N = function() {
		G.aa.N.call(this);
		gb(this);
	};
	G.prototype.handleEvent = function() {
		throw Error("EventHandler.handleEvent not implemented");
	};
	var hb = k.JSON.stringify;
	var ib = k.JSON.parse;
	var jb = class {
		stringify(a) {
			return k.JSON.stringify(a, void 0);
		}
		parse(a) {
			return k.JSON.parse(a, void 0);
		}
	};
	function kb() {}
	kb.prototype.h = null;
	function lb(a) {
		return a.h || (a.h = a.i());
	}
	function mb() {}
	var H = {
		OPEN: "a",
		kb: "b",
		Ja: "c",
		wb: "d"
	};
	function nb() {
		A.call(this, "d");
	}
	r(nb, A);
	function ob() {
		A.call(this, "c");
	}
	r(ob, A);
	var I = {};
	var pb = null;
	function qb() {
		return pb = pb || new E();
	}
	I.La = "serverreachability";
	function rb(a) {
		A.call(this, I.La, a);
	}
	r(rb, A);
	function J(a) {
		const b = qb();
		F(b, new rb(b));
	}
	I.STAT_EVENT = "statevent";
	function sb(a, b) {
		A.call(this, I.STAT_EVENT, a);
		this.stat = b;
	}
	r(sb, A);
	function K(a) {
		const b = qb();
		F(b, new sb(b, a));
	}
	I.Ma = "timingevent";
	function tb(a, b) {
		A.call(this, I.Ma, a);
		this.size = b;
	}
	r(tb, A);
	function ub(a, b) {
		if ("function" !== typeof a) throw Error("Fn must not be null and must be a function");
		return k.setTimeout(function() {
			a();
		}, b);
	}
	function vb() {
		this.g = !0;
	}
	vb.prototype.xa = function() {
		this.g = !1;
	};
	function wb(a, b, c, d, e, f) {
		a.info(function() {
			if (a.g) if (f) {
				var g = "";
				for (var m = f.split("&"), q = 0; q < m.length; q++) {
					var l = m[q].split("=");
					if (1 < l.length) {
						var v = l[0];
						l = l[1];
						var w = v.split("_");
						g = 2 <= w.length && "type" == w[1] ? g + (v + "=" + l + "&") : g + (v + "=redacted&");
					}
				}
			} else g = null;
			else g = f;
			return "XMLHTTP REQ (" + d + ") [attempt " + e + "]: " + b + "\n" + c + "\n" + g;
		});
	}
	function xb(a, b, c, d, e, f, g) {
		a.info(function() {
			return "XMLHTTP RESP (" + d + ") [ attempt " + e + "]: " + b + "\n" + c + "\n" + f + " " + g;
		});
	}
	function L(a, b, c, d) {
		a.info(function() {
			return "XMLHTTP TEXT (" + b + "): " + yb(a, c) + (d ? " " + d : "");
		});
	}
	function zb(a, b) {
		a.info(function() {
			return "TIMEOUT: " + b;
		});
	}
	vb.prototype.info = function() {};
	function yb(a, b) {
		if (!a.g) return b;
		if (!b) return null;
		try {
			var c = JSON.parse(b);
			if (c) {
				for (a = 0; a < c.length; a++) if (Array.isArray(c[a])) {
					var d = c[a];
					if (!(2 > d.length)) {
						var e = d[1];
						if (Array.isArray(e) && !(1 > e.length)) {
							var f = e[0];
							if ("noop" != f && "stop" != f && "close" != f) for (var g = 1; g < e.length; g++) e[g] = "";
						}
					}
				}
			}
			return hb(c);
		} catch (m) {
			return b;
		}
	}
	var Ab = {
		NO_ERROR: 0,
		gb: 1,
		tb: 2,
		sb: 3,
		nb: 4,
		rb: 5,
		ub: 6,
		Ia: 7,
		TIMEOUT: 8,
		xb: 9
	};
	var Bb = {
		lb: "complete",
		Hb: "success",
		Ja: "error",
		Ia: "abort",
		zb: "ready",
		Ab: "readystatechange",
		TIMEOUT: "timeout",
		vb: "incrementaldata",
		yb: "progress",
		ob: "downloadprogress",
		Pb: "uploadprogress"
	};
	var Cb;
	function Db() {}
	r(Db, kb);
	Db.prototype.g = function() {
		return new XMLHttpRequest();
	};
	Db.prototype.i = function() {
		return {};
	};
	Cb = new Db();
	function M(a, b, c, d) {
		this.j = a;
		this.i = b;
		this.l = c;
		this.R = d || 1;
		this.U = new G(this);
		this.I = 45e3;
		this.H = null;
		this.o = !1;
		this.m = this.A = this.v = this.L = this.F = this.S = this.B = null;
		this.D = [];
		this.g = null;
		this.C = 0;
		this.s = this.u = null;
		this.X = -1;
		this.J = !1;
		this.O = 0;
		this.M = null;
		this.W = this.K = this.T = this.P = !1;
		this.h = new Eb();
	}
	function Eb() {
		this.i = null;
		this.g = "";
		this.h = !1;
	}
	var Fb = {};
	var Gb = {};
	function Hb(a, b, c) {
		a.L = 1;
		a.v = Ib(N(b));
		a.m = c;
		a.P = !0;
		Jb(a, null);
	}
	function Jb(a, b) {
		a.F = Date.now();
		Kb(a);
		a.A = N(a.v);
		var c = a.A;
		var d = a.R;
		Array.isArray(d) || (d = [String(d)]);
		Lb(c.i, "t", d);
		a.C = 0;
		c = a.j.J;
		a.h = new Eb();
		a.g = Mb(a.j, c ? b : null, !a.m);
		0 < a.O && (a.M = new eb(p(a.Y, a, a.g), a.O));
		b = a.U;
		c = a.g;
		d = a.ca;
		var e = "readystatechange";
		Array.isArray(e) || (e && (fb[0] = e.toString()), e = fb);
		for (var f = 0; f < e.length; f++) {
			var g = Qa(c, e[f], d || b.handleEvent, !1, b.h || b);
			if (!g) break;
			b.g[g.key] = g;
		}
		b = a.H ? sa(a.H) : {};
		a.m ? (a.u || (a.u = "POST"), b["Content-Type"] = "application/x-www-form-urlencoded", a.g.ea(a.A, a.u, a.m, b)) : (a.u = "GET", a.g.ea(a.A, a.u, null, b));
		J();
		wb(a.i, a.u, a.A, a.l, a.R, a.m);
	}
	M.prototype.ca = function(a) {
		a = a.target;
		const b = this.M;
		b && 3 == P(a) ? b.j() : this.Y(a);
	};
	M.prototype.Y = function(a) {
		try {
			if (a == this.g) a: {
				const w = P(this.g);
				var b = this.g.Ba();
				const O = this.g.Z();
				if (!(3 > w) && (3 != w || this.g && (this.h.h || this.g.oa() || Nb(this.g)))) {
					this.J || 4 != w || 7 == b || (8 == b || 0 >= O ? J(3) : J(2));
					Ob(this);
					var c = this.g.Z();
					this.X = c;
					b: if (Pb(this)) {
						var d = Nb(this.g);
						a = "";
						var e = d.length;
						var f = 4 == P(this.g);
						if (!this.h.i) {
							if ("undefined" === typeof TextDecoder) {
								Q(this);
								Qb(this);
								var g = "";
								break b;
							}
							this.h.i = new k.TextDecoder();
						}
						for (b = 0; b < e; b++) this.h.h = !0, a += this.h.i.decode(d[b], { stream: !(f && b == e - 1) });
						d.length = 0;
						this.h.g += a;
						this.C = 0;
						g = this.h.g;
					} else g = this.g.oa();
					this.o = 200 == c;
					xb(this.i, this.u, this.A, this.l, this.R, w, c);
					if (this.o) {
						if (this.T && !this.K) {
							b: {
								if (this.g) {
									var m;
									var q = this.g;
									if ((m = q.g ? q.g.getResponseHeader("X-HTTP-Initial-Response") : null) && !t(m)) {
										var l = m;
										break b;
									}
								}
								l = null;
							}
							if (c = l) L(this.i, this.l, c, "Initial handshake response via X-HTTP-Initial-Response"), this.K = !0, Rb(this, c);
							else {
								this.o = !1;
								this.s = 3;
								K(12);
								Q(this);
								Qb(this);
								break a;
							}
						}
						if (this.P) {
							c = !0;
							let B;
							for (; !this.J && this.C < g.length;) if (B = Sb(this, g), B == Gb) {
								4 == w && (this.s = 4, K(14), c = !1);
								L(this.i, this.l, null, "[Incomplete Response]");
								break;
							} else if (B == Fb) {
								this.s = 4;
								K(15);
								L(this.i, this.l, g, "[Invalid Chunk]");
								c = !1;
								break;
							} else L(this.i, this.l, B, null), Rb(this, B);
							Pb(this) && 0 != this.C && (this.h.g = this.h.g.slice(this.C), this.C = 0);
							4 != w || 0 != g.length || this.h.h || (this.s = 1, K(16), c = !1);
							this.o = this.o && c;
							if (!c) L(this.i, this.l, g, "[Invalid Chunked Response]"), Q(this), Qb(this);
							else if (0 < g.length && !this.W) {
								this.W = !0;
								var v = this.j;
								v.g == this && v.ba && !v.M && (v.j.info("Great, no buffering proxy detected. Bytes received: " + g.length), Tb(v), v.M = !0, K(11));
							}
						} else L(this.i, this.l, g, null), Rb(this, g);
						4 == w && Q(this);
						this.o && !this.J && (4 == w ? Ub(this.j, this) : (this.o = !1, Kb(this)));
					} else Vb(this.g), 400 == c && 0 < g.indexOf("Unknown SID") ? (this.s = 3, K(12)) : (this.s = 0, K(13)), Q(this), Qb(this);
				}
			}
		} catch (w) {}
	};
	function Pb(a) {
		return a.g ? "GET" == a.u && 2 != a.L && a.j.Ca : !1;
	}
	function Sb(a, b) {
		var c = a.C;
		var d = b.indexOf("\n", c);
		if (-1 == d) return Gb;
		c = Number(b.substring(c, d));
		if (isNaN(c)) return Fb;
		d += 1;
		if (d + c > b.length) return Gb;
		b = b.slice(d, d + c);
		a.C = d + c;
		return b;
	}
	M.prototype.cancel = function() {
		this.J = !0;
		Q(this);
	};
	function Kb(a) {
		a.S = Date.now() + a.I;
		Wb(a, a.I);
	}
	function Wb(a, b) {
		if (null != a.B) throw Error("WatchDog timer not null");
		a.B = ub(p(a.ba, a), b);
	}
	function Ob(a) {
		a.B && (k.clearTimeout(a.B), a.B = null);
	}
	M.prototype.ba = function() {
		this.B = null;
		const a = Date.now();
		0 <= a - this.S ? (zb(this.i, this.A), 2 != this.L && (J(), K(17)), Q(this), this.s = 2, Qb(this)) : Wb(this, this.S - a);
	};
	function Qb(a) {
		0 == a.j.G || a.J || Ub(a.j, a);
	}
	function Q(a) {
		Ob(a);
		var b = a.M;
		b && "function" == typeof b.ma && b.ma();
		a.M = null;
		gb(a.U);
		a.g && (b = a.g, a.g = null, b.abort(), b.ma());
	}
	function Rb(a, b) {
		try {
			var c = a.j;
			if (0 != c.G && (c.g == a || Xb(c.h, a))) {
				if (!a.K && Xb(c.h, a) && 3 == c.G) {
					try {
						var d = c.Da.g.parse(b);
					} catch (l) {
						d = null;
					}
					if (Array.isArray(d) && 3 == d.length) {
						var e = d;
						if (0 == e[0]) {
							a: if (!c.u) {
								if (c.g) if (c.g.F + 3e3 < a.F) Yb(c), Zb(c);
								else break a;
								$b(c);
								K(18);
							}
						} else c.za = e[1], 0 < c.za - c.T && 37500 > e[2] && c.F && 0 == c.v && !c.C && (c.C = ub(p(c.Za, c), 6e3));
						if (1 >= ac(c.h) && c.ca) {
							try {
								c.ca();
							} catch (l) {}
							c.ca = void 0;
						}
					} else R(c, 11);
				} else if ((a.K || c.g == a) && Yb(c), !t(b)) for (e = c.Da.g.parse(b), b = 0; b < e.length; b++) {
					let l = e[b];
					c.T = l[0];
					l = l[1];
					if (2 == c.G) if ("c" == l[0]) {
						c.K = l[1];
						c.ia = l[2];
						const v = l[3];
						null != v && (c.la = v, c.j.info("VER=" + c.la));
						const w = l[4];
						null != w && (c.Aa = w, c.j.info("SVER=" + c.Aa));
						const O = l[5];
						null != O && "number" === typeof O && 0 < O && (d = 1.5 * O, c.L = d, c.j.info("backChannelRequestTimeoutMs_=" + d));
						d = c;
						const B = a.g;
						if (B) {
							const ya = B.g ? B.g.getResponseHeader("X-Client-Wire-Protocol") : null;
							if (ya) {
								var f = d.h;
								f.g || -1 == ya.indexOf("spdy") && -1 == ya.indexOf("quic") && -1 == ya.indexOf("h2") || (f.j = f.l, f.g = /* @__PURE__ */ new Set(), f.h && (bc(f, f.h), f.h = null));
							}
							if (d.D) {
								const db = B.g ? B.g.getResponseHeader("X-HTTP-Session-Id") : null;
								db && (d.ya = db, S(d.I, d.D, db));
							}
						}
						c.G = 3;
						c.l && c.l.ua();
						c.ba && (c.R = Date.now() - a.F, c.j.info("Handshake RTT: " + c.R + "ms"));
						d = c;
						var g = a;
						d.qa = cc(d, d.J ? d.ia : null, d.W);
						if (g.K) {
							dc(d.h, g);
							var m = g;
							var q = d.L;
							q && (m.I = q);
							m.B && (Ob(m), Kb(m));
							d.g = g;
						} else ec(d);
						0 < c.i.length && fc(c);
					} else "stop" != l[0] && "close" != l[0] || R(c, 7);
					else 3 == c.G && ("stop" == l[0] || "close" == l[0] ? "stop" == l[0] ? R(c, 7) : gc(c) : "noop" != l[0] && c.l && c.l.ta(l), c.v = 0);
				}
			}
			J(4);
		} catch (l) {}
	}
	var hc = class {
		constructor(a, b) {
			this.g = a;
			this.map = b;
		}
	};
	function ic(a) {
		this.l = a || 10;
		k.PerformanceNavigationTiming ? (a = k.performance.getEntriesByType("navigation"), a = 0 < a.length && ("hq" == a[0].nextHopProtocol || "h2" == a[0].nextHopProtocol)) : a = !!(k.chrome && k.chrome.loadTimes && k.chrome.loadTimes() && k.chrome.loadTimes().wasFetchedViaSpdy);
		this.j = a ? this.l : 1;
		this.g = null;
		1 < this.j && (this.g = /* @__PURE__ */ new Set());
		this.h = null;
		this.i = [];
	}
	function jc(a) {
		return a.h ? !0 : a.g ? a.g.size >= a.j : !1;
	}
	function ac(a) {
		return a.h ? 1 : a.g ? a.g.size : 0;
	}
	function Xb(a, b) {
		return a.h ? a.h == b : a.g ? a.g.has(b) : !1;
	}
	function bc(a, b) {
		a.g ? a.g.add(b) : a.h = b;
	}
	function dc(a, b) {
		a.h && a.h == b ? a.h = null : a.g && a.g.has(b) && a.g.delete(b);
	}
	ic.prototype.cancel = function() {
		this.i = kc(this);
		if (this.h) this.h.cancel(), this.h = null;
		else if (this.g && 0 !== this.g.size) {
			for (const a of this.g.values()) a.cancel();
			this.g.clear();
		}
	};
	function kc(a) {
		if (null != a.h) return a.i.concat(a.h.D);
		if (null != a.g && 0 !== a.g.size) {
			let b = a.i;
			for (const c of a.g.values()) b = b.concat(c.D);
			return b;
		}
		return la(a.i);
	}
	function lc(a) {
		if (a.V && "function" == typeof a.V) return a.V();
		if ("undefined" !== typeof Map && a instanceof Map || "undefined" !== typeof Set && a instanceof Set) return Array.from(a.values());
		if ("string" === typeof a) return a.split("");
		if (ha(a)) {
			for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
			return b;
		}
		b = [];
		c = 0;
		for (d in a) b[c++] = a[d];
		return b;
	}
	function mc(a) {
		if (a.na && "function" == typeof a.na) return a.na();
		if (!a.V || "function" != typeof a.V) {
			if ("undefined" !== typeof Map && a instanceof Map) return Array.from(a.keys());
			if (!("undefined" !== typeof Set && a instanceof Set)) {
				if (ha(a) || "string" === typeof a) {
					var b = [];
					a = a.length;
					for (var c = 0; c < a; c++) b.push(c);
					return b;
				}
				b = [];
				c = 0;
				for (const d in a) b[c++] = d;
				return b;
			}
		}
	}
	function nc(a, b) {
		if (a.forEach && "function" == typeof a.forEach) a.forEach(b, void 0);
		else if (ha(a) || "string" === typeof a) Array.prototype.forEach.call(a, b, void 0);
		else for (var c = mc(a), d = lc(a), e = d.length, f = 0; f < e; f++) b.call(void 0, d[f], c && c[f], a);
	}
	var oc = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");
	function pc(a, b) {
		if (a) {
			a = a.split("&");
			for (var c = 0; c < a.length; c++) {
				var d = a[c].indexOf("=");
				var e = null;
				if (0 <= d) {
					var f = a[c].substring(0, d);
					e = a[c].substring(d + 1);
				} else f = a[c];
				b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "");
			}
		}
	}
	function T(a) {
		this.g = this.o = this.j = "";
		this.s = null;
		this.m = this.l = "";
		this.h = !1;
		if (a instanceof T) {
			this.h = a.h;
			qc(this, a.j);
			this.o = a.o;
			this.g = a.g;
			rc(this, a.s);
			this.l = a.l;
			var b = a.i;
			var c = new sc();
			c.i = b.i;
			b.g && (c.g = new Map(b.g), c.h = b.h);
			tc(this, c);
			this.m = a.m;
		} else a && (b = String(a).match(oc)) ? (this.h = !1, qc(this, b[1] || "", !0), this.o = uc(b[2] || ""), this.g = uc(b[3] || "", !0), rc(this, b[4]), this.l = uc(b[5] || "", !0), tc(this, b[6] || "", !0), this.m = uc(b[7] || "")) : (this.h = !1, this.i = new sc(null, this.h));
	}
	T.prototype.toString = function() {
		var a = [];
		var b = this.j;
		b && a.push(vc(b, wc, !0), ":");
		var c = this.g;
		if (c || "file" == b) a.push("//"), (b = this.o) && a.push(vc(b, wc, !0), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.s, null != c && a.push(":", String(c));
		if (c = this.l) this.g && "/" != c.charAt(0) && a.push("/"), a.push(vc(c, "/" == c.charAt(0) ? xc : yc, !0));
		(c = this.i.toString()) && a.push("?", c);
		(c = this.m) && a.push("#", vc(c, zc));
		return a.join("");
	};
	function N(a) {
		return new T(a);
	}
	function qc(a, b, c) {
		a.j = c ? uc(b, !0) : b;
		a.j && (a.j = a.j.replace(/:$/, ""));
	}
	function rc(a, b) {
		if (b) {
			b = Number(b);
			if (isNaN(b) || 0 > b) throw Error("Bad port number " + b);
			a.s = b;
		} else a.s = null;
	}
	function tc(a, b, c) {
		b instanceof sc ? (a.i = b, Ac(a.i, a.h)) : (c || (b = vc(b, Bc)), a.i = new sc(b, a.h));
	}
	function S(a, b, c) {
		a.i.set(b, c);
	}
	function Ib(a) {
		S(a, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ Date.now()).toString(36));
		return a;
	}
	function uc(a, b) {
		return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : "";
	}
	function vc(a, b, c) {
		return "string" === typeof a ? (a = encodeURI(a).replace(b, Cc), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null;
	}
	function Cc(a) {
		a = a.charCodeAt(0);
		return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16);
	}
	var wc = /[#\/\?@]/g;
	var yc = /[#\?:]/g;
	var xc = /[#\?]/g;
	var Bc = /[#\?@]/g;
	var zc = /#/g;
	function sc(a, b) {
		this.h = this.g = null;
		this.i = a || null;
		this.j = !!b;
	}
	function U(a) {
		a.g || (a.g = /* @__PURE__ */ new Map(), a.h = 0, a.i && pc(a.i, function(b, c) {
			a.add(decodeURIComponent(b.replace(/\+/g, " ")), c);
		}));
	}
	h = sc.prototype;
	h.add = function(a, b) {
		U(this);
		this.i = null;
		a = V(this, a);
		var c = this.g.get(a);
		c || this.g.set(a, c = []);
		c.push(b);
		this.h += 1;
		return this;
	};
	function Dc(a, b) {
		U(a);
		b = V(a, b);
		a.g.has(b) && (a.i = null, a.h -= a.g.get(b).length, a.g.delete(b));
	}
	function Ec(a, b) {
		U(a);
		b = V(a, b);
		return a.g.has(b);
	}
	h.forEach = function(a, b) {
		U(this);
		this.g.forEach(function(c, d) {
			c.forEach(function(e) {
				a.call(b, e, d, this);
			}, this);
		}, this);
	};
	h.na = function() {
		U(this);
		const a = Array.from(this.g.values());
		const b = Array.from(this.g.keys());
		const c = [];
		for (let d = 0; d < b.length; d++) {
			const e = a[d];
			for (let f = 0; f < e.length; f++) c.push(b[d]);
		}
		return c;
	};
	h.V = function(a) {
		U(this);
		let b = [];
		if ("string" === typeof a) Ec(this, a) && (b = b.concat(this.g.get(V(this, a))));
		else {
			a = Array.from(this.g.values());
			for (let c = 0; c < a.length; c++) b = b.concat(a[c]);
		}
		return b;
	};
	h.set = function(a, b) {
		U(this);
		this.i = null;
		a = V(this, a);
		Ec(this, a) && (this.h -= this.g.get(a).length);
		this.g.set(a, [b]);
		this.h += 1;
		return this;
	};
	h.get = function(a, b) {
		if (!a) return b;
		a = this.V(a);
		return 0 < a.length ? String(a[0]) : b;
	};
	function Lb(a, b, c) {
		Dc(a, b);
		0 < c.length && (a.i = null, a.g.set(V(a, b), la(c)), a.h += c.length);
	}
	h.toString = function() {
		if (this.i) return this.i;
		if (!this.g) return "";
		const a = [];
		const b = Array.from(this.g.keys());
		for (var c = 0; c < b.length; c++) {
			var d = b[c];
			const f = encodeURIComponent(String(d));
			const g = this.V(d);
			for (d = 0; d < g.length; d++) {
				var e = f;
				"" !== g[d] && (e += "=" + encodeURIComponent(String(g[d])));
				a.push(e);
			}
		}
		return this.i = a.join("&");
	};
	function V(a, b) {
		b = String(b);
		a.j && (b = b.toLowerCase());
		return b;
	}
	function Ac(a, b) {
		b && !a.j && (U(a), a.i = null, a.g.forEach(function(c, d) {
			var e = d.toLowerCase();
			d != e && (Dc(this, d), Lb(this, e, c));
		}, a));
		a.j = b;
	}
	function Fc(a, b) {
		const c = new vb();
		if (k.Image) {
			const d = new Image();
			d.onload = ka(W, c, "TestLoadImage: loaded", !0, b, d);
			d.onerror = ka(W, c, "TestLoadImage: error", !1, b, d);
			d.onabort = ka(W, c, "TestLoadImage: abort", !1, b, d);
			d.ontimeout = ka(W, c, "TestLoadImage: timeout", !1, b, d);
			k.setTimeout(function() {
				if (d.ontimeout) d.ontimeout();
			}, 1e4);
			d.src = a;
		} else b(!1);
	}
	function Gc(a, b) {
		const c = new vb();
		const d = new AbortController();
		const e = setTimeout(() => {
			d.abort();
			W(c, "TestPingServer: timeout", !1, b);
		}, 1e4);
		fetch(a, { signal: d.signal }).then((f) => {
			clearTimeout(e);
			f.ok ? W(c, "TestPingServer: ok", !0, b) : W(c, "TestPingServer: server error", !1, b);
		}).catch(() => {
			clearTimeout(e);
			W(c, "TestPingServer: error", !1, b);
		});
	}
	function W(a, b, c, d, e) {
		try {
			e && (e.onload = null, e.onerror = null, e.onabort = null, e.ontimeout = null), d(c);
		} catch (f) {}
	}
	function Hc() {
		this.g = new jb();
	}
	function Ic(a, b, c) {
		const d = c || "";
		try {
			nc(a, function(e, f) {
				let g = e;
				n(e) && (g = hb(e));
				b.push(d + f + "=" + encodeURIComponent(g));
			});
		} catch (e) {
			throw b.push(d + "type=_badmap"), e;
		}
	}
	function Jc(a) {
		this.l = a.Ub || null;
		this.j = a.eb || !1;
	}
	r(Jc, kb);
	Jc.prototype.g = function() {
		return new Kc(this.l, this.j);
	};
	Jc.prototype.i = function(a) {
		return function() {
			return a;
		};
	}({});
	function Kc(a, b) {
		E.call(this);
		this.D = a;
		this.o = b;
		this.m = void 0;
		this.status = this.readyState = 0;
		this.responseType = this.responseText = this.response = this.statusText = "";
		this.onreadystatechange = null;
		this.u = new Headers();
		this.h = null;
		this.B = "GET";
		this.A = "";
		this.g = !1;
		this.v = this.j = this.l = null;
	}
	r(Kc, E);
	h = Kc.prototype;
	h.open = function(a, b) {
		if (0 != this.readyState) throw this.abort(), Error("Error reopening a connection");
		this.B = a;
		this.A = b;
		this.readyState = 1;
		Lc(this);
	};
	h.send = function(a) {
		if (1 != this.readyState) throw this.abort(), Error("need to call open() first. ");
		this.g = !0;
		const b = {
			headers: this.u,
			method: this.B,
			credentials: this.m,
			cache: void 0
		};
		a && (b.body = a);
		(this.D || k).fetch(new Request(this.A, b)).then(this.Sa.bind(this), this.ga.bind(this));
	};
	h.abort = function() {
		this.response = this.responseText = "";
		this.u = new Headers();
		this.status = 0;
		this.j && this.j.cancel("Request was aborted.").catch(() => {});
		1 <= this.readyState && this.g && 4 != this.readyState && (this.g = !1, Mc(this));
		this.readyState = 0;
	};
	h.Sa = function(a) {
		if (this.g && (this.l = a, this.h || (this.status = this.l.status, this.statusText = this.l.statusText, this.h = a.headers, this.readyState = 2, Lc(this)), this.g && (this.readyState = 3, Lc(this), this.g))) if ("arraybuffer" === this.responseType) a.arrayBuffer().then(this.Qa.bind(this), this.ga.bind(this));
		else if ("undefined" !== typeof k.ReadableStream && "body" in a) {
			this.j = a.body.getReader();
			if (this.o) {
				if (this.responseType) throw Error("responseType must be empty for \"streamBinaryChunks\" mode responses.");
				this.response = [];
			} else this.response = this.responseText = "", this.v = new TextDecoder();
			Nc(this);
		} else a.text().then(this.Ra.bind(this), this.ga.bind(this));
	};
	function Nc(a) {
		a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a));
	}
	h.Pa = function(a) {
		if (this.g) {
			if (this.o && a.value) this.response.push(a.value);
			else if (!this.o) {
				var b = a.value ? a.value : new Uint8Array(0);
				if (b = this.v.decode(b, { stream: !a.done })) this.response = this.responseText += b;
			}
			a.done ? Mc(this) : Lc(this);
			3 == this.readyState && Nc(this);
		}
	};
	h.Ra = function(a) {
		this.g && (this.response = this.responseText = a, Mc(this));
	};
	h.Qa = function(a) {
		this.g && (this.response = a, Mc(this));
	};
	h.ga = function() {
		this.g && Mc(this);
	};
	function Mc(a) {
		a.readyState = 4;
		a.l = null;
		a.j = null;
		a.v = null;
		Lc(a);
	}
	h.setRequestHeader = function(a, b) {
		this.u.append(a, b);
	};
	h.getResponseHeader = function(a) {
		return this.h ? this.h.get(a.toLowerCase()) || "" : "";
	};
	h.getAllResponseHeaders = function() {
		if (!this.h) return "";
		const a = [];
		const b = this.h.entries();
		for (var c = b.next(); !c.done;) c = c.value, a.push(c[0] + ": " + c[1]), c = b.next();
		return a.join("\r\n");
	};
	function Lc(a) {
		a.onreadystatechange && a.onreadystatechange.call(a);
	}
	Object.defineProperty(Kc.prototype, "withCredentials", {
		get: function() {
			return "include" === this.m;
		},
		set: function(a) {
			this.m = a ? "include" : "same-origin";
		}
	});
	function Oc(a) {
		let b = "";
		qa(a, function(c, d) {
			b += d;
			b += ":";
			b += c;
			b += "\r\n";
		});
		return b;
	}
	function Pc(a, b, c) {
		a: {
			for (d in c) {
				var d = !1;
				break a;
			}
			d = !0;
		}
		d || (c = Oc(c), "string" === typeof a || S(a, b, c));
	}
	function X(a) {
		E.call(this);
		this.headers = /* @__PURE__ */ new Map();
		this.o = a || null;
		this.h = !1;
		this.v = this.g = null;
		this.D = "";
		this.m = 0;
		this.l = "";
		this.j = this.B = this.u = this.A = !1;
		this.I = null;
		this.H = "";
		this.J = !1;
	}
	r(X, E);
	var Qc = /^https?$/i;
	var Rc = ["POST", "PUT"];
	h = X.prototype;
	h.Ha = function(a) {
		this.J = a;
	};
	h.ea = function(a, b, c, d) {
		if (this.g) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.D + "; newUri=" + a);
		b = b ? b.toUpperCase() : "GET";
		this.D = a;
		this.l = "";
		this.m = 0;
		this.A = !1;
		this.h = !0;
		this.g = this.o ? this.o.g() : Cb.g();
		this.v = this.o ? lb(this.o) : lb(Cb);
		this.g.onreadystatechange = p(this.Ea, this);
		try {
			this.B = !0, this.g.open(b, String(a), !0), this.B = !1;
		} catch (f) {
			Sc(this, f);
			return;
		}
		a = c || "";
		c = new Map(this.headers);
		if (d) if (Object.getPrototypeOf(d) === Object.prototype) for (var e in d) c.set(e, d[e]);
		else if ("function" === typeof d.keys && "function" === typeof d.get) for (const f of d.keys()) c.set(f, d.get(f));
		else throw Error("Unknown input type for opt_headers: " + String(d));
		d = Array.from(c.keys()).find((f) => "content-type" == f.toLowerCase());
		e = k.FormData && a instanceof k.FormData;
		!(0 <= Array.prototype.indexOf.call(Rc, b, void 0)) || d || e || c.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
		for (const [f, g] of c) this.g.setRequestHeader(f, g);
		this.H && (this.g.responseType = this.H);
		"withCredentials" in this.g && this.g.withCredentials !== this.J && (this.g.withCredentials = this.J);
		try {
			Tc(this), this.u = !0, this.g.send(a), this.u = !1;
		} catch (f) {
			Sc(this, f);
		}
	};
	function Sc(a, b) {
		a.h = !1;
		a.g && (a.j = !0, a.g.abort(), a.j = !1);
		a.l = b;
		a.m = 5;
		Uc(a);
		Vc(a);
	}
	function Uc(a) {
		a.A || (a.A = !0, F(a, "complete"), F(a, "error"));
	}
	h.abort = function(a) {
		this.g && this.h && (this.h = !1, this.j = !0, this.g.abort(), this.j = !1, this.m = a || 7, F(this, "complete"), F(this, "abort"), Vc(this));
	};
	h.N = function() {
		this.g && (this.h && (this.h = !1, this.j = !0, this.g.abort(), this.j = !1), Vc(this, !0));
		X.aa.N.call(this);
	};
	h.Ea = function() {
		this.s || (this.B || this.u || this.j ? Wc(this) : this.bb());
	};
	h.bb = function() {
		Wc(this);
	};
	function Wc(a) {
		if (a.h && "undefined" != typeof fa && (!a.v[1] || 4 != P(a) || 2 != a.Z())) {
			if (a.u && 4 == P(a)) bb(a.Ea, 0, a);
			else if (F(a, "readystatechange"), 4 == P(a)) {
				a.h = !1;
				try {
					const g = a.Z();
					a: switch (g) {
						case 200:
						case 201:
						case 202:
						case 204:
						case 206:
						case 304:
						case 1223:
							var b = !0;
							break a;
						default: b = !1;
					}
					var c;
					if (!(c = b)) {
						var d;
						if (d = 0 === g) {
							var e = String(a.D).match(oc)[1] || null;
							!e && k.self && k.self.location && (e = k.self.location.protocol.slice(0, -1));
							d = !Qc.test(e ? e.toLowerCase() : "");
						}
						c = d;
					}
					if (c) F(a, "complete"), F(a, "success");
					else {
						a.m = 6;
						try {
							var f = 2 < P(a) ? a.g.statusText : "";
						} catch (m) {
							f = "";
						}
						a.l = f + " [" + a.Z() + "]";
						Uc(a);
					}
				} finally {
					Vc(a);
				}
			}
		}
	}
	function Vc(a, b) {
		if (a.g) {
			Tc(a);
			const c = a.g;
			const d = a.v[0] ? () => {} : null;
			a.g = null;
			a.v = null;
			b || F(a, "ready");
			try {
				c.onreadystatechange = d;
			} catch (e) {}
		}
	}
	function Tc(a) {
		a.I && (k.clearTimeout(a.I), a.I = null);
	}
	h.isActive = function() {
		return !!this.g;
	};
	function P(a) {
		return a.g ? a.g.readyState : 0;
	}
	h.Z = function() {
		try {
			return 2 < P(this) ? this.g.status : -1;
		} catch (a) {
			return -1;
		}
	};
	h.oa = function() {
		try {
			return this.g ? this.g.responseText : "";
		} catch (a) {
			return "";
		}
	};
	h.Oa = function(a) {
		if (this.g) {
			var b = this.g.responseText;
			a && 0 == b.indexOf(a) && (b = b.substring(a.length));
			return ib(b);
		}
	};
	function Nb(a) {
		try {
			if (!a.g) return null;
			if ("response" in a.g) return a.g.response;
			switch (a.H) {
				case "":
				case "text": return a.g.responseText;
				case "arraybuffer": if ("mozResponseArrayBuffer" in a.g) return a.g.mozResponseArrayBuffer;
			}
			return null;
		} catch (b) {
			return null;
		}
	}
	function Vb(a) {
		const b = {};
		a = (a.g && 2 <= P(a) ? a.g.getAllResponseHeaders() || "" : "").split("\r\n");
		for (let d = 0; d < a.length; d++) {
			if (t(a[d])) continue;
			var c = va(a[d]);
			const e = c[0];
			c = c[1];
			if ("string" !== typeof c) continue;
			c = c.trim();
			const f = b[e] || [];
			b[e] = f;
			f.push(c);
		}
		ra(b, function(d) {
			return d.join(", ");
		});
	}
	h.Ba = function() {
		return this.m;
	};
	h.Ka = function() {
		return "string" === typeof this.l ? this.l : String(this.l);
	};
	function Xc(a, b, c) {
		return c && c.internalChannelParams ? c.internalChannelParams[a] || b : b;
	}
	function Yc(a) {
		this.Aa = 0;
		this.i = [];
		this.j = new vb();
		this.ia = this.qa = this.I = this.W = this.g = this.ya = this.D = this.H = this.m = this.S = this.o = null;
		this.Ya = this.U = 0;
		this.Va = Xc("failFast", !1, a);
		this.F = this.C = this.u = this.s = this.l = null;
		this.X = !0;
		this.za = this.T = -1;
		this.Y = this.v = this.B = 0;
		this.Ta = Xc("baseRetryDelayMs", 5e3, a);
		this.cb = Xc("retryDelaySeedMs", 1e4, a);
		this.Wa = Xc("forwardChannelMaxRetries", 2, a);
		this.wa = Xc("forwardChannelRequestTimeoutMs", 2e4, a);
		this.pa = a && a.xmlHttpFactory || void 0;
		this.Xa = a && a.Tb || void 0;
		this.Ca = a && a.useFetchStreams || !1;
		this.L = void 0;
		this.J = a && a.supportsCrossDomainXhr || !1;
		this.K = "";
		this.h = new ic(a && a.concurrentRequestLimit);
		this.Da = new Hc();
		this.P = a && a.fastHandshake || !1;
		this.O = a && a.encodeInitMessageHeaders || !1;
		this.P && this.O && (this.O = !1);
		this.Ua = a && a.Rb || !1;
		a && a.xa && this.j.xa();
		a && a.forceLongPolling && (this.X = !1);
		this.ba = !this.P && this.X && a && a.detectBufferingProxy || !1;
		this.ja = void 0;
		a && a.longPollingTimeout && 0 < a.longPollingTimeout && (this.ja = a.longPollingTimeout);
		this.ca = void 0;
		this.R = 0;
		this.M = !1;
		this.ka = this.A = null;
	}
	h = Yc.prototype;
	h.la = 8;
	h.G = 1;
	h.connect = function(a, b, c, d) {
		K(0);
		this.W = a;
		this.H = b || {};
		c && void 0 !== d && (this.H.OSID = c, this.H.OAID = d);
		this.F = this.X;
		this.I = cc(this, null, this.W);
		fc(this);
	};
	function gc(a) {
		Zc(a);
		if (3 == a.G) {
			var b = a.U++;
			var c = N(a.I);
			S(c, "SID", a.K);
			S(c, "RID", b);
			S(c, "TYPE", "terminate");
			$c(a, c);
			b = new M(a, a.j, b);
			b.L = 2;
			b.v = Ib(N(c));
			c = !1;
			if (k.navigator && k.navigator.sendBeacon) try {
				c = k.navigator.sendBeacon(b.v.toString(), "");
			} catch (d) {}
			!c && k.Image && (new Image().src = b.v, c = !0);
			c || (b.g = Mb(b.j, null), b.g.ea(b.v));
			b.F = Date.now();
			Kb(b);
		}
		ad(a);
	}
	function Zb(a) {
		a.g && (Tb(a), a.g.cancel(), a.g = null);
	}
	function Zc(a) {
		Zb(a);
		a.u && (k.clearTimeout(a.u), a.u = null);
		Yb(a);
		a.h.cancel();
		a.s && ("number" === typeof a.s && k.clearTimeout(a.s), a.s = null);
	}
	function fc(a) {
		if (!jc(a.h) && !a.s) {
			a.s = !0;
			var b = a.Ga;
			x || Ea();
			y || (x(), y = !0);
			za.add(b, a);
			a.B = 0;
		}
	}
	function bd(a, b) {
		if (ac(a.h) >= a.h.j - (a.s ? 1 : 0)) return !1;
		if (a.s) return a.i = b.D.concat(a.i), !0;
		if (1 == a.G || 2 == a.G || a.B >= (a.Va ? 0 : a.Wa)) return !1;
		a.s = ub(p(a.Ga, a, b), cd(a, a.B));
		a.B++;
		return !0;
	}
	h.Ga = function(a) {
		if (this.s) if (this.s = null, 1 == this.G) {
			if (!a) {
				this.U = Math.floor(1e5 * Math.random());
				a = this.U++;
				const e = new M(this, this.j, a);
				let f = this.o;
				this.S && (f ? (f = sa(f), ua(f, this.S)) : f = this.S);
				null !== this.m || this.O || (e.H = f, f = null);
				if (this.P) a: {
					var b = 0;
					for (var c = 0; c < this.i.length; c++) {
						b: {
							var d = this.i[c];
							if ("__data__" in d.map && (d = d.map.__data__, "string" === typeof d)) {
								d = d.length;
								break b;
							}
							d = void 0;
						}
						if (void 0 === d) break;
						b += d;
						if (4096 < b) {
							b = c;
							break a;
						}
						if (4096 === b || c === this.i.length - 1) {
							b = c + 1;
							break a;
						}
					}
					b = 1e3;
				}
				else b = 1e3;
				b = dd(this, e, b);
				c = N(this.I);
				S(c, "RID", a);
				S(c, "CVER", 22);
				this.D && S(c, "X-HTTP-Session-Id", this.D);
				$c(this, c);
				f && (this.O ? b = "headers=" + encodeURIComponent(String(Oc(f))) + "&" + b : this.m && Pc(c, this.m, f));
				bc(this.h, e);
				this.Ua && S(c, "TYPE", "init");
				this.P ? (S(c, "$req", b), S(c, "SID", "null"), e.T = !0, Hb(e, c, null)) : Hb(e, c, b);
				this.G = 2;
			}
		} else 3 == this.G && (a ? ed(this, a) : 0 == this.i.length || jc(this.h) || ed(this));
	};
	function ed(a, b) {
		var c;
		b ? c = b.l : c = a.U++;
		const d = N(a.I);
		S(d, "SID", a.K);
		S(d, "RID", c);
		S(d, "AID", a.T);
		$c(a, d);
		a.m && a.o && Pc(d, a.m, a.o);
		c = new M(a, a.j, c, a.B + 1);
		null === a.m && (c.H = a.o);
		b && (a.i = b.D.concat(a.i));
		b = dd(a, c, 1e3);
		c.I = Math.round(.5 * a.wa) + Math.round(.5 * a.wa * Math.random());
		bc(a.h, c);
		Hb(c, d, b);
	}
	function $c(a, b) {
		a.H && qa(a.H, function(c, d) {
			S(b, d, c);
		});
		a.l && nc({}, function(c, d) {
			S(b, d, c);
		});
	}
	function dd(a, b, c) {
		c = Math.min(a.i.length, c);
		var d = a.l ? p(a.l.Na, a.l, a) : null;
		a: {
			var e = a.i;
			let f = -1;
			for (;;) {
				const g = ["count=" + c];
				-1 == f ? 0 < c ? (f = e[0].g, g.push("ofs=" + f)) : f = 0 : g.push("ofs=" + f);
				let m = !0;
				for (let q = 0; q < c; q++) {
					let l = e[q].g;
					const v = e[q].map;
					l -= f;
					if (0 > l) f = Math.max(0, e[q].g - 100), m = !1;
					else try {
						Ic(v, g, "req" + l + "_");
					} catch (w) {
						d && d(v);
					}
				}
				if (m) {
					d = g.join("&");
					break a;
				}
			}
		}
		a = a.i.splice(0, c);
		b.D = a;
		return d;
	}
	function ec(a) {
		if (!a.g && !a.u) {
			a.Y = 1;
			var b = a.Fa;
			x || Ea();
			y || (x(), y = !0);
			za.add(b, a);
			a.v = 0;
		}
	}
	function $b(a) {
		if (a.g || a.u || 3 <= a.v) return !1;
		a.Y++;
		a.u = ub(p(a.Fa, a), cd(a, a.v));
		a.v++;
		return !0;
	}
	h.Fa = function() {
		this.u = null;
		fd(this);
		if (this.ba && !(this.M || null == this.g || 0 >= this.R)) {
			var a = 2 * this.R;
			this.j.info("BP detection timer enabled: " + a);
			this.A = ub(p(this.ab, this), a);
		}
	};
	h.ab = function() {
		this.A && (this.A = null, this.j.info("BP detection timeout reached."), this.j.info("Buffering proxy detected and switch to long-polling!"), this.F = !1, this.M = !0, K(10), Zb(this), fd(this));
	};
	function Tb(a) {
		null != a.A && (k.clearTimeout(a.A), a.A = null);
	}
	function fd(a) {
		a.g = new M(a, a.j, "rpc", a.Y);
		null === a.m && (a.g.H = a.o);
		a.g.O = 0;
		var b = N(a.qa);
		S(b, "RID", "rpc");
		S(b, "SID", a.K);
		S(b, "AID", a.T);
		S(b, "CI", a.F ? "0" : "1");
		!a.F && a.ja && S(b, "TO", a.ja);
		S(b, "TYPE", "xmlhttp");
		$c(a, b);
		a.m && a.o && Pc(b, a.m, a.o);
		a.L && (a.g.I = a.L);
		var c = a.g;
		a = a.ia;
		c.L = 1;
		c.v = Ib(N(b));
		c.m = null;
		c.P = !0;
		Jb(c, a);
	}
	h.Za = function() {
		null != this.C && (this.C = null, Zb(this), $b(this), K(19));
	};
	function Yb(a) {
		null != a.C && (k.clearTimeout(a.C), a.C = null);
	}
	function Ub(a, b) {
		var c = null;
		if (a.g == b) {
			Yb(a);
			Tb(a);
			a.g = null;
			var d = 2;
		} else if (Xb(a.h, b)) c = b.D, dc(a.h, b), d = 1;
		else return;
		if (0 != a.G) {
			if (b.o) if (1 == d) {
				c = b.m ? b.m.length : 0;
				b = Date.now() - b.F;
				var e = a.B;
				d = qb();
				F(d, new tb(d, c));
				fc(a);
			} else ec(a);
			else if (e = b.s, 3 == e || 0 == e && 0 < b.X || !(1 == d && bd(a, b) || 2 == d && $b(a))) switch (c && 0 < c.length && (b = a.h, b.i = b.i.concat(c)), e) {
				case 1:
					R(a, 5);
					break;
				case 4:
					R(a, 10);
					break;
				case 3:
					R(a, 6);
					break;
				default: R(a, 2);
			}
		}
	}
	function cd(a, b) {
		let c = a.Ta + Math.floor(Math.random() * a.cb);
		a.isActive() || (c *= 2);
		return c * b;
	}
	function R(a, b) {
		a.j.info("Error code " + b);
		if (2 == b) {
			var c = p(a.fb, a);
			var d = a.Xa;
			const e = !d;
			d = new T(d || "//www.google.com/images/cleardot.gif");
			k.location && "http" == k.location.protocol || qc(d, "https");
			Ib(d);
			e ? Fc(d.toString(), c) : Gc(d.toString(), c);
		} else K(2);
		a.G = 0;
		a.l && a.l.sa(b);
		ad(a);
		Zc(a);
	}
	h.fb = function(a) {
		a ? (this.j.info("Successfully pinged google.com"), K(2)) : (this.j.info("Failed to ping google.com"), K(1));
	};
	function ad(a) {
		a.G = 0;
		a.ka = [];
		if (a.l) {
			const b = kc(a.h);
			if (0 != b.length || 0 != a.i.length) ma(a.ka, b), ma(a.ka, a.i), a.h.i.length = 0, la(a.i), a.i.length = 0;
			a.l.ra();
		}
	}
	function cc(a, b, c) {
		var d = c instanceof T ? N(c) : new T(c);
		if ("" != d.g) b && (d.g = b + "." + d.g), rc(d, d.s);
		else {
			var e = k.location;
			d = e.protocol;
			b = b ? b + "." + e.hostname : e.hostname;
			e = +e.port;
			var f = new T(null);
			d && qc(f, d);
			b && (f.g = b);
			e && rc(f, e);
			c && (f.l = c);
			d = f;
		}
		c = a.D;
		b = a.ya;
		c && b && S(d, c, b);
		S(d, "VER", a.la);
		$c(a, d);
		return d;
	}
	function Mb(a, b, c) {
		if (b && !a.J) throw Error("Can't create secondary domain capable XhrIo object.");
		b = a.Ca && !a.pa ? new X(new Jc({ eb: c })) : new X(a.pa);
		b.Ha(a.J);
		return b;
	}
	h.isActive = function() {
		return !!this.l && this.l.isActive(this);
	};
	function gd() {}
	h = gd.prototype;
	h.ua = function() {};
	h.ta = function() {};
	h.sa = function() {};
	h.ra = function() {};
	h.isActive = function() {
		return !0;
	};
	h.Na = function() {};
	function hd() {}
	hd.prototype.g = function(a, b) {
		return new Y(a, b);
	};
	function Y(a, b) {
		E.call(this);
		this.g = new Yc(b);
		this.l = a;
		this.h = b && b.messageUrlParams || null;
		a = b && b.messageHeaders || null;
		b && b.clientProtocolHeaderRequired && (a ? a["X-Client-Protocol"] = "webchannel" : a = { "X-Client-Protocol": "webchannel" });
		this.g.o = a;
		a = b && b.initMessageHeaders || null;
		b && b.messageContentType && (a ? a["X-WebChannel-Content-Type"] = b.messageContentType : a = { "X-WebChannel-Content-Type": b.messageContentType });
		b && b.va && (a ? a["X-WebChannel-Client-Profile"] = b.va : a = { "X-WebChannel-Client-Profile": b.va });
		this.g.S = a;
		(a = b && b.Sb) && !t(a) && (this.g.m = a);
		this.v = b && b.supportsCrossDomainXhr || !1;
		this.u = b && b.sendRawJson || !1;
		(b = b && b.httpSessionIdParam) && !t(b) && (this.g.D = b, a = this.h, null !== a && b in a && (a = this.h, b in a && delete a[b]));
		this.j = new Z(this);
	}
	r(Y, E);
	Y.prototype.m = function() {
		this.g.l = this.j;
		this.v && (this.g.J = !0);
		this.g.connect(this.l, this.h || void 0);
	};
	Y.prototype.close = function() {
		gc(this.g);
	};
	Y.prototype.o = function(a) {
		var b = this.g;
		if ("string" === typeof a) {
			var c = {};
			c.__data__ = a;
			a = c;
		} else this.u && (c = {}, c.__data__ = hb(a), a = c);
		b.i.push(new hc(b.Ya++, a));
		3 == b.G && fc(b);
	};
	Y.prototype.N = function() {
		this.g.l = null;
		delete this.j;
		gc(this.g);
		delete this.g;
		Y.aa.N.call(this);
	};
	function id(a) {
		nb.call(this);
		a.__headers__ && (this.headers = a.__headers__, this.statusCode = a.__status__, delete a.__headers__, delete a.__status__);
		var b = a.__sm__;
		if (b) {
			a: {
				for (const c in b) {
					a = c;
					break a;
				}
				a = void 0;
			}
			if (this.i = a) a = this.i, b = null !== b && a in b ? b[a] : void 0;
			this.data = b;
		} else this.data = a;
	}
	r(id, nb);
	function jd() {
		ob.call(this);
		this.status = 1;
	}
	r(jd, ob);
	function Z(a) {
		this.g = a;
	}
	r(Z, gd);
	Z.prototype.ua = function() {
		F(this.g, "a");
	};
	Z.prototype.ta = function(a) {
		F(this.g, new id(a));
	};
	Z.prototype.sa = function(a) {
		F(this.g, new jd());
	};
	Z.prototype.ra = function() {
		F(this.g, "b");
	};
	hd.prototype.createWebChannel = hd.prototype.g;
	Y.prototype.send = Y.prototype.o;
	Y.prototype.open = Y.prototype.m;
	Y.prototype.close = Y.prototype.close;
	createWebChannelTransport = webchannel_blob_es2018.createWebChannelTransport = function() {
		return new hd();
	};
	getStatEventTarget = webchannel_blob_es2018.getStatEventTarget = function() {
		return qb();
	};
	Event = webchannel_blob_es2018.Event = I;
	Stat = webchannel_blob_es2018.Stat = {
		mb: 0,
		pb: 1,
		qb: 2,
		Jb: 3,
		Ob: 4,
		Lb: 5,
		Mb: 6,
		Kb: 7,
		Ib: 8,
		Nb: 9,
		PROXY: 10,
		NOPROXY: 11,
		Gb: 12,
		Cb: 13,
		Db: 14,
		Bb: 15,
		Eb: 16,
		Fb: 17,
		ib: 18,
		hb: 19,
		jb: 20
	};
	Ab.NO_ERROR = 0;
	Ab.TIMEOUT = 8;
	Ab.HTTP_ERROR = 6;
	ErrorCode$1 = webchannel_blob_es2018.ErrorCode = Ab;
	Bb.COMPLETE = "complete";
	EventType = webchannel_blob_es2018.EventType = Bb;
	mb.EventType = H;
	H.OPEN = "a";
	H.CLOSE = "b";
	H.ERROR = "c";
	H.MESSAGE = "d";
	E.prototype.listen = E.prototype.K;
	WebChannel = webchannel_blob_es2018.WebChannel = mb;
	webchannel_blob_es2018.FetchXmlHttpFactory = Jc;
	X.prototype.listenOnce = X.prototype.L;
	X.prototype.getLastError = X.prototype.Ka;
	X.prototype.getLastErrorCode = X.prototype.Ba;
	X.prototype.getStatus = X.prototype.Z;
	X.prototype.getResponseJson = X.prototype.Oa;
	X.prototype.getResponseText = X.prototype.oa;
	X.prototype.send = X.prototype.ea;
	X.prototype.setWithCredentials = X.prototype.Ha;
	XhrIo = webchannel_blob_es2018.XhrIo = X;
}).apply(typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
var F = "@firebase/firestore";
var M = "4.8.0";
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var User = class {
	constructor(e) {
		this.uid = e;
	}
	isAuthenticated() {
		return null != this.uid;
	}
	toKey() {
		return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
	}
	isEqual(e) {
		return e.uid === this.uid;
	}
};
User.UNAUTHENTICATED = new User(null), User.GOOGLE_CREDENTIALS = new User("google-credentials-uid"), User.FIRST_PARTY = new User("first-party-uid"), User.MOCK_USER = new User("mock-user");
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var x = "11.10.0";
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var O = new Logger("@firebase/firestore");
function __PRIVATE_getLogLevel() {
	return O.logLevel;
}
function __PRIVATE_logDebug(e, ...t) {
	if (O.logLevel <= LogLevel.DEBUG) {
		const n = t.map(__PRIVATE_argToString);
		O.debug(`Firestore (${x}): ${e}`, ...n);
	}
}
function __PRIVATE_logError(e, ...t) {
	if (O.logLevel <= LogLevel.ERROR) {
		const n = t.map(__PRIVATE_argToString);
		O.error(`Firestore (${x}): ${e}`, ...n);
	}
}
function __PRIVATE_logWarn(e, ...t) {
	if (O.logLevel <= LogLevel.WARN) {
		const n = t.map(__PRIVATE_argToString);
		O.warn(`Firestore (${x}): ${e}`, ...n);
	}
}
function __PRIVATE_argToString(e) {
	if ("string" == typeof e) return e;
	try {
		/**
		* @license
		* Copyright 2020 Google LLC
		*
		* Licensed under the Apache License, Version 2.0 (the "License");
		* you may not use this file except in compliance with the License.
		* You may obtain a copy of the License at
		*
		*   http://www.apache.org/licenses/LICENSE-2.0
		*
		* Unless required by applicable law or agreed to in writing, software
		* distributed under the License is distributed on an "AS IS" BASIS,
		* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
		* See the License for the specific language governing permissions and
		* limitations under the License.
		*/
		return function __PRIVATE_formatJSON(e) {
			return JSON.stringify(e);
		}(e);
	} catch (t) {
		return e;
	}
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/ function fail(e, t, n) {
	let r = "Unexpected state";
	"string" == typeof t ? r = t : n = t, __PRIVATE__fail(e, r, n);
}
function __PRIVATE__fail(e, t, n) {
	let r = `FIRESTORE (${x}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;
	if (void 0 !== n) try {
		r += " CONTEXT: " + JSON.stringify(n);
	} catch (e) {
		r += " CONTEXT: " + n;
	}
	throw __PRIVATE_logError(r), new Error(r);
}
function __PRIVATE_hardAssert(e, t, n, r) {
	let i = "Unexpected state";
	"string" == typeof n ? i = n : r = n, e || __PRIVATE__fail(t, i, r);
}
function __PRIVATE_debugCast(e, t) {
	return e;
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/ var N = {
	OK: "ok",
	CANCELLED: "cancelled",
	UNKNOWN: "unknown",
	INVALID_ARGUMENT: "invalid-argument",
	DEADLINE_EXCEEDED: "deadline-exceeded",
	NOT_FOUND: "not-found",
	ALREADY_EXISTS: "already-exists",
	PERMISSION_DENIED: "permission-denied",
	UNAUTHENTICATED: "unauthenticated",
	RESOURCE_EXHAUSTED: "resource-exhausted",
	FAILED_PRECONDITION: "failed-precondition",
	ABORTED: "aborted",
	OUT_OF_RANGE: "out-of-range",
	UNIMPLEMENTED: "unimplemented",
	INTERNAL: "internal",
	UNAVAILABLE: "unavailable",
	DATA_LOSS: "data-loss"
};
var FirestoreError = class extends FirebaseError {
	constructor(e, t) {
		super(e, t), this.code = e, this.message = t, this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`;
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/ var __PRIVATE_Deferred = class {
	constructor() {
		this.promise = new Promise(((e, t) => {
			this.resolve = e, this.reject = t;
		}));
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/ var __PRIVATE_OAuthToken = class {
	constructor(e, t) {
		this.user = t, this.type = "OAuth", this.headers = /* @__PURE__ */ new Map(), this.headers.set("Authorization", `Bearer ${e}`);
	}
};
var __PRIVATE_EmptyAuthCredentialsProvider = class {
	getToken() {
		return Promise.resolve(null);
	}
	invalidateToken() {}
	start(e, t) {
		e.enqueueRetryable((() => t(User.UNAUTHENTICATED)));
	}
	shutdown() {}
};
var __PRIVATE_FirebaseAuthCredentialsProvider = class {
	constructor(e) {
		this.t = e, this.currentUser = User.UNAUTHENTICATED, this.i = 0, this.forceRefresh = !1, this.auth = null;
	}
	start(e, t) {
		__PRIVATE_hardAssert(void 0 === this.o, 42304);
		let n = this.i;
		const __PRIVATE_guardedChangeListener = (e) => this.i !== n ? (n = this.i, t(e)) : Promise.resolve();
		let r = new __PRIVATE_Deferred();
		this.o = () => {
			this.i++, this.currentUser = this.u(), r.resolve(), r = new __PRIVATE_Deferred(), e.enqueueRetryable((() => __PRIVATE_guardedChangeListener(this.currentUser)));
		};
		const __PRIVATE_awaitNextToken = () => {
			const t = r;
			e.enqueueRetryable((async () => {
				await t.promise, await __PRIVATE_guardedChangeListener(this.currentUser);
			}));
		};
		const __PRIVATE_registerAuth = (e) => {
			__PRIVATE_logDebug("FirebaseAuthCredentialsProvider", "Auth detected"), this.auth = e, this.o && (this.auth.addAuthTokenListener(this.o), __PRIVATE_awaitNextToken());
		};
		this.t.onInit(((e) => __PRIVATE_registerAuth(e))), setTimeout((() => {
			if (!this.auth) {
				const e = this.t.getImmediate({ optional: !0 });
				e ? __PRIVATE_registerAuth(e) : (__PRIVATE_logDebug("FirebaseAuthCredentialsProvider", "Auth not yet detected"), r.resolve(), r = new __PRIVATE_Deferred());
			}
		}), 0), __PRIVATE_awaitNextToken();
	}
	getToken() {
		const e = this.i;
		const t = this.forceRefresh;
		return this.forceRefresh = !1, this.auth ? this.auth.getToken(t).then(((t) => this.i !== e ? (__PRIVATE_logDebug("FirebaseAuthCredentialsProvider", "getToken aborted due to token change."), this.getToken()) : t ? (__PRIVATE_hardAssert("string" == typeof t.accessToken, 31837, { l: t }), new __PRIVATE_OAuthToken(t.accessToken, this.currentUser)) : null)) : Promise.resolve(null);
	}
	invalidateToken() {
		this.forceRefresh = !0;
	}
	shutdown() {
		this.auth && this.o && this.auth.removeAuthTokenListener(this.o), this.o = void 0;
	}
	u() {
		const e = this.auth && this.auth.getUid();
		return __PRIVATE_hardAssert(null === e || "string" == typeof e, 2055, { h: e }), new User(e);
	}
};
var __PRIVATE_FirstPartyToken = class {
	constructor(e, t, n) {
		this.P = e, this.T = t, this.I = n, this.type = "FirstParty", this.user = User.FIRST_PARTY, this.A = /* @__PURE__ */ new Map();
	}
	R() {
		return this.I ? this.I() : null;
	}
	get headers() {
		this.A.set("X-Goog-AuthUser", this.P);
		const e = this.R();
		return e && this.A.set("Authorization", e), this.T && this.A.set("X-Goog-Iam-Authorization-Token", this.T), this.A;
	}
};
var __PRIVATE_FirstPartyAuthCredentialsProvider = class {
	constructor(e, t, n) {
		this.P = e, this.T = t, this.I = n;
	}
	getToken() {
		return Promise.resolve(new __PRIVATE_FirstPartyToken(this.P, this.T, this.I));
	}
	start(e, t) {
		e.enqueueRetryable((() => t(User.FIRST_PARTY)));
	}
	shutdown() {}
	invalidateToken() {}
};
var AppCheckToken = class {
	constructor(e) {
		this.value = e, this.type = "AppCheck", this.headers = /* @__PURE__ */ new Map(), e && e.length > 0 && this.headers.set("x-firebase-appcheck", this.value);
	}
};
var __PRIVATE_FirebaseAppCheckTokenProvider = class {
	constructor(t, n) {
		this.V = n, this.forceRefresh = !1, this.appCheck = null, this.m = null, this.p = null, _isFirebaseServerApp(t) && t.settings.appCheckToken && (this.p = t.settings.appCheckToken);
	}
	start(e, t) {
		__PRIVATE_hardAssert(void 0 === this.o, 3512);
		const onTokenChanged = (e) => {
			null != e.error && __PRIVATE_logDebug("FirebaseAppCheckTokenProvider", `Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);
			const n = e.token !== this.m;
			return this.m = e.token, __PRIVATE_logDebug("FirebaseAppCheckTokenProvider", `Received ${n ? "new" : "existing"} token.`), n ? t(e.token) : Promise.resolve();
		};
		this.o = (t) => {
			e.enqueueRetryable((() => onTokenChanged(t)));
		};
		const __PRIVATE_registerAppCheck = (e) => {
			__PRIVATE_logDebug("FirebaseAppCheckTokenProvider", "AppCheck detected"), this.appCheck = e, this.o && this.appCheck.addTokenListener(this.o);
		};
		this.V.onInit(((e) => __PRIVATE_registerAppCheck(e))), setTimeout((() => {
			if (!this.appCheck) {
				const e = this.V.getImmediate({ optional: !0 });
				e ? __PRIVATE_registerAppCheck(e) : __PRIVATE_logDebug("FirebaseAppCheckTokenProvider", "AppCheck not yet detected");
			}
		}), 0);
	}
	getToken() {
		if (this.p) return Promise.resolve(new AppCheckToken(this.p));
		const e = this.forceRefresh;
		return this.forceRefresh = !1, this.appCheck ? this.appCheck.getToken(e).then(((e) => e ? (__PRIVATE_hardAssert("string" == typeof e.token, 44558, { tokenResult: e }), this.m = e.token, new AppCheckToken(e.token)) : null)) : Promise.resolve(null);
	}
	invalidateToken() {
		this.forceRefresh = !0;
	}
	shutdown() {
		this.appCheck && this.o && this.appCheck.removeTokenListener(this.o), this.o = void 0;
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function __PRIVATE_randomBytes(e) {
	const t = "undefined" != typeof self && (self.crypto || self.msCrypto);
	const n = new Uint8Array(e);
	if (t && "function" == typeof t.getRandomValues) t.getRandomValues(n);
	else for (let t = 0; t < e; t++) n[t] = Math.floor(256 * Math.random());
	return n;
}
/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function __PRIVATE_newTextEncoder() {
	return new TextEncoder();
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var __PRIVATE_AutoId = class {
	static newId() {
		const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		const t = 62 * Math.floor(256 / 62);
		let n = "";
		for (; n.length < 20;) {
			const r = __PRIVATE_randomBytes(40);
			for (let i = 0; i < r.length; ++i) n.length < 20 && r[i] < t && (n += e.charAt(r[i] % 62));
		}
		return n;
	}
};
function __PRIVATE_primitiveComparator(e, t) {
	return e < t ? -1 : e > t ? 1 : 0;
}
function __PRIVATE_compareUtf8Strings(e, t) {
	let n = 0;
	for (; n < e.length && n < t.length;) {
		const r = e.codePointAt(n);
		const i = t.codePointAt(n);
		if (r !== i) {
			if (r < 128 && i < 128) return __PRIVATE_primitiveComparator(r, i);
			{
				const s = __PRIVATE_newTextEncoder();
				const o = __PRIVATE_compareByteArrays$1(s.encode(__PRIVATE_getUtf8SafeSubstring(e, n)), s.encode(__PRIVATE_getUtf8SafeSubstring(t, n)));
				return 0 !== o ? o : __PRIVATE_primitiveComparator(r, i);
			}
		}
		n += r > 65535 ? 2 : 1;
	}
	return __PRIVATE_primitiveComparator(e.length, t.length);
}
function __PRIVATE_getUtf8SafeSubstring(e, t) {
	return e.codePointAt(t) > 65535 ? e.substring(t, t + 2) : e.substring(t, t + 1);
}
function __PRIVATE_compareByteArrays$1(e, t) {
	for (let n = 0; n < e.length && n < t.length; ++n) if (e[n] !== t[n]) return __PRIVATE_primitiveComparator(e[n], t[n]);
	return __PRIVATE_primitiveComparator(e.length, t.length);
}
function __PRIVATE_arrayEquals(e, t, n) {
	return e.length === t.length && e.every(((e, r) => n(e, t[r])));
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/ var B = "__name__";
var BasePath = class BasePath {
	constructor(e, t, n) {
		void 0 === t ? t = 0 : t > e.length && fail(637, {
			offset: t,
			range: e.length
		}), void 0 === n ? n = e.length - t : n > e.length - t && fail(1746, {
			length: n,
			range: e.length - t
		}), this.segments = e, this.offset = t, this.len = n;
	}
	get length() {
		return this.len;
	}
	isEqual(e) {
		return 0 === BasePath.comparator(this, e);
	}
	child(e) {
		const t = this.segments.slice(this.offset, this.limit());
		return e instanceof BasePath ? e.forEach(((e) => {
			t.push(e);
		})) : t.push(e), this.construct(t);
	}
	limit() {
		return this.offset + this.length;
	}
	popFirst(e) {
		return e = void 0 === e ? 1 : e, this.construct(this.segments, this.offset + e, this.length - e);
	}
	popLast() {
		return this.construct(this.segments, this.offset, this.length - 1);
	}
	firstSegment() {
		return this.segments[this.offset];
	}
	lastSegment() {
		return this.get(this.length - 1);
	}
	get(e) {
		return this.segments[this.offset + e];
	}
	isEmpty() {
		return 0 === this.length;
	}
	isPrefixOf(e) {
		if (e.length < this.length) return !1;
		for (let t = 0; t < this.length; t++) if (this.get(t) !== e.get(t)) return !1;
		return !0;
	}
	isImmediateParentOf(e) {
		if (this.length + 1 !== e.length) return !1;
		for (let t = 0; t < this.length; t++) if (this.get(t) !== e.get(t)) return !1;
		return !0;
	}
	forEach(e) {
		for (let t = this.offset, n = this.limit(); t < n; t++) e(this.segments[t]);
	}
	toArray() {
		return this.segments.slice(this.offset, this.limit());
	}
	static comparator(e, t) {
		const n = Math.min(e.length, t.length);
		for (let r = 0; r < n; r++) {
			const n = BasePath.compareSegments(e.get(r), t.get(r));
			if (0 !== n) return n;
		}
		return __PRIVATE_primitiveComparator(e.length, t.length);
	}
	static compareSegments(e, t) {
		const n = BasePath.isNumericId(e);
		const r = BasePath.isNumericId(t);
		return n && !r ? -1 : !n && r ? 1 : n && r ? BasePath.extractNumericId(e).compare(BasePath.extractNumericId(t)) : __PRIVATE_compareUtf8Strings(e, t);
	}
	static isNumericId(e) {
		return e.startsWith("__id") && e.endsWith("__");
	}
	static extractNumericId(e) {
		return Integer.fromString(e.substring(4, e.length - 2));
	}
};
var ResourcePath = class ResourcePath extends BasePath {
	construct(e, t, n) {
		return new ResourcePath(e, t, n);
	}
	canonicalString() {
		return this.toArray().join("/");
	}
	toString() {
		return this.canonicalString();
	}
	toUriEncodedString() {
		return this.toArray().map(encodeURIComponent).join("/");
	}
	static fromString(...e) {
		const t = [];
		for (const n of e) {
			if (n.indexOf("//") >= 0) throw new FirestoreError(N.INVALID_ARGUMENT, `Invalid segment (${n}). Paths must not contain // in them.`);
			t.push(...n.split("/").filter(((e) => e.length > 0)));
		}
		return new ResourcePath(t);
	}
	static emptyPath() {
		return new ResourcePath([]);
	}
};
var L = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
var FieldPath$1 = class FieldPath$1 extends BasePath {
	construct(e, t, n) {
		return new FieldPath$1(e, t, n);
	}
	static isValidIdentifier(e) {
		return L.test(e);
	}
	canonicalString() {
		return this.toArray().map(((e) => (e = e.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), FieldPath$1.isValidIdentifier(e) || (e = "`" + e + "`"), e))).join(".");
	}
	toString() {
		return this.canonicalString();
	}
	isKeyField() {
		return 1 === this.length && this.get(0) === B;
	}
	static keyField() {
		return new FieldPath$1([B]);
	}
	static fromServerFormat(e) {
		const t = [];
		let n = "";
		let r = 0;
		const __PRIVATE_addCurrentSegment = () => {
			if (0 === n.length) throw new FirestoreError(N.INVALID_ARGUMENT, `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
			t.push(n), n = "";
		};
		let i = !1;
		for (; r < e.length;) {
			const t = e[r];
			if ("\\" === t) {
				if (r + 1 === e.length) throw new FirestoreError(N.INVALID_ARGUMENT, "Path has trailing escape character: " + e);
				const t = e[r + 1];
				if ("\\" !== t && "." !== t && "`" !== t) throw new FirestoreError(N.INVALID_ARGUMENT, "Path has invalid escape sequence: " + e);
				n += t, r += 2;
			} else "`" === t ? (i = !i, r++) : "." !== t || i ? (n += t, r++) : (__PRIVATE_addCurrentSegment(), r++);
		}
		if (__PRIVATE_addCurrentSegment(), i) throw new FirestoreError(N.INVALID_ARGUMENT, "Unterminated ` in path: " + e);
		return new FieldPath$1(t);
	}
	static emptyPath() {
		return new FieldPath$1([]);
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var DocumentKey = class DocumentKey {
	constructor(e) {
		this.path = e;
	}
	static fromPath(e) {
		return new DocumentKey(ResourcePath.fromString(e));
	}
	static fromName(e) {
		return new DocumentKey(ResourcePath.fromString(e).popFirst(5));
	}
	static empty() {
		return new DocumentKey(ResourcePath.emptyPath());
	}
	get collectionGroup() {
		return this.path.popLast().lastSegment();
	}
	hasCollectionId(e) {
		return this.path.length >= 2 && this.path.get(this.path.length - 2) === e;
	}
	getCollectionGroup() {
		return this.path.get(this.path.length - 2);
	}
	getCollectionPath() {
		return this.path.popLast();
	}
	isEqual(e) {
		return null !== e && 0 === ResourcePath.comparator(this.path, e.path);
	}
	toString() {
		return this.path.toString();
	}
	static comparator(e, t) {
		return ResourcePath.comparator(e.path, t.path);
	}
	static isDocumentKey(e) {
		return e.length % 2 == 0;
	}
	static fromSegments(e) {
		return new DocumentKey(new ResourcePath(e.slice()));
	}
};
function __PRIVATE_validateIsNotUsedTogether(e, t, n, r) {
	if (!0 === t && !0 === r) throw new FirestoreError(N.INVALID_ARGUMENT, `${e} and ${n} cannot be used together.`);
}
function __PRIVATE_isPlainObject(e) {
	return "object" == typeof e && null !== e && (Object.getPrototypeOf(e) === Object.prototype || null === Object.getPrototypeOf(e));
}
/**
* @license
* Copyright 2025 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function property(e, t) {
	const n = { typeString: e };
	return t && (n.value = t), n;
}
function __PRIVATE_validateJSON(e, t) {
	if (!__PRIVATE_isPlainObject(e)) throw new FirestoreError(N.INVALID_ARGUMENT, "JSON must be an object");
	let n;
	for (const r in t) if (t[r]) {
		const i = t[r].typeString;
		const s = "value" in t[r] ? { value: t[r].value } : void 0;
		if (!(r in e)) {
			n = `JSON missing required field: '${r}'`;
			break;
		}
		const o = e[r];
		if (i && typeof o !== i) {
			n = `JSON field '${r}' must be a ${i}.`;
			break;
		}
		if (void 0 !== s && o !== s.value) {
			n = `Expected '${r}' field to equal '${s.value}'`;
			break;
		}
	}
	if (n) throw new FirestoreError(N.INVALID_ARGUMENT, n);
	return !0;
}
var k = -62135596800;
var q = 1e6;
var Timestamp = class Timestamp {
	static now() {
		return Timestamp.fromMillis(Date.now());
	}
	static fromDate(e) {
		return Timestamp.fromMillis(e.getTime());
	}
	static fromMillis(e) {
		const t = Math.floor(e / 1e3);
		return new Timestamp(t, Math.floor((e - 1e3 * t) * q));
	}
	constructor(e, t) {
		if (this.seconds = e, this.nanoseconds = t, t < 0) throw new FirestoreError(N.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + t);
		if (t >= 1e9) throw new FirestoreError(N.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + t);
		if (e < k) throw new FirestoreError(N.INVALID_ARGUMENT, "Timestamp seconds out of range: " + e);
		if (e >= 253402300800) throw new FirestoreError(N.INVALID_ARGUMENT, "Timestamp seconds out of range: " + e);
	}
	toDate() {
		return new Date(this.toMillis());
	}
	toMillis() {
		return 1e3 * this.seconds + this.nanoseconds / q;
	}
	_compareTo(e) {
		return this.seconds === e.seconds ? __PRIVATE_primitiveComparator(this.nanoseconds, e.nanoseconds) : __PRIVATE_primitiveComparator(this.seconds, e.seconds);
	}
	isEqual(e) {
		return e.seconds === this.seconds && e.nanoseconds === this.nanoseconds;
	}
	toString() {
		return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
	}
	toJSON() {
		return {
			type: Timestamp._jsonSchemaVersion,
			seconds: this.seconds,
			nanoseconds: this.nanoseconds
		};
	}
	static fromJSON(e) {
		if (__PRIVATE_validateJSON(e, Timestamp._jsonSchema)) return new Timestamp(e.seconds, e.nanoseconds);
	}
	valueOf() {
		const e = this.seconds - k;
		return String(e).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0");
	}
};
Timestamp._jsonSchemaVersion = "firestore/timestamp/1.0", Timestamp._jsonSchema = {
	type: property("string", Timestamp._jsonSchemaVersion),
	seconds: property("number"),
	nanoseconds: property("number")
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var SnapshotVersion = class SnapshotVersion {
	static fromTimestamp(e) {
		return new SnapshotVersion(e);
	}
	static min() {
		return new SnapshotVersion(new Timestamp(0, 0));
	}
	static max() {
		return new SnapshotVersion(new Timestamp(253402300799, 999999999));
	}
	constructor(e) {
		this.timestamp = e;
	}
	compareTo(e) {
		return this.timestamp._compareTo(e.timestamp);
	}
	isEqual(e) {
		return this.timestamp.isEqual(e.timestamp);
	}
	toMicroseconds() {
		return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
	}
	toString() {
		return "SnapshotVersion(" + this.timestamp.toString() + ")";
	}
	toTimestamp() {
		return this.timestamp;
	}
};
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Q = -1;
var FieldIndex = class {
	constructor(e, t, n, r) {
		this.indexId = e, this.collectionGroup = t, this.fields = n, this.indexState = r;
	}
};
FieldIndex.UNKNOWN_ID = -1;
function __PRIVATE_newIndexOffsetSuccessorFromReadTime(e, t) {
	const n = e.toTimestamp().seconds;
	const r = e.toTimestamp().nanoseconds + 1;
	return new IndexOffset(SnapshotVersion.fromTimestamp(1e9 === r ? new Timestamp(n + 1, 0) : new Timestamp(n, r)), DocumentKey.empty(), t);
}
function __PRIVATE_newIndexOffsetFromDocument(e) {
	return new IndexOffset(e.readTime, e.key, Q);
}
var IndexOffset = class IndexOffset {
	constructor(e, t, n) {
		this.readTime = e, this.documentKey = t, this.largestBatchId = n;
	}
	static min() {
		return new IndexOffset(SnapshotVersion.min(), DocumentKey.empty(), Q);
	}
	static max() {
		return new IndexOffset(SnapshotVersion.max(), DocumentKey.empty(), Q);
	}
};
function __PRIVATE_indexOffsetComparator(e, t) {
	let n = e.readTime.compareTo(t.readTime);
	return 0 !== n ? n : (n = DocumentKey.comparator(e.documentKey, t.documentKey), 0 !== n ? n : __PRIVATE_primitiveComparator(e.largestBatchId, t.largestBatchId));
}
var PersistenceTransaction = class {
	constructor() {
		this.onCommittedListeners = [];
	}
	addOnCommittedListener(e) {
		this.onCommittedListeners.push(e);
	}
	raiseOnCommittedEvent() {
		this.onCommittedListeners.forEach(((e) => e()));
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var PersistencePromise = class PersistencePromise {
	constructor(e) {
		this.nextCallback = null, this.catchCallback = null, this.result = void 0, this.error = void 0, this.isDone = !1, this.callbackAttached = !1, e(((e) => {
			this.isDone = !0, this.result = e, this.nextCallback && this.nextCallback(e);
		}), ((e) => {
			this.isDone = !0, this.error = e, this.catchCallback && this.catchCallback(e);
		}));
	}
	catch(e) {
		return this.next(void 0, e);
	}
	next(e, t) {
		return this.callbackAttached && fail(59440), this.callbackAttached = !0, this.isDone ? this.error ? this.wrapFailure(t, this.error) : this.wrapSuccess(e, this.result) : new PersistencePromise(((n, r) => {
			this.nextCallback = (t) => {
				this.wrapSuccess(e, t).next(n, r);
			}, this.catchCallback = (e) => {
				this.wrapFailure(t, e).next(n, r);
			};
		}));
	}
	toPromise() {
		return new Promise(((e, t) => {
			this.next(e, t);
		}));
	}
	wrapUserFunction(e) {
		try {
			const t = e();
			return t instanceof PersistencePromise ? t : PersistencePromise.resolve(t);
		} catch (e) {
			return PersistencePromise.reject(e);
		}
	}
	wrapSuccess(e, t) {
		return e ? this.wrapUserFunction((() => e(t))) : PersistencePromise.resolve(t);
	}
	wrapFailure(e, t) {
		return e ? this.wrapUserFunction((() => e(t))) : PersistencePromise.reject(t);
	}
	static resolve(e) {
		return new PersistencePromise(((t, n) => {
			t(e);
		}));
	}
	static reject(e) {
		return new PersistencePromise(((t, n) => {
			n(e);
		}));
	}
	static waitFor(e) {
		return new PersistencePromise(((t, n) => {
			let r = 0;
			let i = 0;
			let s = !1;
			e.forEach(((e) => {
				++r, e.next((() => {
					++i, s && i === r && t();
				}), ((e) => n(e)));
			})), s = !0, i === r && t();
		}));
	}
	static or(e) {
		let t = PersistencePromise.resolve(!1);
		for (const n of e) t = t.next(((e) => e ? PersistencePromise.resolve(e) : n()));
		return t;
	}
	static forEach(e, t) {
		const n = [];
		return e.forEach(((e, r) => {
			n.push(t.call(this, e, r));
		})), this.waitFor(n);
	}
	static mapArray(e, t) {
		return new PersistencePromise(((n, r) => {
			const i = e.length;
			const s = new Array(i);
			let o = 0;
			for (let _ = 0; _ < i; _++) {
				const a = _;
				t(e[a]).next(((e) => {
					s[a] = e, ++o, o === i && n(s);
				}), ((e) => r(e)));
			}
		}));
	}
	static doWhile(e, t) {
		return new PersistencePromise(((n, r) => {
			const process = () => {
				!0 === e() ? t().next((() => {
					process();
				}), r) : n();
			};
			process();
		}));
	}
};
function __PRIVATE_getAndroidVersion(e) {
	const t = e.match(/Android ([\d.]+)/i);
	const n = t ? t[1].split(".").slice(0, 2).join(".") : "-1";
	return Number(n);
}
function __PRIVATE_isIndexedDbTransactionError(e) {
	return "IndexedDbTransactionError" === e.name;
}
/**
* @license
* Copyright 2018 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var __PRIVATE_ListenSequence = class {
	constructor(e, t) {
		this.previousValue = e, t && (t.sequenceNumberHandler = (e) => this._e(e), this.ae = (e) => t.writeSequenceNumber(e));
	}
	_e(e) {
		return this.previousValue = Math.max(e, this.previousValue), this.previousValue;
	}
	next() {
		const e = ++this.previousValue;
		return this.ae && this.ae(e), e;
	}
};
__PRIVATE_ListenSequence.ue = -1;
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var G = -1;
function __PRIVATE_isNullOrUndefined(e) {
	return null == e;
}
function __PRIVATE_isNegativeZero(e) {
	return 0 === e && 1 / e == -Infinity;
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/ function __PRIVATE_objectSize(e) {
	let t = 0;
	for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t++;
	return t;
}
function forEach(e, t) {
	for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t(n, e[n]);
}
function isEmpty(e) {
	for (const t in e) if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
	return !0;
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var SortedMap = class SortedMap {
	constructor(e, t) {
		this.comparator = e, this.root = t || LLRBNode.EMPTY;
	}
	insert(e, t) {
		return new SortedMap(this.comparator, this.root.insert(e, t, this.comparator).copy(null, null, LLRBNode.BLACK, null, null));
	}
	remove(e) {
		return new SortedMap(this.comparator, this.root.remove(e, this.comparator).copy(null, null, LLRBNode.BLACK, null, null));
	}
	get(e) {
		let t = this.root;
		for (; !t.isEmpty();) {
			const n = this.comparator(e, t.key);
			if (0 === n) return t.value;
			n < 0 ? t = t.left : n > 0 && (t = t.right);
		}
		return null;
	}
	indexOf(e) {
		let t = 0;
		let n = this.root;
		for (; !n.isEmpty();) {
			const r = this.comparator(e, n.key);
			if (0 === r) return t + n.left.size;
			r < 0 ? n = n.left : (t += n.left.size + 1, n = n.right);
		}
		return -1;
	}
	isEmpty() {
		return this.root.isEmpty();
	}
	get size() {
		return this.root.size;
	}
	minKey() {
		return this.root.minKey();
	}
	maxKey() {
		return this.root.maxKey();
	}
	inorderTraversal(e) {
		return this.root.inorderTraversal(e);
	}
	forEach(e) {
		this.inorderTraversal(((t, n) => (e(t, n), !1)));
	}
	toString() {
		const e = [];
		return this.inorderTraversal(((t, n) => (e.push(`${t}:${n}`), !1))), `{${e.join(", ")}}`;
	}
	reverseTraversal(e) {
		return this.root.reverseTraversal(e);
	}
	getIterator() {
		return new SortedMapIterator(this.root, null, this.comparator, !1);
	}
	getIteratorFrom(e) {
		return new SortedMapIterator(this.root, e, this.comparator, !1);
	}
	getReverseIterator() {
		return new SortedMapIterator(this.root, null, this.comparator, !0);
	}
	getReverseIteratorFrom(e) {
		return new SortedMapIterator(this.root, e, this.comparator, !0);
	}
};
var SortedMapIterator = class {
	constructor(e, t, n, r) {
		this.isReverse = r, this.nodeStack = [];
		let i = 1;
		for (; !e.isEmpty();) if (i = t ? n(e.key, t) : 1, t && r && (i *= -1), i < 0) e = this.isReverse ? e.left : e.right;
		else {
			if (0 === i) {
				this.nodeStack.push(e);
				break;
			}
			this.nodeStack.push(e), e = this.isReverse ? e.right : e.left;
		}
	}
	getNext() {
		let e = this.nodeStack.pop();
		const t = {
			key: e.key,
			value: e.value
		};
		if (this.isReverse) for (e = e.left; !e.isEmpty();) this.nodeStack.push(e), e = e.right;
		else for (e = e.right; !e.isEmpty();) this.nodeStack.push(e), e = e.left;
		return t;
	}
	hasNext() {
		return this.nodeStack.length > 0;
	}
	peek() {
		if (0 === this.nodeStack.length) return null;
		const e = this.nodeStack[this.nodeStack.length - 1];
		return {
			key: e.key,
			value: e.value
		};
	}
};
var LLRBNode = class LLRBNode {
	constructor(e, t, n, r, i) {
		this.key = e, this.value = t, this.color = null != n ? n : LLRBNode.RED, this.left = null != r ? r : LLRBNode.EMPTY, this.right = null != i ? i : LLRBNode.EMPTY, this.size = this.left.size + 1 + this.right.size;
	}
	copy(e, t, n, r, i) {
		return new LLRBNode(null != e ? e : this.key, null != t ? t : this.value, null != n ? n : this.color, null != r ? r : this.left, null != i ? i : this.right);
	}
	isEmpty() {
		return !1;
	}
	inorderTraversal(e) {
		return this.left.inorderTraversal(e) || e(this.key, this.value) || this.right.inorderTraversal(e);
	}
	reverseTraversal(e) {
		return this.right.reverseTraversal(e) || e(this.key, this.value) || this.left.reverseTraversal(e);
	}
	min() {
		return this.left.isEmpty() ? this : this.left.min();
	}
	minKey() {
		return this.min().key;
	}
	maxKey() {
		return this.right.isEmpty() ? this.key : this.right.maxKey();
	}
	insert(e, t, n) {
		let r = this;
		const i = n(e, r.key);
		return r = i < 0 ? r.copy(null, null, null, r.left.insert(e, t, n), null) : 0 === i ? r.copy(null, t, null, null, null) : r.copy(null, null, null, null, r.right.insert(e, t, n)), r.fixUp();
	}
	removeMin() {
		if (this.left.isEmpty()) return LLRBNode.EMPTY;
		let e = this;
		return e.left.isRed() || e.left.left.isRed() || (e = e.moveRedLeft()), e = e.copy(null, null, null, e.left.removeMin(), null), e.fixUp();
	}
	remove(e, t) {
		let n;
		let r = this;
		if (t(e, r.key) < 0) r.left.isEmpty() || r.left.isRed() || r.left.left.isRed() || (r = r.moveRedLeft()), r = r.copy(null, null, null, r.left.remove(e, t), null);
		else {
			if (r.left.isRed() && (r = r.rotateRight()), r.right.isEmpty() || r.right.isRed() || r.right.left.isRed() || (r = r.moveRedRight()), 0 === t(e, r.key)) {
				if (r.right.isEmpty()) return LLRBNode.EMPTY;
				n = r.right.min(), r = r.copy(n.key, n.value, null, null, r.right.removeMin());
			}
			r = r.copy(null, null, null, null, r.right.remove(e, t));
		}
		return r.fixUp();
	}
	isRed() {
		return this.color;
	}
	fixUp() {
		let e = this;
		return e.right.isRed() && !e.left.isRed() && (e = e.rotateLeft()), e.left.isRed() && e.left.left.isRed() && (e = e.rotateRight()), e.left.isRed() && e.right.isRed() && (e = e.colorFlip()), e;
	}
	moveRedLeft() {
		let e = this.colorFlip();
		return e.right.left.isRed() && (e = e.copy(null, null, null, null, e.right.rotateRight()), e = e.rotateLeft(), e = e.colorFlip()), e;
	}
	moveRedRight() {
		let e = this.colorFlip();
		return e.left.left.isRed() && (e = e.rotateRight(), e = e.colorFlip()), e;
	}
	rotateLeft() {
		const e = this.copy(null, null, LLRBNode.RED, null, this.right.left);
		return this.right.copy(null, null, this.color, e, null);
	}
	rotateRight() {
		const e = this.copy(null, null, LLRBNode.RED, this.left.right, null);
		return this.left.copy(null, null, this.color, null, e);
	}
	colorFlip() {
		const e = this.left.copy(null, null, !this.left.color, null, null);
		const t = this.right.copy(null, null, !this.right.color, null, null);
		return this.copy(null, null, !this.color, e, t);
	}
	checkMaxDepth() {
		const e = this.check();
		return Math.pow(2, e) <= this.size + 1;
	}
	check() {
		if (this.isRed() && this.left.isRed()) throw fail(43730, {
			key: this.key,
			value: this.value
		});
		if (this.right.isRed()) throw fail(14113, {
			key: this.key,
			value: this.value
		});
		const e = this.left.check();
		if (e !== this.right.check()) throw fail(27949);
		return e + (this.isRed() ? 0 : 1);
	}
};
LLRBNode.EMPTY = null, LLRBNode.RED = !0, LLRBNode.BLACK = !1;
LLRBNode.EMPTY = new class LLRBEmptyNode {
	constructor() {
		this.size = 0;
	}
	get key() {
		throw fail(57766);
	}
	get value() {
		throw fail(16141);
	}
	get color() {
		throw fail(16727);
	}
	get left() {
		throw fail(29726);
	}
	get right() {
		throw fail(36894);
	}
	copy(e, t, n, r, i) {
		return this;
	}
	insert(e, t, n) {
		return new LLRBNode(e, t);
	}
	remove(e, t) {
		return this;
	}
	isEmpty() {
		return !0;
	}
	inorderTraversal(e) {
		return !1;
	}
	reverseTraversal(e) {
		return !1;
	}
	minKey() {
		return null;
	}
	maxKey() {
		return null;
	}
	isRed() {
		return !1;
	}
	checkMaxDepth() {
		return !0;
	}
	check() {
		return 0;
	}
}();
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var SortedSet = class SortedSet {
	constructor(e) {
		this.comparator = e, this.data = new SortedMap(this.comparator);
	}
	has(e) {
		return null !== this.data.get(e);
	}
	first() {
		return this.data.minKey();
	}
	last() {
		return this.data.maxKey();
	}
	get size() {
		return this.data.size;
	}
	indexOf(e) {
		return this.data.indexOf(e);
	}
	forEach(e) {
		this.data.inorderTraversal(((t, n) => (e(t), !1)));
	}
	forEachInRange(e, t) {
		const n = this.data.getIteratorFrom(e[0]);
		for (; n.hasNext();) {
			const r = n.getNext();
			if (this.comparator(r.key, e[1]) >= 0) return;
			t(r.key);
		}
	}
	forEachWhile(e, t) {
		let n;
		for (n = void 0 !== t ? this.data.getIteratorFrom(t) : this.data.getIterator(); n.hasNext();) if (!e(n.getNext().key)) return;
	}
	firstAfterOrEqual(e) {
		const t = this.data.getIteratorFrom(e);
		return t.hasNext() ? t.getNext().key : null;
	}
	getIterator() {
		return new SortedSetIterator(this.data.getIterator());
	}
	getIteratorFrom(e) {
		return new SortedSetIterator(this.data.getIteratorFrom(e));
	}
	add(e) {
		return this.copy(this.data.remove(e).insert(e, !0));
	}
	delete(e) {
		return this.has(e) ? this.copy(this.data.remove(e)) : this;
	}
	isEmpty() {
		return this.data.isEmpty();
	}
	unionWith(e) {
		let t = this;
		return t.size < e.size && (t = e, e = this), e.forEach(((e) => {
			t = t.add(e);
		})), t;
	}
	isEqual(e) {
		if (!(e instanceof SortedSet)) return !1;
		if (this.size !== e.size) return !1;
		const t = this.data.getIterator();
		const n = e.data.getIterator();
		for (; t.hasNext();) {
			const e = t.getNext().key;
			const r = n.getNext().key;
			if (0 !== this.comparator(e, r)) return !1;
		}
		return !0;
	}
	toArray() {
		const e = [];
		return this.forEach(((t) => {
			e.push(t);
		})), e;
	}
	toString() {
		const e = [];
		return this.forEach(((t) => e.push(t))), "SortedSet(" + e.toString() + ")";
	}
	copy(e) {
		const t = new SortedSet(this.comparator);
		return t.data = e, t;
	}
};
var SortedSetIterator = class {
	constructor(e) {
		this.iter = e;
	}
	getNext() {
		return this.iter.getNext().key;
	}
	hasNext() {
		return this.iter.hasNext();
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var FieldMask = class FieldMask {
	constructor(e) {
		this.fields = e, e.sort(FieldPath$1.comparator);
	}
	static empty() {
		return new FieldMask([]);
	}
	unionWith(e) {
		let t = new SortedSet(FieldPath$1.comparator);
		for (const e of this.fields) t = t.add(e);
		for (const n of e) t = t.add(n);
		return new FieldMask(t.toArray());
	}
	covers(e) {
		for (const t of this.fields) if (t.isPrefixOf(e)) return !0;
		return !1;
	}
	isEqual(e) {
		return __PRIVATE_arrayEquals(this.fields, e.fields, ((e, t) => e.isEqual(t)));
	}
};
/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var __PRIVATE_Base64DecodeError = class extends Error {
	constructor() {
		super(...arguments), this.name = "Base64DecodeError";
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var ByteString = class ByteString {
	constructor(e) {
		this.binaryString = e;
	}
	static fromBase64String(e) {
		return new ByteString(function __PRIVATE_decodeBase64(e) {
			try {
				return atob(e);
			} catch (e) {
				throw "undefined" != typeof DOMException && e instanceof DOMException ? new __PRIVATE_Base64DecodeError("Invalid base64 string: " + e) : e;
			}
		}(e));
	}
	static fromUint8Array(e) {
		return new ByteString(function __PRIVATE_binaryStringFromUint8Array(e) {
			let t = "";
			for (let n = 0; n < e.length; ++n) t += String.fromCharCode(e[n]);
			return t;
		}(e));
	}
	[Symbol.iterator]() {
		let e = 0;
		return { next: () => e < this.binaryString.length ? {
			value: this.binaryString.charCodeAt(e++),
			done: !1
		} : {
			value: void 0,
			done: !0
		} };
	}
	toBase64() {
		return function __PRIVATE_encodeBase64(e) {
			return btoa(e);
		}(this.binaryString);
	}
	toUint8Array() {
		return function __PRIVATE_uint8ArrayFromBinaryString(e) {
			const t = new Uint8Array(e.length);
			for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
			return t;
		}(this.binaryString);
	}
	approximateByteSize() {
		return 2 * this.binaryString.length;
	}
	compareTo(e) {
		return __PRIVATE_primitiveComparator(this.binaryString, e.binaryString);
	}
	isEqual(e) {
		return this.binaryString === e.binaryString;
	}
};
ByteString.EMPTY_BYTE_STRING = new ByteString("");
var it = /* @__PURE__ */ new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
function __PRIVATE_normalizeTimestamp(e) {
	if (__PRIVATE_hardAssert(!!e, 39018), "string" == typeof e) {
		let t = 0;
		const n = it.exec(e);
		if (__PRIVATE_hardAssert(!!n, 46558, { timestamp: e }), n[1]) {
			let e = n[1];
			e = (e + "000000000").substr(0, 9), t = Number(e);
		}
		const r = new Date(e);
		return {
			seconds: Math.floor(r.getTime() / 1e3),
			nanos: t
		};
	}
	return {
		seconds: __PRIVATE_normalizeNumber(e.seconds),
		nanos: __PRIVATE_normalizeNumber(e.nanos)
	};
}
function __PRIVATE_normalizeNumber(e) {
	return "number" == typeof e ? e : "string" == typeof e ? Number(e) : 0;
}
function __PRIVATE_normalizeByteString(e) {
	return "string" == typeof e ? ByteString.fromBase64String(e) : ByteString.fromUint8Array(e);
}
var st = "server_timestamp";
var ot = "__type__";
var _t = "__previous_value__";
var at = "__local_write_time__";
function __PRIVATE_isServerTimestamp(e) {
	var t;
	var n;
	return (null === (n = ((null === (t = null == e ? void 0 : e.mapValue) || void 0 === t ? void 0 : t.fields) || {})[ot]) || void 0 === n ? void 0 : n.stringValue) === st;
}
function __PRIVATE_getPreviousValue(e) {
	const t = e.mapValue.fields[_t];
	return __PRIVATE_isServerTimestamp(t) ? __PRIVATE_getPreviousValue(t) : t;
}
function __PRIVATE_getLocalWriteTime(e) {
	const t = __PRIVATE_normalizeTimestamp(e.mapValue.fields[at].timestampValue);
	return new Timestamp(t.seconds, t.nanos);
}
var ut = "(default)";
var DatabaseId = class DatabaseId {
	constructor(e, t) {
		this.projectId = e, this.database = t || ut;
	}
	static empty() {
		return new DatabaseId("", "");
	}
	get isDefaultDatabase() {
		return this.database === ut;
	}
	isEqual(e) {
		return e instanceof DatabaseId && e.projectId === this.projectId && e.database === this.database;
	}
};
var ct = "__type__";
var lt = "__max__";
var ht = { mapValue: { fields: { __type__: { stringValue: lt } } } };
var Pt = "__vector__";
var Tt = "value";
function __PRIVATE_typeOrder(e) {
	return "nullValue" in e ? 0 : "booleanValue" in e ? 1 : "integerValue" in e || "doubleValue" in e ? 2 : "timestampValue" in e ? 3 : "stringValue" in e ? 5 : "bytesValue" in e ? 6 : "referenceValue" in e ? 7 : "geoPointValue" in e ? 8 : "arrayValue" in e ? 9 : "mapValue" in e ? __PRIVATE_isServerTimestamp(e) ? 4 : __PRIVATE_isMaxValue(e) ? 9007199254740991 : __PRIVATE_isVectorValue(e) ? 10 : 11 : fail(28295, { value: e });
}
function __PRIVATE_valueEquals(e, t) {
	if (e === t) return !0;
	const n = __PRIVATE_typeOrder(e);
	if (n !== __PRIVATE_typeOrder(t)) return !1;
	switch (n) {
		case 0:
		case 9007199254740991: return !0;
		case 1: return e.booleanValue === t.booleanValue;
		case 4: return __PRIVATE_getLocalWriteTime(e).isEqual(__PRIVATE_getLocalWriteTime(t));
		case 3: return function __PRIVATE_timestampEquals(e, t) {
			if ("string" == typeof e.timestampValue && "string" == typeof t.timestampValue && e.timestampValue.length === t.timestampValue.length) return e.timestampValue === t.timestampValue;
			const n = __PRIVATE_normalizeTimestamp(e.timestampValue);
			const r = __PRIVATE_normalizeTimestamp(t.timestampValue);
			return n.seconds === r.seconds && n.nanos === r.nanos;
		}(e, t);
		case 5: return e.stringValue === t.stringValue;
		case 6: return function __PRIVATE_blobEquals(e, t) {
			return __PRIVATE_normalizeByteString(e.bytesValue).isEqual(__PRIVATE_normalizeByteString(t.bytesValue));
		}(e, t);
		case 7: return e.referenceValue === t.referenceValue;
		case 8: return function __PRIVATE_geoPointEquals(e, t) {
			return __PRIVATE_normalizeNumber(e.geoPointValue.latitude) === __PRIVATE_normalizeNumber(t.geoPointValue.latitude) && __PRIVATE_normalizeNumber(e.geoPointValue.longitude) === __PRIVATE_normalizeNumber(t.geoPointValue.longitude);
		}(e, t);
		case 2: return function __PRIVATE_numberEquals(e, t) {
			if ("integerValue" in e && "integerValue" in t) return __PRIVATE_normalizeNumber(e.integerValue) === __PRIVATE_normalizeNumber(t.integerValue);
			if ("doubleValue" in e && "doubleValue" in t) {
				const n = __PRIVATE_normalizeNumber(e.doubleValue);
				const r = __PRIVATE_normalizeNumber(t.doubleValue);
				return n === r ? __PRIVATE_isNegativeZero(n) === __PRIVATE_isNegativeZero(r) : isNaN(n) && isNaN(r);
			}
			return !1;
		}(e, t);
		case 9: return __PRIVATE_arrayEquals(e.arrayValue.values || [], t.arrayValue.values || [], __PRIVATE_valueEquals);
		case 10:
		case 11: return function __PRIVATE_objectEquals(e, t) {
			const n = e.mapValue.fields || {};
			const r = t.mapValue.fields || {};
			if (__PRIVATE_objectSize(n) !== __PRIVATE_objectSize(r)) return !1;
			for (const e in n) if (n.hasOwnProperty(e) && (void 0 === r[e] || !__PRIVATE_valueEquals(n[e], r[e]))) return !1;
			return !0;
		}(e, t);
		default: return fail(52216, { left: e });
	}
}
function __PRIVATE_arrayValueContains(e, t) {
	return void 0 !== (e.values || []).find(((e) => __PRIVATE_valueEquals(e, t)));
}
function __PRIVATE_valueCompare(e, t) {
	if (e === t) return 0;
	const n = __PRIVATE_typeOrder(e);
	const r = __PRIVATE_typeOrder(t);
	if (n !== r) return __PRIVATE_primitiveComparator(n, r);
	switch (n) {
		case 0:
		case 9007199254740991: return 0;
		case 1: return __PRIVATE_primitiveComparator(e.booleanValue, t.booleanValue);
		case 2: return function __PRIVATE_compareNumbers(e, t) {
			const n = __PRIVATE_normalizeNumber(e.integerValue || e.doubleValue);
			const r = __PRIVATE_normalizeNumber(t.integerValue || t.doubleValue);
			return n < r ? -1 : n > r ? 1 : n === r ? 0 : isNaN(n) ? isNaN(r) ? 0 : -1 : 1;
		}(e, t);
		case 3: return __PRIVATE_compareTimestamps(e.timestampValue, t.timestampValue);
		case 4: return __PRIVATE_compareTimestamps(__PRIVATE_getLocalWriteTime(e), __PRIVATE_getLocalWriteTime(t));
		case 5: return __PRIVATE_compareUtf8Strings(e.stringValue, t.stringValue);
		case 6: return function __PRIVATE_compareBlobs(e, t) {
			const n = __PRIVATE_normalizeByteString(e);
			const r = __PRIVATE_normalizeByteString(t);
			return n.compareTo(r);
		}(e.bytesValue, t.bytesValue);
		case 7: return function __PRIVATE_compareReferences(e, t) {
			const n = e.split("/");
			const r = t.split("/");
			for (let e = 0; e < n.length && e < r.length; e++) {
				const t = __PRIVATE_primitiveComparator(n[e], r[e]);
				if (0 !== t) return t;
			}
			return __PRIVATE_primitiveComparator(n.length, r.length);
		}(e.referenceValue, t.referenceValue);
		case 8: return function __PRIVATE_compareGeoPoints(e, t) {
			const n = __PRIVATE_primitiveComparator(__PRIVATE_normalizeNumber(e.latitude), __PRIVATE_normalizeNumber(t.latitude));
			if (0 !== n) return n;
			return __PRIVATE_primitiveComparator(__PRIVATE_normalizeNumber(e.longitude), __PRIVATE_normalizeNumber(t.longitude));
		}(e.geoPointValue, t.geoPointValue);
		case 9: return __PRIVATE_compareArrays(e.arrayValue, t.arrayValue);
		case 10: return function __PRIVATE_compareVectors(e, t) {
			var n;
			var r;
			var i;
			var s;
			const o = e.fields || {};
			const _ = t.fields || {};
			const a = null === (n = o[Tt]) || void 0 === n ? void 0 : n.arrayValue;
			const u = null === (r = _[Tt]) || void 0 === r ? void 0 : r.arrayValue;
			const c = __PRIVATE_primitiveComparator((null === (i = null == a ? void 0 : a.values) || void 0 === i ? void 0 : i.length) || 0, (null === (s = null == u ? void 0 : u.values) || void 0 === s ? void 0 : s.length) || 0);
			if (0 !== c) return c;
			return __PRIVATE_compareArrays(a, u);
		}(e.mapValue, t.mapValue);
		case 11: return function __PRIVATE_compareMaps(e, t) {
			if (e === ht.mapValue && t === ht.mapValue) return 0;
			if (e === ht.mapValue) return 1;
			if (t === ht.mapValue) return -1;
			const n = e.fields || {};
			const r = Object.keys(n);
			const i = t.fields || {};
			const s = Object.keys(i);
			r.sort(), s.sort();
			for (let e = 0; e < r.length && e < s.length; ++e) {
				const t = __PRIVATE_compareUtf8Strings(r[e], s[e]);
				if (0 !== t) return t;
				const o = __PRIVATE_valueCompare(n[r[e]], i[s[e]]);
				if (0 !== o) return o;
			}
			return __PRIVATE_primitiveComparator(r.length, s.length);
		}(e.mapValue, t.mapValue);
		default: throw fail(23264, { le: n });
	}
}
function __PRIVATE_compareTimestamps(e, t) {
	if ("string" == typeof e && "string" == typeof t && e.length === t.length) return __PRIVATE_primitiveComparator(e, t);
	const n = __PRIVATE_normalizeTimestamp(e);
	const r = __PRIVATE_normalizeTimestamp(t);
	const i = __PRIVATE_primitiveComparator(n.seconds, r.seconds);
	return 0 !== i ? i : __PRIVATE_primitiveComparator(n.nanos, r.nanos);
}
function __PRIVATE_compareArrays(e, t) {
	const n = e.values || [];
	const r = t.values || [];
	for (let e = 0; e < n.length && e < r.length; ++e) {
		const t = __PRIVATE_valueCompare(n[e], r[e]);
		if (t) return t;
	}
	return __PRIVATE_primitiveComparator(n.length, r.length);
}
function canonicalId(e) {
	return __PRIVATE_canonifyValue(e);
}
function __PRIVATE_canonifyValue(e) {
	return "nullValue" in e ? "null" : "booleanValue" in e ? "" + e.booleanValue : "integerValue" in e ? "" + e.integerValue : "doubleValue" in e ? "" + e.doubleValue : "timestampValue" in e ? function __PRIVATE_canonifyTimestamp(e) {
		const t = __PRIVATE_normalizeTimestamp(e);
		return `time(${t.seconds},${t.nanos})`;
	}(e.timestampValue) : "stringValue" in e ? e.stringValue : "bytesValue" in e ? function __PRIVATE_canonifyByteString(e) {
		return __PRIVATE_normalizeByteString(e).toBase64();
	}(e.bytesValue) : "referenceValue" in e ? function __PRIVATE_canonifyReference(e) {
		return DocumentKey.fromName(e).toString();
	}(e.referenceValue) : "geoPointValue" in e ? function __PRIVATE_canonifyGeoPoint(e) {
		return `geo(${e.latitude},${e.longitude})`;
	}(e.geoPointValue) : "arrayValue" in e ? function __PRIVATE_canonifyArray(e) {
		let t = "[";
		let n = !0;
		for (const r of e.values || []) n ? n = !1 : t += ",", t += __PRIVATE_canonifyValue(r);
		return t + "]";
	}(e.arrayValue) : "mapValue" in e ? function __PRIVATE_canonifyMap(e) {
		const t = Object.keys(e.fields || {}).sort();
		let n = "{";
		let r = !0;
		for (const i of t) r ? r = !1 : n += ",", n += `${i}:${__PRIVATE_canonifyValue(e.fields[i])}`;
		return n + "}";
	}(e.mapValue) : fail(61005, { value: e });
}
function isInteger(e) {
	return !!e && "integerValue" in e;
}
function isArray(e) {
	return !!e && "arrayValue" in e;
}
function __PRIVATE_isMapValue(e) {
	return !!e && "mapValue" in e;
}
function __PRIVATE_isVectorValue(e) {
	var t;
	var n;
	return (null === (n = ((null === (t = null == e ? void 0 : e.mapValue) || void 0 === t ? void 0 : t.fields) || {})[ct]) || void 0 === n ? void 0 : n.stringValue) === Pt;
}
function __PRIVATE_deepClone(e) {
	if (e.geoPointValue) return { geoPointValue: Object.assign({}, e.geoPointValue) };
	if (e.timestampValue && "object" == typeof e.timestampValue) return { timestampValue: Object.assign({}, e.timestampValue) };
	if (e.mapValue) {
		const t = { mapValue: { fields: {} } };
		return forEach(e.mapValue.fields, ((e, n) => t.mapValue.fields[e] = __PRIVATE_deepClone(n))), t;
	}
	if (e.arrayValue) {
		const t = { arrayValue: { values: [] } };
		for (let n = 0; n < (e.arrayValue.values || []).length; ++n) t.arrayValue.values[n] = __PRIVATE_deepClone(e.arrayValue.values[n]);
		return t;
	}
	return Object.assign({}, e);
}
function __PRIVATE_isMaxValue(e) {
	return (((e.mapValue || {}).fields || {}).__type__ || {}).stringValue === lt;
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var ObjectValue = class ObjectValue {
	constructor(e) {
		this.value = e;
	}
	static empty() {
		return new ObjectValue({ mapValue: {} });
	}
	field(e) {
		if (e.isEmpty()) return this.value;
		{
			let t = this.value;
			for (let n = 0; n < e.length - 1; ++n) if (t = (t.mapValue.fields || {})[e.get(n)], !__PRIVATE_isMapValue(t)) return null;
			return t = (t.mapValue.fields || {})[e.lastSegment()], t || null;
		}
	}
	set(e, t) {
		this.getFieldsMap(e.popLast())[e.lastSegment()] = __PRIVATE_deepClone(t);
	}
	setAll(e) {
		let t = FieldPath$1.emptyPath();
		let n = {};
		let r = [];
		e.forEach(((e, i) => {
			if (!t.isImmediateParentOf(i)) {
				const e = this.getFieldsMap(t);
				this.applyChanges(e, n, r), n = {}, r = [], t = i.popLast();
			}
			e ? n[i.lastSegment()] = __PRIVATE_deepClone(e) : r.push(i.lastSegment());
		}));
		const i = this.getFieldsMap(t);
		this.applyChanges(i, n, r);
	}
	delete(e) {
		const t = this.field(e.popLast());
		__PRIVATE_isMapValue(t) && t.mapValue.fields && delete t.mapValue.fields[e.lastSegment()];
	}
	isEqual(e) {
		return __PRIVATE_valueEquals(this.value, e.value);
	}
	getFieldsMap(e) {
		let t = this.value;
		t.mapValue.fields || (t.mapValue = { fields: {} });
		for (let n = 0; n < e.length; ++n) {
			let r = t.mapValue.fields[e.get(n)];
			__PRIVATE_isMapValue(r) && r.mapValue.fields || (r = { mapValue: { fields: {} } }, t.mapValue.fields[e.get(n)] = r), t = r;
		}
		return t.mapValue.fields;
	}
	applyChanges(e, t, n) {
		forEach(t, ((t, n) => e[t] = n));
		for (const t of n) delete e[t];
	}
	clone() {
		return new ObjectValue(__PRIVATE_deepClone(this.value));
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var MutableDocument = class MutableDocument {
	constructor(e, t, n, r, i, s, o) {
		this.key = e, this.documentType = t, this.version = n, this.readTime = r, this.createTime = i, this.data = s, this.documentState = o;
	}
	static newInvalidDocument(e) {
		return new MutableDocument(e, 0, SnapshotVersion.min(), SnapshotVersion.min(), SnapshotVersion.min(), ObjectValue.empty(), 0);
	}
	static newFoundDocument(e, t, n, r) {
		return new MutableDocument(e, 1, t, SnapshotVersion.min(), n, r, 0);
	}
	static newNoDocument(e, t) {
		return new MutableDocument(e, 2, t, SnapshotVersion.min(), SnapshotVersion.min(), ObjectValue.empty(), 0);
	}
	static newUnknownDocument(e, t) {
		return new MutableDocument(e, 3, t, SnapshotVersion.min(), SnapshotVersion.min(), ObjectValue.empty(), 2);
	}
	convertToFoundDocument(e, t) {
		return !this.createTime.isEqual(SnapshotVersion.min()) || 2 !== this.documentType && 0 !== this.documentType || (this.createTime = e), this.version = e, this.documentType = 1, this.data = t, this.documentState = 0, this;
	}
	convertToNoDocument(e) {
		return this.version = e, this.documentType = 2, this.data = ObjectValue.empty(), this.documentState = 0, this;
	}
	convertToUnknownDocument(e) {
		return this.version = e, this.documentType = 3, this.data = ObjectValue.empty(), this.documentState = 2, this;
	}
	setHasCommittedMutations() {
		return this.documentState = 2, this;
	}
	setHasLocalMutations() {
		return this.documentState = 1, this.version = SnapshotVersion.min(), this;
	}
	setReadTime(e) {
		return this.readTime = e, this;
	}
	get hasLocalMutations() {
		return 1 === this.documentState;
	}
	get hasCommittedMutations() {
		return 2 === this.documentState;
	}
	get hasPendingWrites() {
		return this.hasLocalMutations || this.hasCommittedMutations;
	}
	isValidDocument() {
		return 0 !== this.documentType;
	}
	isFoundDocument() {
		return 1 === this.documentType;
	}
	isNoDocument() {
		return 2 === this.documentType;
	}
	isUnknownDocument() {
		return 3 === this.documentType;
	}
	isEqual(e) {
		return e instanceof MutableDocument && this.key.isEqual(e.key) && this.version.isEqual(e.version) && this.documentType === e.documentType && this.documentState === e.documentState && this.data.isEqual(e.data);
	}
	mutableCopy() {
		return new MutableDocument(this.key, this.documentType, this.version, this.readTime, this.createTime, this.data.clone(), this.documentState);
	}
	toString() {
		return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`;
	}
};
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Bound = class {
	constructor(e, t) {
		this.position = e, this.inclusive = t;
	}
};
function __PRIVATE_boundCompareToDocument(e, t, n) {
	let r = 0;
	for (let i = 0; i < e.position.length; i++) {
		const s = t[i];
		const o = e.position[i];
		if (s.field.isKeyField()) r = DocumentKey.comparator(DocumentKey.fromName(o.referenceValue), n.key);
		else r = __PRIVATE_valueCompare(o, n.data.field(s.field));
		if ("desc" === s.dir && (r *= -1), 0 !== r) break;
	}
	return r;
}
function __PRIVATE_boundEquals(e, t) {
	if (null === e) return null === t;
	if (null === t) return !1;
	if (e.inclusive !== t.inclusive || e.position.length !== t.position.length) return !1;
	for (let n = 0; n < e.position.length; n++) if (!__PRIVATE_valueEquals(e.position[n], t.position[n])) return !1;
	return !0;
}
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var OrderBy = class {
	constructor(e, t = "asc") {
		this.field = e, this.dir = t;
	}
};
function __PRIVATE_orderByEquals(e, t) {
	return e.dir === t.dir && e.field.isEqual(t.field);
}
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/ var Filter = class {};
var FieldFilter = class FieldFilter extends Filter {
	constructor(e, t, n) {
		super(), this.field = e, this.op = t, this.value = n;
	}
	static create(e, t, n) {
		return e.isKeyField() ? "in" === t || "not-in" === t ? this.createKeyFieldInFilter(e, t, n) : new __PRIVATE_KeyFieldFilter(e, t, n) : "array-contains" === t ? new __PRIVATE_ArrayContainsFilter(e, n) : "in" === t ? new __PRIVATE_InFilter(e, n) : "not-in" === t ? new __PRIVATE_NotInFilter(e, n) : "array-contains-any" === t ? new __PRIVATE_ArrayContainsAnyFilter(e, n) : new FieldFilter(e, t, n);
	}
	static createKeyFieldInFilter(e, t, n) {
		return "in" === t ? new __PRIVATE_KeyFieldInFilter(e, n) : new __PRIVATE_KeyFieldNotInFilter(e, n);
	}
	matches(e) {
		const t = e.data.field(this.field);
		return "!=" === this.op ? null !== t && void 0 === t.nullValue && this.matchesComparison(__PRIVATE_valueCompare(t, this.value)) : null !== t && __PRIVATE_typeOrder(this.value) === __PRIVATE_typeOrder(t) && this.matchesComparison(__PRIVATE_valueCompare(t, this.value));
	}
	matchesComparison(e) {
		switch (this.op) {
			case "<": return e < 0;
			case "<=": return e <= 0;
			case "==": return 0 === e;
			case "!=": return 0 !== e;
			case ">": return e > 0;
			case ">=": return e >= 0;
			default: return fail(47266, { operator: this.op });
		}
	}
	isInequality() {
		return [
			"<",
			"<=",
			">",
			">=",
			"!=",
			"not-in"
		].indexOf(this.op) >= 0;
	}
	getFlattenedFilters() {
		return [this];
	}
	getFilters() {
		return [this];
	}
};
var CompositeFilter = class CompositeFilter extends Filter {
	constructor(e, t) {
		super(), this.filters = e, this.op = t, this.he = null;
	}
	static create(e, t) {
		return new CompositeFilter(e, t);
	}
	matches(e) {
		return __PRIVATE_compositeFilterIsConjunction(this) ? void 0 === this.filters.find(((t) => !t.matches(e))) : void 0 !== this.filters.find(((t) => t.matches(e)));
	}
	getFlattenedFilters() {
		return null !== this.he || (this.he = this.filters.reduce(((e, t) => e.concat(t.getFlattenedFilters())), [])), this.he;
	}
	getFilters() {
		return Object.assign([], this.filters);
	}
};
function __PRIVATE_compositeFilterIsConjunction(e) {
	return "and" === e.op;
}
function __PRIVATE_compositeFilterIsFlatConjunction(e) {
	return __PRIVATE_compositeFilterIsFlat(e) && __PRIVATE_compositeFilterIsConjunction(e);
}
function __PRIVATE_compositeFilterIsFlat(e) {
	for (const t of e.filters) if (t instanceof CompositeFilter) return !1;
	return !0;
}
function __PRIVATE_canonifyFilter(e) {
	if (e instanceof FieldFilter) return e.field.canonicalString() + e.op.toString() + canonicalId(e.value);
	if (__PRIVATE_compositeFilterIsFlatConjunction(e)) return e.filters.map(((e) => __PRIVATE_canonifyFilter(e))).join(",");
	{
		const t = e.filters.map(((e) => __PRIVATE_canonifyFilter(e))).join(",");
		return `${e.op}(${t})`;
	}
}
function __PRIVATE_filterEquals(e, t) {
	return e instanceof FieldFilter ? function __PRIVATE_fieldFilterEquals(e, t) {
		return t instanceof FieldFilter && e.op === t.op && e.field.isEqual(t.field) && __PRIVATE_valueEquals(e.value, t.value);
	}(e, t) : e instanceof CompositeFilter ? function __PRIVATE_compositeFilterEquals(e, t) {
		if (t instanceof CompositeFilter && e.op === t.op && e.filters.length === t.filters.length) return e.filters.reduce(((e, n, r) => e && __PRIVATE_filterEquals(n, t.filters[r])), !0);
		return !1;
	}(e, t) : void fail(19439);
}
function __PRIVATE_stringifyFilter(e) {
	return e instanceof FieldFilter ? function __PRIVATE_stringifyFieldFilter(e) {
		return `${e.field.canonicalString()} ${e.op} ${canonicalId(e.value)}`;
	}(e) : e instanceof CompositeFilter ? function __PRIVATE_stringifyCompositeFilter(e) {
		return e.op.toString() + " {" + e.getFilters().map(__PRIVATE_stringifyFilter).join(" ,") + "}";
	}(e) : "Filter";
}
var __PRIVATE_KeyFieldFilter = class extends FieldFilter {
	constructor(e, t, n) {
		super(e, t, n), this.key = DocumentKey.fromName(n.referenceValue);
	}
	matches(e) {
		const t = DocumentKey.comparator(e.key, this.key);
		return this.matchesComparison(t);
	}
};
var __PRIVATE_KeyFieldInFilter = class extends FieldFilter {
	constructor(e, t) {
		super(e, "in", t), this.keys = __PRIVATE_extractDocumentKeysFromArrayValue("in", t);
	}
	matches(e) {
		return this.keys.some(((t) => t.isEqual(e.key)));
	}
};
var __PRIVATE_KeyFieldNotInFilter = class extends FieldFilter {
	constructor(e, t) {
		super(e, "not-in", t), this.keys = __PRIVATE_extractDocumentKeysFromArrayValue("not-in", t);
	}
	matches(e) {
		return !this.keys.some(((t) => t.isEqual(e.key)));
	}
};
function __PRIVATE_extractDocumentKeysFromArrayValue(e, t) {
	var n;
	return ((null === (n = t.arrayValue) || void 0 === n ? void 0 : n.values) || []).map(((e) => DocumentKey.fromName(e.referenceValue)));
}
var __PRIVATE_ArrayContainsFilter = class extends FieldFilter {
	constructor(e, t) {
		super(e, "array-contains", t);
	}
	matches(e) {
		const t = e.data.field(this.field);
		return isArray(t) && __PRIVATE_arrayValueContains(t.arrayValue, this.value);
	}
};
var __PRIVATE_InFilter = class extends FieldFilter {
	constructor(e, t) {
		super(e, "in", t);
	}
	matches(e) {
		const t = e.data.field(this.field);
		return null !== t && __PRIVATE_arrayValueContains(this.value.arrayValue, t);
	}
};
var __PRIVATE_NotInFilter = class extends FieldFilter {
	constructor(e, t) {
		super(e, "not-in", t);
	}
	matches(e) {
		if (__PRIVATE_arrayValueContains(this.value.arrayValue, { nullValue: "NULL_VALUE" })) return !1;
		const t = e.data.field(this.field);
		return null !== t && void 0 === t.nullValue && !__PRIVATE_arrayValueContains(this.value.arrayValue, t);
	}
};
var __PRIVATE_ArrayContainsAnyFilter = class extends FieldFilter {
	constructor(e, t) {
		super(e, "array-contains-any", t);
	}
	matches(e) {
		const t = e.data.field(this.field);
		return !(!isArray(t) || !t.arrayValue.values) && t.arrayValue.values.some(((e) => __PRIVATE_arrayValueContains(this.value.arrayValue, e)));
	}
};
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var __PRIVATE_TargetImpl = class {
	constructor(e, t = null, n = [], r = [], i = null, s = null, o = null) {
		this.path = e, this.collectionGroup = t, this.orderBy = n, this.filters = r, this.limit = i, this.startAt = s, this.endAt = o, this.Pe = null;
	}
};
function __PRIVATE_newTarget(e, t = null, n = [], r = [], i = null, s = null, o = null) {
	return new __PRIVATE_TargetImpl(e, t, n, r, i, s, o);
}
function __PRIVATE_canonifyTarget(e) {
	const t = __PRIVATE_debugCast(e);
	if (null === t.Pe) {
		let e = t.path.canonicalString();
		null !== t.collectionGroup && (e += "|cg:" + t.collectionGroup), e += "|f:", e += t.filters.map(((e) => __PRIVATE_canonifyFilter(e))).join(","), e += "|ob:", e += t.orderBy.map(((e) => function __PRIVATE_canonifyOrderBy(e) {
			return e.field.canonicalString() + e.dir;
		}(e))).join(","), __PRIVATE_isNullOrUndefined(t.limit) || (e += "|l:", e += t.limit), t.startAt && (e += "|lb:", e += t.startAt.inclusive ? "b:" : "a:", e += t.startAt.position.map(((e) => canonicalId(e))).join(",")), t.endAt && (e += "|ub:", e += t.endAt.inclusive ? "a:" : "b:", e += t.endAt.position.map(((e) => canonicalId(e))).join(",")), t.Pe = e;
	}
	return t.Pe;
}
function __PRIVATE_targetEquals(e, t) {
	if (e.limit !== t.limit) return !1;
	if (e.orderBy.length !== t.orderBy.length) return !1;
	for (let n = 0; n < e.orderBy.length; n++) if (!__PRIVATE_orderByEquals(e.orderBy[n], t.orderBy[n])) return !1;
	if (e.filters.length !== t.filters.length) return !1;
	for (let n = 0; n < e.filters.length; n++) if (!__PRIVATE_filterEquals(e.filters[n], t.filters[n])) return !1;
	return e.collectionGroup === t.collectionGroup && !!e.path.isEqual(t.path) && !!__PRIVATE_boundEquals(e.startAt, t.startAt) && __PRIVATE_boundEquals(e.endAt, t.endAt);
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var __PRIVATE_QueryImpl = class {
	constructor(e, t = null, n = [], r = [], i = null, s = "F", o = null, _ = null) {
		this.path = e, this.collectionGroup = t, this.explicitOrderBy = n, this.filters = r, this.limit = i, this.limitType = s, this.startAt = o, this.endAt = _, this.Te = null, this.Ie = null, this.de = null, this.startAt, this.endAt;
	}
};
function __PRIVATE_newQuery(e, t, n, r, i, s, o, _) {
	return new __PRIVATE_QueryImpl(e, t, n, r, i, s, o, _);
}
function __PRIVATE_newQueryForPath(e) {
	return new __PRIVATE_QueryImpl(e);
}
function __PRIVATE_queryMatchesAllDocuments(e) {
	return 0 === e.filters.length && null === e.limit && null == e.startAt && null == e.endAt && (0 === e.explicitOrderBy.length || 1 === e.explicitOrderBy.length && e.explicitOrderBy[0].field.isKeyField());
}
function __PRIVATE_isCollectionGroupQuery(e) {
	return null !== e.collectionGroup;
}
function __PRIVATE_queryNormalizedOrderBy(e) {
	const t = __PRIVATE_debugCast(e);
	if (null === t.Te) {
		t.Te = [];
		const e = /* @__PURE__ */ new Set();
		for (const n of t.explicitOrderBy) t.Te.push(n), e.add(n.field.canonicalString());
		const n = t.explicitOrderBy.length > 0 ? t.explicitOrderBy[t.explicitOrderBy.length - 1].dir : "asc";
		(function __PRIVATE_getInequalityFilterFields(e) {
			let t = new SortedSet(FieldPath$1.comparator);
			return e.filters.forEach(((e) => {
				e.getFlattenedFilters().forEach(((e) => {
					e.isInequality() && (t = t.add(e.field));
				}));
			})), t;
		})(t).forEach(((r) => {
			e.has(r.canonicalString()) || r.isKeyField() || t.Te.push(new OrderBy(r, n));
		})), e.has(FieldPath$1.keyField().canonicalString()) || t.Te.push(new OrderBy(FieldPath$1.keyField(), n));
	}
	return t.Te;
}
function __PRIVATE_queryToTarget(e) {
	const t = __PRIVATE_debugCast(e);
	return t.Ie || (t.Ie = __PRIVATE__queryToTarget(t, __PRIVATE_queryNormalizedOrderBy(e))), t.Ie;
}
function __PRIVATE__queryToTarget(e, t) {
	if ("F" === e.limitType) return __PRIVATE_newTarget(e.path, e.collectionGroup, t, e.filters, e.limit, e.startAt, e.endAt);
	{
		t = t.map(((e) => {
			const t = "desc" === e.dir ? "asc" : "desc";
			return new OrderBy(e.field, t);
		}));
		const n = e.endAt ? new Bound(e.endAt.position, e.endAt.inclusive) : null;
		const r = e.startAt ? new Bound(e.startAt.position, e.startAt.inclusive) : null;
		return __PRIVATE_newTarget(e.path, e.collectionGroup, t, e.filters, e.limit, n, r);
	}
}
function __PRIVATE_queryWithLimit(e, t, n) {
	return new __PRIVATE_QueryImpl(e.path, e.collectionGroup, e.explicitOrderBy.slice(), e.filters.slice(), t, n, e.startAt, e.endAt);
}
function __PRIVATE_queryEquals(e, t) {
	return __PRIVATE_targetEquals(__PRIVATE_queryToTarget(e), __PRIVATE_queryToTarget(t)) && e.limitType === t.limitType;
}
function __PRIVATE_canonifyQuery(e) {
	return `${__PRIVATE_canonifyTarget(__PRIVATE_queryToTarget(e))}|lt:${e.limitType}`;
}
function __PRIVATE_stringifyQuery(e) {
	return `Query(target=${function __PRIVATE_stringifyTarget(e) {
		let t = e.path.canonicalString();
		return null !== e.collectionGroup && (t += " collectionGroup=" + e.collectionGroup), e.filters.length > 0 && (t += `, filters: [${e.filters.map(((e) => __PRIVATE_stringifyFilter(e))).join(", ")}]`), __PRIVATE_isNullOrUndefined(e.limit) || (t += ", limit: " + e.limit), e.orderBy.length > 0 && (t += `, orderBy: [${e.orderBy.map(((e) => function __PRIVATE_stringifyOrderBy(e) {
			return `${e.field.canonicalString()} (${e.dir})`;
		}(e))).join(", ")}]`), e.startAt && (t += ", startAt: ", t += e.startAt.inclusive ? "b:" : "a:", t += e.startAt.position.map(((e) => canonicalId(e))).join(",")), e.endAt && (t += ", endAt: ", t += e.endAt.inclusive ? "a:" : "b:", t += e.endAt.position.map(((e) => canonicalId(e))).join(",")), `Target(${t})`;
	}(__PRIVATE_queryToTarget(e))}; limitType=${e.limitType})`;
}
function __PRIVATE_queryMatches(e, t) {
	return t.isFoundDocument() && function __PRIVATE_queryMatchesPathAndCollectionGroup(e, t) {
		const n = t.key.path;
		return null !== e.collectionGroup ? t.key.hasCollectionId(e.collectionGroup) && e.path.isPrefixOf(n) : DocumentKey.isDocumentKey(e.path) ? e.path.isEqual(n) : e.path.isImmediateParentOf(n);
	}(e, t) && function __PRIVATE_queryMatchesOrderBy(e, t) {
		for (const n of __PRIVATE_queryNormalizedOrderBy(e)) if (!n.field.isKeyField() && null === t.data.field(n.field)) return !1;
		return !0;
	}(e, t) && function __PRIVATE_queryMatchesFilters(e, t) {
		for (const n of e.filters) if (!n.matches(t)) return !1;
		return !0;
	}(e, t) && function __PRIVATE_queryMatchesBounds(e, t) {
		if (e.startAt && !function __PRIVATE_boundSortsBeforeDocument(e, t, n) {
			const r = __PRIVATE_boundCompareToDocument(e, t, n);
			return e.inclusive ? r <= 0 : r < 0;
		}(e.startAt, __PRIVATE_queryNormalizedOrderBy(e), t)) return !1;
		if (e.endAt && !function __PRIVATE_boundSortsAfterDocument(e, t, n) {
			const r = __PRIVATE_boundCompareToDocument(e, t, n);
			return e.inclusive ? r >= 0 : r > 0;
		}(e.endAt, __PRIVATE_queryNormalizedOrderBy(e), t)) return !1;
		return !0;
	}(e, t);
}
function __PRIVATE_newQueryComparator(e) {
	return (t, n) => {
		let r = !1;
		for (const i of __PRIVATE_queryNormalizedOrderBy(e)) {
			const e = __PRIVATE_compareDocs(i, t, n);
			if (0 !== e) return e;
			r = r || i.field.isKeyField();
		}
		return 0;
	};
}
function __PRIVATE_compareDocs(e, t, n) {
	const r = e.field.isKeyField() ? DocumentKey.comparator(t.key, n.key) : function __PRIVATE_compareDocumentsByField(e, t, n) {
		const r = t.data.field(e);
		const i = n.data.field(e);
		return null !== r && null !== i ? __PRIVATE_valueCompare(r, i) : fail(42886);
	}(e.field, t, n);
	switch (e.dir) {
		case "asc": return r;
		case "desc": return -1 * r;
		default: return fail(19790, { direction: e.dir });
	}
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var ObjectMap = class {
	constructor(e, t) {
		this.mapKeyFn = e, this.equalsFn = t, this.inner = {}, this.innerSize = 0;
	}
	get(e) {
		const t = this.mapKeyFn(e);
		const n = this.inner[t];
		if (void 0 !== n) {
			for (const [t, r] of n) if (this.equalsFn(t, e)) return r;
		}
	}
	has(e) {
		return void 0 !== this.get(e);
	}
	set(e, t) {
		const n = this.mapKeyFn(e);
		const r = this.inner[n];
		if (void 0 === r) return this.inner[n] = [[e, t]], void this.innerSize++;
		for (let n = 0; n < r.length; n++) if (this.equalsFn(r[n][0], e)) return void (r[n] = [e, t]);
		r.push([e, t]), this.innerSize++;
	}
	delete(e) {
		const t = this.mapKeyFn(e);
		const n = this.inner[t];
		if (void 0 === n) return !1;
		for (let r = 0; r < n.length; r++) if (this.equalsFn(n[r][0], e)) return 1 === n.length ? delete this.inner[t] : n.splice(r, 1), this.innerSize--, !0;
		return !1;
	}
	forEach(e) {
		forEach(this.inner, ((t, n) => {
			for (const [t, r] of n) e(t, r);
		}));
	}
	isEmpty() {
		return isEmpty(this.inner);
	}
	size() {
		return this.innerSize;
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/ var Et = new SortedMap(DocumentKey.comparator);
function __PRIVATE_mutableDocumentMap() {
	return Et;
}
var At = new SortedMap(DocumentKey.comparator);
function documentMap(...e) {
	let t = At;
	for (const n of e) t = t.insert(n.key, n);
	return t;
}
function __PRIVATE_convertOverlayedDocumentMapToDocumentMap(e) {
	let t = At;
	return e.forEach(((e, n) => t = t.insert(e, n.overlayedDocument))), t;
}
function __PRIVATE_newOverlayMap() {
	return __PRIVATE_newDocumentKeyMap();
}
function __PRIVATE_newMutationMap() {
	return __PRIVATE_newDocumentKeyMap();
}
function __PRIVATE_newDocumentKeyMap() {
	return new ObjectMap(((e) => e.toString()), ((e, t) => e.isEqual(t)));
}
new SortedMap(DocumentKey.comparator);
var Vt = new SortedSet(DocumentKey.comparator);
function __PRIVATE_documentKeySet(...e) {
	let t = Vt;
	for (const n of e) t = t.add(n);
	return t;
}
var mt = new SortedSet(__PRIVATE_primitiveComparator);
function __PRIVATE_targetIdSet() {
	return mt;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function __PRIVATE_toDouble(e, t) {
	if (e.useProto3Json) {
		if (isNaN(t)) return { doubleValue: "NaN" };
		if (t === Infinity) return { doubleValue: "Infinity" };
		if (t === -Infinity) return { doubleValue: "-Infinity" };
	}
	return { doubleValue: __PRIVATE_isNegativeZero(t) ? "-0" : t };
}
function __PRIVATE_toInteger(e) {
	return { integerValue: "" + e };
}
/**
* @license
* Copyright 2018 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var TransformOperation = class {
	constructor() {
		this._ = void 0;
	}
};
function __PRIVATE_applyTransformOperationToLocalView(e, t, n) {
	return e instanceof __PRIVATE_ServerTimestampTransform ? function serverTimestamp$1(e, t) {
		const n = { fields: {
			[ot]: { stringValue: st },
			[at]: { timestampValue: {
				seconds: e.seconds,
				nanos: e.nanoseconds
			} }
		} };
		return t && __PRIVATE_isServerTimestamp(t) && (t = __PRIVATE_getPreviousValue(t)), t && (n.fields[_t] = t), { mapValue: n };
	}(n, t) : e instanceof __PRIVATE_ArrayUnionTransformOperation ? __PRIVATE_applyArrayUnionTransformOperation(e, t) : e instanceof __PRIVATE_ArrayRemoveTransformOperation ? __PRIVATE_applyArrayRemoveTransformOperation(e, t) : function __PRIVATE_applyNumericIncrementTransformOperationToLocalView(e, t) {
		const n = __PRIVATE_computeTransformOperationBaseValue(e, t);
		const r = asNumber(n) + asNumber(e.Ee);
		return isInteger(n) && isInteger(e.Ee) ? __PRIVATE_toInteger(r) : __PRIVATE_toDouble(e.serializer, r);
	}(e, t);
}
function __PRIVATE_applyTransformOperationToRemoteDocument(e, t, n) {
	return e instanceof __PRIVATE_ArrayUnionTransformOperation ? __PRIVATE_applyArrayUnionTransformOperation(e, t) : e instanceof __PRIVATE_ArrayRemoveTransformOperation ? __PRIVATE_applyArrayRemoveTransformOperation(e, t) : n;
}
function __PRIVATE_computeTransformOperationBaseValue(e, t) {
	return e instanceof __PRIVATE_NumericIncrementTransformOperation ? function __PRIVATE_isNumber(e) {
		return isInteger(e) || function __PRIVATE_isDouble(e) {
			return !!e && "doubleValue" in e;
		}(e);
	}(t) ? t : { integerValue: 0 } : null;
}
var __PRIVATE_ServerTimestampTransform = class extends TransformOperation {};
var __PRIVATE_ArrayUnionTransformOperation = class extends TransformOperation {
	constructor(e) {
		super(), this.elements = e;
	}
};
function __PRIVATE_applyArrayUnionTransformOperation(e, t) {
	const n = __PRIVATE_coercedFieldValuesArray(t);
	for (const t of e.elements) n.some(((e) => __PRIVATE_valueEquals(e, t))) || n.push(t);
	return { arrayValue: { values: n } };
}
var __PRIVATE_ArrayRemoveTransformOperation = class extends TransformOperation {
	constructor(e) {
		super(), this.elements = e;
	}
};
function __PRIVATE_applyArrayRemoveTransformOperation(e, t) {
	let n = __PRIVATE_coercedFieldValuesArray(t);
	for (const t of e.elements) n = n.filter(((e) => !__PRIVATE_valueEquals(e, t)));
	return { arrayValue: { values: n } };
}
var __PRIVATE_NumericIncrementTransformOperation = class extends TransformOperation {
	constructor(e, t) {
		super(), this.serializer = e, this.Ee = t;
	}
};
function asNumber(e) {
	return __PRIVATE_normalizeNumber(e.integerValue || e.doubleValue);
}
function __PRIVATE_coercedFieldValuesArray(e) {
	return isArray(e) && e.arrayValue.values ? e.arrayValue.values.slice() : [];
}
function __PRIVATE_fieldTransformEquals(e, t) {
	return e.field.isEqual(t.field) && function __PRIVATE_transformOperationEquals(e, t) {
		return e instanceof __PRIVATE_ArrayUnionTransformOperation && t instanceof __PRIVATE_ArrayUnionTransformOperation || e instanceof __PRIVATE_ArrayRemoveTransformOperation && t instanceof __PRIVATE_ArrayRemoveTransformOperation ? __PRIVATE_arrayEquals(e.elements, t.elements, __PRIVATE_valueEquals) : e instanceof __PRIVATE_NumericIncrementTransformOperation && t instanceof __PRIVATE_NumericIncrementTransformOperation ? __PRIVATE_valueEquals(e.Ee, t.Ee) : e instanceof __PRIVATE_ServerTimestampTransform && t instanceof __PRIVATE_ServerTimestampTransform;
	}(e.transform, t.transform);
}
var Precondition = class Precondition {
	constructor(e, t) {
		this.updateTime = e, this.exists = t;
	}
	static none() {
		return new Precondition();
	}
	static exists(e) {
		return new Precondition(void 0, e);
	}
	static updateTime(e) {
		return new Precondition(e);
	}
	get isNone() {
		return void 0 === this.updateTime && void 0 === this.exists;
	}
	isEqual(e) {
		return this.exists === e.exists && (this.updateTime ? !!e.updateTime && this.updateTime.isEqual(e.updateTime) : !e.updateTime);
	}
};
function __PRIVATE_preconditionIsValidForDocument(e, t) {
	return void 0 !== e.updateTime ? t.isFoundDocument() && t.version.isEqual(e.updateTime) : void 0 === e.exists || e.exists === t.isFoundDocument();
}
var Mutation = class {};
function __PRIVATE_calculateOverlayMutation(e, t) {
	if (!e.hasLocalMutations || t && 0 === t.fields.length) return null;
	if (null === t) return e.isNoDocument() ? new __PRIVATE_DeleteMutation(e.key, Precondition.none()) : new __PRIVATE_SetMutation(e.key, e.data, Precondition.none());
	{
		const n = e.data;
		const r = ObjectValue.empty();
		let i = new SortedSet(FieldPath$1.comparator);
		for (let e of t.fields) if (!i.has(e)) {
			let t = n.field(e);
			null === t && e.length > 1 && (e = e.popLast(), t = n.field(e)), null === t ? r.delete(e) : r.set(e, t), i = i.add(e);
		}
		return new __PRIVATE_PatchMutation(e.key, r, new FieldMask(i.toArray()), Precondition.none());
	}
}
function __PRIVATE_mutationApplyToRemoteDocument(e, t, n) {
	e instanceof __PRIVATE_SetMutation ? function __PRIVATE_setMutationApplyToRemoteDocument(e, t, n) {
		const r = e.value.clone();
		const i = __PRIVATE_serverTransformResults(e.fieldTransforms, t, n.transformResults);
		r.setAll(i), t.convertToFoundDocument(n.version, r).setHasCommittedMutations();
	}(e, t, n) : e instanceof __PRIVATE_PatchMutation ? function __PRIVATE_patchMutationApplyToRemoteDocument(e, t, n) {
		if (!__PRIVATE_preconditionIsValidForDocument(e.precondition, t)) return void t.convertToUnknownDocument(n.version);
		const r = __PRIVATE_serverTransformResults(e.fieldTransforms, t, n.transformResults);
		const i = t.data;
		i.setAll(__PRIVATE_getPatch(e)), i.setAll(r), t.convertToFoundDocument(n.version, i).setHasCommittedMutations();
	}(e, t, n) : function __PRIVATE_deleteMutationApplyToRemoteDocument(e, t, n) {
		t.convertToNoDocument(n.version).setHasCommittedMutations();
	}(0, t, n);
}
function __PRIVATE_mutationApplyToLocalView(e, t, n, r) {
	return e instanceof __PRIVATE_SetMutation ? function __PRIVATE_setMutationApplyToLocalView(e, t, n, r) {
		if (!__PRIVATE_preconditionIsValidForDocument(e.precondition, t)) return n;
		const i = e.value.clone();
		const s = __PRIVATE_localTransformResults(e.fieldTransforms, r, t);
		return i.setAll(s), t.convertToFoundDocument(t.version, i).setHasLocalMutations(), null;
	}(e, t, n, r) : e instanceof __PRIVATE_PatchMutation ? function __PRIVATE_patchMutationApplyToLocalView(e, t, n, r) {
		if (!__PRIVATE_preconditionIsValidForDocument(e.precondition, t)) return n;
		const i = __PRIVATE_localTransformResults(e.fieldTransforms, r, t);
		const s = t.data;
		if (s.setAll(__PRIVATE_getPatch(e)), s.setAll(i), t.convertToFoundDocument(t.version, s).setHasLocalMutations(), null === n) return null;
		return n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(((e) => e.field)));
	}(e, t, n, r) : function __PRIVATE_deleteMutationApplyToLocalView(e, t, n) {
		if (__PRIVATE_preconditionIsValidForDocument(e.precondition, t)) return t.convertToNoDocument(t.version).setHasLocalMutations(), null;
		return n;
	}(e, t, n);
}
function __PRIVATE_mutationEquals(e, t) {
	return e.type === t.type && !!e.key.isEqual(t.key) && !!e.precondition.isEqual(t.precondition) && !!function __PRIVATE_fieldTransformsAreEqual(e, t) {
		return void 0 === e && void 0 === t || !(!e || !t) && __PRIVATE_arrayEquals(e, t, ((e, t) => __PRIVATE_fieldTransformEquals(e, t)));
	}(e.fieldTransforms, t.fieldTransforms) && (0 === e.type ? e.value.isEqual(t.value) : 1 !== e.type || e.data.isEqual(t.data) && e.fieldMask.isEqual(t.fieldMask));
}
var __PRIVATE_SetMutation = class extends Mutation {
	constructor(e, t, n, r = []) {
		super(), this.key = e, this.value = t, this.precondition = n, this.fieldTransforms = r, this.type = 0;
	}
	getFieldMask() {
		return null;
	}
};
var __PRIVATE_PatchMutation = class extends Mutation {
	constructor(e, t, n, r, i = []) {
		super(), this.key = e, this.data = t, this.fieldMask = n, this.precondition = r, this.fieldTransforms = i, this.type = 1;
	}
	getFieldMask() {
		return this.fieldMask;
	}
};
function __PRIVATE_getPatch(e) {
	const t = /* @__PURE__ */ new Map();
	return e.fieldMask.fields.forEach(((n) => {
		if (!n.isEmpty()) {
			const r = e.data.field(n);
			t.set(n, r);
		}
	})), t;
}
function __PRIVATE_serverTransformResults(e, t, n) {
	const r = /* @__PURE__ */ new Map();
	__PRIVATE_hardAssert(e.length === n.length, 32656, {
		Ae: n.length,
		Re: e.length
	});
	for (let i = 0; i < n.length; i++) {
		const s = e[i];
		const o = s.transform;
		const _ = t.data.field(s.field);
		r.set(s.field, __PRIVATE_applyTransformOperationToRemoteDocument(o, _, n[i]));
	}
	return r;
}
function __PRIVATE_localTransformResults(e, t, n) {
	const r = /* @__PURE__ */ new Map();
	for (const i of e) {
		const e = i.transform;
		const s = n.data.field(i.field);
		r.set(i.field, __PRIVATE_applyTransformOperationToLocalView(e, s, t));
	}
	return r;
}
var __PRIVATE_DeleteMutation = class extends Mutation {
	constructor(e, t) {
		super(), this.key = e, this.precondition = t, this.type = 2, this.fieldTransforms = [];
	}
	getFieldMask() {
		return null;
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var MutationBatch = class {
	constructor(e, t, n, r) {
		this.batchId = e, this.localWriteTime = t, this.baseMutations = n, this.mutations = r;
	}
	applyToRemoteDocument(e, t) {
		const n = t.mutationResults;
		for (let t = 0; t < this.mutations.length; t++) {
			const r = this.mutations[t];
			if (r.key.isEqual(e.key)) __PRIVATE_mutationApplyToRemoteDocument(r, e, n[t]);
		}
	}
	applyToLocalView(e, t) {
		for (const n of this.baseMutations) n.key.isEqual(e.key) && (t = __PRIVATE_mutationApplyToLocalView(n, e, t, this.localWriteTime));
		for (const n of this.mutations) n.key.isEqual(e.key) && (t = __PRIVATE_mutationApplyToLocalView(n, e, t, this.localWriteTime));
		return t;
	}
	applyToLocalDocumentSet(e, t) {
		const n = __PRIVATE_newMutationMap();
		return this.mutations.forEach(((r) => {
			const i = e.get(r.key);
			const s = i.overlayedDocument;
			let o = this.applyToLocalView(s, i.mutatedFields);
			o = t.has(r.key) ? null : o;
			const _ = __PRIVATE_calculateOverlayMutation(s, o);
			null !== _ && n.set(r.key, _), s.isValidDocument() || s.convertToNoDocument(SnapshotVersion.min());
		})), n;
	}
	keys() {
		return this.mutations.reduce(((e, t) => e.add(t.key)), __PRIVATE_documentKeySet());
	}
	isEqual(e) {
		return this.batchId === e.batchId && __PRIVATE_arrayEquals(this.mutations, e.mutations, ((e, t) => __PRIVATE_mutationEquals(e, t))) && __PRIVATE_arrayEquals(this.baseMutations, e.baseMutations, ((e, t) => __PRIVATE_mutationEquals(e, t)));
	}
};
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Overlay = class {
	constructor(e, t) {
		this.largestBatchId = e, this.mutation = t;
	}
	getKey() {
		return this.mutation.key;
	}
	isEqual(e) {
		return null !== e && this.mutation === e.mutation;
	}
	toString() {
		return `Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`;
	}
};
var ft;
var gt;
function __PRIVATE_mapCodeFromRpcCode(e) {
	if (void 0 === e) return __PRIVATE_logError("GRPC error has no .code"), N.UNKNOWN;
	switch (e) {
		case ft.OK: return N.OK;
		case ft.CANCELLED: return N.CANCELLED;
		case ft.UNKNOWN: return N.UNKNOWN;
		case ft.DEADLINE_EXCEEDED: return N.DEADLINE_EXCEEDED;
		case ft.RESOURCE_EXHAUSTED: return N.RESOURCE_EXHAUSTED;
		case ft.INTERNAL: return N.INTERNAL;
		case ft.UNAVAILABLE: return N.UNAVAILABLE;
		case ft.UNAUTHENTICATED: return N.UNAUTHENTICATED;
		case ft.INVALID_ARGUMENT: return N.INVALID_ARGUMENT;
		case ft.NOT_FOUND: return N.NOT_FOUND;
		case ft.ALREADY_EXISTS: return N.ALREADY_EXISTS;
		case ft.PERMISSION_DENIED: return N.PERMISSION_DENIED;
		case ft.FAILED_PRECONDITION: return N.FAILED_PRECONDITION;
		case ft.ABORTED: return N.ABORTED;
		case ft.OUT_OF_RANGE: return N.OUT_OF_RANGE;
		case ft.UNIMPLEMENTED: return N.UNIMPLEMENTED;
		case ft.DATA_LOSS: return N.DATA_LOSS;
		default: return fail(39323, { code: e });
	}
}
(gt = ft || (ft = {}))[gt.OK = 0] = "OK", gt[gt.CANCELLED = 1] = "CANCELLED", gt[gt.UNKNOWN = 2] = "UNKNOWN", gt[gt.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", gt[gt.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", gt[gt.NOT_FOUND = 5] = "NOT_FOUND", gt[gt.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", gt[gt.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", gt[gt.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", gt[gt.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", gt[gt.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", gt[gt.ABORTED = 10] = "ABORTED", gt[gt.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", gt[gt.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", gt[gt.INTERNAL = 13] = "INTERNAL", gt[gt.UNAVAILABLE = 14] = "UNAVAILABLE", gt[gt.DATA_LOSS = 15] = "DATA_LOSS";
new Integer([4294967295, 4294967295], 0);
var JsonProtoSerializer = class {
	constructor(e, t) {
		this.databaseId = e, this.useProto3Json = t;
	}
};
function __PRIVATE_fromVersion(e) {
	return __PRIVATE_hardAssert(!!e, 49232), SnapshotVersion.fromTimestamp(function fromTimestamp(e) {
		const t = __PRIVATE_normalizeTimestamp(e);
		return new Timestamp(t.seconds, t.nanos);
	}(e));
}
function __PRIVATE_toResourcePath(e, t) {
	const n = function __PRIVATE_fullyQualifiedPrefixPath(e) {
		return new ResourcePath([
			"projects",
			e.projectId,
			"databases",
			e.database
		]);
	}(e).child("documents");
	return void 0 === t ? n : n.child(t);
}
function __PRIVATE_fromResourceName(e) {
	const t = ResourcePath.fromString(e);
	return __PRIVATE_hardAssert(__PRIVATE_isValidResourceName(t), 10190, { key: t.toString() }), t;
}
function __PRIVATE_fromQueryPath(e) {
	const t = __PRIVATE_fromResourceName(e);
	return 4 === t.length ? ResourcePath.emptyPath() : __PRIVATE_extractLocalPathFromResourceName(t);
}
function __PRIVATE_extractLocalPathFromResourceName(e) {
	return __PRIVATE_hardAssert(e.length > 4 && "documents" === e.get(4), 29091, { key: e.toString() }), e.popFirst(5);
}
function __PRIVATE_convertQueryTargetToQuery(e) {
	let t = __PRIVATE_fromQueryPath(e.parent);
	const n = e.structuredQuery;
	const r = n.from ? n.from.length : 0;
	let i = null;
	if (r > 0) {
		__PRIVATE_hardAssert(1 === r, 65062);
		const e = n.from[0];
		e.allDescendants ? i = e.collectionId : t = t.child(e.collectionId);
	}
	let s = [];
	n.where && (s = function __PRIVATE_fromFilters(e) {
		const t = __PRIVATE_fromFilter(e);
		if (t instanceof CompositeFilter && __PRIVATE_compositeFilterIsFlatConjunction(t)) return t.getFilters();
		return [t];
	}(n.where));
	let o = [];
	n.orderBy && (o = function __PRIVATE_fromOrder(e) {
		return e.map(((e) => function __PRIVATE_fromPropertyOrder(e) {
			return new OrderBy(__PRIVATE_fromFieldPathReference(e.field), function __PRIVATE_fromDirection(e) {
				switch (e) {
					case "ASCENDING": return "asc";
					case "DESCENDING": return "desc";
					default: return;
				}
			}(e.direction));
		}(e)));
	}(n.orderBy));
	let _ = null;
	n.limit && (_ = function __PRIVATE_fromInt32Proto(e) {
		let t;
		return t = "object" == typeof e ? e.value : e, __PRIVATE_isNullOrUndefined(t) ? null : t;
	}(n.limit));
	let a = null;
	n.startAt && (a = function __PRIVATE_fromStartAtCursor(e) {
		const t = !!e.before;
		return new Bound(e.values || [], t);
	}(n.startAt));
	let u = null;
	return n.endAt && (u = function __PRIVATE_fromEndAtCursor(e) {
		const t = !e.before;
		return new Bound(e.values || [], t);
	}(n.endAt)), __PRIVATE_newQuery(t, i, o, s, _, "F", a, u);
}
function __PRIVATE_fromFilter(e) {
	return void 0 !== e.unaryFilter ? function __PRIVATE_fromUnaryFilter(e) {
		switch (e.unaryFilter.op) {
			case "IS_NAN":
				const t = __PRIVATE_fromFieldPathReference(e.unaryFilter.field);
				return FieldFilter.create(t, "==", { doubleValue: NaN });
			case "IS_NULL":
				const n = __PRIVATE_fromFieldPathReference(e.unaryFilter.field);
				return FieldFilter.create(n, "==", { nullValue: "NULL_VALUE" });
			case "IS_NOT_NAN":
				const r = __PRIVATE_fromFieldPathReference(e.unaryFilter.field);
				return FieldFilter.create(r, "!=", { doubleValue: NaN });
			case "IS_NOT_NULL":
				const i = __PRIVATE_fromFieldPathReference(e.unaryFilter.field);
				return FieldFilter.create(i, "!=", { nullValue: "NULL_VALUE" });
			case "OPERATOR_UNSPECIFIED": return fail(61313);
			default: return fail(60726);
		}
	}(e) : void 0 !== e.fieldFilter ? function __PRIVATE_fromFieldFilter(e) {
		return FieldFilter.create(__PRIVATE_fromFieldPathReference(e.fieldFilter.field), function __PRIVATE_fromOperatorName(e) {
			switch (e) {
				case "EQUAL": return "==";
				case "NOT_EQUAL": return "!=";
				case "GREATER_THAN": return ">";
				case "GREATER_THAN_OR_EQUAL": return ">=";
				case "LESS_THAN": return "<";
				case "LESS_THAN_OR_EQUAL": return "<=";
				case "ARRAY_CONTAINS": return "array-contains";
				case "IN": return "in";
				case "NOT_IN": return "not-in";
				case "ARRAY_CONTAINS_ANY": return "array-contains-any";
				case "OPERATOR_UNSPECIFIED": return fail(58110);
				default: return fail(50506);
			}
		}(e.fieldFilter.op), e.fieldFilter.value);
	}(e) : void 0 !== e.compositeFilter ? function __PRIVATE_fromCompositeFilter(e) {
		return CompositeFilter.create(e.compositeFilter.filters.map(((e) => __PRIVATE_fromFilter(e))), function __PRIVATE_fromCompositeOperatorName(e) {
			switch (e) {
				case "AND": return "and";
				case "OR": return "or";
				default: return fail(1026);
			}
		}(e.compositeFilter.op));
	}(e) : fail(30097, { filter: e });
}
function __PRIVATE_fromFieldPathReference(e) {
	return FieldPath$1.fromServerFormat(e.fieldPath);
}
function __PRIVATE_isValidResourceName(e) {
	return e.length >= 4 && "projects" === e.get(0) && "databases" === e.get(2);
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var __PRIVATE_LocalSerializer = class {
	constructor(e) {
		this.gt = e;
	}
};
function __PRIVATE_fromBundledQuery(e) {
	const t = __PRIVATE_convertQueryTargetToQuery({
		parent: e.parent,
		structuredQuery: e.structuredQuery
	});
	return "LAST" === e.limitType ? __PRIVATE_queryWithLimit(t, t.limit, "L") : t;
}
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var __PRIVATE_FirestoreIndexValueWriter = class {
	constructor() {}
	bt(e, t) {
		this.Dt(e, t), t.vt();
	}
	Dt(e, t) {
		if ("nullValue" in e) this.Ct(t, 5);
		else if ("booleanValue" in e) this.Ct(t, 10), t.Ft(e.booleanValue ? 1 : 0);
		else if ("integerValue" in e) this.Ct(t, 15), t.Ft(__PRIVATE_normalizeNumber(e.integerValue));
		else if ("doubleValue" in e) {
			const n = __PRIVATE_normalizeNumber(e.doubleValue);
			isNaN(n) ? this.Ct(t, 13) : (this.Ct(t, 15), __PRIVATE_isNegativeZero(n) ? t.Ft(0) : t.Ft(n));
		} else if ("timestampValue" in e) {
			let n = e.timestampValue;
			this.Ct(t, 20), "string" == typeof n && (n = __PRIVATE_normalizeTimestamp(n)), t.Mt(`${n.seconds || ""}`), t.Ft(n.nanos || 0);
		} else if ("stringValue" in e) this.xt(e.stringValue, t), this.Ot(t);
		else if ("bytesValue" in e) this.Ct(t, 30), t.Nt(__PRIVATE_normalizeByteString(e.bytesValue)), this.Ot(t);
		else if ("referenceValue" in e) this.Bt(e.referenceValue, t);
		else if ("geoPointValue" in e) {
			const n = e.geoPointValue;
			this.Ct(t, 45), t.Ft(n.latitude || 0), t.Ft(n.longitude || 0);
		} else "mapValue" in e ? __PRIVATE_isMaxValue(e) ? this.Ct(t, Number.MAX_SAFE_INTEGER) : __PRIVATE_isVectorValue(e) ? this.Lt(e.mapValue, t) : (this.kt(e.mapValue, t), this.Ot(t)) : "arrayValue" in e ? (this.qt(e.arrayValue, t), this.Ot(t)) : fail(19022, { Qt: e });
	}
	xt(e, t) {
		this.Ct(t, 25), this.$t(e, t);
	}
	$t(e, t) {
		t.Mt(e);
	}
	kt(e, t) {
		const n = e.fields || {};
		this.Ct(t, 55);
		for (const e of Object.keys(n)) this.xt(e, t), this.Dt(n[e], t);
	}
	Lt(e, t) {
		var n;
		var r;
		const i = e.fields || {};
		this.Ct(t, 53);
		const s = Tt;
		const o = (null === (r = null === (n = i[s].arrayValue) || void 0 === n ? void 0 : n.values) || void 0 === r ? void 0 : r.length) || 0;
		this.Ct(t, 15), t.Ft(__PRIVATE_normalizeNumber(o)), this.xt(s, t), this.Dt(i[s], t);
	}
	qt(e, t) {
		const n = e.values || [];
		this.Ct(t, 50);
		for (const e of n) this.Dt(e, t);
	}
	Bt(e, t) {
		this.Ct(t, 37);
		DocumentKey.fromName(e).path.forEach(((e) => {
			this.Ct(t, 60), this.$t(e, t);
		}));
	}
	Ct(e, t) {
		e.Ft(t);
	}
	Ot(e) {
		e.Ft(2);
	}
};
__PRIVATE_FirestoreIndexValueWriter.Ut = new __PRIVATE_FirestoreIndexValueWriter();
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var __PRIVATE_MemoryIndexManager = class {
	constructor() {
		this.Dn = new __PRIVATE_MemoryCollectionParentIndex();
	}
	addToCollectionParentIndex(e, t) {
		return this.Dn.add(t), PersistencePromise.resolve();
	}
	getCollectionParents(e, t) {
		return PersistencePromise.resolve(this.Dn.getEntries(t));
	}
	addFieldIndex(e, t) {
		return PersistencePromise.resolve();
	}
	deleteFieldIndex(e, t) {
		return PersistencePromise.resolve();
	}
	deleteAllFieldIndexes(e) {
		return PersistencePromise.resolve();
	}
	createTargetIndexes(e, t) {
		return PersistencePromise.resolve();
	}
	getDocumentsMatchingTarget(e, t) {
		return PersistencePromise.resolve(null);
	}
	getIndexType(e, t) {
		return PersistencePromise.resolve(0);
	}
	getFieldIndexes(e, t) {
		return PersistencePromise.resolve([]);
	}
	getNextCollectionGroupToUpdate(e) {
		return PersistencePromise.resolve(null);
	}
	getMinOffset(e, t) {
		return PersistencePromise.resolve(IndexOffset.min());
	}
	getMinOffsetFromCollectionGroup(e, t) {
		return PersistencePromise.resolve(IndexOffset.min());
	}
	updateCollectionGroup(e, t, n) {
		return PersistencePromise.resolve();
	}
	updateIndexEntries(e, t) {
		return PersistencePromise.resolve();
	}
};
var __PRIVATE_MemoryCollectionParentIndex = class {
	constructor() {
		this.index = {};
	}
	add(e) {
		const t = e.lastSegment();
		const n = e.popLast();
		const r = this.index[t] || new SortedSet(ResourcePath.comparator);
		const i = !r.has(n);
		return this.index[t] = r.add(n), i;
	}
	has(e) {
		const t = e.lastSegment();
		const n = e.popLast();
		const r = this.index[t];
		return r && r.has(n);
	}
	getEntries(e) {
		return (this.index[e] || new SortedSet(ResourcePath.comparator)).toArray();
	}
};
new Uint8Array(0);
var Mt = 41943040;
var LruParams = class LruParams {
	static withCacheSize(e) {
		return new LruParams(e, LruParams.DEFAULT_COLLECTION_PERCENTILE, LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT);
	}
	constructor(e, t, n) {
		this.cacheSizeCollectionThreshold = e, this.percentileToCollect = t, this.maximumSequenceNumbersToCollect = n;
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
LruParams.DEFAULT_COLLECTION_PERCENTILE = 10, LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3, LruParams.DEFAULT = new LruParams(Mt, LruParams.DEFAULT_COLLECTION_PERCENTILE, LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT), LruParams.DISABLED = new LruParams(-1, 0, 0);
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var __PRIVATE_TargetIdGenerator = class __PRIVATE_TargetIdGenerator {
	constructor(e) {
		this._r = e;
	}
	next() {
		return this._r += 2, this._r;
	}
	static ar() {
		return new __PRIVATE_TargetIdGenerator(0);
	}
	static ur() {
		return new __PRIVATE_TargetIdGenerator(-1);
	}
};
var Ot = 1048576;
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var RemoteDocumentChangeBuffer = class {
	constructor() {
		this.changes = new ObjectMap(((e) => e.toString()), ((e, t) => e.isEqual(t))), this.changesApplied = !1;
	}
	addEntry(e) {
		this.assertNotApplied(), this.changes.set(e.key, e);
	}
	removeEntry(e, t) {
		this.assertNotApplied(), this.changes.set(e, MutableDocument.newInvalidDocument(e).setReadTime(t));
	}
	getEntry(e, t) {
		this.assertNotApplied();
		const n = this.changes.get(t);
		return void 0 !== n ? PersistencePromise.resolve(n) : this.getFromCache(e, t);
	}
	getEntries(e, t) {
		return this.getAllFromCache(e, t);
	}
	apply(e) {
		return this.assertNotApplied(), this.changesApplied = !0, this.applyChanges(e);
	}
	assertNotApplied() {}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var OverlayedDocument = class {
	constructor(e, t) {
		this.overlayedDocument = e, this.mutatedFields = t;
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var LocalDocumentsView = class {
	constructor(e, t, n, r) {
		this.remoteDocumentCache = e, this.mutationQueue = t, this.documentOverlayCache = n, this.indexManager = r;
	}
	getDocument(e, t) {
		let n = null;
		return this.documentOverlayCache.getOverlay(e, t).next(((r) => (n = r, this.remoteDocumentCache.getEntry(e, t)))).next(((e) => (null !== n && __PRIVATE_mutationApplyToLocalView(n.mutation, e, FieldMask.empty(), Timestamp.now()), e)));
	}
	getDocuments(e, t) {
		return this.remoteDocumentCache.getEntries(e, t).next(((t) => this.getLocalViewOfDocuments(e, t, __PRIVATE_documentKeySet()).next((() => t))));
	}
	getLocalViewOfDocuments(e, t, n = __PRIVATE_documentKeySet()) {
		const r = __PRIVATE_newOverlayMap();
		return this.populateOverlays(e, r, t).next((() => this.computeViews(e, t, r, n).next(((e) => {
			let t = documentMap();
			return e.forEach(((e, n) => {
				t = t.insert(e, n.overlayedDocument);
			})), t;
		}))));
	}
	getOverlayedDocuments(e, t) {
		const n = __PRIVATE_newOverlayMap();
		return this.populateOverlays(e, n, t).next((() => this.computeViews(e, t, n, __PRIVATE_documentKeySet())));
	}
	populateOverlays(e, t, n) {
		const r = [];
		return n.forEach(((e) => {
			t.has(e) || r.push(e);
		})), this.documentOverlayCache.getOverlays(e, r).next(((e) => {
			e.forEach(((e, n) => {
				t.set(e, n);
			}));
		}));
	}
	computeViews(e, t, n, r) {
		let i = __PRIVATE_mutableDocumentMap();
		const s = __PRIVATE_newDocumentKeyMap();
		const o = function __PRIVATE_newOverlayedDocumentMap() {
			return __PRIVATE_newDocumentKeyMap();
		}();
		return t.forEach(((e, t) => {
			const o = n.get(t.key);
			r.has(t.key) && (void 0 === o || o.mutation instanceof __PRIVATE_PatchMutation) ? i = i.insert(t.key, t) : void 0 !== o ? (s.set(t.key, o.mutation.getFieldMask()), __PRIVATE_mutationApplyToLocalView(o.mutation, t, o.mutation.getFieldMask(), Timestamp.now())) : s.set(t.key, FieldMask.empty());
		})), this.recalculateAndSaveOverlays(e, i).next(((e) => (e.forEach(((e, t) => s.set(e, t))), t.forEach(((e, t) => {
			var n;
			return o.set(e, new OverlayedDocument(t, null !== (n = s.get(e)) && void 0 !== n ? n : null));
		})), o)));
	}
	recalculateAndSaveOverlays(e, t) {
		const n = __PRIVATE_newDocumentKeyMap();
		let r = new SortedMap(((e, t) => e - t));
		let i = __PRIVATE_documentKeySet();
		return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e, t).next(((e) => {
			for (const i of e) i.keys().forEach(((e) => {
				const s = t.get(e);
				if (null === s) return;
				let o = n.get(e) || FieldMask.empty();
				o = i.applyToLocalView(s, o), n.set(e, o);
				const _ = (r.get(i.batchId) || __PRIVATE_documentKeySet()).add(e);
				r = r.insert(i.batchId, _);
			}));
		})).next((() => {
			const s = [];
			const o = r.getReverseIterator();
			for (; o.hasNext();) {
				const r = o.getNext();
				const _ = r.key;
				const a = r.value;
				const u = __PRIVATE_newMutationMap();
				a.forEach(((e) => {
					if (!i.has(e)) {
						const r = __PRIVATE_calculateOverlayMutation(t.get(e), n.get(e));
						null !== r && u.set(e, r), i = i.add(e);
					}
				})), s.push(this.documentOverlayCache.saveOverlays(e, _, u));
			}
			return PersistencePromise.waitFor(s);
		})).next((() => n));
	}
	recalculateAndSaveOverlaysForDocumentKeys(e, t) {
		return this.remoteDocumentCache.getEntries(e, t).next(((t) => this.recalculateAndSaveOverlays(e, t)));
	}
	getDocumentsMatchingQuery(e, t, n, r) {
		return function __PRIVATE_isDocumentQuery$1(e) {
			return DocumentKey.isDocumentKey(e.path) && null === e.collectionGroup && 0 === e.filters.length;
		}(t) ? this.getDocumentsMatchingDocumentQuery(e, t.path) : __PRIVATE_isCollectionGroupQuery(t) ? this.getDocumentsMatchingCollectionGroupQuery(e, t, n, r) : this.getDocumentsMatchingCollectionQuery(e, t, n, r);
	}
	getNextDocuments(e, t, n, r) {
		return this.remoteDocumentCache.getAllFromCollectionGroup(e, t, n, r).next(((i) => {
			const s = r - i.size > 0 ? this.documentOverlayCache.getOverlaysForCollectionGroup(e, t, n.largestBatchId, r - i.size) : PersistencePromise.resolve(__PRIVATE_newOverlayMap());
			let o = Q;
			let _ = i;
			return s.next(((t) => PersistencePromise.forEach(t, ((t, n) => (o < n.largestBatchId && (o = n.largestBatchId), i.get(t) ? PersistencePromise.resolve() : this.remoteDocumentCache.getEntry(e, t).next(((e) => {
				_ = _.insert(t, e);
			}))))).next((() => this.populateOverlays(e, t, i))).next((() => this.computeViews(e, _, t, __PRIVATE_documentKeySet()))).next(((e) => ({
				batchId: o,
				changes: __PRIVATE_convertOverlayedDocumentMapToDocumentMap(e)
			})))));
		}));
	}
	getDocumentsMatchingDocumentQuery(e, t) {
		return this.getDocument(e, new DocumentKey(t)).next(((e) => {
			let t = documentMap();
			return e.isFoundDocument() && (t = t.insert(e.key, e)), t;
		}));
	}
	getDocumentsMatchingCollectionGroupQuery(e, t, n, r) {
		const i = t.collectionGroup;
		let s = documentMap();
		return this.indexManager.getCollectionParents(e, i).next(((o) => PersistencePromise.forEach(o, ((o) => {
			const _ = function __PRIVATE_asCollectionQueryAtPath(e, t) {
				return new __PRIVATE_QueryImpl(t, null, e.explicitOrderBy.slice(), e.filters.slice(), e.limit, e.limitType, e.startAt, e.endAt);
			}(t, o.child(i));
			return this.getDocumentsMatchingCollectionQuery(e, _, n, r).next(((e) => {
				e.forEach(((e, t) => {
					s = s.insert(e, t);
				}));
			}));
		})).next((() => s))));
	}
	getDocumentsMatchingCollectionQuery(e, t, n, r) {
		let i;
		return this.documentOverlayCache.getOverlaysForCollection(e, t.path, n.largestBatchId).next(((s) => (i = s, this.remoteDocumentCache.getDocumentsMatchingQuery(e, t, n, i, r)))).next(((e) => {
			i.forEach(((t, n) => {
				const r = n.getKey();
				null === e.get(r) && (e = e.insert(r, MutableDocument.newInvalidDocument(r)));
			}));
			let n = documentMap();
			return e.forEach(((e, r) => {
				const s = i.get(e);
				void 0 !== s && __PRIVATE_mutationApplyToLocalView(s.mutation, r, FieldMask.empty(), Timestamp.now()), __PRIVATE_queryMatches(t, r) && (n = n.insert(e, r));
			})), n;
		}));
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/ var __PRIVATE_MemoryBundleCache = class {
	constructor(e) {
		this.serializer = e, this.Br = /* @__PURE__ */ new Map(), this.Lr = /* @__PURE__ */ new Map();
	}
	getBundleMetadata(e, t) {
		return PersistencePromise.resolve(this.Br.get(t));
	}
	saveBundleMetadata(e, t) {
		return this.Br.set(t.id, function __PRIVATE_fromBundleMetadata(e) {
			return {
				id: e.id,
				version: e.version,
				createTime: __PRIVATE_fromVersion(e.createTime)
			};
		}(t)), PersistencePromise.resolve();
	}
	getNamedQuery(e, t) {
		return PersistencePromise.resolve(this.Lr.get(t));
	}
	saveNamedQuery(e, t) {
		return this.Lr.set(t.name, function __PRIVATE_fromProtoNamedQuery(e) {
			return {
				name: e.name,
				query: __PRIVATE_fromBundledQuery(e.bundledQuery),
				readTime: __PRIVATE_fromVersion(e.readTime)
			};
		}(t)), PersistencePromise.resolve();
	}
};
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var __PRIVATE_MemoryDocumentOverlayCache = class {
	constructor() {
		this.overlays = new SortedMap(DocumentKey.comparator), this.kr = /* @__PURE__ */ new Map();
	}
	getOverlay(e, t) {
		return PersistencePromise.resolve(this.overlays.get(t));
	}
	getOverlays(e, t) {
		const n = __PRIVATE_newOverlayMap();
		return PersistencePromise.forEach(t, ((t) => this.getOverlay(e, t).next(((e) => {
			null !== e && n.set(t, e);
		})))).next((() => n));
	}
	saveOverlays(e, t, n) {
		return n.forEach(((n, r) => {
			this.wt(e, t, r);
		})), PersistencePromise.resolve();
	}
	removeOverlaysForBatchId(e, t, n) {
		const r = this.kr.get(n);
		return void 0 !== r && (r.forEach(((e) => this.overlays = this.overlays.remove(e))), this.kr.delete(n)), PersistencePromise.resolve();
	}
	getOverlaysForCollection(e, t, n) {
		const r = __PRIVATE_newOverlayMap();
		const i = t.length + 1;
		const s = new DocumentKey(t.child(""));
		const o = this.overlays.getIteratorFrom(s);
		for (; o.hasNext();) {
			const e = o.getNext().value;
			const s = e.getKey();
			if (!t.isPrefixOf(s.path)) break;
			s.path.length === i && e.largestBatchId > n && r.set(e.getKey(), e);
		}
		return PersistencePromise.resolve(r);
	}
	getOverlaysForCollectionGroup(e, t, n, r) {
		let i = new SortedMap(((e, t) => e - t));
		const s = this.overlays.getIterator();
		for (; s.hasNext();) {
			const e = s.getNext().value;
			if (e.getKey().getCollectionGroup() === t && e.largestBatchId > n) {
				let t = i.get(e.largestBatchId);
				null === t && (t = __PRIVATE_newOverlayMap(), i = i.insert(e.largestBatchId, t)), t.set(e.getKey(), e);
			}
		}
		const o = __PRIVATE_newOverlayMap();
		const _ = i.getIterator();
		for (; _.hasNext();) if (_.getNext().value.forEach(((e, t) => o.set(e, t))), o.size() >= r) break;
		return PersistencePromise.resolve(o);
	}
	wt(e, t, n) {
		const r = this.overlays.get(n.key);
		if (null !== r) {
			const e = this.kr.get(r.largestBatchId).delete(n.key);
			this.kr.set(r.largestBatchId, e);
		}
		this.overlays = this.overlays.insert(n.key, new Overlay(t, n));
		let i = this.kr.get(t);
		void 0 === i && (i = __PRIVATE_documentKeySet(), this.kr.set(t, i)), this.kr.set(t, i.add(n.key));
	}
};
/**
* @license
* Copyright 2024 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/ var __PRIVATE_MemoryGlobalsCache = class {
	constructor() {
		this.sessionToken = ByteString.EMPTY_BYTE_STRING;
	}
	getSessionToken(e) {
		return PersistencePromise.resolve(this.sessionToken);
	}
	setSessionToken(e, t) {
		return this.sessionToken = t, PersistencePromise.resolve();
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var __PRIVATE_ReferenceSet = class {
	constructor() {
		this.qr = new SortedSet(__PRIVATE_DocReference.Qr), this.$r = new SortedSet(__PRIVATE_DocReference.Ur);
	}
	isEmpty() {
		return this.qr.isEmpty();
	}
	addReference(e, t) {
		const n = new __PRIVATE_DocReference(e, t);
		this.qr = this.qr.add(n), this.$r = this.$r.add(n);
	}
	Kr(e, t) {
		e.forEach(((e) => this.addReference(e, t)));
	}
	removeReference(e, t) {
		this.Wr(new __PRIVATE_DocReference(e, t));
	}
	Gr(e, t) {
		e.forEach(((e) => this.removeReference(e, t)));
	}
	zr(e) {
		const t = new DocumentKey(new ResourcePath([]));
		const n = new __PRIVATE_DocReference(t, e);
		const r = new __PRIVATE_DocReference(t, e + 1);
		const i = [];
		return this.$r.forEachInRange([n, r], ((e) => {
			this.Wr(e), i.push(e.key);
		})), i;
	}
	jr() {
		this.qr.forEach(((e) => this.Wr(e)));
	}
	Wr(e) {
		this.qr = this.qr.delete(e), this.$r = this.$r.delete(e);
	}
	Jr(e) {
		const t = new DocumentKey(new ResourcePath([]));
		const n = new __PRIVATE_DocReference(t, e);
		const r = new __PRIVATE_DocReference(t, e + 1);
		let i = __PRIVATE_documentKeySet();
		return this.$r.forEachInRange([n, r], ((e) => {
			i = i.add(e.key);
		})), i;
	}
	containsKey(e) {
		const t = new __PRIVATE_DocReference(e, 0);
		const n = this.qr.firstAfterOrEqual(t);
		return null !== n && e.isEqual(n.key);
	}
};
var __PRIVATE_DocReference = class {
	constructor(e, t) {
		this.key = e, this.Hr = t;
	}
	static Qr(e, t) {
		return DocumentKey.comparator(e.key, t.key) || __PRIVATE_primitiveComparator(e.Hr, t.Hr);
	}
	static Ur(e, t) {
		return __PRIVATE_primitiveComparator(e.Hr, t.Hr) || DocumentKey.comparator(e.key, t.key);
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/ var __PRIVATE_MemoryMutationQueue = class {
	constructor(e, t) {
		this.indexManager = e, this.referenceDelegate = t, this.mutationQueue = [], this.er = 1, this.Yr = new SortedSet(__PRIVATE_DocReference.Qr);
	}
	checkEmpty(e) {
		return PersistencePromise.resolve(0 === this.mutationQueue.length);
	}
	addMutationBatch(e, t, n, r) {
		const i = this.er;
		this.er++, this.mutationQueue.length > 0 && this.mutationQueue[this.mutationQueue.length - 1];
		const s = new MutationBatch(i, t, n, r);
		this.mutationQueue.push(s);
		for (const t of r) this.Yr = this.Yr.add(new __PRIVATE_DocReference(t.key, i)), this.indexManager.addToCollectionParentIndex(e, t.key.path.popLast());
		return PersistencePromise.resolve(s);
	}
	lookupMutationBatch(e, t) {
		return PersistencePromise.resolve(this.Zr(t));
	}
	getNextMutationBatchAfterBatchId(e, t) {
		const n = t + 1;
		const r = this.Xr(n);
		const i = r < 0 ? 0 : r;
		return PersistencePromise.resolve(this.mutationQueue.length > i ? this.mutationQueue[i] : null);
	}
	getHighestUnacknowledgedBatchId() {
		return PersistencePromise.resolve(0 === this.mutationQueue.length ? G : this.er - 1);
	}
	getAllMutationBatches(e) {
		return PersistencePromise.resolve(this.mutationQueue.slice());
	}
	getAllMutationBatchesAffectingDocumentKey(e, t) {
		const n = new __PRIVATE_DocReference(t, 0);
		const r = new __PRIVATE_DocReference(t, Number.POSITIVE_INFINITY);
		const i = [];
		return this.Yr.forEachInRange([n, r], ((e) => {
			const t = this.Zr(e.Hr);
			i.push(t);
		})), PersistencePromise.resolve(i);
	}
	getAllMutationBatchesAffectingDocumentKeys(e, t) {
		let n = new SortedSet(__PRIVATE_primitiveComparator);
		return t.forEach(((e) => {
			const t = new __PRIVATE_DocReference(e, 0);
			const r = new __PRIVATE_DocReference(e, Number.POSITIVE_INFINITY);
			this.Yr.forEachInRange([t, r], ((e) => {
				n = n.add(e.Hr);
			}));
		})), PersistencePromise.resolve(this.ei(n));
	}
	getAllMutationBatchesAffectingQuery(e, t) {
		const n = t.path;
		const r = n.length + 1;
		let i = n;
		DocumentKey.isDocumentKey(i) || (i = i.child(""));
		const s = new __PRIVATE_DocReference(new DocumentKey(i), 0);
		let o = new SortedSet(__PRIVATE_primitiveComparator);
		return this.Yr.forEachWhile(((e) => {
			const t = e.key.path;
			return !!n.isPrefixOf(t) && (t.length === r && (o = o.add(e.Hr)), !0);
		}), s), PersistencePromise.resolve(this.ei(o));
	}
	ei(e) {
		const t = [];
		return e.forEach(((e) => {
			const n = this.Zr(e);
			null !== n && t.push(n);
		})), t;
	}
	removeMutationBatch(e, t) {
		__PRIVATE_hardAssert(0 === this.ti(t.batchId, "removed"), 55003), this.mutationQueue.shift();
		let n = this.Yr;
		return PersistencePromise.forEach(t.mutations, ((r) => {
			const i = new __PRIVATE_DocReference(r.key, t.batchId);
			return n = n.delete(i), this.referenceDelegate.markPotentiallyOrphaned(e, r.key);
		})).next((() => {
			this.Yr = n;
		}));
	}
	rr(e) {}
	containsKey(e, t) {
		const n = new __PRIVATE_DocReference(t, 0);
		const r = this.Yr.firstAfterOrEqual(n);
		return PersistencePromise.resolve(t.isEqual(r && r.key));
	}
	performConsistencyCheck(e) {
		return this.mutationQueue.length, PersistencePromise.resolve();
	}
	ti(e, t) {
		return this.Xr(e);
	}
	Xr(e) {
		if (0 === this.mutationQueue.length) return 0;
		return e - this.mutationQueue[0].batchId;
	}
	Zr(e) {
		const t = this.Xr(e);
		if (t < 0 || t >= this.mutationQueue.length) return null;
		return this.mutationQueue[t];
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var __PRIVATE_MemoryRemoteDocumentCacheImpl = class {
	constructor(e) {
		this.ni = e, this.docs = function __PRIVATE_documentEntryMap() {
			return new SortedMap(DocumentKey.comparator);
		}(), this.size = 0;
	}
	setIndexManager(e) {
		this.indexManager = e;
	}
	addEntry(e, t) {
		const n = t.key;
		const r = this.docs.get(n);
		const i = r ? r.size : 0;
		const s = this.ni(t);
		return this.docs = this.docs.insert(n, {
			document: t.mutableCopy(),
			size: s
		}), this.size += s - i, this.indexManager.addToCollectionParentIndex(e, n.path.popLast());
	}
	removeEntry(e) {
		const t = this.docs.get(e);
		t && (this.docs = this.docs.remove(e), this.size -= t.size);
	}
	getEntry(e, t) {
		const n = this.docs.get(t);
		return PersistencePromise.resolve(n ? n.document.mutableCopy() : MutableDocument.newInvalidDocument(t));
	}
	getEntries(e, t) {
		let n = __PRIVATE_mutableDocumentMap();
		return t.forEach(((e) => {
			const t = this.docs.get(e);
			n = n.insert(e, t ? t.document.mutableCopy() : MutableDocument.newInvalidDocument(e));
		})), PersistencePromise.resolve(n);
	}
	getDocumentsMatchingQuery(e, t, n, r) {
		let i = __PRIVATE_mutableDocumentMap();
		const s = t.path;
		const o = new DocumentKey(s.child("__id-9223372036854775808__"));
		const _ = this.docs.getIteratorFrom(o);
		for (; _.hasNext();) {
			const { key: e, value: { document: o } } = _.getNext();
			if (!s.isPrefixOf(e.path)) break;
			e.path.length > s.length + 1 || __PRIVATE_indexOffsetComparator(__PRIVATE_newIndexOffsetFromDocument(o), n) <= 0 || (r.has(o.key) || __PRIVATE_queryMatches(t, o)) && (i = i.insert(o.key, o.mutableCopy()));
		}
		return PersistencePromise.resolve(i);
	}
	getAllFromCollectionGroup(e, t, n, r) {
		fail(9500);
	}
	ri(e, t) {
		return PersistencePromise.forEach(this.docs, ((e) => t(e)));
	}
	newChangeBuffer(e) {
		return new __PRIVATE_MemoryRemoteDocumentChangeBuffer(this);
	}
	getSize(e) {
		return PersistencePromise.resolve(this.size);
	}
};
var __PRIVATE_MemoryRemoteDocumentChangeBuffer = class extends RemoteDocumentChangeBuffer {
	constructor(e) {
		super(), this.Or = e;
	}
	applyChanges(e) {
		const t = [];
		return this.changes.forEach(((n, r) => {
			r.isValidDocument() ? t.push(this.Or.addEntry(e, r)) : this.Or.removeEntry(n);
		})), PersistencePromise.waitFor(t);
	}
	getFromCache(e, t) {
		return this.Or.getEntry(e, t);
	}
	getAllFromCache(e, t) {
		return this.Or.getEntries(e, t);
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/ var __PRIVATE_MemoryTargetCache = class {
	constructor(e) {
		this.persistence = e, this.ii = new ObjectMap(((e) => __PRIVATE_canonifyTarget(e)), __PRIVATE_targetEquals), this.lastRemoteSnapshotVersion = SnapshotVersion.min(), this.highestTargetId = 0, this.si = 0, this.oi = new __PRIVATE_ReferenceSet(), this.targetCount = 0, this._i = __PRIVATE_TargetIdGenerator.ar();
	}
	forEachTarget(e, t) {
		return this.ii.forEach(((e, n) => t(n))), PersistencePromise.resolve();
	}
	getLastRemoteSnapshotVersion(e) {
		return PersistencePromise.resolve(this.lastRemoteSnapshotVersion);
	}
	getHighestSequenceNumber(e) {
		return PersistencePromise.resolve(this.si);
	}
	allocateTargetId(e) {
		return this.highestTargetId = this._i.next(), PersistencePromise.resolve(this.highestTargetId);
	}
	setTargetsMetadata(e, t, n) {
		return n && (this.lastRemoteSnapshotVersion = n), t > this.si && (this.si = t), PersistencePromise.resolve();
	}
	hr(e) {
		this.ii.set(e.target, e);
		const t = e.targetId;
		t > this.highestTargetId && (this._i = new __PRIVATE_TargetIdGenerator(t), this.highestTargetId = t), e.sequenceNumber > this.si && (this.si = e.sequenceNumber);
	}
	addTargetData(e, t) {
		return this.hr(t), this.targetCount += 1, PersistencePromise.resolve();
	}
	updateTargetData(e, t) {
		return this.hr(t), PersistencePromise.resolve();
	}
	removeTargetData(e, t) {
		return this.ii.delete(t.target), this.oi.zr(t.targetId), this.targetCount -= 1, PersistencePromise.resolve();
	}
	removeTargets(e, t, n) {
		let r = 0;
		const i = [];
		return this.ii.forEach(((s, o) => {
			o.sequenceNumber <= t && null === n.get(o.targetId) && (this.ii.delete(s), i.push(this.removeMatchingKeysForTargetId(e, o.targetId)), r++);
		})), PersistencePromise.waitFor(i).next((() => r));
	}
	getTargetCount(e) {
		return PersistencePromise.resolve(this.targetCount);
	}
	getTargetData(e, t) {
		const n = this.ii.get(t) || null;
		return PersistencePromise.resolve(n);
	}
	addMatchingKeys(e, t, n) {
		return this.oi.Kr(t, n), PersistencePromise.resolve();
	}
	removeMatchingKeys(e, t, n) {
		this.oi.Gr(t, n);
		const r = this.persistence.referenceDelegate;
		const i = [];
		return r && t.forEach(((t) => {
			i.push(r.markPotentiallyOrphaned(e, t));
		})), PersistencePromise.waitFor(i);
	}
	removeMatchingKeysForTargetId(e, t) {
		return this.oi.zr(t), PersistencePromise.resolve();
	}
	getMatchingKeysForTargetId(e, t) {
		const n = this.oi.Jr(t);
		return PersistencePromise.resolve(n);
	}
	containsKey(e, t) {
		return PersistencePromise.resolve(this.oi.containsKey(t));
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var __PRIVATE_MemoryPersistence = class {
	constructor(e, t) {
		this.ai = {}, this.overlays = {}, this.ui = new __PRIVATE_ListenSequence(0), this.ci = !1, this.ci = !0, this.li = new __PRIVATE_MemoryGlobalsCache(), this.referenceDelegate = e(this), this.hi = new __PRIVATE_MemoryTargetCache(this);
		this.indexManager = new __PRIVATE_MemoryIndexManager(), this.remoteDocumentCache = function __PRIVATE_newMemoryRemoteDocumentCache(e) {
			return new __PRIVATE_MemoryRemoteDocumentCacheImpl(e);
		}(((e) => this.referenceDelegate.Pi(e))), this.serializer = new __PRIVATE_LocalSerializer(t), this.Ti = new __PRIVATE_MemoryBundleCache(this.serializer);
	}
	start() {
		return Promise.resolve();
	}
	shutdown() {
		return this.ci = !1, Promise.resolve();
	}
	get started() {
		return this.ci;
	}
	setDatabaseDeletedListener() {}
	setNetworkEnabled() {}
	getIndexManager(e) {
		return this.indexManager;
	}
	getDocumentOverlayCache(e) {
		let t = this.overlays[e.toKey()];
		return t || (t = new __PRIVATE_MemoryDocumentOverlayCache(), this.overlays[e.toKey()] = t), t;
	}
	getMutationQueue(e, t) {
		let n = this.ai[e.toKey()];
		return n || (n = new __PRIVATE_MemoryMutationQueue(t, this.referenceDelegate), this.ai[e.toKey()] = n), n;
	}
	getGlobalsCache() {
		return this.li;
	}
	getTargetCache() {
		return this.hi;
	}
	getRemoteDocumentCache() {
		return this.remoteDocumentCache;
	}
	getBundleCache() {
		return this.Ti;
	}
	runTransaction(e, t, n) {
		__PRIVATE_logDebug("MemoryPersistence", "Starting transaction:", e);
		const r = new __PRIVATE_MemoryTransaction(this.ui.next());
		return this.referenceDelegate.Ii(), n(r).next(((e) => this.referenceDelegate.di(r).next((() => e)))).toPromise().then(((e) => (r.raiseOnCommittedEvent(), e)));
	}
	Ei(e, t) {
		return PersistencePromise.or(Object.values(this.ai).map(((n) => () => n.containsKey(e, t))));
	}
};
var __PRIVATE_MemoryTransaction = class extends PersistenceTransaction {
	constructor(e) {
		super(), this.currentSequenceNumber = e;
	}
};
var __PRIVATE_MemoryEagerDelegate = class __PRIVATE_MemoryEagerDelegate {
	constructor(e) {
		this.persistence = e, this.Ai = new __PRIVATE_ReferenceSet(), this.Ri = null;
	}
	static Vi(e) {
		return new __PRIVATE_MemoryEagerDelegate(e);
	}
	get mi() {
		if (this.Ri) return this.Ri;
		throw fail(60996);
	}
	addReference(e, t, n) {
		return this.Ai.addReference(n, t), this.mi.delete(n.toString()), PersistencePromise.resolve();
	}
	removeReference(e, t, n) {
		return this.Ai.removeReference(n, t), this.mi.add(n.toString()), PersistencePromise.resolve();
	}
	markPotentiallyOrphaned(e, t) {
		return this.mi.add(t.toString()), PersistencePromise.resolve();
	}
	removeTarget(e, t) {
		this.Ai.zr(t.targetId).forEach(((e) => this.mi.add(e.toString())));
		const n = this.persistence.getTargetCache();
		return n.getMatchingKeysForTargetId(e, t.targetId).next(((e) => {
			e.forEach(((e) => this.mi.add(e.toString())));
		})).next((() => n.removeTargetData(e, t)));
	}
	Ii() {
		this.Ri = /* @__PURE__ */ new Set();
	}
	di(e) {
		const t = this.persistence.getRemoteDocumentCache().newChangeBuffer();
		return PersistencePromise.forEach(this.mi, ((n) => {
			const r = DocumentKey.fromPath(n);
			return this.fi(e, r).next(((e) => {
				e || t.removeEntry(r, SnapshotVersion.min());
			}));
		})).next((() => (this.Ri = null, t.apply(e))));
	}
	updateLimboDocument(e, t) {
		return this.fi(e, t).next(((e) => {
			e ? this.mi.delete(t.toString()) : this.mi.add(t.toString());
		}));
	}
	Pi(e) {
		return 0;
	}
	fi(e, t) {
		return PersistencePromise.or([
			() => PersistencePromise.resolve(this.Ai.containsKey(t)),
			() => this.persistence.getTargetCache().containsKey(e, t),
			() => this.persistence.Ei(e, t)
		]);
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var __PRIVATE_LocalViewChanges = class __PRIVATE_LocalViewChanges {
	constructor(e, t, n, r) {
		this.targetId = e, this.fromCache = t, this.Is = n, this.ds = r;
	}
	static Es(e, t) {
		let n = __PRIVATE_documentKeySet();
		let r = __PRIVATE_documentKeySet();
		for (const e of t.docChanges) switch (e.type) {
			case 0:
				n = n.add(e.doc.key);
				break;
			case 1: r = r.add(e.doc.key);
		}
		return new __PRIVATE_LocalViewChanges(e, t.fromCache, n, r);
	}
};
/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var QueryContext = class {
	constructor() {
		this._documentReadCount = 0;
	}
	get documentReadCount() {
		return this._documentReadCount;
	}
	incrementDocumentReadCount(e) {
		this._documentReadCount += e;
	}
};
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var __PRIVATE_QueryEngine = class {
	constructor() {
		this.As = !1, this.Rs = !1, this.Vs = 100, this.fs = function __PRIVATE_getDefaultRelativeIndexReadCostPerDocument() {
			return isSafari() ? 8 : __PRIVATE_getAndroidVersion(getUA()) > 0 ? 6 : 4;
		}();
	}
	initialize(e, t) {
		this.gs = e, this.indexManager = t, this.As = !0;
	}
	getDocumentsMatchingQuery(e, t, n, r) {
		const i = { result: null };
		return this.ps(e, t).next(((e) => {
			i.result = e;
		})).next((() => {
			if (!i.result) return this.ys(e, t, r, n).next(((e) => {
				i.result = e;
			}));
		})).next((() => {
			if (i.result) return;
			const n = new QueryContext();
			return this.ws(e, t, n).next(((r) => {
				if (i.result = r, this.Rs) return this.Ss(e, t, n, r.size);
			}));
		})).next((() => i.result));
	}
	Ss(e, t, n, r) {
		return n.documentReadCount < this.Vs ? (__PRIVATE_getLogLevel() <= LogLevel.DEBUG && __PRIVATE_logDebug("QueryEngine", "SDK will not create cache indexes for query:", __PRIVATE_stringifyQuery(t), "since it only creates cache indexes for collection contains", "more than or equal to", this.Vs, "documents"), PersistencePromise.resolve()) : (__PRIVATE_getLogLevel() <= LogLevel.DEBUG && __PRIVATE_logDebug("QueryEngine", "Query:", __PRIVATE_stringifyQuery(t), "scans", n.documentReadCount, "local documents and returns", r, "documents as results."), n.documentReadCount > this.fs * r ? (__PRIVATE_getLogLevel() <= LogLevel.DEBUG && __PRIVATE_logDebug("QueryEngine", "The SDK decides to create cache indexes for query:", __PRIVATE_stringifyQuery(t), "as using cache indexes may help improve performance."), this.indexManager.createTargetIndexes(e, __PRIVATE_queryToTarget(t))) : PersistencePromise.resolve());
	}
	ps(e, t) {
		if (__PRIVATE_queryMatchesAllDocuments(t)) return PersistencePromise.resolve(null);
		let n = __PRIVATE_queryToTarget(t);
		return this.indexManager.getIndexType(e, n).next(((r) => 0 === r ? null : (null !== t.limit && 1 === r && (t = __PRIVATE_queryWithLimit(t, null, "F"), n = __PRIVATE_queryToTarget(t)), this.indexManager.getDocumentsMatchingTarget(e, n).next(((r) => {
			const i = __PRIVATE_documentKeySet(...r);
			return this.gs.getDocuments(e, i).next(((r) => this.indexManager.getMinOffset(e, n).next(((n) => {
				const s = this.bs(t, r);
				return this.Ds(t, s, i, n.readTime) ? this.ps(e, __PRIVATE_queryWithLimit(t, null, "F")) : this.vs(e, s, t, n);
			}))));
		})))));
	}
	ys(e, t, n, r) {
		return __PRIVATE_queryMatchesAllDocuments(t) || r.isEqual(SnapshotVersion.min()) ? PersistencePromise.resolve(null) : this.gs.getDocuments(e, n).next(((i) => {
			const s = this.bs(t, i);
			return this.Ds(t, s, n, r) ? PersistencePromise.resolve(null) : (__PRIVATE_getLogLevel() <= LogLevel.DEBUG && __PRIVATE_logDebug("QueryEngine", "Re-using previous result from %s to execute query: %s", r.toString(), __PRIVATE_stringifyQuery(t)), this.vs(e, s, t, __PRIVATE_newIndexOffsetSuccessorFromReadTime(r, Q)).next(((e) => e)));
		}));
	}
	bs(e, t) {
		let n = new SortedSet(__PRIVATE_newQueryComparator(e));
		return t.forEach(((t, r) => {
			__PRIVATE_queryMatches(e, r) && (n = n.add(r));
		})), n;
	}
	Ds(e, t, n, r) {
		if (null === e.limit) return !1;
		if (n.size !== t.size) return !0;
		const i = "F" === e.limitType ? t.last() : t.first();
		return !!i && (i.hasPendingWrites || i.version.compareTo(r) > 0);
	}
	ws(e, t, n) {
		return __PRIVATE_getLogLevel() <= LogLevel.DEBUG && __PRIVATE_logDebug("QueryEngine", "Using full collection scan to execute query:", __PRIVATE_stringifyQuery(t)), this.gs.getDocumentsMatchingQuery(e, t, IndexOffset.min(), n);
	}
	vs(e, t, n, r) {
		return this.gs.getDocumentsMatchingQuery(e, n, r).next(((e) => (t.forEach(((t) => {
			e = e.insert(t.key, t);
		})), e)));
	}
};
var Qt = "LocalStore";
var __PRIVATE_LocalStoreImpl = class {
	constructor(e, t, n, r) {
		this.persistence = e, this.Cs = t, this.serializer = r, this.Fs = new SortedMap(__PRIVATE_primitiveComparator), this.Ms = new ObjectMap(((e) => __PRIVATE_canonifyTarget(e)), __PRIVATE_targetEquals), this.xs = /* @__PURE__ */ new Map(), this.Os = e.getRemoteDocumentCache(), this.hi = e.getTargetCache(), this.Ti = e.getBundleCache(), this.Ns(n);
	}
	Ns(e) {
		this.documentOverlayCache = this.persistence.getDocumentOverlayCache(e), this.indexManager = this.persistence.getIndexManager(e), this.mutationQueue = this.persistence.getMutationQueue(e, this.indexManager), this.localDocuments = new LocalDocumentsView(this.Os, this.mutationQueue, this.documentOverlayCache, this.indexManager), this.Os.setIndexManager(this.indexManager), this.Cs.initialize(this.localDocuments, this.indexManager);
	}
	collectGarbage(e) {
		return this.persistence.runTransaction("Collect garbage", "readwrite-primary", ((t) => e.collect(t, this.Fs)));
	}
};
function __PRIVATE_newLocalStore(e, t, n, r) {
	return new __PRIVATE_LocalStoreImpl(e, t, n, r);
}
async function __PRIVATE_localStoreHandleUserChange(e, t) {
	const n = __PRIVATE_debugCast(e);
	return await n.persistence.runTransaction("Handle user change", "readonly", ((e) => {
		let r;
		return n.mutationQueue.getAllMutationBatches(e).next(((i) => (r = i, n.Ns(t), n.mutationQueue.getAllMutationBatches(e)))).next(((t) => {
			const i = [];
			const s = [];
			let o = __PRIVATE_documentKeySet();
			for (const e of r) {
				i.push(e.batchId);
				for (const t of e.mutations) o = o.add(t.key);
			}
			for (const e of t) {
				s.push(e.batchId);
				for (const t of e.mutations) o = o.add(t.key);
			}
			return n.localDocuments.getDocuments(e, o).next(((e) => ({
				Bs: e,
				removedBatchIds: i,
				addedBatchIds: s
			})));
		}));
	}));
}
var __PRIVATE_LocalClientState = class {
	constructor() {
		this.activeTargetIds = __PRIVATE_targetIdSet();
	}
	Gs(e) {
		this.activeTargetIds = this.activeTargetIds.add(e);
	}
	zs(e) {
		this.activeTargetIds = this.activeTargetIds.delete(e);
	}
	Ws() {
		const e = {
			activeTargetIds: this.activeTargetIds.toArray(),
			updateTimeMs: Date.now()
		};
		return JSON.stringify(e);
	}
};
var __PRIVATE_MemorySharedClientState = class {
	constructor() {
		this.Fo = new __PRIVATE_LocalClientState(), this.Mo = {}, this.onlineStateHandler = null, this.sequenceNumberHandler = null;
	}
	addPendingMutation(e) {}
	updateMutationState(e, t, n) {}
	addLocalQueryTarget(e, t = !0) {
		return t && this.Fo.Gs(e), this.Mo[e] || "not-current";
	}
	updateQueryState(e, t, n) {
		this.Mo[e] = t;
	}
	removeLocalQueryTarget(e) {
		this.Fo.zs(e);
	}
	isLocalQueryTarget(e) {
		return this.Fo.activeTargetIds.has(e);
	}
	clearQueryState(e) {
		delete this.Mo[e];
	}
	getAllActiveQueryTargets() {
		return this.Fo.activeTargetIds;
	}
	isActiveQueryTarget(e) {
		return this.Fo.activeTargetIds.has(e);
	}
	start() {
		return this.Fo = new __PRIVATE_LocalClientState(), Promise.resolve();
	}
	handleUserChange(e, t, n) {}
	setOnlineState(e) {}
	shutdown() {}
	writeSequenceNumber(e) {}
	notifyBundleLoaded(e) {}
};
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/ var __PRIVATE_NoopConnectivityMonitor = class {
	xo(e) {}
	shutdown() {}
};
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var zt = "ConnectivityMonitor";
var __PRIVATE_BrowserConnectivityMonitor = class {
	constructor() {
		this.Oo = () => this.No(), this.Bo = () => this.Lo(), this.ko = [], this.qo();
	}
	xo(e) {
		this.ko.push(e);
	}
	shutdown() {
		window.removeEventListener("online", this.Oo), window.removeEventListener("offline", this.Bo);
	}
	qo() {
		window.addEventListener("online", this.Oo), window.addEventListener("offline", this.Bo);
	}
	No() {
		__PRIVATE_logDebug(zt, "Network connectivity changed: AVAILABLE");
		for (const e of this.ko) e(0);
	}
	Lo() {
		__PRIVATE_logDebug(zt, "Network connectivity changed: UNAVAILABLE");
		for (const e of this.ko) e(1);
	}
	static C() {
		return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener;
	}
};
/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var jt = null;
function __PRIVATE_generateUniqueDebugId() {
	return null === jt ? jt = function __PRIVATE_generateInitialUniqueDebugId() {
		return 268435456 + Math.round(2147483648 * Math.random());
	}() : jt++, "0x" + jt.toString(16);
}
var Jt = "RestConnection";
var Ht = {
	BatchGetDocuments: "batchGet",
	Commit: "commit",
	RunQuery: "runQuery",
	RunAggregationQuery: "runAggregationQuery"
};
var __PRIVATE_RestConnection = class {
	get Qo() {
		return !1;
	}
	constructor(e) {
		this.databaseInfo = e, this.databaseId = e.databaseId;
		const t = e.ssl ? "https" : "http";
		const n = encodeURIComponent(this.databaseId.projectId);
		const r = encodeURIComponent(this.databaseId.database);
		this.$o = t + "://" + e.host, this.Uo = `projects/${n}/databases/${r}`, this.Ko = this.databaseId.database === ut ? `project_id=${n}` : `project_id=${n}&database_id=${r}`;
	}
	Wo(e, t, n, r, i) {
		const s = __PRIVATE_generateUniqueDebugId();
		const o = this.Go(e, t.toUriEncodedString());
		__PRIVATE_logDebug(Jt, `Sending RPC '${e}' ${s}:`, o, n);
		const _ = {
			"google-cloud-resource-prefix": this.Uo,
			"x-goog-request-params": this.Ko
		};
		this.zo(_, r, i);
		const { host: a } = new URL(o);
		const u = isCloudWorkstation(a);
		return this.jo(e, o, _, n, u).then(((t) => (__PRIVATE_logDebug(Jt, `Received RPC '${e}' ${s}: `, t), t)), ((t) => {
			throw __PRIVATE_logWarn(Jt, `RPC '${e}' ${s} failed with error: `, t, "url: ", o, "request:", n), t;
		}));
	}
	Jo(e, t, n, r, i, s) {
		return this.Wo(e, t, n, r, i);
	}
	zo(e, t, n) {
		e["X-Goog-Api-Client"] = function __PRIVATE_getGoogApiClientValue() {
			return "gl-js/ fire/" + x;
		}(), e["Content-Type"] = "text/plain", this.databaseInfo.appId && (e["X-Firebase-GMPID"] = this.databaseInfo.appId), t && t.headers.forEach(((t, n) => e[n] = t)), n && n.headers.forEach(((t, n) => e[n] = t));
	}
	Go(e, t) {
		const n = Ht[e];
		return `${this.$o}/v1/${t}:${n}`;
	}
	terminate() {}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var __PRIVATE_StreamBridge = class {
	constructor(e) {
		this.Ho = e.Ho, this.Yo = e.Yo;
	}
	Zo(e) {
		this.Xo = e;
	}
	e_(e) {
		this.t_ = e;
	}
	n_(e) {
		this.r_ = e;
	}
	onMessage(e) {
		this.i_ = e;
	}
	close() {
		this.Yo();
	}
	send(e) {
		this.Ho(e);
	}
	s_() {
		this.Xo();
	}
	o_() {
		this.t_();
	}
	__(e) {
		this.r_(e);
	}
	a_(e) {
		this.i_(e);
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/ var Yt = "WebChannelConnection";
var __PRIVATE_WebChannelConnection = class extends __PRIVATE_RestConnection {
	constructor(e) {
		super(e), this.u_ = [], this.forceLongPolling = e.forceLongPolling, this.autoDetectLongPolling = e.autoDetectLongPolling, this.useFetchStreams = e.useFetchStreams, this.longPollingOptions = e.longPollingOptions;
	}
	jo(e, t, n, r, i) {
		const s = __PRIVATE_generateUniqueDebugId();
		return new Promise(((i, o) => {
			const _ = new XhrIo();
			_.setWithCredentials(!0), _.listenOnce(EventType.COMPLETE, (() => {
				try {
					switch (_.getLastErrorCode()) {
						case ErrorCode$1.NO_ERROR:
							const t = _.getResponseJson();
							__PRIVATE_logDebug(Yt, `XHR for RPC '${e}' ${s} received:`, JSON.stringify(t)), i(t);
							break;
						case ErrorCode$1.TIMEOUT:
							__PRIVATE_logDebug(Yt, `RPC '${e}' ${s} timed out`), o(new FirestoreError(N.DEADLINE_EXCEEDED, "Request time out"));
							break;
						case ErrorCode$1.HTTP_ERROR:
							const n = _.getStatus();
							if (__PRIVATE_logDebug(Yt, `RPC '${e}' ${s} failed with status:`, n, "response text:", _.getResponseText()), n > 0) {
								let e = _.getResponseJson();
								Array.isArray(e) && (e = e[0]);
								const t = null == e ? void 0 : e.error;
								if (t && t.status && t.message) o(new FirestoreError(function __PRIVATE_mapCodeFromHttpResponseErrorStatus(e) {
									const t = e.toLowerCase().replace(/_/g, "-");
									return Object.values(N).indexOf(t) >= 0 ? t : N.UNKNOWN;
								}(t.status), t.message));
								else o(new FirestoreError(N.UNKNOWN, "Server responded with status " + _.getStatus()));
							} else o(new FirestoreError(N.UNAVAILABLE, "Connection failed."));
							break;
						default: fail(9055, {
							c_: e,
							streamId: s,
							l_: _.getLastErrorCode(),
							h_: _.getLastError()
						});
					}
				} finally {
					__PRIVATE_logDebug(Yt, `RPC '${e}' ${s} completed.`);
				}
			}));
			const a = JSON.stringify(r);
			__PRIVATE_logDebug(Yt, `RPC '${e}' ${s} sending request:`, r), _.send(t, "POST", a, n, 15);
		}));
	}
	P_(e, t, n) {
		const r = __PRIVATE_generateUniqueDebugId();
		const i = [
			this.$o,
			"/",
			"google.firestore.v1.Firestore",
			"/",
			e,
			"/channel"
		];
		const s = createWebChannelTransport();
		const o = getStatEventTarget();
		const _ = {
			httpSessionIdParam: "gsessionid",
			initMessageHeaders: {},
			messageUrlParams: { database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}` },
			sendRawJson: !0,
			supportsCrossDomainXhr: !0,
			internalChannelParams: { forwardChannelRequestTimeoutMs: 6e5 },
			forceLongPolling: this.forceLongPolling,
			detectBufferingProxy: this.autoDetectLongPolling
		};
		const a = this.longPollingOptions.timeoutSeconds;
		void 0 !== a && (_.longPollingTimeout = Math.round(1e3 * a)), this.useFetchStreams && (_.useFetchStreams = !0), this.zo(_.initMessageHeaders, t, n), _.encodeInitMessageHeaders = !0;
		const u = i.join("");
		__PRIVATE_logDebug(Yt, `Creating RPC '${e}' stream ${r}: ${u}`, _);
		const c = s.createWebChannel(u, _);
		this.T_(c);
		let l = !1;
		let h = !1;
		const P = new __PRIVATE_StreamBridge({
			Ho: (t) => {
				h ? __PRIVATE_logDebug(Yt, `Not sending because RPC '${e}' stream ${r} is closed:`, t) : (l || (__PRIVATE_logDebug(Yt, `Opening RPC '${e}' stream ${r} transport.`), c.open(), l = !0), __PRIVATE_logDebug(Yt, `RPC '${e}' stream ${r} sending:`, t), c.send(t));
			},
			Yo: () => c.close()
		});
		const __PRIVATE_unguardedEventListen = (e, t, n) => {
			e.listen(t, ((e) => {
				try {
					n(e);
				} catch (e) {
					setTimeout((() => {
						throw e;
					}), 0);
				}
			}));
		};
		return __PRIVATE_unguardedEventListen(c, WebChannel.EventType.OPEN, (() => {
			h || (__PRIVATE_logDebug(Yt, `RPC '${e}' stream ${r} transport opened.`), P.s_());
		})), __PRIVATE_unguardedEventListen(c, WebChannel.EventType.CLOSE, (() => {
			h || (h = !0, __PRIVATE_logDebug(Yt, `RPC '${e}' stream ${r} transport closed`), P.__(), this.I_(c));
		})), __PRIVATE_unguardedEventListen(c, WebChannel.EventType.ERROR, ((t) => {
			h || (h = !0, __PRIVATE_logWarn(Yt, `RPC '${e}' stream ${r} transport errored. Name:`, t.name, "Message:", t.message), P.__(new FirestoreError(N.UNAVAILABLE, "The operation could not be completed")));
		})), __PRIVATE_unguardedEventListen(c, WebChannel.EventType.MESSAGE, ((t) => {
			var n;
			if (!h) {
				const i = t.data[0];
				__PRIVATE_hardAssert(!!i, 16349);
				const s = i;
				const o = (null == s ? void 0 : s.error) || (null === (n = s[0]) || void 0 === n ? void 0 : n.error);
				if (o) {
					__PRIVATE_logDebug(Yt, `RPC '${e}' stream ${r} received error:`, o);
					const t = o.status;
					let n = function __PRIVATE_mapCodeFromRpcStatus(e) {
						const t = ft[e];
						if (void 0 !== t) return __PRIVATE_mapCodeFromRpcCode(t);
					}(t);
					let i = o.message;
					void 0 === n && (n = N.INTERNAL, i = "Unknown error status: " + t + " with message " + o.message), h = !0, P.__(new FirestoreError(n, i)), c.close();
				} else __PRIVATE_logDebug(Yt, `RPC '${e}' stream ${r} received:`, i), P.a_(i);
			}
		})), __PRIVATE_unguardedEventListen(o, Event.STAT_EVENT, ((t) => {
			t.stat === Stat.PROXY ? __PRIVATE_logDebug(Yt, `RPC '${e}' stream ${r} detected buffering proxy`) : t.stat === Stat.NOPROXY && __PRIVATE_logDebug(Yt, `RPC '${e}' stream ${r} detected no buffering proxy`);
		})), setTimeout((() => {
			P.o_();
		}), 0), P;
	}
	terminate() {
		this.u_.forEach(((e) => e.close())), this.u_ = [];
	}
	T_(e) {
		this.u_.push(e);
	}
	I_(e) {
		this.u_ = this.u_.filter(((t) => t === e));
	}
};
function getDocument() {
	return "undefined" != typeof document ? document : null;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/ function __PRIVATE_newSerializer(e) {
	return new JsonProtoSerializer(e, !0);
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var __PRIVATE_ExponentialBackoff = class {
	constructor(e, t, n = 1e3, r = 1.5, i = 6e4) {
		this.Fi = e, this.timerId = t, this.d_ = n, this.E_ = r, this.A_ = i, this.R_ = 0, this.V_ = null, this.m_ = Date.now(), this.reset();
	}
	reset() {
		this.R_ = 0;
	}
	f_() {
		this.R_ = this.A_;
	}
	g_(e) {
		this.cancel();
		const t = Math.floor(this.R_ + this.p_());
		const n = Math.max(0, Date.now() - this.m_);
		const r = Math.max(0, t - n);
		r > 0 && __PRIVATE_logDebug("ExponentialBackoff", `Backing off for ${r} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`), this.V_ = this.Fi.enqueueAfterDelay(this.timerId, r, (() => (this.m_ = Date.now(), e()))), this.R_ *= this.E_, this.R_ < this.d_ && (this.R_ = this.d_), this.R_ > this.A_ && (this.R_ = this.A_);
	}
	y_() {
		null !== this.V_ && (this.V_.skipDelay(), this.V_ = null);
	}
	cancel() {
		null !== this.V_ && (this.V_.cancel(), this.V_ = null);
	}
	p_() {
		return (Math.random() - .5) * this.R_;
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Datastore = class {};
var __PRIVATE_DatastoreImpl = class extends Datastore {
	constructor(e, t, n, r) {
		super(), this.authCredentials = e, this.appCheckCredentials = t, this.connection = n, this.serializer = r, this.ra = !1;
	}
	ia() {
		if (this.ra) throw new FirestoreError(N.FAILED_PRECONDITION, "The client has already been terminated.");
	}
	Wo(e, t, n, r) {
		return this.ia(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then((([i, s]) => this.connection.Wo(e, __PRIVATE_toResourcePath(t, n), r, i, s))).catch(((e) => {
			throw "FirebaseError" === e.name ? (e.code === N.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), e) : new FirestoreError(N.UNKNOWN, e.toString());
		}));
	}
	Jo(e, t, n, r, i) {
		return this.ia(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then((([s, o]) => this.connection.Jo(e, __PRIVATE_toResourcePath(t, n), r, s, o, i))).catch(((e) => {
			throw "FirebaseError" === e.name ? (e.code === N.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), e) : new FirestoreError(N.UNKNOWN, e.toString());
		}));
	}
	terminate() {
		this.ra = !0, this.connection.terminate();
	}
};
var __PRIVATE_OnlineStateTracker = class {
	constructor(e, t) {
		this.asyncQueue = e, this.onlineStateHandler = t, this.state = "Unknown", this.sa = 0, this.oa = null, this._a = !0;
	}
	aa() {
		0 === this.sa && (this.ua("Unknown"), this.oa = this.asyncQueue.enqueueAfterDelay("online_state_timeout", 1e4, (() => (this.oa = null, this.ca("Backend didn't respond within 10 seconds."), this.ua("Offline"), Promise.resolve()))));
	}
	la(e) {
		"Online" === this.state ? this.ua("Unknown") : (this.sa++, this.sa >= 1 && (this.ha(), this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`), this.ua("Offline")));
	}
	set(e) {
		this.ha(), this.sa = 0, "Online" === e && (this._a = !1), this.ua(e);
	}
	ua(e) {
		e !== this.state && (this.state = e, this.onlineStateHandler(e));
	}
	ca(e) {
		const t = `Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
		this._a ? (__PRIVATE_logError(t), this._a = !1) : __PRIVATE_logDebug("OnlineStateTracker", t);
	}
	ha() {
		null !== this.oa && (this.oa.cancel(), this.oa = null);
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/ var Xt = "RemoteStore";
var __PRIVATE_RemoteStoreImpl = class {
	constructor(e, t, n, r, i) {
		this.localStore = e, this.datastore = t, this.asyncQueue = n, this.remoteSyncer = {}, this.Pa = [], this.Ta = /* @__PURE__ */ new Map(), this.Ia = /* @__PURE__ */ new Set(), this.da = [], this.Ea = i, this.Ea.xo(((e) => {
			n.enqueueAndForget((async () => {
				__PRIVATE_canUseNetwork(this) && (__PRIVATE_logDebug(Xt, "Restarting streams for network reachability change."), await async function __PRIVATE_restartNetwork(e) {
					const t = __PRIVATE_debugCast(e);
					t.Ia.add(4), await __PRIVATE_disableNetworkInternal(t), t.Aa.set("Unknown"), t.Ia.delete(4), await __PRIVATE_enableNetworkInternal(t);
				}(this));
			}));
		})), this.Aa = new __PRIVATE_OnlineStateTracker(n, r);
	}
};
async function __PRIVATE_enableNetworkInternal(e) {
	if (__PRIVATE_canUseNetwork(e)) for (const t of e.da) await t(!0);
}
async function __PRIVATE_disableNetworkInternal(e) {
	for (const t of e.da) await t(!1);
}
function __PRIVATE_canUseNetwork(e) {
	return 0 === __PRIVATE_debugCast(e).Ia.size;
}
async function __PRIVATE_remoteStoreApplyPrimaryState(e, t) {
	const n = __PRIVATE_debugCast(e);
	t ? (n.Ia.delete(2), await __PRIVATE_enableNetworkInternal(n)) : t || (n.Ia.add(2), await __PRIVATE_disableNetworkInternal(n), n.Aa.set("Unknown"));
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var DelayedOperation = class DelayedOperation {
	constructor(e, t, n, r, i) {
		this.asyncQueue = e, this.timerId = t, this.targetTimeMs = n, this.op = r, this.removalCallback = i, this.deferred = new __PRIVATE_Deferred(), this.then = this.deferred.promise.then.bind(this.deferred.promise), this.deferred.promise.catch(((e) => {}));
	}
	get promise() {
		return this.deferred.promise;
	}
	static createAndSchedule(e, t, n, r, i) {
		const o = new DelayedOperation(e, t, Date.now() + n, r, i);
		return o.start(n), o;
	}
	start(e) {
		this.timerHandle = setTimeout((() => this.handleDelayElapsed()), e);
	}
	skipDelay() {
		return this.handleDelayElapsed();
	}
	cancel(e) {
		null !== this.timerHandle && (this.clearTimeout(), this.deferred.reject(new FirestoreError(N.CANCELLED, "Operation cancelled" + (e ? ": " + e : ""))));
	}
	handleDelayElapsed() {
		this.asyncQueue.enqueueAndForget((() => null !== this.timerHandle ? (this.clearTimeout(), this.op().then(((e) => this.deferred.resolve(e)))) : Promise.resolve()));
	}
	clearTimeout() {
		null !== this.timerHandle && (this.removalCallback(this), clearTimeout(this.timerHandle), this.timerHandle = null);
	}
};
var __PRIVATE_EventManagerImpl = class {
	constructor() {
		this.queries = __PRIVATE_newQueriesObjectMap(), this.onlineState = "Unknown", this.Da = /* @__PURE__ */ new Set();
	}
	terminate() {
		(function __PRIVATE_errorAllTargets(e, t) {
			const n = __PRIVATE_debugCast(e);
			const r = n.queries;
			n.queries = __PRIVATE_newQueriesObjectMap(), r.forEach(((e, n) => {
				for (const e of n.wa) e.onError(t);
			}));
		})(this, new FirestoreError(N.ABORTED, "Firestore shutting down"));
	}
};
function __PRIVATE_newQueriesObjectMap() {
	return new ObjectMap(((e) => __PRIVATE_canonifyQuery(e)), __PRIVATE_queryEquals);
}
function __PRIVATE_raiseSnapshotsInSyncEvent(e) {
	e.Da.forEach(((e) => {
		e.next();
	}));
}
var en;
var tn;
(tn = en || (en = {})).Fa = "default", tn.Cache = "cache";
var nn = "SyncEngine";
var __PRIVATE_SyncEngineImpl = class {
	constructor(e, t, n, r, i, s) {
		this.localStore = e, this.remoteStore = t, this.eventManager = n, this.sharedClientState = r, this.currentUser = i, this.maxConcurrentLimboResolutions = s, this.hu = {}, this.Pu = new ObjectMap(((e) => __PRIVATE_canonifyQuery(e)), __PRIVATE_queryEquals), this.Tu = /* @__PURE__ */ new Map(), this.Iu = /* @__PURE__ */ new Set(), this.du = new SortedMap(DocumentKey.comparator), this.Eu = /* @__PURE__ */ new Map(), this.Au = new __PRIVATE_ReferenceSet(), this.Ru = {}, this.Vu = /* @__PURE__ */ new Map(), this.mu = __PRIVATE_TargetIdGenerator.ur(), this.onlineState = "Unknown", this.fu = void 0;
	}
	get isPrimaryClient() {
		return !0 === this.fu;
	}
};
function __PRIVATE_syncEngineApplyOnlineStateChange(e, t, n) {
	const r = __PRIVATE_debugCast(e);
	if (r.isPrimaryClient && 0 === n || !r.isPrimaryClient && 1 === n) {
		const e = [];
		r.Pu.forEach(((n, r) => {
			const i = r.view.va(t);
			i.snapshot && e.push(i.snapshot);
		})), function __PRIVATE_eventManagerOnOnlineStateChange(e, t) {
			const n = __PRIVATE_debugCast(e);
			n.onlineState = t;
			let r = !1;
			n.queries.forEach(((e, n) => {
				for (const e of n.wa) e.va(t) && (r = !0);
			})), r && __PRIVATE_raiseSnapshotsInSyncEvent(n);
		}(r.eventManager, t), e.length && r.hu.J_(e), r.onlineState = t, r.isPrimaryClient && r.sharedClientState.setOnlineState(t);
	}
}
async function __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(e, t, n) {
	const r = __PRIVATE_debugCast(e);
	const i = [];
	const s = [];
	const o = [];
	r.Pu.isEmpty() || (r.Pu.forEach(((e, _) => {
		o.push(r.gu(_, t, n).then(((e) => {
			var t;
			if ((e || n) && r.isPrimaryClient) {
				const i = e ? !e.fromCache : null === (t = null == n ? void 0 : n.targetChanges.get(_.targetId)) || void 0 === t ? void 0 : t.current;
				r.sharedClientState.updateQueryState(_.targetId, i ? "current" : "not-current");
			}
			if (e) {
				i.push(e);
				const t = __PRIVATE_LocalViewChanges.Es(_.targetId, e);
				s.push(t);
			}
		})));
	})), await Promise.all(o), r.hu.J_(i), await async function __PRIVATE_localStoreNotifyLocalViewChanges(e, t) {
		const n = __PRIVATE_debugCast(e);
		try {
			await n.persistence.runTransaction("notifyLocalViewChanges", "readwrite", ((e) => PersistencePromise.forEach(t, ((t) => PersistencePromise.forEach(t.Is, ((r) => n.persistence.referenceDelegate.addReference(e, t.targetId, r))).next((() => PersistencePromise.forEach(t.ds, ((r) => n.persistence.referenceDelegate.removeReference(e, t.targetId, r)))))))));
		} catch (e) {
			if (!__PRIVATE_isIndexedDbTransactionError(e)) throw e;
			__PRIVATE_logDebug(Qt, "Failed to update sequence numbers: " + e);
		}
		for (const e of t) {
			const t = e.targetId;
			if (!e.fromCache) {
				const e = n.Fs.get(t);
				const r = e.snapshotVersion;
				const i = e.withLastLimboFreeSnapshotVersion(r);
				n.Fs = n.Fs.insert(t, i);
			}
		}
	}(r.localStore, s));
}
async function __PRIVATE_syncEngineHandleCredentialChange(e, t) {
	const n = __PRIVATE_debugCast(e);
	if (!n.currentUser.isEqual(t)) {
		__PRIVATE_logDebug(nn, "User change. New user:", t.toKey());
		const e = await __PRIVATE_localStoreHandleUserChange(n.localStore, t);
		n.currentUser = t, function __PRIVATE_rejectOutstandingPendingWritesCallbacks(e, t) {
			e.Vu.forEach(((e) => {
				e.forEach(((e) => {
					e.reject(new FirestoreError(N.CANCELLED, t));
				}));
			})), e.Vu.clear();
		}(n, "'waitForPendingWrites' promise is rejected due to a user change."), n.sharedClientState.handleUserChange(t, e.removedBatchIds, e.addedBatchIds), await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(n, e.Bs);
	}
}
var __PRIVATE_MemoryOfflineComponentProvider = class {
	constructor() {
		this.kind = "memory", this.synchronizeTabs = !1;
	}
	async initialize(e) {
		this.serializer = __PRIVATE_newSerializer(e.databaseInfo.databaseId), this.sharedClientState = this.bu(e), this.persistence = this.Du(e), await this.persistence.start(), this.localStore = this.vu(e), this.gcScheduler = this.Cu(e, this.localStore), this.indexBackfillerScheduler = this.Fu(e, this.localStore);
	}
	Cu(e, t) {
		return null;
	}
	Fu(e, t) {
		return null;
	}
	vu(e) {
		return __PRIVATE_newLocalStore(this.persistence, new __PRIVATE_QueryEngine(), e.initialUser, this.serializer);
	}
	Du(e) {
		return new __PRIVATE_MemoryPersistence(__PRIVATE_MemoryEagerDelegate.Vi, this.serializer);
	}
	bu(e) {
		return new __PRIVATE_MemorySharedClientState();
	}
	async terminate() {
		var e;
		var t;
		null === (e = this.gcScheduler) || void 0 === e || e.stop(), null === (t = this.indexBackfillerScheduler) || void 0 === t || t.stop(), this.sharedClientState.shutdown(), await this.persistence.shutdown();
	}
};
__PRIVATE_MemoryOfflineComponentProvider.provider = { build: () => new __PRIVATE_MemoryOfflineComponentProvider() };
var OnlineComponentProvider = class {
	async initialize(e, t) {
		this.localStore || (this.localStore = e.localStore, this.sharedClientState = e.sharedClientState, this.datastore = this.createDatastore(t), this.remoteStore = this.createRemoteStore(t), this.eventManager = this.createEventManager(t), this.syncEngine = this.createSyncEngine(t, !e.synchronizeTabs), this.sharedClientState.onlineStateHandler = (e) => __PRIVATE_syncEngineApplyOnlineStateChange(this.syncEngine, e, 1), this.remoteStore.remoteSyncer.handleCredentialChange = __PRIVATE_syncEngineHandleCredentialChange.bind(null, this.syncEngine), await __PRIVATE_remoteStoreApplyPrimaryState(this.remoteStore, this.syncEngine.isPrimaryClient));
	}
	createEventManager(e) {
		return function __PRIVATE_newEventManager() {
			return new __PRIVATE_EventManagerImpl();
		}();
	}
	createDatastore(e) {
		const t = __PRIVATE_newSerializer(e.databaseInfo.databaseId);
		const n = function __PRIVATE_newConnection(e) {
			return new __PRIVATE_WebChannelConnection(e);
		}(e.databaseInfo);
		return function __PRIVATE_newDatastore(e, t, n, r) {
			return new __PRIVATE_DatastoreImpl(e, t, n, r);
		}(e.authCredentials, e.appCheckCredentials, n, t);
	}
	createRemoteStore(e) {
		return function __PRIVATE_newRemoteStore(e, t, n, r, i) {
			return new __PRIVATE_RemoteStoreImpl(e, t, n, r, i);
		}(this.localStore, this.datastore, e.asyncQueue, ((e) => __PRIVATE_syncEngineApplyOnlineStateChange(this.syncEngine, e, 0)), function __PRIVATE_newConnectivityMonitor() {
			return __PRIVATE_BrowserConnectivityMonitor.C() ? new __PRIVATE_BrowserConnectivityMonitor() : new __PRIVATE_NoopConnectivityMonitor();
		}());
	}
	createSyncEngine(e, t) {
		return function __PRIVATE_newSyncEngine(e, t, n, r, i, s, o) {
			const _ = new __PRIVATE_SyncEngineImpl(e, t, n, r, i, s);
			return o && (_.fu = !0), _;
		}(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, e.initialUser, e.maxConcurrentLimboResolutions, t);
	}
	async terminate() {
		var e;
		var t;
		await async function __PRIVATE_remoteStoreShutdown(e) {
			const t = __PRIVATE_debugCast(e);
			__PRIVATE_logDebug(Xt, "RemoteStore shutting down."), t.Ia.add(5), await __PRIVATE_disableNetworkInternal(t), t.Ea.shutdown(), t.Aa.set("Unknown");
		}(this.remoteStore), null === (e = this.datastore) || void 0 === e || e.terminate(), null === (t = this.eventManager) || void 0 === t || t.terminate();
	}
};
OnlineComponentProvider.provider = { build: () => new OnlineComponentProvider() };
/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function __PRIVATE_cloneLongPollingOptions(e) {
	const t = {};
	return void 0 !== e.timeoutSeconds && (t.timeoutSeconds = e.timeoutSeconds), t;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/ var sn = /* @__PURE__ */ new Map();
var on = "firestore.googleapis.com";
var _n = !0;
var FirestoreSettingsImpl = class {
	constructor(e) {
		var t;
		var n;
		if (void 0 === e.host) {
			if (void 0 !== e.ssl) throw new FirestoreError(N.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
			this.host = on, this.ssl = _n;
		} else this.host = e.host, this.ssl = null !== (t = e.ssl) && void 0 !== t ? t : _n;
		if (this.isUsingEmulator = void 0 !== e.emulatorOptions, this.credentials = e.credentials, this.ignoreUndefinedProperties = !!e.ignoreUndefinedProperties, this.localCache = e.localCache, void 0 === e.cacheSizeBytes) this.cacheSizeBytes = Mt;
		else {
			if (-1 !== e.cacheSizeBytes && e.cacheSizeBytes < Ot) throw new FirestoreError(N.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
			this.cacheSizeBytes = e.cacheSizeBytes;
		}
		__PRIVATE_validateIsNotUsedTogether("experimentalForceLongPolling", e.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", e.experimentalAutoDetectLongPolling), this.experimentalForceLongPolling = !!e.experimentalForceLongPolling, this.experimentalForceLongPolling ? this.experimentalAutoDetectLongPolling = !1 : void 0 === e.experimentalAutoDetectLongPolling ? this.experimentalAutoDetectLongPolling = true : this.experimentalAutoDetectLongPolling = !!e.experimentalAutoDetectLongPolling, this.experimentalLongPollingOptions = __PRIVATE_cloneLongPollingOptions(null !== (n = e.experimentalLongPollingOptions) && void 0 !== n ? n : {}), function __PRIVATE_validateLongPollingOptions(e) {
			if (void 0 !== e.timeoutSeconds) {
				if (isNaN(e.timeoutSeconds)) throw new FirestoreError(N.INVALID_ARGUMENT, `invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);
				if (e.timeoutSeconds < 5) throw new FirestoreError(N.INVALID_ARGUMENT, `invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);
				if (e.timeoutSeconds > 30) throw new FirestoreError(N.INVALID_ARGUMENT, `invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`);
			}
		}(this.experimentalLongPollingOptions), this.useFetchStreams = !!e.useFetchStreams;
	}
	isEqual(e) {
		return this.host === e.host && this.ssl === e.ssl && this.credentials === e.credentials && this.cacheSizeBytes === e.cacheSizeBytes && this.experimentalForceLongPolling === e.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === e.experimentalAutoDetectLongPolling && function __PRIVATE_longPollingOptionsEqual(e, t) {
			return e.timeoutSeconds === t.timeoutSeconds;
		}(this.experimentalLongPollingOptions, e.experimentalLongPollingOptions) && this.ignoreUndefinedProperties === e.ignoreUndefinedProperties && this.useFetchStreams === e.useFetchStreams;
	}
};
var Firestore$1 = class {
	constructor(e, t, n, r) {
		this._authCredentials = e, this._appCheckCredentials = t, this._databaseId = n, this._app = r, this.type = "firestore-lite", this._persistenceKey = "(lite)", this._settings = new FirestoreSettingsImpl({}), this._settingsFrozen = !1, this._emulatorOptions = {}, this._terminateTask = "notTerminated";
	}
	get app() {
		if (!this._app) throw new FirestoreError(N.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
		return this._app;
	}
	get _initialized() {
		return this._settingsFrozen;
	}
	get _terminated() {
		return "notTerminated" !== this._terminateTask;
	}
	_setSettings(e) {
		if (this._settingsFrozen) throw new FirestoreError(N.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
		this._settings = new FirestoreSettingsImpl(e), this._emulatorOptions = e.emulatorOptions || {}, void 0 !== e.credentials && (this._authCredentials = function __PRIVATE_makeAuthCredentialsProvider(e) {
			if (!e) return new __PRIVATE_EmptyAuthCredentialsProvider();
			switch (e.type) {
				case "firstParty": return new __PRIVATE_FirstPartyAuthCredentialsProvider(e.sessionIndex || "0", e.iamToken || null, e.authTokenFactory || null);
				case "provider": return e.client;
				default: throw new FirestoreError(N.INVALID_ARGUMENT, "makeAuthCredentialsProvider failed due to invalid credential type");
			}
		}(e.credentials));
	}
	_getSettings() {
		return this._settings;
	}
	_getEmulatorOptions() {
		return this._emulatorOptions;
	}
	_freezeSettings() {
		return this._settingsFrozen = !0, this._settings;
	}
	_delete() {
		return "notTerminated" === this._terminateTask && (this._terminateTask = this._terminate()), this._terminateTask;
	}
	async _restart() {
		"notTerminated" === this._terminateTask ? await this._terminate() : this._terminateTask = "notTerminated";
	}
	toJSON() {
		return {
			app: this._app,
			databaseId: this._databaseId,
			settings: this._settings
		};
	}
	_terminate() {
		return function __PRIVATE_removeComponents(e) {
			const t = sn.get(e);
			t && (__PRIVATE_logDebug("ComponentProvider", "Removing Datastore"), sn.delete(e), t.terminate());
		}(this), Promise.resolve();
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Query = class Query {
	constructor(e, t, n) {
		this.converter = t, this._query = n, this.type = "query", this.firestore = e;
	}
	withConverter(e) {
		return new Query(this.firestore, e, this._query);
	}
};
var DocumentReference = class DocumentReference {
	constructor(e, t, n) {
		this.converter = t, this._key = n, this.type = "document", this.firestore = e;
	}
	get _path() {
		return this._key.path;
	}
	get id() {
		return this._key.path.lastSegment();
	}
	get path() {
		return this._key.path.canonicalString();
	}
	get parent() {
		return new CollectionReference(this.firestore, this.converter, this._key.path.popLast());
	}
	withConverter(e) {
		return new DocumentReference(this.firestore, e, this._key);
	}
	toJSON() {
		return {
			type: DocumentReference._jsonSchemaVersion,
			referencePath: this._key.toString()
		};
	}
	static fromJSON(e, t, n) {
		if (__PRIVATE_validateJSON(t, DocumentReference._jsonSchema)) return new DocumentReference(e, n || null, new DocumentKey(ResourcePath.fromString(t.referencePath)));
	}
};
DocumentReference._jsonSchemaVersion = "firestore/documentReference/1.0", DocumentReference._jsonSchema = {
	type: property("string", DocumentReference._jsonSchemaVersion),
	referencePath: property("string")
};
var CollectionReference = class CollectionReference extends Query {
	constructor(e, t, n) {
		super(e, t, __PRIVATE_newQueryForPath(n)), this._path = n, this.type = "collection";
	}
	get id() {
		return this._query.path.lastSegment();
	}
	get path() {
		return this._query.path.canonicalString();
	}
	get parent() {
		const e = this._path.popLast();
		return e.isEmpty() ? null : new DocumentReference(this.firestore, null, new DocumentKey(e));
	}
	withConverter(e) {
		return new CollectionReference(this.firestore, e, this._path);
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/ var an = "AsyncQueue";
var __PRIVATE_AsyncQueueImpl = class {
	constructor(e = Promise.resolve()) {
		this.Zu = [], this.Xu = !1, this.ec = [], this.tc = null, this.nc = !1, this.rc = !1, this.sc = [], this.F_ = new __PRIVATE_ExponentialBackoff(this, "async_queue_retry"), this.oc = () => {
			const e = getDocument();
			e && __PRIVATE_logDebug(an, "Visibility state changed to " + e.visibilityState), this.F_.y_();
		}, this._c = e;
		const t = getDocument();
		t && "function" == typeof t.addEventListener && t.addEventListener("visibilitychange", this.oc);
	}
	get isShuttingDown() {
		return this.Xu;
	}
	enqueueAndForget(e) {
		this.enqueue(e);
	}
	enqueueAndForgetEvenWhileRestricted(e) {
		this.ac(), this.uc(e);
	}
	enterRestrictedMode(e) {
		if (!this.Xu) {
			this.Xu = !0, this.rc = e || !1;
			const t = getDocument();
			t && "function" == typeof t.removeEventListener && t.removeEventListener("visibilitychange", this.oc);
		}
	}
	enqueue(e) {
		if (this.ac(), this.Xu) return new Promise((() => {}));
		const t = new __PRIVATE_Deferred();
		return this.uc((() => this.Xu && this.rc ? Promise.resolve() : (e().then(t.resolve, t.reject), t.promise))).then((() => t.promise));
	}
	enqueueRetryable(e) {
		this.enqueueAndForget((() => (this.Zu.push(e), this.cc())));
	}
	async cc() {
		if (0 !== this.Zu.length) {
			try {
				await this.Zu[0](), this.Zu.shift(), this.F_.reset();
			} catch (e) {
				if (!__PRIVATE_isIndexedDbTransactionError(e)) throw e;
				__PRIVATE_logDebug(an, "Operation failed with retryable error: " + e);
			}
			this.Zu.length > 0 && this.F_.g_((() => this.cc()));
		}
	}
	uc(e) {
		const t = this._c.then((() => (this.nc = !0, e().catch(((e) => {
			this.tc = e, this.nc = !1;
			throw __PRIVATE_logError("INTERNAL UNHANDLED ERROR: ", __PRIVATE_getMessageOrStack(e)), e;
		})).then(((e) => (this.nc = !1, e))))));
		return this._c = t, t;
	}
	enqueueAfterDelay(e, t, n) {
		this.ac(), this.sc.indexOf(e) > -1 && (t = 0);
		const r = DelayedOperation.createAndSchedule(this, e, t, n, ((e) => this.lc(e)));
		return this.ec.push(r), r;
	}
	ac() {
		this.tc && fail(47125, { hc: __PRIVATE_getMessageOrStack(this.tc) });
	}
	verifyOperationInProgress() {}
	async Pc() {
		let e;
		do
			e = this._c, await e;
		while (e !== this._c);
	}
	Tc(e) {
		for (const t of this.ec) if (t.timerId === e) return !0;
		return !1;
	}
	Ic(e) {
		return this.Pc().then((() => {
			this.ec.sort(((e, t) => e.targetTimeMs - t.targetTimeMs));
			for (const t of this.ec) if (t.skipDelay(), "all" !== e && t.timerId === e) break;
			return this.Pc();
		}));
	}
	dc(e) {
		this.sc.push(e);
	}
	lc(e) {
		const t = this.ec.indexOf(e);
		this.ec.splice(t, 1);
	}
};
function __PRIVATE_getMessageOrStack(e) {
	let t = e.message || "";
	return e.stack && (t = e.stack.includes(e.message) ? e.stack : e.message + "\n" + e.stack), t;
}
var Firestore = class extends Firestore$1 {
	constructor(e, t, n, r) {
		super(e, t, n, r), this.type = "firestore", this._queue = new __PRIVATE_AsyncQueueImpl(), this._persistenceKey = (null == r ? void 0 : r.name) || "[DEFAULT]";
	}
	async _terminate() {
		if (this._firestoreClient) {
			const e = this._firestoreClient.terminate();
			this._queue = new __PRIVATE_AsyncQueueImpl(e), this._firestoreClient = void 0, await e;
		}
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Bytes = class Bytes {
	constructor(e) {
		this._byteString = e;
	}
	static fromBase64String(e) {
		try {
			return new Bytes(ByteString.fromBase64String(e));
		} catch (e) {
			throw new FirestoreError(N.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + e);
		}
	}
	static fromUint8Array(e) {
		return new Bytes(ByteString.fromUint8Array(e));
	}
	toBase64() {
		return this._byteString.toBase64();
	}
	toUint8Array() {
		return this._byteString.toUint8Array();
	}
	toString() {
		return "Bytes(base64: " + this.toBase64() + ")";
	}
	isEqual(e) {
		return this._byteString.isEqual(e._byteString);
	}
	toJSON() {
		return {
			type: Bytes._jsonSchemaVersion,
			bytes: this.toBase64()
		};
	}
	static fromJSON(e) {
		if (__PRIVATE_validateJSON(e, Bytes._jsonSchema)) return Bytes.fromBase64String(e.bytes);
	}
};
Bytes._jsonSchemaVersion = "firestore/bytes/1.0", Bytes._jsonSchema = {
	type: property("string", Bytes._jsonSchemaVersion),
	bytes: property("string")
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var FieldPath = class {
	constructor(...e) {
		for (let t = 0; t < e.length; ++t) if (0 === e[t].length) throw new FirestoreError(N.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
		this._internalPath = new FieldPath$1(e);
	}
	isEqual(e) {
		return this._internalPath.isEqual(e._internalPath);
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var GeoPoint = class GeoPoint {
	constructor(e, t) {
		if (!isFinite(e) || e < -90 || e > 90) throw new FirestoreError(N.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + e);
		if (!isFinite(t) || t < -180 || t > 180) throw new FirestoreError(N.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + t);
		this._lat = e, this._long = t;
	}
	get latitude() {
		return this._lat;
	}
	get longitude() {
		return this._long;
	}
	isEqual(e) {
		return this._lat === e._lat && this._long === e._long;
	}
	_compareTo(e) {
		return __PRIVATE_primitiveComparator(this._lat, e._lat) || __PRIVATE_primitiveComparator(this._long, e._long);
	}
	toJSON() {
		return {
			latitude: this._lat,
			longitude: this._long,
			type: GeoPoint._jsonSchemaVersion
		};
	}
	static fromJSON(e) {
		if (__PRIVATE_validateJSON(e, GeoPoint._jsonSchema)) return new GeoPoint(e.latitude, e.longitude);
	}
};
GeoPoint._jsonSchemaVersion = "firestore/geoPoint/1.0", GeoPoint._jsonSchema = {
	type: property("string", GeoPoint._jsonSchemaVersion),
	latitude: property("number"),
	longitude: property("number")
};
/**
* @license
* Copyright 2024 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var VectorValue = class VectorValue {
	constructor(e) {
		this._values = (e || []).map(((e) => e));
	}
	toArray() {
		return this._values.map(((e) => e));
	}
	isEqual(e) {
		return function __PRIVATE_isPrimitiveArrayEqual(e, t) {
			if (e.length !== t.length) return !1;
			for (let n = 0; n < e.length; ++n) if (e[n] !== t[n]) return !1;
			return !0;
		}(this._values, e._values);
	}
	toJSON() {
		return {
			type: VectorValue._jsonSchemaVersion,
			vectorValues: this._values
		};
	}
	static fromJSON(e) {
		if (__PRIVATE_validateJSON(e, VectorValue._jsonSchema)) {
			if (Array.isArray(e.vectorValues) && e.vectorValues.every(((e) => "number" == typeof e))) return new VectorValue(e.vectorValues);
			throw new FirestoreError(N.INVALID_ARGUMENT, "Expected 'vectorValues' field to be a number array");
		}
	}
};
VectorValue._jsonSchemaVersion = "firestore/vectorValue/1.0", VectorValue._jsonSchema = {
	type: property("string", VectorValue._jsonSchemaVersion),
	vectorValues: property("object")
};
var ln = /* @__PURE__ */ new RegExp("[~\\*/\\[\\]]");
function __PRIVATE_fieldPathFromDotSeparatedString(e, t, n) {
	if (t.search(ln) >= 0) throw __PRIVATE_createError(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`, e, !1, void 0, n);
	try {
		return new FieldPath(...t.split("."))._internalPath;
	} catch (r) {
		throw __PRIVATE_createError(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`, e, !1, void 0, n);
	}
}
function __PRIVATE_createError(e, t, n, r, i) {
	const s = r && !r.isEmpty();
	const o = void 0 !== i;
	let _ = `Function ${t}() called with invalid data`;
	n && (_ += " (via `toFirestore()`)"), _ += ". ";
	let a = "";
	return (s || o) && (a += " (found", s && (a += ` in field ${r}`), o && (a += ` in document ${i}`), a += ")"), new FirestoreError(N.INVALID_ARGUMENT, _ + e + a);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var DocumentSnapshot$1 = class {
	constructor(e, t, n, r, i) {
		this._firestore = e, this._userDataWriter = t, this._key = n, this._document = r, this._converter = i;
	}
	get id() {
		return this._key.path.lastSegment();
	}
	get ref() {
		return new DocumentReference(this._firestore, this._converter, this._key);
	}
	exists() {
		return null !== this._document;
	}
	data() {
		if (this._document) {
			if (this._converter) {
				const e = new QueryDocumentSnapshot$1(this._firestore, this._userDataWriter, this._key, this._document, null);
				return this._converter.fromFirestore(e);
			}
			return this._userDataWriter.convertValue(this._document.data.value);
		}
	}
	get(e) {
		if (this._document) {
			const t = this._document.data.field(__PRIVATE_fieldPathFromArgument("DocumentSnapshot.get", e));
			if (null !== t) return this._userDataWriter.convertValue(t);
		}
	}
};
var QueryDocumentSnapshot$1 = class extends DocumentSnapshot$1 {
	data() {
		return super.data();
	}
};
function __PRIVATE_fieldPathFromArgument(e, t) {
	return "string" == typeof t ? __PRIVATE_fieldPathFromDotSeparatedString(e, t) : t instanceof FieldPath ? t._internalPath : t._delegate._internalPath;
}
var SnapshotMetadata = class {
	constructor(e, t) {
		this.hasPendingWrites = e, this.fromCache = t;
	}
	isEqual(e) {
		return this.hasPendingWrites === e.hasPendingWrites && this.fromCache === e.fromCache;
	}
};
var DocumentSnapshot = class DocumentSnapshot extends DocumentSnapshot$1 {
	constructor(e, t, n, r, i, s) {
		super(e, t, n, r, s), this._firestore = e, this._firestoreImpl = e, this.metadata = i;
	}
	exists() {
		return super.exists();
	}
	data(e = {}) {
		if (this._document) {
			if (this._converter) {
				const t = new QueryDocumentSnapshot(this._firestore, this._userDataWriter, this._key, this._document, this.metadata, null);
				return this._converter.fromFirestore(t, e);
			}
			return this._userDataWriter.convertValue(this._document.data.value, e.serverTimestamps);
		}
	}
	get(e, t = {}) {
		if (this._document) {
			const n = this._document.data.field(__PRIVATE_fieldPathFromArgument("DocumentSnapshot.get", e));
			if (null !== n) return this._userDataWriter.convertValue(n, t.serverTimestamps);
		}
	}
	toJSON() {
		if (this.metadata.hasPendingWrites) throw new FirestoreError(N.FAILED_PRECONDITION, "DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");
		const e = this._document;
		const t = {};
		if (t.type = DocumentSnapshot._jsonSchemaVersion, t.bundle = "", t.bundleSource = "DocumentSnapshot", t.bundleName = this._key.toString(), !e || !e.isValidDocument() || !e.isFoundDocument()) return t;
		this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields, "previous");
		return t.bundle = (this._firestore, this.ref.path, "NOT SUPPORTED"), t;
	}
};
DocumentSnapshot._jsonSchemaVersion = "firestore/documentSnapshot/1.0", DocumentSnapshot._jsonSchema = {
	type: property("string", DocumentSnapshot._jsonSchemaVersion),
	bundleSource: property("string", "DocumentSnapshot"),
	bundleName: property("string"),
	bundle: property("string")
};
var QueryDocumentSnapshot = class extends DocumentSnapshot {
	data(e = {}) {
		return super.data(e);
	}
};
var QuerySnapshot = class QuerySnapshot {
	constructor(e, t, n, r) {
		this._firestore = e, this._userDataWriter = t, this._snapshot = r, this.metadata = new SnapshotMetadata(r.hasPendingWrites, r.fromCache), this.query = n;
	}
	get docs() {
		const e = [];
		return this.forEach(((t) => e.push(t))), e;
	}
	get size() {
		return this._snapshot.docs.size;
	}
	get empty() {
		return 0 === this.size;
	}
	forEach(e, t) {
		this._snapshot.docs.forEach(((n) => {
			e.call(t, new QueryDocumentSnapshot(this._firestore, this._userDataWriter, n.key, n, new SnapshotMetadata(this._snapshot.mutatedKeys.has(n.key), this._snapshot.fromCache), this.query.converter));
		}));
	}
	docChanges(e = {}) {
		const t = !!e.includeMetadataChanges;
		if (t && this._snapshot.excludesMetadataChanges) throw new FirestoreError(N.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
		return this._cachedChanges && this._cachedChangesIncludeMetadataChanges === t || (this._cachedChanges = function __PRIVATE_changesFromSnapshot(e, t) {
			if (e._snapshot.oldDocs.isEmpty()) {
				let t = 0;
				return e._snapshot.docChanges.map(((n) => {
					const r = new QueryDocumentSnapshot(e._firestore, e._userDataWriter, n.doc.key, n.doc, new SnapshotMetadata(e._snapshot.mutatedKeys.has(n.doc.key), e._snapshot.fromCache), e.query.converter);
					return n.doc, {
						type: "added",
						doc: r,
						oldIndex: -1,
						newIndex: t++
					};
				}));
			}
			{
				let n = e._snapshot.oldDocs;
				return e._snapshot.docChanges.filter(((e) => t || 3 !== e.type)).map(((t) => {
					const r = new QueryDocumentSnapshot(e._firestore, e._userDataWriter, t.doc.key, t.doc, new SnapshotMetadata(e._snapshot.mutatedKeys.has(t.doc.key), e._snapshot.fromCache), e.query.converter);
					let i = -1;
					let s = -1;
					return 0 !== t.type && (i = n.indexOf(t.doc.key), n = n.delete(t.doc.key)), 1 !== t.type && (n = n.add(t.doc), s = n.indexOf(t.doc.key)), {
						type: __PRIVATE_resultChangeType(t.type),
						doc: r,
						oldIndex: i,
						newIndex: s
					};
				}));
			}
		}(this, t), this._cachedChangesIncludeMetadataChanges = t), this._cachedChanges;
	}
	toJSON() {
		if (this.metadata.hasPendingWrites) throw new FirestoreError(N.FAILED_PRECONDITION, "QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");
		const e = {};
		e.type = QuerySnapshot._jsonSchemaVersion, e.bundleSource = "QuerySnapshot", e.bundleName = __PRIVATE_AutoId.newId(), this._firestore._databaseId.database, this._firestore._databaseId.projectId;
		const t = [];
		const n = [];
		const r = [];
		return this.docs.forEach(((e) => {
			null !== e._document && (t.push(e._document), n.push(this._userDataWriter.convertObjectMap(e._document.data.value.mapValue.fields, "previous")), r.push(e.ref.path));
		})), e.bundle = (this._firestore, this.query._query, e.bundleName, "NOT SUPPORTED"), e;
	}
};
function __PRIVATE_resultChangeType(e) {
	switch (e) {
		case 0: return "added";
		case 2:
		case 3: return "modified";
		case 1: return "removed";
		default: return fail(61501, { type: e });
	}
}
QuerySnapshot._jsonSchemaVersion = "firestore/querySnapshot/1.0", QuerySnapshot._jsonSchema = {
	type: property("string", QuerySnapshot._jsonSchemaVersion),
	bundleSource: property("string", "QuerySnapshot"),
	bundleName: property("string"),
	bundle: property("string")
};
(function __PRIVATE_registerFirestore(e, t = !0) {
	(function __PRIVATE_setSDKVersion(e) {
		x = e;
	})(SDK_VERSION$1), _registerComponent(new Component("firestore", ((e, { instanceIdentifier: n, options: r }) => {
		const i = e.getProvider("app").getImmediate();
		const s = new Firestore(new __PRIVATE_FirebaseAuthCredentialsProvider(e.getProvider("auth-internal")), new __PRIVATE_FirebaseAppCheckTokenProvider(i, e.getProvider("app-check-internal")), function __PRIVATE_databaseIdFromApp(e, t) {
			if (!Object.prototype.hasOwnProperty.apply(e.options, ["projectId"])) throw new FirestoreError(N.INVALID_ARGUMENT, "\"projectId\" not provided in firebase.initializeApp.");
			return new DatabaseId(e.options.projectId, t);
		}(i, n), i);
		return r = Object.assign({ useFetchStreams: t }, r), s._setSettings(r), s;
	}), "PUBLIC").setMultipleInstances(!0)), registerVersion(F, M, e), registerVersion(F, M, "esm2017");
})();
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var DEFAULT_HOST = "firebasestorage.googleapis.com";
var CONFIG_STORAGE_BUCKET_KEY = "storageBucket";
var DEFAULT_MAX_OPERATION_RETRY_TIME = 120 * 1e3;
var DEFAULT_MAX_UPLOAD_RETRY_TIME = 600 * 1e3;
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var StorageError = class StorageError extends FirebaseError {
	constructor(code, message, status_ = 0) {
		super(prependCode(code), `Firebase Storage: ${message} (${prependCode(code)})`);
		this.status_ = status_;
		this.customData = { serverResponse: null };
		this._baseMessage = this.message;
		Object.setPrototypeOf(this, StorageError.prototype);
	}
	get status() {
		return this.status_;
	}
	set status(status) {
		this.status_ = status;
	}
	_codeEquals(code) {
		return prependCode(code) === this.code;
	}
	get serverResponse() {
		return this.customData.serverResponse;
	}
	set serverResponse(serverResponse) {
		this.customData.serverResponse = serverResponse;
		if (this.customData.serverResponse) this.message = `${this._baseMessage}\n${this.customData.serverResponse}`;
		else this.message = this._baseMessage;
	}
};
var StorageErrorCode;
(function(StorageErrorCode) {
	StorageErrorCode["UNKNOWN"] = "unknown";
	StorageErrorCode["OBJECT_NOT_FOUND"] = "object-not-found";
	StorageErrorCode["BUCKET_NOT_FOUND"] = "bucket-not-found";
	StorageErrorCode["PROJECT_NOT_FOUND"] = "project-not-found";
	StorageErrorCode["QUOTA_EXCEEDED"] = "quota-exceeded";
	StorageErrorCode["UNAUTHENTICATED"] = "unauthenticated";
	StorageErrorCode["UNAUTHORIZED"] = "unauthorized";
	StorageErrorCode["UNAUTHORIZED_APP"] = "unauthorized-app";
	StorageErrorCode["RETRY_LIMIT_EXCEEDED"] = "retry-limit-exceeded";
	StorageErrorCode["INVALID_CHECKSUM"] = "invalid-checksum";
	StorageErrorCode["CANCELED"] = "canceled";
	StorageErrorCode["INVALID_EVENT_NAME"] = "invalid-event-name";
	StorageErrorCode["INVALID_URL"] = "invalid-url";
	StorageErrorCode["INVALID_DEFAULT_BUCKET"] = "invalid-default-bucket";
	StorageErrorCode["NO_DEFAULT_BUCKET"] = "no-default-bucket";
	StorageErrorCode["CANNOT_SLICE_BLOB"] = "cannot-slice-blob";
	StorageErrorCode["SERVER_FILE_WRONG_SIZE"] = "server-file-wrong-size";
	StorageErrorCode["NO_DOWNLOAD_URL"] = "no-download-url";
	StorageErrorCode["INVALID_ARGUMENT"] = "invalid-argument";
	StorageErrorCode["INVALID_ARGUMENT_COUNT"] = "invalid-argument-count";
	StorageErrorCode["APP_DELETED"] = "app-deleted";
	StorageErrorCode["INVALID_ROOT_OPERATION"] = "invalid-root-operation";
	StorageErrorCode["INVALID_FORMAT"] = "invalid-format";
	StorageErrorCode["INTERNAL_ERROR"] = "internal-error";
	StorageErrorCode["UNSUPPORTED_ENVIRONMENT"] = "unsupported-environment";
})(StorageErrorCode || (StorageErrorCode = {}));
function prependCode(code) {
	return "storage/" + code;
}
function unknown() {
	return new StorageError(StorageErrorCode.UNKNOWN, "An unknown error occurred, please check the error payload for server response.");
}
function retryLimitExceeded() {
	return new StorageError(StorageErrorCode.RETRY_LIMIT_EXCEEDED, "Max retry time for operation exceeded, please try again.");
}
function canceled() {
	return new StorageError(StorageErrorCode.CANCELED, "User canceled the upload/download.");
}
function invalidUrl(url) {
	return new StorageError(StorageErrorCode.INVALID_URL, "Invalid URL '" + url + "'.");
}
function invalidDefaultBucket(bucket) {
	return new StorageError(StorageErrorCode.INVALID_DEFAULT_BUCKET, "Invalid default bucket '" + bucket + "'.");
}
function invalidArgument(message) {
	return new StorageError(StorageErrorCode.INVALID_ARGUMENT, message);
}
function appDeleted() {
	return new StorageError(StorageErrorCode.APP_DELETED, "The Firebase app was deleted.");
}
function invalidRootOperation(name) {
	return new StorageError(StorageErrorCode.INVALID_ROOT_OPERATION, "The operation '" + name + "' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').");
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Location = class Location {
	constructor(bucket, path) {
		this.bucket = bucket;
		this.path_ = path;
	}
	get path() {
		return this.path_;
	}
	get isRoot() {
		return this.path.length === 0;
	}
	fullServerUrl() {
		const encode = encodeURIComponent;
		return "/b/" + encode(this.bucket) + "/o/" + encode(this.path);
	}
	bucketOnlyServerUrl() {
		return "/b/" + encodeURIComponent(this.bucket) + "/o";
	}
	static makeFromBucketSpec(bucketString, host) {
		let bucketLocation;
		try {
			bucketLocation = Location.makeFromUrl(bucketString, host);
		} catch (e) {
			return new Location(bucketString, "");
		}
		if (bucketLocation.path === "") return bucketLocation;
		else throw invalidDefaultBucket(bucketString);
	}
	static makeFromUrl(url, host) {
		let location = null;
		const bucketDomain = "([A-Za-z0-9.\\-_]+)";
		function gsModify(loc) {
			if (loc.path.charAt(loc.path.length - 1) === "/") loc.path_ = loc.path_.slice(0, -1);
		}
		const gsRegex = new RegExp("^gs://" + bucketDomain + "(/(.*))?$", "i");
		const gsIndices = {
			bucket: 1,
			path: 3
		};
		function httpModify(loc) {
			loc.path_ = decodeURIComponent(loc.path);
		}
		const version = "v[A-Za-z0-9_]+";
		const firebaseStorageHost = host.replace(/[.]/g, "\\.");
		const firebaseStorageRegExp = new RegExp(`^https?://${firebaseStorageHost}/${version}/b/${bucketDomain}/o(/([^?#]*).*)?\$`, "i");
		const firebaseStorageIndices = {
			bucket: 1,
			path: 3
		};
		const cloudStorageHost = host === DEFAULT_HOST ? "(?:storage.googleapis.com|storage.cloud.google.com)" : host;
		const cloudStorageRegExp = new RegExp(`^https?://${cloudStorageHost}/${bucketDomain}/([^?#]*)`, "i");
		const groups = [
			{
				regex: gsRegex,
				indices: gsIndices,
				postModify: gsModify
			},
			{
				regex: firebaseStorageRegExp,
				indices: firebaseStorageIndices,
				postModify: httpModify
			},
			{
				regex: cloudStorageRegExp,
				indices: {
					bucket: 1,
					path: 2
				},
				postModify: httpModify
			}
		];
		for (let i = 0; i < groups.length; i++) {
			const group = groups[i];
			const captures = group.regex.exec(url);
			if (captures) {
				const bucketValue = captures[group.indices.bucket];
				let pathValue = captures[group.indices.path];
				if (!pathValue) pathValue = "";
				location = new Location(bucketValue, pathValue);
				group.postModify(location);
				break;
			}
		}
		if (location == null) throw invalidUrl(url);
		return location;
	}
};
var FailRequest = class {
	constructor(error) {
		this.promise_ = Promise.reject(error);
	}
	getPromise() {
		return this.promise_;
	}
	cancel(_appDelete = false) {}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function start(doRequest, backoffCompleteCb, timeout) {
	let waitSeconds = 1;
	let retryTimeoutId = null;
	let globalTimeoutId = null;
	let hitTimeout = false;
	let cancelState = 0;
	function canceled() {
		return cancelState === 2;
	}
	let triggeredCallback = false;
	function triggerCallback(...args) {
		if (!triggeredCallback) {
			triggeredCallback = true;
			backoffCompleteCb.apply(null, args);
		}
	}
	function callWithDelay(millis) {
		retryTimeoutId = setTimeout(() => {
			retryTimeoutId = null;
			doRequest(responseHandler, canceled());
		}, millis);
	}
	function clearGlobalTimeout() {
		if (globalTimeoutId) clearTimeout(globalTimeoutId);
	}
	function responseHandler(success, ...args) {
		if (triggeredCallback) {
			clearGlobalTimeout();
			return;
		}
		if (success) {
			clearGlobalTimeout();
			triggerCallback.call(null, success, ...args);
			return;
		}
		if (canceled() || hitTimeout) {
			clearGlobalTimeout();
			triggerCallback.call(null, success, ...args);
			return;
		}
		if (waitSeconds < 64) waitSeconds *= 2;
		let waitMillis;
		if (cancelState === 1) {
			cancelState = 2;
			waitMillis = 0;
		} else waitMillis = (waitSeconds + Math.random()) * 1e3;
		callWithDelay(waitMillis);
	}
	let stopped = false;
	function stop(wasTimeout) {
		if (stopped) return;
		stopped = true;
		clearGlobalTimeout();
		if (triggeredCallback) return;
		if (retryTimeoutId !== null) {
			if (!wasTimeout) cancelState = 2;
			clearTimeout(retryTimeoutId);
			callWithDelay(0);
		} else if (!wasTimeout) cancelState = 1;
	}
	callWithDelay(0);
	globalTimeoutId = setTimeout(() => {
		hitTimeout = true;
		stop(true);
	}, timeout);
	return stop;
}
function stop(id) {
	id(false);
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function isJustDef(p) {
	return p !== void 0;
}
function validateNumber(argument, minValue, maxValue, value) {
	if (value < minValue) throw invalidArgument(`Invalid value for '${argument}'. Expected ${minValue} or greater.`);
	if (value > maxValue) throw invalidArgument(`Invalid value for '${argument}'. Expected ${maxValue} or less.`);
}
function makeQueryString(params) {
	const encode = encodeURIComponent;
	let queryPart = "?";
	for (const key in params) if (params.hasOwnProperty(key)) {
		const nextPart = encode(key) + "=" + encode(params[key]);
		queryPart = queryPart + nextPart + "&";
	}
	queryPart = queryPart.slice(0, -1);
	return queryPart;
}
var ErrorCode;
(function(ErrorCode) {
	ErrorCode[ErrorCode["NO_ERROR"] = 0] = "NO_ERROR";
	ErrorCode[ErrorCode["NETWORK_ERROR"] = 1] = "NETWORK_ERROR";
	ErrorCode[ErrorCode["ABORT"] = 2] = "ABORT";
})(ErrorCode || (ErrorCode = {}));
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function isRetryStatusCode(status, additionalRetryCodes) {
	const isFiveHundredCode = status >= 500 && status < 600;
	const isExtraRetryCode = [408, 429].indexOf(status) !== -1;
	const isAdditionalRetryCode = additionalRetryCodes.indexOf(status) !== -1;
	return isFiveHundredCode || isExtraRetryCode || isAdditionalRetryCode;
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var NetworkRequest = class {
	constructor(url_, method_, headers_, body_, successCodes_, additionalRetryCodes_, callback_, errorCallback_, timeout_, progressCallback_, connectionFactory_, retry = true, isUsingEmulator = false) {
		this.url_ = url_;
		this.method_ = method_;
		this.headers_ = headers_;
		this.body_ = body_;
		this.successCodes_ = successCodes_;
		this.additionalRetryCodes_ = additionalRetryCodes_;
		this.callback_ = callback_;
		this.errorCallback_ = errorCallback_;
		this.timeout_ = timeout_;
		this.progressCallback_ = progressCallback_;
		this.connectionFactory_ = connectionFactory_;
		this.retry = retry;
		this.isUsingEmulator = isUsingEmulator;
		this.pendingConnection_ = null;
		this.backoffId_ = null;
		this.canceled_ = false;
		this.appDelete_ = false;
		this.promise_ = new Promise((resolve, reject) => {
			this.resolve_ = resolve;
			this.reject_ = reject;
			this.start_();
		});
	}
	start_() {
		const doTheRequest = (backoffCallback, canceled) => {
			if (canceled) {
				backoffCallback(false, new RequestEndStatus(false, null, true));
				return;
			}
			const connection = this.connectionFactory_();
			this.pendingConnection_ = connection;
			const progressListener = (progressEvent) => {
				const loaded = progressEvent.loaded;
				const total = progressEvent.lengthComputable ? progressEvent.total : -1;
				if (this.progressCallback_ !== null) this.progressCallback_(loaded, total);
			};
			if (this.progressCallback_ !== null) connection.addUploadProgressListener(progressListener);
			connection.send(this.url_, this.method_, this.isUsingEmulator, this.body_, this.headers_).then(() => {
				if (this.progressCallback_ !== null) connection.removeUploadProgressListener(progressListener);
				this.pendingConnection_ = null;
				const hitServer = connection.getErrorCode() === ErrorCode.NO_ERROR;
				const status = connection.getStatus();
				if (!hitServer || isRetryStatusCode(status, this.additionalRetryCodes_) && this.retry) {
					backoffCallback(false, new RequestEndStatus(false, null, connection.getErrorCode() === ErrorCode.ABORT));
					return;
				}
				backoffCallback(true, new RequestEndStatus(this.successCodes_.indexOf(status) !== -1, connection));
			});
		};
		const backoffDone = (requestWentThrough, status) => {
			const resolve = this.resolve_;
			const reject = this.reject_;
			const connection = status.connection;
			if (status.wasSuccessCode) try {
				const result = this.callback_(connection, connection.getResponse());
				if (isJustDef(result)) resolve(result);
				else resolve();
			} catch (e) {
				reject(e);
			}
			else if (connection !== null) {
				const err = unknown();
				err.serverResponse = connection.getErrorText();
				if (this.errorCallback_) reject(this.errorCallback_(connection, err));
				else reject(err);
			} else if (status.canceled) reject(this.appDelete_ ? appDeleted() : canceled());
			else reject(retryLimitExceeded());
		};
		if (this.canceled_) backoffDone(false, new RequestEndStatus(false, null, true));
		else this.backoffId_ = start(doTheRequest, backoffDone, this.timeout_);
	}
	getPromise() {
		return this.promise_;
	}
	cancel(appDelete) {
		this.canceled_ = true;
		this.appDelete_ = appDelete || false;
		if (this.backoffId_ !== null) stop(this.backoffId_);
		if (this.pendingConnection_ !== null) this.pendingConnection_.abort();
	}
};
var RequestEndStatus = class {
	constructor(wasSuccessCode, connection, canceled) {
		this.wasSuccessCode = wasSuccessCode;
		this.connection = connection;
		this.canceled = !!canceled;
	}
};
function addAuthHeader_(headers, authToken) {
	if (authToken !== null && authToken.length > 0) headers["Authorization"] = "Firebase " + authToken;
}
function addVersionHeader_(headers, firebaseVersion) {
	headers["X-Firebase-Storage-Version"] = "webjs/" + (firebaseVersion !== null && firebaseVersion !== void 0 ? firebaseVersion : "AppManager");
}
function addGmpidHeader_(headers, appId) {
	if (appId) headers["X-Firebase-GMPID"] = appId;
}
function addAppCheckHeader_(headers, appCheckToken) {
	if (appCheckToken !== null) headers["X-Firebase-AppCheck"] = appCheckToken;
}
function makeRequest(requestInfo, appId, authToken, appCheckToken, requestFactory, firebaseVersion, retry = true, isUsingEmulator = false) {
	const queryPart = makeQueryString(requestInfo.urlParams);
	const url = requestInfo.url + queryPart;
	const headers = Object.assign({}, requestInfo.headers);
	addGmpidHeader_(headers, appId);
	addAuthHeader_(headers, authToken);
	addVersionHeader_(headers, firebaseVersion);
	addAppCheckHeader_(headers, appCheckToken);
	return new NetworkRequest(url, requestInfo.method, headers, requestInfo.body, requestInfo.successCodes, requestInfo.additionalRetryCodes, requestInfo.handler, requestInfo.errorHandler, requestInfo.timeout, requestInfo.progressCallback, requestFactory, retry, isUsingEmulator);
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function parent(path) {
	if (path.length === 0) return null;
	const index = path.lastIndexOf("/");
	if (index === -1) return "";
	return path.slice(0, index);
}
function lastComponent(path) {
	const index = path.lastIndexOf("/", path.length - 2);
	if (index === -1) return path;
	else return path.slice(index + 1);
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Reference = class Reference {
	constructor(_service, location) {
		this._service = _service;
		if (location instanceof Location) this._location = location;
		else this._location = Location.makeFromUrl(location, _service.host);
	}
	toString() {
		return "gs://" + this._location.bucket + "/" + this._location.path;
	}
	_newRef(service, location) {
		return new Reference(service, location);
	}
	get root() {
		const location = new Location(this._location.bucket, "");
		return this._newRef(this._service, location);
	}
	get bucket() {
		return this._location.bucket;
	}
	get fullPath() {
		return this._location.path;
	}
	get name() {
		return lastComponent(this._location.path);
	}
	get storage() {
		return this._service;
	}
	get parent() {
		const newPath = parent(this._location.path);
		if (newPath === null) return null;
		const location = new Location(this._location.bucket, newPath);
		return new Reference(this._service, location);
	}
	_throwIfRoot(name) {
		if (this._location.path === "") throw invalidRootOperation(name);
	}
};
function extractBucket(host, config) {
	const bucketString = config === null || config === void 0 ? void 0 : config[CONFIG_STORAGE_BUCKET_KEY];
	if (bucketString == null) return null;
	return Location.makeFromBucketSpec(bucketString, host);
}
var FirebaseStorageImpl = class {
	constructor(app, _authProvider, _appCheckProvider, _url, _firebaseVersion, _isUsingEmulator = false) {
		this.app = app;
		this._authProvider = _authProvider;
		this._appCheckProvider = _appCheckProvider;
		this._url = _url;
		this._firebaseVersion = _firebaseVersion;
		this._isUsingEmulator = _isUsingEmulator;
		this._bucket = null;
		this._host = DEFAULT_HOST;
		this._protocol = "https";
		this._appId = null;
		this._deleted = false;
		this._maxOperationRetryTime = DEFAULT_MAX_OPERATION_RETRY_TIME;
		this._maxUploadRetryTime = DEFAULT_MAX_UPLOAD_RETRY_TIME;
		this._requests = /* @__PURE__ */ new Set();
		if (_url != null) this._bucket = Location.makeFromBucketSpec(_url, this._host);
		else this._bucket = extractBucket(this._host, this.app.options);
	}
	get host() {
		return this._host;
	}
	set host(host) {
		this._host = host;
		if (this._url != null) this._bucket = Location.makeFromBucketSpec(this._url, host);
		else this._bucket = extractBucket(host, this.app.options);
	}
	get maxUploadRetryTime() {
		return this._maxUploadRetryTime;
	}
	set maxUploadRetryTime(time) {
		validateNumber("time", 0, Number.POSITIVE_INFINITY, time);
		this._maxUploadRetryTime = time;
	}
	get maxOperationRetryTime() {
		return this._maxOperationRetryTime;
	}
	set maxOperationRetryTime(time) {
		validateNumber("time", 0, Number.POSITIVE_INFINITY, time);
		this._maxOperationRetryTime = time;
	}
	async _getAuthToken() {
		if (this._overrideAuthToken) return this._overrideAuthToken;
		const auth = this._authProvider.getImmediate({ optional: true });
		if (auth) {
			const tokenData = await auth.getToken();
			if (tokenData !== null) return tokenData.accessToken;
		}
		return null;
	}
	async _getAppCheckToken() {
		if (_isFirebaseServerApp(this.app) && this.app.settings.appCheckToken) return this.app.settings.appCheckToken;
		const appCheck = this._appCheckProvider.getImmediate({ optional: true });
		if (appCheck) return (await appCheck.getToken()).token;
		return null;
	}
	_delete() {
		if (!this._deleted) {
			this._deleted = true;
			this._requests.forEach((request) => request.cancel());
			this._requests.clear();
		}
		return Promise.resolve();
	}
	_makeStorageReference(loc) {
		return new Reference(this, loc);
	}
	_makeRequest(requestInfo, requestFactory, authToken, appCheckToken, retry = true) {
		if (!this._deleted) {
			const request = makeRequest(requestInfo, this._appId, authToken, appCheckToken, requestFactory, this._firebaseVersion, retry, this._isUsingEmulator);
			this._requests.add(request);
			request.getPromise().then(() => this._requests.delete(request), () => this._requests.delete(request));
			return request;
		} else return new FailRequest(appDeleted());
	}
	async makeRequestWithTokens(requestInfo, requestFactory) {
		const [authToken, appCheckToken] = await Promise.all([this._getAuthToken(), this._getAppCheckToken()]);
		return this._makeRequest(requestInfo, requestFactory, authToken, appCheckToken).getPromise();
	}
};
var name = "@firebase/storage";
var version = "0.13.14";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var STORAGE_TYPE = "storage";
function factory(container, { instanceIdentifier: url }) {
	return new FirebaseStorageImpl(container.getProvider("app").getImmediate(), container.getProvider("auth-internal"), container.getProvider("app-check-internal"), url, SDK_VERSION$1);
}
function registerStorage() {
	_registerComponent(new Component(STORAGE_TYPE, factory, "PUBLIC").setMultipleInstances(true));
	registerVersion(name, version, "");
	registerVersion(name, version, "esm2017");
}
registerStorage();
export { prodErrorMap as A, initializeApp as B, getAuth as C, initializeAuth as D, indexedDBLocalPersistence as E, signInWithEmailAndPassword as F, signInWithPopup as I, signOut as L, sendPasswordResetEmail as M, setPersistence as N, onAuthStateChanged as O, signInWithCredential as P, updatePassword as R, getAdditionalUserInfo as S, inMemoryPersistence as T, FirebaseError as V, browserLocalPersistence as _, EmailAuthProvider as a, connectAuthEmulator as b, GoogleAuthProvider as c, PhoneAuthProvider as d, PhoneMultiFactorGenerator as f, beforeAuthStateChanged as g, TwitterAuthProvider as h, EmailAuthCredential as i, reload as j, onIdTokenChanged as k, OAuthCredential as l, TotpSecret as m, ActionCodeURL as n, FacebookAuthProvider as o, TotpMultiFactorGenerator as p, AuthCredential as r, GithubAuthProvider as s, AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY as t, PhoneAuthCredential as u, browserPopupRedirectResolver as v, getIdTokenResult as w, createUserWithEmailAndPassword as x, browserSessionPersistence as y, getApp as z };

//# sourceMappingURL=vendor-firebase-DN8BxCYa.js.map