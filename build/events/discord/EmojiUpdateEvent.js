"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../assets/classes/Event"));
class EmojiUpdateEvent extends Event_1.default {
    constructor(client) {
        super(client, "on", "emojiUpdate");
    }
    async execute(oldEmoji, newEmoji) {
        if (this.client.config.logging.emoji.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.emoji.channel);
            if (channel) {
                if (oldEmoji.animated) {
                    this.client.messages.emojiEvent(`Emoji Update`, `**The animated emoji \`${oldEmoji.name}\` has been updated to \`${newEmoji.name}\`**`, newEmoji, channel, this.client.config.discord.embed.color);
                }
                else {
                    this.client.messages.emojiEvent(`Emoji Update`, `**The emoji \`${oldEmoji.name}\` has been updated to to \`${newEmoji.name}\`**`, newEmoji, channel, this.client.config.discord.embed.color);
                }
            }
        }
    }
}
exports.default = EmojiUpdateEvent;
