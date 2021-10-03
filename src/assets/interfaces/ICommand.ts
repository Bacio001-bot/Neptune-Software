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
        args: { min: number, max: number };
        userPermissions?: PermissionString[];
        clientPermissions?: PermissionString[];
        guildOnly: boolean;
    }
}