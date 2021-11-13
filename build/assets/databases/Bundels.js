"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("./Database"));
const node_json_db_1 = require("node-json-db");
const JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
class BundlesDatabase extends Database_1.default {
    constructor() {
        super();
        this.bundles = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config(`${process.cwd()}/storage/bundles.json`, true, true, "/"));
    }
    addBundle(bundleName, factionName, factionLeaderName, factionLeaderId) {
        return new Promise((res, rej) => {
            const bundleData = {
                bundleId: Math.floor(100000 + Math.random() * 900000),
                bundelName: bundleName,
                facName: factionName,
                facLeaderName: factionLeaderName,
                facLeaderId: factionLeaderId,
                bundlegiven: false,
            };
            this.bundles.push("/bundles[]", bundleData, true);
            res(true);
        });
    }
    removeBundle(findBy, property) {
        try {
            return this.bundles.delete(`/bundles[${this.bundles.getIndex("/bundles", findBy, property)}]`);
        }
        catch (err) {
            console.log(err);
        }
    }
    removeAll() {
        try {
            Array.from(this.listBundles()).map(() => this.bundles.delete(`/bundles[${0}]`));
        }
        catch (err) {
            console.log(err);
        }
    }
    getBundle(findBy, property) {
        const index = this.bundles.getIndex("/bundles", findBy, property);
        if (index === -1)
            return null;
        return this.bundles.getObject(`/bundles[${index}]`);
    }
    updateBundle(findBy, property, field, value) {
        const bundle = this.getBundle(findBy, property);
        if (!bundle)
            return;
        if (bundle[field] != undefined) {
            bundle[field] = value;
            this.bundles.save();
            return;
        }
        for (let type in bundle)
            if (bundle[type][field] != undefined) {
                bundle[type][field] = value;
                this.bundles.save();
                return;
            }
    }
    resetBundle(findBy, property) {
        const user = this.getBundle(findBy, property);
        if (!user)
            return;
    }
    resetAll() {
        Array.from(this.listBundles()).map((bundle) => { });
    }
    listBundles() {
        return this.bundles.getObject("/bundles");
    }
    countBundles() {
        return this.bundles.count("/bundles");
    }
}
exports.default = BundlesDatabase;
