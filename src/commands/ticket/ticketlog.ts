import {
  Message,
  TextChannel,
  MessageEmbed,
  MessageButton,
  MessageAttachment,
  MessageActionRow,
  MessageSelectMenu,
  User,
  GuildMember,
} from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";
import fs from "fs";

export default class TicketLogCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "ticketlog",
      description: "Get log of a ticket",
      arguments: "<ticketid>",
      example: "/ticketlog 123456",
      category: "ticket",
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
    try {
      let user =
        message.mentions.members?.first() ||
        this.client.getUser(args[0] || message.author.username);

      let ticketCount: number = 0;

      let embed = new MessageEmbed()
      .setTitle(`${user?.user.tag} Ticket Log`)
      .setColor(this.client.config.discord.embed.color)
      .setFooter(
        `Requested by ${message.author?.tag}`,
        message.member?.displayAvatarURL({ dynamic: true }) || ""
      );
      fs.readdirSync("storage/tickets/").forEach(async (file) => {
        if (file.includes(user?.user.id as string)) {

          ticketCount = ticketCount + 1;
          let fileArgs = file.split("-");
          let data = fs.readFileSync(`storage/tickets/${file}`, "utf8");
          let array = data.split(": ");
          let name = array[2].split(" ")
          let date = array[1].replace(',', '')

          if(array){
            let desc = embed.description ? `${embed.description}${ticketCount}. ${name[0]} - #${fileArgs[1]} - ${date.replace(` Subject`, '')} \n` : `${ticketCount}. ${name[0]} - #${fileArgs[1]} - ${date.replace(` Subject`, '')} \n`
            embed.setDescription(desc)
          }
        }
      });

      embed.setDescription(`\`\`\`${embed.description}\`\`\``)


      message.channel.send({ embeds: [embed] });
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
