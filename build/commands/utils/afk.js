"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../assets/classes/Command"));
const quick_db_1 = __importDefault(require("quick.db"));
class VerifyCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "afk",
            description: "Tell everyone you're afk",
            arguments: "<message>",
            example: "/afk Hey everyone I'm currently afk",
            category: "utils",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 1, max: 1000 },
                userPermissions: ["SEND_MESSAGES"],
                clientPermissions: ["SEND_MESSAGES"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        try {
            setTimeout(function () {
                quick_db_1.default.set(`afk_${message.author.id}`, args.toString().replace(',', ' '));
                message.channel.send(`<@${message.author.id}> | Set your afk: \`${args.toString().replace(',', ' ')}\` `);
            }, 2000);
        }
        catch (err) {
            console.log(err);
            this.messages.error("Afk Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = VerifyCommand;
