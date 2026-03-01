import { a as __toESM, r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { A as require_loglevel, R as toolkit, t as diff } from "./vendor-other-C6-gqLl2.js";
import { h as LGraphCanvas, p as LiteGraph, r as api } from "./api-CZwqvkO0.js";
import { Di as useWorkflowStore, Hn as useNodeOutputStore, k as useSubgraphNavigationStore, o as app, zn as useExecutionStore } from "./dialogService-B--1tJQn.js";
var import_loglevel = /* @__PURE__ */ __toESM(require_loglevel(), 1);
function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
}
var logger = import_loglevel.default.getLogger("ChangeTracker");
logger.setLevel("info");
var ChangeTracker = class ChangeTracker {
	static MAX_HISTORY = 50;
	activeState;
	undoQueue = [];
	redoQueue = [];
	changeCount = 0;
	_restoringState = false;
	ds;
	nodeOutputs;
	subgraphState;
	constructor(workflow, initialState) {
		this.workflow = workflow;
		this.initialState = initialState;
		this.activeState = initialState;
	}
	reset(state) {
		if (this._restoringState) return;
		logger.debug("Reset State");
		if (state) this.activeState = clone(state);
		this.initialState = clone(this.activeState);
	}
	store() {
		this.ds = {
			scale: app.canvas.ds.scale,
			offset: [app.canvas.ds.offset[0], app.canvas.ds.offset[1]]
		};
		this.subgraphState = { navigation: useSubgraphNavigationStore().exportState() };
	}
	restore() {
		if (this.ds) {
			app.canvas.ds.scale = this.ds.scale;
			app.canvas.ds.offset = this.ds.offset;
		}
		if (this.nodeOutputs) useNodeOutputStore().restoreOutputs(this.nodeOutputs);
		if (this.subgraphState) {
			const { navigation } = this.subgraphState;
			useSubgraphNavigationStore().restoreState(navigation);
			const activeId = navigation.at(-1);
			if (activeId) {
				const subgraph = app.rootGraph.subgraphs.get(activeId);
				if (subgraph) app.canvas.setGraph(subgraph);
			} else app.canvas.setGraph(app.rootGraph);
		}
	}
	updateModified() {
		api.dispatchCustomEvent("graphChanged", this.activeState);
		const workflow = useWorkflowStore().getWorkflowByPath(this.workflow.path);
		if (workflow) {
			workflow.isModified = !ChangeTracker.graphEqual(this.initialState, this.activeState);
			if (logger.getLevel() <= logger.levels.DEBUG && workflow.isModified) {
				const diff = ChangeTracker.graphDiff(this.initialState, this.activeState);
				logger.debug("Graph diff:", diff);
			}
		}
	}
	checkState() {
		if (!app.graph || this.changeCount) return;
		const currentState = clone(app.rootGraph.serialize());
		if (!this.activeState) {
			this.activeState = currentState;
			return;
		}
		if (!ChangeTracker.graphEqual(this.activeState, currentState)) {
			this.undoQueue.push(this.activeState);
			if (this.undoQueue.length > ChangeTracker.MAX_HISTORY) this.undoQueue.shift();
			logger.debug("Diff detected. Undo queue length:", this.undoQueue.length);
			this.activeState = currentState;
			this.redoQueue.length = 0;
			this.updateModified();
		}
	}
	async updateState(source, target) {
		const prevState = source.pop();
		if (prevState) {
			target.push(this.activeState);
			this._restoringState = true;
			try {
				await app.loadGraphData(prevState, false, false, this.workflow, {
					showMissingModelsDialog: false,
					showMissingNodesDialog: false,
					checkForRerouteMigration: false
				});
				this.activeState = prevState;
				this.updateModified();
			} finally {
				this._restoringState = false;
			}
		}
	}
	async undo() {
		await this.updateState(this.undoQueue, this.redoQueue);
		logger.debug("Undo. Undo queue length:", this.undoQueue.length, "Redo queue length:", this.redoQueue.length);
	}
	async redo() {
		await this.updateState(this.redoQueue, this.undoQueue);
		logger.debug("Redo. Undo queue length:", this.undoQueue.length, "Redo queue length:", this.redoQueue.length);
	}
	async undoRedo(e) {
		if ((e.ctrlKey || e.metaKey) && !e.altKey) {
			const key = e.key.toUpperCase();
			if (key === "Y" && !e.shiftKey || key == "Z" && e.shiftKey) {
				await this.redo();
				return true;
			} else if (key === "Z" && !e.shiftKey) {
				await this.undo();
				return true;
			}
		}
	}
	beforeChange() {
		this.changeCount++;
	}
	afterChange() {
		if (!--this.changeCount) this.checkState();
	}
	static init() {
		const getCurrentChangeTracker = () => useWorkflowStore().activeWorkflow?.changeTracker;
		const checkState = () => getCurrentChangeTracker()?.checkState();
		let keyIgnored = false;
		window.addEventListener("keydown", (e) => {
			if (e.repeat) return;
			if (app.constructor.maskeditor_is_opended?.()) return;
			const activeEl = document.activeElement;
			requestAnimationFrame(async () => {
				let bindInputEl = null;
				if (!app.ui.autoQueueEnabled || app.ui.autoQueueMode === "instant") {
					if (activeEl?.tagName === "INPUT" || activeEl && "type" in activeEl && activeEl.type === "textarea") return;
					bindInputEl = activeEl;
				}
				keyIgnored = e.key === "Control" || e.key === "Shift" || e.key === "Alt" || e.key === "Meta";
				if (keyIgnored) return;
				const changeTracker = getCurrentChangeTracker();
				if (!changeTracker) return;
				if (await changeTracker.undoRedo(e)) return;
				if (ChangeTracker.bindInput(bindInputEl)) return;
				logger.debug("checkState on keydown");
				changeTracker.checkState();
			});
		}, true);
		window.addEventListener("keyup", () => {
			if (keyIgnored) {
				keyIgnored = false;
				logger.debug("checkState on keyup");
				checkState();
			}
		});
		window.addEventListener("mouseup", () => {
			logger.debug("checkState on mouseup");
			checkState();
		});
		api.addEventListener("promptQueued", () => {
			logger.debug("checkState on promptQueued");
			checkState();
		});
		api.addEventListener("graphCleared", () => {
			logger.debug("checkState on graphCleared");
			checkState();
		});
		const processMouseUp = LGraphCanvas.prototype.processMouseUp;
		LGraphCanvas.prototype.processMouseUp = function(e) {
			const v = processMouseUp.apply(this, [e]);
			logger.debug("checkState on processMouseUp");
			checkState();
			return v;
		};
		const prompt = LGraphCanvas.prototype.prompt;
		LGraphCanvas.prototype.prompt = function(title, value, callback, event) {
			const extendedCallback = (v) => {
				callback(v);
				checkState();
			};
			logger.debug("checkState on prompt");
			return prompt.apply(this, [
				title,
				value,
				extendedCallback,
				event
			]);
		};
		const close = LiteGraph.ContextMenu.prototype.close;
		LiteGraph.ContextMenu.prototype.close = function(e) {
			const v = close.apply(this, [e]);
			logger.debug("checkState on contextMenuClose");
			checkState();
			return v;
		};
		document.addEventListener("litegraph:canvas", (e) => {
			const detail = e.detail;
			if (detail.subType === "before-change") getCurrentChangeTracker()?.beforeChange();
			else if (detail.subType === "after-change") getCurrentChangeTracker()?.afterChange();
		});
		api.addEventListener("executed", (e) => {
			const detail = e.detail;
			const changeTracker = (useExecutionStore().queuedJobs[detail.prompt_id]?.workflow)?.changeTracker;
			if (!changeTracker) return;
			changeTracker.nodeOutputs ??= {};
			const nodeOutputs = changeTracker.nodeOutputs;
			const output = nodeOutputs[detail.node];
			if (detail.merge && output) for (const k in detail.output ?? {}) {
				const v = output[k];
				if (v instanceof Array) output[k] = v.concat(detail.output[k]);
				else output[k] = detail.output[k];
			}
			else nodeOutputs[detail.node] = detail.output;
		});
	}
	static bindInput(activeEl) {
		if (!activeEl || activeEl.tagName === "CANVAS" || activeEl.tagName === "BODY") return false;
		for (const evt of [
			"change",
			"input",
			"blur"
		]) {
			const htmlElement = activeEl;
			if (`on${evt}` in htmlElement) {
				const listener = () => {
					useWorkflowStore().activeWorkflow?.changeTracker?.checkState?.();
					htmlElement.removeEventListener(evt, listener);
				};
				htmlElement.addEventListener(evt, listener);
				return true;
			}
		}
		return false;
	}
	static graphEqual(a, b) {
		if (a === b) return true;
		if (typeof a == "object" && a && typeof b == "object" && b) {
			if (!toolkit.isEqualWith(a.nodes, b.nodes, (arrA, arrB) => {
				if (Array.isArray(arrA) && Array.isArray(arrB)) return toolkit.isEqual(new Set(arrA), new Set(arrB));
			})) return false;
			if (!toolkit.isEqual(toolkit.omit(a.extra ?? {}, ["ds"]), toolkit.omit(b.extra ?? {}, ["ds"]))) return false;
			for (const key of [
				"links",
				"floatingLinks",
				"reroutes",
				"groups",
				"definitions",
				"subgraphs"
			]) if (!toolkit.isEqual(a[key], b[key])) return false;
			return true;
		}
		return false;
	}
	static graphDiff(a, b) {
		function sortGraphNodes(graph) {
			return {
				links: graph.links,
				floatingLinks: graph.floatingLinks,
				reroutes: graph.reroutes,
				groups: graph.groups,
				extra: graph.extra,
				definitions: graph.definitions,
				subgraphs: graph.subgraphs,
				nodes: graph.nodes.sort((a, b) => {
					if (typeof a.id === "number" && typeof b.id === "number") return a.id - b.id;
					return 0;
				})
			};
		}
		return diff(sortGraphNodes(a), sortGraphNodes(b));
	}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.changeTracker = window.comfyAPI.changeTracker || {};
window.comfyAPI.changeTracker.ChangeTracker = ChangeTracker;
export { ChangeTracker as t };

//# sourceMappingURL=changeTracker-DLouw-IR.js.map