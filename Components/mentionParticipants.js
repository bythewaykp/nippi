module.exports = mentionParticipants = async (client, msg,t) => {

    const chat = await msg.getChat();

    let from = msg.author || msg.from

    let auth = await client.getContactById(from)

    console.log(`${t['main']} called at Group : '${chat.name}' by ${auth.name} aka ${auth.number}`);
    let text = "";
    let mentions = [];

    if(chat.isGroup){

        let isadmin = await require('./adminCheck')(client,msg,t)

        if(isadmin){
            
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
                    og.reply(text, null,{ mentions });
                }
                else{
                    chat.sendMessage(text,{mentions})
                }
        }
        else{
            msg.reply('not admin vro')
        }

    }

};
