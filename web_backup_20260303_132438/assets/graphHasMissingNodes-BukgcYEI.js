import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { Rt as unref } from "./vendor-vue-core-tg-oZu4l.js";
import { L as collectAllNodes } from "./api-DbPc6hdO.js";
var isNodeMissingDefinition = (node, nodeDefsByName) => {
	const nodeName = node?.type;
	if (!nodeName) return false;
	return !nodeDefsByName[nodeName];
};
const collectMissingNodes = (graph, nodeDefsByName) => {
	if (!graph) return [];
	const lookup = unref(nodeDefsByName);
	return collectAllNodes(graph, (node) => isNodeMissingDefinition(node, lookup));
};
const graphHasMissingNodes = (graph, nodeDefsByName) => {
	return collectMissingNodes(graph, nodeDefsByName).length > 0;
};
export { graphHasMissingNodes as t };

//# sourceMappingURL=graphHasMissingNodes-BukgcYEI.js.map