"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("./Database"));
const node_json_db_1 = require("node-json-db");
const JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
class GiveawaysDatabase extends Database_1.default {
    constructor() {
        super();
        this.giveaways = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config(`${process.cwd()}/storage/giveaways.json`, true, true, "/"));
    }
    addGiveaway(member, title, description, price, channelid, messageid, startDate, endDate, duration, giveawayid, invites) {
        return new Promise((res, rej) => {
            var _a;
            const giveawayData = {
                discordID: (_a = member.user) === null || _a === void 0 ? void 0 : _a.id,
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
    removeGiveaway(findBy, property) {
        try {
            return this.giveaways.delete(`/giveaways[${this.giveaways.getIndex("/giveaways", findBy, property)}]`);
        }
        catch (err) {
            console.log(err);
        }
    }
    removeAll() {
        try {
            Array.from(this.listGiveaways()).map(() => this.giveaways.delete(`/[giveaways][${0}]`));
        }
        catch (err) {
            console.log(err);
        }
    }
    getGiveaway(findBy, property) {
        const index = this.giveaways.getIndex("/giveaways", findBy, property);
        if (index === -1)
            return null;
        return this.giveaways.getObject(`/giveaways[${index}]`);
    }
    updateGiveaway(findBy, property, field, value) {
        const giveaway = this.getGiveaway(findBy, property);
        if (!giveaway)
            return;
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
    resetGiveaway(findBy, property) {
        const user = this.getGiveaway(findBy, property);
        if (!user)
            return;
    }
    resetAll() {
        Array.from(this.listGiveaways()).map((giveaway) => { });
    }
    listGiveaways() {
        return this.giveaways.getObject("/giveaways");
    }
    countgiveaways() {
        return this.giveaways.count("/giveaways");
    }
}
exports.default = GiveawaysDatabase;
