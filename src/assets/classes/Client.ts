import { 
    Client, 
    Collection, 
    GuildMember, 
    Channel, 
    ThreadChannel, 
    Role 
} from "discord.js";
import { load } from "js-yaml";
import fs from "fs";
import Command from "./Command";
import Event from "./Event";
import Interaction from "./Interaction";

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

        this.config = this.loadYaml("../../../config/config");
        this.l = this.loadYaml("../../../config/lang");
        this.cmds = this.loadYaml("../../../config/commands");
        
        this.prefix = this.config.bot.prefix;
    }

    loadYaml(filePath: string): any { return load(fs.readFileSync(`${filePath}`, 'utf-8')); }

    loadInteractions(): void {
        const categories: any = [];
        fs.readdirSync(`${process.cwd()}/build/interactions`).forEach(file => categories.push(file));

        for (const cat in categories) {
            fs.readdir(`${process.cwd()}/build/interactions/${cat}`, async (err, interactionFiles) => {
                if (err) throw err;

                interactionFiles.forEach(async f => {
                    if (!(f.split(".").pop() === "js")) return;

                    const settings: Interaction = (await import(`${process.cwd()}/build/interactions/${cat}/${f}`)).default;
                    const interactionName = f.split(".")[0];

                    // @ts-ignore
                    settings.name = interactionName;

                    // @ts-ignore
                    this.interactions.set(`${cat}/${interactionName}`, settings);
                    
                })

            })
        }

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

    loadCommands(): void {
        const categories: any = [];
        fs.readdirSync(`${process.cwd()}/build/commands`).forEach(file => categories.push(file));

        for (const cat in categories) {
            fs.readdir(`${process.cwd()}/build/commands/${cat}`, async (err, commandFiles) => {
                if (err) throw err;

                commandFiles.forEach(async f => {
                    if (!(f.split(".").pop() === "js")) return;

                    const imported = await import(`${process.cwd()}/build/commands/${cat}/${f}`);
                    const settings: Command = imported.default();
                    const commandName = f.split(".")[0];

                    // @ts-ignore
                    settings.aliases = [];
                    // @ts-ignore
                    settings.permissions = [];
                    // @ts-ignore
                    settings.name = commandName;
                    // @ts-ignore
                    settings.category =  settings.category || cat;

                    // @ts-ignore
                    if (this.cmds[commandName] && cat !== "xenon") {
                        // @ts-ignore
                        if (this.cmds[commandName].permissions) this.cmds[commandName].permissions.forEach(perm => settings.permissions.push(perm));
                        // @ts-ignore
                        if (this.cmds[commandName].aliases) this.cmds[commandName].aliases.forEach(alias => settings.aliases.push(alias));
                        // @ts-ignore
                        if (this.cmds[commandName].enabled === true || cat === "setings") this.commands.set(commandName, settings);
                    } else this.commands.set(commandName, settings);
                    
                })

            })
        }
    }

    async loadEvents(): Promise<void> {
        const eventFiles = fs.readdirSync(`${process.cwd()}/build/events`).filter(file => file.endsWith('.js'));
        for (const file of eventFiles) {
            const event: Event = (await import(`${process.cwd()}/build/events/${file}`)).default
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
    commands: Collection<string, any>;
    interactions: Collection<string, any>;
    prefix: string;
}

export default CustomClient;
