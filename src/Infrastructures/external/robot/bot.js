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
		args: ['--no-sandbox'],
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
        },500);
    },10000)
    
})
client.on('qr', (qr) => {
    qrtoken=qr;
    qrcode.generate(qr,{small:true});
});

 

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

async function alert(message){
    try{
        await client.sendMessage(process.env.PHONE_FOR_ALERT,meessage);
    }catch(e){

    }
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
        },500)
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