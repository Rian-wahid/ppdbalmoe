require("dotenv").config()
const bot = require("../wrapper");

bot.send({
    phone:"+6281231246377",
    base64:Buffer.from("testing").toString("base64"),
    mime:"text/plain",
    filename:"test.txt"
});
bot.alert("testing")

