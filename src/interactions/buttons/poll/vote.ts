import { Message, MessageSelectMenu, MessageActionRow, Interaction } from "discord.js";
import CustomClient from "../../../assets/classes/Client";
import InteractionClass from "../../../assets/classes/Interaction";

export default class PollInteraction extends InteractionClass {
  constructor(client: CustomClient) {
    super(client, {
      name: "poll_vote",
      description: "Vote on a poll",
      type: "discord",
      category: "poll",
      requirements: {
        userPermissions: ["VIEW_CHANNEL"],
        clientPermissions: ["VIEW_CHANNEL"],
        guildOnly: true,
      },
    });
  }

  async execute(interaction: any, args: string[]): Promise<void> {
    try {

     await interaction.deferUpdate()

      let options 
      let id = interaction.values.toString()
      id = id.split('_')
      id = id[1]
      let lable = interaction.values.toString().replace(`_${id}`, '')

      interaction.message.components.forEach((int) => {
        let vote = int.components[0].options.filter((track) => track.label == lable)
        let votes = vote[0].description.replace('Votes: ','')
        vote[0].description = `Votes: ${parseInt(votes) + 1}`

        options = int.components[0].options
      })

      let pollMenu = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("poll_vote")
          .setPlaceholder("Select a category")
          .addOptions(options)
      );

      let result = this.client.polldb.getPoll(parseInt(id), "pollID");
      let pollVoteObj = result?.votes
      let trackResult = pollVoteObj?.filter(track => (track.option == lable))
      if(trackResult && trackResult[0]) {
        let check = trackResult[0].voters?.indexOf(interaction.member.user.id)
        if(check == -1) {
          if(trackResult[0].voteCount != undefined)trackResult[0].voteCount = trackResult[0].voteCount + 1
          if(trackResult[0].voters)trackResult[0].voters.push(interaction.member.user.id)

          await interaction.message.edit({
            embeds: [interaction.message.embeds[0]],
            components: [pollMenu],
          });

          if(result?.votes != undefined) this.client.polldb.updatePoll(parseInt(id), "pollID", "votes", pollVoteObj)  

        } else {
          return; 
        }
    }
      
    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Suggestion Error",
        `A error occured please contact the developer`,
        interaction.message
      );
    }
  }
}
