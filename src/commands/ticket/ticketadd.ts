import {
  Message,
  TextChannel,
  MessageEmbed,
  MessageButton,
  MessageAttachment,
  MessageActionRow,
  MessageSelectMenu,
} from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";
import fs from "fs";

export default class TicketAddCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "ticketadd",
      description: "Add someone to a ticket",
      arguments: "<user>",
      example: "/ticketadd bacio",
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
      let user = this.client.getUser(args[0]);

      if (user) {
        let cchanel = message.channel as any;
        if (cchanel.name.includes("ticket")) {
          await cchanel.permissionOverwrites.edit(user, {
            VIEW_CHANNEL: true,
          });

          this.messages.success(
            "Ticket Add",
            `<@${user.user.id}> has been added to the ticket`,
            message
          );
          message.channel.send(`<@${user.user.id}>`);

          let topicArgs = (message.channel as any).topic.split(" - ");
          let channel = this.client.getChannel(
            this.client.config.logging.ticket.channel
          );

          if (this.client.config.logging.ticket.enabled)
            this.messages.ticketEvent(
              `Ticket Add`,
              `**\`${user.user.tag}\` has been added to the ticket \`#${topicArgs[1]}\`**`,
              channel as any,
              this.client.config.discord.embed.color
            );
        }
      } else {
        return this.messages.error(
          "Ticket Add Error",
          `${args[0]} doesn't exist please mention a user`,
          message
        );
      }
    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Ticket Add Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
