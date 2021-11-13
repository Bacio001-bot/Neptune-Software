"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class BundleTaken extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "bundletaken",
            description: "Take faction from finished list",
            arguments: "<bundleId>",
            example: "/bundletaken 1 || /bundletaken all",
            category: "bundle",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 1, max: 1 },
                userPermissions: ["ADMINISTRATOR"],
                clientPermissions: ["ADMINISTRATOR"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        try {
            if (this.client.config.bundles.enabled) {
                let bundleId = parseInt(args[0]) || args[0];
                if (isNaN(bundleId) && bundleId != "all")
                    return this.messages.error("Bundle Taken Error", `Not a valid bundle id supplied`, message);
                if (bundleId == "all") {
                    this.bundledb.listBundles().forEach((bundle) => {
                        this.bundledb.updateBundle(bundle.bundleId, "bundleId", "bundlegiven", false);
                    });
                    this.messages.success("Faction Bundle Taken", `All the bundles have been taken and moved out of queue`, message);
                }
                else {
                    bundleId = bundleId;
                    let bundle = this.bundledb.getBundle(bundleId, "bundleId");
                    if (bundle) {
                        this.bundledb.updateBundle(bundleId, "bundleId", "bundlegiven", false);
                        this.messages.success("Faction Bundle Taken", `Bundle \`${bundle.bundelName} (${bundle.bundleId})\` has been taken to \`${bundle.facName}\` and moved out of queue`, message);
                    }
                    else {
                        return this.messages.error("Bundle Taken Error", `Not a valid bundle id supplied`, message);
                    }
                }
            }
            else {
                return this.messages.error("Bundle Taken Error", `Bundles aren't enabled`, message);
            }
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Bundle Taken Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = BundleTaken;
