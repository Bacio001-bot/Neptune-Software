"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../assets/classes/Command"));
const moment_1 = __importDefault(require("moment"));
const ms_1 = __importDefault(require("ms"));
class MuteCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "mute",
            description: "Mute Users",
            arguments: "<user> <1s | 1m | 1h | 1d | perm> [reason]",
            example: "/mute Bacio001 1h",
            category: "moderation",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 1, max: 1000 },
                userPermissions: ["MUTE_MEMBERS"],
                clientPermissions: ["MUTE_MEMBERS"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        var _a;
        try {
            let mutedRole = this.client.getRole(this.client.config.moderation.mute.role);
            let user = ((_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first()) || this.client.getUser(args[0]);
            let reason = "Not Specified";
            if (!mutedRole)
                return this.messages.error("User Mute Error", `No valid mute role name supplied in config`, message);
            if (message.author.id === (user === null || user === void 0 ? void 0 : user.id) || user == null)
                return this.messages.error("User Mute Error", `Specify a user that isn't yourself and is in this guild`, message);
            if (args[2])
                reason = args.slice(2).join(" ");
            if (!user)
                return this.messages.error("User Mute Error", `Specify a user that isn't yourself and is in this guild`, message);
            if (!args[1])
                return this.messages.error("Mute Error", `Specify a valid time`, message);
            if (this.client.config.discord.bot.admin_users.includes(user.id))
                return this.messages.error("Mute Error", `Specify a user that isn't a max perm user`, message);
            try {
                let now = new Date();
                let date = (0, moment_1.default)(now).format("MM/DD/YYYY");
                if (args[1].toLowerCase() === "perm" ||
                    args[1].toLowerCase() === "permanent") {
                    let time = "Until Unmuted";
                    this.messages.success("User Muted", `\`${user.user.tag}\` has been muted by \`${message.author.tag}\`\n\n **Time:**\`${time}\`\n\n **Reason:** \n \`\`\`${reason}\`\`\``, message);
                    try {
                        user.roles.add(mutedRole);
                    }
                    catch (err) {
                        console.log(err);
                        return this.messages.error("User Mute Error", `A error occured make sure the permissions are right`, message);
                    }
                    return;
                }
                let time;
                try {
                    time = (0, ms_1.default)((0, ms_1.default)(args[1]), { long: true });
                }
                catch (err) {
                    return this.messages.error("Mute Error", `Supply a valid time`, message);
                }
                this.messages.success("User Muted", `\`${user.user.tag}\` has been muted by \`${message.author.tag}\`\n\n **Time:**\`${time}\`\n\n **Reason:** \n \`\`\`${reason}\`\`\``, message);
                try {
                    user.roles.add(mutedRole);
                }
                catch (err) {
                    console.log(err);
                    return this.messages.error("User Mute Error", `A error occured make sure the permissions are right`, message);
                }
                setTimeout(() => {
                    var _a;
                    if (user == null || mutedRole == null)
                        return;
                    user
                        .send(`<@${user.user.id}> you have been unmuted in ${(_a = message.guild) === null || _a === void 0 ? void 0 : _a.name}`)
                        .catch();
                    try {
                        user.roles.remove(mutedRole);
                    }
                    catch (err) {
                        console.log(err);
                        return this.messages.error("User Mute Error", `A error occured make sure the permissions are right`, message);
                    }
                }, (0, ms_1.default)(args[1]));
            }
            catch (err) {
                console.log(err);
                return this.messages.error("User Mute Error", `A error occured please contact the developer`, message);
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("User Mute Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = MuteCommand;
