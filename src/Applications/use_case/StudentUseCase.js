class StudentUseCase{
    constructor({viewEngine,htmlToPdf,studentRepository}){
        this._viewEngine=viewEngine
        this._htmlToPdf=htmlToPdf
        this._studentRepository=studentRepository
       
    }
}