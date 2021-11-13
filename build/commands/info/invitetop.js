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
            name: "invitetop",
            description: "Get invite leaderboard",
            arguments: "",
            example: "/invitetop",
            category: "info",
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
        var _a, _b, _c;
        try {
            const invites = await ((_a = message.guild) === null || _a === void 0 ? void 0 : _a.invites.fetch());
            let members = 0;
            let arr = [];
            (_b = message.guild) === null || _b === void 0 ? void 0 : _b.members.cache.forEach((member) => {
                members = members + 1;
                const userInvites = invites === null || invites === void 0 ? void 0 : invites.filter(o => { var _a; return ((_a = o.inviter) === null || _a === void 0 ? void 0 : _a.id) === (member === null || member === void 0 ? void 0 : member.id); });
                let inviteCount = 0;
                userInvites === null || userInvites === void 0 ? void 0 : userInvites.forEach(invite => {
                    if (invite.uses)
                        inviteCount = inviteCount + invite.uses;
                });
                let addToArray = {
                    "name": member.user.tag,
                    "invite": inviteCount
                };
                arr.push(addToArray);
                arr.sort((a, b) => (a.invite < b.invite) ? 1 : ((b.invite < a.invite) ? -1 : 0));
            });
            let inviteCount2;
            invites === null || invites === void 0 ? void 0 : invites.forEach(invite => {
                if (invite.uses)
                    inviteCount2 = inviteCount2 + invite.uses;
            });
            let currentPage = 1;
            let minPage = 1;
            let maxPage = Math.ceil(members / 20);
            const usersEmbed = new discord_js_1.MessageEmbed()
                .setColor(this.client.config.discord.embed.color)
                .setAuthor(`Invite leaderboard - Page: ${currentPage}/${maxPage}`, ((_c = message.guild) === null || _c === void 0 ? void 0 : _c.iconURL()) || '')
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
                    usersEmbed.author = `Invite leaderboard - Page: ${currentPage}/${maxPage}`, ((_b = message.guild) === null || _b === void 0 ? void 0 : _b.iconURL()) || '';
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
                    description += `**${i + 1}. ${arr[i].name}** » ${arr[i].invite}\n`;
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
            return this.messages.error("Avatar Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = AvatarCommand;
