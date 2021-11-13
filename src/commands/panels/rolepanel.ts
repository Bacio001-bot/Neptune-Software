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
        description: "Sends the reaction role panel",
        arguments: "<Channel>",
        example: "/rpanel",
        category: "panels",
        type: "discord",
        deleteMessage: true,
        cooldown: true,
        requirements: {
          args: { min: 0, max: 1 },
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
    
        let rolechannel = this.client.getChannel(args[0] || (message.channel as TextChannel).name);
  
        this.messages.success(
          "Role Panel Created",
          `Role panel has been sent to \`${rolechannel?.name}\``,
          message
        );
  
        let roleMenu = new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId("role_assign")
            .setPlaceholder("Select a role")
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
          components: [roleMenu],
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
  