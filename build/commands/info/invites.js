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
            name: "invites",
            description: "Get someone's invites",
            arguments: "<user>",
            example: "/invites bacio001",
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
            let user = this.client.getUser(args[0]);
            if (user) {
                let invites = await ((_a = message.guild) === null || _a === void 0 ? void 0 : _a.invites.fetch());
                if (invites) {
                    const userInvites = invites.filter(o => { var _a; return ((_a = o.inviter) === null || _a === void 0 ? void 0 : _a.id) === (user === null || user === void 0 ? void 0 : user.id); });
                    let inviteCounts = 0;
                    let tempInvites = 0;
                    userInvites.forEach((invite) => {
                        console.log(invite);
                        if (invite.uses)
                            inviteCounts = inviteCounts + invite.uses;
                        if (invite.temporary)
                            tempInvites = tempInvites + 1;
                    });
                    const embed = new discord_js_1.MessageEmbed()
                        .setAuthor(`${user.user.tag} Invites`, user.user.displayAvatarURL({ dynamic: true }) || '')
                        .setDescription(`**Members invited: **${inviteCounts}\n**Guild invites: **${userInvites.size}\n**Temp invites: **${tempInvites}`)
                        .setColor(this.client.config.discord.embed.color)
                        .setThumbnail(`https://cdn.invite-tracker.com/logo.png`)
                        .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
                    message.channel.send({ embeds: [embed] });
                }
                else {
                    return this.messages.error("Invites Error", `This guild doesn't jave any invites`, message);
                }
            }
            else {
                return this.messages.error("Invites Error", `Supply a valid user`, message);
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Avatar Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = AvatarCommand;
