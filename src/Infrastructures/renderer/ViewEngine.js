const path = require("path")
class ViewEngine {
    constructor(ejs,viewsPath){
        this._ejs = ejs
        this._viewsPath=viewsPath
    }
    render(filename,data){
        const ejs = this._ejs
        return new Promise((res,rej)=>{
            ejs.renderFile(path.join(this._viewsPath,`${filename}.ejs`),data,(err,str)=>{
                if(err){
                    rej(err)
                    return;
                }
                res(str)
            })
        })
    }
}
module.exports=ViewEngine