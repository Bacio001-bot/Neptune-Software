import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { GuildMember, MessageEmbed } from "discord.js";
import ms from "ms";

export default class GuildMemberAddEvent extends Event {
  constructor(client: CustomClient) {
    super(client, "on", "guildMemberAdd");
  }

  async execute(member: GuildMember): Promise<void> {

    if(this.client.config.logging.join.enabled) {
      let channel = this.client.getChannel(this.client.config.logging.join.channel)
      if(channel){          
          this.client.messages.joinEvent(`**<@${member.user.id}> has joined the server**`,
          member.user,
          channel)
      }
  } 

    if (this.client.config.member_join.age.enabled) {
      try {
        if (
          Date.now() - (member.user.createdAt as any) <
          parseInt(ms(this.client.config.member_join.age.required_days))
        ) {
          await this.messages.private(
            "Age Requirement System",
            `You have been kicked out of \`${
              member.guild.name
            }\` because your account is not older then \`${ms(
              parseInt(ms(this.client.config.member_join.age.required_days)),
              { long: true }
            )}\``,
            member
          );

          await member.kick();
        }
      } catch (err) {
        console.log(err);
      }
    }

    if(this.client.config.member_join.welcome.enabled) {
        let channel = this.client.getChannel(this.client.config.member_join.welcome.channel)
        if(!channel) return;
        let message = this.client.config.member_join.welcome.text
        message = this.placeholder.replaceWelcomeMessage(message, member)
        let footer = this.client.config.member_join.welcome.memberCount ? `Member count: ${member.guild.memberCount.toString()}` : ''

        const embed = new MessageEmbed()
        .setAuthor(`| Welcome ${member.user.username}`, member.guild.iconURL() || '')
        .setDescription(message)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setColor(this.client.config.discord.embed.color)
        .setTimestamp()
        .setFooter(footer)

      channel.send({embeds:[embed]})

      if(this.client.config.member_join.welcome.mentionUser) channel.send(`<@${member.user.id}>`)

    }

    let code = Math.floor(100000 + Math.random() * 900000).toString();
    this.userdb.addUser(member, code);

    this.messages.private(
      "Verification System",
      `To verify send \`${this.client.config.discord.bot.prefix}verify ${code}\` in \`${member.guild.name}\``,
      member
    );
  }
}
