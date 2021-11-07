import CustomClient from "../classes/Client"; 
import { Message } from "discord.js";
import { Bot } from "mineflayer";

export default (client: CustomClient, bot: Bot, username: any, message: string): void => {
    if (username.content !== undefined) {
        
        const message: Message = username;
        
        const args = message.content.split(/\s+/g);

        const cmd = args.shift()?.slice(client.prefix.length);
    
        if (!cmd) return;
    
        let command = client.getCommand(cmd);
        
        if (!command) return;

        if (command.help.type !== "both") return;
    
        if (command.help.deleteMessage) if (message.deletable) message.delete();
    
        if (command.help.reqArgs) {
            const { min, max } = command.help.reqArgs;
            if (args.length < min || args.length > max) {
                client.messages.error("Invalid Arguments", `\`\`\`\n${client.prefix}${command.help.name} ${command.help.arguments}\`\`\``, message);
                return;
            }
        }
    
        if (!client.checkPermissions(cmd, message)) {
            
        }
    
        if (command.cooldown.has(message.author.id)) return;
    
        try {
            command.setMessage(message);
            command.execute(message, args);
        } catch (error) {
            console.log(error);
        }
    } else {
        const args: string[] = message.split(/\s+/g);

        const cmd = args.shift()?.slice(client.prefix.length);
    
        if (!cmd) return;
    
        let command = client.getCommand(cmd);
    
        if (!command) return;

        if (command.help.type !== "both") return;
                                
        if (command.help.reqArgs) {
            const { min, max } = command.help.reqArgs;
            if (args.length < min || args.length > max) return bot.chat(`[Invalid Arguments]: ${client.prefix}${command.help.name} ${command.help.arguments}`);
        }
    
        
        if (command.cooldown.has(client.userdb.getUser(username, "ign")?.discordID)) return;
    
        try {
            command.setMessage(message);
            command.execute(message, args, username);
            client.commandData = [];
        } catch (error) {
            console.log(error);
        }
    }
}