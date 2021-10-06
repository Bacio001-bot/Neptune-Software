import { Message } from "discord.js";
import Command from "../../assets/classes/Command";

export default class UserCommand extends Command {
    constructor() {
        super({
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
        
    }
}