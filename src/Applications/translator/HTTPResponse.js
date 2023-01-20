class HTTPResponse {
    constructor(){
        this._httpHeaders =[]
        this._body = ""
        this._httpStatusCode =200
    }

    header(...headers){
        this._httpHeaders.push(...headers)
        return this
    }

    statusCode(code){
        this._httpStatusCode=code
        return this
    }
    body(body){
        this._body=body
        return this
    }

    response(){
        return {
         statusCode:this._httpStatusCode,
         body:this._body,
         headers:this._httpHeaders
        }
    }
}

module.exports=HTTPResponse