import { Client, GuildMember, Channel, ThreadChannel, Role } from "discord.js";
export declare class CustomClient extends Client {
    commands: any;
    config: any;
    constructor();
    loadYaml(filePath: string): any;
    loadCommands(): void;
    loadEvents(): Promise<void>;
    getChannel(find: string): Channel | ThreadChannel | null;
    getRole(find: string): Role | null;
    getUser(find: string): GuildMember | null;
    start(): void;
}
