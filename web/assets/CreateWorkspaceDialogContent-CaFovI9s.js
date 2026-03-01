import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { dt as useToast } from "./vendor-primevue-DxYsW_Ng.js";
import "./vendor-firebase-DnyyBhvM.js";
import { D as computed, F as createTextVNode, I as createVNode, O as createBaseVNode, R as defineComponent, Ut as toDisplayString, _ as vModelText, _t as withCtx, et as openBlock, j as createElementBlock, kt as ref, vt as withDirectives, y as withKeys } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-C6-gqLl2.js";
import "./useFeatureFlags-D8PCe3j0.js";
import "./vendor-reka-ui--l_O1Shn.js";
import "./api-C6l3jfo9.js";
import "./vendor-markdown-DFo_IkzS.js";
import "./colorUtil-CPODED-Q.js";
import { n as useI18n } from "./vendor-i18n-czJbbAfl.js";
import "./i18n-Dw0liyWq.js";
import { t as Button_default } from "./Button-DQNHabQW.js";
import { ti as useTeamWorkspaceStore, wi as useDialogStore } from "./dialogService-CwDBFHIT.js";
import "./extensionStore-BygwWgzY.js";
import "./userStore-nuah1-5i.js";
import "./useErrorHandling-XEUYiWQB.js";
import "./useExternalLink-BC_To13P.js";
import "./vendor-tiptap-BnYkbQDM.js";
import "./markdownRendererUtil-COLKL0Bq.js";
import "./Popover-DEsU7dja.js";
var _hoisted_1 = { class: "flex w-full max-w-[400px] flex-col rounded-2xl border border-border-default bg-base-background" };
var _hoisted_2 = { class: "flex h-12 items-center justify-between border-b border-border-default px-4" };
var _hoisted_3 = { class: "m-0 text-sm font-normal text-base-foreground" };
var _hoisted_4 = ["aria-label"];
var _hoisted_5 = { class: "flex flex-col gap-4 px-4 py-4" };
var _hoisted_6 = { class: "m-0 text-sm text-muted-foreground" };
var _hoisted_7 = { class: "flex flex-col gap-2" };
var _hoisted_8 = { class: "text-sm text-base-foreground" };
var _hoisted_9 = ["placeholder"];
var _hoisted_10 = { class: "flex items-center justify-end gap-4 px-4 py-4" };
var CreateWorkspaceDialogContent_default = /* @__PURE__ */ defineComponent({
	__name: "CreateWorkspaceDialogContent",
	props: { onConfirm: { type: Function } },
	setup(__props) {
		const { t } = useI18n();
		const dialogStore = useDialogStore();
		const toast = useToast();
		const workspaceStore = useTeamWorkspaceStore();
		const loading = ref(false);
		const workspaceName = ref("");
		const isValidName = computed(() => {
			const name = workspaceName.value.trim();
			return name.length >= 1 && name.length <= 50 && /^[a-zA-Z0-9][a-zA-Z0-9\s\-_'.,()&+]*$/.test(name);
		});
		function onCancel() {
			dialogStore.closeDialog({ key: "create-workspace" });
		}
		async function onCreate() {
			if (!isValidName.value) return;
			loading.value = true;
			try {
				const name = workspaceName.value.trim();
				await __props.onConfirm?.(name);
				dialogStore.closeDialog({ key: "create-workspace" });
				await workspaceStore.createWorkspace(name);
			} catch (error) {
				console.error("[CreateWorkspaceDialog] Failed to create workspace:", error);
				toast.add({
					severity: "error",
					summary: t("workspacePanel.toast.failedToCreateWorkspace"),
					detail: error instanceof Error ? error.message : t("g.unknownError"),
					life: 5e3
				});
			} finally {
				loading.value = false;
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("div", _hoisted_2, [createBaseVNode("h2", _hoisted_3, toDisplayString(_ctx.$t("workspacePanel.createWorkspaceDialog.title")), 1), createBaseVNode("button", {
					class: "cursor-pointer rounded border-none bg-transparent p-0 text-muted-foreground transition-colors hover:text-base-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary-foreground",
					"aria-label": _ctx.$t("g.close"),
					onClick: onCancel
				}, [..._cache[2] || (_cache[2] = [createBaseVNode("i", { class: "pi pi-times size-4" }, null, -1)])], 8, _hoisted_4)]),
				createBaseVNode("div", _hoisted_5, [createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("workspacePanel.createWorkspaceDialog.message")), 1), createBaseVNode("div", _hoisted_7, [createBaseVNode("label", _hoisted_8, toDisplayString(_ctx.$t("workspacePanel.createWorkspaceDialog.nameLabel")), 1), withDirectives(createBaseVNode("input", {
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => workspaceName.value = $event),
					type: "text",
					class: "w-full rounded-lg border border-border-default bg-transparent px-3 py-2 text-sm text-base-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-secondary-foreground",
					placeholder: _ctx.$t("workspacePanel.createWorkspaceDialog.namePlaceholder"),
					onKeydown: _cache[1] || (_cache[1] = withKeys(($event) => isValidName.value && onCreate(), ["enter"]))
				}, null, 40, _hoisted_9), [[vModelText, workspaceName.value]])])]),
				createBaseVNode("div", _hoisted_10, [createVNode(Button_default, {
					variant: "muted-textonly",
					onClick: onCancel
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.cancel")), 1)]),
					_: 1
				}), createVNode(Button_default, {
					variant: "primary",
					size: "lg",
					loading: loading.value,
					disabled: !isValidName.value,
					onClick: onCreate
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.createWorkspaceDialog.create")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])])
			]);
		};
	}
});
export { CreateWorkspaceDialogContent_default as default };

//# sourceMappingURL=CreateWorkspaceDialogContent-CaFovI9s.js.map