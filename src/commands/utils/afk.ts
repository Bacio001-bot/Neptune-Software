            import { Message, MessageEmbed } from "discord.js";
            import CustomClient from "../../assets/classes/Client";
            import Command from "../../assets/classes/Command";
            import db from "quick.db"
            
            export default class VerifyCommand extends Command {
              constructor(client: CustomClient) {
                super(client, {
                  name: "afk",
                  description: "Tell everyone you're afk",
                  arguments: "<message>",
                  example: "/afk Hey everyone I'm currently afk",
                  category: "utils",
                  type: "discord",
                  deleteMessage: true,
                  cooldown: true,
                  requirements: {
                    args: { min: 1, max: 1000 },
                    userPermissions: ["SEND_MESSAGES"],
                    clientPermissions: ["SEND_MESSAGES"],
                    guildOnly: true,
                  },
                });
              }
            
              async execute(message: Message, args: string[]): Promise<void> {
                try {
                    setTimeout( function() {
                        db.set(`afk_${message.author.id}`, args.toString().replace(',', ' '))
                        message.channel.send(`<@${message.author.id}> | Set your afk: \`${args.toString().replace(',', ' ')}\` `);
                    }, 2000)

                } catch (err) {
                  console.log(err);
                  this.messages.error(
                    "Afk Error",
                    `A error occured please contact the developer`,
                    message
                  );
                }
              }
            }
            