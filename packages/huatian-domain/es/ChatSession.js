"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ChatSessionRepo = exports.ChatSession = exports.ChatSessionTopics = void 0;
var utils_1 = require("@huatian/utils");
var ChatSessionTopics;
(function (ChatSessionTopics) {
    ChatSessionTopics[ChatSessionTopics["ChatListChanged"] = 0] = "ChatListChanged";
    ChatSessionTopics[ChatSessionTopics["ChatMsgToSend"] = 1] = "ChatMsgToSend";
})(ChatSessionTopics = exports.ChatSessionTopics || (exports.ChatSessionTopics = {}));
var ChatSession = /** @class */ (function (_super) {
    __extends(ChatSession, _super);
    function ChatSession(from, to) {
        var _this = _super.call(this) || this;
        _this.from = from;
        _this.to = to;
        _this.chatRecord = [];
        return _this;
    }
    ChatSession.prototype.getChatRecords = function () {
        return this.chatRecord;
    };
    ChatSession.prototype.getChatList = function () {
        var _this = this;
        return this.chatRecord.map(function (record) {
            return {
                type: record.type,
                content: record.message,
                avatar: record.type === "send"
                    ? _this.from.getAvatar()
                    : _this.to.getAvatar()
            };
        });
    };
    ChatSession.prototype.hydrateMessage = function (messages) {
        this.chatRecord = messages;
        this.emit(ChatSessionTopics.ChatListChanged, this.chatRecord);
    };
    ChatSession.prototype.unread = function () {
        return this.chatRecord.length;
    };
    ChatSession.prototype.lastReceivedMessage = function () {
        for (var i = this.chatRecord.length - 1; i >= 0; i--) {
            var record = this.chatRecord[i];
            if (record.type === 'receive') {
                return record;
            }
        }
        return null;
    };
    ChatSession.prototype.getReceiver = function () {
        return this.to;
    };
    ChatSession.prototype.receive = function (msg) {
        this.chatRecord.push({
            type: "receive",
            message: msg
        });
        this.emit(ChatSessionTopics.ChatListChanged);
    };
    ChatSession.prototype.send = function (msg) {
        this.chatRecord.push({
            type: "send",
            message: msg
        });
        this.emit(ChatSessionTopics.ChatMsgToSend, msg);
        this.emit(ChatSessionTopics.ChatListChanged);
    };
    ChatSession.Topics = ChatSessionTopics;
    return ChatSession;
}(utils_1.Emiter));
exports.ChatSession = ChatSession;
var ChatSessionRepo = /** @class */ (function () {
    function ChatSessionRepo() {
        this.sessions = new Map();
    }
    ChatSessionRepo.prototype.getSession = function (from, to) {
        if (!this.sessions.has(from.getId())) {
            this.sessions.set(from.getId(), new Map());
        }
        var map = this.sessions.get(from.getId());
        if (!map.get(to.getId())) {
            map.set(to.getId(), new ChatSession(from, to));
        }
        return map.get(to.getId());
    };
    return ChatSessionRepo;
}());
exports.ChatSessionRepo = ChatSessionRepo;
