  
import Database from "./Database";
import IUser from "../interfaces/User";
import { GuildMember } from "discord.js";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";

class UsersDatabase extends Database {
    constructor() {
        super();
        this.users = new JsonDB(new Config(`${process.cwd()}/storage/users.json`, true, true, "/"));
    };

    addUser(user: GuildMember, ign: string): Promise<boolean> {
        return new Promise((res, rej) => {
            if (this.getUser(user.id, "discordID") || this.getUser(ign, "ign") ) return rej(false);

            const userData: IUser = {
                discordID: user.id,
                discordTag: user.user.tag,
                ign: ign.toLowerCase(),
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
            };

            this.users.push("/users[]", userData, true);
            res(true);
        }) 
    }

    removeUser(findBy: string, property: string): void {
        return this.users.delete(`/users[${this.users.getIndex("/users", findBy, property)}]`);
    }

    removeAll(): void {
        Array.from(this.listUsers()).map(() => this.users.delete(`/users[${0}]`));
    }

    getUser(findBy: string, property: string): IUser | null {
        const index = this.users.getIndex("/users", findBy, property);
        if (index === -1) return null;
        return this.users.getObject<IUser>(`/users[${index}]`);
    }

    updateUser(findBy: string, property: string, field: string, value: any): void {
        const user: IUser | null = this.getUser(findBy, property);
        if (!user) return;

        if(user[field] != undefined) {
            user[field] = value;
            this.users.save();
            return;
        }

        for (let type in user) if(user[type][field] != undefined) {
            user[type][field] = value;
            this.users.save()
            return;
        }
    }

    resetUser(findBy: string, property: string): void {
        const user = this.getUser(findBy, property);
        if (!user) return;
        user["checks"]["wallChecks"] = 0;
        user["checks"]["bufferChecks"] = 0;
        user["checks"]["lastWallChecked"] = 0;
        user["checks"]["lastBufferChecked"] = 0;
        user["money"]["deposits"] = 0;
        user["money"]["withdraws"] = 0;
        user["money"]["balance"] = 0;
    }

    resetAll(): void {
        Array.from(this.listUsers()).map((user) => {
            user["checks"]["wallChecks"] = 0;
            user["checks"]["bufferChecks"] = 0;
            user["checks"]["lastWallChecked"] = 0;
            user["checks"]["lastBufferChecked"] = 0;
            user["money"]["deposits"] = 0;
            user["money"]["withdraws"] = 0;
            user["money"]["balance"] = 0;
        })
    }

    listUsers(): IUser[] {
        return this.users.getObject("/users");
    }
    
    countUsers(): number {
        return this.users.count("/users");
    }
}

interface UsersDatabase {
    users: JsonDB;
}

export default UsersDatabase;
