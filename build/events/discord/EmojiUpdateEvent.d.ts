import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { GuildEmoji } from "discord.js";
export default class EmojiUpdateEvent extends Event {
    constructor(client: CustomClient);
    execute(oldEmoji: GuildEmoji, newEmoji: GuildEmoji): Promise<void>;
}
