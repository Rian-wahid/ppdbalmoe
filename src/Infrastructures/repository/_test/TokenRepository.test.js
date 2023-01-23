require("../../../../config")
const pool = require("../../database/mysql/pool")
const TokenRepositoryMysql = require("../TokenRepositoryMysql")
const TokenTableHelper = require("../../../../tests/helper/TokenTableHelper")
const tokenTableHelper = new TokenTableHelper(pool)

describe("a token repository",()=>{
    beforeAll(async ()=>{
        await tokenTableHelper.clear()
    })
    afterEach(async ()=>{
        await tokenTableHelper.clear()
    })
    afterAll(async()=>{
        await pool.end()
    })

    it("add token",async ()=>{
        const tokenRepository = new TokenRepositoryMysql(pool)
        const token ="xxxxxxxx"
        await tokenRepository.addToken(token)
        expect(await tokenTableHelper.count(token)).toBe(1)
    })

    it("remove token",async()=>{
        const tokenRepository = new TokenRepositoryMysql(pool)
        const token = "xxxxxx"
        await tokenTableHelper.addToken(token)
        await tokenRepository.removeToken(token)
        expect(await tokenTableHelper.count(token)).toBe(0)
    })

    it("exists token",async()=>{
        const tokenRepository = new TokenRepositoryMysql(pool)
        const token = "xxxxxx"
        await tokenTableHelper.addToken(token)

        expect(await tokenRepository.exists(token)).toBe(true)
        await tokenTableHelper.clear()
        expect(await tokenRepository.exists(token)).toBe(false)
    })
})