class HTMLToPDF{
    constructor(htmlPdfNode){
        this.htmlPdfNode = htmlPdfNode
        this.options = { 
            format: 'A4', 
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            displayHeaderFooter:true
        }
    }
    generate(html){
        return new Promise((res,rej)=>{
            this.htmlPdfNode.generatePdf({content:html},this.options,(err,buff)=>{
                if(err){
                    rej(err);
                    return;
                }
                res(buff.toString("base64"))
            })
        })
    }
}
module.exports = HTMLToPDF