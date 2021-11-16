"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("./Database"));
const node_json_db_1 = require("node-json-db");
const JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
class PollsDatabase extends Database_1.default {
    constructor() {
        super();
        this.polls = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config(`${process.cwd()}/storage/polls.json`, true, true, "/"));
    }
    addPoll(member, title, description, options, channelid, messageid, startDate, endDate, duration, pollid, votes) {
        return new Promise((res, rej) => {
            var _a;
            const pollData = {
                discordID: (_a = member.user) === null || _a === void 0 ? void 0 : _a.id,
                pollID: pollid,
                title: title,
                description: description,
                active: true,
                options: options,
                channelID: channelid,
                messageID: messageid,
                startDate: startDate,
                endDate: endDate,
                durationMs: duration,
                votes: votes,
            };
            this.polls.push("/polls[]", pollData, true);
            res(true);
        });
    }
    removePoll(findBy, property) {
        try {
            return this.polls.delete(`/polls[${this.polls.getIndex("/polls", findBy, property)}]`);
        }
        catch (err) {
            console.log(err);
        }
    }
    removeAll() {
        try {
            Array.from(this.listPolls()).map(() => this.polls.delete(`/[polls][${0}]`));
        }
        catch (err) {
            console.log(err);
        }
    }
    getPoll(findBy, property) {
        const index = this.polls.getIndex("/polls", findBy, property);
        if (index === -1)
            return null;
        return this.polls.getObject(`/polls[${index}]`);
    }
    updatePoll(findBy, property, field, value) {
        const poll = this.getPoll(findBy, property);
        if (!poll)
            return;
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
    resetPoll(findBy, property) {
        const user = this.getPoll(findBy, property);
        if (!user)
            return;
    }
    resetAll() {
        Array.from(this.listPolls()).map((poll) => { });
    }
    listPolls() {
        return this.polls.getObject("/polls");
    }
    countPolls() {
        return this.polls.count("/polls");
    }
}
exports.default = PollsDatabase;
