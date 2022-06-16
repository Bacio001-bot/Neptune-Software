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
            name: "pollend",
            description: "End a poll",
            arguments: "<pollid>",
            example: "/pollend 123456?",
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
            let pollMessage = await channel.messages.fetch(result === null || result === void 0 ? void 0 : result.messageID);
            let pollStarter = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.members.cache.find(m => m.id == (result === null || result === void 0 ? void 0 : result.discordID));
            if (pollMessage && (result === null || result === void 0 ? void 0 : result.active)) {
                let pollVoteObj = result === null || result === void 0 ? void 0 : result.votes;
                let pollResult = "";
                pollVoteObj === null || pollVoteObj === void 0 ? void 0 : pollVoteObj.sort((a, b) => (a.voteCount < b.voteCount) ? 1 : ((b.voteCount < a.voteCount) ? -1 : 0));
                pollVoteObj === null || pollVoteObj === void 0 ? void 0 : pollVoteObj.forEach((vote) => {
                    if (vote.option && vote)
                        pollResult = pollResult += `${vote.option}: \`${vote.voteCount}\`\n`;
                });
                let startdate = new Date(result === null || result === void 0 ? void 0 : result.startDate);
                let currentdate = new Date();
                let enddate = currentdate.getTime() - startdate.getTime();
                let pollEmbed = new discord_js_1.MessageEmbed()
                    .setTitle(`Poll ended`)
                    .setDescription(`**Title**\n${result === null || result === void 0 ? void 0 : result.title}\n\n**Description**\n${result === null || result === void 0 ? void 0 : result.description}\n\n**Votes**\n ${pollResult}\n**Duration »** ${(0, ms_1.default)(enddate, { long: true })} \n**Started by »** ${(_c = pollStarter === null || pollStarter === void 0 ? void 0 : pollStarter.user) === null || _c === void 0 ? void 0 : _c.tag}`)
                    .setColor(this.client.config.discord.embed.color)
                    .setFooter(`Poll Id: ${args[0]}`, `${(_d = pollStarter === null || pollStarter === void 0 ? void 0 : pollStarter.user) === null || _d === void 0 ? void 0 : _d.displayAvatarURL()}`)
                    .setTimestamp();
                let pollMenu2 = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageSelectMenu()
                    .setCustomId("poll_vote")
                    .setPlaceholder("Select a category")
                    .setDisabled(true)
                    .setOptions({
                    label: `blank`,
                    value: `blank`,
                    description: 'Votes: 0'
                }));
                if ((result === null || result === void 0 ? void 0 : result.votes) != undefined)
                    this.client.polldb.updatePoll(parseInt(args[0]), "pollID", "active", false);
                await pollMessage.edit({
                    embeds: [pollEmbed],
                    components: [pollMenu2],
                });
                return this.messages.success("Poll Ended", `poll with the id \`#${args[0]}\` has been ended`, message);
            }
            else {
                return this.messages.error("Poll Error", `Poll not found or not active`, message);
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Poll Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = PollCreateCommand;
