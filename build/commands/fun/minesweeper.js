"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class FunCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "minesweeper",
            description: "Play some fun minesweeper games",
            arguments: "[user] <bombs>",
            example: "/minesweeper bacio001 5",
            category: "fun",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 1, max: 2 },
                userPermissions: ["SEND_MESSAGES"],
                clientPermissions: ["SEND_MESSAGES"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        var _a;
        try {
            let bombs = parseInt(args[1]) || 5;
            let player1 = message.member;
            let player2 = (_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first();
            let bombButtons = [];
            for (let i = 0; bombs > i; i++) {
                let bombButton = Math.floor(Math.random() * (25 - 1 + 1) + 1);
                let bombButtonName = `mine_` + bombButton;
                let indexOfButton = bombButtons.indexOf(bombButtonName);
                if (indexOfButton != -1) {
                    i = i - 1;
                }
                else {
                    bombButtons.push(bombButtonName);
                }
            }
            const buttonsRow1 = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                .setCustomId('mine_1')
                .setEmoji('🔳')
                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                .setCustomId('mine_2')
                .setEmoji('🔳')
                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                .setCustomId('mine_3')
                .setEmoji('🔳')
                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                .setCustomId('mine_4')
                .setEmoji('🔳')
                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                .setCustomId('mine_5')
                .setEmoji('🔳')
                .setStyle('PRIMARY'));
            const buttonsRow2 = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                .setCustomId('mine_6')
                .setEmoji('🔳')
                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                .setCustomId('mine_7')
                .setEmoji('🔳')
                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                .setCustomId('mine_8')
                .setEmoji('🔳')
                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                .setCustomId('mine_9')
                .setEmoji('🔳')
                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                .setCustomId('mine_10')
                .setEmoji('🔳')
                .setStyle('PRIMARY'));
            const buttonsRow3 = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                .setCustomId('mine_11')
                .setEmoji('🔳')
                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                .setCustomId('mine_12')
                .setEmoji('🔳')
                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                .setCustomId('mine_13')
                .setEmoji('🔳')
                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                .setCustomId('mine_14')
                .setEmoji('🔳')
                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                .setCustomId('mine_15')
                .setEmoji('🔳')
                .setStyle('PRIMARY'));
            const buttonsRow4 = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                .setCustomId('mine_16')
                .setEmoji('🔳')
                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                .setCustomId('mine_17')
                .setEmoji('🔳')
                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                .setCustomId('mine_18')
                .setEmoji('🔳')
                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                .setCustomId('mine_19')
                .setEmoji('🔳')
                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                .setCustomId('mine_20')
                .setEmoji('🔳')
                .setStyle('PRIMARY'));
            const buttonsRow5 = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                .setCustomId('mine_21')
                .setEmoji('🔳')
                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                .setCustomId('mine_22')
                .setEmoji('🔳')
                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                .setCustomId('mine_23')
                .setEmoji('🔳')
                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                .setCustomId('mine_24')
                .setEmoji('🔳')
                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                .setCustomId('mine_25')
                .setEmoji('🔳')
                .setStyle('PRIMARY'));
            if (args[1] && !isNaN(args[1]))
                bombs = parseInt(args[1]);
            let msg = await message.channel.send({ content: `**Minesweeper ${player1 === null || player1 === void 0 ? void 0 : player1.user.tag} VS ${player2 === null || player2 === void 0 ? void 0 : player2.user.tag} Bombs: ${bombs.toString()}**`, components: [buttonsRow1, buttonsRow2, buttonsRow3, buttonsRow4, buttonsRow5] });
            const filter = (button) => button.user.id === (player1 === null || player1 === void 0 ? void 0 : player1.user.id) || button.user.id === (player2 === null || player2 === void 0 ? void 0 : player2.user.id);
            const collector = msg.createMessageComponentCollector({
                filter,
                time: 1800000,
                componentType: "BUTTON",
            });
            let lastClick;
            collector.on("collect", async (it) => {
                var _a, _b, _c;
                if (lastClick == ((_a = it.member) === null || _a === void 0 ? void 0 : _a.user))
                    return it.deferUpdate();
                lastClick = (_b = it.member) === null || _b === void 0 ? void 0 : _b.user;
                let bombIndex = bombButtons.indexOf(it.customId);
                let bomb = false;
                if (bombIndex != -1) {
                    bomb = true;
                }
                let one = [];
                (_c = it.message.components) === null || _c === void 0 ? void 0 : _c.forEach((component) => {
                    component.components.forEach(element => {
                        var _a;
                        try {
                            if (element.customId == it.customId) {
                                if (bomb) {
                                    element.setEmoji('💣');
                                    (_a = it.message.components) === null || _a === void 0 ? void 0 : _a.forEach((component) => {
                                        component.components.forEach(element => {
                                            element.setDisabled(true);
                                        });
                                    });
                                }
                                if (!bomb)
                                    element.setEmoji('✅');
                            }
                        }
                        catch (_b) {
                            (err) => console.log(err);
                        }
                    });
                    one.push(component);
                });
                if (bomb) {
                    it.update({
                        content: `${lastClick.tag} has lost the game!`,
                        components: one
                    }).catch();
                }
                else {
                    it.update({
                        components: one
                    }).catch();
                }
            });
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Hangman Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = FunCommand;
