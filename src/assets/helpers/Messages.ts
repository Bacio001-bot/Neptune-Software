import {
  Message,
  Channel,
  ThreadChannel,
  MessageEmbed,
  GuildMember,
  GuildChannel,
  TextChannel,
  ColorResolvable,
  Role,
  User,
  GuildEmoji,
  Sticker,
} from "discord.js";
import { Emojis } from "./Constants";
import CustomClient from "../classes/Client";

export default class Messages {
  client: CustomClient;

  constructor(client: CustomClient) {
    this.client = client;
  }

  async success(
    title: string,
    description: string,
    message: Message,
    deleteAfter?: number
  ): Promise<void> {
    const embed = new MessageEmbed()
      .setAuthor(`✅ ${title}`)
      .setDescription(description)
      .setColor("GREEN")
      .setFooter(
        `Requested By: ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );
    const msg = await message.channel.send({ embeds: [embed] }).catch((err) => {});
    if (deleteAfter) setTimeout(() => (msg as Message).delete(), deleteAfter);
  }

  async default(
    title: string,
    description: string,
    message: Message,
    deleteAfter?: number
  ): Promise<void> {
    const embed = new MessageEmbed()
      .setAuthor(`${title}`, message.author.displayAvatarURL({ dynamic: true }) || '')
      .setDescription(description)
      .setColor(this.client.config.discord.embed.color)
      .setFooter(
        `Requested By: ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );
    const msg = await message.channel.send({ embeds: [embed] });
    if (deleteAfter) setTimeout(() => msg.delete(), deleteAfter);
  }

  async error(
    title: string,
    description: string,
    message: Message,
    deleteAfter?: number
  ): Promise<void> {
    const embed = new MessageEmbed()
      .setAuthor(`❌ ${title}`)
      .setDescription(description)
      .setColor("RED")
      .setFooter(
        `Requested By: ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );
    const msg = await message.channel.send({ embeds: [embed] });
    if (deleteAfter) setTimeout(() => msg.delete(), deleteAfter);
  }

  loading(
    title: string,
    description: string,
    message: Message,
    deleteAfter?: number
  ): void {}

  invalidUser(message: Message, channel: Channel | ThreadChannel): void {}

  invalidRole(message: Message, channel: Channel | ThreadChannel): void {}

  async private(
    title: string,
    description: string,
    user: GuildMember,
    deleteAfter?: number
  ): Promise<void> {
    try {
      const embed = new MessageEmbed()
        .setAuthor(`${Emojis.CROSS} ${title}`)
        .setDescription(description)
        .setColor(this.client.config.discord.embed.color)
        .setFooter(
          `Server Sent By: ${user.guild.name}`,
          user.guild.iconURL() || ""
        );
      const msg = await user.send({ embeds: [embed] });
      if (deleteAfter) setTimeout(() => msg.delete(), deleteAfter);
    } catch {
      let channel = this.client.getChannel(
        this.client.config.discord.error.dms_disabled_channel
      );
      channel?.send(`<@${user.user.id}>`)
      const embed = new MessageEmbed()
        .setAuthor(`❌ ${title}`)
        .setDescription(`The bot couldn't send you a dm please enable your dm's and rerun the command`)
        .setColor("RED")
      channel?.send({ embeds: [embed]});
    }
  }

  async voiceEvent(
    description: string,
    member: GuildMember,
    channel: TextChannel | ThreadChannel,
    color: ColorResolvable
    ): Promise<void> {
    const embed = new MessageEmbed()
      .setAuthor(member.user.tag, member.user.displayAvatarURL() || '')
      .setDescription(description)
      .setColor(color)
      .setTimestamp()
      .setFooter(
        `Member ID: ${member.user.id}`
      );
    channel.send({ embeds: [embed] });
  }

  async roleEvent(
    title: string,
    description: string,
    role: Role,
    channel: TextChannel | ThreadChannel,
    color: ColorResolvable
    ): Promise<void> {
    const embed = new MessageEmbed()
      .setAuthor(title)
      .setDescription(description)
      .setColor(color)
      .setTimestamp()
      .setFooter(
        `Role ID: ${role.id}`
      );
    channel.send({ embeds: [embed] });
  }

  async banKickEvent(
    description: string,
    user: User,
    channel: TextChannel | ThreadChannel
    ): Promise<void> {
    const embed = new MessageEmbed()
      .setAuthor(user.tag, user.displayAvatarURL() || '')
      .setDescription(description)
      .setColor("RED")
      .setTimestamp()
      .setFooter(
        `Member ID: ${user.id}`
      );
    channel.send({ embeds: [embed] });
  }

  async joinEvent(
    description: string,
    user: User,
    channel: TextChannel | ThreadChannel
    ): Promise<void> {
    const embed = new MessageEmbed()
      .setAuthor(user.tag, user.displayAvatarURL() || '')
      .setDescription(description)
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(
        `Member ID: ${user.id}`
      );
    channel.send({ embeds: [embed] });
  }

  async emojiEvent(
    title: string,
    description: string,
    emoji: GuildEmoji,
    channel: TextChannel | ThreadChannel,
    color: ColorResolvable
    ): Promise<void> {
    const embed = new MessageEmbed()
      .setAuthor(title)
      .setDescription(description)
      .setColor(color)
      .setTimestamp()
      .setFooter(
        `Emoji ID: ${emoji.id}`
      );
    channel.send({ embeds: [embed] });
  }

  async stickerEvent(
    title: string,
    description: string,
    sticker: Sticker,
    channel: TextChannel | ThreadChannel,
    color: ColorResolvable
    ): Promise<void> {
    const embed = new MessageEmbed()
      .setAuthor(title)
      .setDescription(description)
      .setColor(color)
      .setTimestamp()
      .setFooter(
        `Sticker ID: ${sticker.id}`
      );
    channel.send({ embeds: [embed] });
  }

  async boostEvent(
    title: string,
    description: string,
    channel: TextChannel
    ): Promise<void> {
    const embed = new MessageEmbed()
      .setAuthor(`${title}`)
      .setDescription(description)
      .setColor("GREEN")
      .setTimestamp()
    channel.send({ embeds: [embed] });
  }

  async ticketEvent(
    title: string,
    description: string,
    channel: TextChannel,
    color: ColorResolvable
    ): Promise<void> {
    const embed = new MessageEmbed()
      .setAuthor(`${title}`)
      .setDescription(description)
      .setColor(color)
      .setTimestamp()
    channel.send({ embeds: [embed] }).catch((err) => {});
  }

  async applicationEvent(
    title: string,
    description: string,
    channel: TextChannel,
    color: ColorResolvable
    ): Promise<void> {
    const embed = new MessageEmbed()
      .setAuthor(`${title}`)
      .setDescription(description)
      .setColor(color)
      .setTimestamp()
    channel.send({ embeds: [embed] }).catch((err) => {});
  }
  
}
