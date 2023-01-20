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
        return this._jwt.generate(payload,process.env.CSRF_TOKEN_KEY)
    }
    async verify(token){
        try{
            const artifact = this._jwt.decode(token)
            this._jwt.verify(artifact,process.env.CSRF_TOKEN_KEY)
        }catch(e){
            throw ClientError.bad()
        }
    }
}
module.exports=CsrfTokenManager