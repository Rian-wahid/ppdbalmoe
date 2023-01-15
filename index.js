const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client({
	puppeteer: {
		args: ['--no-sandbox'],
	}
});
const is_qr=false;
client.on('qr', (qr) => {

	if(!is_qr){
		console.info("qr")
		
		qrcode.generate(qr,{small:true});
		is_qr=true;
	}
	
});
client.on('message', message => {
	console.log(message.from);
});
 

client.on('ready', () => {
	    console.log('Client is ready!');
});

client.initialize();
 
