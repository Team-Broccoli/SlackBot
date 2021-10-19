const { App } = require("@slack/bolt");
require("dotenv").config();

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.APP_TOKEN
});


app.command("/hellosale", async ({ command, ack, say }) => {
    try {
        await ack();
        say("Hello Sale o7");
    } catch (error) {
        console.log("err")
        console.error(error);
    }
});














(async () => {
    const port = 3000

    await app.start(process.env.PORT || port);
    console.log(`SaleBot is running on port ${port}!`);
})();