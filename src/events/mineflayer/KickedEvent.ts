import Event from "../../assets/classes/Event";
import CustomClient from "../../assets/classes/Client";
import { Bot } from "mineflayer";

export default class KickedEvent extends Event {
    constructor(client: CustomClient, bot: Bot) {
        super(client, bot, "on", "kicked");
    }

    execute(reason: any) {
        this.logger.logMinecraft(`${this.logger.chalk().blueBright.underline(`${this.bot.username}`)} was kicked for ${reason}`);
        this.bot.quit()
    }
}