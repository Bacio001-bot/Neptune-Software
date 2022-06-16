"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../assets/classes/Event"));
const quick_db_1 = __importDefault(require("quick.db"));
class MessageEvent extends Event_1.default {
    constructor(client, bot) {
        super(client, "on", "messageCreate");
        this.addHandler("DiscordHandler", (message) => {
            var _a;
            let run = true;
            let result = this.userdb.getUser(message.author.id, "discordID");
            if (!result && message.member && !message.author.bot) {
                this.userdb.addUser(message.member, '');
            }
            const args = message.content.split(/\s+/g);
            const cmd = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.slice(client.prefix.length);
            if (!cmd)
                return false;
            let command = client.getCommand(cmd);
            if (!command)
                return false;
            if (command.help.type === "discord") {
                if (!message.content.startsWith(this.client.prefix))
                    run = false;
                if (!message.author)
                    run = false;
            }
            return run;
        });
        this.addHandler("BothHandler", (message) => {
            var _a;
            let run = true;
            const args = message.content.split(/\s+/g);
            const cmd = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.slice(client.prefix.length);
            if (!cmd)
                return false;
            let command = client.getCommand(cmd);
            if (!command)
                return false;
            if (command.help.type === "both") {
                if (!message.content.startsWith(this.client.prefix))
                    run = false;
                if (!message.author)
                    run = false;
            }
            return run;
        });
    }
    async execute(message) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let afkCheck = await quick_db_1.default.get(`afk_${message.author.id}`);
        if (afkCheck) {
            quick_db_1.default.delete(`afk_${message.author.id}`);
            (_a = message.channel) === null || _a === void 0 ? void 0 : _a.send(`\`${message.author.username}\` welcome back! | I removed your afk message `);
        }
        let member = (_b = message.mentions.members) === null || _b === void 0 ? void 0 : _b.first();
        if (member && !message.author.bot) {
            let afk = await quick_db_1.default.get(`afk_${member === null || member === void 0 ? void 0 : member.user.id}`);
            if (afk) {
                (_c = message.channel) === null || _c === void 0 ? void 0 : _c.send(`\`${member.user.username}\` is afk | ${afk} `);
            }
        }
        let result = this.userdb.getUser(message.author.id, "discordID");
        if (message.mentions.everyone && (result === null || result === void 0 ? void 0 : result.messages.everyone) != undefined)
            this.userdb.updateUser((_d = message.author) === null || _d === void 0 ? void 0 : _d.id, "discordID", "everyone", (result === null || result === void 0 ? void 0 : result.messages.everyone) + 1);
        if (message.mentions.repliedUser && (result === null || result === void 0 ? void 0 : result.messages.replies) != undefined)
            this.userdb.updateUser((_e = message.author) === null || _e === void 0 ? void 0 : _e.id, "discordID", "replies", (result === null || result === void 0 ? void 0 : result.messages.replies) + 1);
        if (message.tts && (result === null || result === void 0 ? void 0 : result.messages.tts) != undefined)
            this.userdb.updateUser((_f = message.author) === null || _f === void 0 ? void 0 : _f.id, "discordID", "tts", (result === null || result === void 0 ? void 0 : result.messages.tts) + 1);
        if ((result === null || result === void 0 ? void 0 : result.messages.total) != undefined)
            this.userdb.updateUser((_g = message.author) === null || _g === void 0 ? void 0 : _g.id, "discordID", "total", (result === null || result === void 0 ? void 0 : result.messages.total) + 1);
        if (this.client.config.level_system.blacklisted_text_channels.indexOf(message.channel.id) == -1) {
            if ((result === null || result === void 0 ? void 0 : result.messages.total) && this.client.config.level_system.enabled) {
                let playerXp = 0;
                if ((result === null || result === void 0 ? void 0 : result.voiceTime) && (result === null || result === void 0 ? void 0 : result.voiceTime) > 60000)
                    playerXp = (((result === null || result === void 0 ? void 0 : result.messages.total) + 1) * this.client.config.level_system.xp_per_message) + ((result === null || result === void 0 ? void 0 : result.voiceTime) / (this.client.config.level_system.xp_per_minute * 60000));
                else
                    playerXp = (((result === null || result === void 0 ? void 0 : result.messages.total) + 1) * this.client.config.level_system.xp_per_message);
                playerXp = parseInt(playerXp.toFixed(0));
                this.userdb.updateUser((_h = message.author) === null || _h === void 0 ? void 0 : _h.id, "discordID", "xp", playerXp);
                this.client.config.level_system.xp_for_role.forEach(async (role) => {
                    var _a, _b;
                    if (role[1] <= playerXp) {
                        let xpRole = this.client.getRole(role[0]);
                        if (xpRole && !((_a = message.member) === null || _a === void 0 ? void 0 : _a.roles.cache.find(role => role == xpRole)))
                            await ((_b = message.member) === null || _b === void 0 ? void 0 : _b.roles.add(xpRole));
                    }
                });
            }
        }
    }
}
exports.default = MessageEvent;
