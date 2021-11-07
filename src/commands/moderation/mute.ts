import { Message, MessageEmbed } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";
import moment from "moment";
import ms from "ms";

export default class MuteCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "mute",
      description: "Mute Users",
      arguments: "<user> <1s | 1m | 1h | 1d | perm> [reason]",
      example: "/mute Bacio001 1h",
      category: "moderation",
      type: "discord",
      deleteMessage: true,
      cooldown: true,
      requirements: {
        args: { min: 1, max: 2 },
        userPermissions: ["MUTE_MEMBERS"],
        clientPermissions: ["MUTE_MEMBERS"],
        guildOnly: true,
      },
    });
  }

  async execute(message: Message, args: string[]): Promise<void> {
    try {
      let mutedRole = this.client.getRole(
        this.client.config.moderation.mute.role
      );

      let user =
        message.mentions.members?.first() || this.client.getUser(args[0]);

      let reason = "Not Specified";

      if (!mutedRole)
        return this.messages.error(
          "User Mute Error",
          `No valid mute role name supplied in config`,
          message
        );

      if (message.author.id === user?.id || user == null)
        return this.messages.error(
          "User Mute Error",
          `Specify a user that isn't yourself and is in this guild`,
          message
        );

      if (args[1]) reason = args.slice(2).join(" ");

      if (!user)
        return this.messages.error(
          "User Mute Error",
          `Specify a user that isn't yourself and is in this guild`,
          message
        );

      if (!args[1])
        return this.messages.error(
          "User Ban Error",
          `Specify a valid time`,
          message
        );

      if (this.client.config.discord.bot.admin_users.includes(user.id))
        return this.messages.error(
          "User Mute Error",
          `Specify a that isn't a max perm user`,
          message
        );

      try {
        let now = new Date();
        let date = moment(now).format("MM/DD/YYYY");

        if (
          args[1].toLowerCase() === "perm" ||
          args[1].toLowerCase() === "permanent"
        ) {
          let time = "Until Unmuted";

          this.messages.success(
            "User Muted",
            `\`${user.user.tag}\` has been muted by \`${message.author.tag}\`\n\n **Time:**\`${time}\`\n\n **Reason:** \n \`\`\`${reason}\`\`\``,
            message
          );

          try {
            user.roles.add(mutedRole);
          } catch (err) {
            console.log(err);
            return this.messages.error(
              "User Mute Error",
              `A error occured make sure the permissions are right`,
              message
            );
          }
          return;
        }

        let time = ms(ms(args[1]), { long: true });

        this.messages.success(
          "User Muted",
          `\`${user.user.tag}\` has been muted by \`${message.author.tag}\`\n\n **Time:**\`${time}\`\n\n **Reason:** \n \`\`\`${reason}\`\`\``,
          message
        );

        try {
          user.roles.add(mutedRole);
        } catch (err) {
          console.log(err);
          return this.messages.error(
            "User Mute Error",
            `A error occured make sure the permissions are right`,
            message
          );
        }

        setTimeout(() => {
          if (user == null || mutedRole == null) return;
          user
            .send(
              `<@${user.user.id}> you have been unmuted in ${message.guild?.name}`
            )
            .catch();
          try {
            user.roles.remove(mutedRole);
          } catch (err) {
            console.log(err);
            return this.messages.error(
              "User Mute Error",
              `A error occured make sure the permissions are right`,
              message
            );
          }
        }, ms(args[1]));
      } catch (err) {
        console.log(err);
        return this.messages.error(
          "User Mute Error",
          `A error occured please contact the developer`,
          message
        );
      }
    } catch (err) {
      console.log(err);
      return this.messages.error(
        "User Mute Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
