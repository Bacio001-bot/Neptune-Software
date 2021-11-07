import { 
    Client, 
    Collection, 
    GuildMember, 
    TextChannel,
    CategoryChannel,
    ThreadChannel, 
    Role, 
    Message,
    Guild,
    MessageEmbed
} from "discord.js";
import PlaceHolder from "../helpers/Placeholder";
import { load } from "js-yaml";
import fs from "fs";
import Messages from "../helpers/Messages";
import Logger from "../helpers/Logger";
import Command from "./Command";
import Event from "./Event";
import Interaction from "./Interaction";
import UsersDatabase from "../databases/Users";
import SettingsDatabase from "../databases/Settings";
import BundlesDatabase from "../databases/Bundels";
import Placeholder from "../helpers/Placeholder";


class CustomClient extends Client {
    constructor() {
        super({
            intents: [
                'GUILDS',
                'GUILD_MEMBERS',
                'GUILD_BANS',
                'GUILD_EMOJIS_AND_STICKERS',
                'GUILD_INTEGRATIONS',
                'GUILD_WEBHOOKS',
                'GUILD_INVITES',
                'GUILD_VOICE_STATES',
                'GUILD_PRESENCES',
                'GUILD_MESSAGES',
                'GUILD_MESSAGE_REACTIONS',
                'GUILD_MESSAGE_TYPING',
                'DIRECT_MESSAGES',
                'DIRECT_MESSAGE_REACTIONS',
                'DIRECT_MESSAGE_TYPING'
                
            ]
        });
        
        this.commands = new Collection();
        this.interactions = new Collection();
        this.buttons = new Collection();
        this.menus = new Collection();

        this.logger = new Logger(this);
        this.messages = new Messages(this);

        this.userdb = new UsersDatabase();
        this.bundledb = new BundlesDatabase();
        this.placeholder = new PlaceHolder(this);
        this.config = this.loadYaml(`${process.cwd()}/config/config.yml`);
        this.l = this.loadYaml(`${process.cwd()}/config/lang.yml`);
        this.cmds = this.loadYaml(`${process.cwd()}/config/commands.yml`);

        this.commandData = [];
        
        this.prefix = this.config.discord.bot.prefix;
        this.token = this.config.discord.bot.token;
        this.adminUsers = this.config.discord.bot.admin_users;

    }

    loadYaml(filePath: string): any { return load(fs.readFileSync(`${filePath}`, 'utf-8')); }

    loadCommands(): Promise<Collection<string, any>> {
        return new Promise<Collection<string, any>>((resolve, reject) => {
            const categories: string[] = [];
            fs.readdirSync(`${process.cwd()}/build/commands`).forEach(file => categories.push(file));

            categories.forEach(async (cat: string) => {
                
                fs.readdir(`${process.cwd()}/build/commands/${cat}`, async (err, files) => {
                    if (err) reject(err);

                    files.forEach(async f => {
                        if (!(f.split(".").pop() === "js") || f.endsWith("d.ts")) return;
                        const settings: Command = new (await import(`${process.cwd()}/build/commands/${cat}/${f}`)).default(this);

                        // @ts-ignore
                        const commandName = settings.help.name;
                        // @ts-ignore
                        settings.aliases = [];
                        // @ts-ignore
                        settings.permissions = [];
                        // @ts-ignore
                        settings.category =  settings.category || cat;
                        // @ts-ignore
                        if (this.cmds[commandName] && cat !== "ace") {
                            // @ts-ignore
                            if (this.cmds[commandName].permissions) this.cmds[commandName].permissions.forEach(perm => settings.permissions.push(perm));
                            // @ts-ignore
                            if (this.cmds[commandName].aliases) this.cmds[commandName].aliases.forEach(alias => settings.aliases.push(alias));
                            // @ts-ignore
                            if (this.cmds[commandName].enabled || cat === "settings") this.commands.set(commandName, settings)
                        } else this.commands.set(commandName, settings);
    
                        this.logger.logCommand(`Successfully Loaded: ${commandName}`);
                    })
                })
            })
            return resolve(this.commands);
        })
    }

