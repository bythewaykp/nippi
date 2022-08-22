const fs = require('fs');
const delay = ms => new Promise(res => setTimeout(res, ms));

const listgrps= async(client)=>{

    console.log("\n --- Triggered ---\n")
    const groups = (await client.getChats()).filter(c => c.isGroup)
    
    for(let i=0;i<groups.length;i++){

        var id = groups[i].id._serialized
        var name = (await client.getChatById(id)).name
        console.log(`${i+1}. ${name} - ${id}`);
        
        fs.appendFileSync('./Files/grpList.csv', `${i+1},${name},${id}\n`);
    }
    console.log("\n --- End of Line ---\n");

    delay(1000)

}

module.exports = listgrps;