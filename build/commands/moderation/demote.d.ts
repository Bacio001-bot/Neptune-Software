import { Message } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";
export default class DemoteCommand extends Command {
    constructor(client: CustomClient);
    execute(message: Message, args: string[]): Promise<void>;
}
