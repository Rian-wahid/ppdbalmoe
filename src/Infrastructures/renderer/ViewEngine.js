const path = require("path")
class ViewEngine {
    constructor({ejs,viewsPath}){
        this.ejs = ejs
        this.viewsPath=viewsPath
    }
    render(filename,data){
        return new Promise((res,rej)=>{
            this.ejs.renderFile(path.join(this.viewsPath,`${filename}.ejs`),(err,str)=>{
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