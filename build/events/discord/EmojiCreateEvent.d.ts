import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { GuildEmoji } from "discord.js";
export default class EmojiCreateEvent extends Event {
    constructor(client: CustomClient);
    execute(emoji: GuildEmoji): Promise<void>;
}
