require("dotenv").config()
const bot = require("../wrapper");
// bot.custom(async (client)=>{
//     const numberId = await client.getNumberId("6281231246377")
//     console.info(numberId)
//     console.info(await client.setDisplayName("s"))
//     setTimeout(async ()=>{
//         console.info(await client.setDisplayName("+62 821-4141-7365"))
//         process.exit(0)
//     },1000*60)
   
// })

bot.send({
    phone:"+6281231246377",
    base64:Buffer.from("testing").toString("base64"),
    mime:"text/plain",
    filename:"test.txt"
});
bot.alert("testing")

