"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../assets/classes/Event"));
class RoleCreateEvent extends Event_1.default {
    constructor(client) {
        super(client, "on", "roleCreate");
    }
    async execute(role) {
        if (this.client.config.logging.role.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.role.channel);
            if (channel && role) {
                this.client.messages.roleEvent(`Role Create`, `**The role \`${role.name}\` has been created**`, role, channel, "GREEN");
            }
        }
    }
}
exports.default = RoleCreateEvent;
