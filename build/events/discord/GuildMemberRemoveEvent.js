"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../assets/classes/Event"));
class GuildMemberRemoveEvent extends Event_1.default {
    constructor(client) {
        super(client, "on", "guildMemberRemove");
    }
    async execute(member) {
        this.userdb.removeUser(member.user.id, "discordID");
        if (this.client.config.logging.left.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.left.channel);
            if (channel) {
                this.client.messages.banKickEvent(`**<@${member.user.id}> has left the server**`, member.user, channel);
            }
        }
    }
}
exports.default = GuildMemberRemoveEvent;
