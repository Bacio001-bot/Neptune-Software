import CustomClient from "../../../assets/classes/Client";
import InteractionClass from "../../../assets/classes/Interaction";
export default class PollInteraction extends InteractionClass {
    constructor(client: CustomClient);
    execute(interaction: any, args: string[]): Promise<void>;
}
