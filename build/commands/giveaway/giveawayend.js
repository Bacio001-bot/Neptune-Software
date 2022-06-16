"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
const ms_1 = __importDefault(require("ms"));
class GiveawayEndCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "giveawayend",
            description: "End a giveaway",
            arguments: "<giveawayid>",
            example: "/giveawayend 123456?",
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
        var _a, _b;
        try {
            let result = this.client.giveawaydb.getGiveaway(parseInt(args[0]), "giveawayID");
            let startedBy = this.client.getUser(result === null || result === void 0 ? void 0 : result.discordID);
            let winner = "No winner";
            if ((result === null || result === void 0 ? void 0 : result.enteries.length) != 0) {
                let memberId = result === null || result === void 0 ? void 0 : result.enteries[Math.floor(Math.random() * (result === null || result === void 0 ? void 0 : result.enteries.length))];
                let member = this.client.getUser(memberId);
                winner = `<@${member === null || member === void 0 ? void 0 : member.user.id}> (${member === null || member === void 0 ? void 0 : member.user.id})`;
            }
            let channel = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.find(c => c.id == (result === null || result === void 0 ? void 0 : result.channelID));
            let giveawayMessage = await channel.messages.fetch(result === null || result === void 0 ? void 0 : result.messageID);
            let giveaway2Embed = new discord_js_1.MessageEmbed()
                .setTitle(`Giveaway ended`)
                .setDescription(`**Title**\n${result === null || result === void 0 ? void 0 : result.title}\n\n**Description**\n${result === null || result === void 0 ? void 0 : result.description}\n**Winner »** ${winner}\n\n**Price »** ${result === null || result === void 0 ? void 0 : result.price}\n\n**Entries »** ${result === null || result === void 0 ? void 0 : result.enteries.length}\n**Duration »** ${(0, ms_1.default)(result === null || result === void 0 ? void 0 : result.durationMs, { long: true })} \n**Started by »** ${startedBy === null || startedBy === void 0 ? void 0 : startedBy.user.tag}`)
                .setColor(this.client.config.discord.embed.color)
                .setFooter(`Giveaway Id: ${result === null || result === void 0 ? void 0 : result.giveawayID}`, `${(_b = message.author) === null || _b === void 0 ? void 0 : _b.displayAvatarURL()}`)
                .setTimestamp();
            if (giveawayMessage && (result === null || result === void 0 ? void 0 : result.active)) {
                let giveawayObj = result === null || result === void 0 ? void 0 : result.enteries;
                let giveawayResult = "";
                giveawayObj === null || giveawayObj === void 0 ? void 0 : giveawayObj.forEach((entry) => {
                    let user = this.client.getUser(entry);
                    if (entry)
                        giveawayResult = giveawayResult += `${user === null || user === void 0 ? void 0 : user.user.tag}: \`${user === null || user === void 0 ? void 0 : user.user.id}\`\n`;
                });
                if (result != undefined)
                    this.client.polldb.updatePoll(parseInt(args[0]), "pollID", "active", false);
                this.client.giveawaydb.updateGiveaway(result === null || result === void 0 ? void 0 : result.giveawayID, "giveawayID", "winner", winner);
                const giveaway2Row = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                    .setCustomId("giveaway_enter")
                    .setLabel("Finished")
                    .setEmoji("🎉")
                    .setStyle("PRIMARY")
                    .setDisabled(true));
                await giveawayMessage.edit({
                    embeds: [giveaway2Embed],
                    components: [giveaway2Row],
                });
                return this.messages.success("Giveaway Ended", `Giveaway with the id \`#${args[0]}\` has been ended`, message);
            }
            else {
                return this.messages.error("Giveaway Error", `Giveaway not found or not active`, message);
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Giveaway Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = GiveawayEndCommand;
