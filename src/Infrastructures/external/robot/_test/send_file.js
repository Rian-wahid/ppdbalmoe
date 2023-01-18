const bot = require("../wrapper");

bot.send({
    phone:"+6289603048558",
    base64:Buffer.from("testing").toString("base64"),
    mime:"text/plain",
    filename:"test.txt"
});

