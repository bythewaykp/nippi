const fs = require('fs');
const delay = ms => new Promise(res => setTimeout(res, ms));

const getOnlineStatus= async (client) =>{

    // if (this.isMe) return null;
    const chatId = '918301936383@c.us';
    return client.pupPage.evaluate(async (chatId) => {
        let chat = await window.Store.Chat.get(chatId);
        console.log(chat);
        return chat.presence.isOnline;
    }, chatId);
}

module.exports = getOnlineStatus;