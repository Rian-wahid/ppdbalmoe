const express=require("express");
const ClientError=require("../../Commons/exceptions/ClientError");
const InternalError =require("../../Commons/exceptions/InternalError");
const httpServer = express();
httpServer.use(express.json());

function listen(){
    httpServer.use((err,req,res,next)=>{
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
    httpServer.listen(process.env.PORT||3000)
}

module.exports={
    httpServer,listen
}