import Logger from "../helpers/Logger";
import UserDatabase from "../databases/Users";
import CustomClient from "./Client";
import SettingsDatabase from "../databases/Settings";
import { Bot } from "mineflayer";
import { ClientEventString, BotEventString } from "../interfaces/Types";
 
class Event {
    constructor(client: CustomClient, bot: Bot, type: "on" | "once", name: ClientEventString | BotEventString) {
        this.client = client;
        this.bot = bot;
        this.logger = this.client.logger;

        this.mineflayer = this.client.config.minecraft;
        this.discord = this.client.config.discord;

        this.userdb = this.client.userdb;
        this.settingsdb = this.client.settingsdb;

        this.type = type;
        this.name = name;

        this.handlers = [];
    }

    async addHandler(name: string, filter: Function): Promise<void> {
        this.handlers.push({
            filter: filter,
            run: (await import(`../handlers/${name}`)).default
        })
        return;
    }

    _run(...args: any): void {
        for (let handler of this.handlers) if (handler.filter(...args)) handler.run(this.client, this.bot, ...args);
        // @ts-ignore
        this.execute(...args);
    }

}

interface Event {
    client: CustomClient;
    bot: Bot;
    logger: Logger;
    userdb: UserDatabase;
    settingsdb: SettingsDatabase;
    type: string;
    name: string;
    handlers: { filter: Function, run: Function }[];
    mineflayer: any;
    discord: any;
}

export default Event;