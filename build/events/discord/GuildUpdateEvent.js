"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../assets/classes/Event"));
class GuildUpdateEvent extends Event_1.default {
    constructor(client) {
        super(client, "on", "guildMemberRemove");
    }
    async execute(oldGuild, newGuild) {
        if (this.client.config.logging.boost.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.boost.channel);
            if (channel) {
                if (oldGuild.premiumSubscriptionCount != null && newGuild.premiumSubscriptionCount != null) {
                    if (oldGuild.premiumSubscriptionCount <= newGuild.premiumSubscriptionCount) {
                        this.client.messages.boostEvent("Boost Event", `**<@${newGuild.name}> got boosted to a total of ${newGuild.premiumSubscriptionCount} boosts**`, channel);
                    }
                    if (oldGuild.premiumSubscriptionCount >= newGuild.premiumSubscriptionCount) {
                        this.client.messages.boostEvent("Boost Event", `**<@${newGuild.name}> lost a boost to a total of ${newGuild.premiumSubscriptionCount} boosts**`, channel);
                    }
                }
            }
        }
    }
}
exports.default = GuildUpdateEvent;
