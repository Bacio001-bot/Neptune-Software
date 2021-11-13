"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Interaction_1 = __importDefault(require("../../../assets/classes/Interaction"));
class RoleInteraction extends Interaction_1.default {
    constructor(client) {
        super(client, {
            name: "role_assign",
            description: "Assign a role",
            type: "discord",
            category: "role",
            requirements: {
                userPermissions: ["SEND_MESSAGES"],
                clientPermissions: ["SEND_MESSAGES"],
                guildOnly: true,
            },
        });
    }
    async execute(interaction, args) {
        try {
            let role = interaction.guild.roles.cache.find(r => r.name == interaction.values.toString());
            try {
                await interaction.member.roles.add(role);
                await interaction.member.send({ content: `✅ \`${role.name}\` has been assigned` }).catch();
            }
            catch (err) {
                console.log(err);
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Suggestion Error", `A error occured please contact the developer`, interaction.message);
        }
    }
}
exports.default = RoleInteraction;
