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
exports.get = void 0;
var domain_1 = require("@huatian/domain");
var get = function (req) {
    var relationRepo = domain_1.Repository.relationShipRepo();
    var users = __spreadArray([], __read(domain_1.Repository.userRepo().getAll()), false).filter(function (x) { return x.getId() !== req.user.getId(); })
        .filter(function (x) { return !relationRepo.isFriend(req.user, x); })
        .slice(0, 10)
        .map(function (x) { return x.toJSON(); });
    return users;
};
exports.get = get;
