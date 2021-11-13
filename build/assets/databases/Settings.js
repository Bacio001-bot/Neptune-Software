"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("./Database"));
const node_json_db_1 = require("node-json-db");
const JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
class SettingsDatabase extends Database_1.default {
    constructor() {
        super();
        this.settings = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config(`${process.cwd()}/storage/settings.json`, true, true, "/"));
    }
    ;
    setChannel(field, channel) {
        const data = this.settings.getData(`/channels`);
        for (let type in data)
            if (data[type][field] != undefined) {
                data[type][field] = channel;
                this.settings.save();
                return true;
            }
        return false;
    }
    ;
    setRole(field, role) {
        const data = this.settings.getData(`/roles`);
        for (let type in data)
            if (data[type][field] != undefined) {
                data[type][field] = role;
                this.settings.save();
                return true;
            }
        return false;
    }
    ;
    setShield(value) {
        const data = this.settings.getData(`/other`);
        for (let type in data)
            if (data[type]["shield"] != undefined) {
                data[type]["shield"] = value;
                this.settings.save();
                return true;
            }
        return false;
    }
    ;
    getChannel(findBy) {
        const data = this.settings.getData(`/channels`);
        for (let type in data)
            if (data[type][findBy] != undefined)
                return data[type][findBy];
        return false;
    }
    ;
    getRole(findBy) {
        const data = this.settings.getData(`/roles`);
        for (let type in data)
            if (data[type][findBy] != undefined)
                return data[type][findBy];
        return false;
    }
    ;
}
;
;
exports.default = SettingsDatabase;
