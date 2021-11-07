import { Message, TextChannel } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";

export default class BanCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "slowmode",
      description: "Slowmode a channel",
      arguments: "<channel> <seconds>",
      example: "/slowmode 1",
      category: "moderation",
      type: "discord",
      deleteMessage: true,
      cooldown: true,
      requirements: {
        args: { min: 2, max: 2 },
        userPermissions: ["MANAGE_CHANNELS"],
        clientPermissions: ["MANAGE_CHANNELS"],
        guildOnly: true,
      },
    });
  }

  async execute(message: Message, args: string[]): Promise<void> {
    try {
      let channel = this.client.getChannel(args[0]);

      if (channel == null)
        return this.messages.error(
          "Slowmode Error",
          `No valid channel supplied`,
          message
        );

      if (isNaN(parseInt(args[1])))
        return this.messages.error(
          "Slowmode Error",
          `Specify a valid number`,
          message
        );

      try {
        (channel as TextChannel)?.setRateLimitPerUser(parseInt(args[1]));

        this.messages.success(
          "Slowmode",
          `\`${message.author.tag}\` has been enabled slowmade,\`${channel.name}\` cooldown is \`${args[1]} seconds\``,
          message
        );
      } catch (err) {
        console.log(err);
        return this.messages.error(
          "Slowmode Error",
          `A error occured please contact the developer`,
          message
        );
      }
    } catch (err) {
      console.log(err);
      return this.messages.error(
        "User Ban Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
