"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class BundleAdd extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "bundleadd",
            description: "Add a faction to a bundle",
            arguments: "<bundleName> <factionName> <leaderName>",
            example: "/bundleadd firstbundle dummyfaction bacio001",
            category: "bundle",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 3, max: 3 },
                userPermissions: ["ADMINISTRATOR"],
                clientPermissions: ["ADMINISTRATOR"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        var _a;
        try {
            let user = ((_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first()) || this.client.getUser(args[2]);
            if (user &&
                this.client.config.bundles.enabled &&
                this.client.config.bundles.names.includes(args[0])) {
                this.bundledb.addBundle(args[0], args[1], user === null || user === void 0 ? void 0 : user.user.username, user === null || user === void 0 ? void 0 : user.user.id);
                this.messages.success("Faction Bundle Added", `\`${args[1]}\` has been added to the queue for the bundle \`${args[0]}\``, message);
            }
            else {
                console.log(user, this.client.config.bundles.enabled, this.client.config.bundles.names.includes(args[0]));
                return this.messages.error("Bundle Add Error", `User or bundle not found also check if bundles are even enabled`, message);
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Bundle Add Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = BundleAdd;
