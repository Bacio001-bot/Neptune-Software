import {
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  TextChannel,
} from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";

export default class HelpPanelCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "helppanel",
      description: "Get the help panel",
      arguments: "",
      example: "/help",
      category: "panels",
      type: "discord",
      deleteMessage: true,
      cooldown: true,
      requirements: {
        args: { min: 0, max: 0 },
        userPermissions: ["SEND_MESSAGES"],
        clientPermissions: ["SEND_MESSAGES"],
        guildOnly: true,
      },
    });
  }

  async execute(message: Message, args: string[]): Promise<void> {
    try {
      let categories: any[] = [
        "moderation",
        "info",
        "panels",
        "utils",
        "ticket",
        "poll",
        "suggestion",
        "bundle",
      ];
      let embedDisplay: string = "";
      let menuCategories: any[] = [];

      categories.forEach((cat) => {

        let catHolder = cat

        let emoji
        let description

        if (cat == "bundle") {
          emoji = "📦"
          description = "Faction and skyblock bundles"
        }
        if (cat == "moderation") {
          emoji = "⚙️"
          description = "Moderation commands"
        }
        if (cat == "panels") {
          emoji = "🎛️"
          description = "Panels for the bot systems"
        }
        if (cat == "info") {
          emoji = "🔎"
          description = "User / Server / System info"
        }
        if (cat == "suggestion") {
          emoji = "🦻"
          description = "Suggestion commands"
        }
        if (cat == "utils") {
          emoji = "👷"
          description = "General utility commands"
        }
        if (cat == "ticket") {
          emoji = "🎟️"
          description = "Ticket commands"
        }
        if (cat == "poll") {
          emoji = "📝"
          description = "Poll commands"
        }

        embedDisplay = embedDisplay += `> \u200B**❯ \u200B ${emoji} \u200B  ${catHolder} »** ${description}\n`;

        menuCategories.push({
          menuCategories: `general_help`,
          label: catHolder,
          description: description,
          emoji: emoji,
          value: `help_${catHolder}`,
        });

      });


      let helpEmbed = new MessageEmbed()
        .setTitle(`Help`)
        .setDescription(
          `\n\n${embedDisplay} \n**Command Count:** ${this.client.commands.size}\n**Button Count:** ${this.client.buttons.size} \n\n __*Run a command with it's required arguments for examples*__`
        )
        .setColor(this.client.config.discord.embed.color)
        .setFooter(`${message.guild?.name}`, `${message.guild?.iconURL()}`)
        .setTimestamp();

      let helpMenu = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("general_help")
          .setPlaceholder("Select a category")
          .addOptions(menuCategories)
      );

      message.channel?.send({
        embeds: [helpEmbed],
        components: [helpMenu],
      });
    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Help Panel Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
