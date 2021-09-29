import CustomClient from "./Client";
import { ICommand } from "../interfaces/ICommand";

class Command extends CustomClient  {
    help: object;
    message: string;

    constructor(options: ICommand) {
        super();

        this.message = "";
        
        this.help = {
            name: options.name,
            description: options.description,
            arguments: options.arguments || "None",
            example: options.example || options.name,
            category: options.category || "xenon",
            guildOnly: options.requirements.guildOnly,
            permissions: options.requirements.permissions || ["SEND_MESSAGES"]
        }

    }

    setMessage(message: string): string {
        return this.message = message;
    }
    
    getMessage(): string {
        return this.message;
    }
}

export default Command;
