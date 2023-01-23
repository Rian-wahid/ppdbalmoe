"use strict";
require("../../../../config")
const StudentUseCase=require("../StudentUseCase")
const ClientError = require("../../../Commons/exceptions/ClientError")
const StudentRepositoryMysql=require("../../../Infrastructures/repository/StudentRepositoryMysql")
const CsrfTokenManager=require("../../../Infrastructures/security/CsrfTokenManager")
const HTMLToPDF = require("../../../Infrastructures/renderer/HTMLToPDF")
const ViewEngine = require("../../../Infrastructures/renderer/ViewEngine")
const StudentsTableHelper = require("../../../../tests/helper/StudentsTableHelper")
const JwtTokenManager = require("../../../Infrastructures/security/JwtTokenManager")
const jwt = require("jsonwebtoken")
const jwtTokenManager = new JwtTokenManager(jwt)
const ejs = require("ejs")
const pool = require("../../../Infrastructures/database/mysql/pool")
const {nanoid}=require("nanoid")
const htmlPdfNode = require("html-pdf-node")
const viewEngine = new ViewEngine(ejs,process.env.VIEW_PATH)
const csrfTokenManager= new CsrfTokenManager(jwt)
const htmlToPdf=new HTMLToPDF(htmlPdfNode)
const studentRepository = new StudentRepositoryMysql(pool,nanoid)
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

    it("add student invalid csrf token",async ()=>{
        const studentUseCase=new StudentUseCase({viewEngine,htmlToPdf,csrfTokenManager,studentRepository,bot,jwtTokenManager})
        const error = "expected error but not"
        try{
             await studentUseCase.addStudent({},"salah")
            throw new Error(error)
        }catch(e){
            expect(e.message).not.toBe(error)
            expect(e instanceof ClientError).toBe(true)
        }

    })

    it("add student invalid payload", async ()=>{
        
        const studentUseCase=new StudentUseCase({viewEngine,htmlToPdf,csrfTokenManager,studentRepository,bot,jwtTokenManager})
        const token = await csrfTokenManager.token()
        const error = "expected error but not"
        try{
            await studentUseCase.addStudent({},token)
            throw new Error(error)
        }catch(e){
            expect(e.message).not.toBe(error)
            expect(e instanceof ClientError).toBe(true)
        }
    })

    it("add student should not error",async ()=>{
        
        const studentUseCase=new StudentUseCase({viewEngine,htmlToPdf,csrfTokenManager,studentRepository,bot,jwtTokenManager})
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
           
            const result =await studentUseCase.addStudent(data,token)
            expect(result.statusCode).toBe(201)
            expect(await studentTableHelper.count()).toBe(1)
        
    })

    it("list student invalid csrf token",async ()=>{
        const studentUseCase=new StudentUseCase({viewEngine,htmlToPdf,csrfTokenManager,studentRepository,bot,jwtTokenManager})
        const accessToken = await jwtTokenManager.createAccessToken({id:"xxx"})
        const error = "expected error but not"
        try{
            await studentUseCase.listStudent({offset:0,csrfToken:"salah",accessToken})
            throw new Error(error)
        }catch(e){
            expect(e.message).not.toBe(error)
            expect(e instanceof ClientError).toBe(true)
        }
    })
    it("list student invalid accessToken",async ()=>{
        const studentUseCase=new StudentUseCase({viewEngine,htmlToPdf,csrfTokenManager,studentRepository,bot,jwtTokenManager})
        const csrfToken = await csrfTokenManager.token()
        const error ="expected error but not"
        try{
            await studentUseCase.listStudent({offset:0,csrfToken,accessToken:"salah"})
        }catch(e){
            expect(e.message).not.toBe(error)
            expect(e instanceof ClientError).toBe(true)
        }

        const accessToken = await jwtTokenManager.createRefreshToken({id:"xxx"})
        try{
            await studentUseCase.listStudent({offset:0,csrfToken,accessToken})
        }catch(e){
            expect(e.message).not.toBe(error)
            expect(e instanceof ClientError).toBe(true)
        }
    })
    it("list student should not error",async ()=>{
        const studentUseCase=new StudentUseCase({viewEngine,htmlToPdf,csrfTokenManager,studentRepository,bot,jwtTokenManager})
        const csrfToken = await csrfTokenManager.token()
        const accessToken = await jwtTokenManager.createAccessToken({id:"xxx"})
        const result = await studentUseCase.listStudent({offset:0,csrfToken,accessToken})
        expect(result.statusCode).toBe(200)
        expect(Array.isArray(result.body.data)).toBe(true)
    })

    it("detail student invalid csrf token",async ()=>{
        const studentUseCase=new StudentUseCase({viewEngine,htmlToPdf,csrfTokenManager,studentRepository,bot,jwtTokenManager})
        const accessToken = await jwtTokenManager.createAccessToken({id:"xxx"})
        const error = "expected error but not"
        try{
            await studentUseCase.detailStudent({studentId:"xxx",csrfToken:"salah",accessToken})
            throw new Error(error)
        }catch(e){
            expect(e.message).not.toBe(error)
            expect(e instanceof ClientError).toBe(true)
        }

    })

    it("detail student invalid access token",async ()=>{
        const studentUseCase=new StudentUseCase({viewEngine,htmlToPdf,csrfTokenManager,studentRepository,bot,jwtTokenManager})
        const accessToken = "salah"
        const csrfToken = await csrfTokenManager.token()
        const error = "expected error but not"
        try{
            await studentUseCase.detailStudent({studentId:"xxx",csrfToken,accessToken})
            throw new Error(error)
        }catch(e){
            expect(e.message).not.toBe(error)
            expect(e instanceof ClientError).toBe(true)
        }

    })

    it("detail student id not found",async ()=>{
        const studentUseCase=new StudentUseCase({viewEngine,htmlToPdf,csrfTokenManager,studentRepository,bot,jwtTokenManager})
        const csrfToken = await csrfTokenManager.token()
        const accessToken = await jwtTokenManager.createAccessToken({id:"xxx"})
        const error ="expected error but not"
        try{
            await studentUseCase.detailStudent({studentId:"xxx",csrfToken,accessToken})
            throw new Error(error)
        }catch(e){
            expect(e.message).not.toBe(error)
            expect(e instanceof ClientError).toBe(true)
        }

    })

    it("detail student should not error",async ()=>{
        const studentUseCase=new StudentUseCase({viewEngine,htmlToPdf,csrfTokenManager,studentRepository,bot,jwtTokenManager})
        const studentId="student-xxx"
        await studentTableHelper.add({id:studentId})
        const accessToken= await jwtTokenManager.createAccessToken({id:"xxx"})
        const csrfToken = await csrfTokenManager.token()
        const result = await studentUseCase.detailStudent({studentId,accessToken,csrfToken})
        expect(result.statusCode).toBe(200)
        expect(typeof result.body.data).toBe("object")
    
    })
})