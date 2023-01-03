module.exports = async (client,msg,MessageMedia)=> {

    let t = {}

    String(msg.body).split("-").slice(1).map(i=>{
        t[i.trim().split(" ")[0]]= i.trim().split(" ")[1]
    });
    
    let v = String(msg.body).split("-")[0].trim()

    switch(v){

        case "!l":
            await require("./Components/listAllGrps")(client,msg,t);
            break;

        case "!m":
            await require("./Components/mentionParticipants")(client,msg);
            break;

        case "!s":
            await require("./Components/sendBulk")(client,msg,t);
            break;

        case "!t":
            await require("./Components/test")(client);
            break;

        case "!d":
            console.log("\n --- Triggered ---\n");

            let csvread = require('../Templates/csvread')

            await require("./Components/addGrp")(client,msg,csvread);

            break;


        case "!e":
            console.log("\n-- Connection closed --\n");
            client.destroy();
            return;
        
        case "!g":
            await require("./Components/test2")(client,msg);
            break;
        
        case "!z":
            await require("./Components/sendGrpMessageMembers")(client,msg);
            break;
    }
}