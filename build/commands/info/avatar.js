"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class AvatarCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "avatar",
            description: "Get someone's avatar",
            arguments: "[user]",
            example: "/avatar bacio001",
            category: "info",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 0, max: 1 },
                userPermissions: ["SEND_MESSAGES"],
                clientPermissions: ["SEND_MESSAGES"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        var _a, _b;
        try {
            let member = ((_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first()) ||
                this.client.getUser(args[0] || ((_b = message.author) === null || _b === void 0 ? void 0 : _b.username));
            if (!member)
                return this.messages.error("Avatar Error", `No member found with that name`, message);
            let avatarEmbed = new discord_js_1.MessageEmbed()
                .setTitle(`${member.user.tag}'s Avatar`)
                .setImage(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setColor(this.client.config.discord.embed.color)
                .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
            message.channel.send({ embeds: [avatarEmbed] });
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Avatar Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = AvatarCommand;
