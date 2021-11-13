import CustomClient from "../classes/Client"; 
import { Bot } from "mineflayer";
import { Message } from "discord.js";

export default (client: CustomClient, bot: Bot, interaction: any): void => {
   
    async function awaitInt() {
        await interaction.deferUpdate();
    }

    async function awaitInt2() {
        return await interaction.reply({ content: `❌ Sorry you don't have the right perms to use this interaction`, ephemeral: true });
    }

    let btn = interaction.customId

    let button = client.getButtons(btn);

    let perm = false

    client.config.discord.staff.roles.forEach((p) => {
        interaction.member?.roles.cache.forEach((role) => {
            if(role.name == p) return perm = true
        })    
    })

    if (!client.checkPermissions(btn, interaction) && !perm) {
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