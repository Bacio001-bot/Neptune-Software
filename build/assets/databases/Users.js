"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("./Database"));
const node_json_db_1 = require("node-json-db");
const JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
class UsersDatabase extends Database_1.default {
    constructor() {
        super();
        this.users = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config(`${process.cwd()}/storage/users.json`, true, true, "/"));
    }
    addUser(user, verifycode) {
        return new Promise((res, rej) => {
            if (this.getUser(user.id, "discordID"))
                return rej(false);
            const userData = {
                discordID: user.id,
                discordName: user.user.username,
                verifyCode: verifycode,
                tickets: {
                    openTickets: 0,
                    closedTickets: 0,
                },
                messages: {
                    everyone: 0,
                    replies: 0,
                    tts: 0,
                    total: 0,
                },
            };
            this.users.push("/users[]", userData, true);
            res(true);
        });
    }
    removeUser(findBy, property) {
        try {
            return this.users.delete(`/users[${this.users.getIndex("/users", findBy, property)}]`);
        }
        catch (err) {
            console.log(err);
        }
    }
    removeAll() {
        try {
            Array.from(this.listUsers()).map(() => this.users.delete(`/users[${0}]`));
        }
        catch (err) {
            console.log(err);
        }
    }
    getUser(findBy, property) {
        const index = this.users.getIndex("/users", findBy, property);
        if (index === -1)
            return null;
        return this.users.getObject(`/users[${index}]`);
    }
    updateUser(findBy, property, field, value) {
        try {
            const user = this.getUser(findBy, property);
            if (!user)
                return;
            if (user[field] != undefined) {
                user[field] = value;
                this.users.save();
                return;
            }
            for (let type in user)
                if (user[type][field] != undefined) {
                    user[type][field] = value;
                    this.users.save();
                    return;
                }
        }
        catch (err) {
            console.log(err);
        }
    }
    resetUser(findBy, property) {
        const user = this.getUser(findBy, property);
        if (!user)
            return;
    }
    resetAll() {
        Array.from(this.listUsers()).map((user) => { });
    }
    listUsers() {
        return this.users.getObject("/users");
    }
    countUsers() {
        return this.users.count("/users");
    }
}
exports.default = UsersDatabase;
