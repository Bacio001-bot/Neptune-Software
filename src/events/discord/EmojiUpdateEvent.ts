import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { GuildEmoji } from "discord.js";

export default class EmojiUpdateEvent extends Event {
    constructor(client: CustomClient) {
        super(client, "on", "emojiUpdate");
    }

    async execute(oldEmoji: GuildEmoji, newEmoji: GuildEmoji): Promise<void> {
        if(this.client.config.logging.emoji.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.emoji.channel)
            if(channel){          
                if(oldEmoji.animated) {
                    this.client.messages.emojiEvent(`Emoji Update`,
                    `**The animated emoji \`${oldEmoji.name}\` has been updated to \`${newEmoji.name}\`**`,
                    newEmoji,
                    channel,
                    this.client.config.discord.embed.color)
                } else {
                    this.client.messages.emojiEvent(`Emoji Update`,
                    `**The emoji \`${oldEmoji.name}\` has been updated to to \`${newEmoji.name}\`**`,
                    newEmoji,
                    channel,
                    this.client.config.discord.embed.color)
                }
            }
        } 
    }
}