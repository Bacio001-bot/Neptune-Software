import Database from "./Database";
import IPoll from "../interfaces/IPoll";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import { userInfo } from "os";
import { GuildMember } from "discord.js";

class PollsDatabase extends Database {
  constructor() {
    super();
    this.polls = new JsonDB(
      new Config(`${process.cwd()}/storage/polls.json`, true, true, "/")
    );
  }

  addPoll(member: GuildMember, pollID: number, title: string, startDate: string, endDate: string, duration: number,): Promise<boolean> {
    return new Promise((res, rej) => {

      const pollData: IPoll = {
        discordID: member.user?.id,
        pollID: pollID,
        title: title,
        startDate: startDate,
        endDate: endDate,
        durationMs: duration,
        noVoters: [],
        yesVoters: [],
      };

      this.polls.push("/polls[]", pollData, true);
      res(true);
    });
  }

  removePoll(findBy: number, property: string): void {
    try {
      return this.polls.delete(
        `/polls[${this.polls.getIndex("/polls", findBy, property)}]`
      );
    } catch (err) {
      console.log(err);
    }
  }

  removeAll(): void {
    try {
      Array.from(this.listPolls()).map(() => this.polls.delete(`/[polls][${0}]`));
    } catch (err) {
      console.log(err);
    }
  }

  getPoll(findBy: number, property: string): IPoll | null {
    const index = this.polls.getIndex("/polls", findBy, property);
    if (index === -1) return null;
    return this.polls.getObject<IPoll>(`/polls[${index}]`);
  }

  updatePoll(
    findBy: number,
    property: string,
    field: string,
    value: any
  ): void {
    const poll: IPoll | null = this.getPoll(findBy, property);
    if (!poll) return;

    if (poll[field] != undefined) {
        poll[field] = value;
      this.polls.save();
      return;
    }

    for (let type in poll)
      if (poll[type][field] != undefined) {
        poll[type][field] = value;
        this.polls.save();
        return;
      }
  }

  resetPoll(findBy: number, property: string): void {
    const user = this.getPoll(findBy, property);
    if (!user) return;
  }

  resetAll(): void {
    Array.from(this.listPolls()).map((poll) => {});
  }

  listPolls(): IPoll[] {
    return this.polls.getObject("/polls");
  }

  countPolls(): number {
    return this.polls.count("/polls");
  }
}

interface PollsDatabase {
  polls: JsonDB;
}

export default PollsDatabase;
