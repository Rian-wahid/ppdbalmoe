const AdminRepository = require("../../Domains/admins/AdminRepository")

class AdminRepositoryMysql extends AdminRepository{
    constructor(pool,idGenerator){
        super()
        this._pool=pool
        this._idGenerator = idGenerator
    }
    async auth({username_hash,password_hash}){
        const values =[username_hash,password_hash]
        const [[admin]] = await this._pool.execute("SELECT nama,id FROM ppdb_admins WHERE username_hash = ? AND password_hash = ?",values)
        return admin || null
    }
    async update({username_hash,password_hash,nama,id}){
        
        const values = [username_hash,password_hash,nama,id]
        await this._pool.execute("UPDATE ppdb_admins SET username_hash = ?, password_hash =? ,nama=? WHERE id=?",values)
        return id
    }

    async addNewAdmin({username_hash,password_hash,nama}){
        const id = `admin-${this._idGenerator()}`
        const values = [username_hash,password_hash,nama,id]
        await this._pool.execute("INSERT INTO ppdb_admins (username_hash,password_hash,nama,id) VALUES (?,?,?,?)",values)
        return id
      
    }
}
module.exports=AdminRepositoryMysql