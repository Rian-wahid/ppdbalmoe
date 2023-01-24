"use strict"
require("../../../../config")
const AdminUseCase = require("../AdminUseCase")
const AdminRepositoryMysql = require("../../../Infrastructures/repository/AdminRepositoryMysql")
const TokenRepositoryMysql = require("../../../Infrastructures/repository/TokenRepositoryMysql")
const AdminTableHelper = require("../../../../tests/helper/AdminsTableHelper")
const TokenTableHelper = require("../../../../tests/helper/TokenTableHelper")
const JwtTokenManager = require("../../../Infrastructures/security/JwtTokenManager")
const CsrfTokenManager = require("../../../Infrastructures/security/CsrfTokenManager")
const pool = require("../../../Infrastructures/database/mysql/pool")
const jwt = require("jsonwebtoken")
const adminRepository = new AdminRepositoryMysql(pool)
const tokenRepository = new TokenRepositoryMysql(pool)
const adminTableHelper = new AdminTableHelper(pool)
const tokenTableHelper=new TokenTableHelper(pool)
const csrfTokenManager=new CsrfTokenManager(jwt)
const jwtTokenManager=new JwtTokenManager(jwt) 
describe("a admin use case",()=>{
    beforeAll(async ()=>{
        await adminTableHelper.clear()
        await tokenTableHelper.clear()
    })
    afterEach(async()=>{
        await adminTableHelper.clear()
        await tokenTableHelper.clear()
    })
    afterAll(async ()=>{
        await adminTableHelper.addAdmin({})
        await pool.end()
    })
    it("admin auth should be error",async()=>{
        const adminUseCase= new AdminUseCase({jwtTokenManager,csrfTokenManager,adminRepository,tokenRepository})
        
    })
})