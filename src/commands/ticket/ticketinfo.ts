import { Message, TextChannel, MessageEmbed, MessageButton, MessageAttachment, MessageActionRow, MessageSelectMenu } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";
import fs from "fs"

export default class TicketdeleteCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "ticketinfo",
      description: "Get info of a ticket",
      arguments: "<ticketid>",
      example: "/ticketinfo 123456",
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

        let found = false

        fs.readdirSync('storage/tickets/').forEach((file) => { 
            let ticketArgs = file.split("-")

            if(ticketArgs[1] == args[0]) {
                found = true
                fs.readFile(`storage/tickets/${file}`, (err, data) => {
                    if (err) {
                        throw err;
                    }

                    let log = new MessageAttachment(
                        Buffer.from(data),
                        `${file}.txt`
                    );
                    
                    const embed = new MessageEmbed()
                        .setTitle(`Ticket #${ticketArgs[1]} Transcript`)
                        .setColor(this.client.config.discord.embed.color)
                        .setFooter(
                        `Ticket from ${message.guild?.name}`,
                        message.guild?.iconURL({ dynamic: true }) || '')

                    message.channel.send({ embeds: [embed] });
                    message.channel.send({ files: [log] });
                    
                
                })
            }
        })

        if(!found) return this.messages.error(
            "Ticket Info Error",
            `No ticket found with the id \`#${args[0]}\``,
            message
          );

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
