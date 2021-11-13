"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../assets/classes/Command"));
const fs_1 = __importDefault(require("fs"));
class TicketdeleteCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "ticketdelete",
            description: "Delete a ticket",
            arguments: "<ticketid>",
            example: "/ticketdelete 123456",
            category: "ticket",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 1, max: 1 },
                userPermissions: ["ADMINISTRATOR"],
                clientPermissions: ["ADMINISTRATOR"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        try {
            fs_1.default.readdirSync('storage/tickets/').forEach((file) => {
                let fileArgs = file.split('-');
                if (fileArgs[1] == args[0]) {
                    fs_1.default.unlinkSync(`storage/tickets/${file}`);
                    this.messages.success("Ticket Deleted", `Ticket \`#${fileArgs[1]}\` has been deleted`, message);
                    let channel = this.client.getChannel(this.client.config.logging.ticket.channel);
                    this.messages.ticketEvent(`Ticket Deleted`, `**Ticket \`#${fileArgs[1]}\` has been deleted by \`${message.author.tag}\`**`, channel, 'RED');
                }
            });
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Ticket Delete Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = TicketdeleteCommand;
