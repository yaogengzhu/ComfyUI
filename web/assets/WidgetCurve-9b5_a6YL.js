import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { A as createCommentVNode, D as computed, G as mergeModels, O as createBaseVNode, R as defineComponent, Rt as unref, S as Fragment, Y as onBeforeUnmount, b as withModifiers, et as openBlock, ft as useTemplateRef, j as createElementBlock, k as createBlock, kt as ref, nt as renderList, ut as useModel } from "./vendor-vue-core-tg-oZu4l.js";
function createMonotoneInterpolator(points) {
	if (points.length === 0) return () => 0;
	if (points.length === 1) return () => points[0][1];
	const sorted = [...points].sort((a, b) => a[0] - b[0]);
	const n = sorted.length;
	const xs = sorted.map((p) => p[0]);
	const ys = sorted.map((p) => p[1]);
	const deltas = [];
	const slopes = [];
	for (let i = 0; i < n - 1; i++) {
		const dx = xs[i + 1] - xs[i];
		deltas.push(dx === 0 ? 0 : (ys[i + 1] - ys[i]) / dx);
	}
	slopes.push(deltas[0] ?? 0);
	for (let i = 1; i < n - 1; i++) if (deltas[i - 1] * deltas[i] <= 0) slopes.push(0);
	else slopes.push((deltas[i - 1] + deltas[i]) / 2);
	slopes.push(deltas[n - 2] ?? 0);
	for (let i = 0; i < n - 1; i++) if (deltas[i] === 0) {
		slopes[i] = 0;
		slopes[i + 1] = 0;
	} else {
		const alpha = slopes[i] / deltas[i];
		const beta = slopes[i + 1] / deltas[i];
		const s = alpha * alpha + beta * beta;
		if (s > 9) {
			const t = 3 / Math.sqrt(s);
			slopes[i] = t * alpha * deltas[i];
			slopes[i + 1] = t * beta * deltas[i];
		}
	}
	return (x) => {
		if (x <= xs[0]) return ys[0];
		if (x >= xs[n - 1]) return ys[n - 1];
		let lo = 0;
		let hi = n - 1;
		while (lo < hi - 1) {
			const mid = lo + hi >> 1;
			if (xs[mid] <= x) lo = mid;
			else hi = mid;
		}
		const dx = xs[hi] - xs[lo];
		if (dx === 0) return ys[lo];
		const t = (x - xs[lo]) / dx;
		const t2 = t * t;
		const t3 = t2 * t;
		const h00 = 2 * t3 - 3 * t2 + 1;
		const h10 = t3 - 2 * t2 + t;
		const h01 = -2 * t3 + 3 * t2;
		const h11 = t3 - t2;
		return h00 * ys[lo] + h10 * dx * slopes[lo] + h01 * ys[hi] + h11 * dx * slopes[hi];
	};
}
function histogramToPath(histogram) {
	if (!histogram.length) return "";
	const max = Array.from(histogram).sort((a, b) => a - b)[Math.floor(255 * .995)];
	if (max === 0) return "";
	const invMax = 1 / max;
	const parts = ["M0,1"];
	for (let i = 0; i < 256; i++) {
		const x = i / 255;
		const y = 1 - Math.min(1, histogram[i] * invMax);
		parts.push(`L${x},${y}`);
	}
	parts.push("L1,1 Z");
	return parts.join(" ");
}
function useCurveEditor({ svgRef, modelValue }) {
	const dragIndex = ref(-1);
	let cleanupDrag = null;
	const curvePath = computed(() => {
		const points = modelValue.value;
		if (points.length < 2) return "";
		const interpolate = createMonotoneInterpolator(points);
		const xMin = points[0][0];
		const xMax = points[points.length - 1][0];
		const segments = 128;
		const range = xMax - xMin;
		const parts = [];
		for (let i = 0; i <= segments; i++) {
			const x = xMin + range * (i / segments);
			const y = 1 - interpolate(x);
			parts.push(`${i === 0 ? "M" : "L"}${x},${y}`);
		}
		return parts.join("");
	});
	function svgCoords(e) {
		const svg = svgRef.value;
		if (!svg) return [0, 0];
		const ctm = svg.getScreenCTM();
		if (!ctm) return [0, 0];
		const svgPt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
		return [Math.max(0, Math.min(1, svgPt.x)), Math.max(0, Math.min(1, 1 - svgPt.y))];
	}
	function findNearestPoint(x, y) {
		const threshold2 = .04 * .04;
		let nearest = -1;
		let minDist2 = threshold2;
		for (let i = 0; i < modelValue.value.length; i++) {
			const dx = modelValue.value[i][0] - x;
			const dy = modelValue.value[i][1] - y;
			const dist2 = dx * dx + dy * dy;
			if (dist2 < minDist2) {
				minDist2 = dist2;
				nearest = i;
			}
		}
		return nearest;
	}
	function handleSvgPointerDown(e) {
		if (e.button !== 0) return;
		const [x, y] = svgCoords(e);
		const nearby = findNearestPoint(x, y);
		if (nearby >= 0) {
			startDrag(nearby, e);
			return;
		}
		if (e.ctrlKey) return;
		const newPoint = [x, y];
		const newPoints = [...modelValue.value, newPoint];
		newPoints.sort((a, b) => a[0] - b[0]);
		modelValue.value = newPoints;
		startDrag(newPoints.indexOf(newPoint), e);
	}
	function startDrag(index, e) {
		cleanupDrag?.();
		if (e.button === 2 || e.button === 0 && e.ctrlKey) {
			if (modelValue.value.length > 2) {
				const newPoints = [...modelValue.value];
				newPoints.splice(index, 1);
				modelValue.value = newPoints;
			}
			return;
		}
		dragIndex.value = index;
		const svg = svgRef.value;
		if (!svg) return;
		svg.setPointerCapture(e.pointerId);
		const onMove = (ev) => {
			if (dragIndex.value < 0) return;
			const [x, y] = svgCoords(ev);
			const movedPoint = [x, y];
			const newPoints = [...modelValue.value];
			newPoints[dragIndex.value] = movedPoint;
			newPoints.sort((a, b) => a[0] - b[0]);
			modelValue.value = newPoints;
			dragIndex.value = newPoints.indexOf(movedPoint);
		};
		const endDrag = () => {
			if (dragIndex.value < 0) return;
			dragIndex.value = -1;
			svg.removeEventListener("pointermove", onMove);
			svg.removeEventListener("pointerup", endDrag);
			svg.removeEventListener("lostpointercapture", endDrag);
			cleanupDrag = null;
		};
		cleanupDrag = endDrag;
		svg.addEventListener("pointermove", onMove);
		svg.addEventListener("pointerup", endDrag);
		svg.addEventListener("lostpointercapture", endDrag);
	}
	onBeforeUnmount(() => {
		cleanupDrag?.();
	});
	return {
		curvePath,
		handleSvgPointerDown,
		startDrag
	};
}
var _hoisted_1 = ["y1", "y2"];
var _hoisted_2 = ["x1", "x2"];
var _hoisted_3 = ["d", "fill"];
var _hoisted_4 = ["d", "stroke"];
var _hoisted_5 = [
	"cx",
	"cy",
	"fill",
	"onPointerdown"
];
var CurveEditor_default = /* @__PURE__ */ defineComponent({
	__name: "CurveEditor",
	props: /* @__PURE__ */ mergeModels({
		curveColor: { default: "white" },
		histogram: {}
	}, {
		"modelValue": { required: true },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		const svgRef = useTemplateRef("svgRef");
		const { curvePath, handleSvgPointerDown, startDrag } = useCurveEditor({
			svgRef,
			modelValue
		});
		const histogramPath = computed(() => __props.histogram ? histogramToPath(__props.histogram) : "");
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("svg", {
				ref_key: "svgRef",
				ref: svgRef,
				viewBox: "-0.04 -0.04 1.08 1.08",
				preserveAspectRatio: "xMidYMid meet",
				class: "aspect-square w-full cursor-crosshair rounded-[5px] bg-node-component-surface",
				onPointerdown: _cache[0] || (_cache[0] = withModifiers((...args) => unref(handleSvgPointerDown) && unref(handleSvgPointerDown)(...args), ["stop"])),
				onContextmenu: _cache[1] || (_cache[1] = withModifiers(() => {}, ["prevent", "stop"]))
			}, [
				(openBlock(), createElementBlock(Fragment, null, renderList([
					.25,
					.5,
					.75
				], (v) => {
					return createBaseVNode("line", {
						key: "h" + v,
						x1: 0,
						y1: v,
						x2: 1,
						y2: v,
						stroke: "currentColor",
						"stroke-opacity": "0.1",
						"stroke-width": "0.003"
					}, null, 8, _hoisted_1);
				}), 64)),
				(openBlock(), createElementBlock(Fragment, null, renderList([
					.25,
					.5,
					.75
				], (v) => {
					return createBaseVNode("line", {
						key: "v" + v,
						x1: v,
						y1: 0,
						x2: v,
						y2: 1,
						stroke: "currentColor",
						"stroke-opacity": "0.1",
						"stroke-width": "0.003"
					}, null, 8, _hoisted_2);
				}), 64)),
				_cache[2] || (_cache[2] = createBaseVNode("line", {
					x1: "0",
					y1: "1",
					x2: "1",
					y2: "0",
					stroke: "currentColor",
					"stroke-opacity": "0.15",
					"stroke-width": "0.003"
				}, null, -1)),
				histogramPath.value ? (openBlock(), createElementBlock("path", {
					key: 0,
					"data-testid": "histogram-path",
					d: histogramPath.value,
					fill: __props.curveColor,
					"fill-opacity": "0.15",
					stroke: "none"
				}, null, 8, _hoisted_3)) : createCommentVNode("", true),
				createBaseVNode("path", {
					"data-testid": "curve-path",
					d: unref(curvePath),
					fill: "none",
					stroke: __props.curveColor,
					"stroke-width": "0.008",
					"stroke-linecap": "round"
				}, null, 8, _hoisted_4),
				(openBlock(true), createElementBlock(Fragment, null, renderList(modelValue.value, (point, i) => {
					return openBlock(), createElementBlock("circle", {
						key: i,
						cx: point[0],
						cy: 1 - point[1],
						r: "0.02",
						fill: __props.curveColor,
						stroke: "white",
						"stroke-width": "0.004",
						class: "cursor-grab",
						onPointerdown: withModifiers(($event) => unref(startDrag)(i, $event), ["stop"])
					}, null, 40, _hoisted_5);
				}), 128))
			], 544);
		};
	}
});
var WidgetCurve_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetCurve",
	props: {
		"modelValue": { default: () => [[0, 0], [1, 1]] },
		"modelModifiers": {}
	},
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(CurveEditor_default, {
				modelValue: modelValue.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event)
			}, null, 8, ["modelValue"]);
		};
	}
});
export { WidgetCurve_default as default };

//# sourceMappingURL=WidgetCurve-9b5_a6YL.js.map