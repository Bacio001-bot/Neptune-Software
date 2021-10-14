import Event from "../../assets/classes/Event";
import CustomClient from "../../assets/classes/Client";
import { Bot } from "mineflayer";

export default class ChatEvent extends Event {
    constructor(client: CustomClient, bot: Bot) {
        super(client, bot, "on", "message");

        this.addHandler("minecraftHandler", (username: string, message: string): boolean => {
            let run = true;

            const args = message.split(/\s+/g);

            const cmd = args.shift()?.slice(client.prefix.length);
        
            if (!cmd) return false;
        
            let command = client.commands.get(cmd);

            if (!command) return false;

            if (command.help.type === "both") return false;

            if (!message.startsWith(this.client.prefix)) run = false;
            if (message.length < 1 || message == undefined || message.length > 1999) run = false;

            if (!this.userdb.getUser(username.toLowerCase(), "ign")) run = false;

            if (!username) run = false;
            
            return run;
        })

        this.addHandler("bothHandler", (username: string, message: string): boolean => {
            let run = true; 

            const args = message.split(/\s+/g);

            const cmd = args.shift()?.slice(client.prefix.length);
        
            if (!cmd) return false;
        
            let command = client.commands.get(cmd);

            if (!command) return false;

            if (command.help.type === "both") {
                if (!message.startsWith(this.client.prefix)) run = false;
                if (message.length < 1 || message == undefined || message.length > 1999) run = false;
    
                if (!this.userdb.getUser(username.toLowerCase(), "ign")) run = false;
    
                if (!username) run = false;
            }
            
            return run;
        })
    }

    execute(username: string, message: string) {
        
    }
}