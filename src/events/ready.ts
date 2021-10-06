import CustomClient from "../assets/classes/Client";
import Event from "../assets/classes/Event";

export default class ReadyEvent extends Event {
    constructor(client: CustomClient) {
        super(client, "ready");
    }

    async execute(): Promise<void> {
        this.client.logger.message(`Successfully Logged Into ${this.client.user?.tag}`);
    }
}