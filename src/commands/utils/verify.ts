import { Message, MessageEmbed } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";

export default class VerifyCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "verify",
      description: "Verify your account",
      arguments: "<code>",
      example: "/verify 123456",
      category: "utils",
      type: "discord",
      deleteMessage: true,
      cooldown: true,
      requirements: {
        args: { min: 0, max: 1 },
        userPermissions: ["SEND_MESSAGES"],
        clientPermissions: ["SEND_MESSAGES"],
        guildOnly: true,
      },
    });
  }

  async execute(message: Message, args: string[]): Promise<void> {
    try {
      if (!args[0] && message.member) {
        let code = Math.floor(100000 + Math.random() * 900000).toString();
        this.userdb.addUser(message.member, code);

        this.messages.private(
          "Verification System",
          `To verify send \`${this.client.config.discord.bot.prefix}verify ${code}\` in \`${message.member.guild.name}\``,
          message.member
        );
      }

      let result = this.userdb.getUser(args[0], "verifyCode");

      if (!result)
        return this.messages.error(
          "Verification Error",
          `This verification code isn't in our database`,
          message
        );
      else if (result?.discordID != message.author.id)
        return this.messages.error(
          "Verification Error",
          `This verification code isn't linked to your account`,
          message
        );
      else {
        try {
          let role = this.client.getRole(
            this.client.config.member_join.verify.role
          );

          if (!role) return;

          message.member?.roles.add(role);

          this.userdb.updateUser(args[0], "verifyCode", "verifyCode", '');
          this.messages.success(
            "Verified",
            `You have been verified and given the role \`${this.client.config.member_join.verify.role}\``,
            message
          );
        } catch (err) {
          console.log(err);
          return this.messages.error(
            "Verification Error",
            `A error occured please contact the developer`,
            message
          );
        }
      }
    } catch (err) {
      console.log(err);
      this.messages.error(
        "Verify Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
