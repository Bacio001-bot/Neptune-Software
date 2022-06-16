"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Interaction_1 = __importDefault(require("../../../assets/classes/Interaction"));
class TicketInteraction extends Interaction_1.default {
    constructor(client) {
        super(client, {
            name: "ticket_delete",
            description: "Delete ticket",
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
            let channel = this.client.getChannel(this.client.config.logging.ticket.channel);
            if (this.client.config.logging.ticket.enabled)
                this.messages.ticketEvent(`Ticket Deleted`, `**\`${interaction.user.tag}\` has deleted the ticket \`#${topicArgs[1]}\`**`, channel, "RED");
            await interaction.channel.delete();
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Ticket Error", `A error occured please contact the developer`, interaction.message);
        }
    }
}
exports.default = TicketInteraction;
