"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../assets/classes/Event"));
class RoleUpdateEvent extends Event_1.default {
    constructor(client) {
        super(client, "on", "roleUpdate");
    }
    async execute(oldRole, newRole) {
        if (this.client.config.logging.role.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.role.channel);
            if (channel && oldRole && newRole) {
                if (oldRole.name != newRole.name)
                    this.client.messages.roleEvent(`Role Update`, `**The role \`${oldRole.name}\` has been changed to \`${newRole.name}\`**`, newRole, channel, this.client.config.discord.embed.color);
                if (!oldRole.mentionable && newRole.mentionable || oldRole.mentionable && !newRole.mentionable)
                    this.client.messages.roleEvent(`Role Update`, `**The role \`${oldRole.name}\` mentionable status has changed \`${oldRole.mentionable}\` -> \`${newRole.mentionable}\`**`, newRole, channel, this.client.config.discord.embed.color);
                if (!oldRole.icon && newRole.icon || oldRole.icon && !newRole.icon)
                    this.client.messages.roleEvent(`Role Update`, `**The role \`${oldRole.name}\` icon has changed**`, newRole, channel, this.client.config.discord.embed.color);
            }
        }
    }
}
exports.default = RoleUpdateEvent;
