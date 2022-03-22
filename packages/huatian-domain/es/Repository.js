"use strict";
exports.__esModule = true;
exports.Repository = void 0;
var _1 = require(".");
var Discovery_1 = require("./Discovery");
var RelationShip_1 = require("./RelationShip");
var Repository = /** @class */ (function () {
    function Repository() {
    }
    Repository.userRepo = function () {
        if (!Repository._userRepo) {
            Repository._userRepo = new _1.UserRepo();
        }
        return Repository._userRepo;
    };
    Repository.discoveryRepo = function () {
        if (!Repository._discoveryRepo) {
            Repository._discoveryRepo = new Discovery_1.DiscoveryRepo();
        }
        return Repository._discoveryRepo;
    };
    Repository.relationShipRepo = function () {
        if (!Repository._relationShipRepo) {
            Repository._relationShipRepo = new RelationShip_1.RelationRepo();
        }
        return Repository._relationShipRepo;
    };
    Repository.chatSessionRepo = function () {
        if (!Repository._chatSessionRepo) {
            Repository._chatSessionRepo = new _1.ChatSessionRepo();
        }
        return Repository._chatSessionRepo;
    };
    return Repository;
}());
exports.Repository = Repository;
