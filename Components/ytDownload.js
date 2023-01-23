let fs = require('fs')
const ytsr = require('ytsr');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');

module.exports = async (client,msg,t,MessageMedia) => {

    
    let chat = await msg.getChat()
    let from = msg.author || msg.from 
    let sender = await client.getContactById(from)

    if(chat.isGroup){
        console.log(`${t['main']} called at Group : '${chat.name}' by ${sender.name || sender.pushname} aka ${sender.number}`);
    }
    else{
        console.log(`${t['main']} called by ${sender.name || sender.pushname} aka ${sender.number}`);
    }
    
    if(t['t']!=undefined || t['url']!=undefined){
        
        let url;
        
        if(t['url']){
            url = t['url']
            if(!ytdl.validateURL(url)){
                await msg.reply('not a valid youtube link vro')
                return
            }
        }
        else if (t['t']){

            
            let searchResults = await ytsr(t['t'],{limit: 1})
            url = searchResults.items[0].url
            if(!url){
                await msg.reply('no search results found vro')
                return
            }
                        
        }

        await msg.react('⚡');

        try{
    
            let stream = ytdl(url, {quality: 'lowestaudio'})
            
            stream.on('info', (info) => {
                
                // stream.pipe(fs.createWriteStream('a.mp4'))
                // .on('close', function() {
                //     console.info("closed");
                // })
                // .on('error', (error) => {
                //     console.warn("error occured");
                // })
                // console.log(info);
  

                title = info.videoDetails.title.split(" ")[0];

                try{

                    ffmpeg(stream)
                    .audioBitrate(128)
                    .noVideo()
                    .save(`./${title}.mp3`)
                    .on('start', p => {
                        console.log('started download');
                    })
                    .on('progress', p => {
                        process.stdout.write(`${p.targetSize} kb downloaded at ${p.currentKbps} kbps\r`);
                    })
                    .on('end', async () => {
                        process.stdout.clearLine()
                        process.stdout.write("completed\n");

                        media = MessageMedia.fromFilePath(`./Files/${title}.mp3`);
                        await msg.reply(media)
                        fs.unlinkSync(`./${title}.mp3`)
                        console.log(`completed download`);
                });


                }
                catch(e){
                    console.log('ffmpeg err');
                }

            })

            // stream.on('finish', async () => {
            //     // stream.destroy()
            //     console.log('closed stream');
            // });
        }
        catch(e){
            console.log('yt error');
        }


    }
}


