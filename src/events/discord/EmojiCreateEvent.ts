import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { GuildEmoji } from "discord.js";

export default class EmojiCreateEvent extends Event {
    constructor(client: CustomClient) {
        super(client, "on", "emojiCreate");
    }

    async execute(emoji: GuildEmoji): Promise<void> {
        if(this.client.config.logging.emoji.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.emoji.channel)
            if(channel){          
                if(emoji.animated) {
                    this.client.messages.emojiEvent(`Emoji Create`,
                    `**The animated emoji \`${emoji.name}\` has been created**`,
                    emoji,
                    channel,
                    "GREEN")
                } else {
                    this.client.messages.emojiEvent(`Emoji Create`,
                    `**The emoji \`${emoji.name}\` has been created**`,
                    emoji,
                    channel,
                    "GREEN")
                }
            }
        } 
    }
}