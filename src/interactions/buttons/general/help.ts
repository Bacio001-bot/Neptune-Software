import {
    Message,
    Interaction,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    MessageAttachment,
    TextChannel,
  } from "discord.js";
  import CustomClient from "../../../assets/classes/Client";
  import InteractionClass from "../../../assets/classes/Interaction";
  import fs from "fs";
  import ms from "ms";
  
  export default class TicketInteraction extends InteractionClass {
    constructor(client: CustomClient) {
      super(client, {
        name: "general_help",
        description: "Help panel",
        type: "discord",
        category: "general",
        requirements: {
          userPermissions: ["SEND_MESSAGES"],
          clientPermissions: ["SEND_MESSAGES"],
          guildOnly: true,
        },
      });
    }
  
    async execute(interaction: any, args: string[]): Promise<void> {
      try {
        let id = interaction.values.toString().split('_')
        id = id[1]
        let helpEmbed = ""
        
        this.client.commands.forEach((category) => {
          let aliases = ""
          if(category.help.category == id && category.aliases) category.aliases.forEach((alias) => {
            aliases = aliases += `\`${alias}\` ‏‏‎ ‎`
          })
          
          if(category.help.category == id) {
            if(aliases != "") {
              helpEmbed = helpEmbed += `> **${category.help.name} »** ${category.help.description}\n> **Aliases »**‏‏‎ ‎${aliases}\n> ‏‏‎ ‎\n`
            } else {
              helpEmbed = helpEmbed += `> **${category.help.name} »** ${category.help.description}\n> **Aliases »**‏‏‎ ‎\`No Aliases\`\n> ‏‏‎ ‎\n`
            }
          }
        })

      let embed = interaction.message.embeds[0].setDescription(helpEmbed)
      embed = embed.setTitle(`Help ${id}`)
      await interaction.message.edit({
        embeds: [embed],
      });      
    } catch (err) {
        console.log(err);
        return this.messages.error(
          "Ticket Error",
          `A error occured please contact the developer`,
          interaction.message
        );
      }
    }
  }
  