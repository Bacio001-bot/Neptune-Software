"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (client, bot, interaction) => {
    async function awaitInt() {
        await interaction.deferUpdate();
    }
    async function awaitInt2() {
        return await interaction.reply({ content: `❌ Sorry you don't have the right perms to use this interaction`, ephemeral: true });
    }
    let btn = interaction.customId;
    let button = client.getButtons(btn);
    let perm = false;
    client.config.discord.staff.roles.forEach((p) => {
        var _a;
        (_a = interaction.member) === null || _a === void 0 ? void 0 : _a.roles.cache.forEach((role) => {
            if (role.name == p)
                return perm = true;
        });
    });
    if (!client.checkPermissions(btn, interaction) && !perm) {
        awaitInt2();
        return;
    }
    awaitInt();
    try {
        return button.execute(interaction);
    }
    catch (error) {
        console.log(error);
    }
};
