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
      name: "pollvoters",
      description: "Voters list of a poll",
      arguments: "<pollid>",
      example: "/pollvoters 123456?",
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
      let votes: string = ""
      let result = this.client.polldb.getPoll(parseInt(args[0]), "pollID");
      result?.votes.forEach((voter) => {
        votes = votes += `\n**${voter.option} (${voter.voteCount})**\n` 
        voter.voters?.forEach((voteMember) => {
          let member = this.client.getUser(voteMember)
          votes = votes +=  `<@${member?.id}> » ${member?.user.tag} \n`
        })
      })

      let pollVotersEmbed = new MessageEmbed()
      .setTitle(`Poll \`#${args[0]}\` Voters`)
      .setDescription(
        `${votes}`
      )
      .setColor(this.client.config.discord.embed.color)
      .setFooter(`Poll Id: ${args[0]}`)
      .setTimestamp()

      message.channel?.send({embeds: [pollVotersEmbed]})
      
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
