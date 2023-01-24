let fs = require('fs')
const ytsr = require('ytsr');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');

module.exports = async (client,msg,t,MessageMedia) => {

    let chat = await msg.getChat()
    let from = msg.author || msg.from 
    let sender = await client.getContactById(from)

    if(chat.isGroup){
        console.log(`.y called at Group : '${chat.name}' by ${sender.name || sender.pushname} aka ${sender.number}`);
    }
    else{
        console.log(`.y called by ${sender.name || sender.pushname} aka ${sender.number}`);
    }

    let url;

    if(ytdl.validateURL(t)){

    }
    else{
        //not url
        let searchResults = await ytsr(t,{limit: 1})
        url = searchResults.items[0].url
        if(!url){
            await msg.reply('no search results found vro')
            return
        }
        await msg.react('⚡');

        try{
    
            let stream = ytdl(url, {quality: 'highestaudio'})
            
            stream.on('info', (info) => {

                title = info.videoDetails.title.split(" ")[0];

                try{

                    ffmpeg(stream)
                    .audioBitrate(128)
                    // .noVideo()
                    .save(`./Files/${title}.mp3`)
                    .on('start', p => {
                        console.log('started download');
                    })
                    .on('progress', p => {
                        process.stdout.write(`${p.targetSize} kb downloaded at ${p.currentKbps} kbps\r`);
                    })
                    .on('error',e=>{
                        console.log(e);
                    })
                    .on('end', async () => {
                        process.stdout.clearLine()
                        process.stdout.write("completed\n");

                        media = MessageMedia.fromFilePath(`./Files/${title}.mp3`);
                        await msg.reply(media)
                        console.log(`sent`);
                        fs.unlinkSync(`./Files/${title}.mp3`)
                });


                }
                catch(e){
                    console.log('ffmpeg err');
                }

            })

        }
        catch(e){
            console.log('yt error');
        }
    }

}


