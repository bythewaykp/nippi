
module.exports = async (client,msg,t) => {

    const chat = await msg.getChat();
    
    if(chat.isGroup){

        let from = msg.author || msg.from
        
        for (let k of chat.participants){
            
            if(from == k.id._serialized){

                if(k.isAdmin){
                    
                    await msg.react('⚡');
                    
                    let commandAuthor = await client.getContactById(from)
    
                    console.log(`${t['main']} called at Group : '${chat.name}' by ${commandAuthor.name} aka ${commandAuthor.number}`);
    
                    if(msg.hasQuotedMsg){
                        let og = await msg.getQuotedMessage()
                        let ogAuth = og.author || og.from
    
                        for ( let p of chat.participants){
    
                            if (p.id._serialized == ogAuth){

                                let mentions = []
                                mentions.push(await client.getContactById(p.id._serialized))
                                mentions.push(await client.getContactById(from));
    
                                if(p.isAdmin){
                                    msg.reply('alredi admin vro')
                                }
                                else{
                                    await chat.promoteParticipants([ogAuth])
                                    msg.reply(`promoted @${p.id.user} by @${from.split("@")[0]}`, null,{ mentions});

                                }
                            }
                        }                    
                        
                    }
                    else{
    
                        let mentions = await msg.getMentions()
    
                        let toAdmin = []
                        let toAdminText =[]    
                        let alreadyAdminText = []
    
    
                        if(mentions.length==0){
                            msg.reply('atleast one member should be mentioned or tagged to promote')
                        }
    
                        else{
    
                            for(let p of chat.participants){
    
                                for ( let i of mentions){
                                    if(i.id._serialized == p.id._serialized){
    
                                        if(p.isAdmin){
                                            alreadyAdminText.push( `@${p.id.user}`)
                                        }
                                        else{
                                            toAdmin.push(p.id._serialized)
                                            toAdminText.push( `@${p.id.user}`)
                                        }
                                        
                                    }
                                }
                            }
    
                            
                            mentions.push(await client.getContactById(from));
                            
                            if(toAdminText.length==0){
                                msg.reply(`Members mentioned are already admins`);
                            }
                            else{
    
                                await chat.promoteParticipants(toAdmin)
    
                                if(alreadyAdminText.length==0){
                                    msg.reply(`promoted ${toAdminText.join(', ')} by @${from.split("@")[0]}`, null,{ mentions});
                                }
                                else if(alreadyAdminText.length==1){
                                    msg.reply(`promoted ${toAdminText.join(', ')} by @${from.split("@")[0]} ~ ${alreadyAdminText.join(', ')} is already an admin`, null,{ mentions});
                                }
                                else{
                                    msg.reply(`promoted ${toAdminText.join(', ')} by @${from.split("@")[0]} ~ ${alreadyAdminText.join(', ')} are already admins`, null,{ mentions});
                                }
                            }
                        }
    
                    }
                }
                else{
                    await msg.reply('not an admin vro')
                }
                
            }
        }        
    }
    else{
        msg.reply('use the command in GroupChat vro')
    }
    
}


