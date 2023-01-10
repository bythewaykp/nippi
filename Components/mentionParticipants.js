module.exports = mentionParticipants = async (client, msg,t) => {

    const chat = await msg.getChat();

    let from = msg.author || msg.from

    let auth = await client.getContactById(from)

    console.log(`${t['main']} called at Group : '${chat.name}' by ${auth.name} aka ${auth.number}`);
    let text = "";
    let mentions = [];

    if(chat.isGroup){

        for (let k of chat.participants) {

            if(from == k.id._serialized && k.isAdmin){

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
            else if ((msg.author || msg.from) == k.id._serialized && !k.isAdmin){
                msg.reply('not admin vro')
            }

        }
    }

};
