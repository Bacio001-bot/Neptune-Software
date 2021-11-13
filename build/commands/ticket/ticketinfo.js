"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
const fs_1 = __importDefault(require("fs"));
class TicketdeleteCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "ticketinfo",
            description: "Get info of a ticket",
            arguments: "<ticketid>",
            example: "/ticketinfo 123456",
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
            let found = false;
            fs_1.default.readdirSync('storage/tickets/').forEach((file) => {
                let ticketArgs = file.split("-");
                if (ticketArgs[1] == args[0]) {
                    found = true;
                    fs_1.default.readFile(`storage/tickets/${file}`, (err, data) => {
                        var _a, _b;
                        if (err) {
                            throw err;
                        }
                        let log = new discord_js_1.MessageAttachment(Buffer.from(data), `${file}.txt`);
                        const embed = new discord_js_1.MessageEmbed()
                            .setTitle(`Ticket #${ticketArgs[1]} Transcript`)
                            .setColor(this.client.config.discord.embed.color)
                            .setFooter(`Ticket from ${(_a = message.guild) === null || _a === void 0 ? void 0 : _a.name}`, ((_b = message.guild) === null || _b === void 0 ? void 0 : _b.iconURL({ dynamic: true })) || '');
                        message.channel.send({ embeds: [embed] });
                        message.channel.send({ files: [log] });
                    });
                }
            });
            if (!found)
                return this.messages.error("Ticket Info Error", `No ticket found with the id \`#${args[0]}\``, message);
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Ticket Delete Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = TicketdeleteCommand;
