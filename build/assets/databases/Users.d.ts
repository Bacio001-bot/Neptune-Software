import Database from "./Database";
import IUser from "../interfaces/IUser";
import { GuildMember } from "discord.js";
import { JsonDB } from "node-json-db";
declare class UsersDatabase extends Database {
    constructor();
    addUser(user: GuildMember, verifycode: string): Promise<boolean>;
    removeUser(findBy: string, property: string): void;
    removeAll(): void;
    getUser(findBy: string, property: string): IUser | null;
    updateUser(findBy: string, property: string, field: string, value: any): void;
    resetUser(findBy: string, property: string): void;
    resetAll(): void;
    listUsers(): IUser[];
    countUsers(): number;
}
interface UsersDatabase {
    users: JsonDB;
}
export default UsersDatabase;
