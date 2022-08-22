const addgrp= async (client)=>{

    console.log("\n --- Triggered ---\n")

    const csvread = require('../Templates/csvread')
    const arr = await csvread('../Files/a.csv')

    client.on('message',async (msg)=>{

        console.log(msg.body);
        if(msg.body=='!add'){
            console.log("triggered!");
            
            const list2=[]
            var k =""
            arr.forEach((x,i)=>{
                if(i){
                    k = x[3]
                    list2.push(`91${k.substring(k.length - 10)}@c.us`)
                }
            })
            let chat = await msg.getChat();
            console.log(list2,chat);
            await chat.addParticipants(list2);
        }
    })
        
    }
             

module.exports = addgrp;

