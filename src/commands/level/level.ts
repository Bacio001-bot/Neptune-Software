import { Message, MessageEmbed } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";
import progressbar from 'string-progressbar'
import chalk from "chalk";
export default class EmbedCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "level",
      description: "Check someone's level",
      arguments: "<user>",
      example: "/level bacio001",
      category: "level",
      type: "discord",
      deleteMessage: true,
      cooldown: true,
      requirements: {
        args: { min: 0, max: 1 },
        userPermissions: ["SEND_MESSAGES"],
        clientPermissions: ["SEND_MESSAGES"],
        guildOnly: true,
      },
    });
  }

  async execute(message: Message, args: string[]): Promise<void> {
    try {
        let user =
        message.mentions.members?.first() || this.client.getUser(args[0] || message.member?.user.id);

        if(user) {
            let result = this.userdb.getUser(user?.id, "discordID");
            if(result && result.xp) { 

                let xp = result.xp
                let closest
                this.client.config.level_system.xp_for_level.forEach((configXP) => {
                  let nextLevel = this.client.config.level_system.xp_for_level.indexOf(configXP)
                  nextLevel = nextLevel + 1
                  nextLevel = this.client.config.level_system.xp_for_level[nextLevel]
                  if(configXP < xp && xp < nextLevel) {
                    closest = this.client.config.level_system.xp_for_level.indexOf(configXP)
                  }
                })

                // let closest = this.client.config.level_system.xp_for_level.indexOf(this.client.config.level_system.xp_for_level.reduce(function(prev, curr) {
                //     return (Math.abs(curr - xp) < Math.abs(prev - xp) ? curr : prev);
                // }));

                let level = closest + 1
                let lastLevelXp = this.client.config.level_system.xp_for_level[closest]
                let nextLevelXp = this.client.config.level_system.xp_for_level[closest + 1]
                let levelProcentage
                let bar

                let before = xp - lastLevelXp
                let after = nextLevelXp - lastLevelXp

                if(!nextLevelXp) {
                    nextLevelXp = "Max"
                    levelProcentage = "100%"
                    bar = progressbar.filledBar(100, 100);
                } else {

                    levelProcentage = (before * 100) / after;
                    bar = progressbar.filledBar(after, before);

                }
                let embed = new MessageEmbed()
                    .setFooter(
                    `Requested by ${message.author?.tag}`,
                    message.author?.displayAvatarURL({ dynamic: true }) || '')
                    .setColor(this.client.config.discord.embed.color)
                    .setAuthor(user.user.tag,  message.author?.displayAvatarURL({ dynamic: true }) || '') 
                    .setDescription(`<@${user.user.id}> **is level ${level}**\n\n${levelProcentage.toFixed(0) || levelProcentage}% completed - ${xp} xp / ${nextLevelXp} xp  \n ${bar[0]}`)
                message.channel.send({embeds: [embed]})
                
            } else {
                return this.messages.error(
                "Level Error",
                `${args[0]} doesn't exist please mention a user`,
                message
                );
            }

        } else {
        return this.messages.error(
          "Level Error",
          `${args[0]} doesn't exist please mention a user`,
          message
        );
      }
    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Level Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
