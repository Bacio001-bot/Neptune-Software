import { Message, Interaction, TextChannel, MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import CustomClient from "../../../assets/classes/Client";
import InteractionClass from "../../../assets/classes/Interaction";

export default class ApplicationInteraction extends InteractionClass {
  constructor(client: CustomClient) {
    super(client, {
      name: "application_create",
      description: "Create application",
      type: "discord",
      category: "application",
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

      if(this.client.config.application.enabled) {
        this.client.config.application.categories.forEach( async(cat) => {
          let applicationId = Math.floor(100000 + Math.random() * 900000)
          if(cat[1] == interaction.values.toString().replace("_", " ")) {
              let category = this.client.getCategory(cat[2])
              if(category) {

                  let applicationChannel = await interaction.message.guild.channels.create(
                      `${interaction.user.tag.toUpperCase()}-APPLICATION #${applicationId}`, {
                          type: "GUILD_TEXT",
                      }
                  );

                  await applicationChannel.setParent(category, {
                      lockPermissions: true,
                  });
  
                  await applicationChannel.permissionOverwrites.edit(interaction.user, {
                      VIEW_CHANNEL: true,
                      SEND_MESSAGES: true,

                  });

                  applicationChannel.setTopic(`${interaction.user.id} - ${applicationId} - ${category.id}`)

                  let resultChannel = this.client.getChannel(this.client.config.application.enabled)

                  let embed = new MessageEmbed()
                  .setAuthor(`${interaction.guild.name} Application utils panel - Application #${applicationId}`,this.client.user?.displayAvatarURL() || '')
                  .setThumbnail(interaction.user?.displayAvatarURL() || '')
                  .setDescription(`<@${interaction.user.id}> **please answer all the questions below to the best of your ability! After this the staff will be voting on your application and accepting or denying, please watch <#${resultChannel?.id}> !**`)
                  .setColor(this.client.config.discord.embed.color)

                  try {
                      let twelcomemessage = await applicationChannel.send({embeds: [embed]})
                      if(this.client.config.application.pin_instruction)await twelcomemessage.pin()  
                      let ping = await applicationChannel.send(`<@${interaction.user.id}>`)
                      ping.delete()
                  } catch (err) {
                      console.log(err)
                  }

                  let channel = this.client.getChannel(this.client.config.logging.application.channel)

                  if (this.client.config.logging.application.enabled)this.messages.applicationEvent(`Application Created`,
                  `**\`${interaction.user.tag}\` has created the application \`#${applicationId}\`**`,
                  channel as TextChannel,
                  "GREEN")

                  let result = this.userdb.getUser(interaction.user.id, "discordID");
                  if (result) {
                    this.userdb.updateUser(interaction.user.id, "discordID", "openApplications", result.applications.openApplications + 1)  
                  }



              } else {
                   return this.messages.error(
                  "Application Error",
                  `Category \`${cat[2]}\` doesn't exist`,
                  interaction.message
                );
              }
              
          } 
      });
      }

    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Application Error",
        `A error occured please contact the developer`,
        interaction.message
      );
    }
  }
}
