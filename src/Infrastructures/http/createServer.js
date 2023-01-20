const express=require("express");
const ClientError=require("../../Commons/exceptions/ClientError");
const InternalError =require("../../Commons/exceptions/InternalError");
const httpServer = express();
//const bot = require("../external/robot/wrapper")
const student =require("../../Interfaces/http/api/student")
const registration = require("../../Interfaces/http/web/registration")

function createServer(container){
    httpServer.use(express.json());
    httpServer.use(express.static(process.env.PUBLIC_PATH))
    student(httpServer,container)
    registration(httpServer,container)
    httpServer.use((err,req,res,next)=>{
        if(!(err instanceof ClientError)){
            const msg = req.path + "\n\n"+req.method+"\n\n"+err.stack
           // bot.alert(msg)
        }
        if(err instanceof ClientError || err instanceof InternalError){
            res.status(err.response.status_code);
            res.json(err.response.body);
            return;
        }
        const {response}  = new InternalError();
        res.status(response.status_code);
        res.json(response.body);
    })
    httpServer.use((req,res)=>{
        const {response} = ClientError.notFound();
        res.status(response.status_code);
        res.json(response.body);
    })
    return {start}
}
function start(){
   
    httpServer.listen(process.env.PORT)
}

module.exports={
    httpServer,createServer
}