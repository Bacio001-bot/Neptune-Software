import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { Guild, GuildMember, TextChannel } from "discord.js";
import { Console } from "console";

export default class GuildUpdateEvent extends Event {
    constructor(client: CustomClient) {
        super(client, "on", "guildMemberRemove");
    }

    async execute(oldGuild: Guild, newGuild: Guild): Promise<void> {

        if(this.client.config.logging.boost.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.boost.channel)
            if(channel){          
                if (oldGuild.premiumSubscriptionCount != null && newGuild.premiumSubscriptionCount != null) {
                    if(oldGuild.premiumSubscriptionCount <= newGuild.premiumSubscriptionCount) {
                        this.client.messages.boostEvent("Boost Event",
                        `**<@${newGuild.name}> got boosted to a total of ${newGuild.premiumSubscriptionCount} boosts**`,
                        channel as TextChannel)
                    }
                    if(oldGuild.premiumSubscriptionCount >= newGuild.premiumSubscriptionCount) {
                        this.client.messages.boostEvent("Boost Event",
                        `**<@${newGuild.name}> lost a boost to a total of ${newGuild.premiumSubscriptionCount} boosts**`,
                        channel as TextChannel)
                    }
                }
            }
        } 
        
    }
}