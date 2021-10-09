import Event from "../../assets/classes/Event";
import { Bot } from "mineflayer";
import { Message } from "discord.js";
import CustomClient from "../../assets/classes/Client";

export default class MessageEvent extends Event {
    constructor(client: CustomClient, bot: Bot) {
        super(client, bot, "on", "messageCreate");

        this.addHandler("commandHandler", (message: Message): boolean => {
            let run = true;

            if (!message.content.startsWith(this.client.prefix)) run = false;
            if (!message.author) run = false;
            
            return run;
        })
    }

    async execute(message: Message): Promise<void> {
        
    }
}