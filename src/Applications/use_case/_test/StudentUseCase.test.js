"use strict";
require("../../../../config")
const StudentUseCase=require("../StudentUseCase")
const StudentRepositoryMysql=require("../../../Infrastructures/repository/StudentRepositoryMysql")
const CsrfTokenManager=require("../../../Infrastructures/security/CsrfTokenManager")
const HTMLToPDF = require("../../../Infrastructures/renderer/HTMLToPDF")
const ViewEngine = require("../../../Infrastructures/renderer/ViewEngine")
const xssFilter = require("xss")
const StudentsTableHelper = require("../../../../tests/helper/StudentsTableHelper")
const jwt = require("jsonwebtoken")
const ejs = require("ejs")
const pool = require("../../../Infrastructures/database/mysql/pool")
const {nanoid}=require("nanoid")
const htmlPdfNode = require("html-pdf-node")
const viewEngine = new ViewEngine(ejs,process.env.VIEW_PATH)
const csrfTokenManager= new CsrfTokenManager(jwt)
const htmlToPdf=new HTMLToPDF(htmlPdfNode)
const studentRepository = new StudentRepositoryMysql({pool,idGenerator:nanoid,xssFilter})
const studentTableHelper = new StudentsTableHelper(pool)
const fs = require("fs")
const bot = {send:({base64,filename})=>{
    const buf = Buffer.from(base64,"base64")
    fs.writeFileSync(__dirname+"/"+filename,buf)
},alert:(msg)=>{
console.error(msg)
},existsAccount:async ()=>{
    return true
}}
jest.setTimeout(120000)
describe("student use case",()=>{
    beforeAll(async ()=>{
        
        await studentTableHelper.clear()
    })
    afterEach(async ()=>{
        await studentTableHelper.clear()
    })
    afterAll(async ()=>{
        await pool.end()
    })

    it("invalid csrf token",async ()=>{
        const studentUseCase=new StudentUseCase({viewEngine,htmlToPdf,csrfTokenManager,studentRepository,bot})
            try{
                 await studentUseCase.addStudent({},"salah")
                 throw new Error("expected error but not")
            }catch(e){}

    })

    it("invalid payload", async ()=>{
        
        const studentUseCase=new StudentUseCase({viewEngine,htmlToPdf,csrfTokenManager,studentRepository,bot})
        const token = await csrfTokenManager.token()
       
        try{
            await studentUseCase.addStudent({},token)
            throw new Error("expected error but not")
        }catch(e){

        }
    })

    it("should not error",async ()=>{
        
        const studentUseCase=new StudentUseCase({viewEngine,htmlToPdf,csrfTokenManager,studentRepository,bot})
        const token = await csrfTokenManager.token()
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
                    ds:"sragi",
                    dsn:"banaran",
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
                pekerjaan_ayah:"pekerjaan ayah",
                pekerjaan_ibu:"pekerjaan ibu",
                alamat_tempat_tinggal:{
                    jl:"",
                    rt:"03",
                    rw:"03",
                    ds:"sragi",
                    dsn:"banaran",
                    kec:"sukorejo",
                    kab:"ponorogo"
                },
                penghasilan:"xxx Juta",
                keterangan_ayah:{
                    info:"1",
                    tahun:"78787878"
                },
                keterangan_ibu:{
                    info:"1",
                    tahun:""
                },
                nama_sekolah_asal:"nama sekolah asal",
                alamat_sekolah_asal:"alamat sekolah asal",
                no_telp_sekolah_asal:"62663773",
            }
           
            try{
                await studentUseCase.addStudent(data,token)
            }catch(e){
                throw e
            }
            expect(await studentTableHelper.count()).toBe(1)
        
    })
})