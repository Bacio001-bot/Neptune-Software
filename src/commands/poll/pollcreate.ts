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
      name: "pollcreate",
      description: "Create a poll",
      arguments: "<channel>",
      example: "/pollcreate Would you like to see more giveaways?",
      category: "poll",
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

      const pollTitleEmbed: MessageEmbed = new MessageEmbed()
        .setColor(this.client.config.discord.embed.color)
        .setTitle(`Poll Title`)
        .setDescription(`What will the title be of your poll?`)
        .setFooter(
          `Please send your options in the chat the bot will read them`
        );

      const pollDescriptionEmbed: MessageEmbed = new MessageEmbed()
        .setColor(this.client.config.discord.embed.color)
        .setTitle(`Poll Description`)
        .setDescription(`What will the description be of your poll?`)
        .setFooter(
          `Please send your options in the chat the bot will read them`
        );

      const pollDurationEmbed: MessageEmbed = new MessageEmbed()
        .setColor(this.client.config.discord.embed.color)
        .setTitle(`Poll Duration`)
        .setDescription(`How long will the poll be open for? \n format:\`1h\` OR \`1d\` OR \`1w\``)
        .setFooter(
          `Please send your options in the chat the bot will read them`
        );
      const pollOptionsEmbed: MessageEmbed = new MessageEmbed()
        .setColor(this.client.config.discord.embed.color)
        .setTitle(`Poll Options`)
        .setDescription(
          `Which options can the user choose of (Max: 10)? \n format: \`option 1 - option 2 - option 3 - option 4\``
        )
        .setFooter(
          `Please send your options in the chat the bot will read them`
        );

      let title: string = ""
      let description: string = ""
      let durration: string = ""
      let options: string = ""
      let menuCategories: any[] = [];
      let pollEmojis: any[] = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

      const filter = (m) => m.author === message.author;
      message.channel.send({ embeds: [pollTitleEmbed] });
      await message.channel
        .awaitMessages({
          filter,
          max: 1,
          time: 1800000,
        })
        .then(async (collected) => {
          let feedback = collected.first();
          if (feedback?.content) title = feedback?.content
        })
        .catch(async (collected) => {
          return await message.reply({
            content: `❌ You took to long to respond poll creation aborted`,
          });
        });

      message.channel.send({ embeds: [pollDescriptionEmbed] });
      await message.channel
        .awaitMessages({
          filter,
          max: 1,
          time: 1800000,
        })
        .then(async (collected) => {
          let feedback = collected.first();
          if (feedback?.content) description = feedback?.content
        })
        .catch(async (collected) => {
          return await message.reply({
            content: `❌ You took to long to respond poll creation aborted`,
          });
        });

        message.channel.send({ embeds: [pollDurationEmbed] });
        await message.channel
          .awaitMessages({
            filter,
            max: 1,
            time: 1800000,
          })
          .then(async (collected) => {
            let feedback = collected.first();
            if (feedback?.content) durration = feedback?.content
          })
          .catch(async (collected) => {
            return await message.reply({
              content: `❌ You took to long to respond poll creation aborted`,
            });
          });

      message.channel.send({ embeds: [pollOptionsEmbed] });
      await message.channel
        .awaitMessages({
          filter,
          max: 1,
          time: 1800000,
        })
        .then(async (collected) => {
          let feedback = collected.first();
          if (feedback?.content) options = feedback?.content
        })
        .catch(async (collected) => {
          return await message.reply({
            content: `❌ You took to long to respond poll creation aborted`,
          });
        });

        let pollId = Math.floor(100000 + Math.random() * 900000)
        let msDurration = ms(durration)
        let startdate = new Date()
        let enddate = new Date(startdate.getTime() +msDurration)

        let optionsArray = options.split(" - ")
        let optionDisplay:string = ""
        let count = 0 
        let pollVoteObj: any[] = []
        optionsArray.forEach((option) => {

          pollVoteObj?.push({ "option": option, "voteCount": 0, voters: [] })
          
          menuCategories.push({
            menuCategories: `poll_vote`,
            label: option,
            emoji: pollEmojis[count],
            value: `${option}_${pollId}`,
            description: 'Votes: 0'
          });

          count = count + 1
          optionDisplay = optionDisplay += `${option}: \`0\``
        })

        let pollMenu = new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId("poll_vote")
            .setPlaceholder("Select a category")
            .addOptions(menuCategories)
        );

        let pollMenu2 = new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId("poll_vote")
            .setPlaceholder("Select a category")
            .setDisabled(true)
            .addOptions(menuCategories)
        );

        let pollEmbed = new MessageEmbed()
          .setTitle(title)
          .setDescription(
            `**${description}**\n\n**Duration »** ${ms(msDurration,{long: true})} \n**Started by »** ${message.author?.tag}`
          )
          .setColor(this.client.config.discord.embed.color)
          .setFooter(`Poll Id: ${pollId}`, `${message.author?.displayAvatarURL()}`)
          .setTimestamp()

          let pollMessage = await channel?.send({
          embeds: [pollEmbed],
          components: [pollMenu],
        });

        setTimeout( async() => {

          let result = this.client.polldb.getPoll(pollId, "pollID");
          let pollVoteObj = result?.votes 
          let pollResult: string = ""
          pollVoteObj?.sort((a,b) => ((a.voteCount as number) < (b.voteCount as number)) ? 1 : (((b.voteCount as number) < (a.voteCount as number)) ? -1 : 0))

          pollVoteObj?.forEach((vote) => {
            if(vote.option && vote) pollResult = pollResult += `${vote.option}: \`${vote.voteCount}\`\n`
          })

          let poll2Embed = new MessageEmbed()
          .setTitle(`Poll ended`)
          .setDescription(
            `**Title**\n${title}\n\n**Description**\n${description}\n\n**Votes**\n ${pollResult}\n**Duration »** ${ms(msDurration,{long: true})} \n**Started by »** ${message.author?.tag}`
          )
          .setColor(this.client.config.discord.embed.color)
          .setFooter(`Poll Id: ${pollId}`, `${message.author?.displayAvatarURL()}`)
          .setTimestamp()

          return this.messages.success(
            "Poll Created",
            `Your poll has been send to <#${channel?.id}> and has the id \`#${pollId}\``,
            message
          );

          if(result?.votes != undefined) this.client.polldb.updatePoll(pollId, "pollID", "active", false)  

          await pollMessage?.edit({
            embeds: [poll2Embed],
            components: [pollMenu2],
          }).catch((err) => console.log(err))
        }, msDurration)

        this.client.polldb.addPoll((message.member as GuildMember), title, description, options, (channel as TextChannel).id, (pollMessage?.id as string), startdate.toString(), enddate.toString(), msDurration, pollId, pollVoteObj)
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
