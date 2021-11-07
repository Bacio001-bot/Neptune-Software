import { Message, MessageEmbed } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";

export default class AvatarCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "avatar",
      description: "Get someone's avatar",
      arguments: "[user]",
      example: "/avatar bacio001",
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
      let member =
        message.mentions.members?.first() ||
        this.client.getUser(args[0] || message.author?.username)
      if (!member)
        return this.messages.error(
          "Avatar Error",
          `No member found with that name`,
          message
        );

      let avatarEmbed = new MessageEmbed()
        .setTitle(`${member.user.tag}'s Avatar`)
        .setImage(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setColor(this.client.config.discord.embed.color)
        .setFooter(
          `Requested By: ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        );
      message.channel.send({ embeds: [avatarEmbed] });
    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Avatar Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
