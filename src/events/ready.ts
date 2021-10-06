import Event from "../assets/classes/Event";

export default class ReadyEvent extends Event {
    constructor() {
        super("ready");
    }

    async execute(): Promise<void> {
        this.logger.message(`Successfully Logged Into ${this.user?.tag}`);
    }
}