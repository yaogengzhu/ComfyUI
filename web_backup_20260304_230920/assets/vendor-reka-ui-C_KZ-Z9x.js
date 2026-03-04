import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { $ as onUpdated, A as createCommentVNode, B as guardReactiveProps, Ct as isRef, D as computed, Dt as reactive, E as cloneVNode, F as createTextVNode, Ft as toRefs$1, H as hasInjectionContext, Ht as normalizeStyle, I as createVNode, It as toValue$1, K as mergeProps, Lt as triggerRef, Mt as shallowRef, Nt as toRaw, O as createBaseVNode, Ot as readonly, Pt as toRef$1, Q as onUnmounted, R as defineComponent, Rt as unref, S as Fragment, St as getCurrentScope, Tt as onScopeDispose, U as inject, Ut as toDisplayString, V as h, Vt as normalizeProps, W as mergeDefaults, Wt as toHandlerKey, Y as onBeforeUnmount, Z as onMounted, _t as withCtx, b as withModifiers, bt as customRef, dt as useSlots, et as openBlock, gt as watchSyncEffect, ht as watchPostEffect, j as createElementBlock, jt as shallowReadonly, k as createBlock, kt as ref, lt as useId$1, mt as watchEffect, nt as renderList, ot as resolveDynamicComponent, pt as watch, q as nextTick, rt as renderSlot, tt as provide, u as vue_runtime_esm_bundler_exports, w as Teleport, wt as markRaw, x as Comment, xt as effectScope, y as withKeys, yt as withMemo, z as getCurrentInstance, zt as camelize$1 } from "./vendor-vue-core-tg-oZu4l.js";
function computedEager(fn, options) {
	var _options$flush;
	const result = shallowRef();
	watchEffect(() => {
		result.value = fn();
	}, {
		...options,
		flush: (_options$flush = options === null || options === void 0 ? void 0 : options.flush) !== null && _options$flush !== void 0 ? _options$flush : "sync"
	});
	return readonly(result);
}
function computedWithControl(source, fn, options = {}) {
	let v = void 0;
	let track;
	let trigger;
	let dirty = true;
	const update = () => {
		dirty = true;
		trigger();
	};
	watch(source, update, {
		flush: "sync",
		...options
	});
	const get$1 = typeof fn === "function" ? fn : fn.get;
	const set$1 = typeof fn === "function" ? void 0 : fn.set;
	const result = customRef((_track, _trigger) => {
		track = _track;
		trigger = _trigger;
		return {
			get() {
				if (dirty) {
					v = get$1(v);
					dirty = false;
				}
				track();
				return v;
			},
			set(v$1) {
				set$1 === null || set$1 === void 0 || set$1(v$1);
			}
		};
	});
	result.trigger = update;
	return result;
}
function tryOnScopeDispose(fn, failSilently) {
	if (getCurrentScope()) {
		onScopeDispose(fn, failSilently);
		return true;
	}
	return false;
}
function createEventHook() {
	const fns = /* @__PURE__ */ new Set();
	const off = (fn) => {
		fns.delete(fn);
	};
	const clear = () => {
		fns.clear();
	};
	const on = (fn) => {
		fns.add(fn);
		const offFn = () => off(fn);
		tryOnScopeDispose(offFn);
		return { off: offFn };
	};
	const trigger = (...args) => {
		return Promise.all(Array.from(fns).map((fn) => fn(...args)));
	};
	return {
		on,
		off,
		trigger,
		clear
	};
}
function createGlobalState(stateFactory) {
	let initialized = false;
	let state;
	const scope = effectScope(true);
	return ((...args) => {
		if (!initialized) {
			state = scope.run(() => stateFactory(...args));
			initialized = true;
		}
		return state;
	});
}
var localProvidedStateMap = /* @__PURE__ */ new WeakMap();
var injectLocal = (...args) => {
	var _getCurrentInstance;
	const key = args[0];
	const instance = (_getCurrentInstance = getCurrentInstance()) === null || _getCurrentInstance === void 0 ? void 0 : _getCurrentInstance.proxy;
	const owner = instance !== null && instance !== void 0 ? instance : getCurrentScope();
	if (owner == null && !hasInjectionContext()) throw new Error("injectLocal must be called in setup");
	if (owner && localProvidedStateMap.has(owner) && key in localProvidedStateMap.get(owner)) return localProvidedStateMap.get(owner)[key];
	return inject(...args);
};
var isClient = typeof window !== "undefined" && typeof document !== "undefined";
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
var isDef = (val) => typeof val !== "undefined";
var notNullish = (val) => val != null;
var toString = Object.prototype.toString;
var isObject = (val) => toString.call(val) === "[object Object]";
var noop = () => {};
var isIOS = /* @__PURE__ */ getIsIOS();
function getIsIOS() {
	var _window;
	var _window2;
	var _window3;
	return isClient && !!((_window = window) === null || _window === void 0 || (_window = _window.navigator) === null || _window === void 0 ? void 0 : _window.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((_window2 = window) === null || _window2 === void 0 || (_window2 = _window2.navigator) === null || _window2 === void 0 ? void 0 : _window2.maxTouchPoints) > 2 && /iPad|Macintosh/.test((_window3 = window) === null || _window3 === void 0 ? void 0 : _window3.navigator.userAgent));
}
function toRef(...args) {
	if (args.length !== 1) return toRef$1(...args);
	const r = args[0];
	return typeof r === "function" ? readonly(customRef(() => ({
		get: r,
		set: noop
	}))) : ref(r);
}
function createFilterWrapper(filter, fn) {
	function wrapper(...args) {
		return new Promise((resolve, reject) => {
			Promise.resolve(filter(() => fn.apply(this, args), {
				fn,
				thisArg: this,
				args
			})).then(resolve).catch(reject);
		});
	}
	return wrapper;
}
var bypassFilter = (invoke$1) => {
	return invoke$1();
};
function debounceFilter(ms, options = {}) {
	let timer;
	let maxTimer;
	let lastRejector = noop;
	const _clearTimeout = (timer$1) => {
		clearTimeout(timer$1);
		lastRejector();
		lastRejector = noop;
	};
	let lastInvoker;
	const filter = (invoke$1) => {
		const duration = toValue$1(ms);
		const maxDuration = toValue$1(options.maxWait);
		if (timer) _clearTimeout(timer);
		if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
			if (maxTimer) {
				_clearTimeout(maxTimer);
				maxTimer = void 0;
			}
			return Promise.resolve(invoke$1());
		}
		return new Promise((resolve, reject) => {
			lastRejector = options.rejectOnCancel ? reject : resolve;
			lastInvoker = invoke$1;
			if (maxDuration && !maxTimer) maxTimer = setTimeout(() => {
				if (timer) _clearTimeout(timer);
				maxTimer = void 0;
				resolve(lastInvoker());
			}, maxDuration);
			timer = setTimeout(() => {
				if (maxTimer) _clearTimeout(maxTimer);
				maxTimer = void 0;
				resolve(invoke$1());
			}, duration);
		});
	};
	return filter;
}
function throttleFilter(...args) {
	let lastExec = 0;
	let timer;
	let isLeading = true;
	let lastRejector = noop;
	let lastValue;
	let ms;
	let trailing;
	let leading;
	let rejectOnCancel;
	if (!isRef(args[0]) && typeof args[0] === "object") ({delay: ms, trailing = true, leading = true, rejectOnCancel = false} = args[0]);
	else [ms, trailing = true, leading = true, rejectOnCancel = false] = args;
	const clear = () => {
		if (timer) {
			clearTimeout(timer);
			timer = void 0;
			lastRejector();
			lastRejector = noop;
		}
	};
	const filter = (_invoke) => {
		const duration = toValue$1(ms);
		const elapsed = Date.now() - lastExec;
		const invoke$1 = () => {
			return lastValue = _invoke();
		};
		clear();
		if (duration <= 0) {
			lastExec = Date.now();
			return invoke$1();
		}
		if (elapsed > duration) {
			lastExec = Date.now();
			if (leading || !isLeading) invoke$1();
		} else if (trailing) lastValue = new Promise((resolve, reject) => {
			lastRejector = rejectOnCancel ? reject : resolve;
			timer = setTimeout(() => {
				lastExec = Date.now();
				isLeading = true;
				resolve(invoke$1());
				clear();
			}, Math.max(0, duration - elapsed));
		});
		if (!leading && !timer) timer = setTimeout(() => isLeading = true, duration);
		isLeading = false;
		return lastValue;
	};
	return filter;
}
function pausableFilter(extendFilter = bypassFilter, options = {}) {
	const { initialState = "active" } = options;
	const isActive = toRef(initialState === "active");
	function pause() {
		isActive.value = false;
	}
	function resume() {
		isActive.value = true;
	}
	const eventFilter = (...args) => {
		if (isActive.value) extendFilter(...args);
	};
	return {
		isActive: readonly(isActive),
		pause,
		resume,
		eventFilter
	};
}
function promiseTimeout(ms, throwOnTimeout = false, reason = "Timeout") {
	return new Promise((resolve, reject) => {
		if (throwOnTimeout) setTimeout(() => reject(reason), ms);
		else setTimeout(resolve, ms);
	});
}
function createSingletonPromise(fn) {
	let _promise;
	function wrapper() {
		if (!_promise) _promise = fn();
		return _promise;
	}
	wrapper.reset = async () => {
		const _prev = _promise;
		_promise = void 0;
		if (_prev) await _prev;
	};
	return wrapper;
}
function increaseWithUnit(target, delta) {
	var _target$match;
	if (typeof target === "number") return target + delta;
	const value = ((_target$match = target.match(/^-?\d+\.?\d*/)) === null || _target$match === void 0 ? void 0 : _target$match[0]) || "";
	const unit = target.slice(value.length);
	const result = Number.parseFloat(value) + delta;
	if (Number.isNaN(result)) return target;
	return result + unit;
}
function pxValue(px) {
	return px.endsWith("rem") ? Number.parseFloat(px) * 16 : Number.parseFloat(px);
}
function toArray(value) {
	return Array.isArray(value) ? value : [value];
}
function cacheStringFunction(fn) {
	const cache = Object.create(null);
	return ((str) => {
		return cache[str] || (cache[str] = fn(str));
	});
}
var hyphenateRE = /\B([A-Z])/g;
cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
var camelizeRE = /-(\w)/g;
cacheStringFunction((str) => {
	return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
function getLifeCycleTarget(target) {
	return target || getCurrentInstance();
}
function createSharedComposable(composable) {
	if (!isClient) return composable;
	let subscribers = 0;
	let state;
	let scope;
	const dispose = () => {
		subscribers -= 1;
		if (scope && subscribers <= 0) {
			scope.stop();
			state = void 0;
			scope = void 0;
		}
	};
	return ((...args) => {
		subscribers += 1;
		if (!scope) {
			scope = effectScope(true);
			state = scope.run(() => composable(...args));
		}
		tryOnScopeDispose(dispose);
		return state;
	});
}
function get(obj, key) {
	if (key == null) return unref(obj);
	return unref(obj)[key];
}
function toReactive(objectRef) {
	if (!isRef(objectRef)) return reactive(objectRef);
	return reactive(new Proxy({}, {
		get(_, p, receiver) {
			return unref(Reflect.get(objectRef.value, p, receiver));
		},
		set(_, p, value) {
			if (isRef(objectRef.value[p]) && !isRef(value)) objectRef.value[p].value = value;
			else objectRef.value[p] = value;
			return true;
		},
		deleteProperty(_, p) {
			return Reflect.deleteProperty(objectRef.value, p);
		},
		has(_, p) {
			return Reflect.has(objectRef.value, p);
		},
		ownKeys() {
			return Object.keys(objectRef.value);
		},
		getOwnPropertyDescriptor() {
			return {
				enumerable: true,
				configurable: true
			};
		}
	}));
}
function reactiveComputed(fn) {
	return toReactive(computed(fn));
}
function reactiveOmit(obj, ...keys) {
	const flatKeys = keys.flat();
	const predicate = flatKeys[0];
	return reactiveComputed(() => typeof predicate === "function" ? Object.fromEntries(Object.entries(toRefs$1(obj)).filter(([k, v]) => !predicate(toValue$1(v), k))) : Object.fromEntries(Object.entries(toRefs$1(obj)).filter((e) => !flatKeys.includes(e[0]))));
}
function refAutoReset(defaultValue, afterMs = 1e4) {
	return customRef((track, trigger) => {
		let value = toValue$1(defaultValue);
		let timer;
		const resetAfter = () => setTimeout(() => {
			value = toValue$1(defaultValue);
			trigger();
		}, toValue$1(afterMs));
		tryOnScopeDispose(() => {
			clearTimeout(timer);
		});
		return {
			get() {
				track();
				return value;
			},
			set(newValue) {
				value = newValue;
				trigger();
				clearTimeout(timer);
				timer = resetAfter();
			}
		};
	});
}
function useDebounceFn(fn, ms = 200, options = {}) {
	return createFilterWrapper(debounceFilter(ms, options), fn);
}
function refDebounced(value, ms = 200, options = {}) {
	const debounced = ref(toValue$1(value));
	const updater = useDebounceFn(() => {
		debounced.value = value.value;
	}, ms, options);
	watch(value, () => updater());
	return shallowReadonly(debounced);
}
function useThrottleFn(fn, ms = 200, trailing = false, leading = true, rejectOnCancel = false) {
	return createFilterWrapper(throttleFilter(ms, trailing, leading, rejectOnCancel), fn);
}
function watchWithFilter(source, cb, options = {}) {
	const { eventFilter = bypassFilter, ...watchOptions } = options;
	return watch(source, createFilterWrapper(eventFilter, cb), watchOptions);
}
function watchPausable(source, cb, options = {}) {
	const { eventFilter: filter, initialState = "active", ...watchOptions } = options;
	const { eventFilter, pause, resume, isActive } = pausableFilter(filter, { initialState });
	return {
		stop: watchWithFilter(source, cb, {
			...watchOptions,
			eventFilter
		}),
		pause,
		resume,
		isActive
	};
}
function toRefs(objectRef, options = {}) {
	if (!isRef(objectRef)) return toRefs$1(objectRef);
	const result = Array.isArray(objectRef.value) ? Array.from({ length: objectRef.value.length }) : {};
	for (const key in objectRef.value) result[key] = customRef(() => ({
		get() {
			return objectRef.value[key];
		},
		set(v) {
			var _toValue;
			if ((_toValue = toValue$1(options.replaceRef)) !== null && _toValue !== void 0 ? _toValue : true) if (Array.isArray(objectRef.value)) {
				const copy = [...objectRef.value];
				copy[key] = v;
				objectRef.value = copy;
			} else {
				const newObject = {
					...objectRef.value,
					[key]: v
				};
				Object.setPrototypeOf(newObject, Object.getPrototypeOf(objectRef.value));
				objectRef.value = newObject;
			}
			else objectRef.value[key] = v;
		}
	}));
	return result;
}
function tryOnBeforeUnmount(fn, target) {
	if (getLifeCycleTarget(target)) onBeforeUnmount(fn, target);
}
function tryOnMounted(fn, sync = true, target) {
	if (getLifeCycleTarget(target)) onMounted(fn, target);
	else if (sync) fn();
	else nextTick(fn);
}
function tryOnUnmounted(fn, target) {
	if (getLifeCycleTarget(target)) onUnmounted(fn, target);
}
function createUntil(r, isNot = false) {
	function toMatch(condition, { flush = "sync", deep = false, timeout, throwOnTimeout } = {}) {
		let stop = null;
		const promises = [new Promise((resolve) => {
			stop = watch(r, (v) => {
				if (condition(v) !== isNot) {
					if (stop) stop();
					else nextTick(() => stop === null || stop === void 0 ? void 0 : stop());
					resolve(v);
				}
			}, {
				flush,
				deep,
				immediate: true
			});
		})];
		if (timeout != null) promises.push(promiseTimeout(timeout, throwOnTimeout).then(() => toValue$1(r)).finally(() => stop === null || stop === void 0 ? void 0 : stop()));
		return Promise.race(promises);
	}
	function toBe(value, options) {
		if (!isRef(value)) return toMatch((v) => v === value, options);
		const { flush = "sync", deep = false, timeout, throwOnTimeout } = options !== null && options !== void 0 ? options : {};
		let stop = null;
		const promises = [new Promise((resolve) => {
			stop = watch([r, value], ([v1, v2]) => {
				if (isNot !== (v1 === v2)) {
					if (stop) stop();
					else nextTick(() => stop === null || stop === void 0 ? void 0 : stop());
					resolve(v1);
				}
			}, {
				flush,
				deep,
				immediate: true
			});
		})];
		if (timeout != null) promises.push(promiseTimeout(timeout, throwOnTimeout).then(() => toValue$1(r)).finally(() => {
			stop === null || stop === void 0 || stop();
			return toValue$1(r);
		}));
		return Promise.race(promises);
	}
	function toBeTruthy(options) {
		return toMatch((v) => Boolean(v), options);
	}
	function toBeNull(options) {
		return toBe(null, options);
	}
	function toBeUndefined(options) {
		return toBe(void 0, options);
	}
	function toBeNaN(options) {
		return toMatch(Number.isNaN, options);
	}
	function toContains(value, options) {
		return toMatch((v) => {
			const array = Array.from(v);
			return array.includes(value) || array.includes(toValue$1(value));
		}, options);
	}
	function changed(options) {
		return changedTimes(1, options);
	}
	function changedTimes(n = 1, options) {
		let count = -1;
		return toMatch(() => {
			count += 1;
			return count >= n;
		}, options);
	}
	if (Array.isArray(toValue$1(r))) return {
		toMatch,
		toContains,
		changed,
		changedTimes,
		get not() {
			return createUntil(r, !isNot);
		}
	};
	else return {
		toMatch,
		toBe,
		toBeTruthy,
		toBeNull,
		toBeNaN,
		toBeUndefined,
		changed,
		changedTimes,
		get not() {
			return createUntil(r, !isNot);
		}
	};
}
function until(r) {
	return createUntil(r);
}
function useIntervalFn(cb, interval = 1e3, options = {}) {
	const { immediate = true, immediateCallback = false } = options;
	let timer = null;
	const isActive = shallowRef(false);
	function clean() {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
	}
	function pause() {
		isActive.value = false;
		clean();
	}
	function resume() {
		const intervalValue = toValue$1(interval);
		if (intervalValue <= 0) return;
		isActive.value = true;
		if (immediateCallback) cb();
		clean();
		if (isActive.value) timer = setInterval(cb, intervalValue);
	}
	if (immediate && isClient) resume();
	if (isRef(interval) || typeof interval === "function") tryOnScopeDispose(watch(interval, () => {
		if (isActive.value && isClient) resume();
	}));
	tryOnScopeDispose(pause);
	return {
		isActive: shallowReadonly(isActive),
		pause,
		resume
	};
}
function useTimeoutFn(cb, interval, options = {}) {
	const { immediate = true, immediateCallback = false } = options;
	const isPending = shallowRef(false);
	let timer;
	function clear() {
		if (timer) {
			clearTimeout(timer);
			timer = void 0;
		}
	}
	function stop() {
		isPending.value = false;
		clear();
	}
	function start(...args) {
		if (immediateCallback) cb();
		clear();
		isPending.value = true;
		timer = setTimeout(() => {
			isPending.value = false;
			timer = void 0;
			cb(...args);
		}, toValue$1(interval));
	}
	if (immediate) {
		isPending.value = true;
		if (isClient) start();
	}
	tryOnScopeDispose(stop);
	return {
		isPending: shallowReadonly(isPending),
		start,
		stop
	};
}
function useTimeout(interval = 1e3, options = {}) {
	const { controls: exposeControls = false, callback } = options;
	const controls = useTimeoutFn(callback !== null && callback !== void 0 ? callback : noop, interval, options);
	const ready = computed(() => !controls.isPending.value);
	if (exposeControls) return {
		ready,
		...controls
	};
	else return ready;
}
function watchDebounced(source, cb, options = {}) {
	const { debounce = 0, maxWait = void 0, ...watchOptions } = options;
	return watchWithFilter(source, cb, {
		...watchOptions,
		eventFilter: debounceFilter(debounce, { maxWait })
	});
}
function watchImmediate(source, cb, options) {
	return watch(source, cb, {
		...options,
		immediate: true
	});
}
function watchOnce(source, cb, options) {
	return watch(source, cb, {
		...options,
		once: true
	});
}
function whenever(source, cb, options) {
	const stop = watch(source, (v, ov, onInvalidate) => {
		if (v) {
			if (options === null || options === void 0 ? void 0 : options.once) nextTick(() => stop());
			cb(v, ov, onInvalidate);
		}
	}, {
		...options,
		once: false
	});
	return stop;
}
var defaultWindow = isClient ? window : void 0;
var defaultDocument = isClient ? window.document : void 0;
var defaultNavigator = isClient ? window.navigator : void 0;
isClient && window.location;
function unrefElement(elRef) {
	var _$el;
	const plain = toValue$1(elRef);
	return (_$el = plain === null || plain === void 0 ? void 0 : plain.$el) !== null && _$el !== void 0 ? _$el : plain;
}
function useEventListener(...args) {
	const register = (el, event, listener, options) => {
		el.addEventListener(event, listener, options);
		return () => el.removeEventListener(event, listener, options);
	};
	const firstParamTargets = computed(() => {
		const test = toArray(toValue$1(args[0])).filter((e) => e != null);
		return test.every((e) => typeof e !== "string") ? test : void 0;
	});
	return watchImmediate(() => {
		var _firstParamTargets$va;
		var _firstParamTargets$va2;
		return [
			(_firstParamTargets$va = (_firstParamTargets$va2 = firstParamTargets.value) === null || _firstParamTargets$va2 === void 0 ? void 0 : _firstParamTargets$va2.map((e) => unrefElement(e))) !== null && _firstParamTargets$va !== void 0 ? _firstParamTargets$va : [defaultWindow].filter((e) => e != null),
			toArray(toValue$1(firstParamTargets.value ? args[1] : args[0])),
			toArray(unref(firstParamTargets.value ? args[2] : args[1])),
			toValue$1(firstParamTargets.value ? args[3] : args[2])
		];
	}, ([raw_targets, raw_events, raw_listeners, raw_options], _, onCleanup) => {
		if (!(raw_targets === null || raw_targets === void 0 ? void 0 : raw_targets.length) || !(raw_events === null || raw_events === void 0 ? void 0 : raw_events.length) || !(raw_listeners === null || raw_listeners === void 0 ? void 0 : raw_listeners.length)) return;
		const optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options;
		const cleanups = raw_targets.flatMap((el) => raw_events.flatMap((event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone))));
		onCleanup(() => {
			cleanups.forEach((fn) => fn());
		});
	}, { flush: "post" });
}
var _iOSWorkaround = false;
function onClickOutside(target, handler, options = {}) {
	const { window: window$1 = defaultWindow, ignore = [], capture = true, detectIframe = false, controls = false } = options;
	if (!window$1) return controls ? {
		stop: noop,
		cancel: noop,
		trigger: noop
	} : noop;
	if (isIOS && !_iOSWorkaround) {
		_iOSWorkaround = true;
		const listenerOptions = { passive: true };
		Array.from(window$1.document.body.children).forEach((el) => el.addEventListener("click", noop, listenerOptions));
		window$1.document.documentElement.addEventListener("click", noop, listenerOptions);
	}
	let shouldListen = true;
	const shouldIgnore = (event) => {
		return toValue$1(ignore).some((target$1) => {
			if (typeof target$1 === "string") return Array.from(window$1.document.querySelectorAll(target$1)).some((el) => el === event.target || event.composedPath().includes(el));
			else {
				const el = unrefElement(target$1);
				return el && (event.target === el || event.composedPath().includes(el));
			}
		});
	};
	function hasMultipleRoots(target$1) {
		const vm = toValue$1(target$1);
		return vm && vm.$.subTree.shapeFlag === 16;
	}
	function checkMultipleRoots(target$1, event) {
		const vm = toValue$1(target$1);
		const children = vm.$.subTree && vm.$.subTree.children;
		if (children == null || !Array.isArray(children)) return false;
		return children.some((child) => child.el === event.target || event.composedPath().includes(child.el));
	}
	const listener = (event) => {
		const el = unrefElement(target);
		if (event.target == null) return;
		if (!(el instanceof Element) && hasMultipleRoots(target) && checkMultipleRoots(target, event)) return;
		if (!el || el === event.target || event.composedPath().includes(el)) return;
		if ("detail" in event && event.detail === 0) shouldListen = !shouldIgnore(event);
		if (!shouldListen) {
			shouldListen = true;
			return;
		}
		handler(event);
	};
	let isProcessingClick = false;
	const cleanup = [
		useEventListener(window$1, "click", (event) => {
			if (!isProcessingClick) {
				isProcessingClick = true;
				setTimeout(() => {
					isProcessingClick = false;
				}, 0);
				listener(event);
			}
		}, {
			passive: true,
			capture
		}),
		useEventListener(window$1, "pointerdown", (e) => {
			const el = unrefElement(target);
			shouldListen = !shouldIgnore(e) && !!(el && !e.composedPath().includes(el));
		}, { passive: true }),
		detectIframe && useEventListener(window$1, "blur", (event) => {
			setTimeout(() => {
				var _window$document$acti;
				const el = unrefElement(target);
				if (((_window$document$acti = window$1.document.activeElement) === null || _window$document$acti === void 0 ? void 0 : _window$document$acti.tagName) === "IFRAME" && !(el === null || el === void 0 ? void 0 : el.contains(window$1.document.activeElement))) handler(event);
			}, 0);
		}, { passive: true })
	].filter(Boolean);
	const stop = () => cleanup.forEach((fn) => fn());
	if (controls) return {
		stop,
		cancel: () => {
			shouldListen = false;
		},
		trigger: (event) => {
			shouldListen = true;
			listener(event);
			shouldListen = false;
		}
	};
	return stop;
}
function useMounted() {
	const isMounted = shallowRef(false);
	const instance = getCurrentInstance();
	if (instance) onMounted(() => {
		isMounted.value = true;
	}, instance);
	return isMounted;
}
/* @__NO_SIDE_EFFECTS__ */
function useSupported(callback) {
	const isMounted = useMounted();
	return computed(() => {
		isMounted.value;
		return Boolean(callback());
	});
}
function useMutationObserver(target, callback, options = {}) {
	const { window: window$1 = defaultWindow, ...mutationOptions } = options;
	let observer;
	const isSupported = /* @__PURE__ */ useSupported(() => window$1 && "MutationObserver" in window$1);
	const cleanup = () => {
		if (observer) {
			observer.disconnect();
			observer = void 0;
		}
	};
	const stopWatch = watch(computed(() => {
		const items = toArray(toValue$1(target)).map(unrefElement).filter(notNullish);
		return new Set(items);
	}), (newTargets) => {
		cleanup();
		if (isSupported.value && newTargets.size) {
			observer = new MutationObserver(callback);
			newTargets.forEach((el) => observer.observe(el, mutationOptions));
		}
	}, {
		immediate: true,
		flush: "post"
	});
	const takeRecords = () => {
		return observer === null || observer === void 0 ? void 0 : observer.takeRecords();
	};
	const stop = () => {
		stopWatch();
		cleanup();
	};
	tryOnScopeDispose(stop);
	return {
		isSupported,
		stop,
		takeRecords
	};
}
function onElementRemoval(target, callback, options = {}) {
	const { window: window$1 = defaultWindow, document: document$1 = window$1 === null || window$1 === void 0 ? void 0 : window$1.document, flush = "sync" } = options;
	if (!window$1 || !document$1) return noop;
	let stopFn;
	const cleanupAndUpdate = (fn) => {
		stopFn === null || stopFn === void 0 || stopFn();
		stopFn = fn;
	};
	const stopWatch = watchEffect(() => {
		const el = unrefElement(target);
		if (el) {
			const { stop } = useMutationObserver(document$1, (mutationsList) => {
				if (mutationsList.map((mutation) => [...mutation.removedNodes]).flat().some((node) => node === el || node.contains(el))) callback(mutationsList);
			}, {
				window: window$1,
				childList: true,
				subtree: true
			});
			cleanupAndUpdate(stop);
		}
	}, { flush });
	const stopHandle = () => {
		stopWatch();
		cleanupAndUpdate();
	};
	tryOnScopeDispose(stopHandle);
	return stopHandle;
}
function createKeyPredicate(keyFilter) {
	if (typeof keyFilter === "function") return keyFilter;
	else if (typeof keyFilter === "string") return (event) => event.key === keyFilter;
	else if (Array.isArray(keyFilter)) return (event) => keyFilter.includes(event.key);
	return () => true;
}
function onKeyStroke(...args) {
	let key;
	let handler;
	let options = {};
	if (args.length === 3) {
		key = args[0];
		handler = args[1];
		options = args[2];
	} else if (args.length === 2) if (typeof args[1] === "object") {
		key = true;
		handler = args[0];
		options = args[1];
	} else {
		key = args[0];
		handler = args[1];
	}
	else {
		key = true;
		handler = args[0];
	}
	const { target = defaultWindow, eventName = "keydown", passive = false, dedupe = false } = options;
	const predicate = createKeyPredicate(key);
	const listener = (e) => {
		if (e.repeat && toValue$1(dedupe)) return;
		if (predicate(e)) handler(e);
	};
	return useEventListener(target, eventName, listener, passive);
}
function useActiveElement(options = {}) {
	var _options$document;
	const { window: window$1 = defaultWindow, deep = true, triggerOnRemoval = false } = options;
	const document$1 = (_options$document = options.document) !== null && _options$document !== void 0 ? _options$document : window$1 === null || window$1 === void 0 ? void 0 : window$1.document;
	const getDeepActiveElement = () => {
		let element = document$1 === null || document$1 === void 0 ? void 0 : document$1.activeElement;
		if (deep) {
			var _element$shadowRoot;
			while (element === null || element === void 0 ? void 0 : element.shadowRoot) element = element === null || element === void 0 || (_element$shadowRoot = element.shadowRoot) === null || _element$shadowRoot === void 0 ? void 0 : _element$shadowRoot.activeElement;
		}
		return element;
	};
	const activeElement = shallowRef();
	const trigger = () => {
		activeElement.value = getDeepActiveElement();
	};
	if (window$1) {
		const listenerOptions = {
			capture: true,
			passive: true
		};
		useEventListener(window$1, "blur", (event) => {
			if (event.relatedTarget !== null) return;
			trigger();
		}, listenerOptions);
		useEventListener(window$1, "focus", trigger, listenerOptions);
	}
	if (triggerOnRemoval) onElementRemoval(activeElement, trigger, { document: document$1 });
	trigger();
	return activeElement;
}
function useRafFn(fn, options = {}) {
	const { immediate = true, fpsLimit = null, window: window$1 = defaultWindow, once = false } = options;
	const isActive = shallowRef(false);
	const intervalLimit = computed(() => {
		const limit = toValue$1(fpsLimit);
		return limit ? 1e3 / limit : null;
	});
	let previousFrameTimestamp = 0;
	let rafId = null;
	function loop(timestamp$1) {
		if (!isActive.value || !window$1) return;
		if (!previousFrameTimestamp) previousFrameTimestamp = timestamp$1;
		const delta = timestamp$1 - previousFrameTimestamp;
		if (intervalLimit.value && delta < intervalLimit.value) {
			rafId = window$1.requestAnimationFrame(loop);
			return;
		}
		previousFrameTimestamp = timestamp$1;
		fn({
			delta,
			timestamp: timestamp$1
		});
		if (once) {
			isActive.value = false;
			rafId = null;
			return;
		}
		rafId = window$1.requestAnimationFrame(loop);
	}
	function resume() {
		if (!isActive.value && window$1) {
			isActive.value = true;
			previousFrameTimestamp = 0;
			rafId = window$1.requestAnimationFrame(loop);
		}
	}
	function pause() {
		isActive.value = false;
		if (rafId != null && window$1) {
			window$1.cancelAnimationFrame(rafId);
			rafId = null;
		}
	}
	if (immediate) resume();
	tryOnScopeDispose(pause);
	return {
		isActive: readonly(isActive),
		pause,
		resume
	};
}
function useAsyncState(promise, initialState, options) {
	var _globalThis$reportErr;
	const { immediate = true, delay = 0, onError = (_globalThis$reportErr = globalThis.reportError) !== null && _globalThis$reportErr !== void 0 ? _globalThis$reportErr : noop, onSuccess = noop, resetOnExecute = true, shallow = true, throwError } = options !== null && options !== void 0 ? options : {};
	const state = shallow ? shallowRef(initialState) : ref(initialState);
	const isReady = shallowRef(false);
	const isLoading = shallowRef(false);
	const error = shallowRef(void 0);
	let executionsCount = 0;
	async function execute(delay$1 = 0, ...args) {
		const executionId = executionsCount += 1;
		if (resetOnExecute) state.value = toValue$1(initialState);
		error.value = void 0;
		isReady.value = false;
		isLoading.value = true;
		if (delay$1 > 0) await promiseTimeout(delay$1);
		const _promise = typeof promise === "function" ? promise(...args) : promise;
		try {
			const data = await _promise;
			if (executionId === executionsCount) {
				state.value = data;
				isReady.value = true;
			}
			onSuccess(data);
			return data;
		} catch (e) {
			if (executionId === executionsCount) error.value = e;
			onError(e);
			if (throwError) throw e;
		} finally {
			if (executionId === executionsCount) isLoading.value = false;
		}
	}
	if (immediate) execute(delay);
	const shell = {
		state,
		isReady,
		isLoading,
		error,
		execute,
		executeImmediate: (...args) => execute(0, ...args)
	};
	function waitUntilIsLoaded() {
		return new Promise((resolve, reject) => {
			until(isLoading).toBe(false).then(() => resolve(shell)).catch(reject);
		});
	}
	return {
		...shell,
		then(onFulfilled, onRejected) {
			return waitUntilIsLoaded().then(onFulfilled, onRejected);
		}
	};
}
var ssrWidthSymbol = Symbol("vueuse-ssr-width");
/* @__NO_SIDE_EFFECTS__ */
function useSSRWidth() {
	const ssrWidth = hasInjectionContext() ? injectLocal(ssrWidthSymbol, null) : null;
	return typeof ssrWidth === "number" ? ssrWidth : void 0;
}
function useMediaQuery(query, options = {}) {
	const { window: window$1 = defaultWindow, ssrWidth = /* @__PURE__ */ useSSRWidth() } = options;
	const isSupported = /* @__PURE__ */ useSupported(() => window$1 && "matchMedia" in window$1 && typeof window$1.matchMedia === "function");
	const ssrSupport = shallowRef(typeof ssrWidth === "number");
	const mediaQuery = shallowRef();
	const matches = shallowRef(false);
	const handler = (event) => {
		matches.value = event.matches;
	};
	watchEffect(() => {
		if (ssrSupport.value) {
			ssrSupport.value = !isSupported.value;
			matches.value = toValue$1(query).split(",").some((queryString) => {
				const not = queryString.includes("not all");
				const minWidth = queryString.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
				const maxWidth = queryString.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
				let res = Boolean(minWidth || maxWidth);
				if (minWidth && res) res = ssrWidth >= pxValue(minWidth[1]);
				if (maxWidth && res) res = ssrWidth <= pxValue(maxWidth[1]);
				return not ? !res : res;
			});
			return;
		}
		if (!isSupported.value) return;
		mediaQuery.value = window$1.matchMedia(toValue$1(query));
		matches.value = mediaQuery.value.matches;
	});
	useEventListener(mediaQuery, "change", handler, { passive: true });
	return computed(() => matches.value);
}
var breakpointsTailwind = {
	"sm": 640,
	"md": 768,
	"lg": 1024,
	"xl": 1280,
	"2xl": 1536
};
function useBreakpoints(breakpoints, options = {}) {
	function getValue$1(k, delta) {
		let v = toValue$1(breakpoints[toValue$1(k)]);
		if (delta != null) v = increaseWithUnit(v, delta);
		if (typeof v === "number") v = `${v}px`;
		return v;
	}
	const { window: window$1 = defaultWindow, strategy = "min-width", ssrWidth = /* @__PURE__ */ useSSRWidth() } = options;
	const ssrSupport = typeof ssrWidth === "number";
	const mounted = ssrSupport ? shallowRef(false) : { value: true };
	if (ssrSupport) tryOnMounted(() => mounted.value = !!window$1);
	function match(query, size) {
		if (!mounted.value && ssrSupport) return query === "min" ? ssrWidth >= pxValue(size) : ssrWidth <= pxValue(size);
		if (!window$1) return false;
		return window$1.matchMedia(`(${query}-width: ${size})`).matches;
	}
	const greaterOrEqual = (k) => {
		return useMediaQuery(() => `(min-width: ${getValue$1(k)})`, options);
	};
	const smallerOrEqual = (k) => {
		return useMediaQuery(() => `(max-width: ${getValue$1(k)})`, options);
	};
	const shortcutMethods = Object.keys(breakpoints).reduce((shortcuts, k) => {
		Object.defineProperty(shortcuts, k, {
			get: () => strategy === "min-width" ? greaterOrEqual(k) : smallerOrEqual(k),
			enumerable: true,
			configurable: true
		});
		return shortcuts;
	}, {});
	function current() {
		const points = Object.keys(breakpoints).map((k) => [
			k,
			shortcutMethods[k],
			pxValue(getValue$1(k))
		]).sort((a, b) => a[2] - b[2]);
		return computed(() => points.filter(([, v]) => v.value).map(([k]) => k));
	}
	return Object.assign(shortcutMethods, {
		greaterOrEqual,
		smallerOrEqual,
		greater(k) {
			return useMediaQuery(() => `(min-width: ${getValue$1(k, .1)})`, options);
		},
		smaller(k) {
			return useMediaQuery(() => `(max-width: ${getValue$1(k, -.1)})`, options);
		},
		between(a, b) {
			return useMediaQuery(() => `(min-width: ${getValue$1(a)}) and (max-width: ${getValue$1(b, -.1)})`, options);
		},
		isGreater(k) {
			return match("min", getValue$1(k, .1));
		},
		isGreaterOrEqual(k) {
			return match("min", getValue$1(k));
		},
		isSmaller(k) {
			return match("max", getValue$1(k, -.1));
		},
		isSmallerOrEqual(k) {
			return match("max", getValue$1(k));
		},
		isInBetween(a, b) {
			return match("min", getValue$1(a)) && match("max", getValue$1(b, -.1));
		},
		current,
		active() {
			const bps = current();
			return computed(() => bps.value.length === 0 ? "" : bps.value.at(strategy === "min-width" ? -1 : 0));
		}
	});
}
function usePermission(permissionDesc, options = {}) {
	const { controls = false, navigator: navigator$1 = defaultNavigator } = options;
	const isSupported = /* @__PURE__ */ useSupported(() => navigator$1 && "permissions" in navigator$1);
	const permissionStatus = shallowRef();
	const desc = typeof permissionDesc === "string" ? { name: permissionDesc } : permissionDesc;
	const state = shallowRef();
	const update = () => {
		var _permissionStatus$val;
		var _permissionStatus$val2;
		state.value = (_permissionStatus$val = (_permissionStatus$val2 = permissionStatus.value) === null || _permissionStatus$val2 === void 0 ? void 0 : _permissionStatus$val2.state) !== null && _permissionStatus$val !== void 0 ? _permissionStatus$val : "prompt";
	};
	useEventListener(permissionStatus, "change", update, { passive: true });
	const query = createSingletonPromise(async () => {
		if (!isSupported.value) return;
		if (!permissionStatus.value) try {
			permissionStatus.value = await navigator$1.permissions.query(desc);
		} catch (_unused) {
			permissionStatus.value = void 0;
		} finally {
			update();
		}
		if (controls) return toRaw(permissionStatus.value);
	});
	query();
	if (controls) return {
		state,
		isSupported,
		query
	};
	else return state;
}
function useClipboard(options = {}) {
	const { navigator: navigator$1 = defaultNavigator, read = false, source, copiedDuring = 1500, legacy = false } = options;
	const isClipboardApiSupported = /* @__PURE__ */ useSupported(() => navigator$1 && "clipboard" in navigator$1);
	const permissionRead = usePermission("clipboard-read");
	const permissionWrite = usePermission("clipboard-write");
	const isSupported = computed(() => isClipboardApiSupported.value || legacy);
	const text = shallowRef("");
	const copied = shallowRef(false);
	const timeout = useTimeoutFn(() => copied.value = false, copiedDuring, { immediate: false });
	async function updateText() {
		let useLegacy = !(isClipboardApiSupported.value && isAllowed(permissionRead.value));
		if (!useLegacy) try {
			text.value = await navigator$1.clipboard.readText();
		} catch (_unused) {
			useLegacy = true;
		}
		if (useLegacy) text.value = legacyRead();
	}
	if (isSupported.value && read) useEventListener(["copy", "cut"], updateText, { passive: true });
	async function copy(value = toValue$1(source)) {
		if (isSupported.value && value != null) {
			let useLegacy = !(isClipboardApiSupported.value && isAllowed(permissionWrite.value));
			if (!useLegacy) try {
				await navigator$1.clipboard.writeText(value);
			} catch (_unused2) {
				useLegacy = true;
			}
			if (useLegacy) legacyCopy(value);
			text.value = value;
			copied.value = true;
			timeout.start();
		}
	}
	function legacyCopy(value) {
		const ta = document.createElement("textarea");
		ta.value = value;
		ta.style.position = "absolute";
		ta.style.opacity = "0";
		ta.setAttribute("readonly", "");
		document.body.appendChild(ta);
		ta.select();
		document.execCommand("copy");
		ta.remove();
	}
	function legacyRead() {
		var _document$getSelectio;
		var _document;
		var _document$getSelectio2;
		return (_document$getSelectio = (_document = document) === null || _document === void 0 || (_document$getSelectio2 = _document.getSelection) === null || _document$getSelectio2 === void 0 || (_document$getSelectio2 = _document$getSelectio2.call(_document)) === null || _document$getSelectio2 === void 0 ? void 0 : _document$getSelectio2.toString()) !== null && _document$getSelectio !== void 0 ? _document$getSelectio : "";
	}
	function isAllowed(status) {
		return status === "granted" || status === "prompt";
	}
	return {
		isSupported,
		text: readonly(text),
		copied: readonly(copied),
		copy
	};
}
function cloneFnJSON(source) {
	return JSON.parse(JSON.stringify(source));
}
var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var globalKey = "__vueuse_ssr_handlers__";
var handlers = /* @__PURE__ */ getHandlers();
function getHandlers() {
	if (!(globalKey in _global)) _global[globalKey] = _global[globalKey] || {};
	return _global[globalKey];
}
function getSSRHandler(key, fallback) {
	return handlers[key] || fallback;
}
function guessSerializerType(rawInit) {
	return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
}
var StorageSerializers = {
	boolean: {
		read: (v) => v === "true",
		write: (v) => String(v)
	},
	object: {
		read: (v) => JSON.parse(v),
		write: (v) => JSON.stringify(v)
	},
	number: {
		read: (v) => Number.parseFloat(v),
		write: (v) => String(v)
	},
	any: {
		read: (v) => v,
		write: (v) => String(v)
	},
	string: {
		read: (v) => v,
		write: (v) => String(v)
	},
	map: {
		read: (v) => new Map(JSON.parse(v)),
		write: (v) => JSON.stringify(Array.from(v.entries()))
	},
	set: {
		read: (v) => new Set(JSON.parse(v)),
		write: (v) => JSON.stringify(Array.from(v))
	},
	date: {
		read: (v) => new Date(v),
		write: (v) => v.toISOString()
	}
};
var customStorageEventName = "vueuse-storage";
function useStorage(key, defaults$1, storage, options = {}) {
	var _options$serializer;
	const { flush = "pre", deep = true, listenToStorageChanges = true, writeDefaults = true, mergeDefaults = false, shallow, window: window$1 = defaultWindow, eventFilter, onError = (e) => {
		console.error(e);
	}, initOnMounted } = options;
	const data = (shallow ? shallowRef : ref)(typeof defaults$1 === "function" ? defaults$1() : defaults$1);
	const keyComputed = computed(() => toValue$1(key));
	if (!storage) try {
		storage = getSSRHandler("getDefaultStorage", () => defaultWindow === null || defaultWindow === void 0 ? void 0 : defaultWindow.localStorage)();
	} catch (e) {
		onError(e);
	}
	if (!storage) return data;
	const rawInit = toValue$1(defaults$1);
	const type = guessSerializerType(rawInit);
	const serializer = (_options$serializer = options.serializer) !== null && _options$serializer !== void 0 ? _options$serializer : StorageSerializers[type];
	const { pause: pauseWatch, resume: resumeWatch } = watchPausable(data, (newValue) => write(newValue), {
		flush,
		deep,
		eventFilter
	});
	watch(keyComputed, () => update(), { flush });
	let firstMounted = false;
	const onStorageEvent = (ev) => {
		if (initOnMounted && !firstMounted) return;
		update(ev);
	};
	const onStorageCustomEvent = (ev) => {
		if (initOnMounted && !firstMounted) return;
		updateFromCustomEvent(ev);
	};
	if (window$1 && listenToStorageChanges) if (storage instanceof Storage) useEventListener(window$1, "storage", onStorageEvent, { passive: true });
	else useEventListener(window$1, customStorageEventName, onStorageCustomEvent);
	if (initOnMounted) tryOnMounted(() => {
		firstMounted = true;
		update();
	});
	else update();
	function dispatchWriteEvent(oldValue, newValue) {
		if (window$1) {
			const payload = {
				key: keyComputed.value,
				oldValue,
				newValue,
				storageArea: storage
			};
			window$1.dispatchEvent(storage instanceof Storage ? new StorageEvent("storage", payload) : new CustomEvent(customStorageEventName, { detail: payload }));
		}
	}
	function write(v) {
		try {
			const oldValue = storage.getItem(keyComputed.value);
			if (v == null) {
				dispatchWriteEvent(oldValue, null);
				storage.removeItem(keyComputed.value);
			} else {
				const serialized = serializer.write(v);
				if (oldValue !== serialized) {
					storage.setItem(keyComputed.value, serialized);
					dispatchWriteEvent(oldValue, serialized);
				}
			}
		} catch (e) {
			onError(e);
		}
	}
	function read(event) {
		const rawValue = event ? event.newValue : storage.getItem(keyComputed.value);
		if (rawValue == null) {
			if (writeDefaults && rawInit != null) storage.setItem(keyComputed.value, serializer.write(rawInit));
			return rawInit;
		} else if (!event && mergeDefaults) {
			const value = serializer.read(rawValue);
			if (typeof mergeDefaults === "function") return mergeDefaults(value, rawInit);
			else if (type === "object" && !Array.isArray(value)) return {
				...rawInit,
				...value
			};
			return value;
		} else if (typeof rawValue !== "string") return rawValue;
		else return serializer.read(rawValue);
	}
	function update(event) {
		if (event && event.storageArea !== storage) return;
		if (event && event.key == null) {
			data.value = rawInit;
			return;
		}
		if (event && event.key !== keyComputed.value) return;
		pauseWatch();
		try {
			const serializedData = serializer.write(data.value);
			if (event === void 0 || (event === null || event === void 0 ? void 0 : event.newValue) !== serializedData) data.value = read(event);
		} catch (e) {
			onError(e);
		} finally {
			if (event) nextTick(resumeWatch);
			else resumeWatch();
		}
	}
	function updateFromCustomEvent(event) {
		update(event.detail);
	}
	return data;
}
function useCurrentElement(rootComponent) {
	const vm = getCurrentInstance();
	const currentElement = computedWithControl(() => null, () => rootComponent ? unrefElement(rootComponent) : vm.proxy.$el);
	onUpdated(currentElement.trigger);
	onMounted(currentElement.trigger);
	return currentElement;
}
function useDocumentVisibility(options = {}) {
	const { document: document$1 = defaultDocument } = options;
	if (!document$1) return shallowRef("visible");
	const visibility = shallowRef(document$1.visibilityState);
	useEventListener(document$1, "visibilitychange", () => {
		visibility.value = document$1.visibilityState;
	}, { passive: true });
	return visibility;
}
var defaultScrollConfig = {
	speed: 2,
	margin: 30,
	direction: "both"
};
function clampContainerScroll(container) {
	if (container.scrollLeft > container.scrollWidth - container.clientWidth) container.scrollLeft = Math.max(0, container.scrollWidth - container.clientWidth);
	if (container.scrollTop > container.scrollHeight - container.clientHeight) container.scrollTop = Math.max(0, container.scrollHeight - container.clientHeight);
}
function useDraggable(target, options = {}) {
	var _toValue;
	var _toValue2;
	var _toValue3;
	var _scrollConfig$directi;
	const { pointerTypes, preventDefault: preventDefault$1, stopPropagation, exact, onMove, onEnd, onStart, initialValue, axis = "both", draggingElement = defaultWindow, containerElement, handle: draggingHandle = target, buttons = [0], restrictInView, autoScroll = false } = options;
	const position = ref((_toValue = toValue$1(initialValue)) !== null && _toValue !== void 0 ? _toValue : {
		x: 0,
		y: 0
	});
	const pressedDelta = ref();
	const filterEvent = (e) => {
		if (pointerTypes) return pointerTypes.includes(e.pointerType);
		return true;
	};
	const handleEvent = (e) => {
		if (toValue$1(preventDefault$1)) e.preventDefault();
		if (toValue$1(stopPropagation)) e.stopPropagation();
	};
	const scrollConfig = toValue$1(autoScroll);
	const scrollSettings = typeof scrollConfig === "object" ? {
		speed: (_toValue2 = toValue$1(scrollConfig.speed)) !== null && _toValue2 !== void 0 ? _toValue2 : defaultScrollConfig.speed,
		margin: (_toValue3 = toValue$1(scrollConfig.margin)) !== null && _toValue3 !== void 0 ? _toValue3 : defaultScrollConfig.margin,
		direction: (_scrollConfig$directi = scrollConfig.direction) !== null && _scrollConfig$directi !== void 0 ? _scrollConfig$directi : defaultScrollConfig.direction
	} : defaultScrollConfig;
	const getScrollAxisValues = (value) => typeof value === "number" ? [value, value] : [value.x, value.y];
	const handleAutoScroll = (container, targetRect, position$1) => {
		const { clientWidth, clientHeight, scrollLeft, scrollTop, scrollWidth, scrollHeight } = container;
		const [marginX, marginY] = getScrollAxisValues(scrollSettings.margin);
		const [speedX, speedY] = getScrollAxisValues(scrollSettings.speed);
		let deltaX = 0;
		let deltaY = 0;
		if (scrollSettings.direction === "x" || scrollSettings.direction === "both") {
			if (position$1.x < marginX && scrollLeft > 0) deltaX = -speedX;
			else if (position$1.x + targetRect.width > clientWidth - marginX && scrollLeft < scrollWidth - clientWidth) deltaX = speedX;
		}
		if (scrollSettings.direction === "y" || scrollSettings.direction === "both") {
			if (position$1.y < marginY && scrollTop > 0) deltaY = -speedY;
			else if (position$1.y + targetRect.height > clientHeight - marginY && scrollTop < scrollHeight - clientHeight) deltaY = speedY;
		}
		if (deltaX || deltaY) container.scrollBy({
			left: deltaX,
			top: deltaY,
			behavior: "auto"
		});
	};
	let autoScrollInterval = null;
	const startAutoScroll = () => {
		const container = toValue$1(containerElement);
		if (container && !autoScrollInterval) autoScrollInterval = setInterval(() => {
			const targetRect = toValue$1(target).getBoundingClientRect();
			const { x, y } = position.value;
			const relativePosition = {
				x: x - container.scrollLeft,
				y: y - container.scrollTop
			};
			if (relativePosition.x >= 0 && relativePosition.y >= 0) {
				handleAutoScroll(container, targetRect, relativePosition);
				relativePosition.x += container.scrollLeft;
				relativePosition.y += container.scrollTop;
				position.value = relativePosition;
			}
		}, 1e3 / 60);
	};
	const stopAutoScroll = () => {
		if (autoScrollInterval) {
			clearInterval(autoScrollInterval);
			autoScrollInterval = null;
		}
	};
	const isPointerNearEdge = (pointer, container, margin, targetRect) => {
		const [marginX, marginY] = typeof margin === "number" ? [margin, margin] : [margin.x, margin.y];
		const { clientWidth, clientHeight } = container;
		return pointer.x < marginX || pointer.x + targetRect.width > clientWidth - marginX || pointer.y < marginY || pointer.y + targetRect.height > clientHeight - marginY;
	};
	const checkAutoScroll = () => {
		if (toValue$1(options.disabled) || !pressedDelta.value) return;
		const container = toValue$1(containerElement);
		if (!container) return;
		const targetRect = toValue$1(target).getBoundingClientRect();
		const { x, y } = position.value;
		if (isPointerNearEdge({
			x: x - container.scrollLeft,
			y: y - container.scrollTop
		}, container, scrollSettings.margin, targetRect)) startAutoScroll();
		else stopAutoScroll();
	};
	if (toValue$1(autoScroll)) watch(position, checkAutoScroll);
	const start = (e) => {
		var _container$getBoundin;
		if (!toValue$1(buttons).includes(e.button)) return;
		if (toValue$1(options.disabled) || !filterEvent(e)) return;
		if (toValue$1(exact) && e.target !== toValue$1(target)) return;
		const container = toValue$1(containerElement);
		const containerRect = container === null || container === void 0 || (_container$getBoundin = container.getBoundingClientRect) === null || _container$getBoundin === void 0 ? void 0 : _container$getBoundin.call(container);
		const targetRect = toValue$1(target).getBoundingClientRect();
		const pos = {
			x: e.clientX - (container ? targetRect.left - containerRect.left + (autoScroll ? 0 : container.scrollLeft) : targetRect.left),
			y: e.clientY - (container ? targetRect.top - containerRect.top + (autoScroll ? 0 : container.scrollTop) : targetRect.top)
		};
		if ((onStart === null || onStart === void 0 ? void 0 : onStart(pos, e)) === false) return;
		pressedDelta.value = pos;
		handleEvent(e);
	};
	const move = (e) => {
		if (toValue$1(options.disabled) || !filterEvent(e)) return;
		if (!pressedDelta.value) return;
		const container = toValue$1(containerElement);
		if (container instanceof HTMLElement) clampContainerScroll(container);
		const targetRect = toValue$1(target).getBoundingClientRect();
		let { x, y } = position.value;
		if (axis === "x" || axis === "both") {
			x = e.clientX - pressedDelta.value.x;
			if (container) x = Math.min(Math.max(0, x), container.scrollWidth - targetRect.width);
		}
		if (axis === "y" || axis === "both") {
			y = e.clientY - pressedDelta.value.y;
			if (container) y = Math.min(Math.max(0, y), container.scrollHeight - targetRect.height);
		}
		if (toValue$1(autoScroll) && container) {
			if (autoScrollInterval === null) handleAutoScroll(container, targetRect, {
				x,
				y
			});
			x += container.scrollLeft;
			y += container.scrollTop;
		}
		if (container && (restrictInView || autoScroll)) {
			if (axis !== "y") {
				const relativeX = x - container.scrollLeft;
				if (relativeX < 0) x = container.scrollLeft;
				else if (relativeX > container.clientWidth - targetRect.width) x = container.clientWidth - targetRect.width + container.scrollLeft;
			}
			if (axis !== "x") {
				const relativeY = y - container.scrollTop;
				if (relativeY < 0) y = container.scrollTop;
				else if (relativeY > container.clientHeight - targetRect.height) y = container.clientHeight - targetRect.height + container.scrollTop;
			}
		}
		position.value = {
			x,
			y
		};
		onMove === null || onMove === void 0 || onMove(position.value, e);
		handleEvent(e);
	};
	const end = (e) => {
		if (toValue$1(options.disabled) || !filterEvent(e)) return;
		if (!pressedDelta.value) return;
		pressedDelta.value = void 0;
		if (autoScroll) stopAutoScroll();
		onEnd === null || onEnd === void 0 || onEnd(position.value, e);
		handleEvent(e);
	};
	if (isClient) {
		const config = () => {
			var _options$capture;
			return {
				capture: (_options$capture = options.capture) !== null && _options$capture !== void 0 ? _options$capture : true,
				passive: !toValue$1(preventDefault$1)
			};
		};
		useEventListener(draggingHandle, "pointerdown", start, config);
		useEventListener(draggingElement, "pointermove", move, config);
		useEventListener(draggingElement, "pointerup", end, config);
	}
	return {
		...toRefs(position),
		position,
		isDragging: computed(() => !!pressedDelta.value),
		style: computed(() => `
      left: ${position.value.x}px;
      top: ${position.value.y}px;
      ${autoScroll ? "text-wrap: nowrap;" : ""}
    `)
	};
}
function useDropZone(target, options = {}) {
	const isOverDropZone = shallowRef(false);
	const files = shallowRef(null);
	let counter = 0;
	let isValid = true;
	if (isClient) {
		var _options$multiple;
		var _options$preventDefau;
		const _options = typeof options === "function" ? { onDrop: options } : options;
		const multiple = (_options$multiple = _options.multiple) !== null && _options$multiple !== void 0 ? _options$multiple : true;
		const preventDefaultForUnhandled = (_options$preventDefau = _options.preventDefaultForUnhandled) !== null && _options$preventDefau !== void 0 ? _options$preventDefau : false;
		const getFiles = (event) => {
			var _event$dataTransfer$f;
			var _event$dataTransfer;
			const list = Array.from((_event$dataTransfer$f = (_event$dataTransfer = event.dataTransfer) === null || _event$dataTransfer === void 0 ? void 0 : _event$dataTransfer.files) !== null && _event$dataTransfer$f !== void 0 ? _event$dataTransfer$f : []);
			return list.length === 0 ? null : multiple ? list : [list[0]];
		};
		const checkDataTypes = (types) => {
			const dataTypes = unref(_options.dataTypes);
			if (typeof dataTypes === "function") return dataTypes(types);
			if (!(dataTypes === null || dataTypes === void 0 ? void 0 : dataTypes.length)) return true;
			if (types.length === 0) return false;
			return types.every((type) => dataTypes.some((allowedType) => type.includes(allowedType)));
		};
		const checkValidity = (items) => {
			if (_options.checkValidity) return _options.checkValidity(items);
			const dataTypesValid = checkDataTypes(Array.from(items !== null && items !== void 0 ? items : []).map((item) => item.type));
			const multipleFilesValid = multiple || items.length <= 1;
			return dataTypesValid && multipleFilesValid;
		};
		const isSafari = () => /^(?:(?!chrome|android).)*safari/i.test(navigator.userAgent) && !("chrome" in window);
		const handleDragEvent = (event, eventType) => {
			var _event$dataTransfer2;
			var _ref;
			const dataTransferItemList = (_event$dataTransfer2 = event.dataTransfer) === null || _event$dataTransfer2 === void 0 ? void 0 : _event$dataTransfer2.items;
			isValid = (_ref = dataTransferItemList && checkValidity(dataTransferItemList)) !== null && _ref !== void 0 ? _ref : false;
			if (preventDefaultForUnhandled) event.preventDefault();
			if (!isSafari() && !isValid) {
				if (event.dataTransfer) event.dataTransfer.dropEffect = "none";
				return;
			}
			event.preventDefault();
			if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
			const currentFiles = getFiles(event);
			switch (eventType) {
				case "enter":
					var _options$onEnter;
					counter += 1;
					isOverDropZone.value = true;
					(_options$onEnter = _options.onEnter) === null || _options$onEnter === void 0 || _options$onEnter.call(_options, null, event);
					break;
				case "over":
					var _options$onOver;
					(_options$onOver = _options.onOver) === null || _options$onOver === void 0 || _options$onOver.call(_options, null, event);
					break;
				case "leave":
					var _options$onLeave;
					counter -= 1;
					if (counter === 0) isOverDropZone.value = false;
					(_options$onLeave = _options.onLeave) === null || _options$onLeave === void 0 || _options$onLeave.call(_options, null, event);
					break;
				case "drop":
					counter = 0;
					isOverDropZone.value = false;
					if (isValid) {
						var _options$onDrop;
						files.value = currentFiles;
						(_options$onDrop = _options.onDrop) === null || _options$onDrop === void 0 || _options$onDrop.call(_options, currentFiles, event);
					}
					break;
			}
		};
		useEventListener(target, "dragenter", (event) => handleDragEvent(event, "enter"));
		useEventListener(target, "dragover", (event) => handleDragEvent(event, "over"));
		useEventListener(target, "dragleave", (event) => handleDragEvent(event, "leave"));
		useEventListener(target, "drop", (event) => handleDragEvent(event, "drop"));
	}
	return {
		files,
		isOverDropZone
	};
}
function useResizeObserver(target, callback, options = {}) {
	const { window: window$1 = defaultWindow, ...observerOptions } = options;
	let observer;
	const isSupported = /* @__PURE__ */ useSupported(() => window$1 && "ResizeObserver" in window$1);
	const cleanup = () => {
		if (observer) {
			observer.disconnect();
			observer = void 0;
		}
	};
	const stopWatch = watch(computed(() => {
		const _targets = toValue$1(target);
		return Array.isArray(_targets) ? _targets.map((el) => unrefElement(el)) : [unrefElement(_targets)];
	}), (els) => {
		cleanup();
		if (isSupported.value && window$1) {
			observer = new ResizeObserver(callback);
			for (const _el of els) if (_el) observer.observe(_el, observerOptions);
		}
	}, {
		immediate: true,
		flush: "post"
	});
	const stop = () => {
		cleanup();
		stopWatch();
	};
	tryOnScopeDispose(stop);
	return {
		isSupported,
		stop
	};
}
function useElementBounding(target, options = {}) {
	const { reset = true, windowResize = true, windowScroll = true, immediate = true, updateTiming = "sync" } = options;
	const height = shallowRef(0);
	const bottom = shallowRef(0);
	const left = shallowRef(0);
	const right = shallowRef(0);
	const top = shallowRef(0);
	const width = shallowRef(0);
	const x = shallowRef(0);
	const y = shallowRef(0);
	function recalculate() {
		const el = unrefElement(target);
		if (!el) {
			if (reset) {
				height.value = 0;
				bottom.value = 0;
				left.value = 0;
				right.value = 0;
				top.value = 0;
				width.value = 0;
				x.value = 0;
				y.value = 0;
			}
			return;
		}
		const rect = el.getBoundingClientRect();
		height.value = rect.height;
		bottom.value = rect.bottom;
		left.value = rect.left;
		right.value = rect.right;
		top.value = rect.top;
		width.value = rect.width;
		x.value = rect.x;
		y.value = rect.y;
	}
	function update() {
		if (updateTiming === "sync") recalculate();
		else if (updateTiming === "next-frame") requestAnimationFrame(() => recalculate());
	}
	useResizeObserver(target, update);
	watch(() => unrefElement(target), (ele) => !ele && update());
	useMutationObserver(target, update, { attributeFilter: ["style", "class"] });
	if (windowScroll) useEventListener("scroll", update, {
		capture: true,
		passive: true
	});
	if (windowResize) useEventListener("resize", update, { passive: true });
	tryOnMounted(() => {
		if (immediate) update();
	});
	return {
		height,
		bottom,
		left,
		right,
		top,
		width,
		x,
		y,
		update
	};
}
function useElementHover(el, options = {}) {
	const { delayEnter = 0, delayLeave = 0, triggerOnRemoval = false, window: window$1 = defaultWindow } = options;
	const isHovered = shallowRef(false);
	let timer;
	const toggle = (entering) => {
		const delay = entering ? delayEnter : delayLeave;
		if (timer) {
			clearTimeout(timer);
			timer = void 0;
		}
		if (delay) timer = setTimeout(() => isHovered.value = entering, delay);
		else isHovered.value = entering;
	};
	if (!window$1) return isHovered;
	useEventListener(el, "mouseenter", () => toggle(true), { passive: true });
	useEventListener(el, "mouseleave", () => toggle(false), { passive: true });
	if (triggerOnRemoval) onElementRemoval(computed(() => unrefElement(el)), () => toggle(false));
	return isHovered;
}
function useElementSize(target, initialSize = {
	width: 0,
	height: 0
}, options = {}) {
	const { window: window$1 = defaultWindow, box = "content-box" } = options;
	const isSVG = computed(() => {
		var _unrefElement;
		return (_unrefElement = unrefElement(target)) === null || _unrefElement === void 0 || (_unrefElement = _unrefElement.namespaceURI) === null || _unrefElement === void 0 ? void 0 : _unrefElement.includes("svg");
	});
	const width = shallowRef(initialSize.width);
	const height = shallowRef(initialSize.height);
	const { stop: stop1 } = useResizeObserver(target, ([entry]) => {
		const boxSize = box === "border-box" ? entry.borderBoxSize : box === "content-box" ? entry.contentBoxSize : entry.devicePixelContentBoxSize;
		if (window$1 && isSVG.value) {
			const $elem = unrefElement(target);
			if ($elem) {
				const rect = $elem.getBoundingClientRect();
				width.value = rect.width;
				height.value = rect.height;
			}
		} else if (boxSize) {
			const formatBoxSize = toArray(boxSize);
			width.value = formatBoxSize.reduce((acc, { inlineSize }) => acc + inlineSize, 0);
			height.value = formatBoxSize.reduce((acc, { blockSize }) => acc + blockSize, 0);
		} else {
			width.value = entry.contentRect.width;
			height.value = entry.contentRect.height;
		}
	}, options);
	tryOnMounted(() => {
		const ele = unrefElement(target);
		if (ele) {
			width.value = "offsetWidth" in ele ? ele.offsetWidth : initialSize.width;
			height.value = "offsetHeight" in ele ? ele.offsetHeight : initialSize.height;
		}
	});
	const stop2 = watch(() => unrefElement(target), (ele) => {
		width.value = ele ? initialSize.width : 0;
		height.value = ele ? initialSize.height : 0;
	});
	function stop() {
		stop1();
		stop2();
	}
	return {
		width,
		height,
		stop
	};
}
function useIntersectionObserver(target, callback, options = {}) {
	const { root, rootMargin, threshold = 0, window: window$1 = defaultWindow, immediate = true } = options;
	const isSupported = /* @__PURE__ */ useSupported(() => window$1 && "IntersectionObserver" in window$1);
	const targets = computed(() => {
		return toArray(toValue$1(target)).map(unrefElement).filter(notNullish);
	});
	let cleanup = noop;
	const isActive = shallowRef(immediate);
	const stopWatch = isSupported.value ? watch(() => [
		targets.value,
		unrefElement(root),
		toValue$1(rootMargin),
		isActive.value
	], ([targets$1, root$1, rootMargin$1]) => {
		cleanup();
		if (!isActive.value) return;
		if (!targets$1.length) return;
		const observer = new IntersectionObserver(callback, {
			root: unrefElement(root$1),
			rootMargin: rootMargin$1,
			threshold
		});
		targets$1.forEach((el) => el && observer.observe(el));
		cleanup = () => {
			observer.disconnect();
			cleanup = noop;
		};
	}, {
		immediate,
		flush: "post"
	}) : noop;
	const stop = () => {
		cleanup();
		stopWatch();
		isActive.value = false;
	};
	tryOnScopeDispose(stop);
	return {
		isSupported,
		isActive,
		pause() {
			cleanup();
			isActive.value = false;
		},
		resume() {
			isActive.value = true;
		},
		stop
	};
}
function useElementVisibility(element, options = {}) {
	const { window: window$1 = defaultWindow, scrollTarget, threshold = 0, rootMargin, once = false, initialValue = false } = options;
	const elementIsVisible = shallowRef(initialValue);
	const { stop } = useIntersectionObserver(element, (intersectionObserverEntries) => {
		let isIntersecting = elementIsVisible.value;
		let latestTime = 0;
		for (const entry of intersectionObserverEntries) if (entry.time >= latestTime) {
			latestTime = entry.time;
			isIntersecting = entry.isIntersecting;
		}
		elementIsVisible.value = isIntersecting;
		if (once) watchOnce(elementIsVisible, () => {
			stop();
		});
	}, {
		root: scrollTarget,
		window: window$1,
		threshold,
		rootMargin
	});
	return elementIsVisible;
}
function useFavicon(newIcon = null, options = {}) {
	const { baseUrl = "", rel = "icon", document: document$1 = defaultDocument } = options;
	const favicon = toRef(newIcon);
	const applyIcon = (icon) => {
		const elements = document$1 === null || document$1 === void 0 ? void 0 : document$1.head.querySelectorAll(`link[rel*="${rel}"]`);
		if (!elements || elements.length === 0) {
			const link = document$1 === null || document$1 === void 0 ? void 0 : document$1.createElement("link");
			if (link) {
				link.rel = rel;
				link.href = `${baseUrl}${icon}`;
				link.type = `image/${icon.split(".").pop()}`;
				document$1 === null || document$1 === void 0 || document$1.head.append(link);
			}
			return;
		}
		elements === null || elements === void 0 || elements.forEach((el) => el.href = `${baseUrl}${icon}`);
	};
	watch(favicon, (i, o) => {
		if (typeof i === "string" && i !== o) applyIcon(i);
	}, { immediate: true });
	return favicon;
}
var EVENT_FOCUS_IN = "focusin";
var EVENT_FOCUS_OUT = "focusout";
var PSEUDO_CLASS_FOCUS_WITHIN = ":focus-within";
function useFocusWithin(target, options = {}) {
	const { window: window$1 = defaultWindow } = options;
	const targetElement = computed(() => unrefElement(target));
	const _focused = shallowRef(false);
	const focused = computed(() => _focused.value);
	const activeElement = useActiveElement(options);
	if (!window$1 || !activeElement.value) return { focused };
	const listenerOptions = { passive: true };
	useEventListener(targetElement, EVENT_FOCUS_IN, () => _focused.value = true, listenerOptions);
	useEventListener(targetElement, EVENT_FOCUS_OUT, () => {
		var _targetElement$value$;
		var _targetElement$value;
		var _targetElement$value$2;
		return _focused.value = (_targetElement$value$ = (_targetElement$value = targetElement.value) === null || _targetElement$value === void 0 || (_targetElement$value$2 = _targetElement$value.matches) === null || _targetElement$value$2 === void 0 ? void 0 : _targetElement$value$2.call(_targetElement$value, PSEUDO_CLASS_FOCUS_WITHIN)) !== null && _targetElement$value$ !== void 0 ? _targetElement$value$ : false;
	}, listenerOptions);
	return { focused };
}
async function loadImage(options) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		const { src, srcset, sizes, class: clazz, loading, crossorigin, referrerPolicy, width, height, decoding, fetchPriority, ismap, usemap } = options;
		img.src = src;
		if (srcset != null) img.srcset = srcset;
		if (sizes != null) img.sizes = sizes;
		if (clazz != null) img.className = clazz;
		if (loading != null) img.loading = loading;
		if (crossorigin != null) img.crossOrigin = crossorigin;
		if (referrerPolicy != null) img.referrerPolicy = referrerPolicy;
		if (width != null) img.width = width;
		if (height != null) img.height = height;
		if (decoding != null) img.decoding = decoding;
		if (fetchPriority != null) img.fetchPriority = fetchPriority;
		if (ismap != null) img.isMap = ismap;
		if (usemap != null) img.useMap = usemap;
		img.onload = () => resolve(img);
		img.onerror = reject;
	});
}
function useImage(options, asyncStateOptions = {}) {
	const state = useAsyncState(() => loadImage(toValue$1(options)), void 0, {
		resetOnExecute: true,
		...asyncStateOptions
	});
	watch(() => toValue$1(options), () => state.execute(asyncStateOptions.delay), { deep: true });
	return state;
}
function resolveElement(el) {
	if (typeof Window !== "undefined" && el instanceof Window) return el.document.documentElement;
	if (typeof Document !== "undefined" && el instanceof Document) return el.documentElement;
	return el;
}
var ARRIVED_STATE_THRESHOLD_PIXELS = 1;
function useScroll(element, options = {}) {
	const { throttle = 0, idle = 200, onStop = noop, onScroll = noop, offset = {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	}, observe: _observe = { mutation: false }, eventListenerOptions = {
		capture: false,
		passive: true
	}, behavior = "auto", window: window$1 = defaultWindow, onError = (e) => {
		console.error(e);
	} } = options;
	const observe = typeof _observe === "boolean" ? { mutation: _observe } : _observe;
	const internalX = shallowRef(0);
	const internalY = shallowRef(0);
	const x = computed({
		get() {
			return internalX.value;
		},
		set(x$1) {
			scrollTo(x$1, void 0);
		}
	});
	const y = computed({
		get() {
			return internalY.value;
		},
		set(y$1) {
			scrollTo(void 0, y$1);
		}
	});
	function scrollTo(_x, _y) {
		var _ref;
		var _toValue;
		var _toValue2;
		var _document;
		if (!window$1) return;
		const _element = toValue$1(element);
		if (!_element) return;
		(_ref = _element instanceof Document ? window$1.document.body : _element) === null || _ref === void 0 || _ref.scrollTo({
			top: (_toValue = toValue$1(_y)) !== null && _toValue !== void 0 ? _toValue : y.value,
			left: (_toValue2 = toValue$1(_x)) !== null && _toValue2 !== void 0 ? _toValue2 : x.value,
			behavior: toValue$1(behavior)
		});
		const scrollContainer = (_element === null || _element === void 0 || (_document = _element.document) === null || _document === void 0 ? void 0 : _document.documentElement) || (_element === null || _element === void 0 ? void 0 : _element.documentElement) || _element;
		if (x != null) internalX.value = scrollContainer.scrollLeft;
		if (y != null) internalY.value = scrollContainer.scrollTop;
	}
	const isScrolling = shallowRef(false);
	const arrivedState = reactive({
		left: true,
		right: false,
		top: true,
		bottom: false
	});
	const directions = reactive({
		left: false,
		right: false,
		top: false,
		bottom: false
	});
	const onScrollEnd = (e) => {
		if (!isScrolling.value) return;
		isScrolling.value = false;
		directions.left = false;
		directions.right = false;
		directions.top = false;
		directions.bottom = false;
		onStop(e);
	};
	const onScrollEndDebounced = useDebounceFn(onScrollEnd, throttle + idle);
	const setArrivedState = (target) => {
		var _document2;
		if (!window$1) return;
		const el = (target === null || target === void 0 || (_document2 = target.document) === null || _document2 === void 0 ? void 0 : _document2.documentElement) || (target === null || target === void 0 ? void 0 : target.documentElement) || unrefElement(target);
		const { display, flexDirection, direction } = window$1.getComputedStyle(el);
		const directionMultipler = direction === "rtl" ? -1 : 1;
		const scrollLeft = el.scrollLeft;
		directions.left = scrollLeft < internalX.value;
		directions.right = scrollLeft > internalX.value;
		const left = Math.abs(scrollLeft * directionMultipler) <= (offset.left || 0);
		const right = Math.abs(scrollLeft * directionMultipler) + el.clientWidth >= el.scrollWidth - (offset.right || 0) - ARRIVED_STATE_THRESHOLD_PIXELS;
		if (display === "flex" && flexDirection === "row-reverse") {
			arrivedState.left = right;
			arrivedState.right = left;
		} else {
			arrivedState.left = left;
			arrivedState.right = right;
		}
		internalX.value = scrollLeft;
		let scrollTop = el.scrollTop;
		if (target === window$1.document && !scrollTop) scrollTop = window$1.document.body.scrollTop;
		directions.top = scrollTop < internalY.value;
		directions.bottom = scrollTop > internalY.value;
		const top = Math.abs(scrollTop) <= (offset.top || 0);
		const bottom = Math.abs(scrollTop) + el.clientHeight >= el.scrollHeight - (offset.bottom || 0) - ARRIVED_STATE_THRESHOLD_PIXELS;
		if (display === "flex" && flexDirection === "column-reverse") {
			arrivedState.top = bottom;
			arrivedState.bottom = top;
		} else {
			arrivedState.top = top;
			arrivedState.bottom = bottom;
		}
		internalY.value = scrollTop;
	};
	const onScrollHandler = (e) => {
		var _documentElement;
		if (!window$1) return;
		setArrivedState((_documentElement = e.target.documentElement) !== null && _documentElement !== void 0 ? _documentElement : e.target);
		isScrolling.value = true;
		onScrollEndDebounced(e);
		onScroll(e);
	};
	useEventListener(element, "scroll", throttle ? useThrottleFn(onScrollHandler, throttle, true, false) : onScrollHandler, eventListenerOptions);
	tryOnMounted(() => {
		try {
			const _element = toValue$1(element);
			if (!_element) return;
			setArrivedState(_element);
		} catch (e) {
			onError(e);
		}
	});
	if ((observe === null || observe === void 0 ? void 0 : observe.mutation) && element != null && element !== window$1 && element !== document) useMutationObserver(element, () => {
		const _element = toValue$1(element);
		if (!_element) return;
		setArrivedState(_element);
	}, {
		attributes: true,
		childList: true,
		subtree: true
	});
	useEventListener(element, "scrollend", onScrollEnd, eventListenerOptions);
	return {
		x,
		y,
		isScrolling,
		arrivedState,
		directions,
		measure() {
			const _element = toValue$1(element);
			if (window$1 && _element) setArrivedState(_element);
		}
	};
}
function useInfiniteScroll(element, onLoadMore, options = {}) {
	var _options$distance;
	const { direction = "bottom", interval = 100, canLoadMore = () => true } = options;
	const state = reactive(useScroll(element, {
		...options,
		offset: {
			[direction]: (_options$distance = options.distance) !== null && _options$distance !== void 0 ? _options$distance : 0,
			...options.offset
		}
	}));
	const promise = ref();
	const isLoading = computed(() => !!promise.value);
	const observedElement = computed(() => {
		return resolveElement(toValue$1(element));
	});
	const isElementVisible = useElementVisibility(observedElement);
	const canLoad = computed(() => {
		if (!observedElement.value) return false;
		return canLoadMore(observedElement.value);
	});
	function checkAndLoad() {
		state.measure();
		if (!observedElement.value || !isElementVisible.value || !canLoad.value || promise.value) return;
		const { scrollHeight, clientHeight, scrollWidth, clientWidth } = observedElement.value;
		const isNarrower = direction === "bottom" || direction === "top" ? scrollHeight <= clientHeight : scrollWidth <= clientWidth;
		if (state.arrivedState[direction] || isNarrower) promise.value = Promise.all([onLoadMore(state), new Promise((resolve) => setTimeout(resolve, interval))]).finally(() => {
			promise.value = null;
			nextTick(() => checkAndLoad());
		});
	}
	tryOnUnmounted(watch(() => [
		state.arrivedState[direction],
		isElementVisible.value,
		canLoad.value
	], checkAndLoad, {
		immediate: true,
		flush: "post"
	}));
	return {
		isLoading,
		reset() {
			nextTick(() => checkAndLoad());
		}
	};
}
var defaultEvents = [
	"mousedown",
	"mouseup",
	"keydown",
	"keyup"
];
/* @__NO_SIDE_EFFECTS__ */
function useKeyModifier(modifier, options = {}) {
	const { events: events$1 = defaultEvents, document: document$1 = defaultDocument, initial = null } = options;
	const state = shallowRef(initial);
	if (document$1) events$1.forEach((listenerEvent) => {
		useEventListener(document$1, listenerEvent, (evt) => {
			if (typeof evt.getModifierState === "function") state.value = evt.getModifierState(modifier);
		}, { passive: true });
	});
	return state;
}
function useLocalStorage(key, initialValue, options = {}) {
	const { window: window$1 = defaultWindow } = options;
	return useStorage(key, initialValue, window$1 === null || window$1 === void 0 ? void 0 : window$1.localStorage, options);
}
var DefaultMagicKeysAliasMap = {
	ctrl: "control",
	command: "meta",
	cmd: "meta",
	option: "alt",
	up: "arrowup",
	down: "arrowdown",
	left: "arrowleft",
	right: "arrowright"
};
function useMagicKeys(options = {}) {
	const { reactive: useReactive = false, target = defaultWindow, aliasMap = DefaultMagicKeysAliasMap, passive = true, onEventFired = noop } = options;
	const current = reactive(/* @__PURE__ */ new Set());
	const obj = {
		toJSON() {
			return {};
		},
		current
	};
	const refs = useReactive ? reactive(obj) : obj;
	const metaDeps = /* @__PURE__ */ new Set();
	const depsMap = new Map([
		["Meta", metaDeps],
		["Shift", /* @__PURE__ */ new Set()],
		["Alt", /* @__PURE__ */ new Set()]
	]);
	const usedKeys = /* @__PURE__ */ new Set();
	function setRefs(key, value) {
		if (key in refs) if (useReactive) refs[key] = value;
		else refs[key].value = value;
	}
	function reset() {
		current.clear();
		for (const key of usedKeys) setRefs(key, false);
	}
	function updateDeps(value, e, keys$1) {
		if (!value || typeof e.getModifierState !== "function") return;
		for (const [modifier, depsSet] of depsMap) if (e.getModifierState(modifier)) {
			keys$1.forEach((key) => depsSet.add(key));
			break;
		}
	}
	function clearDeps(value, key) {
		if (value) return;
		const depsMapKey = `${key[0].toUpperCase()}${key.slice(1)}`;
		const deps = depsMap.get(depsMapKey);
		if (!["shift", "alt"].includes(key) || !deps) return;
		const depsArray = Array.from(deps);
		const depsIndex = depsArray.indexOf(key);
		depsArray.forEach((key$1, index) => {
			if (index >= depsIndex) {
				current.delete(key$1);
				setRefs(key$1, false);
			}
		});
		deps.clear();
	}
	function updateRefs(e, value) {
		var _e$key;
		var _e$code;
		const key = (_e$key = e.key) === null || _e$key === void 0 ? void 0 : _e$key.toLowerCase();
		const values = [(_e$code = e.code) === null || _e$code === void 0 ? void 0 : _e$code.toLowerCase(), key].filter(Boolean);
		if (!key) return;
		if (key) if (value) current.add(key);
		else current.delete(key);
		for (const key$1 of values) {
			usedKeys.add(key$1);
			setRefs(key$1, value);
		}
		updateDeps(value, e, [...current, ...values]);
		clearDeps(value, key);
		if (key === "meta" && !value) {
			metaDeps.forEach((key$1) => {
				current.delete(key$1);
				setRefs(key$1, false);
			});
			metaDeps.clear();
		}
	}
	useEventListener(target, "keydown", (e) => {
		updateRefs(e, true);
		return onEventFired(e);
	}, { passive });
	useEventListener(target, "keyup", (e) => {
		updateRefs(e, false);
		return onEventFired(e);
	}, { passive });
	useEventListener("blur", reset, { passive });
	useEventListener("focus", reset, { passive });
	const proxy = new Proxy(refs, { get(target$1, prop, rec) {
		if (typeof prop !== "string") return Reflect.get(target$1, prop, rec);
		prop = prop.toLowerCase();
		if (prop in aliasMap) prop = aliasMap[prop];
		if (!(prop in refs)) if (/[+_-]/.test(prop)) {
			const keys$1 = prop.split(/[+_-]/g).map((i) => i.trim());
			refs[prop] = computed(() => keys$1.map((key) => toValue$1(proxy[key])).every(Boolean));
		} else refs[prop] = shallowRef(false);
		const r = Reflect.get(target$1, prop, rec);
		return useReactive ? toValue$1(r) : r;
	} });
	return proxy;
}
var UseMouseBuiltinExtractors = {
	page: (event) => [event.pageX, event.pageY],
	client: (event) => [event.clientX, event.clientY],
	screen: (event) => [event.screenX, event.screenY],
	movement: (event) => event instanceof MouseEvent ? [event.movementX, event.movementY] : null
};
function useMouse(options = {}) {
	const { type = "page", touch = true, resetOnTouchEnds = false, initialValue = {
		x: 0,
		y: 0
	}, window: window$1 = defaultWindow, target = window$1, scroll = true, eventFilter } = options;
	let _prevMouseEvent = null;
	let _prevScrollX = 0;
	let _prevScrollY = 0;
	const x = shallowRef(initialValue.x);
	const y = shallowRef(initialValue.y);
	const sourceType = shallowRef(null);
	const extractor = typeof type === "function" ? type : UseMouseBuiltinExtractors[type];
	const mouseHandler = (event) => {
		const result = extractor(event);
		_prevMouseEvent = event;
		if (result) {
			[x.value, y.value] = result;
			sourceType.value = "mouse";
		}
		if (window$1) {
			_prevScrollX = window$1.scrollX;
			_prevScrollY = window$1.scrollY;
		}
	};
	const touchHandler = (event) => {
		if (event.touches.length > 0) {
			const result = extractor(event.touches[0]);
			if (result) {
				[x.value, y.value] = result;
				sourceType.value = "touch";
			}
		}
	};
	const scrollHandler = () => {
		if (!_prevMouseEvent || !window$1) return;
		const pos = extractor(_prevMouseEvent);
		if (_prevMouseEvent instanceof MouseEvent && pos) {
			x.value = pos[0] + window$1.scrollX - _prevScrollX;
			y.value = pos[1] + window$1.scrollY - _prevScrollY;
		}
	};
	const reset = () => {
		x.value = initialValue.x;
		y.value = initialValue.y;
	};
	const mouseHandlerWrapper = eventFilter ? (event) => eventFilter(() => mouseHandler(event), {}) : (event) => mouseHandler(event);
	const touchHandlerWrapper = eventFilter ? (event) => eventFilter(() => touchHandler(event), {}) : (event) => touchHandler(event);
	const scrollHandlerWrapper = eventFilter ? () => eventFilter(() => scrollHandler(), {}) : () => scrollHandler();
	if (target) {
		const listenerOptions = { passive: true };
		useEventListener(target, ["mousemove", "dragover"], mouseHandlerWrapper, listenerOptions);
		if (touch && type !== "movement") {
			useEventListener(target, ["touchstart", "touchmove"], touchHandlerWrapper, listenerOptions);
			if (resetOnTouchEnds) useEventListener(target, "touchend", reset, listenerOptions);
		}
		if (scroll && type === "page") useEventListener(window$1, "scroll", scrollHandlerWrapper, listenerOptions);
	}
	return {
		x,
		y,
		sourceType
	};
}
function useMouseInElement(target, options = {}) {
	const { windowResize = true, windowScroll = true, handleOutside = true, window: window$1 = defaultWindow } = options;
	const type = options.type || "page";
	const { x, y, sourceType } = useMouse(options);
	const targetRef = shallowRef(target !== null && target !== void 0 ? target : window$1 === null || window$1 === void 0 ? void 0 : window$1.document.body);
	const elementX = shallowRef(0);
	const elementY = shallowRef(0);
	const elementPositionX = shallowRef(0);
	const elementPositionY = shallowRef(0);
	const elementHeight = shallowRef(0);
	const elementWidth = shallowRef(0);
	const isOutside = shallowRef(true);
	function update() {
		if (!window$1) return;
		const el = unrefElement(targetRef);
		if (!el || !(el instanceof Element)) return;
		for (const rect of el.getClientRects()) {
			const { left, top, width, height } = rect;
			elementPositionX.value = left + (type === "page" ? window$1.pageXOffset : 0);
			elementPositionY.value = top + (type === "page" ? window$1.pageYOffset : 0);
			elementHeight.value = height;
			elementWidth.value = width;
			const elX = x.value - elementPositionX.value;
			const elY = y.value - elementPositionY.value;
			isOutside.value = width === 0 || height === 0 || elX < 0 || elY < 0 || elX > width || elY > height;
			if (handleOutside || !isOutside.value) {
				elementX.value = elX;
				elementY.value = elY;
			}
			if (!isOutside.value) break;
		}
	}
	const stopFnList = [];
	function stop() {
		stopFnList.forEach((fn) => fn());
		stopFnList.length = 0;
	}
	tryOnMounted(() => {
		update();
	});
	if (window$1) {
		const { stop: stopResizeObserver } = useResizeObserver(targetRef, update);
		const { stop: stopMutationObserver } = useMutationObserver(targetRef, update, { attributeFilter: ["style", "class"] });
		const stopWatch = watch([
			targetRef,
			x,
			y
		], update);
		stopFnList.push(stopResizeObserver, stopMutationObserver, stopWatch);
		useEventListener(document, "mouseleave", () => isOutside.value = true, { passive: true });
		if (windowScroll) stopFnList.push(useEventListener("scroll", update, {
			capture: true,
			passive: true
		}));
		if (windowResize) stopFnList.push(useEventListener("resize", update, { passive: true }));
	}
	return {
		x,
		y,
		sourceType,
		elementX,
		elementY,
		elementPositionX,
		elementPositionY,
		elementHeight,
		elementWidth,
		isOutside,
		stop
	};
}
function useParentElement(element = useCurrentElement()) {
	const parentElement = shallowRef();
	const update = () => {
		const el = unrefElement(element);
		if (el) parentElement.value = el.parentElement;
	};
	tryOnMounted(update);
	watch(() => toValue$1(element), update);
	return parentElement;
}
Number.POSITIVE_INFINITY;
function useTitle(newTitle = null, options = {}) {
	var _document$title;
	var _ref;
	const { document: document$1 = defaultDocument, restoreOnUnmount = (t) => t } = options;
	const originalTitle = (_document$title = document$1 === null || document$1 === void 0 ? void 0 : document$1.title) !== null && _document$title !== void 0 ? _document$title : "";
	const title = toRef((_ref = newTitle !== null && newTitle !== void 0 ? newTitle : document$1 === null || document$1 === void 0 ? void 0 : document$1.title) !== null && _ref !== void 0 ? _ref : null);
	const isReadonly$1 = !!(newTitle && typeof newTitle === "function");
	function format(t) {
		if (!("titleTemplate" in options)) return t;
		const template = options.titleTemplate || "%s";
		return typeof template === "function" ? template(t) : toValue$1(template).replace(/%s/g, t);
	}
	watch(title, (newValue, oldValue) => {
		if (newValue !== oldValue && document$1) document$1.title = format(newValue !== null && newValue !== void 0 ? newValue : "");
	}, { immediate: true });
	if (options.observe && !options.titleTemplate && document$1 && !isReadonly$1) {
		var _document$head;
		useMutationObserver((_document$head = document$1.head) === null || _document$head === void 0 ? void 0 : _document$head.querySelector("title"), () => {
			if (document$1 && document$1.title !== title.value) title.value = format(document$1.title);
		}, { childList: true });
	}
	tryOnScopeDispose(() => {
		if (restoreOnUnmount) {
			const restoredTitle = restoreOnUnmount(originalTitle, title.value || "");
			if (restoredTitle != null && document$1) document$1.title = restoredTitle;
		}
	});
	return title;
}
function useVModel(props, key, emit, options = {}) {
	var _vm$$emit;
	var _vm$proxy;
	const { clone = false, passive = false, eventName, deep = false, defaultValue, shouldEmit } = options;
	const vm = getCurrentInstance();
	const _emit = emit || (vm === null || vm === void 0 ? void 0 : vm.emit) || (vm === null || vm === void 0 || (_vm$$emit = vm.$emit) === null || _vm$$emit === void 0 ? void 0 : _vm$$emit.bind(vm)) || (vm === null || vm === void 0 || (_vm$proxy = vm.proxy) === null || _vm$proxy === void 0 || (_vm$proxy = _vm$proxy.$emit) === null || _vm$proxy === void 0 ? void 0 : _vm$proxy.bind(vm === null || vm === void 0 ? void 0 : vm.proxy));
	let event = eventName;
	if (!key) key = "modelValue";
	event = event || `update:${key.toString()}`;
	const cloneFn = (val) => !clone ? val : typeof clone === "function" ? clone(val) : cloneFnJSON(val);
	const getValue$1 = () => isDef(props[key]) ? cloneFn(props[key]) : defaultValue;
	const triggerEmit = (value) => {
		if (shouldEmit) {
			if (shouldEmit(value)) _emit(event, value);
		} else _emit(event, value);
	};
	if (passive) {
		const proxy = ref(getValue$1());
		let isUpdating = false;
		watch(() => props[key], (v) => {
			if (!isUpdating) {
				isUpdating = true;
				proxy.value = cloneFn(v);
				nextTick(() => isUpdating = false);
			}
		});
		watch(proxy, (v) => {
			if (!isUpdating && (v !== props[key] || deep)) triggerEmit(v);
		}, { deep });
		return proxy;
	} else return computed({
		get() {
			return getValue$1();
		},
		set(value) {
			triggerEmit(value);
		}
	});
}
function useWindowSize(options = {}) {
	const { window: window$1 = defaultWindow, initialWidth = Number.POSITIVE_INFINITY, initialHeight = Number.POSITIVE_INFINITY, listenOrientation = true, includeScrollbar = true, type = "inner" } = options;
	const width = shallowRef(initialWidth);
	const height = shallowRef(initialHeight);
	const update = () => {
		if (window$1) if (type === "outer") {
			width.value = window$1.outerWidth;
			height.value = window$1.outerHeight;
		} else if (type === "visual" && window$1.visualViewport) {
			const { width: visualViewportWidth, height: visualViewportHeight, scale } = window$1.visualViewport;
			width.value = Math.round(visualViewportWidth * scale);
			height.value = Math.round(visualViewportHeight * scale);
		} else if (includeScrollbar) {
			width.value = window$1.innerWidth;
			height.value = window$1.innerHeight;
		} else {
			width.value = window$1.document.documentElement.clientWidth;
			height.value = window$1.document.documentElement.clientHeight;
		}
	};
	update();
	tryOnMounted(update);
	const listenerOptions = { passive: true };
	useEventListener("resize", update, listenerOptions);
	if (window$1 && type === "visual" && window$1.visualViewport) useEventListener(window$1.visualViewport, "resize", update, listenerOptions);
	if (listenOrientation) watch(useMediaQuery("(orientation: portrait)"), () => update());
	return {
		width,
		height
	};
}
function serialize(o) {
	return typeof o == "string" ? `'${o}'` : new c().serialize(o);
}
var c = /* @__PURE__ */ function() {
	class o {
		#t = /* @__PURE__ */ new Map();
		compare(t, r) {
			const e = typeof t;
			const n = typeof r;
			return e === "string" && n === "string" ? t.localeCompare(r) : e === "number" && n === "number" ? t - r : String.prototype.localeCompare.call(this.serialize(t, true), this.serialize(r, true));
		}
		serialize(t, r) {
			if (t === null) return "null";
			switch (typeof t) {
				case "string": return r ? t : `'${t}'`;
				case "bigint": return `${t}n`;
				case "object": return this.$object(t);
				case "function": return this.$function(t);
			}
			return String(t);
		}
		serializeObject(t) {
			const r = Object.prototype.toString.call(t);
			if (r !== "[object Object]") return this.serializeBuiltInType(r.length < 10 ? `unknown:${r}` : r.slice(8, -1), t);
			const e = t.constructor;
			const n = e === Object || e === void 0 ? "" : e.name;
			if (n !== "" && globalThis[n] === e) return this.serializeBuiltInType(n, t);
			if (typeof t.toJSON == "function") {
				const i = t.toJSON();
				return n + (i !== null && typeof i == "object" ? this.$object(i) : `(${this.serialize(i)})`);
			}
			return this.serializeObjectEntries(n, Object.entries(t));
		}
		serializeBuiltInType(t, r) {
			const e = this["$" + t];
			if (e) return e.call(this, r);
			if (typeof r?.entries == "function") return this.serializeObjectEntries(t, r.entries());
			throw new Error(`Cannot serialize ${t}`);
		}
		serializeObjectEntries(t, r) {
			const e = Array.from(r).sort((i, a) => this.compare(i[0], a[0]));
			let n = `${t}{`;
			for (let i = 0; i < e.length; i++) {
				const [a, l] = e[i];
				n += `${this.serialize(a, true)}:${this.serialize(l)}`, i < e.length - 1 && (n += ",");
			}
			return n + "}";
		}
		$object(t) {
			let r = this.#t.get(t);
			return r === void 0 && (this.#t.set(t, `#${this.#t.size}`), r = this.serializeObject(t), this.#t.set(t, r)), r;
		}
		$function(t) {
			const r = Function.prototype.toString.call(t);
			return r.slice(-15) === "[native code] }" ? `${t.name || ""}()[native]` : `${t.name}(${t.length})${r.replace(/\s*\n\s*/g, "")}`;
		}
		$Array(t) {
			let r = "[";
			for (let e = 0; e < t.length; e++) r += this.serialize(t[e]), e < t.length - 1 && (r += ",");
			return r + "]";
		}
		$Date(t) {
			try {
				return `Date(${t.toISOString()})`;
			} catch {
				return "Date(null)";
			}
		}
		$ArrayBuffer(t) {
			return `ArrayBuffer[${new Uint8Array(t).join(",")}]`;
		}
		$Set(t) {
			return `Set${this.$Array(Array.from(t).sort((r, e) => this.compare(r, e)))}`;
		}
		$Map(t) {
			return this.serializeObjectEntries("Map", t.entries());
		}
	}
	for (const s of [
		"Error",
		"RegExp",
		"URL"
	]) o.prototype["$" + s] = function(t) {
		return `${s}(${t})`;
	};
	for (const s of [
		"Int8Array",
		"Uint8Array",
		"Uint8ClampedArray",
		"Int16Array",
		"Uint16Array",
		"Int32Array",
		"Uint32Array",
		"Float32Array",
		"Float64Array"
	]) o.prototype["$" + s] = function(t) {
		return `${s}[${t.join(",")}]`;
	};
	for (const s of ["BigInt64Array", "BigUint64Array"]) o.prototype["$" + s] = function(t) {
		return `${s}[${t.join("n,")}${t.length > 0 ? "n" : ""}]`;
	};
	return o;
}();
function isEqual(object1, object2) {
	if (object1 === object2) return true;
	if (serialize(object1) === serialize(object2)) return true;
	return false;
}
function findValuesBetween(array, start, end) {
	const startIndex = array.findIndex((i) => isEqual(i, start));
	const endIndex = array.findIndex((i) => isEqual(i, end));
	if (startIndex === -1 || endIndex === -1) return [];
	const [minIndex, maxIndex] = [startIndex, endIndex].sort((a, b) => a - b);
	return array.slice(minIndex, maxIndex + 1);
}
function clamp$1(value, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY) {
	return Math.min(max, Math.max(min, value));
}
__name(clamp$1, "clamp");
function createContext(providerComponentName, contextName) {
	const symbolDescription = typeof providerComponentName === "string" && !contextName ? `${providerComponentName}Context` : contextName;
	const injectionKey = Symbol(symbolDescription);
	const injectContext = (fallback) => {
		const context = inject(injectionKey, fallback);
		if (context) return context;
		if (context === null) return context;
		throw new Error(`Injection \`${injectionKey.toString()}\` not found. Component must be used within ${Array.isArray(providerComponentName) ? `one of the following components: ${providerComponentName.join(", ")}` : `\`${providerComponentName}\``}`);
	};
	const provideContext = (contextValue) => {
		provide(injectionKey, contextValue);
		return contextValue;
	};
	return [injectContext, provideContext];
}
function getActiveElement() {
	let activeElement = document.activeElement;
	if (activeElement == null) return null;
	while (activeElement != null && activeElement.shadowRoot != null && activeElement.shadowRoot.activeElement != null) activeElement = activeElement.shadowRoot.activeElement;
	return activeElement;
}
function handleAndDispatchCustomEvent(name, handler, detail) {
	const target = detail.originalEvent.target;
	const event = new CustomEvent(name, {
		bubbles: false,
		cancelable: true,
		detail
	});
	if (handler) target.addEventListener(name, handler, { once: true });
	target.dispatchEvent(event);
}
function isNullish(value) {
	return value === null || value === void 0;
}
function isValueEqualOrExist(base, current) {
	if (isNullish(base)) return false;
	if (Array.isArray(base)) return base.some((val) => isEqual(val, current));
	else return isEqual(base, current);
}
function renderSlotFragments(children) {
	if (!children) return [];
	return children.flatMap((child) => {
		if (child.type === Fragment) return renderSlotFragments(child.children);
		return [child];
	});
}
var ignoredElement = ["INPUT", "TEXTAREA"];
function useArrowNavigation(e, currentElement, parentElement, options = {}) {
	if (!currentElement || options.enableIgnoredElement && ignoredElement.includes(currentElement.nodeName)) return null;
	const { arrowKeyOptions = "both", attributeName = "[data-reka-collection-item]", itemsArray = [], loop = true, dir = "ltr", preventScroll = true, focus = false } = options;
	const [right, left, up, down, home, end] = [
		e.key === "ArrowRight",
		e.key === "ArrowLeft",
		e.key === "ArrowUp",
		e.key === "ArrowDown",
		e.key === "Home",
		e.key === "End"
	];
	const goingVertical = up || down;
	const goingHorizontal = right || left;
	if (!home && !end && (!goingVertical && !goingHorizontal || arrowKeyOptions === "vertical" && goingHorizontal || arrowKeyOptions === "horizontal" && goingVertical)) return null;
	const allCollectionItems = parentElement ? Array.from(parentElement.querySelectorAll(attributeName)) : itemsArray;
	if (!allCollectionItems.length) return null;
	if (preventScroll) e.preventDefault();
	let item = null;
	if (goingHorizontal || goingVertical) item = findNextFocusableElement(allCollectionItems, currentElement, {
		goForward: goingVertical ? down : dir === "ltr" ? right : left,
		loop
	});
	else if (home) item = allCollectionItems.at(0) || null;
	else if (end) item = allCollectionItems.at(-1) || null;
	if (focus) item?.focus();
	return item;
}
function findNextFocusableElement(elements, currentElement, options, iterations = elements.length) {
	if (--iterations === 0) return null;
	const index = elements.indexOf(currentElement);
	const newIndex = options.goForward ? index + 1 : index - 1;
	if (!options.loop && (newIndex < 0 || newIndex >= elements.length)) return null;
	const candidate = elements[(newIndex + elements.length) % elements.length];
	if (!candidate) return null;
	if (candidate.hasAttribute("disabled") && candidate.getAttribute("disabled") !== "false") return findNextFocusableElement(elements, candidate, options, iterations);
	return candidate;
}
var [injectConfigProviderContext, provideConfigProviderContext] = createContext("ConfigProvider");
function isPlainObject(value) {
	if (value === null || typeof value !== "object") return false;
	const prototype = Object.getPrototypeOf(value);
	if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) return false;
	if (Symbol.iterator in value) return false;
	if (Symbol.toStringTag in value) return Object.prototype.toString.call(value) === "[object Module]";
	return true;
}
function _defu(baseObject, defaults, namespace = ".", merger) {
	if (!isPlainObject(defaults)) return _defu(baseObject, {}, namespace, merger);
	const object = Object.assign({}, defaults);
	for (const key in baseObject) {
		if (key === "__proto__" || key === "constructor") continue;
		const value = baseObject[key];
		if (value === null || value === void 0) continue;
		if (merger && merger(object, key, value, namespace)) continue;
		if (Array.isArray(value) && Array.isArray(object[key])) object[key] = [...value, ...object[key]];
		else if (isPlainObject(value) && isPlainObject(object[key])) object[key] = _defu(value, object[key], (namespace ? `${namespace}.` : "") + key.toString(), merger);
		else object[key] = value;
	}
	return object;
}
function createDefu(merger) {
	return (...arguments_) => arguments_.reduce((p, c) => _defu(p, c, "", merger), {});
}
var defu = createDefu();
createDefu((object, key, currentValue) => {
	if (object[key] !== void 0 && typeof currentValue === "function") {
		object[key] = currentValue(object[key]);
		return true;
	}
});
createDefu((object, key, currentValue) => {
	if (Array.isArray(object[key]) && typeof currentValue === "function") {
		object[key] = currentValue(object[key]);
		return true;
	}
});
var useBodyLockStackCount = createSharedComposable(() => {
	const map = ref(/* @__PURE__ */ new Map());
	const initialOverflow = ref();
	const locked = computed(() => {
		for (const value of map.value.values()) if (value) return true;
		return false;
	});
	const context = injectConfigProviderContext({ scrollBody: ref(true) });
	let stopTouchMoveListener = null;
	const resetBodyStyle = () => {
		document.body.style.paddingRight = "";
		document.body.style.marginRight = "";
		document.body.style.pointerEvents = "";
		document.documentElement.style.removeProperty("--scrollbar-width");
		document.body.style.overflow = initialOverflow.value ?? "";
		isIOS && stopTouchMoveListener?.();
		initialOverflow.value = void 0;
	};
	watch(locked, (val, oldVal) => {
		if (!isClient) return;
		if (!val) {
			if (oldVal) resetBodyStyle();
			return;
		}
		if (initialOverflow.value === void 0) initialOverflow.value = document.body.style.overflow;
		const verticalScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		const defaultConfig = {
			padding: verticalScrollbarWidth,
			margin: 0
		};
		const config = context.scrollBody?.value ? typeof context.scrollBody.value === "object" ? defu({
			padding: context.scrollBody.value.padding === true ? verticalScrollbarWidth : context.scrollBody.value.padding,
			margin: context.scrollBody.value.margin === true ? verticalScrollbarWidth : context.scrollBody.value.margin
		}, defaultConfig) : defaultConfig : {
			padding: 0,
			margin: 0
		};
		if (verticalScrollbarWidth > 0) {
			document.body.style.paddingRight = typeof config.padding === "number" ? `${config.padding}px` : String(config.padding);
			document.body.style.marginRight = typeof config.margin === "number" ? `${config.margin}px` : String(config.margin);
			document.documentElement.style.setProperty("--scrollbar-width", `${verticalScrollbarWidth}px`);
			document.body.style.overflow = "hidden";
		}
		if (isIOS) stopTouchMoveListener = useEventListener(document, "touchmove", (e) => preventDefault(e), { passive: false });
		nextTick(() => {
			document.body.style.pointerEvents = "none";
			document.body.style.overflow = "hidden";
		});
	}, {
		immediate: true,
		flush: "sync"
	});
	return map;
});
function useBodyScrollLock(initialState) {
	const id = Math.random().toString(36).substring(2, 7);
	const map = useBodyLockStackCount();
	map.value.set(id, initialState ?? false);
	const locked = computed({
		get: () => map.value.get(id) ?? false,
		set: (value) => map.value.set(id, value)
	});
	tryOnBeforeUnmount(() => {
		map.value.delete(id);
	});
	return locked;
}
function checkOverflowScroll(ele) {
	const style = window.getComputedStyle(ele);
	if (style.overflowX === "scroll" || style.overflowY === "scroll" || style.overflowX === "auto" && ele.clientWidth < ele.scrollWidth || style.overflowY === "auto" && ele.clientHeight < ele.scrollHeight) return true;
	else {
		const parent = ele.parentNode;
		if (!(parent instanceof Element) || parent.tagName === "BODY") return false;
		return checkOverflowScroll(parent);
	}
}
function preventDefault(rawEvent) {
	const e = rawEvent || window.event;
	const _target = e.target;
	if (_target instanceof Element && checkOverflowScroll(_target)) return false;
	if (e.touches.length > 1) return true;
	if (e.preventDefault && e.cancelable) e.preventDefault();
	return false;
}
function useDirection(dir) {
	const context = injectConfigProviderContext({ dir: ref("ltr") });
	return computed(() => dir?.value || context.dir?.value || "ltr");
}
function useEmitAsProps(emit) {
	const vm = getCurrentInstance();
	const events = vm?.type.emits;
	const result = {};
	if (!events?.length) console.warn(`No emitted event found. Please check component: ${vm?.type.__name}`);
	events?.forEach((ev) => {
		result[toHandlerKey(camelize$1(ev))] = (...arg) => emit(ev, ...arg);
	});
	return result;
}
function useFilter(options) {
	const computedOptions = computed(() => unref(options));
	const collator = computed(() => new Intl.Collator("en", {
		usage: "search",
		...computedOptions.value
	}));
	const startsWith = (string, substring) => {
		if (substring.length === 0) return true;
		string = string.normalize("NFC");
		substring = substring.normalize("NFC");
		return collator.value.compare(string.slice(0, substring.length), substring) === 0;
	};
	const endsWith = (string, substring) => {
		if (substring.length === 0) return true;
		string = string.normalize("NFC");
		substring = substring.normalize("NFC");
		return collator.value.compare(string.slice(-substring.length), substring) === 0;
	};
	const contains = (string, substring) => {
		if (substring.length === 0) return true;
		string = string.normalize("NFC");
		substring = substring.normalize("NFC");
		let scan = 0;
		const sliceLen = substring.length;
		for (; scan + sliceLen <= string.length; scan++) {
			const slice = string.slice(scan, scan + sliceLen);
			if (collator.value.compare(substring, slice) === 0) return true;
		}
		return false;
	};
	return {
		startsWith,
		endsWith,
		contains
	};
}
var count$1 = 0;
function useFocusGuards() {
	watchEffect((cleanupFn) => {
		if (!isClient) return;
		const edgeGuards = document.querySelectorAll("[data-reka-focus-guard]");
		document.body.insertAdjacentElement("afterbegin", edgeGuards[0] ?? createFocusGuard());
		document.body.insertAdjacentElement("beforeend", edgeGuards[1] ?? createFocusGuard());
		count$1++;
		cleanupFn(() => {
			if (count$1 === 1) document.querySelectorAll("[data-reka-focus-guard]").forEach((node) => node.remove());
			count$1--;
		});
	});
}
function createFocusGuard() {
	const element = document.createElement("span");
	element.setAttribute("data-reka-focus-guard", "");
	element.tabIndex = 0;
	element.style.outline = "none";
	element.style.opacity = "0";
	element.style.position = "fixed";
	element.style.pointerEvents = "none";
	return element;
}
function useFormControl(el) {
	return computed(() => toValue$1(el) ? Boolean(unrefElement(el)?.closest("form")) : true);
}
function useForwardExpose() {
	const instance = getCurrentInstance();
	const currentRef = ref();
	const currentElement = computed(() => {
		return ["#text", "#comment"].includes(currentRef.value?.$el.nodeName) ? currentRef.value?.$el.nextElementSibling : unrefElement(currentRef);
	});
	const localExpose = Object.assign({}, instance.exposed);
	const ret = {};
	for (const key in instance.props) Object.defineProperty(ret, key, {
		enumerable: true,
		configurable: true,
		get: () => instance.props[key]
	});
	if (Object.keys(localExpose).length > 0) for (const key in localExpose) Object.defineProperty(ret, key, {
		enumerable: true,
		configurable: true,
		get: () => localExpose[key]
	});
	Object.defineProperty(ret, "$el", {
		enumerable: true,
		configurable: true,
		get: () => instance.vnode.el
	});
	instance.exposed = ret;
	function forwardRef(ref$1) {
		currentRef.value = ref$1;
		if (!ref$1) return;
		Object.defineProperty(ret, "$el", {
			enumerable: true,
			configurable: true,
			get: () => ref$1 instanceof Element ? ref$1 : ref$1.$el
		});
		if (!(ref$1 instanceof Element) && !Object.prototype.hasOwnProperty.call(ref$1, "$el")) {
			const childExposed = ref$1.$.exposed;
			const merged = Object.assign({}, ret);
			for (const key in childExposed) Object.defineProperty(merged, key, {
				enumerable: true,
				configurable: true,
				get: () => childExposed[key]
			});
			instance.exposed = merged;
		}
	}
	return {
		forwardRef,
		currentRef,
		currentElement
	};
}
function useForwardProps(props) {
	const vm = getCurrentInstance();
	const defaultProps = Object.keys(vm?.type.props ?? {}).reduce((prev, curr) => {
		const defaultValue = (vm?.type.props[curr]).default;
		if (defaultValue !== void 0) prev[curr] = defaultValue;
		return prev;
	}, {});
	const refProps = toRef$1(props);
	return computed(() => {
		const preservedProps = {};
		const assignedProps = vm?.vnode.props ?? {};
		Object.keys(assignedProps).forEach((key) => {
			preservedProps[camelize$1(key)] = assignedProps[key];
		});
		return Object.keys({
			...defaultProps,
			...preservedProps
		}).reduce((prev, curr) => {
			if (refProps.value[curr] !== void 0) prev[curr] = refProps.value[curr];
			return prev;
		}, {});
	});
}
function useForwardPropsEmits(props, emit) {
	const parsedProps = useForwardProps(props);
	const emitsAsProps = emit ? useEmitAsProps(emit) : {};
	return computed(() => ({
		...parsedProps.value,
		...emitsAsProps
	}));
}
var getDefaultParent = function(originalTarget) {
	if (typeof document === "undefined") return null;
	return (Array.isArray(originalTarget) ? originalTarget[0] : originalTarget).ownerDocument.body;
};
var counterMap = /* @__PURE__ */ new WeakMap();
var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
var markerMap = {};
var lockCount = 0;
var unwrapHost = function(node) {
	return node && (node.host || unwrapHost(node.parentNode));
};
var correctTargets = function(parent, targets) {
	return targets.map(function(target) {
		if (parent.contains(target)) return target;
		var correctedTarget = unwrapHost(target);
		if (correctedTarget && parent.contains(correctedTarget)) return correctedTarget;
		console.error("aria-hidden", target, "in not contained inside", parent, ". Doing nothing");
		return null;
	}).filter(function(x) {
		return Boolean(x);
	});
};
var applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
	var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
	if (!markerMap[markerName]) markerMap[markerName] = /* @__PURE__ */ new WeakMap();
	var markerCounter = markerMap[markerName];
	var hiddenNodes = [];
	var elementsToKeep = /* @__PURE__ */ new Set();
	var elementsToStop = new Set(targets);
	var keep = function(el) {
		if (!el || elementsToKeep.has(el)) return;
		elementsToKeep.add(el);
		keep(el.parentNode);
	};
	targets.forEach(keep);
	var deep = function(parent) {
		if (!parent || elementsToStop.has(parent)) return;
		Array.prototype.forEach.call(parent.children, function(node) {
			if (elementsToKeep.has(node)) deep(node);
			else try {
				var attr = node.getAttribute(controlAttribute);
				var alreadyHidden = attr !== null && attr !== "false";
				var counterValue = (counterMap.get(node) || 0) + 1;
				var markerValue = (markerCounter.get(node) || 0) + 1;
				counterMap.set(node, counterValue);
				markerCounter.set(node, markerValue);
				hiddenNodes.push(node);
				if (counterValue === 1 && alreadyHidden) uncontrolledNodes.set(node, true);
				if (markerValue === 1) node.setAttribute(markerName, "true");
				if (!alreadyHidden) node.setAttribute(controlAttribute, "true");
			} catch (e) {
				console.error("aria-hidden: cannot operate on ", node, e);
			}
		});
	};
	deep(parentNode);
	elementsToKeep.clear();
	lockCount++;
	return function() {
		hiddenNodes.forEach(function(node) {
			var counterValue = counterMap.get(node) - 1;
			var markerValue = markerCounter.get(node) - 1;
			counterMap.set(node, counterValue);
			markerCounter.set(node, markerValue);
			if (!counterValue) {
				if (!uncontrolledNodes.has(node)) node.removeAttribute(controlAttribute);
				uncontrolledNodes.delete(node);
			}
			if (!markerValue) node.removeAttribute(markerName);
		});
		lockCount--;
		if (!lockCount) {
			counterMap = /* @__PURE__ */ new WeakMap();
			counterMap = /* @__PURE__ */ new WeakMap();
			uncontrolledNodes = /* @__PURE__ */ new WeakMap();
			markerMap = {};
		}
	};
};
var hideOthers = function(originalTarget, parentNode, markerName) {
	if (markerName === void 0) markerName = "data-aria-hidden";
	var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
	var activeParentNode = parentNode || getDefaultParent(originalTarget);
	if (!activeParentNode) return function() {
		return null;
	};
	targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll("[aria-live], script")));
	return applyAttributeToOthers(targets, activeParentNode, markerName, "aria-hidden");
};
function useHideOthers(target) {
	let undo;
	watch(() => unrefElement(target), (el) => {
		if (el) undo = hideOthers(el);
		else if (undo) undo();
	});
	onUnmounted(() => {
		if (undo) undo();
	});
}
var count = 0;
function useId(deterministicId, prefix = "reka") {
	if (deterministicId) return deterministicId;
	if ("useId" in vue_runtime_esm_bundler_exports) return `${prefix}-${useId$1?.()}`;
	const configProviderContext = injectConfigProviderContext({ useId: void 0 });
	if (configProviderContext.useId) return `${prefix}-${configProviderContext.useId()}`;
	return `${prefix}-${++count}`;
}
function useKbd() {
	return {
		ALT: "Alt",
		ARROW_DOWN: "ArrowDown",
		ARROW_LEFT: "ArrowLeft",
		ARROW_RIGHT: "ArrowRight",
		ARROW_UP: "ArrowUp",
		BACKSPACE: "Backspace",
		CAPS_LOCK: "CapsLock",
		CONTROL: "Control",
		DELETE: "Delete",
		END: "End",
		ENTER: "Enter",
		ESCAPE: "Escape",
		F1: "F1",
		F10: "F10",
		F11: "F11",
		F12: "F12",
		F2: "F2",
		F3: "F3",
		F4: "F4",
		F5: "F5",
		F6: "F6",
		F7: "F7",
		F8: "F8",
		F9: "F9",
		HOME: "Home",
		META: "Meta",
		PAGE_DOWN: "PageDown",
		PAGE_UP: "PageUp",
		SHIFT: "Shift",
		SPACE: " ",
		TAB: "Tab",
		CTRL: "Control",
		ASTERISK: "*",
		SPACE_CODE: "Space"
	};
}
function useSelectionBehavior(modelValue, props) {
	const firstValue = ref();
	const onSelectItem = (val, condition) => {
		if (props.multiple && Array.isArray(modelValue.value)) if (props.selectionBehavior === "replace") {
			modelValue.value = [val];
			firstValue.value = val;
		} else {
			const index = modelValue.value.findIndex((v) => condition(v));
			if (index !== -1) modelValue.value = modelValue.value.filter((_, i) => i !== index);
			else modelValue.value = [...modelValue.value, val];
		}
		else if (props.selectionBehavior === "replace") modelValue.value = { ...val };
		else if (!Array.isArray(modelValue.value) && condition(modelValue.value)) modelValue.value = void 0;
		else modelValue.value = { ...val };
		return modelValue.value;
	};
	function handleMultipleReplace(intent, currentElement, getItems, options) {
		if (!firstValue?.value || !props.multiple || !Array.isArray(modelValue.value)) return;
		const lastValue = getItems().filter((i) => i.ref.dataset.disabled !== "").find((i) => i.ref === currentElement)?.value;
		if (!lastValue) return;
		let value = null;
		switch (intent) {
			case "prev":
			case "next":
				value = findValuesBetween(options, firstValue.value, lastValue);
				break;
			case "first":
				value = findValuesBetween(options, firstValue.value, options?.[0]);
				break;
			case "last":
				value = findValuesBetween(options, firstValue.value, options?.[options.length - 1]);
				break;
		}
		modelValue.value = value;
	}
	return {
		firstValue,
		onSelectItem,
		handleMultipleReplace
	};
}
function useSize(element) {
	const size = ref();
	const width = computed(() => size.value?.width ?? 0);
	const height = computed(() => size.value?.height ?? 0);
	onMounted(() => {
		const el = unrefElement(element);
		if (el) {
			size.value = {
				width: el.offsetWidth,
				height: el.offsetHeight
			};
			const resizeObserver = new ResizeObserver((entries) => {
				if (!Array.isArray(entries)) return;
				if (!entries.length) return;
				const entry = entries[0];
				let width$1;
				let height$1;
				if ("borderBoxSize" in entry) {
					const borderSizeEntry = entry.borderBoxSize;
					const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
					width$1 = borderSize.inlineSize;
					height$1 = borderSize.blockSize;
				} else {
					width$1 = el.offsetWidth;
					height$1 = el.offsetHeight;
				}
				size.value = {
					width: width$1,
					height: height$1
				};
			});
			resizeObserver.observe(el, { box: "border-box" });
			return () => resizeObserver.unobserve(el);
		} else size.value = void 0;
	});
	return {
		width,
		height
	};
}
function useStateMachine(initialState, machine) {
	const state = ref(initialState);
	function reducer(event) {
		return machine[state.value][event] ?? state.value;
	}
	const dispatch = (event) => {
		state.value = reducer(event);
	};
	return {
		state,
		dispatch
	};
}
function useTypeahead(callback) {
	const search = refAutoReset("", 1e3);
	const handleTypeaheadSearch = (key, items) => {
		search.value = search.value + key;
		if (callback) callback(key);
		else {
			const currentItem = getActiveElement();
			const itemsWithTextValue = items.map((item) => ({
				...item,
				textValue: item.value?.textValue ?? item.ref.textContent?.trim() ?? ""
			}));
			const currentMatch = itemsWithTextValue.find((item) => item.ref === currentItem);
			const nextMatch = getNextMatch(itemsWithTextValue.map((item) => item.textValue), search.value, currentMatch?.textValue);
			const newItem = itemsWithTextValue.find((item) => item.textValue === nextMatch);
			if (newItem) newItem.ref.focus();
			return newItem?.ref;
		}
	};
	const resetTypeahead = () => {
		search.value = "";
	};
	return {
		search,
		handleTypeaheadSearch,
		resetTypeahead
	};
}
function wrapArray$1(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}
__name(wrapArray$1, "wrapArray");
function getNextMatch(values, search, currentMatch) {
	const normalizedSearch = search.length > 1 && Array.from(search).every((char) => char === search[0]) ? search[0] : search;
	const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
	let wrappedValues = wrapArray$1(values, Math.max(currentMatchIndex, 0));
	if (normalizedSearch.length === 1) wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
	const nextMatch = wrappedValues.find((value) => value.toLowerCase().startsWith(normalizedSearch.toLowerCase()));
	return nextMatch !== currentMatch ? nextMatch : void 0;
}
function usePresence(present, node) {
	const stylesRef = ref({});
	const prevAnimationNameRef = ref("none");
	const prevPresentRef = ref(present);
	const initialState = present.value ? "mounted" : "unmounted";
	let timeoutId;
	const ownerWindow = node.value?.ownerDocument.defaultView ?? defaultWindow;
	const { state, dispatch } = useStateMachine(initialState, {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	const dispatchCustomEvent = (name) => {
		if (isClient) {
			const customEvent = new CustomEvent(name, {
				bubbles: false,
				cancelable: false
			});
			node.value?.dispatchEvent(customEvent);
		}
	};
	watch(present, async (currentPresent, prevPresent) => {
		const hasPresentChanged = prevPresent !== currentPresent;
		await nextTick();
		if (hasPresentChanged) {
			const prevAnimationName = prevAnimationNameRef.value;
			const currentAnimationName = getAnimationName(node.value);
			if (currentPresent) {
				dispatch("MOUNT");
				dispatchCustomEvent("enter");
				if (currentAnimationName === "none") dispatchCustomEvent("after-enter");
			} else if (currentAnimationName === "none" || currentAnimationName === "undefined" || stylesRef.value?.display === "none") {
				dispatch("UNMOUNT");
				dispatchCustomEvent("leave");
				dispatchCustomEvent("after-leave");
			} else if (prevPresent && prevAnimationName !== currentAnimationName) {
				dispatch("ANIMATION_OUT");
				dispatchCustomEvent("leave");
			} else {
				dispatch("UNMOUNT");
				dispatchCustomEvent("after-leave");
			}
		}
	}, { immediate: true });
	const handleAnimationEnd = (event) => {
		const currentAnimationName = getAnimationName(node.value);
		const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
		const directionName = state.value === "mounted" ? "enter" : "leave";
		if (event.target === node.value && isCurrentAnimation) {
			dispatchCustomEvent(`after-${directionName}`);
			dispatch("ANIMATION_END");
			if (!prevPresentRef.value) {
				const currentFillMode = node.value.style.animationFillMode;
				node.value.style.animationFillMode = "forwards";
				timeoutId = ownerWindow?.setTimeout(() => {
					if (node.value?.style.animationFillMode === "forwards") node.value.style.animationFillMode = currentFillMode;
				});
			}
		}
		if (event.target === node.value && currentAnimationName === "none") dispatch("ANIMATION_END");
	};
	const handleAnimationStart = (event) => {
		if (event.target === node.value) prevAnimationNameRef.value = getAnimationName(node.value);
	};
	const watcher = watch(node, (newNode, oldNode) => {
		if (newNode) {
			stylesRef.value = getComputedStyle(newNode);
			newNode.addEventListener("animationstart", handleAnimationStart);
			newNode.addEventListener("animationcancel", handleAnimationEnd);
			newNode.addEventListener("animationend", handleAnimationEnd);
		} else {
			dispatch("ANIMATION_END");
			if (timeoutId !== void 0) ownerWindow?.clearTimeout(timeoutId);
			oldNode?.removeEventListener("animationstart", handleAnimationStart);
			oldNode?.removeEventListener("animationcancel", handleAnimationEnd);
			oldNode?.removeEventListener("animationend", handleAnimationEnd);
		}
	}, { immediate: true });
	const stateWatcher = watch(state, () => {
		const currentAnimationName = getAnimationName(node.value);
		prevAnimationNameRef.value = state.value === "mounted" ? currentAnimationName : "none";
	});
	onUnmounted(() => {
		watcher();
		stateWatcher();
	});
	return { isPresent: computed(() => ["mounted", "unmountSuspended"].includes(state.value)) };
}
function getAnimationName(node) {
	return node ? getComputedStyle(node).animationName || "none" : "none";
}
var Presence_default = defineComponent({
	name: "Presence",
	props: {
		present: {
			type: Boolean,
			required: true
		},
		forceMount: { type: Boolean }
	},
	slots: {},
	setup(props, { slots, expose }) {
		const { present, forceMount } = toRefs$1(props);
		const node = ref();
		const { isPresent } = usePresence(present, node);
		expose({ present: isPresent });
		let children = slots.default({ present: isPresent.value });
		children = renderSlotFragments(children || []);
		const instance = getCurrentInstance();
		if (children && children?.length > 1) {
			const componentName = instance?.parent?.type.name ? `<${instance.parent.type.name} />` : "component";
			throw new Error([
				`Detected an invalid children for \`${componentName}\` for  \`Presence\` component.`,
				"",
				"Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
				"You can apply a few solutions:",
				["Provide a single child element so that `presence` directive attach correctly.", "Ensure the first child is an actual element instead of a raw text node or comment node."].map((line) => `  - ${line}`).join("\n")
			].join("\n"));
		}
		return () => {
			if (forceMount.value || present.value || isPresent.value) return h(slots.default({ present: isPresent.value })[0], { ref: (v) => {
				const el = unrefElement(v);
				if (typeof el?.hasAttribute === "undefined") return el;
				if (el?.hasAttribute("data-reka-popper-content-wrapper")) node.value = el.firstElementChild;
				else node.value = el;
				return el;
			} });
			else return null;
		};
	}
});
var Slot = defineComponent({
	name: "PrimitiveSlot",
	inheritAttrs: false,
	setup(_, { attrs, slots }) {
		return () => {
			if (!slots.default) return null;
			const children = renderSlotFragments(slots.default());
			const firstNonCommentChildrenIndex = children.findIndex((child) => child.type !== Comment);
			if (firstNonCommentChildrenIndex === -1) return children;
			const firstNonCommentChildren = children[firstNonCommentChildrenIndex];
			delete firstNonCommentChildren.props?.ref;
			const mergedProps = firstNonCommentChildren.props ? mergeProps(attrs, firstNonCommentChildren.props) : attrs;
			const cloned = cloneVNode({
				...firstNonCommentChildren,
				props: {}
			}, mergedProps);
			if (children.length === 1) return cloned;
			children[firstNonCommentChildrenIndex] = cloned;
			return children;
		};
	}
});
var SELF_CLOSING_TAGS = [
	"area",
	"img",
	"input"
];
var Primitive = defineComponent({
	name: "Primitive",
	inheritAttrs: false,
	props: {
		asChild: {
			type: Boolean,
			default: false
		},
		as: {
			type: [String, Object],
			default: "div"
		}
	},
	setup(props, { attrs, slots }) {
		const asTag = props.asChild ? "template" : props.as;
		if (typeof asTag === "string" && SELF_CLOSING_TAGS.includes(asTag)) return () => h(asTag, attrs);
		if (asTag !== "template") return () => h(props.as, attrs, { default: slots.default });
		return () => h(Slot, attrs, { default: slots.default });
	}
});
function usePrimitiveElement() {
	const primitiveElement = ref();
	return {
		primitiveElement,
		currentElement: computed(() => ["#text", "#comment"].includes(primitiveElement.value?.$el.nodeName) ? primitiveElement.value?.$el.nextElementSibling : unrefElement(primitiveElement))
	};
}
var [injectCollapsibleRootContext, provideCollapsibleRootContext] = createContext("CollapsibleRoot");
var CollapsibleRoot_default = /* @__PURE__ */ defineComponent({
	__name: "CollapsibleRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: false,
			default: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false
		},
		unmountOnHide: {
			type: Boolean,
			required: false,
			default: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["update:open"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const open = useVModel(props, "open", __emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		const { disabled, unmountOnHide } = toRefs$1(props);
		provideCollapsibleRootContext({
			contentId: "",
			disabled,
			open,
			unmountOnHide,
			onOpenToggle: () => {
				if (disabled.value) return;
				open.value = !open.value;
			}
		});
		__expose({ open });
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: _ctx.as,
				"as-child": props.asChild,
				"data-state": unref(open) ? "open" : "closed",
				"data-disabled": unref(disabled) ? "" : void 0
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open: unref(open) })]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"data-state",
				"data-disabled"
			]);
		};
	}
});
var CollapsibleContent_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "CollapsibleContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["contentFound"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectCollapsibleRootContext();
		rootContext.contentId ||= useId(void 0, "reka-collapsible-content");
		const presentRef = ref();
		const { forwardRef, currentElement } = useForwardExpose();
		const width = ref(0);
		const height = ref(0);
		const isOpen = computed(() => rootContext.open.value);
		const isMountAnimationPrevented = ref(isOpen.value);
		const currentStyle = ref();
		watch(() => [isOpen.value, presentRef.value?.present], async () => {
			await nextTick();
			const node = currentElement.value;
			if (!node) return;
			currentStyle.value = currentStyle.value || {
				transitionDuration: node.style.transitionDuration,
				animationName: node.style.animationName
			};
			node.style.transitionDuration = "0s";
			node.style.animationName = "none";
			const rect = node.getBoundingClientRect();
			height.value = rect.height;
			width.value = rect.width;
			if (!isMountAnimationPrevented.value) {
				node.style.transitionDuration = currentStyle.value.transitionDuration;
				node.style.animationName = currentStyle.value.animationName;
			}
		}, { immediate: true });
		const skipAnimation = computed(() => isMountAnimationPrevented.value && rootContext.open.value);
		onMounted(() => {
			requestAnimationFrame(() => {
				isMountAnimationPrevented.value = false;
			});
		});
		useEventListener(currentElement, "beforematch", (ev) => {
			requestAnimationFrame(() => {
				rootContext.onOpenToggle();
				emits("contentFound");
			});
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), {
				ref_key: "presentRef",
				ref: presentRef,
				present: _ctx.forceMount || unref(rootContext).open.value,
				"force-mount": true
			}, {
				default: withCtx(({ present }) => [createVNode(unref(Primitive), mergeProps(_ctx.$attrs, {
					id: unref(rootContext).contentId,
					ref: unref(forwardRef),
					"as-child": props.asChild,
					as: _ctx.as,
					hidden: !present ? unref(rootContext).unmountOnHide.value ? "" : "until-found" : void 0,
					"data-state": skipAnimation.value ? void 0 : unref(rootContext).open.value ? "open" : "closed",
					"data-disabled": unref(rootContext).disabled?.value ? "" : void 0,
					style: {
						[`--reka-collapsible-content-height`]: `${height.value}px`,
						[`--reka-collapsible-content-width`]: `${width.value}px`
					}
				}), {
					default: withCtx(() => [(unref(rootContext).unmountOnHide.value ? present : true) ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("v-if", true)]),
					_: 2
				}, 1040, [
					"id",
					"as-child",
					"as",
					"hidden",
					"data-state",
					"data-disabled",
					"style"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
var CollapsibleTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "CollapsibleTrigger",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		const rootContext = injectCollapsibleRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				type: _ctx.as === "button" ? "button" : void 0,
				as: _ctx.as,
				"as-child": props.asChild,
				"aria-controls": unref(rootContext).contentId,
				"aria-expanded": unref(rootContext).open.value,
				"data-state": unref(rootContext).open.value ? "open" : "closed",
				"data-disabled": unref(rootContext).disabled?.value ? "" : void 0,
				disabled: unref(rootContext).disabled?.value,
				onClick: unref(rootContext).onOpenToggle
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"type",
				"as",
				"as-child",
				"aria-controls",
				"aria-expanded",
				"data-state",
				"data-disabled",
				"disabled",
				"onClick"
			]);
		};
	}
});
function validateProps({ type, defaultValue, modelValue }) {
	const value = modelValue || defaultValue;
	if (modelValue !== void 0 || defaultValue !== void 0) return Array.isArray(value) ? "multiple" : "single";
	else return type ?? "single";
}
function getDefaultType({ type, defaultValue, modelValue }) {
	if (type) return type;
	return validateProps({
		type,
		defaultValue,
		modelValue
	});
}
function getDefaultValue({ type, defaultValue }) {
	if (defaultValue !== void 0) return defaultValue;
	return type === "single" ? void 0 : [];
}
function useSingleOrMultipleValue(props, emits) {
	const type = computed(() => getDefaultType(props));
	const modelValue = useVModel(props, "modelValue", emits, {
		defaultValue: getDefaultValue(props),
		passive: props.modelValue === void 0,
		deep: true
	});
	function changeModelValue(value) {
		if (type.value === "single") modelValue.value = isEqual(value, modelValue.value) ? void 0 : value;
		else {
			const modelValueArray = Array.isArray(modelValue.value) ? [...modelValue.value || []] : [modelValue.value].filter(Boolean);
			if (isValueEqualOrExist(modelValueArray, value)) {
				const index = modelValueArray.findIndex((i) => isEqual(i, value));
				modelValueArray.splice(index, 1);
			} else modelValueArray.push(value);
			modelValue.value = modelValueArray;
		}
	}
	return {
		modelValue,
		changeModelValue,
		isSingle: computed(() => type.value === "single")
	};
}
var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
function isLayerExist(layerElement, targetElement) {
	const targetLayer = targetElement.closest("[data-dismissable-layer]");
	const mainLayer = layerElement.dataset.dismissableLayer === "" ? layerElement : layerElement.querySelector("[data-dismissable-layer]");
	const nodeList = Array.from(layerElement.ownerDocument.querySelectorAll("[data-dismissable-layer]"));
	if (targetLayer && (mainLayer === targetLayer || nodeList.indexOf(mainLayer) < nodeList.indexOf(targetLayer))) return true;
	else return false;
}
function usePointerDownOutside(onPointerDownOutside, element, enabled = true) {
	const ownerDocument = element?.value?.ownerDocument ?? globalThis?.document;
	const isPointerInsideDOMTree = ref(false);
	const handleClickRef = ref(() => {});
	watchEffect((cleanupFn) => {
		if (!isClient || !toValue$1(enabled)) return;
		const handlePointerDown = async (event) => {
			const target = event.target;
			if (!element?.value || !target) return;
			if (isLayerExist(element.value, target)) {
				isPointerInsideDOMTree.value = false;
				return;
			}
			if (event.target && !isPointerInsideDOMTree.value) {
				const eventDetail = { originalEvent: event };
				function handleAndDispatchPointerDownOutsideEvent() {
					handleAndDispatchCustomEvent(POINTER_DOWN_OUTSIDE, onPointerDownOutside, eventDetail);
				}
				if (event.pointerType === "touch") {
					ownerDocument.removeEventListener("click", handleClickRef.value);
					handleClickRef.value = handleAndDispatchPointerDownOutsideEvent;
					ownerDocument.addEventListener("click", handleClickRef.value, { once: true });
				} else handleAndDispatchPointerDownOutsideEvent();
			} else ownerDocument.removeEventListener("click", handleClickRef.value);
			isPointerInsideDOMTree.value = false;
		};
		const timerId = window.setTimeout(() => {
			ownerDocument.addEventListener("pointerdown", handlePointerDown);
		}, 0);
		cleanupFn(() => {
			window.clearTimeout(timerId);
			ownerDocument.removeEventListener("pointerdown", handlePointerDown);
			ownerDocument.removeEventListener("click", handleClickRef.value);
		});
	});
	return { onPointerDownCapture: () => {
		if (!toValue$1(enabled)) return;
		isPointerInsideDOMTree.value = true;
	} };
}
function useFocusOutside(onFocusOutside, element, enabled = true) {
	const ownerDocument = element?.value?.ownerDocument ?? globalThis?.document;
	const isFocusInsideDOMTree = ref(false);
	watchEffect((cleanupFn) => {
		if (!isClient || !toValue$1(enabled)) return;
		const handleFocus = async (event) => {
			if (!element?.value) return;
			await nextTick();
			await nextTick();
			const target = event.target;
			if (!element.value || !target || isLayerExist(element.value, target)) return;
			if (event.target && !isFocusInsideDOMTree.value) handleAndDispatchCustomEvent(FOCUS_OUTSIDE, onFocusOutside, { originalEvent: event });
		};
		ownerDocument.addEventListener("focusin", handleFocus);
		cleanupFn(() => ownerDocument.removeEventListener("focusin", handleFocus));
	});
	return {
		onFocusCapture: () => {
			if (!toValue$1(enabled)) return;
			isFocusInsideDOMTree.value = true;
		},
		onBlurCapture: () => {
			if (!toValue$1(enabled)) return;
			isFocusInsideDOMTree.value = false;
		}
	};
}
var context = reactive({
	layersRoot: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	originalBodyPointerEvents: void 0,
	branches: /* @__PURE__ */ new Set()
});
var DismissableLayer_default = /* @__PURE__ */ defineComponent({
	__name: "DismissableLayer",
	props: {
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false,
			default: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"dismiss"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { forwardRef, currentElement: layerElement } = useForwardExpose();
		const ownerDocument = computed(() => layerElement.value?.ownerDocument ?? globalThis.document);
		const layers = computed(() => context.layersRoot);
		const index = computed(() => {
			return layerElement.value ? Array.from(layers.value).indexOf(layerElement.value) : -1;
		});
		const isBodyPointerEventsDisabled = computed(() => {
			return context.layersWithOutsidePointerEventsDisabled.size > 0;
		});
		const isPointerEventsEnabled = computed(() => {
			const localLayers = Array.from(layers.value);
			const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
			const highestLayerWithOutsidePointerEventsDisabledIndex = localLayers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
			return index.value >= highestLayerWithOutsidePointerEventsDisabledIndex;
		});
		const pointerDownOutside = usePointerDownOutside(async (event) => {
			const isPointerDownOnBranch = [...context.branches].some((branch) => branch?.contains(event.target));
			if (!isPointerEventsEnabled.value || isPointerDownOnBranch) return;
			emits("pointerDownOutside", event);
			emits("interactOutside", event);
			await nextTick();
			if (!event.defaultPrevented) emits("dismiss");
		}, layerElement);
		const focusOutside = useFocusOutside((event) => {
			if ([...context.branches].some((branch) => branch?.contains(event.target))) return;
			emits("focusOutside", event);
			emits("interactOutside", event);
			if (!event.defaultPrevented) emits("dismiss");
		}, layerElement);
		onKeyStroke("Escape", (event) => {
			if (!(index.value === layers.value.size - 1)) return;
			emits("escapeKeyDown", event);
			if (!event.defaultPrevented) emits("dismiss");
		});
		watchEffect((cleanupFn) => {
			if (!layerElement.value) return;
			if (props.disableOutsidePointerEvents) {
				if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
					context.originalBodyPointerEvents = ownerDocument.value.body.style.pointerEvents;
					ownerDocument.value.body.style.pointerEvents = "none";
				}
				context.layersWithOutsidePointerEventsDisabled.add(layerElement.value);
			}
			layers.value.add(layerElement.value);
			cleanupFn(() => {
				if (props.disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1 && !isNullish(context.originalBodyPointerEvents)) ownerDocument.value.body.style.pointerEvents = context.originalBodyPointerEvents;
			});
		});
		watchEffect((cleanupFn) => {
			cleanupFn(() => {
				if (!layerElement.value) return;
				layers.value.delete(layerElement.value);
				context.layersWithOutsidePointerEventsDisabled.delete(layerElement.value);
			});
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref: unref(forwardRef),
				"as-child": _ctx.asChild,
				as: _ctx.as,
				"data-dismissable-layer": "",
				style: normalizeStyle({ pointerEvents: isBodyPointerEventsDisabled.value ? isPointerEventsEnabled.value ? "auto" : "none" : void 0 }),
				onFocusCapture: unref(focusOutside).onFocusCapture,
				onBlurCapture: unref(focusOutside).onBlurCapture,
				onPointerdownCapture: unref(pointerDownOutside).onPointerDownCapture
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"as-child",
				"as",
				"style",
				"onFocusCapture",
				"onBlurCapture",
				"onPointerdownCapture"
			]);
		};
	}
});
var useFocusStackState = createGlobalState(() => {
	return ref([]);
});
function createFocusScopesStack() {
	const stack = useFocusStackState();
	return {
		add(focusScope) {
			const activeFocusScope = stack.value[0];
			if (focusScope !== activeFocusScope) activeFocusScope?.pause();
			stack.value = arrayRemove(stack.value, focusScope);
			stack.value.unshift(focusScope);
		},
		remove(focusScope) {
			stack.value = arrayRemove(stack.value, focusScope);
			stack.value[0]?.resume();
		}
	};
}
function arrayRemove(array, item) {
	const updatedArray = [...array];
	const index = updatedArray.indexOf(item);
	if (index !== -1) updatedArray.splice(index, 1);
	return updatedArray;
}
var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
var AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
var EVENT_OPTIONS$1 = {
	bubbles: false,
	cancelable: true
};
function focusFirst$2(candidates, { select = false } = {}) {
	const previouslyFocusedElement = getActiveElement();
	for (const candidate of candidates) {
		focus(candidate, { select });
		if (getActiveElement() !== previouslyFocusedElement) return true;
	}
}
__name(focusFirst$2, "focusFirst");
function getTabbableEdges(container) {
	const candidates = getTabbableCandidates(container);
	return [findVisible(candidates, container), findVisible(candidates.reverse(), container)];
}
function getTabbableCandidates(container) {
	const nodes = [];
	const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, { acceptNode: (node) => {
		const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
		if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
		return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	while (walker.nextNode()) nodes.push(walker.currentNode);
	return nodes;
}
function findVisible(elements, container) {
	for (const element of elements) if (!isHidden(element, { upTo: container })) return element;
}
function isHidden(node, { upTo }) {
	if (getComputedStyle(node).visibility === "hidden") return true;
	while (node) {
		if (upTo !== void 0 && node === upTo) return false;
		if (getComputedStyle(node).display === "none") return true;
		node = node.parentElement;
	}
	return false;
}
function isSelectableInput(element) {
	return element instanceof HTMLInputElement && "select" in element;
}
function focus(element, { select = false } = {}) {
	if (element && element.focus) {
		const previouslyFocusedElement = getActiveElement();
		element.focus({ preventScroll: true });
		if (element !== previouslyFocusedElement && isSelectableInput(element) && select) element.select();
	}
}
var FocusScope_default = /* @__PURE__ */ defineComponent({
	__name: "FocusScope",
	props: {
		loop: {
			type: Boolean,
			required: false,
			default: false
		},
		trapped: {
			type: Boolean,
			required: false,
			default: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["mountAutoFocus", "unmountAutoFocus"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { currentRef, currentElement } = useForwardExpose();
		const lastFocusedElementRef = ref(null);
		const focusScopesStack = createFocusScopesStack();
		const focusScope = reactive({
			paused: false,
			pause() {
				this.paused = true;
			},
			resume() {
				this.paused = false;
			}
		});
		watchEffect((cleanupFn) => {
			if (!isClient) return;
			const container = currentElement.value;
			if (!props.trapped) return;
			function handleFocusIn(event) {
				if (focusScope.paused || !container) return;
				const target = event.target;
				if (container.contains(target)) lastFocusedElementRef.value = target;
				else focus(lastFocusedElementRef.value, { select: true });
			}
			function handleFocusOut(event) {
				if (focusScope.paused || !container) return;
				const relatedTarget = event.relatedTarget;
				if (relatedTarget === null) return;
				if (!container.contains(relatedTarget)) focus(lastFocusedElementRef.value, { select: true });
			}
			function handleMutations(mutations) {
				if (!container.contains(lastFocusedElementRef.value)) focus(container);
			}
			document.addEventListener("focusin", handleFocusIn);
			document.addEventListener("focusout", handleFocusOut);
			const mutationObserver = new MutationObserver(handleMutations);
			if (container) mutationObserver.observe(container, {
				childList: true,
				subtree: true
			});
			cleanupFn(() => {
				document.removeEventListener("focusin", handleFocusIn);
				document.removeEventListener("focusout", handleFocusOut);
				mutationObserver.disconnect();
			});
		});
		watchEffect(async (cleanupFn) => {
			const container = currentElement.value;
			await nextTick();
			if (!container) return;
			focusScopesStack.add(focusScope);
			const previouslyFocusedElement = getActiveElement();
			if (!container.contains(previouslyFocusedElement)) {
				const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS$1);
				container.addEventListener(AUTOFOCUS_ON_MOUNT, (ev) => emits("mountAutoFocus", ev));
				container.dispatchEvent(mountEvent);
				if (!mountEvent.defaultPrevented) {
					focusFirst$2(getTabbableCandidates(container), { select: true });
					if (getActiveElement() === previouslyFocusedElement) focus(container);
				}
			}
			cleanupFn(() => {
				container.removeEventListener(AUTOFOCUS_ON_MOUNT, (ev) => emits("mountAutoFocus", ev));
				const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS$1);
				const unmountEventHandler = (ev) => {
					emits("unmountAutoFocus", ev);
				};
				container.addEventListener(AUTOFOCUS_ON_UNMOUNT, unmountEventHandler);
				container.dispatchEvent(unmountEvent);
				setTimeout(() => {
					if (!unmountEvent.defaultPrevented) focus(previouslyFocusedElement ?? document.body, { select: true });
					container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, unmountEventHandler);
					focusScopesStack.remove(focusScope);
				}, 0);
			});
		});
		function handleKeyDown(event) {
			if (!props.loop && !props.trapped) return;
			if (focusScope.paused) return;
			const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
			const focusedElement = getActiveElement();
			if (isTabKey && focusedElement) {
				const container = event.currentTarget;
				const [first, last] = getTabbableEdges(container);
				if (!(first && last)) {
					if (focusedElement === container) event.preventDefault();
				} else if (!event.shiftKey && focusedElement === last) {
					event.preventDefault();
					if (props.loop) focus(first, { select: true });
				} else if (event.shiftKey && focusedElement === first) {
					event.preventDefault();
					if (props.loop) focus(last, { select: true });
				}
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "currentRef",
				ref: currentRef,
				tabindex: "-1",
				"as-child": _ctx.asChild,
				as: _ctx.as,
				onKeydown: handleKeyDown
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["as-child", "as"]);
		};
	}
});
var ITEM_SELECT = "menu.itemSelect";
var SELECTION_KEYS$1 = ["Enter", " "];
var FIRST_KEYS = [
	"ArrowDown",
	"PageUp",
	"Home"
];
var LAST_KEYS = [
	"ArrowUp",
	"PageDown",
	"End"
];
var FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
[...SELECTION_KEYS$1], [...SELECTION_KEYS$1];
function getOpenState(open) {
	return open ? "open" : "closed";
}
function isIndeterminate(checked) {
	return checked === "indeterminate";
}
function getCheckedState(checked) {
	return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function focusFirst$1(candidates) {
	const PREVIOUSLY_FOCUSED_ELEMENT = getActiveElement();
	for (const candidate of candidates) {
		if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
		candidate.focus();
		if (getActiveElement() !== PREVIOUSLY_FOCUSED_ELEMENT) return;
	}
}
__name(focusFirst$1, "focusFirst");
function isPointInPolygon(point, polygon) {
	const { x, y } = point;
	let inside = false;
	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		const xi = polygon[i].x;
		const yi = polygon[i].y;
		const xj = polygon[j].x;
		const yj = polygon[j].y;
		if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
	}
	return inside;
}
function isPointerInGraceArea(event, area) {
	if (!area) return false;
	return isPointInPolygon({
		x: event.clientX,
		y: event.clientY
	}, area);
}
function isMouseEvent(event) {
	return event.pointerType === "mouse";
}
var Teleport_default = /* @__PURE__ */ defineComponent({
	__name: "Teleport",
	props: {
		to: {
			type: null,
			required: false,
			default: "body"
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const isMounted = useMounted();
		return (_ctx, _cache) => {
			return unref(isMounted) || _ctx.forceMount ? (openBlock(), createBlock(Teleport, {
				key: 0,
				to: _ctx.to,
				disabled: _ctx.disabled,
				defer: _ctx.defer
			}, [renderSlot(_ctx.$slots, "default")], 8, [
				"to",
				"disabled",
				"defer"
			])) : createCommentVNode("v-if", true);
		};
	}
});
var ITEM_DATA_ATTR = "data-reka-collection-item";
function useCollection(options = {}) {
	const { key = "", isProvider = false } = options;
	const injectionKey = `${key}CollectionProvider`;
	let context;
	if (isProvider) {
		const itemMap = ref(/* @__PURE__ */ new Map());
		context = {
			collectionRef: ref(),
			itemMap
		};
		provide(injectionKey, context);
	} else context = inject(injectionKey);
	const getItems = (includeDisabledItem = false) => {
		const collectionNode = context.collectionRef.value;
		if (!collectionNode) return [];
		const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
		const orderedItems = Array.from(context.itemMap.value.values()).sort((a, b) => orderedNodes.indexOf(a.ref) - orderedNodes.indexOf(b.ref));
		if (includeDisabledItem) return orderedItems;
		else return orderedItems.filter((i) => i.ref.dataset.disabled !== "");
	};
	const CollectionSlot = defineComponent({
		name: "CollectionSlot",
		inheritAttrs: false,
		setup(_, { slots, attrs }) {
			const { primitiveElement, currentElement } = usePrimitiveElement();
			watch(currentElement, () => {
				context.collectionRef.value = currentElement.value;
			});
			return () => h(Slot, {
				ref: primitiveElement,
				...attrs
			}, slots);
		}
	});
	const CollectionItem = defineComponent({
		name: "CollectionItem",
		inheritAttrs: false,
		props: { value: { validator: () => true } },
		setup(props, { slots, attrs }) {
			const { primitiveElement, currentElement } = usePrimitiveElement();
			watchEffect((cleanupFn) => {
				if (currentElement.value) {
					const key$1 = markRaw(currentElement.value);
					context.itemMap.value.set(key$1, {
						ref: currentElement.value,
						value: props.value
					});
					cleanupFn(() => context.itemMap.value.delete(key$1));
				}
			});
			return () => h(Slot, {
				...attrs,
				[ITEM_DATA_ATTR]: "",
				ref: primitiveElement
			}, slots);
		}
	});
	return {
		getItems,
		reactiveItems: computed(() => Array.from(context.itemMap.value.values())),
		itemMapSize: computed(() => context.itemMap.value.size),
		CollectionSlot,
		CollectionItem
	};
}
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = {
	bubbles: false,
	cancelable: true
};
var MAP_KEY_TO_FOCUS_INTENT = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function getDirectionAwareKey(key, dir) {
	if (dir !== "rtl") return key;
	return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
	const key = getDirectionAwareKey(event.key, dir);
	if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
	if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
	return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
	const PREVIOUSLY_FOCUSED_ELEMENT = getActiveElement();
	for (const candidate of candidates) {
		if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
		candidate.focus({ preventScroll });
		if (getActiveElement() !== PREVIOUSLY_FOCUSED_ELEMENT) return;
	}
}
function wrapArray(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var [injectRovingFocusGroupContext, provideRovingFocusGroupContext] = createContext("RovingFocusGroup");
var RovingFocusGroup_default = /* @__PURE__ */ defineComponent({
	__name: "RovingFocusGroup",
	props: {
		orientation: {
			type: String,
			required: false,
			default: void 0
		},
		dir: {
			type: String,
			required: false
		},
		loop: {
			type: Boolean,
			required: false,
			default: false
		},
		currentTabStopId: {
			type: [String, null],
			required: false
		},
		defaultCurrentTabStopId: {
			type: String,
			required: false
		},
		preventScrollOnEntryFocus: {
			type: Boolean,
			required: false,
			default: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["entryFocus", "update:currentTabStopId"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { loop, orientation, dir: propDir } = toRefs$1(props);
		const dir = useDirection(propDir);
		const currentTabStopId = useVModel(props, "currentTabStopId", emits, {
			defaultValue: props.defaultCurrentTabStopId,
			passive: props.currentTabStopId === void 0
		});
		const isTabbingBackOut = ref(false);
		const isClickFocus = ref(false);
		const focusableItemsCount = ref(0);
		const { getItems, CollectionSlot } = useCollection({ isProvider: true });
		function handleFocus(event) {
			const isKeyboardFocus = !isClickFocus.value;
			if (event.currentTarget && event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut.value) {
				const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
				event.currentTarget.dispatchEvent(entryFocusEvent);
				emits("entryFocus", entryFocusEvent);
				if (!entryFocusEvent.defaultPrevented) {
					const items = getItems().map((i) => i.ref).filter((i) => i.dataset.disabled !== "");
					focusFirst([
						items.find((item) => item.getAttribute("data-active") === ""),
						items.find((item) => item.getAttribute("data-highlighted") === ""),
						items.find((item) => item.id === currentTabStopId.value),
						...items
					].filter(Boolean), props.preventScrollOnEntryFocus);
				}
			}
			isClickFocus.value = false;
		}
		function handleMouseUp() {
			setTimeout(() => {
				isClickFocus.value = false;
			}, 1);
		}
		__expose({ getItems });
		provideRovingFocusGroupContext({
			loop,
			dir,
			orientation,
			currentTabStopId,
			onItemFocus: (tabStopId) => {
				currentTabStopId.value = tabStopId;
			},
			onItemShiftTab: () => {
				isTabbingBackOut.value = true;
			},
			onFocusableItemAdd: () => {
				focusableItemsCount.value++;
			},
			onFocusableItemRemove: () => {
				focusableItemsCount.value--;
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionSlot), null, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					tabindex: isTabbingBackOut.value || focusableItemsCount.value === 0 ? -1 : 0,
					"data-orientation": unref(orientation),
					as: _ctx.as,
					"as-child": _ctx.asChild,
					dir: unref(dir),
					style: { "outline": "none" },
					onMousedown: _cache[0] || (_cache[0] = ($event) => isClickFocus.value = true),
					onMouseup: handleMouseUp,
					onFocus: handleFocus,
					onBlur: _cache[1] || (_cache[1] = ($event) => isTabbingBackOut.value = false)
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"tabindex",
					"data-orientation",
					"as",
					"as-child",
					"dir"
				])]),
				_: 3
			});
		};
	}
});
var RovingFocusItem_default = /* @__PURE__ */ defineComponent({
	__name: "RovingFocusItem",
	props: {
		tabStopId: {
			type: String,
			required: false
		},
		focusable: {
			type: Boolean,
			required: false,
			default: true
		},
		active: {
			type: Boolean,
			required: false
		},
		allowShiftKey: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const props = __props;
		const context = injectRovingFocusGroupContext();
		const randomId = useId();
		const id = computed(() => props.tabStopId || randomId);
		const isCurrentTabStop = computed(() => context.currentTabStopId.value === id.value);
		const { getItems, CollectionItem } = useCollection();
		onMounted(() => {
			if (props.focusable) context.onFocusableItemAdd();
		});
		onUnmounted(() => {
			if (props.focusable) context.onFocusableItemRemove();
		});
		function handleKeydown(event) {
			if (event.key === "Tab" && event.shiftKey) {
				context.onItemShiftTab();
				return;
			}
			if (event.target !== event.currentTarget) return;
			const focusIntent = getFocusIntent(event, context.orientation.value, context.dir.value);
			if (focusIntent !== void 0) {
				if (event.metaKey || event.ctrlKey || event.altKey || (props.allowShiftKey ? false : event.shiftKey)) return;
				event.preventDefault();
				let candidateNodes = [...getItems().map((i) => i.ref).filter((i) => i.dataset.disabled !== "")];
				if (focusIntent === "last") candidateNodes.reverse();
				else if (focusIntent === "prev" || focusIntent === "next") {
					if (focusIntent === "prev") candidateNodes.reverse();
					const currentIndex = candidateNodes.indexOf(event.currentTarget);
					candidateNodes = context.loop.value ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
				}
				nextTick(() => focusFirst(candidateNodes));
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionItem), null, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					tabindex: isCurrentTabStop.value ? 0 : -1,
					"data-orientation": unref(context).orientation.value,
					"data-active": _ctx.active ? "" : void 0,
					"data-disabled": !_ctx.focusable ? "" : void 0,
					as: _ctx.as,
					"as-child": _ctx.asChild,
					onMousedown: _cache[0] || (_cache[0] = (event) => {
						if (!_ctx.focusable) event.preventDefault();
						else unref(context).onItemFocus(id.value);
					}),
					onFocus: _cache[1] || (_cache[1] = ($event) => unref(context).onItemFocus(id.value)),
					onKeydown: handleKeydown
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"tabindex",
					"data-orientation",
					"data-active",
					"data-disabled",
					"as",
					"as-child"
				])]),
				_: 3
			});
		};
	}
});
var VisuallyHidden_default = /* @__PURE__ */ defineComponent({
	__name: "VisuallyHidden",
	props: {
		feature: {
			type: String,
			required: false,
			default: "focusable"
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"aria-hidden": _ctx.feature === "focusable" ? "true" : void 0,
				"data-hidden": _ctx.feature === "fully-hidden" ? "" : void 0,
				tabindex: _ctx.feature === "fully-hidden" ? "-1" : void 0,
				style: {
					position: "absolute",
					border: 0,
					width: "1px",
					height: "1px",
					padding: 0,
					margin: "-1px",
					overflow: "hidden",
					clip: "rect(0, 0, 0, 0)",
					clipPath: "inset(50%)",
					whiteSpace: "nowrap",
					wordWrap: "normal",
					top: "-1px",
					left: "-1px"
				}
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"aria-hidden",
				"data-hidden",
				"tabindex"
			]);
		};
	}
});
var VisuallyHiddenInputBubble_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "VisuallyHiddenInputBubble",
	props: {
		name: {
			type: String,
			required: true
		},
		value: {
			type: null,
			required: true
		},
		checked: {
			type: Boolean,
			required: false,
			default: void 0
		},
		required: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		feature: {
			type: String,
			required: false,
			default: "fully-hidden"
		}
	},
	setup(__props) {
		const props = __props;
		const { primitiveElement, currentElement } = usePrimitiveElement();
		watch(computed(() => props.checked ?? props.value), (cur, prev) => {
			if (!currentElement.value) return;
			const input = currentElement.value;
			const inputProto = window.HTMLInputElement.prototype;
			const setValue = Object.getOwnPropertyDescriptor(inputProto, "value").set;
			if (setValue && cur !== prev) {
				const inputEvent = new Event("input", { bubbles: true });
				const changeEvent = new Event("change", { bubbles: true });
				setValue.call(input, cur);
				input.dispatchEvent(inputEvent);
				input.dispatchEvent(changeEvent);
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(VisuallyHidden_default, mergeProps({
				ref_key: "primitiveElement",
				ref: primitiveElement
			}, {
				...props,
				..._ctx.$attrs
			}, { as: "input" }), null, 16);
		};
	}
});
var VisuallyHiddenInput_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "VisuallyHiddenInput",
	props: {
		name: {
			type: String,
			required: true
		},
		value: {
			type: null,
			required: true
		},
		checked: {
			type: Boolean,
			required: false,
			default: void 0
		},
		required: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		feature: {
			type: String,
			required: false,
			default: "fully-hidden"
		}
	},
	setup(__props) {
		const props = __props;
		const isFormArrayEmptyAndRequired = computed(() => typeof props.value === "object" && Array.isArray(props.value) && props.value.length === 0 && props.required);
		const parsedValue = computed(() => {
			if (typeof props.value === "string" || typeof props.value === "number" || typeof props.value === "boolean" || props.value === null || props.value === void 0) return [{
				name: props.name,
				value: props.value
			}];
			else if (typeof props.value === "object" && Array.isArray(props.value)) return props.value.flatMap((obj, index) => {
				if (typeof obj === "object") return Object.entries(obj).map(([key, value]) => ({
					name: `${props.name}[${index}][${key}]`,
					value
				}));
				else return {
					name: `${props.name}[${index}]`,
					value: obj
				};
			});
			else if (props.value !== null && typeof props.value === "object" && !Array.isArray(props.value)) return Object.entries(props.value).map(([key, value]) => ({
				name: `${props.name}[${key}]`,
				value
			}));
			return [];
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createCommentVNode(" We render single input if it's required "), isFormArrayEmptyAndRequired.value ? (openBlock(), createBlock(VisuallyHiddenInputBubble_default, mergeProps({ key: _ctx.name }, {
				...props,
				..._ctx.$attrs
			}, {
				name: _ctx.name,
				value: _ctx.value
			}), null, 16, ["name", "value"])) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(parsedValue.value, (parsed) => {
				return openBlock(), createBlock(VisuallyHiddenInputBubble_default, mergeProps({ key: parsed.name }, { ref_for: true }, {
					...props,
					..._ctx.$attrs
				}, {
					name: parsed.name,
					value: parsed.value
				}), null, 16, ["name", "value"]);
			}), 128))], 2112);
		};
	}
});
var [injectPopperRootContext, providePopperRootContext] = createContext("PopperRoot");
var PopperRoot_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "PopperRoot",
	setup(__props) {
		const anchor = ref();
		providePopperRootContext({
			anchor,
			onAnchorChange: (element) => anchor.value = element
		});
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default");
		};
	}
});
var PopperAnchor_default = /* @__PURE__ */ defineComponent({
	__name: "PopperAnchor",
	props: {
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectPopperRootContext();
		watchPostEffect(() => {
			rootContext.onAnchorChange(props.reference ?? currentElement.value);
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref: unref(forwardRef),
				as: _ctx.as,
				"as-child": _ctx.asChild
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["as", "as-child"]);
		};
	}
});
var _hoisted_1$2 = {
	key: 0,
	d: "M0 0L6 6L12 0"
};
var _hoisted_2 = {
	key: 1,
	d: "M0 0L4.58579 4.58579C5.36683 5.36683 6.63316 5.36684 7.41421 4.58579L12 0"
};
var Arrow_default = /* @__PURE__ */ defineComponent({
	__name: "Arrow",
	props: {
		width: {
			type: Number,
			required: false,
			default: 10
		},
		height: {
			type: Number,
			required: false,
			default: 5
		},
		rounded: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "svg"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				width: _ctx.width,
				height: _ctx.height,
				viewBox: _ctx.asChild ? void 0 : "0 0 12 6",
				preserveAspectRatio: _ctx.asChild ? void 0 : "none"
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [!_ctx.rounded ? (openBlock(), createElementBlock("path", _hoisted_1$2)) : (openBlock(), createElementBlock("path", _hoisted_2))])]),
				_: 3
			}, 16, [
				"width",
				"height",
				"viewBox",
				"preserveAspectRatio"
			]);
		};
	}
});
function isNotNull(value) {
	return value !== null;
}
function transformOrigin(options) {
	return {
		name: "transformOrigin",
		options,
		fn(data) {
			const { placement, rects, middlewareData } = data;
			const isArrowHidden = middlewareData.arrow?.centerOffset !== 0;
			const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
			const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
			const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
			const noArrowAlign = {
				start: "0%",
				center: "50%",
				end: "100%"
			}[placedAlign];
			const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
			const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
			let x = "";
			let y = "";
			if (placedSide === "bottom") {
				x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
				y = `${-arrowHeight}px`;
			} else if (placedSide === "top") {
				x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
				y = `${rects.floating.height + arrowHeight}px`;
			} else if (placedSide === "right") {
				x = `${-arrowHeight}px`;
				y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
			} else if (placedSide === "left") {
				x = `${rects.floating.width + arrowHeight}px`;
				y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
			}
			return { data: {
				x,
				y
			} };
		}
	};
}
function getSideAndAlignFromPlacement(placement) {
	const [side, align = "center"] = placement.split("-");
	return [side, align];
}
var sides = [
	"top",
	"right",
	"bottom",
	"left"
];
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
	x: v,
	y: v
});
var oppositeSideMap = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function clamp(start, value, end) {
	return max(start, min(value, end));
}
function evaluate(value, param) {
	return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
	return placement.split("-")[0];
}
function getAlignment(placement) {
	return placement.split("-")[1];
}
function getOppositeAxis(axis) {
	return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
	return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
	const firstChar = placement[0];
	return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
	return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
	if (rtl === void 0) rtl = false;
	const alignment = getAlignment(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const length = getAxisLength(alignmentAxis);
	let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
	if (rects.reference[length] > rects.floating[length]) mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
	return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
	const oppositePlacement = getOppositePlacement(placement);
	return [
		getOppositeAlignmentPlacement(placement),
		oppositePlacement,
		getOppositeAlignmentPlacement(oppositePlacement)
	];
}
function getOppositeAlignmentPlacement(placement) {
	return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
var lrPlacement = ["left", "right"];
var rlPlacement = ["right", "left"];
var tbPlacement = ["top", "bottom"];
var btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
	switch (side) {
		case "top":
		case "bottom":
			if (rtl) return isStart ? rlPlacement : lrPlacement;
			return isStart ? lrPlacement : rlPlacement;
		case "left":
		case "right": return isStart ? tbPlacement : btPlacement;
		default: return [];
	}
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
	const alignment = getAlignment(placement);
	let list = getSideList(getSide(placement), direction === "start", rtl);
	if (alignment) {
		list = list.map((side) => side + "-" + alignment);
		if (flipAlignment) list = list.concat(list.map(getOppositeAlignmentPlacement));
	}
	return list;
}
function getOppositePlacement(placement) {
	const side = getSide(placement);
	return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...padding
	};
}
function getPaddingObject(padding) {
	return typeof padding !== "number" ? expandPaddingObject(padding) : {
		top: padding,
		right: padding,
		bottom: padding,
		left: padding
	};
}
function rectToClientRect(rect) {
	const { x, y, width, height } = rect;
	return {
		width,
		height,
		top: y,
		left: x,
		right: x + width,
		bottom: y + height,
		x,
		y
	};
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
	let { reference, floating } = _ref;
	const sideAxis = getSideAxis(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const alignLength = getAxisLength(alignmentAxis);
	const side = getSide(placement);
	const isVertical = sideAxis === "y";
	const commonX = reference.x + reference.width / 2 - floating.width / 2;
	const commonY = reference.y + reference.height / 2 - floating.height / 2;
	const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
	let coords;
	switch (side) {
		case "top":
			coords = {
				x: commonX,
				y: reference.y - floating.height
			};
			break;
		case "bottom":
			coords = {
				x: commonX,
				y: reference.y + reference.height
			};
			break;
		case "right":
			coords = {
				x: reference.x + reference.width,
				y: commonY
			};
			break;
		case "left":
			coords = {
				x: reference.x - floating.width,
				y: commonY
			};
			break;
		default: coords = {
			x: reference.x,
			y: reference.y
		};
	}
	switch (getAlignment(placement)) {
		case "start":
			coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
			break;
		case "end":
			coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
			break;
	}
	return coords;
}
async function detectOverflow(state, options) {
	var _await$platform$isEle;
	if (options === void 0) options = {};
	const { x, y, platform, rects, elements, strategy } = state;
	const { boundary = "clippingAncestors", rootBoundary = "viewport", elementContext = "floating", altBoundary = false, padding = 0 } = evaluate(options, state);
	const paddingObject = getPaddingObject(padding);
	const element = elements[altBoundary ? elementContext === "floating" ? "reference" : "floating" : elementContext];
	const clippingClientRect = rectToClientRect(await platform.getClippingRect({
		element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating)),
		boundary,
		rootBoundary,
		strategy
	}));
	const rect = elementContext === "floating" ? {
		x,
		y,
		width: rects.floating.width,
		height: rects.floating.height
	} : rects.reference;
	const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
	const offsetScale = await (platform.isElement == null ? void 0 : platform.isElement(offsetParent)) ? await (platform.getScale == null ? void 0 : platform.getScale(offsetParent)) || {
		x: 1,
		y: 1
	} : {
		x: 1,
		y: 1
	};
	const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements,
		rect,
		offsetParent,
		strategy
	}) : rect);
	return {
		top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
		bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
		left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
		right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
	};
}
var MAX_RESET_COUNT = 50;
var computePosition$1 = /* @__PURE__ */ __name(async (reference, floating, config) => {
	const { placement = "bottom", strategy = "absolute", middleware = [], platform } = config;
	const platformWithDetectOverflow = platform.detectOverflow ? platform : {
		...platform,
		detectOverflow
	};
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
	let rects = await platform.getElementRects({
		reference,
		floating,
		strategy
	});
	let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
	let statefulPlacement = placement;
	let resetCount = 0;
	const middlewareData = {};
	for (let i = 0; i < middleware.length; i++) {
		const currentMiddleware = middleware[i];
		if (!currentMiddleware) continue;
		const { name, fn } = currentMiddleware;
		const { x: nextX, y: nextY, data, reset } = await fn({
			x,
			y,
			initialPlacement: placement,
			placement: statefulPlacement,
			strategy,
			middlewareData,
			rects,
			platform: platformWithDetectOverflow,
			elements: {
				reference,
				floating
			}
		});
		x = nextX != null ? nextX : x;
		y = nextY != null ? nextY : y;
		middlewareData[name] = {
			...middlewareData[name],
			...data
		};
		if (reset && resetCount < MAX_RESET_COUNT) {
			resetCount++;
			if (typeof reset === "object") {
				if (reset.placement) statefulPlacement = reset.placement;
				if (reset.rects) rects = reset.rects === true ? await platform.getElementRects({
					reference,
					floating,
					strategy
				}) : reset.rects;
				({x, y} = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
			}
			i = -1;
		}
	}
	return {
		x,
		y,
		placement: statefulPlacement,
		strategy,
		middlewareData
	};
}, "computePosition");
var arrow$2 = /* @__PURE__ */ __name((options) => ({
	name: "arrow",
	options,
	async fn(state) {
		const { x, y, placement, rects, platform, elements, middlewareData } = state;
		const { element, padding = 0 } = evaluate(options, state) || {};
		if (element == null) return {};
		const paddingObject = getPaddingObject(padding);
		const coords = {
			x,
			y
		};
		const axis = getAlignmentAxis(placement);
		const length = getAxisLength(axis);
		const arrowDimensions = await platform.getDimensions(element);
		const isYAxis = axis === "y";
		const minProp = isYAxis ? "top" : "left";
		const maxProp = isYAxis ? "bottom" : "right";
		const clientProp = isYAxis ? "clientHeight" : "clientWidth";
		const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
		const startDiff = coords[axis] - rects.reference[axis];
		const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
		let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
		if (!clientSize || !await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent))) clientSize = elements.floating[clientProp] || rects.floating[length];
		const centerToReference = endDiff / 2 - startDiff / 2;
		const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
		const minPadding = min(paddingObject[minProp], largestPossiblePadding);
		const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
		const min$1 = minPadding;
		const max = clientSize - arrowDimensions[length] - maxPadding;
		const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
		const offset = clamp(min$1, center, max);
		const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
		const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max : 0;
		return {
			[axis]: coords[axis] + alignmentOffset,
			data: {
				[axis]: offset,
				centerOffset: center - offset - alignmentOffset,
				...shouldAddOffset && { alignmentOffset }
			},
			reset: shouldAddOffset
		};
	}
}), "arrow");
var flip$1 = /* @__PURE__ */ __name(function(options) {
	if (options === void 0) options = {};
	return {
		name: "flip",
		options,
		async fn(state) {
			var _middlewareData$arrow;
			var _middlewareData$flip;
			const { placement, middlewareData, rects, initialPlacement, platform, elements } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true, fallbackPlacements: specifiedFallbackPlacements, fallbackStrategy = "bestFit", fallbackAxisSideDirection = "none", flipAlignment = true, ...detectOverflowOptions } = evaluate(options, state);
			if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			const side = getSide(placement);
			const initialSideAxis = getSideAxis(initialPlacement);
			const isBasePlacement = getSide(initialPlacement) === initialPlacement;
			const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
			const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
			const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
			if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
			const placements = [initialPlacement, ...fallbackPlacements];
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const overflows = [];
			let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
			if (checkMainAxis) overflows.push(overflow[side]);
			if (checkCrossAxis) {
				const sides = getAlignmentSides(placement, rects, rtl);
				overflows.push(overflow[sides[0]], overflow[sides[1]]);
			}
			overflowsData = [...overflowsData, {
				placement,
				overflows
			}];
			if (!overflows.every((side) => side <= 0)) {
				var _middlewareData$flip2;
				var _overflowsData$filter;
				const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
				const nextPlacement = placements[nextIndex];
				if (nextPlacement) {
					if (!(checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false) || overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) return {
						data: {
							index: nextIndex,
							overflows: overflowsData
						},
						reset: { placement: nextPlacement }
					};
				}
				let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
				if (!resetPlacement) switch (fallbackStrategy) {
					case "bestFit": {
						var _overflowsData$filter2;
						const placement = (_overflowsData$filter2 = overflowsData.filter((d) => {
							if (hasFallbackAxisSideDirection) {
								const currentSideAxis = getSideAxis(d.placement);
								return currentSideAxis === initialSideAxis || currentSideAxis === "y";
							}
							return true;
						}).map((d) => [d.placement, d.overflows.filter((overflow) => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
						if (placement) resetPlacement = placement;
						break;
					}
					case "initialPlacement":
						resetPlacement = initialPlacement;
						break;
				}
				if (placement !== resetPlacement) return { reset: { placement: resetPlacement } };
			}
			return {};
		}
	};
}, "flip");
function getSideOffsets(overflow, rect) {
	return {
		top: overflow.top - rect.height,
		right: overflow.right - rect.width,
		bottom: overflow.bottom - rect.height,
		left: overflow.left - rect.width
	};
}
function isAnySideFullyClipped(overflow) {
	return sides.some((side) => overflow[side] >= 0);
}
var hide$1 = /* @__PURE__ */ __name(function(options) {
	if (options === void 0) options = {};
	return {
		name: "hide",
		options,
		async fn(state) {
			const { rects, platform } = state;
			const { strategy = "referenceHidden", ...detectOverflowOptions } = evaluate(options, state);
			switch (strategy) {
				case "referenceHidden": {
					const offsets = getSideOffsets(await platform.detectOverflow(state, {
						...detectOverflowOptions,
						elementContext: "reference"
					}), rects.reference);
					return { data: {
						referenceHiddenOffsets: offsets,
						referenceHidden: isAnySideFullyClipped(offsets)
					} };
				}
				case "escaped": {
					const offsets = getSideOffsets(await platform.detectOverflow(state, {
						...detectOverflowOptions,
						altBoundary: true
					}), rects.floating);
					return { data: {
						escapedOffsets: offsets,
						escaped: isAnySideFullyClipped(offsets)
					} };
				}
				default: return {};
			}
		}
	};
}, "hide");
var originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
	const { placement, platform, elements } = state;
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
	const side = getSide(placement);
	const alignment = getAlignment(placement);
	const isVertical = getSideAxis(placement) === "y";
	const mainAxisMulti = originSides.has(side) ? -1 : 1;
	const crossAxisMulti = rtl && isVertical ? -1 : 1;
	const rawValue = evaluate(options, state);
	let { mainAxis, crossAxis, alignmentAxis } = typeof rawValue === "number" ? {
		mainAxis: rawValue,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: rawValue.mainAxis || 0,
		crossAxis: rawValue.crossAxis || 0,
		alignmentAxis: rawValue.alignmentAxis
	};
	if (alignment && typeof alignmentAxis === "number") crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
	return isVertical ? {
		x: crossAxis * crossAxisMulti,
		y: mainAxis * mainAxisMulti
	} : {
		x: mainAxis * mainAxisMulti,
		y: crossAxis * crossAxisMulti
	};
}
var offset$1 = /* @__PURE__ */ __name(function(options) {
	if (options === void 0) options = 0;
	return {
		name: "offset",
		options,
		async fn(state) {
			var _middlewareData$offse;
			var _middlewareData$arrow;
			const { x, y, placement, middlewareData } = state;
			const diffCoords = await convertValueToCoords(state, options);
			if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			return {
				x: x + diffCoords.x,
				y: y + diffCoords.y,
				data: {
					...diffCoords,
					placement
				}
			};
		}
	};
}, "offset");
var shift$1 = /* @__PURE__ */ __name(function(options) {
	if (options === void 0) options = {};
	return {
		name: "shift",
		options,
		async fn(state) {
			const { x, y, placement, platform } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = false, limiter = { fn: (_ref) => {
				let { x, y } = _ref;
				return {
					x,
					y
				};
			} }, ...detectOverflowOptions } = evaluate(options, state);
			const coords = {
				x,
				y
			};
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const crossAxis = getSideAxis(getSide(placement));
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			if (checkMainAxis) {
				const minSide = mainAxis === "y" ? "top" : "left";
				const maxSide = mainAxis === "y" ? "bottom" : "right";
				const min = mainAxisCoord + overflow[minSide];
				const max = mainAxisCoord - overflow[maxSide];
				mainAxisCoord = clamp(min, mainAxisCoord, max);
			}
			if (checkCrossAxis) {
				const minSide = crossAxis === "y" ? "top" : "left";
				const maxSide = crossAxis === "y" ? "bottom" : "right";
				const min = crossAxisCoord + overflow[minSide];
				const max = crossAxisCoord - overflow[maxSide];
				crossAxisCoord = clamp(min, crossAxisCoord, max);
			}
			const limitedCoords = limiter.fn({
				...state,
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			});
			return {
				...limitedCoords,
				data: {
					x: limitedCoords.x - x,
					y: limitedCoords.y - y,
					enabled: {
						[mainAxis]: checkMainAxis,
						[crossAxis]: checkCrossAxis
					}
				}
			};
		}
	};
}, "shift");
var limitShift$1 = /* @__PURE__ */ __name(function(options) {
	if (options === void 0) options = {};
	return {
		options,
		fn(state) {
			const { x, y, placement, rects, middlewareData } = state;
			const { offset = 0, mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true } = evaluate(options, state);
			const coords = {
				x,
				y
			};
			const crossAxis = getSideAxis(placement);
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			const rawOffset = evaluate(offset, state);
			const computedOffset = typeof rawOffset === "number" ? {
				mainAxis: rawOffset,
				crossAxis: 0
			} : {
				mainAxis: 0,
				crossAxis: 0,
				...rawOffset
			};
			if (checkMainAxis) {
				const len = mainAxis === "y" ? "height" : "width";
				const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
				const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
				if (mainAxisCoord < limitMin) mainAxisCoord = limitMin;
				else if (mainAxisCoord > limitMax) mainAxisCoord = limitMax;
			}
			if (checkCrossAxis) {
				var _middlewareData$offse;
				var _middlewareData$offse2;
				const len = mainAxis === "y" ? "width" : "height";
				const isOriginSide = originSides.has(getSide(placement));
				const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
				const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
				if (crossAxisCoord < limitMin) crossAxisCoord = limitMin;
				else if (crossAxisCoord > limitMax) crossAxisCoord = limitMax;
			}
			return {
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			};
		}
	};
}, "limitShift");
var size$1 = /* @__PURE__ */ __name(function(options) {
	if (options === void 0) options = {};
	return {
		name: "size",
		options,
		async fn(state) {
			var _state$middlewareData;
			var _state$middlewareData2;
			const { placement, rects, platform, elements } = state;
			const { apply = () => {}, ...detectOverflowOptions } = evaluate(options, state);
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const side = getSide(placement);
			const alignment = getAlignment(placement);
			const isYAxis = getSideAxis(placement) === "y";
			const { width, height } = rects.floating;
			let heightSide;
			let widthSide;
			if (side === "top" || side === "bottom") {
				heightSide = side;
				widthSide = alignment === (await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
			} else {
				widthSide = side;
				heightSide = alignment === "end" ? "top" : "bottom";
			}
			const maximumClippingHeight = height - overflow.top - overflow.bottom;
			const maximumClippingWidth = width - overflow.left - overflow.right;
			const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
			const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
			const noShift = !state.middlewareData.shift;
			let availableHeight = overflowAvailableHeight;
			let availableWidth = overflowAvailableWidth;
			if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) availableWidth = maximumClippingWidth;
			if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) availableHeight = maximumClippingHeight;
			if (noShift && !alignment) {
				const xMin = max(overflow.left, 0);
				const xMax = max(overflow.right, 0);
				const yMin = max(overflow.top, 0);
				const yMax = max(overflow.bottom, 0);
				if (isYAxis) availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
				else availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
			}
			await apply({
				...state,
				availableWidth,
				availableHeight
			});
			const nextDimensions = await platform.getDimensions(elements.floating);
			if (width !== nextDimensions.width || height !== nextDimensions.height) return { reset: { rects: true } };
			return {};
		}
	};
}, "size");
function hasWindow() {
	return typeof window !== "undefined";
}
function getNodeName(node) {
	if (isNode(node)) return (node.nodeName || "").toLowerCase();
	return "#document";
}
function getWindow(node) {
	var _node$ownerDocument;
	return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
	var _ref;
	return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
	if (!hasWindow()) return false;
	return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
	if (!hasWindow()) return false;
	return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
	if (!hasWindow()) return false;
	return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
	if (!hasWindow() || typeof ShadowRoot === "undefined") return false;
	return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
	const { overflow, overflowX, overflowY, display } = getComputedStyle$1(element);
	return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
	return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
	try {
		if (element.matches(":popover-open")) return true;
	} catch (_e) {}
	try {
		return element.matches(":modal");
	} catch (_e) {
		return false;
	}
}
var willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
var containRe = /paint|layout|strict|content/;
var isNotNone = (value) => !!value && value !== "none";
var isWebKitValue;
function isContainingBlock(elementOrCss) {
	const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
	return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
	let currentNode = getParentNode(element);
	while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
		if (isContainingBlock(currentNode)) return currentNode;
		else if (isTopLayer(currentNode)) return null;
		currentNode = getParentNode(currentNode);
	}
	return null;
}
function isWebKit() {
	if (isWebKitValue == null) isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
	return isWebKitValue;
}
function isLastTraversableNode(node) {
	return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle$1(element) {
	return getWindow(element).getComputedStyle(element);
}
__name(getComputedStyle$1, "getComputedStyle");
function getNodeScroll(element) {
	if (isElement(element)) return {
		scrollLeft: element.scrollLeft,
		scrollTop: element.scrollTop
	};
	return {
		scrollLeft: element.scrollX,
		scrollTop: element.scrollY
	};
}
function getParentNode(node) {
	if (getNodeName(node) === "html") return node;
	const result = node.assignedSlot || node.parentNode || isShadowRoot(node) && node.host || getDocumentElement(node);
	return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
	const parentNode = getParentNode(node);
	if (isLastTraversableNode(parentNode)) return node.ownerDocument ? node.ownerDocument.body : node.body;
	if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) return parentNode;
	return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
	var _node$ownerDocument2;
	if (list === void 0) list = [];
	if (traverseIframes === void 0) traverseIframes = true;
	const scrollableAncestor = getNearestOverflowAncestor(node);
	const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
	const win = getWindow(scrollableAncestor);
	if (isBody) {
		const frameElement = getFrameElement(win);
		return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
	} else return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
	return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
function getCssDimensions(element) {
	const css = getComputedStyle$1(element);
	let width = parseFloat(css.width) || 0;
	let height = parseFloat(css.height) || 0;
	const hasOffset = isHTMLElement(element);
	const offsetWidth = hasOffset ? element.offsetWidth : width;
	const offsetHeight = hasOffset ? element.offsetHeight : height;
	const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
	if (shouldFallback) {
		width = offsetWidth;
		height = offsetHeight;
	}
	return {
		width,
		height,
		$: shouldFallback
	};
}
function unwrapElement$1(element) {
	return !isElement(element) ? element.contextElement : element;
}
__name(unwrapElement$1, "unwrapElement");
function getScale(element) {
	const domElement = unwrapElement$1(element);
	if (!isHTMLElement(domElement)) return createCoords(1);
	const rect = domElement.getBoundingClientRect();
	const { width, height, $ } = getCssDimensions(domElement);
	let x = ($ ? round(rect.width) : rect.width) / width;
	let y = ($ ? round(rect.height) : rect.height) / height;
	if (!x || !Number.isFinite(x)) x = 1;
	if (!y || !Number.isFinite(y)) y = 1;
	return {
		x,
		y
	};
}
var noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
	const win = getWindow(element);
	if (!isWebKit() || !win.visualViewport) return noOffsets;
	return {
		x: win.visualViewport.offsetLeft,
		y: win.visualViewport.offsetTop
	};
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
	if (isFixed === void 0) isFixed = false;
	if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) return false;
	return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
	if (includeScale === void 0) includeScale = false;
	if (isFixedStrategy === void 0) isFixedStrategy = false;
	const clientRect = element.getBoundingClientRect();
	const domElement = unwrapElement$1(element);
	let scale = createCoords(1);
	if (includeScale) if (offsetParent) {
		if (isElement(offsetParent)) scale = getScale(offsetParent);
	} else scale = getScale(element);
	const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
	let x = (clientRect.left + visualOffsets.x) / scale.x;
	let y = (clientRect.top + visualOffsets.y) / scale.y;
	let width = clientRect.width / scale.x;
	let height = clientRect.height / scale.y;
	if (domElement) {
		const win = getWindow(domElement);
		const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
		let currentWin = win;
		let currentIFrame = getFrameElement(currentWin);
		while (currentIFrame && offsetParent && offsetWin !== currentWin) {
			const iframeScale = getScale(currentIFrame);
			const iframeRect = currentIFrame.getBoundingClientRect();
			const css = getComputedStyle$1(currentIFrame);
			const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
			const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
			x *= iframeScale.x;
			y *= iframeScale.y;
			width *= iframeScale.x;
			height *= iframeScale.y;
			x += left;
			y += top;
			currentWin = getWindow(currentIFrame);
			currentIFrame = getFrameElement(currentWin);
		}
	}
	return rectToClientRect({
		width,
		height,
		x,
		y
	});
}
function getWindowScrollBarX(element, rect) {
	const leftScroll = getNodeScroll(element).scrollLeft;
	if (!rect) return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
	return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
	const htmlRect = documentElement.getBoundingClientRect();
	return {
		x: htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect),
		y: htmlRect.top + scroll.scrollTop
	};
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
	let { elements, rect, offsetParent, strategy } = _ref;
	const isFixed = strategy === "fixed";
	const documentElement = getDocumentElement(offsetParent);
	const topLayer = elements ? isTopLayer(elements.floating) : false;
	if (offsetParent === documentElement || topLayer && isFixed) return rect;
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	let scale = createCoords(1);
	const offsets = createCoords(0);
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent);
			scale = getScale(offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		}
	}
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		width: rect.width * scale.x,
		height: rect.height * scale.y,
		x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
		y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
	};
}
function getClientRects(element) {
	return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
	const html = getDocumentElement(element);
	const scroll = getNodeScroll(element);
	const body = element.ownerDocument.body;
	const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
	const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
	let x = -scroll.scrollLeft + getWindowScrollBarX(element);
	const y = -scroll.scrollTop;
	if (getComputedStyle$1(body).direction === "rtl") x += max(html.clientWidth, body.clientWidth) - width;
	return {
		width,
		height,
		x,
		y
	};
}
var SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
	const win = getWindow(element);
	const html = getDocumentElement(element);
	const visualViewport = win.visualViewport;
	let width = html.clientWidth;
	let height = html.clientHeight;
	let x = 0;
	let y = 0;
	if (visualViewport) {
		width = visualViewport.width;
		height = visualViewport.height;
		const visualViewportBased = isWebKit();
		if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
			x = visualViewport.offsetLeft;
			y = visualViewport.offsetTop;
		}
	}
	const windowScrollbarX = getWindowScrollBarX(html);
	if (windowScrollbarX <= 0) {
		const doc = html.ownerDocument;
		const body = doc.body;
		const bodyStyles = getComputedStyle(body);
		const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
		const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
		if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) width -= clippingStableScrollbarWidth;
	} else if (windowScrollbarX <= SCROLLBAR_MAX) width += windowScrollbarX;
	return {
		width,
		height,
		x,
		y
	};
}
function getInnerBoundingClientRect(element, strategy) {
	const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
	const top = clientRect.top + element.clientTop;
	const left = clientRect.left + element.clientLeft;
	const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
	return {
		width: element.clientWidth * scale.x,
		height: element.clientHeight * scale.y,
		x: left * scale.x,
		y: top * scale.y
	};
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
	let rect;
	if (clippingAncestor === "viewport") rect = getViewportRect(element, strategy);
	else if (clippingAncestor === "document") rect = getDocumentRect(getDocumentElement(element));
	else if (isElement(clippingAncestor)) rect = getInnerBoundingClientRect(clippingAncestor, strategy);
	else {
		const visualOffsets = getVisualOffsets(element);
		rect = {
			x: clippingAncestor.x - visualOffsets.x,
			y: clippingAncestor.y - visualOffsets.y,
			width: clippingAncestor.width,
			height: clippingAncestor.height
		};
	}
	return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
	const parentNode = getParentNode(element);
	if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) return false;
	return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
	const cachedResult = cache.get(element);
	if (cachedResult) return cachedResult;
	let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
	let currentContainingBlockComputedStyle = null;
	const elementIsFixed = getComputedStyle$1(element).position === "fixed";
	let currentNode = elementIsFixed ? getParentNode(element) : element;
	while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
		const computedStyle = getComputedStyle$1(currentNode);
		const currentNodeIsContaining = isContainingBlock(currentNode);
		if (!currentNodeIsContaining && computedStyle.position === "fixed") currentContainingBlockComputedStyle = null;
		if (elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && (currentContainingBlockComputedStyle.position === "absolute" || currentContainingBlockComputedStyle.position === "fixed") || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode)) result = result.filter((ancestor) => ancestor !== currentNode);
		else currentContainingBlockComputedStyle = computedStyle;
		currentNode = getParentNode(currentNode);
	}
	cache.set(element, result);
	return result;
}
function getClippingRect(_ref) {
	let { element, boundary, rootBoundary, strategy } = _ref;
	const clippingAncestors = [...boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary), rootBoundary];
	const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
	let top = firstRect.top;
	let right = firstRect.right;
	let bottom = firstRect.bottom;
	let left = firstRect.left;
	for (let i = 1; i < clippingAncestors.length; i++) {
		const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
		top = max(rect.top, top);
		right = min(rect.right, right);
		bottom = min(rect.bottom, bottom);
		left = max(rect.left, left);
	}
	return {
		width: right - left,
		height: bottom - top,
		x: left,
		y: top
	};
}
function getDimensions(element) {
	const { width, height } = getCssDimensions(element);
	return {
		width,
		height
	};
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	const documentElement = getDocumentElement(offsetParent);
	const isFixed = strategy === "fixed";
	const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	const offsets = createCoords(0);
	function setLeftRTLScrollbarOffset() {
		offsets.x = getWindowScrollBarX(documentElement);
	}
	if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		} else if (documentElement) setLeftRTLScrollbarOffset();
	}
	if (isFixed && !isOffsetParentAnElement && documentElement) setLeftRTLScrollbarOffset();
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		x: rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x,
		y: rect.top + scroll.scrollTop - offsets.y - htmlOffset.y,
		width: rect.width,
		height: rect.height
	};
}
function isStaticPositioned(element) {
	return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
	if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") return null;
	if (polyfill) return polyfill(element);
	let rawOffsetParent = element.offsetParent;
	if (getDocumentElement(element) === rawOffsetParent) rawOffsetParent = rawOffsetParent.ownerDocument.body;
	return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
	const win = getWindow(element);
	if (isTopLayer(element)) return win;
	if (!isHTMLElement(element)) {
		let svgOffsetParent = getParentNode(element);
		while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
			if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) return svgOffsetParent;
			svgOffsetParent = getParentNode(svgOffsetParent);
		}
		return win;
	}
	let offsetParent = getTrueOffsetParent(element, polyfill);
	while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) offsetParent = getTrueOffsetParent(offsetParent, polyfill);
	if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) return win;
	return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
	const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
	const getDimensionsFn = this.getDimensions;
	const floatingDimensions = await getDimensionsFn(data.floating);
	return {
		reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
		floating: {
			x: 0,
			y: 0,
			width: floatingDimensions.width,
			height: floatingDimensions.height
		}
	};
};
function isRTL(element) {
	return getComputedStyle$1(element).direction === "rtl";
}
var platform = {
	convertOffsetParentRelativeRectToViewportRelativeRect,
	getDocumentElement,
	getClippingRect,
	getOffsetParent,
	getElementRects,
	getClientRects,
	getDimensions,
	getScale,
	isElement,
	isRTL
};
function rectsAreEqual(a, b) {
	return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove) {
	let io = null;
	let timeoutId;
	const root = getDocumentElement(element);
	function cleanup() {
		var _io;
		clearTimeout(timeoutId);
		(_io = io) == null || _io.disconnect();
		io = null;
	}
	function refresh(skip, threshold) {
		if (skip === void 0) skip = false;
		if (threshold === void 0) threshold = 1;
		cleanup();
		const elementRectForRootMargin = element.getBoundingClientRect();
		const { left, top, width, height } = elementRectForRootMargin;
		if (!skip) onMove();
		if (!width || !height) return;
		const insetTop = floor(top);
		const insetRight = floor(root.clientWidth - (left + width));
		const insetBottom = floor(root.clientHeight - (top + height));
		const insetLeft = floor(left);
		const options = {
			rootMargin: -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px",
			threshold: max(0, min(1, threshold)) || 1
		};
		let isFirstUpdate = true;
		function handleObserve(entries) {
			const ratio = entries[0].intersectionRatio;
			if (ratio !== threshold) {
				if (!isFirstUpdate) return refresh();
				if (!ratio) timeoutId = setTimeout(() => {
					refresh(false, 1e-7);
				}, 1e3);
				else refresh(false, ratio);
			}
			if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) refresh();
			isFirstUpdate = false;
		}
		try {
			io = new IntersectionObserver(handleObserve, {
				...options,
				root: root.ownerDocument
			});
		} catch (_e) {
			io = new IntersectionObserver(handleObserve, options);
		}
		io.observe(element);
	}
	refresh(true);
	return cleanup;
}
function autoUpdate(reference, floating, update, options) {
	if (options === void 0) options = {};
	const { ancestorScroll = true, ancestorResize = true, elementResize = typeof ResizeObserver === "function", layoutShift = typeof IntersectionObserver === "function", animationFrame = false } = options;
	const referenceEl = unwrapElement$1(reference);
	const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
	ancestors.forEach((ancestor) => {
		ancestorScroll && ancestor.addEventListener("scroll", update, { passive: true });
		ancestorResize && ancestor.addEventListener("resize", update);
	});
	const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
	let reobserveFrame = -1;
	let resizeObserver = null;
	if (elementResize) {
		resizeObserver = new ResizeObserver((_ref) => {
			let [firstEntry] = _ref;
			if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
				resizeObserver.unobserve(floating);
				cancelAnimationFrame(reobserveFrame);
				reobserveFrame = requestAnimationFrame(() => {
					var _resizeObserver;
					(_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
				});
			}
			update();
		});
		if (referenceEl && !animationFrame) resizeObserver.observe(referenceEl);
		if (floating) resizeObserver.observe(floating);
	}
	let frameId;
	let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
	if (animationFrame) frameLoop();
	function frameLoop() {
		const nextRefRect = getBoundingClientRect(reference);
		if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) update();
		prevRefRect = nextRefRect;
		frameId = requestAnimationFrame(frameLoop);
	}
	update();
	return () => {
		var _resizeObserver2;
		ancestors.forEach((ancestor) => {
			ancestorScroll && ancestor.removeEventListener("scroll", update);
			ancestorResize && ancestor.removeEventListener("resize", update);
		});
		cleanupIo?.();
		(_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
		resizeObserver = null;
		if (animationFrame) cancelAnimationFrame(frameId);
	};
}
var offset = offset$1;
var shift = shift$1;
var flip = flip$1;
var size = size$1;
var hide = hide$1;
var arrow$1 = arrow$2;
var limitShift = limitShift$1;
var computePosition = (reference, floating, options) => {
	const cache = /* @__PURE__ */ new Map();
	const mergedOptions = {
		platform,
		...options
	};
	const platformWithCache = {
		...mergedOptions.platform,
		_c: cache
	};
	return computePosition$1(reference, floating, {
		...mergedOptions,
		platform: platformWithCache
	});
};
function isComponentPublicInstance(target) {
	return target != null && typeof target === "object" && "$el" in target;
}
function unwrapElement(target) {
	if (isComponentPublicInstance(target)) {
		const element = target.$el;
		return isNode(element) && getNodeName(element) === "#comment" ? null : element;
	}
	return target;
}
function toValue(source) {
	return typeof source === "function" ? source() : unref(source);
}
function arrow(options) {
	return {
		name: "arrow",
		options,
		fn(args) {
			const element = unwrapElement(toValue(options.element));
			if (element == null) return {};
			return arrow$1({
				element,
				padding: options.padding
			}).fn(args);
		}
	};
}
function getDPR(element) {
	if (typeof window === "undefined") return 1;
	return (element.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function roundByDPR(element, value) {
	const dpr = getDPR(element);
	return Math.round(value * dpr) / dpr;
}
function useFloating(reference, floating, options) {
	if (options === void 0) options = {};
	const whileElementsMountedOption = options.whileElementsMounted;
	const openOption = computed(() => {
		var _toValue;
		return (_toValue = toValue(options.open)) != null ? _toValue : true;
	});
	const middlewareOption = computed(() => toValue(options.middleware));
	const placementOption = computed(() => {
		var _toValue2;
		return (_toValue2 = toValue(options.placement)) != null ? _toValue2 : "bottom";
	});
	const strategyOption = computed(() => {
		var _toValue3;
		return (_toValue3 = toValue(options.strategy)) != null ? _toValue3 : "absolute";
	});
	const transformOption = computed(() => {
		var _toValue4;
		return (_toValue4 = toValue(options.transform)) != null ? _toValue4 : true;
	});
	const referenceElement = computed(() => unwrapElement(reference.value));
	const floatingElement = computed(() => unwrapElement(floating.value));
	const x = ref(0);
	const y = ref(0);
	const strategy = ref(strategyOption.value);
	const placement = ref(placementOption.value);
	const middlewareData = shallowRef({});
	const isPositioned = ref(false);
	const floatingStyles = computed(() => {
		const initialStyles = {
			position: strategy.value,
			left: "0",
			top: "0"
		};
		if (!floatingElement.value) return initialStyles;
		const xVal = roundByDPR(floatingElement.value, x.value);
		const yVal = roundByDPR(floatingElement.value, y.value);
		if (transformOption.value) return {
			...initialStyles,
			transform: "translate(" + xVal + "px, " + yVal + "px)",
			...getDPR(floatingElement.value) >= 1.5 && { willChange: "transform" }
		};
		return {
			position: strategy.value,
			left: xVal + "px",
			top: yVal + "px"
		};
	});
	let whileElementsMountedCleanup;
	function update() {
		if (referenceElement.value == null || floatingElement.value == null) return;
		const open = openOption.value;
		computePosition(referenceElement.value, floatingElement.value, {
			middleware: middlewareOption.value,
			placement: placementOption.value,
			strategy: strategyOption.value
		}).then((position) => {
			x.value = position.x;
			y.value = position.y;
			strategy.value = position.strategy;
			placement.value = position.placement;
			middlewareData.value = position.middlewareData;
			isPositioned.value = open !== false;
		});
	}
	function cleanup() {
		if (typeof whileElementsMountedCleanup === "function") {
			whileElementsMountedCleanup();
			whileElementsMountedCleanup = void 0;
		}
	}
	function attach() {
		cleanup();
		if (whileElementsMountedOption === void 0) {
			update();
			return;
		}
		if (referenceElement.value != null && floatingElement.value != null) {
			whileElementsMountedCleanup = whileElementsMountedOption(referenceElement.value, floatingElement.value, update);
			return;
		}
	}
	function reset() {
		if (!openOption.value) isPositioned.value = false;
	}
	watch([
		middlewareOption,
		placementOption,
		strategyOption,
		openOption
	], update, { flush: "sync" });
	watch([referenceElement, floatingElement], attach, { flush: "sync" });
	watch(openOption, reset, { flush: "sync" });
	if (getCurrentScope()) onScopeDispose(cleanup);
	return {
		x: shallowReadonly(x),
		y: shallowReadonly(y),
		strategy: shallowReadonly(strategy),
		placement: shallowReadonly(placement),
		middlewareData: shallowReadonly(middlewareData),
		isPositioned: shallowReadonly(isPositioned),
		floatingStyles,
		update
	};
}
var PopperContentPropsDefaultValue = {
	side: "bottom",
	sideOffset: 0,
	sideFlip: true,
	align: "center",
	alignOffset: 0,
	alignFlip: true,
	arrowPadding: 0,
	hideShiftedArrow: true,
	avoidCollisions: true,
	collisionBoundary: () => [],
	collisionPadding: 0,
	sticky: "partial",
	hideWhenDetached: false,
	positionStrategy: "fixed",
	updatePositionStrategy: "optimized",
	prioritizePosition: false
};
var [injectPopperContentContext, providePopperContentContext] = createContext("PopperContent");
var PopperContent_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "PopperContent",
	props: /* @__PURE__ */ mergeDefaults({
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	}, { ...PopperContentPropsDefaultValue }),
	emits: ["placed"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectPopperRootContext();
		const { forwardRef, currentElement: contentElement } = useForwardExpose();
		const floatingRef = ref();
		const arrow$1 = ref();
		const { width: arrowWidth, height: arrowHeight } = useSize(arrow$1);
		const desiredPlacement = computed(() => props.side + (props.align !== "center" ? `-${props.align}` : ""));
		const collisionPadding = computed(() => {
			return typeof props.collisionPadding === "number" ? props.collisionPadding : {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
				...props.collisionPadding
			};
		});
		const boundary = computed(() => {
			return Array.isArray(props.collisionBoundary) ? props.collisionBoundary : [props.collisionBoundary];
		});
		const detectOverflowOptions = computed(() => {
			return {
				padding: collisionPadding.value,
				boundary: boundary.value.filter(isNotNull),
				altBoundary: boundary.value.length > 0
			};
		});
		const flipOptions = computed(() => {
			return {
				mainAxis: props.sideFlip,
				crossAxis: props.alignFlip
			};
		});
		const computedMiddleware = computedEager(() => {
			return [
				offset({
					mainAxis: props.sideOffset + arrowHeight.value,
					alignmentAxis: props.alignOffset
				}),
				props.prioritizePosition && props.avoidCollisions && flip({
					...detectOverflowOptions.value,
					...flipOptions.value
				}),
				props.avoidCollisions && shift({
					mainAxis: true,
					crossAxis: !!props.prioritizePosition,
					limiter: props.sticky === "partial" ? limitShift() : void 0,
					...detectOverflowOptions.value
				}),
				!props.prioritizePosition && props.avoidCollisions && flip({
					...detectOverflowOptions.value,
					...flipOptions.value
				}),
				size({
					...detectOverflowOptions.value,
					apply: ({ elements, rects, availableWidth, availableHeight }) => {
						const { width: anchorWidth, height: anchorHeight } = rects.reference;
						const contentStyle = elements.floating.style;
						contentStyle.setProperty("--reka-popper-available-width", `${availableWidth}px`);
						contentStyle.setProperty("--reka-popper-available-height", `${availableHeight}px`);
						contentStyle.setProperty("--reka-popper-anchor-width", `${anchorWidth}px`);
						contentStyle.setProperty("--reka-popper-anchor-height", `${anchorHeight}px`);
					}
				}),
				arrow$1.value && arrow({
					element: arrow$1.value,
					padding: props.arrowPadding
				}),
				transformOrigin({
					arrowWidth: arrowWidth.value,
					arrowHeight: arrowHeight.value
				}),
				props.hideWhenDetached && hide({
					strategy: "referenceHidden",
					...detectOverflowOptions.value
				})
			];
		});
		const { floatingStyles, placement, isPositioned, middlewareData, update } = useFloating(computed(() => props.reference ?? rootContext.anchor.value), floatingRef, {
			strategy: props.positionStrategy,
			placement: desiredPlacement,
			whileElementsMounted: (...args) => {
				return autoUpdate(...args, {
					layoutShift: !props.disableUpdateOnLayoutShift,
					animationFrame: props.updatePositionStrategy === "always"
				});
			},
			middleware: computedMiddleware
		});
		const placedSide = computed(() => getSideAndAlignFromPlacement(placement.value)[0]);
		const placedAlign = computed(() => getSideAndAlignFromPlacement(placement.value)[1]);
		watchPostEffect(() => {
			if (isPositioned.value) emits("placed");
		});
		const shouldHideArrow = computed(() => {
			const cannotCenterArrow = middlewareData.value.arrow?.centerOffset !== 0;
			return props.hideShiftedArrow && cannotCenterArrow;
		});
		const contentZIndex = ref("");
		watchEffect(() => {
			if (contentElement.value) contentZIndex.value = window.getComputedStyle(contentElement.value).zIndex;
		});
		providePopperContentContext({
			placedSide,
			onArrowChange: (element) => arrow$1.value = element,
			arrowX: computed(() => middlewareData.value.arrow?.x ?? 0),
			arrowY: computed(() => middlewareData.value.arrow?.y ?? 0),
			shouldHideArrow
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "floatingRef",
				ref: floatingRef,
				"data-reka-popper-content-wrapper": "",
				style: normalizeStyle({
					...unref(floatingStyles),
					transform: unref(isPositioned) ? unref(floatingStyles).transform : "translate(0, -200%)",
					minWidth: "max-content",
					zIndex: contentZIndex.value,
					["--reka-popper-transform-origin"]: [unref(middlewareData).transformOrigin?.x, unref(middlewareData).transformOrigin?.y].join(" "),
					...unref(middlewareData).hide?.referenceHidden && {
						visibility: "hidden",
						pointerEvents: "none"
					}
				})
			}, [createVNode(unref(Primitive), mergeProps({ ref: unref(forwardRef) }, _ctx.$attrs, {
				"as-child": props.asChild,
				as: _ctx.as,
				"data-side": placedSide.value,
				"data-align": placedAlign.value,
				style: { animation: !unref(isPositioned) ? "none" : void 0 }
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"as-child",
				"as",
				"data-side",
				"data-align",
				"style"
			])], 4);
		};
	}
});
var OPPOSITE_SIDE = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
};
var PopperArrow_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "PopperArrow",
	props: {
		width: {
			type: Number,
			required: false
		},
		height: {
			type: Number,
			required: false
		},
		rounded: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "svg"
		}
	},
	setup(__props) {
		const { forwardRef } = useForwardExpose();
		const contentContext = injectPopperContentContext();
		const baseSide = computed(() => OPPOSITE_SIDE[contentContext.placedSide.value]);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", {
				ref: (el) => {
					unref(contentContext).onArrowChange(el);
				},
				style: normalizeStyle({
					position: "absolute",
					left: unref(contentContext).arrowX?.value ? `${unref(contentContext).arrowX?.value}px` : void 0,
					top: unref(contentContext).arrowY?.value ? `${unref(contentContext).arrowY?.value}px` : void 0,
					[baseSide.value]: 0,
					transformOrigin: {
						top: "",
						right: "0 0",
						bottom: "center 0",
						left: "100% 0"
					}[unref(contentContext).placedSide.value],
					transform: {
						top: "translateY(100%)",
						right: "translateY(50%) rotate(90deg) translateX(-50%)",
						bottom: `rotate(180deg)`,
						left: "translateY(50%) rotate(-90deg) translateX(50%)"
					}[unref(contentContext).placedSide.value],
					visibility: unref(contentContext).shouldHideArrow.value ? "hidden" : void 0
				})
			}, [createVNode(Arrow_default, mergeProps(_ctx.$attrs, {
				ref: unref(forwardRef),
				style: { display: "block" },
				as: _ctx.as,
				"as-child": _ctx.asChild,
				rounded: _ctx.rounded,
				width: _ctx.width,
				height: _ctx.height
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"as",
				"as-child",
				"rounded",
				"width",
				"height"
			])], 4);
		};
	}
});
var ComboboxAnchor_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxAnchor",
	props: {
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const { forwardRef } = useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperAnchor_default), {
				"as-child": "",
				reference: _ctx.reference
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), mergeProps({
					ref: unref(forwardRef),
					"as-child": _ctx.asChild,
					as: _ctx.as
				}, _ctx.$attrs), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, ["as-child", "as"])]),
				_: 3
			}, 8, ["reference"]);
		};
	}
});
function valueComparator$1(value, currentValue, comparator) {
	if (value === void 0) return false;
	else if (Array.isArray(value)) return value.some((val) => compare$1(val, currentValue, comparator));
	else return compare$1(value, currentValue, comparator);
}
__name(valueComparator$1, "valueComparator");
function compare$1(value, currentValue, comparator) {
	if (value === void 0 || currentValue === void 0) return false;
	if (typeof value === "string") return value === currentValue;
	if (typeof comparator === "function") return comparator(value, currentValue);
	if (typeof comparator === "string") return value?.[comparator] === currentValue?.[comparator];
	return isEqual(value, currentValue);
}
__name(compare$1, "compare");
var [injectListboxRootContext, provideListboxRootContext] = createContext("ListboxRoot");
var ListboxRoot_default = /* @__PURE__ */ defineComponent({
	__name: "ListboxRoot",
	props: {
		modelValue: {
			type: null,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false
		},
		orientation: {
			type: String,
			required: false,
			default: "vertical"
		},
		dir: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		selectionBehavior: {
			type: String,
			required: false,
			default: "toggle"
		},
		highlightOnHover: {
			type: Boolean,
			required: false
		},
		by: {
			type: [String, Function],
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"update:modelValue",
		"highlight",
		"entryFocus",
		"leave"
	],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { multiple, highlightOnHover, orientation, disabled, selectionBehavior, dir: propDir } = toRefs$1(props);
		const { getItems } = useCollection({ isProvider: true });
		const { handleTypeaheadSearch } = useTypeahead();
		const { primitiveElement, currentElement } = usePrimitiveElement();
		const kbd = useKbd();
		const dir = useDirection(propDir);
		const isFormControl = useFormControl(currentElement);
		const firstValue = ref();
		const isUserAction = ref(false);
		const focusable = ref(true);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
			passive: props.modelValue === void 0,
			deep: true
		});
		function onValueChange(val) {
			isUserAction.value = true;
			if (props.multiple) {
				const modelArray = Array.isArray(modelValue.value) ? [...modelValue.value] : [];
				const index = modelArray.findIndex((i) => compare$1(i, val, props.by));
				if (props.selectionBehavior === "toggle") {
					index === -1 ? modelArray.push(val) : modelArray.splice(index, 1);
					modelValue.value = modelArray;
				} else {
					modelValue.value = [val];
					firstValue.value = val;
				}
			} else if (props.selectionBehavior === "toggle") if (compare$1(modelValue.value, val, props.by)) modelValue.value = void 0;
			else modelValue.value = val;
			else modelValue.value = val;
			setTimeout(() => {
				isUserAction.value = false;
			}, 1);
		}
		const highlightedElement = ref(null);
		const previousElement = ref(null);
		const isVirtual = ref(false);
		const isComposing = ref(false);
		const virtualFocusHook = createEventHook();
		const virtualKeydownHook = createEventHook();
		const virtualHighlightHook = createEventHook();
		function getCollectionItem() {
			return getItems().map((i) => i.ref).filter((i) => i.dataset.disabled !== "");
		}
		function changeHighlight(el, scrollIntoView = true) {
			if (!el) return;
			highlightedElement.value = el;
			if (focusable.value) highlightedElement.value.focus();
			if (scrollIntoView) highlightedElement.value.scrollIntoView({ block: "nearest" });
			emits("highlight", getItems().find((i) => i.ref === el));
		}
		function highlightItem(value) {
			if (isVirtual.value) virtualHighlightHook.trigger(value);
			else {
				const item = getItems().find((i) => compare$1(i.value, value, props.by));
				if (item) {
					highlightedElement.value = item.ref;
					changeHighlight(item.ref);
				}
			}
		}
		function onKeydownEnter(event) {
			if (highlightedElement.value && highlightedElement.value.isConnected) {
				event.preventDefault();
				event.stopPropagation();
				if (!isComposing.value) highlightedElement.value.click();
			}
		}
		function onKeydownTypeAhead(event) {
			if (!focusable.value) return;
			isUserAction.value = true;
			if (isVirtual.value) virtualKeydownHook.trigger(event);
			else {
				const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
				if (isMetaKey && event.key === "a" && multiple.value) {
					const collection = getItems();
					modelValue.value = [...collection.map((i) => i.value)];
					event.preventDefault();
					changeHighlight(collection[collection.length - 1].ref);
				} else if (!isMetaKey) {
					const el = handleTypeaheadSearch(event.key, getItems());
					if (el) changeHighlight(el);
				}
			}
			setTimeout(() => {
				isUserAction.value = false;
			}, 1);
		}
		function onCompositionStart() {
			isComposing.value = true;
		}
		function onCompositionEnd() {
			nextTick(() => {
				isComposing.value = false;
			});
		}
		function highlightFirstItem() {
			nextTick(() => {
				onKeydownNavigation(new KeyboardEvent("keydown", { key: "PageUp" }));
			});
		}
		function onLeave(event) {
			const el = highlightedElement.value;
			if (el?.isConnected) previousElement.value = el;
			highlightedElement.value = null;
			emits("leave", event);
		}
		function onEnter(event) {
			const entryFocusEvent = new CustomEvent("listbox.entryFocus", {
				bubbles: false,
				cancelable: true
			});
			event.currentTarget?.dispatchEvent(entryFocusEvent);
			emits("entryFocus", entryFocusEvent);
			if (entryFocusEvent.defaultPrevented) return;
			if (previousElement.value) changeHighlight(previousElement.value);
			else {
				const el = getCollectionItem()?.[0];
				changeHighlight(el);
			}
		}
		function onKeydownNavigation(event) {
			const intent = getFocusIntent(event, orientation.value, dir.value);
			if (!intent) return;
			let collection = getCollectionItem();
			if (highlightedElement.value) {
				if (intent === "last") collection.reverse();
				else if (intent === "prev" || intent === "next") {
					if (intent === "prev") collection.reverse();
					const currentIndex = collection.indexOf(highlightedElement.value);
					collection = collection.slice(currentIndex + 1);
				}
				handleMultipleReplace(event, collection[0]);
			}
			if (collection.length) {
				const index = !highlightedElement.value && intent === "prev" ? collection.length - 1 : 0;
				changeHighlight(collection[index]);
			}
			if (isVirtual.value) return virtualKeydownHook.trigger(event);
		}
		function handleMultipleReplace(event, targetEl) {
			if (isVirtual.value || props.selectionBehavior !== "replace" || !multiple.value || !Array.isArray(modelValue.value)) return;
			if ((event.altKey || event.ctrlKey || event.metaKey) && !event.shiftKey) return;
			if (event.shiftKey) {
				const collection = getItems().filter((i) => i.ref.dataset.disabled !== "");
				let lastValue = collection.find((i) => i.ref === targetEl)?.value;
				if (event.key === kbd.END) lastValue = collection[collection.length - 1].value;
				else if (event.key === kbd.HOME) lastValue = collection[0].value;
				if (!lastValue || !firstValue.value) return;
				modelValue.value = findValuesBetween(collection.map((i) => i.value), firstValue.value, lastValue);
			}
		}
		async function highlightSelected(event) {
			await nextTick();
			if (isVirtual.value) virtualFocusHook.trigger(event);
			else {
				const collection = getCollectionItem();
				const item = collection.find((i) => i.dataset.state === "checked");
				if (item) changeHighlight(item);
				else if (collection.length) changeHighlight(collection[0]);
			}
		}
		watch(modelValue, () => {
			if (!isUserAction.value) nextTick(() => {
				highlightSelected();
			});
		}, {
			immediate: true,
			deep: true
		});
		__expose({
			highlightedElement,
			highlightItem,
			highlightFirstItem,
			highlightSelected,
			getItems
		});
		provideListboxRootContext({
			modelValue,
			onValueChange,
			multiple,
			orientation,
			dir,
			disabled,
			highlightOnHover,
			highlightedElement,
			isVirtual,
			virtualFocusHook,
			virtualKeydownHook,
			virtualHighlightHook,
			by: props.by,
			firstValue,
			selectionBehavior,
			focusable,
			onLeave,
			onEnter,
			changeHighlight,
			onKeydownEnter,
			onKeydownNavigation,
			onKeydownTypeAhead,
			onCompositionStart,
			onCompositionEnd,
			highlightFirstItem
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				as: _ctx.as,
				"as-child": _ctx.asChild,
				dir: unref(dir),
				"data-disabled": unref(disabled) ? "" : void 0,
				onPointerleave: onLeave,
				onFocusout: _cache[0] || (_cache[0] = async (event) => {
					const target = event.relatedTarget || event.target;
					await nextTick();
					if (highlightedElement.value && unref(currentElement) && !unref(currentElement).contains(target)) onLeave(event);
				})
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) }), unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(unref(VisuallyHiddenInput_default), {
					key: 0,
					name: _ctx.name,
					value: unref(modelValue),
					disabled: unref(disabled),
					required: _ctx.required
				}, null, 8, [
					"name",
					"value",
					"disabled",
					"required"
				])) : createCommentVNode("v-if", true)]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"dir",
				"data-disabled"
			]);
		};
	}
});
var ListboxContent_default = /* @__PURE__ */ defineComponent({
	__name: "ListboxContent",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const { CollectionSlot } = useCollection();
		const rootContext = injectListboxRootContext();
		const isClickFocus = refAutoReset(false, 10);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionSlot), null, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					role: "listbox",
					as: _ctx.as,
					"as-child": _ctx.asChild,
					tabindex: unref(rootContext).focusable.value ? unref(rootContext).highlightedElement.value ? "-1" : "0" : "-1",
					"aria-orientation": unref(rootContext).orientation.value,
					"aria-multiselectable": !!unref(rootContext).multiple.value,
					"data-orientation": unref(rootContext).orientation.value,
					onMousedown: _cache[0] || (_cache[0] = withModifiers(($event) => isClickFocus.value = true, ["left"])),
					onFocus: _cache[1] || (_cache[1] = (ev) => {
						if (unref(isClickFocus)) return;
						unref(rootContext).onEnter(ev);
					}),
					onKeydown: [
						_cache[2] || (_cache[2] = withKeys((event) => {
							if (unref(rootContext).orientation.value === "vertical" && (event.key === "ArrowLeft" || event.key === "ArrowRight") || unref(rootContext).orientation.value === "horizontal" && (event.key === "ArrowUp" || event.key === "ArrowDown")) return;
							event.preventDefault();
							unref(rootContext).focusable.value && unref(rootContext).onKeydownNavigation(event);
						}, [
							"down",
							"up",
							"left",
							"right",
							"home",
							"end"
						])),
						withKeys(unref(rootContext).onKeydownEnter, ["enter"]),
						unref(rootContext).onKeydownTypeAhead
					]
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"as",
					"as-child",
					"tabindex",
					"aria-orientation",
					"aria-multiselectable",
					"data-orientation",
					"onKeydown"
				])]),
				_: 3
			});
		};
	}
});
var ListboxFilter_default = /* @__PURE__ */ defineComponent({
	__name: "ListboxFilter",
	props: {
		modelValue: {
			type: String,
			required: false
		},
		autoFocus: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "input"
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const modelValue = useVModel(props, "modelValue", __emit, {
			defaultValue: "",
			passive: props.modelValue === void 0
		});
		const rootContext = injectListboxRootContext();
		const { primitiveElement, currentElement } = usePrimitiveElement();
		const disabled = computed(() => props.disabled || rootContext.disabled.value || false);
		const activedescendant = ref();
		watchSyncEffect(() => activedescendant.value = rootContext.highlightedElement.value?.id);
		onMounted(() => {
			rootContext.focusable.value = false;
			setTimeout(() => {
				if (props.autoFocus) currentElement.value?.focus();
			}, 1);
		});
		onUnmounted(() => {
			rootContext.focusable.value = true;
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				as: _ctx.as,
				"as-child": _ctx.asChild,
				value: unref(modelValue),
				disabled: disabled.value ? "" : void 0,
				"data-disabled": disabled.value ? "" : void 0,
				"aria-disabled": disabled.value ?? void 0,
				"aria-activedescendant": activedescendant.value,
				type: "text",
				onKeydown: [withKeys(withModifiers(unref(rootContext).onKeydownNavigation, ["prevent"]), [
					"down",
					"up",
					"home",
					"end"
				]), withKeys(unref(rootContext).onKeydownEnter, ["enter"])],
				onInput: _cache[0] || (_cache[0] = (event) => {
					modelValue.value = event.target.value;
					unref(rootContext).highlightFirstItem();
				}),
				onCompositionstart: unref(rootContext).onCompositionStart,
				onCompositionend: unref(rootContext).onCompositionEnd
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"value",
				"disabled",
				"data-disabled",
				"aria-disabled",
				"aria-activedescendant",
				"onKeydown",
				"onCompositionstart",
				"onCompositionend"
			]);
		};
	}
});
var LISTBOX_SELECT = "listbox.select";
var [injectListboxItemContext, provideListboxItemContext] = createContext("ListboxItem");
var ListboxItem_default = /* @__PURE__ */ defineComponent({
	__name: "ListboxItem",
	props: {
		value: {
			type: null,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "div"
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const id = useId(void 0, "reka-listbox-item");
		const { CollectionItem } = useCollection();
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectListboxRootContext();
		const isHighlighted = computed(() => currentElement.value === rootContext.highlightedElement.value);
		const isSelected = computed(() => valueComparator$1(rootContext.modelValue.value, props.value, rootContext.by));
		const disabled = computed(() => rootContext.disabled.value || props.disabled);
		async function handleSelect(ev) {
			emits("select", ev);
			if (ev?.defaultPrevented) return;
			if (!disabled.value && ev) {
				rootContext.onValueChange(props.value);
				rootContext.changeHighlight(currentElement.value);
			}
		}
		function handleSelectCustomEvent(ev) {
			handleAndDispatchCustomEvent(LISTBOX_SELECT, handleSelect, {
				originalEvent: ev,
				value: props.value
			});
		}
		provideListboxItemContext({ isSelected });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionItem), { value: _ctx.value }, {
				default: withCtx(() => [withMemo([isHighlighted.value, isSelected.value], () => createVNode(unref(Primitive), mergeProps({ id: unref(id) }, _ctx.$attrs, {
					ref: unref(forwardRef),
					role: "option",
					tabindex: unref(rootContext).focusable.value ? isHighlighted.value ? "0" : "-1" : -1,
					"aria-selected": isSelected.value,
					as: _ctx.as,
					"as-child": _ctx.asChild,
					disabled: disabled.value ? "" : void 0,
					"data-disabled": disabled.value ? "" : void 0,
					"data-highlighted": isHighlighted.value ? "" : void 0,
					"data-state": isSelected.value ? "checked" : "unchecked",
					onClick: handleSelectCustomEvent,
					onKeydown: withKeys(withModifiers(handleSelectCustomEvent, ["prevent"]), ["space"]),
					onPointermove: _cache[0] || (_cache[0] = () => {
						if (unref(rootContext).highlightedElement.value === unref(currentElement)) return;
						if (unref(rootContext).highlightOnHover.value && !unref(rootContext).focusable.value) unref(rootContext).changeHighlight(unref(currentElement), false);
					})
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"id",
					"tabindex",
					"aria-selected",
					"as",
					"as-child",
					"disabled",
					"data-disabled",
					"data-highlighted",
					"data-state",
					"onKeydown"
				]), _cache, 1)]),
				_: 3
			}, 8, ["value"]);
		};
	}
});
function memo(getDeps, fn, opts) {
	let deps = opts.initialDeps ?? [];
	let result;
	let isInitial = true;
	function memoizedFunction() {
		var _a;
		var _b;
		var _c;
		let depTime;
		if (opts.key && ((_a = opts.debug) == null ? void 0 : _a.call(opts))) depTime = Date.now();
		const newDeps = getDeps();
		if (!(newDeps.length !== deps.length || newDeps.some((dep, index) => deps[index] !== dep))) return result;
		deps = newDeps;
		let resultTime;
		if (opts.key && ((_b = opts.debug) == null ? void 0 : _b.call(opts))) resultTime = Date.now();
		result = fn(...newDeps);
		if (opts.key && ((_c = opts.debug) == null ? void 0 : _c.call(opts))) {
			const depEndTime = Math.round((Date.now() - depTime) * 100) / 100;
			const resultEndTime = Math.round((Date.now() - resultTime) * 100) / 100;
			const resultFpsPercentage = resultEndTime / 16;
			const pad = (str, num) => {
				str = String(str);
				while (str.length < num) str = " " + str;
				return str;
			};
			`${pad(resultEndTime, 5)}${pad(depEndTime, 5)}`, `${Math.max(0, Math.min(120 - 120 * resultFpsPercentage, 120))}`, opts?.key;
		}
		if ((opts == null ? void 0 : opts.onChange) && !(isInitial && opts.skipInitialOnChange)) opts.onChange(result);
		isInitial = false;
		return result;
	}
	memoizedFunction.updateDeps = (newDeps) => {
		deps = newDeps;
	};
	return memoizedFunction;
}
function notUndefined(value, msg) {
	if (value === void 0) throw new Error(`Unexpected undefined${msg ? `: ${msg}` : ""}`);
	else return value;
}
var approxEqual = (a, b) => Math.abs(a - b) < 1.01;
var debounce = (targetWindow, fn, ms) => {
	let timeoutId;
	return function(...args) {
		targetWindow.clearTimeout(timeoutId);
		timeoutId = targetWindow.setTimeout(() => fn.apply(this, args), ms);
	};
};
var getRect = (element) => {
	const { offsetWidth, offsetHeight } = element;
	return {
		width: offsetWidth,
		height: offsetHeight
	};
};
var defaultKeyExtractor = (index) => index;
var defaultRangeExtractor = (range) => {
	const start = Math.max(range.startIndex - range.overscan, 0);
	const end = Math.min(range.endIndex + range.overscan, range.count - 1);
	const arr = [];
	for (let i = start; i <= end; i++) arr.push(i);
	return arr;
};
var observeElementRect = (instance, cb) => {
	const element = instance.scrollElement;
	if (!element) return;
	const targetWindow = instance.targetWindow;
	if (!targetWindow) return;
	const handler = (rect) => {
		const { width, height } = rect;
		cb({
			width: Math.round(width),
			height: Math.round(height)
		});
	};
	handler(getRect(element));
	if (!targetWindow.ResizeObserver) return () => {};
	const observer = new targetWindow.ResizeObserver((entries) => {
		const run = () => {
			const entry = entries[0];
			if (entry == null ? void 0 : entry.borderBoxSize) {
				const box = entry.borderBoxSize[0];
				if (box) {
					handler({
						width: box.inlineSize,
						height: box.blockSize
					});
					return;
				}
			}
			handler(getRect(element));
		};
		instance.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(run) : run();
	});
	observer.observe(element, { box: "border-box" });
	return () => {
		observer.unobserve(element);
	};
};
var addEventListenerOptions = { passive: true };
var supportsScrollend = typeof window == "undefined" ? true : "onscrollend" in window;
var observeElementOffset = (instance, cb) => {
	const element = instance.scrollElement;
	if (!element) return;
	const targetWindow = instance.targetWindow;
	if (!targetWindow) return;
	let offset = 0;
	const fallback = instance.options.useScrollendEvent && supportsScrollend ? () => void 0 : debounce(targetWindow, () => {
		cb(offset, false);
	}, instance.options.isScrollingResetDelay);
	const createHandler = (isScrolling) => () => {
		const { horizontal, isRtl } = instance.options;
		offset = horizontal ? element["scrollLeft"] * (isRtl && -1 || 1) : element["scrollTop"];
		fallback();
		cb(offset, isScrolling);
	};
	const handler = createHandler(true);
	const endHandler = createHandler(false);
	element.addEventListener("scroll", handler, addEventListenerOptions);
	const registerScrollendEvent = instance.options.useScrollendEvent && supportsScrollend;
	if (registerScrollendEvent) element.addEventListener("scrollend", endHandler, addEventListenerOptions);
	return () => {
		element.removeEventListener("scroll", handler);
		if (registerScrollendEvent) element.removeEventListener("scrollend", endHandler);
	};
};
var measureElement = (element, entry, instance) => {
	if (entry == null ? void 0 : entry.borderBoxSize) {
		const box = entry.borderBoxSize[0];
		if (box) return Math.round(box[instance.options.horizontal ? "inlineSize" : "blockSize"]);
	}
	return element[instance.options.horizontal ? "offsetWidth" : "offsetHeight"];
};
var elementScroll = (offset, { adjustments = 0, behavior }, instance) => {
	var _a;
	var _b;
	const toOffset = offset + adjustments;
	(_b = (_a = instance.scrollElement) == null ? void 0 : _a.scrollTo) == null || _b.call(_a, {
		[instance.options.horizontal ? "left" : "top"]: toOffset,
		behavior
	});
};
var Virtualizer = class {
	constructor(opts) {
		this.unsubs = [];
		this.scrollElement = null;
		this.targetWindow = null;
		this.isScrolling = false;
		this.currentScrollToIndex = null;
		this.measurementsCache = [];
		this.itemSizeCache = /* @__PURE__ */ new Map();
		this.laneAssignments = /* @__PURE__ */ new Map();
		this.pendingMeasuredCacheIndexes = [];
		this.prevLanes = void 0;
		this.lanesChangedFlag = false;
		this.lanesSettling = false;
		this.scrollRect = null;
		this.scrollOffset = null;
		this.scrollDirection = null;
		this.scrollAdjustments = 0;
		this.elementsCache = /* @__PURE__ */ new Map();
		this.observer = /* @__PURE__ */ (() => {
			let _ro = null;
			const get = () => {
				if (_ro) return _ro;
				if (!this.targetWindow || !this.targetWindow.ResizeObserver) return null;
				return _ro = new this.targetWindow.ResizeObserver((entries) => {
					entries.forEach((entry) => {
						const run = () => {
							this._measureElement(entry.target, entry);
						};
						this.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(run) : run();
					});
				});
			};
			return {
				disconnect: () => {
					var _a;
					(_a = get()) == null || _a.disconnect();
					_ro = null;
				},
				observe: (target) => {
					var _a;
					return (_a = get()) == null ? void 0 : _a.observe(target, { box: "border-box" });
				},
				unobserve: (target) => {
					var _a;
					return (_a = get()) == null ? void 0 : _a.unobserve(target);
				}
			};
		})();
		this.range = null;
		this.setOptions = (opts2) => {
			Object.entries(opts2).forEach(([key, value]) => {
				if (typeof value === "undefined") delete opts2[key];
			});
			this.options = {
				debug: false,
				initialOffset: 0,
				overscan: 1,
				paddingStart: 0,
				paddingEnd: 0,
				scrollPaddingStart: 0,
				scrollPaddingEnd: 0,
				horizontal: false,
				getItemKey: defaultKeyExtractor,
				rangeExtractor: defaultRangeExtractor,
				onChange: () => {},
				measureElement,
				initialRect: {
					width: 0,
					height: 0
				},
				scrollMargin: 0,
				gap: 0,
				indexAttribute: "data-index",
				initialMeasurementsCache: [],
				lanes: 1,
				isScrollingResetDelay: 150,
				enabled: true,
				isRtl: false,
				useScrollendEvent: false,
				useAnimationFrameWithResizeObserver: false,
				...opts2
			};
		};
		this.notify = (sync) => {
			var _a;
			var _b;
			(_b = (_a = this.options).onChange) == null || _b.call(_a, this, sync);
		};
		this.maybeNotify = memo(() => {
			this.calculateRange();
			return [
				this.isScrolling,
				this.range ? this.range.startIndex : null,
				this.range ? this.range.endIndex : null
			];
		}, (isScrolling) => {
			this.notify(isScrolling);
		}, {
			key: false,
			debug: () => this.options.debug,
			initialDeps: [
				this.isScrolling,
				this.range ? this.range.startIndex : null,
				this.range ? this.range.endIndex : null
			]
		});
		this.cleanup = () => {
			this.unsubs.filter(Boolean).forEach((d) => d());
			this.unsubs = [];
			this.observer.disconnect();
			this.scrollElement = null;
			this.targetWindow = null;
		};
		this._didMount = () => {
			return () => {
				this.cleanup();
			};
		};
		this._willUpdate = () => {
			var _a;
			const scrollElement = this.options.enabled ? this.options.getScrollElement() : null;
			if (this.scrollElement !== scrollElement) {
				this.cleanup();
				if (!scrollElement) {
					this.maybeNotify();
					return;
				}
				this.scrollElement = scrollElement;
				if (this.scrollElement && "ownerDocument" in this.scrollElement) this.targetWindow = this.scrollElement.ownerDocument.defaultView;
				else this.targetWindow = ((_a = this.scrollElement) == null ? void 0 : _a.window) ?? null;
				this.elementsCache.forEach((cached) => {
					this.observer.observe(cached);
				});
				this.unsubs.push(this.options.observeElementRect(this, (rect) => {
					this.scrollRect = rect;
					this.maybeNotify();
				}));
				this.unsubs.push(this.options.observeElementOffset(this, (offset, isScrolling) => {
					this.scrollAdjustments = 0;
					this.scrollDirection = isScrolling ? this.getScrollOffset() < offset ? "forward" : "backward" : null;
					this.scrollOffset = offset;
					this.isScrolling = isScrolling;
					this.maybeNotify();
				}));
				this._scrollToOffset(this.getScrollOffset(), {
					adjustments: void 0,
					behavior: void 0
				});
			}
		};
		this.getSize = () => {
			if (!this.options.enabled) {
				this.scrollRect = null;
				return 0;
			}
			this.scrollRect = this.scrollRect ?? this.options.initialRect;
			return this.scrollRect[this.options.horizontal ? "width" : "height"];
		};
		this.getScrollOffset = () => {
			if (!this.options.enabled) {
				this.scrollOffset = null;
				return 0;
			}
			this.scrollOffset = this.scrollOffset ?? (typeof this.options.initialOffset === "function" ? this.options.initialOffset() : this.options.initialOffset);
			return this.scrollOffset;
		};
		this.getFurthestMeasurement = (measurements, index) => {
			const furthestMeasurementsFound = /* @__PURE__ */ new Map();
			const furthestMeasurements = /* @__PURE__ */ new Map();
			for (let m = index - 1; m >= 0; m--) {
				const measurement = measurements[m];
				if (furthestMeasurementsFound.has(measurement.lane)) continue;
				const previousFurthestMeasurement = furthestMeasurements.get(measurement.lane);
				if (previousFurthestMeasurement == null || measurement.end > previousFurthestMeasurement.end) furthestMeasurements.set(measurement.lane, measurement);
				else if (measurement.end < previousFurthestMeasurement.end) furthestMeasurementsFound.set(measurement.lane, true);
				if (furthestMeasurementsFound.size === this.options.lanes) break;
			}
			return furthestMeasurements.size === this.options.lanes ? Array.from(furthestMeasurements.values()).sort((a, b) => {
				if (a.end === b.end) return a.index - b.index;
				return a.end - b.end;
			})[0] : void 0;
		};
		this.getMeasurementOptions = memo(() => [
			this.options.count,
			this.options.paddingStart,
			this.options.scrollMargin,
			this.options.getItemKey,
			this.options.enabled,
			this.options.lanes
		], (count, paddingStart, scrollMargin, getItemKey, enabled, lanes) => {
			if (this.prevLanes !== void 0 && this.prevLanes !== lanes) this.lanesChangedFlag = true;
			this.prevLanes = lanes;
			this.pendingMeasuredCacheIndexes = [];
			return {
				count,
				paddingStart,
				scrollMargin,
				getItemKey,
				enabled,
				lanes
			};
		}, { key: false });
		this.getMeasurements = memo(() => [this.getMeasurementOptions(), this.itemSizeCache], ({ count, paddingStart, scrollMargin, getItemKey, enabled, lanes }, itemSizeCache) => {
			if (!enabled) {
				this.measurementsCache = [];
				this.itemSizeCache.clear();
				this.laneAssignments.clear();
				return [];
			}
			if (this.laneAssignments.size > count) {
				for (const index of this.laneAssignments.keys()) if (index >= count) this.laneAssignments.delete(index);
			}
			if (this.lanesChangedFlag) {
				this.lanesChangedFlag = false;
				this.lanesSettling = true;
				this.measurementsCache = [];
				this.itemSizeCache.clear();
				this.laneAssignments.clear();
				this.pendingMeasuredCacheIndexes = [];
			}
			if (this.measurementsCache.length === 0 && !this.lanesSettling) {
				this.measurementsCache = this.options.initialMeasurementsCache;
				this.measurementsCache.forEach((item) => {
					this.itemSizeCache.set(item.key, item.size);
				});
			}
			const min = this.lanesSettling ? 0 : this.pendingMeasuredCacheIndexes.length > 0 ? Math.min(...this.pendingMeasuredCacheIndexes) : 0;
			this.pendingMeasuredCacheIndexes = [];
			if (this.lanesSettling && this.measurementsCache.length === count) this.lanesSettling = false;
			const measurements = this.measurementsCache.slice(0, min);
			const laneLastIndex = new Array(lanes).fill(void 0);
			for (let m = 0; m < min; m++) {
				const item = measurements[m];
				if (item) laneLastIndex[item.lane] = m;
			}
			for (let i = min; i < count; i++) {
				const key = getItemKey(i);
				const cachedLane = this.laneAssignments.get(i);
				let lane;
				let start;
				if (cachedLane !== void 0 && this.options.lanes > 1) {
					lane = cachedLane;
					const prevIndex = laneLastIndex[lane];
					const prevInLane = prevIndex !== void 0 ? measurements[prevIndex] : void 0;
					start = prevInLane ? prevInLane.end + this.options.gap : paddingStart + scrollMargin;
				} else {
					const furthestMeasurement = this.options.lanes === 1 ? measurements[i - 1] : this.getFurthestMeasurement(measurements, i);
					start = furthestMeasurement ? furthestMeasurement.end + this.options.gap : paddingStart + scrollMargin;
					lane = furthestMeasurement ? furthestMeasurement.lane : i % this.options.lanes;
					if (this.options.lanes > 1) this.laneAssignments.set(i, lane);
				}
				const measuredSize = itemSizeCache.get(key);
				const size = typeof measuredSize === "number" ? measuredSize : this.options.estimateSize(i);
				const end = start + size;
				measurements[i] = {
					index: i,
					start,
					size,
					end,
					key,
					lane
				};
				laneLastIndex[lane] = i;
			}
			this.measurementsCache = measurements;
			return measurements;
		}, {
			key: false,
			debug: () => this.options.debug
		});
		this.calculateRange = memo(() => [
			this.getMeasurements(),
			this.getSize(),
			this.getScrollOffset(),
			this.options.lanes
		], (measurements, outerSize, scrollOffset, lanes) => {
			return this.range = measurements.length > 0 && outerSize > 0 ? calculateRange({
				measurements,
				outerSize,
				scrollOffset,
				lanes
			}) : null;
		}, {
			key: false,
			debug: () => this.options.debug
		});
		this.getVirtualIndexes = memo(() => {
			let startIndex = null;
			let endIndex = null;
			const range = this.calculateRange();
			if (range) {
				startIndex = range.startIndex;
				endIndex = range.endIndex;
			}
			this.maybeNotify.updateDeps([
				this.isScrolling,
				startIndex,
				endIndex
			]);
			return [
				this.options.rangeExtractor,
				this.options.overscan,
				this.options.count,
				startIndex,
				endIndex
			];
		}, (rangeExtractor, overscan, count, startIndex, endIndex) => {
			return startIndex === null || endIndex === null ? [] : rangeExtractor({
				startIndex,
				endIndex,
				overscan,
				count
			});
		}, {
			key: false,
			debug: () => this.options.debug
		});
		this.indexFromElement = (node) => {
			const attributeName = this.options.indexAttribute;
			const indexStr = node.getAttribute(attributeName);
			if (!indexStr) {
				console.warn(`Missing attribute name '${attributeName}={index}' on measured element.`);
				return -1;
			}
			return parseInt(indexStr, 10);
		};
		this._measureElement = (node, entry) => {
			const index = this.indexFromElement(node);
			const item = this.measurementsCache[index];
			if (!item) return;
			const key = item.key;
			const prevNode = this.elementsCache.get(key);
			if (prevNode !== node) {
				if (prevNode) this.observer.unobserve(prevNode);
				this.observer.observe(node);
				this.elementsCache.set(key, node);
			}
			if (node.isConnected) this.resizeItem(index, this.options.measureElement(node, entry, this));
		};
		this.resizeItem = (index, size) => {
			const item = this.measurementsCache[index];
			if (!item) return;
			const delta = size - (this.itemSizeCache.get(item.key) ?? item.size);
			if (delta !== 0) {
				if (this.shouldAdjustScrollPositionOnItemSizeChange !== void 0 ? this.shouldAdjustScrollPositionOnItemSizeChange(item, delta, this) : item.start < this.getScrollOffset() + this.scrollAdjustments) this._scrollToOffset(this.getScrollOffset(), {
					adjustments: this.scrollAdjustments += delta,
					behavior: void 0
				});
				this.pendingMeasuredCacheIndexes.push(item.index);
				this.itemSizeCache = new Map(this.itemSizeCache.set(item.key, size));
				this.notify(false);
			}
		};
		this.measureElement = (node) => {
			if (!node) {
				this.elementsCache.forEach((cached, key) => {
					if (!cached.isConnected) {
						this.observer.unobserve(cached);
						this.elementsCache.delete(key);
					}
				});
				return;
			}
			this._measureElement(node, void 0);
		};
		this.getVirtualItems = memo(() => [this.getVirtualIndexes(), this.getMeasurements()], (indexes, measurements) => {
			const virtualItems = [];
			for (let k = 0, len = indexes.length; k < len; k++) {
				const measurement = measurements[indexes[k]];
				virtualItems.push(measurement);
			}
			return virtualItems;
		}, {
			key: false,
			debug: () => this.options.debug
		});
		this.getVirtualItemForOffset = (offset) => {
			const measurements = this.getMeasurements();
			if (measurements.length === 0) return;
			return notUndefined(measurements[findNearestBinarySearch(0, measurements.length - 1, (index) => notUndefined(measurements[index]).start, offset)]);
		};
		this.getMaxScrollOffset = () => {
			if (!this.scrollElement) return 0;
			if ("scrollHeight" in this.scrollElement) return this.options.horizontal ? this.scrollElement.scrollWidth - this.scrollElement.clientWidth : this.scrollElement.scrollHeight - this.scrollElement.clientHeight;
			else {
				const doc = this.scrollElement.document.documentElement;
				return this.options.horizontal ? doc.scrollWidth - this.scrollElement.innerWidth : doc.scrollHeight - this.scrollElement.innerHeight;
			}
		};
		this.getOffsetForAlignment = (toOffset, align, itemSize = 0) => {
			if (!this.scrollElement) return 0;
			const size = this.getSize();
			const scrollOffset = this.getScrollOffset();
			if (align === "auto") align = toOffset >= scrollOffset + size ? "end" : "start";
			if (align === "center") toOffset += (itemSize - size) / 2;
			else if (align === "end") toOffset -= size;
			const maxOffset = this.getMaxScrollOffset();
			return Math.max(Math.min(maxOffset, toOffset), 0);
		};
		this.getOffsetForIndex = (index, align = "auto") => {
			index = Math.max(0, Math.min(index, this.options.count - 1));
			const item = this.measurementsCache[index];
			if (!item) return;
			const size = this.getSize();
			const scrollOffset = this.getScrollOffset();
			if (align === "auto") if (item.end >= scrollOffset + size - this.options.scrollPaddingEnd) align = "end";
			else if (item.start <= scrollOffset + this.options.scrollPaddingStart) align = "start";
			else return [scrollOffset, align];
			if (align === "end" && index === this.options.count - 1) return [this.getMaxScrollOffset(), align];
			const toOffset = align === "end" ? item.end + this.options.scrollPaddingEnd : item.start - this.options.scrollPaddingStart;
			return [this.getOffsetForAlignment(toOffset, align, item.size), align];
		};
		this.isDynamicMode = () => this.elementsCache.size > 0;
		this.scrollToOffset = (toOffset, { align = "start", behavior } = {}) => {
			if (behavior === "smooth" && this.isDynamicMode()) console.warn("The `smooth` scroll behavior is not fully supported with dynamic size.");
			this._scrollToOffset(this.getOffsetForAlignment(toOffset, align), {
				adjustments: void 0,
				behavior
			});
		};
		this.scrollToIndex = (index, { align: initialAlign = "auto", behavior } = {}) => {
			if (behavior === "smooth" && this.isDynamicMode()) console.warn("The `smooth` scroll behavior is not fully supported with dynamic size.");
			index = Math.max(0, Math.min(index, this.options.count - 1));
			this.currentScrollToIndex = index;
			let attempts = 0;
			const maxAttempts = 10;
			const tryScroll = (currentAlign) => {
				if (!this.targetWindow) return;
				const offsetInfo = this.getOffsetForIndex(index, currentAlign);
				if (!offsetInfo) {
					console.warn("Failed to get offset for index:", index);
					return;
				}
				const [offset, align] = offsetInfo;
				this._scrollToOffset(offset, {
					adjustments: void 0,
					behavior
				});
				this.targetWindow.requestAnimationFrame(() => {
					if (!this.targetWindow) return;
					const verify = () => {
						if (this.currentScrollToIndex !== index) return;
						const currentOffset = this.getScrollOffset();
						const afterInfo = this.getOffsetForIndex(index, align);
						if (!afterInfo) {
							console.warn("Failed to get offset for index:", index);
							return;
						}
						if (!approxEqual(afterInfo[0], currentOffset)) scheduleRetry(align);
					};
					if (this.isDynamicMode()) this.targetWindow.requestAnimationFrame(verify);
					else verify();
				});
			};
			const scheduleRetry = (align) => {
				if (!this.targetWindow) return;
				if (this.currentScrollToIndex !== index) return;
				attempts++;
				if (attempts < maxAttempts) this.targetWindow.requestAnimationFrame(() => tryScroll(align));
				else console.warn(`Failed to scroll to index ${index} after ${maxAttempts} attempts.`);
			};
			tryScroll(initialAlign);
		};
		this.scrollBy = (delta, { behavior } = {}) => {
			if (behavior === "smooth" && this.isDynamicMode()) console.warn("The `smooth` scroll behavior is not fully supported with dynamic size.");
			this._scrollToOffset(this.getScrollOffset() + delta, {
				adjustments: void 0,
				behavior
			});
		};
		this.getTotalSize = () => {
			var _a;
			const measurements = this.getMeasurements();
			let end;
			if (measurements.length === 0) end = this.options.paddingStart;
			else if (this.options.lanes === 1) end = ((_a = measurements[measurements.length - 1]) == null ? void 0 : _a.end) ?? 0;
			else {
				const endByLane = Array(this.options.lanes).fill(null);
				let endIndex = measurements.length - 1;
				while (endIndex >= 0 && endByLane.some((val) => val === null)) {
					const item = measurements[endIndex];
					if (endByLane[item.lane] === null) endByLane[item.lane] = item.end;
					endIndex--;
				}
				end = Math.max(...endByLane.filter((val) => val !== null));
			}
			return Math.max(end - this.options.scrollMargin + this.options.paddingEnd, 0);
		};
		this._scrollToOffset = (offset, { adjustments, behavior }) => {
			this.options.scrollToFn(offset, {
				behavior,
				adjustments
			}, this);
		};
		this.measure = () => {
			this.itemSizeCache = /* @__PURE__ */ new Map();
			this.laneAssignments = /* @__PURE__ */ new Map();
			this.notify(false);
		};
		this.setOptions(opts);
	}
};
var findNearestBinarySearch = (low, high, getCurrentValue, value) => {
	while (low <= high) {
		const middle = (low + high) / 2 | 0;
		const currentValue = getCurrentValue(middle);
		if (currentValue < value) low = middle + 1;
		else if (currentValue > value) high = middle - 1;
		else return middle;
	}
	if (low > 0) return low - 1;
	else return 0;
};
function calculateRange({ measurements, outerSize, scrollOffset, lanes }) {
	const lastIndex = measurements.length - 1;
	const getOffset = (index) => measurements[index].start;
	if (measurements.length <= lanes) return {
		startIndex: 0,
		endIndex: lastIndex
	};
	let startIndex = findNearestBinarySearch(0, lastIndex, getOffset, scrollOffset);
	let endIndex = startIndex;
	if (lanes === 1) while (endIndex < lastIndex && measurements[endIndex].end < scrollOffset + outerSize) endIndex++;
	else if (lanes > 1) {
		const endPerLane = Array(lanes).fill(0);
		while (endIndex < lastIndex && endPerLane.some((pos) => pos < scrollOffset + outerSize)) {
			const item = measurements[endIndex];
			endPerLane[item.lane] = item.end;
			endIndex++;
		}
		const startPerLane = Array(lanes).fill(scrollOffset + outerSize);
		while (startIndex >= 0 && startPerLane.some((pos) => pos >= scrollOffset)) {
			const item = measurements[startIndex];
			startPerLane[item.lane] = item.start;
			startIndex--;
		}
		startIndex = Math.max(0, startIndex - startIndex % lanes);
		endIndex = Math.min(lastIndex, endIndex + (lanes - 1 - endIndex % lanes));
	}
	return {
		startIndex,
		endIndex
	};
}
function useVirtualizerBase(options) {
	const virtualizer = new Virtualizer(unref(options));
	const state = shallowRef(virtualizer);
	const cleanup = virtualizer._didMount();
	watch(() => unref(options).getScrollElement(), (el) => {
		if (el) virtualizer._willUpdate();
	}, { immediate: true });
	watch(() => unref(options), (options2) => {
		virtualizer.setOptions({
			...options2,
			onChange: (instance, sync) => {
				var _a;
				triggerRef(state);
				(_a = options2.onChange) == null || _a.call(options2, instance, sync);
			}
		});
		virtualizer._willUpdate();
		triggerRef(state);
	}, { immediate: true });
	onScopeDispose(cleanup);
	return state;
}
function useVirtualizer(options) {
	return useVirtualizerBase(computed(() => ({
		observeElementRect,
		observeElementOffset,
		scrollToFn: elementScroll,
		...unref(options)
	})));
}
var [injectComboboxRootContext, provideComboboxRootContext] = createContext("ComboboxRoot");
var ComboboxRoot_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxRoot",
	props: {
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			required: false
		},
		resetSearchTermOnBlur: {
			type: Boolean,
			required: false,
			default: true
		},
		resetSearchTermOnSelect: {
			type: Boolean,
			required: false,
			default: true
		},
		openOnFocus: {
			type: Boolean,
			required: false,
			default: false
		},
		openOnClick: {
			type: Boolean,
			required: false,
			default: false
		},
		ignoreFilter: {
			type: Boolean,
			required: false
		},
		resetModelValueOnClear: {
			type: Boolean,
			required: false,
			default: false
		},
		modelValue: {
			type: null,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false
		},
		dir: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		highlightOnHover: {
			type: Boolean,
			required: false,
			default: true
		},
		by: {
			type: [String, Function],
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"update:modelValue",
		"highlight",
		"update:open"
	],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
		const { multiple, disabled, ignoreFilter, resetSearchTermOnSelect, openOnFocus, openOnClick, dir: propDir, resetModelValueOnClear, highlightOnHover } = toRefs$1(props);
		const dir = useDirection(propDir);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
			passive: props.modelValue === void 0,
			deep: true
		});
		const open = useVModel(props, "open", emits, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		async function onOpenChange(val) {
			open.value = val;
			filterSearch.value = "";
			if (val) {
				await nextTick();
				primitiveElement.value?.highlightSelected();
				isUserInputted.value = true;
				inputElement.value?.focus();
			} else {
				isUserInputted.value = false;
				setTimeout(() => {
					if (!val && props.resetSearchTermOnBlur) resetSearchTerm.trigger();
				}, 1);
			}
		}
		const resetSearchTerm = createEventHook();
		const isUserInputted = ref(false);
		const isVirtual = ref(false);
		const inputElement = ref();
		const triggerElement = ref();
		const highlightedElement = computed(() => primitiveElement.value?.highlightedElement ?? void 0);
		const allItems = ref(/* @__PURE__ */ new Map());
		const allGroups = ref(/* @__PURE__ */ new Map());
		const { contains } = useFilter({ sensitivity: "base" });
		const filterSearch = ref("");
		const filterState = computed((oldValue) => {
			if (!filterSearch.value || props.ignoreFilter || isVirtual.value) return {
				count: allItems.value.size,
				items: oldValue?.items ?? /* @__PURE__ */ new Map(),
				groups: oldValue?.groups ?? new Set(allGroups.value.keys())
			};
			let itemCount = 0;
			const filteredItems = /* @__PURE__ */ new Map();
			const filteredGroups = /* @__PURE__ */ new Set();
			for (const [id, value] of allItems.value) {
				const score = contains(value, filterSearch.value);
				filteredItems.set(id, score ? 1 : 0);
				if (score) itemCount++;
			}
			for (const [groupId, group] of allGroups.value) for (const itemId of group) if (filteredItems.get(itemId) > 0) {
				filteredGroups.add(groupId);
				break;
			}
			return {
				count: itemCount,
				items: filteredItems,
				groups: filteredGroups
			};
		});
		const inst = getCurrentInstance();
		onMounted(() => {
			if (inst?.exposed) {
				inst.exposed.highlightItem = primitiveElement.value?.highlightItem;
				inst.exposed.highlightFirstItem = primitiveElement.value?.highlightFirstItem;
				inst.exposed.highlightSelected = primitiveElement.value?.highlightSelected;
			}
		});
		__expose({
			filtered: filterState,
			highlightedElement,
			highlightItem: primitiveElement.value?.highlightItem,
			highlightFirstItem: primitiveElement.value?.highlightFirstItem,
			highlightSelected: primitiveElement.value?.highlightSelected
		});
		provideComboboxRootContext({
			modelValue,
			multiple,
			disabled,
			open,
			onOpenChange,
			contentId: "",
			isUserInputted,
			isVirtual,
			inputElement,
			highlightedElement,
			onInputElementChange: (val) => inputElement.value = val,
			triggerElement,
			onTriggerElementChange: (val) => triggerElement.value = val,
			parentElement,
			resetSearchTermOnSelect,
			onResetSearchTerm: resetSearchTerm.on,
			allItems,
			allGroups,
			filterSearch,
			filterState,
			ignoreFilter,
			openOnFocus,
			openOnClick,
			resetModelValueOnClear
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperRoot_default), null, {
				default: withCtx(() => [createVNode(unref(ListboxRoot_default), mergeProps({
					ref_key: "primitiveElement",
					ref: primitiveElement
				}, _ctx.$attrs, {
					modelValue: unref(modelValue),
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(modelValue) ? modelValue.value = $event : null),
					style: { pointerEvents: unref(open) ? "auto" : void 0 },
					as: _ctx.as,
					"as-child": _ctx.asChild,
					dir: unref(dir),
					multiple: unref(multiple),
					name: _ctx.name,
					required: _ctx.required,
					disabled: unref(disabled),
					"highlight-on-hover": unref(highlightOnHover),
					by: props.by,
					onHighlight: _cache[1] || (_cache[1] = ($event) => emits("highlight", $event))
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
						open: unref(open),
						modelValue: unref(modelValue)
					})]),
					_: 3
				}, 16, [
					"modelValue",
					"style",
					"as",
					"as-child",
					"dir",
					"multiple",
					"name",
					"required",
					"disabled",
					"highlight-on-hover",
					"by"
				])]),
				_: 3
			});
		};
	}
});
var ComboboxInput_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxInput",
	props: {
		displayValue: {
			type: Function,
			required: false
		},
		modelValue: {
			type: String,
			required: false
		},
		autoFocus: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "input"
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectComboboxRootContext();
		const listboxContext = injectListboxRootContext();
		const { primitiveElement, currentElement } = usePrimitiveElement();
		const modelValue = useVModel(props, "modelValue", emits, { passive: props.modelValue === void 0 });
		onMounted(() => {
			if (currentElement.value) rootContext.onInputElementChange(currentElement.value);
		});
		function handleKeyDown(ev) {
			if (!rootContext.open.value) rootContext.onOpenChange(true);
		}
		function handleInput(event) {
			const target = event.target;
			if (!rootContext.open.value) {
				rootContext.onOpenChange(true);
				nextTick(() => {
					if (target.value) {
						rootContext.filterSearch.value = target.value;
						listboxContext.highlightFirstItem();
					}
				});
			} else rootContext.filterSearch.value = target.value;
		}
		function handleFocus() {
			if (rootContext.openOnFocus.value && !rootContext.open.value) rootContext.onOpenChange(true);
		}
		function handleClick() {
			if (rootContext.openOnClick.value && !rootContext.open.value) rootContext.onOpenChange(true);
		}
		function resetSearchTerm() {
			const rootModelValue = rootContext.modelValue.value;
			if (props.displayValue) modelValue.value = props.displayValue(rootModelValue);
			else if (!rootContext.multiple.value && rootModelValue && !Array.isArray(rootModelValue)) if (typeof rootModelValue !== "object") modelValue.value = rootModelValue.toString();
			else modelValue.value = "";
			else modelValue.value = "";
			nextTick(() => {
				modelValue.value = modelValue.value;
			});
		}
		rootContext.onResetSearchTerm(() => {
			resetSearchTerm();
		});
		watch(rootContext.modelValue, async () => {
			if (!rootContext.isUserInputted.value && rootContext.resetSearchTermOnSelect.value) resetSearchTerm();
		}, {
			immediate: true,
			deep: true
		});
		watch(rootContext.filterState, (_newValue, oldValue) => {
			if (!rootContext.isVirtual.value && oldValue.count === 0) listboxContext.highlightFirstItem();
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ListboxFilter_default), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				modelValue: unref(modelValue),
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(modelValue) ? modelValue.value = $event : null),
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"auto-focus": _ctx.autoFocus,
				disabled: _ctx.disabled,
				"aria-expanded": unref(rootContext).open.value,
				"aria-controls": unref(rootContext).contentId,
				"aria-autocomplete": "list",
				role: "combobox",
				autocomplete: "off",
				onClick: handleClick,
				onInput: handleInput,
				onKeydown: withKeys(withModifiers(handleKeyDown, ["prevent"]), ["down", "up"]),
				onFocus: handleFocus
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"modelValue",
				"as",
				"as-child",
				"auto-focus",
				"disabled",
				"aria-expanded",
				"aria-controls",
				"onKeydown"
			]);
		};
	}
});
function useNonce(nonce) {
	const context = injectConfigProviderContext({ nonce: ref() });
	return computed(() => nonce?.value || context.nonce?.value);
}
var MenuAnchor_default = /* @__PURE__ */ defineComponent({
	__name: "MenuAnchor",
	props: {
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperAnchor_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
function useIsUsingKeyboardImpl() {
	const isUsingKeyboard = ref(false);
	onMounted(() => {
		useEventListener("keydown", () => {
			isUsingKeyboard.value = true;
		}, {
			capture: true,
			passive: true
		});
		useEventListener(["pointerdown", "pointermove"], () => {
			isUsingKeyboard.value = false;
		}, {
			capture: true,
			passive: true
		});
	});
	return isUsingKeyboard;
}
var useIsUsingKeyboard = createSharedComposable(useIsUsingKeyboardImpl);
var [injectMenuContext, provideMenuContext] = createContext(["MenuRoot", "MenuSub"], "MenuContext");
var [injectMenuRootContext, provideMenuRootContext] = createContext("MenuRoot");
var MenuRoot_default = /* @__PURE__ */ defineComponent({
	__name: "MenuRoot",
	props: {
		open: {
			type: Boolean,
			required: false,
			default: false
		},
		dir: {
			type: String,
			required: false
		},
		modal: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { modal, dir: propDir } = toRefs$1(props);
		const dir = useDirection(propDir);
		const open = useVModel(props, "open", emits);
		const content = ref();
		const isUsingKeyboardRef = useIsUsingKeyboard();
		provideMenuContext({
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			content,
			onContentChange: (element) => {
				content.value = element;
			}
		});
		provideMenuRootContext({
			onClose: () => {
				open.value = false;
			},
			isUsingKeyboardRef,
			dir,
			modal
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperRoot_default), null, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			});
		};
	}
});
var [injectMenuContentContext, provideMenuContentContext] = createContext("MenuContent");
var MenuContentImpl_default = /* @__PURE__ */ defineComponent({
	__name: "MenuContentImpl",
	props: /* @__PURE__ */ mergeDefaults({
		loop: {
			type: Boolean,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		},
		disableOutsideScroll: {
			type: Boolean,
			required: false
		},
		trapFocus: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	}, { ...PopperContentPropsDefaultValue }),
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus",
		"dismiss"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const menuContext = injectMenuContext();
		const rootContext = injectMenuRootContext();
		const { trapFocus, disableOutsidePointerEvents, loop } = toRefs$1(props);
		useFocusGuards();
		useBodyScrollLock(disableOutsidePointerEvents.value);
		const searchRef = ref("");
		const timerRef = ref(0);
		const pointerGraceTimerRef = ref(0);
		const pointerGraceIntentRef = ref(null);
		const pointerDirRef = ref("right");
		const lastPointerXRef = ref(0);
		const currentItemId = ref(null);
		const rovingFocusGroupRef = ref();
		const { forwardRef, currentElement: contentElement } = useForwardExpose();
		const { handleTypeaheadSearch } = useTypeahead();
		watch(contentElement, (el) => {
			menuContext.onContentChange(el);
		});
		onUnmounted(() => {
			window.clearTimeout(timerRef.value);
		});
		function isPointerMovingToSubmenu(event) {
			return pointerDirRef.value === pointerGraceIntentRef.value?.side && isPointerInGraceArea(event, pointerGraceIntentRef.value?.area);
		}
		async function handleMountAutoFocus(event) {
			emits("openAutoFocus", event);
			if (event.defaultPrevented) return;
			event.preventDefault();
			contentElement.value?.focus({ preventScroll: true });
		}
		function handleKeyDown(event) {
			if (event.defaultPrevented) return;
			const isKeyDownInside = event.target.closest("[data-reka-menu-content]") === event.currentTarget;
			const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
			const isCharacterKey = event.key.length === 1;
			const el = useArrowNavigation(event, getActiveElement(), contentElement.value, {
				loop: loop.value,
				arrowKeyOptions: "vertical",
				dir: rootContext?.dir.value,
				focus: true,
				attributeName: "[data-reka-collection-item]:not([data-disabled])"
			});
			if (el) return el?.focus();
			if (event.code === "Space") return;
			const collectionItems = rovingFocusGroupRef.value?.getItems() ?? [];
			if (isKeyDownInside) {
				if (event.key === "Tab") event.preventDefault();
				if (!isModifierKey && isCharacterKey) handleTypeaheadSearch(event.key, collectionItems);
			}
			if (event.target !== contentElement.value) return;
			if (!FIRST_LAST_KEYS.includes(event.key)) return;
			event.preventDefault();
			const candidateNodes = [...collectionItems.map((item) => item.ref)];
			if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
			focusFirst$1(candidateNodes);
		}
		function handleBlur(event) {
			if (!event?.currentTarget?.contains?.(event.target)) {
				window.clearTimeout(timerRef.value);
				searchRef.value = "";
			}
		}
		function handlePointerMove(event) {
			if (!isMouseEvent(event)) return;
			const target = event.target;
			const pointerXHasChanged = lastPointerXRef.value !== event.clientX;
			if ((event?.currentTarget)?.contains(target) && pointerXHasChanged) {
				pointerDirRef.value = event.clientX > lastPointerXRef.value ? "right" : "left";
				lastPointerXRef.value = event.clientX;
			}
		}
		provideMenuContentContext({
			onItemEnter: (event) => {
				if (isPointerMovingToSubmenu(event)) return true;
				else return false;
			},
			onItemLeave: (event) => {
				if (isPointerMovingToSubmenu(event)) return;
				contentElement.value?.focus();
				currentItemId.value = null;
			},
			onTriggerLeave: (event) => {
				if (isPointerMovingToSubmenu(event)) return true;
				else return false;
			},
			searchRef,
			pointerGraceTimerRef,
			onPointerGraceIntentChange: (intent) => {
				pointerGraceIntentRef.value = intent;
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(FocusScope_default), {
				"as-child": "",
				trapped: unref(trapFocus),
				onMountAutoFocus: handleMountAutoFocus,
				onUnmountAutoFocus: _cache[7] || (_cache[7] = ($event) => emits("closeAutoFocus", $event))
			}, {
				default: withCtx(() => [createVNode(unref(DismissableLayer_default), {
					"as-child": "",
					"disable-outside-pointer-events": unref(disableOutsidePointerEvents),
					onEscapeKeyDown: _cache[2] || (_cache[2] = ($event) => emits("escapeKeyDown", $event)),
					onPointerDownOutside: _cache[3] || (_cache[3] = ($event) => emits("pointerDownOutside", $event)),
					onFocusOutside: _cache[4] || (_cache[4] = ($event) => emits("focusOutside", $event)),
					onInteractOutside: _cache[5] || (_cache[5] = ($event) => emits("interactOutside", $event)),
					onDismiss: _cache[6] || (_cache[6] = ($event) => emits("dismiss"))
				}, {
					default: withCtx(() => [createVNode(unref(RovingFocusGroup_default), {
						ref_key: "rovingFocusGroupRef",
						ref: rovingFocusGroupRef,
						"current-tab-stop-id": currentItemId.value,
						"onUpdate:currentTabStopId": _cache[0] || (_cache[0] = ($event) => currentItemId.value = $event),
						"as-child": "",
						orientation: "vertical",
						dir: unref(rootContext).dir.value,
						loop: unref(loop),
						onEntryFocus: _cache[1] || (_cache[1] = (event) => {
							emits("entryFocus", event);
							if (!unref(rootContext).isUsingKeyboardRef.value) event.preventDefault();
						})
					}, {
						default: withCtx(() => [createVNode(unref(PopperContent_default), {
							ref: unref(forwardRef),
							role: "menu",
							as: _ctx.as,
							"as-child": _ctx.asChild,
							"aria-orientation": "vertical",
							"data-reka-menu-content": "",
							"data-state": unref(getOpenState)(unref(menuContext).open.value),
							dir: unref(rootContext).dir.value,
							side: _ctx.side,
							"side-offset": _ctx.sideOffset,
							align: _ctx.align,
							"align-offset": _ctx.alignOffset,
							"avoid-collisions": _ctx.avoidCollisions,
							"collision-boundary": _ctx.collisionBoundary,
							"collision-padding": _ctx.collisionPadding,
							"arrow-padding": _ctx.arrowPadding,
							"prioritize-position": _ctx.prioritizePosition,
							"position-strategy": _ctx.positionStrategy,
							"update-position-strategy": _ctx.updatePositionStrategy,
							sticky: _ctx.sticky,
							"hide-when-detached": _ctx.hideWhenDetached,
							reference: _ctx.reference,
							onKeydown: handleKeyDown,
							onBlur: handleBlur,
							onPointermove: handlePointerMove
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
							_: 3
						}, 8, [
							"as",
							"as-child",
							"data-state",
							"dir",
							"side",
							"side-offset",
							"align",
							"align-offset",
							"avoid-collisions",
							"collision-boundary",
							"collision-padding",
							"arrow-padding",
							"prioritize-position",
							"position-strategy",
							"update-position-strategy",
							"sticky",
							"hide-when-detached",
							"reference"
						])]),
						_: 3
					}, 8, [
						"current-tab-stop-id",
						"dir",
						"loop"
					])]),
					_: 3
				}, 8, ["disable-outside-pointer-events"])]),
				_: 3
			}, 8, ["trapped"]);
		};
	}
});
var MenuItemImpl_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "MenuItemImpl",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const contentContext = injectMenuContentContext();
		const { forwardRef } = useForwardExpose();
		const { CollectionItem } = useCollection();
		const isFocused = ref(false);
		async function handlePointerMove(event) {
			if (event.defaultPrevented) return;
			if (!isMouseEvent(event)) return;
			if (props.disabled) contentContext.onItemLeave(event);
			else if (!contentContext.onItemEnter(event)) event.currentTarget?.focus({ preventScroll: true });
		}
		async function handlePointerLeave(event) {
			await nextTick();
			if (event.defaultPrevented) return;
			if (!isMouseEvent(event)) return;
			contentContext.onItemLeave(event);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionItem), { value: { textValue: _ctx.textValue } }, {
				default: withCtx(() => [createVNode(unref(Primitive), mergeProps({
					ref: unref(forwardRef),
					role: "menuitem",
					tabindex: "-1"
				}, _ctx.$attrs, {
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"aria-disabled": _ctx.disabled || void 0,
					"data-disabled": _ctx.disabled ? "" : void 0,
					"data-highlighted": isFocused.value ? "" : void 0,
					onPointermove: handlePointerMove,
					onPointerleave: handlePointerLeave,
					onFocus: _cache[0] || (_cache[0] = async (event) => {
						await nextTick();
						if (event.defaultPrevented || _ctx.disabled) return;
						isFocused.value = true;
					}),
					onBlur: _cache[1] || (_cache[1] = async (event) => {
						await nextTick();
						if (event.defaultPrevented) return;
						isFocused.value = false;
					})
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"as",
					"as-child",
					"aria-disabled",
					"data-disabled",
					"data-highlighted"
				])]),
				_: 3
			}, 8, ["value"]);
		};
	}
});
var MenuItem_default = /* @__PURE__ */ defineComponent({
	__name: "MenuItem",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectMenuRootContext();
		const contentContext = injectMenuContentContext();
		const isPointerDownRef = ref(false);
		async function handleSelect() {
			const menuItem = currentElement.value;
			if (!props.disabled && menuItem) {
				const itemSelectEvent = new CustomEvent(ITEM_SELECT, {
					bubbles: true,
					cancelable: true
				});
				emits("select", itemSelectEvent);
				await nextTick();
				if (itemSelectEvent.defaultPrevented) isPointerDownRef.value = false;
				else rootContext.onClose();
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuItemImpl_default, mergeProps(props, {
				ref: unref(forwardRef),
				onClick: handleSelect,
				onPointerdown: _cache[0] || (_cache[0] = () => {
					isPointerDownRef.value = true;
				}),
				onPointerup: _cache[1] || (_cache[1] = async (event) => {
					await nextTick();
					if (event.defaultPrevented) return;
					if (!isPointerDownRef.value) event.currentTarget?.click();
				}),
				onKeydown: _cache[2] || (_cache[2] = async (event) => {
					const isTypingAhead = unref(contentContext).searchRef.value !== "";
					if (_ctx.disabled || isTypingAhead && event.key === " ") return;
					if (unref(SELECTION_KEYS$1).includes(event.key)) {
						event.currentTarget.click();
						event.preventDefault();
					}
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
var [injectMenuItemIndicatorContext, provideMenuItemIndicatorContext] = createContext(["MenuCheckboxItem", "MenuRadioItem"], "MenuItemIndicatorContext");
var MenuItemIndicator_default = /* @__PURE__ */ defineComponent({
	__name: "MenuItemIndicator",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const indicatorContext = injectMenuItemIndicatorContext({ modelValue: ref(false) });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(isIndeterminate)(unref(indicatorContext).modelValue.value) || unref(indicatorContext).modelValue.value === true }, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"data-state": unref(getCheckedState)(unref(indicatorContext).modelValue.value)
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"as",
					"as-child",
					"data-state"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
var MenuCheckboxItem_default = /* @__PURE__ */ defineComponent({
	__name: "MenuCheckboxItem",
	props: {
		modelValue: {
			type: [Boolean, String],
			required: false,
			default: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["select", "update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardProps(reactiveOmit(props, ["modelValue"]));
		const modelValue = useVModel(props, "modelValue", emits);
		provideMenuItemIndicatorContext({ modelValue });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuItem_default, mergeProps({ role: "menuitemcheckbox" }, unref(forwarded), {
				"aria-checked": unref(isIndeterminate)(unref(modelValue)) ? "mixed" : unref(modelValue),
				"data-state": unref(getCheckedState)(unref(modelValue)),
				onSelect: _cache[0] || (_cache[0] = async (event) => {
					emits("select", event);
					if (unref(isIndeterminate)(unref(modelValue))) modelValue.value = true;
					else modelValue.value = !unref(modelValue);
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })]),
				_: 3
			}, 16, ["aria-checked", "data-state"]);
		};
	}
});
var MenuRootContentModal_default = /* @__PURE__ */ defineComponent({
	__name: "MenuRootContentModal",
	props: {
		loop: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(props, emits);
		const menuContext = injectMenuContext();
		const { forwardRef, currentElement } = useForwardExpose();
		useHideOthers(currentElement);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuContentImpl_default, mergeProps(unref(forwarded), {
				ref: unref(forwardRef),
				"trap-focus": unref(menuContext).open.value,
				"disable-outside-pointer-events": unref(menuContext).open.value,
				"disable-outside-scroll": true,
				onDismiss: _cache[0] || (_cache[0] = ($event) => unref(menuContext).onOpenChange(false)),
				onFocusOutside: _cache[1] || (_cache[1] = withModifiers(($event) => emits("focusOutside", $event), ["prevent"]))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus", "disable-outside-pointer-events"]);
		};
	}
});
var MenuRootContentNonModal_default = /* @__PURE__ */ defineComponent({
	__name: "MenuRootContentNonModal",
	props: {
		loop: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		const menuContext = injectMenuContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuContentImpl_default, mergeProps(unref(forwarded), {
				"trap-focus": false,
				"disable-outside-pointer-events": false,
				"disable-outside-scroll": false,
				onDismiss: _cache[0] || (_cache[0] = ($event) => unref(menuContext).onOpenChange(false))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
var MenuContent_default = /* @__PURE__ */ defineComponent({
	__name: "MenuContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		const menuContext = injectMenuContext();
		const rootContext = injectMenuRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(menuContext).open.value }, {
				default: withCtx(() => [unref(rootContext).modal.value ? (openBlock(), createBlock(MenuRootContentModal_default, normalizeProps(mergeProps({ key: 0 }, {
					..._ctx.$attrs,
					...unref(forwarded)
				})), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16)) : (openBlock(), createBlock(MenuRootContentNonModal_default, normalizeProps(mergeProps({ key: 1 }, {
					..._ctx.$attrs,
					...unref(forwarded)
				})), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16))]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
var MenuGroup_default = /* @__PURE__ */ defineComponent({
	__name: "MenuGroup",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps({ role: "group" }, props), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
var MenuPortal_default = /* @__PURE__ */ defineComponent({
	__name: "MenuPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Teleport_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
var [injectMenuRadioGroupContext, provideMenuRadioGroupContext] = createContext("MenuRadioGroup");
var MenuRadioGroup_default = /* @__PURE__ */ defineComponent({
	__name: "MenuRadioGroup",
	props: {
		modelValue: {
			type: null,
			required: false,
			default: ""
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardProps(reactiveOmit(props, ["modelValue"]));
		const modelValue = useVModel(props, "modelValue", emits);
		provideMenuRadioGroupContext({
			modelValue,
			onValueChange: (payload) => {
				modelValue.value = payload;
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuGroup_default, normalizeProps(guardReactiveProps(unref(forwarded))), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })]),
				_: 3
			}, 16);
		};
	}
});
var MenuRadioItem_default = /* @__PURE__ */ defineComponent({
	__name: "MenuRadioItem",
	props: {
		value: {
			type: null,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardProps(reactiveOmit(props, ["value"]));
		const { value } = toRefs$1(props);
		const radioGroupContext = injectMenuRadioGroupContext();
		const modelValue = computed(() => radioGroupContext.modelValue.value === value?.value);
		provideMenuItemIndicatorContext({ modelValue });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuItem_default, mergeProps({ role: "menuitemradio" }, unref(forwarded), {
				"aria-checked": modelValue.value,
				"data-state": unref(getCheckedState)(modelValue.value),
				onSelect: _cache[0] || (_cache[0] = async (event) => {
					emits("select", event);
					unref(radioGroupContext).onValueChange(unref(value));
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["aria-checked", "data-state"]);
		};
	}
});
var MenuSeparator_default = /* @__PURE__ */ defineComponent({
	__name: "MenuSeparator",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				role: "separator",
				"aria-orientation": "horizontal"
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
var [injectContextMenuRootContext, provideContextMenuRootContext] = createContext("ContextMenuRoot");
var ContextMenuRoot_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "ContextMenuRoot",
	props: {
		pressOpenDelay: {
			type: Number,
			required: false,
			default: 700
		},
		dir: {
			type: String,
			required: false
		},
		modal: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { dir: propDir, modal, pressOpenDelay } = toRefs$1(props);
		useForwardExpose();
		const dir = useDirection(propDir);
		const open = ref(false);
		provideContextMenuRootContext({
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			dir,
			modal,
			triggerElement: ref(),
			pressOpenDelay
		});
		watch(open, (value) => {
			emits("update:open", value);
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuRoot_default), {
				open: open.value,
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => open.value = $event),
				dir: unref(dir),
				modal: unref(modal)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"open",
				"dir",
				"modal"
			]);
		};
	}
});
var ContextMenuContent_default = /* @__PURE__ */ defineComponent({
	__name: "ContextMenuContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
			type: Boolean,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false,
			default: 0
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false,
			default: true
		},
		collisionBoundary: {
			type: null,
			required: false,
			default: () => []
		},
		collisionPadding: {
			type: [Number, Object],
			required: false,
			default: 0
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false,
			default: "partial"
		},
		hideWhenDetached: {
			type: Boolean,
			required: false,
			default: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		useForwardExpose();
		const rootContext = injectContextMenuRootContext();
		const hasInteractedOutside = ref(false);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuContent_default), mergeProps(unref(forwarded), {
				side: "right",
				"side-offset": 2,
				align: "start",
				"update-position-strategy": "always",
				style: {
					"--reka-context-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
					"--reka-context-menu-content-available-width": "var(--reka-popper-available-width)",
					"--reka-context-menu-content-available-height": "var(--reka-popper-available-height)",
					"--reka-context-menu-trigger-width": "var(--reka-popper-anchor-width)",
					"--reka-context-menu-trigger-height": "var(--reka-popper-anchor-height)"
				},
				onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
					if (!event.defaultPrevented && hasInteractedOutside.value) event.preventDefault();
					hasInteractedOutside.value = false;
				}),
				onInteractOutside: _cache[1] || (_cache[1] = (event) => {
					if (event.detail.originalEvent.button === 2 && event.target === unref(rootContext).triggerElement.value) event.preventDefault();
					if (!event.defaultPrevented && !unref(rootContext).modal.value) hasInteractedOutside.value = true;
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
var ContextMenuItem_default = /* @__PURE__ */ defineComponent({
	__name: "ContextMenuItem",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emitsAsProps = useEmitAsProps(__emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuItem_default), normalizeProps(guardReactiveProps({
				...props,
				...unref(emitsAsProps)
			})), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
var ContextMenuPortal_default = /* @__PURE__ */ defineComponent({
	__name: "ContextMenuPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuPortal_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
var ContextMenuSeparator_default = /* @__PURE__ */ defineComponent({
	__name: "ContextMenuSeparator",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuSeparator_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
function isTouchOrPen(event) {
	return event.pointerType !== "mouse";
}
var ContextMenuTrigger_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "ContextMenuTrigger",
	props: {
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const { disabled } = toRefs$1(__props);
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectContextMenuRootContext();
		const point = ref({
			x: 0,
			y: 0
		});
		const virtualEl = computed(() => ({ getBoundingClientRect: () => ({
			width: 0,
			height: 0,
			left: point.value.x,
			right: point.value.x,
			top: point.value.y,
			bottom: point.value.y,
			...point.value
		}) }));
		const longPressTimer = ref(0);
		function clearLongPress() {
			window.clearTimeout(longPressTimer.value);
		}
		function handleOpen(event) {
			point.value = {
				x: event.clientX,
				y: event.clientY
			};
			rootContext.onOpenChange(true);
		}
		async function handleContextMenu(event) {
			if (!disabled.value) {
				await nextTick();
				if (!event.defaultPrevented) {
					clearLongPress();
					handleOpen(event);
					event.preventDefault();
				}
			}
		}
		async function handlePointerDown(event) {
			if (!disabled.value) {
				await nextTick();
				if (isTouchOrPen(event) && !event.defaultPrevented) {
					clearLongPress();
					longPressTimer.value = window.setTimeout(() => handleOpen(event), rootContext.pressOpenDelay.value);
				}
			}
		}
		async function handlePointerEvent(event) {
			if (!disabled.value) {
				await nextTick();
				if (isTouchOrPen(event) && !event.defaultPrevented) clearLongPress();
			}
		}
		onMounted(() => {
			if (currentElement.value) rootContext.triggerElement.value = currentElement.value;
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(MenuAnchor_default), {
				as: "template",
				reference: virtualEl.value
			}, null, 8, ["reference"]), createVNode(unref(Primitive), mergeProps({
				ref: unref(forwardRef),
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"data-state": unref(rootContext).open.value ? "open" : "closed",
				"data-disabled": unref(disabled) ? "" : void 0,
				style: {
					WebkitTouchCallout: "none",
					pointerEvents: "auto"
				}
			}, _ctx.$attrs, {
				onContextmenu: handleContextMenu,
				onPointerdown: handlePointerDown,
				onPointermove: handlePointerEvent,
				onPointercancel: handlePointerEvent,
				onPointerup: handlePointerEvent
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"as",
				"as-child",
				"data-state",
				"data-disabled"
			])], 64);
		};
	}
});
var [injectPopoverRootContext, providePopoverRootContext] = createContext("PopoverRoot");
var PopoverRoot_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: false,
			default: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		modal: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { modal } = toRefs$1(props);
		const open = useVModel(props, "open", emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		providePopoverRootContext({
			contentId: "",
			triggerId: "",
			modal,
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			onOpenToggle: () => {
				open.value = !open.value;
			},
			triggerElement: ref(),
			hasCustomAnchor: ref(false)
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperRoot_default), null, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					open: unref(open),
					close: () => open.value = false
				})]),
				_: 3
			});
		};
	}
});
var PopoverArrow_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverArrow",
	props: {
		width: {
			type: Number,
			required: false,
			default: 10
		},
		height: {
			type: Number,
			required: false,
			default: 5
		},
		rounded: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "svg"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperArrow_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
var PopoverClose_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverClose",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		const rootContext = injectPopoverRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				type: _ctx.as === "button" ? "button" : void 0,
				as: _ctx.as,
				"as-child": props.asChild,
				onClick: _cache[0] || (_cache[0] = ($event) => unref(rootContext).onOpenChange(false))
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"type",
				"as",
				"as-child"
			]);
		};
	}
});
var PopoverContentImpl_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverContentImpl",
	props: {
		trapFocus: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardProps(reactiveOmit(props, "trapFocus", "disableOutsidePointerEvents"));
		const { forwardRef } = useForwardExpose();
		const rootContext = injectPopoverRootContext();
		useFocusGuards();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(FocusScope_default), {
				"as-child": "",
				loop: "",
				trapped: _ctx.trapFocus,
				onMountAutoFocus: _cache[5] || (_cache[5] = ($event) => emits("openAutoFocus", $event)),
				onUnmountAutoFocus: _cache[6] || (_cache[6] = ($event) => emits("closeAutoFocus", $event))
			}, {
				default: withCtx(() => [createVNode(unref(DismissableLayer_default), {
					"as-child": "",
					"disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
					onPointerDownOutside: _cache[0] || (_cache[0] = ($event) => emits("pointerDownOutside", $event)),
					onInteractOutside: _cache[1] || (_cache[1] = ($event) => emits("interactOutside", $event)),
					onEscapeKeyDown: _cache[2] || (_cache[2] = ($event) => emits("escapeKeyDown", $event)),
					onFocusOutside: _cache[3] || (_cache[3] = ($event) => emits("focusOutside", $event)),
					onDismiss: _cache[4] || (_cache[4] = ($event) => unref(rootContext).onOpenChange(false))
				}, {
					default: withCtx(() => [createVNode(unref(PopperContent_default), mergeProps(unref(forwarded), {
						id: unref(rootContext).contentId,
						ref: unref(forwardRef),
						"data-state": unref(rootContext).open.value ? "open" : "closed",
						"aria-labelledby": unref(rootContext).triggerId,
						style: {
							"--reka-popover-content-transform-origin": "var(--reka-popper-transform-origin)",
							"--reka-popover-content-available-width": "var(--reka-popper-available-width)",
							"--reka-popover-content-available-height": "var(--reka-popper-available-height)",
							"--reka-popover-trigger-width": "var(--reka-popper-anchor-width)",
							"--reka-popover-trigger-height": "var(--reka-popper-anchor-height)"
						},
						role: "dialog"
					}), {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
						_: 3
					}, 16, [
						"id",
						"data-state",
						"aria-labelledby"
					])]),
					_: 3
				}, 8, ["disable-outside-pointer-events"])]),
				_: 3
			}, 8, ["trapped"]);
		};
	}
});
var PopoverContentModal_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverContentModal",
	props: {
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectPopoverRootContext();
		const isRightClickOutsideRef = ref(false);
		useBodyScrollLock(true);
		const forwarded = useForwardPropsEmits(props, emits);
		const { forwardRef, currentElement } = useForwardExpose();
		useHideOthers(currentElement);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(PopoverContentImpl_default, mergeProps(unref(forwarded), {
				ref: unref(forwardRef),
				"trap-focus": unref(rootContext).open.value,
				"disable-outside-pointer-events": "",
				onCloseAutoFocus: _cache[0] || (_cache[0] = withModifiers((event) => {
					emits("closeAutoFocus", event);
					if (!isRightClickOutsideRef.value) unref(rootContext).triggerElement.value?.focus();
				}, ["prevent"])),
				onPointerDownOutside: _cache[1] || (_cache[1] = (event) => {
					emits("pointerDownOutside", event);
					const originalEvent = event.detail.originalEvent;
					const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
					isRightClickOutsideRef.value = originalEvent.button === 2 || ctrlLeftClick;
				}),
				onFocusOutside: _cache[2] || (_cache[2] = withModifiers(() => {}, ["prevent"]))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus"]);
		};
	}
});
var PopoverContentNonModal_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverContentNonModal",
	props: {
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectPopoverRootContext();
		const hasInteractedOutsideRef = ref(false);
		const hasPointerDownOutsideRef = ref(false);
		const forwarded = useForwardPropsEmits(props, emits);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(PopoverContentImpl_default, mergeProps(unref(forwarded), {
				"trap-focus": false,
				"disable-outside-pointer-events": false,
				onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
					emits("closeAutoFocus", event);
					if (!event.defaultPrevented) {
						if (!hasInteractedOutsideRef.value) unref(rootContext).triggerElement.value?.focus();
						event.preventDefault();
					}
					hasInteractedOutsideRef.value = false;
					hasPointerDownOutsideRef.value = false;
				}),
				onInteractOutside: _cache[1] || (_cache[1] = async (event) => {
					emits("interactOutside", event);
					if (!event.defaultPrevented) {
						hasInteractedOutsideRef.value = true;
						if (event.detail.originalEvent.type === "pointerdown") hasPointerDownOutsideRef.value = true;
					}
					const target = event.target;
					if (unref(rootContext).triggerElement.value?.contains(target)) event.preventDefault();
					if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.value) event.preventDefault();
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
var PopoverContent_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectPopoverRootContext();
		const forwarded = useForwardPropsEmits(props, emits);
		const { forwardRef } = useForwardExpose();
		rootContext.contentId ||= useId(void 0, "reka-popover-content");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(rootContext).open.value }, {
				default: withCtx(() => [unref(rootContext).modal.value ? (openBlock(), createBlock(PopoverContentModal_default, mergeProps({ key: 0 }, unref(forwarded), { ref: unref(forwardRef) }), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16)) : (openBlock(), createBlock(PopoverContentNonModal_default, mergeProps({ key: 1 }, unref(forwarded), { ref: unref(forwardRef) }), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16))]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
var PopoverPortal_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Teleport_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
var PopoverTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverTrigger",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectPopoverRootContext();
		const { forwardRef, currentElement: triggerElement } = useForwardExpose();
		rootContext.triggerId ||= useId(void 0, "reka-popover-trigger");
		onMounted(() => {
			rootContext.triggerElement.value = triggerElement.value;
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(unref(rootContext).hasCustomAnchor.value ? unref(Primitive) : unref(PopperAnchor_default)), { "as-child": "" }, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					id: unref(rootContext).triggerId,
					ref: unref(forwardRef),
					type: _ctx.as === "button" ? "button" : void 0,
					"aria-haspopup": "dialog",
					"aria-expanded": unref(rootContext).open.value,
					"aria-controls": unref(rootContext).contentId,
					"data-state": unref(rootContext).open.value ? "open" : "closed",
					as: _ctx.as,
					"as-child": props.asChild,
					onClick: unref(rootContext).onOpenToggle
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"id",
					"type",
					"aria-expanded",
					"aria-controls",
					"data-state",
					"as",
					"as-child",
					"onClick"
				])]),
				_: 3
			});
		};
	}
});
var DropdownMenuCheckboxItem_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuCheckboxItem",
	props: {
		modelValue: {
			type: [Boolean, String],
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["select", "update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emitsAsProps = useEmitAsProps(__emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuCheckboxItem_default), normalizeProps(guardReactiveProps({
				...props,
				...unref(emitsAsProps)
			})), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
var [injectDropdownMenuRootContext, provideDropdownMenuRootContext] = createContext("DropdownMenuRoot");
var DropdownMenuRoot_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		dir: {
			type: String,
			required: false
		},
		modal: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		useForwardExpose();
		const open = useVModel(props, "open", emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		const triggerElement = ref();
		const { modal, dir: propDir } = toRefs$1(props);
		const dir = useDirection(propDir);
		provideDropdownMenuRootContext({
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			onOpenToggle: () => {
				open.value = !open.value;
			},
			triggerId: "",
			triggerElement,
			contentId: "",
			modal,
			dir
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuRoot_default), {
				open: unref(open),
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => isRef(open) ? open.value = $event : null),
				dir: unref(dir),
				modal: unref(modal)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open: unref(open) })]),
				_: 3
			}, 8, [
				"open",
				"dir",
				"modal"
			]);
		};
	}
});
var DropdownMenuContent_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		useForwardExpose();
		const rootContext = injectDropdownMenuRootContext();
		const hasInteractedOutsideRef = ref(false);
		function handleCloseAutoFocus(event) {
			if (event.defaultPrevented) return;
			if (!hasInteractedOutsideRef.value) setTimeout(() => {
				rootContext.triggerElement.value?.focus();
			}, 0);
			hasInteractedOutsideRef.value = false;
			event.preventDefault();
		}
		rootContext.contentId ||= useId(void 0, "reka-dropdown-menu-content");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuContent_default), mergeProps(unref(forwarded), {
				id: unref(rootContext).contentId,
				"aria-labelledby": unref(rootContext)?.triggerId,
				style: {
					"--reka-dropdown-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
					"--reka-dropdown-menu-content-available-width": "var(--reka-popper-available-width)",
					"--reka-dropdown-menu-content-available-height": "var(--reka-popper-available-height)",
					"--reka-dropdown-menu-trigger-width": "var(--reka-popper-anchor-width)",
					"--reka-dropdown-menu-trigger-height": "var(--reka-popper-anchor-height)"
				},
				onCloseAutoFocus: handleCloseAutoFocus,
				onInteractOutside: _cache[0] || (_cache[0] = (event) => {
					if (event.defaultPrevented) return;
					const originalEvent = event.detail.originalEvent;
					const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
					const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
					if (!unref(rootContext).modal.value || isRightClick) hasInteractedOutsideRef.value = true;
					if (unref(rootContext).triggerElement.value?.contains(event.target)) event.preventDefault();
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id", "aria-labelledby"]);
		};
	}
});
var DropdownMenuItem_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuItem",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emitsAsProps = useEmitAsProps(__emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuItem_default), normalizeProps(guardReactiveProps({
				...props,
				...unref(emitsAsProps)
			})), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
var DropdownMenuItemIndicator_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuItemIndicator",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuItemIndicator_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
var DropdownMenuPortal_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuPortal_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
var DropdownMenuRadioGroup_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuRadioGroup",
	props: {
		modelValue: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emitsAsProps = useEmitAsProps(__emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuRadioGroup_default), normalizeProps(guardReactiveProps({
				...props,
				...unref(emitsAsProps)
			})), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
var DropdownMenuRadioItem_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuRadioItem",
	props: {
		value: {
			type: null,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuRadioItem_default), normalizeProps(guardReactiveProps(unref(forwarded))), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
var DropdownMenuSeparator_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuSeparator",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuSeparator_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
var DropdownMenuTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuTrigger",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectDropdownMenuRootContext();
		const { forwardRef, currentElement: triggerElement } = useForwardExpose();
		onMounted(() => {
			rootContext.triggerElement = triggerElement;
		});
		rootContext.triggerId ||= useId(void 0, "reka-dropdown-menu-trigger");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuAnchor_default), { "as-child": "" }, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					id: unref(rootContext).triggerId,
					ref: unref(forwardRef),
					type: _ctx.as === "button" ? "button" : void 0,
					"as-child": props.asChild,
					as: _ctx.as,
					"aria-haspopup": "menu",
					"aria-expanded": unref(rootContext).open.value,
					"aria-controls": unref(rootContext).open.value ? unref(rootContext).contentId : void 0,
					"data-disabled": _ctx.disabled ? "" : void 0,
					disabled: _ctx.disabled,
					"data-state": unref(rootContext).open.value ? "open" : "closed",
					onClick: _cache[0] || (_cache[0] = async (event) => {
						if (!_ctx.disabled && event.button === 0 && event.ctrlKey === false) {
							unref(rootContext)?.onOpenToggle();
							await nextTick();
							if (unref(rootContext).open.value) event.preventDefault();
						}
					}),
					onKeydown: _cache[1] || (_cache[1] = withKeys((event) => {
						if (_ctx.disabled) return;
						if (["Enter", " "].includes(event.key)) unref(rootContext).onOpenToggle();
						if (event.key === "ArrowDown") unref(rootContext).onOpenChange(true);
						if ([
							"Enter",
							" ",
							"ArrowDown"
						].includes(event.key)) event.preventDefault();
					}, [
						"enter",
						"space",
						"arrow-down"
					]))
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"id",
					"type",
					"as-child",
					"as",
					"aria-expanded",
					"aria-controls",
					"data-disabled",
					"disabled",
					"data-state"
				])]),
				_: 3
			});
		};
	}
});
var OPEN_KEYS = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
];
var SELECTION_KEYS = [" ", "Enter"];
function valueComparator(value, currentValue, comparator) {
	if (value === void 0) return false;
	else if (Array.isArray(value)) return value.some((val) => compare(val, currentValue, comparator));
	else return compare(value, currentValue, comparator);
}
function compare(value, currentValue, comparator) {
	if (value === void 0 || currentValue === void 0) return false;
	if (typeof value === "string") return value === currentValue;
	if (typeof comparator === "function") return comparator(value, currentValue);
	if (typeof comparator === "string") return value?.[comparator] === currentValue?.[comparator];
	return isEqual(value, currentValue);
}
function shouldShowPlaceholder(value) {
	return value === void 0 || value === null || value === "" || Array.isArray(value) && value.length === 0;
}
var _hoisted_1$1 = {
	key: 0,
	value: ""
};
var [injectSelectRootContext, provideSelectRootContext] = createContext("SelectRoot");
var SelectRoot_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SelectRoot",
	props: {
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		modelValue: {
			type: null,
			required: false,
			default: void 0
		},
		by: {
			type: [String, Function],
			required: false
		},
		dir: {
			type: String,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false
		},
		autocomplete: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: ["update:modelValue", "update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { required, disabled, multiple, dir: propDir } = toRefs$1(props);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
			passive: props.modelValue === void 0,
			deep: true
		});
		const open = useVModel(props, "open", emits, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		const triggerElement = ref();
		const valueElement = ref();
		const triggerPointerDownPosRef = ref({
			x: 0,
			y: 0
		});
		const isEmptyModelValue = computed(() => {
			if (multiple.value && Array.isArray(modelValue.value)) return modelValue.value?.length === 0;
			else return isNullish(modelValue.value);
		});
		useCollection({ isProvider: true });
		const dir = useDirection(propDir);
		const isFormControl = useFormControl(triggerElement);
		const optionsSet = ref(/* @__PURE__ */ new Set());
		const nativeSelectKey = computed(() => {
			return Array.from(optionsSet.value).map((option) => option.value).join(";");
		});
		function handleValueChange(value) {
			if (multiple.value) {
				const array = Array.isArray(modelValue.value) ? [...modelValue.value] : [];
				const index = array.findIndex((i) => compare(i, value, props.by));
				index === -1 ? array.push(value) : array.splice(index, 1);
				modelValue.value = [...array];
			} else modelValue.value = value;
		}
		function getOption(value) {
			return Array.from(optionsSet.value).find((option) => valueComparator(value, option.value, props.by));
		}
		provideSelectRootContext({
			triggerElement,
			onTriggerChange: (node) => {
				triggerElement.value = node;
			},
			valueElement,
			onValueElementChange: (node) => {
				valueElement.value = node;
			},
			contentId: "",
			modelValue,
			onValueChange: handleValueChange,
			by: props.by,
			open,
			multiple,
			required,
			onOpenChange: (value) => {
				open.value = value;
			},
			dir,
			triggerPointerDownPosRef,
			disabled,
			isEmptyModelValue,
			optionsSet,
			onOptionAdd: (option) => {
				const existingOption = getOption(option.value);
				if (existingOption) optionsSet.value.delete(existingOption);
				optionsSet.value.add(option);
			},
			onOptionRemove: (option) => {
				const existingOption = getOption(option.value);
				if (existingOption) optionsSet.value.delete(existingOption);
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperRoot_default), null, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					modelValue: unref(modelValue),
					open: unref(open)
				}), unref(isFormControl) ? (openBlock(), createBlock(BubbleSelect_default, {
					key: nativeSelectKey.value,
					"aria-hidden": "true",
					tabindex: "-1",
					multiple: unref(multiple),
					required: unref(required),
					name: _ctx.name,
					autocomplete: _ctx.autocomplete,
					disabled: unref(disabled),
					value: unref(modelValue)
				}, {
					default: withCtx(() => [unref(isNullish)(unref(modelValue)) ? (openBlock(), createElementBlock("option", _hoisted_1$1)) : createCommentVNode("v-if", true), (openBlock(true), createElementBlock(Fragment, null, renderList(Array.from(optionsSet.value), (option) => {
						return openBlock(), createElementBlock("option", mergeProps({ key: option.value ?? "" }, { ref_for: true }, option), null, 16);
					}), 128))]),
					_: 1
				}, 8, [
					"multiple",
					"required",
					"name",
					"autocomplete",
					"disabled",
					"value"
				])) : createCommentVNode("v-if", true)]),
				_: 3
			});
		};
	}
});
var BubbleSelect_default = /* @__PURE__ */ defineComponent({
	__name: "BubbleSelect",
	props: {
		autocomplete: {
			type: String,
			required: false
		},
		autofocus: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		form: {
			type: String,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		},
		size: {
			type: Number,
			required: false
		},
		value: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const selectElement = ref();
		const rootContext = injectSelectRootContext();
		watch(() => props.value, (cur, prev) => {
			const selectProto = window.HTMLSelectElement.prototype;
			const setValue = Object.getOwnPropertyDescriptor(selectProto, "value").set;
			if (cur !== prev && setValue && selectElement.value) {
				const event = new Event("change", { bubbles: true });
				setValue.call(selectElement.value, cur);
				selectElement.value.dispatchEvent(event);
			}
		});
		function handleInput(event) {
			rootContext.onValueChange(event.target.value);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(VisuallyHidden_default), { "as-child": "" }, {
				default: withCtx(() => [createBaseVNode("select", mergeProps({
					ref_key: "selectElement",
					ref: selectElement
				}, props, { onInput: handleInput }), [renderSlot(_ctx.$slots, "default")], 16)]),
				_: 3
			});
		};
	}
});
var SelectPopperPosition_default = /* @__PURE__ */ defineComponent({
	__name: "SelectPopperPosition",
	props: {
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false,
			default: "start"
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false,
			default: 10
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const forwarded = useForwardProps(__props);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperContent_default), mergeProps(unref(forwarded), { style: {
				"boxSizing": "border-box",
				"--reka-select-content-transform-origin": "var(--reka-popper-transform-origin)",
				"--reka-select-content-available-width": "var(--reka-popper-available-width)",
				"--reka-select-content-available-height": "var(--reka-popper-available-height)",
				"--reka-select-trigger-width": "var(--reka-popper-anchor-width)",
				"--reka-select-trigger-height": "var(--reka-popper-anchor-height)"
			} }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
var SelectContentDefaultContextValue = {
	onViewportChange: () => {},
	itemTextRefCallback: () => {},
	itemRefCallback: () => {}
};
var [injectSelectContentContext, provideSelectContentContext] = createContext("SelectContent");
var SelectContentImpl_default = /* @__PURE__ */ defineComponent({
	__name: "SelectContentImpl",
	props: {
		position: {
			type: String,
			required: false,
			default: "item-aligned"
		},
		bodyLock: {
			type: Boolean,
			required: false,
			default: true
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false,
			default: "start"
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: [
		"closeAutoFocus",
		"escapeKeyDown",
		"pointerDownOutside"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectSelectRootContext();
		useFocusGuards();
		useBodyScrollLock(props.bodyLock);
		const { CollectionSlot, getItems } = useCollection();
		const content = ref();
		useHideOthers(content);
		const { search, handleTypeaheadSearch } = useTypeahead();
		const viewport = ref();
		const selectedItem = ref();
		const selectedItemText = ref();
		const isPositioned = ref(false);
		const firstValidItemFoundRef = ref(false);
		const firstSelectedItemInArrayFoundRef = ref(false);
		function focusSelectedItem() {
			if (selectedItem.value && content.value) focusFirst$1([selectedItem.value, content.value]);
		}
		watch(isPositioned, () => {
			focusSelectedItem();
		});
		const { onOpenChange, triggerPointerDownPosRef } = rootContext;
		watchEffect((cleanupFn) => {
			if (!content.value) return;
			let pointerMoveDelta = {
				x: 0,
				y: 0
			};
			const handlePointerMove = (event) => {
				pointerMoveDelta = {
					x: Math.abs(Math.round(event.pageX) - (triggerPointerDownPosRef.value?.x ?? 0)),
					y: Math.abs(Math.round(event.pageY) - (triggerPointerDownPosRef.value?.y ?? 0))
				};
			};
			const handlePointerUp = (event) => {
				if (event.pointerType === "touch") return;
				if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) event.preventDefault();
				else if (!content.value?.contains(event.target)) onOpenChange(false);
				document.removeEventListener("pointermove", handlePointerMove);
				triggerPointerDownPosRef.value = null;
			};
			if (triggerPointerDownPosRef.value !== null) {
				document.addEventListener("pointermove", handlePointerMove);
				document.addEventListener("pointerup", handlePointerUp, {
					capture: true,
					once: true
				});
			}
			cleanupFn(() => {
				document.removeEventListener("pointermove", handlePointerMove);
				document.removeEventListener("pointerup", handlePointerUp, { capture: true });
			});
		});
		function handleKeyDown(event) {
			const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
			if (event.key === "Tab") event.preventDefault();
			if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key, getItems());
			if ([
				"ArrowUp",
				"ArrowDown",
				"Home",
				"End"
			].includes(event.key)) {
				let candidateNodes = [...getItems().map((i) => i.ref)];
				if (["ArrowUp", "End"].includes(event.key)) candidateNodes = candidateNodes.slice().reverse();
				if (["ArrowUp", "ArrowDown"].includes(event.key)) {
					const currentElement = event.target;
					const currentIndex = candidateNodes.indexOf(currentElement);
					candidateNodes = candidateNodes.slice(currentIndex + 1);
				}
				setTimeout(() => focusFirst$1(candidateNodes));
				event.preventDefault();
			}
		}
		const forwardedProps = useForwardProps(computed(() => {
			if (props.position === "popper") return props;
			else return {};
		}).value);
		provideSelectContentContext({
			content,
			viewport,
			onViewportChange: (node) => {
				viewport.value = node;
			},
			itemRefCallback: (node, value, disabled) => {
				const isFirstValidItem = !firstValidItemFoundRef.value && !disabled;
				const isSelectedItem = valueComparator(rootContext.modelValue.value, value, rootContext.by);
				if (rootContext.multiple.value) {
					if (firstSelectedItemInArrayFoundRef.value) return;
					if (isSelectedItem || isFirstValidItem) {
						selectedItem.value = node;
						if (isSelectedItem) firstSelectedItemInArrayFoundRef.value = true;
					}
				} else if (isSelectedItem || isFirstValidItem) selectedItem.value = node;
				if (isFirstValidItem) firstValidItemFoundRef.value = true;
			},
			selectedItem,
			selectedItemText,
			onItemLeave: () => {
				content.value?.focus();
			},
			itemTextRefCallback: (node, value, disabled) => {
				const isFirstValidItem = !firstValidItemFoundRef.value && !disabled;
				if (valueComparator(rootContext.modelValue.value, value, rootContext.by) || isFirstValidItem) selectedItemText.value = node;
			},
			focusSelectedItem,
			position: props.position,
			isPositioned,
			searchRef: search
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionSlot), null, {
				default: withCtx(() => [createVNode(unref(FocusScope_default), {
					"as-child": "",
					onMountAutoFocus: _cache[6] || (_cache[6] = withModifiers(() => {}, ["prevent"])),
					onUnmountAutoFocus: _cache[7] || (_cache[7] = (event) => {
						emits("closeAutoFocus", event);
						if (event.defaultPrevented) return;
						unref(rootContext).triggerElement.value?.focus({ preventScroll: true });
						event.preventDefault();
					})
				}, {
					default: withCtx(() => [createVNode(unref(DismissableLayer_default), {
						"as-child": "",
						"disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
						onFocusOutside: _cache[2] || (_cache[2] = withModifiers(() => {}, ["prevent"])),
						onDismiss: _cache[3] || (_cache[3] = ($event) => unref(rootContext).onOpenChange(false)),
						onEscapeKeyDown: _cache[4] || (_cache[4] = ($event) => emits("escapeKeyDown", $event)),
						onPointerDownOutside: _cache[5] || (_cache[5] = ($event) => emits("pointerDownOutside", $event))
					}, {
						default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(_ctx.position === "popper" ? SelectPopperPosition_default : SelectItemAlignedPosition_default), mergeProps({
							..._ctx.$attrs,
							...unref(forwardedProps)
						}, {
							id: unref(rootContext).contentId,
							ref: (vnode) => {
								const el = unref(unrefElement)(vnode);
								if (el?.hasAttribute("data-reka-popper-content-wrapper")) content.value = el.firstElementChild;
								else content.value = el;
							},
							role: "listbox",
							"data-state": unref(rootContext).open.value ? "open" : "closed",
							dir: unref(rootContext).dir.value,
							style: {
								display: "flex",
								flexDirection: "column",
								outline: "none"
							},
							onContextmenu: _cache[0] || (_cache[0] = withModifiers(() => {}, ["prevent"])),
							onPlaced: _cache[1] || (_cache[1] = ($event) => isPositioned.value = true),
							onKeydown: handleKeyDown
						}), {
							default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
							_: 3
						}, 16, [
							"id",
							"data-state",
							"dir",
							"onKeydown"
						]))]),
						_: 3
					}, 8, ["disable-outside-pointer-events"])]),
					_: 3
				})]),
				_: 3
			});
		};
	}
});
var [injectSelectItemAlignedPositionContext, provideSelectItemAlignedPositionContext] = createContext("SelectItemAlignedPosition");
var SelectItemAlignedPosition_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SelectItemAlignedPosition",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["placed"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { getItems } = useCollection();
		const rootContext = injectSelectRootContext();
		const contentContext = injectSelectContentContext();
		const shouldExpandOnScrollRef = ref(false);
		const shouldRepositionRef = ref(true);
		const contentWrapperElement = ref();
		const { forwardRef, currentElement: contentElement } = useForwardExpose();
		const { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext;
		function position() {
			if (rootContext.triggerElement.value && rootContext.valueElement.value && contentWrapperElement.value && contentElement.value && viewport?.value && selectedItem?.value && selectedItemText?.value) {
				const triggerRect = rootContext.triggerElement.value.getBoundingClientRect();
				const contentRect = contentElement.value.getBoundingClientRect();
				const valueNodeRect = rootContext.valueElement.value.getBoundingClientRect();
				const itemTextRect = selectedItemText.value.getBoundingClientRect();
				if (rootContext.dir.value !== "rtl") {
					const itemTextOffset = itemTextRect.left - contentRect.left;
					const left = valueNodeRect.left - itemTextOffset;
					const leftDelta = triggerRect.left - left;
					const minContentWidth = triggerRect.width + leftDelta;
					const contentWidth = Math.max(minContentWidth, contentRect.width);
					const rightEdge = window.innerWidth - 10;
					const clampedLeft = clamp$1(left, 10, Math.max(10, rightEdge - contentWidth));
					contentWrapperElement.value.style.minWidth = `${minContentWidth}px`;
					contentWrapperElement.value.style.left = `${clampedLeft}px`;
				} else {
					const itemTextOffset = contentRect.right - itemTextRect.right;
					const right = window.innerWidth - valueNodeRect.right - itemTextOffset;
					const rightDelta = window.innerWidth - triggerRect.right - right;
					const minContentWidth = triggerRect.width + rightDelta;
					const contentWidth = Math.max(minContentWidth, contentRect.width);
					const leftEdge = window.innerWidth - 10;
					const clampedRight = clamp$1(right, 10, Math.max(10, leftEdge - contentWidth));
					contentWrapperElement.value.style.minWidth = `${minContentWidth}px`;
					contentWrapperElement.value.style.right = `${clampedRight}px`;
				}
				const items = getItems().map((i) => i.ref);
				const availableHeight = window.innerHeight - 20;
				const itemsHeight = viewport.value.scrollHeight;
				const contentStyles = window.getComputedStyle(contentElement.value);
				const contentBorderTopWidth = Number.parseInt(contentStyles.borderTopWidth, 10);
				const contentPaddingTop = Number.parseInt(contentStyles.paddingTop, 10);
				const contentBorderBottomWidth = Number.parseInt(contentStyles.borderBottomWidth, 10);
				const contentPaddingBottom = Number.parseInt(contentStyles.paddingBottom, 10);
				const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth;
				const minContentHeight = Math.min(selectedItem.value.offsetHeight * 5, fullContentHeight);
				const viewportStyles = window.getComputedStyle(viewport.value);
				const viewportPaddingTop = Number.parseInt(viewportStyles.paddingTop, 10);
				const viewportPaddingBottom = Number.parseInt(viewportStyles.paddingBottom, 10);
				const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - 10;
				const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;
				const selectedItemHalfHeight = selectedItem.value.offsetHeight / 2;
				const itemOffsetMiddle = selectedItem.value.offsetTop + selectedItemHalfHeight;
				const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
				const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;
				if (contentTopToItemMiddle <= topEdgeToTriggerMiddle) {
					const isLastItem = selectedItem.value === items[items.length - 1];
					contentWrapperElement.value.style.bottom = `0px`;
					const viewportOffsetBottom = contentElement.value.clientHeight - viewport.value.offsetTop - viewport.value.offsetHeight;
					const height = contentTopToItemMiddle + Math.max(triggerMiddleToBottomEdge, selectedItemHalfHeight + (isLastItem ? viewportPaddingBottom : 0) + viewportOffsetBottom + contentBorderBottomWidth);
					contentWrapperElement.value.style.height = `${height}px`;
				} else {
					const isFirstItem = selectedItem.value === items[0];
					contentWrapperElement.value.style.top = `0px`;
					const height = Math.max(topEdgeToTriggerMiddle, contentBorderTopWidth + viewport.value.offsetTop + (isFirstItem ? viewportPaddingTop : 0) + selectedItemHalfHeight) + itemMiddleToContentBottom;
					contentWrapperElement.value.style.height = `${height}px`;
					viewport.value.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewport.value.offsetTop;
				}
				contentWrapperElement.value.style.margin = `10px 0`;
				contentWrapperElement.value.style.minHeight = `${minContentHeight}px`;
				contentWrapperElement.value.style.maxHeight = `${availableHeight}px`;
				emits("placed");
				requestAnimationFrame(() => shouldExpandOnScrollRef.value = true);
			}
		}
		const contentZIndex = ref("");
		onMounted(async () => {
			await nextTick();
			position();
			if (contentElement.value) contentZIndex.value = window.getComputedStyle(contentElement.value).zIndex;
		});
		function handleScrollButtonChange(node) {
			if (node && shouldRepositionRef.value === true) {
				position();
				focusSelectedItem?.();
				shouldRepositionRef.value = false;
			}
		}
		useResizeObserver(rootContext.triggerElement, () => {
			position();
		});
		provideSelectItemAlignedPositionContext({
			contentWrapper: contentWrapperElement,
			shouldExpandOnScrollRef,
			onScrollButtonChange: handleScrollButtonChange
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "contentWrapperElement",
				ref: contentWrapperElement,
				style: normalizeStyle({
					display: "flex",
					flexDirection: "column",
					position: "fixed",
					zIndex: contentZIndex.value
				})
			}, [createVNode(unref(Primitive), mergeProps({
				ref: unref(forwardRef),
				style: {
					boxSizing: "border-box",
					maxHeight: "100%"
				}
			}, {
				..._ctx.$attrs,
				...props
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16)], 4);
		};
	}
});
var SelectProvider_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SelectProvider",
	props: { context: {
		type: Object,
		required: true
	} },
	setup(__props) {
		provideSelectRootContext(__props.context);
		provideSelectContentContext(SelectContentDefaultContextValue);
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default");
		};
	}
});
var _hoisted_1 = { key: 1 };
var SelectContent_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SelectContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		position: {
			type: String,
			required: false
		},
		bodyLock: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"closeAutoFocus",
		"escapeKeyDown",
		"pointerDownOutside"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const forwarded = useForwardPropsEmits(props, __emit);
		const rootContext = injectSelectRootContext();
		const fragment = ref();
		onMounted(() => {
			fragment.value = new DocumentFragment();
		});
		const presenceRef = ref();
		const present = computed(() => props.forceMount || rootContext.open.value);
		const renderPresence = ref(present.value);
		watch(present, () => {
			setTimeout(() => renderPresence.value = present.value);
		});
		return (_ctx, _cache) => {
			return present.value || renderPresence.value || presenceRef.value?.present ? (openBlock(), createBlock(unref(Presence_default), {
				key: 0,
				ref_key: "presenceRef",
				ref: presenceRef,
				present: present.value
			}, {
				default: withCtx(() => [createVNode(SelectContentImpl_default, normalizeProps(guardReactiveProps({
					...unref(forwarded),
					..._ctx.$attrs
				})), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16)]),
				_: 3
			}, 8, ["present"])) : fragment.value ? (openBlock(), createElementBlock("div", _hoisted_1, [(openBlock(), createBlock(Teleport, { to: fragment.value }, [createVNode(SelectProvider_default, { context: unref(rootContext) }, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["context"])], 8, ["to"]))])) : createCommentVNode("v-if", true);
		};
	}
});
var SelectIcon_default = /* @__PURE__ */ defineComponent({
	__name: "SelectIcon",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				"aria-hidden": "true",
				as: _ctx.as,
				"as-child": _ctx.asChild
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [_cache[0] || (_cache[0] = createTextVNode("▼"))])]),
				_: 3
			}, 8, ["as", "as-child"]);
		};
	}
});
var [injectSelectItemContext, provideSelectItemContext] = createContext("SelectItem");
var SelectItem_default = /* @__PURE__ */ defineComponent({
	__name: "SelectItem",
	props: {
		value: {
			type: null,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { disabled } = toRefs$1(props);
		const rootContext = injectSelectRootContext();
		const contentContext = injectSelectContentContext();
		const { forwardRef, currentElement } = useForwardExpose();
		const { CollectionItem } = useCollection();
		const isSelected = computed(() => valueComparator(rootContext.modelValue?.value, props.value, rootContext.by));
		const isFocused = ref(false);
		const textValue = ref(props.textValue ?? "");
		const textId = useId(void 0, "reka-select-item-text");
		const SELECT_SELECT = "select.select";
		async function handleSelectCustomEvent(ev) {
			if (ev.defaultPrevented) return;
			handleAndDispatchCustomEvent(SELECT_SELECT, handleSelect, {
				originalEvent: ev,
				value: props.value
			});
		}
		async function handleSelect(ev) {
			await nextTick();
			emits("select", ev);
			if (ev.defaultPrevented) return;
			if (!disabled.value) {
				rootContext.onValueChange(props.value);
				if (!rootContext.multiple.value) rootContext.onOpenChange(false);
			}
		}
		async function handlePointerMove(event) {
			await nextTick();
			if (event.defaultPrevented) return;
			if (disabled.value) contentContext.onItemLeave?.();
			else event.currentTarget?.focus({ preventScroll: true });
		}
		async function handlePointerLeave(event) {
			await nextTick();
			if (event.defaultPrevented) return;
			if (event.currentTarget === getActiveElement()) contentContext.onItemLeave?.();
		}
		async function handleKeyDown(event) {
			await nextTick();
			if (event.defaultPrevented) return;
			if (contentContext.searchRef?.value !== "" && event.key === " ") return;
			if (SELECTION_KEYS.includes(event.key)) handleSelectCustomEvent(event);
			if (event.key === " ") event.preventDefault();
		}
		if (props.value === "") throw new Error("A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
		onMounted(() => {
			if (!currentElement.value) return;
			contentContext.itemRefCallback(currentElement.value, props.value, props.disabled);
		});
		provideSelectItemContext({
			value: props.value,
			disabled,
			textId,
			isSelected,
			onItemTextChange: (node) => {
				textValue.value = ((textValue.value || node?.textContent) ?? "").trim();
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionItem), { value: { textValue: textValue.value } }, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					ref: unref(forwardRef),
					role: "option",
					"aria-labelledby": unref(textId),
					"data-highlighted": isFocused.value ? "" : void 0,
					"aria-selected": isSelected.value,
					"data-state": isSelected.value ? "checked" : "unchecked",
					"aria-disabled": unref(disabled) || void 0,
					"data-disabled": unref(disabled) ? "" : void 0,
					tabindex: unref(disabled) ? void 0 : -1,
					as: _ctx.as,
					"as-child": _ctx.asChild,
					onFocus: _cache[0] || (_cache[0] = ($event) => isFocused.value = true),
					onBlur: _cache[1] || (_cache[1] = ($event) => isFocused.value = false),
					onPointerup: handleSelectCustomEvent,
					onPointerdown: _cache[2] || (_cache[2] = (event) => {
						event.currentTarget.focus({ preventScroll: true });
					}),
					onTouchend: _cache[3] || (_cache[3] = withModifiers(() => {}, ["prevent", "stop"])),
					onPointermove: handlePointerMove,
					onPointerleave: handlePointerLeave,
					onKeydown: handleKeyDown
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"aria-labelledby",
					"data-highlighted",
					"aria-selected",
					"data-state",
					"aria-disabled",
					"data-disabled",
					"tabindex",
					"as",
					"as-child"
				])]),
				_: 3
			}, 8, ["value"]);
		};
	}
});
var SelectItemIndicator_default = /* @__PURE__ */ defineComponent({
	__name: "SelectItemIndicator",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const props = __props;
		const itemContext = injectSelectItemContext();
		return (_ctx, _cache) => {
			return unref(itemContext).isSelected.value ? (openBlock(), createBlock(unref(Primitive), mergeProps({
				key: 0,
				"aria-hidden": "true"
			}, props), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16)) : createCommentVNode("v-if", true);
		};
	}
});
var SelectItemText_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SelectItemText",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectSelectRootContext();
		const contentContext = injectSelectContentContext();
		const itemContext = injectSelectItemContext();
		const { forwardRef, currentElement: itemTextElement } = useForwardExpose();
		const optionProps = computed(() => {
			return {
				value: itemContext.value,
				disabled: itemContext.disabled.value,
				textContent: itemTextElement.value?.textContent ?? itemContext.value?.toString() ?? ""
			};
		});
		onMounted(() => {
			if (!itemTextElement.value) return;
			itemContext.onItemTextChange(itemTextElement.value);
			contentContext.itemTextRefCallback(itemTextElement.value, itemContext.value, itemContext.disabled.value);
			rootContext.onOptionAdd(optionProps.value);
		});
		onUnmounted(() => {
			rootContext.onOptionRemove(optionProps.value);
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps({
				id: unref(itemContext).textId,
				ref: unref(forwardRef)
			}, {
				...props,
				..._ctx.$attrs
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id"]);
		};
	}
});
var SelectPortal_default = /* @__PURE__ */ defineComponent({
	__name: "SelectPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Teleport_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
var SelectScrollButtonImpl_default = /* @__PURE__ */ defineComponent({
	__name: "SelectScrollButtonImpl",
	emits: ["autoScroll"],
	setup(__props, { emit: __emit }) {
		const emits = __emit;
		const { getItems } = useCollection();
		const contentContext = injectSelectContentContext();
		const autoScrollTimerRef = ref(null);
		function clearAutoScrollTimer() {
			if (autoScrollTimerRef.value !== null) {
				window.clearInterval(autoScrollTimerRef.value);
				autoScrollTimerRef.value = null;
			}
		}
		watchEffect(() => {
			getItems().map((i) => i.ref).find((item) => item === getActiveElement())?.scrollIntoView({ block: "nearest" });
		});
		function handlePointerDown() {
			if (autoScrollTimerRef.value === null) autoScrollTimerRef.value = window.setInterval(() => {
				emits("autoScroll");
			}, 50);
		}
		function handlePointerMove() {
			contentContext.onItemLeave?.();
			if (autoScrollTimerRef.value === null) autoScrollTimerRef.value = window.setInterval(() => {
				emits("autoScroll");
			}, 50);
		}
		onBeforeUnmount(() => clearAutoScrollTimer());
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps({
				"aria-hidden": "true",
				style: { flexShrink: 0 }
			}, _ctx.$parent?.$props, {
				onPointerdown: handlePointerDown,
				onPointermove: handlePointerMove,
				onPointerleave: _cache[0] || (_cache[0] = () => {
					clearAutoScrollTimer();
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
var SelectScrollDownButton_default = /* @__PURE__ */ defineComponent({
	__name: "SelectScrollDownButton",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const contentContext = injectSelectContentContext();
		const alignedPositionContext = contentContext.position === "item-aligned" ? injectSelectItemAlignedPositionContext() : void 0;
		const { forwardRef, currentElement } = useForwardExpose();
		const canScrollDown = ref(false);
		watchEffect((cleanupFn) => {
			if (contentContext.viewport?.value && contentContext.isPositioned?.value) {
				const viewport = contentContext.viewport.value;
				function handleScroll() {
					const maxScroll = viewport.scrollHeight - viewport.clientHeight;
					canScrollDown.value = Math.ceil(viewport.scrollTop) < maxScroll;
				}
				handleScroll();
				viewport.addEventListener("scroll", handleScroll);
				cleanupFn(() => viewport.removeEventListener("scroll", handleScroll));
			}
		});
		watch(currentElement, () => {
			if (currentElement.value) alignedPositionContext?.onScrollButtonChange(currentElement.value);
		});
		return (_ctx, _cache) => {
			return canScrollDown.value ? (openBlock(), createBlock(SelectScrollButtonImpl_default, {
				key: 0,
				ref: unref(forwardRef),
				onAutoScroll: _cache[0] || (_cache[0] = () => {
					const { viewport, selectedItem } = unref(contentContext);
					if (viewport?.value && selectedItem?.value) viewport.value.scrollTop = viewport.value.scrollTop + selectedItem.value.offsetHeight;
				})
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 512)) : createCommentVNode("v-if", true);
		};
	}
});
var SelectScrollUpButton_default = /* @__PURE__ */ defineComponent({
	__name: "SelectScrollUpButton",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const contentContext = injectSelectContentContext();
		const alignedPositionContext = contentContext.position === "item-aligned" ? injectSelectItemAlignedPositionContext() : void 0;
		const { forwardRef, currentElement } = useForwardExpose();
		const canScrollUp = ref(false);
		watchEffect((cleanupFn) => {
			if (contentContext.viewport?.value && contentContext.isPositioned?.value) {
				const viewport = contentContext.viewport.value;
				function handleScroll() {
					canScrollUp.value = viewport.scrollTop > 0;
				}
				handleScroll();
				viewport.addEventListener("scroll", handleScroll);
				cleanupFn(() => viewport.removeEventListener("scroll", handleScroll));
			}
		});
		watch(currentElement, () => {
			if (currentElement.value) alignedPositionContext?.onScrollButtonChange(currentElement.value);
		});
		return (_ctx, _cache) => {
			return canScrollUp.value ? (openBlock(), createBlock(SelectScrollButtonImpl_default, {
				key: 0,
				ref: unref(forwardRef),
				onAutoScroll: _cache[0] || (_cache[0] = () => {
					const { viewport, selectedItem } = unref(contentContext);
					if (viewport?.value && selectedItem?.value) viewport.value.scrollTop = viewport.value.scrollTop - selectedItem.value.offsetHeight;
				})
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 512)) : createCommentVNode("v-if", true);
		};
	}
});
var SelectTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "SelectTrigger",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectSelectRootContext();
		const { forwardRef, currentElement: triggerElement } = useForwardExpose();
		const isDisabled = computed(() => rootContext.disabled?.value || props.disabled);
		rootContext.contentId ||= useId(void 0, "reka-select-content");
		onMounted(() => {
			rootContext.onTriggerChange(triggerElement.value);
		});
		const { getItems } = useCollection();
		const { search, handleTypeaheadSearch, resetTypeahead } = useTypeahead();
		function handleOpen() {
			if (!isDisabled.value) {
				rootContext.onOpenChange(true);
				resetTypeahead();
			}
		}
		function handlePointerOpen(event) {
			handleOpen();
			rootContext.triggerPointerDownPosRef.value = {
				x: Math.round(event.pageX),
				y: Math.round(event.pageY)
			};
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperAnchor_default), {
				"as-child": "",
				reference: _ctx.reference
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					ref: unref(forwardRef),
					role: "combobox",
					type: _ctx.as === "button" ? "button" : void 0,
					"aria-controls": unref(rootContext).contentId,
					"aria-expanded": unref(rootContext).open.value || false,
					"aria-required": unref(rootContext).required?.value,
					"aria-autocomplete": "none",
					disabled: isDisabled.value,
					dir: unref(rootContext)?.dir.value,
					"data-state": unref(rootContext)?.open.value ? "open" : "closed",
					"data-disabled": isDisabled.value ? "" : void 0,
					"data-placeholder": unref(shouldShowPlaceholder)(unref(rootContext).modelValue?.value) ? "" : void 0,
					"as-child": _ctx.asChild,
					as: _ctx.as,
					onClick: _cache[0] || (_cache[0] = (event) => {
						(event?.currentTarget)?.focus();
					}),
					onPointerdown: _cache[1] || (_cache[1] = (event) => {
						if (event.pointerType === "touch") return event.preventDefault();
						const target = event.target;
						if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
						if (event.button === 0 && event.ctrlKey === false) {
							handlePointerOpen(event);
							event.preventDefault();
						}
					}),
					onPointerup: _cache[2] || (_cache[2] = withModifiers((event) => {
						if (event.pointerType === "touch") handlePointerOpen(event);
					}, ["prevent"])),
					onKeydown: _cache[3] || (_cache[3] = (event) => {
						const isTypingAhead = unref(search) !== "";
						if (!(event.ctrlKey || event.altKey || event.metaKey) && event.key.length === 1) {
							if (isTypingAhead && event.key === " ") return;
						}
						unref(handleTypeaheadSearch)(event.key, unref(getItems)());
						if (unref(OPEN_KEYS).includes(event.key)) {
							handleOpen();
							event.preventDefault();
						}
					})
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"type",
					"aria-controls",
					"aria-expanded",
					"aria-required",
					"disabled",
					"dir",
					"data-state",
					"data-disabled",
					"data-placeholder",
					"as-child",
					"as"
				])]),
				_: 3
			}, 8, ["reference"]);
		};
	}
});
var SelectValue_default = /* @__PURE__ */ defineComponent({
	__name: "SelectValue",
	props: {
		placeholder: {
			type: String,
			required: false,
			default: ""
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const props = __props;
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectSelectRootContext();
		onMounted(() => {
			rootContext.valueElement = currentElement;
		});
		const selectedLabel = computed(() => {
			let list = [];
			const options = Array.from(rootContext.optionsSet.value);
			const getOption = (value) => options.find((option) => valueComparator(value, option.value, rootContext.by));
			if (Array.isArray(rootContext.modelValue.value)) list = rootContext.modelValue.value.map((value) => getOption(value)?.textContent ?? "");
			else list = [getOption(rootContext.modelValue.value)?.textContent ?? ""];
			return list.filter(Boolean);
		});
		const slotText = computed(() => {
			return selectedLabel.value.length ? selectedLabel.value.join(", ") : props.placeholder;
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref: unref(forwardRef),
				as: _ctx.as,
				"as-child": _ctx.asChild,
				style: { pointerEvents: "none" },
				"data-placeholder": selectedLabel.value.length ? void 0 : props.placeholder
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					selectedLabel: selectedLabel.value,
					modelValue: unref(rootContext).modelValue.value
				}, () => [createTextVNode(toDisplayString(slotText.value), 1)])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"data-placeholder"
			]);
		};
	}
});
var SelectViewport_default = /* @__PURE__ */ defineComponent({
	__name: "SelectViewport",
	props: {
		nonce: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const { nonce: propNonce } = toRefs$1(props);
		const nonce = useNonce(propNonce);
		const contentContext = injectSelectContentContext();
		const alignedPositionContext = contentContext.position === "item-aligned" ? injectSelectItemAlignedPositionContext() : void 0;
		const { forwardRef, currentElement } = useForwardExpose();
		onMounted(() => {
			contentContext?.onViewportChange(currentElement.value);
		});
		const prevScrollTopRef = ref(0);
		function handleScroll(event) {
			const viewport = event.currentTarget;
			const { shouldExpandOnScrollRef, contentWrapper } = alignedPositionContext ?? {};
			if (shouldExpandOnScrollRef?.value && contentWrapper?.value) {
				const scrolledBy = Math.abs(prevScrollTopRef.value - viewport.scrollTop);
				if (scrolledBy > 0) {
					const availableHeight = window.innerHeight - 20;
					const cssMinHeight = Number.parseFloat(contentWrapper.value.style.minHeight);
					const cssHeight = Number.parseFloat(contentWrapper.value.style.height);
					const prevHeight = Math.max(cssMinHeight, cssHeight);
					if (prevHeight < availableHeight) {
						const nextHeight = prevHeight + scrolledBy;
						const clampedNextHeight = Math.min(availableHeight, nextHeight);
						const heightDiff = nextHeight - clampedNextHeight;
						contentWrapper.value.style.height = `${clampedNextHeight}px`;
						if (contentWrapper.value.style.bottom === "0px") {
							viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
							contentWrapper.value.style.justifyContent = "flex-end";
						}
					}
				}
			}
			prevScrollTopRef.value = viewport.scrollTop;
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(Primitive), mergeProps({
				ref: unref(forwardRef),
				"data-reka-select-viewport": "",
				role: "presentation"
			}, {
				..._ctx.$attrs,
				...props
			}, {
				style: {
					position: "relative",
					flex: 1,
					overflow: "hidden auto"
				},
				onScroll: handleScroll
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16), createVNode(unref(Primitive), {
				as: "style",
				nonce: unref(nonce)
			}, {
				default: withCtx(() => _cache[0] || (_cache[0] = [createTextVNode(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-select-viewport]::-webkit-scrollbar { display: none; } ")])),
				_: 1,
				__: [0]
			}, 8, ["nonce"])], 64);
		};
	}
});
var BaseSeparator_default = /* @__PURE__ */ defineComponent({
	__name: "BaseSeparator",
	props: {
		orientation: {
			type: String,
			required: false,
			default: "horizontal"
		},
		decorative: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const ORIENTATIONS = ["horizontal", "vertical"];
		function isValidOrientation(orientation) {
			return ORIENTATIONS.includes(orientation);
		}
		const computedOrientation = computed(() => isValidOrientation(props.orientation) ? props.orientation : "horizontal");
		const ariaOrientation = computed(() => computedOrientation.value === "vertical" ? props.orientation : void 0);
		const semanticProps = computed(() => props.decorative ? { role: "none" } : {
			"aria-orientation": ariaOrientation.value,
			"role": "separator"
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps({
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"data-orientation": computedOrientation.value
			}, semanticProps.value), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"as",
				"as-child",
				"data-orientation"
			]);
		};
	}
});
var Separator_default = /* @__PURE__ */ defineComponent({
	__name: "Separator",
	props: {
		orientation: {
			type: String,
			required: false,
			default: "horizontal"
		},
		decorative: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(BaseSeparator_default, normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
function getNextSortedValues(prevValues = [], nextValue, atIndex) {
	const nextValues = [...prevValues];
	nextValues[atIndex] = nextValue;
	return nextValues.sort((a, b) => a - b);
}
function convertValueToPercentage(value, min, max) {
	return clamp$1(100 / (max - min) * (value - min), 0, 100);
}
function getLabel(index, totalValues) {
	if (totalValues > 2) return `Value ${index + 1} of ${totalValues}`;
	else if (totalValues === 2) return ["Minimum", "Maximum"][index];
	else return void 0;
}
function getClosestValueIndex(values, nextValue) {
	if (values.length === 1) return 0;
	const distances = values.map((value) => Math.abs(value - nextValue));
	const closestDistance = Math.min(...distances);
	return distances.indexOf(closestDistance);
}
function getThumbInBoundsOffset(width, left, direction) {
	const halfWidth = width / 2;
	return (halfWidth - linearScale([0, 50], [0, halfWidth])(left) * direction) * direction;
}
function getStepsBetweenValues(values) {
	return values.slice(0, -1).map((value, index) => values[index + 1] - value);
}
function hasMinStepsBetweenValues(values, minStepsBetweenValues) {
	if (minStepsBetweenValues > 0) {
		const stepsBetweenValues = getStepsBetweenValues(values);
		return Math.min(...stepsBetweenValues) >= minStepsBetweenValues;
	}
	return true;
}
function linearScale(input, output) {
	return (value) => {
		if (input[0] === input[1] || output[0] === output[1]) return output[0];
		const ratio = (output[1] - output[0]) / (input[1] - input[0]);
		return output[0] + ratio * (value - input[0]);
	};
}
function getDecimalCount(value) {
	return (String(value).split(".")[1] || "").length;
}
function roundValue(value, decimalCount) {
	const rounder = 10 ** decimalCount;
	return Math.round(value * rounder) / rounder;
}
var PAGE_KEYS = ["PageUp", "PageDown"];
var ARROW_KEYS = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
];
var BACK_KEYS = {
	"from-left": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowLeft"
	],
	"from-right": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowRight"
	],
	"from-bottom": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowLeft"
	],
	"from-top": [
		"Home",
		"PageUp",
		"ArrowUp",
		"ArrowLeft"
	]
};
var [injectSliderOrientationContext, provideSliderOrientationContext] = createContext(["SliderVertical", "SliderHorizontal"]);
var SliderHorizontal_default = /* @__PURE__ */ defineComponent({
	__name: "SliderHorizontal",
	props: {
		dir: {
			type: String,
			required: false
		},
		min: {
			type: Number,
			required: true
		},
		max: {
			type: Number,
			required: true
		},
		inverted: {
			type: Boolean,
			required: true
		}
	},
	emits: [
		"slideEnd",
		"slideStart",
		"slideMove",
		"homeKeyDown",
		"endKeyDown",
		"stepKeyDown"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { max, min, dir, inverted } = toRefs$1(props);
		const { forwardRef, currentElement: sliderElement } = useForwardExpose();
		const rootContext = injectSliderRootContext();
		const offsetPosition = ref();
		const rectRef = ref();
		const isSlidingFromLeft = computed(() => dir?.value !== "rtl" && !inverted.value || dir?.value !== "ltr" && inverted.value);
		function getValueFromPointerEvent(event, slideStart) {
			const rect = rectRef.value || sliderElement.value.getBoundingClientRect();
			const thumb = [...rootContext.thumbElements.value][rootContext.valueIndexToChangeRef.value];
			const thumbWidth = rootContext.thumbAlignment.value === "contain" ? thumb.clientWidth : 0;
			if (!offsetPosition.value && !slideStart && rootContext.thumbAlignment.value === "contain") offsetPosition.value = event.clientX - thumb.getBoundingClientRect().left;
			const value = linearScale([0, rect.width - thumbWidth], isSlidingFromLeft.value ? [min.value, max.value] : [max.value, min.value]);
			rectRef.value = rect;
			return value(slideStart ? event.clientX - rect.left - thumbWidth / 2 : event.clientX - rect.left - (offsetPosition.value ?? 0));
		}
		provideSliderOrientationContext({
			startEdge: computed(() => isSlidingFromLeft.value ? "left" : "right"),
			endEdge: computed(() => isSlidingFromLeft.value ? "right" : "left"),
			direction: computed(() => isSlidingFromLeft.value ? 1 : -1),
			size: "width"
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(SliderImpl_default, {
				ref: unref(forwardRef),
				dir: unref(dir),
				"data-orientation": "horizontal",
				style: normalizeStyle({ ["--reka-slider-thumb-transform"]: !isSlidingFromLeft.value && unref(rootContext).thumbAlignment.value === "overflow" ? "translateX(50%)" : "translateX(-50%)" }),
				onSlideStart: _cache[0] || (_cache[0] = (event) => {
					emits("slideStart", getValueFromPointerEvent(event, true));
				}),
				onSlideMove: _cache[1] || (_cache[1] = (event) => {
					emits("slideMove", getValueFromPointerEvent(event));
				}),
				onSlideEnd: _cache[2] || (_cache[2] = () => {
					rectRef.value = void 0;
					offsetPosition.value = void 0;
					emits("slideEnd");
				}),
				onStepKeyDown: _cache[3] || (_cache[3] = (event) => {
					const slideDirection = isSlidingFromLeft.value ? "from-left" : "from-right";
					emits("stepKeyDown", event, unref(BACK_KEYS)[slideDirection].includes(event.key) ? -1 : 1);
				}),
				onEndKeyDown: _cache[4] || (_cache[4] = ($event) => emits("endKeyDown", $event)),
				onHomeKeyDown: _cache[5] || (_cache[5] = ($event) => emits("homeKeyDown", $event))
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["dir", "style"]);
		};
	}
});
var SliderVertical_default = /* @__PURE__ */ defineComponent({
	__name: "SliderVertical",
	props: {
		min: {
			type: Number,
			required: true
		},
		max: {
			type: Number,
			required: true
		},
		inverted: {
			type: Boolean,
			required: true
		}
	},
	emits: [
		"slideEnd",
		"slideStart",
		"slideMove",
		"homeKeyDown",
		"endKeyDown",
		"stepKeyDown"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { max, min, inverted } = toRefs$1(props);
		const rootContext = injectSliderRootContext();
		const { forwardRef, currentElement: sliderElement } = useForwardExpose();
		const offsetPosition = ref();
		const rectRef = ref();
		const isSlidingFromBottom = computed(() => !inverted.value);
		function getValueFromPointerEvent(event, slideStart) {
			const rect = rectRef.value || sliderElement.value.getBoundingClientRect();
			const thumb = [...rootContext.thumbElements.value][rootContext.valueIndexToChangeRef.value];
			const thumbHeight = rootContext.thumbAlignment.value === "contain" ? thumb.clientHeight : 0;
			if (!offsetPosition.value && !slideStart && rootContext.thumbAlignment.value === "contain") offsetPosition.value = event.clientY - thumb.getBoundingClientRect().top;
			const value = linearScale([0, rect.height - thumbHeight], isSlidingFromBottom.value ? [max.value, min.value] : [min.value, max.value]);
			const position = slideStart ? event.clientY - rect.top - thumbHeight / 2 : event.clientY - rect.top - (offsetPosition.value ?? 0);
			rectRef.value = rect;
			return value(position);
		}
		provideSliderOrientationContext({
			startEdge: computed(() => isSlidingFromBottom.value ? "bottom" : "top"),
			endEdge: computed(() => isSlidingFromBottom.value ? "top" : "bottom"),
			direction: computed(() => isSlidingFromBottom.value ? 1 : -1),
			size: "height"
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(SliderImpl_default, {
				ref: unref(forwardRef),
				"data-orientation": "vertical",
				style: normalizeStyle({ ["--reka-slider-thumb-transform"]: !isSlidingFromBottom.value && unref(rootContext).thumbAlignment.value === "overflow" ? "translateY(-50%)" : "translateY(50%)" }),
				onSlideStart: _cache[0] || (_cache[0] = (event) => {
					emits("slideStart", getValueFromPointerEvent(event, true));
				}),
				onSlideMove: _cache[1] || (_cache[1] = (event) => {
					emits("slideMove", getValueFromPointerEvent(event));
				}),
				onSlideEnd: _cache[2] || (_cache[2] = () => {
					rectRef.value = void 0;
					offsetPosition.value = void 0;
					emits("slideEnd");
				}),
				onStepKeyDown: _cache[3] || (_cache[3] = (event) => {
					const slideDirection = isSlidingFromBottom.value ? "from-bottom" : "from-top";
					emits("stepKeyDown", event, unref(BACK_KEYS)[slideDirection].includes(event.key) ? -1 : 1);
				}),
				onEndKeyDown: _cache[4] || (_cache[4] = ($event) => emits("endKeyDown", $event)),
				onHomeKeyDown: _cache[5] || (_cache[5] = ($event) => emits("homeKeyDown", $event))
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["style"]);
		};
	}
});
var [injectSliderRootContext, provideSliderRootContext] = createContext("SliderRoot");
var SliderRoot_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SliderRoot",
	props: {
		defaultValue: {
			type: Array,
			required: false,
			default: () => [0]
		},
		modelValue: {
			type: [Array, null],
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		orientation: {
			type: String,
			required: false,
			default: "horizontal"
		},
		dir: {
			type: String,
			required: false
		},
		inverted: {
			type: Boolean,
			required: false,
			default: false
		},
		min: {
			type: Number,
			required: false,
			default: 0
		},
		max: {
			type: Number,
			required: false,
			default: 100
		},
		step: {
			type: Number,
			required: false,
			default: 1
		},
		minStepsBetweenThumbs: {
			type: Number,
			required: false,
			default: 0
		},
		thumbAlignment: {
			type: String,
			required: false,
			default: "contain"
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: ["update:modelValue", "valueCommit"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { min, max, step, minStepsBetweenThumbs, orientation, disabled, thumbAlignment, dir: propDir } = toRefs$1(props);
		const dir = useDirection(propDir);
		const { forwardRef, currentElement } = useForwardExpose();
		const isFormControl = useFormControl(currentElement);
		const { CollectionSlot } = useCollection({ isProvider: true });
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue,
			passive: props.modelValue === void 0
		});
		const currentModelValue = computed(() => Array.isArray(modelValue.value) ? [...modelValue.value] : []);
		const valueIndexToChangeRef = ref(0);
		const valuesBeforeSlideStartRef = ref(currentModelValue.value);
		function handleSlideStart(value) {
			updateValues(value, getClosestValueIndex(currentModelValue.value, value));
		}
		function handleSlideMove(value) {
			updateValues(value, valueIndexToChangeRef.value);
		}
		function handleSlideEnd() {
			const prevValue = valuesBeforeSlideStartRef.value[valueIndexToChangeRef.value];
			if (currentModelValue.value[valueIndexToChangeRef.value] !== prevValue) emits("valueCommit", toRaw(currentModelValue.value));
		}
		function updateValues(value, atIndex, { commit } = { commit: false }) {
			const decimalCount = getDecimalCount(step.value);
			const nextValue = clamp$1(roundValue(Math.round((value - min.value) / step.value) * step.value + min.value, decimalCount), min.value, max.value);
			const nextValues = getNextSortedValues(currentModelValue.value, nextValue, atIndex);
			if (hasMinStepsBetweenValues(nextValues, minStepsBetweenThumbs.value * step.value)) {
				valueIndexToChangeRef.value = nextValues.indexOf(nextValue);
				const hasChanged = String(nextValues) !== String(modelValue.value);
				if (hasChanged && commit) emits("valueCommit", nextValues);
				if (hasChanged) {
					thumbElements.value[valueIndexToChangeRef.value]?.focus();
					modelValue.value = nextValues;
				}
			}
		}
		const thumbElements = ref([]);
		provideSliderRootContext({
			modelValue,
			currentModelValue,
			valueIndexToChangeRef,
			thumbElements,
			orientation,
			min,
			max,
			disabled,
			thumbAlignment
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionSlot), null, {
				default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(unref(orientation) === "horizontal" ? SliderHorizontal_default : SliderVertical_default), mergeProps(_ctx.$attrs, {
					ref: unref(forwardRef),
					"as-child": _ctx.asChild,
					as: _ctx.as,
					min: unref(min),
					max: unref(max),
					dir: unref(dir),
					inverted: _ctx.inverted,
					"aria-disabled": unref(disabled),
					"data-disabled": unref(disabled) ? "" : void 0,
					onPointerdown: _cache[0] || (_cache[0] = () => {
						if (!unref(disabled)) valuesBeforeSlideStartRef.value = currentModelValue.value;
					}),
					onSlideStart: _cache[1] || (_cache[1] = ($event) => !unref(disabled) && handleSlideStart($event)),
					onSlideMove: _cache[2] || (_cache[2] = ($event) => !unref(disabled) && handleSlideMove($event)),
					onSlideEnd: _cache[3] || (_cache[3] = ($event) => !unref(disabled) && handleSlideEnd()),
					onHomeKeyDown: _cache[4] || (_cache[4] = ($event) => !unref(disabled) && updateValues(unref(min), 0, { commit: true })),
					onEndKeyDown: _cache[5] || (_cache[5] = ($event) => !unref(disabled) && updateValues(unref(max), currentModelValue.value.length - 1, { commit: true })),
					onStepKeyDown: _cache[6] || (_cache[6] = (event, direction) => {
						if (!unref(disabled)) {
							const multiplier = unref(PAGE_KEYS).includes(event.key) || event.shiftKey && unref(ARROW_KEYS).includes(event.key) ? 10 : 1;
							const atIndex = valueIndexToChangeRef.value;
							const value = currentModelValue.value[atIndex];
							updateValues(value + unref(step) * multiplier * direction, atIndex, { commit: true });
						}
					})
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) }), unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(unref(VisuallyHiddenInput_default), {
						key: 0,
						type: "number",
						value: unref(modelValue),
						name: _ctx.name,
						required: _ctx.required,
						disabled: unref(disabled),
						step: unref(step)
					}, null, 8, [
						"value",
						"name",
						"required",
						"disabled",
						"step"
					])) : createCommentVNode("v-if", true)]),
					_: 3
				}, 16, [
					"as-child",
					"as",
					"min",
					"max",
					"dir",
					"inverted",
					"aria-disabled",
					"data-disabled"
				]))]),
				_: 3
			});
		};
	}
});
var SliderImpl_default = /* @__PURE__ */ defineComponent({
	__name: "SliderImpl",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	emits: [
		"slideStart",
		"slideMove",
		"slideEnd",
		"homeKeyDown",
		"endKeyDown",
		"stepKeyDown"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectSliderRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps({ "data-slider-impl": "" }, props, {
				onKeydown: _cache[0] || (_cache[0] = (event) => {
					if (event.key === "Home") {
						emits("homeKeyDown", event);
						event.preventDefault();
					} else if (event.key === "End") {
						emits("endKeyDown", event);
						event.preventDefault();
					} else if (unref(PAGE_KEYS).concat(unref(ARROW_KEYS)).includes(event.key)) {
						emits("stepKeyDown", event);
						event.preventDefault();
					}
				}),
				onPointerdown: _cache[1] || (_cache[1] = (event) => {
					const target = event.target;
					target.setPointerCapture(event.pointerId);
					event.preventDefault();
					if (unref(rootContext).thumbElements.value.includes(target)) target.focus();
					else emits("slideStart", event);
				}),
				onPointermove: _cache[2] || (_cache[2] = (event) => {
					if (event.target.hasPointerCapture(event.pointerId)) emits("slideMove", event);
				}),
				onPointerup: _cache[3] || (_cache[3] = (event) => {
					const target = event.target;
					if (target.hasPointerCapture(event.pointerId)) {
						target.releasePointerCapture(event.pointerId);
						emits("slideEnd", event);
					}
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
var SliderRange_default = /* @__PURE__ */ defineComponent({
	__name: "SliderRange",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const rootContext = injectSliderRootContext();
		const orientation = injectSliderOrientationContext();
		useForwardExpose();
		const percentages = computed(() => rootContext.currentModelValue.value.map((value) => convertValueToPercentage(value, rootContext.min.value, rootContext.max.value)));
		const offsetStart = computed(() => rootContext.currentModelValue.value.length > 1 ? Math.min(...percentages.value) : 0);
		const offsetEnd = computed(() => 100 - Math.max(...percentages.value, 0));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				"data-disabled": unref(rootContext).disabled.value ? "" : void 0,
				"data-orientation": unref(rootContext).orientation.value,
				"as-child": _ctx.asChild,
				as: _ctx.as,
				style: normalizeStyle({
					[unref(orientation).startEdge.value]: `${offsetStart.value}%`,
					[unref(orientation).endEdge.value]: `${offsetEnd.value}%`
				})
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"data-disabled",
				"data-orientation",
				"as-child",
				"as",
				"style"
			]);
		};
	}
});
var SliderThumbImpl_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SliderThumbImpl",
	props: {
		index: {
			type: Number,
			required: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectSliderRootContext();
		const orientation = injectSliderOrientationContext();
		const { forwardRef, currentElement: thumbElement } = useForwardExpose();
		const { CollectionItem } = useCollection();
		const value = computed(() => rootContext.modelValue?.value?.[props.index]);
		const percent = computed(() => value.value === void 0 ? 0 : convertValueToPercentage(value.value, rootContext.min.value ?? 0, rootContext.max.value ?? 100));
		const label = computed(() => getLabel(props.index, rootContext.modelValue?.value?.length ?? 0));
		const size = useSize(thumbElement);
		const orientationSize = computed(() => size[orientation.size].value);
		const thumbInBoundsOffset = computed(() => {
			if (rootContext.thumbAlignment.value === "overflow" || !orientationSize.value) return 0;
			else return getThumbInBoundsOffset(orientationSize.value, percent.value, orientation.direction.value);
		});
		const isMounted = useMounted();
		onMounted(() => {
			rootContext.thumbElements.value.push(thumbElement.value);
		});
		onUnmounted(() => {
			const i = rootContext.thumbElements.value.findIndex((i$1) => i$1 === thumbElement.value) ?? -1;
			rootContext.thumbElements.value.splice(i, 1);
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionItem), null, {
				default: withCtx(() => [createVNode(unref(Primitive), mergeProps(_ctx.$attrs, {
					ref: unref(forwardRef),
					role: "slider",
					tabindex: unref(rootContext).disabled.value ? void 0 : 0,
					"aria-label": _ctx.$attrs["aria-label"] || label.value,
					"data-disabled": unref(rootContext).disabled.value ? "" : void 0,
					"data-orientation": unref(rootContext).orientation.value,
					"aria-valuenow": value.value,
					"aria-valuemin": unref(rootContext).min.value,
					"aria-valuemax": unref(rootContext).max.value,
					"aria-orientation": unref(rootContext).orientation.value,
					"as-child": _ctx.asChild,
					as: _ctx.as,
					style: {
						transform: "var(--reka-slider-thumb-transform)",
						position: "absolute",
						[unref(orientation).startEdge.value]: `calc(${percent.value}% + ${thumbInBoundsOffset.value}px)`,
						display: !unref(isMounted) && value.value === void 0 ? "none" : void 0
					},
					onFocus: _cache[0] || (_cache[0] = () => {
						unref(rootContext).valueIndexToChangeRef.value = _ctx.index;
					})
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"tabindex",
					"aria-label",
					"data-disabled",
					"data-orientation",
					"aria-valuenow",
					"aria-valuemin",
					"aria-valuemax",
					"aria-orientation",
					"as-child",
					"as",
					"style"
				])]),
				_: 3
			});
		};
	}
});
var SliderThumb_default = /* @__PURE__ */ defineComponent({
	__name: "SliderThumb",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const props = __props;
		const { getItems } = useCollection();
		const { forwardRef, currentElement: thumbElement } = useForwardExpose();
		const index = computed(() => thumbElement.value ? getItems(true).findIndex((i) => i.ref === thumbElement.value) : -1);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(SliderThumbImpl_default, mergeProps({ ref: unref(forwardRef) }, props, { index: index.value }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["index"]);
		};
	}
});
var SliderTrack_default = /* @__PURE__ */ defineComponent({
	__name: "SliderTrack",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const rootContext = injectSliderRootContext();
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				"as-child": _ctx.asChild,
				as: _ctx.as,
				"data-disabled": unref(rootContext).disabled.value ? "" : void 0,
				"data-orientation": unref(rootContext).orientation.value
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"as-child",
				"as",
				"data-disabled",
				"data-orientation"
			]);
		};
	}
});
var [injectTabsRootContext, provideTabsRootContext] = createContext("TabsRoot");
var TabsRoot_default = /* @__PURE__ */ defineComponent({
	__name: "TabsRoot",
	props: {
		defaultValue: {
			type: null,
			required: false
		},
		orientation: {
			type: String,
			required: false,
			default: "horizontal"
		},
		dir: {
			type: String,
			required: false
		},
		activationMode: {
			type: String,
			required: false,
			default: "automatic"
		},
		modelValue: {
			type: null,
			required: false
		},
		unmountOnHide: {
			type: Boolean,
			required: false,
			default: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { orientation, unmountOnHide, dir: propDir } = toRefs$1(props);
		const dir = useDirection(propDir);
		useForwardExpose();
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue,
			passive: props.modelValue === void 0
		});
		const tabsList = ref();
		const contentIds = shallowRef(/* @__PURE__ */ new Set());
		provideTabsRootContext({
			modelValue,
			changeModelValue: (value) => {
				modelValue.value = value;
			},
			orientation,
			dir,
			unmountOnHide,
			activationMode: props.activationMode,
			baseId: useId(void 0, "reka-tabs"),
			tabsList,
			contentIds,
			registerContent: (value) => {
				contentIds.value = new Set([...contentIds.value, value]);
			},
			unregisterContent: (value) => {
				const newSet = new Set(contentIds.value);
				newSet.delete(value);
				contentIds.value = newSet;
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				dir: unref(dir),
				"data-orientation": unref(orientation),
				"as-child": _ctx.asChild,
				as: _ctx.as
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })]),
				_: 3
			}, 8, [
				"dir",
				"data-orientation",
				"as-child",
				"as"
			]);
		};
	}
});
function makeTriggerId(baseId, value) {
	return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
	return `${baseId}-content-${value}`;
}
var TabsContent_default = /* @__PURE__ */ defineComponent({
	__name: "TabsContent",
	props: {
		value: {
			type: [String, Number],
			required: true
		},
		forceMount: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const { forwardRef } = useForwardExpose();
		const rootContext = injectTabsRootContext();
		const triggerId = computed(() => makeTriggerId(rootContext.baseId, props.value));
		const contentId = computed(() => makeContentId(rootContext.baseId, props.value));
		const isSelected = computed(() => props.value === rootContext.modelValue.value);
		const isMountAnimationPreventedRef = ref(isSelected.value);
		onMounted(() => {
			rootContext.registerContent(props.value);
			requestAnimationFrame(() => {
				isMountAnimationPreventedRef.value = false;
			});
		});
		onBeforeUnmount(() => {
			rootContext.unregisterContent(props.value);
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), {
				present: _ctx.forceMount || isSelected.value,
				"force-mount": ""
			}, {
				default: withCtx(({ present }) => [createVNode(unref(Primitive), {
					id: contentId.value,
					ref: unref(forwardRef),
					"as-child": _ctx.asChild,
					as: _ctx.as,
					role: "tabpanel",
					"data-state": isSelected.value ? "active" : "inactive",
					"data-orientation": unref(rootContext).orientation.value,
					"aria-labelledby": triggerId.value,
					hidden: !present,
					tabindex: "0",
					style: normalizeStyle({ animationDuration: isMountAnimationPreventedRef.value ? "0s" : void 0 })
				}, {
					default: withCtx(() => [(unref(rootContext).unmountOnHide.value ? present : true) ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("v-if", true)]),
					_: 2
				}, 1032, [
					"id",
					"as-child",
					"as",
					"data-state",
					"data-orientation",
					"aria-labelledby",
					"hidden",
					"style"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
var TabsList_default = /* @__PURE__ */ defineComponent({
	__name: "TabsList",
	props: {
		loop: {
			type: Boolean,
			required: false,
			default: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const { loop } = toRefs$1(__props);
		const { forwardRef, currentElement } = useForwardExpose();
		const context = injectTabsRootContext();
		context.tabsList = currentElement;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(RovingFocusGroup_default), {
				"as-child": "",
				orientation: unref(context).orientation.value,
				dir: unref(context).dir.value,
				loop: unref(loop)
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					ref: unref(forwardRef),
					role: "tablist",
					"as-child": _ctx.asChild,
					as: _ctx.as,
					"aria-orientation": unref(context).orientation.value
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"as-child",
					"as",
					"aria-orientation"
				])]),
				_: 3
			}, 8, [
				"orientation",
				"dir",
				"loop"
			]);
		};
	}
});
var TabsTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "TabsTrigger",
	props: {
		value: {
			type: [String, Number],
			required: true
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		const { forwardRef } = useForwardExpose();
		const rootContext = injectTabsRootContext();
		const triggerId = computed(() => makeTriggerId(rootContext.baseId, props.value));
		const contentId = computed(() => rootContext.contentIds.value.has(props.value) ? makeContentId(rootContext.baseId, props.value) : void 0);
		const isSelected = computed(() => props.value === rootContext.modelValue.value);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(RovingFocusItem_default), {
				"as-child": "",
				focusable: !_ctx.disabled,
				active: isSelected.value
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					id: triggerId.value,
					ref: unref(forwardRef),
					role: "tab",
					type: _ctx.as === "button" ? "button" : void 0,
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"aria-selected": isSelected.value ? "true" : "false",
					"aria-controls": contentId.value,
					"data-state": isSelected.value ? "active" : "inactive",
					disabled: _ctx.disabled,
					"data-disabled": _ctx.disabled ? "" : void 0,
					"data-orientation": unref(rootContext).orientation.value,
					onMousedown: _cache[0] || (_cache[0] = withModifiers((event) => {
						if (!_ctx.disabled && event.ctrlKey === false) unref(rootContext).changeModelValue(_ctx.value);
						else event.preventDefault();
					}, ["left"])),
					onKeydown: _cache[1] || (_cache[1] = withKeys(($event) => unref(rootContext).changeModelValue(_ctx.value), ["enter", "space"])),
					onFocus: _cache[2] || (_cache[2] = () => {
						const isAutomaticActivation = unref(rootContext).activationMode !== "manual";
						if (!isSelected.value && !_ctx.disabled && isAutomaticActivation) unref(rootContext).changeModelValue(_ctx.value);
					})
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"id",
					"type",
					"as",
					"as-child",
					"aria-selected",
					"aria-controls",
					"data-state",
					"disabled",
					"data-disabled",
					"data-orientation"
				])]),
				_: 3
			}, 8, ["focusable", "active"]);
		};
	}
});
var [injectTagsInputRootContext, provideTagsInputRootContext] = createContext("TagsInputRoot");
var TagsInputRoot_default = /* @__PURE__ */ defineComponent({
	__name: "TagsInputRoot",
	props: {
		modelValue: {
			type: [Array, null],
			required: false
		},
		defaultValue: {
			type: Array,
			required: false,
			default: () => []
		},
		addOnPaste: {
			type: Boolean,
			required: false
		},
		addOnTab: {
			type: Boolean,
			required: false
		},
		addOnBlur: {
			type: Boolean,
			required: false
		},
		duplicate: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		delimiter: {
			type: null,
			required: false,
			default: ","
		},
		dir: {
			type: String,
			required: false
		},
		max: {
			type: Number,
			required: false,
			default: 0
		},
		id: {
			type: String,
			required: false
		},
		convertValue: {
			type: Function,
			required: false
		},
		displayValue: {
			type: Function,
			required: false,
			default: (value) => value.toString()
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"update:modelValue",
		"invalid",
		"addTag",
		"removeTag"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { addOnPaste, disabled, delimiter, max, id, dir: propDir, addOnBlur, addOnTab } = toRefs$1(props);
		const dir = useDirection(propDir);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue,
			passive: true,
			deep: true
		});
		const { forwardRef, currentElement } = useForwardExpose();
		const { focused } = useFocusWithin(currentElement);
		const isFormControl = useFormControl(currentElement);
		const { getItems, CollectionSlot } = useCollection({ isProvider: true });
		const selectedElement = ref();
		const isInvalidInput = ref(false);
		const currentModelValue = computed(() => Array.isArray(modelValue.value) ? [...modelValue.value] : []);
		function handleRemoveTag(index) {
			if (index !== -1) {
				const collection = getItems().filter((i) => i.ref.dataset.disabled !== "");
				modelValue.value = modelValue.value.filter((_, i) => i !== index);
				emits("removeTag", collection[index].value);
			}
		}
		provideTagsInputRootContext({
			modelValue,
			onAddValue: (_payload) => {
				const array = [...currentModelValue.value];
				const modelValueIsObject = array.length > 0 && typeof array[0] === "object";
				const defaultValueIsObject = array.length > 0 && typeof props.defaultValue[0] === "object";
				if ((modelValueIsObject || defaultValueIsObject) && typeof props.convertValue !== "function") throw new Error("You must provide a `convertValue` function when using objects as values.");
				const payload = props.convertValue ? props.convertValue(_payload) : _payload;
				if (array.length >= max.value && !!max.value) {
					emits("invalid", payload);
					return false;
				}
				if (props.duplicate) {
					modelValue.value = [...array, payload];
					emits("addTag", payload);
					return true;
				} else if (!array.includes(payload)) {
					modelValue.value = [...array, payload];
					emits("addTag", payload);
					return true;
				} else isInvalidInput.value = true;
				emits("invalid", payload);
				return false;
			},
			onRemoveValue: handleRemoveTag,
			onInputKeydown: (event) => {
				const target = event.target;
				const collection = getItems().map((i) => i.ref).filter((i) => i.dataset.disabled !== "");
				if (!collection.length) return;
				const lastTag = collection.at(-1);
				switch (event.key) {
					case "Delete":
					case "Backspace":
						if (target.selectionStart !== 0 || target.selectionEnd !== 0) break;
						if (selectedElement.value) {
							const index = collection.findIndex((i) => i === selectedElement.value);
							handleRemoveTag(index);
							selectedElement.value = selectedElement.value === lastTag ? collection.at(index - 1) : collection.at(index + 1);
							event.preventDefault();
						} else if (event.key === "Backspace") {
							selectedElement.value = lastTag;
							event.preventDefault();
						}
						break;
					case "Home":
					case "End":
					case "ArrowRight":
					case "ArrowLeft": {
						const isArrowRight = event.key === "ArrowRight" && dir.value === "ltr" || event.key === "ArrowLeft" && dir.value === "rtl";
						const isArrowLeft = !isArrowRight;
						if (target.selectionStart !== 0 || target.selectionEnd !== 0) break;
						if (isArrowLeft && !selectedElement.value) {
							selectedElement.value = lastTag;
							event.preventDefault();
						} else if (isArrowRight && lastTag && selectedElement.value === lastTag) {
							selectedElement.value = void 0;
							event.preventDefault();
						} else if (selectedElement.value) {
							const el = useArrowNavigation(event, selectedElement.value, void 0, {
								itemsArray: collection,
								loop: false,
								dir: dir.value
							});
							if (el) selectedElement.value = el;
							event.preventDefault();
						}
						break;
					}
					case "ArrowUp":
					case "ArrowDown":
						if (selectedElement.value) event.preventDefault();
						break;
					default: selectedElement.value = void 0;
				}
			},
			selectedElement,
			isInvalidInput,
			addOnPaste,
			addOnBlur,
			addOnTab,
			dir,
			disabled,
			delimiter,
			max,
			id,
			displayValue: props.displayValue
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionSlot), null, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					ref: unref(forwardRef),
					dir: unref(dir),
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"data-invalid": isInvalidInput.value ? "" : void 0,
					"data-disabled": unref(disabled) ? "" : void 0,
					"data-focused": unref(focused) ? "" : void 0
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) }), unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(unref(VisuallyHiddenInput_default), {
						key: 0,
						name: _ctx.name,
						value: unref(modelValue),
						required: _ctx.required,
						disabled: unref(disabled)
					}, null, 8, [
						"name",
						"value",
						"required",
						"disabled"
					])) : createCommentVNode("v-if", true)]),
					_: 3
				}, 8, [
					"dir",
					"as",
					"as-child",
					"data-invalid",
					"data-disabled",
					"data-focused"
				])]),
				_: 3
			});
		};
	}
});
var TagsInputInput_default = /* @__PURE__ */ defineComponent({
	__name: "TagsInputInput",
	props: {
		placeholder: {
			type: String,
			required: false
		},
		autoFocus: {
			type: Boolean,
			required: false
		},
		maxLength: {
			type: Number,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "input"
		}
	},
	setup(__props) {
		const props = __props;
		const context = injectTagsInputRootContext();
		const { forwardRef, currentElement } = useForwardExpose();
		function handleBlur(event) {
			context.selectedElement.value = void 0;
			if (!context.addOnBlur.value) return;
			const target = event.target;
			if (!target.value) return;
			if (context.onAddValue(target.value)) target.value = "";
		}
		function handleTab(event) {
			if (!context.addOnTab.value) return;
			handleCustomKeydown(event);
		}
		const isComposing = ref(false);
		function onCompositionStart() {
			isComposing.value = true;
		}
		function onCompositionEnd() {
			nextTick(() => {
				isComposing.value = false;
			});
		}
		async function handleCustomKeydown(event) {
			if (isComposing.value) return;
			await nextTick();
			if (event.defaultPrevented) return;
			const target = event.target;
			if (!target.value) return;
			if (context.onAddValue(target.value)) target.value = "";
			event.preventDefault();
		}
		function handleInput(event) {
			context.isInvalidInput.value = false;
			if (event.data === null) return;
			const delimiter = context.delimiter.value;
			if (delimiter === event.data || delimiter instanceof RegExp && delimiter.test(event.data)) {
				const target = event.target;
				target.value = target.value.replace(delimiter, "");
				if (target.value.trim() === "") {
					target.value = "";
					return;
				}
				if (context.onAddValue(target.value)) target.value = "";
			}
		}
		function handlePaste(event) {
			if (context.addOnPaste.value) {
				event.preventDefault();
				const clipboardData = event.clipboardData;
				if (!clipboardData) return;
				const value = clipboardData.getData("text");
				if (context.delimiter.value) value.split(context.delimiter.value).forEach((v) => {
					context.onAddValue(v);
				});
				else context.onAddValue(value);
			}
		}
		onMounted(() => {
			const inputEl = currentElement.value.nodeName === "INPUT" ? currentElement.value : currentElement.value.querySelector("input");
			if (!inputEl) return;
			setTimeout(() => {
				if (props.autoFocus) inputEl?.focus();
			}, 1);
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				id: unref(context).id?.value,
				ref: unref(forwardRef),
				type: "text",
				autocomplete: "off",
				autocorrect: "off",
				autocapitalize: "off",
				as: _ctx.as,
				"as-child": _ctx.asChild,
				maxlength: _ctx.maxLength,
				placeholder: _ctx.placeholder,
				disabled: unref(context).disabled.value,
				"data-invalid": unref(context).isInvalidInput.value ? "" : void 0,
				onInput: handleInput,
				onKeydown: [
					withKeys(handleCustomKeydown, ["enter"]),
					withKeys(handleTab, ["tab"]),
					unref(context).onInputKeydown
				],
				onBlur: handleBlur,
				onCompositionstart: onCompositionStart,
				onCompositionend: onCompositionEnd,
				onPaste: handlePaste
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"id",
				"as",
				"as-child",
				"maxlength",
				"placeholder",
				"disabled",
				"data-invalid",
				"onKeydown"
			]);
		};
	}
});
var [injectTagsInputItemContext, provideTagsInputItemContext] = createContext("TagsInputItem");
var TagsInputItem_default = /* @__PURE__ */ defineComponent({
	__name: "TagsInputItem",
	props: {
		value: {
			type: null,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const { value } = toRefs$1(props);
		const context = injectTagsInputRootContext();
		const { forwardRef, currentElement } = useForwardExpose();
		const { CollectionItem } = useCollection();
		const isSelected = computed(() => context.selectedElement.value === currentElement.value);
		const disabled = computed(() => props.disabled || context.disabled.value);
		const itemContext = provideTagsInputItemContext({
			value,
			isSelected,
			disabled,
			textId: "",
			displayValue: computed(() => context.displayValue(value.value))
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionItem), { value: unref(value) }, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					ref: unref(forwardRef),
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"aria-labelledby": unref(itemContext).textId,
					"aria-current": isSelected.value,
					"data-disabled": disabled.value ? "" : void 0,
					"data-state": isSelected.value ? "active" : "inactive"
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"as",
					"as-child",
					"aria-labelledby",
					"aria-current",
					"data-disabled",
					"data-state"
				])]),
				_: 3
			}, 8, ["value"]);
		};
	}
});
var TagsInputItemDelete_default = /* @__PURE__ */ defineComponent({
	__name: "TagsInputItemDelete",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		const context = injectTagsInputRootContext();
		const itemContext = injectTagsInputItemContext();
		const disabled = computed(() => itemContext.disabled?.value || context.disabled.value);
		function handleDelete() {
			if (disabled.value) return;
			const index = context.modelValue.value.findIndex((i) => isEqual(i, itemContext.value.value));
			context.onRemoveValue(index);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps({ tabindex: "-1" }, props, {
				"aria-labelledby": unref(itemContext).textId,
				"aria-current": unref(itemContext).isSelected.value,
				"data-state": unref(itemContext).isSelected.value ? "active" : "inactive",
				"data-disabled": disabled.value ? "" : void 0,
				type: _ctx.as === "button" ? "button" : void 0,
				onClick: handleDelete
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"aria-labelledby",
				"aria-current",
				"data-state",
				"data-disabled",
				"type"
			]);
		};
	}
});
var TagsInputItemText_default = /* @__PURE__ */ defineComponent({
	__name: "TagsInputItemText",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const props = __props;
		const itemContext = injectTagsInputItemContext();
		useForwardExpose();
		itemContext.textId ||= useId(void 0, "reka-tags-input-item-text");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { id: unref(itemContext).textId }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [createTextVNode(toDisplayString(unref(itemContext).displayValue.value), 1)])]),
				_: 3
			}, 16, ["id"]);
		};
	}
});
var [injectToggleGroupRootContext, provideToggleGroupRootContext] = createContext("ToggleGroupRoot");
var ToggleGroupRoot_default = /* @__PURE__ */ defineComponent({
	__name: "ToggleGroupRoot",
	props: {
		rovingFocus: {
			type: Boolean,
			required: false,
			default: true
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		orientation: {
			type: String,
			required: false
		},
		dir: {
			type: String,
			required: false
		},
		loop: {
			type: Boolean,
			required: false,
			default: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		},
		type: {
			type: String,
			required: false
		},
		modelValue: {
			type: null,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { loop, rovingFocus, disabled, dir: propDir } = toRefs$1(props);
		const dir = useDirection(propDir);
		const { forwardRef, currentElement } = useForwardExpose();
		const { modelValue, changeModelValue, isSingle } = useSingleOrMultipleValue(props, emits);
		const isFormControl = useFormControl(currentElement);
		provideToggleGroupRootContext({
			isSingle,
			modelValue,
			changeModelValue,
			dir,
			orientation: props.orientation,
			loop,
			rovingFocus,
			disabled
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(unref(rovingFocus) ? unref(RovingFocusGroup_default) : unref(Primitive)), {
				"as-child": "",
				orientation: unref(rovingFocus) ? _ctx.orientation : void 0,
				dir: unref(dir),
				loop: unref(rovingFocus) ? unref(loop) : void 0
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					ref: unref(forwardRef),
					role: "group",
					"as-child": _ctx.asChild,
					as: _ctx.as
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) }), unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(VisuallyHiddenInput_default, {
						key: 0,
						name: _ctx.name,
						required: _ctx.required,
						value: unref(modelValue)
					}, null, 8, [
						"name",
						"required",
						"value"
					])) : createCommentVNode("v-if", true)]),
					_: 3
				}, 8, ["as-child", "as"])]),
				_: 3
			}, 8, [
				"orientation",
				"dir",
				"loop"
			]);
		};
	}
});
var Toggle_default = /* @__PURE__ */ defineComponent({
	__name: "Toggle",
	props: {
		defaultValue: {
			type: Boolean,
			required: false
		},
		modelValue: {
			type: [Boolean, null],
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { forwardRef, currentElement } = useForwardExpose();
		const toggleGroupContext = injectToggleGroupRootContext(null);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue,
			passive: props.modelValue === void 0
		});
		function togglePressed() {
			modelValue.value = !modelValue.value;
		}
		const dataState = computed(() => {
			return modelValue.value ? "on" : "off";
		});
		const isFormControl = useFormControl(currentElement);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref: unref(forwardRef),
				type: _ctx.as === "button" ? "button" : void 0,
				"as-child": props.asChild,
				as: _ctx.as,
				"aria-pressed": unref(modelValue),
				"data-state": dataState.value,
				"data-disabled": _ctx.disabled ? "" : void 0,
				disabled: _ctx.disabled,
				onClick: togglePressed
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					modelValue: unref(modelValue),
					disabled: _ctx.disabled,
					pressed: unref(modelValue),
					state: dataState.value
				}), unref(isFormControl) && _ctx.name && !unref(toggleGroupContext) ? (openBlock(), createBlock(VisuallyHiddenInput_default, {
					key: 0,
					type: "checkbox",
					name: _ctx.name,
					value: unref(modelValue),
					required: _ctx.required
				}, null, 8, [
					"name",
					"value",
					"required"
				])) : createCommentVNode("v-if", true)]),
				_: 3
			}, 8, [
				"type",
				"as-child",
				"as",
				"aria-pressed",
				"data-state",
				"data-disabled",
				"disabled"
			]);
		};
	}
});
var ToggleGroupItem_default = /* @__PURE__ */ defineComponent({
	__name: "ToggleGroupItem",
	props: {
		value: {
			type: null,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectToggleGroupRootContext();
		const disabled = computed(() => rootContext.disabled?.value || props.disabled);
		const pressed = computed(() => isValueEqualOrExist(rootContext.modelValue.value, props.value));
		const { forwardRef } = useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(unref(rootContext).rovingFocus.value ? unref(RovingFocusItem_default) : unref(Primitive)), mergeProps({ "as-child": "" }, unref(rootContext).rovingFocus.value ? {
				focusable: !disabled.value,
				active: pressed.value
			} : {}), {
				default: withCtx(() => [createVNode(unref(Toggle_default), mergeProps(props, {
					ref: unref(forwardRef),
					disabled: disabled.value,
					"model-value": pressed.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(rootContext).changeModelValue(_ctx.value))
				}), {
					default: withCtx((slotProps) => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps)))]),
					_: 3
				}, 16, ["disabled", "model-value"])]),
				_: 3
			}, 16);
		};
	}
});
function flatten(items) {
	return items.reduce((acc, item) => {
		acc.push(item);
		if (item.children) acc.push(...flatten(item.children));
		return acc;
	}, []);
}
var [injectTreeRootContext, provideTreeRootContext] = createContext("TreeRoot");
var TreeRoot_default = /* @__PURE__ */ defineComponent({
	__name: "TreeRoot",
	props: {
		modelValue: {
			type: null,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		items: {
			type: Array,
			required: false
		},
		expanded: {
			type: Array,
			required: false
		},
		defaultExpanded: {
			type: Array,
			required: false
		},
		getKey: {
			type: Function,
			required: true
		},
		getChildren: {
			type: Function,
			required: false,
			default: (val) => val.children
		},
		selectionBehavior: {
			type: String,
			required: false,
			default: "toggle"
		},
		multiple: {
			type: Boolean,
			required: false,
			skipCheck: true
		},
		dir: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		propagateSelect: {
			type: Boolean,
			required: false
		},
		bubbleSelect: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "ul"
		}
	},
	emits: ["update:modelValue", "update:expanded"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { items, multiple, disabled, propagateSelect, dir: propDir, bubbleSelect } = toRefs$1(props);
		const { handleTypeaheadSearch } = useTypeahead();
		const dir = useDirection(propDir);
		const rovingFocusGroupRef = ref();
		const isVirtual = ref(false);
		const virtualKeydownHook = createEventHook();
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
			passive: true,
			deep: true
		});
		const expanded = useVModel(props, "expanded", emits, {
			defaultValue: props.defaultExpanded ?? [],
			passive: props.expanded === void 0,
			deep: true
		});
		const { onSelectItem, handleMultipleReplace } = useSelectionBehavior(modelValue, props);
		const selectedKeys = computed(() => {
			if (multiple.value && Array.isArray(modelValue.value)) return modelValue.value.map((i) => props.getKey(i));
			else return [props.getKey(modelValue.value ?? {})];
		});
		function flattenItems(items$1, level = 1, parentItem) {
			return items$1.reduce((acc, item, index) => {
				const key = props.getKey(item);
				const children = props.getChildren(item);
				const isExpanded = expanded.value.includes(key);
				const flattenedItem = {
					_id: key,
					value: item,
					index,
					level,
					parentItem,
					hasChildren: !!children,
					bind: {
						"value": item,
						level,
						"aria-setsize": items$1.length,
						"aria-posinset": index + 1
					}
				};
				acc.push(flattenedItem);
				if (children && isExpanded) acc.push(...flattenItems(children, level + 1, item));
				return acc;
			}, []);
		}
		const expandedItems = computed(() => {
			const items$1 = props.items;
			expanded.value.map((i) => i);
			return flattenItems(items$1 ?? []);
		});
		function handleKeydown(event) {
			if (isVirtual.value) virtualKeydownHook.trigger(event);
			else {
				const collections = rovingFocusGroupRef.value?.getItems() ?? [];
				handleTypeaheadSearch(event.key, collections);
			}
		}
		function handleKeydownNavigation(event) {
			if (isVirtual.value) return;
			const intent = MAP_KEY_TO_FOCUS_INTENT[event.key];
			nextTick(() => {
				handleMultipleReplace(intent, getActiveElement(), rovingFocusGroupRef.value?.getItems, expandedItems.value.map((i) => i.value));
			});
		}
		function handleBubbleSelect(item) {
			if (item.parentItem != null && Array.isArray(modelValue.value) && props.multiple) {
				const parentItem = expandedItems.value.find((i) => {
					return item.parentItem != null && props.getKey(i.value) === props.getKey(item.parentItem);
				});
				if (parentItem != null) {
					if (props.getChildren(parentItem.value)?.every((i) => modelValue.value.find((v) => props.getKey(v) === props.getKey(i)))) modelValue.value = [...modelValue.value, parentItem.value];
					else modelValue.value = modelValue.value.filter((v) => props.getKey(v) !== props.getKey(parentItem.value));
					handleBubbleSelect(parentItem);
				}
			}
		}
		provideTreeRootContext({
			modelValue,
			selectedKeys,
			onSelect: (val) => {
				const condition = (baseValue) => props.getKey(baseValue ?? {}) === props.getKey(val);
				const exist = props.multiple && Array.isArray(modelValue.value) ? modelValue.value?.findIndex(condition) !== -1 : void 0;
				onSelectItem(val, condition);
				if (props.bubbleSelect && props.multiple && Array.isArray(modelValue.value)) {
					const item = expandedItems.value.find((i) => {
						return props.getKey(i.value) === props.getKey(val);
					});
					if (item != null) handleBubbleSelect(item);
				}
				if (props.propagateSelect && props.multiple && Array.isArray(modelValue.value)) {
					const children = flatten(props.getChildren(val) ?? []);
					if (exist) modelValue.value = [...modelValue.value].filter((i) => !children.some((child) => props.getKey(i ?? {}) === props.getKey(child)));
					else modelValue.value = [...modelValue.value, ...children];
				}
			},
			expanded,
			onToggle(val) {
				if (!(val ? props.getChildren(val) : void 0)) return;
				const key = props.getKey(val) ?? val;
				if (expanded.value.includes(key)) expanded.value = expanded.value.filter((val$1) => val$1 !== key);
				else expanded.value = [...expanded.value, key];
			},
			getKey: props.getKey,
			getChildren: props.getChildren,
			items,
			expandedItems,
			disabled,
			multiple,
			dir,
			propagateSelect,
			bubbleSelect,
			isVirtual,
			virtualKeydownHook,
			handleMultipleReplace
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(RovingFocusGroup_default), {
				ref_key: "rovingFocusGroupRef",
				ref: rovingFocusGroupRef,
				"as-child": "",
				orientation: "vertical",
				dir: unref(dir)
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					role: "tree",
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"aria-multiselectable": unref(multiple) ? true : void 0,
					onKeydown: [handleKeydown, withKeys(withModifiers(handleKeydownNavigation, ["shift"]), ["up", "down"])]
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
						flattenItems: expandedItems.value,
						modelValue: unref(modelValue),
						expanded: unref(expanded)
					})]),
					_: 3
				}, 8, [
					"as",
					"as-child",
					"aria-multiselectable",
					"onKeydown"
				])]),
				_: 3
			}, 8, ["dir"]);
		};
	}
});
var TREE_SELECT = "tree.select";
var TREE_TOGGLE = "tree.toggle";
var TreeItem_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "TreeItem",
	props: {
		value: {
			type: null,
			required: true
		},
		level: {
			type: Number,
			required: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "li"
		}
	},
	emits: ["select", "toggle"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectTreeRootContext();
		const { getItems } = useCollection();
		const hasChildren = computed(() => !!rootContext.getChildren(props.value));
		const isExpanded = computed(() => {
			const key = rootContext.getKey(props.value);
			return rootContext.expanded.value.includes(key);
		});
		const isSelected = computed(() => {
			const key = rootContext.getKey(props.value);
			return rootContext.selectedKeys.value.includes(key);
		});
		const isIndeterminate = computed(() => {
			if (rootContext.bubbleSelect.value && hasChildren.value && Array.isArray(rootContext.modelValue.value)) {
				const children = flatten(rootContext.getChildren(props.value) || []);
				return children.some((child) => rootContext.modelValue.value.find((v) => rootContext.getKey(v) === rootContext.getKey(child))) && !children.every((child) => rootContext.modelValue.value.find((v) => rootContext.getKey(v) === rootContext.getKey(child)));
			} else if (rootContext.propagateSelect.value && isSelected.value && hasChildren.value && Array.isArray(rootContext.modelValue.value)) return !flatten(rootContext.getChildren(props.value) || []).every((child) => rootContext.modelValue.value.find((v) => rootContext.getKey(v) === rootContext.getKey(child)));
			else return void 0;
		});
		function handleKeydownRight(ev) {
			if (!hasChildren.value) return;
			if (isExpanded.value) {
				const collection = getItems().map((i) => i.ref);
				const currentElement = getActiveElement();
				const currentIndex = collection.indexOf(currentElement);
				const nextElement = [...collection].slice(currentIndex).find((el) => Number(el.getAttribute("data-indent")) === props.level + 1);
				if (nextElement) nextElement.focus();
			} else handleToggleCustomEvent(ev);
		}
		function handleKeydownLeft(ev) {
			if (isExpanded.value) handleToggleCustomEvent(ev);
			else {
				const collection = getItems().map((i) => i.ref);
				const currentElement = getActiveElement();
				const currentIndex = collection.indexOf(currentElement);
				const parentElement = [...collection].slice(0, currentIndex).reverse().find((el) => Number(el.getAttribute("data-indent")) === props.level - 1);
				if (parentElement) parentElement.focus();
			}
		}
		async function handleSelect(ev) {
			emits("select", ev);
			if (ev?.defaultPrevented) return;
			rootContext.onSelect(props.value);
		}
		async function handleToggle(ev) {
			emits("toggle", ev);
			if (ev?.defaultPrevented) return;
			rootContext.onToggle(props.value);
		}
		async function handleSelectCustomEvent(ev) {
			if (!ev) return;
			handleAndDispatchCustomEvent(TREE_SELECT, handleSelect, {
				originalEvent: ev,
				value: props.value,
				isExpanded: isExpanded.value,
				isSelected: isSelected.value
			});
		}
		async function handleToggleCustomEvent(ev) {
			if (!ev) return;
			handleAndDispatchCustomEvent(TREE_TOGGLE, handleToggle, {
				originalEvent: ev,
				value: props.value,
				isExpanded: isExpanded.value,
				isSelected: isSelected.value
			});
		}
		__expose({
			isExpanded,
			isSelected,
			isIndeterminate,
			handleToggle: () => rootContext.onToggle(props.value),
			handleSelect: () => rootContext.onSelect(props.value)
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(RovingFocusItem_default), {
				"as-child": "",
				value: _ctx.value,
				"allow-shift-key": ""
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), mergeProps(_ctx.$attrs, {
					role: "treeitem",
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"aria-selected": isSelected.value,
					"aria-expanded": hasChildren.value ? isExpanded.value : void 0,
					"aria-level": _ctx.level,
					"data-indent": _ctx.level,
					"data-selected": isSelected.value ? "" : void 0,
					"data-expanded": isExpanded.value ? "" : void 0,
					onKeydown: [
						withKeys(withModifiers(handleSelectCustomEvent, ["self", "prevent"]), ["enter", "space"]),
						_cache[0] || (_cache[0] = withKeys(withModifiers((ev) => unref(rootContext).dir.value === "ltr" ? handleKeydownRight(ev) : handleKeydownLeft(ev), ["prevent"]), ["right"])),
						_cache[1] || (_cache[1] = withKeys(withModifiers((ev) => unref(rootContext).dir.value === "ltr" ? handleKeydownLeft(ev) : handleKeydownRight(ev), ["prevent"]), ["left"]))
					],
					onClick: _cache[2] || (_cache[2] = withModifiers((ev) => {
						handleSelectCustomEvent(ev);
						handleToggleCustomEvent(ev);
					}, ["stop"]))
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
						isExpanded: isExpanded.value,
						isSelected: isSelected.value,
						isIndeterminate: isIndeterminate.value,
						handleSelect: () => unref(rootContext).onSelect(_ctx.value),
						handleToggle: () => unref(rootContext).onToggle(_ctx.value)
					})]),
					_: 3
				}, 16, [
					"as",
					"as-child",
					"aria-selected",
					"aria-expanded",
					"aria-level",
					"data-indent",
					"data-selected",
					"data-expanded",
					"onKeydown"
				])]),
				_: 3
			}, 8, ["value"]);
		};
	}
});
var TreeVirtualizer_default = /* @__PURE__ */ defineComponent({
	__name: "TreeVirtualizer",
	props: {
		overscan: {
			type: Number,
			required: false
		},
		estimateSize: {
			type: [Number, Function],
			required: false
		},
		textContent: {
			type: Function,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const slots = useSlots();
		const rootContext = injectTreeRootContext();
		const parentEl = useParentElement();
		const { getItems } = useCollection();
		const search = refAutoReset("", 1e3);
		const optionsWithMetadata = computed(() => {
			const parseTextContent = (option) => {
				if (props.textContent) return props.textContent(option);
				else return option.toString().toLowerCase();
			};
			return rootContext.expandedItems.value.map((option, index) => ({
				index,
				textContent: parseTextContent(option.value)
			}));
		});
		rootContext.isVirtual.value = true;
		const padding = computed(() => {
			const el = parentEl.value;
			if (!el) return {
				start: 0,
				end: 0
			};
			else {
				const styles = window.getComputedStyle(el);
				return {
					start: Number.parseFloat(styles.paddingBlockStart || styles.paddingTop),
					end: Number.parseFloat(styles.paddingBlockEnd || styles.paddingBottom)
				};
			}
		});
		const virtualizer = useVirtualizer({
			get scrollPaddingStart() {
				return padding.value.start;
			},
			get scrollPaddingEnd() {
				return padding.value.end;
			},
			get count() {
				return rootContext.expandedItems.value.length ?? 0;
			},
			get horizontal() {
				return false;
			},
			getItemKey(index) {
				return index + rootContext.getKey(rootContext.expandedItems.value[index].value);
			},
			estimateSize(index) {
				if (typeof props.estimateSize === "function") return props.estimateSize(index);
				return props.estimateSize ?? 28;
			},
			getScrollElement() {
				return parentEl.value;
			},
			overscan: props.overscan ?? 12
		});
		const virtualizedItems = computed(() => virtualizer.value.getVirtualItems().map((item) => {
			return {
				item,
				is: cloneVNode(slots.default({
					item: rootContext.expandedItems.value[item.index],
					virtualizer: virtualizer.value,
					virtualItem: item
				})[0], {
					"data-index": item.index,
					"style": {
						position: "absolute",
						top: 0,
						left: 0,
						transform: `translateY(${item.start}px)`,
						overflowAnchor: "none"
					}
				})
			};
		}));
		function scrollToIndexAndFocus(index) {
			virtualizer.value.scrollToIndex(index, { align: "start" });
			requestAnimationFrame(() => {
				const item = parentEl.value.querySelector(`[data-index="${index}"]`);
				if (item instanceof HTMLElement) item.focus();
			});
		}
		rootContext.virtualKeydownHook.on((event) => {
			const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
			if (event.key === "Tab" && !isMetaKey) return;
			const intent = MAP_KEY_TO_FOCUS_INTENT[event.key];
			if (["first", "last"].includes(intent)) {
				event.preventDefault();
				const index = intent === "first" ? 0 : rootContext.expandedItems.value.length - 1;
				virtualizer.value.scrollToIndex(index);
				requestAnimationFrame(() => {
					const items = getItems();
					(intent === "first" ? items[0] : items[items.length - 1]).ref.focus();
				});
			} else if (intent === "prev" && event.key !== "ArrowUp") {
				const currentElement = getActiveElement();
				const currentIndex = Number(currentElement.getAttribute("data-index"));
				const currentLevel = Number(currentElement.getAttribute("data-indent"));
				const parentItem = rootContext.expandedItems.value.slice(0, currentIndex).map((item, index) => ({
					...item,
					index
				})).reverse().find((item) => item.level === currentLevel - 1);
				if (parentItem) scrollToIndexAndFocus(parentItem.index);
			} else if (!intent && !isMetaKey) {
				search.value += event.key;
				const currentIndex = Number(getActiveElement()?.getAttribute("data-index"));
				const currentMatch = optionsWithMetadata.value[currentIndex].textContent;
				const next = getNextMatch(optionsWithMetadata.value.map((i) => i.textContent), search.value, currentMatch);
				const nextMatch = optionsWithMetadata.value.find((option) => option.textContent === next);
				if (nextMatch) scrollToIndexAndFocus(nextMatch.index);
			}
			nextTick(() => {
				if (event.shiftKey && intent) rootContext.handleMultipleReplace(intent, getActiveElement(), getItems, rootContext.expandedItems.value.map((i) => i.value));
			});
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				"data-reka-virtualizer": "",
				style: normalizeStyle({
					position: "relative",
					width: "100%",
					height: `${unref(virtualizer).getTotalSize()}px`
				})
			}, [(openBlock(true), createElementBlock(Fragment, null, renderList(virtualizedItems.value, ({ is, item }) => {
				return openBlock(), createBlock(resolveDynamicComponent(is), { key: item.key });
			}), 128))], 4);
		};
	}
});
export { ContextMenuRoot_default as $, until as $t, SelectContent_default as A, useInfiniteScroll as At, DropdownMenuRoot_default as B, useScroll as Bt, SelectScrollUpButton_default as C, useDropZone as Ct, SelectItemIndicator_default as D, useEventListener as Dt, SelectItemText_default as E, useElementSize as Et, DropdownMenuRadioGroup_default as F, useMouse as Ft, PopoverClose_default as G, createSharedComposable as Gt, PopoverTrigger_default as H, useTitle as Ht, DropdownMenuPortal_default as I, useMouseInElement as It, ContextMenuTrigger_default as J, reactiveComputed as Jt, PopoverArrow_default as K, get as Kt, DropdownMenuItemIndicator_default as L, useMutationObserver as Lt, DropdownMenuTrigger_default as M, useLocalStorage as Mt, DropdownMenuSeparator_default as N, useMagicKeys as Nt, SelectItem_default as O, useFavicon as Ot, DropdownMenuRadioItem_default as P, useMounted as Pt, ContextMenuContent_default as Q, tryOnScopeDispose as Qt, DropdownMenuItem_default as R, useRafFn as Rt, SelectTrigger_default as S, useDraggable as St, SelectPortal_default as T, useElementHover as Tt, PopoverPortal_default as U, useWindowSize as Ut, DropdownMenuCheckboxItem_default as V, useStorage as Vt, PopoverContent_default as W, computedWithControl as Wt, ContextMenuPortal_default as X, refDebounced as Xt, ContextMenuSeparator_default as Y, reactiveOmit as Yt, ContextMenuItem_default as Z, toRef as Zt, SliderRange_default as _, useAsyncState as _t, ToggleGroupRoot_default as a, watchDebounced as an, ComboboxAnchor_default as at, SelectViewport_default as b, useCurrentElement as bt, TagsInputItem_default as c, CollapsibleRoot_default as ct, TabsTrigger_default as d, useForwardProps as dt, useDebounceFn as en, ComboboxInput_default as et, TabsList_default as f, useForwardExpose as ft, SliderThumb_default as g, unrefElement as gt, SliderTrack_default as h, onClickOutside as ht, ToggleGroupItem_default as i, useTimeoutFn as in, ListboxRoot_default as it, SelectRoot_default as j, useKeyModifier as jt, SelectIcon_default as k, useImage as kt, TagsInputInput_default as l, Primitive as lt, TabsRoot_default as m, defaultWindow as mt, TreeItem_default as n, useThrottleFn as nn, ListboxItem_default as nt, TagsInputItemText_default as o, whenever as on, CollapsibleTrigger_default as ot, TabsContent_default as p, breakpointsTailwind as pt, PopoverRoot_default as q, promiseTimeout as qt, TreeRoot_default as r, useTimeout as rn, ListboxContent_default as rt, TagsInputItemDelete_default as s, CollapsibleContent_default as st, TreeVirtualizer_default as t, useIntervalFn as tn, ComboboxRoot_default as tt, TagsInputRoot_default as u, useForwardPropsEmits as ut, SliderRoot_default as v, useBreakpoints as vt, SelectScrollDownButton_default as w, useElementBounding as wt, SelectValue_default as x, useDocumentVisibility as xt, Separator_default as y, useClipboard as yt, DropdownMenuContent_default as z, useResizeObserver as zt };

//# sourceMappingURL=vendor-reka-ui-C_KZ-Z9x.js.map