module.exports = mentionParticipants = async (client, msg) => {

    // const chat = await msg.getChat();
    let chat = await require('../Templates/basicCheckGroupChat')(client,msg)

    let from = msg.author || msg.from
    let sender = await client.getContactById(from)
    console.log(`.m called at Group : '${chat.name}' by ${sender.name || sender.pushname} aka ${sender.number}`);

    let text = "";
    let mentions = [];
    
    if(chat){

        await msg.react('⚡');

        for(let p of chat.participants){

            if(from == p.id._serialized){
                continue
            }

            let contact = await client.getContactById(
                p.id._serialized
            );

            mentions.push(contact);
    
            text += `@${p.id.user} `
            
        }
        if(msg.hasQuotedMsg){
            let og = await msg.getQuotedMessage();
            if(og._data.t!=undefined){
                og.reply(text, null,{ mentions });
            }
            else{
                msg.reply('Message was sent before I was added to the Chat')
            }
        }
        else{
            chat.sendMessage(text,{mentions})
        }
    }

};
