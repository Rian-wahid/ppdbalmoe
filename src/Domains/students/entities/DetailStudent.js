const InternalError = require("../../../Commons/exceptions/InternalError")
const TC = require("../../../Commons/util/TypeCheck")
const xss = require("xss")
class DetailStudent{
    constructor(student){
        this.validate(student)
        for(let key in student){
            student[key] = xss(student[key])
        }
        const {
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
        return {
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
        !TC.test(ttl,"string").min(2).check() ||
        !TC.test(alamat,"string").min(2).check() ||
        !TC.test(anak_ke,"string").min(2).check() ||
        !TC.test(tempat_tinggal,"string").min(2).check() ||
        !TC.test(transportasi,"string").min(2).check()||
        !TC.test(no_hp,"string").min(8).pattern(/\+\d+$/).check() ||
        !TC.test(nama_lengkap_ayah,"string").min(1).check() ||
        !TC.test(nama_lengkap_ibu,"string").min(1).check() ||
        !TC.test(pekerjaan_ayah,"string").min(1).check() ||
        !TC.test(pekerjaan_ibu,"string").min(1).check()||
        !TC.test(alamat_tempat_tinggal,"string").min(1).check() ||
        !TC.test(penghasilan,"string").min(2).check() ||
        !TC.test(keterangan_ayah,"string").min(1).check() ||
        !TC.test(keterangan_ibu,"string").min(1).check() ||
        !TC.test(nama_sekolah_asal,"string").min(1).check()||
        !TC.test(alamat_sekolah_asal,"string").min(1).check() ||
        !TC.test(no_telp_sekolah_asal,"string").min(2).check()){
             throw new InternalError()
         }
    }
}
module.exports = DetailStudent