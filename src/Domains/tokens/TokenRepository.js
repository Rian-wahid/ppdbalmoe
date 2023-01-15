const InternalError = require("../../Commons/exceptions/InternalError")

class TokenRepository{
    addToken(){
        throw new InternalError(`${this.constructor.name}.addToken method not impleemented`)
    }

    removeToken(){
        throw new InternalError(`${this.constructor.name}.removeToken method not implmented`)
    }
    exists(){
        throw new InternalError(`${this.constructor.name}.exists method not implmented`)
    }
}

module.exports=TokenRepository