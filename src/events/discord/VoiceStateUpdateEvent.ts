import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { VoiceState, GuildMember } from "discord.js";
import db from "quick.db";

export default class VoiceStateUpdateEvent extends Event {
    constructor(client: CustomClient) {
        super(client, "on", "voiceStateUpdate");
    }

    async execute(oldState: VoiceState, newState: VoiceState): Promise<void> {

        if(this.client.config.logging.voice.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.voice.channel)
            if(channel && oldState.member && newState.member){            
                if(!oldState.channel && newState.channel) this.client.messages.voiceEvent(`**<@${oldState.member.user.id}> has joined <#${newState.channel.id}>**`,
                oldState.member,
                channel,
                "GREEN")
                else if(oldState.channel && !newState.channel) this.client.messages.voiceEvent(`**<@${oldState.member.user.id}> has left <#${oldState.channel.id}>**`,
                oldState.member,
                channel,
                "RED")
                else if(oldState.channel && newState.channel) this.client.messages.voiceEvent(`**<@${oldState.member.user.id}> has switched <#${oldState.channel.id}> -> <#${newState.channel.id}>**`,
                oldState.member,
                channel,
                this.client.config.discord.embed.color)
            }
        }

        const date = new Date()
        if(!oldState.channel && newState.channel) {
            db.set(`${(newState.member as GuildMember).user.id}_${(newState.channel as any).id}_voice`, date.getTime())
        }
        if(oldState.channel && newState.channel && oldState.channel != newState.channel) {
            const oldDate = db.get(`${(oldState.member as GuildMember).user.id}_${(oldState.channel as any).id}_voice`)
            db.delete(`${(oldState.member as GuildMember).user.id}_${(oldState.channel as any).id}_voice`)
            let difference = date.getTime() - oldDate
            let result = this.userdb.getUser((oldState.member as GuildMember).user.id, "discordID");        
            let time = result?.voiceTime ? result?.voiceTime + difference : difference
            this.userdb.updateUser((oldState.member as GuildMember).user.id, "discordID", "voiceTime", time)
            db.set(`${(newState.member as GuildMember).user.id}_${(newState.channel as any).id}_voice`, date.getTime())
        }
        if(oldState.channel && !newState.channel) {
            const oldDate = db.get(`${(oldState.member as GuildMember).user.id}_${(oldState.channel as any).id}_voice`)
            db.delete(`${(oldState.member as GuildMember).user.id}_${(oldState.channel as any).id}_voice`)
            let difference = date.getTime() - oldDate
            let result = this.userdb.getUser((oldState.member as GuildMember).user.id, "discordID");        
            let time = result?.voiceTime ? result?.voiceTime + difference : difference
            this.userdb.updateUser((oldState.member as GuildMember).user.id, "discordID", "voiceTime", time)
        }

        let result = this.userdb.getUser((oldState.member as GuildMember).user.id, "discordID");

        if (result?.messages.total) {
            let playerXp = 0
            if(result?.voiceTime && result?.voiceTime > 60000) playerXp = ((result?.messages.total + 1) * this.client.config.level_system.xp_per_message) + (result?.voiceTime / (this.client.config.level_system.xp_per_minute * 60000))
            else playerXp = (result?.messages.total * this.client.config.level_system.xp_per_message) 
            playerXp = parseInt(playerXp.toFixed(0) as any)
            this.userdb.updateUser((oldState.member as GuildMember).user.id, "discordID", "xp", playerXp)  
        } else {
            let playerXp = 0
            if(result?.voiceTime && result?.voiceTime > 60000){ playerXp = ((result?.messages.total + 1) * this.client.config.level_system.xp_per_message) + (result?.voiceTime / (this.client.config.level_system.xp_per_minute * 60000))
                playerXp = parseInt(playerXp.toFixed(0) as any)
                this.userdb.updateUser((oldState.member as GuildMember).user.id, "discordID", "xp", playerXp)  
            }
        }
       

    }
}