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
exports.Emiter = void 0;
var Emiter = /** @class */ (function () {
    function Emiter() {
        this.topics = new Map();
    }
    Emiter.prototype.getTopic = function (type) {
        if (!this.topics.has(type)) {
            this.topics.set(type, []);
        }
        return this.topics.get(type);
    };
    Emiter.prototype.on = function (type, handler) {
        var handlers = this.getTopic(type);
        handlers.push(handler);
        return function () {
            return handlers.filter(function (x) { return x !== handler; });
        };
    };
    Emiter.prototype.emit = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var handlers = this.getTopic(type);
        handlers.forEach(function (handler) {
            handler.apply(void 0, __spreadArray([], __read(args), false));
        });
    };
    return Emiter;
}());
exports.Emiter = Emiter;
