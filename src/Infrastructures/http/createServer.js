const express=require("express");
const ClientError=require("../../Commons/exceptions/ClientError");
const InternalError =require("../../Commons/exceptions/InternalError");
const httpServer = express();
const cookieParser =require("cookie-parser")
const bot = require("../external/robot/wrapper")
const student =require("../../Interfaces/http/api/student")
const registration = require("../../Interfaces/http/web/registration")
const fs = require("fs")
const cors = require("cors")
const http = require("http")
const https = require("https");
function createServer(container){
    httpServer.use(cors())
    httpServer.use(express.json());
    httpServer.use(cookieParser())
    httpServer.use(express.static(process.env.PUBLIC_PATH))
    const asyncWraper=(cba)=>{
        return async (req,res,next)=>{
            try{
               await cba(req,res,next);
            }catch(err){
                if(!(err instanceof ClientError)){
                    const msg = req.path + "\n\n"+req.method+"\n\n"+err.stack
                    bot.alert(msg)
                }
                if(err instanceof ClientError || err instanceof InternalError){
                    res.status(err.response.status_code);
                    res.json(err.response.body);
                    return;
                }
                const {response}  = new InternalError();
                res.status(response.status_code);
                res.json(response.body);
            }
        }
    }
    const toInject={httpServer,container,asyncWraper}
    student(toInject)
    registration(toInject)
    httpServer.use((err,req,res,next)=>{
        if(!(err instanceof ClientError)){
            const msg = req.path + "\n\n"+req.method+"\n\n"+err.stack
            bot.alert(msg)
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
    // if(process.env.SSL_CERT_PATH != "" && process.env.SSL_KEY_PATH!=""){
    //     const notSecure = express()
    //     notSecure.use((req,res)=>{
    //         res.redirect(`https://${req.headers.hostname}:${process.env.HTTPS_PORT}${req.url}`)
    //     })
    //     http.createServer(notSecure).listen(process.env.HTTP_PORT)
    //     https.createServer({
    //         key:fs.readFileSync(process.env.SSL_KEY_PATH),
    //         cert:fs.readFileSync(process.env.SSL_CERT_PATH)
    //     },httpServer).listen(process.env.HTTPS_PORT)
    //     return
    // }
   
    httpServer.listen(process.env.HTTP_PORT)
}

module.exports={
    httpServer,createServer
}