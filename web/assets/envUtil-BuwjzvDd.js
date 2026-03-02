import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { n as isDesktop } from "./types-YYe-ycsK.js";
function electronAPI() {
	return window.electronAPI;
}
function showNativeSystemMenu() {
	electronAPI()?.showContextMenu();
}
function isNativeWindow() {
	return isDesktop && !!window.navigator.windowControlsOverlay?.visible;
}
export { isNativeWindow as n, showNativeSystemMenu as r, electronAPI as t };

//# sourceMappingURL=envUtil-BuwjzvDd.js.map