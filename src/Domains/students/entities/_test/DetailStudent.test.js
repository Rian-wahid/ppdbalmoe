"use strict";
const DetailStudent = require("../DetailStudent")
describe("a detail student entity",()=>{
    it("shoud not error",()=>{
        const data = {
            pendaftaran:"MA",
            nama_lengkap:"nama lengkap",
            jenis_kelamin:"laki-laki",
            ttl:"Ponorogo, 29-03-2004",
            alamat:"rt 03 rw 03 ds. sragi kec. sukorejo",
            anak_ke:"1 dari 1",
            tempat_tinggal:"bersama orang tua",
            transportasi:"motor",
            no_hp:"+626564554543",
            nama_lengkap_ayah:"nama lengkap ayah",
            nama_lengkap_ibu:"nama lengkap ibu",
            pekerjaan_ayah:"pekerjaan",
            pekerjaan_ibu:"pekerjaan",
            alamat_tempat_tinggal:"rt 03 rw 03 ds. sragi kec. sukorejo",
            penghasilan:"xxx Juta",
            keterangan_ayah:"masih hidup",
            keterangan_ibu:"masih hidup",
            nama_sekolah_asal:"nama sekolah",
            alamat_sekolah_asal:"nama sekolah",
            no_telp_sekolah_asal:"62663773",
        }
        const result = new DetailStudent(data);
        expect(result).toEqual(data)
    })
    it("should be error",()=>{
        const data = {
            pendaftaran:"MA",
            nama_lengkap:"nama lengkap",
            jenis_kelamin:"laki-laki",
            ttl:"Ponorogo, 29-03-2004",
            alamat:"rt 03 rw 03 ds. sragi kec. sukorejo",
            anak_ke:"1 dari 1",
            tempat_tinggal:"bersama orang tua",
            transportasi:"motor",
            no_hp:"+626564554543",
            nama_lengkap_ayah:"nama lengkap ayah",
            nama_lengkap_ibu:"nama lengkap ibu",
            pekerjaan_ayah:"pekerjaan",
            pekerjaan_ibu:"pekerjaan",
            alamat_tempat_tinggal:"rt 03 rw 03 ds. sragi kec. sukorejo",
            penghasilan:"xxx Juta",
            keterangan_ayah:"masih hidup",
            keterangan_ibu:"masih hidup",
            nama_sekolah_asal:"nama sekolah",
            alamat_sekolah_asal:"nama sekolah",
            no_telp_sekolah_asal:"62663773",
        }
        for(let key in data){
            const _data = {...data}
            delete _data[key]
            expect(()=>{new DetailStudent(_data)}).toThrowError("Internal Server Error")
            _data[key] = null
            expect(()=>{new DetailStudent(_data)}).toThrowError("Internal Server Error")
            _data[key]=1
            expect(()=>{new DetailStudent(_data)}).toThrowError("Internal Server Error")
            _data[key]=true
            expect(()=>{new DetailStudent(_data)}).toThrowError("Internal Server Error")
        }
    })
})