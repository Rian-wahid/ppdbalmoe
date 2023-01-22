"use strict";
const ListStudent = require("../ListStudent")
describe("a list student entity",()=>{
    it("should be not error",()=>{
        const data = [{
            id:"xxxxx",
            nama_lengkap:"nama lengkap",
            pendaftaran:"MA",
            no_hp:"+6767676",
            tanggal:new Intl.DateTimeFormat(["id"]).format(new Date()),
        }]
        const result = new ListStudent(data)
        expect(typeof result[0].tanggal).toBe("string")
        delete data[0].tanggal
        delete result[0].tanggal
        expect(result).toEqual(data)
    })

    it("should be error",()=>{
        const data1 = [{
           
            nama_lengkap:"nama lengkap",
            pendaftaran:"ma",
            no_hp:"+6767676",
            tanggal:new Intl.DateTimeFormat(["id"]).format(new Date()),
        }]

        const data2 = [{
            id:"xxxxx",
            
            pendaftaran:"ma",
            no_hp:"+6767676",
            tanggal:new Intl.DateTimeFormat(["id"]).format(new Date()),
        }]
        const data3 = [{
            id:"xxxxx",
            nama_lengkap:"nama lengkap",
          
            no_hp:"+6767676",
            tanggal:new Intl.DateTimeFormat(["id"]).format(new Date()),
        }]
        const data4 = [{
            id:"xxxxx",
            nama_lengkap:"nama lengkap",
            pendaftaran:"ma",
           
            tanggal:new Intl.DateTimeFormat(["id"]).format(new Date()),
        }]
        const data5 = [{
            id:"xxxxx",
            nama_lengkap:"nama lengkap",
            pendaftaran:"ma",
            no_hp:"+6767676",
           
        }]
        const data6 = [{
            id:"xxxxx",
            nama_lengkap:"nama lengkap",
            pendaftaran:"ma",
            no_hp:"+6767676",
            tanggal:new Intl.DateTimeFormat(["id"]).format(new Date()),
        },{
           
            nama_lengkap:"nama lengkap",
            pendaftaran:"ma",
            no_hp:"+6767676",
            tanggal:new Intl.DateTimeFormat(["id"]).format(new Date()),
        }]
        expect(()=>new ListStudent(data1)).toThrowError("Internal Server Error")
        expect(()=>new ListStudent(data2)).toThrowError("Internal Server Error")
        expect(()=>new ListStudent(data3)).toThrowError("Internal Server Error")
        expect(()=>new ListStudent(data4)).toThrowError("Internal Server Error")
        expect(()=>new ListStudent(data5)).toThrowError("Internal Server Error")
        expect(()=>new ListStudent(data6)).toThrowError("Internal Server Error")
    })
})