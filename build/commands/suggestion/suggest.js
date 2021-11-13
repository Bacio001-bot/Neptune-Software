"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class SuggestionCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "suggest",
            description: "Suggest something",
            arguments: "<suggestion>",
            example: "/suggest Get a new bot!",
            category: "suggestion",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 1, max: 1000 },
                userPermissions: ["SEND_MESSAGES"],
                clientPermissions: ["SEND_MESSAGES"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        var _a;
        try {
            let suggestionButtons = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                .setCustomId("suggestion_accept")
                .setLabel('Accept')
                .setStyle('SUCCESS'), new discord_js_1.MessageButton()
                .setCustomId('suggestion_deny')
                .setLabel('Deny')
                .setStyle('DANGER'));
            let content = message.content.replace(`${this.client.config.discord.bot.prefix}suggest `, '');
            let channel = this.client.getChannel(this.client.config.suggestion.channel);
            if (this.client.config.suggestion.enabled) {
                let suggestionEmbed = new discord_js_1.MessageEmbed()
                    .setAuthor(`${message.author.username}'s suggestion`, message.author.displayAvatarURL())
                    .setThumbnail(message.author.displayAvatarURL())
                    .setDescription(`\`\`\`${args.join(" ")}\`\`\``)
                    .setFooter(`Vote below on this topic`, ((_a = message.guild) === null || _a === void 0 ? void 0 : _a.iconURL()) || '')
                    .setColor(this.client.config.discord.embed.color)
                    .setTimestamp();
                let suggestionMessage = await (channel === null || channel === void 0 ? void 0 : channel.send({ embeds: [suggestionEmbed], components: [suggestionButtons] }));
                await (suggestionMessage === null || suggestionMessage === void 0 ? void 0 : suggestionMessage.react('👍'));
                await (suggestionMessage === null || suggestionMessage === void 0 ? void 0 : suggestionMessage.react('👎'));
            }
            else {
                return this.messages.error("Suggestion Error", `Suggestions are currently not enabled`, message);
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Suggestion Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = SuggestionCommand;
