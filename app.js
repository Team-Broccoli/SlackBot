const { App } = require("@slack/bolt");
require("dotenv").config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

(async () => {
  const port = 3000

  await app.start(process.env.PORT || port);
  console.log(`SaleBot is running on port ${port}!`);
})();