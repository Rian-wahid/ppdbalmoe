const TokenRepository = require("../../Domains/tokens/TokenRepository")

class TokenRepositoryMysql extends TokenRepository{
    constructor(pool){
        super()
        this.pool=pool
    }

    async removeToken(token){
        await this.pool.execute("DELETE FROM jwt_tokens WHERE token = ?",[token])
    }
    async addToken(token){
        await this.pool.execute("INSERT INTO jwt_tokens VALUES (?)",[token])
    }
    async exists(token){
        const [rows] = await this.pool.execute("SELECT COUNT(*) AS t FROM jwt_tokens WHERE token = ?",[token])
        return rows[0].t > 0

    }
}

module.exports=TokenRepositoryMysql