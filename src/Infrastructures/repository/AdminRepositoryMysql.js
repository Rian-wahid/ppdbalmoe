const AdminRepository = require("../../Domains/admins/AdminRepository")

class AdminRepositoryMysql extends AdminRepository{
    constructor(pool){
        super()
        this.pool=pool
    }

    async auth({username,password}){
        const [rows] = await this.pool.execute("SELECT nama,id FROM admins WHERE username_hash = ? AND password_hash = ?",[username,password])
        return rows[0]
    }
    async update({username,password,nama,id}){
        const values = [username,password,nama,id]
        const [rows] = await this.pool.execute("UPDATE admins SET username_hash = ?, password_hash =? ,nama=? WHERE id=? RETURNING id",values)
        return rows[0]
    }

    async addNewAdmin({username,password,nama,id}){
        const values = [username,password,nama,id]
        const [rows] = await this.pool.execute("INSERT INTO admins (username_hash,password_hash,nama,id) VALUES (?,?,?,?) RETURNING id",values)
        return rows[0]
    }
}
module.exports=AdminRepositoryMysql