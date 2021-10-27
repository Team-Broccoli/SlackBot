const { App } = require("@slack/bolt");
require("dotenv").config();
const fs = require('fs');
const AWS = require("aws-sdk");

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

//Sale sending SMS?
app.command("/salesms", async ({ command, ack, say }) => {
    try {
        await ack();
        const sns = new AWS.SNS({ apiVersion: "2010-03-31" });
        const params = {
            "Message": command.text,
            "TopicArn": "arn:aws:sns:eu-central-1:657960601194:SaleTopic"
        };
        sns.publish(params, (err, data) => {
            if (err) {
              console.log("There was an Error: ", err);
            } else {
              console.log("Successfully published.", data);
            }
          });
        say("Sale sent SMS via AWS SNS!");
        
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

//Perjantai
app.command("/perjantai", async ({ message, client }) => {
    const image = "./media/perjantai.jpg";
    try {
        const result = await client.files.upload({
            channels: channelId,
            initial_comment: ":face_with_cowboy_hat:",
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