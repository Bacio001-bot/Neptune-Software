"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class TicketStatsCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "ticketstats",
            description: "Get info of someone's ticket stats",
            arguments: "<user>",
            example: "/ticketinfo bacio",
            category: "ticket",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 0, max: 1 },
                userPermissions: ["SEND_MESSAGES"],
                clientPermissions: ["SEND_MESSAGES"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        var _a, _b, _c, _d, _e;
        try {
            let user = ((_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first()) ||
                this.client.getUser(args[0] || message.author.username);
            if (!user)
                return this.messages.error("Ticket Stats Error", `Please supply a valid user`, message);
            let result = this.userdb.getUser((_b = user.user) === null || _b === void 0 ? void 0 : _b.id, "discordID");
            if (result) {
                const embed = new discord_js_1.MessageEmbed()
                    .setAuthor(`${(_c = user.user) === null || _c === void 0 ? void 0 : _c.tag} Ticket Stats`, user.user.displayAvatarURL({ dynamic: true }))
                    .setColor(this.client.config.discord.embed.color)
                    .setDescription(`**Open tickets: **${result.tickets.openTickets} \n**Closed tickets: **${result.tickets.closedTickets} \n**Total tickets: **${result.tickets.closedTickets + result.tickets.openTickets}`)
                    .setThumbnail('https://images.squarespace-cdn.com/content/v1/5b068c9c1137a6d587782e12/1540480338683-S72PUSENHD9QDGMO7XND/tickets.png')
                    .setFooter(`Requested by ${(_d = message.author) === null || _d === void 0 ? void 0 : _d.tag}`, ((_e = message.author) === null || _e === void 0 ? void 0 : _e.displayAvatarURL({ dynamic: true })) || '');
                message.channel.send({ embeds: [embed] });
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Ticket Stats Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = TicketStatsCommand;
