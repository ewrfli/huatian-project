"use strict";
exports.__esModule = true;
exports.get = void 0;
var domain_1 = require("@huatian/domain");
function get() {
    var repo = domain_1.Repository.discoveryRepo();
    return repo.getAll().map(function (x) { return x.toJSON(); });
}
exports.get = get;
