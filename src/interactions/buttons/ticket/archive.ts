import { Message, Interaction, MessageEmbed, MessageActionRow, MessageButton,TextChannel } from "discord.js";
import CustomClient from "../../../assets/classes/Client";
import InteractionClass from "../../../assets/classes/Interaction";

export default class TicketInteraction extends InteractionClass {
  constructor(client: CustomClient) {
    super(client, {
      name: "ticket_archive",
      description: "Archive ticket",
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

        await interaction.channel.setParent(this.client.getChannel(this.client.config.ticket.archive_category), {
            lockPermissions: true,
        });

        let topicArgs = interaction.channel.topic.split(" - ");
        let channel = this.client.getChannel(this.client.config.logging.ticket.channel)

        if (this.client.config.logging.ticket.enabled) this.messages.ticketEvent(`Ticket Archived`,
        `**\`${interaction.user.tag}\` has archived the ticket \`#${topicArgs[1]}\`**`,
        channel as TextChannel,
        this.client.config.discord.embed.color)

        return this.messages.success(
            "Ticket Archived",
            `The ticket has been moved to \`${this.client.config.ticket.archive_category}\``,
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
