"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
const ms_1 = __importDefault(require("ms"));
class TicketdeleteCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "ticketclose",
            description: "Close your ticket",
            arguments: "",
            example: "/ticketclose",
            category: "ticket",
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
        var _a, _b;
        try {
            if (!message.channel.name.includes("ticket"))
                return this.messages.error("Ticket Close Error", `You can only run this command in a ticket`, message);
            await message.channel.setParent(message.channel.parent, {
                lockPermissions: true,
            });
            let ticketButtons = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                .setCustomId("ticket_close")
                .setLabel("Close")
                .setEmoji("🔐")
                .setStyle("PRIMARY"), new discord_js_1.MessageButton()
                .setCustomId("ticket_archive")
                .setLabel("Archive")
                .setEmoji("📎")
                .setStyle("PRIMARY"), new discord_js_1.MessageButton()
                .setCustomId("ticket_unarchive")
                .setLabel("Unarchive")
                .setEmoji("📂")
                .setStyle("PRIMARY"), new discord_js_1.MessageButton()
                .setCustomId("ticket_reopen")
                .setLabel("Reopen")
                .setEmoji("🔓")
                .setStyle("PRIMARY"), new discord_js_1.MessageButton()
                .setCustomId("ticket_delete")
                .setLabel("Delete")
                .setEmoji("🛑")
                .setStyle("DANGER"));
            const embed = new discord_js_1.MessageEmbed()
                .setTitle("Ticket Panel")
                .setColor(this.client.config.discord.embed.color)
                .setDescription(`**All none staff members have been removed from the ticket**`);
            message.channel.send({ embeds: [embed], components: [ticketButtons] });
            let topicArgs = message.channel.topic.split(" - ");
            let msgs = await message.channel.messages.fetch({
                limit: 100,
            });
            let data = `Date: ${new Date().toLocaleString()} Subject: ${message.channel.parent.name} Closed By: ${message.author.tag}(${message.author.id})\n\n`;
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
            const embed2 = new discord_js_1.MessageEmbed()
                .setTitle(`Ticket #${topicArgs[1]} Transcript`)
                .setColor(this.client.config.discord.embed.color)
                .setFooter(`Ticket from ${(_a = message.guild) === null || _a === void 0 ? void 0 : _a.name}`, ((_b = message.guild) === null || _b === void 0 ? void 0 : _b.iconURL({ dynamic: true })) || "");
            if (topicArgs[2] == "TRUE") {
                user === null || user === void 0 ? void 0 : user.send({
                    embeds: [embed2],
                }).catch((err) => console.log(err));
                user === null || user === void 0 ? void 0 : user.send({
                    files: [log],
                }).catch((err) => console.log(err));
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Ticket Close Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = TicketdeleteCommand;
