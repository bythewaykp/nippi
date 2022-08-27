const { Client, LocalAuth } = require("whatsapp-web.js");
const prompt = require("prompt-sync")();

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "kp",
        dataPath: "./Sessions",
    }),
    puppeteer: {
        defaultViewport: null,
        args: ["--start-maximized"],
        headless: false,
        executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    },
});

//clear Module Caches. Recompile every modules each time they are being 'required'
const clearCache = () => {
    Object.keys(require.cache).forEach(function (key) {
        delete require.cache[key];
    });
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

client.initialize();
// client.on('message',async (msg)=>{
//     // msg.body
//     // msg.reply
//     console.log(msg.body);
//     if(msg.fromMe){
//         console.log('me');
//         console.log(msg.to);
//     }
//     let m = await msg.getChat()
//     console.log(m)
// })
client.on("ready", async () => {
    console.log("\n --- Client is ready! ---");

    do {
        console.log(`
l : List all the grps
m : Mention all partipants
c : Clear console
s : Send bulk message
a : send all
e : Quit
`);
        clearCache();

        switch ((input = prompt("Enter a command: "))) {
            case "l":
                await require("./Components/listAllGrps")(client);
                break;

            case "m":
                console.log("\n --- Triggered ---\n");

                client.on("message_create", async (msg) => {
                    clearCache();
                    await require("./Components/mentionParticipants")(client, msg);
                });
                return

            case "s":
                await require("./Components/sendbulk")(client);
                break;

            case "c":
                console.clear();
                break;

            case "t":
                await require("./Components/test")(client);
                break;
            case "a":
                await require("./Components/sendall")(client);
                break;
            case "d":
                await require("./Components/addgrp")(client);
                break;

            case "e":
                console.log("\n-- Connection closed --\n");
                client.destroy();
                return;

            default:
                console.log(`\n --- Enter a valid input ---\n`);
                await delay(1000);
                console.clear();
                break;
        }
    } while (true);
});
