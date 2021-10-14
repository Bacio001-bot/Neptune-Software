import Event from "../../assets/classes/Event";
import CustomClient from "../../assets/classes/Client";
import { Bot } from "mineflayer";

export default class MessageEvent extends Event {
    constructor(client: CustomClient, bot: Bot) {
        super(client, bot, "on", "message");
    }
    /**
     * @param {any} message
     * TODO: Fix commandData to only push command response message
     * @returns {void}
     */
    execute(message: any): void {
        
        const chat = message
            .toString()
            .replace(/@/g, "");

        if (chat.includes("discord.gg")) return;

        if (chat.length < 1 || chat.length > 1999 || chat == undefined) return;

        this.client.commandData.push(chat);

        console.log(message.toAnsi());
    }
}