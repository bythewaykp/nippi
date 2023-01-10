const { Client, LocalAuth ,MessageMedia } = require("whatsapp-web.js");
// const prompt = require("prompt-sync")();
// let fs = require('fs')

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "kp",
        dataPath: "./Sessions",
    }),
    puppeteer: {
        defaultViewport: null,
        args: [
            "--start-maximized",
            "--disable-session-crashed-bubble"
        ],
        headless: false,
        executablePath:'/usr/bin/google-chrome-stable'
        // executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    },
});

//clear Module Caches. Recompile every modules each time they are being 'required'
const clearCache = () => {
    Object.keys(require.cache).forEach(function (key) {
        delete require.cache[key];
    });
};

client.on("ready", async () => {
    
    console.log("\n --- Client is ready! ---\n");
    
});

client.on("disconnected",async()=>{
    // await delay(500)
    console.log('client disconnected');
})

client.on("message_create", async (msg) => {

    let vars = {
        others:false,
    }
    
    clearCache();
    
    await require("./caller")(client,msg,MessageMedia,vars);
    

});

client.initialize();