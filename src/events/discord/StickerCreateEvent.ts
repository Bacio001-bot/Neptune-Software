import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { GuildEmoji, Sticker } from "discord.js";

export default class StickerCreateEvent extends Event {
    constructor(client: CustomClient) {
        super(client, "on", "stickerCreate");
    }

    async execute(sticker: Sticker): Promise<void> {
        if(this.client.config.logging.emoji.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.emoji.channel)
            if(channel){          
                if(sticker.name) {
                    this.client.messages.stickerEvent(`Sticker Create`,
                    `**The sticker \`${sticker.name}\` has been created**`,
                    sticker,
                    channel,
                    "GREEN")
                } else {
                    this.client.messages.stickerEvent(`Sticker Create`,
                    `**The emoji \`${sticker.name}\` has been created**`,
                    sticker,
                    channel,
                    "GREEN")
                }
            }
        } 
    }
}