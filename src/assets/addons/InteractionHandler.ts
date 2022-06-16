import CustomClient from "../classes/Client"; 
import { Bot } from "mineflayer";
import { Message } from "discord.js";

export default (client: CustomClient, bot: Bot, interaction: any): void => {

    try {

        async function awaitInt2() {
            return await interaction.reply({ content: `❌ Sorry you don't have the right perms to use this interaction`, ephemeral: true });
        }
    
        let btn = interaction.customId

        let button = client.getButtons(btn)

        if(interaction.customId.includes('mine') || interaction.customId.includes('block') ) return;
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
        
        try {
            return button.execute(interaction);
        } catch (error) {
    
        }
        
    } catch(err) {
        console.log(err)
    }
   
}