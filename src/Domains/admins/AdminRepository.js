const  InternalError = require("../../Commons/exceptions/InternalError")

class AdminRepository{
    auth(){
        throw new InternalError(`${this.constructor.name}.auth method not implemented`)
    }


    update(){
        throw new InternalError(`${this.constructor.name}.update  method not implemented`)
    }

    addNewAdmin(){
        throw new InternalError(`${this.constructor.name}.addNewAdmin method not  implemented`)
    }
}

module.exports=AdminRepository