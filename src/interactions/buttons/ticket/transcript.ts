import { Message, Interaction, TextChannel, MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import CustomClient from "../../../assets/classes/Client";
import InteractionClass from "../../../assets/classes/Interaction";

export default class TicketInteraction extends InteractionClass {
  constructor(client: CustomClient) {
    super(client, {
      name: "ticket_transcript",
      description: "Transcript ticket",
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
        if(this.client.config.ticket.user_transcript_enabled) {
            let topic = interaction.channel.topic
            interaction.channel.setTopic(topic.replace('FALSE', 'TRUE'))
            this.messages.success(
                "Ticket Transcript Requested",
                `After the ticket is closed the bot will send you a transcript of the ticket`,
                interaction.message
          );

          let channelTopicArgs = interaction.channel.topic.split(' - ')

          let channel = this.client.getChannel(this.client.config.logging.ticket.channel)

          this.messages.ticketEvent(`Ticket Transcript Requested`,
          `**\`${interaction.user.tag}\` has requested a transcript for the ticket \`#${channelTopicArgs[1]}\`**`,
          channel as TextChannel,
          this.client.config.discord.embed.color)
        } else {
            return this.messages.error(
                "Ticket Error",
                `User transcripts are disabled in this guild`,
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
