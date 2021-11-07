import CustomClient from "../classes/Client"; 
import { Bot } from "mineflayer";
import { Message } from "discord.js";

export default (client: CustomClient, bot: Bot, message: Message): void => {
    
    const args = message.content.split(/\s+/g);

    const cmd = args.shift()?.slice(client.prefix.length);

    if (!cmd) return;

    let command = client.getCommand(cmd);

    if (!command) return;

    if (command.help.type !== "discord") return;

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

    client.commandData = [];

    try {
        command.execute(message, args);
        client.commandData = [];
    } catch (error) {
        console.log(error);
    }
}