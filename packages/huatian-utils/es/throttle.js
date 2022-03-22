"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.throttle = void 0;
function throttle(fn, limit) {
    if (limit === void 0) { limit = 300; }
    var inThrottle = false, lastResult;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!inThrottle) {
            inThrottle = true;
            setTimeout(function () { return inThrottle = false; }, limit);
            lastResult = fn.apply(void 0, __spreadArray([], __read(args), false));
        }
        return lastResult;
    };
}
exports.throttle = throttle;
// function wait(ms : number) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms)
//   })
// }
// async function run(){
//   const fn = throttle((msg : string) => {
//     console.log('running...', msg)
//   })
//   for(let i = 0; i < 10; i++) {
//     await wait(100)
//     fn(i + "")
//   }
// }
// run()
