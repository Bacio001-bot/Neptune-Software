"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class TicketPanelCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "rolepanel",
            description: "Sends the reaction role panel",
            arguments: "<Channel>",
            example: "/rpanel",
            category: "panels",
            type: "discord",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                args: { min: 0, max: 1 },
                userPermissions: ["ADMINISTRATOR"],
                clientPermissions: ["ADMINISTRATOR"],
                guildOnly: true,
            },
        });
    }
    async execute(message, args) {
        var _a;
        try {
            if (!this.client.config.role.select.enabled)
                return this.messages.error("Role Panel Error", `Role selector is disabled`, message);
            let roleSelectArray = [];
            let roleShowcase = "\n";
            this.client.config.role.select.options.forEach((r) => {
                let role = this.client.getRole(r[1]);
                if (!role) {
                    return this.messages.error("Role Panel Error", `\`${r[1]}\` role could not be found`, message);
                }
                roleSelectArray.push({
                    emoji: r[0],
                    label: r[1],
                    value: r[1],
                });
                roleShowcase += `> ${r[0]} **${r[1]}** » ${r[2]}\n`;
            });
            let rolechannel = this.client.getChannel(args[0] || message.channel.name);
            this.messages.success("Role Panel Created", `Role panel has been sent to \`${rolechannel === null || rolechannel === void 0 ? void 0 : rolechannel.name}\``, message);
            let roleMenu = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageSelectMenu()
                .setCustomId("role_assign")
                .setPlaceholder("Select a role")
                .addOptions(roleSelectArray));
            let rPanelEmbed = new discord_js_1.MessageEmbed()
                .setTitle(`Role Select System`)
                .setDescription(`**Select one of the roles below to get it**\n${roleShowcase}\n *Remove the role by reselecting it*`)
                .setColor(this.client.config.discord.embed.color)
                .setFooter(`${(_a = message.guild) === null || _a === void 0 ? void 0 : _a.name}`)
                .setTimestamp();
            rolechannel === null || rolechannel === void 0 ? void 0 : rolechannel.send({
                embeds: [rPanelEmbed],
                components: [roleMenu],
            });
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Role Panel Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = TicketPanelCommand;
