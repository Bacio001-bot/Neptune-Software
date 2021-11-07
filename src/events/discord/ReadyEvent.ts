import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";

export default class ReadyEvent extends Event {
    constructor(client: CustomClient) {
        super(client, "once", "ready");
    }

    async execute(): Promise<void> {
        this.logger.logo();
        this.logger.logDiscord(`${this.logger.highlight(`${this.client.user?.tag}`)} has successfully logged into discord`);
    }
}