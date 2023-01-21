class StudentsTableHelper {
    constructor(pool){
        this._pool = pool
    }
   async add({id="xxxxx",
        tanggal=Date.now(),
        pendaftaran="MA",
        nama_lengkap="Nama Lengkap",
        jenis_kelamin="laki-laki",
        ttl ="TTL",
        alamat="Alamat",
        anak_ke="Anak Ke",
        tempat_tinggal="Tempat Tinggal",
        transportasi="Transportasi",
        no_hp="+62123123123",
        nama_lengkap_ayah="Nama Lengkap Ayah",
        nama_lengkap_ibu="Nama Lengkap Ibu",
        pekerjaan_ayah="Pekerjaan Ayah",
        pekerjaan_ibu="Pekerjaan Ibu",
        alamat_tempat_tinggal="Alamat Tempat Tinggal",
        penghasilan="Penghasilan",
        keterangan_ayah="Keterangan Ayah",
        keterangan_ibu="Keterangan Ibu",
        nama_sekolah_asal="Nama Sekolah Asal",
        alamat_sekolah_asal="Alamat Sekolah Asal",
        no_telp_sekolah_asal="No Telp Sekolah Asal",

    }){
        const values = [id,
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
            no_telp_sekolah_asal]
            const q = Array(values.length).fill("?").join(",")
            await this._pool.execute(`INSERT INTO students (id,
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
                no_telp_sekolah_asal) VALUES (${q});`,values)
    }

    async clear(){
        await this._pool.query("DELETE FROM students WHERE 1=1")
    }

    async getById(id){
        const [[row]] = await this._pool.execute("SELECT * FROM students WHERE id = ?",[id])
        return row
    }

    async count(){
        const [[{t}]] = await this._pool.query("SELECT COUNT(*) AS t FROM students")
        return t
    }
}

module.exports = StudentsTableHelper