"use strict";
require("dotenv").config()
const xssFilter = require("xss")
const StudentsTableHelper = require("../../../../tests/helper/StudentsTableHelper")
const StudentRepositoryMysql = require("../StudentRepositoryMysql")
const pool = require("../../database/mysql/pool")
const studentsTableHelper=new StudentsTableHelper(pool)
describe("a student repository",()=>{
    beforeAll(async ()=>{
        await studentsTableHelper.clear()
    })

    afterEach(async ()=>{
        await studentsTableHelper.clear()
    })
    afterAll(async ()=>{
        await pool.end()
    })
    it("insert",async ()=>{
        let idToGen="xxxx"
        const idGenerator = ()=>idToGen
        const studentRepository = new StudentRepositoryMysql({pool,xssFilter,idGenerator})
        const data ={ tanggal:new Intl.DateTimeFormat(["id"]).format(new Date()),
            pendaftaran:"MA",
            nama_lengkap:"Nama Lengkap",
            jenis_kelamin:"Jenis Kelamin",
            ttl :"TTL",
            alamat:"Alamat",
            anak_ke:"Anak Ke",
            tempat_tinggal:"Tempat Tinggal",
            transportasi:"Transportasi",
            no_hp:"No HP",
            nama_lengkap_ayah:"Nama Lengkap Ayah",
            nama_lengkap_ibu:"Nama Lengkap Ibu",
            pekerjaan_ayah:"Pekerjaan Ayah",
            pekerjaan_ibu:"Pekerjaan Ibu",
            alamat_tempat_tinggal:"Alamat Tempat Tinggal",
            penghasilan:"Penghasilan",
            keterangan_ayah:"Keterangan Ayah",
            keterangan_ibu:"Keterangan Ibu",
            nama_sekolah_asal:"Nama Sekolah Asal",
            alamat_sekolah_asal:"Alamat Sekolah Asal",
            no_telp_sekolah_asal:"No Telp Sekolah Asal",
    
        }

        let resultId = await studentRepository.newStudent(data)
        expect(resultId.includes(idToGen)).toBe(true)
        expect(await studentsTableHelper.getById(resultId)).toEqual({id:resultId,...data})
        idToGen="aaaaa"
        resultId=await studentRepository.newStudent(data)
        expect(resultId).toBe(false)
        expect(await studentsTableHelper.count()).toBe(1)
        data.nama_lengkap="nama lengkap baru"
        resultId=await studentRepository.newStudent(data)
        expect(resultId.includes(idToGen)).toBe(true)
        expect(await studentsTableHelper.count()).toBe(2)
        expect(await studentsTableHelper.getById(resultId)).toEqual({id:resultId,...data})

    })


    it("list (pagination)",async ()=>{
        const idGenerator = ()=>"xxxx"
        const studentRepository = new StudentRepositoryMysql({pool,xssFilter,idGenerator})
        const names = ["aaa","bbb","ccc","ddd","eee","fff","ggg"]
        let j=6
        for(let i=1; i<8; i++){
            await studentsTableHelper.add({id:"student-xxxx"+i,nama_lengkap:names[j]})
            j--;
        }
        
        
        let list = await studentRepository.getList(0)
        
        list.forEach((student,i)=>{
            expect(student.nama_lengkap).toBe(names[i])
        })
        expect(list.length).toBe(7)
        list = await studentRepository.getList(1)
        expect(list.length).toBe(6)
        list = await studentRepository.getList(8)
        expect(list.length).toBe(0)
    })

    it("detail",async ()=>{
        const idGenerator = ()=>"xxxx"
        const studentRepository = new StudentRepositoryMysql({pool,xssFilter,idGenerator})
        await studentsTableHelper.add({id:idGenerator()})
        let detail = await studentRepository.getDetail(idGenerator())
        expect(typeof detail).toBe("object")
        expect(Array.isArray(detail)).toBe(false)
        detail = await studentRepository.getDetail("tidak ada")
        expect(detail).toBeNull()
    })
    
})
