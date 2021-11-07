import Event from "../../assets/classes/Event";
import { Bot } from "mineflayer";
import { Message, Interaction } from "discord.js";
import CustomClient from "../../assets/classes/Client";

export default class InteractionEvent extends Event {
    constructor(client: CustomClient, bot: Bot) {
        super(client, "on", "interactionCreate");
        this.addHandler("interactionHandler", (interaction: any): boolean => {
            return true;
        })
    }

    async execute(interaction: any): Promise<void> {
    }
}