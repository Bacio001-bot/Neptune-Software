import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { GuildMember } from "discord.js";

export default class GuildMemberRemoveEvent extends Event {
    constructor(client: CustomClient) {
        super(client, "on", "guildMemberRemove");
    }

    async execute(member: GuildMember): Promise<void> {
        this.userdb.removeUser(member.user.id, "discordID")

        if(this.client.config.logging.left.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.left.channel)
            if(channel){          
                this.client.messages.banKickEvent(`**<@${member.user.id}> has left the server**`,
                member.user,
                channel)
            }
        } 
        
    }
}