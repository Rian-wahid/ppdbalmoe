const InternalError = require("../../Commons/exceptions/InternalError")

class StudentRepository{
    newStudent(){
        throw new InternalError(`${this.constructor.name}.newStudent method not implemented`)
    }

    getList(){
        throw new InternalError(`${this.constructor.name}.getList method not implemented`)
    }

    getDetail(){
        throw new InternalError(`${this.constructor.name}.getDetail method not implemented`)
    }
}

module.exports=StudentRepository