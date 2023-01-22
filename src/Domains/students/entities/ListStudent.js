const InternalError = require("../../../Commons/exceptions/InternalError")
const TC = require("../../../Commons/util/TypeCheck")
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
            if(!TC.test(id,"string").min(1).max(50).check()|| 
                !TC.test(nama_lengkap,"string").min(1).check() ||
                !TC.test(no_hp,"string").min(2).pattern(/\+\d+$/).check() || 
                !TC.test(pendaftaran,"string").min(2).max(3).check()|| 
                !TC.test(tanggal,"string").min(8).max(10).check()){
                    throw new InternalError();
                }
        });
    }
}
module.exports=ListStudent