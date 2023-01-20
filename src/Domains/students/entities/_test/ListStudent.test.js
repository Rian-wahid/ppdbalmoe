
const ListStudent = require("../ListStudent")
describe("a list student entity",()=>{
    it("should be not error",()=>{
        const data = [{
            id:"xxxxx",
            nama_lengkap:"nama lengkap",
            pendaftaran:"pendaftaran",
            no_hp:"6767676",
            tanggal:Date.now(),
        }]
        const result = new ListStudent(data)
        expect(result).toEqual(data)
    })

    it("should be error",()=>{
        const data1 = [{
           
            nama_lengkap:"nama lengkap",
            pendaftaran:"pendaftaran",
            no_hp:"6767676",
            tanggal:Date.now(),
        }]

        const data2 = [{
            id:"xxxxx",
            
            pendaftaran:"pendaftaran",
            no_hp:"6767676",
            tanggal:Date.now(),
        }]
        const data3 = [{
            id:"xxxxx",
            nama_lengkap:"nama lengkap",
          
            no_hp:"6767676",
            tanggal:Date.now(),
        }]
        const data4 = [{
            id:"xxxxx",
            nama_lengkap:"nama lengkap",
            pendaftaran:"pendaftaran",
           
            tanggal:Date.now(),
        }]
        const data5 = [{
            id:"xxxxx",
            nama_lengkap:"nama lengkap",
            pendaftaran:"pendaftaran",
            no_hp:"6767676",
           
        }]
        const data6 = [{
            id:"xxxxx",
            nama_lengkap:"nama lengkap",
            pendaftaran:"pendaftaran",
            no_hp:"6767676",
            tanggal:Date.now(),
        },{
           
            nama_lengkap:"nama lengkap",
            pendaftaran:"pendaftaran",
            no_hp:"6767676",
            tanggal:Date.now(),
        }]
        expect(()=>new ListStudent(data1)).toThrowError("Internal Server Error")
        expect(()=>new ListStudent(data2)).toThrowError("Internal Server Error")
        expect(()=>new ListStudent(data3)).toThrowError("Internal Server Error")
        expect(()=>new ListStudent(data4)).toThrowError("Internal Server Error")
        expect(()=>new ListStudent(data5)).toThrowError("Internal Server Error")
        expect(()=>new ListStudent(data6)).toThrowError("Internal Server Error")
    })
})