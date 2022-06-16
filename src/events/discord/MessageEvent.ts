import Event from "../../assets/classes/Event";
import { Bot } from "mineflayer";
import { Message } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import ms from 'ms';
import db from 'quick.db'

export default class MessageEvent extends Event {
    constructor(client: CustomClient, bot: Bot) {
        super(client, "on", "messageCreate");

        this.addHandler("DiscordHandler", (message: Message): boolean => {
            let run = true;
            let result = this.userdb.getUser(message.author.id, "discordID");
            if(!result && message.member && !message.author.bot) {
                this.userdb.addUser(message.member, '');
            }

            const args = message.content.split(/\s+/g);

            const cmd = args.shift()?.slice(client.prefix.length);
        
            if (!cmd) return false;
        
            let command = client.getCommand(cmd);

            if (!command) return false;

            if (command.help.type === "discord") {
                if (!message.content.startsWith(this.client.prefix)) run = false;
                if (!message.author) run = false;
            }
            
            return run;
        })

        this.addHandler("BothHandler", (message: Message): boolean => {
            let run = true; 

            const args = message.content.split(/\s+/g);

            const cmd = args.shift()?.slice(client.prefix.length);
        
            if (!cmd) return false;
        
            let command = client.getCommand(cmd);

            if (!command) return false;

            if (command.help.type === "both") {
                if (!message.content.startsWith(this.client.prefix)) run = false;
                if (!message.author) run = false;
            }
            
            return run;
        })
    }

    async execute(message: Message): Promise<void> {

        let afkCheck = await db.get(`afk_${message.author.id}`)
        if(afkCheck) {
            db.delete(`afk_${message.author.id}`)
            message.channel?.send(`\`${message.author.username}\` welcome back! | I removed your afk message `)
        }

        let member = message.mentions.members?.first()
        if (member && !message.author.bot) {
            let afk = await db.get(`afk_${member?.user.id}`)
            if(afk) {
                message.channel?.send(`\`${member.user.username}\` is afk | ${afk} `)
            }
        }
        let result = this.userdb.getUser(message.author.id, "discordID");
        if(message.mentions.everyone && result?.messages.everyone != undefined) this.userdb.updateUser(message.author?.id, "discordID", "everyone", result?.messages.everyone + 1)  
        if(message.mentions.repliedUser && result?.messages.replies != undefined) this.userdb.updateUser(message.author?.id, "discordID", "replies", result?.messages.replies + 1)  
        if(message.tts && result?.messages.tts != undefined) this.userdb.updateUser(message.author?.id, "discordID", "tts", result?.messages.tts + 1)  
        if(result?.messages.total != undefined) this.userdb.updateUser(message.author?.id, "discordID", "total", result?.messages.total + 1)  
        if(this.client.config.level_system.blacklisted_text_channels.indexOf(message.channel.id) == -1) {
            if(result?.messages.total && this.client.config.level_system.enabled) {
                let playerXp = 0
                if(result?.voiceTime && result?.voiceTime > 60000) playerXp = ((result?.messages.total + 1) * this.client.config.level_system.xp_per_message) + (result?.voiceTime / (this.client.config.level_system.xp_per_minute * 60000))
                else playerXp = ((result?.messages.total + 1) * this.client.config.level_system.xp_per_message) 
                playerXp = parseInt(playerXp.toFixed(0) as any)
                this.userdb.updateUser(message.author?.id, "discordID", "xp", playerXp)  
                this.client.config.level_system.xp_for_role.forEach(async (role) => {
                    if(role[1] <= playerXp) {
                        let xpRole = this.client.getRole(role[0])
                        if(xpRole && !message.member?.roles.cache.find(role => role == xpRole)) await message.member?.roles.add(xpRole)
                    }
                });
            }
        }

    }
}