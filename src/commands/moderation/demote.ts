import { Message, MessageEmbed } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";


export default class DemoteCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "demote",
      description: "Demote Users from a role list given in config",
      arguments: "<user>",
      example: "/demote Bacio001",
      category: "moderation",
      type: "discord",
      deleteMessage: true,
      cooldown: true,
      requirements: {
        args: { min: 1, max: 2 },
        userPermissions: ["MANAGE_ROLES"],
        clientPermissions: ["MANAGE_ROLES"],
        guildOnly: true,
      }
    });
  }

  async execute(message: Message, args: string[]): Promise<void> {
    try {

      let user =
        message.mentions.members?.first() || this.client.getUser(args[0]);

      if (message.author.id === user?.id || user == null)
        return this.messages.error(
          "Demote Error",
          `Specify a user that isn't yourself and is in this guild`,
          message
        );

        let positions: any = [];
        user.roles.cache.forEach((r) => {
          if (this.client.config.moderation.promotion.roles.includes(r.name)) {
            positions.push({ position: r.position, name: r.name });
          }
        });
        positions = positions.sort(function (a, b) {
          return b.position - a.position;
        });
        let lowestRole
        try {
          lowestRole = positions.reduce((min, game) =>
          min.position < game.position ? min : game
        );
        } catch(err) {
          return this.messages.error(
            "Demote Error",
            `User doesn't have a role so can't be demoted`,
            message
          );
          }

        if (
          this.client.config.moderation.promotion.roles.indexOf(
            lowestRole.name
          ) == this.client.config.moderation.promotion.roles.length - 1
        ) {
          return this.messages.error(
            "Demote Error",
            `User already has the lowest role`,
            message
          );
        } else {
          let nextRolePosition =
            this.client.config.moderation.promotion.roles.indexOf(
              lowestRole.name
            ) + 1;
          let nextRole = this.client.getRole( this.client.config.moderation.promotion.roles[nextRolePosition]);
          let lastRole = this.client.getRole(lowestRole.name);
          if (nextRole == null || lastRole == null) return;
          try {
            user.roles.add(nextRole)
            user.roles.remove(lastRole)
            return this.messages.success(
              "Demoted",
              `\`${user.user.tag}\` has been demoted to \`${nextRole.name}\``,
              message
            ); 
          } catch(err) {
            console.log(err)
          }
        }
    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Demote Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
