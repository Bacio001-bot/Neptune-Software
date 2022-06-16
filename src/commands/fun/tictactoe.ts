import { Message, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton, MessageComponentType } from "discord.js";
import CustomClient from "../../assets/classes/Client";
import Command from "../../assets/classes/Command";

export default class FunCommand extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "tictactoe",
      description: "Play some fun tictactoe games",
      arguments: "[user] ",
      example: "/tictactoe bacio001 5",
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

  async execute(message: Message, args: string[]): Promise<void> {
    try {

        let winOptions = [
            [0, 1, 2], 
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6], 
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2],
        ]

        let player1Plays:any = []
        let player2Plays:any = []
        let winner = ''

        let player1 = message.member
        let player2 = message.mentions.members?.first()

        const buttonsRow1 = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('block_0')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),

            new MessageButton()
            .setCustomId('block_1')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),        
            
            new MessageButton()
            .setCustomId('block_2')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),        
            

        );

        const buttonsRow2 = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('block_3')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),

            new MessageButton()
            .setCustomId('block_4')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),        
            
            new MessageButton()
            .setCustomId('block_5')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),        
            

        );

        const buttonsRow3 = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('block_6')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),

            new MessageButton()
            .setCustomId('block_7')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),        
            
            new MessageButton()
            .setCustomId('block_8')
            .setEmoji('🔳')
            .setStyle('PRIMARY'),        
            
        );

        let msg = await message.channel.send({content: `**Tic Tac Toe ${player1?.user.tag} VS ${player2?.user.tag}**`, components: [buttonsRow1, buttonsRow2, buttonsRow3]})

        const filter = (button) => button.user.id === player1?.user.id || button.user.id === player2?.user.id;
        const collector = msg.createMessageComponentCollector({
          filter,
          time: 1800000,
          componentType: "BUTTON",
        });

        let lastClick: any = ""

        collector.on("collect", async (it) => {

            if(lastClick == it.member?.user ) return it.deferUpdate()

            lastClick = it.member?.user

            let one:any = []
            
            it.message.components?.forEach((component) => {

                component.components.forEach(element => {
                    let number: any = it.customId.split("_")
                    number = parseInt(number[1])
                    try {
                        if(element.customId == it.customId) {

                            if(it.member == message.member) {
                                element.setEmoji('⚫')
                                player1Plays.push(number)
                            }
                            else {
                                element.setEmoji('❌')
                                player2Plays.push(number)
                            }

                            winOptions.forEach(win => {
                                let p1Number = 0
                                let p2Number = 0
                                player1Plays.forEach(p1 => {
                                    let index = win?.indexOf(p1)
                                    if(index != -1) p1Number = p1Number + 1
                                });
                                player2Plays.forEach(p2 => {
                                    let index = win?.indexOf(p2)
                                    if(index != -1) p2Number = p2Number + 1
                                });  
        
                                if(p1Number == 3) return winner = "player1"        
                                if(p2Number == 3) return winner = "player2"           
        
                            })

                            if(winner != '') {
                                it.message.components?.forEach((component) => {
    
                                    component.components.forEach(element => {
                                        element.setDisabled(true)
                                    })
    
                                })
                            }
                        }
                    } 
                    catch{(err) => console.log(err)}

                });

                one.push(component)

            })

            if(winner != '') {
                if(winner == 'player1') {
                    it.update({
                        content: `${player1?.user.tag} has won the game!`,
                        components: one
                    }).catch();
                } else {
                    it.update({
                        content: `${player2?.user.tag} has won the game!`,
                        components: one
                    }).catch();
                }
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
