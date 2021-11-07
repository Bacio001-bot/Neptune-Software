import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { GuildEmoji, Sticker } from "discord.js";

export default class StickerDeleteEvent extends Event {
    constructor(client: CustomClient) {
        super(client, "on", "stickerDelete");
    }

    async execute(sticker: Sticker): Promise<void> {
        if(this.client.config.logging.emoji.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.emoji.channel)
            if(channel){          
                if(sticker.name) {
                    this.client.messages.stickerEvent(`Sticker Delete`,
                    `**The sticker \`${sticker.name}\` has been deleted**`,
                    sticker,
                    channel,
                    "RED")
                } else {
                    this.client.messages.stickerEvent(`Sticker Delete`,
                    `**The sticker \`${sticker.name}\` has been deleted**`,
                    sticker,
                    channel,
                    "RED")
                }
            }
        } 
    }
}