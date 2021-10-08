import Event from "../../assets/classes/Event";
import { Bot } from "mineflayer";
import CustomClient from "../../assets/classes/Client";

export default class LoginEvent extends Event {
    constructor(client: CustomClient, bot: Bot) {
        super(client, bot, "spawn");
    }

    execute() {
        this.bot.settings.viewDistance = "tiny";
        this.bot.settings.colorsEnabled = false;

        this.client.logger.message(`${this.bot.username} has successfully logged in to ${this.client.mineflayer.bot.server_ip}`);

    }
}