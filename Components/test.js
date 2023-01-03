const fs = require('fs');
const delay = ms => new Promise(res => setTimeout(res, ms));

const getOnlineStatus= async (client) =>{
    try{

        const chatId = '917306487647@c.us';
        let b = await client.pupPage.evaluate(async (chatId) => {
            let chat = await window.Store.Chat.get(chatId);
            // return chat
            // console.log(chat.presence);
            return chat.presence.isOnline;
        }, chatId);
        console.log(b);

    }
    catch(e){
        console.log('err');
    
    }

}

module.exports = getOnlineStatus;