"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
const ms_1 = __importDefault(require("ms"));
class PollCreateCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "pollinfo",
            description: "Get info of a poll",
            arguments: "<pollid>",
            example: "/pollinfo 123456?",
            category: "poll",
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
        var _a, _b, _c, _d;
        try {
            let result = this.client.polldb.getPoll(parseInt(args[0]), "pollID");
            let channel = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.find(c => c.id == (result === null || result === void 0 ? void 0 : result.channelID));
            let pollMessage = channel.messages.cache.find(m => m.id == (result === null || result === void 0 ? void 0 : result.messageID));
            let pollStarter = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.members.cache.find(m => m.id == (result === null || result === void 0 ? void 0 : result.discordID));
            let pollVoteObj = result === null || result === void 0 ? void 0 : result.votes;
            let pollResult = "";
            pollVoteObj === null || pollVoteObj === void 0 ? void 0 : pollVoteObj.sort((a, b) => (a.voteCount < b.voteCount) ? 1 : ((b.voteCount < a.voteCount) ? -1 : 0));
            pollVoteObj === null || pollVoteObj === void 0 ? void 0 : pollVoteObj.forEach((vote) => {
                if (vote.option && vote)
                    pollResult = pollResult += `${vote.option}: \`${vote.voteCount}\`\n`;
            });
            let startdate = new Date(result === null || result === void 0 ? void 0 : result.startDate);
            let enddate = new Date(result === null || result === void 0 ? void 0 : result.endDate);
            let status = (result === null || result === void 0 ? void 0 : result.active) ? "Active" : "Deactive";
            let pollInfoEmbed = new discord_js_1.MessageEmbed()
                .setTitle(`Poll \`#${args[0]}\` Info`)
                .setDescription(`**Title**\n${result === null || result === void 0 ? void 0 : result.title}\n\n**Description**\n${result === null || result === void 0 ? void 0 : result.description}\n\n**Votes**\n ${pollResult}\n**startDate »** ${startdate}\n**endDate »** ${enddate}\n**Duration »** ${(0, ms_1.default)(result === null || result === void 0 ? void 0 : result.durationMs, { long: true })}\n**Started by »** ${(_c = pollStarter === null || pollStarter === void 0 ? void 0 : pollStarter.user) === null || _c === void 0 ? void 0 : _c.tag}\n**Status »** ${status}`)
                .setColor(this.client.config.discord.embed.color)
                .setFooter(`Poll Id: ${args[0]}`)
                .setTimestamp();
            (_d = message.channel) === null || _d === void 0 ? void 0 : _d.send({ embeds: [pollInfoEmbed] });
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Poll Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = PollCreateCommand;
