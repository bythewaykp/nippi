module.exports = async (client,msg,t) => {

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


let text = 

`!h : help, the bravest thing to do is ask for help.

!m : mention participants in a group

!s -author <authorname> -pack <packname>: send the quoted/ sent media as sticker

!p -a @<name1> @<name2> : promote mentioned member(s) as admin(s)

!p : promote author of quoted message as admin

!d -a @<name1> @<name2> : demote mentioned member(s) as admin(s)

!d : demote author of quoted message from admin

!y -url <video/audio url> : sends the audio of the youtube video matching the url

!y -t <name> : sends the audio of the youtube video matching the corresponding name

!n : see the list of notes saved in the group

!n -a <title>
<content> : add new note to the list

!n -d <title> : delete the particular note from the list

!v : see the status of command role set
`
