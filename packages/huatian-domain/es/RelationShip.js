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
exports.RelationRepo = void 0;
var _1 = require(".");
var RelationRepo = /** @class */ (function () {
    function RelationRepo() {
        this.relations = new Map();
    }
    RelationRepo.prototype.addToFriend = function (a, b) {
        var linkToA = this.relations.get(a.getId());
        if (!linkToA) {
            this.relations.set(a.getId(), new Set());
        }
        this.relations.get(a.getId()).add(b.getId());
    };
    RelationRepo.prototype.addRelation = function (a, b) {
        this.addToFriend(a, b);
        this.addToFriend(b, a);
    };
    RelationRepo.prototype.friends = function (a) {
        var friendsInId = this.relations.get(a.getId());
        if (!friendsInId) {
            return [];
        }
        return __spreadArray([], __read(friendsInId.values()), false).map(function (x) {
            return _1.Repository.userRepo().getByID(x);
        });
    };
    RelationRepo.prototype.isFriend = function (a, b) {
        var friendsInId = this.relations.get(a.getId()) || new Set();
        return friendsInId.has(b.getId());
    };
    return RelationRepo;
}());
exports.RelationRepo = RelationRepo;
