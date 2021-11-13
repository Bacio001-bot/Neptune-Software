import Event from "../../assets/classes/Event";
import { Bot } from "mineflayer";
import CustomClient from "../../assets/classes/Client";
export default class InteractionEvent extends Event {
    constructor(client: CustomClient, bot: Bot);
    execute(interaction: any): Promise<void>;
}
