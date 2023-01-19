const { Client, RemoteAuth,MessageMedia } = require('whatsapp-web.js');
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('./mongoose');
let qrcode = require('qrcode-terminal');

let headless = true

const clearCache = () => {
    Object.keys(require.cache).forEach(function (key) {
        delete require.cache[key];
    });
};

// const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// const username = encodeURIComponent("kphere");
// const password = encodeURIComponent("KPabhi@129AjMo");

let uri = "mongodb+srv://kphere:KPmongoDB@nippi.ezvsgxc.mongodb.net/test"

let a = async () => {
    
    try{
        
        await mongoose.connect(uri)

        let store = new MongoStore({ mongoose });
    
        const client = new Client({
            authStrategy: new RemoteAuth({
                store,
                backupSyncIntervalMs: 600000,
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

        client.on("ready", async () => {
    
            console.log("\n --- Client is ready! ---\n");
        
        })

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
            
            await require("./caller2")(client,msg,MessageMedia,mongoose,store);
            
        });

        client.initialize();
        
    }
    catch(e){
        console.log('wwebjs error');
        console.log(e);
    }
}

a()









