import { Message, MessageEmbed } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";
import ms from "ms"

export default class AvatarCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "invite",
      description: "Get info about a invite code",
      arguments: "<code>",
      example: "/invites uQUNuuNz",
      category: "info",
      type: "discord",
      deleteMessage: true,
      cooldown: true,
      requirements: {
        args: { min: 1, max: 1 },
        userPermissions: ["SEND_MESSAGES"],
        clientPermissions: ["SEND_MESSAGES"],
        guildOnly: true,
      },
    });
  }

  async execute(message: Message, args: string[]): Promise<void> {
    try {
        let invites = await message.guild?.invites.fetch();
        if (invites) {
            const invite = invites.filter(o => o.code === args[0]);    
            if(invite) {
                invite.forEach((i) => {
                    const embed = new MessageEmbed()
                    .setAuthor(`Invite ${args[0]}`, message.guild?.iconURL({ dynamic: true }) || '')
                    .setDescription(`**Invite creator: **${i.inviter?.tag}\n**Invite uses: **${i.uses}\n**Invite max uses: **${i.maxUses}\n**Invite temporary: **${i.temporary}\n **Invite age: **${ms(Date.now() - (i.createdTimestamp as any) as number, {long: true})}`)
                    .setColor(this.client.config.discord.embed.color)
                    .setThumbnail(`https://cdn.invite-tracker.com/logo.png`)
                    .setFooter(
                        `Requested By: ${message.author.tag}`,
                        message.author.displayAvatarURL({ dynamic: true })
                    );
                message.channel.send({embeds: [embed]})
                })
            } else {
                return this.messages.error(
                    "Invite Error",
                    `No invite found with that code`,
                    message
                  );
            }
        } else {
            return this.messages.error(
                "Invite Error",
                `This guild doesn't have any invites`,
                message
              );
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
