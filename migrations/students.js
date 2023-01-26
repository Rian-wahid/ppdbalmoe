require("../config")
const pool = require("../src/Infrastructures/database/mysql/pool")
const migrate =async (pool)=>{
    await pool.query("DROP TABLE IF EXISTS ppdb_students")
    await pool.query(`
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE TABLE \`ppdb_students\` (
    \`id\` varchar(50) NOT NULL,
    \`nama_lengkap\` text NOT NULL,
    \`no_hp\` text NOT NULL,
    \`pendaftaran\` text NOT NULL,
    \`tanggal\`text NOT NULL,
    \`alamat\` text NOT NULL,
    \`ttl\` text NOT NULL,
    tempat_tinggal text NOT NULL,
    alamat_tempat_tinggal text NOT NULL,
    penghasilan text NOT NULL,
    \`transportasi\` text NOT NULL,
    \`anak_ke\` text NOT NULL,
    \`jenis_kelamin\` text NOT NULL,
    \`nama_lengkap_ayah\` text NOT NULL,
    \`nama_lengkap_ibu\` text NOT NULL,
    \`pekerjaan_ayah\` text NOT NULL,
    \`pekerjaan_ibu\` text NOT NULL,
    \`keterangan_ayah\` text NOT NULL,
    \`keterangan_ibu\` text NOT NULL,
    \`nama_sekolah_asal\` text NOT NULL,
    \`alamat_sekolah_asal\` text NOT NULL,
    \`no_telp_sekolah_asal\` text NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE \`ppdb_students\`
  ADD PRIMARY KEY (\`id\`);

  /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
  /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
  /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

  COMMIT;

    `)
   
    console.info("migrasi tabel ppdb_students berhasil")
}

migrate(pool)