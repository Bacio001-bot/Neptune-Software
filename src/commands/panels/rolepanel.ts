import {
    Message,
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
    TextChannel,
  } from "discord.js";
  import CustomClient from "../../assets/classes/Client";
  import Command from "../../assets/classes/Command";
  
  export default class TicketPanelCommand extends Command {
    constructor(client: CustomClient) {
      super(client, {
        name: "rolepanel",
        description: "Start Roles",
        arguments: "<Channel>",
        example: "/rpanel",
        category: "panels",
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

        if(!this.client.config.role.select.enabled) return this.messages.error(
            "Role Panel Error",
            `Role selector is disabled`,
            message
          );

        let roleSelectArray: { emoji: string; label: string; value: string }[] =
          [];

        let roleShowcase: string = "\n"
  
        this.client.config.role.select.options.forEach((r: string) => {
          let role = this.client.getRole(r[1]);
          if (!role) {
            return this.messages.error(
              "Role Panel Error",
              `\`${r[1]}\` role could not be found`,
              message
            );
          }
  
          roleSelectArray.push({
            emoji: r[0],
            label: r[1],
            value: r[1],
          });

          roleShowcase += `> ${r[0]} **${r[1]}** » ${r[2]}\n`
        });
  
        let rchannel = this.client.getChannel(args[0]);
  
        let rolechannel = (rchannel == null) ? (message.channel as TextChannel) : rchannel
  
        this.messages.success(
          "Role Panel Created",
          `Rol e panel has been sent to \`${rolechannel?.name}\``,
          message
        );
  
        let rolePanelEmbed = new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId("ticket_create")
            .setPlaceholder("Create a ticket")
            .addOptions(roleSelectArray)
        );
  
        let rPanelEmbed = new MessageEmbed()
          .setTitle(`Role Select System`)
          .setDescription(
            `**Select one of the roles below to get it**\n${roleShowcase}\n *Remove the role by reselecting it*`
          )
          .setColor(this.client.config.discord.embed.color)
          .setFooter(`${message.guild?.name}`, `${message.guild?.iconURL()}`)
          .setTimestamp()
  
          rolechannel?.send({
          embeds: [rPanelEmbed],
          components: [rolePanelEmbed],
        });
      } catch (err) {
        console.log(err)
        return this.messages.error(
          "Role Panel Error",
          `A error occured please contact the developer`,
          message
        );
      }
    }
  }
  