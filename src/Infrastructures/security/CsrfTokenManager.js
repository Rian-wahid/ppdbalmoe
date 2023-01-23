const crypto= require("crypto")
const ClientError = require("../../Commons/exceptions/ClientError")
const CsrfTokenManagerInterface = require("../../Applications/security/CsrfTokenManagerInterface")
class CsrfTokenManager extends CsrfTokenManagerInterface{
    constructor(jwt){
        super()
        this._jwt=jwt
        this._usedTokens ={}
        this._memUsedForUsedTokens=0
        this._maxMemUsedForUsedTokens=1024*1024*5
        this._maxUsedTokenCount=10
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
        if(!this._usedTokens[token]){
            this._usedTokens[token]=1
            this._memUsedForUsedTokens+=(token.length+6)
            if(this._memUsedForUsedTokens>=this._maxMemUsedForUsedTokens){
                this._usedTokens={}
                this._usedTokens[token]=1
                this._memUsedForUsedTokens=(token.length+6)
            }
        }else{
            this._usedTokens[token]+=1
        }
        if(this._usedTokens[token]>this._maxUsedTokenCount){
            throw ClientError.bad("Jangan spam klik!")
        }
        

    }
}
module.exports=CsrfTokenManager