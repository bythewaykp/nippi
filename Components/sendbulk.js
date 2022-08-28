const {MessageMedia} = require('whatsapp-web.js');
const fs = require('fs')
const delay = ms => new Promise(res => setTimeout(res, ms));

module.exports = sendBulk = async (client) => {

    let name;
    let num;

    console.log("\n --- Triggered ---\n")

    const csvread = require('../Templates/csvread')
    const arr = await csvread('./Files/add.csv')

    const media1 = MessageMedia.fromFilePath('./Files/sp.png');
    
    for (let i = 1; i < arr.length; i++) {
        
        await delay((Math.random() + 1) * 1000)
        
        name = (arr[i][0]).split(' ')[0]
        num = (arr[i][1]).replace(/\s/g, '').slice(-10)
        
        try {

            await client.sendMessage(`91${num}@c.us`,media1 );
            // await client.sendMessage(`91${num}@c.us`,'hi' );

//             await client.sendMessage(`91${num}@c.us`,
// `Hey ${name},

// സർഗശേഷിയെ വിപ്ലവത്തിന്റെ ആയുധമാക്കിക്കൊണ്ട്, 
// കാലത്തിൻറെ തെരുവിൽ കലയുടെ പോരാട്ടം.
// തെരുവുപടയുടെ തുടർച്ചയായി, 
// എന്നിൽ നിന്നും നിങ്ങളിലേക്ക്.....

// To rebel against all odds, to stand up for what is right, and to let our voices be heard. Through powerful songs and cleverly crafted stories, we set ablaze the fire of insurgence!

// Streetplay Malayalam orientation
// Venue : ELHC
// Time : 9:00 PM
// https://www.instagram.com/p/ChRjfhDvgFL/?igshid=MDJmNzVkMjY`)
            // arr[i][5] = 'message sent'
            console.log(`${i}/${arr.length-1} --- ${name}`);
            // fs.appendFileSync('./Files/b21-succ.csv', `${i},${arr[i][0]},${arr[i][1]}\n`)
        } 
        catch (err) {
            console.log(`${i}/${arr.length-1} --- ${name} - error`);
            // fs.appendFileSync('./Files/b21-err.csv', `${i},${arr[i][0]},${arr[i][1]}\n`)
        }
    }
}
