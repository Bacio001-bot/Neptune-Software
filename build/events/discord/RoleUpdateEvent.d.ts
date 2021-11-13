import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { Role } from "discord.js";
export default class RoleUpdateEvent extends Event {
    constructor(client: CustomClient);
    execute(oldRole: Role, newRole: Role): Promise<void>;
}
