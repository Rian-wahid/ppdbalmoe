const HTTPResponse =require("../translator/HTTPResponse")
const NewStudent = require("../../Domains/students/entities/NewStudent")
const bot = require("../../Infrastructures/external/robot/wrapper")
class StudentUseCase{
    constructor({viewEngine,htmlToPdf,studentRepository,csrfTokenManager}){
        this._viewEngine=viewEngine
        this._htmlToPdf=htmlToPdf
        this._studentRepository=studentRepository
        this._csrfTokenManager=csrfTokenManager
       
    }

    async addStudent(student,csrf_token){
        console.info(csrf_token)
        await this._csrfTokenManager.verify(csrf_token)
        const http = new HTTPResponse ()
        student = new NewStudent(student)
        const base64icon = await this._viewEngine.render("base64icon",{})
        const html = await this._viewEngine.render("pdf_template",{base64icon,student})
        const pdf =await this._htmlToPdf.generate(html)
        bot.send({
            phone:student.no_hp,
            base64:pdf,
            mime:"application/pdf",
            filename:student.nama_lengkap.split(" ").join("_")+".pdf"
        })
        http.body({status:"success",message:"pendaftaran berhasil"})
        return http.response()
    }
}
module.exports=StudentUseCase