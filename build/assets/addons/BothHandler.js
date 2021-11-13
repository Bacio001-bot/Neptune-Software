"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (client, bot, username, message) => {
    var _a, _b, _c;
    if (username.content !== undefined) {
        const message = username;
        const args = message.content.split(/\s+/g);
        const cmd = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.slice(client.prefix.length);
        if (!cmd)
            return;
        let command = client.getCommand(cmd);
        if (!command)
            return;
        if (command.help.type !== "both")
            return;
        if (command.help.deleteMessage)
            if (message.deletable)
                message.delete();
        if (command.help.reqArgs) {
            const { min, max } = command.help.reqArgs;
            if (args.length < min || args.length > max) {
                client.messages.error("Invalid Arguments", `\`\`\`\n${client.prefix}${command.help.name} ${command.help.arguments}\`\`\``, message);
                return;
            }
        }
        if (!client.checkPermissions(cmd, message)) {
        }
        if (command.cooldown.has(message.author.id))
            return;
        try {
            command.setMessage(message);
            command.execute(message, args);
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        const args = message.split(/\s+/g);
        const cmd = (_b = args.shift()) === null || _b === void 0 ? void 0 : _b.slice(client.prefix.length);
        if (!cmd)
            return;
        let command = client.getCommand(cmd);
        if (!command)
            return;
        if (command.help.type !== "both")
            return;
        if (command.help.reqArgs) {
            const { min, max } = command.help.reqArgs;
            if (args.length < min || args.length > max)
                return bot.chat(`[Invalid Arguments]: ${client.prefix}${command.help.name} ${command.help.arguments}`);
        }
        if (command.cooldown.has((_c = client.userdb.getUser(username, "ign")) === null || _c === void 0 ? void 0 : _c.discordID))
            return;
        try {
            command.setMessage(message);
            command.execute(message, args, username);
            client.commandData = [];
        }
        catch (error) {
            console.log(error);
        }
    }
};
