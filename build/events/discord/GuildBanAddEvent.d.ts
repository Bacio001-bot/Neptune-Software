import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { GuildBan } from "discord.js";
export default class GuildBanAddEvent extends Event {
    constructor(client: CustomClient);
    execute(ban: GuildBan): Promise<void>;
}
