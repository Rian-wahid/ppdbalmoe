const ClientError = require("../../../Commons/exceptions/ClientError")
const  crypto = require("crypto")
const algo = process.env.ADMIN_HASH_ALGO || "sha256"
const encoding = process.env.ADMIN_HASH_ENCODING || "hex"
class AdminUpdate {
    constructor(credential){
        this.validate(credential)
        const {username,password,nama,id} = credential
        return {
            username_hash:crypto.createHash(algo).update(username).digest(encoding),
            password_hash:crypto.createHash(algo).update(password).digest(encoding),
            nama,
            id
        }
    }
    validate({username,password,nama,id}){
        if(typeof username!="string" || typeof password!="string" || typeof nama!="string" || typeof id!="string"){
            throw  ClientError.bad()
        }
    }
}

module.exports=AdminUpdate