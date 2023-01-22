"use strict";
const NewStudent = require("../NewStudent")
describe("a new student entity",()=>{
    it("should not error",()=>{
        const data = {
            pendaftaran:"MA",
            nama_lengkap:"nama lengkap",
            jenis_kelamin:"laki-laki",
            ttl:{
                tempat:"Po",
                tanggal:"29-03-2004"
            },
            alamat:{
                jl:"",
                rt:"3",
                rw:"3",
                dsn:"banaran",
                ds:"sragi",
                kec:"sukorejo",
                kab:"ponorogo"
            },
            anak_ke:{
                urutan:"1",
                dari:"1"
            },
            tempat_tinggal:"bersama orang tua",
            transportasi:"motor",
            no_hp:"+626564554543",
            nama_lengkap_ayah:"nama lengkap ayah",
            nama_lengkap_ibu:"nama lengkap ibu",
            pekerjaan_ayah:"pekerjaan",
            pekerjaan_ibu:"pekerjaan",
            alamat_tempat_tinggal:{
                jl:"",
                rt:"3",
                rw:"3",
                dsn:"banaran",
                ds:"sragi",
                kec:"sukorejo",
                kab:"ponorogo"
            },
            penghasilan:"xxx Juta",
            keterangan_ayah:{
                info:"1",
                tahun:""
            },
            keterangan_ibu:{
                info:"1",
                tahun:""
            },
            nama_sekolah_asal:"nama sekolah",
            alamat_sekolah_asal:"nama sekolah",
            no_telp_sekolah_asal:"62663773",
        }
        const result = new NewStudent(data)
        
        expect(result.tanggal).toBe(new Intl.DateTimeFormat(["id"]).format(new Date()))
        expect(typeof result.alamat).toBe("string")
        expect(typeof result.ttl).toBe("string")
        expect(typeof result.anak_ke).toBe("string")
        expect(typeof result.alamat_tempat_tinggal).toBe("string")
        expect(typeof result.keterangan_ayah).toBe("string")
        expect(typeof result.keterangan_ibu).toBe("string")
        delete result.tanggal
        delete result.ttl
        delete data.ttl
        delete result.alamat
        delete data.alamat
        delete result.alamat_tempat_tinggal
        delete data.alamat_tempat_tinggal
        delete result.anak_ke
        delete data.anak_ke
        delete result.keterangan_ayah
        delete data.keterangan_ayah
        delete result.keterangan_ibu
        delete data.keterangan_ibu
        expect(result).toEqual(data)
    })
    it("should be error",()=>{
        const data = {
            pendaftaran:"MA",
            nama_lengkap:"nama lengkap",
            jenis_kelamin:"laki-laki",
            ttl:{
                tempat:"Po",
                tanggal:"29-03-2004"
            },
            alamat:{
                jl:"",
                rt:"3",
                rw:"3",
                dsn:"banaran",
                ds:"sragi",
                kec:"sukorejo",
                kab:"ponorogo"
            },
            anak_ke:{
                urutan:"1",
                dari:"1"
            },
            tempat_tinggal:"bersama orang tua",
            transportasi:"motor",
            no_hp:"+626564554543",
            nama_lengkap_ayah:"nama lengkap ayah",
            nama_lengkap_ibu:"nama lengkap ibu",
            pekerjaan_ayah:"pekerjaan",
            pekerjaan_ibu:"pekerjaan",
            alamat_tempat_tinggal:{
                jl:"",
                rt:"3",
                rw:"3",
                ds:"sragi",
                kec:"sukorejo",
                kab:"ponorogo"
            },
            penghasilan:"xxx Juta",
            keterangan_ayah:{
                info:"1",
                tahun:""
            },
            keterangan_ibu:{
                info:"1",
                tahun:""
            },
            nama_sekolah_asal:"nama sekolah",
            alamat_sekolah_asal:"nama sekolah",
            no_telp_sekolah_asal:"62663773",
        }
        for(let key in data){
            const _data = {...data}
            if(typeof data[key] =="object"){
                for(let _key in data[key]){
                    _data[key] = {...data[key]}
                    delete _data[key][_key]
                    expect(()=>{new NewStudent(_data)}).toThrowError("Bad Request")
                    _data[key][_key]=null
                    expect(()=>{new NewStudent(_data)}).toThrowError("Bad Request")
                    _data[key][_key]=(typeof data[key][_key]=="string")?{}:"string"
                    expect(()=>{new NewStudent(_data)}).toThrowError("Bad Request")
                    _data[key][_key]=1
                    expect(()=>{new NewStudent(_data)}).toThrowError("Bad Request")
                }
            }
            delete _data[key]
            expect(()=>{new NewStudent(_data)}).toThrowError("Bad Request")
            _data[key]=null
            expect(()=>{new NewStudent(_data)}).toThrowError("Bad Request")
            _data[key]=(typeof data[key]=="string")?{}:"string"
            expect(()=>{new NewStudent(_data)}).toThrowError("Bad Request")
            _data[key]=1
            expect(()=>{new NewStudent(_data)}).toThrowError("Bad Request")
        }
        data.no_hp="6282782738278"
        expect(()=>{new NewStudent(data)}).toThrowError("Bad Request")
    })
})