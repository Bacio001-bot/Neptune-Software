"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (client, bot, interaction) => {
    try {
        async function awaitInt2() {
            return await interaction.reply({ content: `❌ Sorry you don't have the right perms to use this interaction`, ephemeral: true });
        }
        let btn = interaction.customId;
        let button = client.getButtons(btn);
        if (interaction.customId.includes('mine') || interaction.customId.includes('block'))
            return;
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
        try {
            return button.execute(interaction);
        }
        catch (error) {
        }
    }
    catch (err) {
        console.log(err);
    }
};
