"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class AvatarCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "leveltop",
            description: "Get level leaderboard",
            arguments: "",
            example: "/leveltop",
            category: "level",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 0, max: 0 },
                userPermissions: ["SEND_MESSAGES"],
                clientPermissions: ["SEND_MESSAGES"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        var _a, _b;
        try {
            const users = await this.client.userdb.listUsers();
            let members = 0;
            let arr = [];
            (_a = message.guild) === null || _a === void 0 ? void 0 : _a.members.cache.forEach((member) => {
                members = members + 1;
                const userusers = users === null || users === void 0 ? void 0 : users.filter(o => o.discordID === (member === null || member === void 0 ? void 0 : member.id));
                let xpCount = 0;
                let level = 0;
                userusers === null || userusers === void 0 ? void 0 : userusers.forEach(user => {
                    if (user.xp) {
                        xpCount = xpCount + user.xp;
                        let xp = xpCount;
                        let closest;
                        this.client.config.level_system.xp_for_level.forEach((configXP) => {
                            let nextLevel = this.client.config.level_system.xp_for_level.indexOf(configXP);
                            nextLevel = nextLevel + 1;
                            nextLevel = this.client.config.level_system.xp_for_level[nextLevel];
                            if (configXP < xp && xp < nextLevel) {
                                closest = this.client.config.level_system.xp_for_level.indexOf(configXP);
                            }
                        });
                        level = closest + 1;
                    }
                });
                let addToArray = {
                    "name": member.user.tag,
                    "xp": xpCount,
                    "level": level
                };
                arr.push(addToArray);
                arr.sort((a, b) => (a.xp < b.xp) ? 1 : ((b.xp < a.xp) ? -1 : 0));
            });
            let xpCount2;
            users === null || users === void 0 ? void 0 : users.forEach(user => {
                if (user.xp)
                    xpCount2 = xpCount2 + user.xp;
            });
            let currentPage = 1;
            let minPage = 1;
            let maxPage = Math.ceil(members / 20);
            const usersEmbed = new discord_js_1.MessageEmbed()
                .setColor(this.client.config.discord.embed.color)
                .setAuthor(`Invite leaderboard - Page: ${currentPage}/${maxPage}`, ((_b = message.guild) === null || _b === void 0 ? void 0 : _b.iconURL()) || '')
                .setDescription(getDescription(currentPage))
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
            const msg = await message.channel.send({ embeds: [usersEmbed], components: [getButtons(currentPage)] });
            const filter = (button) => button.user.id === message.author.id;
            const collector = msg.createMessageComponentCollector({
                filter,
                time: 1800000,
                componentType: "BUTTON",
            });
            collector.on("collect", async (i) => {
                var _a, _b;
                i.deferUpdate();
                if (i.customId === "back") {
                    currentPage -= 1;
                    usersEmbed.author = `Invite leaderboard - Page: ${currentPage}/${maxPage}`, ((_a = message.guild) === null || _a === void 0 ? void 0 : _a.iconURL()) || '';
                    usersEmbed.description = getDescription(currentPage);
                    await msg.edit({
                        embeds: [usersEmbed],
                        components: [getButtons(currentPage)],
                    });
                }
                else {
                    currentPage += 1;
                    usersEmbed.author = `Xp leaderboard - Page: ${currentPage}/${maxPage}`, ((_b = message.guild) === null || _b === void 0 ? void 0 : _b.iconURL()) || '';
                    usersEmbed.description = getDescription(currentPage);
                    await msg.edit({
                        embeds: [usersEmbed],
                        components: [getButtons(currentPage)],
                    });
                }
            });
            function getDescription(currentPage) {
                let description = "";
                for (let i = ((currentPage * 20) - 20); i < (currentPage * 20); i++) {
                    if (!arr[i])
                        return description;
                    description += `**${i + 1}. ${arr[i].name}** » level ${arr[i].level} - ${arr[i].xp} xp\n`;
                }
                return description;
            }
            function getButtons(currentPage) {
                const actionRow = new discord_js_1.MessageActionRow()
                    .addComponents(new discord_js_1.MessageButton()
                    .setEmoji("◀️")
                    .setStyle("PRIMARY")
                    .setCustomId("back")
                    .setDisabled((currentPage === minPage) ? true : false), new discord_js_1.MessageButton()
                    .setEmoji("▶️")
                    .setStyle("PRIMARY")
                    .setCustomId("forward")
                    .setDisabled((currentPage === maxPage) ? true : false));
                return actionRow;
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Xp Leaderboard Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = AvatarCommand;
