import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { Role } from "discord.js";

export default class RoleCreateEvent extends Event {
    constructor(client: CustomClient) {
        super(client, "on", "roleCreate");
    }

    async execute(role: Role): Promise<void> {
        if(this.client.config.logging.role.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.role.channel)
            if(channel && role){          
                this.client.messages.roleEvent(`Role Create`,
                `**The role \`${role.name}\` has been created**`,
                role,
                channel,
                "GREEN")
            }
        }    
    }
}