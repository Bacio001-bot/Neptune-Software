import { Message } from "discord.js";
import { Bot } from "mineflayer";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";

export default class CmdCommand extends Command {
    constructor(client: CustomClient, bot: Bot) {
        super(client, bot, {
            name: "cmd",
            description: "Run A Command Ingame",
            arguments: "commands",
            example: "/help",
            category: "admin",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 1, max: 1 },
                userPermissions: ["SEND_MESSAGES"],
                clientPermissions: ["SEND_MESSAGES"],
                guildOnly: false
            }
        });
    }

    execute(message: Message, args: string[]): void {
        this.bot.chat(`/${args.join(" ")}`);
        this.messages.success("Command Ran", `\`${this.bot.username}\` Successfully sent \`/${args.join(" ")}\`!\n\`\`\`\n${this.client.commandData}\`\`\``, message);
    }
}