import { Message, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton, MessageComponentType } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";

export default class FunCommand extends Command {
  constructor(client: CustomClient) {
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

  async execute(message: Message, args: string[]): Promise<void> {
    try {

        let bombs = parseInt(args[1]) || 5 
        let player1 = message.member
        let player2 = message.mentions.members?.first()
        let bombButtons:string[] = []

        for(let i = 0; bombs > i; i++ ) {

            let bombButton = Math.floor(Math.random() * (25 - 1 + 1) + 1)
            let bombButtonName = `mine_` + bombButton
            let indexOfButton = bombButtons.indexOf(bombButtonName)
            if(indexOfButton != -1) {
                i = i - 1
            } else {
                bombButtons.push(bombButtonName)
            }

        }

        const buttonsRow1 = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('mine_1')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),

            new MessageButton()
            .setCustomId('mine_2')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),        
            
            new MessageButton()
            .setCustomId('mine_3')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),        
            
            new MessageButton()
            .setCustomId('mine_4')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),

            new MessageButton()
            .setCustomId('mine_5')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),
        );

        const buttonsRow2 = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('mine_6')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),

            new MessageButton()
            .setCustomId('mine_7')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),        
            
            new MessageButton()
            .setCustomId('mine_8')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),        
            
            new MessageButton()
            .setCustomId('mine_9')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),

            new MessageButton()
            .setCustomId('mine_10')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),
        );

        const buttonsRow3 = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('mine_11')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),

            new MessageButton()
            .setCustomId('mine_12')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),        
            
            new MessageButton()
            .setCustomId('mine_13')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),        
            
            new MessageButton()
            .setCustomId('mine_14')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),

            new MessageButton()
            .setCustomId('mine_15')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),
        );

        const buttonsRow4 = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('mine_16')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),

            new MessageButton()
            .setCustomId('mine_17')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),        
            
            new MessageButton()
            .setCustomId('mine_18')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),        
            
            new MessageButton()
            .setCustomId('mine_19')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),

            new MessageButton()
            .setCustomId('mine_20')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),
        );

        const buttonsRow5 = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('mine_21')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),

            new MessageButton()
            .setCustomId('mine_22')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),        
            
            new MessageButton()
            .setCustomId('mine_23')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),        
            
            new MessageButton()
            .setCustomId('mine_24')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),

            new MessageButton()
            .setCustomId('mine_25')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),
        );

        if(args[1] && !isNaN(args[1] as any)) bombs = parseInt(args[1])

        let msg = await message.channel.send({content: `**Minesweeper ${player1?.user.tag} VS ${player2?.user.tag} Bombs: ${bombs.toString()}**`, components: [buttonsRow1, buttonsRow2, buttonsRow3, buttonsRow4, buttonsRow5]})

        const filter = (button) => button.user.id === player1?.user.id || button.user.id === player2?.user.id;
        const collector = msg.createMessageComponentCollector({
          filter,
          time: 1800000,
          componentType: "BUTTON",
        });

        let lastClick

        collector.on("collect", async (it) => {

            if(lastClick == it.member?.user ) return it.deferUpdate()

            lastClick = it.member?.user

            let bombIndex = bombButtons.indexOf(it.customId)
            let bomb = false

            if(bombIndex != -1) {
                bomb = true
            }

            let one:any = []
            
            it.message.components?.forEach((component) => {

                component.components.forEach(element => {

                    try {
                        if(element.customId == it.customId) {
                            if(bomb) {
                                element.setEmoji('💣')
                                it.message.components?.forEach((component) => {
    
                                    component.components.forEach(element => {
                                        element.setDisabled(true)
                                    })
    
                                })
    
                                
                            }
                            if(!bomb) element.setEmoji('✅')
                        }
                    } 
                    catch{(err) => console.log(err)}

                });

                one.push(component)
            })

           
            if(bomb){ it.update({
                    content: `${lastClick.tag} has lost the game!`,
                    components: one
                }).catch();
            } else {
                it.update({
                    components: one
                }).catch();
            }

    
        });

    } catch (err) {
      console.log(err);
      return this.messages.error(
        "Hangman Error",
        `A error occured please contact the developer`,
        message
      );
    }
  }
}
