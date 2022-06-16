"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class GiveawayEntriesCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "giveawayentries",
            description: "Entries for a giveaway",
            arguments: "<giveawayid>",
            example: "/giveawayentries 123456?",
            category: "giveaway",
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
            let entries = "";
            let result = this.client.giveawaydb.getGiveaway(parseInt(args[0]), "giveawayID");
            result === null || result === void 0 ? void 0 : result.enteries.forEach((enterer) => {
                let member = this.client.getUser(enterer);
                entries = entries += `<@${member === null || member === void 0 ? void 0 : member.id}> » ${member === null || member === void 0 ? void 0 : member.user.tag} \n`;
            });
            let giveawayEntriesEmbed = new discord_js_1.MessageEmbed()
                .setTitle(`Giveaway \`#${args[0]}\` Entries`)
                .setDescription(`${entries}`)
                .setColor(this.client.config.discord.embed.color)
                .setFooter(`Giveaway Id: ${args[0]}`)
                .setTimestamp();
            (_a = message.channel) === null || _a === void 0 ? void 0 : _a.send({ embeds: [giveawayEntriesEmbed] });
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Poll Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = GiveawayEntriesCommand;
