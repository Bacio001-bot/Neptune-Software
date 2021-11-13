"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class PurgeCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "purge",
            description: "purge messages",
            arguments: "<messageCount>",
            example: "/purge 99",
            category: "moderation",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 1, max: 1 },
                userPermissions: ["MANAGE_MESSAGES"],
                clientPermissions: ["MANAGE_MESSAGES"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        try {
            let deleteAmounts = parseInt(args[0]);
            if (isNaN(deleteAmounts) || deleteAmounts >= 100)
                return this.messages.error("Purge Error", `Give a number between 1 / 100`, message);
            await message.channel.bulkDelete(deleteAmounts + 1, true);
            this.messages.success("Purge", `**${deleteAmounts}** messages have been purged`, message);
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Purge Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = PurgeCommand;
