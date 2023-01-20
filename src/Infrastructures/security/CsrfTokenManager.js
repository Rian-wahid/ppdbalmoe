const crypto= require("crypto")
const ClientError = require("../../Commons/exceptions/ClientError")
class CsrfTokenManager {
    constructor(jwt){
        this._jwt=jwt
    }
   async token(){
        const payload={
            random:crypto.randomBytes(16).toString("hex")
        }
        return this._jwt.sign(payload,process.env.CSRF_TOKEN_KEY)
    }
    async verify(token){
        try{
           
            this._jwt.verify(token,process.env.CSRF_TOKEN_KEY)
        }catch(e){
            throw ClientError.bad()
        }
    }
}
module.exports=CsrfTokenManager