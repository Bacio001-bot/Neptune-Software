import { Message, MessageEmbed } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";

export default class UnbanCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "unban",
      description: "Unban a Users",
      arguments: "<user> [reason]",
      example: "/unban Bacio001",
      category: "moderation",
      type: "discord",
      deleteMessage: true,
      cooldown: true,
      requirements: {
        args: { min: 1, max: 2 },
        userPermissions: ["BAN_MEMBERS"],
        clientPermissions: ["BAN_MEMBERS"],
        guildOnly: true,
      },
    });
  }

  async execute(message: Message, args: string[]): Promise<void> {
    try {
      let user = args[0];

      let reason = "Not Specified";

      if (args[1]) reason = args.slice(2).join(" ");

      let bans = await message.guild?.bans.fetch();
      if (bans?.size == 0)
        return this.messages.error(
          "User Unban Error",
          `No users have been banned in this guild`,
          message
        );

      try {
        message.guild?.bans.remove(user).catch((err) => {
          return this.messages.error(
            "User Unban Error",
            `${user} isn't banned`,
            message
          );
        });

        this.messages.success(
          "User Unban",
          `\`${user}\` has been unbanned by \`${message.author.tag}\`\n\n **Reason:** \n \`\`\`${reason}\`\`\``,
          message
        );
      } catch (err) {
        console.log(err);
        return this.messages.error(
          "User Unban Error",
          `A error occured please contact the developer`,
          message
        );
      }
    } catch (err) {
      console.log(err);
      return this.messages.error(
        "User Unban Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
