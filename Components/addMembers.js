module.exports = addGrp= async (client,msg,t,gspread)=>{

    console.log("\n --- addMember ---\n");
    let chat = await msg.getChat()

    if(chat.isGroup && t['url']!=undefined){
        
        console.log("\n --- url found ---\n");

        let doc = await gspread(t['url'])
        // console.log(t['url']);
        let sheet = doc.sheetsByIndex[0]
        await sheet.loadCells('A1:C100');
        try{
            chat.addParticipants(`917012774787@c.us`)
        }catch{

        }
        for (let i =1;i<=3;i++){
            // try{
            //     chat.addParticipants(`91${sheet.getCell(i, 1).value}@c.us`)
            // }
            // catch(e){
            //     console.log(sheet.getCell(i, 1).value);
            // }
        }
            // console.log(sheet.getCell(i, 1).value);
    }            
    // const arr = await csvread('../Files/add.csv')
    
    // const chat = await msg.getChat();
    
    // console.log(`${chat.name} triggered!`);

    // const list1=[]
    // var k =""
    // arr.forEach((x,i)=>{
    //     if(i){
    //         k = x[3]
    //         list2.push(`91${k.substring(k.length - 10)}@c.us`)
    //     }
    // })
    // // console.log(list2,chat);
    
    // try {
    //     await chat.addParticipants(list1);

    // } catch (err) {
    //     console.log(err);
    // }

}             


