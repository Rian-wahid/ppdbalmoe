"use strict";
require("../../../../../config")
const crypto= require("crypto")
const AdminLogin = require("../AdminLogin")

describe("a admin login entity",()=>{
    it("should be error",()=>{
        expect(()=>{new AdminLogin({})}).toThrowError("Bad Request")
        expect(()=>{new AdminLogin({username:"username"})}).toThrowError("Bad Request")
        expect(()=>{new AdminLogin({password:"password"})}).toThrowError("Bad Request")
    })

    it("should not error",()=>{
        const data ={
            username:"username",
            password:"password"
        }
        const result = new AdminLogin(data)
        const {ADMIN_HASH_ALGO,ADMIN_HASH_ENCODING} = process.env
        expect(result).toEqual({
            username_hash:crypto.createHash(ADMIN_HASH_ALGO).update(data.username).digest(ADMIN_HASH_ENCODING),
            password_hash:crypto.createHash(ADMIN_HASH_ALGO).update(data.password).digest(ADMIN_HASH_ENCODING)
        })
    })
})