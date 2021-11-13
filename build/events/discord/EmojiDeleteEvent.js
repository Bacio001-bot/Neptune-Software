"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../assets/classes/Event"));
class EmojiDeleteEvent extends Event_1.default {
    constructor(client) {
        super(client, "on", "emojiDelete");
    }
    async execute(emoji) {
        if (this.client.config.logging.emoji.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.emoji.channel);
            if (channel) {
                if (emoji.animated) {
                    this.client.messages.emojiEvent(`Emoji Delete`, `**The animated emoji \`${emoji.name}\` has been deleted**`, emoji, channel, "RED");
                }
                else {
                    this.client.messages.emojiEvent(`Emoji Delete`, `**The emoji \`${emoji.name}\` has been deleted**`, emoji, channel, "RED");
                }
            }
        }
    }
}
exports.default = EmojiDeleteEvent;
