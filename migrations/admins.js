require("../config")
const pool = require("../src/Infrastructures/database/mysql/pool")
const {nanoid} = require("nanoid")
const crypto=require("crypto")

const migrate =async (pool)=>{
    await pool.query("DROP TABLE IF EXISTS ppdb_admins")
    await pool.query(`
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
    
    
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
    
CREATE TABLE \`ppdb_admins\` (
    \`id\` varchar(50) NOT NULL,
    \`nama\` text NOT NULL,
    \`username_hash\` text NOT NULL,
    \`password_hash\` text NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  ALTER TABLE \`ppdb_admins\`
  ADD PRIMARY KEY (\`id\`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
    
COMMIT;
`)
    const algo = process.env.ADMIN_HASH_ALGO
    const encoding = process.env.ADMIN_HASH_ENCODING
    const username = crypto.createHash(algo).update(process.env.DEFAULT_ADMIN_USERNAME).digest(encoding)
    const password = crypto.createHash(algo).update(process.env.DEFAULT_ADMIN_PASSWORD).digest(encoding)
    const name = process.env.DEFAULT_ADMIN_NAME
    await pool.execute(`INSERT INTO ppdb_admins (id,nama,username_hash,password_hash)
    VALUES (?,?,?,?)`,[`admin-${nanoid()}`,name,username,password])
    console.info("migrasi tabel ppdb_admins berhasil")
    
}
migrate(pool)