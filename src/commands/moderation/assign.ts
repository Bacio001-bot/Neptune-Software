import { Message, MessageEmbed } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";

export default class AssignCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "assign",
      description: "Assign a role to a users",
      arguments: "<user> <role>",
      example: "/assign Bacio001 mod",
      category: "moderation",
      type: "discord",
      deleteMessage: true,
      cooldown: true,
      requirements: {
        args: { min: 2, max: 2 },
        userPermissions: ["MANAGE_ROLES"],
        clientPermissions: ["MANAGE_ROLES"],
        guildOnly: true,
      },
    });
  }

  async execute(message: Message, args: string[]): Promise<void> {
    try {
      let user =
        message.mentions.members?.first() || this.client.getUser(args[0]);

      let role =
        message.mentions.roles?.first() || this.client.getRole(args[1]);

      if (user == null || role == null)
        return this.messages.error(
          "Assign Role Error",
          `Not a valid user or role supplied`,
          message
        );
      
      user.roles.add(role)

      this.messages.success(
        "Assigned Role",
        `\`${user.user.tag}\` has been assigned the role \`${role.name}\``,
        message
      );

    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Assign Role Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
