import Event from "../../assets/classes/Event";
import CustomClient from "../../assets/classes/Client";
import { Bot } from "mineflayer";

export default class LoginEvent extends Event {
    constructor(client: CustomClient, bot: Bot) {
        super(client, bot, "once", "login");
    }

    /**
     * @returns {void}
     */
    execute(): void {
        this.bot.settings.viewDistance = "tiny";
        this.bot.settings.colorsEnabled = false;

        this.logger.logMinecraft(`${this.logger.highlight(`${this.bot.username}`)} has successfully logged in to ${this.mineflayer.bot.server_ip}`);
        setTimeout(() => this.bot.chat("/ruby"), 2000);

    }
}