
module.exports = async (client,msg,MessageMedia,vars,changeVars) => {

    const chat = await msg.getChat();
    
    if(chat.isGroup){

        if(msg.hasQuotedMsg){
            let og = await msg.getQuotedMessage()
            await require('../caller')(client,og,MessageMedia,vars,changeVars)
        }
    }
    else{
        // msg.reply('use the command in GroupChat vro')
    }
    
}


