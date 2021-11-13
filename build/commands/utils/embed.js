"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class EmbedCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "embed",
            description: "Send a embeded message",
            arguments: "<channel> <message>",
            example: "/embed announcments this is the announcment",
            category: "utils",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 2, max: 1000 },
                userPermissions: ["SEND_MESSAGES"],
                clientPermissions: ["SEND_MESSAGES"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        try {
            let channel = this.client.getChannel(args[0]);
            if (channel) {
                let embedMessage = message.content.substring(this.client.config.discord.bot.prefix.length).split(" ").toString();
                embedMessage = args.splice(1).join(" ");
                const embed = new discord_js_1.MessageEmbed()
                    .setDescription(embedMessage)
                    .setColor(this.client.config.discord.embed.color);
                channel.send({ embeds: [embed] });
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Embed Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = EmbedCommand;
