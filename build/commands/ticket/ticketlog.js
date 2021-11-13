"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
const fs_1 = __importDefault(require("fs"));
class TicketLogCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "ticketlog",
            description: "Get log of a ticket",
            arguments: "<ticketid>",
            example: "/ticketlog 123456",
            category: "ticket",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 0, max: 1 },
                userPermissions: ["ADMINISTRATOR"],
                clientPermissions: ["ADMINISTRATOR"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        var _a, _b, _c;
        try {
            let user = ((_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first()) ||
                this.client.getUser(args[0] || message.author.username);
            let ticketCount = 0;
            let embed = new discord_js_1.MessageEmbed()
                .setTitle(`${user === null || user === void 0 ? void 0 : user.user.tag} Ticket Log`)
                .setColor(this.client.config.discord.embed.color)
                .setFooter(`Requested by ${(_b = message.author) === null || _b === void 0 ? void 0 : _b.tag}`, ((_c = message.member) === null || _c === void 0 ? void 0 : _c.displayAvatarURL({ dynamic: true })) || "");
            fs_1.default.readdirSync("storage/tickets/").forEach(async (file) => {
                if (file.includes(user === null || user === void 0 ? void 0 : user.user.id)) {
                    ticketCount = ticketCount + 1;
                    let fileArgs = file.split("-");
                    let data = fs_1.default.readFileSync(`storage/tickets/${file}`, "utf8");
                    let array = data.split(": ");
                    let name = array[2].split(" ");
                    let date = array[1].replace(',', '');
                    if (array) {
                        let desc = embed.description ? `${embed.description}${ticketCount}. ${name[0]} - #${fileArgs[1]} - ${date.replace(` Subject`, '')} \n` : `${ticketCount}. ${name[0]} - #${fileArgs[1]} - ${date.replace(` Subject`, '')} \n`;
                        embed.setDescription(desc);
                    }
                }
            });
            embed.setDescription(`\`\`\`${embed.description}\`\`\``);
            message.channel.send({ embeds: [embed] });
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Ticket Delete Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = TicketLogCommand;
