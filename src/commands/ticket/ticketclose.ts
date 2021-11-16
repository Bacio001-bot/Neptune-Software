import {
  Message,
  TextChannel,
  MessageAttachment,
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
} from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";
import fs from "fs";
import ms from "ms";

export default class TicketdeleteCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "ticketclose",
      description: "Close your ticket",
      arguments: "",
      example: "/ticketclose",
      category: "ticket",
      type: "discord",
      deleteMessage: true,
      cooldown: true,
      requirements: {
        args: { min: 0, max: 0 },
        userPermissions: ["SEND_MESSAGES"],
        clientPermissions: ["SEND_MESSAGES"],
        guildOnly: true,
      },
    });
  }

  async execute(message: Message, args: string[]): Promise<void> {
    try {

      if(!(message.channel as TextChannel).name.includes("ticket"))       return this.messages.error(
        "Ticket Close Error",
        `You can only run this command in a ticket`,
        message
      );
      
      await (message.channel as any).setParent(
        (message.channel as any).parent,
        {
          lockPermissions: true,
        }
      );

      let ticketButtons = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("ticket_close")
          .setLabel("Close")
          .setEmoji("🔐")
          .setStyle("PRIMARY"),

        new MessageButton()
          .setCustomId("ticket_archive")
          .setLabel("Archive")
          .setEmoji("📎")
          .setStyle("PRIMARY"),

        new MessageButton()
          .setCustomId("ticket_unarchive")
          .setLabel("Unarchive")
          .setEmoji("📂")
          .setStyle("PRIMARY"),

        new MessageButton()
          .setCustomId("ticket_reopen")
          .setLabel("Reopen")
          .setEmoji("🔓")
          .setStyle("PRIMARY"),

        new MessageButton()
          .setCustomId("ticket_delete")
          .setLabel("Delete")
          .setEmoji("🛑")
          .setStyle("DANGER")
      );

      const embed = new MessageEmbed()
        .setTitle("Ticket Panel")
        .setColor(this.client.config.discord.embed.color)
        .setDescription(
          `**All none staff members have been removed from the ticket**`
        );

      message.channel.send({ embeds: [embed], components: [ticketButtons] });

      let topicArgs = (message.channel as any).topic.split(" - ");

      let msgs = await message.channel.messages.fetch({
        limit: 100,
      });
      let data = `Date: ${new Date().toLocaleString()} Subject: ${
        (message.channel as any).parent.name
      } Closed By: ${message.author.tag}(${message.author.id})\n\n`;

      msgs = msgs.sort((a, b) => a.createdTimestamp - b.createdTimestamp);

      msgs.forEach((msg) => {
        if (msg.content) {
          data += `   ${msg.author.tag} » ${ms(
            Date.now() - msg.createdTimestamp,
            { long: true }
          )} ago\n`;
          data += `       ${msg.content}\n`;
          data += `\n`;
        }
      });
      let user = this.client.getUser(topicArgs[0]);
      if (!user) return;
      let log = new MessageAttachment(
        Buffer.from(data),
        `${topicArgs[0]}-${topicArgs[1]}.txt`
      );
      const embed2 = new MessageEmbed()
        .setTitle(`Ticket #${topicArgs[1]} Transcript`)
        .setColor(this.client.config.discord.embed.color)
        .setFooter(
          `Ticket from ${message.guild?.name}`,
          message.guild?.iconURL({ dynamic: true }) || ""
        );

      if (topicArgs[2] == "TRUE") {
        user
          ?.send({
            embeds: [embed2],
          })
          .catch((err) => console.log(err));
        user
          ?.send({
            files: [log],
          })
          .catch((err) => console.log(err));
      }
    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Ticket Close Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
