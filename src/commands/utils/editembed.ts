import { Message, MessageEmbed } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";

export default class EmbedCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "editembed",
      description: "Edit a embeded message",
      arguments: "<channel> <messageID>",
      example: "/editembed edit a embed",
      category: "utils",
      type: "discord",
      deleteMessage: true,
      cooldown: true,
      requirements: {
        args: { min: 3, max: 1000 },
        userPermissions: ["SEND_MESSAGES"],
        clientPermissions: ["SEND_MESSAGES"],
        guildOnly: true,
      },
    });
  }

  async execute(message: Message, args: string[]): Promise<void> {
    try {

      let channel = this.client.getChannel(args[0])

      if(channel) {
        let fetchedMessage = await channel?.messages.fetch(args[1]).catch(console.error);
        if(fetchedMessage) {
          let embedMessage = message.content.replace(this.client.config.discord.bot.prefix, "").toString() ;
          embedMessage = embedMessage.replace('editembed', '');
          embedMessage = embedMessage.replace('editsay', '');
          embedMessage = embedMessage.replace(args[0], '');
          embedMessage = embedMessage.replace(args[1], '');
          const embed = new MessageEmbed()
          .setDescription(embedMessage)
          .setColor(this.client.config.discord.embed.color)
          await fetchedMessage.edit({ embeds: [embed] }).catch( err => { return console.log(err)});
          return this.messages.success(
            "Edit Embed Success",
            `Message with the id \`${fetchedMessage.id}\` has been edited`,
            message
          );
        } else {
          return this.messages.error(
            "Edit Embed Error",
            `Not a valid messageID supplied`,
            message
          );
        }
      } else {
        return this.messages.error(
          "Edit Embed Error",
          `Not a valid channel supplied`,
          message
        );
      }
      
    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Edit Embed Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
