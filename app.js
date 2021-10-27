const { App } = require("@slack/bolt");
require("dotenv").config();

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

//Loppukiri
app.command("/loppukiri", async ({ command, ack, say }) => {
    try {
        await ack();
        say("https://64.media.tumblr.com/23f3faac83840f07ef68c8a5a2b28eb5/tumblr_ntg4pqCLev1ue5te7o1_500.jpg");
    } catch (error) {
        console.error(error);
    }
});

//Who is?
app.command("/whoissale", async ({ command, ack, say }) => {
    try {
        await ack();
        say("Sauli Väinämö Niinstö is the president of Finland");
    } catch (error) {
        console.error(error);
    }
});

//Lennu
app.command("/lennu", async ({ command, ack, say }) => {
    try {
        await ack();
        say("https://i.imgur.com/Cl3R9Fw.jpeg");
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
            file: image,
            filetype: "jpg"
          });
    } catch (error) {
        console.error(error);
    }
});


(async () => {
    const port = 3000

    await app.start(process.env.PORT || port);
    console.log(`SaleBot is running on port ${port}!`);
})();