module.exports = mentionParticipants = async (client, msg) => {

    const chat = await msg.getChat();
    console.log(`${chat.name} triggered!`);
    let text = "";
    let mentions = [];


    for (let participant of chat.participants) {
        const contact = await client.getContactById(
            participant.id._serialized
        );
        mentions.push(contact);

        if(participant.id.user!=msg.from.split('@')[0]){
            text += `@${participant.id.user} `;
        }
    }

    try {
        if(msg.hasQuotedMsg){
            let og = await msg.getQuotedMessage();
            og.reply(text, null, { mentions });
        }
        else{
            // console.log(text);
            chat.sendMessage(text,{mentions})
            

        }
    } catch (err) {
        console.log(err);
    }

    // if (msg.fromMe && msg.body == "!r") {
    //     // client.removeAllListeners()
        
    //     // client.removeListener("message_create",()=>{
    //     //     console.log('removed msg_create');
    //     // })
    //     return
    // }

    // if (msg.fromMe && msg.body == "!skwadoosh") {

    //     const chat = await msg.getChat();
    //     console.log(`${chat.name} triggered!`);
    //     let text = "";
    //     let mentions = [];


    //     for (let participant of chat.participants) {
    //         const contact = await client.getContactById(
    //             participant.id._serialized
    //         );
    //         mentions.push(contact);

    //         if(participant.id.user!=msg.from.split('@')[0]){
    //             text += `@${participant.id.user} `;
    //         }
    //     }

    //     try {
    //         if(msg.hasQuotedMsg){
    //             let og = await msg.getQuotedMessage();
    //             og.reply(text, null, { mentions });
    //         }
    //         else{
    //             // console.log(text);
    //             chat.sendMessage(text,{mentions})
                

    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
};
