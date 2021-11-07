import { Message } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";

export default class BundleAdd extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "bundleadd",
      description: "Add a faction to a bundle",
      arguments: "<bundleName> <factionName> <leaderName>",
      example: "/bundleadd firstbundle dummyfaction bacio001",
      category: "bundle",
      type: "discord",
      deleteMessage: true,
      cooldown: true,
      requirements: {
        args: { min: 3, max: 3 },
        userPermissions: ["ADMINISTRATOR"],
        clientPermissions: ["ADMINISTRATOR"],
        guildOnly: true,
      },
    });
  }

  async execute(message: Message, args: string[]): Promise<void> {
    try {
      let user =
        message.mentions.members?.first() || this.client.getUser(args[2]);
      if (
        user &&
        this.client.config.bundles.enabled &&
        this.client.config.bundles.names.includes(args[0])
      ) {
        this.bundledb.addBundle(
          args[0],
          args[1],
          user?.user.username,
          user?.user.id
        );
        this.messages.success(
          "Faction Bundle Added",
          `\`${args[1]}\` has been added to the queue for the bundle \`${args[0]}\``,
          message
        );
      } else {
        console.log(user,
          this.client.config.bundles.enabled,
          this.client.config.bundles.names.includes(args[0]));
        return this.messages.error(
          "Bundle Add Error",
          `User or bundle not found also check if bundles are even enabled`,
          message
        );
      }
    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Bundle Add Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
