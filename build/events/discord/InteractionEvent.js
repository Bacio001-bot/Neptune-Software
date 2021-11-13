"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../assets/classes/Event"));
class InteractionEvent extends Event_1.default {
    constructor(client, bot) {
        super(client, "on", "interactionCreate");
        this.addHandler("InteractionHandler", (interaction) => {
            return true;
        });
    }
    async execute(interaction) {
    }
}
exports.default = InteractionEvent;
