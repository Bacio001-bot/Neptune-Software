"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
class ApplicationPanelCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "applicationpanel",
            description: "Sends the application panel",
            arguments: "<Channel>",
            example: "/apanel",
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
        var _a, _b;
        if (!this.client.config.application.enabled)
            return this.messages.error("Application Panel Error", `Application system is disabled`, message);
        try {
            let categoriesArray = [];
            this.client.config.application.categories.forEach((cat) => {
                let category = this.client.getCategory(cat[2]);
                if (!category) {
                    return this.messages.error("Application Panel Error", `\`${cat[2]}\` category could not be found`, message);
                }
                categoriesArray.push({
                    emoji: cat[0],
                    label: cat[1],
                    value: `${cat[1].replace(" ", "_")}`,
                });
            });
            let applicationchannel = this.client.getChannel(args[0] || message.channel.name);
            this.messages.success("Application Panel Created", `Application panel has been sent to \`${applicationchannel === null || applicationchannel === void 0 ? void 0 : applicationchannel.name}\``, message);
            let applicationPanelEmbed = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageSelectMenu()
                .setCustomId("application_create")
                .setPlaceholder("Create a application")
                .addOptions(categoriesArray));
            let aPanelEmbed = new discord_js_1.MessageEmbed()
                .setTitle(`Application System`)
                .setDescription(`> Select one of the options below to create a application`)
                .setColor(this.client.config.discord.embed.color)
                .setFooter(`${(_a = message.guild) === null || _a === void 0 ? void 0 : _a.name}`, `${(_b = message.guild) === null || _b === void 0 ? void 0 : _b.iconURL()}` || ' ')
                .setTimestamp();
            applicationchannel === null || applicationchannel === void 0 ? void 0 : applicationchannel.send({
                embeds: [aPanelEmbed],
                components: [applicationPanelEmbed],
            });
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Ticket Panel Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = ApplicationPanelCommand;
