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
exports.DiscoveryItem = exports.DiscoveryRepo = void 0;
var Repository_1 = require("./Repository");
var mockjs_1 = require("mockjs");
var DiscoveryRepo = /** @class */ (function () {
    function DiscoveryRepo() {
        this.list = [];
        this.generateDiscoveryItem();
    }
    DiscoveryRepo.prototype.getAll = function () {
        return this.list;
    };
    DiscoveryRepo.prototype.add = function (item) {
        this.list.push(item);
    };
    DiscoveryRepo.prototype.generateDiscoveryItem = function () {
        var _this = this;
        var users = __spreadArray([], __read(Repository_1.Repository.userRepo().getAll()), false);
        __spreadArray([], __read(Array(10)), false).forEach(function (_, i) {
            _this.add(new DiscoveryItem(mockjs_1.Random.ctitle(), mockjs_1.Random.csentence(), mockjs_1.Random.image("100x100"), users[Math.floor(Math.random() * users.length)]));
        });
    };
    return DiscoveryRepo;
}());
exports.DiscoveryRepo = DiscoveryRepo;
var DiscoveryItem = /** @class */ (function () {
    function DiscoveryItem(title, content, cover, user) {
        this.title = title;
        this.content = content;
        this.cover = cover;
        this.user = user;
    }
    DiscoveryItem.prototype.toJSON = function () {
        return {
            title: this.title,
            content: this.content,
            cover: this.cover,
            avatar: this.user.getAvatar()
        };
    };
    return DiscoveryItem;
}());
exports.DiscoveryItem = DiscoveryItem;
