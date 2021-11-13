import { PermissionString } from "discord.js";
export default interface IInteraction {
    name: string;
    description: string;
    category?: string;
    type: "discord" | "minecraft" | "both";
    requirements: {
        userPermissions?: PermissionString[];
        clientPermissions?: PermissionString[];
        guildOnly: boolean;
    };
}
