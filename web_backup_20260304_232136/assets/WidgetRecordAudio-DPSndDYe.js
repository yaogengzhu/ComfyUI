import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { H as script } from "./vendor-primevue-CN8WO3jr.js";
import "./vendor-firebase-DN8BxCYa.js";
import { A as createCommentVNode, D as computed, F as createTextVNode, G as mergeModels, Ht as normalizeStyle, I as createVNode, O as createBaseVNode, Q as onUnmounted, R as defineComponent, Rt as unref, S as Fragment, Ut as toDisplayString, Z as onMounted, _t as withCtx, et as openBlock, j as createElementBlock, kt as ref, nt as renderList, q as nextTick, ut as useModel, wt as markRaw } from "./vendor-vue-core-tg-oZu4l.js";
import { r as mediaRecorderConstructor } from "./vendor-other-BlwZz5NW.js";
import "./useFeatureFlags-BuKVU3gG.js";
import { tn as useIntervalFn } from "./vendor-reka-ui-C_KZ-Z9x.js";
import { It as useToastStore } from "./api-p6hGo6pS.js";
import "./vendor-markdown-DF7_n7Ki.js";
import "./colorUtil-0jM4jJ4_.js";
import { n as useI18n } from "./vendor-i18n-D6iZeZ7U.js";
import "./i18n-B95gNu60.js";
import "./userStore-CVXXciNs.js";
import "./huizhiAuthService-D-kJyr3e.js";
import { l as app } from "./teamWorkspaceStore-CrgYR715.js";
import "./Button-BXdh2GzZ.js";
import "./extensionStore-DiDsM3E0.js";
import "./useErrorHandling-B7U_HHbw.js";
import "./useExternalLink-DXOke9aD.js";
import "./vendor-tiptap-C9679tdI.js";
import "./markdownRendererUtil-rU1hBHFB.js";
import "./Popover-Bju946nz.js";
import { t as formatTime } from "./audioUtils-CjW3tE5K.js";
import { t as useAudioService } from "./audioService-vbPdsh1S.js";
var _hoisted_1$1 = {
	viewBox: "0 0 24 24",
	width: "1.2em",
	height: "1.2em"
};
function render(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$1, [..._cache[0] || (_cache[0] = [createBaseVNode("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [createBaseVNode("path", { d: "M12 19v3m7-12v2a7 7 0 0 1-14 0v-2" }), createBaseVNode("rect", {
		width: "6",
		height: "13",
		x: "9",
		y: "2",
		rx: "3"
	})], -1)])]);
}
var mic_default = markRaw({
	name: "lucide-mic",
	render
});
function useAudioPlayback(audioRef, options = {}) {
	const isPlaying = ref(false);
	const audioElementKey = ref(0);
	const playbackTimerInterval = ref(null);
	async function play() {
		if (!audioRef.value) return false;
		try {
			await audioRef.value.play();
			isPlaying.value = true;
			return true;
		} catch (error) {
			console.warn("Audio playback failed:", error);
			isPlaying.value = false;
			return false;
		}
	}
	function stop() {
		if (audioRef.value) {
			audioRef.value.pause();
			audioRef.value.currentTime = 0;
		}
		isPlaying.value = false;
		if (options.onPlaybackEnded) options.onPlaybackEnded();
	}
	function onPlaybackEnded() {
		isPlaying.value = false;
		if (options.onPlaybackEnded) options.onPlaybackEnded();
	}
	function onMetadataLoaded() {
		if (audioRef.value?.duration && options.onMetadataLoaded) options.onMetadataLoaded(audioRef.value.duration);
	}
	async function resetAudioElement() {
		audioElementKey.value += 1;
		await nextTick();
	}
	function getCurrentTime() {
		return audioRef.value?.currentTime || 0;
	}
	function getDuration() {
		return audioRef.value?.duration || 0;
	}
	return {
		isPlaying,
		audioElementKey,
		play,
		stop,
		onPlaybackEnded,
		onMetadataLoaded,
		resetAudioElement,
		getCurrentTime,
		getDuration,
		playbackTimerInterval
	};
}
function useAudioRecorder(options = {}) {
	const isRecording = ref(false);
	const mediaRecorder = ref(null);
	const audioChunks = ref([]);
	const stream = ref(null);
	const recordedURL = ref(null);
	async function startRecording() {
		try {
			if (recordedURL.value?.startsWith("blob:")) URL.revokeObjectURL(recordedURL.value);
			audioChunks.value = [];
			recordedURL.value = null;
			await useAudioService().registerWavEncoder();
			stream.value = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaRecorder.value = new mediaRecorderConstructor(stream.value, { mimeType: "audio/wav" });
			mediaRecorder.value.ondataavailable = (e) => {
				audioChunks.value.push(e.data);
			};
			mediaRecorder.value.onstop = async () => {
				const blob = new Blob(audioChunks.value, { type: "audio/wav" });
				if (recordedURL.value?.startsWith("blob:")) URL.revokeObjectURL(recordedURL.value);
				recordedURL.value = URL.createObjectURL(blob);
				if (options.onRecordingComplete) await options.onRecordingComplete(blob);
				cleanup();
			};
			mediaRecorder.value.start(100);
			isRecording.value = true;
		} catch (err) {
			if (options.onError) options.onError(err);
			throw err;
		}
	}
	function stopRecording() {
		if (mediaRecorder.value && mediaRecorder.value.state !== "inactive") mediaRecorder.value.stop();
		else cleanup();
	}
	function cleanup() {
		isRecording.value = false;
		if (stream.value) {
			stream.value.getTracks().forEach((track) => track.stop());
			stream.value = null;
		}
	}
	function dispose() {
		stopRecording();
		if (recordedURL.value) {
			URL.revokeObjectURL(recordedURL.value);
			recordedURL.value = null;
		}
	}
	onUnmounted(() => {
		dispose();
	});
	return {
		isRecording,
		recordedURL,
		mediaRecorder,
		startRecording,
		stopRecording,
		dispose
	};
}
function useAudioWaveform(options = {}) {
	const { barCount = 18, minHeight = 4, maxHeight = 32 } = options;
	const waveformBars = ref(Array.from({ length: barCount }, () => ({ height: 16 })));
	const audioContext = ref(null);
	const analyser = ref(null);
	const dataArray = ref(null);
	const animationId = ref(null);
	const mediaElementSource = ref(null);
	function initWaveform() {
		waveformBars.value = Array.from({ length: barCount }, () => ({ height: Math.random() * (maxHeight - minHeight) + minHeight }));
	}
	function updateWaveform(isActive) {
		if (!isActive.value) return;
		if (analyser.value && dataArray.value) updateWaveformFromAudio();
		else updateWaveformRandom();
		animationId.value = requestAnimationFrame(() => updateWaveform(isActive));
	}
	function updateWaveformFromAudio() {
		if (!analyser.value || !dataArray.value) return;
		analyser.value.getByteFrequencyData(dataArray.value);
		const samplesPerBar = Math.floor(dataArray.value.length / barCount);
		waveformBars.value = waveformBars.value.map((_, i) => {
			let sum = 0;
			for (let j = 0; j < samplesPerBar; j++) sum += dataArray.value[i * samplesPerBar + j] || 0;
			return { height: sum / samplesPerBar / 255 * (maxHeight - minHeight) + minHeight };
		});
	}
	function updateWaveformRandom() {
		waveformBars.value = waveformBars.value.map((bar) => ({ height: Math.max(minHeight, Math.min(maxHeight, bar.height + (Math.random() - .5) * 4)) }));
	}
	async function setupAudioContext() {
		if (audioContext.value && audioContext.value.state !== "closed") await audioContext.value.close();
		audioContext.value = null;
		mediaElementSource.value = null;
	}
	async function setupRecordingVisualization(stream) {
		audioContext.value = new window.AudioContext();
		analyser.value = audioContext.value.createAnalyser();
		audioContext.value.createMediaStreamSource(stream).connect(analyser.value);
		analyser.value.fftSize = 256;
		dataArray.value = new Uint8Array(analyser.value.frequencyBinCount);
	}
	async function setupPlaybackVisualization(audioElement) {
		if (audioContext.value && audioContext.value.state !== "closed") await audioContext.value.close();
		mediaElementSource.value = null;
		if (!audioElement) return false;
		audioContext.value = new window.AudioContext();
		analyser.value = audioContext.value.createAnalyser();
		mediaElementSource.value = audioContext.value.createMediaElementSource(audioElement);
		mediaElementSource.value.connect(analyser.value);
		analyser.value.connect(audioContext.value.destination);
		analyser.value.fftSize = 256;
		dataArray.value = new Uint8Array(analyser.value.frequencyBinCount);
		return true;
	}
	function stopWaveform() {
		if (animationId.value) {
			cancelAnimationFrame(animationId.value);
			animationId.value = null;
		}
	}
	function dispose() {
		stopWaveform();
		if (audioContext.value && audioContext.value.state !== "closed") audioContext.value.close();
		audioContext.value = null;
		mediaElementSource.value = null;
	}
	onUnmounted(() => {
		dispose();
	});
	return {
		waveformBars,
		initWaveform,
		updateWaveform,
		setupAudioContext,
		setupRecordingVisualization,
		setupPlaybackVisualization,
		stopWaveform,
		dispose
	};
}
var _hoisted_1 = { class: "relative" };
var _hoisted_2 = { class: "mb-4" };
var _hoisted_3 = {
	key: 0,
	class: "flex h-14 w-full min-w-0 items-center gap-2 rounded-lg px-3 bg-node-component-surface text-text-secondary"
};
var _hoisted_4 = { class: "flex shrink-0 items-center gap-1" };
var _hoisted_5 = { class: "text-xs" };
var _hoisted_6 = { class: "text-sm" };
var _hoisted_7 = { class: "flex h-8 min-w-0 flex-1 items-center gap-2 overflow-hidden" };
var _hoisted_8 = ["title"];
var _hoisted_9 = ["title"];
var _hoisted_10 = ["title"];
var _hoisted_11 = ["title"];
var _hoisted_12 = ["src"];
var WidgetRecordAudio_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetRecordAudio",
	props: /* @__PURE__ */ mergeModels({
		readonly: { type: Boolean },
		nodeId: {}
	}, {
		"modelValue": { default: "" },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const { t } = useI18n();
		const props = __props;
		const audioRef = ref();
		let lastUploadedPath = "";
		const recorder = useAudioRecorder({
			onRecordingComplete: handleRecordingComplete,
			onError: () => {
				useToastStore().addAlert(t("g.micPermissionDenied") || "Microphone permission denied");
			}
		});
		const waveform = useAudioWaveform({
			barCount: 18,
			minHeight: 4,
			maxHeight: 32
		});
		const playback = useAudioPlayback(audioRef, {
			onPlaybackEnded: handlePlaybackEnded,
			onMetadataLoaded: (duration) => {
				if (!isPlaying.value && !isRecording.value) timer.value = Math.floor(duration);
			}
		});
		const timer = ref(0);
		const { pause: pauseTimer, resume: resumeTimer } = useIntervalFn(() => {
			timer.value += 1;
		}, 1e3, { immediate: false });
		const { isRecording, recordedURL } = recorder;
		const { waveformBars } = waveform;
		const { isPlaying, audioElementKey } = playback;
		const isWaveformActive = computed(() => isRecording.value || isPlaying.value);
		const modelValue = useModel(__props, "modelValue");
		const litegraphNode = computed(() => {
			if (!props.nodeId || !app.canvas.graph) return null;
			return app.canvas.graph.getNodeById(props.nodeId);
		});
		async function handleRecordingComplete(blob) {
			try {
				const path = await useAudioService().convertBlobToFileAndSubmit(blob);
				modelValue.value = path;
				lastUploadedPath = path;
			} catch (e) {
				useToastStore().addAlert("Failed to upload recorded audio");
			}
		}
		async function handleStartRecording() {
			if (props.readonly) return;
			try {
				await waveform.setupAudioContext();
				await recorder.startRecording();
				if (recorder.mediaRecorder.value) {
					const stream = recorder.mediaRecorder.value.stream;
					if (stream) await waveform.setupRecordingVisualization(stream);
				}
				timer.value = 0;
				resumeTimer();
				waveform.initWaveform();
				waveform.updateWaveform(isWaveformActive);
			} catch (err) {
				console.error("Failed to start recording:", err);
			}
		}
		function handleStopRecording() {
			recorder.stopRecording();
			pauseTimer();
			waveform.stopWaveform();
		}
		async function handlePlayRecording() {
			if (!recordedURL.value) return;
			timer.value = 0;
			await playback.resetAudioElement();
			await new Promise((resolve) => setTimeout(resolve, 50));
			if (!audioRef.value) return;
			if (!await waveform.setupPlaybackVisualization(audioRef.value)) return;
			await playback.play();
			waveform.initWaveform();
			waveform.updateWaveform(isWaveformActive);
			const timerInterval = setInterval(() => {
				timer.value = Math.floor(playback.getCurrentTime());
			}, 100);
			playback.playbackTimerInterval.value = timerInterval;
		}
		function handleStopPlayback() {
			playback.stop();
			handlePlaybackEnded();
		}
		function handlePlaybackEnded() {
			waveform.stopWaveform();
			if (playback.playbackTimerInterval.value !== null) {
				clearInterval(playback.playbackTimerInterval.value);
				playback.playbackTimerInterval.value = null;
			}
			const duration = playback.getDuration();
			if (duration) timer.value = Math.floor(duration);
			else timer.value = 0;
		}
		async function serializeValue() {
			if (isRecording.value && recorder.mediaRecorder.value) {
				recorder.mediaRecorder.value.stop();
				await new Promise((resolve, reject) => {
					let attempts = 0;
					const maxAttempts = 50;
					const checkRecording = () => {
						if (!isRecording.value && modelValue.value) resolve(void 0);
						else if (++attempts >= maxAttempts) reject(/* @__PURE__ */ new Error("Recording serialization timeout after 5 seconds"));
						else setTimeout(checkRecording, 100);
					};
					checkRecording();
				});
			}
			return modelValue.value || lastUploadedPath || "";
		}
		function registerWidgetSerialization() {
			const node = litegraphNode.value;
			if (!node?.widgets) return;
			const targetWidget = node.widgets.find((w) => w.name === "audio");
			if (targetWidget) targetWidget.serializeValue = serializeValue;
		}
		onMounted(() => {
			waveform.initWaveform();
			registerWidgetSerialization();
		});
		onUnmounted(() => {
			if (playback.playbackTimerInterval.value !== null) {
				clearInterval(playback.playbackTimerInterval.value);
				playback.playbackTimerInterval.value = null;
			}
		});
		return (_ctx, _cache) => {
			const _component_i_lucide58mic = mic_default;
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("div", _hoisted_2, [createVNode(unref(script), {
					class: "text-base-foreground w-full border-0 bg-secondary-background hover:bg-secondary-background-hover",
					disabled: unref(isRecording) || __props.readonly,
					onClick: handleStartRecording
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("g.startRecording", "Start Recording")) + " ", 1), createVNode(_component_i_lucide58mic, { class: "ml-1" })]),
					_: 1
				}, 8, ["disabled"])]),
				unref(isRecording) || unref(isPlaying) || unref(recordedURL) ? (openBlock(), createElementBlock("div", _hoisted_3, [
					createBaseVNode("div", _hoisted_4, [createBaseVNode("span", _hoisted_5, toDisplayString(unref(isRecording) ? unref(t)("g.listening", "Listening...") : unref(isPlaying) ? unref(t)("g.playing", "Playing...") : unref(recordedURL) ? unref(t)("g.ready", "Ready") : ""), 1), createBaseVNode("span", _hoisted_6, toDisplayString(unref(formatTime)(timer.value)), 1)]),
					createBaseVNode("div", _hoisted_7, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(waveformBars), (bar, index) => {
						return openBlock(), createElementBlock("div", {
							key: index,
							class: "max-h-8 min-h-1 w-0.75 rounded-[1.5px] bg-slate-100 transition-all duration-100",
							style: normalizeStyle({ height: bar.height + "px" }),
							title: `Bar ${index + 1}: ${bar.height}px`
						}, null, 12, _hoisted_8);
					}), 128))]),
					unref(isRecording) ? (openBlock(), createElementBlock("button", {
						key: 0,
						title: unref(t)("g.stopRecording", "Stop Recording"),
						class: "flex shrink-0 size-8 animate-pulse items-center justify-center rounded-full border-0 bg-smoke-500/33 transition-colors",
						onClick: handleStopRecording
					}, [..._cache[2] || (_cache[2] = [createBaseVNode("div", { class: "size-2.5 rounded-sm bg-danger-100" }, null, -1)])], 8, _hoisted_9)) : !unref(isRecording) && unref(recordedURL) && !unref(isPlaying) ? (openBlock(), createElementBlock("button", {
						key: 1,
						title: unref(t)("g.playRecording") || "Play Recording",
						class: "flex shrink-0 size-8 items-center justify-center rounded-full border-0 bg-smoke-500/33 transition-colors",
						onClick: handlePlayRecording
					}, [..._cache[3] || (_cache[3] = [createBaseVNode("i", { class: "text-text-secondary icon-[lucide--play] size-4" }, null, -1)])], 8, _hoisted_10)) : unref(isPlaying) ? (openBlock(), createElementBlock("button", {
						key: 2,
						title: unref(t)("g.stopPlayback") || "Stop Playback",
						class: "flex shrink-0 size-8 items-center justify-center rounded-full border-0 bg-smoke-500/33 transition-colors",
						onClick: handleStopPlayback
					}, [..._cache[4] || (_cache[4] = [createBaseVNode("i", { class: "text-text-secondary icon-[lucide--square] size-4" }, null, -1)])], 8, _hoisted_11)) : createCommentVNode("", true)
				])) : createCommentVNode("", true),
				unref(recordedURL) ? (openBlock(), createElementBlock("audio", {
					ref_key: "audioRef",
					ref: audioRef,
					key: unref(audioElementKey),
					src: unref(recordedURL),
					class: "hidden",
					onEnded: _cache[0] || (_cache[0] = (...args) => unref(playback).onPlaybackEnded && unref(playback).onPlaybackEnded(...args)),
					onLoadedmetadata: _cache[1] || (_cache[1] = (...args) => unref(playback).onMetadataLoaded && unref(playback).onMetadataLoaded(...args))
				}, null, 40, _hoisted_12)) : createCommentVNode("", true)
			]);
		};
	}
});
export { WidgetRecordAudio_default as default };

//# sourceMappingURL=WidgetRecordAudio-DPSndDYe.js.map