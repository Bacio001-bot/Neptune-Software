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
export default class GiveawayCreateCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "giveawaycreate",
      description: "Create a giveaway",
      arguments: "<channel>",
      example: "/giveawaycreate general",
      category: "giveaway",
      type: "discord",
      deleteMessage: true,
      cooldown: true,
      requirements: {
        args: { min: 0, max: 1 },
        userPermissions: ["ADMINISTRATOR"],
        clientPermissions: ["ADMINISTRATOR"],
        guildOnly: true,
      },
    });
  }

  async execute(message: Message, args: string[]): Promise<void> {
    try {
      let channel = this.client.getChannel(
        args[0] || (message.channel as TextChannel).name
      );

      const giveawayTitleEmbed: MessageEmbed = new MessageEmbed()
        .setColor(this.client.config.discord.embed.color)
        .setTitle(`Giveaway Title`)
        .setDescription(`What will the title be of your giveaway?`)
        .setFooter(`Please send your title in the chat the bot will read it`);

      const giveawayDescriptionEmbed: MessageEmbed = new MessageEmbed()
        .setColor(this.client.config.discord.embed.color)
        .setTitle(`Giveaway Description`)
        .setDescription(`What will the description be of your giveaway?`)
        .setFooter(
          `Please send your description in the chat the bot will read it`
        );

      const giveawayPriceEmbed: MessageEmbed = new MessageEmbed()
        .setColor(this.client.config.discord.embed.color)
        .setTitle(`Giveaway Price`)
        .setDescription(`What will the price be of your giveaway?`)
        .setFooter(`Please send your price in the chat the bot will read it`);

      const giveawayRequirementsEmbed: MessageEmbed = new MessageEmbed()
        .setColor(this.client.config.discord.embed.color)
        .setTitle(`Giveaway Requirements`)
        .setDescription(
          `What will the number of invites requirement be of your giveaway?`
        )
        .setFooter(
          `Please send your requirements in the chat the bot will read it`
        );

      const giveawayDurationsEmbed: MessageEmbed = new MessageEmbed()
        .setColor(this.client.config.discord.embed.color)
        .setTitle(`Giveaway Duration`)
        .setDescription(`How long will the giveaway be open for? \n format:\`1h\` OR \`1d\` OR \`1w\``)
        .setFooter(
          `Please send your duration in the chat the bot will read it`
        );

      const filter = (m) => m.author === message.author;
      let title: string = "";
      let description: string = "";
      let price: string = "";
      let requirement: number = 0;
      let duration: string = "";

      message.channel.send({ embeds: [giveawayTitleEmbed] });
      await message.channel
        .awaitMessages({
          filter,
          max: 1,
          time: 1800000,
        })
        .then(async (collected) => {
          let feedback = collected.first();
          if (feedback?.content) title = feedback?.content;
        })
        .catch(async (collected) => {
          return await message.reply({
            content: `❌ You took to long to respond giveaway creation aborted`,
          });
        });

      message.channel.send({ embeds: [giveawayDescriptionEmbed] });
      await message.channel
        .awaitMessages({
          filter,
          max: 1,
          time: 1800000,
        })
        .then(async (collected) => {
          let feedback = collected.first();
          if (feedback?.content) description = feedback?.content;
        })
        .catch(async (collected) => {
          return await message.reply({
            content: `❌ You took to long to respond giveaway creation aborted`,
          });
        });

      message.channel.send({ embeds: [giveawayPriceEmbed] });
      await message.channel
        .awaitMessages({
          filter,
          max: 1,
          time: 1800000,
        })
        .then(async (collected) => {
          let feedback = collected.first();
          if (feedback?.content) price = feedback?.content;
        })
        .catch(async (collected) => {
          return await message.reply({
            content: `❌ You took to long to respond giveaway creation aborted`,
          });
        });

      message.channel.send({ embeds: [giveawayRequirementsEmbed] });
      await message.channel
        .awaitMessages({
          filter,
          max: 1,
          time: 1800000,
        })
        .then(async (collected) => {
          let feedback = collected.first();
          if (feedback?.content){ 
            requirement = parseInt(feedback?.content);
            if(isNaN(requirement)) return await message.reply({
              content: `❌ You didn't supply a valid amount of invites`,
            });
          }
        })
        .catch(async (collected) => {
          return await message.reply({
            content: `❌ You took to long to respond giveaway creation aborted`,
          });
        });

      message.channel.send({ embeds: [giveawayDurationsEmbed] });
      await message.channel
        .awaitMessages({
          filter,
          max: 1,
          time: 1800000,
        })
        .then(async (collected) => {
          let feedback = collected.first();
          if (feedback?.content) duration = feedback?.content;
        })
        .catch(async (collected) => {
          return await message.reply({
            content: `❌ You took to long to respond giveaway creation aborted`,
          });
        });

      let giveawayId = Math.floor(100000 + Math.random() * 900000);
      let msDurration = ms(duration);
      let startdate = new Date();
      let enddate = new Date(startdate.getTime() + msDurration);

      let giveawayEmbed = new MessageEmbed()
        .setTitle(title)
        .setDescription(
          `**${description}**\n\n**Price »** ${price} \n**Duration »** ${ms(
            msDurration,
            { long: true }
          )} \n**Started by »** ${message.author?.tag}`
        )
        .setColor(this.client.config.discord.embed.color)
        .setFooter(
          `Giveaway Id: ${giveawayId}`,
          `${message.author?.displayAvatarURL()}`
        )
        .setTimestamp();

      const giveawayRow = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("giveaway_enter")
          .setLabel("Join (0)")
          .setEmoji("🎉")
          .setStyle("PRIMARY")
      );

      const giveaway2Row = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("giveaway_enter")
          .setLabel("Finished")
          .setEmoji("🎉")
          .setStyle("PRIMARY")
          .setDisabled(true)
      );

      let giveawayMessage = await channel?.send({
        embeds: [giveawayEmbed],
        components: [giveawayRow],
      });

      setTimeout(async () => {
        let result = this.client.giveawaydb.getGiveaway(
          giveawayId,
          "giveawayID"
        );
        let entries = result?.enteries.length;
        let winner = "No winner";
        if (result?.enteries.length != 0) {
          let memberId = result?.enteries[Math.floor(Math.random() * result?.enteries.length)];
          let member = this.client.getUser(memberId);
          winner = `<@${member?.user.id}> (${member?.user.id})`;
        }

        let giveaway2Embed = new MessageEmbed()
          .setTitle(`Giveaway ended`)
          .setDescription(
            `**Title**\n${title}\n\n**Description**\n${description}\n\n**Winner »** ${winner}\n\n**Price »** ${price}\n\n**Entries »** ${entries}\n**Duration »** ${ms(
              msDurration,
              { long: true }
            )} \n**Started by »** ${message.author?.tag}`
          )
          .setColor(this.client.config.discord.embed.color)
          .setFooter(
            `Giveaway Id: ${giveawayId}`
          )
          .setTimestamp();

        this.client.giveawaydb.updateGiveaway(
          giveawayId,
          "giveawayID",
          "active",
          false
        );

        this.client.giveawaydb.updateGiveaway(
          giveawayId,
          "giveawayID",
          "winner",
          winner,
        );

        let giveawayMessage2 = await (channel as TextChannel).messages.fetch(result?.messageID as string)

        await giveawayMessage2
          ?.edit({
            embeds: [giveaway2Embed],
            components: [giveaway2Row],
          })
          .catch((err) => console.log(err));
      }, msDurration);

      this.messages.success(
        "Giveaway Created",
        `Your giveaway has been sent to <#${channel?.id}> and has the id \`#${giveawayId}\``,
        message
      );

      this.client.giveawaydb.addGiveaway(
        message.member as GuildMember,
        title,
        description,
        price,
        (channel as TextChannel).id,
        giveawayMessage?.id as string,
        startdate.toString(),
        enddate.toString(),
        msDurration,
        giveawayId,
        requirement
      ).catch((err) => console.log(err))

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
