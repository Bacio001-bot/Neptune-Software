"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class BanCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "slowmode",
            description: "Slowmode a channel",
            arguments: "<channel> <seconds>",
            example: "/slowmode 1",
            category: "moderation",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 2, max: 2 },
                userPermissions: ["MANAGE_CHANNELS"],
                clientPermissions: ["MANAGE_CHANNELS"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        var _a;
        try {
            let channel = this.client.getChannel(args[0]);
            if (channel == null)
                return this.messages.error("Slowmode Error", `No valid channel supplied`, message);
            if (isNaN(parseInt(args[1])))
                return this.messages.error("Slowmode Error", `Specify a valid number`, message);
            try {
                (_a = channel) === null || _a === void 0 ? void 0 : _a.setRateLimitPerUser(parseInt(args[1]));
                this.messages.success("Slowmode", `\`${message.author.tag}\` has been enabled slowmade,\`${channel.name}\` cooldown is \`${args[1]} seconds\``, message);
            }
            catch (err) {
                console.log(err);
                return this.messages.error("Slowmode Error", `A error occured please contact the developer`, message);
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("User Ban Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = BanCommand;
