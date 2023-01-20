const qrcode = require('qrcode-terminal');
const Events = require("events");
const ee =new Events.EventEmitter();
let qrtoken="";
let  is_ready=false;
const queue = [];
ee.on("send",(data)=>{
    queue.push(data);
});
const { Client,MessageMedia } = require('whatsapp-web.js');
const client = new Client({
	puppeteer: {
		args: ['--no-sandbox','--disable-setuid-sandbox'],
	}
});
ee.on("ready",()=>{
    setInterval(()=>{
        const intv = setInterval(async ()=>{
            const data = queue.shift();
            if(data){
                try{
                    let {phone,base64,mime,filename} = data;
                    phone = phone.substring(1)+"@c.us";
                    const media = new MessageMedia(mime,base64,filename)
                    await client.sendMessage(phone,media)
                }catch(e){
                    throw e;
                }
             } else{
                clearInterval(intv);
            }
        },200);
    },10000)
})
client.on('qr', (qr) => {
    qrtoken=qr;
    qrcode.generate(qr,{small:true});
});
 client.on("message",(message)=>{
    if(message.from.split("@")[0]==process.env.PHONE_FOR_ALERT){
        if(message.body=="!ping"){
            message.reply("pong")
        }
        if(message.body =="!ram"){
            let total = 0;
            let ram = process.memoryUsage()
            for(const [k,v] of Object.entries(ram)){
                total+=v
            }
            message.reply(`total penggunaan memori ${total/1000000}MB`)
        }
    }
 })
client.on('ready', () => {
        is_ready=true;
	    ee.emit("ready");
});
client.initialize();
function send(data){
    const {phone,base64,mime,filename} = data;
    if(typeof phone!=="string" || typeof base64!="string" || typeof mime!="string" || typeof filename!="string"){
        throw new Error("invalid argument type")
    }
    ee.emit("send",data)
}
function alert(message){
    send({
        phone:process.env.PHONE_FOR_ALERT,
        base64:Buffer.from(message).toString("base64"),
        mime:"text/plain",
        filename:`error_${Date.now()}.txt`
    })
}
function getQR(){
    return  new Promise((res)=>{
        if(qrtoken!=""){
            res(qrtoken);
            return;
        }
        let intv = setInterval(()=>{
            if(qrtoken!=""){
                res(qrtoken);
                clearInterval(intv);
            }
        },300)
    })
}
function isReady(){
    return is_ready;
}
module.exports={
    alert,
    send,
    getQR,
    isReady
}