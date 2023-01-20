(()=>{
    const ttl_tanggal_text = document.getElementById("ttl_tanggal_text");
    const ttl_tanggal_date = document.getElementById("ttl_tanggal_date");
    ttl_tanggal_text.addEventListener("focus",()=>{
     ttl_tanggal_date.showPicker();
    })
    ttl_tanggal_text.addEventListener("click",()=>{
     ttl_tanggal_date.showPicker();
    })
    ttl_tanggal_text.addEventListener("keydown",()=>{
     ttl_tanggal_date.showPicker();
    })
    ttl_tanggal_date.addEventListener("change",()=>{
     const date = new Date(ttl_tanggal_date.value);
     let day = date.getDate()
     day = (day<10)?"0"+day:day;
     let month = date.getMonth()+1
     month=(month<10)?"0"+month:month
     let year = date.getFullYear()
     ttl_tanggal_text.value = `${day}-${month}-${year}`

    })
     })();

     (()=>{
        document.getElementById("ppdb").addEventListener("submit",(e)=>{
            e.preventDefault()
            const form = new FormData(e.target)
            
            const data ={
                pendaftaran:form.get("pendaftaran"),
                nama_lengkap:form.get("nama_lengkap"),
                jenis_kelamin:form.get("jenis_kelamin"),
                ttl:{
                    tempat:form.get("ttl_tempat"),
                    tanggal:form.get("ttl_tanggal")
                },
                alamat:{
                    jl:form.get("alamat_jl"),
                    rt:form.get("alamat_rt"),
                    rw:form.get("alamat_rw"),
                    dsn:form.get("alamat_dsn"),
                    ds:form.get("alamat_ds"),
                    kec:form.get("alamat_kec"),
                    kab:form.get("alamat_kab"),
                },
                anak_ke:{
                    urutan:form.get("anak_ke_urutan"),
                    dari:form.get("anak_ke_dari")
                },
                tempat_tinggal:form.get("tempat_tinggal"),
                transportasi:form.get("transportasi"),
                no_hp:form.get("no_hp"),
                nama_lengkap_ayah:form.get("nama_lengkap_ayah"),
                nama_lengkap_ibu:form.get("nama_lengkap_ibu"),
                pekerjaan_ayah:form.get("pekerjaan_ayah"),
                pekerjaan_ibu:form.get("pekerjaan_ibu"),
                alamat_tempat_tinggal:{
                    jl:form.get("alamat_ortu_jl"),
                    rt:form.get("alamat_ortu_rt"),
                    rw:form.get("alamat_ortu_rw"),
                    dsn:form.get("alamat_ortu_dsn"),
                    ds:form.get("alamat_ortu_ds"),
                    kec:form.get("alamat_ortu_kec"),
                    kab:form.get("alamat_ortu_kab"),

                },
                penghasilan:form.get("penghasilan"),
                keterangan_ayah:{
                    info:form.get("keterangan_ayah_text"),
                    tahun:form.get("keterangan_ayah_tahun"),
                },
                keterangan_ibu:{
                    info:form.get("keterangan_ibu_text"),
                    tahun:form.get("keterangan_ibu_tahun"),
                },
                nama_sekolah_asal:form.get("nama_sekolah_asal"),
                alamat_sekolah_asal:form.get("alamat_sekolah_asal"),
                no_telp_sekolah_asal:form.get("no_telp_sekolah_asal")

            }
           
            const json =    JSON.stringify(data)
            const csrf_header = document.querySelector("meta[name=\"csrf_header\"]").content
            const csrf_token = document.querySelector("meta[name=\"csrf_token\"]").content
            const headers={
                "Content-Type":"application/json",
                "Content-Length":json.length,
                
            }
            headers[csrf_header] = csrf_token
            fetch("/api/ppdb",{
                method:"POST",
                headers,
                body:json
            }).then(res=>{
                console.info(res.status)
                res.json().then(resJson=>{
                    console.info(resJson)
                })
            })
        })
     })()
    