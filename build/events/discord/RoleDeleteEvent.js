"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../assets/classes/Event"));
class RoleDeleteEvent extends Event_1.default {
    constructor(client) {
        super(client, "on", "roleDelete");
    }
    async execute(role) {
        if (this.client.config.logging.role.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.role.channel);
            if (channel && role) {
                this.client.messages.roleEvent(`Role Delete`, `**The role \`${role.name}\` has been deleted**`, role, channel, "RED");
            }
        }
    }
}
exports.default = RoleDeleteEvent;
