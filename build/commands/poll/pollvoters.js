"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class PollCreateCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "pollvoters",
            description: "Voters list of a poll",
            arguments: "<pollid>",
            example: "/pollvoters 123456?",
            category: "poll",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 1, max: 1 },
                userPermissions: ["ADMINISTRATOR"],
                clientPermissions: ["ADMINISTRATOR"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        var _a;
        try {
            let votes = "";
            let result = this.client.polldb.getPoll(parseInt(args[0]), "pollID");
            result === null || result === void 0 ? void 0 : result.votes.forEach((voter) => {
                var _a;
                votes = votes += `\n**${voter.option} (${voter.voteCount})**\n`;
                (_a = voter.voters) === null || _a === void 0 ? void 0 : _a.forEach((voteMember) => {
                    let member = this.client.getUser(voteMember);
                    votes = votes += `<@${member === null || member === void 0 ? void 0 : member.id}> » ${member === null || member === void 0 ? void 0 : member.user.tag} \n`;
                });
            });
            let pollVotersEmbed = new discord_js_1.MessageEmbed()
                .setTitle(`Poll \`#${args[0]}\` Voters`)
                .setDescription(`${votes}`)
                .setColor(this.client.config.discord.embed.color)
                .setFooter(`Poll Id: ${args[0]}`)
                .setTimestamp();
            (_a = message.channel) === null || _a === void 0 ? void 0 : _a.send({ embeds: [pollVotersEmbed] });
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Poll Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = PollCreateCommand;
