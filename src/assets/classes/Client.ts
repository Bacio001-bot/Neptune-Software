import { 
    Client, 
    Collection, 
    GuildMember, 
    Channel, 
    ThreadChannel, 
    Role, 
    Message
} from "discord.js";
import { JsonDB } from "node-json-db";
import { createBot, Bot } from "mineflayer";
import { load } from "js-yaml";
import fs from "fs";
import Messages from "../helpers/Messages";
import Logger from "../helpers/Logger";
import Command from "./Command";
import Event from "./Event";
import Interaction from "./Interaction";
import UsersDatabase from "../databases/Users";

class CustomClient extends Client {
    constructor() {
        super({
            intents: [
                "DIRECT_MESSAGES",
                "GUILDS",
                "GUILD_MEMBERS",
                "GUILD_MESSAGES",
                "GUILD_PRESENCES",
                "GUILD_BANS",
                "GUILD_MESSAGE_REACTIONS",
                "DIRECT_MESSAGE_REACTIONS",
                "GUILD_MESSAGE_TYPING",
                "GUILD_WEBHOOKS",
                "GUILD_INTEGRATIONS",
                "GUILD_PRESENCES",
                "GUILD_INVITES"
            ]
        });
        
        this.commands = new Collection();
        this.interactions = new Collection();

        this.logger = new Logger(this);
        this.messages = new Messages(this);

        this.config = this.loadYaml(`${process.cwd()}/config/config.yml`);
        this.l = this.loadYaml(`${process.cwd()}/config/lang.yml`);
        this.cmds = this.loadYaml(`${process.cwd()}/config/commands.yml`);

        this.mineflayer = this.config.mineflayer;

        this.userdb = new UsersDatabase();
        
        this.prefix = this.config.discord.bot.prefix;
        this.token = this.config.discord.bot.token;
        this.adminUsers = this.config.discord.bot.admin_users;

        const auth = this.config.minecraft.bot.auth;

        this.bot = createBot({
            host: this.config.minecraft.bot.server_ip,
            port: 25565,
            username: this.config.minecraft.bot.username,
            password: this.config.minecraft.bot.password,
            auth: (auth !== "microsoft" && auth !== "mojang") ? "mojang" : "mojang",
            version: "1.8.8"
        })
    }

    loadYaml(filePath: string): any { return load(fs.readFileSync(`${filePath}`, 'utf-8')); }

    loadInteractions(): void {
        const categories: any = [];
        fs.readdirSync(`${process.cwd()}/build/interactions`).forEach(file => categories.push(file));

        categories.forEach(async cat => { 
            fs.readdir(`${process.cwd()}/build/interactions/${cat}`, async (err, interactionFiles) => {
                if (err) throw err;

                interactionFiles.forEach(async f => {
                    if (!(f.split(".").pop() === "js")) return;

                    const settings: Interaction = new (await import(`${process.cwd()}/build/interactions/${cat}/${f}`)).default();
                    const interactionName = f.split(".")[0];

                    // @ts-ignore
                    settings.name = interactionName;

                    // @ts-ignore
                    this.interactions.set(`${cat}/${interactionName}`, settings);
                    
                })

            })
        })

        this.on("interactionCreate", async (interaction) => {
            if (interaction.isButton()) {
                const module = this.interactions.get(interaction.customId);
                if (!module) return;

                try { await module.execute(interaction) } catch (e) { console.log(e) }
            }

            if (interaction.isSelectMenu()) {
                const value = interaction.values.toString();
                const module = this.interactions.get(value);
                if (!module) return;

                try { await module.execute(interaction) } catch (e) { console.log(e) }
            }
        })
    }

