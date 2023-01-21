const qrcode = require('qrcode-terminal');
const Events = require("events");
const fs = require("fs")
const ee =new Events.EventEmitter();
let qrtoken="";
let  is_ready=false;
const queue = [];


const { Client,MessageMedia,LocalAuth} = require('whatsapp-web.js');
const init=async ()=>{
    ee.on("send",(data)=>{
        queue.push(data);
    });
    if(!fs.existsSync(__dirname+"/auth")){
        fs.mkdirSync(__dirname+"/auth")
    }

    const client= new Client({
        authStrategy:new LocalAuth({
            dataPath:__dirname+"/auth"
        }),
        puppeteer: {
            args: ['--no-sandbox','--disable-setuid-sandbox'],
        }
    });
    ee.on("ready",()=>{
       const interv= setInterval(()=>{
            const intv = setInterval(async ()=>{
                const data = queue.shift();
                if(data){
                    try{
                        let {phone,base64,mime,filename} = data;
                        if(phone[0]=="+"){
                            phone=phone.substring(1)
                        }
                        phone=phone+"@c.us"
                        const media = new MessageMedia(mime,base64,filename)
                        await client.sendMessage(phone,media)
                    }catch(e){
                        throw e
                    }
                 } else{
                    clearInterval(intv);
                }
            },200);
            if(!is_ready){
                clearInterval(interv)
            }
        },10000)
    })
   
    client.on('qr', (qr) => {
        qrtoken=qr;
        qrcode.generate(qr,{small:true});
    });
     client.on("message",(message)=>{
        if(message.from.split("@")[0]==process.env.PHONE_FOR_ALERT.substring(1)){
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

     client.on("disconnected",()=>{
        is_ready=false
     })
    client.on('ready', () => {
            console.info("ready")
            is_ready=true;
            ee.emit("ready");
    });
    client.initialize();
}
init()


function send(data){
    const {phone,base64,mime,filename} = data;
    if(typeof phone!=="string" || typeof base64!="string" || typeof mime!="string" || typeof filename!="string"){
        throw new Error("invalid argument type")
    }
    ee.emit("send",data)
}
function alert(message){
    console.error(message)
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