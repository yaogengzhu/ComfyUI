import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { D as computed, Dt as reactive, Ot as readonly, kt as ref } from "./vendor-vue-core-tg-oZu4l.js";
import { t as isCloud } from "./types-DT3N7am7.js";
import { Lt as getDevOverride, r as api } from "./api-CZwqvkO0.js";
const remoteConfigState = ref("unloaded");
const isAuthenticatedConfigLoaded = computed(() => remoteConfigState.value === "authenticated");
const remoteConfig = ref({});
function configValueOrDefault(remoteConfig, key, defaultValue) {
	return remoteConfig[key] || defaultValue;
}
let ServerFeatureFlag = /* @__PURE__ */ function(ServerFeatureFlag) {
	ServerFeatureFlag["SUPPORTS_PREVIEW_METADATA"] = "supports_preview_metadata";
	ServerFeatureFlag["MAX_UPLOAD_SIZE"] = "max_upload_size";
	ServerFeatureFlag["MANAGER_SUPPORTS_V4"] = "extension.manager.supports_v4";
	ServerFeatureFlag["MODEL_UPLOAD_BUTTON_ENABLED"] = "model_upload_button_enabled";
	ServerFeatureFlag["ASSET_RENAME_ENABLED"] = "asset_rename_enabled";
	ServerFeatureFlag["PRIVATE_MODELS_ENABLED"] = "private_models_enabled";
	ServerFeatureFlag["ONBOARDING_SURVEY_ENABLED"] = "onboarding_survey_enabled";
	ServerFeatureFlag["LINEAR_TOGGLE_ENABLED"] = "linear_toggle_enabled";
	ServerFeatureFlag["TEAM_WORKSPACES_ENABLED"] = "team_workspaces_enabled";
	ServerFeatureFlag["USER_SECRETS_ENABLED"] = "user_secrets_enabled";
	ServerFeatureFlag["NODE_REPLACEMENTS"] = "node_replacements";
	ServerFeatureFlag["NODE_LIBRARY_ESSENTIALS_ENABLED"] = "node_library_essentials_enabled";
	return ServerFeatureFlag;
}({});
function resolveFlag(flagKey, remoteConfigValue, defaultValue) {
	const override = /* @__PURE__ */ getDevOverride(flagKey);
	if (override !== void 0) return override;
	return remoteConfigValue ?? api.getServerFeature(flagKey, defaultValue);
}
function useFeatureFlags() {
	const flags = reactive({
		get supportsPreviewMetadata() {
			return api.getServerFeature(ServerFeatureFlag.SUPPORTS_PREVIEW_METADATA);
		},
		get maxUploadSize() {
			return api.getServerFeature(ServerFeatureFlag.MAX_UPLOAD_SIZE);
		},
		get supportsManagerV4() {
			return api.getServerFeature(ServerFeatureFlag.MANAGER_SUPPORTS_V4);
		},
		get modelUploadButtonEnabled() {
			return resolveFlag(ServerFeatureFlag.MODEL_UPLOAD_BUTTON_ENABLED, remoteConfig.value.model_upload_button_enabled, false);
		},
		get assetRenameEnabled() {
			return resolveFlag(ServerFeatureFlag.ASSET_RENAME_ENABLED, remoteConfig.value.asset_rename_enabled, false);
		},
		get privateModelsEnabled() {
			return resolveFlag(ServerFeatureFlag.PRIVATE_MODELS_ENABLED, remoteConfig.value.private_models_enabled, false);
		},
		get onboardingSurveyEnabled() {
			return resolveFlag(ServerFeatureFlag.ONBOARDING_SURVEY_ENABLED, remoteConfig.value.onboarding_survey_enabled, false);
		},
		get linearToggleEnabled() {
			return resolveFlag(ServerFeatureFlag.LINEAR_TOGGLE_ENABLED, remoteConfig.value.linear_toggle_enabled, false);
		},
		get teamWorkspacesEnabled() {
			const override = /* @__PURE__ */ getDevOverride(ServerFeatureFlag.TEAM_WORKSPACES_ENABLED);
			if (override !== void 0) return override;
			if (!isCloud) return false;
			if (!isAuthenticatedConfigLoaded.value) return false;
			return remoteConfig.value.team_workspaces_enabled ?? api.getServerFeature(ServerFeatureFlag.TEAM_WORKSPACES_ENABLED, false);
		},
		get userSecretsEnabled() {
			return resolveFlag(ServerFeatureFlag.USER_SECRETS_ENABLED, remoteConfig.value.user_secrets_enabled, false);
		},
		get nodeReplacementsEnabled() {
			return api.getServerFeature(ServerFeatureFlag.NODE_REPLACEMENTS, false);
		},
		get nodeLibraryEssentialsEnabled() {
			return remoteConfig.value.node_library_essentials_enabled ?? api.getServerFeature(ServerFeatureFlag.NODE_LIBRARY_ESSENTIALS_ENABLED, false);
		}
	});
	const featureFlag = (featurePath, defaultValue) => computed(() => api.getServerFeature(featurePath, defaultValue));
	return {
		flags: readonly(flags),
		featureFlag
	};
}
export { remoteConfigState as a, remoteConfig as i, useFeatureFlags as n, configValueOrDefault as r, ServerFeatureFlag as t };

//# sourceMappingURL=useFeatureFlags-D-_6c-wx.js.map