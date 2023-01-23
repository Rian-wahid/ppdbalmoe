"use strict"
require("../../../../../config")
const crypto = require("crypto")
const AdminUpdate = require("../AdminUpdate")

describe("a admin update entity",()=>{
    it("should be error",()=>{
        const data = {
            id:"xxxx",
            nama:"admin",
            password:"pass",
            username:"user"
        }
        for(let key in data){
            const _data = {...data}
            delete _data[key]
            expect(()=>{new AdminUpdate(_data)}).toThrowError("Bad Request")
            _data[key]=1
            expect(()=>{new AdminUpdate(_data)}).toThrowError("Bad Request")
            _data[key]=true
            expect(()=>{new AdminUpdate(_data)}).toThrowError("Bad Request")
        }
    })
    it("should not error",()=>{
        const data = {
            id:"xxxx",
            nama:"admin",
            password:"pass",
            username:"user"
        }
        const result = new AdminUpdate(data)
        const {ADMIN_HASH_ALGO,ADMIN_HASH_ENCODING} = process.env
        expect(result).toEqual({
            id:data.id,
            nama:data.nama,
            username_hash:crypto.createHash(ADMIN_HASH_ALGO).update(data.username).digest(ADMIN_HASH_ENCODING),
            password_hash:crypto.createHash(ADMIN_HASH_ALGO).update(data.password).digest(ADMIN_HASH_ENCODING)
        })
    })
})