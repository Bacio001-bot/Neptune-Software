"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
const ms_1 = __importDefault(require("ms"));
class GiveawayCreateCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "giveawayinfo",
            description: "Get info of a giveaway",
            arguments: "<giveawayid>",
            example: "/giveawayinfo 123456?",
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
        var _a, _b, _c;
        try {
            let result = this.client.giveawaydb.getGiveaway(parseInt(args[0]), "giveawayID");
            let channel = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.find(c => c.id == (result === null || result === void 0 ? void 0 : result.channelID));
            let giveawayMessage = channel.messages.cache.find(m => m.id == (result === null || result === void 0 ? void 0 : result.messageID));
            let giveawayStarter = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.members.cache.find(m => m.id == (result === null || result === void 0 ? void 0 : result.discordID));
            let giveawayVoteObj = result === null || result === void 0 ? void 0 : result.enteries;
            let giveawayResult = "";
            giveawayVoteObj === null || giveawayVoteObj === void 0 ? void 0 : giveawayVoteObj.forEach((vote) => {
                let user = this.client.getUser(vote);
                if (vote)
                    giveawayResult = giveawayResult += `<@${user === null || user === void 0 ? void 0 : user.user.id}> (${user === null || user === void 0 ? void 0 : user.user.id})\n`;
            });
            let winner = "No winner";
            if ((result === null || result === void 0 ? void 0 : result.enteries.length) != 0 && (result === null || result === void 0 ? void 0 : result.winner)) {
                winner = result === null || result === void 0 ? void 0 : result.winner;
            }
            let startdate = new Date(result === null || result === void 0 ? void 0 : result.startDate);
            let enddate = new Date(result === null || result === void 0 ? void 0 : result.endDate);
            let status = (result === null || result === void 0 ? void 0 : result.active) ? "Active" : "Deactive";
            let user = this.client.getUser(result === null || result === void 0 ? void 0 : result.discordID);
            let giveawayInfoEmbed = new discord_js_1.MessageEmbed()
                .setTitle(`Giveaway \`#${args[0]}\` Info`)
                .setDescription(`**Title**\n${result === null || result === void 0 ? void 0 : result.title}\n\n**Description**\n${result === null || result === void 0 ? void 0 : result.description}\n\n**Winner »** ${winner}\n\n**startDate »** ${startdate}\n**endDate »** ${enddate}\n**Price »** ${result === null || result === void 0 ? void 0 : result.price}\n**Invites Required »** ${result === null || result === void 0 ? void 0 : result.requiredInvites}\n**Entries »** ${result === null || result === void 0 ? void 0 : result.enteries.length}\n**Duration »** ${(0, ms_1.default)(result === null || result === void 0 ? void 0 : result.durationMs, { long: true })} \n**Started by »** ${user === null || user === void 0 ? void 0 : user.user.tag}\n**Status »** ${status}`)
                .setColor(this.client.config.discord.embed.color)
                .setFooter(`Poll Id: ${args[0]}`)
                .setTimestamp();
            (_c = message.channel) === null || _c === void 0 ? void 0 : _c.send({ embeds: [giveawayInfoEmbed] });
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Poll Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = GiveawayCreateCommand;
