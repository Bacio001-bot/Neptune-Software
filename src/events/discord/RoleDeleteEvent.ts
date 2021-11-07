import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { Role } from "discord.js";

export default class RoleDeleteEvent extends Event {
    constructor(client: CustomClient) {
        super(client, "on", "roleDelete");
    }

    async execute(role: Role): Promise<void> {
        if(this.client.config.logging.role.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.role.channel)
            if(channel && role){            
                 this.client.messages.roleEvent(`Role Delete`,
                 `**The role \`${role.name}\` has been deleted**`,
                role,
                channel,
                "RED")
            }
        }    
    }
}