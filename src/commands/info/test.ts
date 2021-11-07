import { Message, MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";

export default class TestCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "test",
      description: "Get someone's avatar",
      arguments: "[user]",
      example: "/avatar bacio001",
      category: "info",
      type: "discord",
      deleteMessage: true,
      cooldown: true,
      requirements: {
        args: { min: 0, max: 0 },
        userPermissions: ["SEND_MESSAGES"],
        clientPermissions: ["SEND_MESSAGES"],
        guildOnly: true,
      },
    });
  }

  async execute(message: Message, args: string[]): Promise<void> {
    try {

        const helpButtons = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('help')
                .setPlaceholder("Select a help category!")
                .addOptions({
                    label: "Utility Commands",
                    value: "help_utility",
                    description: "General info and utility commands!",
                    emoji: "🛠️"
                }, {
                    label: "Community Commands",
                    value: "help_fun",
                    description: "Fun and entertaining commands!",
                    emoji: "🎪"
                }, {
                    label: "Ticket Commands",
                    value: "help_tickets",
                    description: "Ticket utility to controll ticket aspects!",
                    emoji: "🎟️"
                }, {
                    label: "Staff Commands",
                    value: "help_staff",
                    description: "Staff utility to controll server activity!",
                    emoji: "🚫"
                },{
                    label: "Admin Commands",
                    value: "help_admin",
                    description: "Admin utility to oversee staff and members!",
                    emoji: "🚨"
                }, {
                    label: "Setting Commands",
                    value: "help_settings",
                    description: "Management commands to controll the bot!",
                    emoji: "⚙️"
                })
        )

        const helpButtonsRow = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('ticket_create')
            .setEmoji('🗨️')
            .setStyle('PRIMARY'),
    
            new MessageButton()
            .setCustomId('suggestion_accept')
            .setEmoji('⚙️')
            .setStyle('PRIMARY'),
    
    
        );

        let embed = new MessageEmbed()
        .setDescription("test")

        message.channel.send({embeds: [embed], components: [helpButtons]})
        message.channel.send({embeds: [embed], components: [helpButtonsRow]})

    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Avatar Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
