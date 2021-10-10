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
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 0, max: 0 },
                userPermissions: ["SEND_MESSAGES"],
                clientPermissions: ["SEND_MESSAGES"],
                guildOnly: true
            }
        });
    }

    execute(message: Message): void {
        message.channel.send("ran")
        const user = this.client.getUser("804462623768707103");
        if (user) this.userdb.addUser(user, "whatwalls2");
        console.log(this.userdb.getUser("804462623768707103"))
    }
}