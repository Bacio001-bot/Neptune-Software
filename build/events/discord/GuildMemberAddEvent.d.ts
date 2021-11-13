import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { GuildMember } from "discord.js";
export default class GuildMemberAddEvent extends Event {
    constructor(client: CustomClient);
    execute(member: GuildMember): Promise<void>;
}
