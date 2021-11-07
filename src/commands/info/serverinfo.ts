import { Message, MessageEmbed } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";
import moment from "moment";

export default class ServerInfoCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "serverinfo",
      description: "Get info from a server",
      arguments: "",
      example: "/serverinfo",
      category: "info",
      type: "discord",
      deleteMessage: true,
      cooldown: true,
      requirements: {
        args: { min: 0, max: 0 },
        userPermissions: [],
        clientPermissions: [],
        guildOnly: true,
      },
    });
  }

  async execute(message: Message, args: string[]): Promise<void> {
    try {

        const region = {
            "brazil": "Brazil :flag_br:",
            "europe": "Europe :flag_eu:",
            "india": "India :flag_in:",
            "japan": "Japan :flag_jp:",
            "singapore": "Singapore :flag_sg:",
            "us-central": "US-Central :flag_us:",
            "us-east": "US-East :flag_us:",
            "us-south": "US-South :flag_us:",
            "us-west": "US-West :flag_us:",
            "sydney": "Sydney :flag_au:",
            "hongkong": "Hong Kong :flag_hk:",
            "russia": "Russia :flag_ru:",
            "southafrica": "South Africa :flag_za:"
        };

        const titleCase = str => {
            return str.toLowerCase().replace(/_/g, " ").split(" ")
                      .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
                      .join(" ")
        }

        message.guild?.fetchOwner().then(ow => {
            let members = message.guild?.members.cache.filter(member => !member.user.bot).size;
            //let onlineMembers = message.guild.members.cache.filter(member => !member.user.bot).size;
            let bots = message.guild?.members.cache.filter(member => member.user.bot).size
            //let onlineBots = message.guild.members.cache.filter(member => member.user.bot).size;
            let textChannels = message.guild?.channels.cache.filter((c) => c.type === "GUILD_TEXT").size;
            let voiceChannels = message.guild?.channels.cache.filter((c) => c.type === "GUILD_VOICE").size;
            let categories = message.guild?.channels.cache.filter((c) => c.type == "GUILD_CATEGORY").size;
            let roleCount = message.guild?.roles.cache.size? message.guild?.roles.cache.size - 1 : 'Not Found';
    
            let icon = message.guild?.iconURL({ dynamic: true, size: 512 });

            let serverEmbed = new MessageEmbed()
            if(icon) {
              serverEmbed.setAuthor(`${message.guild?.name}'s Info`, icon)
              serverEmbed.setThumbnail(icon)
            } 
            else {
              serverEmbed.setTitle(`${message.guild?.name}'s Info`)
            }
            serverEmbed.setColor(this.client.config.discord.embed.color)
            serverEmbed.setDescription(`${message.guild?.name} was created on ${moment(message.guild?.createdAt).format("MMM DD YYYY")}`)
            serverEmbed.setFooter(this.client.config.discord.embed.footer)
            serverEmbed.addFields(
                    { name: "Total Users/Bots", value: `${message.guild?.members.cache.size} Users/Bots`, inline: true },
                    { name: "Users", value: `${members} Users`, inline: true },
                    { name: "Bots", value: `${bots} Bots`, inline: true },
                    { name: "Boosts", value: `${message.guild?.premiumSubscriptionCount} Boosts (Tier ${message.guild?.premiumTier})`, inline: true },
                    { name: "Text Channels", value: `${textChannels}`, inline: true },
                    { name: "Voice Channels", value: `${voiceChannels}`, inline: true },
                    { name: "Categories", value: `${categories}`, inline: true },
                    { name: "Verification Level", value: `${titleCase(message.guild?.verificationLevel)}`, inline: true },
                    { name: "AFK Timeout", value: (message.guild?.afkChannel) ? `${moment.duration(message.guild.afkTimeout * 1000).asMinutes()} minute(s)` : "None", inline: true },
                    { name: "AFK Channel", value: (message.guild?.afkChannel) ? `${message.guild.afkChannel.name}` : "None", inline: true },
                    { name: "Explicit Content Filter", value: `${titleCase(message.guild?.explicitContentFilter)}`, inline: true },
                    { name: "Emojis", value: `${message.guild?.emojis.cache.size}`, inline: true },
                    { name: "Roles", value: `${roleCount}`, inline: true },
                    { name: "Server Owner", value: `${ow.user.tag}`, inline: true },
                    { name: "Server ID", value: `${message.guild?.id}`, inline: true }
                )
    
            message.channel.send({embeds: [serverEmbed]})
    
        });

    } catch (err) {
      console.log(err);
      this.messages.error(
        "Assign Role Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
