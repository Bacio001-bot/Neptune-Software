import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { GuildMember, TextChannel } from "discord.js";

export default class GuildMemberUpdateEvent extends Event {
    constructor(client: CustomClient) {
        super(client, "on", "guildMemberUpdate");
    }

    async execute(oldMember: GuildMember, newMember: GuildMember): Promise<void> {

        if(this.client.config.logging.boost.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.boost.channel)
            if(channel){          
                if(oldMember.premiumSince == null && newMember.premiumSince != null) {
                    this.client.messages.boostEvent(`${newMember.user.username} Boosted`,
                    `**<@${newMember.user.id}> has boosted the server**`,
                    channel as TextChannel)
                }
                if(oldMember.premiumSince != null && newMember.premiumSince == null) {
                    this.client.messages.boostEvent(`${newMember.user.username} Boost expired`,
                    `**<@${newMember.user.id}> has lost the boost on the server**`,
                    channel as TextChannel)
                }
            }
        } 
        
    }
}