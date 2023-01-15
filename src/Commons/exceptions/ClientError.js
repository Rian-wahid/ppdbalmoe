class ClientError extends Error{
    constructor(msg,status_code,status) {
        super(msg);
        this.response={
            status_code,
            body:{
                status,
                message:msg
            }
        };
    }

    static forbidden(msg="Forbidden",status="fail"){
        return new ClientError(msg,403,status);
    }

    static bad(msg="Bad Request",status="fail"){
        return new ClientError(msg,400,status);
    }

    static unauthorized(msg="Unauthorized",status="fai"){
        return  new ClientError(msg,401,status);
    }

    static notFound(msg="Not Found",status="fail"){
        return new ClientError(msg,404,status);
    }
}

module.exports = ClientError;