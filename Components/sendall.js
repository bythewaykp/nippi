const fs = require('fs');
// const { MessageMedia } = require('whatsapp-web.js');
const delay = ms => new Promise(res => setTimeout(res, ms));

const sendall= async(client)=>{
    
    console.log("triggered all")

    const csvread = require('../Templates/csvread')
    const arr = await csvread('../Files/test.csv')

    // const media1 = MessageMedia.fromFilePath('./Files/1.jpeg');
    
    for(let i=1;i<arr.length;i++){
        
        var name = (arr[i][0])
        var num = arr[i][1]
        await delay(1000)

        // console.log(name,num);

        // client.sendMessage(`${num}@c.us`,media1 );
        // client.sendMessage(`${num}@c.us`,`wed` );
        
        
    }

}
sendall()
module.exports = sendall;