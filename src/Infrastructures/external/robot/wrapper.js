
if(!global._botWrapper_bot){
    const bot =  require("./bot")
    Object.defineProperty(global,"_botWrapper_bot",{
        value:bot,
        writable:false
    })
}
module.exports=global._botWrapper_bot