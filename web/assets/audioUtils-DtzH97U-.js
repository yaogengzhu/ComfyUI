import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { o as app } from "./dialogService-DvfIRFpk.js";
function formatTime(seconds) {
	if (isNaN(seconds) || seconds === 0) return "0:00";
	return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
}
function getResourceURL(subfolder, filename, type = "input") {
	return `/view?${[
		"filename=" + encodeURIComponent(filename),
		"type=" + type,
		"subfolder=" + subfolder,
		app.getRandParam().substring(1)
	].join("&")}`;
}
function splitFilePath(path) {
	const folder_separator = path.lastIndexOf("/");
	if (folder_separator === -1) return ["", path];
	return [path.substring(0, folder_separator), path.substring(folder_separator + 1)];
}
export { getResourceURL as n, splitFilePath as r, formatTime as t };

//# sourceMappingURL=audioUtils-DtzH97U-.js.map