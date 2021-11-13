"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../assets/classes/Event"));
class GuildBanAddEvent extends Event_1.default {
    constructor(client) {
        super(client, "on", "guildBanAdd");
    }
    async execute(ban) {
        if (this.client.config.logging.ban.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.ban.channel);
            if (channel) {
                this.client.messages.banKickEvent(`**<@${ban.user.id}> has been banned**`, ban.user, channel);
            }
        }
    }
}
exports.default = GuildBanAddEvent;
