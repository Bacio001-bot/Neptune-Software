import { Message, Interaction, MessageEmbed, MessageActionRow, MessageButton,TextChannel } from "discord.js";
import CustomClient from "../../../assets/classes/Client";
import InteractionClass from "../../../assets/classes/Interaction";

export default class TicketInteraction extends InteractionClass {
  constructor(client: CustomClient) {
    super(client, {
      name: "ticket_reopen",
      description: "Reopen a ticket",
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
        if (interaction.channel?.parent?.name == this.client.config.ticket.archive_category) {
          await (interaction.channel as TextChannel).setParent(this.client.getCategory(topicArgs[3]))
        }

        let channel = this.client.getChannel(this.client.config.logging.ticket.channel)

        if (this.client.config.logging.ticket.enabled) this.messages.ticketEvent(`Ticket Reopen`,
        `**\`${interaction.user.tag}\` has reopened the ticket \`#${topicArgs[1]}\`**`,
        channel as TextChannel,
        this.client.config.discord.embed.color)

        interaction.channel.guild.members.cache.forEach( async(member) => {
          if((interaction.channel as any).topic.includes(member.user.id)) {
              await (interaction.channel as any).permissionOverwrites.edit(member.user, {
                  VIEW_CHANNEL: true,
              });
          }
      })

        return this.messages.success(
            "Ticket Opened",
            `The ticket has been reopened`,
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
