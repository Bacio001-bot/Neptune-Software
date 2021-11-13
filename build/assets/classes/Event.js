"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
class Event {
    constructor(client, type, name) {
        this.client = client;
        this.logger = this.client.logger;
        this.placeholder = this.client.placeholder;
        this.messages = this.client.messages;
        this.mineflayer = this.client.config.minecraft;
        this.discord = this.client.config.discord;
        this.userdb = this.client.userdb;
        this.type = type;
        this.name = name;
        this.handlers = [];
    }
    async addHandler(name, filter) {
        this.handlers.push({
            filter: filter,
            run: (await Promise.resolve().then(() => __importStar(require(`../addons/${name}.js`)))).default
        });
        return;
    }
    _run(...args) {
        for (let handler of this.handlers)
            if (handler.filter(...args))
                handler.run(this.client, this.bot, ...args);
        // @ts-ignore
        this.execute(...args);
    }
}
exports.default = Event;
