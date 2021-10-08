import { 
    Message,
    Channel,
    ThreadChannel,
    MessageEmbed,
    MessageEmbedOptions
    } from "discord.js";
import CustomClient from "../classes/Client";

export default class Messages {
    client: CustomClient;

    constructor(client: CustomClient) {
        this.client = client;
    }

    success(message: Message, channel: Channel | ThreadChannel): void {

    }

    error(message: Message, channel: Channel | ThreadChannel): void {

    }

    loading(message: Message, channel: Channel | ThreadChannel): void {

    }

    invalidUser(message: Message, channel: Channel | ThreadChannel): void {

    }

    invalidRole(message: Message, channel: Channel | ThreadChannel): void {

    }

    buildEmbed(options?: MessageEmbedOptions | MessageEmbed | undefined): MessageEmbed { 
        const embed = new MessageEmbed(options);

        return embed;
    }
}