
module.exports = async (client,msg,t) => {

    let text = 

`_Hey I'm @${client.info.wid.user}, a friend to make your social life easier._

_The set of available commands are :_

*!h* : _help, the bravest thing to do is ask for help._

*!m* : _mention participants in a group_

*!s -author <authorname> -pack <packname>* : _send the quoted/ sent media as sticker_

*!p -a @<name1> @<name2>* : _promote mentioned member(s) as admin(s)_

*!p* : _promote author of quoted message as admin_

*!d -a @<name1> @<name2>* : _demote mentioned member(s) as admin(s)_

*!d* : _demote author of quoted message from admin_

*!y -url <video/audio url>* : _sends the audio of the youtube video matching the url_

*!y -t <name>* : _sends the audio of the youtube video matching the corresponding name_

*!v* : _see if nippi is turned on or off_

*!a -url <googlesheetsurl>* : _add participants to the group (2nd column should contain the numbers with a Header)_

*!a -num <num1>* : _add participants to the group (numbers should be newline seperated with first number space seperated)_

*!r @<user1>* : remove mentioned user(s) from the group

_Feel free to contact my owner @919947109776_
`

    await msg.react('⚡');

    let chat = await msg.getChat()
    let from = msg.author || msg.from 
    let sender = await client.getContactById(from)

    let mentions = [await client.getContactById('919947109776@c.us'),await client.getContactById(client.info.wid._serialized)]

    if(chat.isGroup){
        console.log(`${t['main']} called at Group : '${chat.name}' by ${sender.name || sender.pushname} aka ${sender.number}`);
    }
    else{
        console.log(`${t['main']} called by ${sender.name || sender.pushname} aka ${sender.number}`);
    }
    if(msg.hasQuotedMsg){
        let og = await msg.getQuotedMessage()
        await og.reply(text)
    }
    else{
        await msg.reply(text,null,{mentions})
    }

    
}


