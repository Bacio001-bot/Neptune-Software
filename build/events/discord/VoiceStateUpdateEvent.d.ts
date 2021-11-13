import CustomClient from "../../assets/classes/Client";
import Event from "../../assets/classes/Event";
import { VoiceState } from "discord.js";
export default class VoiceStateUpdateEvent extends Event {
    constructor(client: CustomClient);
    execute(oldState: VoiceState, newState: VoiceState): Promise<void>;
}
