import Database from "./Database";
import { JsonDB } from "node-json-db";
declare class SettingsDatabase extends Database {
    constructor();
    setChannel(field: string, channel: string): boolean;
    setRole(field: string, role: string): boolean;
    setShield(value: string): boolean;
    getChannel(findBy: string): boolean;
    getRole(findBy: string): boolean;
}
interface SettingsDatabase {
    settings: JsonDB;
}
export default SettingsDatabase;
