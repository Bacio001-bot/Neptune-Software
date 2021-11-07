import CustomClient from "../classes/Client"; 
import { Bot } from "mineflayer";
import { Message } from "discord.js";

export default (client: CustomClient, bot: Bot, interaction: any): void => {
   
    async function awaitInt() {
        await interaction.deferUpdate();
    }

    async function awaitInt2() {
        return await interaction.reply({ content: '❌ Sorry you have no access to this interaction', ephemeral: true });
    }

    let btn = interaction.customId

    let button = client.getButtons(btn);

    if (!client.checkPermissions(btn, interaction)) {
        awaitInt2()
        return;
    }

    awaitInt()

    try {
        return button.execute(interaction);
    } catch (error) {
        console.log(error);
    }
}