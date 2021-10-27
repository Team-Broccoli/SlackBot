const { App } = require("@slack/bolt");
require("dotenv").config();
const fs = require('fs');

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.APP_TOKEN
});

const channelId = process.env.CHANNEL_ID;

//Hello world
app.command("/hellosale", async ({ command, ack, say }) => {
    try {
        await ack();
        say("Hello Sale o7");
    } catch (error) {
        console.error(error);
    }
});

//Who is?
app.command("/whoissale", async ({ command, ack, say }) => {
    try {
        await ack();
        say("Sauli Väinämö Niinistö is the president of Finland");
    } catch (error) {
        console.error(error);
    }
});

/*** COMMANDS WITH FILE UPLOAD ***/

//Loppukiri
app.command("/loppukiri", async ({ message, client }) => {
    const image = "./media/loppukiri.jpg";
    try {
        const result = await client.files.upload({
            channels: channelId,
            initial_comment: "Salen loppukiri",
            file: fs.createReadStream(image),
            filetype: "jpg"
        });
        console.log(result);
    } catch (error) {
        console.error(error);
    }
});

//Lennu
app.command("/lennu", async ({ message, client }) => {
    const image = "./media/lennu.jpeg";
    try {
        const result = await client.files.upload({
            channels: channelId,
            initial_comment: "Lennu C:",
            file: fs.createReadStream(image),
            filetype: "jpg"
        });
        console.log(result);
    } catch (error) {
        console.error(error);
    }
});

//File uploading
app.command("/uploadtest", async ({ message, client }) => {
    const image = "./media/sale.jpg";
    try {
        const result = await client.files.upload({
            channels: channelId,
            initial_comment: "Here's Sale",
            file: fs.createReadStream(image),
            filetype: "jpg"
        });
        console.log(result);
    } catch (error) {
        console.error(error);
    }
});


(async () => {
    const port = 3000

    await app.start(process.env.PORT || port);
    console.log(`SaleBot is running on port ${port}!`);
})();