let rxns = ['😌️','😉️','❤️','👌️','🤏️','✌️','🤙️','🫰️','👍️','🤝️','🫂️'];

let text = 
`!h : help, the bravest thing to do is asking for help.

!m : mention participants in a group

!p -a @<name1> @<name2> : promote mentioned member(s) as admin(s)
!p : promote author of quoted message as admin

!d -a @<name1> @<name2> : demote mentioned member(s) as admin(s)
!d : demote author of quoted message from admin

!y -url <video/audio url> : sends the audio of the youtube video matching the url
!y -t <name> : sends the audio of the youtube video matching the corresponding name
`

module.exports = async (client,msg,t) => {

    // await msg.react(rxns[Math.floor(Math.random()*rxns.length)]);
    await msg.react('⚡');
    const chat = await msg.getChat();
    let from = await client.getContactById(msg.author || msg.from)
    if(chat.isGroup){
        console.log(`${t['main']} called at Group : '${chat.name}' by ${from.name} aka ${from.number}`);
    }
    else{
        console.log(`${t['main']} called by ${from.name} aka ${from.number}`);
    }
    if(msg.hasQuotedMsg){
        let og = await msg.getQuotedMessage()
        await og.reply(text)
    }
    else{
        await msg.reply(text)
    }
    
}


