import { load } from "js-yaml";
import fs from "fs";
import Event from "./Event";
import { 
    Client, 
    Collection, 
    GuildMember, 
    Channel, 
    ThreadChannel, 
    Role 
} from "discord.js";

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

        this.config = this.loadYaml("../../../config/config");
        this.l = this.loadYaml("../../../config/lang");
        this.cmds = this.loadYaml("../../../config/commands");
        
        this.prefix = this.config.bot.prefix;
    }

    loadYaml(filePath: string): any { return load(fs.readFileSync(`${filePath}`, 'utf-8')); }

    loadCommands(): void {

    }

    async loadEvents(): Promise<void> {
        const eventFiles = fs.readdirSync(`${process.cwd()}/events`).filter(file => file.endsWith('.js'));
        for (const file of eventFiles) {
            const event: Event = (await import(`../../events/${file}`)).default()
            this.on(file.split(".")[0], (...args: any) => event.execute(...args));
        }
    }

    getChannel(find: string): Channel | ThreadChannel | null {
        const guild = this.guilds.cache.get(this.config.bot.serverID);
        let ch = guild?.channels.cache.find(ch => ch.name === find) || this.channels.cache.get(find);
        if (ch) return ch;
        return null;
    } 

    getRole(find: string): Role | null {
        const guild = this.guilds.cache.get(this.config.bot.serverID);

        let role: Role | undefined = 
        guild?.roles.cache.find(rl => rl.name.toLowerCase() === find.toLowerCase()) || 
        guild?.roles.cache.find(rl => rl.name.toLowerCase().includes(find.toLowerCase()) && rl.name.toLowerCase().startsWith(find.toLowerCase())) || 
        guild?.roles.cache.get(find);

        if (role) return role;
        return null;
    }

    getUser(find: string): GuildMember | null {
        const guild = this.guilds.cache.get(this.config.bot.serverID);

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
        this.loadEvents();
        this.loadCommands();

        this.login(this.config.bot.token); 
    }
}

interface CustomClient {
    config: any;
    l: any;
    cmds: any;
    commands: any;
    prefix: string;
}

export default CustomClient;
