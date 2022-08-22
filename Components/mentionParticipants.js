
const mentionParticipants= async(client)=>{

    console.log("\n --- Triggered ---\n")
    
    client.on('message', async (msg) => {

        if(msg.body == '!skwadoosh') {

            const chat = await msg.getChat();
            let text = "";
            let mentions = [];
    
            for(let participant of chat.participants) {

                const contact = await client.getContactById(participant.id._serialized);
                mentions.push(contact);
                text += `@${participant.id.user} `;
            }
    
            await chat.sendMessage(text, { mentions });
        }
        
    });

}

module.exports = mentionParticipants;