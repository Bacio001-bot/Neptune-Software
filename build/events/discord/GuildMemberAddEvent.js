"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../assets/classes/Event"));
const discord_js_1 = require("discord.js");
const ms_1 = __importDefault(require("ms"));
class GuildMemberAddEvent extends Event_1.default {
    constructor(client) {
        super(client, "on", "guildMemberAdd");
    }
    async execute(member) {
        if (this.client.config.logging.join.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.join.channel);
            if (channel) {
                this.client.messages.joinEvent(`**<@${member.user.id}> has joined the server**`, member.user, channel);
            }
        }
        if (this.client.config.role.auto.enabled) {
            let role = this.client.getRole(this.client.config.role.auto.role);
            if (role)
                member.roles.add(role);
        }
        if (this.client.config.member_join.age.enabled) {
            try {
                if (Date.now() - member.user.createdAt <
                    parseInt((0, ms_1.default)(this.client.config.member_join.age.required_days))) {
                    await this.messages.private("Age Requirement System", `You have been kicked out of \`${member.guild.name}\` because your account is not older then \`${(0, ms_1.default)(parseInt((0, ms_1.default)(this.client.config.member_join.age.required_days)), { long: true })}\``, member);
                    await member.kick();
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        if (this.client.config.member_join.welcome.enabled) {
            let channel = this.client.getChannel(this.client.config.member_join.welcome.channel);
            if (!channel)
                return;
            let message = this.client.config.member_join.welcome.text;
            message = this.placeholder.replaceWelcomeMessage(message, member);
            let footer = this.client.config.member_join.welcome.memberCount ? `Member count: ${member.guild.memberCount.toString()}` : '';
            const embed = new discord_js_1.MessageEmbed()
                .setAuthor(`| Welcome ${member.user.username}`, member.guild.iconURL() || '')
                .setDescription(message)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setColor(this.client.config.discord.embed.color)
                .setTimestamp()
                .setFooter(footer);
            channel.send({ embeds: [embed] });
            if (this.client.config.member_join.welcome.mentionUser)
                channel.send(`<@${member.user.id}>`);
        }
        let code = Math.floor(100000 + Math.random() * 900000).toString();
        this.userdb.addUser(member, code);
        if (this.client.config.member_join.verify.enabled)
            this.messages.private("Verification System", `To verify send \`${this.client.config.discord.bot.prefix}verify ${code}\` in \`${member.guild.name}\``, member);
    }
}
exports.default = GuildMemberAddEvent;
