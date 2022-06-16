import { Message, Interaction, MessageEmbed, MessageActionRow, MessageButton,TextChannel } from "discord.js";
import CustomClient from "../../../assets/classes/Client";
import InteractionClass from "../../../assets/classes/Interaction";

export default class TicketInteraction extends InteractionClass {
  constructor(client: CustomClient) {
    super(client, {
      name: "ticket_unarchive",
      description: "Unarchive ticket",
      type: "discord",
      category: "ticket",
      requirements: {
        userPermissions: ["ADMINISTRATOR"],
        clientPermissions: ["ADMINISTRATOR"],
        guildOnly: true,
      },
    });
  }

  async execute(interaction: any, args: string[]): Promise<void> {
    try {

      await interaction.deferUpdate()

        let topicArgs = interaction.channel.topic.split(" - ");

        await interaction.channel.setParent(this.client.getCategory(topicArgs[3]), {
            lockPermissions: true,
        });

        let channel = this.client.getChannel(this.client.config.logging.ticket.channel)

        if (this.client.config.logging.ticket.enabled) this.messages.ticketEvent(`Ticket Unarchived`,
        `**\`${interaction.user.tag}\` has unarchived the ticket \`#${topicArgs[1]}\`**`,
        channel as TextChannel,
        this.client.config.discord.embed.color)

        return this.messages.success(
            "Ticket Unarchived",
            `The ticket has been moved back to \`${interaction.channel.name}\``,
            interaction.message
          );

    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Ticket Error",
        `A error occured please contact the developer`,
        interaction.message
      );
    }
  }
}
