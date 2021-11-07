import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { GuildEmoji, Sticker } from "discord.js";

export default class StickerUpdateEvent extends Event {
    constructor(client: CustomClient) {
        super(client, "on", "stickerUpdate");
    }

    async execute(oldSticker: Sticker, newSticker: Sticker): Promise<void> {
        if(this.client.config.logging.emoji.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.emoji.channel)
            if(channel){          

                this.client.messages.stickerEvent(`Sticker Update`,
                `**The sticker\`${oldSticker.name}\` has been updated to to \`${newSticker.name}\`**`,
                newSticker,
                channel,
                this.client.config.discord.embed.color)
            
            }
        } 
    }
}