import {
    Message,
  } from "discord.js";
  import CustomClient from "../../assets/classes/Client";
  import Command from "../../assets/classes/Command";
  
  export default class PurgeCommand extends Command {
    constructor(client: CustomClient) {
      super(client, {
        name: "purge",
        description: "purge messages",
        arguments: "<messageCount>",
        example: "/purge 99",
        category: "moderation",
        type: "discord",
        deleteMessage: true,
        cooldown: true,
        requirements: {
          args: { min: 1, max: 1 },
          userPermissions: ["MANAGE_MESSAGES"],
          clientPermissions: ["MANAGE_MESSAGES"],
          guildOnly: true,
        },
      });
    }
  
    async execute(message: Message, args: string[]): Promise<void> {
      try {
        let deleteAmounts = parseInt(args[0]);
            if (isNaN(deleteAmounts) || deleteAmounts >= 100) return this.messages.error(
                "Purge Error",
                `Give a number between 1 / 100`,
                message
              );
            await (message.channel as any).bulkDelete(deleteAmounts + 1, true)
            this.messages.success(
                "Purge",
                `**${deleteAmounts}** messages have been purged`,
                message
              );
      } catch (err) {
        console.log(err);
        return this.messages.error(
          "Purge Error",
          `A error occured please contact the developer`,
          message
        );
      }
    }
  }
  