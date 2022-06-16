import Database from "./Database";
import IGiveaway from "../interfaces/IGiveaway";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import { userInfo } from "os";
import { GuildMember, Options } from "discord.js";

class GiveawaysDatabase extends Database {
  constructor() {
    super();
    this.giveaways = new JsonDB(
      new Config(`${process.cwd()}/storage/giveaways.json`, true, true, "/")
    );
  }

  addGiveaway(member: GuildMember, title: string, description: string, price: string, channelid:string, messageid:string, startDate: string, endDate: string, duration: number, giveawayid: number, invites: number): Promise<boolean> {
    return new Promise((res, rej) => {

      const giveawayData: IGiveaway = {
        discordID: member.user?.id,
        giveawayID: giveawayid,
        title: title,
        description: description,
        requiredInvites: invites,
        price: price,
        winner: '',
        active: true,
        channelID: channelid,
        messageID: messageid,
        startDate: startDate,
        endDate: endDate,
        durationMs: duration,
        enteries: [],
      };

      this.giveaways.push("/giveaways[]", giveawayData, true);
      res(true);
    });
  }

  removeGiveaway(findBy: number, property: string): void {
    try {
      return this.giveaways.delete(
        `/giveaways[${this.giveaways.getIndex("/giveaways", findBy, property)}]`
      );
    } catch (err) {
      console.log(err);
    }
  }

  removeAll(): void {
    try {
      Array.from(this.listGiveaways()).map(() => this.giveaways.delete(`/[giveaways][${0}]`));
    } catch (err) {
      console.log(err);
    }
  }

  getGiveaway(findBy: number, property: string): IGiveaway | null {
    const index = this.giveaways.getIndex("/giveaways", findBy, property);
    if (index === -1) return null;
    return this.giveaways.getObject<IGiveaway>(`/giveaways[${index}]`);
  }

  updateGiveaway(
    findBy: number,
    property: string,
    field: string,
    value: any
  ): void {
    const giveaway: IGiveaway | null = this.getGiveaway(findBy, property);
    if (!giveaway) return;

    if (giveaway[field] != undefined) {
      giveaway[field] = value;
      this.giveaways.save();
      return;
    }

    for (let type in giveaway)
      if (giveaway[type][field] != undefined) {
        giveaway[type][field] = value;
        this.giveaways.save();
        return;
      }
  }

  resetGiveaway(findBy: number, property: string): void {
    const user = this.getGiveaway(findBy, property);
    if (!user) return;
  }

  resetAll(): void {
    Array.from(this.listGiveaways()).map((giveaway) => {});
  }

  listGiveaways(): IGiveaway[] {
    return this.giveaways.getObject("/giveaways");
  }

  countgiveaways(): number {
    return this.giveaways.count("/giveaways");
  }
}

interface GiveawaysDatabase {
  giveaways: JsonDB;
}

export default GiveawaysDatabase;
