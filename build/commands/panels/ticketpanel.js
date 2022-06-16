"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class TicketPanelCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "ticketpanel",
            description: "Sends the ticket panel",
            arguments: "<Channel>",
            example: "/tpanel",
            category: "panels",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 0, max: 1 },
                userPermissions: ["ADMINISTRATOR"],
                clientPermissions: ["ADMINISTRATOR"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        var _a, _b;
        if (!this.client.config.ticket.enabled)
            return this.messages.error("Ticket Panel Error", `Ticket system is disabled`, message);
        try {
            let categoriesArray = [];
            this.client.config.ticket.categories.forEach((cat) => {
                let category = this.client.getCategory(cat[2]);
                if (!category) {
                    return this.messages.error("Ticket Panel Error", `\`${cat[2]}\` category could not be found`, message);
                }
                categoriesArray.push({
                    emoji: cat[0],
                    label: cat[1],
                    value: `${cat[1].replace(" ", "_")}`,
                });
            });
            let ticketchannel = this.client.getChannel(args[0] || message.channel.name);
            this.messages.success("Ticket Panel Created", `Ticket panel has been sent to \`${ticketchannel === null || ticketchannel === void 0 ? void 0 : ticketchannel.name}\``, message);
            let ticketPanelEmbed = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageSelectMenu()
                .setCustomId("ticket_create")
                .setPlaceholder("Create a ticket")
                .addOptions(categoriesArray));
            let tPanelEmbed = new discord_js_1.MessageEmbed()
                .setTitle(`Ticket System`)
                .setDescription(`> Select one of the options below to create a ticket`)
                .setColor(this.client.config.discord.embed.color)
                .setFooter(`${(_a = message.guild) === null || _a === void 0 ? void 0 : _a.name}`, `${(_b = message.guild) === null || _b === void 0 ? void 0 : _b.iconURL()}` || ' ')
                .setTimestamp();
            ticketchannel === null || ticketchannel === void 0 ? void 0 : ticketchannel.send({
                embeds: [tPanelEmbed],
                components: [ticketPanelEmbed],
            });
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Ticket Panel Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = TicketPanelCommand;
