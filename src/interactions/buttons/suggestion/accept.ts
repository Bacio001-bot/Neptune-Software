import { Message, Interaction } from "discord.js";
import CustomClient from "../../../assets/classes/Client";
import InteractionClass from "../../../assets/classes/Interaction";

export default class SuggestionInteraction extends InteractionClass {
  constructor(client: CustomClient) {
    super(client, {
      name: "suggestion_accept",
      description: "Accept suggestion",
      type: "discord",
      category: "suggestion",
      requirements: {
        userPermissions: ["ADMINISTRATOR"],
        clientPermissions: ["SEND_MESSAGES"],
        guildOnly: true,
      },
    });
  }

  async execute(interaction: any, args: string[]): Promise<void> {
    try {

      await interaction.deferUpdate()

      let embed = interaction.message.embeds[0].setColor("#00ff00");
      await interaction.message.edit({
          embeds: [embed],
      });
    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Suggestion Error",
        `A error occured please contact the developer`,
        interaction.message
      );
    }
  }
}
