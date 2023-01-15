class InternalError extends Error{
    constructor(msg="Internal Server Error",status="error"){
        super(msg);
        this.response={
            status_code:500,
            body:{
                status,
                message:msg
            }
        }
    }
}
module.exports= InternalError;