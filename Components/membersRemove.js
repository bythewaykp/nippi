module.exports = addGrp = async (client,msg,t)=>{

    await msg.react('⚡');

    let chat = await msg.getChat()
    let from = msg.author || msg.from 
    let sender = await client.getContactById(from)

    console.log(`${t['main']} called at Group : '${chat.name}' by ${sender.name || sender.pushname} aka ${sender.number}`);
    
    if(chat.isGroup){
        
        let mentions = await msg.getMentions()

        let namelist=[]
        let removelist = []

        for(let i of mentions){

            let id = i.id._serialized
            let sender = await client.getContactById(id)
            namelist.push(sender.name)
            removelist.push(id)
        }
        
        try{
            await chat.removeParticipants(removelist)
            console.log(`removed ${namelist.join(", ")}`);

        }catch(e){
            console.log(`error occured while removing ${namelist.join(", ")}`);
        }

    }            

}             


