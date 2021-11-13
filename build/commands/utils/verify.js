"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class VerifyCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "verify",
            description: "Verify your account",
            arguments: "<code>",
            example: "/verify 123456",
            category: "utils",
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
        var _a;
        try {
            if (!args[0] && message.member) {
                let code = Math.floor(100000 + Math.random() * 900000).toString();
                this.userdb.addUser(message.member, code);
                this.messages.private("Verification System", `To verify send \`${this.client.config.discord.bot.prefix}verify ${code}\` in \`${message.member.guild.name}\``, message.member);
            }
            let result = this.userdb.getUser(args[0], "verifyCode");
            if (!result)
                return this.messages.error("Verification Error", `This verification code isn't in our database`, message);
            else if ((result === null || result === void 0 ? void 0 : result.discordID) != message.author.id)
                return this.messages.error("Verification Error", `This verification code isn't linked to your account`, message);
            else {
                try {
                    let role = this.client.getRole(this.client.config.member_join.verify.role);
                    if (!role)
                        return;
                    (_a = message.member) === null || _a === void 0 ? void 0 : _a.roles.add(role);
                    this.userdb.updateUser(args[0], "verifyCode", "verifyCode", null);
                    this.messages.success("Verified", `You have been verified and given the role \`${this.client.config.member_join.verify.role}\``, message);
                }
                catch (err) {
                    console.log(err);
                    return this.messages.error("Verification Error", `A error occured please contact the developer`, message);
                }
            }
        }
        catch (err) {
            console.log(err);
            this.messages.error("Verify Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = VerifyCommand;
