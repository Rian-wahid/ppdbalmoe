const ClientError = require("../../../Commons/exceptions/ClientError")

const TC = require("../../../Commons/util/TypeCheck")
class NewStudent{
    constructor(student){
        this.validate(student)
        let {
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
        }=student
        ttl = `${ttl.tempat}, ${ttl.tanggal}`
        keterangan_ayah = (keterangan_ayah.tahun.length>0)?`${keterangan_ayah.info} ${keterangan_ayah.tahun}`:keterangan_ayah.info;
        keterangan_ibu = (keterangan_ibu.tahun.length>0)?`${keterangan_ibu.info} ${keterangan_ibu.tahun}`:keterangan_ibu.info;
        alamat_tempat_tinggal =`${(alamat_tempat_tinggal.jl!="")?"Jl. "+alamat_tempat_tinggal.jl+" ":""}, RT ${alamat_tempat_tinggal.rt} RW ${alamat_tempat_tinggal.rw}, Dsn. ${alamat_tempat_tinggal.dsn}, DS. ${alamat_tempat_tinggal.ds}, KEC. ${alamat_tempat_tinggal.kec}, KAB. ${alamat_tempat_tinggal.kab}`
        anak_ke = `${anak_ke.urutan} dari ${anak_ke.dari}`
        alamat =`${(alamat.jl!="")?"Jl. "+alamat.jl+" ":""}, RT ${alamat.rt} RW ${alamat.rw}, Dsn. ${alamat.dsn}, DS. ${alamat.ds} KEC. ${alamat.kec}, KAB. ${alamat.kab}`
        return {
            tanggal:Date.now(),
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

        }
    }
    validate({
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
        if(!TC.test(pendaftaran,"string").min(2).max(3).check() ||
           !TC.test(nama_lengkap,"string").min(1).check() ||
           !TC.test(jenis_kelamin,"string").min(9).max(9).check() ||
           !TC.test(ttl,"object").check() ||
           !TC.test(alamat,"object").check() ||
           !TC.test(anak_ke,"object").check() ||
           !TC.test(tempat_tinggal,"string").min(2).check() ||
           !TC.test(transportasi,"string").min(2).check()||
           !TC.test(no_hp,"string").min(8).pattern(/\+\d+$/).check() ||
           !TC.test(nama_lengkap_ayah,"string").min(1).check() ||
           !TC.test(nama_lengkap_ibu,"string").min(1).check() ||
           !TC.test(pekerjaan_ayah,"string").min(1).check() ||
           !TC.test(pekerjaan_ibu,"string").min(1).check()||
           !TC.test(alamat_tempat_tinggal,"object").check() ||
           !TC.test(penghasilan,"string").min(2).check() ||
           !TC.test(keterangan_ayah,"object").check() ||
           !TC.test(keterangan_ibu,"object").check() ||
           !TC.test(nama_sekolah_asal,"string").min(1).check()||
           !TC.test(alamat_sekolah_asal,"string").min(1).check() ||
           !TC.test(no_telp_sekolah_asal,"string").min(2).check()){
                throw ClientError.bad()
            }

            if((pendaftaran!=="MTs" && pendaftaran!=="MA") || (jenis_kelamin!=="laki-laki" && jenis_kelamin!=="perempuan")){
                throw ClientError.bad()
            }
             
            this.validateAlamat(alamat)
            this.validateAlamat(alamat_tempat_tinggal)
            this.validateKeterangan(keterangan_ayah)
            this.validateKeterangan(keterangan_ibu)

            if(!TC.test(ttl.tempat,"string").min(1).check()||!TC.test(ttl.tanggal,"string").min(1).check()){
                throw ClientError.bad()
            }
            
            if(!TC.test(anak_ke.urutan,"string").min(1).check()||!TC.test(anak_ke.dari,"string").min(1).check()){
                throw ClientError.bad()
            }
    }

    validateAlamat(alamat){
        if(!TC.test(alamat.jl,"string").check() ||
           !TC.test(alamat.rt,"string").min(1).check() || 
           !TC.test(alamat.rw,"string").min(1).check() ||
           !TC.test(alamat.ds,"string").min(1).check() ||
           !TC.test(alamat.kec,"string").min(1).check()||
           !TC.test(alamat.kab,"string").min(1).check()){
                throw ClientError.bad()
            }
    }

    validateKeterangan(keterangan){
        if(!TC.test(keterangan.info,"string").min(2).check()||!TC.test(keterangan.tahun,"string").check()){
            throw ClientError.bad()
        }
    }
}

module.exports=NewStudent