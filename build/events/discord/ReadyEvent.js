"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../assets/classes/Event"));
class ReadyEvent extends Event_1.default {
    constructor(client) {
        super(client, "once", "ready");
    }
    async execute() {
        var _a;
        this.logger.logo();
        this.logger.logDiscord(`${this.logger.highlight(`${(_a = this.client.user) === null || _a === void 0 ? void 0 : _a.tag}`)} has successfully logged into discord`);
    }
}
exports.default = ReadyEvent;
