let axios = require('axios')

module.exports = async (client,msg,MessageMedia,mongoose)=> {

    try{

        let t = {}
        String(msg.body).split(" -").slice(1).map(i=>{
            t[i.trim().split(" ")[0]]= i.trim().split(" ").slice(1).join(' ')
        });
        t['main'] = String(msg.body).split(" -")[0].trim()

        
        if(msg.fromMe){

            switch(t['main']){

                case "!h":
                    await require("./Components/help")(client,msg,t);
                    break;
        
                case "!l":
                    await require("./Components/listAllGrps")(client,msg,t);
                    break;
        
                case "!m":
                    await require("./Components/mentionParticipants")(client,msg,t);
                    break;

                case "!p":
                    await require("./Components/makeAdmin")(client,msg,t);
                    break;
    
                case "!d":
                    await require("./Components/demoteAdmin")(client,msg,t);
                    break;

                case "!y":
                    await require("./Components/ytDownload")(client,msg,t,MessageMedia);
                    break;
        
                case "!t":
                    await require("./Components/test").default(client,msg,t,mongoose);
                    break;

                case "!s":
                    await require("./Components/sendBulk")(client,msg,t);
                    break;
        
                case "!a":
                    let gspread = require("./Templates/gspread")
                    await require("./Components/addMembers")(client,msg,t,gspread);
                    break;
                
                
                case "!z":
                    await require("./Components/sendGrpMessageMembers")(client,msg,t);
                    break;
                
                
                case "!v":
                    await require("./Components/editVariables")(client,msg,t);
                    break;

                // case "!ack":
                //     client.on('message_ack',(msg,id)=>{
                //         console.log(msg.body,id);
                //     })
                //     break
            }
            
        }
        else{
            //msg not fromMe

            let vars = await axios.get("http://localhost:3000/vars").then(r=>{

                return r.data

            }).catch((e)=>{
                console.log(e);
            })

            if(vars.all){

                switch(t['main']){
    
                    case "!h":
                        await require("./Components/help")(client,msg,t);
                        break;
            
                    case "!m":
                        await require("./Components/mentionParticipants")(client,msg,t);
                        break;
                    
                    case "!p":
                        await require("./Components/makeAdmin")(client,msg,t);
                        break;
    
                    case "!d":
                        await require("./Components/demoteAdmin")(client,msg,t);
                        break;
                    
                    case "!y":
                        await require("./Components/ytDownload")(client,msg,t,MessageMedia);
                        break;
    
                    case "!t":
                        await require("./Components/test").default(client,msg,t);
                        break;
    
                    case "!n":
                        await require("./Components/savedNotes")(client,msg,t);
                        break;
                    case "!v":
                        await require("./Components/editVariables")(client,msg,t);
                        break;

                }
            }
            else{
                // msg not fromMe && turned off

                if(t['main']=='!v'){
                    await require("./Components/editVariables")(client,msg,t);
                }
                else{

                    mentions = [await client.getContactById(client.info.wid._serialized)]
                    await msg.reply(

`_nippi_ is turned off for everyone use

contact @${client.info.wid.user}`,null,{mentions}
                    )
                }
            }

        }

    }
    catch(e){
        console.log('error');
        console.log(e);
    }

    
}