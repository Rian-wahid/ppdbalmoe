const ClientError = require("../../Commons/exceptions/ClientError")
const AuthTokenManagerInterface = require("../../Applications/security/AuthTokenManagerInterface")
class JwtTokenManager extends AuthTokenManagerInterface{
    constructor(jwt){
        super()
        this._jwt = jwt
    }

    async verifyAccessToken(token){
        try{
           return this._jwt.verify(token,process.env.ACCESS_TOKEN_KEY)
        }catch(e){
            throw ClientError.bad()
        }
    }

    async createAccessToken(payload){
        return this._jwt.sign({...payload,exp:Math.floor(Date.now()/1000)+(60*10)},process.env.ACCESS_TOKEN_KEY)
    }

    async verifyRefreshToken(token){
        try{
            return this._jwt.verify(token,process.env.REFRESH_TOKEN_KEY)
        }catch(e){
            throw ClientError.bad()
        }
    }

    async createRefreshToken(payload){
        return this._jwt.sign({...payload,exp:Math.floor(Date.now()/1000)+(60*60*48)},process.env.REFRESH_TOKEN_KEY)
    }

}

module.exports = JwtTokenManager