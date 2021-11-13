import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { Guild } from "discord.js";
export default class GuildUpdateEvent extends Event {
    constructor(client: CustomClient);
    execute(oldGuild: Guild, newGuild: Guild): Promise<void>;
}
