"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Interaction_1 = __importDefault(require("../../../assets/classes/Interaction"));
class TicketInteraction extends Interaction_1.default {
    constructor(client) {
        super(client, {
            name: "ticket_create",
            description: "Create ticket",
            type: "discord",
            category: "ticket",
            requirements: {
                userPermissions: ["SEND_MESSAGES"],
                clientPermissions: ["SEND_MESSAGES"],
                guildOnly: true,
            },
        });
    }
    async execute(interaction, args) {
        try {
            await interaction.deferUpdate();
            if (this.client.config.ticket.enabled) {
                this.client.config.ticket.categories.forEach(async (cat) => {
                    var _a, _b;
                    let ticketId = Math.floor(100000 + Math.random() * 900000);
                    if (cat[1] == interaction.values.toString().replace("_", " ")) {
                        let category = this.client.getCategory(cat[2]);
                        if (category) {
                            let ticketChannel = await interaction.message.guild.channels.create(`${interaction.user.tag.toUpperCase()}-TICKET #${ticketId}`, {
                                type: "GUILD_TEXT",
                            });
                            await ticketChannel.setParent(category, {
                                lockPermissions: true,
                            });
                            await ticketChannel.permissionOverwrites.edit(interaction.user, {
                                VIEW_CHANNEL: true,
                                SEND_MESSAGES: true,
                            });
                            ticketChannel.setTopic(`${interaction.user.id} - ${ticketId} - FALSE - ${category.id}`);
                            const ticketRow = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                                .setCustomId('ticket_transcript')
                                .setLabel('Transcript')
                                .setEmoji('📰')
                                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                                .setCustomId('ticket_raise')
                                .setLabel('Raise')
                                .setEmoji('⏫')
                                .setStyle('SUCCESS'), new discord_js_1.MessageButton()
                                .setCustomId('ticket_verb')
                                .setLabel('Verb')
                                .setEmoji('⏬')
                                .setStyle('DANGER'), new discord_js_1.MessageButton()
                                .setCustomId('ticket_preclose')
                                .setLabel('Close ')
                                .setEmoji('🔐')
                                .setStyle('PRIMARY'));
                            let embed = new discord_js_1.MessageEmbed()
                                .setAuthor(`${interaction.guild.name} Ticket utils panel - Ticket #${ticketId}`, ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.displayAvatarURL()) || '')
                                .setThumbnail(((_b = interaction.user) === null || _b === void 0 ? void 0 : _b.displayAvatarURL()) || '')
                                .setDescription(`<@${interaction.user.id}> *please describe the reason of your ticket!*\n\n **Format**\`\`\`Reason: I need support \nLevel of urgency: Medium \nAnything else:\`\`\`\n**Closing**\n After this ticket is finished you or staff can close this ticket by clicking on the button! \n\n**Transcript**\nIf you would like to get a transcript of this ticket click on the button before you close the ticket!\n\n**NOTE: None staff members have to use ${this.client.config.discord.bot.prefix}close**`)
                                .setColor(this.client.config.discord.embed.color);
                            try {
                                let twelcomemessage = await ticketChannel.send({ embeds: [embed], components: [ticketRow] });
                                if (this.client.config.ticket.pin_instruction)
                                    await twelcomemessage.pin();
                                let ping = await ticketChannel.send(`<@${interaction.user.id}>`);
                                ping.delete();
                            }
                            catch (err) {
                                console.log(err);
                            }
                            let channel = this.client.getChannel(this.client.config.logging.ticket.channel);
                            if (this.client.config.logging.ticket.enabled)
                                this.messages.ticketEvent(`Ticket Created`, `**\`${interaction.user.tag}\` has created the ticket \`#${ticketId}\`**`, channel, "GREEN");
                            let result = this.userdb.getUser(interaction.user.id, "discordID");
                            if (result) {
                                this.userdb.updateUser(interaction.user.id, "discordID", "openTickets", result.tickets.openTickets + 1);
                            }
                        }
                        else {
                            return this.messages.error("Ticket Error", `Category \`${cat[2]}\` doesn't exist`, interaction.message);
                        }
                    }
                });
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Ticket Error", `A error occured please contact the developer`, interaction.message);
        }
    }
}
exports.default = TicketInteraction;
