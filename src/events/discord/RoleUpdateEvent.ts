import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { Role } from "discord.js";

export default class RoleUpdateEvent extends Event {
    constructor(client: CustomClient) {
        super(client, "on", "roleUpdate");
    }

    async execute(oldRole: Role, newRole: Role): Promise<void> {
        if(this.client.config.logging.role.enabled) {
            let channel = this.client.getChannel(this.client.config.logging.role.channel)
            if(channel && oldRole && newRole){          
                if(oldRole.name != newRole.name) this.client.messages.roleEvent(`Role Update`,
                `**The role \`${oldRole.name}\` has been changed to \`${newRole.name}\`**`,
                newRole,
                channel,
                this.client.config.discord.embed.color)
                if(!oldRole.mentionable && newRole.mentionable || oldRole.mentionable && !newRole.mentionable) this.client.messages.roleEvent(`Role Update`,
                `**The role \`${oldRole.name}\` mentionable status has changed \`${oldRole.mentionable}\` -> \`${newRole.mentionable}\`**`,
                newRole,
                channel,
                this.client.config.discord.embed.color)
                if(!oldRole.icon && newRole.icon || oldRole.icon && !newRole.icon) this.client.messages.roleEvent(`Role Update`,
                `**The role \`${oldRole.name}\` icon has changed**`,
                newRole,
                channel,
                this.client.config.discord.embed.color)

            }
        }    
    }
}