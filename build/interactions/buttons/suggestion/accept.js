"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Interaction_1 = __importDefault(require("../../../assets/classes/Interaction"));
class SuggestionInteraction extends Interaction_1.default {
    constructor(client) {
        super(client, {
            name: "suggestion_accept",
            description: "Accept suggestion",
            type: "discord",
            category: "suggestion",
            requirements: {
                userPermissions: ["ADMINISTRATOR"],
                clientPermissions: ["SEND_MESSAGES"],
                guildOnly: true,
            },
        });
    }
    async execute(interaction, args) {
        try {
            let embed = interaction.message.embeds[0].setColor("#00ff00");
            await interaction.message.edit({
                embeds: [embed],
            });
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Suggestion Error", `A error occured please contact the developer`, interaction.message);
        }
    }
}
exports.default = SuggestionInteraction;
