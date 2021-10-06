import Event from "../assets/classes/Event";
import { Message } from "discord.js";

export default class MessageEvent extends Event {
    constructor() {
        super("messageCreate");

        this.addHandler("commandHandler", (message: Message) => {
            let run = true;

            if (!message.content.startsWith(this.prefix)) run = false;
            if (!message.author) run = false;
            
            return run;
        })
    }

    async execute(message: Message): Promise<void> {
        console.log(this.commands.size)
    }
}