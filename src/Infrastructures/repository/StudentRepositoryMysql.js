const StudentRepository=require("../../Domains/students/StudentRepository")
class StudentRepositoryMysql extends StudentRepository{
    constructor(pool){
        super()
        this.pool=pool
    }

    async newStudent(student){
        const {id,nama_lengkap,no_hp,pendaftaran,tanggal} = student
        let values = [id,nama_lengkap,no_hp,pendaftaran,tanggal]
        await this.pool.execute("INSERT INTO students (id,nama_lengkap,no_hp,pendaftaran,tanggal) VALUES (?,?,?,?,?)",values)
        const {alamat,usia,ttl,transportasi,anak_ke,jenis_kelamin,nama_lengkap_ayah,nama_lengkap_ibu}=student
        const {pekerjaan_ayah,pekerjaan_ibu,keterangan_ayah,keterangan_ibu,no_hp_wali,nama_sekolah_asal}=student
        const {alamat_sekolah_asal,no_telp_sekolah_asal}=student
        values=[id,alamat,usia,ttl,transportasi,anak_ke,jenis_kelamin,nama_lengkap_ayah,nama_lengkap_ibu]
        values.push(pekerjaan_ayah,pekerjaan_ibu,keterangan_ayah,keterangan_ibu,no_hp_wali,nama_sekolah_asal)
        values.push(alamat_sekolah_asal,no_telp_sekolah_asal)
        let v = [...values]
        v.fill("?")
        const [rows]=await  this.pool.execute(`
        INSERT INTO student_details
        (id,alamat,usia,ttl,transportasi,anak_ke,jenis_kelamin,nama_lengkap_ayah,nama_lengkap_ibu,
            pekerjaan_ayah,pekerjaan_ibu,keterangan_ayah,keterangan_ibu,no_hp_wali,nama_sekolah_asal,
            alamat_sekolah_asal,no_telp_sekolah_asal) VALUES (${v.toString()}) RETURNING id;
        `,values)
        return rows[0]
    }
    async getList({offset,limit}){
       const [rows] = await this.pool.execute("SELECT * FROM students LIMIT ? OFFSET ? ORDER BY students.nama_lengkap ASC",[limit,offset])
       return rows
    }

    async getDetail(studentId){
        const [rows] =await this.pool.execute(`SELECT d.*,s.nama_lengkap,s.pendaftaran,s.no_hp FROM student_details AS d 
        JOIN students AS s ON d.id = s.id WHERE d.id = ?`,[studentId])
    }
}