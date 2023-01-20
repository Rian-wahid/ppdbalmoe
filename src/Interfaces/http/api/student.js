const StudentUseCase = require("../../../Applications/use_case/StudentUseCase")
const HTTPResponseExpress = require("../../../Applications/translator/HTTPResponseExpress")
const register=(httpServer,container)=>{
    const studentUseCase = container.getInstance(StudentUseCase.name)
    httpServer.post("/api/ppdb",async (req,res)=>{
        const csrf_token = req.headers[process.env.CSRF_HEADER.toLowerCase()]
       
        const student=req.body
        new HTTPResponseExpress(await studentUseCase.addStudent(student,csrf_token)).send(res)

    });
}

module.exports=register;