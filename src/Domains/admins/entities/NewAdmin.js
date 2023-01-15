const ClientError = require("../../../Commons/exceptions/ClientError")
const  crypto = require("crypto")
const algo = process.env.ADMIN_HASH_ALGO || "sha256"
const encoding = process.env.ADMIN_HASH_ENCODING || "hex"
class NewAdmin {
    constructor(credential){
        this.validate(credential)
        const {username,password,nama} = credential
        
        return {
            username:crypto.createHash(algo).update(username).digest(encoding),
            password:crypto.createHash(algo).update(password).digest(encoding),
            nama
        }

    }
    validate({username,password,nama}){
        if(typeof username!="string" || typeof password!="string" || typeof nama!="string"){
            throw  ClientError.bad()
        }
    }
}

module.exports=NewAdmin