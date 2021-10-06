import Event from "../assets/classes/Event";
import { Message } from "discord.js";
import CustomClient from "../assets/classes/Client";

export default class MessageEvent extends Event {
    constructor(client: CustomClient) {
        super(client, "messageCreate");

        this.addHandler("commandHandler", (message: Message) => {
            let run = true;

            if (!message.content.startsWith(this.client.prefix)) run = false;
            if (!message.author) run = false;
            
            return run;
        })
    }

    async execute(message: Message): Promise<void> {
        
    }
}