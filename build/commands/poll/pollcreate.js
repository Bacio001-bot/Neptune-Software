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
            name: "pollcreate",
            description: "Create a poll",
            arguments: "<channel>",
            example: "/pollcreate general?",
            category: "poll",
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
        var _a, _b;
        try {
            let channel = this.client.getChannel(args[0] || message.channel.name);
            const pollTitleEmbed = new discord_js_1.MessageEmbed()
                .setColor(this.client.config.discord.embed.color)
                .setTitle(`Poll Title`)
                .setDescription(`What will the title be of your poll?`)
                .setFooter(`Please send your options in the chat the bot will read them`);
            const pollDescriptionEmbed = new discord_js_1.MessageEmbed()
                .setColor(this.client.config.discord.embed.color)
                .setTitle(`Poll Description`)
                .setDescription(`What will the description be of your poll?`)
                .setFooter(`Please send your options in the chat the bot will read them`);
            const pollDurationEmbed = new discord_js_1.MessageEmbed()
                .setColor(this.client.config.discord.embed.color)
                .setTitle(`Poll Duration`)
                .setDescription(`How long will the poll be open for? \n format:\`1h\` OR \`1d\` OR \`1w\``)
                .setFooter(`Please send your options in the chat the bot will read them`);
            const pollOptionsEmbed = new discord_js_1.MessageEmbed()
                .setColor(this.client.config.discord.embed.color)
                .setTitle(`Poll Options`)
                .setDescription(`Which options can the user choose of (Max: 10)? \n format: \`option 1 - option 2 - option 3 - option 4\``)
                .setFooter(`Please send your options in the chat the bot will read them`);
            let title = "";
            let description = "";
            let durration = "";
            let options = "";
            let menuCategories = [];
            let pollEmojis = [
                "1️⃣",
                "2️⃣",
                "3️⃣",
                "4️⃣",
                "5️⃣",
                "6️⃣",
                "7️⃣",
                "8️⃣",
                "9️⃣",
                "🔟",
            ];
            const filter = (m) => m.author === message.author;
            message.channel.send({ embeds: [pollTitleEmbed] });
            await message.channel
                .awaitMessages({
                filter,
                max: 1,
                time: 1800000,
            })
                .then(async (collected) => {
                let feedback = collected.first();
                if (feedback === null || feedback === void 0 ? void 0 : feedback.content)
                    title = feedback === null || feedback === void 0 ? void 0 : feedback.content;
            })
                .catch(async (collected) => {
                return await message.reply({
                    content: `❌ You took to long to respond poll creation aborted`,
                });
            });
            message.channel.send({ embeds: [pollDescriptionEmbed] });
            await message.channel
                .awaitMessages({
                filter,
                max: 1,
                time: 1800000,
            })
                .then(async (collected) => {
                let feedback = collected.first();
                if (feedback === null || feedback === void 0 ? void 0 : feedback.content)
                    description = feedback === null || feedback === void 0 ? void 0 : feedback.content;
            })
                .catch(async (collected) => {
                return await message.reply({
                    content: `❌ You took to long to respond poll creation aborted`,
                });
            });
            message.channel.send({ embeds: [pollDurationEmbed] });
            await message.channel
                .awaitMessages({
                filter,
                max: 1,
                time: 1800000,
            })
                .then(async (collected) => {
                let feedback = collected.first();
                if (feedback === null || feedback === void 0 ? void 0 : feedback.content)
                    durration = feedback === null || feedback === void 0 ? void 0 : feedback.content;
            })
                .catch(async (collected) => {
                return await message.reply({
                    content: `❌ You took to long to respond poll creation aborted`,
                });
            });
            message.channel.send({ embeds: [pollOptionsEmbed] });
            await message.channel
                .awaitMessages({
                filter,
                max: 1,
                time: 1800000,
            })
                .then(async (collected) => {
                let feedback = collected.first();
                if (feedback === null || feedback === void 0 ? void 0 : feedback.content)
                    options = feedback === null || feedback === void 0 ? void 0 : feedback.content;
            })
                .catch(async (collected) => {
                return await message.reply({
                    content: `❌ You took to long to respond poll creation aborted`,
                });
            });
            let pollId = Math.floor(100000 + Math.random() * 900000);
            let msDurration = (0, ms_1.default)(durration);
            let startdate = new Date();
            let enddate = new Date(startdate.getTime() + msDurration);
            let optionsArray = options.split(" - ");
            let optionDisplay = "";
            let count = 0;
            let pollVoteObj = [];
            let pollMessage = "";
            optionsArray.forEach((option) => {
                pollVoteObj === null || pollVoteObj === void 0 ? void 0 : pollVoteObj.push({ option: option, voteCount: 0, voters: [] });
                menuCategories.push({
                    menuCategories: `poll_vote`,
                    label: option,
                    emoji: pollEmojis[count],
                    value: `${option}_${pollId}`,
                    description: "Votes: 0",
                });
                count = count + 1;
                optionDisplay = optionDisplay += `${option}: \`0\``;
            });
            let pollMenu = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageSelectMenu()
                .setCustomId("poll_vote")
                .setPlaceholder("Select a category")
                .addOptions(menuCategories));
            let pollMenu2 = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageSelectMenu()
                .setCustomId("poll_vote")
                .setPlaceholder("Select a category")
                .setDisabled(true)
                .addOptions(menuCategories));
            let pollEmbed = new discord_js_1.MessageEmbed()
                .setTitle(title)
                .setDescription(`**${description}**\n\n**Duration »** ${(0, ms_1.default)(msDurration, {
                long: true,
            })} \n**Started by »** ${(_a = message.author) === null || _a === void 0 ? void 0 : _a.tag}`)
                .setColor(this.client.config.discord.embed.color)
                .setFooter(`Poll Id: ${pollId}`, `${(_b = message.author) === null || _b === void 0 ? void 0 : _b.displayAvatarURL()}`)
                .setTimestamp();
            pollMessage = await (channel === null || channel === void 0 ? void 0 : channel.send({
                embeds: [pollEmbed],
                components: [pollMenu],
            }));
            setTimeout(async () => {
                var _a;
                let result = this.client.polldb.getPoll(pollId, "pollID");
                let pollVoteObj = result === null || result === void 0 ? void 0 : result.votes;
                let pollResult = "";
                pollVoteObj === null || pollVoteObj === void 0 ? void 0 : pollVoteObj.sort((a, b) => a.voteCount < b.voteCount
                    ? 1
                    : b.voteCount < a.voteCount
                        ? -1
                        : 0);
                pollVoteObj === null || pollVoteObj === void 0 ? void 0 : pollVoteObj.forEach((vote) => {
                    if (vote.option && vote)
                        pollResult =
                            pollResult += `${vote.option}: \`${vote.voteCount}\`\n`;
                });
                let poll2Embed = new discord_js_1.MessageEmbed()
                    .setTitle(`Poll ended`)
                    .setDescription(`**Title**\n${title}\n\n**Description**\n${description}\n\n**Votes**\n ${pollResult}\n**Duration »** ${(0, ms_1.default)(msDurration, { long: true })} \n**Started by »** ${(_a = message.author) === null || _a === void 0 ? void 0 : _a.tag}`)
                    .setColor(this.client.config.discord.embed.color)
                    .setFooter(`Poll Id: ${pollId}`)
                    .setTimestamp();
                if ((result === null || result === void 0 ? void 0 : result.votes) != undefined)
                    this.client.polldb.updatePoll(pollId, "pollID", "active", false);
                let pollMessage2 = await channel.messages.fetch(result === null || result === void 0 ? void 0 : result.messageID);
                await (pollMessage2 === null || pollMessage2 === void 0 ? void 0 : pollMessage2.edit({
                    embeds: [poll2Embed],
                    components: [pollMenu2],
                }).catch((err) => console.log(err)));
            }, msDurration);
            this.messages.success("Poll Created", `Your poll has been sent to <#${channel === null || channel === void 0 ? void 0 : channel.id}> and has the id \`#${pollId}\``, message);
            this.client.polldb.addPoll(message.member, title, description, options, channel.id, pollMessage === null || pollMessage === void 0 ? void 0 : pollMessage.id, startdate.toString(), enddate.toString(), msDurration, pollId, pollVoteObj).catch((err) => console.log(err));
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Poll Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = PollCreateCommand;
