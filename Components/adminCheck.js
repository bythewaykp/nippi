module.exports= async (client,msg,t) => {

    let chat = await msg.getChat()
    let from = msg.author || msg.from

    for (let k of chat.participants) {

        if(from == k.id._serialized && k.isAdmin){
            return true
        }
        else if (from == k.id._serialized && !k.isAdmin){
            return false
        }
    }

}

// let isadmin = await require('./adminCheck')(client,msg,t)

// if(isadmin){

// }
// else{

// }