import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
const STANDARD_EXCLUDED_PROPS = [
	"style",
	"class",
	"dt",
	"pt",
	"ptOptions",
	"unstyled"
];
const INPUT_EXCLUDED_PROPS = [
	...STANDARD_EXCLUDED_PROPS,
	"inputClass",
	"inputStyle"
];
const PANEL_EXCLUDED_PROPS = [
	...STANDARD_EXCLUDED_PROPS,
	"panelClass",
	"panelStyle",
	"overlayClass"
];
const GALLERIA_EXCLUDED_PROPS = [
	...STANDARD_EXCLUDED_PROPS,
	"thumbnailsPosition",
	"verticalThumbnailViewPortHeight",
	"indicatorsPosition",
	"maskClass",
	"containerStyle",
	"containerClass",
	"galleriaClass"
];
const BADGE_EXCLUDED_PROPS = [...STANDARD_EXCLUDED_PROPS, "badgeClass"];
function filterWidgetProps(props, excludeList) {
	if (!props) return {};
	const filtered = {};
	for (const [key, value] of Object.entries(props)) if (!excludeList.includes(key)) filtered[key] = value;
	return filtered;
}
export { STANDARD_EXCLUDED_PROPS as a, PANEL_EXCLUDED_PROPS as i, GALLERIA_EXCLUDED_PROPS as n, filterWidgetProps as o, INPUT_EXCLUDED_PROPS as r, BADGE_EXCLUDED_PROPS as t };

//# sourceMappingURL=widgetPropFilter-3RmcXtGi.js.map