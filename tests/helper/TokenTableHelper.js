class TokenTableHelper {
    constructor(pool){
        this._pool = pool
    }

    async addToken(token){
        await this._pool.execute("INSERT INTO ppdb_jwt_tokens VALUES (?)",[token])
    }

    async clear(){
        await this._pool.query("DELETE FROM ppdb_jwt_tokens WHERE 1=1")
    }

    async count(token){
        const [[{t}]] = await this._pool.execute("SELECT COUNT(*) as t FROM ppdb_jwt_tokens WHERE token = ?",[token])
        return t
    }
}
module.exports=TokenTableHelper