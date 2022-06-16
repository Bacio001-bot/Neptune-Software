"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../assets/classes/Event"));
class GuildMemberUpdateEvent extends Event_1.default {
    constructor(client) {
        super(client, "on", "guildMemberUpdate");
    }
    async execute(oldMember, newMember) {
        let oldHasRole = oldMember.roles.cache.find(r => r === this.client.getRole(this.client.config.role.notification.role));
        let newHasRole = newMember.roles.cache.find(r => r === this.client.getRole(this.client.config.role.notification.role));
        if (!oldHasRole && newHasRole) {
            if (this.client.config.role.notification.enabled) {
                let channel = this.client.getChannel(this.client.config.role.notification.channel);
                let message = this.placeholder.replaceWelcomeMessage(this.client.config.role.notification.message, newMember);
                let sentMessage = await (channel === null || channel === void 0 ? void 0 : channel.send(message).catch((err) => console.log(err)));
                await (sentMessage === null || sentMessage === void 0 ? void 0 : sentMessage.react('👋'));
            }
        }
        if (this.client.config.logging.boost.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.boost.channel);
            if (channel) {
                if (oldMember.premiumSince == null && newMember.premiumSince != null) {
                    this.client.messages.boostEvent(`${newMember.user.username} Boosted`, `**<@${newMember.user.id}> has boosted the server**`, channel);
                }
                if (oldMember.premiumSince != null && newMember.premiumSince == null) {
                    this.client.messages.boostEvent(`${newMember.user.username} Boost expired`, `**<@${newMember.user.id}> has lost the boost on the server**`, channel);
                }
            }
        }
    }
}
exports.default = GuildMemberUpdateEvent;
