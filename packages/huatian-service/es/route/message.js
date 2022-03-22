"use strict";
exports.__esModule = true;
exports.get = exports.post = void 0;
var domain_1 = require("@huatian/domain");
var post = function (req) {
    var fromId = req.user.getId();
    var receiverId = req.body.to;
    var msg = req.body.msg;
    var from = domain_1.Repository.userRepo().getByID(fromId);
    var to = domain_1.Repository.userRepo().getByID(receiverId);
    var session = domain_1.Repository.chatSessionRepo().getSession(from, to);
    var sessionTo = domain_1.Repository.chatSessionRepo().getSession(to, from);
    session.send(msg);
    sessionTo.receive(msg);
    return 'ok';
};
exports.post = post;
var get = function (req) {
    var fromId = req.user.getId();
    var receiverId = req.query.to;
    var from = domain_1.Repository.userRepo().getByID(fromId);
    var to = domain_1.Repository.userRepo().getByID(receiverId);
    var session = domain_1.Repository.chatSessionRepo().getSession(from, to);
    return session.getChatRecords();
};
exports.get = get;
