import Database from "./Database";
import IUser from "../interfaces/IUser";
import { GuildMember } from "discord.js";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";

class UsersDatabase extends Database {
  constructor() {
    super();
    this.users = new JsonDB(
      new Config(`${process.cwd()}/storage/users.json`, true, true, "/")
    );
  }

  addUser(user: GuildMember, verifycode: string): Promise<boolean> {
    return new Promise((res, rej) => {
      if (this.getUser(user.id, "discordID")) return rej(false);

      const userData: IUser = {
        discordID: user.id,
        discordTag: user.user.tag,
        discordName: user.user.username,
        verifyCode: verifycode,
        tickets: {
          openTickets: 0,
          closedTickets:0,
        },        
      };

      this.users.push("/users[]", userData, true);
      res(true);
    });
  }

  removeUser(findBy: string, property: string): void {
    try {
      return this.users.delete(
        `/users[${this.users.getIndex("/users", findBy, property)}]`
      );
    } catch (err) {
      console.log(err);
    }
  }

  removeAll(): void {
    try {
      Array.from(this.listUsers()).map(() => this.users.delete(`/users[${0}]`));
    } catch (err) {
      console.log(err);
    }
  }

  getUser(findBy: string, property: string): IUser | null {
    const index = this.users.getIndex("/users", findBy, property);
    if (index === -1) return null;
    return this.users.getObject<IUser>(`/users[${index}]`);
  }

  updateUser(
    findBy: string,
    property: string,
    field: string,
    value: any
  ): void {
    const user: IUser | null = this.getUser(findBy, property);
    if (!user) return;

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

  resetUser(findBy: string, property: string): void {
    const user = this.getUser(findBy, property);
    if (!user) return;
  }

  resetAll(): void {
    Array.from(this.listUsers()).map((user) => {});
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
