import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { Guild, GuildBan, GuildMember } from "discord.js";

export default class GuildBanAddEvent extends Event {
    constructor(client: CustomClient) {
        super(client, "on", "guildBanAdd");
    }

    async execute(ban: GuildBan): Promise<void> {
        if(this.client.config.logging.ban.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.ban.channel)
            if(channel){          
                this.client.messages.banKickEvent(`**<@${ban.user.id}> has been banned**`,
                ban.user,
                channel)
            }
        } 
    }
}