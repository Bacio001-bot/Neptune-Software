"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Constants_1 = require("./Constants");
class Messages {
    constructor(client) {
        this.client = client;
    }
    async success(title, description, message, deleteAfter) {
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(`✅ ${title}`)
            .setDescription(description)
            .setColor("GREEN")
            .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
        const msg = await message.channel.send({ embeds: [embed] }).catch((err) => { });
        if (deleteAfter)
            setTimeout(() => msg.delete(), deleteAfter);
    }
    async default(title, description, message, deleteAfter) {
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(`${title}`, message.author.displayAvatarURL({ dynamic: true }) || '')
            .setDescription(description)
            .setColor(this.client.config.discord.embed.color)
            .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
        const msg = await message.channel.send({ embeds: [embed] });
        if (deleteAfter)
            setTimeout(() => msg.delete(), deleteAfter);
    }
    async error(title, description, message, deleteAfter) {
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(`❌ ${title}`)
            .setDescription(description)
            .setColor("RED")
            .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
        const msg = await message.channel.send({ embeds: [embed] });
        if (deleteAfter)
            setTimeout(() => msg.delete(), deleteAfter);
    }
    loading(title, description, message, deleteAfter) { }
    invalidUser(message, channel) { }
    invalidRole(message, channel) { }
    async private(title, description, user, deleteAfter) {
        try {
            const embed = new discord_js_1.MessageEmbed()
                .setAuthor(`${Constants_1.Emojis.CROSS} ${title}`)
                .setDescription(description)
                .setColor(this.client.config.discord.embed.color)
                .setFooter(`Server Sent By: ${user.guild.name}`, user.guild.iconURL() || "");
            const msg = await user.send({ embeds: [embed] });
            if (deleteAfter)
                setTimeout(() => msg.delete(), deleteAfter);
        }
        catch (_a) {
            let channel = this.client.getChannel(this.client.config.discord.error.dms_disabled_channel);
            channel === null || channel === void 0 ? void 0 : channel.send(`<@${user.user.id}>`);
            const embed = new discord_js_1.MessageEmbed()
                .setAuthor(`❌ ${title}`)
                .setDescription(`The bot couldn't send you a dm please enable your dm's and rerun the command`)
                .setColor("RED");
            channel === null || channel === void 0 ? void 0 : channel.send({ embeds: [embed] });
        }
    }
    async voiceEvent(description, member, channel, color) {
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL() || '')
            .setDescription(description)
            .setColor(color)
            .setTimestamp()
            .setFooter(`Member ID: ${member.user.id}`);
        channel.send({ embeds: [embed] });
    }
    async roleEvent(title, description, role, channel, color) {
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(title)
            .setDescription(description)
            .setColor(color)
            .setTimestamp()
            .setFooter(`Role ID: ${role.id}`);
        channel.send({ embeds: [embed] });
    }
    async banKickEvent(description, user, channel) {
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(user.tag, user.displayAvatarURL() || '')
            .setDescription(description)
            .setColor("RED")
            .setTimestamp()
            .setFooter(`Member ID: ${user.id}`);
        channel.send({ embeds: [embed] });
    }
    async joinEvent(description, user, channel) {
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(user.tag, user.displayAvatarURL() || '')
            .setDescription(description)
            .setColor("GREEN")
            .setTimestamp()
            .setFooter(`Member ID: ${user.id}`);
        channel.send({ embeds: [embed] });
    }
    async emojiEvent(title, description, emoji, channel, color) {
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(title)
            .setDescription(description)
            .setColor(color)
            .setTimestamp()
            .setFooter(`Emoji ID: ${emoji.id}`);
        channel.send({ embeds: [embed] });
    }
    async stickerEvent(title, description, sticker, channel, color) {
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(title)
            .setDescription(description)
            .setColor(color)
            .setTimestamp()
            .setFooter(`Sticker ID: ${sticker.id}`);
        channel.send({ embeds: [embed] });
    }
    async boostEvent(title, description, channel) {
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(`${title}`)
            .setDescription(description)
            .setColor("GREEN")
            .setTimestamp();
        channel.send({ embeds: [embed] });
    }
    async ticketEvent(title, description, channel, color) {
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(`${title}`)
            .setDescription(description)
            .setColor(color)
            .setTimestamp();
        channel.send({ embeds: [embed] }).catch((err) => { });
    }
    async applicationEvent(title, description, channel, color) {
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(`${title}`)
            .setDescription(description)
            .setColor(color)
            .setTimestamp();
        channel.send({ embeds: [embed] }).catch((err) => { });
    }
}
exports.default = Messages;
