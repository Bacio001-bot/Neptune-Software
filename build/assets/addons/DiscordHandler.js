"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (client, bot, message) => {
    var _a;
    const args = message.content.split(/\s+/g);
    const cmd = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.slice(client.prefix.length);
    if (!cmd)
        return;
    let command = client.getCommand(cmd);
    let perm = false;
    let roles = "";
    command.permissions.forEach((p) => {
        var _a;
        roles = roles += `${p} `;
        (_a = message.member) === null || _a === void 0 ? void 0 : _a.roles.cache.forEach((role) => {
            if (role.name == p)
                return perm = true;
        });
    });
    if (!perm) {
        message.reply({ content: `❌ You don't have the right role to run this command! Allowed Roles: ${roles}`, allowedMentions: { repliedUser: true } });
        return;
    }
    if (!command)
        return;
    if (command.help.type !== "discord")
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
    client.commandData = [];
    try {
        command.execute(message, args);
        client.commandData = [];
    }
    catch (error) {
        console.log(error);
    }
};
