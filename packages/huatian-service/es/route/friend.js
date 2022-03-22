"use strict";
exports.__esModule = true;
exports.get = exports.getForAdmin = exports.put = void 0;
var domain_1 = require("@huatian/domain");
var put = function (req) {
    var uid = req.params.uid;
    var to = domain_1.Repository.userRepo().getByID(uid);
    req.user.addRelation(to);
};
exports.put = put;
var getForAdmin = function (req) {
    var uid = req.params.uid;
    var user = domain_1.Repository.userRepo().getByID(uid);
    return domain_1.Repository.relationShipRepo().friends(user).map(function (x) { return x.toJSON(); });
};
exports.getForAdmin = getForAdmin;
var get = function (req) {
    var user = domain_1.Repository.userRepo().getByID(req.user.getId());
    return domain_1.Repository.relationShipRepo().friends(user).map(function (x) { return x.toJSON(); });
};
exports.get = get;
