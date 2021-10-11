import Event from "../../assets/classes/Event";
import CustomClient from "../../assets/classes/Client";
import { Bot } from "mineflayer";

export default class DeathEvent extends Event {
    constructor(client: CustomClient, bot: Bot) {
        super(client, bot, "on", "death");
    }

    execute() {
        this.logger.message(`${this.logger.chalk().blueBright.underline(`${this.bot.username}`)} has successfully respawned!`);
        this.bot.chat('/respawn')
    }
}