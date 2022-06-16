import Database from "./Database";
import IGiveaway from "../interfaces/IGiveaway";
import { JsonDB } from "node-json-db";
import { GuildMember } from "discord.js";
declare class GiveawaysDatabase extends Database {
    constructor();
    addGiveaway(member: GuildMember, title: string, description: string, price: string, channelid: string, messageid: string, startDate: string, endDate: string, duration: number, giveawayid: number, invites: number): Promise<boolean>;
    removeGiveaway(findBy: number, property: string): void;
    removeAll(): void;
    getGiveaway(findBy: number, property: string): IGiveaway | null;
    updateGiveaway(findBy: number, property: string, field: string, value: any): void;
    resetGiveaway(findBy: number, property: string): void;
    resetAll(): void;
    listGiveaways(): IGiveaway[];
    countgiveaways(): number;
}
interface GiveawaysDatabase {
    giveaways: JsonDB;
}
export default GiveawaysDatabase;
