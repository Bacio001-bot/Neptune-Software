import { User } from "discord.js";
import Logger from "../helpers/Logger";
import Messages from "../helpers/Messages";
import CustomClient from "./Client";
import UserDatabase from "../databases/Users";
import ICommand from "../interfaces/ICommand";
import SettingsDatabase from "../databases/Settings";
import BundlesDatabase from "../databases/Bundels";
import PollsDatabase from "../databases/Poll";
declare class Command {
    constructor(client: CustomClient, options: ICommand);
    startCooldown(user: User): void;
}
interface Command {
    client: CustomClient;
    logger: Logger;
    messages: Messages;
    userdb: UserDatabase;
    settingsdb: SettingsDatabase;
    help: object;
    ranMessage: string;
    username: string;
    cooldown: Set<string>;
    bundledb: BundlesDatabase;
    polldb: PollsDatabase;
}
export default Command;
