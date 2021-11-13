import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { Sticker } from "discord.js";
export default class StickerCreateEvent extends Event {
    constructor(client: CustomClient);
    execute(sticker: Sticker): Promise<void>;
}
