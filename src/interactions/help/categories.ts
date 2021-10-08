import CustomClient from "../../assets/classes/Client";
import Interaction from "../../assets/classes/Interaction";
import { Interaction as Interact } from "discord.js";

export default class CategoriesInteraction extends Interaction {
    constructor(client: CustomClient) {
        super(client, "categories");
    }

    async execute(interaction: Interact): Promise<void> {
        
    }
}