import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { GuildEmoji } from "discord.js";

export default class EmojiDeleteEvent extends Event {
    constructor(client: CustomClient) {
        super(client, "on", "emojiDelete");
    }

    async execute(emoji: GuildEmoji): Promise<void> {
        if(this.client.config.logging.emoji.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.emoji.channel)
            if(channel){          
                if(emoji.animated) {
                    this.client.messages.emojiEvent(`Emoji Delete`,
                    `**The animated emoji \`${emoji.name}\` has been deleted**`,
                    emoji,
                    channel,
                    "RED")
                } else {
                    this.client.messages.emojiEvent(`Emoji Delete`,
                    `**The emoji \`${emoji.name}\` has been deleted**`,
                    emoji,
                    channel,
                    "RED")
                }
            }
        } 
    }
}