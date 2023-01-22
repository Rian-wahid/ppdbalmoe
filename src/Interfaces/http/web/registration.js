const CsrfTokenManager = require("../../../Infrastructures/security/CsrfTokenManager")
const ViewEngine = require("../../../Infrastructures/renderer/ViewEngine")

const register=({httpServer,container,asyncWraper})=>{
    const csrfTokenManager = container.getInstance(CsrfTokenManager.name)
    const viewEngine = container.getInstance(ViewEngine.name)
    httpServer.get("/daftar",asyncWraper(async (req,res)=>{
        const csrf_token = await csrfTokenManager.token()
        const csrf_header = process.env.CSRF_HEADER
        res.header({"Content-Type":"text/html"})
        res.send(await viewEngine.render("ppdb-form",{csrf_token,csrf_header}))
    }))
};
module.exports=register