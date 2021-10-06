import CustomClient from "../classes/Client";
import Command from "../classes/Command";
import { Message } from "discord.js"; 

export default (client: CustomClient, message: Message): void => {
    const args: string[] = message.content.split(/\s+/g);

    const cmd = args.shift()?.slice(client.prefix.length);

    // @ts-ignore
    let command = client.commands.get(cmd);

    if (!command) {
        client.commands.forEach(com => {
            if (com.help.name != undefined) if (com.aliases.includes(cmd)) command = client.commands.get(com.help.name);
        })
    }

    if (!command) return;

    try {
        command.setMessage(message);
        command.execute(message);
    } catch (error) {
        console.log(error);
    }

}