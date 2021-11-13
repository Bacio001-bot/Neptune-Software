import { Message, TextChannel, MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";
import fs from "fs"

export default class SuggestionCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "suggest",
      description: "Suggest something",
      arguments: "<suggestion>",
      example: "/suggest Get a new bot!",
      category: "suggestion",
      type: "discord",
      deleteMessage: true,
      cooldown: true,
      requirements: {
        args: { min: 1, max: 1000 },
        userPermissions: ["SEND_MESSAGES"],
        clientPermissions: ["SEND_MESSAGES"],
        guildOnly: true,
      },
    });
  }

  async execute(message: Message, args: string[]): Promise<void> {
    try {

        let suggestionButtons = new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId("suggestion_accept")
              .setLabel('Accept')
              .setStyle('SUCCESS'),

            new MessageButton()
                .setCustomId('suggestion_deny')
                .setLabel('Deny')
                .setStyle('DANGER'),
              
          );


        let content = message.content.replace(`${this.client.config.discord.bot.prefix}suggest `, '')
        let channel = this.client.getChannel(this.client.config.suggestion.channel)

        if(this.client.config.suggestion.enabled) {
            let suggestionEmbed = new MessageEmbed()
            .setAuthor(`${message.author.username}'s suggestion`, message.author.displayAvatarURL())
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`\`\`\`${args.join(" ")}\`\`\``)
            .setFooter(`Vote below on this topic`, message.guild?.iconURL() || '')
            .setColor(this.client.config.discord.embed.color)
            .setTimestamp()
        
            let suggestionMessage = await channel?.send({embeds:[suggestionEmbed], components:[suggestionButtons]})
            await suggestionMessage?.react('👍')
            await suggestionMessage?.react('👎')
        } else {
            return this.messages.error(
                "Suggestion Error",
                `Suggestions are currently not enabled`,
                message
              );
        }

    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Suggestion Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
