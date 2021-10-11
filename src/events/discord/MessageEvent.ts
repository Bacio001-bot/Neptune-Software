import Event from "../../assets/classes/Event";
import { Bot } from "mineflayer";
import { Message } from "discord.js";
import CustomClient from "../../assets/classes/Client";

export default class MessageEvent extends Event {
    constructor(client: CustomClient, bot: Bot) {
        super(client, bot, "on", "messageCreate");

        this.addHandler("discordHandler", (message: Message): boolean => {
            let run = true;

            const args = message.content.split(/\s+/g);

            const cmd = args.shift()?.slice(client.prefix.length);
        
            if (!cmd) return false;
        
            let command = client.commands.get(cmd);

            if (!command) return false;

            if (command.help.type === "discord") {
                if (!message.content.startsWith(this.client.prefix)) run = false;
                if (!message.author) run = false;
            }
            
            return run;
        })

        this.addHandler("bothHandler", (message: Message): boolean => {
            let run = true; 

            const args = message.content.split(/\s+/g);

            const cmd = args.shift()?.slice(client.prefix.length);
        
            if (!cmd) return false;
        
            let command = client.commands.get(cmd);

            if (!command) return false;

            if (command.help.type === "both") {
                if (!message.content.startsWith(this.client.prefix)) run = false;
                if (!message.author) run = false;
            }
            
            return run;
        })
    }

    async execute(message: Message): Promise<void> {
        
    }
}