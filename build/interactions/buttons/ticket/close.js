"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Interaction_1 = __importDefault(require("../../../assets/classes/Interaction"));
const fs_1 = __importDefault(require("fs"));
const ms_1 = __importDefault(require("ms"));
class TicketInteraction extends Interaction_1.default {
    constructor(client) {
        super(client, {
            name: "ticket_close",
            description: "Close ticket",
            type: "discord",
            category: "ticket",
            requirements: {
                userPermissions: ["ADMINISTRATOR"],
                clientPermissions: ["ADMINISTRATOR"],
                guildOnly: true,
            },
        });
    }
    async execute(interaction, args) {
        try {
            let topicArgs = interaction.channel.topic.split(" - ");
            let msgs = await interaction.message.channel.messages.fetch({
                limit: 100,
            });
            let data = `Date: ${new Date().toLocaleString()} Subject: ${interaction.channel.parent.name} Closed By: ${interaction.user.tag}(${interaction.user.id})\n\n`;
            msgs = msgs.sort((a, b) => a.createdTimestamp - b.createdTimestamp);
            msgs.forEach((msg) => {
                if (msg.content) {
                    data += `   ${msg.author.tag} » ${(0, ms_1.default)(Date.now() - msg.createdTimestamp, { long: true })} ago\n`;
                    data += `       ${msg.content}\n`;
                    data += `\n`;
                }
            });
            let user = this.client.getUser(topicArgs[0]);
            if (!user)
                return;
            let log = new discord_js_1.MessageAttachment(Buffer.from(data), `${topicArgs[0]}-${topicArgs[1]}.txt`);
            try {
                const embed = new discord_js_1.MessageEmbed()
                    .setTitle(`Ticket #${topicArgs[1]} Transcript`)
                    .setColor(this.client.config.discord.embed.color)
                    .setFooter(`Ticket from ${interaction.guild.name}`, interaction.guild.iconURL({ dynamic: true }));
                let ticketLogs = this.client.getChannel(this.client.config.ticket.log_channel);
                if (ticketLogs) {
                    ticketLogs.send({ embeds: [embed] }).catch((err) => console.log(err));
                    ;
                    ticketLogs.send({ files: [log] }).catch((err) => console.log(err));
                    ;
                }
                let channel = this.client.getChannel(this.client.config.logging.ticket.channel);
                if (this.client.config.logging.ticket.enabled)
                    this.messages.ticketEvent(`Ticket Close`, `**\`${interaction.user.tag}\` has closed the ticket \`#${topicArgs[1]}\`**`, channel, this.client.config.discord.embed.color);
            }
            catch (err) { }
            fs_1.default.writeFile(`storage/tickets/${topicArgs[0]}-${topicArgs[1]}`, data, "utf8", function (err) {
            });
            let result = this.userdb.getUser(user === null || user === void 0 ? void 0 : user.id, "discordID");
            if (result) {
                this.userdb.updateUser(user === null || user === void 0 ? void 0 : user.id, "discordID", "openTickets", result.tickets.openTickets - 1);
                this.userdb.updateUser(user === null || user === void 0 ? void 0 : user.id, "discordID", "closedTickets", result.tickets.closedTickets + 1);
            }
            interaction.channel.delete().catch((err) => { console.log(err); });
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Ticket Error", `A error occured please contact the developer`, interaction.message);
        }
    }
}
exports.default = TicketInteraction;
