"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Interaction_1 = __importDefault(require("../../../assets/classes/Interaction"));
class TicketInteraction extends Interaction_1.default {
    constructor(client) {
        super(client, {
            name: "ticket_verb",
            description: "Verb ticket",
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
            let topicArgs = interaction.channel.topic.split(" - ");
            let user = this.client.getUser(topicArgs[0]);
            if (user) {
                await interaction.channel.setParent(interaction.channel.parent, {
                    lockPermissions: true,
                });
                await interaction.channel.permissionOverwrites.edit(user, {
                    VIEW_CHANNEL: true,
                });
                this.messages.success("Ticket verbed", `All staff members can see this ticket`, interaction.message);
                let channelTopicArgs = interaction.channel.topic.split(' - ');
                let channel = this.client.getChannel(this.client.config.logging.ticket.channel);
                if (this.client.config.logging.ticket.enabled)
                    this.messages.ticketEvent(`Ticket Verbed`, `**\`${interaction.user.tag}\` has verbed the ticket \`#${channelTopicArgs[1]}\`**`, channel, this.client.config.discord.embed.color);
            }
            else {
                return this.messages.error("Ticket Error", `A error occured please contact the developer`, interaction.message);
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Ticket Error", `A error occured please contact the developer`, interaction.message);
        }
    }
}
exports.default = TicketInteraction;
