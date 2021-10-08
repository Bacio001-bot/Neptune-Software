import CustomClient from "../classes/Client";
import { Message } from "discord.js"; 

export default (client: CustomClient, message: Message): void => {
    const args = message.content.split(/\s+/g);

    const cmd = args.shift()?.slice(client.prefix.length);

    if (!cmd) return;

    // @ts-ignore
    let command = client.commands.get(cmd);

    if (!command) client.commands.forEach(com => {
        if (com.help.name != undefined) if (com.aliases.includes(cmd)) command = client.commands.get(com.help.name);
    })
    
    if (!command) return;

    if (command.help.deleteMessage) if (message.deletable) message.delete();

    if (command.help.reqArgs) {
        const { min, max } = command.help.reqArgs;
        if (args.length < min) {
            
        } else if (args.length > max) {
            
        }
    }

    if (!client.checkPermissions(cmd, message)) {
        
    }

    if (command.cooldown.has(message.author.id)) return;



    try {
        command.setMessage(message);
        command.execute(message);
    } catch (error) {
        console.log(error);
    }

}