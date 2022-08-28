module.exports = addGrp= async (msg,csvread)=>{

    console.log(msg.body);
    
    if (msg.fromMe && msg.body == "!add") {
        
        const arr = await csvread('../Files/add.csv')
        
        const chat = await msg.getChat();
        
        console.log(`${chat.name} triggered!`);

        const list1=[]
        var k =""
        arr.forEach((x,i)=>{
            if(i){
                k = x[3]
                list2.push(`91${k.substring(k.length - 10)}@c.us`)
            }
        })
        console.log(list2,chat);
        
        try {
            await chat.addParticipants(list1);

        } catch (err) {
            console.log(err);
        }
    }

}             


