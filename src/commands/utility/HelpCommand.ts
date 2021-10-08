import { Message } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";

export default class HelpCommand extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "help",
            description: "Receieve a list of commands and info!",
            arguments: "none",
            example: "help",
            category: "utility",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 1, max: 1 },
                userPermissions: ["SEND_MESSAGES"],
                clientPermissions: ["SEND_MESSAGES"],
                guildOnly: false
            }
        });
    }

    execute(message: Message): void {
        message.channel.send("help command ran")
    }
}