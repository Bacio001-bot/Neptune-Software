import { Bot } from "mineflayer";
import Event from "../../assets/classes/Event";
import CustomClient from "../../assets/classes/Client";

export default class LoginEvent extends Event {
    constructor(client: CustomClient, bot: Bot) {
        super(client, bot, "once", "login");
    }

    execute() {
        this.bot.settings.viewDistance = "tiny";
        this.bot.settings.colorsEnabled = false;

        this.logger.message(`${this.logger.chalk().blueBright.underline(`${this.bot.username}`)} has successfully logged in to ${this.mineflayer.bot.server_ip}`);
        setTimeout(() => {
            this.bot.chat("/ruby");
        }, 2000);

    }
}