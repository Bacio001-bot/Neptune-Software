import Database from "./Database";
import IPoll from "../interfaces/IPoll";
import { JsonDB } from "node-json-db";
import { GuildMember } from "discord.js";
declare class PollsDatabase extends Database {
    constructor();
    addPoll(member: GuildMember, pollID: number, title: string, startDate: string, endDate: string, duration: number): Promise<boolean>;
    removePoll(findBy: number, property: string): void;
    removeAll(): void;
    getPoll(findBy: number, property: string): IPoll | null;
    updatePoll(findBy: number, property: string, field: string, value: any): void;
    resetPoll(findBy: number, property: string): void;
    resetAll(): void;
    listPolls(): IPoll[];
    countPolls(): number;
}
interface PollsDatabase {
    polls: JsonDB;
}
export default PollsDatabase;
