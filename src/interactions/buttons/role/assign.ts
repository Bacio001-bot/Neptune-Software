import { Message, Interaction } from "discord.js";
import CustomClient from "../../../assets/classes/Client";
import InteractionClass from "../../../assets/classes/Interaction";

export default class RoleInteraction extends InteractionClass {
  constructor(client: CustomClient) {
    super(client, {
      name: "role_assign",
      description: "Assign a role",
      type: "discord",
      category: "role",
      requirements: {
        userPermissions: ["SEND_MESSAGES"],
        clientPermissions: ["SEND_MESSAGES"],
        guildOnly: true,
      },
    });
  }

  async execute(interaction: any, args: string[]): Promise<void> {
    try {

      await interaction.deferUpdate()

        let role = interaction.guild.roles.cache.find(r => r.name == interaction.values.toString())
        try {
            await interaction.member.roles.add(role)
            await interaction.member.send({ content: `✅ The role \`${role.name}\` has been assigned`}).catch()

        } catch(err) {
            console.log(err)
        }
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
