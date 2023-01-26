const crypto = require("crypto")
class AdminsTableHelper {
    constructor(pool){
        this._pool = pool
    }

   async addAdmin({
        id="admin-1",
        nama=process.env.DEFAULT_ADMIN_NAME,
        password_hash=process.env.DEFAULT_ADMIN_PASSWORD,
        username_hash=process.env.DEFAULT_ADMIN_USERNAME

    }){
    password_hash = crypto.createHash(process.env.ADMIN_HASH_ALGO).update(password_hash).digest(process.env.ADMIN_HASH_ENCODING)
    username_hash = crypto.createHash(process.env.ADMIN_HASH_ALGO).update(username_hash).digest(process.env.ADMIN_HASH_ENCODING)
    const values =[id,nama,username_hash,password_hash]
    await this._pool.execute("INSERT INTO ppdb_admins (id,nama,username_hash,password_hash) VALUES (?,?,?,?)",values)
    }
    async clear(){
        await this._pool.query("DELETE FROM ppdb_admins WHERE 1=1")
    }
    async exists(adminId){
        const [[{t}]] = await this._pool.execute("SELECT COUNT(*) AS t FROM ppdb_admins WHERE id = ?",[adminId])
        return t == 1
    }
    async detail(adminId){
        const [[admin]] = await this._pool.execute("SELECT * FROM ppdb_admins WHERE id=?",[adminId])
        return admin
    }
}
module.exports = AdminsTableHelper