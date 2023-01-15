const mysql2 = require("mysql2")
if(!global._poolWrapper_pool){
    const pool = mysql2.createPool({
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
        user:process.env.DB_USER,
        password:process.env.DB_PASS,
        database:process.env.DB_NAME,
        multipleStatements:true,
        waitForConnections:true,
        connectionLimit:5,
        queueLimit:0
      
        
    });
    Object.defineProperty(global,"_poolWrapper_pool",{
        value:pool,
        writable:false
    })
}
class PoolWrapper{
    construuctor(){
        this.pool=global._poolWrapper_pool;
    }

    query(...args){
        return new Promise((res,rej)=>{
            this.pool.query(...args,(err,...result)=>{
                if(err){
                    rej(err);
                    return;
                }
                res(result)
            })
        })
    }
    execute(...args){
        return new Promise((res,rej)=>{
            this.pool.execute(...args,(err,...result)=>{
                if(err){
                    rej(err);
                    return;
                }
                res(result)
            })
        })
    }
}

module.exports = new PoolWrapper();