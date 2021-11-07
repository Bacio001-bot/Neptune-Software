import { Message, MessageEmbed, MessageActionRow, MessageEmbedAuthor , MessageButton } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";
import ms from "ms"

export default class AvatarCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "invitetop",
      description: "Get invite top",
      arguments: "",
      example: "/invitetop",
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

      const invites = await message.guild?.invites.fetch();
      let members = 0
      let arr:any = []
      message.guild?.members.cache.forEach((member) => {
        members = members + 1
        const userInvites = invites?.filter(o => o.inviter?.id === member?.id);    
        let inviteCount = 0
        userInvites?.forEach(invite => {
          if (invite.uses) inviteCount = inviteCount + invite.uses
        }); 

        let addToArray = {
          "name": member.user.tag,
          "invite": inviteCount
        }

        arr.push(addToArray as any)

        arr.sort((a,b) => (a.invite < b.invite) ? 1 : ((b.invite < a.invite) ? -1 : 0))

      })
      let inviteCount2

      invites?.forEach(invite => {
        if (invite.uses) inviteCount2 = inviteCount2 + invite.uses
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
              usersEmbed.author = `Invite leaderboard - Page: ${currentPage}/${maxPage}` as MessageEmbedAuthor , message.guild?.iconURL() || ''
              usersEmbed.description = getDescription(currentPage)
              await msg.edit({
                  embeds: [usersEmbed],
                  components: [getButtons(currentPage)],
              });
          } else {
              currentPage += 1;
              usersEmbed.author = `Invite leaderboard - Page: ${currentPage}/${maxPage}` as MessageEmbedAuthor , message.guild?.iconURL() || ''
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
              description += `**${i + 1}. ${arr[i].name}** » ${arr[i].invite}\n`
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
        "Avatar Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
