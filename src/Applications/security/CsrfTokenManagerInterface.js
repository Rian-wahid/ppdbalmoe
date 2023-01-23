const InternalError = require("../../Commons/exceptions/InternalError")

class CsrfTokenManagerInterface {
   async token(){
    throw new InternalError(`${this.constructor.name}.token method not implemented`)
   }
   async verify(){
    throw new InternalError(`${this.constructor.name}.token method not implemented`)
   }
}
module.exports = CsrfTokenManagerInterface