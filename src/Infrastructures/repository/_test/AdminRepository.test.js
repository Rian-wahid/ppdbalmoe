require("../../../../config")
const pool = require("../../database/mysql/pool")
const crypto = require("crypto")
const env = process.env
const AdminsTableHelper = require("../../../../tests/helper/AdminsTableHelper")
const AdminRepositoryMysql = require("../AdminRepositoryMysql")
const adminsTableHelper = new AdminsTableHelper(pool)
const hashHelper=(str)=>{
    return crypto.createHash(env.ADMIN_HASH_ALGO).update(str).digest(env.ADMIN_HASH_ENCODING)
}
describe("a admin repository",()=>{
    beforeAll(async ()=>{
        await adminsTableHelper.clear()
    })
    afterEach(async ()=>{
        await adminsTableHelper.clear()
    })
    afterAll(async ()=>{
        await adminsTableHelper.addAdmin({})
        await pool.end()
    })

    it("add new admin",async ()=>{
        let idToGen = "xxxx"
        const idGenerator = ()=>idToGen
        const adminRepository = new AdminRepositoryMysql(pool,idGenerator)
        let username="username"
        let password="password"
        const data ={
            nama:"nama admin",
            username_hash:hashHelper(username),
            password_hash:hashHelper(password)
        }
        let resultId = await adminRepository.addNewAdmin(data)
        expect(resultId).toBe(`admin-${idToGen}`)
        expect(await adminsTableHelper.exists(resultId)).toBe(true)
        let admin = await adminsTableHelper.detail(resultId)
        delete admin.id
        expect(admin).toEqual(data)
    })

    it("auth",async ()=>{
        let idToGen = "xxxx"
        const idGenerator = ()=>idToGen
        const adminRepository = new AdminRepositoryMysql(pool,idGenerator)
        let username="username"
        let password="password"
        const data ={
            id:idToGen,
            nama:"nama admin",
            username_hash:username,
            password_hash:password
        }
        
        await adminsTableHelper.addAdmin(data)
        const credential = await adminsTableHelper.detail(data.id)
        const admin = await adminRepository.auth(credential)
        expect(admin).toBeTruthy()
        expect(admin.nama).toBe(data.nama)
        expect(admin.id).toBe(data.id)
        expect(await adminRepository.auth({username_hash:username,password_hash:password})).toBeNull()
        password ="salah"
        data.password_hash=hashHelper(password)
        expect(await adminRepository.auth(data)).toBeNull()
    })

    it("update",async ()=>{
        let idToGen = "xxxx"
        const idGenerator = ()=>idToGen
        const adminRepository = new AdminRepositoryMysql(pool,idGenerator)
        let username="username"
        let password="password"
        const data ={
            id:idToGen,
            nama:"nama admin",
            username_hash:hashHelper(username),
            password_hash:hashHelper(password)
        }
        await adminsTableHelper.addAdmin(data)
        const newData = {
            id:idToGen,
            nama:"nama admin baru",
            username_hash:hashHelper("username baru"),
            password_hash:hashHelper("password baru")
        }
        await adminRepository.update(newData)
        expect(await adminsTableHelper.detail(data.id)).toEqual(newData)
    })
})