module.exports= async (client,msg,t) => {

    await msg.react('⚡');

    let og = msg

    if(msg.hasQuotedMsg){
        og = await msg.getQuotedMessage();
    }

    if(og.hasMedia){

        let media = await og.downloadMedia();
        
        if (media.mimetype && (media.mimetype.includes("image") || media.mimetype.includes("video"))) {

            await msg.reply(media, null, { sendMediaAsSticker: true, stickerAuthor: t['author']?`${t['author']} with 🤍 nippi`:`with 🤍 nippi`, stickerName: t['pack']??"Shuttu & Nippi" });
     
        }
        else{
            //mimetype not image/video
            await msg.reply('media format not supported yet')
        }
    }

    else{
        //has no media
        await msg.reply('Message must contain some media to run this command')
    }

}
    


