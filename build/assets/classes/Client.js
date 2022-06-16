"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Placeholder_1 = __importDefault(require("../helpers/Placeholder"));
const js_yaml_1 = require("js-yaml");
const fs_1 = __importDefault(require("fs"));
const Messages_1 = __importDefault(require("../helpers/Messages"));
const Logger_1 = __importDefault(require("../helpers/Logger"));
const Users_1 = __importDefault(require("../databases/Users"));
const Bundels_1 = __importDefault(require("../databases/Bundels"));
const Poll_1 = __importDefault(require("../databases/Poll"));
const Giveaway_1 = __importDefault(require("../databases/Giveaway"));
class CustomClient extends discord_js_1.Client {
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
        this.commands = new discord_js_1.Collection();
        this.interactions = new discord_js_1.Collection();
        this.buttons = new discord_js_1.Collection();
        this.menus = new discord_js_1.Collection();
        this.logger = new Logger_1.default(this);
        this.messages = new Messages_1.default(this);
        this.giveawaydb = new Giveaway_1.default();
        this.polldb = new Poll_1.default();
        this.userdb = new Users_1.default();
        this.bundledb = new Bundels_1.default();
        this.placeholder = new Placeholder_1.default(this);
        this.config = this.loadYaml(`${process.cwd()}/config/config.yml`);
        this.l = this.loadYaml(`${process.cwd()}/config/lang.yml`);
        this.cmds = this.loadYaml(`${process.cwd()}/config/commands.yml`);
        this.commandData = [];
        this.prefix = this.config.discord.bot.prefix;
        this.token = this.config.discord.bot.token;
        this.adminUsers = this.config.discord.bot.admin_users;
    }
    loadYaml(filePath) { return (0, js_yaml_1.load)(fs_1.default.readFileSync(`${filePath}`, 'utf-8')); }
    loadCommands() {
        return new Promise((resolve, reject) => {
            const categories = [];
            fs_1.default.readdirSync(`${process.cwd()}/build/commands`).forEach(file => categories.push(file));
            categories.forEach(async (cat) => {
                fs_1.default.readdir(`${process.cwd()}/build/commands/${cat}`, async (err, files) => {
                    if (err)
                        reject(err);
                    files.forEach(async (f) => {
                        if (!(f.split(".").pop() === "js") || f.endsWith("d.ts"))
                            return;
                        const settings = new (await Promise.resolve().then(() => __importStar(require(`${process.cwd()}/build/commands/${cat}/${f}`)))).default(this);
                        // @ts-ignore
                        const commandName = settings.help.name;
                        // @ts-ignore
                        settings.aliases = [];
                        // @ts-ignore
                        settings.permissions = [];
                        // @ts-ignore
                        settings.category = settings.category || cat;
                        // @ts-ignore
                        if (this.cmds[commandName] && cat !== "ace") {
                            // @ts-ignore
                            if (this.cmds[commandName].permissions)
                                this.cmds[commandName].permissions.forEach(perm => settings.permissions.push(perm));
                            // @ts-ignore
                            if (this.cmds[commandName].aliases)
                                this.cmds[commandName].aliases.forEach(alias => settings.aliases.push(alias));
                            // @ts-ignore
                            if (this.cmds[commandName].enabled || cat === "settings")
                                this.commands.set(commandName, settings);
                        }
                        else
                            this.commands.set(commandName, settings);
                        this.logger.logCommand(`Successfully Loaded: ${commandName}`);
                    });
                });
            });
            return resolve(this.commands);
        });
    }
    loadInteractions() {
        return new Promise((resolve, reject) => {
            const categories = [];
            fs_1.default.readdirSync(`${process.cwd()}/build/interactions/buttons`).forEach(file => categories.push(file));
            categories.forEach(async (cat) => {
                fs_1.default.readdir(`${process.cwd()}/build/interactions/buttons/${cat}`, async (err, files) => {
                    if (err)
                        reject(err);
                    files.forEach(async (f) => {
                        if (!(f.split(".").pop() === "js") || f.endsWith("d.ts"))
                            return;
                        const settings = new (await Promise.resolve().then(() => __importStar(require(`${process.cwd()}/build/interactions/buttons/${cat}/${f}`)))).default(this);
                        // @ts-ignore
                        const buttonName = settings.help.name;
                        // @ts-ignore
                        settings.permissions = [];
                        // @ts-ignore
                        settings.category = settings.category || cat;
                        // @ts-ignore
                        this.buttons.set(buttonName, settings);
                    });
                });
            });
            return resolve(this.buttons);
        });
    }
    async loadEvents() {
        const eventFiles = fs_1.default.readdirSync(`${process.cwd()}/build/events/discord`).filter(file => file.endsWith('.js'));
        for (const file of eventFiles) {
            const event = new (await Promise.resolve().then(() => __importStar(require(`${process.cwd()}/build/events/discord/${file}`)))).default(this);
            if (event.name !== undefined) {
                // @ts-ignore
                if (event.type === "on")
                    this.on(event.name, (...args) => event._run(...args));
                // @ts-ignore
                else
                    this.once(event.name, (...args) => event._run(...args));
                this.logger.logEvent(`Successfully Loaded: ${event.name}`);
            }
        }
    }
    checkPermissions(command, message) {
        var _a, _b;
        const cmd = this.getCommand(command) || this.getButtons(command);
        if (!cmd)
            return false;
        let hasPerms = false;
        if (cmd.help.userPermissions)
            if ((_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has(cmd.help.userPermissions))
                hasPerms = true;
        if (this.adminUsers && this.adminUsers.includes(((_b = message.member) === null || _b === void 0 ? void 0 : _b.id) || message.author.id))
            hasPerms = true;
        return hasPerms;
    }
    getGuild() {
        this.config = this.loadYaml(`${process.cwd()}/config/config.yml`);
        return this.guilds.cache.get(this.config.discord.bot.serverID);
    }
    getCommand(command) {
        let cmd = this.commands.get(command);
        if (!cmd)
            this.commands.forEach(com => {
                if (com.help.name != undefined)
                    if (com.aliases.includes(command))
                        cmd = this.commands.get(com.help.name);
            });
        return cmd;
    }
    getButtons(button) {
        let btn = this.buttons.get(button);
        if (!btn)
            this.buttons.forEach(bt => {
                if (bt.help.name != undefined)
                    btn = this.buttons.get(bt.help.name);
            });
        return btn;
    }
    getCategory(find) {
        const guild = this.guilds.cache.get(this.config.discord.bot.serverID);
        let ch = (guild === null || guild === void 0 ? void 0 : guild.channels.cache.find(ch => ch.name === find && ch.type == "GUILD_CATEGORY")) || (guild === null || guild === void 0 ? void 0 : guild.channels.cache.find(ch => ch.id === find && ch.type == "GUILD_CATEGORY"));
        if (ch)
            return ch;
        return null;
    }
    getChannel(find) {
        try {
            const guild = this.guilds.cache.get(this.config.discord.bot.serverID);
            if (find.includes('<#') && find.includes('>')) {
                find = find.replace('<#', '');
                find = find.replace('>', '');
            }
            let ch = (guild === null || guild === void 0 ? void 0 : guild.channels.cache.find(ch => ch.name === find)) || this.channels.cache.get(find);
            if (ch)
                return ch;
            return null;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
    getRole(find) {
        const guild = this.getGuild();
        let role = (guild === null || guild === void 0 ? void 0 : guild.roles.cache.find(rl => rl.name.toLowerCase() === find.toLowerCase())) ||
            (guild === null || guild === void 0 ? void 0 : guild.roles.cache.find(rl => rl.name.toLowerCase().includes(find.toLowerCase()) && rl.name.toLowerCase().startsWith(find.toLowerCase()))) ||
            (guild === null || guild === void 0 ? void 0 : guild.roles.cache.get(find));
        if (role)
            return role;
        return null;
    }
    getUser(find) {
        const guild = this.getGuild();
        let member = (guild === null || guild === void 0 ? void 0 : guild.members.cache.get(find)) || (guild === null || guild === void 0 ? void 0 : guild.members.cache.find(m => m.user.username.toLowerCase().includes(find.toLowerCase()))) ||
            (guild === null || guild === void 0 ? void 0 : guild.members.cache.find(m => m.user.username.toLowerCase() === find.toLowerCase())) ||
            (guild === null || guild === void 0 ? void 0 : guild.members.cache.find(m => m.displayName.toLowerCase() === find.toLowerCase())) ||
            (guild === null || guild === void 0 ? void 0 : guild.members.cache.find(m => m.displayName.toLowerCase().includes(find.toLowerCase()) && m.displayName.toLowerCase().startsWith(find.toLowerCase())));
        if (member)
            return member;
        if (find.includes("#")) {
            let tag = find.toLowerCase().split("#");
            member = guild === null || guild === void 0 ? void 0 : guild.members.cache.find(m => m.user.username.toLowerCase() == tag[0] && m.user.discriminator == tag[1]);
            if (member)
                return member;
            return null;
        }
        return null;
    }
    async start() {
        
        this.loadCommands();
        this.loadEvents();
        this.loadInteractions();
        this.login(this.token);

    }
}
exports.default = CustomClient;
