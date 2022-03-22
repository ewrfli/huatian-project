"use strict";
exports.__esModule = true;
exports.get = void 0;
var domain_1 = require("@huatian/domain");
var get = function (req) {
    var user = domain_1.Repository.userRepo().getByID(req.user.getId());
    return user.toJSON();
};
exports.get = get;
