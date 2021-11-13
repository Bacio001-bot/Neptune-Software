"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(client, options) {
        this.client = client;
        this.logger = this.client.logger;
        this.messages = this.client.messages;
        this.userdb = this.client.userdb;
        this.bundledb = this.client.bundledb;
        this.ranMessage = "";
        this.username = "";
        this.help = {
            name: options.name,
            description: options.description,
            arguments: options.arguments || "None",
            example: options.example || options.name,
            category: options.category || "xenon",
            type: options.type || "discord",
            deleteMessage: options.deleteMessage || false,
            guildOnly: options.requirements.guildOnly,
            reqArgs: options.requirements.args,
            userPermissions: options.requirements.userPermissions || ["SEND_MESSAGES"],
            clientPermissions: options.requirements.clientPermissions || ["SEND_MESSAGES"],
        };
        this.cooldown = new Set();
    }
    startCooldown(user) {
        const time = parseInt(this.client.config.bot.cooldown);
        if (time <= 0)
            return;
        this.cooldown.add(user.id);
        setTimeout(() => this.cooldown.delete(user.id), time);
    }
}
exports.default = Command;
