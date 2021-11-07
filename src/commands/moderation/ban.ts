import {
  Message,
} from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";

export default class BanCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "ban",
      description: "Ban Users",
      arguments: "<user>",
      example: "/ban Bacio001",
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
      let user =
        message.mentions.members?.first() || this.client.getUser(args[0]);
      let reason = "Not Specified";

      if (message.author.id === user?.id || user == null)
        return this.messages.error(
          "User Ban Error",
          `Specify a user that isn't yourself and is in this guild`,
          message
        );

      if (args[1]) reason = args.slice(1).join(" ");

      try {
        await message.guild?.members.ban(user).catch();
        this.messages.success(
            "User Ban Created",
            `\`${user.user.tag}\` has been banned by \`${message.author.tag}\`\n\n **REASON:** \n \`\`\`${reason}\`\`\``,
            message
          );    
      } catch (err) {
        console.log(err);
        this.messages.error(
          "User Ban  ",
          `This user couldn't get banned`,
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
