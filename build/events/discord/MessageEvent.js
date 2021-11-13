"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../assets/classes/Event"));
class MessageEvent extends Event_1.default {
    constructor(client, bot) {
        super(client, "on", "messageCreate");
        this.addHandler("DiscordHandler", (message) => {
            var _a;
            let run = true;
            let result = this.userdb.getUser(message.author.id, "discordID");
            if (!result && message.member && !message.author.bot) {
                this.userdb.addUser(message.member, 'NULL');
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
        var _a, _b, _c, _d;
        let result = this.userdb.getUser(message.author.id, "discordID");
        if (message.mentions.everyone && (result === null || result === void 0 ? void 0 : result.messages.everyone) != undefined)
            this.userdb.updateUser((_a = message.author) === null || _a === void 0 ? void 0 : _a.id, "discordID", "everyone", (result === null || result === void 0 ? void 0 : result.messages.everyone) + 1);
        if (message.mentions.repliedUser && (result === null || result === void 0 ? void 0 : result.messages.replies) != undefined)
            this.userdb.updateUser((_b = message.author) === null || _b === void 0 ? void 0 : _b.id, "discordID", "replies", (result === null || result === void 0 ? void 0 : result.messages.replies) + 1);
        if (message.tts && (result === null || result === void 0 ? void 0 : result.messages.tts) != undefined)
            this.userdb.updateUser((_c = message.author) === null || _c === void 0 ? void 0 : _c.id, "discordID", "tts", (result === null || result === void 0 ? void 0 : result.messages.tts) + 1);
        if ((result === null || result === void 0 ? void 0 : result.messages.total) != undefined)
            this.userdb.updateUser((_d = message.author) === null || _d === void 0 ? void 0 : _d.id, "discordID", "total", (result === null || result === void 0 ? void 0 : result.messages.total) + 1);
    }
}
exports.default = MessageEvent;
