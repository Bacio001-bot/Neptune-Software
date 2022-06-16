"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class HelpPanelCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "helppanel",
            description: "Get the help panel",
            arguments: "",
            example: "/help",
            category: "panels",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 0, max: 0 },
                userPermissions: ["SEND_MESSAGES"],
                clientPermissions: ["SEND_MESSAGES"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        var _a, _b, _c;
        try {
            let categories = [
                "moderation",
                "info",
                "panels",
                "utils",
                "ticket",
                "poll",
                "giveaway",
                "suggestion",
                "fun",
                "bundle",
                "level",
            ];
            let embedDisplay = "";
            let menuCategories = [];
            categories.forEach((cat) => {
                let catHolder = cat;
                let emoji;
                let description;
                if (cat == "bundle") {
                    emoji = "📦";
                    description = "Faction and skyblock bundles";
                }
                if (cat == "level") {
                    emoji = "⏫";
                    description = "Level commands";
                }
                if (cat == "moderation") {
                    emoji = "⚙️";
                    description = "Moderation commands";
                }
                if (cat == "panels") {
                    emoji = "🎛️";
                    description = "Panels for the bot systems";
                }
                if (cat == "info") {
                    emoji = "🔎";
                    description = "User / Server / System info";
                }
                if (cat == "suggestion") {
                    emoji = "🦻";
                    description = "Suggestion commands";
                }
                if (cat == "utils") {
                    emoji = "👷";
                    description = "General utility commands";
                }
                if (cat == "ticket") {
                    emoji = "🎟️";
                    description = "Ticket commands";
                }
                if (cat == "poll") {
                    emoji = "📝";
                    description = "Poll commands";
                }
                if (cat == "giveaway") {
                    emoji = "🎉";
                    description = "Giveaway commands";
                }
                if (cat == "fun") {
                    emoji = "🎲";
                    description = "Fun commands";
                }
                embedDisplay = embedDisplay += `> \u200B**❯ \u200B ${emoji} \u200B  ${catHolder} »** ${description}\n`;
                menuCategories.push({
                    menuCategories: `general_help`,
                    label: catHolder,
                    description: description,
                    emoji: emoji,
                    value: `help_${catHolder}`,
                });
            });
            let picture = (_a = message.author) === null || _a === void 0 ? void 0 : _a.displayAvatarURL();
            if (!picture)
                picture = '';
            let helpEmbed = new discord_js_1.MessageEmbed()
                .setTitle(`Help`)
                .setDescription(`\n\n${embedDisplay} \n**Command Count:** ${this.client.commands.size}\n**Button / Menu Count:** ${this.client.buttons.size} \n\n __*Some commands can be ran without arguments for examples*__`)
                .setColor(this.client.config.discord.embed.color)
                .setFooter(`${(_b = message.guild) === null || _b === void 0 ? void 0 : _b.name}`, picture)
                .setTimestamp();
            let helpMenu = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageSelectMenu()
                .setCustomId("general_help")
                .setPlaceholder("Select a category")
                .addOptions(menuCategories));
            (_c = message.channel) === null || _c === void 0 ? void 0 : _c.send({
                embeds: [helpEmbed],
                components: [helpMenu],
            }).catch();
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Help Panel Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = HelpPanelCommand;
