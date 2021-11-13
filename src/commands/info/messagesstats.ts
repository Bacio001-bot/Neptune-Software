import {
  Message,
  TextChannel,
  MessageEmbed,
  MessageButton,
  MessageAttachment,
  MessageActionRow,
  MessageSelectMenu,
} from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";
import fs from "fs";

export default class TicketStatsCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "messagesstats",
      description: "Get info of someone's messages stats",
      arguments: "<user>",
      example: "/messagesstats bacio",
      category: "info",
      type: "discord",
      deleteMessage: true,
      cooldown: true,
      requirements: {
        args: { min: 0, max: 1 },
        userPermissions: ["SEND_MESSAGES"],
        clientPermissions: ["SEND_MESSAGES"],
        guildOnly: true,
      },
    });
  }

  async execute(message: Message, args: string[]): Promise<void> {
    try {
      let user =
        message.mentions.members?.first() ||
        this.client.getUser(args[0] || message.author.username);

      if (!user)
        return this.messages.error(
          "Message Stats Error",
          `Please supply a valid user`,
          message
        );

        let result = this.userdb.getUser(user.user.id, "discordID");


      const embed = new MessageEmbed()
          .setAuthor(`${user.user?.tag} Message Stats`, user.user.displayAvatarURL({ dynamic: true }))
          .setColor(this.client.config.discord.embed.color)
          .setDescription(`**Replies: **${result?.messages.replies}\n**Text-to-Speech: **${result?.messages.tts}\n**@everyone / @here: **${result?.messages.everyone} \n**Total Messages: **${result?.messages.total}`)
          .setThumbnail('https://cdn0.iconfinder.com/data/icons/messages-chat-smileys/24/messages-double-bubble-message-chat-conversation-512.png')
          .setFooter(
          `Requested by ${message.author?.tag}`,
          message.author?.displayAvatarURL({ dynamic: true }) || '')

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Message Stats Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
