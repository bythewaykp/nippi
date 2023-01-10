const fs = require('fs');
// const ytdl = require('ytdl-core');
// // TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// // TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// // TypeScript: import ytdl = require('ytdl-core'); with neither of the above

// ytdl('http://www.youtube.com/watch?v=aqz-KE-bpKQ').pipe(fs.createWriteStream('video.mp4'));

const ytsr = require('ytsr');
const readline = require('readline');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');


let ap = async (url,title)=>{

// let basic = await ytdl.getBasicInfo(url, [])
// console.log(basic);
    
}
let pa = async ()=>{

    const searchResults = await ytsr('khwaab anumita',{limit: 1})

    let [url,title] = searchResults.items[0]

    let stream = ytdl(url, {quality: 'highestaudio'})
    
    ffmpeg(stream)
        .audioBitrate(128)
        .save(`${__dirname}/Files/${title}.mp3`)
        // .on('progress', p => {
        //     readline.cursorTo(process.stdout, 0);
        //     process.stdout.write(`${p.targetSize}kb downloaded`);
        // })
        .on('end', async () => {
            // console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
        });

}

// async ytdl.getInfo(url, [options])



