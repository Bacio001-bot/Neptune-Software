"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
const hangman = require('discord-hangman');
class FunCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "rockpaperscissors",
            description: "Play some fun rps games",
            arguments: "[user]",
            example: "/rockpaperscissors bacio001",
            category: "fun",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 1, max: 1 },
                userPermissions: ["SEND_MESSAGES"],
                clientPermissions: ["SEND_MESSAGES"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        var _a;
        try {
            let player1 = message.member;
            let player2 = (_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first();
            let pickPlayer1;
            let pickPlayer2;
            const buttonsRow1 = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                .setCustomId('block_rock')
                .setEmoji('🪨')
                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                .setCustomId('block_paper')
                .setEmoji('🗞️')
                .setStyle('PRIMARY'), new discord_js_1.MessageButton()
                .setCustomId('block_scissor')
                .setEmoji('✂️')
                .setStyle('PRIMARY'));
            let msg = await message.channel.send({ content: `**RPS ${player1 === null || player1 === void 0 ? void 0 : player1.user.tag} VS ${player2 === null || player2 === void 0 ? void 0 : player2.user.tag}**`, components: [buttonsRow1] });
            const filter = (button) => button.user.id === (player1 === null || player1 === void 0 ? void 0 : player1.user.id) || button.user.id === (player2 === null || player2 === void 0 ? void 0 : player2.user.id);
            const collector = msg.createMessageComponentCollector({
                filter,
                time: 1800000,
                componentType: "BUTTON",
            });
            collector.on("collect", async (it) => {
                var _a;
                it.member == message.member ? pickPlayer1 == undefined ? pickPlayer1 = it.customId : pickPlayer1 = pickPlayer1 : pickPlayer2 == undefined ? pickPlayer2 = it.customId : pickPlayer2 = pickPlayer2;
                console.log(pickPlayer2, pickPlayer1);
                if (pickPlayer2 && pickPlayer1) {
                    let winner = '';
                    switch (pickPlayer1) {
                        case 'block_rock':
                            if (pickPlayer2 == 'block_scissor')
                                winner = player1 === null || player1 === void 0 ? void 0 : player1.user.tag;
                            if (pickPlayer2 == 'block_paper')
                                winner = player2 === null || player2 === void 0 ? void 0 : player2.user.tag;
                            if (pickPlayer2 == 'block_rock')
                                winner = 'Tie';
                            break;
                        case 'block_paper':
                            if (pickPlayer2 == 'block_scissor')
                                winner = player2 === null || player2 === void 0 ? void 0 : player2.user.tag;
                            if (pickPlayer2 == 'block_paper')
                                winner = 'Tie';
                            if (pickPlayer2 == 'block_rock')
                                winner = player1 === null || player1 === void 0 ? void 0 : player1.user.tag;
                            break;
                        case 'block_scissor':
                            if (pickPlayer2 == 'block_scissor')
                                winner = 'Tie';
                            if (pickPlayer2 == 'block_paper')
                                winner = player1 === null || player1 === void 0 ? void 0 : player1.user.tag;
                            if (pickPlayer2 == 'block_rock')
                                winner = player2 === null || player2 === void 0 ? void 0 : player2.user.tag;
                            break;
                    }
                    let one = [];
                    (_a = it.message.components) === null || _a === void 0 ? void 0 : _a.forEach((component) => {
                        component.components.forEach(element => {
                            element.setDisabled(true);
                        });
                        one.push(component);
                    });
                    let newContent;
                    if (winner != 'Tie') {
                        if (winner == (player1 === null || player1 === void 0 ? void 0 : player1.user.tag)) {
                            newContent = it.message.content.replace(`${player1 === null || player1 === void 0 ? void 0 : player1.user.tag}`, `🎉${player1 === null || player1 === void 0 ? void 0 : player1.user.tag}`);
                            newContent = newContent.replace(`${player2 === null || player2 === void 0 ? void 0 : player2.user.tag}`, `😢${player2 === null || player2 === void 0 ? void 0 : player2.user.tag}`);
                        }
                        else {
                            newContent = it.message.content.replace(`${player2 === null || player2 === void 0 ? void 0 : player2.user.tag}`, `🎉${player2 === null || player2 === void 0 ? void 0 : player2.user.tag}`);
                            newContent = newContent.replace(`${player1 === null || player1 === void 0 ? void 0 : player1.user.tag}`, `😢${player1 === null || player1 === void 0 ? void 0 : player1.user.tag}`);
                        }
                    }
                    else {
                        newContent = it.message.content.replace(`${player2 === null || player2 === void 0 ? void 0 : player2.user.tag}`, `😕${player2 === null || player2 === void 0 ? void 0 : player2.user.tag}`);
                        newContent = newContent.replace(`${player1 === null || player1 === void 0 ? void 0 : player1.user.tag}`, `😕${player1 === null || player1 === void 0 ? void 0 : player1.user.tag}`);
                    }
                    it.update({
                        content: newContent,
                        components: one
                    }).catch();
                }
                else {
                    it.deferUpdate();
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
