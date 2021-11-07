import {
  Message,
} from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";

export default class KickCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "kick",
      description: "Kick Users",
      arguments: "<user>",
      example: "/kick Bacio001",
      category: "moderation",
      type: "discord",
      deleteMessage: true,
      cooldown: true,
      requirements: {
        args: { min: 1, max: 2 },
        userPermissions: ["KICK_MEMBERS"],
        clientPermissions: ["KICK_MEMBERS"],
        guildOnly: true,
      },
    });
  }

  async execute(message: Message, args: string[]): Promise<void> {
    try {
      let user =
        message.mentions.members?.first() || this.client.getUser(args[0]);
      let reason = "Not Specified";

      if (message.author.id === user?.id || user == null)
        return this.messages.error(
          "User Kick Error",
          `Specify a user that isn't yourself or isn't in this guild`,
          message
        );

      if (args[1]) reason = args.slice(1).join(" ");

      try {
        await message.guild?.members.kick(user).catch();
        this.messages.success(
          "User Kick Created",
          `\`${user.user.tag}\` has been kicked by \`${message.author.tag}\`\n\n **REASON:** \n \`\`\`${reason}\`\`\``,
          message
        );
      } catch (err) {
        console.log(err);
        this.messages.error(
          "User Kick Error",
          `This user couldn't get kicked`,
          message
        );
      }

    } catch (err) {
      console.log(err);
      return this.messages.error(
        "User Kick Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
