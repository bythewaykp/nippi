module.exports = async (client,msg,MessageMedia,vars,changeVars)=> {

    try{

        let t = {}
        String(msg.body).split(" -").slice(1).map(i=>{
            t[i.trim().split(" ")[0]]= i.trim().split(" ").slice(1).join(' ')
        });
        t['main'] = String(msg.body).split(" -")[0].trim()


        if(vars.all){

            if(msg.fromMe){
                switch(t['main']){
            
                    case ".l":
                        await require("./Components/listAllGrps")(client,msg,t);
                        break;
            
    
                    case ".p":
                        await require("./Components/adminPromote")(client,msg,t);
                        break;
            
                    
                    case ".b":
                        await require("./Components/sendBulk")(client,msg,t,MessageMedia);
                        break;
                }
                    
            }    

            switch(t['main']){

                case ".h":
                    await require("./Components/help")(client,msg,t);
                    break;
        
                case ".m":
                    await require("./Components/mentionParticipants")(client,msg,t);
                    break;
                
                case ".p":
                    await require("./Components/adminPromote")(client,msg,t);
                    break;

                case ".d":
                    await require("./Components/adminDemote")(client,msg,t);
                    break;
                
                case ".y":
                    await require("./Components/ytDownload")(client,msg,t,MessageMedia);
                    break;

                case ".t":
                    await require("./Components/test")(client,msg,t,MessageMedia);
                    break;

                case ".v":
                    await require("./Components/editVariables")(client,msg,t,vars,changeVars);
                    break;

                case ".z":
                    await require("./Components/sendGrpMessageMembers")(client,msg,t);
                    break;
                
                case ".s":
                    await require("./Components/sticker")(client,msg,t);
                    break;

                case ".a":
                    let gspread = require("./Templates/gspread")
                    await require("./Components/membersAdd")(client,msg,t,gspread);
                    break;
                
                case ".r":
                    await require("./Components/membersRemove")(client,msg,t);
                    break;
                
                case ".run":
                    await require("./Components/reRun")(client,msg,MessageMedia,vars,changeVars);
                    break;

            }
        }
        else{
            // msg not fromMe && turned off

            if(t['main']=='.v'){
                await require("./Components/editVariables")(client,msg,t,vars,changeVars);
            }
            else{

//                     mentions = [await client.getContactById(client.info.wid._serialized)]

//                     await msg.reply(

// `_nippi_ is turned off for everyone use

// contact @${client.info.wid.user}`,null,{mentions}
//                     )
            }
        }

    }
    catch(e){
        console.log(e);
    }
    
    
}