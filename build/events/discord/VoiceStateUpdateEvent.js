"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../assets/classes/Event"));
const quick_db_1 = __importDefault(require("quick.db"));
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
        const date = new Date();
        if (!oldState.channel && newState.channel) {
            quick_db_1.default.set(`${newState.member.user.id}_${newState.channel.id}_voice`, date.getTime());
        }
        if (oldState.channel && newState.channel && oldState.channel != newState.channel) {
            const oldDate = quick_db_1.default.get(`${oldState.member.user.id}_${oldState.channel.id}_voice`);
            quick_db_1.default.delete(`${oldState.member.user.id}_${oldState.channel.id}_voice`);
            let difference = date.getTime() - oldDate;
            let result = this.userdb.getUser(oldState.member.user.id, "discordID");
            let time = (result === null || result === void 0 ? void 0 : result.voiceTime) ? (result === null || result === void 0 ? void 0 : result.voiceTime) + difference : difference;
            this.userdb.updateUser(oldState.member.user.id, "discordID", "voiceTime", time);
            quick_db_1.default.set(`${newState.member.user.id}_${newState.channel.id}_voice`, date.getTime());
        }
        if (oldState.channel && !newState.channel) {
            const oldDate = quick_db_1.default.get(`${oldState.member.user.id}_${oldState.channel.id}_voice`);
            quick_db_1.default.delete(`${oldState.member.user.id}_${oldState.channel.id}_voice`);
            let difference = date.getTime() - oldDate;
            let result = this.userdb.getUser(oldState.member.user.id, "discordID");
            let time = (result === null || result === void 0 ? void 0 : result.voiceTime) ? (result === null || result === void 0 ? void 0 : result.voiceTime) + difference : difference;
            this.userdb.updateUser(oldState.member.user.id, "discordID", "voiceTime", time);
        }
        let result = this.userdb.getUser(oldState.member.user.id, "discordID");
        if (result === null || result === void 0 ? void 0 : result.messages.total) {
            let playerXp = 0;
            if ((result === null || result === void 0 ? void 0 : result.voiceTime) && (result === null || result === void 0 ? void 0 : result.voiceTime) > 60000)
                playerXp = (((result === null || result === void 0 ? void 0 : result.messages.total) + 1) * this.client.config.level_system.xp_per_message) + ((result === null || result === void 0 ? void 0 : result.voiceTime) / (this.client.config.level_system.xp_per_minute * 60000));
            else
                playerXp = ((result === null || result === void 0 ? void 0 : result.messages.total) * this.client.config.level_system.xp_per_message);
            playerXp = parseInt(playerXp.toFixed(0));
            this.userdb.updateUser(oldState.member.user.id, "discordID", "xp", playerXp);
        }
        else {
            let playerXp = 0;
            if ((result === null || result === void 0 ? void 0 : result.voiceTime) && (result === null || result === void 0 ? void 0 : result.voiceTime) > 60000) {
                playerXp = (((result === null || result === void 0 ? void 0 : result.messages.total) + 1) * this.client.config.level_system.xp_per_message) + ((result === null || result === void 0 ? void 0 : result.voiceTime) / (this.client.config.level_system.xp_per_minute * 60000));
                playerXp = parseInt(playerXp.toFixed(0));
                this.userdb.updateUser(oldState.member.user.id, "discordID", "xp", playerXp);
            }
        }
    }
}
exports.default = VoiceStateUpdateEvent;
