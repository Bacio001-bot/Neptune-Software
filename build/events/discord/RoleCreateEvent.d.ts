import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { Role } from "discord.js";
export default class RoleCreateEvent extends Event {
    constructor(client: CustomClient);
    execute(role: Role): Promise<void>;
}
