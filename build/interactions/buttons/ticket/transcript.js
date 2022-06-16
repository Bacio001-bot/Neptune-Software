"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Interaction_1 = __importDefault(require("../../../assets/classes/Interaction"));
class TicketInteraction extends Interaction_1.default {
    constructor(client) {
        super(client, {
            name: "ticket_transcript",
            description: "Transcript ticket",
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
            if (this.client.config.ticket.user_transcript_enabled) {
                let topic = interaction.channel.topic;
                interaction.channel.setTopic(topic.replace('FALSE', 'TRUE'));
                this.messages.success("Ticket Transcript Requested", `After the ticket is closed the bot will send you a transcript of the ticket`, interaction.message);
                let channelTopicArgs = interaction.channel.topic.split(' - ');
                let channel = this.client.getChannel(this.client.config.logging.ticket.channel);
                if (this.client.config.logging.ticket.enabled)
                    this.messages.ticketEvent(`Ticket Transcript Requested`, `**\`${interaction.user.tag}\` has requested a transcript for the ticket \`#${channelTopicArgs[1]}\`**`, channel, this.client.config.discord.embed.color);
            }
            else {
                return this.messages.error("Ticket Error", `User transcripts are disabled in this guild`, interaction.message);
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Ticket Error", `A error occured please contact the developer`, interaction.message);
        }
    }
}
exports.default = TicketInteraction;
