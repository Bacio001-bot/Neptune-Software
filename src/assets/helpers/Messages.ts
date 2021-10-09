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

    success(title: string, description: string, message: Message): void {
        const embed = new MessageEmbed()
            .setAuthor(`✅ ${title}`)
            .setDescription(description)
            .setColor("GREEN")
            .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
        message.channel.send({embeds: [embed]});
    }

    error(title: string, description: string, message: Message): void {
        const embed = new MessageEmbed()
            .setAuthor(`❌ ${title}`)
            .setDescription(description)
            .setColor("RED")
            .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
        message.channel.send({embeds: [embed]});
    }

    loading(message: Message, channel: Channel | ThreadChannel): void {

    }

    invalidUser(message: Message, channel: Channel | ThreadChannel): void {

    }

    invalidRole(message: Message, channel: Channel | ThreadChannel): void {

    }
}