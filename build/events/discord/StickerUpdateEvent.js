"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../assets/classes/Event"));
class StickerUpdateEvent extends Event_1.default {
    constructor(client) {
        super(client, "on", "stickerUpdate");
    }
    async execute(oldSticker, newSticker) {
        if (this.client.config.logging.emoji.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.emoji.channel);
            if (channel) {
                this.client.messages.stickerEvent(`Sticker Update`, `**The sticker\`${oldSticker.name}\` has been updated to to \`${newSticker.name}\`**`, newSticker, channel, this.client.config.discord.embed.color);
            }
        }
    }
}
exports.default = StickerUpdateEvent;
