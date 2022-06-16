"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Interaction_1 = __importDefault(require("../../../assets/classes/Interaction"));
class PollInteraction extends Interaction_1.default {
    constructor(client) {
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
    async execute(interaction, args) {
        var _a;
        try {
            await interaction.deferUpdate();
            let options;
            let id = interaction.values.toString();
            id = id.split('_');
            id = id[1];
            let lable = interaction.values.toString().replace(`_${id}`, '');
            interaction.message.components.forEach((int) => {
                let vote = int.components[0].options.filter((track) => track.label == lable);
                let votes = vote[0].description.replace('Votes: ', '');
                vote[0].description = `Votes: ${parseInt(votes) + 1}`;
                options = int.components[0].options;
            });
            let pollMenu = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageSelectMenu()
                .setCustomId("poll_vote")
                .setPlaceholder("Select a category")
                .addOptions(options));
            let result = this.client.polldb.getPoll(parseInt(id), "pollID");
            let pollVoteObj = result === null || result === void 0 ? void 0 : result.votes;
            let trackResult = pollVoteObj === null || pollVoteObj === void 0 ? void 0 : pollVoteObj.filter(track => (track.option == lable));
            if (trackResult && trackResult[0]) {
                let check = (_a = trackResult[0].voters) === null || _a === void 0 ? void 0 : _a.indexOf(interaction.member.user.id);
                if (check == -1) {
                    if (trackResult[0].voteCount != undefined)
                        trackResult[0].voteCount = trackResult[0].voteCount + 1;
                    if (trackResult[0].voters)
                        trackResult[0].voters.push(interaction.member.user.id);
                    await interaction.message.edit({
                        embeds: [interaction.message.embeds[0]],
                        components: [pollMenu],
                    });
                    if ((result === null || result === void 0 ? void 0 : result.votes) != undefined)
                        this.client.polldb.updatePoll(parseInt(id), "pollID", "votes", pollVoteObj);
                }
                else {
                    return;
                }
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Suggestion Error", `A error occured please contact the developer`, interaction.message);
        }
    }
}
exports.default = PollInteraction;
