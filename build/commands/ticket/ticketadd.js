"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class TicketAddCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "ticketadd",
            description: "Add someone to a ticket",
            arguments: "<user>",
            example: "/ticketadd bacio",
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
            let user = this.client.getUser(args[0]);
            if (user) {
                let cchanel = message.channel;
                if (cchanel.name.includes("ticket")) {
                    await cchanel.permissionOverwrites.edit(user, {
                        VIEW_CHANNEL: true,
                    });
                    this.messages.success("Ticket Add", `<@${user.user.id}> has been added to the ticket`, message);
                    message.channel.send(`<@${user.user.id}>`);
                    let topicArgs = message.channel.topic.split(" - ");
                    let channel = this.client.getChannel(this.client.config.logging.ticket.channel);
                    if (this.client.config.logging.ticket.enabled)
                        this.messages.ticketEvent(`Ticket Add`, `**\`${user.user.tag}\` has been added to the ticket \`#${topicArgs[1]}\`**`, channel, this.client.config.discord.embed.color);
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
