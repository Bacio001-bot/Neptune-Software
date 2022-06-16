"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Interaction_1 = __importDefault(require("../../../assets/classes/Interaction"));
class GiveawayInteraction extends Interaction_1.default {
    constructor(client) {
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
    async execute(interaction, args) {
        var _a;
        try {
            await interaction.deferUpdate();
            let id = interaction.message.embeds[0].footer.text.replace("Giveaway Id: ", "");
            let result = this.client.giveawaydb.getGiveaway(parseInt(id), "giveawayID");
            let invites = await ((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.invites.fetch());
            if (invites) {
                const userInvites = invites.filter((o) => { var _a, _b; return ((_a = o.inviter) === null || _a === void 0 ? void 0 : _a.id) === ((_b = interaction.user) === null || _b === void 0 ? void 0 : _b.id); });
                let inviteCounts = 0;
                userInvites.forEach((invite) => {
                    if (invite.uses)
                        inviteCounts = inviteCounts + invite.uses;
                });
                if ((result === null || result === void 0 ? void 0 : result.requiredInvites) && (result === null || result === void 0 ? void 0 : result.requiredInvites) > inviteCounts)
                    return this.messages.private("Giveaway Error", `You can't enter the giveaway \`${result.title}\` you need \`${result === null || result === void 0 ? void 0 : result.requiredInvites} +\` invites and currently have \`${inviteCounts}\``, interaction === null || interaction === void 0 ? void 0 : interaction.member);
                let giveawayObj = result === null || result === void 0 ? void 0 : result.enteries;
                if (giveawayObj) {
                    let check = giveawayObj.indexOf(interaction.member.user.id);
                    if (check == -1) {
                        if (giveawayObj)
                            giveawayObj.push(interaction.member.user.id);
                        if ((result === null || result === void 0 ? void 0 : result.enteries) != undefined)
                            this.client.giveawaydb.updateGiveaway(parseInt(id), "giveawayID", "entries", giveawayObj);
                        let label = "";
                        interaction.message.components.forEach((int) => {
                            let interactionLabel = int.components[0].label;
                            let labelArg = interactionLabel.split('(');
                            labelArg[1] = `(${result === null || result === void 0 ? void 0 : result.enteries.length})`;
                            label = labelArg.join('');
                        });
                        const giveawayRow = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                            .setCustomId("giveaway_enter")
                            .setLabel(label)
                            .setEmoji("🎉")
                            .setStyle("PRIMARY"));
                        await interaction.message.edit({
                            embeds: [interaction.message.embeds[0]],
                            components: [giveawayRow],
                        });
                        return this.messages.private("Giveaway Entry", `You have successfully entered the giveaway`, interaction === null || interaction === void 0 ? void 0 : interaction.member);
                    }
                    else {
                        return this.messages.private("Giveaway Error", `You can't enter the giveaway \`${result === null || result === void 0 ? void 0 : result.title}\` you are only allowed to have 1 entry`, interaction === null || interaction === void 0 ? void 0 : interaction.member);
                    }
                }
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Giveaway Error", `A error occured please contact the developer`, interaction.message);
        }
    }
}
exports.default = GiveawayInteraction;
