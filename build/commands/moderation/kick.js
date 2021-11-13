"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class KickCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "kick",
            description: "Kick Users",
            arguments: "<user>",
            example: "/kick Bacio001",
            category: "moderation",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 1, max: 2 },
                userPermissions: ["KICK_MEMBERS"],
                clientPermissions: ["KICK_MEMBERS"],
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
                return this.messages.error("User Kick Error", `Specify a user that isn't yourself or isn't in this guild`, message);
            if (args[1])
                reason = args.slice(1).join(" ");
            try {
                await ((_b = message.guild) === null || _b === void 0 ? void 0 : _b.members.kick(user).catch());
                this.messages.success("User Kick Created", `\`${user.user.tag}\` has been kicked by \`${message.author.tag}\`\n\n **REASON:** \n \`\`\`${reason}\`\`\``, message);
            }
            catch (err) {
                console.log(err);
                this.messages.error("User Kick Error", `This user couldn't get kicked`, message);
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("User Kick Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = KickCommand;
