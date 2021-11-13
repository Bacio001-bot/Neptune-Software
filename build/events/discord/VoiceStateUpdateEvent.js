"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../assets/classes/Event"));
class VoiceStateUpdateEvent extends Event_1.default {
    constructor(client) {
        super(client, "on", "voiceStateUpdate");
    }
    async execute(oldState, newState) {
        if (this.client.config.logging.voice.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.voice.channel);
            if (channel && oldState.member && newState.member) {
                if (!oldState.channel && newState.channel)
                    this.client.messages.voiceEvent(`**<@${oldState.member.user.id}> has joined <#${newState.channel.id}>**`, oldState.member, channel, "GREEN");
                else if (oldState.channel && !newState.channel)
                    this.client.messages.voiceEvent(`**<@${oldState.member.user.id}> has left <#${oldState.channel.id}>**`, oldState.member, channel, "RED");
                else if (oldState.channel && newState.channel)
                    this.client.messages.voiceEvent(`**<@${oldState.member.user.id}> has switched <#${oldState.channel.id}> -> <#${newState.channel.id}>**`, oldState.member, channel, this.client.config.discord.embed.color);
            }
        }
    }
}
exports.default = VoiceStateUpdateEvent;
