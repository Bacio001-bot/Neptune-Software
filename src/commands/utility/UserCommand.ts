import { Message } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";

export default class UserCommand extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "userinfo",
            description: "Get data on a specified user!",
            arguments: "[user]",
            example: "userinfo WhatWalls",
            category: "utility",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 0, max: 1 },
                userPermissions: ["SEND_MESSAGES"],
                clientPermissions: ["SEND_MESSAGES"],
                guildOnly: true
            }
        });
    }

    execute(message: Message): void {
        message.channel.send("userinfo command ran")
    }
}