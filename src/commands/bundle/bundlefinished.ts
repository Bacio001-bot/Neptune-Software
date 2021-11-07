import { Message } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";

export default class BundleFinished extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "bundlefinished",
      description: "Get the list of finished bundles",
      arguments: "",
      example: "/bundlefinished",
      category: "bundle",
      type: "discord",
      deleteMessage: true,
      cooldown: true,
      requirements: {
        args: { min: 0, max: 0 },
        userPermissions: ["ADMINISTRATOR"],
        clientPermissions: ["ADMINISTRATOR"],
        guildOnly: true,
      },
    });
  }

  async execute(message: Message, args: string[]): Promise<void> {
    try {
      let bundleMessage = ""
      this.client.config.bundles.names.forEach(bundleName => {
        bundleMessage += `\n**${bundleName}**\n`
        this.bundledb.listBundles().forEach(bundle => {
          if(bundle.bundelName == bundleName && bundle.bundlegiven) {
            bundleMessage += `> **${bundle.facName} (${bundle.bundleId}) »** *${bundle.facLeaderName} (${bundle.facLeaderId})*\n`
          }
        })
      })

      bundleMessage += "\n```BundleName » BundleId » Faction » Leader```"

      this.messages.default(
        "Faction Bundle Finished",
        bundleMessage,
        message
      );
    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Bundle Finish Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
