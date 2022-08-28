const { Client, LocalAuth } = require("whatsapp-web.js");
const prompt = require("prompt-sync")();

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


client.on("ready", async () => {

    // client.on("disconnected",async()=>{
    //     await delay(500)
    //     console.log('client disconnected');
    // })

    console.log("\n --- Client is ready! ---");

    do {
        console.log(`
l : list All Grps
m : mention All Partipants
c : clear Console
s : send Bulk Message
t : test Function
d : add Participants
e : quit
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
                    await require("./Components/mentionParticipants")(
                        client,
                        msg
                    );
                });
                return;

            case "s":
                await require("./Components/sendBulk")(client);
                break;

            case "c":
                console.clear();
                break;

            case "t":
                await require("./Components/test")(client);
                break;

            case "d":
                console.log("\n --- Triggered ---\n");

                let csvread = require('../Templates/csvread')

                client.on("message_create", async (msg) => {
                    clearCache();
                    await require("./Components/addGrp")(msg,csvread);

                });
                return;

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
