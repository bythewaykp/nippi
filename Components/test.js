const fs = require('fs');
const delay = ms => new Promise(res => setTimeout(res, ms));

const listgrps= async(client)=>{

    console.log("\n --- Triggered ---\n")
    for(let i=0;i<10000;i++){

        client.sendMessage("918301936383@c.us","podi naaye")
        await delay(500)
    }
    console.log('done');
    // delay(1000)

}

module.exports = listgrps;