"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class UnbanCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "unban",
            description: "Unban a user",
            arguments: "<user> [reason]",
            example: "/unban Bacio001",
            category: "moderation",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 1, max: 2 },
                userPermissions: ["BAN_MEMBERS"],
                clientPermissions: ["BAN_MEMBERS"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        var _a, _b;
        try {
            let user = args[0];
            let reason = "Not Specified";
            if (args[1])
                reason = args.slice(2).join(" ");
            let bans = await ((_a = message.guild) === null || _a === void 0 ? void 0 : _a.bans.fetch());
            if ((bans === null || bans === void 0 ? void 0 : bans.size) == 0)
                return this.messages.error("User Unban Error", `No users have been banned in this guild`, message);
            try {
                (_b = message.guild) === null || _b === void 0 ? void 0 : _b.bans.remove(user).catch((err) => {
                    return this.messages.error("User Unban Error", `${user} isn't banned`, message);
                });
                this.messages.success("User Unban", `\`${user}\` has been unbanned by \`${message.author.tag}\`\n\n **Reason:** \n \`\`\`${reason}\`\`\``, message);
            }
            catch (err) {
                console.log(err);
                return this.messages.error("User Unban Error", `A error occured please contact the developer`, message);
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("User Unban Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = UnbanCommand;
