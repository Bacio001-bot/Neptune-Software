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
  export default class GiveawayCreateCommand extends Command {
    constructor(client: CustomClient) {
      super(client, {
        name: "giveawayinfo",
        description: "Get info of a giveaway",
        arguments: "<giveawayid>",
        example: "/giveawayinfo 123456?",
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
        let channel = message.guild?.channels.cache.find(c => c.id == result?.channelID);
        let giveawayMessage = (channel as TextChannel).messages.cache.find(m => m.id == result?.messageID)
        let giveawayStarter = message.guild?.members.cache.find(m => m.id == result?.discordID)
  
            let giveawayVoteObj = result?.enteries 
            let giveawayResult: string = ""
  
            giveawayVoteObj?.forEach((vote) => {
              let user = this.client.getUser(vote)
              if(vote) giveawayResult = giveawayResult += `<@${user?.user.id}> (${user?.user.id})\n`
            })

            let winner = "No winner";
            if (result?.enteries.length != 0 && result?.winner) {
              winner = result?.winner
            }
  
            let startdate = new Date(result?.startDate as string)
            let enddate = new Date(result?.endDate as string)
            let status = result?.active ? "Active" : "Deactive"
            let user = this.client.getUser(result?.discordID)
            let giveawayInfoEmbed = new MessageEmbed()
            .setTitle(`Giveaway \`#${args[0]}\` Info`)
            .setDescription(
              `**Title**\n${result?.title}\n\n**Description**\n${result?.description}\n\n**Winner »** ${winner}\n\n**startDate »** ${startdate}\n**endDate »** ${enddate}\n**Price »** ${result?.price}\n**Invites Required »** ${result?.requiredInvites}\n**Entries »** ${result?.enteries.length}\n**Duration »** ${ms(
                result?.durationMs as number,
                { long: true }
              )} \n**Started by »** ${user?.user.tag}\n**Status »** ${status}`              )
            .setColor(this.client.config.discord.embed.color)
            .setFooter(`Poll Id: ${args[0]}`)
            .setTimestamp()
    
            message.channel?.send({embeds: [giveawayInfoEmbed]})

        
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
  