"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class TicketAddCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "ticketremove",
            description: "Remove a user from the ticket",
            arguments: "<user>",
            example: "/ticketremove  bacio",
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
        var _a;
        try {
            let user = this.client.getUser(args[0]);
            if (user) {
                if ((_a = message.channel) === null || _a === void 0 ? void 0 : _a.name.includes('ticket')) {
                    if (message.channel.topic) {
                        await message.channel.permissionOverwrites.edit(user, {
                            VIEW_CHANNEL: false,
                        });
                        this.messages.success("Ticket Remove", `${user.user.tag} has been removed from the ticket`, message);
                        let topicArgs = message.channel.topic.split(" - ");
                        let channel = this.client.getChannel(this.client.config.logging.ticket.channel);
                        if (this.client.config.logging.ticket.enabled)
                            this.messages.ticketEvent(`Ticket Remove`, `**\`${user.user.tag}\` has been removed from the ticket \`#${topicArgs[1]}\`**`, channel, this.client.config.discord.embed.color);
                    }
                }
            }
            else {
                return this.messages.error("Ticket Add Error", `${args[0]} doesn't exist please mention a user`, message);
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Ticket Add Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = TicketAddCommand;
