const delay = (ms) => new Promise((res) => setTimeout(res, ms));

module.exports = async(client,msg)=>{

    let chat = await msg.getChat();
    if(msg.hasQuotedMsg){
        let og = await msg.getQuotedMessage();
        

        for(let p of chat.participants){
            // await delay(500+100*Math.random())

            let individualChat = await client.getChatById(p.id._serialized)
            if((await individualChat.getContact()).isMe){
                continue
            }
            console.log(`${(await individualChat.getContact()).name} : ${individualChat.name}`)

            if(msg.hasMedia){
                let k = await og.downloadMedia()   
                await client.sendMessage(p.id._serialized,k,{caption:
`${og.body}

    _~ forwarded from ${chat.name}_`})
            }
            else{
//                 await client.sendMessage(p.id._serialized,
// `${og.body}
                
//     _~ forwarded from group : ${chat.name}_`)
            }
            
        }
    }
    
    


}