const BotSessionRepository  = require("../../Domains/bot_session/BotSessionRepository")
const pool = require("../database/mysql/pool")
class BotSessionRepositoryMysql extends BotSessionRepository{
    constructor(){
        super()
        this.pool = pool
    }
    async getSession(){
        const [rows] =await this.pool.query("SELECT session FROM bot_session")

        if(rows.length>0){
            return rows[0].session
        }
        return null
    }
    async saveSession(session){
        await this.pool.query("DELETE FROM bot_session WHERE 1=1")
        await this.pool.execute("INSERT INTO bot_session VALUES (?)",[session])
    }
}
module.exports=BotSessionRepositoryMysql