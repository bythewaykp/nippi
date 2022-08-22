const fs = require('fs');

const listgrps2= async(client)=>{
    console.log("triggered")
    
    const csvread = require('../Templates/csvread')
    const arr = await csvread('./Files/grpList.csv')
    const delay = ms => new Promise(res => setTimeout(res, ms));

    for(var i =30;i<arr.length;i++){
        await delay(1000)
        var name = (arr[i][1])
        var num = arr[i][2]
        console.log(`${i} - ${name} - ${num}`);
        fs.appendFileSync('./Files/grpList2.csv', `${i},${name},${num},\n`);
    }
}

module.exports = listgrps2;