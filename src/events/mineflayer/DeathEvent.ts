import Event from "../../assets/classes/Event";
import { Bot } from "mineflayer";
import CustomClient from "../../assets/classes/Client";

export default class DeathEvent extends Event {
    constructor(client: CustomClient, bot: Bot) {
        super(client, bot, "on", "death");
    }

    execute() {
        this.logger.message(`${this.logger.chalk().blueBright.underline(`${this.bot.username}`)} has successfully respawned!`);
        this.bot.chat('/respawn')
    }
}