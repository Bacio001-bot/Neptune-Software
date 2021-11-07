import { Guild, GuildMember } from "discord.js";
import CustomClient from "../classes/Client";
import IUser from "../interfaces/IUser";

export default class Placeholder {
    client: CustomClient;
    guild?: Guild | undefined;
    getUser: (findBy: string, property: string) => IUser | null;

    constructor(client: CustomClient) {
        this.client = client;
        this.guild = this.client.getGuild();
        this.getUser = this.client.userdb.getUser;
    }

    replace(message: string, user: GuildMember | null, author: GuildMember | null, player: string | null): string {
        if (!message) return "";

        if (user) {
            const userData = this.getUser(user.id, "discordID");
            message = message
                    .replace("{userTag}", user.user.tag)
                    .replace("{userID}", user.id)
                    .replace("{userName}", user.displayName)
                    .replace("{userNick}", user.nickname ? user.nickname : user.displayName)
                    .replace("{userAvatar}", user.user.displayAvatarURL({ dynamic: true }))
                    .replace("{userMention}", user.toString())

        }

        if (author) {
            const authorData = this.getUser(author.id, "discordID");
            message = message
                    .replace("{authorTag}", author.user.tag)
                    .replace("{authorID}", author.id)
                    .replace("{authorName}", author.displayName)
                    .replace("{authorNick}", author.nickname ? author.nickname : author.displayName)
                    .replace("{authorAvatar}", author.user.displayAvatarURL({ dynamic: true }))
                    .replace("{authorMention}", author.toString())

        }

        if (player) {
            const userData = this.getUser(player, "ign");
            message = message
                    .replace("{playerTag}", userData ? userData.discordTag : "Not Linked")
                    .replace("{playerID}", userData ? userData.discordID : "Not Linked")

            
        }

        if (this.guild) {
            const owner = this.client.getUser(this.guild.ownerId);
            message = message 
                .replace("{guildName}", this.guild?.name)
                .replace("{guildIcon}", this.guild?.icon ? this.guild?.icon : "No Icon")
                .replace("{guildBoostTier}", this.guild.premiumTier)
                .replace("{guildMemberCount}", this.guild.memberCount.toString())

                .replace("{guildOwnerMention}", owner ? owner.user.toString() : "Owner Not Found")
                .replace("{guildOwnerTag}", owner ? owner.user.tag : "Owner Not Found")
                .replace("{guildOwnerAvatar}", owner ? owner.user.displayAvatarURL({ dynamic: true }) : "Owner Not Found")
                .replace("{guildOwnerName}", owner ? owner.displayName : "Owner Not Found")
        }

        message = message 
                .replace("{botTag}", this.client.user ? this.client.user.tag : "Invalid Client")
                .replace("{botID}", this.client.user ? this.client.user.id : "Invalid Client")
                .replace("{botMention}", this.client.user ? this.client.user.toString() : "Invalid Client")
                .replace("{botAvatar}", this.client.user ? this.client.user?.displayAvatarURL({ dynamic: true }): "Invalid Client")

        return message;
    }

    replaceWelcomeMessage(message: string, user: GuildMember | null) {

        if(message && user) 
            message = message
                    .replace("%MEMBER_MENTION%", `<@${user.user.id}>`)
                    .replace("%MEMBER_USERNAME%", user.user.username)
                    .replace("%MEMBER_TAG%", user.user.tag)
                    .replace("%GUILD_NAME%", user.guild.name)
                    .replace("%GUILD_ID%", user.guild.id)

        return message;

    }
}