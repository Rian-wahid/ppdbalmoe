const mysql2 = require("mysql2/promise")
const dotenv = require("dotenv")
const {nanoid} = require("nanoid")
const crypto=require("crypto")

dotenv.config()

const init = async ()=>{
    const conn =await mysql2.createPool({
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
        user:process.env.DB_USER,
        password:process.env.DB_PASS,
        database:process.env.DB_NAME,
        multipleStatements:true,
        waitForConnections:true,
        connectionLimit:5,
        queueLimit:0
      
        
    })
   
    try{

    
    await conn.query(`
DROP TABLE IF EXISTS \`bot_auth\`;
DROP TABLE IF EXISTS \`jwt_tokens\`;
DROP TABLE IF EXISTS \`students\`;
DROP TABLE IF EXISTS \`student_details\`;
DROP TABLE IF EXISTS \`admins\`;
`);

await conn.query(`

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE \`admins\` (
  \`id\` varchar(50) NOT NULL,
  \`nama\` text NOT NULL,
  \`username_hash\` text NOT NULL,
  \`password_hash\` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE \`bot_session\` (
  \`session\` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE \`jwt_tokens\` (
  \`token\` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE \`students\` (
  \`id\` varchar(50) NOT NULL,
  \`nama_lengkap\` text NOT NULL,
  \`no_hp\` text NOT NULL,
  \`pendaftaran\` text NOT NULL,
  \`tanggal\` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE \`student_details\` (
  \`id\` varchar(50) NOT NULL,
  \`alamat\` text NOT NULL,
  \`ttl\` text NOT NULL,
  \`usia\` text NOT NULL,
  \`transportasi\` text NOT NULL,
  \`anak_ke\` text NOT NULL,
  \`jenis_kelamin\` text NOT NULL,
  \`nama_lengkap_ayah\` text NOT NULL,
  \`nama_lengkap_ibu\` text NOT NULL,
  \`pekerjaan_ayah\` text NOT NULL,
  \`pekerjaan_ibu\` text NOT NULL,
  \`keterangan_ayah\` text NOT NULL,
  \`keterangan_ibu\` text NOT NULL,
  \`no_hp_wali\` text NOT NULL,
  \`nama_sekolah_asal\` text NOT NULL,
  \`alamat_sekolah_asal\` text NOT NULL,
  \`no_telp_sekolah_asal\` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


ALTER TABLE \`admins\`
  ADD PRIMARY KEY (\`id\`);


ALTER TABLE \`students\`
  ADD PRIMARY KEY (\`id\`);


ALTER TABLE \`student_details\`
  ADD PRIMARY KEY (\`id\`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

`);
const algo = process.env.ADMIN_HASH_ALGO
const encoding = process.env.ADMIN_HASH_ENCODING
const username = crypto.createHash(algo).update(process.env.DEFAULT_ADMIN_USERNAME).digest(encoding)
const password = crypto.createHash(algo).update(process.env.DEFAULT_ADMIN_PASSWORD).digest(encoding)
const name = process.env.DEFAULT_ADMIN_NAME
await conn.query(`INSERT INTO admins (id,nama,username_hash,password_hash)
VALUES (?,?,?,?)`,[`admin-${nanoid()}`,name,username,password])

console.info("migrasi berhasil")


    }catch(e){
      console.error(e)
    }
    await  conn.end()

}
init()