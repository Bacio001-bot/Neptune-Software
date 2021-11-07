import { Message } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";

export default class BundleRemove extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "bundleremove",
      description: "Remove a faction from a bundle",
      arguments: "<bundleId>",
      example: "/bundleremove 1 || /bundleremove all",
      category: "bundle",
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
      if (this.client.config.bundles.enabled) {
        let bundleId = parseInt(args[0]) || (args[0] as string);

        if (isNaN(bundleId as number) && (bundleId as string) != "all")
          return this.messages.error(
            "Bundle Remove Error",
            `Not a valid id supplied`,
            message
          );

        if (bundleId == "all") {
            
          this.bundledb.removeAll()

          this.messages.success(
            "Faction Bundle Removed",
            `All the bundles have been Removed`,
            message
          );
        } else {
          bundleId = bundleId as number;

          this.bundledb.removeBundle(bundleId, "bundleId");
          this.messages.success(
            "Faction Bundle Removed",
            `Bundle with the id \`${bundleId}\` has been removed`,
            message
          );
        }
      } else {
        return this.messages.error(
          "Bundle Remove Error",
          `Bundles aren't enabled`,
          message
        );
      }
    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Bundle Remove Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
