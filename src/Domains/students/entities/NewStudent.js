const ClientError = require("../../../Commons/exceptions/ClientError")

class NewStudent{
    
    static fields=[
       {
            "name":"pendaftaran",
            "type":"string",
            "min":2,
            "max":64,
            "label":"Pendaftaran",
            "enum":["MA dan Pondok Pesantren","MA","MTs dan Pondok Pesantren","MTs"],
            "enum_id":["ma_pp","ma","mts_pp","mts"],
            "input":"radio",
            "description":""
       },
        {
            "name":"nama_lengkap",
            "type":"string",
            "label":"Nama Lengkap",
            "min":2,
            "max":256,
            "input":"text",
            "description":"Nama lengkap sesuai dokumen resmi yang berlaku"
        },
        {
            "name":"jenis_kelamin",
            "type":"string",
            "min":2,
            "max":20,
            "label":"Jenis Kelamin",
            "enum":["Laki-laki","Perempuan"],
            "enum_id":["l","p"],
            "input":"radio",
            "description":""
        },
        {
            "name":"ttl",
            "type":"string",
            "label":"Tempat, tanggal lahir",
            "min":10,
            "max":256,
            "input":"text",
            "description":""
        },
        {
            "name":"anak_ke",
            "type":"string",
            "label":"Anak ke",
            "min":4,
            "max":20,
            "input":"text",
            "description":"contoh; 9 dari 10",
        },
        {
            "name":"usia",
            "type":"string",
            "label":"Usia",
            "min":2,
            "max":20,
            "input":"text",
            "description":"contoh 16 tahun",
           
        },
        {
            "name":"alamat",
            "type":"string",
            "label":"Alamat",
            "min":2,
            "max":400,
            "input":"textarea",
            "description":""
        },
        {
            "name":"transportasi",
            "type":"string",
            "label":"Transportasi ke sekolah",
            "min":2,
            "max":64,
            "input":"text",
            "description":""
        },
        {
            "name":"no_hp",
            "type":"string",
            "label":"No HP",
            "min":9,
            "max":19,
            "input":"tel",
            "description":"No HP yang bisa dihubungi, contoh +62xxxxxxxxxxxx",
            "pattern":"\\+\\d+$"
        },
        {
            "name":"nama_lengkap_ayah",
            "type":"string",
            "label":"Nama lengkap ayah",
            "min":2,
            "max":256,
            "input":"text",
            "description":"Nama lengkap ayah sesuai dokumen resmi yang berlaku"
        },
       {
            "name":"nama_lengkap_ibu",
            "type":"string",
            "label":"Nama lengkap ibu",
            "min":2,
            "max":256,
            "input":"text",
            "description":"Nama lengkap ibu sesuai dokumen resmi yang berlaku"
       },
        {
            "name":"pekejaan_ayah",
            "type":"string",
            "label":"Pekerjaan ayah",
            "min":2,
            "max":256,
            "input":"text",
            "description":""
        },
        {
            "name":"pekerjaan_ibu",
            "type":"string",
            "label":"Pekerjaan ibu",
            "min":2,
            "max":256,
            "input":"text",
            "description":""
        },
        {
            "name":"alamat_wali",
            "type":"string",
            "label":"Alamat wali",
            "min":2,
            "max":400,
            "input":"textarea",
            "description":""
        },
        {
            "name":"keterangan_ayah",
            "type":"string",
            "label":"Keterangan ayah",
            "min":2,
            "max":256,
            "input":"text",
            "description":"masih hidup atau meninggal pada tahun"
        },{
            "name":"keterangan_ibu",
            "type":"string",
            "label":"Keterangan ibu",
            "min":2,
            "max":256,
            "input":"text",
            "description":"masih hidup atau meninggal pada tahun"
        },
        {
            "name":"no_hp_wali",
            "type":"string",
            "label":"No Telp/HP wali",
            "min":9,
            "max":19,
            "input":"tel",
            "description":"contoh +62xxxxxxxxxxxxx",
            "pattern":"\\+\\d+$*"
         },
        
        {
            "name":"nama_sekolah_asal",
            "type":"string",
            "label":"Nama sekolah asal",
            "min":2,
            "max":256,
            "input":"text",
            "description":""
        },
        {
            "name":"alamat_sekolah_asal",
            "type":"string",
            "label":"Alamat sekolah asal",
            "min":2,
            "max":400,
            "input":"textarea",
            "description":""
        },
        {
            "name":"no_telp_sekolah_asal",
            "type":"string",
            "label":"No Telp sekolah asal",
            "min":9,
            "max":19,
            "input":"tel",
            "description":"contoh +62xxxxxxxxxxxx",
            "pattern":"\\+\\d+$"
        },

        ];

        constructor(student){
            this.validate(student);
            const clean = {};
            for(field of NewStudent.fields){
                clean[field.name]=student[field.name];
            }
            return clean;
        }
        validate(student){
            for(let field of NewStudent.fields){
                if(!student.hasOwnProperty(field.name)){
                    throw ClientError.bad();
                }

                if(typeof student[field.name]!=field.type){
                    throw ClientError.bad();
                }

                if(field.min && field.max){
                    if(student[field.name].length< field.min || student[field.name].length > field.max ){
                        throw ClientError.bad();
                    }
                }

                if(field.pattern){
                    const reg = new RegExp(field.pattern)
                    if(!reg.test(student[field.name])){
                        throw ClientError.bad();
                    }
                }


            }
        }

}

module.exports=NewStudent;