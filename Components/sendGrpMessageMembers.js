const delay = (ms) => new Promise((res) => setTimeout(res, ms));

module.exports = async(client,msg)=>{

    let chat = await msg.getChat();
    if(msg.hasQuotedMsg){
        let og = await msg.getQuotedMessage();
        let k = await og.downloadMedia()   

        for(let p of chat.participants){
            await delay(500+100*Math.random())
            let id = await client.getChatById(p.id._serialized)
            console.log(id.name)
            client.sendMessage(p.id._serialized,k,{caption:og.body})
        }
    }
    
    


}