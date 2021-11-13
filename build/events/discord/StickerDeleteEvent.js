"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../assets/classes/Event"));
class StickerDeleteEvent extends Event_1.default {
    constructor(client) {
        super(client, "on", "stickerDelete");
    }
    async execute(sticker) {
        if (this.client.config.logging.emoji.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.emoji.channel);
            if (channel) {
                if (sticker.name) {
                    this.client.messages.stickerEvent(`Sticker Delete`, `**The sticker \`${sticker.name}\` has been deleted**`, sticker, channel, "RED");
                }
                else {
                    this.client.messages.stickerEvent(`Sticker Delete`, `**The sticker \`${sticker.name}\` has been deleted**`, sticker, channel, "RED");
                }
            }
        }
    }
}
exports.default = StickerDeleteEvent;
