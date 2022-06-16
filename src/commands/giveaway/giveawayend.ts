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
export default class GiveawayEndCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "giveawayend",
      description: "End a giveaway",
      arguments: "<giveawayid>",
      example: "/giveawayend 123456?",
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
      let result = this.client.giveawaydb.getGiveaway(parseInt(args[0]), "giveawayID");
      let startedBy = this.client.getUser(result?.discordID)

      let winner = "No winner";
        if (result?.enteries.length != 0) {
          let memberId = result?.enteries[Math.floor(Math.random() * result?.enteries.length)];
          let member = this.client.getUser(memberId);
          winner = `<@${member?.user.id}> (${member?.user.id})`;
        }

      let channel = message.guild?.channels.cache.find(c => c.id == result?.channelID);
      let giveawayMessage = await (channel as TextChannel).messages.fetch(result?.messageID as string)
      
      let giveaway2Embed = new MessageEmbed()
      .setTitle(`Giveaway ended`)
      .setDescription(
        `**Title**\n${result?.title}\n\n**Description**\n${result?.description}\n**Winner »** ${winner}\n\n**Price »** ${result?.price}\n\n**Entries »** ${result?.enteries.length}\n**Duration »** ${ms(
          result?.durationMs as number,
          { long: true }
        )} \n**Started by »** ${startedBy?.user.tag}`
      )
      .setColor(this.client.config.discord.embed.color)
      .setFooter(
        `Giveaway Id: ${result?.giveawayID}`,
        `${message.author?.displayAvatarURL()}`
      )
      .setTimestamp();
      if(giveawayMessage && result?.active) {

          let giveawayObj = result?.enteries 
          let giveawayResult: string = ""
          giveawayObj?.forEach((entry) => {
            let user = this.client.getUser(entry)
            if(entry) giveawayResult = giveawayResult += `${user?.user.tag}: \`${user?.user.id}\`\n`
          })  

          if(result != undefined) this.client.polldb.updatePoll(parseInt(args[0]), "pollID", "active", false)  

          this.client.giveawaydb.updateGiveaway(
            result?.giveawayID,
            "giveawayID",
            "winner",
            winner,
          );


          const giveaway2Row = new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId("giveaway_enter")
              .setLabel("Finished")
              .setEmoji("🎉")
              .setStyle("PRIMARY")
              .setDisabled(true)
          );

          await giveawayMessage.edit({
            embeds: [giveaway2Embed],
            components: [giveaway2Row],
          });

          return this.messages.success(
            "Giveaway Ended",
            `Giveaway with the id \`#${args[0]}\` has been ended`,
            message
          );

      } else {
        return this.messages.error(
          "Giveaway Error",
          `Giveaway not found or not active`,
          message
        );
      }

    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Giveaway Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
