import { Message, MessageEmbed } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";

export default class EmbedCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "embed",
      description: "Send a embeded message",
      arguments: "<channel> <message>",
      example: "/embed announcments this is the announcment",
      category: "utils",
      type: "discord",
      deleteMessage: true,
      cooldown: true,
      requirements: {
        args: { min: 2, max: 1000 },
        userPermissions: ["SEND_MESSAGES"],
        clientPermissions: ["SEND_MESSAGES"],
        guildOnly: true,
      },
    });
  }

  async execute(message: Message, args: string[]): Promise<void> {
    try {
      let channel = this.client.getChannel(args[0])
      if (channel) {
        let embedMessage = message.content.substring(this.client.config.discord.bot.prefix.length).split(" ").toString() ;
        embedMessage  = args.splice(1).join(" ");
        const embed = new MessageEmbed()
        .setDescription(embedMessage)
        .setColor(this.client.config.discord.embed.color)
      channel.send({ embeds: [embed] });
      }
    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Embed Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
