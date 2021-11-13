import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { Sticker } from "discord.js";
export default class StickerUpdateEvent extends Event {
    constructor(client: CustomClient);
    execute(oldSticker: Sticker, newSticker: Sticker): Promise<void>;
}
