import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { Bot } from "mineflayer";

export default class ReadyEvent extends Event {
    constructor(client: CustomClient, bot: Bot) {
        super(client, bot, "once", "ready");
    }

    async execute(): Promise<void> {
        this.client.logger.message(`${this.client.user?.username} `);
    }
}