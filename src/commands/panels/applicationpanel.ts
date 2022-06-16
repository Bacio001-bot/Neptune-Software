import {
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  TextChannel,
} from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";

export default class ApplicationPanelCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "applicationpanel",
      description: "Sends the application panel",
      arguments: "<Channel>",
      example: "/apanel",
      category: "panels",
      type: "discord",
      deleteMessage: true,
      cooldown: true,
      requirements: {
        args: { min: 0, max: 1 },
        userPermissions: ["ADMINISTRATOR"],
        clientPermissions: ["ADMINISTRATOR"],
        guildOnly: true,
      },
    });
  }

  async execute(message: Message, args: string[]): Promise<void> {

    if(!this.client.config.application.enabled) return this.messages.error(
      "Application Panel Error",
      `Application system is disabled`,
      message
    );

    try {
      let categoriesArray: { emoji: string; label: string; value: string }[] =
        [];

      this.client.config.application.categories.forEach((cat: string) => {
        let category = this.client.getCategory(cat[2]);
        if (!category) {
          return this.messages.error(
            "Application Panel Error",
            `\`${cat[2]}\` category could not be found`,
            message
          );
        }

        categoriesArray.push({
          emoji: cat[0],
          label: cat[1],
          value: `${cat[1].replace(" ", "_")}`,
        });
      });
      
      let applicationchannel = this.client.getChannel(args[0] || (message.channel as TextChannel).name);

      this.messages.success(
        "Application Panel Created",
        `Application panel has been sent to \`${applicationchannel?.name}\``,
        message
      );

      let applicationPanelEmbed = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("application_create")
          .setPlaceholder("Create a application")
          .addOptions(categoriesArray)
      );

      let aPanelEmbed = new MessageEmbed()
        .setTitle(`Application System`)
        .setDescription(
          `> Select one of the options below to create a application`
        )
        .setColor(this.client.config.discord.embed.color)
        .setFooter(`${message.guild?.name}`, `${message.guild?.iconURL()}` || ' ')
        .setTimestamp()

      applicationchannel?.send({
        embeds: [aPanelEmbed],
        components: [applicationPanelEmbed],
      });
    } catch (err) {
      console.log(err)
      return this.messages.error(
        "Ticket Panel Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
