
(()=>{
    const ttl_tanggal_text = document.getElementById("ttl_tanggal_text");
    const ttl_tanggal_date = document.getElementById("ttl_tanggal_date");
    
    ttl_tanggal_text.addEventListener("focus",()=>{
    try{
        ttl_tanggal_date.showPicker();
    }catch(e){}
     
    })
    ttl_tanggal_text.addEventListener("click",()=>{
        try{
            ttl_tanggal_date.showPicker();
        }catch(e){}
    })
    ttl_tanggal_text.addEventListener("keydown",()=>{
        try{
            ttl_tanggal_date.showPicker();
        }catch(e){}
    })
    ttl_tanggal_date.addEventListener("change",()=>{
     const date = new Date(ttl_tanggal_date.value);
     let day = date.getDate();
     day = (day<10)?"0"+day:day;
     let month = date.getMonth()+1;
     month=(month<10)?"0"+month:month;
     let year = date.getFullYear();
     ttl_tanggal_text.value = `${day}-${month}-${year}`;

    })
    document.getElementById("keterangan_ayah").addEventListener("change",(e)=>{
        if(e.target.value==="0"){
            document.getElementById("ket_ayah_thn").required = true

        }else{
            document.getElementById("ket_ayah_thn").required = false
        }
    })
    document.getElementById("keterangan_ibu").addEventListener("change",(e)=>{
        if(e.target.value==="0"){
            document.getElementById("ket_ibu_thn").required = true
            
        }else{
            document.getElementById("ket_ibu_thn").required = false
        }
    })
     })();

     (()=>{
        let modalSuccess = document.getElementById("modal_success")
        let modalFail = document.getElementById("modal_fail")
        let modalLoading = document.getElementById("modal_loading")
        let modalFailInfo = document.getElementById("modal_fail_info")
        modalSuccess=new bootstrap.Modal(modalSuccess,{})
        modalFail=new bootstrap.Modal(modalFail,{})
        modalLoading=new bootstrap.Modal(modalLoading,{})
        document.getElementById("ppdb").addEventListener("submit",(e)=>{
            e.preventDefault();
            modalLoading.show()
            const form = new FormData(e.target);
            
            const data ={
                pendaftaran:form.get("pendaftaran"),
                nama_lengkap:form.get("nama_lengkap"),
                jenis_kelamin:form.get("jenis_kelamin"),
                ttl:{
                    tempat:form.get("ttl_tempat"),
                    tanggal:form.get("ttl_tanggal")
                },
                alamat:{
                    jl:form.get("alamat_jl")||"",
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
                    jl:form.get("alamat_ortu_jl")||"",
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
                    tahun:form.get("keterangan_ayah_tahun")||"",
                },
                keterangan_ibu:{
                    info:form.get("keterangan_ibu_text"),
                    tahun:form.get("keterangan_ibu_tahun")||"",
                },
                nama_sekolah_asal:form.get("nama_sekolah_asal"),
                alamat_sekolah_asal:form.get("alamat_sekolah_asal"),
                no_telp_sekolah_asal:form.get("no_telp_sekolah_asal")

            }
            if(data.no_hp[0]!="+"){
                if(data.no_hp[0]=="0"){
                    data.no_hp="+62"+data.no_hp.substring(1)
                }else{
                    data.no_hp="+"+data.no_hp
                }
            }
           
            const json =    JSON.stringify(data);
            const csrf_header = document.querySelector("meta[name=\"csrf_header\"]").content;
            const csrf_token = document.querySelector("meta[name=\"csrf_token\"]").content;
            const headers={
                "Content-Type":"application/json",
                "Content-Length":json.length,
                "Accept":"application/json"
                
            }
            headers[csrf_header] = csrf_token;
            fetch("/api/ppdb",{
                method:"POST",
                headers,
                body:json
            }).then(res=>{
                
                res.json().then(resJson=>{
                    modalLoading.hide()
                    setTimeout(()=>{
                        if(resJson.status !="success"){
                            modalFailInfo.innerText=resJson.message || ""
                            modalFail.show()
                        }else{
                            modalSuccess.show()
                        }
                    },1000)
                   
                })
            });
        })
     })();
    