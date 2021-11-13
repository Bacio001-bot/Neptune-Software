"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class AssignCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "assign",
            description: "Assign a role to a users",
            arguments: "<user> <role>",
            example: "/assign Bacio001 mod",
            category: "moderation",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 2, max: 2 },
                userPermissions: ["MANAGE_ROLES"],
                clientPermissions: ["MANAGE_ROLES"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        var _a, _b;
        try {
            let user = ((_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first()) || this.client.getUser(args[0]);
            let role = ((_b = message.mentions.roles) === null || _b === void 0 ? void 0 : _b.first()) || this.client.getRole(args[1]);
            if (user == null || role == null)
                return this.messages.error("Assign Role Error", `Not a valid user or role supplied`, message);
            user.roles.add(role);
            this.messages.success("Assigned Role", `\`${user.user.tag}\` has been assigned the role \`${role.name}\``, message);
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Assign Role Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = AssignCommand;
