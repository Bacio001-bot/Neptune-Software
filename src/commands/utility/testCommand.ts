import { Message } from "discord.js";
import { Bot } from "mineflayer";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";

export default class TestCommand extends Command {
    constructor(client: CustomClient, bot: Bot) {
        super(client, bot, {
            name: "test",
            description: "test",
            arguments: "",
            example: "test",
            category: "utility",
            type: "both",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 0, max: 0 },
                userPermissions: ["SEND_MESSAGES"],
                clientPermissions: ["SEND_MESSAGES"],
                ingamePermissions: ["recruit", "member"],
                guildOnly: true
            }
        });
    }

    execute(message: any, args: string[], username: string): void {
        console.log("ran command")
        if (!message.author) this.bot.chat("ran");
        else message.channel.send("ran")
    }
}