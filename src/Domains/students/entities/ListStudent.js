const InternalError = require("../../../Commons/exceptions/InternalError")

class  ListStudent{
    constructor(students){
        this.validate(students)
        return students
    }
    validate(students){
        students.forEach(({id,nama_lengkap,no_hp,pendaftaran,tanggal})=> {
            if(typeof id!="string" || 
                typeof nama_lengkap !="string" ||
                typeof no_hp !="string" || 
                typeof pendaftaran !="string"|| 
                typeof tanggal !="stringg"){
                    throw new InternalError();
                }
        });
    }
}
module.exports=ListStudent