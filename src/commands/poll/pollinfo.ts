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
import { duration } from "moment";
  export default class PollCreateCommand extends Command {
    constructor(client: CustomClient) {
      super(client, {
        name: "pollinfo",
        description: "Get info of a poll",
        arguments: "<pollid>",
        example: "/pollinfo 123456?",
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
  
            let pollVoteObj = result?.votes 
            let pollResult: string = ""
            pollVoteObj?.sort((a,b) => ((a.voteCount as number) < (b.voteCount as number)) ? 1 : (((b.voteCount as number) < (a.voteCount as number)) ? -1 : 0))
  
            pollVoteObj?.forEach((vote) => {
              if(vote.option && vote) pollResult = pollResult += `${vote.option}: \`${vote.voteCount}\`\n`
            })
  
            let startdate = new Date(result?.startDate as string)
            let enddate = new Date(result?.endDate as string)
            let status = result?.active ? "Active" : "Deactive"
            let pollInfoEmbed = new MessageEmbed()

            .setTitle(`Poll \`#${args[0]}\` Info`)
            .setDescription(
                `**Title**\n${result?.title}\n\n**Description**\n${result?.description}\n\n**Votes**\n ${pollResult}\n**startDate »** ${startdate}\n**endDate »** ${enddate}\n**Duration »** ${ms(result?.durationMs as number, {long: true})}\n**Started by »** ${pollStarter?.user?.tag}\n**Status »** ${status}`
              )
            .setColor(this.client.config.discord.embed.color)
            .setFooter(`Poll Id: ${args[0]}`)
            .setTimestamp()
    
            message.channel?.send({embeds: [pollInfoEmbed]})

        
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
  