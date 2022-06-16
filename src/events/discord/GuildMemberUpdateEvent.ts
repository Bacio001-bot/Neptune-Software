import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { GuildMember, TextChannel } from "discord.js";

export default class GuildMemberUpdateEvent extends Event {
    constructor(client: CustomClient) {
        super(client, "on", "guildMemberUpdate");
    }

    async execute(oldMember: GuildMember, newMember: GuildMember): Promise<void> {
        let oldHasRole = oldMember.roles.cache.find(r => r === this.client.getRole(this.client.config.role.notification.role))
        let newHasRole = newMember.roles.cache.find(r => r === this.client.getRole(this.client.config.role.notification.role))
        if(!oldHasRole && newHasRole) {
            if(this.client.config.role.notification.enabled) {
                let channel = this.client.getChannel(this.client.config.role.notification.channel)
                let message = this.placeholder.replaceWelcomeMessage(this.client.config.role.notification.message, newMember)
                let sentMessage = await channel?.send(message).catch((err) => console.log(err))
                await sentMessage?.react('👋')
            } 
        }
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