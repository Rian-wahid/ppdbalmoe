const InternalError = require("../../Commons/exceptions/InternalError")
class HTTPResponseExpress{
    constructor({statusCode,body,headers}){
       this._statusCode=statusCode
        this._body=body
        this._headers=headers
    }
    send(res){
        try{
            res.status(this._statusCode)
            for(let header of this._headers){
                res.header(header)
            }
            if(typeof this._body=="object"){
                res.json(this._body)
            }else{
                res.send(this._body)
            }
        }catch(e){
            throw InternalError()
        }
        
    }
}

module.exports = HTTPResponseExpress