import { Client, Collection, GuildMember, TextChannel, CategoryChannel, ThreadChannel, Role, Message, Guild, MessageEmbed } from "discord.js";
import PlaceHolder from "../helpers/Placeholder";
import Messages from "../helpers/Messages";
import Logger from "../helpers/Logger";
import UsersDatabase from "../databases/Users";
import SettingsDatabase from "../databases/Settings";
import BundlesDatabase from "../databases/Bundels";
import PollsDatabase from "../databases/Poll";
declare class CustomClient extends Client {
    constructor();
    loadYaml(filePath: string): any;
    loadCommands(): Promise<Collection<string, any>>;
    loadInteractions(): Promise<Collection<string, any>>;
    loadEvents(): Promise<void>;
    checkPermissions(command: string, message: Message): boolean;
    getGuild(): Guild | undefined;
    getCommand(command: string): any;
    getButtons(button: string): any;
    getCategory(find: any): CategoryChannel | null;
    getChannel(find: any): TextChannel | ThreadChannel | null;
    getRole(find: any): Role | null;
    getUser(find: any): GuildMember | null;
    start(): void;
}
interface CustomClient {
    logger: Logger;
    messages: Messages;
    commands: Collection<string, any>;
    buttons: Collection<string, any>;
    menus: Collection<string, any>;
    interactions: Collection<string, any>;
    userdb: UsersDatabase;
    settingsdb: SettingsDatabase;
    embed: MessageEmbed;
    placeholder: PlaceHolder;
    replace: (message: string, user: GuildMember | null, author: GuildMember | null, player: string | null) => string;
    prefix: string;
    token: string;
    commandData: string[];
    commandExecuted: boolean;
    adminUsers: string[] | null;
    mineflayer: any;
    config: any;
    l: any;
    cmds: any;
    bundledb: BundlesDatabase;
    polldb: PollsDatabase;
}
export default CustomClient;
