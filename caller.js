module.exports = async (client,msg,MessageMedia,vars)=> {

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
        
                case "!s":
                    await require("./Components/sendBulk")(client,msg,t);
                    break;
        
                case "!t":
                    await require("./Components/test")(client,msg,t);
                    break;

                case "!a":
                    let gspread = require("./Templates/gspread")
                    await require("./Components/addMembers")(client,msg,t,gspread);
                    break;
        
                case "!w":
                    console.log("\n --- Triggered ---\n");
        
                    let csvread = require('../Templates/csvread')
        
                    await require("./Components/addGrp")(client,msg,csvread);
        
                    break;
        
        
                case "!e":
                    console.log("\n-- Connection closed --\n");
                    client.destroy();
                    return;
                
                
                case "!z":
                    await require("./Components/sendGrpMessageMembers")(client,msg,t);
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
                
                case "!v":
                    console.log(vars);
                    break;

                case "!ack":
                    client.on('message_ack',(msg,id)=>{
                        console.log(msg.body,id);
                    })
                    break
            }
            
        }
        else{

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

                // case "!t":
                //     await require("./Components/test")(client,msg,t);
                //     break;
            }

        }

    }
    catch(e){
        console.log('error');
        console.log(e);
    }

    
}