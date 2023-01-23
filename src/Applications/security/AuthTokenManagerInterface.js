const InternalError = require("../../Commons/exceptions/InternalError")

class AuthTokenManagerInterface{
    async verifyAccessToken(){
        throw new InternalError(`${this.constructor.name}.verifyAccessToken method not implemented`)
    }
    async verifyRefreshToken(){
        throw new InternalError(`${this.constructor.name}.verifyRefreshToken method not implemented`)
    }
    async createAccessToken(){
        throw new InternalError(`${this.constructor.name}.createAccessToken method not implemented`)
    }
    async createRefreshToken(){
        throw new InternalError(`${this.constructor.name}.createRefreshToken method not implemented`)
    }
}

module.exports = AuthTokenManagerInterface