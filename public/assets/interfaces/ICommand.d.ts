import { PermissionString } from "discord.js";
export interface ICommand {
    name: string;
    description: string;
    arguments?: string;
    example?: string;
    category?: string;
    deleteMessage?: boolean;
    cooldown?: boolean;
    requirements: {
        guildOnly: boolean;
        minimumArguments: number;
        permissions?: PermissionString[];
    };
}
