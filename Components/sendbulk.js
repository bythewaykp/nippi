const {MessageMedia} = require('whatsapp-web.js');
const fs = require('fs')
const delay = ms => new Promise(res => setTimeout(res, ms));

const sendbulk = async (client) => {

    let name;
    let num;

    console.log("\n --- Triggered ---\n")

    const csvread = require('../Templates/csvread')
    const arr = await csvread('./Files/test.csv')
    // const media2 = MessageMedia.fromFilePath('./Files/sp.jpeg');
    const media1 = new MessageMedia('image/png', 'sp.png');



    for (let i = 1; i < arr.length; i++) {
        await delay((Math.random() + 1) * 500)
        name = (arr[i][0]).split(' ')[0]
        // const num = (arr[i][1]).replace(/\s/g, '').slice(-10)
        num = (arr[i][1]).replace(/\s/g, '')
        try {

            // await client.sendMessage(`${num}@c.us`,media1 );
            await client.sendMessage(`${num}@c.us`,media1 );

//             await client.sendMessage(`${num}@c.us`,
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
        } catch (err) {
            console.log(`${i}/${arr.length-1} --- ${name} - error`);
            // fs.appendFileSync('./Files/b21-err.csv', `${i},${arr[i][0]},${arr[i][1]}\n`)
        }
    }


}

module.exports = sendbulk;