import { Message } from "discord.js";
import { Bot } from "mineflayer";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";

export default class UserCommand extends Command {
    constructor(client: CustomClient, bot: Bot) {
        super(client, bot, {
            name: "userinfo",
            description: "Get data on a specified user!",
            arguments: "[user]",
            example: "userinfo WhatWalls",
            category: "utility",
            type: "discord",
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