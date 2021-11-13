"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Interaction_1 = __importDefault(require("../../../assets/classes/Interaction"));
class TicketInteraction extends Interaction_1.default {
    constructor(client) {
        super(client, {
            name: "ticket_reopen",
            description: "Reopen a ticket",
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
        var _a, _b;
        try {
            let topicArgs = interaction.channel.topic.split(" - ");
            if (((_b = (_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.name) == this.client.config.ticket.archive_category) {
                await interaction.channel.setParent(this.client.getCategory(topicArgs[3]));
            }
            let channel = this.client.getChannel(this.client.config.logging.ticket.channel);
            if (this.client.config.logging.ticket.enabled)
                this.messages.ticketEvent(`Ticket Reopen`, `**\`${interaction.user.tag}\` has reopened the ticket \`#${topicArgs[1]}\`**`, channel, this.client.config.discord.embed.color);
            interaction.channel.guild.members.cache.forEach(async (member) => {
                if (interaction.channel.topic.includes(member.user.id)) {
                    await interaction.channel.permissionOverwrites.edit(member.user, {
                        VIEW_CHANNEL: true,
                    });
                }
            });
            return this.messages.success("Ticket Opened", `The ticket has been reopened`, interaction.message);
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Ticket Error", `A error occured please contact the developer`, interaction.message);
        }
    }
}
exports.default = TicketInteraction;
