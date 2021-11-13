import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
export default class ReadyEvent extends Event {
    constructor(client: CustomClient);
    execute(): Promise<void>;
}