    loadInteractions(): Promise<Collection<string, any>> {
        return new Promise<Collection<string, any>>((resolve, reject) => {
            const categories: string[] = [];
            fs.readdirSync(`${process.cwd()}/build/interactions/buttons`).forEach(file => categories.push(file));

            categories.forEach(async (cat: string) => {
                
                fs.readdir(`${process.cwd()}/build/interactions/buttons/${cat}`, async (err, files) => {
                    if (err) reject(err);

                    files.forEach(async f => {
                        if (!(f.split(".").pop() === "js") || f.endsWith("d.ts")) return;
                        const settings: Interaction = new (await import(`${process.cwd()}/build/interactions/buttons/${cat}/${f}`)).default(this);

                        // @ts-ignore
                        const buttonName = settings.help.name;

                        // @ts-ignore
                        settings.permissions = [];
                        // @ts-ignore
                        settings.category =  settings.category || cat;
                        // @ts-ignore
                         this.buttons.set(buttonName, settings);
                        })
                })
            })
            return resolve(this.buttons);
        })
    }

    async loadEvents(): Promise<void> {
            const eventFiles = fs.readdirSync(`${process.cwd()}/build/events/discord`).filter(file => file.endsWith('.js'));
            for (const file of eventFiles) {
                const event: Event = new (await import(`${process.cwd()}/build/events/discord/${file}`)).default(this);
                if (event.name !== undefined) {
                    // @ts-ignore
                    if (event.type === "on") this.on(event.name, (...args: any) => event._run(...args));
                    // @ts-ignore
                    else this.once(event.name, (...args: any) => event._run(...args));
                    this.logger.logEvent(`Successfully Loaded: ${event.name}`);
                }
            }

    }

    checkPermissions(command: string, message: Message): boolean {
        const cmd = this.getCommand(command) || this.getButtons(command) 

        if (!cmd) return false;

        let hasPerms: boolean = false;

        if (cmd.help.userPermissions) if (message.member?.permissions.has(cmd.help.userPermissions)) hasPerms = true;

        if (this.adminUsers && this.adminUsers.includes(message.member?.id || message.author.id)) hasPerms = true; 

        return hasPerms;
    }

    getGuild(): Guild | undefined {
        this.config = this.loadYaml(`${process.cwd()}/config/config.yml`);
        return this.guilds.cache.get(this.config.discord.bot.serverID);
    }

    getCommand(command: string): any {
        let cmd: any = this.commands.get(command);

        if (!cmd) this.commands.forEach(com => {
            if (com.help.name != undefined) if (com.aliases.includes(command)) cmd = this.commands.get(com.help.name);
        })

        return cmd;
    }

    getButtons(button: string): any {
        let btn: any = this.buttons.get(button);

        if (!btn) this.buttons.forEach(bt => {
            if (bt.help.name != undefined) btn = this.commands.get(bt.help.name);
        })

        return btn;
    }

    getCategory(find: any): CategoryChannel | null {
        const guild = this.guilds.cache.get(this.config.discord.bot.serverID);
        let ch = guild?.channels.cache.find(ch => ch.name === find && ch.type == "GUILD_CATEGORY");
        if (ch) return (ch as CategoryChannel);
        return null;
    } 

    getChannel(find: any): TextChannel | ThreadChannel | null {
        const guild = this.guilds.cache.get(this.config.discord.bot.serverID);
        let ch = guild?.channels.cache.find(ch => ch.name === find) || this.channels.cache.get(find);
        if (ch) return (ch as TextChannel);
        return null;
    } 

    getRole(find: any): Role | null {
        const guild = this.getGuild();

        let role: Role | undefined = 
        guild?.roles.cache.find(rl => rl.name.toLowerCase() === find.toLowerCase()) || 
        guild?.roles.cache.find(rl => rl.name.toLowerCase().includes(find.toLowerCase()) && rl.name.toLowerCase().startsWith(find.toLowerCase())) || 
        guild?.roles.cache.get(find);

        if (role) return role;
        return null;
    }

    getUser(find: any): GuildMember | null {
        const guild = this.getGuild();

        let member = 
        guild?.members.cache.get(find) || guild?.members.cache.find(m => m.user.username.toLowerCase().includes(find.toLowerCase())) ||
        guild?.members.cache.find(m => m.user.username.toLowerCase() === find.toLowerCase()) || 
        guild?.members.cache.find(m => m.displayName.toLowerCase() === find.toLowerCase()) ||
        guild?.members.cache.find(m => m.displayName.toLowerCase().includes(find.toLowerCase()) && m.displayName.toLowerCase().startsWith(find.toLowerCase()));

        if (member) return member;

        if (find.includes("#")) {
            let tag = find.toLowerCase().split("#");
            member = guild?.members.cache.find(m => m.user.username.toLowerCase() == tag[0] && m.user.discriminator == tag[1])      
            if (member) return member;
            return null;
        }

        return null;
    }

    start(): void {
        this.loadCommands();
        this.loadEvents();
        this.loadInteractions();
        this.login(this.token);
    }
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

}

export default CustomClient;