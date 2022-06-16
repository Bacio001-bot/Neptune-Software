import {
  Message,
  Interaction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  TextChannel
} from "discord.js";
import CustomClient from "../../../assets/classes/Client";
import InteractionClass from "../../../assets/classes/Interaction";

export default class TicketInteraction extends InteractionClass {
  constructor(client: CustomClient) {
    super(client, {
      name: "ticket_verb",
      description: "Verb ticket",
      type: "discord",
      category: "ticket",
      requirements: {
        userPermissions: ["SEND_MESSAGES"],
        clientPermissions: ["SEND_MESSAGES"],
        guildOnly: true,
      },
    });
  }

  async execute(interaction: any, args: string[]): Promise<void> {
    try {

      await interaction.deferUpdate()

      let topicArgs = interaction.channel.topic.split(" - ");
      let user = this.client.getUser(topicArgs[0]);

      if (user) {

        await interaction.channel.setParent(interaction.channel.parent, {
          lockPermissions: true,
        });

        await interaction.channel.permissionOverwrites.edit(user, {
          VIEW_CHANNEL: true,
        });

        this.messages.success(
          "Ticket verbed",
          `All staff members can see this ticket`,
          interaction.message
        );

        let channelTopicArgs = interaction.channel.topic.split(' - ')

        let channel = this.client.getChannel(this.client.config.logging.ticket.channel)

        if (this.client.config.logging.ticket.enabled) return this.messages.ticketEvent(`Ticket Verbed`,
        `**\`${interaction.user.tag}\` has verbed the ticket \`#${channelTopicArgs[1]}\`**`,
        channel as TextChannel,
        this.client.config.discord.embed.color)
        interaction.deferUpdate()
      } else {
        return this.messages.error(
          "Ticket Error",
          `A error occured please contact the developer`,
          interaction.message
        );
      }
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
