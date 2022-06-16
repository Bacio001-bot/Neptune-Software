import {
  Message,
  TextChannel,
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  GuildMember,
} from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";
import fs from "fs";
import ms from "ms";
export default class GiveawayEntriesCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "giveawayentries",
      description: "Entries for a giveaway",
      arguments: "<giveawayid>",
      example: "/giveawayentries 123456?",
      category: "giveaway",
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
      let entries: string = ""
      let result = this.client.giveawaydb.getGiveaway(parseInt(args[0]), "giveawayID");
      result?.enteries.forEach((enterer) => {
          let member = this.client.getUser(enterer)
          entries = entries +=  `<@${member?.id}> » ${member?.user.tag} \n`
      })

      let giveawayEntriesEmbed = new MessageEmbed()
      .setTitle(`Giveaway \`#${args[0]}\` Entries`)
      .setDescription(
        `${entries}`
      )
      .setColor(this.client.config.discord.embed.color)
      .setFooter(`Giveaway Id: ${args[0]}`)
      .setTimestamp()

      message.channel?.send({embeds: [giveawayEntriesEmbed]})
      
    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Poll Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
