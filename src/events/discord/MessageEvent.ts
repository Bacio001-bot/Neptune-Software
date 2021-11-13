import Event from "../../assets/classes/Event";
import { Bot } from "mineflayer";
import { Message } from "discord.js";
import CustomClient from "../../assets/classes/Client";

export default class MessageEvent extends Event {
    constructor(client: CustomClient, bot: Bot) {
        super(client, "on", "messageCreate");

        this.addHandler("DiscordHandler", (message: Message): boolean => {
            let run = true;
            let result = this.userdb.getUser(message.author.id, "discordID");
            if(!result && message.member && !message.author.bot) {
                this.userdb.addUser(message.member, 'NULL');
            }

            const args = message.content.split(/\s+/g);

            const cmd = args.shift()?.slice(client.prefix.length);
        
            if (!cmd) return false;
        
            let command = client.getCommand(cmd);

            if (!command) return false;

            if (command.help.type === "discord") {
                if (!message.content.startsWith(this.client.prefix)) run = false;
                if (!message.author) run = false;
            }
            
            return run;
        })

        this.addHandler("BothHandler", (message: Message): boolean => {
            let run = true; 

            const args = message.content.split(/\s+/g);

            const cmd = args.shift()?.slice(client.prefix.length);
        
            if (!cmd) return false;
        
            let command = client.getCommand(cmd);

            if (!command) return false;

            if (command.help.type === "both") {
                if (!message.content.startsWith(this.client.prefix)) run = false;
                if (!message.author) run = false;
            }
            
            return run;
        })
    }

    async execute(message: Message): Promise<void> {
        
        let result = this.userdb.getUser(message.author.id, "discordID");
        if(message.mentions.everyone && result?.messages.everyone != undefined) this.userdb.updateUser(message.author?.id, "discordID", "everyone", result?.messages.everyone + 1)  
        if(message.mentions.repliedUser && result?.messages.replies != undefined) this.userdb.updateUser(message.author?.id, "discordID", "replies", result?.messages.replies + 1)  
        if(message.tts && result?.messages.tts != undefined) this.userdb.updateUser(message.author?.id, "discordID", "tts", result?.messages.tts + 1)  
        if(result?.messages.total != undefined) this.userdb.updateUser(message.author?.id, "discordID", "total", result?.messages.total + 1)  

    }
}