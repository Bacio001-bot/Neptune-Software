"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../assets/classes/Command"));
const ms_1 = __importDefault(require("ms"));
class GiveawayCreateCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "giveawaycreate",
            description: "Create a giveaway",
            arguments: "<channel>",
            example: "/giveawaycreate general",
            category: "giveaway",
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
        try {
            let channel = this.client.getChannel(args[0] || message.channel.name);
            const giveawayTitleEmbed = new discord_js_1.MessageEmbed()
                .setColor(this.client.config.discord.embed.color)
                .setTitle(`Giveaway Title`)
                .setDescription(`What will the title be of your giveaway?`)
                .setFooter(`Please send your title in the chat the bot will read it`);
            const giveawayDescriptionEmbed = new discord_js_1.MessageEmbed()
                .setColor(this.client.config.discord.embed.color)
                .setTitle(`Giveaway Description`)
                .setDescription(`What will the description be of your giveaway?`)
                .setFooter(`Please send your description in the chat the bot will read it`);
            const giveawayPriceEmbed = new discord_js_1.MessageEmbed()
                .setColor(this.client.config.discord.embed.color)
                .setTitle(`Giveaway Price`)
                .setDescription(`What will the price be of your giveaway?`)
                .setFooter(`Please send your price in the chat the bot will read it`);
            const giveawayRequirementsEmbed = new discord_js_1.MessageEmbed()
                .setColor(this.client.config.discord.embed.color)
                .setTitle(`Giveaway Requirements`)
                .setDescription(`What will the number of invites requirement be of your giveaway?`)
                .setFooter(`Please send your requirements in the chat the bot will read it`);
            const giveawayDurationsEmbed = new discord_js_1.MessageEmbed()
                .setColor(this.client.config.discord.embed.color)
                .setTitle(`Giveaway Duration`)
                .setDescription(`How long will the giveaway be open for? \n format:\`1h\` OR \`1d\` OR \`1w\``)
                .setFooter(`Please send your duration in the chat the bot will read it`);
            const filter = (m) => m.author === message.author;
            let title = "";
            let description = "";
            let price = "";
            let requirement = 0;
            let duration = "";
            message.channel.send({ embeds: [giveawayTitleEmbed] });
            await message.channel
                .awaitMessages({
                filter,
                max: 1,
                time: 1800000,
            })
                .then(async (collected) => {
                let feedback = collected.first();
                if (feedback === null || feedback === void 0 ? void 0 : feedback.content)
                    title = feedback === null || feedback === void 0 ? void 0 : feedback.content;
            })
                .catch(async (collected) => {
                return await message.reply({
                    content: `❌ You took to long to respond giveaway creation aborted`,
                });
            });
            message.channel.send({ embeds: [giveawayDescriptionEmbed] });
            await message.channel
                .awaitMessages({
                filter,
                max: 1,
                time: 1800000,
            })
                .then(async (collected) => {
                let feedback = collected.first();
                if (feedback === null || feedback === void 0 ? void 0 : feedback.content)
                    description = feedback === null || feedback === void 0 ? void 0 : feedback.content;
            })
                .catch(async (collected) => {
                return await message.reply({
                    content: `❌ You took to long to respond giveaway creation aborted`,
                });
            });
            message.channel.send({ embeds: [giveawayPriceEmbed] });
            await message.channel
                .awaitMessages({
                filter,
                max: 1,
                time: 1800000,
            })
                .then(async (collected) => {
                let feedback = collected.first();
                if (feedback === null || feedback === void 0 ? void 0 : feedback.content)
                    price = feedback === null || feedback === void 0 ? void 0 : feedback.content;
            })
                .catch(async (collected) => {
                return await message.reply({
                    content: `❌ You took to long to respond giveaway creation aborted`,
                });
            });
            message.channel.send({ embeds: [giveawayRequirementsEmbed] });
            await message.channel
                .awaitMessages({
                filter,
                max: 1,
                time: 1800000,
            })
                .then(async (collected) => {
                let feedback = collected.first();
                if (feedback === null || feedback === void 0 ? void 0 : feedback.content) {
                    requirement = parseInt(feedback === null || feedback === void 0 ? void 0 : feedback.content);
                    if (isNaN(requirement))
                        return await message.reply({
                            content: `❌ You didn't supply a valid amount of invites`,
                        });
                }
            })
                .catch(async (collected) => {
                return await message.reply({
                    content: `❌ You took to long to respond giveaway creation aborted`,
                });
            });
            message.channel.send({ embeds: [giveawayDurationsEmbed] });
            await message.channel
                .awaitMessages({
                filter,
                max: 1,
                time: 1800000,
            })
                .then(async (collected) => {
                let feedback = collected.first();
                if (feedback === null || feedback === void 0 ? void 0 : feedback.content)
                    duration = feedback === null || feedback === void 0 ? void 0 : feedback.content;
            })
                .catch(async (collected) => {
                return await message.reply({
                    content: `❌ You took to long to respond giveaway creation aborted`,
                });
            });
            let giveawayId = Math.floor(100000 + Math.random() * 900000);
            let msDurration = (0, ms_1.default)(duration);
            let startdate = new Date();
            let enddate = new Date(startdate.getTime() + msDurration);
            let giveawayEmbed = new discord_js_1.MessageEmbed()
                .setTitle(title)
                .setDescription(`**${description}**\n\n**Price »** ${price} \n**Duration »** ${(0, ms_1.default)(msDurration, { long: true })} \n**Started by »** ${(_a = message.author) === null || _a === void 0 ? void 0 : _a.tag}`)
                .setColor(this.client.config.discord.embed.color)
                .setFooter(`Giveaway Id: ${giveawayId}`, `${(_b = message.author) === null || _b === void 0 ? void 0 : _b.displayAvatarURL()}`)
                .setTimestamp();
            const giveawayRow = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                .setCustomId("giveaway_enter")
                .setLabel("Join (0)")
                .setEmoji("🎉")
                .setStyle("PRIMARY"));
            const giveaway2Row = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                .setCustomId("giveaway_enter")
                .setLabel("Finished")
                .setEmoji("🎉")
                .setStyle("PRIMARY")
                .setDisabled(true));
            let giveawayMessage = await (channel === null || channel === void 0 ? void 0 : channel.send({
                embeds: [giveawayEmbed],
                components: [giveawayRow],
            }));
            setTimeout(async () => {
                var _a;
                let result = this.client.giveawaydb.getGiveaway(giveawayId, "giveawayID");
                let entries = result === null || result === void 0 ? void 0 : result.enteries.length;
                let winner = "No winner";
                if ((result === null || result === void 0 ? void 0 : result.enteries.length) != 0) {
                    let memberId = result === null || result === void 0 ? void 0 : result.enteries[Math.floor(Math.random() * (result === null || result === void 0 ? void 0 : result.enteries.length))];
                    let member = this.client.getUser(memberId);
                    winner = `<@${member === null || member === void 0 ? void 0 : member.user.id}> (${member === null || member === void 0 ? void 0 : member.user.id})`;
                }
                let giveaway2Embed = new discord_js_1.MessageEmbed()
                    .setTitle(`Giveaway ended`)
                    .setDescription(`**Title**\n${title}\n\n**Description**\n${description}\n\n**Winner »** ${winner}\n\n**Price »** ${price}\n\n**Entries »** ${entries}\n**Duration »** ${(0, ms_1.default)(msDurration, { long: true })} \n**Started by »** ${(_a = message.author) === null || _a === void 0 ? void 0 : _a.tag}`)
                    .setColor(this.client.config.discord.embed.color)
                    .setFooter(`Giveaway Id: ${giveawayId}`)
                    .setTimestamp();
                this.client.giveawaydb.updateGiveaway(giveawayId, "giveawayID", "active", false);
                this.client.giveawaydb.updateGiveaway(giveawayId, "giveawayID", "winner", winner);
                let giveawayMessage2 = await channel.messages.fetch(result === null || result === void 0 ? void 0 : result.messageID);
                await (giveawayMessage2 === null || giveawayMessage2 === void 0 ? void 0 : giveawayMessage2.edit({
                    embeds: [giveaway2Embed],
                    components: [giveaway2Row],
                }).catch((err) => console.log(err)));
            }, msDurration);
            this.messages.success("Giveaway Created", `Your giveaway has been sent to <#${channel === null || channel === void 0 ? void 0 : channel.id}> and has the id \`#${giveawayId}\``, message);
            this.client.giveawaydb.addGiveaway(message.member, title, description, price, channel.id, giveawayMessage === null || giveawayMessage === void 0 ? void 0 : giveawayMessage.id, startdate.toString(), enddate.toString(), msDurration, giveawayId, requirement).catch((err) => console.log(err));
        }
        catch (err) {
            console.log(err);
            return this.messages.error("Giveaway Error", `A error occured please contact the developer`, message);
        }
    }
}
exports.default = GiveawayCreateCommand;
