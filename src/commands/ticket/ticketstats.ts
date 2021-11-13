import { Message, TextChannel, MessageEmbed, MessageButton, MessageAttachment, MessageActionRow, MessageSelectMenu } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";
import fs from "fs"

export default class TicketStatsCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "ticketstats",
      description: "Get info of someone's ticket stats",
      arguments: "<user>",
      example: "/ticketinfo bacio",
      category: "ticket",
      type: "discord",
      deleteMessage: true,
      cooldown: true,
      requirements: {
        args: { min: 0, max: 1 },
        userPermissions: ["SEND_MESSAGES"],
        clientPermissions: ["SEND_MESSAGES"],
        guildOnly: true,
      },
    });
  }

  async execute(message: Message, args: string[]): Promise<void> {
    try {
        let user =
        message.mentions.members?.first() ||
        this.client.getUser(args[0] || message.author.username);

        if(!user) return this.messages.error(
            "Ticket Stats Error",
            `Please supply a valid user`,
            message
          );

        let result = this.userdb.getUser(user.user?.id, "discordID");

        if(result) {
            const embed = new MessageEmbed()
                .setAuthor(`${user.user?.tag} Ticket Stats`, user.user.displayAvatarURL({ dynamic: true }))
                .setColor(this.client.config.discord.embed.color)
                .setDescription(`**Open tickets: **${result.tickets.openTickets} \n**Closed tickets: **${result.tickets.closedTickets} \n**Total tickets: **${result.tickets.closedTickets + result.tickets.openTickets}`)
                .setThumbnail('https://images.squarespace-cdn.com/content/v1/5b068c9c1137a6d587782e12/1540480338683-S72PUSENHD9QDGMO7XND/tickets.png')
                .setFooter(
                `Requested by ${message.author?.tag}`,
                message.author?.displayAvatarURL({ dynamic: true }) || '')

            message.channel.send({ embeds: [embed] });
        } 

    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Ticket Stats Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
