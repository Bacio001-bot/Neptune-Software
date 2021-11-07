import {
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  TextChannel,
} from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";

export default class TicketPanelCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "ticketpanel",
      description: "Start Tickets",
      arguments: "<Channel>",
      example: "/tpanel",
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

    if(!this.client.config.ticket.enabled) return this.messages.error(
      "Ticket Panel Error",
      `Ticket system is disabled`,
      message
    );

    try {
      let categoriesArray: { emoji: string; label: string; value: string }[] =
        [];

      this.client.config.ticket.categories.forEach((cat: string) => {
        let category = this.client.getCategory(cat[2]);
        if (!category) {
          return this.messages.error(
            "Ticket Panel Error",
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

      let tchannel = this.client.getChannel(args[0]);

      let ticketchannel = (tchannel == null) ? (message.channel as TextChannel) : tchannel

      this.messages.success(
        "Ticket Panel Created",
        `Ticket panel has been sent to \`${ticketchannel?.name}\``,
        message
      );

      let ticketPanelEmbed = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("ticket_create")
          .setPlaceholder("Create a ticket")
          .addOptions(categoriesArray)
      );

      let tPanelEmbed = new MessageEmbed()
        .setTitle(`Ticket System`)
        .setDescription(
          `> Select one of the options below to create a ticket`
        )
        .setColor(this.client.config.discord.embed.color)
        .setFooter(`${message.guild?.name}`, `${message.guild?.iconURL()}`)
        .setTimestamp()

      ticketchannel?.send({
        embeds: [tPanelEmbed],
        components: [ticketPanelEmbed],
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
