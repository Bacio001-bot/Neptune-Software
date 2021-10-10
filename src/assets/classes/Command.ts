import { User } from "discord.js";
import { Bot } from "mineflayer";
import Logger from "../helpers/Logger";
import Messages from "../helpers/Messages";
import CustomClient from "./Client";
import UserDatabase from "../databases/Users";
import ICommand from "../interfaces/Command";
import SettingsDatabase from "../databases/Settings";
 
class Command {
    client: CustomClient;
    bot: Bot;
    logger: Logger;
    messages: Messages;
    userdb: UserDatabase;
    settingsdb: SettingsDatabase;
    help: object;
    ranMessage: string;
    cooldown: Set<string>;

    constructor(client: CustomClient, bot: Bot, options: ICommand) {
        this.client = client;
        this.bot = bot;

        this.logger = this.client.logger;
        this.messages = this.client.messages;

        this.userdb = this.client.userdb;
        this.settingsdb = this.client.settingsdb;

        this.ranMessage = "";
        
        this.help = {
            name: options.name,
            description: options.description,
            arguments: options.arguments || "None",
            example: options.example || options.name,
            category: options.category || "xenon",
            deleteMessage: options.deleteMessage || false,
            guildOnly: options.requirements.guildOnly,
            reqArgs: options.requirements.args,
            userPermissions: options.requirements.userPermissions || ["SEND_MESSAGES"],
            clientPermissions: options.requirements.clientPermissions || ["SEND_MESSAGES"]
        }

        this.cooldown = new Set();

    }

    startCooldown(user: User): void {
        const time = parseInt(this.client.config.bot.cooldown);
        if (time <= 0) return;

        this.cooldown.add(user.id);
        setTimeout(() => this.cooldown.delete(user.id), time)
    }

    setMessage(message: string): string {
        return this.ranMessage = message;
    }
    
    getMessage(): string {
        return this.ranMessage;
    }
}

export default Command;
