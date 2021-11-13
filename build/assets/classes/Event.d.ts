import Logger from "../helpers/Logger";
import UserDatabase from "../databases/Users";
import PlaceHolder from "../helpers/Placeholder";
import CustomClient from "./Client";
import Messages from "../helpers/Messages";
import SettingsDatabase from "../databases/Settings";
import { Bot } from "mineflayer";
import { ClientEventString } from "../types/ClientEvent";
declare class Event {
    constructor(client: CustomClient, type: "on" | "once", name: ClientEventString);
    addHandler(name: string, filter: Function): Promise<void>;
    _run(...args: any): void;
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
    name: ClientEventString;
    handlers: {
        filter: Function;
        run: Function;
    }[];
    mineflayer: any;
    discord: any;
}
export default Event;
