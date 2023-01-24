const HTTPResponse =require("../translator/HTTPResponse")
const NewStudent = require("../../Domains/students/entities/NewStudent")
const ClientError = require("../../Commons/exceptions/ClientError")

class StudentUseCase{
    constructor({viewEngine,htmlToPdf,studentRepository,csrfTokenManager,bot,jwtTokenManager}){
        this._viewEngine=viewEngine
        this._htmlToPdf=htmlToPdf
        this._studentRepository=studentRepository
        this._csrfTokenManager=csrfTokenManager
        this._bot=bot
        this._jwtTokenManager=jwtTokenManager
       
    }

    async addStudent(student,csrf_token){
        await this._csrfTokenManager.verify(csrf_token)

        const http = new HTTPResponse()
        try{
            student = new NewStudent(student);
        }catch(e){
            throw ClientError.bad("Mohon periksa kembali data yang anda masukkan")
        }
        
        const exists =await this._bot.existsAccount(student.no_hp)
        if(!exists){
            throw ClientError.bad(`No HP ${student.no_hp} tidak terdaftar di whatsapp`)
        }
        let inserted = await this._studentRepository.newStudent(student)
        if(!inserted){
            throw ClientError.bad(`Kemungkinan anda atau orang lain pernah memasukkan data yang sama persis`)
        }

        (async ()=>{
            try{
            
            const html = await this._viewEngine.render("pdf_template",{student})
            const pdf =await this._htmlToPdf.generate(html)
            this._bot.send({
                phone:student.no_hp,
                base64:pdf,
                mime:"application/pdf",
                filename:student.nama_lengkap.toLowerCase().split(" ").join("_")+".pdf"
            })
            
            }catch(e){
                this._bot.alert("trying send to "+student.no_hp+" but error\n\n"+e.stack)
            }
        })();
        http.statusCode(201)
        http.body({status:"success",message:"pendaftaran berhasil"})
        return http.response()
    }

    async listStudent({offset,csrfToken,accessToken}){
        const http = new HTTPResponse()
        await this._csrfTokenManager.verify(csrfToken)
        try{
            await this._jwtTokenManager.verifyAccessToken(accessToken)
        }catch(e){
            throw ClientError.unauthorized()
        }
        const result = await this._studentRepository.getList(offset)
        
        http.body({
            status:"success",
            data:result
        })
        return http.response()
    }

    async detailStudent({studentId,csrfToken,accessToken}){
        const http = new HTTPResponse()
        await this._csrfTokenManager.verify(csrfToken)
        try{
            await this._jwtTokenManager.verifyAccessToken(accessToken)
        }catch(e){
            throw ClientError.unauthorized()
        }
        const result = await this._studentRepository.getDetail(studentId)
        
        if(!result){
            throw ClientError.notFound()
        }

        http.body({
            status:"success",
            data:result
        })
        return http.response()
    }
}
module.exports=StudentUseCase