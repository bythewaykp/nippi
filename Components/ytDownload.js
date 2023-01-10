let fs = require('fs')
const ytsr = require('ytsr');
const readline = require('readline');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');

module.exports = async (client,msg,t,MessageMedia) => {

    try{
        let chat = await msg.getChat()
        let from = await msg.author || msg.from
        let authorContact = await client.getContactById(from)

        console.log(`${t['main']} called at Group : '${chat.name}' by ${authorContact.name}`)

        if(t['t']!=undefined || t['url']!=undefined){

            let url;
    
            if(t['url']){
                url = t['url']
                if(!ytdl.validateURL(url)){
                    await msg.reply('not a valid youtube link vro')
                    return
                }
            }
            else{
                let searchResults = await ytsr(t['t'],{limit: 1})
                url = searchResults.items[0].url
            }
            
            await msg.react('⚡');
    
            let stream = ytdl(url, {quality: 'highestaudio'})
    
            stream.on('info', (info) => {
                title = info.videoDetails.title.split(" ")[0];
                ffmpeg(stream)
                    .audioBitrate(128)
                    .save(`./Files/${title}.mp3`)
                    
                    .on('progress', p => {
                        readline.cursorTo(process.stdout, 0);
                        process.stdout.write(`${p.targetSize}kb downloaded`);
                    })
                    .on('end', async () => {
                        media = MessageMedia.fromFilePath(`./Files/${title}.mp3`);
                        await msg.reply(media)
                        fs.unlinkSync(`./Files/${title}.mp3`)
                        console.log(`\nsent\n`);
                });
            })
        }
    }
    catch(e){
        console.log('yt error');
        console.log(e);
    }


    
}


