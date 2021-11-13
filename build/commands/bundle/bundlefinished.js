"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class BundleFinished extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "bundlefinished",
            description: "Get the list of finished bundles",
            arguments: "",
            example: "/bundlefinished",
            category: "bundle",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 0, max: 0 },
                userPermissions: ["ADMINISTRATOR"],
                clientPermissions: ["ADMINISTRATOR"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        try {
            let bundleMessage = "";
            this.client.config.bundles.names.forEach(bundleName => {
                bundleMessage += `\n**${bundleName}**\n`;
                this.bundledb.listBundles().forEach(bundle => {
                    if (bundle.bundelName == bundleName && bundle.bundlegiven) {
                        bundleMessage += `> **${bundle.facName} (${bundle.bundleId}) »** *${bundle.facLeaderName} (${bundle.facLeaderId})*\n`;
                    }
                });
            });
            bundleMessage += "\n```BundleName » BundleId » Faction » Leader```";
            this.messages.default("Faction Bundle Finished", bundleMessage, message);
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Bundle Finish Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = BundleFinished;
