"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Interaction_1 = __importDefault(require("../../../assets/classes/Interaction"));
class TicketInteraction extends Interaction_1.default {
    constructor(client) {
        super(client, {
            name: "ticket_raise",
            description: "Raise ticket",
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
            interaction.guild.roles.cache.forEach(async (role) => {
                if (!role.permissions.has('ADMINISTRATOR'))
                    await interaction.channel.permissionOverwrites.edit(role, {
                        VIEW_CHANNEL: false,
                    }).catch((err) => { });
                ;
            });
            this.messages.success("Ticket raise", `All staff members without \`ADMINISTRATOR\` perms can't see this ticket`, interaction.message);
            let channelTopicArgs = interaction.channel.topic.split(' - ');
            let channel = this.client.getChannel(this.client.config.logging.ticket.channel);
            if (this.client.config.logging.ticket.enabled)
                this.messages.ticketEvent(`Ticket Raised`, `**\`${interaction.user.tag}\` has raised the ticket \`#${channelTopicArgs[1]}\`**`, channel, this.client.config.discord.embed.color);
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Ticket Error", `A error occured please contact the developer`, interaction.message);
        }
    }
}
exports.default = TicketInteraction;
