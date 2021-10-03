import CustomClient from "./Client";
import { ICommand } from "../interfaces/ICommand";
 
class Command extends CustomClient  {
    help: object;
    ranMessage: string;

    constructor(options: ICommand) {
        super();

        this.ranMessage = "";
        
        this.help = {
            name: options.name,
            description: options.description,
            arguments: options.arguments || "None",
            example: options.example || options.name,
            category: options.category || "xenon",
            guildOnly: options.requirements.guildOnly,
            userPermissions: options.requirements.userPermissions || ["SEND_MESSAGES"],
            clientPermissions: options.requirements.clientPermissions || ["SEND_MESSAGES"]
        }

    }

    setMessage(message: string): string {
        return this.ranMessage = message;
    }
    
    getMessage(): string {
        return this.ranMessage;
    }
}

export default Command;
