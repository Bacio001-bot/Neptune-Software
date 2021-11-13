import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { GuildMember } from "discord.js";
export default class GuildMemberUpdateEvent extends Event {
    constructor(client: CustomClient);
    execute(oldMember: GuildMember, newMember: GuildMember): Promise<void>;
}
