const InternalError = require("../../Commons/exceptions/InternalError")

class BotSessionRepository{
    saveSession(){
        throw new InternalError(`${this.constructor.name}.saveSession method not implemented`)
    }
    getSession(){
        throw new InternalError(`${this.constructor.name}.getSession method not implemented`)
    }
}


module.exports=BotSessionRepository