import Logger from "../helpers/Logger";
import UserDatabase from "../databases/Users";
import PlaceHolder from "../helpers/Placeholder";
import CustomClient from "./Client";
import Messages from "../helpers/Messages";
import SettingsDatabase from "../databases/Settings";
import { Bot } from "mineflayer";
import { ClientEventString } from "../types/ClientEvent";
import ms from "ms"
 
class Event {
    constructor(client: CustomClient, type: "on" | "once", name: ClientEventString ) {
        this.client = client;
        this.logger = this.client.logger;
        this.placeholder = this.client.placeholder
        this.messages = this.client.messages;

        this.mineflayer = this.client.config.minecraft;
        this.discord = this.client.config.discord;

        this.userdb = this.client.userdb;

        this.type = type;
        this.name = name;

        this.handlers = [];
    }

    async addHandler(name: string, filter: Function): Promise<void> {
        this.handlers.push({
            filter: filter,
            run: (await import(`../addons/${name}`)).default
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
    placeholder: PlaceHolder;
    userdb: UserDatabase;
    settingsdb: SettingsDatabase;
    messages: Messages;
    type: string;
    name: ClientEventString ;
    handlers: { filter: Function, run: Function }[];
    mineflayer: any;
    discord: any;
}

export default Event;