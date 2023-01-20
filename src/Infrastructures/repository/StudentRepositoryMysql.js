const StudentRepository=require("../../Domains/students/StudentRepository")
class StudentRepositoryMysql extends StudentRepository{
    constructor(pool){
        super()
        this.pool=pool
    }

    async newStudent(student){
        
    }
    async getList({offset,limit}){
       const [rows] = await this.pool.execute("SELECT nama_lengkap,id,tanggal,no_hp,pendaftaran FROM students LIMIT ? OFFSET ? ORDER BY students.nama_lengkap ASC",[limit,offset])
       return rows
    }

    async getDetail(studentId){
        const [rows] =await this.pool.execute(`SELECT * FROM students WHERE id = ?`,[studentId])
        return rows[0]
    }
}
module.exports = StudentRepositoryMysql