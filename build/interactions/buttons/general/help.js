"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Interaction_1 = __importDefault(require("../../../assets/classes/Interaction"));
class TicketInteraction extends Interaction_1.default {
    constructor(client) {
        super(client, {
            name: "general_help",
            description: "Help panel",
            type: "discord",
            category: "general",
            requirements: {
                userPermissions: ["SEND_MESSAGES"],
                clientPermissions: ["SEND_MESSAGES"],
                guildOnly: true,
            },
        });
    }
    async execute(interaction, args) {
        await interaction.deferUpdate();
        try {
            let id = interaction.values.toString().split('_');
            id = id[1];
            let helpEmbed = "";
            this.client.commands.forEach((category) => {
                let aliases = "";
                if (category.help.category == id && category.aliases)
                    category.aliases.forEach((alias) => {
                        aliases = aliases += `\`${alias}\` ‏‏‎ ‎`;
                    });
                if (category.help.category == id) {
                    if (aliases != "") {
                        helpEmbed = helpEmbed += `> **${category.help.name} »** ${category.help.description}\n> **Aliases »**‏‏‎ ‎${aliases}\n> ‏‏‎ ‎\n`;
                    }
                    else {
                        helpEmbed = helpEmbed += `> **${category.help.name} »** ${category.help.description}\n> **Aliases »**‏‏‎ ‎\`No Aliases\`\n> ‏‏‎ ‎\n`;
                    }
                }
            });
            let embed = interaction.message.embeds[0].setDescription(helpEmbed);
            embed = embed.setTitle(`Help ${id}`);
            return await interaction.message.edit({
                embeds: [embed],
            });
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Ticket Error", `A error occured please contact the developer`, interaction.message);
        }
    }
}
exports.default = TicketInteraction;
