import Database from "./Database";
import { GuildChannel, Role } from "discord.js";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";

class SettingsDatabase extends Database {
    constructor() {
        super();
        this.settings = new JsonDB(new Config(`${process.cwd()}/storage/settings.json`, true, true, "/"));
    };

    setChannel(field: string, channel: GuildChannel | string) {
        let channelID: string;
        //@ts-ignore
        if(channel.id) channelID = channel.id;
        //@ts-ignore
        else channelID = channel;

    }

    setRole(field: string, role: Role | string) {
        let roleID: string;
        //@ts-ignore
        if(role.id) roleID = role.id;
        //@ts-ignore
        else roleID = role;
    }

    setShield(value: boolean) {
        //could change value to a string and use on/off or whatever
    }

    getChannel(findBy: string) {

    }

    getRole(findBy: string) {

    }

    isShield() {
        
    }
}

interface SettingsDatabase {
    settings: JsonDB
}

export default SettingsDatabase;