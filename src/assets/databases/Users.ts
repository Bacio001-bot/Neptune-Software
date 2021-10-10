import Database from "./Database";
import IUser from "../interfaces/User";
import { GuildMember } from "discord.js";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";

class UsersDatabase extends Database {
    constructor() {
        super();
        this.users = new JsonDB(new Config(`${process.cwd()}/storage/users.json`, true, true, "/"));
    }

    addUser(user: GuildMember, ign: string): Promise<boolean> {
        return new Promise((res, rej) => {
            if (this.getUser(user.id) || this.getUser(ign) ) rej(false);

            const userData = {
                discordID: user.id,
                discordTag: user.user.tag,
                ign: ign,
                paypal: "none",
                rank: "recruit",
                checks: {
                    wallChecks: 0,
                    bufferChecks: 0,
                    lastWallChecked: 0,
                    lastBufferChecked: 0
                },
                money: {
                    deposits: 0,
                    withdraws: 0, 
                    balance: 0,
                }
            }

            this.users.push("/users[]", userData, true);
            res(true);
        }) 
    }

    removeUser(findBy: string) {
        const index = this.users.getIndex("/users", findBy);
        return this.users.delete(`/users[${index}]`);
    }

    getUser(findBy: string): number {
        const index = this.users.getIndex("/users", findBy);
        return this.users.getData(`/users[${index}]`);
    }

    updateUser(user: GuildMember | string, field: string, value: any) {
        
    }

    resetUser() {
        
    }

    resetAll() {
        
    }

    listUsers(): Array<IUser> {
        return this.users.getData("/users");
    }
    
    countUsers(): number {
        return this.users.count("/users");
    }
}

interface UsersDatabase {
    users: JsonDB;
}

export default UsersDatabase;