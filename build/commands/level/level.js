"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
const string_progressbar_1 = __importDefault(require("string-progressbar"));
class EmbedCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "level",
            description: "Check someone's level",
            arguments: "<user>",
            example: "/level bacio001",
            category: "level",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 0, max: 1 },
                userPermissions: ["SEND_MESSAGES"],
                clientPermissions: ["SEND_MESSAGES"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        var _a, _b, _c, _d, _e;
        try {
            let user = ((_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first()) || this.client.getUser(args[0] || ((_b = message.member) === null || _b === void 0 ? void 0 : _b.user.id));
            if (user) {
                let result = this.userdb.getUser(user === null || user === void 0 ? void 0 : user.id, "discordID");
                if (result && result.xp) {
                    let xp = result.xp;
                    let closest;
                    this.client.config.level_system.xp_for_level.forEach((configXP) => {
                        let nextLevel = this.client.config.level_system.xp_for_level.indexOf(configXP);
                        nextLevel = nextLevel + 1;
                        nextLevel = this.client.config.level_system.xp_for_level[nextLevel];
                        if (configXP < xp && xp < nextLevel) {
                            closest = this.client.config.level_system.xp_for_level.indexOf(configXP);
                        }
                    });
                    // let closest = this.client.config.level_system.xp_for_level.indexOf(this.client.config.level_system.xp_for_level.reduce(function(prev, curr) {
                    //     return (Math.abs(curr - xp) < Math.abs(prev - xp) ? curr : prev);
                    // }));
                    let level = closest + 1;
                    let lastLevelXp = this.client.config.level_system.xp_for_level[closest];
                    let nextLevelXp = this.client.config.level_system.xp_for_level[closest + 1];
                    let levelProcentage;
                    let bar;
                    let before = xp - lastLevelXp;
                    let after = nextLevelXp - lastLevelXp;
                    if (!nextLevelXp) {
                        nextLevelXp = "Max";
                        levelProcentage = "100%";
                        bar = string_progressbar_1.default.filledBar(100, 100);
                    }
                    else {
                        levelProcentage = (before * 100) / after;
                        bar = string_progressbar_1.default.filledBar(after, before);
                    }
                    let embed = new discord_js_1.MessageEmbed()
                        .setFooter(`Requested by ${(_c = message.author) === null || _c === void 0 ? void 0 : _c.tag}`, ((_d = message.author) === null || _d === void 0 ? void 0 : _d.displayAvatarURL({ dynamic: true })) || '')
                        .setColor(this.client.config.discord.embed.color)
                        .setAuthor(user.user.tag, ((_e = message.author) === null || _e === void 0 ? void 0 : _e.displayAvatarURL({ dynamic: true })) || '')
                        .setDescription(`<@${user.user.id}> **is level ${level}**\n\n${levelProcentage.toFixed(0) || levelProcentage}% completed - ${xp} xp / ${nextLevelXp} xp  \n ${bar[0]}`);
                    message.channel.send({ embeds: [embed] });
                }
                else {
                    return this.messages.error("Level Error", `${args[0]} doesn't exist please mention a user`, message);
                }
            }
            else {
                return this.messages.error("Level Error", `${args[0]} doesn't exist please mention a user`, message);
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Level Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = EmbedCommand;
