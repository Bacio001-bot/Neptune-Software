import Database from "./Database";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";

class SettingsDatabase extends Database {
    constructor() {
        super();
        this.settings = new JsonDB(new Config(`${process.cwd()}/storage/settings.json`, true, true, "/"));
    };

    setChannel(field: string, channel: string): boolean {
        const data = this.settings.getData(`/channels`);
        for (let type in data) if(data[type][field] != undefined) {
            data[type][field] = channel;
            this.settings.save();
            return true;
        }
        return false;
    };

    setRole(field: string, role: string): boolean {
        const data = this.settings.getData(`/roles`);
        for (let type in data) if(data[type][field] != undefined) {
            data[type][field] = role;
            this.settings.save();
            return true;
        }
        return false;
    };

    setShield(value: string): boolean {
        const data = this.settings.getData(`/other`);
        for (let type in data) if(data[type]["shield"] != undefined) {
            data[type]["shield"] = value;
            this.settings.save();
            return true;
        }
        return false;
    };

    getChannel(findBy: string): boolean {
        const data = this.settings.getData(`/channels`);
        for (let type in data) if(data[type][findBy] != undefined) return data[type][findBy];
        return false;
    };

    getRole(findBy: string): boolean {
        const data = this.settings.getData(`/roles`);
        for (let type in data) if(data[type][findBy] != undefined) return data[type][findBy];
        return false;
    };

    isShield(): boolean {
        const data = this.settings.getData(`/other`);
        for (let type in data) if(data[type]["shield"] != undefined) return data[type]["shield"];
        return false;
    };
};

interface SettingsDatabase {
    settings: JsonDB
};

export default SettingsDatabase;