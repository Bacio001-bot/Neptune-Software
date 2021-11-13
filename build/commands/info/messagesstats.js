"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class TicketStatsCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "messagesstats",
            description: "Get info of someone's messages stats",
            arguments: "<user>",
            example: "/messagesstats bacio",
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
        var _a, _b, _c, _d;
        try {
            let user = ((_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first()) ||
                this.client.getUser(args[0] || message.author.username);
            if (!user)
                return this.messages.error("Message Stats Error", `Please supply a valid user`, message);
            let result = this.userdb.getUser(user.user.id, "discordID");
            const embed = new discord_js_1.MessageEmbed()
                .setAuthor(`${(_b = user.user) === null || _b === void 0 ? void 0 : _b.tag} Message Stats`, user.user.displayAvatarURL({ dynamic: true }))
                .setColor(this.client.config.discord.embed.color)
                .setDescription(`**Replies: **${result === null || result === void 0 ? void 0 : result.messages.replies}\n**Text-to-Speech: **${result === null || result === void 0 ? void 0 : result.messages.tts}\n**@everyone / @here: **${result === null || result === void 0 ? void 0 : result.messages.everyone} \n**Total Messages: **${result === null || result === void 0 ? void 0 : result.messages.total}`)
                .setThumbnail('https://cdn0.iconfinder.com/data/icons/messages-chat-smileys/24/messages-double-bubble-message-chat-conversation-512.png')
                .setFooter(`Requested by ${(_c = message.author) === null || _c === void 0 ? void 0 : _c.tag}`, ((_d = message.author) === null || _d === void 0 ? void 0 : _d.displayAvatarURL({ dynamic: true })) || '');
            message.channel.send({ embeds: [embed] });
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Message Stats Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = TicketStatsCommand;
