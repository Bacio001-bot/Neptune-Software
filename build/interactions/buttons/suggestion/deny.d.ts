import CustomClient from "../../../assets/classes/Client";
import InteractionClass from "../../../assets/classes/Interaction";
export default class SuggestionInteraction extends InteractionClass {
    constructor(client: CustomClient);
    execute(interaction: any, args: string[]): Promise<void>;
}
