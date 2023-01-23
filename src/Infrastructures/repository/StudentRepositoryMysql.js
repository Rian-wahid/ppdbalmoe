const StudentRepository=require("../../Domains/students/StudentRepository")
const ListStudent = require("../../Domains/students/entities/ListStudent")
const DetailStudent = require("../../Domains/students/entities/DetailStudent")
class StudentRepositoryMysql extends StudentRepository{
    constructor(pool,idGenerator){
        super()
        this._pool=pool
        this._idGenerator=idGenerator
        this._xssFilter=xssFilter
    }

    async newStudent({
        tanggal,
        pendaftaran,
        nama_lengkap,
        jenis_kelamin,
        ttl,
        alamat,
        anak_ke,
        tempat_tinggal,
        transportasi,
        no_hp,
        nama_lengkap_ayah,
        nama_lengkap_ibu,
        pekerjaan_ayah,
        pekerjaan_ibu,
        alamat_tempat_tinggal,
        penghasilan,
        keterangan_ayah,
        keterangan_ibu,
        nama_sekolah_asal,
        alamat_sekolah_asal,
        no_telp_sekolah_asal,

    }){
        let values = [tanggal,pendaftaran,nama_lengkap,jenis_kelamin,ttl,alamat, anak_ke,tempat_tinggal,transportasi,no_hp,nama_lengkap_ayah, nama_lengkap_ibu,pekerjaan_ayah,pekerjaan_ibu, alamat_tempat_tinggal,penghasilan,keterangan_ayah,keterangan_ibu,nama_sekolah_asal,alamat_sekolah_asal,no_telp_sekolah_asal,]
       
        const [,...checkvalues] = values
        const [[old]] = await this._pool.execute(`SELECT id  FROM students WHERE
        pendaftaran = ? AND
        nama_lengkap = ? AND
        jenis_kelamin = ? AND
        ttl = ? AND
        alamat = ? AND
        anak_ke = ? AND
        tempat_tinggal = ? AND
        transportasi = ? AND
        no_hp = ? AND
        nama_lengkap_ayah = ? AND
        nama_lengkap_ibu = ? AND
        pekerjaan_ayah = ? AND
        pekerjaan_ibu = ? AND
        alamat_tempat_tinggal = ? AND
        penghasilan = ? AND
        keterangan_ayah = ? AND
        keterangan_ibu = ? AND
        nama_sekolah_asal = ? AND
        alamat_sekolah_asal = ? AND
        no_telp_sekolah_asal = ?;`,checkvalues) 
        if(old){
            return false
        }

        const id = `student-${this._idGenerator(8)}${Date.now()}`;
        values.push(id)
        const q = Array(values.length).fill("?").join(",")
        await this._pool.execute(`INSERT INTO students 
            (tanggal,
            pendaftaran,
            nama_lengkap,
            jenis_kelamin,
            ttl,
            alamat,
            anak_ke,
            tempat_tinggal,
            transportasi,
            no_hp,
            nama_lengkap_ayah,
            nama_lengkap_ibu,
            pekerjaan_ayah,
            pekerjaan_ibu,
            alamat_tempat_tinggal,
            penghasilan,
            keterangan_ayah,
            keterangan_ibu,
            nama_sekolah_asal,
            alamat_sekolah_asal,
            no_telp_sekolah_asal,
            id) VALUES (${q});`,values)
       
        return id
    }
    async getList(offset=0){
       const [rows] = await this._pool.execute("SELECT nama_lengkap,id,tanggal,no_hp,pendaftaran FROM students  ORDER BY nama_lengkap ASC LIMIT 10 OFFSET ?",[offset])
       return new ListStudent(rows)
    }

    async getDetail(studentId){
        const [[student]] =await this._pool.execute(`SELECT * FROM students WHERE id = ?`,[studentId])
        if(!student){
            return null
        }
        return new DetailStudent(student)
    }

}
module.exports = StudentRepositoryMysql