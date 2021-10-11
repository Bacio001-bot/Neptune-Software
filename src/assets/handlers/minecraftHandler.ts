import CustomClient from "../classes/Client"; 
import { Bot } from "mineflayer";

export default (client: CustomClient, bot: Bot, username: string, message: string): void => {
    const args: string[] = message.split(/\s+/g);

    const cmd = args.shift()?.slice(client.prefix.length);

    if (!cmd) return;

    let command = client.commands.get(cmd);

    if (command.help.type !== "minecraft") return;

    if (!command) client.commands.forEach(com => {
        if (com.help.name != undefined) if (com.aliases.includes(cmd)) command = client.commands.get(com.help.name);
    })
    
    if (!command) return;
                            
    if (command.help.reqArgs) {
        const { min, max } = command.help.reqArgs;
        if (args.length < min) {
            
        } else if (args.length > max) {
            
        }
    }

    if (!command.help.ingamePermissions.includes(client.userdb.getUser(username, "ign")?.rank)) return;
    if (command.cooldown.has(client.userdb.getUser(username, "ign")?.discordID)) return;

    try {
        command.setMessage(message);
        command.execute(message, args);
        client.commandData = [];
    } catch (error) {
        console.log(error);
    }
}