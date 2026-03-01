import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { S as script$1, ft as useToast, x as script } from "./vendor-primevue-kyY2H95P.js";
import "./vendor-firebase-DnyyBhvM.js";
import { A as createCommentVNode, D as computed, G as mergeModels, Ht as normalizeStyle, I as createVNode, O as createBaseVNode, R as defineComponent, Rt as unref, Ut as toDisplayString, _t as withCtx, et as openBlock, ft as useTemplateRef, j as createElementBlock, k as createBlock, kt as ref, ut as useModel } from "./vendor-vue-core-tg-oZu4l.js";
import "./vendor-other-C6-gqLl2.js";
import "./useFeatureFlags-DckF7njG.js";
import { on as whenever } from "./vendor-reka-ui--l_O1Shn.js";
import "./api-DO80yGLB.js";
import "./vendor-markdown-DFo_IkzS.js";
import "./colorUtil-CPODED-Q.js";
import { n as useI18n } from "./vendor-i18n-czJbbAfl.js";
import "./i18n-CrjEfjCc.js";
import { t as cn } from "./src-CaI548es.js";
import { t as Button_default } from "./Button-DQNHabQW.js";
import { Kr as downloadFile } from "./dialogService-CX-W6rM1.js";
import "./extensionStore-D4phRtC7.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DnHSq4Qt.js";
import "./userStore-By-hILYF.js";
import "./useErrorHandling-CY3ZcjJs.js";
import "./useExternalLink-DGE106nN.js";
import "./vendor-tiptap-BnYkbQDM.js";
import "./markdownRendererUtil-COLKL0Bq.js";
import "./Popover-DEsU7dja.js";
import { t as formatTime } from "./audioUtils-d3B26YtH.js";
var _hoisted_1 = { class: "relative" };
var _hoisted_2 = {
	key: 0,
	class: "bg-component-node-widget-background box-border flex gap-4 items-center justify-start relative rounded-lg w-full h-16 px-4 py-0"
};
var _hoisted_3 = ["src"];
var _hoisted_4 = { class: "relative flex shrink-0 items-center justify-start gap-2" };
var _hoisted_5 = {
	key: 0,
	class: "text-secondary icon-[lucide--play] size-4"
};
var _hoisted_6 = {
	key: 1,
	class: "text-secondary icon-[lucide--pause] size-4"
};
var _hoisted_7 = { class: "text-sm font-normal text-nowrap text-base-foreground" };
var _hoisted_8 = { class: "relative h-0.5 flex-1 rounded-full bg-interface-stroke" };
var _hoisted_9 = ["value", "aria-label"];
var _hoisted_10 = { class: "relative flex shrink-0 items-center justify-start gap-2" };
var _hoisted_11 = {
	key: 0,
	class: "text-secondary icon-[lucide--volume-2] size-4"
};
var _hoisted_12 = {
	key: 1,
	class: "text-secondary icon-[lucide--volume-1] size-4"
};
var _hoisted_13 = {
	key: 2,
	class: "text-secondary icon-[lucide--volume-x] size-4"
};
var _hoisted_14 = {
	key: 0,
	class: "w-48 px-4 py-2"
};
var _hoisted_15 = { class: "mb-2 block text-xs text-base-foreground" };
var _hoisted_16 = ["onClick"];
var _hoisted_17 = { class: "text-base-foreground" };
var _hoisted_18 = {
	key: 0,
	class: "ml-auto icon-[lucide--check] size-4 text-base-foreground"
};
var AudioPreviewPlayer_default = /* @__PURE__ */ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "AudioPreviewPlayer",
	props: /* @__PURE__ */ mergeModels({
		hideWhenEmpty: {
			type: Boolean,
			default: true
		},
		showOptionsButton: { type: Boolean }
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const { t } = useI18n();
		const toast = useToast();
		const audioRef = useTemplateRef("audioRef");
		const optionsMenu = ref();
		const isPlaying = ref(false);
		const isMuted = ref(false);
		const volume = ref(1);
		const currentTime = ref(0);
		const duration = ref(0);
		const playbackRate = ref(1);
		const progressPercentage = computed(() => {
			if (!duration.value || duration.value === 0) return 0;
			return currentTime.value / duration.value * 100;
		});
		const modelValue = useModel(__props, "modelValue");
		const showVolumeTwo = computed(() => !isMuted.value && volume.value > .5);
		const showVolumeOne = computed(() => isMuted.value && volume.value > 0);
		const togglePlayPause = () => {
			if (!audioRef.value || !audioRef.value.src) return;
			if (isPlaying.value) audioRef.value.pause();
			else audioRef.value.play();
			isPlaying.value = !isPlaying.value;
		};
		const handleDownload = () => {
			if (!modelValue.value) return;
			try {
				downloadFile(modelValue.value);
			} catch {
				toast.add({
					severity: "error",
					summary: t("g.error"),
					detail: t("g.failedToDownloadFile"),
					life: 3e3
				});
			}
		};
		const toggleMute = () => {
			if (audioRef.value) {
				isMuted.value = !isMuted.value;
				audioRef.value.muted = isMuted.value;
			}
		};
		const handleSeek = (event) => {
			const target = event.target;
			const value = parseFloat(target.value);
			if (audioRef.value && duration.value > 0) {
				const newTime = value / 100 * duration.value;
				audioRef.value.currentTime = newTime;
				currentTime.value = newTime;
			}
		};
		const handleLoadedMetadata = () => {
			if (audioRef.value) duration.value = audioRef.value.duration;
		};
		const handleTimeUpdate = () => {
			if (audioRef.value) currentTime.value = audioRef.value.currentTime;
		};
		const handleEnded = () => {
			isPlaying.value = false;
			currentTime.value = 0;
		};
		const toggleOptionsMenu = (event) => {
			optionsMenu.value?.toggle(event);
		};
		const setPlaybackSpeed = (speed) => {
			playbackRate.value = speed;
			if (audioRef.value) audioRef.value.playbackRate = speed;
		};
		const handleVolumeChange = (value) => {
			volume.value = (Array.isArray(value) ? value[0] : value) / 10;
			if (audioRef.value) {
				audioRef.value.volume = volume.value;
				if (volume.value > 0 && isMuted.value) {
					isMuted.value = false;
					audioRef.value.muted = false;
				}
			}
		};
		const menuItems = computed(() => [{
			label: t("g.playbackSpeed"),
			items: [
				{
					label: t("g.halfSpeed"),
					onClick: () => setPlaybackSpeed(.5),
					selected: playbackRate.value === .5
				},
				{
					label: t("g.1x"),
					onClick: () => setPlaybackSpeed(1),
					selected: playbackRate.value === 1
				},
				{
					label: t("g.2x"),
					onClick: () => setPlaybackSpeed(2),
					selected: playbackRate.value === 2
				}
			]
		}, {
			label: t("g.volume"),
			key: "volume"
		}]);
		whenever(modelValue, () => {
			isPlaying.value = false;
			audioRef.value?.pause();
			audioRef.value?.load();
		}, { immediate: true });
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [!__props.hideWhenEmpty || modelValue.value ? (openBlock(), createElementBlock("div", _hoisted_2, [
				createBaseVNode("audio", {
					ref_key: "audioRef",
					ref: audioRef,
					src: modelValue.value,
					onLoadedmetadata: handleLoadedMetadata,
					onTimeupdate: handleTimeUpdate,
					onEnded: handleEnded
				}, null, 40, _hoisted_3),
				createBaseVNode("div", _hoisted_4, [createVNode(Button_default, {
					variant: "textonly",
					size: "unset",
					"aria-label": _ctx.$t("g.playPause"),
					class: "size-6 rounded",
					onClick: togglePlayPause
				}, {
					default: withCtx(() => [!isPlaying.value ? (openBlock(), createElementBlock("i", _hoisted_5)) : (openBlock(), createElementBlock("i", _hoisted_6))]),
					_: 1
				}, 8, ["aria-label"]), createBaseVNode("div", _hoisted_7, toDisplayString(unref(formatTime)(currentTime.value)) + " / " + toDisplayString(unref(formatTime)(duration.value)), 1)]),
				createBaseVNode("div", _hoisted_8, [createBaseVNode("div", {
					class: "absolute top-0 left-0 h-full rounded-full bg-button-icon transition-all",
					style: normalizeStyle({ width: `${progressPercentage.value}%` })
				}, null, 4), createBaseVNode("input", {
					type: "range",
					value: progressPercentage.value,
					min: "0",
					max: "100",
					step: "0.1",
					"aria-label": _ctx.$t("g.audioProgress"),
					class: "absolute inset-0 w-full cursor-pointer opacity-0",
					onInput: handleSeek
				}, null, 40, _hoisted_9)]),
				createBaseVNode("div", _hoisted_10, [
					createVNode(Button_default, {
						variant: "textonly",
						size: "unset",
						"aria-label": _ctx.$t("g.volume"),
						class: "size-6 rounded",
						onClick: toggleMute
					}, {
						default: withCtx(() => [showVolumeTwo.value ? (openBlock(), createElementBlock("i", _hoisted_11)) : showVolumeOne.value ? (openBlock(), createElementBlock("i", _hoisted_12)) : (openBlock(), createElementBlock("i", _hoisted_13))]),
						_: 1
					}, 8, ["aria-label"]),
					modelValue.value ? (openBlock(), createBlock(Button_default, {
						key: 0,
						size: "icon-sm",
						variant: "textonly",
						"aria-label": _ctx.$t("g.downloadAudio"),
						title: _ctx.$t("g.downloadAudio"),
						class: "size-6 hover:bg-interface-menu-component-surface-hovered",
						onClick: handleDownload
					}, {
						default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "text-secondary icon-[lucide--download] size-4" }, null, -1)])]),
						_: 1
					}, 8, ["aria-label", "title"])) : createCommentVNode("", true),
					__props.showOptionsButton ? (openBlock(), createBlock(Button_default, {
						key: 1,
						variant: "textonly",
						size: "unset",
						"aria-label": _ctx.$t("g.moreOptions"),
						class: "size-6 rounded",
						onClick: toggleOptionsMenu
					}, {
						default: withCtx(() => [..._cache[1] || (_cache[1] = [createBaseVNode("i", { class: "text-secondary icon-[lucide--more-vertical] size-4" }, null, -1)])]),
						_: 1
					}, 8, ["aria-label"])) : createCommentVNode("", true)
				]),
				createVNode(unref(script), {
					ref_key: "optionsMenu",
					ref: optionsMenu,
					model: menuItems.value,
					popup: "",
					class: "audio-player-menu",
					"pt:root:class": unref(cn)("bg-component-node-widget-background border-component-node-border"),
					"pt:submenu:class": unref(cn)("bg-component-node-widget-background")
				}, {
					item: withCtx(({ item }) => [item.key === "volume" ? (openBlock(), createElementBlock("div", _hoisted_14, [createBaseVNode("label", _hoisted_15, toDisplayString(item.label), 1), createVNode(unref(script$1), {
						"model-value": volume.value * 10,
						min: 0,
						max: 10,
						step: 1,
						class: "w-full",
						"onUpdate:modelValue": handleVolumeChange
					}, null, 8, ["model-value"])])) : (openBlock(), createElementBlock("div", {
						key: 1,
						class: "flex cursor-pointer items-center px-4 py-2 text-xs hover:bg-white/10",
						onClick: ($event) => item.onClick?.()
					}, [createBaseVNode("span", _hoisted_17, toDisplayString(item.label), 1), item.selected ? (openBlock(), createElementBlock("i", _hoisted_18)) : createCommentVNode("", true)], 8, _hoisted_16))]),
					_: 1
				}, 8, [
					"model",
					"pt:root:class",
					"pt:submenu:class"
				])
			])) : createCommentVNode("", true)]);
		};
	}
}), [["__scopeId", "data-v-7378059a"]]);
export { AudioPreviewPlayer_default as default };

//# sourceMappingURL=AudioPreviewPlayer-DaATzjPs.js.map