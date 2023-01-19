let { Client, LocalAuth ,MessageMedia } = require("whatsapp-web.js");
let qrcode = require('qrcode-terminal');

let headless

// headless = false

let vars = {
    all:true
}
let changeVars = (v)=>{
    vars = v
}

headless??=true

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "rose",
        dataPath: "./Sessions",
    }),
    puppeteer: {
        defaultViewport: null,
        args: [
            "--start-maximized",
            "--disable-session-crashed-bubble"
        ],
        headless,
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

client.on('qr', qr => {

    if(headless){
        qrcode.generate(qr, {small: true});
    }
    
});

client.on("disconnected",async()=>{

    console.log('client disconnected');

})

client.on("message_create", async (msg) => {
    
    clearCache();
    
    await require("./caller")(client,msg,MessageMedia,vars,changeVars);
    
});

client.initialize();
