import { Command } from "../../assets/classes/Command";

export class Help extends Command {
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
                guildOnly: true,
                minimumArguments: 0,
                permissions: ["SEND_MESSAGES"]
            }
        });
    }

    execute() {
        
    }
}