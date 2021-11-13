"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../assets/classes/Event"));
class EmojiCreateEvent extends Event_1.default {
    constructor(client) {
        super(client, "on", "emojiCreate");
    }
    async execute(emoji) {
        if (this.client.config.logging.emoji.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.emoji.channel);
            if (channel) {
                if (emoji.animated) {
                    this.client.messages.emojiEvent(`Emoji Create`, `**The animated emoji \`${emoji.name}\` has been created**`, emoji, channel, "GREEN");
                }
                else {
                    this.client.messages.emojiEvent(`Emoji Create`, `**The emoji \`${emoji.name}\` has been created**`, emoji, channel, "GREEN");
                }
            }
        }
    }
}
exports.default = EmojiCreateEvent;
