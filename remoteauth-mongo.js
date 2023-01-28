const { Client, RemoteAuth,MessageMedia } = require('whatsapp-web.js');
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('./mongoose');
let qrcode = require('qrcode-terminal');

let headless

// headless = false

headless??=true

const clearCache = () => {
    Object.keys(require.cache).forEach(function (key) {
        delete require.cache[key];
    });
};


let uri = "mongodb+srv://kphere:KPmongoDB@nippi.ezvsgxc.mongodb.net/test"

let a = async () => {
    
    try{
        
        await mongoose.connect(uri)

        // const Vars = mongoose.model('var', new mongoose.Schema({
        //     id:String,
        //     all: Boolean
        // }));

        let store = new MongoStore({ mongoose });
    
        const client = new Client({
            authStrategy: new RemoteAuth({
                store,
                backupSyncIntervalMs: 60000,
                clientId:'rose',
                dataPath:'./SessionTest'    
                    
            }),
            puppeteer: {
                defaultViewport: null,
                args: [
                    "--start-maximized",
                    "--disable-session-crashed-bubble"
                ],
                headless,
                executablePath:'/usr/bin/google-chrome-stable'
            }
        });

        client.on("authenticated", async () => {
    
            console.log("\n --- Client authenticated ! ---\n");
        
        })
        client.on('auth_failure',() => {

            console.log('\n --- Authentication failed. scan the qr code to login again. --- \n');
            
        });

        client.on("ready", async () => {

            let sender = await client.getContactById(client.info.wid._serialized)
            
            console.log(`\n --- ${sender.name || sender.pushname} aka ${sender.number} is ready! ---\n`);
            
        });

        client.on('qr', qr => {

            if(headless){
                qrcode.generate(qr, {small: true});
            }
            
        });
    
        client.on('disconnected',()=>{
            console.log('client is disconnected');
        })

        client.on('remote_session_saved', () => {
    
            console.log('saved the session');
        })
    
        client.on("message_create", async (msg) => {
        
            clearCache();
            
            await require("./caller2")(client,msg,MessageMedia,Vars);
            
        });

        client.initialize();
        
    }
    catch(e){
        console.log('wwebjs error');
        console.log(e);
    }
}

a()









