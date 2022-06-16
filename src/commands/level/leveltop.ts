import { Message, MessageEmbed, MessageActionRow, MessageEmbedAuthor , MessageButton } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";
import ms from "ms"

export default class AvatarCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "leveltop",
      description: "Get level leaderboard",
      arguments: "",
      example: "/leveltop",
      category: "level",
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

      const users = await this.client.userdb.listUsers()
      let members = 0
      let arr:any = []
      message.guild?.members.cache.forEach((member) => {
        members = members + 1
        const userusers = users?.filter(o => o.discordID === member?.id);    
        let xpCount = 0
        let level = 0

        userusers?.forEach(user => {
            if(user.xp) {
                xpCount = xpCount + user.xp
                let xp = xpCount
                let closest
                this.client.config.level_system.xp_for_level.forEach((configXP) => {
                  let nextLevel = this.client.config.level_system.xp_for_level.indexOf(configXP)
                  nextLevel = nextLevel + 1
                  nextLevel = this.client.config.level_system.xp_for_level[nextLevel]
                  if(configXP < xp && xp < nextLevel) {
                    closest = this.client.config.level_system.xp_for_level.indexOf(configXP)
                  }
                })
                level = closest + 1
            }
        }); 



        let addToArray = {
          "name": member.user.tag,
          "xp": xpCount,
          "level": level
        }

        arr.push(addToArray as any)

        arr.sort((a,b) => (a.xp < b.xp) ? 1 : ((b.xp < a.xp) ? -1 : 0))

      })
      let xpCount2

      users?.forEach(user => {
        if (user.xp) xpCount2 = xpCount2 + user.xp
      });

      let currentPage: number = 1;
      let minPage: number = 1;
      let maxPage: number = Math.ceil(members / 20);

      const usersEmbed: MessageEmbed = new MessageEmbed()
          .setColor(this.client.config.discord.embed.color)
          .setAuthor(`Invite leaderboard - Page: ${currentPage}/${maxPage}`, message.guild?.iconURL() || '')
          .setDescription(getDescription(currentPage))
          .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true}))

      const msg = await message.channel.send({ embeds: [usersEmbed], components: [getButtons(currentPage)]})

      const filter = (button) => button.user.id === message.author.id;
      const collector = msg.createMessageComponentCollector({
        filter,
        time: 1800000,
        componentType: "BUTTON",
      });

      collector.on("collect", async (i) => {
          i.deferUpdate()
          if(i.customId === "back") {
              currentPage -= 1;
              usersEmbed.author = `Invite leaderboard - Page: ${currentPage}/${maxPage}` as any , message.guild?.iconURL() || ''
              usersEmbed.description = getDescription(currentPage)
              await msg.edit({
                  embeds: [usersEmbed],
                  components: [getButtons(currentPage)],
              });
          } else {
              currentPage += 1;
              usersEmbed.author = `Xp leaderboard - Page: ${currentPage}/${maxPage}` as any , message.guild?.iconURL() || ''
              usersEmbed.description = getDescription(currentPage)
              await msg.edit({
                  embeds: [usersEmbed],
                  components: [getButtons(currentPage)],
              });
          }
      })

      function getDescription(currentPage): string {
          let description: string = "";
          for (let i = ((currentPage * 20) - 20); i < (currentPage * 20); i++) {
              if(!arr[i]) return description;
              description += `**${i + 1}. ${arr[i].name}** » level ${arr[i].level} - ${arr[i].xp} xp\n`
          }
          return description;
      }

      function getButtons(currentPage) {
          const actionRow = new MessageActionRow()
          .addComponents(
              new MessageButton()
              .setEmoji("◀️")
              .setStyle("PRIMARY")
              .setCustomId("back")
              .setDisabled((currentPage === minPage) ? true : false),
            new MessageButton()
              .setEmoji("▶️")
              .setStyle("PRIMARY")
              .setCustomId("forward")
              .setDisabled((currentPage === maxPage) ? true : false),
          )
          return actionRow;
      }
 
    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Xp Leaderboard Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
