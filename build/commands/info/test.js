"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class TestCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "test",
            description: "Get someone's avatar",
            arguments: "[user]",
            example: "/avatar bacio001",
            category: "info",
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
        try {
            const helpButtons = new discord_js_1.MessageActionRow()
                .addComponents(new discord_js_1.MessageSelectMenu()
                .setCustomId('help')
                .setPlaceholder("Select a help category!")
                .addOptions({
                label: "Utility Commands",
                value: "help_utility",
                description: "General info and utility commands!",
                emoji: "🛠️"
            }, {
                label: "Community Commands",
                value: "help_fun",
                description: "Fun and entertaining commands!",
                emoji: "🎪"
            }, {
                label: "Ticket Commands",
                value: "help_tickets",
                description: "Ticket utility to controll ticket aspects!",
                emoji: "🎟️"
            }, {
                label: "Staff Commands",
                value: "help_staff",
                description: "Staff utility to controll server activity!",
                emoji: "🚫"
            }, {
                label: "Admin Commands",
                value: "help_admin",
                description: "Admin utility to oversee staff and members!",
                emoji: "🚨"
            }, {
                label: "Setting Commands",
                value: "help_settings",
                description: "Management commands to controll the bot!",
                emoji: "⚙️"
            }));
            const helpButtonsRow = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                .setCustomId('ticket_create')
                .setEmoji('🗨️')
                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                .setCustomId('suggestion_accept')
                .setEmoji('⚙️')
                .setStyle('PRIMARY'));
            let embed = new discord_js_1.MessageEmbed()
                .setDescription("test");
            message.channel.send({ embeds: [embed], components: [helpButtons] });
            message.channel.send({ embeds: [embed], components: [helpButtonsRow] });
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Avatar Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = TestCommand;
