import { PermissionString } from "discord.js";
export default interface ICommand {
    name: string;
    description: string;
    arguments?: string;
    example?: string;
    category?: string;
    type: "discord" | "minecraft" | "both";
    deleteMessage?: boolean;
    cooldown?: boolean;
    requirements: {
        args: {
            min: number;
            max: number;
        };
        userPermissions?: PermissionString[];
        clientPermissions?: PermissionString[];
        guildOnly: boolean;
    };
}
