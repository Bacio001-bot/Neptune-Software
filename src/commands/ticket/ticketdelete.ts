import { Message, TextChannel, MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";
import fs from "fs"

export default class TicketdeleteCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "ticketdelete",
      description: "Delete a ticket",
      arguments: "<ticketid>",
      example: "/ticketdelete 123456",
      category: "ticket",
      type: "discord",
      deleteMessage: true,
      cooldown: true,
      requirements: {
        args: { min: 1, max: 1 },
        userPermissions: ["ADMINISTRATOR"],
        clientPermissions: ["ADMINISTRATOR"],
        guildOnly: true,
      },
    });
  }

  async execute(message: Message, args: string[]): Promise<void> {
    try {

      if(!(message.channel as TextChannel).name.includes("ticket"))       return this.messages.error(
        "Ticket Delete Error",
        `You can only run this command in a ticket`,
        message
      );

        fs.readdirSync('storage/tickets/').forEach((file) => {
            let fileArgs = file.split('-')
            if(fileArgs[1] == args[0]) {
                fs.unlinkSync(`storage/tickets/${file}`)
                this.messages.success(
                    "Ticket Deleted",
                    `Ticket \`#${fileArgs[1]}\` has been deleted`,
                    message
                );

                let channel = this.client.getChannel(this.client.config.logging.ticket.channel)

                this.messages.ticketEvent(`Ticket Deleted`,
                `**Ticket \`#${fileArgs[1]}\` has been deleted by \`${message.author.tag}\`**`,
                channel as TextChannel,
                'RED')
            }
        })
    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Ticket Delete Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
