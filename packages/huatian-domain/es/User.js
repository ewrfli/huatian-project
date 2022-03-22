"use strict";
exports.__esModule = true;
exports.UserRepo = exports.User = void 0;
var mockjs_1 = require("mockjs");
var Repository_1 = require("./Repository");
var User = /** @class */ (function () {
    function User(id, uname, avatar) {
        this.id = id;
        this.uname = uname;
        this.avatar = avatar;
    }
    User.prototype.getAvatar = function () {
        return this.avatar;
    };
    User.prototype.getId = function () {
        return this.id;
    };
    User.prototype.getName = function () {
        return this.uname;
    };
    User.prototype.addRelation = function (user) {
        Repository_1.Repository.relationShipRepo().addRelation(this, user);
    };
    User.prototype.toJSON = function () {
        return {
            id: this.id,
            uname: this.uname,
            avatar: this.avatar
        };
    };
    User.fromJSON = function (json) {
        var user = new User(json.id, json.uname, json.avatar);
        return user;
    };
    return User;
}());
exports.User = User;
var UserRepo = /** @class */ (function () {
    function UserRepo() {
        this.users = new Map();
        this.generateUsers(20);
    }
    UserRepo.prototype.getByID = function (id) {
        return this.users.get(id + "");
    };
    UserRepo.prototype.add = function (user) {
        this.users.set(user.getId() + '', user);
    };
    UserRepo.prototype.getAll = function () {
        return this.users.values();
    };
    UserRepo.prototype.generateUsers = function (N) {
        var imageList = [
            "http://localhost:3002/assets/p1.png",
            "http://localhost:3002/assets/p2.png",
            "http://localhost:3002/assets/p3.png",
            "http://localhost:3002/assets/p4.png",
            "http://localhost:3002/assets/p5.png",
            "http://localhost:3002/assets/p6.png",
            "http://localhost:3002/assets/p7.jpg",
            "http://localhost:3002/assets/p8.png",
            "http://localhost:3002/assets/p9.jpg",
        ];
        for (var i = 1; i < N; i++) {
            var user = new User(i, mockjs_1.Random.cname(), imageList[Math.floor(Math.random() * imageList.length)]);
            this.add(user);
        }
    };
    return UserRepo;
}());
exports.UserRepo = UserRepo;
