import Event from "../../assets/classes/Event";
import { Bot } from "mineflayer";
import CustomClient from "../../assets/classes/Client";

export default class KickedEvent extends Event {
    constructor(client: CustomClient, bot: Bot) {
        super(client, bot, "on", "kicked");
    }

    execute(reason: { color: string; text: string; }) {
        this.logger.logMinecraft(`${this.logger.chalk().blueBright.underline(`${this.bot.username}`)} was kicked for ${reason.text}`);
        this.bot.quit()
    }
}