const HTTPResponse =require("../translator/HTTPResponse")
const NewStudent = require("../../Domains/students/entities/NewStudent")
class StudentUseCase{
    constructor({viewEngine,htmlToPdf,studentRepository,csrfTokenManager}){
        this._viewEngine=viewEngine
        this._htmlToPdf=htmlToPdf
        this._studentRepository=studentRepository
        this._csrfTokenManager=csrfTokenManager
       
    }

    async addStudent(student,csrf_token){
        await this._csrfTokenManager.verify(csrf_token)
        const http = new HTTPResponse ()
        student = new NewStudent(student)
        console.info(student)
        http.body({status:"success",message:"pendaftaran berhasil"})
        return http.response()
    }
}
module.exports=StudentUseCase