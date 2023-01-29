const CsrfTokenManager = require("../../../Infrastructures/security/CsrfTokenManager")
const ViewEngine = require("../../../Infrastructures/renderer/ViewEngine")
const bot = require("../../../Infrastructures/external/robot/wrapper")
const register=({httpServer,container,asyncWraper})=>{
    const csrfTokenManager = container.getInstance(CsrfTokenManager.name)
    const viewEngine = container.getInstance(ViewEngine.name)
    httpServer.get("/",asyncWraper(async (req,res)=>{
        const qrcode = await bot.getQR()
        if(typeof qrcode=="string" && qrcode!=""){
            res.send(await viewEngine.render("qrcode",{qrcode}))
            return
        }
        let csrf_token
        if(req.cookies.csrftoken){
            csrf_token = req.cookies.csrftoken
        }else{
            csrf_token = await csrfTokenManager.token()
            res.cookie("csrftoken",csrf_token,{httpOnly:true,maxAge:1000*60*60*2}) 
        }
        const csrf_header = process.env.CSRF_HEADER
        res.send(await viewEngine.render("ppdb-form",{csrf_token,csrf_header}))
    }))
};
module.exports=register