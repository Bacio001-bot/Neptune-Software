import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { VoiceState } from "discord.js";

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
    }
}