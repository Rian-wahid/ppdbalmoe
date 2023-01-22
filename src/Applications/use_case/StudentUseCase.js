const HTTPResponse =require("../translator/HTTPResponse")
const NewStudent = require("../../Domains/students/entities/NewStudent")

class StudentUseCase{
    constructor({viewEngine,htmlToPdf,studentRepository,csrfTokenManager,bot}){
        this._viewEngine=viewEngine
        this._htmlToPdf=htmlToPdf
        this._studentRepository=studentRepository
        this._csrfTokenManager=csrfTokenManager
        this._bot=bot
       
    }

    async addStudent(student,csrf_token){
        await this._csrfTokenManager.verify(csrf_token)
        const http = new HTTPResponse()
        try{
            student = new NewStudent(student);
        }catch(e){
            http.statusCode(400)
            http.body({status:"fail",message:`Mohon periksa kembali data yang anda masukkan`})
            return http.response()
        }
        
        const exists =await this._bot.existsAccount(student.no_hp)
        if(!exists){
            http.statusCode(400)
            http.body({status:"fail",message:`No HP ${student.no_hp} tidak terdaftar di whatsapp`})
            return http.response()
        }
        await this._studentRepository.newStudent(student,async ()=>{
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
        })
        
        
        http.body({status:"success",message:"pendaftaran berhasil"})
        return http.response()
    }
}
module.exports=StudentUseCase