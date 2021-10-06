import { Message } from "discord.js";
import Command from "../../assets/classes/Command";

export default class HelpCommand extends Command {
    constructor() {
        super({
            name: "help",
            description: "Receieve a list of commands and info!",
            arguments: "none",
            example: "help",
            category: "utility",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 0, max: 0 },
                userPermissions: ["SEND_MESSAGES"],
                clientPermissions: ["SEND_MESSAGES"],
                guildOnly: false
            }
        });
    }

    execute(message: Message): void {
        console.log("ran")
        message.channel.send("help command ran")
    }
}