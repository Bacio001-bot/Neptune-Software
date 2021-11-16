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
export default class PollCreateCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "pollend",
      description: "End a poll",
      arguments: "<pollid>",
      example: "/pollend 123456?",
      category: "poll",
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

      let result = this.client.polldb.getPoll(parseInt(args[0]), "pollID");
      let channel = message.guild?.channels.cache.find(c => c.id == result?.channelID);
      let pollMessage = (channel as TextChannel).messages.cache.find(m => m.id == result?.messageID)
      let pollStarter = message.guild?.members.cache.find(m => m.id == result?.discordID)

      if(pollMessage && result?.active) {

          let pollVoteObj = result?.votes 
          let pollResult: string = ""
          pollVoteObj?.sort((a,b) => ((a.voteCount as number) < (b.voteCount as number)) ? 1 : (((b.voteCount as number) < (a.voteCount as number)) ? -1 : 0))

          pollVoteObj?.forEach((vote) => {
            if(vote.option && vote) pollResult = pollResult += `${vote.option}: \`${vote.voteCount}\`\n`
          })

          let startdate = new Date(result?.startDate as string)
          let currentdate = new Date()
          let enddate = currentdate.getTime() - startdate.getTime()

          let pollEmbed = new MessageEmbed()
          .setTitle(`Poll ended`)
          .setDescription(
            `**Title**\n${result?.title}\n\n**Description**\n${result?.description}\n\n**Votes**\n ${pollResult}\n**Duration »** ${ms(enddate,{long: true})} \n**Started by »** ${pollStarter?.user?.tag}`
          )
          .setColor(this.client.config.discord.embed.color)
          .setFooter(`Poll Id: ${args[0]}`, `${pollStarter?.user?.displayAvatarURL()}`)
          .setTimestamp()

          let pollMenu2 = new MessageActionRow().addComponents(
            new MessageSelectMenu()
              .setCustomId("poll_vote")
              .setPlaceholder("Select a category")
              .setDisabled(true)
              .setOptions({
                label: `blank`,
                value: `blank`,
                description: 'Votes: 0'
              })
          );

          if(result?.votes != undefined) this.client.polldb.updatePoll(parseInt(args[0]), "pollID", "active", false)  

          await pollMessage.edit({
            embeds: [pollEmbed],
            components: [pollMenu2],
          });

          return this.messages.success(
            "Poll Ended",
            `poll with the id \`#${args[0]}\` has been ended`,
            message
          );

      } else {
        return this.messages.error(
          "Poll Error",
          `Poll not found or not active`,
          message
        );
      }

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
