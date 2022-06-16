import {
  Message,
  MessageSelectMenu,
  MessageActionRow,
  Interaction,
  MessageButton
} from "discord.js";
import CustomClient from "../../../assets/classes/Client";
import InteractionClass from "../../../assets/classes/Interaction";

export default class GiveawayInteraction extends InteractionClass {
  constructor(client: CustomClient) {
    super(client, {
      name: "giveaway_enter",
      description: "Enter a giveaway",
      type: "discord",
      category: "giveaway",
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

      let id = interaction.message.embeds[0].footer.text.replace(
        "Giveaway Id: ",
        ""
      );
      let result = this.client.giveawaydb.getGiveaway(
        parseInt(id),
        "giveawayID"
      );
      let invites = await interaction.guild?.invites.fetch();
      if (invites) {
        const userInvites = invites.filter(
          (o) => o.inviter?.id === interaction.user?.id
        );
        let inviteCounts = 0;
        userInvites.forEach((invite) => {
          if (invite.uses) inviteCounts = inviteCounts + invite.uses;
        });
        if (result?.requiredInvites && result?.requiredInvites > inviteCounts)
          return this.messages.private(
            "Giveaway Error",
            `You can't enter the giveaway \`${result.title}\` you need \`${result?.requiredInvites} +\` invites and currently have \`${inviteCounts}\``,
            interaction?.member
          );

        let giveawayObj = result?.enteries;
        if (giveawayObj) {
          let check = giveawayObj.indexOf(interaction.member.user.id);
          if (check == -1) {
            if (giveawayObj) giveawayObj.push(interaction.member.user.id);

            if (result?.enteries != undefined)
              this.client.giveawaydb.updateGiveaway(
                parseInt(id),
                "giveawayID",
                "entries",
                giveawayObj
              );

              let label: string = ""

              interaction.message.components.forEach((int) => {
                let interactionLabel = int.components[0].label
                let labelArg = interactionLabel.split('(')
                labelArg[1] = `(${result?.enteries.length})`
                label = labelArg.join('')
              })
    
              const giveawayRow = new MessageActionRow().addComponents(
                new MessageButton()
                  .setCustomId("giveaway_enter")
                  .setLabel(label)
                  .setEmoji("🎉")
                  .setStyle("PRIMARY")
              );
    
              await interaction.message.edit({
                embeds: [interaction.message.embeds[0]],
                components: [giveawayRow],
              });

              
            return this.messages.private(
              "Giveaway Entry",
              `You have successfully entered the giveaway`,
              interaction?.member
            );
          } else {
            return this.messages.private(
              "Giveaway Error",
              `You can't enter the giveaway \`${result?.title}\` you are only allowed to have 1 entry`,
              interaction?.member
            );
          }
        }
      }
    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Giveaway Error",
        `A error occured please contact the developer`,
        interaction.message
      );
    }
  }
}
