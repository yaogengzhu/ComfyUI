import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { D as computed, c as defineStore, kt as ref, mt as watchEffect } from "./vendor-vue-core-tg-oZu4l.js";
import { r as api } from "./api-DbPc6hdO.js";
const useUserStore = defineStore("user", () => {
	const userConfig = ref(null);
	const currentUserId = ref(null);
	const isMultiUserServer = computed(() => userConfig.value && "users" in userConfig.value);
	const needsLogin = computed(() => !currentUserId.value && isMultiUserServer.value);
	const users = computed(() => Object.entries(userConfig.value?.users ?? {}).map(([userId, username]) => ({
		userId,
		username
	})));
	const currentUser = computed(() => users.value.find((user) => user.userId === currentUserId.value) ?? null);
	const initialized = computed(() => userConfig.value !== null);
	async function initialize() {
		userConfig.value = await api.getUserConfig();
		currentUserId.value = localStorage["Comfy.userId"];
	}
	async function createUser(username) {
		const resp = await api.createUser(username);
		const data = await resp.json();
		if (resp.status >= 300) throw new Error(data.error ?? "Error creating user: " + resp.status + " " + resp.statusText);
		return {
			userId: data,
			username
		};
	}
	async function login({ userId, username }) {
		currentUserId.value = userId;
		localStorage["Comfy.userId"] = userId;
		localStorage["Comfy.userName"] = username;
	}
	watchEffect(() => {
		if (isMultiUserServer.value && currentUserId.value) api.user = currentUserId.value;
	});
	async function logout() {
		delete localStorage["Comfy.userId"];
		delete localStorage["Comfy.userName"];
	}
	return {
		users,
		currentUser,
		isMultiUserServer,
		needsLogin,
		initialized,
		initialize,
		createUser,
		login,
		logout
	};
});
export { useUserStore as t };

//# sourceMappingURL=userStore-xAnKQzRd.js.map