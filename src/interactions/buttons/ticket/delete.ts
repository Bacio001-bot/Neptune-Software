import {
  Message,
  Interaction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageAttachment,
  TextChannel,
} from "discord.js";
import CustomClient from "../../../assets/classes/Client";
import InteractionClass from "../../../assets/classes/Interaction";
import fs from "fs";
import ms from "ms";

export default class TicketInteraction extends InteractionClass {
  constructor(client: CustomClient) {
    super(client, {
      name: "ticket_delete",
      description: "Delete ticket",
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

        let topicArgs = interaction.channel.topic.split(" - ");
        let channel = this.client.getChannel(this.client.config.logging.ticket.channel)

        if (this.client.config.logging.ticket.enabled) this.messages.ticketEvent(`Ticket Deleted`,
        `**\`${interaction.user.tag}\` has deleted the ticket \`#${topicArgs[1]}\`**`,
        channel as TextChannel,
        "RED")

        await interaction.channel.delete()

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
