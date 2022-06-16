"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class BanCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "ban",
            description: "Ban Users",
            arguments: "<user> [reason]",
            example: "/ban Bacio001",
            category: "moderation",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 1, max: 1000 },
                userPermissions: ["BAN_MEMBERS"],
                clientPermissions: ["BAN_MEMBERS"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        var _a, _b;
        try {
            let user = ((_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first()) || this.client.getUser(args[0]);
            let reason = "Not Specified";
            if (message.author.id === (user === null || user === void 0 ? void 0 : user.id) || user == null)
                return this.messages.error("User Ban Error", `Specify a user that isn't yourself and is in this guild`, message);
            if (args[1])
                reason = args.slice(1).join(" ");
            try {
                await ((_b = message.guild) === null || _b === void 0 ? void 0 : _b.members.ban(user).catch());
                this.messages.success("User Ban Created", `\`${user.user.tag}\` has been banned by \`${message.author.tag}\`\n\n **REASON:** \n \`\`\`${reason}\`\`\``, message);
            }
            catch (err) {
                console.log(err);
                this.messages.error("User Ban  ", `This user couldn't get banned`, message);
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("User Ban Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = BanCommand;
