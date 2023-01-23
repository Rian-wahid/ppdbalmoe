const ClientError =  require("../../../Commons/exceptions/ClientError")
const crypto = require("crypto")
const algo = process.env.ADMIN_HASH_ALGO
const encoding = process.env.ADMIN_HASH_ENCODING
class AdminLogin{
    constructor(credential){
        this.validate(credential)
        const {username,password} = credential
        return {
            username_hash:crypto.createHash(algo).update(username).digest(encoding),
            password_hash:crypto.createHash(algo).update(password).digest(encoding)
        }
    }
    validate({username,password}){
        if(typeof  username!="string" || typeof password!="string"){
            throw ClientError.bad()
        }
    }
}
module.exports=AdminLogin