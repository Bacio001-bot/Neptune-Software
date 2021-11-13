"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class PromoteCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "promote",
            description: "Promote Users from a role list given in config",
            arguments: "<user>",
            example: "/promote Bacio001",
            category: "moderation",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 1, max: 2 },
                userPermissions: ["MANAGE_ROLES"],
                clientPermissions: ["MANAGE_ROLES"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        var _a;
        try {
            let user = ((_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first()) || this.client.getUser(args[0]);
            if (message.author.id === (user === null || user === void 0 ? void 0 : user.id) || user == null)
                return this.messages.error("Promote Error", `Specify a user that isn't yourself and is in this guild`, message);
            let positions = [];
            user.roles.cache.forEach((r) => {
                if (this.client.config.moderation.promotion.roles.includes(r.name)) {
                    positions.push({ position: r.position, name: r.name });
                }
            });
            positions = positions.sort(function (a, b) {
                return b.position - a.position;
            });
            let highestRole;
            try {
                highestRole = positions.reduce((max, game) => max.position > game.position ? max : game);
            }
            catch (err) {
                let nextRole = this.client.getRole(this.client.config.moderation.promotion.roles[this.client.config.moderation.promotion.roles.length - 1]);
                if (nextRole == null)
                    return;
                user.roles.add(nextRole);
                return this.messages.success("Promoted", `\`${user.user.tag}\` has been promoted to \`${nextRole.name}\``, message);
            }
            if (this.client.config.moderation.promotion.roles.indexOf(highestRole.name) == 0) {
                return this.messages.error("Promote Error", `User already has the highest role`, message);
            }
            else {
                let nextRolePosition = this.client.config.moderation.promotion.roles.indexOf(highestRole.name) - 1;
                let nextRole = this.client.getRole(this.client.config.moderation.promotion.roles[nextRolePosition]);
                let lastRole = this.client.getRole(highestRole.name);
                if (nextRole == null || lastRole == null)
                    return;
                try {
                    user.roles.add(nextRole);
                    user.roles.remove(lastRole);
                    return this.messages.success("Promoted", `\`${user.user.tag}\` has been promoted to \`${nextRole.name}\``, message);
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Promote Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = PromoteCommand;
