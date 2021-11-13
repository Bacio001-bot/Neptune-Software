"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
const moment_1 = __importDefault(require("moment"));
class ServerInfoCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "serverinfo",
            description: "Get info from a server",
            arguments: "",
            example: "/serverinfo",
            category: "info",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 0, max: 0 },
                userPermissions: [],
                clientPermissions: [],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        var _a;
        try {
            const region = {
                "brazil": "Brazil :flag_br:",
                "europe": "Europe :flag_eu:",
                "india": "India :flag_in:",
                "japan": "Japan :flag_jp:",
                "singapore": "Singapore :flag_sg:",
                "us-central": "US-Central :flag_us:",
                "us-east": "US-East :flag_us:",
                "us-south": "US-South :flag_us:",
                "us-west": "US-West :flag_us:",
                "sydney": "Sydney :flag_au:",
                "hongkong": "Hong Kong :flag_hk:",
                "russia": "Russia :flag_ru:",
                "southafrica": "South Africa :flag_za:"
            };
            const titleCase = str => {
                return str.toLowerCase().replace(/_/g, " ").split(" ")
                    .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
                    .join(" ");
            };
            (_a = message.guild) === null || _a === void 0 ? void 0 : _a.fetchOwner().then(ow => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
                let members = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.members.cache.filter(member => !member.user.bot).size;
                //let onlineMembers = message.guild.members.cache.filter(member => !member.user.bot).size;
                let bots = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.members.cache.filter(member => member.user.bot).size;
                //let onlineBots = message.guild.members.cache.filter(member => member.user.bot).size;
                let textChannels = (_c = message.guild) === null || _c === void 0 ? void 0 : _c.channels.cache.filter((c) => c.type === "GUILD_TEXT").size;
                let voiceChannels = (_d = message.guild) === null || _d === void 0 ? void 0 : _d.channels.cache.filter((c) => c.type === "GUILD_VOICE").size;
                let categories = (_e = message.guild) === null || _e === void 0 ? void 0 : _e.channels.cache.filter((c) => c.type == "GUILD_CATEGORY").size;
                let roleCount = ((_f = message.guild) === null || _f === void 0 ? void 0 : _f.roles.cache.size) ? ((_g = message.guild) === null || _g === void 0 ? void 0 : _g.roles.cache.size) - 1 : 'Not Found';
                let icon = (_h = message.guild) === null || _h === void 0 ? void 0 : _h.iconURL({ dynamic: true, size: 512 });
                let serverEmbed = new discord_js_1.MessageEmbed();
                if (icon) {
                    serverEmbed.setAuthor(`${(_j = message.guild) === null || _j === void 0 ? void 0 : _j.name}'s Info`, icon);
                    serverEmbed.setThumbnail(icon);
                }
                else {
                    serverEmbed.setTitle(`${(_k = message.guild) === null || _k === void 0 ? void 0 : _k.name}'s Info`);
                }
                serverEmbed.setColor(this.client.config.discord.embed.color);
                serverEmbed.setDescription(`${(_l = message.guild) === null || _l === void 0 ? void 0 : _l.name} was created on ${(0, moment_1.default)((_m = message.guild) === null || _m === void 0 ? void 0 : _m.createdAt).format("MMM DD YYYY")}`);
                serverEmbed.setFooter(this.client.config.discord.embed.footer);
                serverEmbed.addFields({ name: "Total Users/Bots", value: `${(_o = message.guild) === null || _o === void 0 ? void 0 : _o.members.cache.size} Users/Bots`, inline: true }, { name: "Users", value: `${members} Users`, inline: true }, { name: "Bots", value: `${bots} Bots`, inline: true }, { name: "Boosts", value: `${(_p = message.guild) === null || _p === void 0 ? void 0 : _p.premiumSubscriptionCount} Boosts (Tier ${(_q = message.guild) === null || _q === void 0 ? void 0 : _q.premiumTier})`, inline: true }, { name: "Text Channels", value: `${textChannels}`, inline: true }, { name: "Voice Channels", value: `${voiceChannels}`, inline: true }, { name: "Categories", value: `${categories}`, inline: true }, { name: "Verification Level", value: `${titleCase((_r = message.guild) === null || _r === void 0 ? void 0 : _r.verificationLevel)}`, inline: true }, { name: "AFK Timeout", value: ((_s = message.guild) === null || _s === void 0 ? void 0 : _s.afkChannel) ? `${moment_1.default.duration(message.guild.afkTimeout * 1000).asMinutes()} minute(s)` : "None", inline: true }, { name: "AFK Channel", value: ((_t = message.guild) === null || _t === void 0 ? void 0 : _t.afkChannel) ? `${message.guild.afkChannel.name}` : "None", inline: true }, { name: "Explicit Content Filter", value: `${titleCase((_u = message.guild) === null || _u === void 0 ? void 0 : _u.explicitContentFilter)}`, inline: true }, { name: "Emojis", value: `${(_v = message.guild) === null || _v === void 0 ? void 0 : _v.emojis.cache.size}`, inline: true }, { name: "Roles", value: `${roleCount}`, inline: true }, { name: "Server Owner", value: `${ow.user.tag}`, inline: true }, { name: "Server ID", value: `${(_w = message.guild) === null || _w === void 0 ? void 0 : _w.id}`, inline: true });
                message.channel.send({ embeds: [serverEmbed] });
            });
        }
        catch (err) {
            console.log(err);
            this.messages.error("Assign Role Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = ServerInfoCommand;
