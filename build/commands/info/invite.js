"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
const ms_1 = __importDefault(require("ms"));
class AvatarCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "invite",
            description: "Get info about a invite code",
            arguments: "<code>",
            example: "/invites uQUNuuNz",
            category: "info",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 1, max: 1 },
                userPermissions: ["SEND_MESSAGES"],
                clientPermissions: ["SEND_MESSAGES"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        var _a;
        try {
            let invites = await ((_a = message.guild) === null || _a === void 0 ? void 0 : _a.invites.fetch());
            if (invites) {
                const invite = invites.filter(o => o.code === args[0]);
                if (invite) {
                    invite.forEach((i) => {
                        var _a, _b;
                        const embed = new discord_js_1.MessageEmbed()
                            .setAuthor(`Invite ${args[0]}`, ((_a = message.guild) === null || _a === void 0 ? void 0 : _a.iconURL({ dynamic: true })) || '')
                            .setDescription(`**Invite creator: **${(_b = i.inviter) === null || _b === void 0 ? void 0 : _b.tag}\n**Invite uses: **${i.uses}\n**Invite max uses: **${i.maxUses}\n**Invite temporary: **${i.temporary}\n **Invite age: **${(0, ms_1.default)(Date.now() - i.createdTimestamp, { long: true })}`)
                            .setColor(this.client.config.discord.embed.color)
                            .setThumbnail(`https://cdn.invite-tracker.com/logo.png`)
                            .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
                        message.channel.send({ embeds: [embed] });
                    });
                }
                else {
                    return this.messages.error("Invite Error", `No invite found with that code`, message);
                }
            }
            else {
                return this.messages.error("Invite Error", `This guild doesn't have any invites`, message);
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Avatar Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = AvatarCommand;
