"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Interaction_1 = __importDefault(require("../../../assets/classes/Interaction"));
class TicketInteraction extends Interaction_1.default {
    constructor(client) {
        super(client, {
            name: "ticket_unarchive",
            description: "Unarchive ticket",
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
            await interaction.deferUpdate();
            let topicArgs = interaction.channel.topic.split(" - ");
            await interaction.channel.setParent(this.client.getCategory(topicArgs[3]), {
                lockPermissions: true,
            });
            let channel = this.client.getChannel(this.client.config.logging.ticket.channel);
            if (this.client.config.logging.ticket.enabled)
                this.messages.ticketEvent(`Ticket Unarchived`, `**\`${interaction.user.tag}\` has unarchived the ticket \`#${topicArgs[1]}\`**`, channel, this.client.config.discord.embed.color);
            return this.messages.success("Ticket Unarchived", `The ticket has been moved back to \`${interaction.channel.name}\``, interaction.message);
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Ticket Error", `A error occured please contact the developer`, interaction.message);
        }
    }
}
exports.default = TicketInteraction;
