import Event from "../../assets/classes/Event";
import { Bot } from "mineflayer";
import { Message } from "discord.js";
import CustomClient from "../../assets/classes/Client";
export default class MessageEvent extends Event {
    constructor(client: CustomClient, bot: Bot);
    execute(message: Message): Promise<void>;
}
