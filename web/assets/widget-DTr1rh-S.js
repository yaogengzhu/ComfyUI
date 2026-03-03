import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
function getWidgetStep(options) {
	return options.step2 || (options.step || 10) * .1;
}
function evaluateInput(input) {
	if (/^[\d\s.()*+/-]+$/.test(input)) try {
		input = eval(input);
	} catch {}
	const newValue = Number(input);
	if (isNaN(newValue)) return void 0;
	return newValue;
}
function resolveNodeRootGraphId(node, fallbackGraphId) {
	return node.graph?.rootGraph.id ?? fallbackGraphId;
}
export { getWidgetStep as n, resolveNodeRootGraphId as r, evaluateInput as t };

//# sourceMappingURL=widget-DTr1rh-S.js.map