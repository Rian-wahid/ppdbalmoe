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
     })()
    