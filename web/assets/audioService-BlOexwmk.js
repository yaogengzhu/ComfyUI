import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { i as register, n as connect } from "./vendor-other-Cb4peHqA.js";
import { It as useToastStore, r as api } from "./api-CrHaA16j.js";
var isEncoderRegistered = false;
const useAudioService = () => {
	const handleError = (type, message, originalError) => {
		console.error(`Audio Service Error (${type}):`, message, originalError);
	};
	const stopAllTracks = (currentStream) => {
		if (currentStream) {
			currentStream.getTracks().forEach((track) => {
				track.stop();
			});
			currentStream = null;
		}
	};
	const registerWavEncoder = async () => {
		if (isEncoderRegistered) return;
		try {
			await register(await connect());
			isEncoderRegistered = true;
		} catch (err) {
			if (err instanceof Error && err.message.includes("already an encoder stored")) isEncoderRegistered = true;
			else handleError("encoder", "Failed to register WAV encoder", err);
		}
	};
	const convertBlobToFileAndSubmit = async (blob) => {
		const name = `recording-${Date.now()}.wav`;
		const file = new File([blob], name, { type: blob.type || "audio/wav" });
		const body = new FormData();
		body.append("image", file);
		body.append("subfolder", "audio");
		body.append("type", "temp");
		const resp = await api.fetchApi("/upload/image", {
			method: "POST",
			body
		});
		if (resp.status !== 200) {
			const err = `Error uploading temp file: ${resp.status} - ${resp.statusText}`;
			useToastStore().addAlert(err);
			throw new Error(err);
		}
		return `audio/${(await resp.json()).name} [temp]`;
	};
	return {
		convertBlobToFileAndSubmit,
		registerWavEncoder,
		stopAllTracks
	};
};
export { useAudioService as t };

//# sourceMappingURL=audioService-BlOexwmk.js.map