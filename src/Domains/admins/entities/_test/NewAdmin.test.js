"use strict"
require("../../../../../config")
const crypto = require("crypto")
const NewAdmin = require("../NewAdmin")

describe("a new admin entity",()=>{
    it("should be error",()=>{
        expect(()=>{new NewAdmin({})}).toThrowError("Bad Request")
        expect(()=>{new NewAdmin({nama:"Nama"})}).toThrowError("Bad Request")
        expect(()=>{new NewAdmin({username:"Username"})}).toThrowError("Bad Request")
        expect(()=>{new NewAdmin({password:"password"})}).toThrowError("Bad Request")
        expect(()=>{new NewAdmin({nama:"Nama",username:"username"})}).toThrowError("Bad Request")
        expect(()=>{new NewAdmin({nama:"Nama",password:"pass"})}).toThrowError("Bad Request")
        expect(()=>{new NewAdmin({username:"username",password:"pass"})}).toThrowError("Bad Request")
    })

    it("should not error",()=>{
        const data ={
            nama:"sebuah nama",
            username:"sebuah username",
            password:"sebuah password"
        }
        const {ADMIN_HASH_ALGO,ADMIN_HASH_ENCODING} = process.env
        const result = new NewAdmin(data)
        expect(result).toEqual({
            nama:data.nama,
            username_hash:crypto.createHash(ADMIN_HASH_ALGO).update(data.username).digest(ADMIN_HASH_ENCODING),
            password_hash:crypto.createHash(ADMIN_HASH_ALGO).update(data.password).digest(ADMIN_HASH_ENCODING)
        })
    })
})