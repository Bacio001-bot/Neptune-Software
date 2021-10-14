import Event from "../../assets/classes/Event";
import CustomClient from "../../assets/classes/Client";
import { Bot } from "mineflayer";

export default class KickedEvent extends Event {
    constructor(client: CustomClient, bot: Bot) {
        super(client, bot, "on", "kicked");
    }

    /**
     * @param {any} reason
     * TODO: Fix "this.bot.username" and reason.text returning undefined 
     * ? Might want to change event to quit or something else if keeps erroring
     * @returns {void}
     */
    execute(reason: any): void {
        this.logger.logMinecraft(`${this.logger.chalk().blueBright.underline(`${this.bot.username}`)} was kicked for ${reason}`);
        this.bot.quit()
    }
}