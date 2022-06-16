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
      name: "ticket_preclose",
      description: "close ticket",
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

      await (interaction.channel as any).setParent(
        (interaction.channel as any).parent,
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

      interaction.channel.send({
        embeds: [embed],
        components: [ticketButtons],
      });

      let topicArgs = (interaction.channel as any).topic.split(" - ");

      let msgs = await interaction.channel.messages.fetch({
        limit: 100,
      });
      let data = `Date: ${new Date().toLocaleString()} Subject: ${
        (interaction.channel as any).parent.name
      } Closed By: ${interaction.user.tag}(${interaction.user.id})\n\n`;

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
          `Ticket from ${interaction.guild?.name}`,
          interaction.guild?.iconURL({ dynamic: true }) || ""
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
        "Ticket Error",
        `A error occured please contact the developer`,
        interaction.message
      );
    }
  }
}
