const InternalError = require("../../../Commons/exceptions/InternalError")

class  ListStudent{
    constructor(students){
        this.validate(students)
        return students.map((student)=>{
            const {id,nama_lengkap,no_hp,pendaftaran,tanggal}=student
            return {id,nama_lengkap,no_hp,pendaftaran,tanggal}
        })
        
        
    }
    validate(students){
        students.forEach(({id,nama_lengkap,no_hp,pendaftaran,tanggal})=> {
            if(typeof id!="string" || 
                typeof nama_lengkap !="string" ||
                typeof no_hp !="string" || 
                typeof pendaftaran !="string"|| 
                typeof tanggal !="number"){
                    throw new InternalError();
                }
        });
    }
}
module.exports=ListStudent