    loadCommands(): Promise<Collection<string, any>> {
        return new Promise<Collection<string, any>>((resolve, reject) => {
            const categories: string[] = [];
            fs.readdirSync(`${process.cwd()}/build/commands`).forEach(file => categories.push(file));

            categories.forEach(async (cat: string) => {
                
                fs.readdir(`${process.cwd()}/build/commands/${cat}`, async (err, files) => {
                    if (err) throw err;

                    files.forEach(async f => {
                        if (!(f.split(".").pop() === "js") || f.endsWith("d.ts")) return;
                        const settings: Command = new (await import(`${process.cwd()}/build/commands/${cat}/${f}`)).default(this, this.bot);
    
                        // @ts-ignore
                        const commandName = settings.help.name;
                        // @ts-ignore
                        settings.aliases = [];
                        // @ts-ignore
                        settings.permissions = [];
                        // @ts-ignore
                        settings.category =  settings.category || cat;
                        // @ts-ignore
                        if (this.cmds[commandName] && cat !== "xenon") {
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

    async loadEvents(type: "discord" | "mineflayer"): Promise<void> {
        if (type === "discord") {
            const eventFiles = fs.readdirSync(`${process.cwd()}/build/events/discord`).filter(file => file.endsWith('.js'));
            for (const file of eventFiles) {
                const event: Event = new (await import(`${process.cwd()}/build/events/discord/${file}`)).default(this, this.bot);
                if (event.name !== undefined) {
                    // @ts-ignore
                    if (event.type === "on") this.on(event.name, (...args: any) => event._run(...args));
                    // @ts-ignore
                    else this.once(event.name, (...args: any) => event._run(...args));
                    this.logger.logEvent(`Successfully Loaded: ${event.name}`);
                }
            }
        } else {
            const eventFiles = fs.readdirSync(`${process.cwd()}/build/events/mineflayer/`).filter(file => file.endsWith('.js'));
            for (const file of eventFiles) {
                const event: Event = new (await import(`${process.cwd()}/build/events/mineflayer/${file}`)).default(this, this.bot);
                if (event.name !== undefined) {
                    // @ts-ignore
                    if (event.type === "on") this.bot.on(event.name, (...args: any) => event._run(...args));
                    // @ts-ignore
                    else this.bot.once(event.name, (...args: any) => event._run(...args));
                    this.logger.logEvent(`Successfully Loaded: ${event.name}`);
                }
            }
        }
    }

    checkPermissions(command: string, message: Message): boolean {
        const cmd = this.getCommand(command);
        const settings = this.cmds[cmd.help.name];

        if (!cmd) return false;

        const roles: any = [];

        let hasPerms: boolean = false;

        if (!settings) roles.push(this.getRole("@everyone"));
        else if (settings.permissions) { 
            settings.permissions.forEach(role => {
                if (!this.getRole(role)) return;
                roles.push(this.getRole(role));
            })
        } else roles.push(this.getRole("@everyone"));

        roles.forEach(role => {
            if (message.member?.roles.cache.find(r => r.id === role.id)) hasPerms = true
        })

        if (this.adminUsers && this.adminUsers.includes(message.author.id)) hasPerms = true; 

        return hasPerms;
    }

    getCommand(command: string): any {
        let cmd: any = this.commands.get(command);

        if (!command) this.commands.forEach(com => {
            if (com.help.name != undefined) if (com.aliases.includes(command)) cmd = this.commands.get(com.help.name);
        })

        return cmd;
    }

    getChannel(find: any): Channel | ThreadChannel | null {
        const guild = this.guilds.cache.get(this.config.discord.bot.serverID);
        let ch = guild?.channels.cache.find(ch => ch.name === find) || this.channels.cache.get(find);
        if (ch) return ch;
        return null;
    } 

    getRole(find: any): Role | null {
        const guild = this.guilds.cache.get(this.config.discord.bot.serverID);

        let role: Role | undefined = 
        guild?.roles.cache.find(rl => rl.name.toLowerCase() === find.toLowerCase()) || 
        guild?.roles.cache.find(rl => rl.name.toLowerCase().includes(find.toLowerCase()) && rl.name.toLowerCase().startsWith(find.toLowerCase())) || 
        guild?.roles.cache.get(find);

        if (role) return role;
        return null;
    }

    getUser(find: any): GuildMember | null {
        const guild = this.guilds.cache.get(this.config.discord.bot.serverID);

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
        this.loadCommands()
        this.loadEvents("discord");
        this.loadEvents("mineflayer");
        this.login(this.token);
    }
}

interface CustomClient {
    bot: Bot;
    logger: Logger;
    messages: Messages;
    commands: Collection<string, any>;
    interactions: Collection<string, any>;
    userdb: UsersDatabase;
    prefix: string;
    token: string;
    adminUsers: string[] | null;
    mineflayer: any;
    config: any;
    l: any;
    cmds: any;
}

export default CustomClient;
